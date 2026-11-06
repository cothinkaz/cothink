import { useState } from "react";
import { EDUCATION_LEVELS, RESOURCE_FILTER_CATEGORIES, LANGUAGES, FORMATS, DATE_OPTIONS, SORT_OPTIONS, defaultResourceFilters } from "../utils/resources/filters/resourceFilterOptions";
import { FilterSection, RadioChoices, CheckboxChoices, LanguageChoices, OtherOption, PageLimit, SearchIcon, ChevronDown } from "../utils/resources/filters/FilterControls";
import useModalDismiss from "../utils/resources/shared/useModalDismiss";

export default function ResourceFilterModal({ initialFilters, onApply, onClose }) {
  const [draft, setDraft] = useState(initialFilters);
  const [catSearch, setCatSearch] = useState("");
  useModalDismiss(onClose);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const toggle = (key, value) => setDraft((current) => ({ ...current,
    [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value],
  }));
  const categories = RESOURCE_FILTER_CATEGORIES.filter((category) => category.toLowerCase().includes(catSearch.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="res-filter-title" className="relative max-h-[92vh] w-full max-w-[704px] overflow-y-auto rounded-[24px] bg-white px-5 py-8 sm:px-16">
        <button type="button" onClick={onClose} aria-label="Bağla" className="absolute right-5 top-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <h2 id="res-filter-title" className="text-center text-[24px] font-semibold text-[#171717]">Filtrasiya</h2>
        <p className="mt-3 text-center text-[16px] text-[#737373]">Sizə uyğun resursları seçmək üçün filtrləri tətbiq edin.</p>
        <FilterSection title="Təhsil səviyyəsi" first>
          <RadioChoices name="education-level" options={EDUCATION_LEVELS} value={draft.educationLevel} onChange={(value) => update("educationLevel", value)} />
        </FilterSection>
        <FilterSection title="Kateqoriya">
          <div className="relative">
            <input type="text" value={catSearch} onChange={(event) => setCatSearch(event.target.value)} placeholder="Kateqoriya axtar..." className="h-[44px] w-full rounded-full border border-[#D9D9D9] px-5 pr-12 text-[14px] outline-none" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2"><SearchIcon /></span>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-3">
            <CheckboxChoices options={categories} selected={draft.categories} onToggle={(value) => toggle("categories", value)} />
            {categories.length === 0 && <p className="text-[14px] text-[#737373]">Kateqoriya tapılmadı.</p>}
          </div>
        </FilterSection>
        <FilterSection title="Dil">
          <div className="flex flex-wrap gap-3"><LanguageChoices options={LANGUAGES} selected={draft.languages} onToggle={(value) => toggle("languages", value)} /><OtherOption language /></div>
        </FilterSection>
        <FilterSection title="Format">
          <div className="flex flex-wrap gap-3"><CheckboxChoices options={FORMATS} selected={draft.formats} onToggle={(value) => toggle("formats", value)} /><OtherOption /></div>
        </FilterSection>
        <FilterSection title="Səhifə sayı"><PageLimit value={draft.pageIndex} onChange={(value) => update("pageIndex", value)} /></FilterSection>
        <FilterSection title="Yüklənmə tarixi"><RadioChoices name="upload-date" options={DATE_OPTIONS} value={draft.date} onChange={(value) => update("date", value)} large /></FilterSection>
        <FilterSection title="Sıralama">
          <div className="relative">
            <select value={draft.sort} onChange={(event) => update("sort", event.target.value)} className="h-[48px] w-full appearance-none rounded-full border border-[#D9D9D9] bg-white px-5 pr-12 text-[14px] text-[#171717] outline-none">
              {SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <ChevronDown size={20} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2" />
          </div>
        </FilterSection>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button type="button" onClick={() => setDraft(defaultResourceFilters)} className="h-[48px] flex-1 rounded-full border border-[#2A4EBB] text-[16px] font-medium text-[#2A4EBB]">Filtrləri sıfırla</button>
          <button type="button" onClick={() => { onApply(draft); onClose(); }} className="h-[48px] flex-1 rounded-full bg-[#2A4EBB] text-[16px] font-medium text-white">Tətbiq et</button>
        </div>
      </div>
    </div>
  );
}
