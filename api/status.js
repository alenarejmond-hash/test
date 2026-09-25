export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('Expires', '0');
  response.setHeader('Access-Control-Allow-Origin', '*');

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

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
      const data = await res.json();
      return data.result;
    } catch (e) {
      console.error("Redis Error:", e);
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
      // Отправляем команду SET на 2 часа (7200 секунд) в самом надежном формате
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