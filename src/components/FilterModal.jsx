import { useEffect, useState } from "react";
import {
  DATE_OPTIONS,
  READ_STEPS,
  READ_LAST_INDEX,
  SORT_OPTIONS,
  defaultFilters,
} from "../utils/blogUtils";

const BLUE = "#2A4EBB";

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#404040"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={BLUE}
       strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

const SectionTitle = ({ children }) => (
  <p className="mb-3 text-[16px] font-medium text-[#171717]">{children}</p>
);

const FilterModal = ({ categories, languages, initialFilters, onApply, onClose }) => {
  const [draft, setDraft] = useState(initialFilters);
  const [catSearch, setCatSearch] = useState("");

  /* Escape ilə bağla + arxa fonun scroll-unu dayandır */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const toggle = (key, value) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value)
        ? d[key].filter((v) => v !== value)
        : [...d[key], value],
    }));

  const visibleCategories = categories.filter((c) =>
    c.toLowerCase().includes(catSearch.toLowerCase())
  );

  const fillPercent = (draft.readIndex / READ_LAST_INDEX) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        className="relative max-h-[92vh] w-full max-w-[704px] overflow-y-auto rounded-[24px] bg-white px-5 py-8 sm:px-16"
      >
        {/* Bağla */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Bağla"
          className="absolute right-5 top-5"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#171717"
               strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h2 id="filter-title" className="text-center text-[24px] font-semibold text-[#171717]">
          Filtrasiya
        </h2>
        <p className="mt-3 text-center text-[16px] text-[#737373]">
          Sizə uyğun bloqları seçmək üçün filtrləri tətbiq edin.
        </p>

        {/* Kateqoriya */}
        <div className="mt-8">
          <SectionTitle>Kateqoriya</SectionTitle>

          <div className="relative">
            <input
              type="text"
              value={catSearch}
              onChange={(e) => setCatSearch(e.target.value)}
              placeholder="Kateqoriya axtar..."
              className="h-[44px] w-full rounded-full border border-[#D9D9D9] px-5 pr-12 text-[14px] outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-3">
            {visibleCategories.map((cat) => {
              const checked = draft.categories.includes(cat);
              return (
                <label
                  key={cat}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[14px] focus-within:ring-2 focus-within:ring-[#2A4EBB]/30 ${
                    checked
                      ? "border-[#2A4EBB] text-[#2A4EBB]"
                      : "border-[#BDBDBD] text-[#404040]"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggle("categories", cat)}
                  />
                  <span
                    className={`flex h-[16px] w-[16px] items-center justify-center rounded-[4px] border ${
                      checked ? "border-[#2A4EBB]" : "border-[#737373]"
                    }`}
                  >
                    {checked && <CheckIcon />}
                  </span>
                  {cat}
                </label>
              );
            })}

            {visibleCategories.length === 0 && (
              <p className="text-[14px] text-[#737373]">Kateqoriya tapılmadı.</p>
            )}
          </div>
        </div>

        {/* Dil */}
        <div className="mt-7 border-t border-[#EEEEEE] pt-6">
          <SectionTitle>Dil</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => {
              const selected = draft.languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggle("languages", lang)}
                  className={`rounded-full border px-5 py-2 text-[14px] ${
                    selected
                      ? "border-[#2A4EBB] bg-[#F2F5FF] text-[#2A4EBB]"
                      : "border-[#BDBDBD] text-[#404040]"
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Oxuma dəqiqəsi */}
        <div className="mt-7">
          <SectionTitle>Oxuma dəqiqəsi</SectionTitle>

          <div className="px-3">
            <div className="relative h-[16px]">
              <div className="absolute left-0 right-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-[#EEEEEE]" />
              <div
                className="absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full"
                style={{ width: `${fillPercent}%`, backgroundColor: BLUE }}
              />

              {READ_STEPS.map((step, i) => (
                <button
                  key={step}
                  type="button"
                  aria-label={`${step}${i === READ_LAST_INDEX ? "+" : ""} dəqiqə`}
                  onClick={() => setDraft((d) => ({ ...d, readIndex: i }))}
                  className="absolute top-1/2 h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${(i / READ_LAST_INDEX) * 100}%`,
                    backgroundColor: i <= draft.readIndex ? BLUE : "#EEEEEE",
                  }}
                />
              ))}
            </div>

            <div className="relative mt-2 h-[18px] text-[12px] text-[#404040]">
              {READ_STEPS.map((step, i) => (
                <span
                  key={step}
                  className="absolute -translate-x-1/2"
                  style={{ left: `${(i / READ_LAST_INDEX) * 100}%` }}
                >
                  {step}
                  {i === READ_LAST_INDEX ? "+" : ""}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Yüklənmə tarixi */}
        <div className="mt-7">
          <SectionTitle>Yüklənmə tarixi</SectionTitle>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {DATE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2 text-[14px] text-[#404040]"
              >
                <input
                  type="radio"
                  name="upload-date"
                  checked={draft.date === opt.value}
                  onChange={() => setDraft((d) => ({ ...d, date: opt.value }))}
                  className="h-[22px] w-[22px] cursor-pointer accent-[#2A4EBB]"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Sıralama */}
        <div className="mt-7">
          <SectionTitle>Sıralama</SectionTitle>
          <div className="relative">
            <select
              value={draft.sort}
              onChange={(e) => setDraft((d) => ({ ...d, sort: e.target.value }))}
              className="h-[48px] w-full appearance-none rounded-full border border-[#D9D9D9] bg-white px-5 pr-12 text-[14px] text-[#171717] outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171717"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Düymələr */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => setDraft(defaultFilters)}
            className="h-[48px] flex-1 rounded-full border border-[#2A4EBB] text-[16px] font-medium text-[#2A4EBB]"
          >
            Filtrləri sıfırla
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(draft);
              onClose();
            }}
            className="h-[48px] flex-1 rounded-full bg-[#2A4EBB] text-[16px] font-medium text-white"
          >
            Tətbiq et
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;