import { useRef } from "react";

const chipBase =
  "shrink-0 rounded-full border px-5 py-2 text-[14px] transition-colors";
const chipActive = "border-[#C7D3FB] bg-[#C7D3FB] text-[#1F2A5A]";
const chipIdle = "border-[#D9D9D9] bg-white text-[#171717] hover:bg-[#F5F5F5]";

const CategoryChips = ({ categories, selected, onSelect }) => {
  const rowRef = useRef(null);

  const scrollNext = () =>
    rowRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="flex items-center gap-3">
      <div
        ref={rowRef}
        className="flex flex-1 items-center gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={`${chipBase} ${selected.length === 0 ? chipActive : chipIdle}`}
        >
          Hamısı
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`${chipBase} ${selected.includes(cat) ? chipActive : chipIdle}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Növbəti kateqoriyalar"
        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[#D9D9D9] bg-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171717"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryChips;