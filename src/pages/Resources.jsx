import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  RESOURCE_CATEGORIES,
  allResources,
  getLatestResources,
  getPopularResources,
  getRecommendedResources,
} from "../data/resourcesData";
import ResourceCard, { CategoryIcon } from "../components/ResourceCard";
import FeaturedResource from "../components/FeaturedResource";
import ResourcePagination from "../components/ResourcePagination";
import SearchBar from "../components/SearchBar";
import ResourceFilterModal from "../components/ResourceFilterModal";
import {
  defaultResourceFilters,
  countActiveResourceFilters,
  applyResourceFilters,
} from "../utils/resourceUtils";

/* ─── Arrow icon ─── */
const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ─── Horizontal scroll resource section ─── */
const ResourceSection = ({ title, items, linkTo }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-medium text-[#171717]">{title}</h3>
        {linkTo && (
          <Link
            to={linkTo}
            className="flex items-center gap-2 text-[14px] text-[#2A4EBB]"
          >
            Hamısına bax
            <ArrowIcon />
          </Link>
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {items.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
};

/* ─── Category Cards ─── */
const CategoryCards = () => (
  <section className="mt-10">
    <h3 className="text-[20px] font-medium text-[#171717]">Resurs növləri</h3>
    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {RESOURCE_CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          to={`/library/resources/category/${cat.slug}`}
          className="group flex flex-col items-start rounded-[16px] border border-[#E5E7EB] bg-white p-5 transition-all hover:shadow-md"
        >
          <p className="text-[15px] font-semibold text-[#171717]">
            {cat.name}
          </p>
          <p className="mt-1 text-[13px] text-[#737373]">
            {cat.count.toLocaleString()} resurs
          </p>
          <div className="mt-3 self-end">
            <CategoryIcon categoryId={cat.id} size={52} />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

/* ─── Main Resources Page ─── */
const Resources = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultResourceFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const closeModal = useCallback(() => setModalOpen(false), []);
  const filterCount = countActiveResourceFilters(filters);
  const isFiltering = search.trim() !== "" || filterCount > 0;
  const results = useMemo(
    () => applyResourceFilters(allResources, search.trim(), filters),
    [search, filters]
  );
  const totalPages = Math.max(1, Math.ceil(results.length / 15));
  const currentPage = Math.min(page, totalPages);
  const pagedResults = results.slice((currentPage - 1) * 15, currentPage * 15);

  const resetSearch = () => {
    setSearch("");
    setFilters(defaultResourceFilters);
    setPage(1);
  };

  const latest = useMemo(() => getLatestResources(4), []);
  const popular = useMemo(() => getPopularResources(4), []);
  const recommended = useMemo(() => getRecommendedResources(4), []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-[#737373]">
        <span>Kitabxana</span>
        <span className="mx-2">›</span>
        <span className="font-medium text-[#2A4EBB]">Resurslar</span>
      </nav>

      {/* Title */}
      <h2 className="mt-2 text-[32px] font-semibold text-[#171717]">
        Resurslar
      </h2>
      <p className="mt-1 text-[16px] text-[#737373]">
        Öyrənməyə prosesinizi izləyin və davam edin
      </p>

      {/* Search + Filter */}
      <div className="mt-6">
        <SearchBar
          variant="resources"
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onFilterClick={() => setModalOpen(true)}
          filterCount={filterCount}
          placeholder="Axtar"
        />
      </div>

      {isFiltering ? (
        <section className="mt-10" aria-label="Axtarış nəticələri">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 aria-live="polite" className="text-[20px] font-medium text-[#171717]">
              Nəticələr ({results.length})
            </h3>
            <button type="button" onClick={resetSearch} className="text-[14px] text-[#2A4EBB] hover:underline">
              Axtarışı və filtrləri sıfırla
            </button>
          </div>
          {results.length > 0 ? (
            <>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {pagedResults.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
              </div>
              <ResourcePagination
                current={currentPage}
                total={totalPages}
                onChange={(nextPage) => {
                  setPage(nextPage);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </>
          ) : (
            <p className="py-16 text-center text-[#737373]">Axtarışınıza uyğun resurs tapılmadı.</p>
          )}
        </section>
      ) : (
        <>
          <FeaturedResource />
          <CategoryCards />
          <ResourceSection
            title="Ən son paylaşılan resurslar"
            items={latest}
            linkTo="/library/resources/latest"
          />
          <ResourceSection
            title="Populyar resurslar"
            items={popular}
            linkTo="/library/resources/popular"
          />
          <ResourceSection
            title="Tövsiyə olunan resurslar"
            items={recommended}
            linkTo="/library/resources/recommended"
          />
        </>
      )}

      {/* Filter modal */}
      {modalOpen && (
        <ResourceFilterModal
          initialFilters={filters}
          onApply={(nextFilters) => {
            setFilters(nextFilters);
            setPage(1);
          }}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Resources;
