import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Ticket, 
  Heart, 
  Check, 
  RotateCcw,
  Copy,
  Info
} from 'lucide-react';

// Malayalam Meme / Vibe Levels mapping
interface MoodLevel {
  level: number;
  memeName: string;
  subtext: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderClass: string;
}

const moodLevels: MoodLevel[] = [
  {
    level: 1,
    memeName: "Kumbalangi Nights Shammi Smile",
    subtext: "Mone, Happy alle? Everything is perfectly fine.",
    emoji: "😏✨",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50/90",
    borderClass: "border-emerald-200"
  },
  {
    level: 2,
    memeName: "Confused Minnal Murali",
    subtext: "Slightly lost or overwhelmed. Needs clarity.",
    emoji: "⚡🤷",
    color: "from-sky-500 to-indigo-600",
    bgColor: "bg-sky-50/90",
    borderClass: "border-sky-200"
  },
  {
    level: 3,
    memeName: "Classic Shaji Pappan (Aadu)",
    subtext: "Warning: High energy, mildly irritated, might kick a loose piece of furniture.",
    emoji: "🐐🥋",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50/90",
    borderClass: "border-amber-200"
  },
  {
    level: 4,
    memeName: "Full-On Jaya Jaya Jaya Jaya Hey",
    subtext: "Emergency protocol activated. Retreat slowly or buy snacks immediately.",
    emoji: "🥊💥",
    color: "from-rose-500 to-red-600",
    bgColor: "bg-rose-50/90",
    borderClass: "border-rose-200"
  }
];

// Trivandrum Date Coupon options
interface DateOption {
  title: string;
  desc: string;
  coupon: string;
  emoji: string;
}

const dateOptions: DateOption[] = [
  {
    title: "Thattukada & Chaya ☕",
    desc: "Double omelette, parotta, and zero privacy from local uncles.",
    coupon: "CHAYA-PAROTTA-VIP-99",
    emoji: "🍳"
  },
  {
    title: "Beach Walk at Sunset 🌅",
    desc: "Walking far enough so family acquaintances don't spot us.",
    coupon: "ANTI-UNCLE-SHADE-404",
    emoji: "🏖️"
  },
  {
    title: "Fancy AC Cafe 🍟",
    desc: "Where we order food with names we can barely pronounce to look sophisticated.",
    coupon: "SOPHISTICATED-BURGER-77",
    emoji: "🍔"
  },
  {
    title: "Temple Date at Attukal 🛕",
    desc: "A peaceful evening walk, matching traditional outfits, and collecting maximum family-approval points.",
    coupon: "MUNDU-VESHTI-APPROVAL-100",
    emoji: "🌸"
  }
];

// Funny Malayalam-themed response variations for the "No" button
const funnyNoTexts = [
  "No 🙅‍♀️",
  "Pappan rules: No! 🥋",
  "Ask Shammi first 😏",
  "Amma checking phone 📱",
  "Busy eating banana chips 🍌",
  "Strictly against culture 🛕",
  "No way, Jose 🤷‍♀️",
  "Error: Try again later 🚫"
];

function App() {
  const [mood, setMood] = useState<number>(2); // Default to Minnal Murali
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [weekendAnswer, setWeekendAnswer] = useState<string | null>(null);
  
  // Teleporting button state
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0, isAbsolute: false });
  const [noIndex, setNoIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Phone number placeholder not needed as WhatsApp integration is removed
  // Select active values
  const activeMood = moodLevels[mood - 1];
  const activeDate = dateOptions[selectedDate];

  // Trigger copy coupon
  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(activeDate.coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run initial small confetti on load for high energy
  useEffect(() => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ec4899', '#f43f5e', '#a855f7']
    });
  }, []);

  // Teleport the "No" button to a random spot within the container
  const teleportNoButton = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    
    // Pick next funny text
    setNoIndex((prev) => (prev + 1) % funnyNoTexts.length);

    // Explicit non-overlapping boundary zones for the No button (outside the central Yes button area)
    const safeZones = [
      { minX: 8, maxX: 22, minY: 12, maxY: 35 },   // Top-Left corner area
      { minX: 8, maxX: 22, minY: 65, maxY: 88 },   // Bottom-Left corner area
      { minX: 78, maxX: 92, minY: 12, maxY: 35 },  // Top-Right corner area
      { minX: 78, maxX: 92, minY: 65, maxY: 88 },  // Bottom-Right corner area
      { minX: 38, maxX: 62, minY: 10, maxY: 18 },  // Extreme Top-Center strip
      { minX: 38, maxX: 62, minY: 82, maxY: 90 }   // Extreme Bottom-Center strip
    ];

    // Select a random zone
    const zone = safeZones[Math.floor(Math.random() * safeZones.length)];
    const newX = Math.floor(Math.random() * (zone.maxX - zone.minX + 1)) + zone.minX;
    const newY = Math.floor(Math.random() * (zone.maxY - zone.minY + 1)) + zone.minY;

    setNoBtnPos({
      x: newX,
      y: newY,
      isAbsolute: true
    });

    // Spark of minor confetti as feedback
    confetti({
      particleCount: 8,
      spread: 40,
      origin: { x: Math.random(), y: 0.85 },
      colors: ['#fda4af', '#f0abfc']
    });
  };

  // Yes Button Trigger (Celebration mode)
  const handleYesClick = () => {
    setWeekendAnswer("Yes");

    // Continuous celebration confetti loop
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);
      // Fire confetti from left & right sides
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      });
    }, 250);
  };

  // WhatsApp redemption helper is removed

  // Reset function
  const handleReset = () => {
    setWeekendAnswer(null);
    setNoBtnPos({ x: 0, y: 0, isAbsolute: false });
    setMood(2);
    setSelectedDate(0);
    // Splash confetti on reset
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  if (weekendAnswer === "Yes") {
    return (
      <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col justify-between overflow-hidden relative selection:bg-rose-500">
        {/* Dynamic Glowing Background Effect */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-rose-700/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-pink-700/20 blur-3xl animate-pulse-slow"></div>

        {/* Floating Hearts background decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-12 text-3xl animate-bounce-slow">❤️</div>
          <div className="absolute top-48 right-16 text-2xl animate-bounce">💖</div>
          <div className="absolute bottom-40 left-1/4 text-4xl animate-bounce-slow">👑</div>
          <div className="absolute bottom-72 right-12 text-3xl animate-bounce">✨</div>
        </div>

        {/* Breaking News Header */}
        <div className="bg-red-600 text-white text-center py-2 px-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border-b-4 border-red-800 shadow-md z-10">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          Breaking News Flash
        </div>

        {/* Main TV Frame Container */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-8 z-10">
          <div className="w-full max-w-md bg-slate-800/85 backdrop-blur-md rounded-3xl border-2 border-red-500 overflow-hidden shadow-2xl relative animate-scale-in">
            {/* Live TV Badge */}
            <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest text-white uppercase shadow flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              LIVE
            </div>

            {/* TV Screen Display content */}
            <div className="p-6 pt-10 text-center">
              <span className="text-5xl md:text-6xl inline-block mb-4 animate-bounce">👑</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-yellow-400 leading-tight tracking-tight uppercase">
                Prime Minister Informs:
              </h1>
              
              <div className="my-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-700">
                <p className="text-lg md:text-xl font-bold text-yellow-300 tracking-wide animate-pulse">
                  THIS WEEKEND IS BOOKED!
                </p>
                <div className="h-px bg-slate-700 my-3"></div>
                <div className="text-xs text-slate-300 space-y-1 text-left font-mono">
                  <div>🚨 <span className="text-red-400">Target Vibe:</span> Level {activeMood.level} ({activeMood.memeName})</div>
                  <div>📍 <span className="text-pink-400">Mission Spot:</span> {activeDate.title}</div>
                  <div>🎟️ <span className="text-green-400">Approved Pass:</span> <span className="underline">{activeDate.coupon}</span></div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                "Special emergency protocols have been officially sanctioned. No requests for reschedule will be entertained."
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/919895609507?text=${encodeURIComponent(`Hey! 👑 Weekend is BOOKED!\nVibe: Level ${activeMood.level} - ${activeMood.memeName}\nPlan: ${activeDate.title}\nPass: ${activeDate.coupon}\nNo rescheduling allowed 😉`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-green-600 hover:bg-green-500 active:scale-95 rounded-2xl flex flex-col items-center justify-center gap-1 text-center shadow-inner transition-all duration-150"
                >
                  <span className="text-sm font-bold text-white flex items-center gap-1">
                    💬 Send on WhatsApp!
                  </span>
                  <p className="text-[11px] text-green-100 leading-snug">
                    Tap to send your booking confirmation directly! 😉
                  </p>
                </a>
                
                <button
                  onClick={handleReset}
                  className="w-full py-3.5 bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-300 hover:text-white font-medium rounded-xl text-xs transition-all duration-150 flex items-center justify-center gap-1.5 border border-slate-600"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Start Over / Edit Vibe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Breaking News Ticker */}
        <div className="bg-yellow-400 text-slate-950 py-3 overflow-hidden whitespace-nowrap border-t border-yellow-500 shadow-[0_-4px_10px_rgba(0,0,0,0.3)] z-10">
          <div className="inline-block animate-marquee font-mono font-bold text-xs uppercase tracking-wider">
            🔥 BREAKING: SPECIAL VIBE PLAN CONFIRMED AT {activeDate.title.toUpperCase()} ••• MOOD REGISTERED AT LEVEL {activeMood.level} ({activeMood.memeName.toUpperCase()}) ••• LOCAL UNCLES REPORTEDLY CRYING IN DISTRESS AS SECURITY CORDS EXTENDED ••• SWEET PACKS AND SNACK INVENTORY DISPATCHED IMMEDIATELY ••• 🔥 BREAKING: SPECIAL VIBE PLAN CONFIRMED AT {activeDate.title.toUpperCase()} •••
          </div>
        </div>

        {/* CSS for marquee and pulse animations */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-block;
            padding-left: 100%;
            animation: marquee 25s linear infinite;
          }
          @keyframes scale-in {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in {
            animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-6 px-4 bg-gradient-to-tr from-pink-50 via-slate-50 to-purple-50 flex items-center justify-center selection:bg-pink-200">
      
      {/* Mobile Frame Layout Wrapper */}
      <div className="w-full max-w-md mx-auto flex flex-col gap-6">
        
        {/* Cute Romantic Header */}
        <header className="text-center py-4 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-100 text-pink-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1 border border-pink-200">
            <Sparkles className="w-3 h-3 text-pink-500 animate-spin" /> Vibe Terminal v1.0
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mt-3 text-slate-800">
            The Weekend Hub <span className="inline-block animate-pulse text-pink-500">💖</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-[280px] mx-auto leading-snug">
            Configure your vibe, claim your coupon, and book the scheduler.
          </p>
        </header>

        {/* Section 1: The Shaji Pappan Mood Scale */}
        <section className="bg-white rounded-3xl p-6 shadow-xl border border-pink-100 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md font-bold text-slate-800 flex items-center gap-2">
              <span className="text-lg">⚡</span> Current Vibe Check
            </h2>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${activeMood.bgColor} ${activeMood.borderClass} text-slate-700 flex items-center gap-1`}>
              Level {mood} / 4
            </span>
          </div>

          {/* Styled Mood Card */}
          <div className={`p-5 rounded-2xl border bg-gradient-to-b ${activeMood.bgColor} ${activeMood.borderClass} transition-all duration-300 shadow-sm relative overflow-hidden mb-5 min-h-[120px] flex flex-col justify-center`}>
            {/* Subtle background decoration */}
            <div className="absolute right-[-10px] bottom-[-10px] text-7xl opacity-10 pointer-events-none select-none">
              {activeMood.emoji}
            </div>

            <div className="flex items-start gap-3 relative z-10">
              <div className="text-3xl p-2 bg-white/80 rounded-xl shadow-sm border border-white/50 backdrop-blur-sm animate-bounce-slow">
                {activeMood.emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-slate-800 text-sm md:text-md uppercase tracking-tight">
                  {activeMood.memeName}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  {activeMood.subtext}
                </p>
              </div>
            </div>
          </div>

          {/* Slider input */}
          <div className="space-y-3">
            <div className="relative">
              <input
                id="mood-slider"
                type="range"
                min="1"
                max="4"
                step="1"
                value={mood}
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            
            {/* Labels beneath the slider */}
            <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
              <button onClick={() => setMood(1)} className={`transition-all ${mood === 1 ? 'text-emerald-600 scale-110' : ''}`}>1. Shammi 😏</button>
              <button onClick={() => setMood(2)} className={`transition-all ${mood === 2 ? 'text-sky-600 scale-110' : ''}`}>2. Murali 🤷</button>
              <button onClick={() => setMood(3)} className={`transition-all ${mood === 3 ? 'text-amber-600 scale-110' : ''}`}>3. Pappan 🥋</button>
              <button onClick={() => setMood(4)} className={`transition-all ${mood === 4 ? 'text-rose-600 scale-110' : ''}`}>4. Jaya Hey 🥊</button>
            </div>
          </div>
        </section>

        {/* Section 2: The Trivandrum Date Planner */}
        <section className="bg-white rounded-3xl p-6 shadow-xl border border-pink-100 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-4">
            <span>🤔</span> Where are we sneaking out to next?
          </h2>

          {/* Vertical Stack of Date Cards */}
          <div className="flex flex-col gap-2.5">
            {dateOptions.map((opt, idx) => {
              const isSelected = selectedDate === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-3 relative overflow-hidden group py-3 ${
                    isSelected
                      ? 'border-pink-300 bg-pink-50/50 shadow-sm'
                      : 'border-slate-100 hover:border-pink-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`text-2xl p-1.5 rounded-xl transition-all ${
                    isSelected ? 'bg-pink-100/80 scale-110' : 'bg-slate-50 group-hover:bg-pink-50'
                  }`}>
                    {opt.emoji}
                  </div>
                  
                  <div className="flex-1 pr-6">
                    <h4 className="font-bold text-xs text-slate-800 tracking-tight">
                      {opt.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                      {opt.desc}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-500 bg-pink-100 p-1 rounded-full border border-pink-200 animate-scale-in">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Coupon Ticket Voucher */}
          <div className="mt-6 border-t border-dashed border-slate-200 pt-6">
            <div className="ticket-clip w-full bg-slate-900 text-white rounded-2xl relative shadow-md p-5 border border-slate-800 overflow-hidden flex flex-col justify-between">
              
              {/* Notched Edge Simulators */}
              <div className="absolute left-[-2px] top-1/2 transform -translate-y-1/2 w-4 h-6 bg-white rounded-r-full border-r border-slate-100 z-10"></div>
              <div className="absolute right-[-2px] top-1/2 transform -translate-y-1/2 w-4 h-6 bg-white rounded-l-full border-l border-slate-100 z-10"></div>

              {/* Ticket details */}
              <div className="flex justify-between items-start text-left mb-4 z-10">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-pink-400 font-bold bg-pink-950/40 px-2 py-0.5 rounded border border-pink-900/30">
                    Trivandrum Special Voucher
                  </span>
                  <h3 className="text-sm font-extrabold mt-1 text-slate-100 tracking-tight leading-tight">
                    {activeDate.title}
                  </h3>
                </div>
                <Ticket className="w-6 h-6 text-pink-400 opacity-80" />
              </div>

              {/* Perforated Separator Line */}
              <div className="border-t border-dashed border-slate-700/80 my-3 w-full"></div>

              <div className="flex justify-between items-center z-10 pt-1">
                <div>
                  <div className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">Coupon Code</div>
                  <div className="text-md font-mono font-extrabold tracking-wider text-yellow-300">
                    {activeDate.coupon}
                  </div>
                </div>
                <button
                  onClick={handleCopyCoupon}
                  className="p-2 bg-slate-800 hover:bg-slate-700 active:scale-90 rounded-xl transition-all border border-slate-700 text-slate-300 hover:text-white"
                  title="Copy Coupon Code"
                >
                  {copied ? (
                    <span className="text-[10px] text-pink-400 font-bold px-1">Copied!</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Nice flirty sign-off or spacing instead of WhatsApp button */}
            <div className="mt-4 text-center">
              <p className="text-[11px] text-slate-400 italic">
                ✨ Show me this voucher ticket next time we meet! ✨
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: The Impossible Yes/No Question */}
        <section className="bg-white rounded-3xl p-6 shadow-xl border border-pink-100 transition-all duration-300 hover:shadow-2xl relative">
          <div className="text-center space-y-4">
            <div>
              <h2 className="text-md font-extrabold text-slate-800">
                Are you free this weekend? 📅
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your availability status below to complete reservation.
              </p>
            </div>

            {/* Click Container Frame */}
            <div className="relative h-44 w-full rounded-2xl bg-pink-50/30 border border-dashed border-pink-200/80 flex items-center justify-center p-4 overflow-hidden">
              
              {/* Floating indicators */}
              <div className="absolute top-2 left-2 text-[9px] font-bold text-pink-400/60 uppercase font-mono">
                Verification Box
              </div>

              {/* Yes and No buttons container */}
              <div className="flex gap-4 items-center justify-center w-full relative h-full">
                
                {/* YES BUTTON */}
                <button
                  onClick={handleYesClick}
                  className="py-3 px-8 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 active:scale-95 text-white font-extrabold rounded-2xl shadow-md transition-all duration-150 hover:shadow-lg flex items-center gap-1.5 text-xs py-4"
                >
                  <Heart className="w-4 h-4 fill-white animate-bounce-slow" /> Yes, Absolutely!
                </button>

                {/* NO BUTTON (Teleporting) */}
                <button
                  onMouseEnter={teleportNoButton}
                  onTouchStart={teleportNoButton}
                  onClick={teleportNoButton}
                  style={
                    noBtnPos.isAbsolute
                      ? {
                          position: 'absolute',
                          left: `${noBtnPos.x}%`,
                          top: `${noBtnPos.y}%`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: 50,
                        }
                      : {}
                  }
                  className={`py-3 px-6 bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold rounded-xl transition-all duration-150 border border-slate-200 text-xs py-3 ${
                    noBtnPos.isAbsolute ? 'shadow-lg border-rose-200 bg-rose-50 text-rose-600 scale-95 duration-75' : ''
                  }`}
                >
                  {funnyNoTexts[noIndex]}
                </button>
              </div>
            </div>

            {/* Regulatory Disclaimer humor */}
            <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Dissent is strictly regulated under Kerala Vibe Management guidelines.</span>
            </div>
          </div>
        </section>
      </div>
      
      {/* Styles for scale-in animation */}
      <style>{`
        @keyframes scale-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
