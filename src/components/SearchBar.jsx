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
    <div className={resourceVariant ? "flex flex-col gap-3 sm:flex-row sm:items-center" : "flex items-center gap-4"}>
      {/* Search */}
      <div className={resourceVariant ? "relative w-full min-w-0 flex-1" : "relative flex-1"}>
        <span className="absolute left-5 top-1/2 -translate-y-1/2">
          <img src={searchIcon} alt={resourceVariant ? "" : "search"} />
        </span>

        <input
          type={resourceVariant ? "search" : "text"}
          aria-label={resourceVariant ? "Resursları axtar" : undefined}
          enterKeyHint={resourceVariant ? "search" : undefined}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-[50px] w-full rounded-full border border-[#D9D9D9] pl-14 text-[16px] outline-none ${resourceVariant ? "pr-12 focus-visible:ring-2 focus-visible:ring-[#2A4EBB]/30 [&::-webkit-search-cancel-button]:appearance-none" : "pr-5"}`}
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
        className={`flex h-[50px] items-center gap-3 rounded-full border border-[#D9D9D9] px-6 text-[16px] text-[#404040] ${resourceVariant ? "w-full shrink-0 justify-center sm:w-auto" : ""}`}
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
