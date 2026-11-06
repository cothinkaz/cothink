import { useNavigate } from "react-router-dom";
import ReaderColorPalette from "./ReaderColorPalette";

export default function ReaderHeader({ title, totalPages, variant, controls }) {
  const navigate = useNavigate();
  const { currentPage, zoom, searchOpen, setSearchOpen, isBookmarked, setIsBookmarked,
    penMenuOpen, setPenMenuOpen, scrollToPage, zoomIn, zoomOut, resetZoom } = controls;
  return (
    <header className="shrink-0 bg-white border-b border-[#E5E7EB] shadow-sm z-30">

      <div className="flex h-[52px] items-center justify-between px-6">

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

        <h1 className={variant === "book" ? "text-[17px] font-bold tracking-wider text-[#111827] uppercase" : "text-[17px] font-bold tracking-wide text-[#111827]"}>
          {title}
        </h1>

        <div className="relative flex items-center gap-2.5">

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

          {penMenuOpen && <ReaderColorPalette variant={variant} {...controls} />}
        </div>
      </div>

      <div className="flex h-[44px] items-center justify-between border-t border-gray-100 px-6">

        <div className="flex items-center gap-3 text-[13px] text-gray-600">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500">Səhifə</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => scrollToPage(Math.max(1, Math.min(totalPages, Number(e.target.value) || 1)))}
              className="h-6 w-12 rounded border border-gray-300 text-center font-medium text-gray-800 outline-none focus:border-blue-500 text-[13px]"
            />
            <span className="text-gray-500">/ {totalPages}</span>
          </div>

          <div className="h-4 w-px bg-gray-200 mx-1" />

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

        <div className="flex flex-1 max-w-[460px] items-center ml-8">
          <div
            className="relative h-[3px] flex-1 rounded-full bg-gray-200 cursor-pointer overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              scrollToPage(Math.max(1, Math.round(pos * totalPages)));
            }}
          >
            <div
              className="h-full rounded-full bg-[#2563EB] transition-all duration-200"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>
      </div>

    </header>
  );
}
