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
    <div className="flex items-center gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <span className="absolute left-5 top-1/2 -translate-y-1/2">
          <img src={searchIcon} alt="search" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[50px] w-full rounded-full border border-[#D9D9D9] pl-14 pr-5 text-[16px] outline-none"
        />
      </div>

      {/* Filter */}
      <button
        type="button"
        onClick={onFilterClick}
        className="flex h-[50px] items-center gap-3 rounded-full border border-[#D9D9D9] px-6 text-[16px] text-[#404040]"
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