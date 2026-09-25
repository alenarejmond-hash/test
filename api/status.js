import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // 0. ЖЕСТКО ОТКЛЮЧАЕМ КЭШ НА УРОВНЕ СЕРВЕРА VERCEL
  // Это гарантирует, что сервер каждый раз будет заглядывать в Блокнот (KV), а не отдавать старое
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('Expires', '0');
  
  // Добавляем CORS-заголовки, чтобы телефоны не блокировали запросы
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Ответ на preflight-запрос браузера (служебный запрос)
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    // 1. ЕСЛИ ПРИШЕЛ СИГНАЛ ОТ ТВОИХ 5 ТАПОВ (Сохраняем в Блокнот)
    if (request.method === 'POST') {
      let mode = request.body?.mode;
      
      // Предохранитель: если данные пришли в виде строки, а не объекта
      if (!mode && typeof request.body === 'string') {
        try { mode = JSON.parse(request.body).mode; } catch (e) {}
      }
      
      if (!mode) {
         return response.status(400).json({ error: 'Не передан параметр mode' });
      }

      // Записываем твой выбор в базу на 2 часа (7200 секунд)
      await kv.set('elena_override_mode', mode, { ex: 7200 });
      
      return response.status(200).json({ success: true, mode });
    }

    // 2. ЕСЛИ КТО-ТО ОТКРЫЛ ВИЗИТКУ ИЛИ ОТСКАНИРОВАЛ QR (Проверяем, что показать)
    if (request.method === 'GET') {
      // Шаг А: Сначала проверяем Блокнот (вдруг ты только что сделала 5 тапов?)
      const override = await kv.get('elena_override_mode');
      
      if (override === 'day' || override === 'night') {
        // Если есть ручная запись, отдаем её и игнорируем время!
        return response.status(200).json({ mode: override, source: 'manual' });
      }

      // Шаг Б: Если ручного режима нет, смотрим на часы (Время Армении UTC+4)
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

      // Проверяем выходные (Суббота и Воскресенье — всегда личный режим)
      if (weekday === 'Sat' || weekday === 'Sun') {
        return response.status(200).json({ mode: 'night', source: 'weekend' });
      }

      // Проверяем будние дни (с 09:00 до 18:00 — работа, остальное — личное)
      if (hour >= 9 && hour < 18) {
        return response.status(200).json({ mode: 'day', source: 'time' });
      } else {
        return response.status(200).json({ mode: 'night', source: 'time' });
      }
    }

    // Заглушка от неправильных запросов
    return response.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    // Если база данных Vercel вдруг недоступна, мы не ломаем визитку, 
    // а корректно отдаем 500 ошибку. Фронтенд сам переключится на время телефона.
    console.error("Vercel KV Error:", error);
    return response.status(500).json({ error: error.message });
  }
}