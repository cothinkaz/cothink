import { useMemo } from "react";
import { allResources, getLatestResources, getPopularResources, getRecommendedResources } from "../data/resourcesData";
import FeaturedResource from "../components/FeaturedResource";
import CategoryCards from "../utils/resources/listing/CategoryCards";
import ResourceSection from "../utils/resources/listing/ResourceSection";
import ResourceSearchControls from "../utils/resources/listing/ResourceSearchControls";
import ResourceResults from "../utils/resources/listing/ResourceResults";
import useResourceSearch from "../utils/resources/listing/useResourceSearch";
import ResourceBreadcrumb from "../utils/resources/shared/ResourceBreadcrumb";

export default function Resources() {
  const search = useResourceSearch(allResources);
  const latest = useMemo(() => getLatestResources(4), []);
  const popular = useMemo(() => getPopularResources(4), []);
  const recommended = useMemo(() => getRecommendedResources(4), []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <ResourceBreadcrumb />
      <h2 className="mt-2 text-[32px] font-semibold text-[#171717]">Resurslar</h2>
      <p className="mt-1 text-[16px] text-[#737373]">Öyrənməyə prosesinizi izləyin və davam edin</p>
      <ResourceSearchControls {...search} />
      {search.isFiltering ? <ResourceResults {...search} showSummary /> : (
        <>
          <FeaturedResource />
          <CategoryCards />
          <ResourceSection title="Ən son paylaşılan resurslar" items={latest} linkTo="/library/resources/latest" />
          <ResourceSection title="Populyar resurslar" items={popular} linkTo="/library/resources/popular" />
          <ResourceSection title="Tövsiyə olunan resurslar" items={recommended} linkTo="/library/resources/recommended" />
        </>
      )}
    </div>
  );
}
