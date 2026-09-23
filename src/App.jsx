import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Star, UserCircle2, Diamond, Crown,
  QrCode, Share2, Copy, X, Check,
  RefreshCcw, Play, PlusSquare, UserPlus,
  Smartphone, CreditCard, Key, Sparkles,
  Moon, Brain, PlaneTakeoff, Camera, Activity, 
  Droplets, Building2, Smile, Aperture, ChevronLeft, ExternalLink,
  Phone, Send, Code2, ChefHat, Info
} from 'lucide-react';

// Кастомная иконка Instagram
const Instagram = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// ==========================================
// ⚙️ НАСТРОЙКИ КОНТЕНТА
// ==========================================
const CONTENT = {
  // 🇷🇺 РУССКИЙ ЯЗЫК
  ru: {
    creator: {
      bgImage: '/bg-creator.jpg',
      avatar: '/avatar-creator.jpg', 
      audioGreeting: '/greeting.mp3',
      badge: 'DESIGN & CODE',
      name1: 'ЕЛЕНА',
      name2: 'СОТНИКОВА',
      role: 'Premium Web',
      status: 'Digital Creator & Web Developer',
      quote1: 'Больше, чем просто визитка —',
      quote2: 'ваш главный цифровой актив...',
      websiteText: 'Подробнее...',
      websiteLink: 'https://appseapro.com/',
      actionText: 'ОБСУДИТЬ ПРОЕКТ',
      actionLink: 'https://t.me/elenlime',
    },
    contact: {
      phone: '+37494261123',
      whatsapp: '+79995051277',
      telegram: 'elenlime',
      company: 'Premium Web',
      title: 'Digital Creator & Web Developer',
      website: 'https://appseapro.com/'
    },
    views: {
      profile: {
        title: 'Моя философия',
        desc: <>Я разрабатываю современные PWA-приложения, смарт-визитки и интерактивные системы, которые сохраняются на экран смартфона ваших клиентов в 1 клик. От персонального брендинга экспертов до умных систем приема заказов для ресторанов и салонов красоты. Интегрирую искусственный интеллект (AI), автоматизирую процессы через Telegram и делаю так, чтобы ваш бизнес выглядел дорого.</>,
      },
      solutions: {
        title: 'Мои Решения',
        items: [
          {
            id: 'pwa',
            icon: 'Crown',
            title: 'Цифровые PWA-Визитки',
            short: 'Ваш персональный мини-сайт в телефоне клиента в 1 клик.',
            sheetText: 'Работает без VPN, мгновенно сохраняет контакт.\n\n• Тариф Standart: Стильный шаблонный дизайн под вашу нишу (от 5 700 ₽).\n• Тариф Premium: 100% уникальная разработка с 3D-анимациями (от 15 000 ₽).',
            btns: [
              { text: 'Заказать визитку', link: 'https://t.me/elenlime?text=Елена, привет! Хочу заказать свою визитку', primary: true }
            ]
          },
          {
            id: 'horeca',
            icon: 'ChefHat',
            title: 'Smart HoReCa (PWA-Меню)',
            short: 'Интерактивное QR-меню и прием заказов для ресторанов.',
            sheetText: 'Полноценное приложение вашего заведения без скачивания.\n\n• Гость сканирует QR-код на столе и видит мультиязычное меню.\n• Заказы и вызовы официанта моментально прилетают в Telegram-чат.\n• Управление ценами через Google Таблицу.\n• AI-генерация фуд-фотографий.',
            btns: [
              { text: 'Рассчитать стоимость', link: 'https://t.me/elenlime?text=Привет! Хочу рассчитать стоимость Smart-меню', primary: true },
              { text: 'Смотреть демо', link: 'https://appseapro.com/', primary: false }
            ]
          },
          {
            id: 'web',
            icon: 'Code2',
            title: 'Кастомная Web-разработка',
            short: 'Индивидуальные IT-решения для клиник, салонов и школ.',
            sheetText: 'Нужна онлайн-запись, личный кабинет или каталог товаров? Я соберу легковесное Web-приложение под ваши бизнес-процессы. Быстрее и дешевле классической разработки.',
            btns: [
              { text: 'Обсудить проект', link: 'https://t.me/elenlime?text=Привет! Хочу обсудить web-разработку', primary: true }
            ]
          }
        ]
      },
      nfc: {
        title: 'NFC-Аксессуары',
        price: '2 500 ₽',
        desc: <>Премиальное дополнение к вашим цифровым системам. Я создаю авторские NFC-брелоки из натуральной кожи Crazy Horse.<br/><br/>• <b>Для визиток:</b> Передача контактов прикладыванием брелока.<br/>• <b>Для бизнеса:</b> NFC-метки, встроенные в тейбл-тенты для ресторанов. Гостю не нужно открывать камеру — достаточно приложить телефон к столу!</>,
        btn: 'Заказать аксессуар'
      },
      portfolio: {
        title: 'Портфолио & Демо',
        desc: 'Выберите, что хотите посмотреть:',
        galleryBtn: 'Галерея дизайнов визиток',
        menuBtn: 'Демо Smart-меню',
        videoCaption: 'Посмотрите, как работает магия касания вживую'
      },
      contactsTitle: 'Контакты',
      contacts: { tg: 'Telegram', insta: 'Instagram', phone: 'Позвонить' },
      reviewsTitle: 'Отзывы',
      reviews: [
        { name: 'Виктория', date: '20.03.2026', text: '"Забыла про конструкторы как про страшный сон. Очень плавно, стильно, вайб передается на 100%."' },
        { name: 'Алексей', date: '21.03.2026', text: '"Дизайн просто космос. Клиенты теперь не хотят уходить из моей мини-апп. Конверсия выросла вдвое!"' },
        { name: 'Мария', date: '01.04.2026', text: '"Елена — мастер своего дела. Все продумано до мелочей: от визуала до анимаций."' }
      ]
    },
    ui: {
      shareTitle: 'Поделиться визиткой',
      shareDesc: 'Дайте отсканировать QR-код или отправьте ссылку напрямую.',
      shareText: 'Привет! Вот моя визитка с контактами:',
      copy: 'Копировать',
      copied: 'Скопировано!',
      send: 'Отправить',
      installTitle: 'Установить приложение',
      installDesc: 'Добавьте визитку на экран «Домой», чтобы открывать её в один клик без браузера.',
      installStep1_1: 'Нажмите кнопку ',
      installStep1_2: '«Поделиться»',
      installStep1_3: 'в меню браузера.',
      installStep2_1: 'Выберите ',
      installStep2_2: '«На экран "Домой"»',
      installStep2_3: 'в появившемся списке.',
      done: 'Готово',
      saveContact: 'Сохранено с цифровой визитки',
      comingSoonVideo: 'Скоро здесь появится видео',
      detailsBtn: 'Подробнее'
    },
    conditions: {
      link: 'Условия',
      title: 'Условия работы',
      items: [
          { title: 'Бронирование и оплата', text: 'Работа ведется строго по предварительной записи после внесения предоплаты.' },
          { title: 'Разработка', text: 'Вы получаете готовое решение точно в согласованный срок. Условие — своевременное предоставление всех материалов.' }
      ],
      footer: 'Прозрачность — залог безупречного стиля.\nDesign & Code by Elena Sotnikova.',
      accept: 'ПРИНИМАЮ'
    }
  },

  // 🇬🇧 АНГЛИЙСКИЙ ЯЗЫК
  en: {
    creator: {
      bgImage: '/bg-creator.jpg',
      avatar: '/avatar-creator.jpg', 
      audioGreeting: '/greeting.mp3',
      badge: 'DESIGN & CODE',
      name1: 'ELENA',
      name2: 'SOTNIKOVA',
      role: 'Premium Web',
      status: 'Digital Creator & Web Developer',
      quote1: 'More than a business card —',
      quote2: 'your main digital asset...',
      websiteText: 'Learn more...',
      websiteLink: 'https://appseapro.com/',
      actionText: 'DISCUSS PROJECT',
      actionLink: 'https://t.me/elenlime',
    },
    contact: {
      phone: '+37494261123',
      whatsapp: '+79995051277',
      telegram: 'elenlime',
      company: 'Premium Web',
      title: 'Digital Creator & Web Developer',
      website: 'https://appseapro.com/'
    },
    views: {
      profile: {
        title: 'My Philosophy',
        desc: <>I develop modern PWA applications, smart business cards, and interactive systems that are saved to your clients' smartphone screens in 1 click. From personal branding for experts to smart order systems for restaurants and beauty salons. I integrate artificial intelligence (AI), automate processes via Telegram, and make your business look expensive.</>,
      },
      solutions: {
        title: 'My Solutions',
        items: [
          {
            id: 'pwa',
            icon: 'Crown',
            title: 'Digital PWA Cards',
            short: 'Your personal mini-website in the client\'s phone in 1 click.',
            sheetText: 'Works without VPN, instantly saves contact.\n\n• Standart Plan: Stylish template design for your niche (from $72).\n• Premium Plan: 100% unique development with 3D animations (from $189).',
            btns: [
              { text: 'Order a card', link: 'https://t.me/elenlime', primary: true }
            ]
          },
          {
            id: 'horeca',
            icon: 'ChefHat',
            title: 'Smart HoReCa (PWA Menu)',
            short: 'Interactive QR menu and order processing for restaurants.',
            sheetText: 'A full-fledged app for your establishment without downloading.\n\n• Guests scan a QR code and see a multilingual menu.\n• Orders and waiter calls instantly arrive in a Telegram chat.\n• Price management via Google Sheets.\n• AI generation of food photos.',
            btns: [
              { text: 'Calculate cost', link: 'https://t.me/elenlime', primary: true },
              { text: 'View demo', link: 'https://appseapro.com/', primary: false }
            ]
          },
          {
            id: 'web',
            icon: 'Code2',
            title: 'Custom Web Dev',
            short: 'Individual IT solutions for clinics, salons, and schools.',
            sheetText: 'Need online booking, a personal account, or a product catalog? I will build a lightweight Web application tailored to your business processes. Faster and cheaper than classical development.',
            btns: [
              { text: 'Discuss project', link: 'https://t.me/elenlime', primary: true }
            ]
          }
        ]
      },
      nfc: {
        title: 'NFC Accessories',
        price: '$32',
        desc: <>A premium addition to your digital systems. I create original NFC keychains from genuine Crazy Horse leather.<br/><br/>• <b>For business cards:</b> Transfer contacts by tapping the keychain.<br/>• <b>For business:</b> NFC tags embedded in table tents for restaurants. The guest doesn't need to open the camera — just tap the phone to the table!</>,
        btn: 'Order accessory'
      },
      portfolio: {
        title: 'Portfolio & Demo',
        desc: 'Choose what you want to see:',
        galleryBtn: 'Business Card Gallery',
        menuBtn: 'Smart Menu Demo',
        videoCaption: 'See how the magic of touch works in real life'
      },
      contactsTitle: 'Contacts',
      contacts: { tg: 'Telegram', insta: 'Instagram', phone: 'Call' },
      reviewsTitle: 'Reviews',
      reviews: [
        { name: 'Victoria', date: '20.03.2026', text: '"Forgot about website builders like a bad dream. Very smooth, stylish, the vibe is 100% there."' },
        { name: 'Alexey', date: '21.03.2026', text: '"The design is simply cosmic. Clients now don\'t want to leave my mini-app. Conversions have doubled!"' }
      ]
    },
    ui: {
      shareTitle: 'Share Card',
      shareDesc: 'Let others scan your QR code or send the link directly.',
      shareText: 'Hi! Here is my digital business card:',
      copy: 'Copy',
      copied: 'Copied!',
      send: 'Send',
      installTitle: 'Install App',
      installDesc: 'Add the card to your Home Screen for one-click access.',
      installStep1_1: 'Tap the ',
      installStep1_2: '«Share»',
      installStep1_3: 'button in browser.',
      installStep2_1: 'Select ',
      installStep2_2: '«Add to Home Screen»',
      installStep2_3: '.',
      done: 'Done',
      saveContact: 'Saved from digital business card',
      comingSoonVideo: 'Video will appear here soon',
      detailsBtn: 'Details'
    },
    conditions: {
      link: 'Terms',
      title: 'Terms of Service',
      items: [
          { title: 'Booking & Payment', text: 'Work is strictly by appointment after a prepayment.' }
      ],
      footer: 'Transparency is the key to flawless style.\nDesign & Code by Elena Sotnikova.',
      accept: 'I ACCEPT'
    }
  },

  // 🇦🇲 АРМЯНСКИЙ ЯЗЫК
  hy: {
    creator: {
      bgImage: '/bg-creator.jpg',
      avatar: '/avatar-creator.jpg', 
      audioGreeting: '/greeting.mp3',
      badge: 'DESIGN & CODE',
      name1: 'ԵԼԵՆԱ',
      name2: 'ՍՈՏՆԻԿՈՎԱ',
      role: 'Premium Web',
      status: 'Digital Creator & Web Developer',
      quote1: 'Ավելին, քան պարզապես այցեքարտ՝',
      quote2: 'ձեր գլխավոր թվային ակտիվը...',
      websiteText: 'Ավելին...',
      websiteLink: 'https://appseapro.com/',
      actionText: 'ՔՆՆԱՐԿԵԼ ՆԱԽԱԳԻԾԸ',
      actionLink: 'https://t.me/elenlime',
    },
    contact: {
      phone: '+37494261123',
      whatsapp: '+79995051277',
      telegram: 'elenlime',
      company: 'Premium Web',
      title: 'Digital Creator & Web Developer',
      website: 'https://appseapro.com/'
    },
    views: {
      profile: {
        title: 'Իմ փիլիսոփայությունը',
        desc: <>Ես մշակում եմ ժամանակակից PWA-հավելվածներ, խելացի այցեքարտեր և ինտերակտիվ համակարգեր, որոնք պահպանվում են ձեր հաճախորդների սմարթֆոնների էկրաններին 1 հպումով: Փորձագետների անհատական բրենդինգից մինչև ռեստորանների և գեղեցկության սրահների պատվերների ընդունման խելացի համակարգեր: Ինտեգրում եմ արհեստական բանականություն (AI), ավտոմատացնում գործընթացները Telegram-ի միջոցով և ձեր բիզնեսը դարձնում պրեմիում դասի:</>,
      },
      solutions: {
        title: 'Իմ Լուծումները',
        items: [
          {
            id: 'pwa',
            icon: 'Crown',
            title: 'Թվային PWA Այցեքարտեր',
            short: 'Ձեր անձնական մինի-կայքը հաճախորդի հեռախոսում 1 հպումով:',
            sheetText: 'Աշխատում է առանց VPN-ի, ակնթարթորեն պահպանում է կոնտակտը:\n\n• Standart Տարիֆ. Ոճային ձևանմուշ ձեր ոլորտի համար (սկսած 22 800 ֏): \n• Premium Տարիֆ. 100% անհատական մշակում 3D-անիմացիաներով (սկսած 60 000 ֏):',
            btns: [
              { text: 'Պատվիրել այցեքարտ', link: 'https://t.me/elenlime', primary: true }
            ]
          },
          {
            id: 'horeca',
            icon: 'ChefHat',
            title: 'Smart HoReCa (PWA-Մենյու)',
            short: 'Ինտերակտիվ QR-մենյու և պատվերների ընդունում ռեստորանների համար:',
            sheetText: 'Ձեր հաստատության լիարժեք հավելվածը առանց ներբեռնման:\n\n• Հյուրը սկանավորում է QR-կոդը սեղանին և տեսնում բազմալեզու մենյու:\n• Պատվերները և մատուցողի կանչերը ակնթարթորեն հասնում են Telegram:\n• Գների կառավարում Google Աղյուսակների միջոցով:\n• AI-գեներացված սննդի լուսանկարներ:',
            btns: [
              { text: 'Հաշվել արժեքը', link: 'https://t.me/elenlime', primary: true },
              { text: 'Դիտել դեմո', link: 'https://appseapro.com/', primary: false }
            ]
          },
          {
            id: 'web',
            icon: 'Code2',
            title: 'Անհատական Web-մշակում',
            short: 'Անհատական IT-լուծումներ կլինիկաների, սրահների և դպրոցների համար:',
            sheetText: 'Անհրաժե՞շտ է առցանց գրանցում, անձնական գրասենյակ կամ ապրանքների կատալոգ: Ես կստեղծեմ թեթև Web-հավելված ձեր բիզնես գործընթացների համար: Ավելի արագ և էժան, քան դասական մշակումը:',
            btns: [
              { text: 'Քննարկել նախագիծը', link: 'https://t.me/elenlime', primary: true }
            ]
          }
        ]
      },
      nfc: {
        title: 'NFC-Աքսեսուարներ',
        price: '10 000 ֏',
        desc: <>Պրեմիում հավելում ձեր թվային համակարգերին: Ստեղծում եմ հեղինակային NFC-կախազարդեր բնական Crazy Horse կաշվից:<br/><br/>• <b>Այցեքարտերի համար:</b> Կոնտակտների փոխանցում կախազարդի հպումով:<br/>• <b>Բիզնեսի համար:</b> NFC-պիտակներ ռեստորանների սեղաններին: Հյուրին հարկավոր չէ բացել տեսախցիկը — բավական է հեռախոսը մոտեցնել սեղանին!</>,
        btn: 'Պատվիրել աքսեսուար'
      },
      portfolio: {
        title: 'Պորտֆոլիո և Դեմո',
        desc: 'Ընտրեք, թե ինչ եք ցանկանում դիտել:',
        galleryBtn: 'Այցեքարտերի դիզայնների պատկերասրահ',
        menuBtn: 'Smart-մենյու դեմո',
        videoCaption: 'Տեսեք, թե ինչպես է աշխատում հպման մոգությունը իրականում'
      },
      contactsTitle: 'Կապ',
      contacts: { tg: 'Telegram', insta: 'Instagram', phone: 'Զանգահարել' },
      reviewsTitle: 'Արձագանքներ',
      reviews: [
        { name: 'Վիկտորյա', date: '20.03.2026', text: '"Մոռացել եմ կոնստրուկտորների մասին ինչպես վատ երազի: Շատ սահուն, ոճային, մթնոլորտը փոխանցվում է 100%-ով:"' },
        { name: 'Ալեքսեյ', date: '21.03.2026', text: '"Դիզայնը պարզապես տիեզերք է: Հաճախորդներն այժմ չեն ցանկանում լքել իմ մինի հավելվածը:"' }
      ]
    },
    ui: {
      shareTitle: 'Կիսվել այցեքարտով',
      shareDesc: 'Թույլ տվեք սկանավորել QR-կոդը կամ անմիջապես ուղարկեք հղումը:',
      shareText: 'Ողջույն: Ահա իմ թվային այցեքարտը:',
      copy: 'Պատճենել',
      copied: 'Պատճենված է!',
      send: 'Ուղարկել',
      installTitle: 'Տեղադրել հավելվածը',
      installDesc: 'Ավելացրեք այցեքարտը «Գլխավոր» էկրանին:',
      installStep1_1: 'Սեղմեք ',
      installStep1_2: '«Կիսվել»',
      installStep1_3: ' կոճակը բրաուզերում:',
      installStep2_1: 'Ընտրեք ',
      installStep2_2: '«Ավելացնել Գլխավոր էկրանին»',
      installStep2_3: ':',
      done: 'Պատրաստ է',
      saveContact: 'Պահպանված է թվային այցեքարտից',
      comingSoonVideo: 'Տեսանյութը շուտով կհայտնվի այստեղ',
      detailsBtn: 'Ավելին'
    },
    conditions: {
      link: 'Պայմաններ',
      title: 'Աշխատանքի պայմանները',
      items: [
          { title: 'Ամրագրում և վճարում', text: 'Աշխատանքն իրականացվում է միայն կանխավճարից հետո:' }
      ],
      footer: 'Թափանցիկությունը անթերի ոճի գրավականն է:\nDesign & Code by Elena Sotnikova.',
      accept: 'ԸՆԴՈՒՆՈՒՄ ԵՄ'
    }
  },
  analytics: { yandexMetricaId: '108395630' }
};

const GALLERY_TRANSLATIONS = {
  ru: {
    catalog: "Галерея дизайнов",
    back: "Назад",
    openFull: "Открыть",
    notFound1: "Не нашли свою сферу?",
    notFound2: "Адаптируем любой шаблон под вас",
    templates: [
      { id: 'esoteric', name: 'Эзотерика', icon: Moon, url: 'https://esoteric.appsea.ru' },
      { id: 'psychology', name: 'Психолог', icon: Brain, url: 'https://psychologist.appsea.ru' },
      { id: 'travel', name: 'Турагент', icon: PlaneTakeoff, url: 'https://travel.appsea.ru' },
      { id: 'blogger', name: 'Блогер', icon: Camera, url: 'https://blogger.appsea.ru' },
      { id: 'fitness', name: 'Спорт', icon: Activity, url: 'https://fitness.appsea.ru' },
      { id: 'beauty', name: 'Бьюти', icon: Droplets, url: 'https://beauty.appsea.ru' },
      { id: 'realty', name: 'Недвижимость', icon: Building2, url: 'https://realtor.appsea.ru' },
      { id: 'dentistry', name: 'Стоматология', icon: Smile, url: 'https://dental.appsea.ru' },
      { id: 'photographer', name: 'Фотограф', icon: Aperture, url: 'https://photographer.appsea.ru' },
    ]
  },
  hy: {
    catalog: "Դիզայնների Պատկերասրահ",
    back: "Հետ",
    openFull: "Բացել",
    notFound1: "Չգտա՞ք ձեր ոլորտը",
    notFound2: "Կհարմարեցնենք ցանկացած ձևանմուշ",
    templates: [
      { id: 'esoteric', name: 'Էզոթերիկա', icon: Moon, url: 'https://esoteric.appsea.ru' },
      { id: 'psychology', name: 'Հոգեբան', icon: Brain, url: 'https://psychologist.appsea.ru' },
      { id: 'travel', name: 'Տուրգործակալ', icon: PlaneTakeoff, url: 'https://travel.appsea.ru' },
      { id: 'blogger', name: 'Բլոգեր', icon: Camera, url: 'https://blogger.appsea.ru' },
      { id: 'fitness', name: 'Սպորտ', icon: Activity, url: 'https://fitness.appsea.ru' },
      { id: 'beauty', name: 'Գեղեցկություն', icon: Droplets, url: 'https://beauty.appsea.ru' },
      { id: 'realty', name: 'Անշարժ գույք', icon: Building2, url: 'https://realtor.appsea.ru' },
      { id: 'dentistry', name: 'Ստոմատոլոգիա', icon: Smile, url: 'https://dental.appsea.ru' },
      { id: 'photographer', name: 'Լուսանկարիչ', icon: Aperture, url: 'https://photographer.appsea.ru' },
    ]
  },
  en: {
    catalog: "Design Gallery",
    back: "Back",
    openFull: "Open",
    notFound1: "Didn't find your niche?",
    notFound2: "We will adapt any template for you",
    templates: [
      { id: 'esoteric', name: 'Esoterica', icon: Moon, url: 'https://esoteric.appsea.ru' },
      { id: 'psychology', name: 'Psychologist', icon: Brain, url: 'https://psychologist.appsea.ru' },
      { id: 'travel', name: 'Travel Agent', icon: PlaneTakeoff, url: 'https://travel.appsea.ru' },
      { id: 'blogger', name: 'Blogger', icon: Camera, url: 'https://blogger.appsea.ru' },
      { id: 'fitness', name: 'Sport', icon: Activity, url: 'https://fitness.appsea.ru' },
      { id: 'beauty', name: 'Beauty', icon: Droplets, url: 'https://beauty.appsea.ru' },
      { id: 'realty', name: 'Real Estate', icon: Building2, url: 'https://realtor.appsea.ru' },
      { id: 'dentistry', name: 'Dentistry', icon: Smile, url: 'https://dental.appsea.ru' },
      { id: 'photographer', name: 'Photographer', icon: Aperture, url: 'https://photographer.appsea.ru' },
    ]
  }
};

const globalStyles = `
  html, body {
    background-color: #0a0a0a;
    overscroll-behavior: none;
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; overscroll-behavior: contain; }
  @keyframes float {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateY(-15px) rotateX(2deg) rotateY(-2deg); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .card-preserve-3d { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }
  .card-backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; transform: translateZ(0); -webkit-transform: translateZ(0); }
  @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .animate-scroll { animation: scroll-left 15s linear infinite; }
  @keyframes spark-explode {
    0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
  }
  @keyframes spark-wander {
    0% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
    33% { transform: translate(calc(var(--tx) * 1.5 + var(--wx1)), calc(var(--ty) * 1.5 + var(--wy1))) scale(1.5); opacity: 0.8; }
    66% { transform: translate(calc(var(--tx) * 2.5 + var(--wx2)), calc(var(--ty) * 2.5 + var(--wy2))) scale(1.2); opacity: 0.5; }
    100% { transform: translate(calc(var(--tx) * 4 + var(--wx3)), calc(var(--ty) * 4 + var(--wy3))) scale(0.8); opacity: 0; }
  }
  .spark-particle {
    position: absolute; border-radius: 50%; background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4); pointer-events: none;
    animation: spark-explode 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards, spark-wander var(--wt) linear 0.8s forwards;
  }
  @media (min-width: 640px) {
    @keyframes burn-mask-reveal {
      0% { -webkit-mask-position: 100% 0%; mask-position: 100% 0%; }
      100% { -webkit-mask-position: 0% 100%; mask-position: 0% 100%; }
    }
    @keyframes burn-fire-scan {
      0% { background-position: 100% 0%; opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { background-position: 0% 100%; opacity: 0; }
    }
    .smooth-mask-wipe {
      -webkit-mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%); mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      -webkit-mask-size: 300% 300%; mask-size: 300% 300%; -webkit-mask-position: 100% 0%; mask-position: 100% 0%;
      animation: burn-mask-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) forwards; will-change: mask-position, -webkit-mask-position;
    }
    .burn-fire-edge {
      background: linear-gradient(224deg, transparent 48.5%, rgba(20, 5, 0, 0.95) 49%, var(--burn-c1, rgba(220, 38, 38, 0.9)) 49.5%, var(--burn-c2, rgba(250, 150, 0, 1)) 50%, var(--burn-c3, rgba(255, 220, 50, 0.8)) 50.2%, transparent 51%),
                  linear-gradient(226deg, transparent 48.5%, rgba(20, 5, 0, 0.95) 49%, var(--burn-c1, rgba(220, 38, 38, 0.9)) 49.5%, var(--burn-c2, rgba(250, 150, 0, 1)) 50%, var(--burn-c3, rgba(255, 220, 50, 0.8)) 50.2%, transparent 51%);
      background-size: 300% 300%; background-position: 100% 0%; mix-blend-mode: normal; filter: drop-shadow(0 0 8px var(--burn-c2, rgba(250, 100, 0, 0.8))) blur(0.5px);
      animation: burn-fire-scan 3s cubic-bezier(0.4, 0, 0.2, 1) forwards; will-change: background-position, opacity;
    }
  }
  @media (max-width: 639px) {
    @keyframes mobile-fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
    .smooth-mask-wipe { opacity: 0; animation: mobile-fade-in 1.5s ease-out forwards; will-change: opacity; }
    .burn-fire-edge { display: none; }
  }
  @keyframes esoteric-slow-drift-1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes esoteric-slow-drift-2 { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
  .mask-image-bottom { -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%); mask-image: linear-gradient(to bottom, black 80%, transparent 100%); }
  @keyframes equalize { 0%, 100% { height: 4px; } 50% { height: 16px; } }
  .audio-bar { width: 3px; background-color: #fb7185; border-radius: 2px; animation: equalize 1s infinite ease-in-out; }
  @keyframes water-ripple-anim {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; border: 3px solid rgba(255, 255, 255, 0.6); box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.4); filter: blur(1px); }
    100% { transform: translate(-50%, -50%) scale(4); opacity: 0; border: 1px solid rgba(255, 255, 255, 0); box-shadow: 0 0 50px rgba(255, 255, 255, 0), inset 0 0 50px rgba(255, 255, 255, 0); filter: blur(4px); }
  }
  .water-ripple-element {
    position: absolute; border-radius: 50%; width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 70%);
    animation: water-ripple-anim 0.9s cubic-bezier(0.1, 0.5, 0.3, 1) forwards; pointer-events: none; z-index: 100;
  }
  .carousel-gradient-mask {
    -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
    mask-image: linear-gradient(to right, black 85%, transparent 100%);
  }
`;

if (typeof document !== 'undefined' && !document.getElementById('app-global-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'app-global-styles';
  styleEl.innerHTML = globalStyles;
  document.head.appendChild(styleEl);
}

const triggerVibration = (pattern = 15) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

const BurnRevealImage = ({ src, className, style, imgClassName = "", burnColor = "wine", startBurn = true }) => {
  const themes = {
    wine: { c1: 'rgba(88, 11, 37, 0.9)', c2: 'rgba(159, 18, 57, 1)', c3: 'rgba(225, 29, 72, 0.8)' }
  };
  const t = themes[burnColor] || themes.wine;
  return (
    <div className={`absolute inset-0 pointer-events-none rounded-[2.5rem] ${className}`} style={{ ...style, clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)' }}>
      <div className={`absolute inset-0 bg-cover bg-center rounded-[2.5rem] ${imgClassName} ${startBurn ? 'smooth-mask-wipe' : 'opacity-0'}`} style={{ backgroundImage: `url(${src})` }} />
      {startBurn && <div className="absolute inset-0 burn-fire-edge rounded-[2.5rem]" style={{ '--burn-c1': t.c1, '--burn-c2': t.c2, '--burn-c3': t.c3 }} />}
    </div>
  );
};

const CreatorCard = ({ lang, isFlipped, onOpenIframe, onOpenGallery, onOpenConditions, onOpenSheet }) => {
  const [view, setView] = useState('profile');
  const [isNameRevealed, setIsNameRevealed] = useState(true);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [sequenceDone, setSequenceDone] = useState(false);
  
  const hackerName1 = CONTENT[lang].creator.name1;
  const hackerName2 = CONTENT[lang].creator.name2;

  useEffect(() => {
    if (isFlipped && !sequenceDone) {
      let i = 0;
      setHighlightIndex(0); 
      const interval = setInterval(() => {
        i++;
        if (i <= 5) { 
          setHighlightIndex(i); 
        } else if (i === 6) {
          setHighlightIndex(0); 
        } else {
          setSequenceDone(true); 
          setHighlightIndex(-1); 
          clearInterval(interval);
        }
      }, 500); 
      return () => clearInterval(interval);
    }
  }, [isFlipped, sequenceDone]);

  // Навигация (5 элементов сверху, 1 отзывы снизу)
  const mainItems = [
    { id: 'profile', icon: UserCircle2 },
    { id: 'solutions', icon: Diamond, highlight: true }, // Карусель решений
    { id: 'nfc', icon: Key }, // NFC-аксессуары
    { id: 'portfolio', icon: Smartphone }, // Портфолио & Демо (Видео)
    { id: 'contacts', icon: Phone }, // Контакты
  ];

  const isReviewSeqActive = highlightIndex === 5;
  const isReviewViewActive = view === 'reviews';
  const isReviewActive = isReviewViewActive || isReviewSeqActive;

  return (
    <>
      {/* ЛИЦЕВАЯ СТОРОНА */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(159,18,57,0.4)] overflow-hidden bg-[#0a0103] text-white flex flex-col p-[clamp(1rem,6cqw,1.5rem)] group-hover:shadow-[0_20px_80px_rgba(159,18,57,0.6)] transition-shadow duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-[#380e1b] via-[#0f0206] to-[#1f030e]"></div>
        <div className="absolute -inset-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/30 via-transparent to-transparent animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-500/25 via-transparent to-transparent mix-blend-normal sm:mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-900/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-black/80 via-[15%] to-transparent to-[30%] pointer-events-none z-0 rounded-[2.5rem]"></div>
        <BurnRevealImage src={CONTENT[lang].creator.bgImage} className="grayscale-[0.2]" burnColor="wine" startBurn={isNameRevealed} />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start shrink-0">
            <div className="bg-[#151515]/95 sm:bg-black/80 px-[clamp(0.75rem,4cqw,1rem)] py-[clamp(0.375rem,2cqw,0.5rem)] rounded-full border border-rose-900/50 flex items-center gap-[clamp(0.375rem,2cqw,0.5rem)]">
              <Crown className="w-[clamp(0.75rem,4cqw,1rem)] h-[clamp(0.75rem,4cqw,1rem)] text-rose-400" />
              <span className="text-[clamp(0.6rem,3cqw,0.75rem)] font-serif tracking-widest uppercase text-rose-200/90">{CONTENT[lang].creator.badge}</span>
            </div>
            <RefreshCcw className="w-[clamp(1.5rem,8cqw,2rem)] h-[clamp(1.5rem,8cqw,2rem)] text-rose-300/60 drop-shadow-[0_0_10px_rgba(159,18,57,0.5)]" />
          </div>

          <div className="text-center pb-[clamp(0.375rem,2cqw,0.5rem)] shrink-0">
            <h2 className="text-[clamp(1.25rem,8cqw,2.25rem)] leading-tight font-serif mb-[clamp(0.375rem,2cqw,0.5rem)] uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-white to-rose-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {hackerName1}<br />{hackerName2}
            </h2>
            <div className="flex flex-col items-center gap-[clamp(0.5rem,3cqw,0.75rem)] mt-[clamp(0.5rem,3cqw,0.75rem)]">
              <p className="font-serif text-[clamp(0.625rem,3cqw,0.75rem)] text-rose-100/70 italic tracking-wider max-w-[85%] mx-auto">
                "{CONTENT[lang].creator.quote1} {CONTENT[lang].creator.quote2}"
              </p>
              <div className="flex items-center gap-[clamp(0.25rem,1.5cqw,0.375rem)] bg-black/50 px-[clamp(0.5rem,3cqw,0.75rem)] py-[clamp(0.25rem,1.5cqw,0.375rem)] rounded-full border border-rose-900/50 mt-[clamp(0.125rem,1cqw,0.25rem)]">
                <span className="w-[clamp(0.25rem,1.5cqw,0.375rem)] h-[clamp(0.25rem,1.5cqw,0.375rem)] rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(225,29,72,0.8)]"></span>
                <span className="text-[clamp(0.5rem,2cqw,0.5625rem)] font-bold uppercase tracking-widest text-rose-200">{CONTENT[lang].creator.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ОБРАТНАЯ СТОРОНА */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(159,18,57,0.4)] overflow-hidden bg-[#0a0205] flex flex-row p-[clamp(0.75rem,4cqw,1rem)] gap-[clamp(0.75rem,4cqw,1rem)] text-white border border-rose-900/40" style={{ transform: 'rotateY(180deg) translateZ(0)' }}>
        <div className="absolute -top-[20%] -left-[20%] w-[160%] aspect-square rounded-full border border-rose-500/10 border-dashed pointer-events-none" style={{ animation: 'esoteric-slow-drift-1 90s linear infinite', transformOrigin: '45% 55%' }}></div>
        <div className="absolute -bottom-[30%] -right-[30%] w-[140%] aspect-square rounded-full border-[1.5px] border-rose-900/20 pointer-events-none" style={{ animation: 'esoteric-slow-drift-2 100s linear infinite', transformOrigin: '55% 45%' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-rose-900/20 blur-[50px] pointer-events-none"></div>

        {/* === ЛЕВАЯ ПАНЕЛЬ (DOCK) === */}
        <div 
          className="relative z-40 flex flex-col items-center justify-between bg-[#0a0205] sm:bg-[#0a0205]/95 py-[clamp(0.75rem,4cqw,1.25rem)] px-[clamp(0.5rem,2.5cqw,0.75rem)] rounded-[2rem] border border-rose-900/50 shadow-[0_10px_40px_rgba(159,18,57,0.3)] w-[clamp(3rem,14cqw,4rem)] shrink-0 no-tilt cursor-default overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-x-0 bottom-[clamp(4.5rem,18cqw,5.5rem)] flex items-center justify-center pointer-events-none z-0">
             <span className="text-[clamp(2.5rem,10cqw,3.5rem)] font-sans font-black uppercase text-white/10 select-none whitespace-nowrap tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] mix-blend-screen" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {lang === 'ru' ? 'МЕНЮ' : lang === 'en' ? 'MENU' : 'ՄԵՆՅՈՒ'}
             </span>
          </div>

          <div className="flex flex-col gap-[clamp(0.625rem,3cqw,0.875rem)] w-full items-center relative z-10 shrink-0">
            {mainItems.map((item, idx) => {
              const isSeqActive = highlightIndex === idx;
              const isViewActive = view === item.id;
              const isActive = isViewActive || isSeqActive;
              return (
                <button 
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`relative aspect-square rounded-full transition-all duration-300 flex items-center justify-center w-full p-0 ${item.highlight && !isActive ? 'mt-[clamp(0.375rem,2cqw,0.5rem)] border border-rose-500/50 bg-rose-900/20 shadow-[0_0_10px_rgba(225,29,72,0.3)] animate-pulse' : ''} ${item.highlight && isActive ? 'mt-[clamp(0.375rem,2cqw,0.5rem)]' : ''} ${isActive ? 'bg-gradient-to-br from-rose-700 to-rose-400 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)] scale-110' : 'text-rose-400/60 hover:text-rose-200 hover:bg-rose-900/40'}`}
                >
                  <item.icon className="w-[clamp(1.125rem,5cqw,1.375rem)] h-[clamp(1.125rem,5cqw,1.375rem)]" />
                </button>
              );
            })}
          </div>
          
          <div className="flex-1 w-full min-h-[2rem] relative z-10"></div>

          <div className="w-full flex flex-col items-center gap-[clamp(0.5rem,2.5cqw,0.75rem)] relative z-10 mt-[clamp(0.5rem,2.5cqw,0.75rem)] shrink-0">
            <div className="w-[clamp(1.5rem,6cqw,2rem)] h-[1px] bg-rose-900/60"></div>
            <button 
              onClick={() => setView('reviews')}
              className={`aspect-square w-full rounded-full transition-all duration-300 flex items-center justify-center p-0 ${isReviewActive ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.6)] scale-110' : 'text-rose-400/60 hover:text-rose-200 hover:bg-rose-900/40'}`}
            >
              <Star className="w-[clamp(1.125rem,5cqw,1.375rem)] h-[clamp(1.125rem,5cqw,1.375rem)]" />
            </button>
          </div>
        </div>

        {/* === ПРАВАЯ ЧАСТЬ (КОНТЕНТ) === */}
        <div className="relative z-10 flex-1 flex flex-col h-full overflow-hidden">
          
          <div className="relative flex-1 w-full overflow-hidden">
            {/* 1. ФИЛОСОФИЯ */}
            <div className={`absolute inset-0 flex flex-col pt-[clamp(0.125rem,1cqw,0.25rem)] transition-all duration-500 ease-in-out ${view === 'profile' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="w-[clamp(2rem,8cqw,2.5rem)] h-[clamp(2rem,8cqw,2.5rem)] rounded-full bg-rose-900/30 border border-rose-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shrink-0 shadow-[0_0_15px_rgba(159,18,57,0.2)]">
                <UserCircle2 className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-rose-300" />
              </div>
              <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-light text-rose-100 tracking-wider mb-[clamp(0.375rem,2cqw,0.5rem)] shrink-0">{CONTENT[lang].views.profile.title}</h3>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar mask-image-bottom pb-[clamp(1.5rem,8cqw,2.5rem)] pr-[clamp(0.125rem,1cqw,0.25rem)] no-tilt touch-pan-y overscroll-contain flex flex-col">
                <p className="font-serif text-[clamp(0.65rem,3.5cqw,0.8rem)] text-rose-100/90 leading-relaxed bg-[#151515]/95 sm:bg-black/80 p-[clamp(0.875rem,5cqw,1rem)] rounded-2xl border border-rose-900/50 shadow-inner shrink-0 block">
                  {CONTENT[lang].views.profile.desc}
                </p>
              </div>
            </div>

            {/* 2. МОИ РЕШЕНИЯ (КАРУСЕЛЬ) */}
            <div className={`absolute inset-0 flex flex-col pt-[clamp(0.125rem,1cqw,0.25rem)] transition-all duration-500 ease-in-out ${view === 'solutions' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-4 pointer-events-none z-0'}`}>
              <div className="w-[clamp(2rem,8cqw,2.5rem)] h-[clamp(2rem,8cqw,2.5rem)] rounded-full bg-rose-900/30 border border-rose-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shrink-0 shadow-[0_0_15px_rgba(159,18,57,0.2)]">
                <Diamond className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-rose-300" />
              </div>
              <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-light text-rose-100 tracking-wider mb-[clamp(0.375rem,2cqw,0.5rem)] shrink-0">{CONTENT[lang].views.solutions.title}</h3>
              
              {/* Карусель */}
              <div 
                className="flex flex-row gap-[clamp(0.5rem,3cqw,0.75rem)] overflow-x-auto touch-pan-x snap-x snap-mandatory hide-scrollbar carousel-gradient-mask pb-2 pt-1 no-tilt"
                onClick={e => e.stopPropagation()}
              >
                {CONTENT[lang].views.solutions.items.map((item, idx) => {
                  const IconC = { Crown, ChefHat, Code2 }[item.icon];
                  return (
                    <div 
                      key={idx} 
                      className="w-[70%] shrink-0 snap-start bg-[#151515]/95 sm:bg-black/80 p-[clamp(0.75rem,4cqw,1rem)] rounded-2xl border border-rose-900/50 shadow-inner flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-full bg-rose-900/40 flex items-center justify-center mb-3 border border-rose-500/30 shadow-[0_0_10px_rgba(225,29,72,0.2)]">
                           {IconC && <IconC className="w-4 h-4 text-rose-300" />}
                        </div>
                        <h4 className="text-[clamp(0.7rem,3.5cqw,0.875rem)] font-bold text-rose-200 mb-1">{item.title}</h4>
                        <p className="text-[clamp(0.55rem,2.8cqw,0.65rem)] text-rose-100/60 leading-tight line-clamp-3">{item.short}</p>
                      </div>
                      <button 
                        onClick={() => onOpenSheet(item)}
                        className="mt-4 w-full bg-rose-900/30 hover:bg-rose-900/50 border border-rose-500/30 py-1.5 rounded-lg text-rose-200 text-[clamp(0.5rem,2.5cqw,0.6rem)] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(159,18,57,0.1)] active:scale-95"
                      >
                        {CONTENT[lang].ui.detailsBtn} <Info className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. NFC БРЕЛОК */}
            <div className={`absolute inset-0 flex flex-col pt-[clamp(0.125rem,1cqw,0.25rem)] transition-all duration-500 ease-in-out ${view === 'nfc' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="flex items-center justify-between mb-[clamp(0.5rem,3cqw,0.75rem)] shrink-0">
                <div className="w-[clamp(2rem,8cqw,2.5rem)] h-[clamp(2rem,8cqw,2.5rem)] rounded-full bg-rose-900/30 border border-rose-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(159,18,57,0.2)]">
                  <Key className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-rose-300" />
                </div>
                <div className="bg-rose-500/20 border border-rose-400/30 px-[clamp(0.5rem,3cqw,0.625rem)] py-[clamp(0.2rem,1.5cqw,0.25rem)] rounded-full flex items-center justify-center whitespace-nowrap shadow-[0_0_15px_rgba(225,29,72,0.2)]">
                  <span className="text-[clamp(0.55rem,2.5cqw,0.625rem)] font-bold uppercase tracking-widest text-rose-200">{CONTENT[lang].views.nfc.price}</span>
                </div>
              </div>
              <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-light text-rose-100 tracking-wider mb-[clamp(0.375rem,2cqw,0.5rem)] shrink-0">{CONTENT[lang].views.nfc.title}</h3>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar mask-image-bottom pb-[clamp(1.5rem,8cqw,2.5rem)] pr-[clamp(0.125rem,1cqw,0.25rem)] no-tilt touch-pan-y overscroll-contain flex flex-col gap-3">
                <p className="font-serif text-[clamp(0.6rem,3cqw,0.6875rem)] text-rose-100/80 leading-relaxed bg-[#151515]/95 sm:bg-black/80 p-[clamp(0.75rem,4cqw,0.875rem)] rounded-2xl border border-rose-900/50 shadow-inner block shrink-0">
                  {CONTENT[lang].views.nfc.desc}
                </p>
                <a 
                   href="https://t.me/elenlime?text=Привет! Хочу заказать NFC-аксессуар"
                   target="_blank" rel="noopener noreferrer"
                   className="w-full text-center py-2.5 rounded-xl font-bold text-[clamp(0.6rem,3cqw,0.7rem)] uppercase tracking-wider transition-all active:scale-95 bg-white/5 border border-white/10 text-rose-200 hover:bg-white/10 block no-tilt"
                   onClick={e => e.stopPropagation()}
                >
                   {CONTENT[lang].views.nfc.btn}
                </a>
              </div>
            </div>

            {/* 4. ПОРТФОЛИО & ДЕМО (ВИДЕО + КНОПКИ) */}
            <div className={`absolute inset-0 flex flex-col pt-[clamp(0.125rem,1cqw,0.25rem)] transition-all duration-500 ease-in-out ${view === 'portfolio' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="w-[clamp(2rem,8cqw,2.5rem)] h-[clamp(2rem,8cqw,2.5rem)] rounded-full bg-rose-900/30 border border-rose-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shrink-0 shadow-[0_0_15px_rgba(159,18,57,0.2)]">
                <Smartphone className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-rose-300" />
              </div>
              <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-light text-rose-100 tracking-wider mb-[clamp(0.375rem,2cqw,0.5rem)] shrink-0">{CONTENT[lang].views.portfolio.title}</h3>
              <p className="font-serif text-[clamp(0.6rem,3cqw,0.6875rem)] text-rose-100/70 mb-[clamp(0.75rem,4cqw,1.25rem)] shrink-0 px-[clamp(0.125rem,1cqw,0.25rem)]">{CONTENT[lang].views.portfolio.desc}</p>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar mask-image-bottom pb-[clamp(1.5rem,8cqw,2.5rem)] pr-[clamp(0.125rem,1cqw,0.25rem)] flex flex-col gap-[clamp(0.5rem,3cqw,0.75rem)] no-tilt touch-pan-y overscroll-contain">
                 {/* Кнопки Демо/Галереи */}
                 <div className="flex flex-col gap-2 shrink-0">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onOpenGallery(); }}
                      className="bg-[#151515]/95 sm:bg-black/80 p-3 rounded-2xl border border-rose-900/50 shadow-inner flex justify-between items-center hover:bg-rose-900/20 hover:border-rose-500/50 transition-all group w-full"
                    >
                      <div className="text-rose-200 text-[clamp(0.65rem,3.2cqw,0.75rem)] font-bold">{CONTENT[lang].views.portfolio.galleryBtn}</div>
                      <ChevronLeft className="w-4 h-4 text-rose-500/40 group-hover:text-rose-400 rotate-180 transition-all" />
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onOpenIframe('https://appseapro.com/'); }}
                      className="bg-[#151515]/95 sm:bg-black/80 p-3 rounded-2xl border border-rose-900/50 shadow-inner flex justify-between items-center hover:bg-rose-900/20 hover:border-rose-500/50 transition-all group w-full"
                    >
                      <div className="text-rose-200 text-[clamp(0.65rem,3.2cqw,0.75rem)] font-bold">{CONTENT[lang].views.portfolio.menuBtn}</div>
                      <ChevronLeft className="w-4 h-4 text-rose-500/40 group-hover:text-rose-400 rotate-180 transition-all" />
                    </button>
                 </div>

                 {/* Видео-Плейсхолдер */}
                 <div 
                   className="relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer border border-rose-900/50 shadow-inner mt-2 shrink-0" 
                   onClick={(e) => { e.stopPropagation(); onOpenIframe('/promo.mp4'); }}
                 >
                   <img src="/bg-creator.jpg" alt="Video cover" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity grayscale-[0.3]" />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <div className="w-10 h-10 rounded-full bg-rose-600/95 flex items-center justify-center border border-rose-400 group-hover:scale-110 shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-transform mb-2">
                         <Play className="w-4 h-4 text-white ml-1" />
                      </div>
                      <span className="text-rose-100 text-[clamp(0.5rem,2.5cqw,0.6rem)] text-center font-medium bg-black/80 px-3 py-1.5 rounded-full border border-white/10 leading-tight">
                        {CONTENT[lang].views.portfolio.videoCaption}
                      </span>
                   </div>
                 </div>
              </div>
            </div>

            {/* 5. КОНТАКТЫ */}
            <div className={`absolute inset-0 flex flex-col pt-[clamp(0.125rem,1cqw,0.25rem)] transition-all duration-500 ease-in-out ${view === 'contacts' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="w-[clamp(2rem,8cqw,2.5rem)] h-[clamp(2rem,8cqw,2.5rem)] rounded-full bg-rose-900/30 border border-rose-500/30 flex items-center justify-center mb-[clamp(0.5rem,3cqw,0.75rem)] shrink-0 shadow-[0_0_15px_rgba(159,18,57,0.2)]">
                <Phone className="w-[clamp(1rem,4cqw,1.25rem)] h-[clamp(1rem,4cqw,1.25rem)] text-rose-300" />
              </div>
              <h3 className="text-[clamp(1rem,6cqw,1.25rem)] font-serif font-light text-rose-100 tracking-wider mb-[clamp(1.5rem,6cqw,2rem)] shrink-0">{CONTENT[lang].views.contactsTitle}</h3>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-[clamp(0.5rem,3cqw,0.75rem)] pb-[clamp(1.5rem,8cqw,2.5rem)] pr-[clamp(0.125rem,1cqw,0.25rem)] no-tilt touch-pan-y overscroll-contain">
                
                <a href="https://t.me/appseapro" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="bg-[#151515]/95 sm:bg-black/80 p-[clamp(0.625rem,3cqw,0.75rem)] rounded-2xl border border-rose-900/50 shadow-inner flex items-center gap-3 cursor-pointer hover:bg-rose-900/20 hover:border-rose-500/50 transition-all group shrink-0">
                  <div className="w-[clamp(1.5rem,6cqw,2rem)] h-[clamp(1.5rem,6cqw,2rem)] rounded-full bg-rose-900/40 border border-rose-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(159,18,57,0.2)] shrink-0">
                    <Send className="w-[clamp(0.75rem,3.5cqw,1rem)] h-[clamp(0.75rem,3.5cqw,1rem)] text-rose-300 -ml-0.5" />
                  </div>
                  <span className="text-rose-200 text-[clamp(0.7rem,3.5cqw,0.875rem)] font-bold">{CONTENT[lang].views.contacts.tg}</span>
                </a>

                <a href="https://instagram.com/appseapro" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="bg-[#151515]/95 sm:bg-black/80 p-[clamp(0.625rem,3cqw,0.75rem)] rounded-2xl border border-rose-900/50 shadow-inner flex items-center gap-3 cursor-pointer hover:bg-rose-900/20 hover:border-rose-500/50 transition-all group shrink-0">
                  <div className="w-[clamp(1.5rem,6cqw,2rem)] h-[clamp(1.5rem,6cqw,2rem)] rounded-full bg-rose-900/40 border border-rose-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(159,18,57,0.2)] shrink-0">
                    <Instagram className="w-[clamp(0.75rem,3.5cqw,1rem)] h-[clamp(0.75rem,3.5cqw,1rem)] text-rose-300" />
                  </div>
                  <span className="text-rose-200 text-[clamp(0.7rem,3.5cqw,0.875rem)] font-bold">{CONTENT[lang].views.contacts.insta}</span>
                </a>

                <a href="tel:+37494261123" onClick={(e) => e.stopPropagation()} className="bg-[#151515]/95 sm:bg-black/80 p-[clamp(0.625rem,3cqw,0.75rem)] rounded-2xl border border-rose-900/50 shadow-inner flex items-center gap-3 cursor-pointer hover:bg-rose-900/20 hover:border-rose-500/50 transition-all group shrink-0">
                  <div className="w-[clamp(1.5rem,6cqw,2rem)] h-[clamp(1.5rem,6cqw,2rem)] rounded-full bg-rose-900/40 border border-rose-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(159,18,57,0.2)] shrink-0">
                    <Phone className="w-[clamp(0.75rem,3.5cqw,1rem)] h-[clamp(0.75rem,3.5cqw,1rem)] text-rose-300" />
                  </div>
                  <span className="text-rose-200 text-[clamp(0.7rem,3.5cqw,0.875rem)] font-bold">{CONTENT[lang].views.contacts.phone}</span>
                </a>

              </div>
            </div>

            {/* 6. ОТЗЫВЫ */}
            <div className={`absolute inset-0 flex flex-col pt-[clamp(0.125rem,1cqw,0.25rem)] transition-all duration-500 ease-in-out ${view === 'reviews' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="flex items-center gap-[clamp(0.5rem,3cqw,0.75rem)] mb-[clamp(0.5rem,3cqw,0.75rem)] shrink-0">
                <div className="w-[clamp(1.5rem,6cqw,2rem)] h-[clamp(1.5rem,6cqw,2rem)] rounded-full bg-rose-900/30 border border-rose-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(159,18,57,0.2)]">
                  <Star className="w-[clamp(0.75rem,4cqw,1rem)] h-[clamp(0.75rem,4cqw,1rem)] text-rose-300" />
                </div>
                <h3 className="text-[clamp(0.875rem,5cqw,1.125rem)] font-serif font-light text-rose-100 tracking-wider">{CONTENT[lang].views.reviewsTitle}</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-[clamp(0.5rem,2.5cqw,0.625rem)] pb-[clamp(1.5rem,8cqw,2.5rem)] pr-[clamp(0.125rem,1cqw,0.25rem)] mask-image-bottom no-tilt touch-pan-y overscroll-contain">
                {CONTENT[lang].views.reviews.map((rev, idx) => (
                  <div key={idx} className="bg-[#151515]/95 sm:bg-black/80 p-[clamp(0.625rem,3cqw,0.75rem)] rounded-2xl border border-rose-900/50 shadow-inner relative shrink-0 block">
                    <div className="flex justify-between items-center mb-[clamp(0.25rem,1.5cqw,0.375rem)] px-[clamp(0.125rem,1cqw,0.25rem)]">
                      <div className="flex items-center gap-[clamp(0.25rem,2cqw,0.5rem)]">
                        <span className="text-[clamp(0.55rem,2.5cqw,0.625rem)] text-rose-200/90 font-medium">{rev.name}</span>
                        {rev.date && <span className="text-[clamp(0.45rem,2cqw,0.5rem)] text-rose-500/60">{rev.date}</span>}
                      </div>
                      <div className="flex gap-[clamp(0.0625rem,0.5cqw,0.125rem)] shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-[clamp(0.5rem,2.5cqw,0.625rem)] h-[clamp(0.5rem,2.5cqw,0.625rem)] fill-rose-400 text-rose-400" />
                        ))}
                      </div>
                    </div>
                    <p className="font-serif text-[clamp(0.6rem,3cqw,0.6875rem)] text-rose-100/80 leading-relaxed italic px-[clamp(0.125rem,1cqw,0.25rem)]">
                      {rev.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Главная кнопка внизу */}
          <div className="mt-[clamp(0.5rem,3cqw,0.75rem)] w-full no-tilt cursor-default relative z-20 flex flex-col items-center gap-[clamp(0.25rem,1.5cqw,0.375rem)] shrink-0" onClick={(e) => e.stopPropagation()}>
            <a href={CONTENT[lang].creator.actionLink} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-[#380e1b] to-black text-rose-100 font-serif text-[clamp(0.6rem,3cqw,0.6875rem)] uppercase tracking-[0.15em] py-[clamp(0.75rem,4cqw,1rem)] rounded-2xl flex items-center justify-center gap-[clamp(0.375rem,2cqw,0.5rem)] hover:from-[#4a1223] transition-all shadow-[0_0_25px_rgba(159,18,57,0.3)] border border-rose-800/50 group active:scale-95 shrink-0">
              <Crown className="w-[clamp(0.75rem,4cqw,1rem)] h-[clamp(0.75rem,4cqw,1rem)] text-rose-400 group-hover:scale-110 transition-transform shrink-0" />
              {CONTENT[lang].creator.actionText} →
            </a>
            <div className="mt-[clamp(0.125rem,1cqw,0.25rem)] text-center text-[clamp(0.5rem,2.5cqw,0.6rem)] text-rose-100/40 uppercase tracking-widest cursor-pointer hover:text-rose-100/80 transition-colors font-light" onClick={(e) => { e.stopPropagation(); onOpenConditions(); }}>
              {CONTENT[lang].conditions.link}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DesignGalleryModal = ({ onClose, lang }) => {
  const [previewInfo, setPreviewInfo] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [ripples, setRipples] = useState([]);
  const t = GALLERY_TRANSLATIONS[lang];

  const handlePointerDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => { setRipples(prev => prev.filter(r => r.id !== id)); }, 900);
  };

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#050102]/95 backdrop-blur-3xl animate-in fade-in duration-300 touch-none overflow-hidden" onPointerDown={handlePointerDown}>
      {ripples.map(r => <div key={r.id} className="water-ripple-element" style={{ left: r.x, top: r.y }} />)}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative flex items-center justify-between px-4 max-[380px]:px-3 border-b border-rose-900/50 bg-[#0a0205]/80 shrink-0 z-20 shadow-lg h-[50px] max-[380px]:h-[44px]">
        <div className="flex items-center w-1/4">
           <div className="w-7 h-7 max-[380px]:w-6 max-[380px]:h-6 rounded-full bg-rose-900/30 border border-rose-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(159,18,57,0.2)] shrink-0">
              <Crown className="w-3.5 h-3.5 max-[380px]:w-3 max-[380px]:h-3 text-rose-400" />
           </div>
        </div>
        <div className="w-1/4 flex justify-end">
           <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 max-[380px]:p-1.5 transition-colors border border-white/5 active:scale-95">
             <X className="w-4 h-4 max-[380px]:w-3.5 max-[380px]:h-3.5" />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar relative pb-12 pt-6 max-[380px]:pt-4 touch-pan-y overscroll-contain">
        <div className="max-w-xl mx-auto w-full px-5 max-[380px]:px-4 relative z-10 flex flex-col">
           <div className="flex flex-col gap-3 max-[380px]:gap-2.5 w-full">
               {t.templates.map(link => (
                  <div key={link.id} className="relative group w-full">
                     <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-rose-500/20 rounded-2xl max-[380px]:rounded-[1.25rem] blur-[8px] opacity-30 group-hover:opacity-100 group-hover:blur-[12px] transition-all duration-500 pointer-events-none"></div>
                     <button onClick={(e) => { e.stopPropagation(); setIframeLoaded(false); setPreviewInfo(link); }} className="relative w-full overflow-hidden flex flex-row items-center p-3 max-[380px]:p-2.5 rounded-2xl max-[380px]:rounded-[1.25rem] bg-[#0a0205]/95 border border-rose-900/50 hover:border-rose-500/50 hover:bg-[#15050a] transition-all duration-300 active:scale-[0.98] shadow-inner text-left">
                       <div className="absolute inset-0 bg-gradient-to-r from-rose-900/0 via-rose-900/0 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       <div className="w-12 h-12 max-[380px]:w-10 max-[380px]:h-10 rounded-full bg-rose-900/20 border border-rose-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(159,18,57,0.2)] shrink-0 mr-4 max-[380px]:mr-3">
                          <link.icon className="w-5 h-5 max-[380px]:w-4 max-[380px]:h-4 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
                       </div>
                       <span className="text-[14px] max-[380px]:text-[12px] font-bold text-rose-100 tracking-wider leading-tight flex-1">{link.name}</span>
                       <ChevronLeft className="w-5 h-5 max-[380px]:w-4 max-[380px]:h-4 text-rose-500/40 group-hover:text-rose-400 group-hover:-translate-x-1 transition-all rotate-180 shrink-0" />
                     </button>
                  </div>
               ))}
           </div>
           <div className="mt-8 max-[380px]:mt-6 text-center border-t border-rose-900/30 pt-6 max-[380px]:pt-4 mb-4 max-[380px]:mb-2 shrink-0 pointer-events-none">
             <p className="text-[11px] max-[380px]:text-[10px] text-rose-100/50 font-light tracking-wide">{t.notFound1}<br/><span className="text-rose-400/80 font-medium mt-1.5 inline-block">{t.notFound2}</span></p>
           </div>
        </div>
      </div>

      {previewInfo && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-[#050102] animate-in fade-in zoom-in-[0.98] duration-300" onPointerDown={e => e.stopPropagation()}>
           <div className="relative flex items-center justify-between px-4 max-[380px]:px-3 border-b border-rose-900/50 bg-[#0a0205] shrink-0 shadow-lg h-[50px] max-[380px]:h-[44px]">
              <button onClick={() => setPreviewInfo(null)} className="flex items-center gap-1.5 px-3 py-1.5 max-[380px]:px-2 max-[380px]:py-1 rounded-full bg-rose-900/30 border border-rose-500/30 text-rose-300 hover:bg-rose-900/50 hover:text-rose-100 transition-all active:scale-95 shadow-[0_0_10px_rgba(159,18,57,0.2)]">
                <ChevronLeft className="w-4 h-4 max-[380px]:w-3.5 max-[380px]:h-3.5" />
                <span className="text-[10px] max-[380px]:text-[9px] font-bold tracking-widest uppercase">{t.back}</span>
              </button>
              <a href={`${previewInfo.url}?ref=catalog`} target="_blank" rel="noopener noreferrer" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 max-[380px]:px-3 max-[380px]:py-1 rounded-full bg-rose-600 border border-rose-400 text-white hover:bg-rose-500 transition-all active:scale-95 shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                <span className="text-[10px] max-[380px]:text-[9px] font-bold tracking-widest uppercase">{t.openFull}</span>
                <ExternalLink className="w-3.5 h-3.5 max-[380px]:w-3 max-[380px]:h-3 text-white" />
              </a>
              <div className="w-[74px] max-[380px]:w-[60px]"></div>
           </div>
           <div className="flex-1 relative w-full h-full bg-[#050102]">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#050102] z-10">
                   <div className="w-8 h-8 max-[380px]:w-6 max-[380px]:h-6 border-2 border-rose-900/50 border-t-rose-500 rounded-full animate-spin"></div>
                   <span className="text-[10px] max-[380px]:text-[8px] uppercase tracking-widest text-rose-500/50 animate-pulse">Loading...</span>
                </div>
              )}
              <iframe src={previewInfo.url} className={`w-full h-full border-none transition-opacity duration-700 bg-white ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setIframeLoaded(true)} title={previewInfo.name} />
           </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState('ru'); 
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [sparks, setSparks] = useState([]);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [showShare, setShowShare] = useState(false);
  const [showPwaPrompt, setShowPwaPrompt] = useState(false);
  const [showIframeModal, setShowIframeModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const [activeSheetData, setActiveSheetData] = useState(null);
  const [iframeUrl, setIframeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [globalRipples, setGlobalRipples] = useState([]);
  const [isNodding, setIsNodding] = useState(false);
  const cardRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioRef = useRef(null);
  const isFlippingRef = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      if (!isFlippingRef.current && !isFlipped) {
        setIsNodding(true);
        setRotate({ x: 12, y: -30 });
        setGlare({ x: 80, y: 20, opacity: 0.7 });
      }
    }, 1500);
    const t2 = setTimeout(() => {
      if (!isFlippingRef.current && !isFlipped) {
        setRotate({ x: 0, y: 0 });
        setGlare({ x: 50, y: 50, opacity: 0 });
      }
    }, 2400);
    const t3 = setTimeout(() => { setIsNodding(false); }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isFlipped]);

  useEffect(() => {
    const ymId = CONTENT.analytics.yandexMetricaId;
    if (!ymId) return;
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    window.ym(ymId, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
  }, []);

  useEffect(() => {
    const handleGlobalPointerDown = (e) => {
      if (showGallery || showIframeModal || showConditionsModal || showShare || showPwaPrompt || activeSheetData) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (clientX === undefined || clientY === undefined) return;
      const id = Date.now() + Math.random();
      setGlobalRipples(prev => [...prev, { x: clientX, y: clientY, id }]);
      setTimeout(() => { setGlobalRipples(prev => prev.filter(r => r.id !== id)); }, 900);
    };
    window.addEventListener('pointerdown', handleGlobalPointerDown);
    return () => window.removeEventListener('pointerdown', handleGlobalPointerDown);
  }, [showGallery, showIframeModal, showConditionsModal, showShare, showPwaPrompt, activeSheetData]);

  const toggleGreetingAudio = (e) => {
    e.stopPropagation(); 
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 1.0;
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn("Safari blocked play, applying fallback:", err);
          audio.load();
          audio.play().catch(e => console.error("Fatal audio error:", e));
        });
      }
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    const handleGlobalMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = (clientX / window.innerWidth - 0.5) * 80;
      const y = (clientY / window.innerHeight - 0.5) * 80;
      setBgOffset({ x: -x, y: -y });
    };
    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove);
    return () => { window.removeEventListener('mousemove', handleGlobalMove); window.removeEventListener('touchmove', handleGlobalMove); };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const manifest = {
        name: `${CONTENT[lang].creator.name1} ${CONTENT[lang].creator.name2} | ${CONTENT[lang].creator.role}`,
        short_name: "Elena Sotnikova",
        start_url: window.location.pathname,
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#9f1239",
        icons: [{ src: CONTENT[lang].creator.avatar || "/avatar-creator.jpg", sizes: "192x192", type: "image/png" }]
      };
      const stringManifest = JSON.stringify(manifest);
      const blob = new Blob([stringManifest], { type: 'application/json' });
      const manifestURL = URL.createObjectURL(blob);
      let link = document.querySelector('link[rel="manifest"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'manifest';
        document.head.appendChild(link);
      }
      link.href = manifestURL;
    }
  }, [lang]);

  const handlePointerMove = (e) => {
    if (isFlippingRef.current || !cardRef.current || isNodding) return;
    if (isFlipped || e.target.closest('.no-tilt')) {
      setRotate({ x: 0, y: 0 });
      setGlare(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handlePointerLeave = () => {
    if (isFlippingRef.current || isNodding) return;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const playFlipSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) { audioCtxRef.current = new AudioContext(); }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') { ctx.resume(); }
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  const handleFlip = () => {
    if (isNodding) return;
    playFlipSound();
    isFlippingRef.current = true;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    setTimeout(() => { isFlippingRef.current = false; }, 700);

    if (!isFlipped) {
      const newSparks = Array.from({ length: 35 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 35 + (Math.random() * 0.5);
        const distance = 80 + Math.random() * 100;
        return {
          id: Date.now() + i,
          tx: Math.cos(angle) * distance + 'px', ty: Math.sin(angle) * distance + 'px',
          wx1: (Math.random() - 0.5) * 100 + 'px', wy1: (Math.random() - 0.5) * 100 + 'px',
          wx2: (Math.random() - 0.5) * 200 + 'px', wy2: (Math.random() - 0.5) * 200 + 'px',
          wx3: (Math.random() - 0.5) * 300 + 'px', wy3: (Math.random() - 0.5) * 300 + 'px',
          wt: (20 + Math.random() * 20) + 's', size: Math.random() * 2.5 + 1.5 + 'px',
        };
      });
      setSparks(newSparks);
    } else {
      setSparks([]);
    }
    triggerVibration([30, 30, 40]);
    setIsFlipped(!isFlipped);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: CONTENT[lang].ui.shareTitle, text: CONTENT[lang].ui.shareText, url: window.location.href }); } 
      catch (err) { console.log('Шаринг отменен'); }
    } else {
      handleCopy();
    }
  };

  const handleDownloadVCard = () => {
    const vcard = [
      "BEGIN:VCARD", "VERSION:3.0",
      `FN:${CONTENT[lang].creator.name1} ${CONTENT[lang].creator.name2}`,
      `N:${CONTENT[lang].creator.name2};${CONTENT[lang].creator.name1};;;`,
      `ORG:${CONTENT[lang].contact.company}`,
      `TITLE:${CONTENT[lang].contact.title}`,
      `TEL;TYPE=CELL:${CONTENT[lang].contact.phone}`,
      `TEL;TYPE=WHATSAPP:${CONTENT[lang].contact.whatsapp}`,
      `URL;TYPE=Telegram:https://t.me/${CONTENT[lang].contact.telegram}`,
      `URL:${CONTENT[lang].contact.website}`,
      `NOTE:${CONTENT[lang].ui.saveContact}`,
      "END:VCARD"
    ].filter(Boolean).join("\r\n"); 

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    const isTelegram = /Telegram/i.test(navigator.userAgent || navigator.vendor || window.opera);

    if (isIOS && isTelegram) {
      window.location.href = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcard);
      return;
    }

    const mimeType = isAndroid ? 'text/x-vcard;charset=utf-8' : 'text/vcard;charset=utf-8';
    const blob = new Blob([vcard], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    if (!isAndroid) { link.setAttribute('download', `${CONTENT[lang].creator.name1}_${CONTENT[lang].creator.name2}.vcf`); }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(url), 500);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-neutral-950 flex flex-col font-sans select-none transition-all duration-500 overflow-hidden justify-center items-center px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[calc(env(safe-area-inset-bottom,1rem)+4rem)]">
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] hidden sm:block pointer-events-none transition-transform duration-1000 ease-out" style={{ transform: `translate(${bgOffset.x}px, ${bgOffset.y}px)` }}></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] hidden sm:block pointer-events-none transition-transform duration-1000 ease-out" style={{ transform: `translate(${bgOffset.x * 1.5}px, ${bgOffset.y * 1.5}px)` }}></div>

      <div className="flex-1 w-full flex items-center justify-center min-h-0 relative z-40">
        <div 
          ref={cardRef}
          className="relative z-10 w-full aspect-[10/16] sm:aspect-[10/15] cursor-pointer group animate-float touch-none mx-auto @container"
          style={{ perspective: '1500px', maxWidth: 'min(26rem, 94vw, 52dvh)' }}
          onClick={handleFlip} onMouseMove={handlePointerMove} onMouseLeave={handlePointerLeave} onTouchMove={handlePointerMove} onTouchEnd={handlePointerLeave}
        >
          {sparks.map(spark => (
            <div key={spark.id} className="spark-particle" style={{ '--tx': spark.tx, '--ty': spark.ty, '--wx1': spark.wx1, '--wy1': spark.wy1, '--wx2': spark.wx2, '--wy2': spark.wx2, '--wx3': spark.wx3, '--wy3': spark.wy3, '--wt': spark.wt, width: spark.size, height: spark.size, left: '50%', top: '50%', marginTop: '-' + (parseFloat(spark.size) / 2) + 'px', marginLeft: '-' + (parseFloat(spark.size) / 2) + 'px' }} />
          ))}

          <div className={`w-full h-full card-preserve-3d z-10 relative ${isNodding ? 'transition-all duration-700 ease-in-out' : 'transition-transform duration-100 ease-out'}`} style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}>
            <div className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] card-preserve-3d" style={{ transform: isFlipped ? 'rotateY(180deg) translateZ(0)' : 'rotateY(0deg) translateZ(0)' }}>
              <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" style={{ boxShadow: `0 0 60px rgba(159,18,57,0.6)` }} />
              <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" style={{ transform: 'rotateY(180deg)', boxShadow: `0 0 60px rgba(159,18,57,0.6)` }} />

              <CreatorCard 
                lang={lang} 
                isFlipped={isFlipped}
                onOpenIframe={(url) => { setIframeUrl(url); setShowIframeModal(true); }} 
                onOpenGallery={() => setShowGallery(true)} 
                onOpenConditions={() => setShowConditionsModal(true)}
                onOpenSheet={setActiveSheetData}
              />

              <div className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden" style={{ background: `radial-gradient(farthest-corner circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0) 60%), linear-gradient(${glare.x + glare.y}deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 70%)`, boxShadow: `inset ${rotate.y}px ${-rotate.x}px 20px rgba(255, 255, 255, 0.4), inset ${-rotate.y * 1.5}px ${rotate.x * 1.5}px 40px rgba(255, 255, 255, 0.15)`, mixBlendMode: 'overlay', opacity: glare.opacity ? Math.max(0.4, glare.opacity) : 0, zIndex: 50 }} />
              <div className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden" style={{ transform: 'rotateY(180deg) translateZ(0)', background: `radial-gradient(farthest-corner circle at ${100 - glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0) 60%), linear-gradient(${100 - glare.x + glare.y}deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 70%)`, boxShadow: `inset ${-rotate.y}px ${-rotate.x}px 20px rgba(255, 255, 255, 0.4), inset ${rotate.y * 1.5}px ${rotate.x * 1.5}px 40px rgba(255, 255, 255, 0.15)`, opacity: glare.opacity ? Math.max(0.4, glare.opacity) : 0, mixBlendMode: 'overlay', zIndex: 50 }} />
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 sm:gap-6 w-max max-w-[95vw]">
        <audio ref={audioRef} src={CONTENT[lang].creator.audioGreeting} preload="auto" playsInline onPlay={() => setIsAudioPlaying(true)} onPause={() => setIsAudioPlaying(false)} onEnded={() => setIsAudioPlaying(false)} style={{ display: 'none' }} />

        <button type="button" onClick={toggleGreetingAudio} className={`shrink-0 active:scale-90 rounded-full border transition-all duration-300 group touch-manipulation flex items-center justify-center w-10 h-10 ${isAudioPlaying ? 'bg-[#151515]/95 sm:bg-rose-900/40 border-rose-500/50 shadow-[0_0_20px_rgba(225,29,72,0.3)]' : 'bg-[#151515]/95 sm:bg-black/80 border-white/10 text-white/40 hover:text-white/90 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`} aria-label="Голосовое приветствие">
          {isAudioPlaying ? (
            <div className="flex items-end justify-center gap-[3px] w-full h-4">
              <div className="audio-bar" style={{ animationDelay: '0.0s' }}></div>
              <div className="audio-bar" style={{ animationDelay: '0.3s', height: '12px' }}></div>
              <div className="audio-bar" style={{ animationDelay: '0.6s', height: '16px' }}></div>
              <div className="audio-bar" style={{ animationDelay: '0.2s', height: '10px' }}></div>
            </div>
          ) : ( <Play className="w-4 h-4 group-hover:scale-110 transition-transform ml-0.5" /> )}
        </button>

        <div className="shrink-0 relative flex items-center p-1 h-10 rounded-full bg-[#151515]/95 sm:bg-black/80 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="absolute top-1 bottom-1 w-[calc(33.333%-2.66px)] rounded-full bg-gradient-to-r from-rose-800 to-rose-600 border border-rose-400/50 shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all duration-300 ease-out" style={{ left: lang === 'hy' ? '4px' : lang === 'ru' ? 'calc(33.333% + 1.33px)' : 'calc(66.666% - 1.33px)' }} />
          {[ { code: 'hy', label: 'AM' }, { code: 'ru', label: 'RU' }, { code: 'en', label: 'EN' } ].map((item) => (
            <button key={item.code} onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerVibration(); setLang(item.code); }} className={`relative z-10 px-2.5 h-full flex items-center justify-center text-[11px] font-bold tracking-wider transition-colors duration-200 touch-manipulation min-w-[32px] text-center ${lang === item.code ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]' : 'text-white/40 hover:text-white/80'}`}>
              {item.label}
            </button>
          ))}
        </div>

        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerVibration(); setShowShare(true); }} className="shrink-0 active:scale-90 rounded-full bg-[#151515]/95 sm:bg-black/80 border border-white/10 text-white/40 hover:text-white/90 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 group touch-manipulation flex items-center justify-center w-10 h-10" aria-label="Поделиться">
          <QrCode className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerVibration(); handleDownloadVCard(); }} className="shrink-0 active:scale-90 rounded-full bg-[#151515]/95 sm:bg-black/80 border border-white/10 text-white/40 hover:text-white/90 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 group touch-manipulation flex items-center justify-center w-10 h-10" aria-label="Сохранить контакт" title="Сохранить в контакты">
          <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {}
      {/* GLOBAL BOTTOM SHEET FOR SOLUTIONS */}
      <div 
        className={`fixed inset-0 z-[60] flex flex-col justify-end items-center sm:p-4 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${activeSheetData ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${activeSheetData ? 'opacity-100' : 'opacity-0'}`} 
          onClick={(e) => { e.stopPropagation(); setActiveSheetData(null); }}
        />
        
        {/* Sheet */}
        <div 
          className={`relative w-full sm:max-w-md bg-gradient-to-b from-[#1a050d] to-[#0a0205] sm:border border-t border-rose-900/50 rounded-t-3xl sm:rounded-3xl pt-3 pb-8 sm:pb-6 px-5 sm:px-6 shadow-[0_-10px_40px_rgba(159,18,57,0.4)] transition-transform duration-400 ${activeSheetData ? 'translate-y-0 sm:translate-y-0 sm:scale-100' : 'translate-y-full sm:translate-y-10 sm:scale-95 sm:opacity-0'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Drag Handle (Visual only, hidden on desktop) */}
          <div className="w-10 h-1 bg-rose-900/60 rounded-full mx-auto mb-4 cursor-pointer sm:hidden" onClick={() => setActiveSheetData(null)} />
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[1.125rem] font-bold text-rose-100 leading-tight">{activeSheetData?.title}</h3>
            <button onClick={() => setActiveSheetData(null)} className="w-8 h-8 rounded-full bg-rose-900/30 flex items-center justify-center shrink-0 hover:bg-rose-900/50 transition-colors">
              <X className="w-4 h-4 text-rose-300" />
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[60vh] hide-scrollbar mask-image-bottom pb-6">
             <p className="text-[13px] sm:text-[14px] text-rose-200/80 whitespace-pre-line leading-relaxed font-light">
               {activeSheetData?.sheetText}
             </p>
             
             <div className="flex flex-col gap-3 mt-6">
               {activeSheetData?.btns?.map((btn, idx) => (
                 <a 
                   key={idx} 
                   href={btn.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`w-full text-center py-3 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all active:scale-95 ${
                     btn.primary 
                      ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:bg-rose-500' 
                      : 'bg-white/5 border border-white/10 text-rose-200 hover:bg-white/10'
                   }`}
                 >
                   {btn.text}
                 </a>
               ))}
             </div>
          </div>
        </div>
      </div>

      {showShare && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm transition-opacity animate-in fade-in duration-200" onClick={() => setShowShare(false)}>
          <div className="sm:backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl animate-in zoom-in-95 duration-200 border bg-[rgba(159,18,57,0.15)] border-[rgba(159,18,57,0.3)]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowShare(false)} className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5"><X className="w-5 h-5" /></button>
            <button onClick={() => { setShowShare(false); setShowPwaPrompt(true); }} className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center mb-4 border transition-colors group cursor-pointer active:scale-95 border-rose-500/30">
              <QrCode className="w-6 h-6 group-hover:scale-110 transition-transform text-rose-400" />
            </button>
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{CONTENT[lang].ui.shareTitle}</h3>
            <p className="text-sm text-white/60 text-center mb-6 leading-relaxed">{CONTENT[lang].ui.shareDesc}</p>
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center min-h-[212px]">
              <img src="/qr.png" alt="QR Code" className="w-[180px] h-[180px] object-contain rounded-lg" onError={(e) => { e.target.onerror = null; e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=" + encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://appseapro.com/'); }} />
            </div>
            <div className="flex gap-3 w-full">
              <button onClick={handleCopy} className="flex-1 bg-black/20 hover:bg-black/40 border border-white/10 text-white font-medium py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? CONTENT[lang].ui.copied : CONTENT[lang].ui.copy}
              </button>
              <button onClick={handleShare} className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm">
                <Share2 className="w-4 h-4" /> {CONTENT[lang].ui.send}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPwaPrompt && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#151515]/95 sm:bg-black/60 sm:backdrop-blur-sm transition-opacity animate-in fade-in duration-300" onClick={() => setShowPwaPrompt(false)}>
          <div className="w-full max-w-sm bg-[#0a0205] sm:rounded-3xl rounded-t-3xl p-6 pb-10 sm:pb-6 flex flex-col items-center relative animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 border-t sm:border border-rose-900/30 shadow-[0_-10px_40px_rgba(159,18,57,0.2)]" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-white/20 rounded-full mb-6 sm:hidden"></div>
            <button onClick={() => setShowPwaPrompt(false)} className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5 hidden sm:block"><X className="w-5 h-5" /></button>
            <div className="w-16 h-16 bg-gradient-to-br from-rose-900 to-black p-0.5 rounded-2xl shadow-[0_0_20px_rgba(159,18,57,0.4)] mb-5">
               <div className="w-full h-full bg-[#151515]/95 sm:bg-black/80 rounded-[14px] flex items-center justify-center border border-rose-500/20"><Crown className="w-8 h-8 text-rose-400" /></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 text-center tracking-wide">{CONTENT[lang].ui.installTitle}</h3>
            <p className="text-sm text-white/60 text-center mb-8 leading-relaxed">{CONTENT[lang].ui.installDesc}</p>
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-5 mb-8 shadow-inner">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-rose-900/40 border border-rose-500/30 flex items-center justify-center shrink-0"><Share2 className="w-4 h-4 text-rose-300" /></div>
                 <p className="text-sm text-white/80 leading-snug">{CONTENT[lang].ui.installStep1_1}<b>{CONTENT[lang].ui.installStep1_2}</b><br/>{CONTENT[lang].ui.installStep1_3}</p>
               </div>
               <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-rose-900/40 border border-rose-500/30 flex items-center justify-center shrink-0"><PlusSquare className="w-4 h-4 text-rose-300" /></div>
                 <p className="text-sm text-white/80 leading-snug">{CONTENT[lang].ui.installStep2_1}<b className="text-white">{CONTENT[lang].ui.installStep2_2}</b><br/>{CONTENT[lang].ui.installStep2_3}</p>
               </div>
            </div>
            <button onClick={() => setShowPwaPrompt(false)} className="w-full bg-gradient-to-r from-[#380e1b] to-black hover:from-[#4a1223] border border-rose-800/50 text-rose-100 font-bold py-4 px-4 rounded-2xl transition-colors shadow-[0_0_20px_rgba(159,18,57,0.3)] active:scale-95">{CONTENT[lang].ui.done}</button>
          </div>
        </div>
      )}

      {showConditionsModal && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#151515]/95 sm:bg-black/60 sm:backdrop-blur-sm transition-opacity animate-in fade-in duration-300 touch-none" onClick={() => setShowConditionsModal(false)}>
          <div className="w-full h-[85vh] sm:h-auto sm:max-h-[85vh] max-w-md bg-[#0a0205] sm:rounded-3xl rounded-t-3xl flex flex-col relative animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 border-t sm:border border-rose-900/30 shadow-[0_-10px_40px_rgba(159,18,57,0.2)]" onClick={e => e.stopPropagation()}>
             <div className="flex-shrink-0 flex items-center justify-between p-5 border-b border-rose-900/30">
               <h3 className="text-lg font-bold text-white tracking-wide">{CONTENT[lang].conditions.title}</h3>
               <button onClick={() => setShowConditionsModal(false)} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors border border-white/5 ml-4 shrink-0"><X className="w-5 h-5" /></button>
             </div>
             <div className="flex-1 overflow-y-auto p-5 pb-8 hide-scrollbar">
                <div className="flex flex-col gap-6">
                  {CONTENT[lang].conditions.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <h4 className="text-[15px] font-bold text-rose-200">{item.title}</h4>
                      <p className="text-[13px] text-rose-100/70 leading-relaxed font-light">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-rose-900/30 text-center">
                  <p className="text-[11px] text-rose-100/40 tracking-wider whitespace-pre-line uppercase font-light leading-relaxed">{CONTENT[lang].conditions.footer}</p>
                </div>
             </div>
             <div className="flex-shrink-0 p-5 border-t border-rose-900/30 bg-[#0a0205] sm:rounded-b-3xl">
               <button onClick={() => setShowConditionsModal(false)} className="w-full bg-white text-black font-bold py-4 px-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 hover:bg-rose-100">{CONTENT[lang].conditions.accept}</button>
             </div>
          </div>
        </div>
      )}

      {showGallery && <DesignGalleryModal onClose={() => setShowGallery(false)} lang={lang} />}

      {showIframeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-4 bg-[#0a0205] sm:bg-black/80 sm:backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setShowIframeModal(false)}>
          <div className="w-full h-full sm:max-w-[400px] sm:max-h-[800px] bg-[#0a0205] rounded-none sm:rounded-[2.5rem] overflow-hidden relative shadow-none sm:shadow-[0_0_50px_rgba(159,18,57,0.4)] border-0 sm:border border-rose-900/50 flex flex-col animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <div className="h-[calc(3.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b border-rose-900/50 flex items-center justify-between px-4 sm:px-5 bg-[#0a0205] sm:bg-black/80 shrink-0">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-rose-400" />
                <span className="text-rose-100 font-serif tracking-wider text-[11px] sm:text-sm uppercase font-bold">{lang === 'ru' ? 'Смотреть' : lang === 'en' ? 'Watch' : 'Դիտել'}</span>
              </div>
              <button onClick={() => setShowIframeModal(false)} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors border border-white/5 active:scale-95"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 w-full relative bg-neutral-950 pb-[env(safe-area-inset-bottom)]">
              {iframeUrl === '/promo.mp4' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050102] z-20 px-6 text-center overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-900/10 rounded-full blur-[80px] pointer-events-none"></div>
                  <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-rose-900/20 rounded-full blur-md"></div>
                    <div className="absolute inset-0 border border-rose-500/20 rounded-full animate-ping opacity-50" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-2 border border-rose-400/30 rounded-full flex items-center justify-center bg-[#0a0205]/95 shadow-[0_0_15px_rgba(159,18,57,0.3)]"><Play className="w-6 h-6 text-rose-300 ml-1 opacity-80" /></div>
                  </div>
                  <h3 className="text-rose-100 font-serif text-[18px] sm:text-[20px] tracking-[0.15em] uppercase font-light drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] leading-relaxed">{CONTENT[lang].ui.comingSoonVideo}</h3>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-rose-900/50"></div>
                    <span className="text-rose-100/30 text-[9px] uppercase tracking-widest">{lang === 'ru' ? 'В разработке' : lang === 'en' ? 'In progress' : 'Մշակման փուլում է'}</span>
                    <div className="w-8 h-[1px] bg-rose-900/50"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center gap-3"><div className="w-8 h-8 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div><div className="text-rose-200/50 text-[10px] font-serif tracking-widest uppercase">Loading...</div></div>
                  </div>
                  <iframe src={iframeUrl} className="w-full h-full border-0 relative z-10 bg-transparent" title="Preview" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        {globalRipples.map(r => <div key={r.id} className="water-ripple-element" style={{ left: r.x, top: r.y, transformOrigin: 'center' }} />)}
      </div>
    </div>
  );
};

export default App;