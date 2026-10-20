import { useCallback, useEffect, useRef, useState } from "react";

const chipBase =
  "shrink-0 rounded-full border px-4 py-1.5 text-[13px] transition-colors sm:px-5 sm:py-2 sm:text-[14px]";
const chipActive = "border-[#C7D3FB] bg-[#C7D3FB] text-[#1F2A5A]";
const chipIdle = "border-[#D9D9D9] bg-white text-[#171717] hover:bg-[#F5F5F5]";

const SCROLL_STEP = 300;

const CategoryChips = ({ categories, selected, onSelect }) => {
  const rowRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);
  const [direction, setDirection] = useState("right"); // "right" | "left"

  const updateState = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;

    setCanScroll(el.scrollWidth > el.clientWidth + 4);

    const atStart = el.scrollLeft <= 4;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;

    // Sona çatanda sola, başa çatanda sağa dön. Ortada istiqamət dəyişmir.
    if (atEnd) setDirection("left");
    else if (atStart) setDirection("right");
  }, []);

  useEffect(() => {
    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, [updateState, categories]);

  const handleArrow = () => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "right" ? SCROLL_STEP : -SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const isLeft = direction === "left";

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        ref={rowRef}
        onScroll={updateState}
        className="flex flex-1 items-center gap-2 overflow-x-auto sm:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

      {canScroll && (
        <button
          type="button"
          onClick={handleArrow}
          aria-label={isLeft ? "Əvvəlki kateqoriyalar" : "Növbəti kateqoriyalar"}
          className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-[#D9D9D9] bg-white sm:h-[40px] sm:w-[40px]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#171717"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${isLeft ? "rotate-180" : ""}`}
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CategoryChips;