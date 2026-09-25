export default async function handler(request, response) {
  // Запрещаем кэширование намертво
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('Expires', '0');
  response.setHeader('Access-Control-Allow-Origin', '*');

  // Ищем ключи доступа от базы данных (Поддерживаем и Vercel KV, и Upstash)
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // Безотказная функция записи (без глючных библиотек)
  async function setMode(mode) {
    if (!kvUrl || !kvToken) return false;
    try {
      await fetch(`${kvUrl}/set/elena_override_mode/${mode}?EX=7200`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      return true;
    } catch (e) { 
      return false; 
    }
  }

  // Безотказная функция чтения
  async function getMode() {
    if (!kvUrl || !kvToken) return null;
    try {
      const res = await fetch(`${kvUrl}/get/elena_override_mode`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      const data = await res.json();
      let val = data.result;
      if (typeof val === 'string') val = val.replace(/"/g, ''); // Очищаем от кавычек
      return val;
    } catch (e) { 
      return null; 
    }
  }

  // 1. ПРИЕМ ТВОИХ 5 ТАПОВ
  if (request.method === 'POST') {
    let mode = request.body?.mode;
    if (!mode && typeof request.body === 'string') {
      try { mode = JSON.parse(request.body).mode; } catch (e) {}
    }
    
    let dbSuccess = false;
    if (mode) {
      dbSuccess = await setMode(mode);
    }
    return response.status(200).json({ success: true, mode, dbSuccess });
  }

  // 2. ОТДАЧА СТАТУСА ПРИ ОТКРЫТИИ (ИЛИ СКАНЕ QR)
  if (request.method === 'GET') {
    // Шаг А: Смотрим, есть ли перехват в базе
    const override = await getMode();
    if (override === 'day' || override === 'night') {
      return response.status(200).json({ 
        mode: override, 
        source: 'manual', 
        dbConnected: !!(kvUrl && kvToken) 
      });
    }

    // Шаг Б: База пустая, смотрим на часы в Армении
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

    if (weekday === 'Sat' || weekday === 'Sun') {
      mode = 'night';
      source = 'weekend';
    } else if (hour >= 9 && hour < 18) {
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