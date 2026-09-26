export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('Expires', '0');
  response.setHeader('Access-Control-Allow-Origin', '*');

  let kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  let kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // Если стандартные имена не подошли, запускаем умную ищейку
  if (!kvUrl || !kvToken) {
    const envKeys = Object.keys(process.env);
    // Ищем любую переменную, которая заканчивается на _URL и ведет на сервера базы данных
    const foundUrlKey = envKeys.find(key => 
      key.endsWith('_URL') && 
      process.env[key] && 
      typeof process.env[key] === 'string' &&
      (process.env[key].includes('upstash.io') || process.env[key].includes('vercel-storage.com'))
    );
    
    // Если нашли ссылку, автоматически вычисляем имя ключа для пароля
    if (foundUrlKey) {
      kvUrl = process.env[foundUrlKey];
      const possibleTokenKey1 = foundUrlKey.replace('_URL', '_TOKEN');
      const possibleTokenKey2 = foundUrlKey.replace('REST_API_URL', 'REST_API_TOKEN');
      kvToken = process.env[possibleTokenKey1] || process.env[possibleTokenKey2];
    }
  }

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

  if (request.method === 'POST') {
    let mode = request.body?.mode;
    if (!mode && typeof request.body === 'string') {
      try { mode = JSON.parse(request.body).mode; } catch (e) {}
    }
    
    let dbSuccess = false;
    if (mode && kvUrl && kvToken) {
      // Отправляем команду SET на 2 часа (7200 секунд)
      const result = await executeRedisCommand(["SET", "elena_override_mode", mode, "EX", 7200]);
      if (result === "OK") {
        dbSuccess = true;
      }
    }
    return response.status(200).json({ success: true, mode, dbSuccess });
  }

  if (request.method === 'GET') {
    // 1. Проверяем ручной перехват в базе
    let override = null;
    if (kvUrl && kvToken) {
      override = await executeRedisCommand(["GET", "elena_override_mode"]);
    }

    if (override === 'day' || override === 'night') {
      return response.status(200).json({ 
        mode: override, 
        source: 'manual', 
        dbConnected: true 
      });
    }

    // 2. Если перехвата нет, смотрим на часы (Ереван)
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

    // В субботу и воскресенье всегда личная
    if (weekday === 'Sat' || weekday === 'Sun') {
      mode = 'night';
      source = 'weekend';
    } 
    // В будни с 9 до 18 рабочая
    else if (hour >= 9 && hour < 18) {
      mode = 'day';
      source = 'time';
    }

    return response.status(200).json({ 
      mode, 
      source, 
      dbConnected: !!(kvUrl && kvToken) 
    });
  }

  return response.status(405).json({ error: 'Method not allowed' });
}