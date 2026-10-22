import searchIcon from "../assets/search-normal.svg";
import filterIcon from "../assets/filter.svg";

const SearchBar = ({
  value,
  onChange,
  onFilterClick,
  filterCount = 0,
  placeholder = "Bloqları axtar",
}) => {
  return (
    // Mobildə alt-alta, sm və yuxarıda yan-yana
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Search */}
      <div className="relative w-full sm:flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 sm:left-5">
          <img src={searchIcon} alt="search" className="h-5 w-5" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[44px] w-full rounded-full border border-[#D9D9D9] pl-12 pr-4 text-[14px] outline-none sm:h-[50px] sm:pl-14 sm:pr-5 sm:text-[16px]"
        />
      </div>

      {/* Filter */}
      <button
        type="button"
        onClick={onFilterClick}
        className="flex h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-full border border-[#D9D9D9] px-6 text-[14px] text-[#404040] sm:h-[50px] sm:w-auto sm:gap-3 sm:text-[16px]"
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