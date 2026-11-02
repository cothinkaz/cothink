import { searchBarStyles } from "../utils/resources/shared/searchBarStyles";
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
  const styles = searchBarStyles[resourceVariant ? "resources" : "default"];
  return (
    <div className={styles.container}>
      {/* Search */}
      <div className={styles.inputContainer}>
        <span className={styles.icon}>
          <img src={searchIcon} alt={resourceVariant ? "" : "search"} className="h-5 w-5" />
        </span>

        <input
          type={resourceVariant ? "search" : "text"}
          aria-label={resourceVariant ? "Resursları axtar" : undefined}
          enterKeyHint={resourceVariant ? "search" : undefined}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
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
        className={styles.filter}
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
