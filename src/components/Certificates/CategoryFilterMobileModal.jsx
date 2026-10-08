function CategoryFilterMobileModal({
  setFilterOpen,
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div
      className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={() => setFilterOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Kateqoriya"
        className="bg-white w-full max-w-[400px] rounded-[24px] shadow-[0_20px_60px_rgba(15,23,42,0.25)] max-h-[80vh] overflow-y-auto animate-[modalIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#E4E6EE]">
          <div>
            <h3 className="text-[18px] font-semibold text-[#050505]">Kateqoriya</h3>
            <p className="text-[12px] text-[#737373]">Sertifikatları kateqoriyaya görə süzün</p>
          </div>
          <button
            type="button"
            aria-label="Bağla"
            className="w-[32px] h-[32px] shrink-0 rounded-full bg-[#F2F4F7] text-[#404040] text-[20px] leading-none flex items-center justify-center"
            onClick={() => setFilterOpen(false)}
          >
            ×
          </button>
        </div>

        {/* kateqoriyalar */}
        <div className="flex flex-wrap gap-[10px] p-5">
          {["Hamısı", ...categories].map((item) => {
            const isActive = activeCategory === item;

            return (
              <button
                key={item}
                type="button"
                className={`flex items-center gap-[6px] px-4 py-2 rounded-[55px] border text-[14px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#C8D6FF] text-[#213D92] border-[#213D92]/20"
                    : "bg-white text-[#050505] border-[#D9D9D9] active:bg-[#F2F4F7]"
                }`}
                onClick={() => {
                  setActiveCategory(item);
                  setFilterOpen(false);
                }}
              >
                {isActive && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                )}
                {item}
              </button>
            );
          })}
        </div>

        {/* alt: sifirla */}
        {activeCategory !== "Hamısı" && (
          <div className="px-5 pb-5">
            <button
              type="button"
              className="w-full h-[44px] rounded-[40px] border border-[#2A4EBB] text-[14px] text-[#2A4EBB]"
              onClick={() => {
                setActiveCategory("Hamısı");
                setFilterOpen(false);
              }}
            >
              Filtri sıfırla
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryFilterMobileModal;