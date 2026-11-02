import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getResourceById, getCategoryById, getPopularResources } from "../data/resourcesData";
import { DEFAULT_UPLOADER } from "../data/resourceFixtures";
import ResourceBreadcrumb from "../utils/resources/shared/ResourceBreadcrumb";
import ResourceNotFound from "../utils/resources/shared/ResourceNotFound";
import ResourceBookCard from "../utils/resources/detail/ResourceBookCard";
import ResourceAbout from "../utils/resources/detail/ResourceAbout";
import ResourceUploader from "../utils/resources/detail/ResourceUploader";
import ResourceComments from "../utils/resources/detail/ResourceComments";
import ResourceSection from "../utils/resources/listing/ResourceSection";
import getResourceDisplay from "../utils/resources/detail/getResourceDisplay";

export default function ResourceDetail() {
  const { id } = useParams();
  const resource = getResourceById(id);
  const similarResources = useMemo(() => getPopularResources(4), []);
  if (!resource) return <ResourceNotFound />;
  const display = getResourceDisplay(resource, getCategoryById(resource.categoryId));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <ResourceBreadcrumb current={display.displayTitle} detail />
      <ResourceBookCard resource={resource} display={display} />
      <ResourceAbout />
      <ResourceUploader uploader={resource.uploader || DEFAULT_UPLOADER} />
      <ResourceSection title="Bənzər resurslar" items={similarResources} linkTo="/library/resources" variant="detail" />
      <ResourceComments />
    </div>
  );
}
