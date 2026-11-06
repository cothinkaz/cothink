import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getCategoryBySlug, getResourcesByCategory } from "../data/resourcesData";
import { CategoryIcon } from "../utils/resources/shared/ResourceIcons";
import ResourceNotFound from "../utils/resources/shared/ResourceNotFound";
import ResourceSearchControls from "../utils/resources/listing/ResourceSearchControls";
import ResourceResults from "../utils/resources/listing/ResourceResults";
import useResourceSearch from "../utils/resources/listing/useResourceSearch";
import ResourceBreadcrumb from "../utils/resources/shared/ResourceBreadcrumb";

export default function ResourceCategory() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const items = useMemo(() => category ? getResourcesByCategory(category.id) : [], [category]);
  const search = useResourceSearch(items);
  if (!category) return <ResourceNotFound message="Kateqoriya tapılmadı." />;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <ResourceBreadcrumb current={category.name} />
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

      <ResourceSearchControls {...search} />
      <ResourceResults {...search} />
    </div>
  );
}
