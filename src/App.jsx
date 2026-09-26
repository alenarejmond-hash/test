import React, { useState, useEffect, useRef } from 'react';
import { 
  UserPlus, 
  Camera, 
  Send,
  MapPin,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  Phone,
  QrCode,
  X
} from 'lucide-react';

const USER_DATA = {
  day: {
    name: "Elena Sotnikova",
    role: "DIGITAL CREATOR & WEB DEVELOPER",
    badge: "EXECUTIVE PASS",
    status: "AVAILABLE",
    location: "Global / Remote",
    avatar: "./business-avatar.jpeg", 
    theme: {
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      bgLayer: "bg-emerald-950/20",
      primaryBtn: "bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
      secondaryBtn: "bg-white/5 hover:bg-white/10 border-white/10 hover:border-emerald-500/50 text-zinc-300",
      avatarRing: "from-zinc-400 via-emerald-700 to-zinc-800",
      orb1: "bg-emerald-600/20",
      orb2: "bg-zinc-500/10",
    },
    actions: [
      { id: 'website', label: "Мой сайт-визитка", icon: Globe, primary: false, colSpan: 2 },
      { id: 'telegram', label: "Telegram", icon: Send, primary: false, colSpan: 2 },
      { id: 'save', label: "Сохранить контакт в телефон", icon: UserPlus, primary: true, colSpan: 2 },
    ]
  },
  night: {
    name: "Elena",
    role: "PRIVATE PROFILE",
    badge: "GUEST LIST VIP",
    status: "LIVE NOW",
    location: "Armenia, Echmiadzin",
    avatar: "./personal-avatar.jpeg", 
    theme: {
      text: "text-fuchsia-400",
      border: "border-fuchsia-500/40",
      bgLayer: "bg-fuchsia-950/20",
      primaryBtn: "bg-fuchsia-600/90 hover:bg-fuchsia-500 text-white border-fuchsia-400/50 shadow-[0_0_25px_rgba(217,70,239,0.4)]",
      secondaryBtn: "bg-black/40 hover:bg-fuchsia-950/40 border-fuchsia-500/20 hover:border-fuchsia-400/60 text-fuchsia-100",
      avatarRing: "from-cyan-500 via-fuchsia-500 to-purple-700",
      orb1: "bg-fuchsia-600/20",
      orb2: "bg-cyan-600/20",
    },
    actions: [
      { id: 'instagram', label: "Instagram", icon: Camera, primary: false, colSpan: 1 },
      { id: 'telegram_night', label: "Telegram", icon: Send, primary: false, colSpan: 1 },
      { id: 'call', label: "Позвонить", icon: Phone, primary: false, colSpan: 2 },
      { id: 'save_night', label: "Обязательно сохранить контакт", icon: UserPlus, primary: true, colSpan: 2 },
    ]
  }
};

export default function DigitalCard() {
  const [isNightMode, setIsNightMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isServerLoaded, setIsServerLoaded] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [dbStatus, setDbStatus] = useState(true);

  // Ссылки для отслеживания тапов
  const tapCountRef = useRef(0);
  const lastTapTimeRef = useRef(0);
  // ЖЕСТКАЯ БЛОКИРОВКА: если мы перехватили режим локально, запрещаем серверу его менять
  const localOverrideRef = useRef(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));

    const fetchServerStatus = async () => {
      try {
        // Пропускаем запрос, если мы в локальной песочнице
        if (window.location.protocol === 'blob:' || window.location.origin === 'null') {
          throw new Error("Sandbox mode");
        }

        const timestamp = new Date().getTime();
        const response = await fetch(`/api/status?t=${timestamp}`, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (!response.ok) throw new Error("Network error");
        
        const data = await response.json();
        
        // Обновляем статус лампочки БД
        if (data.dbConnected === false) {
          setDbStatus(false);
        } else {
          setDbStatus(true);
        }
        
        // ВАЖНО: Применяем статус с сервера ТОЛЬКО если пользователь не делал перехват на этом экране
        if (!localOverrideRef.current && data.mode) {
          setIsNightMode(data.mode === 'night');
        }

      } catch (error) {
        // Резервная система, если сервер недоступен
        if (!localOverrideRef.current) {
          const now = new Date();
          const hour = now.getHours();
          const day = now.getDay(); 
          const isWeekend = day === 0 || day === 6;
          const isNightTime = hour >= 18 || hour < 9;
          setIsNightMode(isWeekend || isNightTime);
        }
      } finally {
        setIsServerLoaded(true);
      }
    };

    fetchServerStatus();
    // Проверяем сервер каждые 15 секунд
    const interval = setInterval(fetchServerStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAvatarInteraction = async () => {
    const now = Date.now();
    const TIME_BETWEEN_TAPS = 800;

    if (now - lastTapTimeRef.current > TIME_BETWEEN_TAPS) {
      tapCountRef.current = 1;
    } else {
      tapCountRef.current += 1;
    }
    
    lastTapTimeRef.current = now;

    if (tapCountRef.current === 5) {
      tapCountRef.current = 0; 
      // Включаем жесткую блокировку - теперь интервал проверки не сможет сбросить режим обратно
      localOverrideRef.current = true;
      
      setIsNightMode(prev => {
        const newMode = prev ? 'day' : 'night';
        
        // Отправляем сигнал на сервер
        if (window.location.protocol !== 'blob:' && window.location.origin !== 'null') {
          const timestamp = new Date().getTime();
          fetch(`/api/status?t=${timestamp}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
            body: JSON.stringify({ mode: newMode })
          })
          .then(res => res.json())
          .then(data => {
            if (!data.dbConnected || !data.dbSuccess) {
              setDbStatus(false);
            } else {
              setDbStatus(true);
            }
          })
          .catch(() => setDbStatus(false));
        }

        return newMode;
      }); 
    }
  };

  const currentData = isNightMode ? USER_DATA.night : USER_DATA.day;
  const t = currentData.theme;

  return (
    <div className={`relative min-h-screen w-full bg-[#050505] font-sans text-zinc-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden selection:bg-white/20 transition-opacity duration-700 ${isServerLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] transition-all duration-1000 ease-in-out ${isNightMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} ${USER_DATA.day.theme.orb1}`} />
        <div className={`absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] transition-all duration-1000 ease-in-out ${isNightMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} ${USER_DATA.day.theme.orb2}`} />
        
        <div className={`absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] transition-all duration-1000 ease-in-out ${isNightMode ? 'opacity-100 scale-100' : 'opacity-0 scale-125'} ${USER_DATA.night.theme.orb1}`} />
        <div className={`absolute top-[40%] -right-[20%] w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px] transition-all duration-1000 ease-in-out delay-100 ${isNightMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} ${USER_DATA.night.theme.orb2}`} />
      </div>

      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-0" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div 
        className={`
          relative z-10 w-full max-w-md mx-auto 
          rounded-[2.5rem] 
          backdrop-blur-2xl border
          overflow-hidden
          transition-all duration-1000 ease-out
          ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          ${isNightMode 
            ? 'bg-black/50 border-white/5 shadow-[0_0_50px_-12px_rgba(217,70,239,0.15)] ring-1 ring-fuchsia-500/10' 
            : 'bg-zinc-950/40 border-white/10 shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)] ring-1 ring-white/5'
          }
        `}
      >
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

        <div className="p-6 sm:p-8">
          
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className={isNightMode ? 'text-fuchsia-400' : 'text-emerald-400'} />
              <div className="grid">
                <span className={`col-start-1 row-start-1 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-700 ${isNightMode ? 'opacity-0 blur-sm' : 'opacity-100 blur-0 text-emerald-400'}`}>
                  {USER_DATA.day.badge}
                </span>
                <span className={`col-start-1 row-start-1 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-700 ${isNightMode ? 'opacity-100 blur-0 text-cyan-400' : 'opacity-0 blur-sm'}`}>
                  {USER_DATA.night.badge}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowQR(true)}
                title="Показать QR-код"
                className={`p-1.5 rounded-full border bg-black/20 backdrop-blur-md transition-colors duration-700 border-white/5 hover:bg-white/10 ${isNightMode ? 'text-fuchsia-400' : 'text-emerald-400'}`}
              >
                <QrCode size={14} />
              </button>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-black/20 backdrop-blur-md transition-colors duration-700 border-white/5">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-700 ${!dbStatus ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : (isNightMode ? 'bg-fuchsia-500 shadow-[0_0_8px_#d946ef]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]')}`} />
                <div className="grid">
                  <span className={`col-start-1 row-start-1 text-[9px] font-bold tracking-wider transition-all duration-700 ${isNightMode ? 'opacity-0' : 'opacity-100 text-zinc-300'}`}>
                    {!dbStatus ? "DB ERROR" : USER_DATA.day.status}
                  </span>
                  <span className={`col-start-1 row-start-1 text-[9px] font-bold tracking-wider transition-all duration-700 ${isNightMode ? 'opacity-100 text-zinc-300' : 'opacity-0'}`}>
                    {!dbStatus ? "DB ERROR" : USER_DATA.night.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center mb-8">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full blur-xl transition-all duration-1000 ${isNightMode ? 'bg-fuchsia-600/30' : 'bg-emerald-500/10'}`} />
            
            <div 
              onClick={handleAvatarInteraction}
              className={`
              relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px] mb-6 cursor-pointer
              bg-gradient-to-br transition-all duration-1000 ease-in-out shadow-2xl active:scale-95
              ${isNightMode ? USER_DATA.night.theme.avatarRing : USER_DATA.day.theme.avatarRing}
            `}>
              <div className="w-full h-full rounded-full overflow-hidden relative bg-[#0a0a0a] ring-2 ring-black">
                <img 
                  src="./business-avatar.jpeg" 
                  alt="Business Profile"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${isNightMode ? 'opacity-0 scale-110 filter blur-sm' : 'opacity-100 scale-100 filter blur-0'}`}
                />
                <img 
                  src="./personal-avatar.jpeg" 
                  alt="Personal Profile"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${isNightMode ? 'opacity-100 scale-100 filter blur-0' : 'opacity-0 scale-110 filter blur-sm'}`}
                />
              </div>
            </div>

            <div className="grid place-items-center w-full mb-2">
              <h1 className={`col-start-1 row-start-1 text-2xl sm:text-3xl font-bold tracking-tight text-white transition-all duration-700 ease-in-out ${isNightMode ? 'opacity-0 translate-y-2 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`}>
                {USER_DATA.day.name}
              </h1>
              <h1 className={`col-start-1 row-start-1 text-2xl sm:text-3xl font-bold tracking-tight text-white transition-all duration-700 ease-in-out ${isNightMode ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 -translate-y-2 blur-sm'}`}>
                {USER_DATA.night.name}
              </h1>
            </div>
            
            <div className="grid place-items-center w-full h-6">
              <p className={`
                col-start-1 row-start-1 text-xs sm:text-[13px] font-semibold tracking-[0.15em] uppercase
                transition-all duration-700 ease-in-out text-center
                ${isNightMode ? 'opacity-0 translate-y-2 blur-sm' : 'opacity-100 translate-y-0 blur-0 text-emerald-400'}
              `}>
                {USER_DATA.day.role}
              </p>
              <p className={`
                col-start-1 row-start-1 text-xs sm:text-[13px] font-semibold tracking-[0.15em] uppercase
                transition-all duration-700 ease-in-out text-center
                ${isNightMode ? 'opacity-100 translate-y-0 blur-0 text-fuchsia-400' : 'opacity-0 -translate-y-2 blur-sm'}
              `}>
                {USER_DATA.night.role}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <MapPin size={12} />
                <div className="grid place-items-start">
                  <span className={`col-start-1 row-start-1 text-[10px] font-medium transition-all duration-700 ${isNightMode ? 'opacity-0' : 'opacity-100'}`}>{USER_DATA.day.location}</span>
                  <span className={`col-start-1 row-start-1 text-[10px] font-medium transition-all duration-700 ${isNightMode ? 'opacity-100' : 'opacity-0'}`}>{USER_DATA.night.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[220px]">
            <div className="grid">
              <div className={`col-start-1 row-start-1 w-full grid grid-cols-2 gap-3 transition-all duration-700 ease-in-out ${isNightMode ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                {USER_DATA.day.actions.map((action) => (
                  <ActionBtn key={action.id} action={action} theme={USER_DATA.day.theme} />
                ))}
              </div>

              <div className={`col-start-1 row-start-1 w-full grid grid-cols-2 gap-3 transition-all duration-700 ease-in-out delay-75 ${isNightMode ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
                {USER_DATA.night.actions.map((action) => (
                  <ActionBtn key={action.id} action={action} theme={USER_DATA.night.theme} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-500 ${showQR ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowQR(false)}
      >
        <div 
          className={`relative w-full max-w-[320px] rounded-[2.5rem] p-8 border backdrop-blur-2xl transition-all duration-500 transform ${showQR ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'} ${isNightMode ? 'bg-fuchsia-950/40 border-fuchsia-500/20 shadow-[0_0_50px_-12px_rgba(217,70,239,0.3)]' : 'bg-emerald-950/40 border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]'}`} 
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={() => setShowQR(false)} 
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center">
            <div className={`p-3 rounded-2xl mb-4 bg-white/5 border ${isNightMode ? 'border-fuchsia-500/30' : 'border-emerald-500/30'}`}>
              <QrCode size={32} className={isNightMode ? 'text-fuchsia-400' : 'text-emerald-400'} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Отсканируй меня</h3>
            <p className="text-sm text-zinc-400 text-center mb-6">
              Поделись контактом. Работает даже без интернета!
            </p>
            
            <div className="bg-white p-3 rounded-3xl w-52 h-52 mx-auto flex items-center justify-center overflow-hidden relative shadow-inner">
              <img 
                src="./qr.png" 
                alt="QR Code" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 bg-zinc-100 flex-col items-center justify-center text-center p-2">
                <span className="text-xs text-zinc-500 font-medium">Положите файл<br/><b>qr.png</b><br/>в папку public</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function ActionBtn({ action, theme }) {
  const Icon = action.icon;
  const isFullWidth = action.colSpan === 2;
  
  return (
    <button 
      className={`
        group relative flex items-center justify-between p-4 rounded-2xl 
        transition-all duration-300 ease-out transform active:scale-[0.98]
        border backdrop-blur-sm overflow-hidden
        ${isFullWidth ? 'col-span-2' : 'col-span-1 flex-col items-start gap-4'}
        ${action.primary ? theme.primaryBtn : theme.secondaryBtn}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.03] to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      
      <div className={`flex items-center gap-3 ${!isFullWidth ? 'w-full' : ''}`}>
        <div className={`
          p-2 rounded-xl transition-colors duration-300 flex-shrink-0
          ${action.primary ? 'bg-black/20' : 'bg-white/5 group-hover:bg-white/10'}
        `}>
          <Icon size={18} className={action.primary ? 'text-current' : 'opacity-80 group-hover:opacity-100'} />
        </div>
        <span className={`font-medium tracking-wide text-left leading-tight ${isFullWidth ? 'text-[15px]' : 'text-[13px]'} ${!action.primary ? 'opacity-90' : ''}`}>
          {action.label}
        </span>
      </div>

      {isFullWidth && (
        <ArrowUpRight size={18} className="opacity-40 flex-shrink-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      )}
    </button>
  );
}