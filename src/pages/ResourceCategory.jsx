import { useCallback, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getCategoryBySlug,
  getResourcesByCategory,
} from "../data/resourcesData";
import ResourceCard, { CategoryIcon } from "../components/ResourceCard";
import SearchBar from "../components/SearchBar";
import ResourceFilterModal from "../components/ResourceFilterModal";
import ResourcePagination from "../components/ResourcePagination";
import {
  defaultResourceFilters,
  countActiveResourceFilters,
  applyResourceFilters,
} from "../utils/resourceUtils";

const ITEMS_PER_PAGE = 15;

const ResourceCategory = () => {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultResourceFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const closeModal = useCallback(() => setModalOpen(false), []);
  const filterCount = countActiveResourceFilters(filters);

  const allItems = useMemo(
    () => (category ? getResourcesByCategory(category.id) : []),
    [category]
  );

  const filtered = useMemo(
    () => applyResourceFilters(allItems, search.trim(), filters),
    [allItems, search, filters]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-[18px] text-[#737373]">Kateqoriya tapılmadı.</p>
        <Link
          to="/library/resources"
          className="mt-4 inline-block text-[#2A4EBB]"
        >
          ← Resurslara qayıt
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-[#737373]">
        <Link to="/library/resources" className="hover:text-[#404040]">
          Kitabxana
        </Link>
        <span className="mx-2">›</span>
        <Link to="/library/resources" className="hover:text-[#404040]">
          Resurslar
        </Link>
        <span className="mx-2">›</span>
        <span className="font-medium text-[#2A4EBB]">{category.name}</span>
      </nav>

      {/* Category header card */}
      <div className="mt-4 flex items-center gap-5 rounded-[16px] border border-[#E5E7EB] bg-white p-5 md:p-6">
        <div className="flex-1">
          <h2 className="text-[24px] font-semibold text-[#171717]">
            {category.name}
          </h2>
          <p className="mt-1 text-[14px] text-[#737373]">
            {category.count.toLocaleString()} resurs
          </p>
        </div>
        <div className="shrink-0">
          <CategoryIcon categoryId={category.id} size={64} />
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mt-6">
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          onFilterClick={() => setModalOpen(true)}
          filterCount={filterCount}
          placeholder="Axtar"
        />
      </div>

      {/* Grid */}
      {paged.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {paged.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-[#737373]">
          Nəticə tapılmadı.
        </p>
      )}

      {/* Pagination */}
      <ResourcePagination
        current={safePage}
        total={totalPages}
        onChange={handlePageChange}
      />

      {/* Filter modal */}
      {modalOpen && (
        <ResourceFilterModal
          initialFilters={filters}
          onApply={(f) => {
            setFilters(f);
            setPage(1);
          }}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ResourceCategory;
