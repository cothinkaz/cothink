import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RESOURCE_CATEGORIES,
  featuredResources,
  getLatestResources,
  getPopularResources,
  getRecommendedResources,
} from "../data/resourcesData";
import ResourceCard, { CategoryIcon } from "../components/ResourceCard";
import SearchBar from "../components/SearchBar";
import ResourceFilterModal from "../components/ResourceFilterModal";
import {
  defaultResourceFilters,
  countActiveResourceFilters,
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

/* ─── Featured Resource Banner (Carousel) ─── */
const FeaturedResource = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const res = featuredResources[activeIndex];

  const goTo = (idx) => setActiveIndex(idx);

  return (
    <div className="mt-14 mb-8 pt-6 pb-2">
      {/* Main Hero Card with overflow-visible */}
      <div className="relative rounded-[32px] border border-[#E7ECF8] bg-[#F6F8FE] p-6 sm:p-8 md:px-12 md:py-9 overflow-visible transition-all duration-300">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
          {/* Left Column: Book Details */}
          <div className="flex-1 min-w-0 max-w-[320px] lg:max-w-[340px] z-10">
            <h3 className="text-[32px] font-bold tracking-tight text-[#111827]">
              {res.title}
            </h3>
            <p className="mt-2 text-[15px] font-medium text-[#4B5563]">
              {res.author}
            </p>
            <p className="mt-3 text-[14px] text-[#6B7280] leading-relaxed line-clamp-3">
              {res.description}
            </p>
            <div className="mt-5 flex items-center gap-10 text-[13px] text-[#6B7280]">
              <span>{res.pages} səhifə</span>
              <span>{res.language}</span>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/library/resources/detail/${res.resourceId ?? `bedii-${activeIndex + 1}`}`)}
              className="mt-7 inline-flex items-center justify-center rounded-full border border-[#4A72FF] px-8 py-2.5 text-[14px] font-medium text-[#4A72FF] transition-all hover:bg-[#4A72FF] hover:text-white"
            >
              Ətraflı bax
            </button>
          </div>

          {/* Center Column: Extra Large Book Cover with 3D Pop-out overflow */}
          <div className="flex shrink-0 items-center justify-center z-20 md:-my-14 my-2">
            <div 
              onClick={() => navigate(`/library/resources/detail/${res.resourceId ?? `bedii-${activeIndex + 1}`}`)}
              className="relative cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
            >
              {res.image ? (
                <img
                  src={res.image}
                  alt={res.title}
                  className="h-[340px] w-[230px] sm:h-[355px] sm:w-[240px] rounded-[14px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.22)] ring-1 ring-black/5"
                />
              ) : (
                <div className="flex h-[340px] w-[230px] sm:h-[355px] sm:w-[240px] items-center justify-center rounded-[14px] bg-gradient-to-b from-[#4ECDC4] to-[#2A9D8F] shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
                  <p className="text-[30px] font-bold text-white">{res.title}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: White Quote Box + Readers count */}
          <div className="flex flex-col items-start md:items-end justify-center flex-1 min-w-0 z-10">
            <div className="w-full max-w-[340px] rounded-[22px] border border-[#E5E7EB]/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <div className="flex items-start gap-3">
                <span className="text-[30px] font-serif font-black leading-none text-[#4A72FF] select-none">
                  “
                </span>
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1F2937]">
                  {res.quote}
                </p>
              </div>
              <p className="mt-4 text-right text-[12px] text-[#6B7280]">
                ~{res.quoteAuthor}
              </p>
            </div>
            <p className="mt-4 text-[13px] text-[#6B7280] self-start md:self-auto md:w-[340px]">
              {res.readers} tələbə bu kitabı oxuyur
            </p>
          </div>

        </div>
      </div>

      {/* Carousel dots below the card */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {featuredResources.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Slayd ${i + 1}`}
            className={`transition-all duration-300 ${
              i === activeIndex
                ? "h-2.5 w-9 rounded-full bg-[#4A72FF]"
                : "h-2.5 w-2.5 rounded-full bg-[#D1D5DB] hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
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

  const closeModal = useCallback(() => setModalOpen(false), []);
  const filterCount = countActiveResourceFilters(filters);

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
          value={search}
          onChange={setSearch}
          onFilterClick={() => setModalOpen(true)}
          filterCount={filterCount}
          placeholder="Axtar"
        />
      </div>

      {/* Featured */}
      <FeaturedResource />

      {/* Category cards */}
      <CategoryCards />

      {/* Sections */}
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

      {/* Filter modal */}
      {modalOpen && (
        <ResourceFilterModal
          initialFilters={filters}
          onApply={setFilters}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Resources;
