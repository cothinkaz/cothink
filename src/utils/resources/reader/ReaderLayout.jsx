import ReaderHeader from "./ReaderHeader";
import ReaderSearch from "./ReaderSearch";
import ReaderThumbnails from "./ReaderThumbnails";

export default function ReaderLayout({ title, totalPages, thumbnails, variant, controls, children }) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#525659] font-sans">
      <ReaderHeader title={title} totalPages={totalPages} variant={variant} controls={controls} />
      {controls.searchOpen && <ReaderSearch variant={variant} {...controls} />}
      <div className="flex flex-1 overflow-hidden">
        <ReaderThumbnails variant={variant} pages={thumbnails} currentPage={controls.currentPage} scrollToPage={controls.scrollToPage} />
        {children}
      </div>
    </div>
  );
}
