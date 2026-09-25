import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // 1. ЕСЛИ ПРИШЕЛ СИГНАЛ ОТ ТВОИХ 5 ТАПОВ (Сохраняем в Блокнот)
  if (request.method === 'POST') {
    const { mode } = request.body; // получаем 'day' или 'night'
    
    // Записываем твой выбор в базу на 2 часа (7200 секунд)
    // Через 2 часа запись сама сотрется, и визитка вернется к расписанию
    await kv.set('elena_override_mode', mode, { ex: 7200 });
    
    return response.status(200).json({ success: true, mode });
  }

  // 2. ЕСЛИ КТО-ТО ОТКРЫЛ ВИЗИТКУ (Проверяем, что показать)
  if (request.method === 'GET') {
    // Шаг А: Сначала проверяем Блокнот (вдруг ты включила ручной режим?)
    const override = await kv.get('elena_override_mode');
    if (override) {
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
}