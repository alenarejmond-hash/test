export default async function handler(request, response) {
  // Отключаем кэширование намертво, чтобы сервер всегда думал головой, а не брал из памяти
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('Expires', '0');
  
  // CORS заголовки для безопасной работы с React
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma, Expires');

  // КРИТИЧЕСКИ ВАЖНО: Обработка предварительного запроса (CORS OPTIONS). 
  // Без этого браузер заблокирует POST-запрос с кастомными заголовками и статус не сохранится!
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Умный поиск ключей доступа к базе данных Vercel (Upstash)
  let kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.STORAGE_REST_API_URL;
  let kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.STORAGE_REST_API_TOKEN;

  // Если стандартные имена не подошли, ищем любую переменную с REST_API_URL
  if (!kvUrl || !kvToken) {
    const envKeys = Object.keys(process.env);
    const foundUrlKey = envKeys.find(key => 
      key.endsWith('_REST_API_URL') && 
      process.env[key] && 
      typeof process.env[key] === 'string'
    );
    
    if (foundUrlKey) {
      kvUrl = process.env[foundUrlKey];
      const tokenKey = foundUrlKey.replace('_URL', '_TOKEN');
      kvToken = process.env[tokenKey] || process.env.KV_REST_API_TOKEN;
    }
  }

  // Функция для безопасной отправки команд в базу данных
  async function executeRedisCommand(commandArray) {
    if (!kvUrl || !kvToken) return null;
    try {
      const res = await fetch(kvUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${kvToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commandArray)
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.result;
    } catch (e) {
      return null;
    }
  }

  // 1. ЗАПИСЬ ТАПОВ В БАЗУ ДАННЫХ
  if (request.method === 'POST') {
    let mode = null;
    
    // Безопасное чтение тела запроса для любых сред (Vercel, Node, Edge)
    if (request.body) {
      if (typeof request.body === 'object') {
        mode = request.body.mode;
      } else if (typeof request.body === 'string') {
        try { mode = JSON.parse(request.body).mode; } catch (e) {}
      } else {
        try { mode = JSON.parse(request.body.toString()).mode; } catch (e) {}
      }
    }
    
    let dbSuccess = false;
    if (mode && kvUrl && kvToken) {
      // Отправляем команду SET на 2 часа (7200 секунд)
      const result = await executeRedisCommand(["SET", "elena_override_mode", mode, "EX", 7200]);
      if (result === "OK" || result === "OK") { // Vercel KV возвращает строку OK
        dbSuccess = true;
      }
    }
    
    // Возвращаем статус успеха
    return response.status(200).json({ 
      success: true, 
      mode: mode, 
      dbSuccess: dbSuccess,
      dbConnected: !!(kvUrl && kvToken)
    });
  }

  // 2. ЧТЕНИЕ СТАТУСА ПРИ ОТКРЫТИИ ВИЗИТКИ
  if (request.method === 'GET') {
    let override = null;
    
    // Сначала проверяем базу данных (ручной перехват)
    if (kvUrl && kvToken) {
      override = await executeRedisCommand(["GET", "elena_override_mode"]);
    }

    // Защита: иногда Upstash возвращает строку вместе с кавычками (например '"day"'), очищаем их
    if (typeof override === 'string') {
      override = override.replace(/["']/g, '').trim();
    }

    // Если есть ручной перехват, отдаем его немедленно
    if (override === 'day' || override === 'night') {
      return response.status(200).json({ 
        mode: override, 
        source: 'manual', 
        dbConnected: true 
      });
    }

    // Если перехвата нет, смотрим на часы (Строго Ереванское время)
    const now = new Date();
    const options = { timeZone: 'Asia/Yerevan', hour: 'numeric', weekday: 'short', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);
    
    let hour = 0;
    let weekday = '';
    for (const part of parts) {
      if (part.type === 'hour') hour = parseInt(part.value, 10);
      if (part.type === 'weekday') weekday = part.value;
    }

    let mode = 'night';
    let source = 'time';

    // Выходные: всегда личная визитка
    if (weekday === 'Sat' || weekday === 'Sun') {
      mode = 'night';
      source = 'weekend';
    } 
    // Будни с 9:00 до 18:00: рабочая визитка
    else if (hour >= 9 && hour < 18) {
      mode = 'day';
      source = 'time';
    }
    // Будни после 18:00: личная визитка
    else {
      mode = 'night';
      source = 'time';
    }

    // Возвращаем результат
    return response.status(200).json({ 
      mode: mode, 
      source: source, 
      dbConnected: !!(kvUrl && kvToken) 
    });
  }

  // Защита от неверных запросов (PUT, DELETE и т.д.)
  return response.status(405).json({ error: 'Method not allowed' });
}