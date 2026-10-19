import { useCallback, useMemo, useState } from "react";
import { blogs } from "../blogData/blogData.js";
import BlogCard from "../components/BlogCard";
import BlogListCard from "../components/BlogListCard";
import SearchBar from "../components/SearchBar";
import CategoryChips from "../components/CategoryChips";
import FilterModal from "../components/FilterModal";
import {
  applyFilters,
  countActiveFilters,
  defaultFilters,
  parseViews,
} from "../utils/blogUtils";

const LIST_STEP = 4; // "Daha çox göstər" hər dəfə neçə bloq əlavə edir

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const Grid = ({ items }) => (
  <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {items.map((blog) => (
      <BlogCard key={blog.id} blog={blog} />
    ))}
  </div>
);

const Section = ({ title, items, expanded, onToggle }) => {
  if (items.length === 0) return null;

  const visible = expanded ? items : items.slice(0, 3);

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-medium text-[#171717] sm:text-[24px]">{title}</h3>

        {items.length > 3 && (
          <button
            type="button"
            onClick={onToggle}
            className="flex items-center gap-2 text-[14px] text-[#2A4EBB]"
          >
            {expanded ? "Daha az" : "Hamısına bax"}
            <ArrowIcon />
          </button>
        )}
      </div>

      <Grid items={visible} />
    </section>
  );
};

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const [visibleCount, setVisibleCount] = useState(LIST_STEP);

  const closeModal = useCallback(() => setModalOpen(false), []);

  /* Yalnız datada olan kateqoriyalar və dillər */
  const categories = useMemo(
    () => [...new Set(blogs.map((b) => b.category))],
    []
  );
  const languages = useMemo(
    () => [...new Set(blogs.map((b) => b.language).filter(Boolean))],
    []
  );

  const filterCount = countActiveFilters(filters);
  const isFiltering = search.trim() !== "" || filterCount > 0;

  const results = useMemo(
    () => applyFilters(blogs, search.trim(), filters),
    [search, filters]
  );

  /* Populyarlıq = baxış sayı. Ən çox baxılan ən yuxarıda */
  const popular = useMemo(
    () => [...blogs].sort((a, b) => parseViews(b.views) - parseViews(a.views)),
    []
  );

  /* Ən yeni tarixdən köhnəyə */
  const latest = useMemo(() => applyFilters(blogs, "", defaultFilters), []);

  const handleCategorySelect = (cat) => {
    setFilters((f) => ({ ...f, categories: cat ? [cat] : [] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-[32px] font-semibold">Bloqlar</p>

      <p className="text-[#737373] text-[24px]">
        Təcrübələrini paylaş, öyrən və akademik müzakirələrə qoşul.
      </p>

      <div className="mt-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          onFilterClick={() => setModalOpen(true)}
          filterCount={filterCount}
        />
      </div>

      <div className="mt-6">
        <CategoryChips
          categories={categories}
          selected={filters.categories}
          onSelect={handleCategorySelect}
        />
      </div>

      {isFiltering ? (
        <section className="mt-10">
          {results.length > 0 ? (
            <Grid items={results} />
          ) : (
            <p className="mt-10 text-center text-[#737373]">
              Axtarışınıza uyğun bloq tapılmadı.
            </p>
          )}
        </section>
      ) : (
        <>
          <Section
            title="Populyar olan bloqlar"
            items={popular}
            expanded={showAllPopular}
            onToggle={() => setShowAllPopular((v) => !v)}
          />

          <Section
            title="Ən son paylaşılan bloqlar"
            items={latest}
            expanded={showAllLatest}
            onToggle={() => setShowAllLatest((v) => !v)}
          />

          {/* Bütün bloqlar: üfüqi kartlarla siyahı */}
          <section className="mt-10">
            <h3 className="text-[18px] font-medium text-[#171717] sm:text-[24px]">
              Bütün bloqlar
            </h3>

            {/* Hamısı bir ümumi çərçivədə, sətirlər xətlə ayrılır */}
            <div className="mt-5 divide-y divide-[#E5E5E5] overflow-hidden rounded-[20px] border border-[#D9D9D9] bg-white">
              {latest.slice(0, visibleCount).map((blog) => (
                <BlogListCard key={blog.id} blog={blog} />
              ))}
            </div>

            {visibleCount < latest.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + LIST_STEP)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-[#C7D3FB] bg-white py-3 text-[14px] text-[#404040]"
              >
                Daha çoxuna bax
                <ChevronDownIcon />
              </button>
            )}
          </section>
        </>
      )}

      {modalOpen && (
        <FilterModal
          categories={categories}
          languages={languages}
          initialFilters={filters}
          onApply={setFilters}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Blogs;