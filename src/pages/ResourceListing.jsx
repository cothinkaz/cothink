import { useCallback, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  allResources,
  getLatestResources,
  getPopularResources,
  getRecommendedResources,
} from "../data/resourcesData";
import ResourceCard from "../components/ResourceCard";
import SearchBar from "../components/SearchBar";
import ResourceFilterModal from "../components/ResourceFilterModal";
import ResourcePagination from "../components/ResourcePagination";
import {
  defaultResourceFilters,
  countActiveResourceFilters,
  applyResourceFilters,
} from "../utils/resourceUtils";

const ITEMS_PER_PAGE = 15;

const SECTION_CONFIG = {
  latest: {
    title: "Ən son paylaşılan resurslar",
    getter: () => getLatestResources(allResources.length),
  },
  popular: {
    title: "Populyar resurslar",
    getter: () => getPopularResources(allResources.length),
  },
  recommended: {
    title: "Tövsiyə olunan resurslar",
    getter: () => getRecommendedResources(allResources.length),
  },
};

const ResourceListing = () => {
  const { section } = useParams();
  const config = SECTION_CONFIG[section];

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultResourceFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const closeModal = useCallback(() => setModalOpen(false), []);
  const filterCount = countActiveResourceFilters(filters);

  const allItems = useMemo(
    () => (config ? config.getter() : []),
    [config]
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

  if (!config) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-[18px] text-[#737373]">Bölmə tapılmadı.</p>
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
        <span className="font-medium text-[#2A4EBB]">{config.title}</span>
      </nav>

      {/* Title */}
      <h2 className="mt-4 text-[28px] font-semibold text-[#171717]">
        {config.title}
      </h2>

      {/* Search + Filter */}
      <div className="mt-6">
        <SearchBar
          variant="resources"
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

export default ResourceListing;
