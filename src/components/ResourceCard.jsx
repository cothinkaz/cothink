import { useNavigate } from "react-router-dom";
import { getCategoryById } from "../data/resourcesData";
import lookIcon from "../assets/look.svg";
import saveIcon from "../assets/save.svg";

/* ─── Category Icon SVGs ─── */
const CategoryIcon = ({ categoryId, size = 64 }) => {
  return (
    <img
      src={`/svgs/cat_${categoryId}.svg`}
      alt={`${categoryId} icon`}
      width={size}
      height={size}
      className="object-contain"
    />
  );
};

/* ─── Resource Card (horizontal layout matching screenshot) ─── */
const ResourceCard = ({ resource }) => {
  const navigate = useNavigate();
  const cat = getCategoryById(resource.categoryId);
  const badgeBg = cat ? `${cat.color}18` : "#E8EDFB";
  const badgeColor = cat?.color ?? "#2A4EBB";

  const handleCardClick = () => {
    navigate(`/library/resources/detail/${resource.id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    // bookmark logic buraya gələcək
  };

  return (
    <article
      onClick={handleCardClick}
      className="flex overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white transition-shadow hover:shadow-md cursor-pointer"
    >
      {/* Left: Book cover image */}
      <div className="relative flex w-[110px] shrink-0 items-center justify-center bg-[#F9FAFB] p-3">
        {resource.image ? (
          <img
            src={resource.image}
            alt={resource.title}
            className="h-[130px] w-[90px] rounded-[6px] object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-[130px] w-[90px] items-center justify-center rounded-[6px] bg-[#F0F0F0]">
            <CategoryIcon categoryId={resource.categoryId} size={48} />
          </div>
        )}
      </div>

      {/* Right: Content */}
      <div className="flex flex-1 flex-col px-4 py-3">
        {/* Category badge */}
        <div className="flex justify-end">
          <span
            className="rounded-full px-3 py-0.5 text-[11px] font-medium"
            style={{ backgroundColor: badgeBg, color: badgeColor }}
          >
            {resource.categoryName}
          </span>
        </div>

        {/* Title + Author */}
        <h6 className="mt-1 text-[13px] font-medium leading-snug text-[#171717] line-clamp-2">
          {resource.title}
        </h6>
        <p className="mt-1 text-[12px] text-[#737373]">{resource.author}</p>

        {/* Format + Page count */}
        <div className="mt-2 flex items-center gap-3 text-[11px] text-[#737373]">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.8">
              <path d="M6 2h9l5 5v15H6z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {resource.format}
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.8">
              <path d="M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 2v4M16 2v4M4 10h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {resource.pages} səhifə
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-auto flex items-center justify-between pt-3 text-[12px] text-[#737373]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <img src={lookIcon} alt="" className="h-[16px] w-[16px]" />
              {resource.views}
            </span>
            <span className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              {resource.downloads}
            </span>
          </div>
          <button
            type="button"
            onClick={handleBookmarkClick}
            aria-label="Yadda saxla"
            className="flex h-[28px] w-[28px] items-center justify-center rounded-md"
          >
            <img src={saveIcon} alt="" className="h-[16px] w-[16px]" />
          </button>
        </div>
      </div>
    </article>
  );
};

export { CategoryIcon };
export default ResourceCard;
