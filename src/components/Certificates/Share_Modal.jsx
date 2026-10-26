import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LinkedIn from "../../assets/icon/linkedin.svg";
import Whatsapp from "../../assets/icon/whatsapp.svg";
import Share from "../../assets/icon/share-1.svg";
import Facebook from "../../assets/icon/facebook.svg";
import Instagram from "../../assets/icon/instagram.svg";

const FALLBACK_IMG = "https://slidemodel.com/wp-content/uploads/21672-01-award-certificate-template-for-powerpoint-16x9-1.jpg";

function Share_Modal({ onClose, product }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!product) return null;

  const { title, video, image, type, id } = product;

  // Real, absolute URL for public certificate verification / sharing
  const shareUrl = `${window.location.origin}/verify/${id}`;
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const socials = [
    {
      name: "LinkedIn",
      icon: LinkedIn,
      bg: "#007EBB",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      bg: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Instagram",
      icon: Instagram,
      bg: "linear-gradient(45deg, #FAAD4F, #DD2A7B, #9537B0, #003955)",
      href: "https://www.instagram.com/",
    },
    {
      name: "WhatsApp",
      icon: Whatsapp,
      bg: "#00E510",
      href: `https://wa.me/?text=${encodeURIComponent(`Sertifikat: ${title} - ${shareUrl}`)}`,
    },
    {
      name: copied ? "Kopyalandı!" : "Linki kopyala",
      icon: Share,
      bg: "#FFFFFF",
      onClick: handleCopy,
    },
  ];

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4 z-[9999] overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[598px] bg-[#FFFFFF] rounded-[20px] p-5 sm:p-[30px] shadow-2xl animate-[modalIn_0.2s_ease-out]"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-5 sm:top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full text-[#737373] hover:bg-[#F5F5F5] transition-colors"
          aria-label="Bağla"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Mobil üçün başlıq sətri (X düyməsinin şəkillə toqquşmaması üçün rahat boşluq) */}
        <div className="flex items-center justify-between pb-3 sm:hidden border-b border-gray-100">
          <span className="text-[17px] font-semibold text-[#171717]">Paylaş</span>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6 pt-3 sm:pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-[24px]">
            {/* Şəkil konteyneri */}
            <div className="w-full sm:w-[239px] h-[180px] sm:h-[159px] flex items-center justify-center bg-gray-50 rounded-[16px] overflow-hidden border border-gray-100 shrink-0">
              <img
                className="max-w-full max-h-full object-contain"
                src={video || image || FALLBACK_IMG}
                alt={title}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />
            </div>

            <div className="w-full text-left">
              <h3 className="text-[18px] sm:text-[20px] font-medium text-[#050505]">
                {title}
              </h3>
              <h4 className="text-[#737373] text-sm sm:text-base mt-1">{type}</h4>
              <p className="mt-2 text-sm sm:text-base break-all">
                <span className="text-[#737373]">Keçid: </span>
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#213D92] font-medium hover:underline"
                >
                  {shareUrl}
                </a>
              </p>
              {copied && (
                <span className="inline-block mt-1 text-xs text-[#00A31F] font-medium">
                  ✓ Link panoya kopyalandı!
                </span>
              )}
            </div>
          </div>

          <div className="w-full pt-2">
            <ul className="flex items-center justify-between sm:justify-start gap-2 sm:gap-[20px]">
              {socials.map(({ name, icon, bg, href, onClick }) => {
                const isCopyBtn = name.includes("kopyala") || name.includes("Kopyalandı");
                const content = (
                  <span
                    className={`w-[48px] sm:w-[89px] h-[48px] rounded-[32px] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
                      bg === "#FFFFFF" ? "border border-[#D9D9D9]" : ""
                    } ${isCopyBtn && copied ? "border-[#00A31F] bg-green-50" : ""}`}
                    style={{ background: isCopyBtn && copied ? "#E8F9ED" : bg }}
                    title={name}
                  >
                    <img
                      className="w-[20px] sm:w-[24px] h-[20px] sm:h-[24px]"
                      src={icon}
                      alt={name}
                    />
                  </span>
                );

                return (
                  <li key={name}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={name}
                      >
                        {content}
                      </a>
                    ) : (
                      <button type="button" onClick={onClick} aria-label={name}>
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Share_Modal;
