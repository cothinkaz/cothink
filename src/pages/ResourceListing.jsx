import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { allResources, getLatestResources, getPopularResources, getRecommendedResources } from "../data/resourcesData";
import ResourceNotFound from "../utils/resources/shared/ResourceNotFound";
import ResourceSearchControls from "../utils/resources/listing/ResourceSearchControls";
import ResourceResults from "../utils/resources/listing/ResourceResults";
import useResourceSearch from "../utils/resources/listing/useResourceSearch";
import ResourceBreadcrumb from "../utils/resources/shared/ResourceBreadcrumb";

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

export default function ResourceListing() {
  const { section } = useParams();
  const config = SECTION_CONFIG[section];
  const items = useMemo(() => config ? config.getter() : [], [config]);
  const search = useResourceSearch(items);
  if (!config) return <ResourceNotFound message="Bölmə tapılmadı." />;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <ResourceBreadcrumb current={config.title} />
      <h2 className="mt-4 text-[28px] font-semibold text-[#171717]">{config.title}</h2>
      <ResourceSearchControls {...search} />
      <ResourceResults {...search} />
    </div>
  );
}
