import ShareOptions from "../utils/resources/detail/ShareOptions";
import { CopyIcon } from "../utils/resources/shared/ShareIcons";
import useCopyLink from "../utils/resources/shared/useCopyLink";
import useModalDismiss from "../utils/resources/shared/useModalDismiss";

const ShareModal = ({ resource, onClose }) => {
  const shareUrl = resource?.shareUrl || window.location.href;
  const { copied, handleCopy } = useCopyLink(shareUrl);
  useModalDismiss(onClose, false);

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-[440px] rounded-[20px] bg-white p-6 mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#737373] hover:bg-[#F5F5F5] transition-colors"
          aria-label="Bağla"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h3 className="text-[18px] font-semibold text-[#171717] text-center">Paylaş</h3>
        <p className="mt-1 text-[13px] text-[#737373] text-center">CoThink</p>

        {/* Book mini card */}
        <div className="mt-5 flex items-center gap-4 rounded-[14px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
          {resource?.image ? (
            <img
              src={resource.image}
              alt={resource.title}
              className="h-[60px] w-[44px] rounded-[6px] object-cover shadow-sm shrink-0"
            />
          ) : (
            <div className="flex h-[60px] w-[44px] items-center justify-center rounded-[6px] bg-[#E8EDFB] shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2A4EBB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-[#171717] truncate">{resource?.title}</p>
            <p className="text-[12px] text-[#737373] mt-0.5">CoThink</p>
            <p className="mt-1.5 text-[11px] text-[#737373] truncate">
              <span className="font-medium">Keçid: </span>
              <span className="text-[#2A4EBB]">{shareUrl}</span>
            </p>
          </div>
        </div>

        {/* Social icons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <ShareOptions title={resource?.title} url={shareUrl} />

          {/* Copy link button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Linki kopyala"
            aria-label="Linki kopyala"
            className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#404040] transition-colors hover:bg-[#F5F5F5]"
          >
            <CopyIcon />
          </button>
        </div>

        {/* Copied toast */}
        {copied && (
          <div className="mt-4 flex items-center justify-center gap-2 text-[13px] font-medium text-[#34C759]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Link kopyalandı!
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
