import { useState, useRef, useEffect } from "react";
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

export default function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const resource = getResourceById(id) || {
    id: "bedii-1",
    title: "İKİGAİ",
    pages: 1200,
  };

  const [currentPage, setCurrentPage] = useState(257);
  const totalPages = 1200;
  const [zoom, setZoom] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [penMenuOpen, setPenMenuOpen] = useState(true);
  const [activeColor, setActiveColor] = useState("#9751F2"); // Exact color from Figma
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customHex, setCustomHex] = useState("#9751F2");

  const page256Ref = useRef(null);
  const page257Ref = useRef(null);
  const page258Ref = useRef(null);
  const page259Ref = useRef(null);

  const zoomIn = () => setZoom((z) => Math.min(z + 10, 150));
  const zoomOut = () => setZoom((z) => Math.max(z - 10, 70));
  const resetZoom = () => setZoom(100);

  const thumbnailPages = [256, 257, 258, 259];

  const scrollToPage = (pageNum) => {
    setCurrentPage(pageNum);
    const refMap = {
      256: page256Ref,
      257: page257Ref,
      258: page258Ref,
      259: page259Ref,
    };
    if (refMap[pageNum]?.current) {
      refMap[pageNum].current.scrollIntoView({ behavior: "smooth", block: "start" });
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

          {/* Center: Book Title */}
          <h1 className="text-[17px] font-bold tracking-wider text-[#111827] uppercase">
            {resource.title || "İKİGAİ"}
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

            {/* ─── Floating Color Palette Dropdown (Exact Figma Popup) ─── */}
            {penMenuOpen && (
              <div className="absolute right-0 top-11 z-50 w-[230px] rounded-[16px] border border-gray-100 bg-white p-3.5 shadow-2xl">
                
                {/* Preset colors */}
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

                {/* 2D Spectrum Palette */}
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

                  {/* Sliders */}
                  <div className="mt-2 space-y-1.5">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      defaultValue="270"
                      onChange={(e) => {
                        const hue = e.target.value;
                        const newColor = `hsl(${hue}, 85%, 65%)`;
                        setActiveColor(newColor);
                        setCustomHex(newColor);
                      }}
                      className="h-1.5 w-full appearance-none rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 outline-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="10"
                      max="100"
                      defaultValue="80"
                      className="h-1.5 w-full appearance-none rounded-full bg-gradient-to-r from-transparent to-purple-600 outline-none cursor-pointer"
                    />
                  </div>

                  {/* HEX & RGB inputs matching design screenshot: #9751F2, 151, 81, 242 */}
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-500 pt-1.5 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-5 w-5 shrink-0 rounded-md border border-gray-200 shadow-sm"
                        style={{ backgroundColor: activeColor }}
                      />
                      <span className="font-medium text-gray-600">HEX</span>
                      <input
                        type="text"
                        value={customHex}
                        onChange={(e) => setCustomHex(e.target.value)}
                        className="w-16 rounded border border-gray-200 px-1 py-0.5 text-center font-mono text-[10.5px] text-gray-700 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-gray-600">
                      <span>151</span>
                      <span>81</span>
                      <span>242</span>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Sub-toolbar (Page input, Zoom, Progress Line) */}
        <div className="flex h-[44px] items-center justify-between border-t border-gray-100 px-6">
          {/* Left: Səhifə [ 257 ] / 1200 | — 100% + */}
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

          {/* Right: Blue Progress Line extending across subtoolbar */}
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

      {/* ─── Search Bar Overlay ─── */}
      {searchOpen && (
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-2 flex items-center gap-3 z-20">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitab daxilində axtar..."
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
          MAIN VIEWPORT: LEFT THUMBNAILS + RIGHT CONTINUOUS PDF CANVAS
      ════════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Column: Authentic Page Thumbnails Sidebar */}
        <aside className="w-[145px] shrink-0 overflow-y-auto border-r border-[#E5E7EB] bg-white p-3 space-y-5">
          {thumbnailPages.map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <div
                key={pageNum}
                onClick={() => scrollToPage(pageNum)}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                {/* Bold page number on left */}
                <span className={`text-[14px] font-bold w-7 text-right pt-2 ${
                  isActive ? "text-[#111827]" : "text-gray-400 group-hover:text-gray-700"
                }`}>
                  {pageNum}
                </span>

                {/* Miniature page representation */}
                <div
                  className={`w-[84px] h-[116px] rounded-[2px] bg-white p-2 flex flex-col justify-between transition-all ${
                    isActive
                      ? "border-[2px] border-[#2563EB] shadow-md ring-1 ring-blue-100"
                      : "border border-gray-200 shadow-sm group-hover:border-gray-400"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="h-1 w-3/4 rounded-full bg-gray-400" />
                    <div className="h-0.5 w-full rounded-full bg-gray-300" />
                    <div className="h-0.5 w-full rounded-full bg-gray-300" />
                    <div className="h-0.5 w-5/6 rounded-full bg-gray-300" />
                    <div className="h-0.5 w-full rounded-full bg-gray-300" />
                    <div className="h-0.5 w-4/5 rounded-full bg-gray-300" />
                    <div className="h-0.5 w-full rounded-full bg-gray-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-0.5 w-full rounded-full bg-gray-300" />
                    <div className="h-0.5 w-3/4 rounded-full bg-gray-300" />
                    <div className="h-0.5 w-1/2 rounded-full bg-gray-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </aside>

        {/* Right Canvas: Real Continuous PDF Document View on #525659 background */}
        <main className="flex-1 overflow-y-auto py-10 px-6 flex flex-col items-center gap-8">
          
          {/* Page 256 (Preceding Page) */}
          <div
            ref={page256Ref}
            className="bg-white rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-[720px] max-w-full min-h-[960px] p-12 md:p-16 transition-transform duration-200 origin-top text-[#1F2937]"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <div className="space-y-5 text-[13.5px] leading-[1.75] text-[#222222] text-justify font-serif">
              <p>
                Chapter 3: Algorithms and Computational Complexity. An algorithm is a finite sequence of precise instructions for solving a problem or performing a computation. The study of algorithms is at the very core of computer science, providing the theoretical and practical foundation for writing efficient computer programs.
              </p>
              <p>
                When an algorithm is executed on a computer, it consumes computational resources such as processor time and memory. The efficiency of an algorithm is analyzed using Big-O notation, which measures the rate at which its running time grows as the input size increases. This analytical approach enables software engineers to evaluate different algorithms and choose the most suitable one for large-scale applications.
              </p>
            </div>
            <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>CoThink Digital Library</span>
              <span>Səhifə 256 / {totalPages}</span>
            </div>
          </div>

          {/* Page 257 (Main Active PDF Page matching Figma screenshot) */}
          <div
            ref={page257Ref}
            className="bg-white rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-[720px] max-w-full min-h-[960px] p-12 md:p-16 transition-transform duration-200 origin-top text-[#1F2937]"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Document Header (2-line split matching design screenshot) */}
            <div className="mb-8 text-center px-6">
              <h2 className="text-[15px] font-bold tracking-tight text-[#111827] leading-snug">
                Rosen_Discrete_Mathematics_and_Its_Applica<br />tions_7th_Edition
              </h2>
            </div>

            {/* Document Body Text (Exact paragraphs from Figma design) */}
            <div className="space-y-5 text-[13.5px] leading-[1.75] text-[#222222] text-justify font-serif selection:bg-[#E0D4FC]">
              <p>
                &ldquo;Discrete Mathematics and Its Applications&rdquo; by Kenneth H. Rosen is one of the most widely recognized and extensively used textbooks in the fields of computer science, mathematics, and engineering. The seventh edition of this book continues to uphold its reputation by offering a clear, thorough, and well-organized introduction to the essential ideas and principles that form the foundation of discrete mathematics. It is designed not only for students majoring in computer science and engineering but also for anyone who seeks a solid mathematical background to understand computational thinking and modern problem-solving techniques.
              </p>

              <p>
                The book carefully balances theoretical foundations with practical applications, helping readers see how abstract mathematical structures are directly relevant to computer algorithms, programming, and real-world systems. Core topics covered include logic, set theory, functions, algorithms, number theory, combinatorics, and graph theory. In addition, the text explores probability, relations, Boolean algebra, and recurrence relations, providing students with the tools they need to model and analyze complex computational problems.
              </p>

              <p>
                Each chapter is logically structured and pedagogically sound, beginning with fundamental definitions and gradually progressing toward more advanced topics. Rosen ensures that readers are never overwhelmed by complexity by providing numerous illustrative examples, diagrams, and detailed explanations. These examples bridge the gap between theory and practice, demonstrating how discrete mathematical principles are used in data structures, algorithm design, and computer systems.
              </p>

              <p>
                One of the key strengths of Rosen&apos;s work is its balance between mathematical rigor and accessibility. The author avoids unnecessary formalism but never sacrifices precision, making the material approachable for beginners while still challenging for advanced learners. The book includes a diverse range of exercises at the end of each section &mdash; from straightforward computations to complex proofs and real-world applications &mdash; allowing students to test their understanding and develop deeper analytical skills.
              </p>

              <p>
                Furthermore, the seventh edition updates its examples and problem sets to reflect modern computational practices and technologies, showing how discrete mathematics underpins areas such as cryptography, network theory, and computer security. Throughout the text, real-world case studies and algorithmic illustrations are incorporated to highlight practical applications in contemporary computer science.
              </p>
            </div>

            {/* Page number footer */}
            <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>CoThink Digital Library</span>
              <span>Səhifə 257 / {totalPages}</span>
            </div>
          </div>

          {/* Page 258 (Subsequent Page) */}
          <div
            ref={page258Ref}
            className="bg-white rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-[720px] max-w-full min-h-[960px] p-12 md:p-16 transition-transform duration-200 origin-top text-[#1F2937]"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <div className="space-y-5 text-[13.5px] leading-[1.75] text-[#222222] text-justify font-serif">
              <p>
                Chapter 4: Number Theory and Cryptography. Number theory is the branch of mathematics that explores the properties of integers. While it was once considered one of the purest and most theoretical fields of mathematics with little practical application, today it plays an indispensable role in modern computer algorithms and network security.
              </p>
              <p>
                Every secure transaction performed over the Internet relies heavily on concepts from elementary number theory, including prime factorization, modular arithmetic, and the Euclidean algorithm for computing greatest common divisors.
              </p>
            </div>
            <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>CoThink Digital Library</span>
              <span>Səhifə 258 / {totalPages}</span>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
