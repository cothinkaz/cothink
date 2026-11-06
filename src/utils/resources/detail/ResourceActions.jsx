import { useNavigate } from "react-router-dom";
import { getReaderUrl } from "../resourceHelpers";
import { ResourceIcon } from "../shared/ResourceIcons";

const actionButtonClass = "flex h-12 w-full max-w-[240px] shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors lg:min-w-0 lg:max-w-none lg:gap-1 lg:px-2 lg:text-xs xl:gap-2 xl:text-sm [&>svg]:shrink-0";

export default function ResourceActions({ resource, bookmarked, onBookmark, onShare }) {
  const navigate = useNavigate();
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:grid lg:grid-cols-4">

      <button
        type="button"
        onClick={() => navigate(getReaderUrl(resource))}
        className={`${actionButtonClass} border-transparent bg-[#E8F0FE] text-[#2563EB] shadow-sm hover:bg-[#DCE7FD]`}
      >
        <ResourceIcon name="bookOpen" />
        Oxumağa başla
      </button>

      <button
        type="button"
        onClick={() => alert("Resurs yüklənməyə başladı!")}
        className={`${actionButtonClass} border-[#D1D5DB] bg-white text-[#374151] hover:bg-gray-50`}
      >
        <ResourceIcon name="downloadTray" />
        Yüklə
      </button>

      <button
        type="button"
        onClick={onBookmark}
        aria-pressed={bookmarked}
        className={`${actionButtonClass} border-[#D1D5DB] bg-white text-[#374151] hover:bg-gray-50`}
      >
        <ResourceIcon name="bookmarkGray" />
        Saxla
      </button>

      <button
        type="button"
        onClick={onShare}
        className={`${actionButtonClass} border-[#D1D5DB] bg-white text-[#374151] hover:bg-gray-50`}
      >
        <ResourceIcon name="shareNodes" />
        Paylaş
      </button>
    </div>
  );
}
