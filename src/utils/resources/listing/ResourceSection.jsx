import { Link } from "react-router-dom";
import ResourceCard from "../../../components/ResourceCard";
import { ArrowIcon } from "../shared/ResourceIcons";

const ResourceSection = ({ title, items, linkTo, variant = "listing" }) => {
  if (!items || items.length === 0) return null;
  const detail = variant === "detail";

  return (
    <section className={detail ? "mt-12" : "mt-10"}>
      <div className="flex items-center justify-between">
        {detail ? <h2 className="text-[20px] font-bold text-[#111827]">{title}</h2> : <h3 className="text-[20px] font-medium text-[#171717]">{title}</h3>}
        {linkTo && (
          <Link
            to={linkTo}
            className={detail ? "flex items-center gap-1.5 text-[14px] font-medium text-[#2563EB] hover:underline" : "flex items-center gap-2 text-[14px] text-[#2A4EBB]"}
          >
            Hamısına bax
            <ArrowIcon />
          </Link>
        )}
      </div>
      <div className={`mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 ${detail ? "lg:grid-cols-4" : ""}`}>
        {items.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
};

export default ResourceSection;
