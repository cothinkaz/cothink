import { Link } from "react-router-dom";
import LinkedIn from "../../assets/icon/linkedin.svg";
import Whatsapp from "../../assets/icon/whatsapp.svg";
import Share from "../../assets/icon/share-1.svg";
import Facebook from "../../assets/icon/facebook.svg";
import Instagram from "../../assets/icon/instagram.svg";
import Close from "../../assets/icon/close.svg";


function Share_Modal({ onClose, product }) {
  const { title, video, type, id, kecid } = product;

  const url = encodeURIComponent(kecid);

  const socials = [
    {
      name: "LinkedIn",
      icon: LinkedIn,
      bg: "#007EBB",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      bg: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
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
      href: `https://wa.me/?text=${url}`,
    },
    {
      name: "Linki kopyala",
      icon: Share,
      bg: "#FFFFFF",
      onClick: () => navigator.clipboard.writeText(kecid),
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[598px] bg-[#FFFFFF] rounded-[20px] p-5 sm:p-[30px]"
      >
        <div className="flex flex-col gap-6 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-[24px]">
            {/* Şəkil konteyneri sertifikatın "əzilməsinin" qarşısını almaq üçün */}
            <div className="w-full sm:w-[239px] sm:h-[159px] flex items-center justify-center bg-gray-50 rounded-[16px] overflow-hidden">
              <img
                className="max-w-full max-h-full object-contain"
                src={video}
                alt={title}
              />
            </div>

            <div className="w-full text-left">
              <h3 className="text-[18px] sm:text-[20px] font-medium text-[#050505]">
                {title}
              </h3>
              <h3 className="text-[#737373] text-sm sm:text-base">{type}</h3>
              <p className="mt-1 text-sm sm:text-base break-all">
                Kecid:{" "}
                <Link to={kecid} className="text-[#213D92]">
                  {kecid}
                </Link>
              </p>
            </div>
          </div>

          <div className="w-full pt-2">
            <ul className="flex items-center justify-between sm:justify-start gap-2 sm:gap-[20px]">
              {socials.map(({ name, icon, bg, href, onClick }) => {
                const content = (
                  <span
                    className={`w-[48px] sm:w-[89px] h-[48px] rounded-[32px] flex items-center justify-center ${
                      bg === "#FFFFFF" ? "border border-[#D9D9D9]" : ""
                    }`}
                    style={{ background: bg }}
                  >
                    <img
                      className="w-[20px] sm:w-[24px] h-[20px] sm:h-[24px]"
                      src={icon}
                      alt=""
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

        <button
          className="absolute right-4 top-4 sm:right-[20px] sm:top-[20px] z-50 p-1"
          onClick={onClose}
          type="button"
        >
          <img
            className="cursor-pointer w-5 h-5 sm:w-auto sm:h-auto"
            src={Close}
            alt="Close"
          />
        </button>
      </div>
    </div>
  );
}

export default Share_Modal;
