import searchIcon from "../assets/search-normal.svg";
import filterIcon from "../assets/filter.svg";

const SearchBar = ({
  value,
  onChange,
  onFilterClick,
  filterCount = 0,
  placeholder = "Bloqları axtar",
  variant = "default",
}) => {
  const resourceVariant = variant === "resources";
  return (
    <div className={resourceVariant ? "flex flex-col gap-3 sm:flex-row sm:items-center" : "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"}>
      {/* Search */}
      <div className={resourceVariant ? "relative w-full min-w-0 flex-1" : "relative w-full sm:flex-1"}>
        <span className={resourceVariant ? "absolute left-5 top-1/2 -translate-y-1/2" : "absolute left-4 top-1/2 -translate-y-1/2 sm:left-5"}>
          <img src={searchIcon} alt={resourceVariant ? "" : "search"} className="h-5 w-5" />
        </span>

        <input
          type={resourceVariant ? "search" : "text"}
          aria-label={resourceVariant ? "Resursları axtar" : undefined}
          enterKeyHint={resourceVariant ? "search" : undefined}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={resourceVariant ? "h-[50px] w-full rounded-full border border-[#D9D9D9] pl-14 pr-12 text-[16px] outline-none focus-visible:ring-2 focus-visible:ring-[#2A4EBB]/30 [&::-webkit-search-cancel-button]:appearance-none" : "h-[44px] w-full rounded-full border border-[#D9D9D9] pl-12 pr-4 text-[14px] outline-none sm:h-[50px] sm:pl-14 sm:pr-5 sm:text-[16px]"}
        />
        {resourceVariant && value && (
          <button
            type="button"
            aria-label="Axtarışı təmizlə"
            onClick={() => onChange("")}
            className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#737373] hover:bg-[#F5F5F5] focus-visible:outline-2 focus-visible:outline-[#2A4EBB]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter */}
      <button
        type="button"
        onClick={onFilterClick}
        className={resourceVariant ? "flex h-[50px] w-full shrink-0 items-center justify-center gap-3 rounded-full border border-[#D9D9D9] px-6 text-[16px] text-[#404040] sm:w-auto" : "flex h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-full border border-[#D9D9D9] px-6 text-[14px] text-[#404040] sm:h-[50px] sm:w-auto sm:gap-3 sm:text-[16px]"}
      >
        <img src={filterIcon} alt="" />
        Filtrlə
        {filterCount > 0 && (
          <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#2A4EBB] px-1 text-[12px] text-white">
            {filterCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
