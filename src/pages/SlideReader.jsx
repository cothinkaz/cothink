import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../data/resourcesData";

const PRESET_COLORS = [
  { id: "red", label: "Qırmızı", color: "#EF4444" },
  { id: "yellow", label: "Sarı", color: "#F59E0B", badge: "27%" },
  { id: "green", label: "Yaşıl", color: "#10B981" },
  { id: "blue", label: "Mavi", color: "#3B82F6" },
  { id: "purple", label: "Bənövşəyi", color: "#8B5CF6" },
  { id: "pink", label: "Çəhrayı", color: "#EC4899" },
];

export default function SlideReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const resource = getResourceById(id);

  const [currentSlide, setCurrentSlide] = useState(4);
  const totalSlides = 15;
  const [zoom, setZoom] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [penMenuOpen, setPenMenuOpen] = useState(false);
  const [activeColor, setActiveColor] = useState("#9751F2");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customHex, setCustomHex] = useState("#9751F2");

  const slide4Ref = useRef(null);
  const slide5Ref = useRef(null);

  const zoomIn = () => setZoom((z) => Math.min(z + 10, 150));
  const zoomOut = () => setZoom((z) => Math.max(z - 10, 70));
  const resetZoom = () => setZoom(100);

  const slides = Array.from({ length: totalSlides }, (_, i) => i + 1);

  const scrollToSlide = (slideNum) => {
    setCurrentSlide(slideNum);
    if (slideNum === 4 && slide4Ref.current) {
      slide4Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (slideNum === 5 && slide5Ref.current) {
      slide5Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#525659] font-sans">
      
      {/* ═══════════════════════════════════════════════════════════
          FIXED TOP HEADER BAR (2 Rows - Completely Clean & Dedicated)
      ════════════════════════════════════════════════════════════ */}
      <header className="shrink-0 bg-white border-b border-[#E5E7EB] shadow-sm z-30">
        
        {/* Row 1: Nav, Title, 3 Action Circles */}
        <div className="flex h-[52px] items-center justify-between px-6">
          {/* Left: Back button with chevron */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[15px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Geri
          </button>

          {/* Center: Presentation Title */}
          <h1 className="text-[17px] font-bold tracking-wide text-[#111827]">
            CoThink Prezentasiya
          </h1>

          {/* Right: 3 Tool Icons */}
          <div className="relative flex items-center gap-2.5">
            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Axtar"
              className={`flex h-[36px] w-[36px] items-center justify-center rounded-full border border-gray-200 transition ${
                searchOpen ? "bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Bookmark */}
            <button
              type="button"
              onClick={() => setIsBookmarked((v) => !v)}
              aria-label="Yadda saxla"
              className={`flex h-[36px] w-[36px] items-center justify-center rounded-full border border-gray-200 transition ${
                isBookmarked ? "bg-[#FFF7ED] border-[#EA580C] text-[#EA580C]" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isBookmarked ? "#EA580C" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            {/* Pen / Highlight */}
            <button
              type="button"
              onClick={() => setPenMenuOpen((v) => !v)}
              aria-label="İşarələ / Rəng seç"
              className={`flex h-[36px] w-[36px] items-center justify-center rounded-full border transition ${
                penMenuOpen
                  ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>

            {/* Floating Color Palette Dropdown */}
            {penMenuOpen && (
              <div className="absolute right-0 top-11 z-50 w-[230px] rounded-[16px] border border-gray-100 bg-white p-3.5 shadow-2xl">
                <div className="space-y-1.5 border-b border-gray-100 pb-2.5">
                  {PRESET_COLORS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveColor(item.color);
                        setCustomHex(item.color);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-[13px] text-gray-700 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-3.5 w-3.5 rounded-full shadow-sm"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[11px] text-gray-400 font-medium">{item.badge}</span>
                      )}
                    </button>
                  ))}

                  <div className="flex items-center justify-between rounded-lg px-2 py-1 text-[13px] font-medium text-gray-800">
                    <div className="flex items-center gap-2.5">
                      <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-indigo-600 shadow-sm" />
                      <span>Rəng seç</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5">
                  <div
                    className="relative h-24 w-full rounded-xl shadow-inner cursor-pointer overflow-hidden"
                    style={{
                      background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, ${activeColor})`,
                    }}
                  >
                    <div
                      className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none"
                      style={{ left: "75%", top: "45%", backgroundColor: activeColor }}
                    />
                  </div>

                  <div className="mt-2 space-y-1.5">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      defaultValue="270"
                      onChange={(e) => setActiveColor(`hsl(${e.target.value}, 85%, 65%)`)}
                      className="h-1.5 w-full appearance-none rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Sub-toolbar (Slide input, Zoom, Progress Line) */}
        <div className="flex h-[44px] items-center justify-between border-t border-gray-100 px-6">
          <div className="flex items-center gap-3 text-[13px] text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">Səhifə</span>
              <input
                type="number"
                min="1"
                max={totalSlides}
                value={currentSlide}
                onChange={(e) => scrollToSlide(Math.max(1, Math.min(totalSlides, Number(e.target.value) || 1)))}
                className="h-6 w-12 rounded border border-gray-300 text-center font-medium text-gray-800 outline-none focus:border-blue-500 text-[13px]"
              />
              <span className="text-gray-500">/ {totalSlides}</span>
            </div>

            <div className="h-4 w-px bg-gray-200 mx-1" />

            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={zoomOut}
                className="flex h-5 w-5 items-center justify-center rounded text-gray-600 hover:bg-gray-100 font-bold transition text-sm"
              >
                —
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="px-1 text-[13px] font-medium text-gray-700 hover:text-blue-600 transition"
              >
                {zoom}%
              </button>
              <button
                type="button"
                onClick={zoomIn}
                className="flex h-5 w-5 items-center justify-center rounded text-gray-600 hover:bg-gray-100 font-bold transition text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Right: Blue Progress Line */}
          <div className="flex flex-1 max-w-[460px] items-center ml-8">
            <div
              className="relative h-[3px] flex-1 rounded-full bg-gray-200 cursor-pointer overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                scrollToSlide(Math.max(1, Math.round(pos * totalSlides)));
              }}
            >
              <div
                className="h-full rounded-full bg-[#2563EB] transition-all duration-200"
                style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
              />
            </div>
          </div>
        </div>

      </header>

      {/* ─── Search Bar Overlay ─── */}
      {searchOpen && (
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-2 flex items-center gap-3 z-20">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Prezentasiya daxilində axtar..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm text-gray-800 outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="text-xs text-gray-500 hover:text-gray-800 font-medium"
          >
            Bağla
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MAIN VIEWPORT: LEFT 15 THUMBNAILS + RIGHT CONTINUOUS SLIDES
      ════════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Column: 15 Slide Thumbnails Sidebar */}
        <aside className="w-[170px] shrink-0 overflow-y-auto border-r border-[#E5E7EB] bg-white p-3 space-y-4">
          {slides.map((slideNum) => {
            const isActive = slideNum === currentSlide;
            return (
              <div
                key={slideNum}
                onClick={() => scrollToSlide(slideNum)}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                {/* Bold slide number */}
                <span className={`text-[13px] font-bold w-4 text-right pt-2 ${
                  isActive ? "text-[#111827]" : "text-gray-400 group-hover:text-gray-700"
                }`}>
                  {slideNum}
                </span>

                {/* 16:9 Thumbnail box */}
                <div
                  className={`w-[115px] h-[68px] rounded-[2px] bg-white p-1.5 flex flex-col justify-between overflow-hidden transition-all ${
                    isActive
                      ? "border-[2px] border-[#2563EB] shadow-md ring-1 ring-blue-100"
                      : "border border-gray-200 shadow-sm group-hover:border-gray-400"
                  }`}
                >
                  {slideNum === 1 ? (
                    <div className="h-full w-full rounded bg-gradient-to-br from-gray-900 to-blue-950 p-1 flex flex-col justify-center items-center text-center">
                      <span className="text-[7px] font-bold text-white">CoThink</span>
                      <span className="text-[5px] text-blue-200">Prezentasiya</span>
                    </div>
                  ) : slideNum === 4 ? (
                    <div className="h-full w-full bg-white p-1 flex flex-col justify-between">
                      <span className="text-[6px] font-bold text-blue-900">Rəqib Analizi</span>
                      <div className="relative h-7 w-full border-l border-b border-blue-300">
                        <div className="absolute top-1 right-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <div className="absolute bottom-1 left-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                      </div>
                    </div>
                  ) : slideNum === 5 ? (
                    <div className="h-full w-full bg-white flex flex-col justify-end">
                      <div className="h-8 w-full rounded-t-full bg-blue-700 p-1 flex flex-col items-center justify-center text-white">
                        <span className="text-[5px] font-bold">246K TAM</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-full bg-white p-1 flex flex-col justify-between">
                      <div className="h-1 w-2/3 rounded-full bg-blue-800" />
                      <div className="space-y-0.5">
                        <div className="h-0.5 w-full bg-gray-200 rounded-full" />
                        <div className="h-0.5 w-4/5 bg-gray-200 rounded-full" />
                        <div className="h-0.5 w-3/4 bg-gray-200 rounded-full" />
                      </div>
                      <div className="flex gap-1 justify-end">
                        <div className="h-2 w-3 bg-gray-100 rounded-sm" />
                        <div className="h-2 w-3 bg-blue-100 rounded-sm" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </aside>

        {/* Right Canvas: Continuous Presentation Slides View */}
        <main className="flex-1 overflow-y-auto py-10 px-6 flex flex-col items-center gap-10">
          
          {/* Slide 4 (Main Competitor Matrix Slide) */}
          <div
            ref={slide4Ref}
            className="w-[880px] max-w-full aspect-[16/9] bg-white rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.35)] p-10 relative flex flex-col justify-between overflow-hidden transition-transform duration-200 origin-top"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Background Decorative Soft Blue Diamonds */}
            <div className="absolute top-8 right-24 h-12 w-12 rotate-45 border-2 border-blue-100 opacity-60 pointer-events-none" />
            <div className="absolute top-20 left-16 h-8 w-8 rotate-45 border-2 border-blue-100 opacity-60 pointer-events-none" />
            <div className="absolute bottom-16 right-16 h-14 w-14 rotate-45 border-2 border-blue-100 opacity-50 pointer-events-none" />
            <div className="absolute -bottom-10 left-6 h-28 w-28 rounded-full border-4 border-blue-50 opacity-40 pointer-events-none" />

            {/* Slide Title */}
            <div>
              <h2 className="text-[26px] font-bold text-[#1E3A8A] tracking-tight">
                Rəqib Analizi
              </h2>
            </div>

            {/* 2x2 Competitor Analysis Matrix */}
            <div className="relative my-auto h-[320px] w-full max-w-[680px] mx-auto">
              
              {/* Vertical axis line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#3B82F6]" />
              
              {/* Horizontal axis line */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[#3B82F6]" />

              {/* Axis Labels */}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[12px] font-medium text-gray-700">
                Yüksək qiymət
              </span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[12px] font-medium text-gray-700">
                Aşağı qiymət
              </span>
              <span className="absolute top-1/2 -left-28 -translate-y-1/2 text-[12px] font-medium text-gray-700">
                Aşağı keyfiyyət
              </span>
              <span className="absolute top-1/2 -right-28 -translate-y-1/2 text-[12px] font-medium text-gray-700">
                Yüksək keyfiyyət
              </span>

              {/* 1. Golden Shield Crest (SEVSTUDY.AZ / ALL STAR) */}
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: "44%", top: "35%" }}
              >
                <div className="h-12 w-11 rounded bg-[#111827] border-2 border-[#D97706] p-1 shadow-md flex flex-col items-center justify-center">
                  <span className="text-[8px] font-serif font-black text-[#F59E0B]">★</span>
                  <span className="text-[5px] font-bold text-white uppercase tracking-tighter">ALL STAR</span>
                </div>
              </div>

              {/* 2. Coursera (Top-Right) */}
              <div 
                className="absolute -translate-y-1/2 flex items-center gap-1 font-bold text-[#0056D2] text-[15px] tracking-tight"
                style={{ left: "68%", top: "18%" }}
              >
                <span className="text-base">🔷</span>
                <span>coursera</span>
              </div>

              {/* 3. Udemy (Top-Right) */}
              <div 
                className="absolute -translate-y-1/2 flex items-center gap-1 font-bold text-[#A435F0] text-[15px]"
                style={{ left: "64%", top: "30%" }}
              >
                <span className="text-base">🟣</span>
                <span>ûdemy</span>
              </div>

              {/* 4. Megaphone Icon / All Star Badge (Right of center axis) */}
              <div 
                className="absolute -translate-y-1/2 flex flex-col items-center text-center"
                style={{ left: "54%", top: "38%" }}
              >
                <div className="flex items-center gap-1 text-[#2563EB]">
                  <span className="text-sm">📢</span>
                  <span className="text-[8px] font-bold leading-tight">ALL STAR</span>
                </div>
              </div>

              {/* 5. eSchool (Red italic text near center axis) */}
              <div 
                className="absolute -translate-y-1/2 text-[14px] font-bold text-[#EF4444] italic"
                style={{ left: "54%", top: "48%" }}
              >
                eSchool
              </div>

              {/* 6. CoThink (Featured Blue Hero Badge) */}
              <div 
                className="absolute -translate-y-1/2 flex items-center gap-1.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] px-3.5 py-1 text-[14px] font-black text-[#1E40AF] shadow-sm"
                style={{ left: "68%", top: "52%" }}
              >
                <span>📘</span>
                <span>CoThink</span>
              </div>

              {/* 7. Reddit (Bottom-Left) */}
              <div 
                className="absolute -translate-y-1/2 flex items-center gap-1 font-bold text-[#FF4500] text-[14px]"
                style={{ left: "28%", top: "54%" }}
              >
                <span className="text-base">🔴</span>
                <span>reddit</span>
              </div>

              {/* 8. Brainly (Black badge near center-left) */}
              <div 
                className="absolute -translate-y-1/2 rounded bg-black px-2.5 py-1 text-[11px] font-black text-white uppercase tracking-wider shadow-sm"
                style={{ left: "40%", top: "52%" }}
              >
                BRAINLY
              </div>

              {/* 9. Medium (Black icon + text) */}
              <div 
                className="absolute -translate-y-1/2 flex items-center gap-1 font-bold text-black text-[13px]"
                style={{ left: "54%", top: "65%" }}
              >
                <span>⚫</span>
                <span>Medium</span>
              </div>

              {/* 10. Gradient Sphere Badge */}
              <div 
                className="absolute -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-tr from-purple-700 via-pink-600 to-amber-500 shadow-md flex items-center justify-center text-[7px] text-white font-bold"
                style={{ left: "43%", top: "65%" }}
              >
                ✦
              </div>

            </div>

            {/* Slide Footer */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-4 border-t border-gray-100">
              <span>CoThink Startup Pitch Deck</span>
              <span>Slayd 4 / {totalSlides}</span>
            </div>
          </div>

          {/* Slide 5 (Bazar Potensialı 246K TAM) - Continuous presentation flow */}
          <div
            ref={slide5Ref}
            className="w-[880px] max-w-full aspect-[16/9] bg-white rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col justify-end transition-transform duration-200 origin-top"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Deep blue arched wave banner */}
            <div className="absolute inset-0 top-10 bg-[#1D4ED8] rounded-t-[200px] flex items-center justify-between px-16 text-white pt-6">
              <div>
                <h3 className="text-[36px] font-black tracking-tight">Bazar Potensialı</h3>
                <p className="text-sm text-blue-200 mt-1">Azərbaycan və regional tələbə və akademik resurs bazarı</p>
              </div>
              <div className="text-right">
                <span className="text-[54px] font-black tracking-tight">246K</span>
                <span className="block text-sm font-bold text-blue-200 uppercase tracking-widest">TAM</span>
              </div>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
