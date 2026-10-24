import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const card = "rounded-[16px] border border-[#D9D9D9] bg-white sm:rounded-[20px]";

/* ---------- İkonlar ---------- */
const PATHS = {
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12l5 5 9-10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l5 3.5-5 3.5z" />
    </>
  ),
  book: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  flame: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  cap: (
    <>
      <path d="M3 9l9-5 9 5-9 5z" />
      <path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" />
    </>
  ),
};

export const Icon = ({ name, size = 18, className = "", fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {PATHS[name]}
  </svg>
);

/* ---------- Şəkil yer tutucusu ---------- */
export const ImageSlot = ({ src, alt = "", className = "", rounded = "rounded-[14px]" }) =>
  src ? (
    <img src={src} alt={alt} className={`object-contain ${className}`} />
  ) : (
    <div
      role="img"
      aria-label={alt || "Şəkil yeri"}
      className={`flex shrink-0 items-center justify-center border border-dashed border-[#C7D3FB] bg-[#F0F2F8] text-[11px] text-[#737373] ${rounded} ${className}`}
    >
      Şəkil
    </div>
  );

/* ---------- Kopyalama ---------- */
export const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard mövcud deyilsə heç nə etmə */
    }
  };

  return { copied, copy };
};

/* ---------- Modal (Esc, kənara klik, scroll kilidi) ---------- */
export const CloseButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Bağla"
    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[#404040] hover:bg-[#F5F5F5]"
  >
    <Icon name="close" size={18} />
  </button>
);

export const Modal = ({ onClose, label, className = "", children }) => {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-[20px] bg-white p-5 shadow-xl sm:p-6 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

/* ---------- Proqres zolağı ---------- */
export const ProgressBar = ({ value, max = 100, color = "#2A4EBB", label }) => {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className="h-[6px] w-full overflow-hidden rounded-full bg-[#E5E5E5] sm:h-[8px]"
    >
      <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: color }} />
    </div>
  );
};

/* ---------- Seqmentli tablar ---------- */
export const SegmentedTabs = ({ tabs, value, onChange }) => (
  <div role="tablist" className="inline-flex rounded-full border border-[#D9D9D9] bg-white p-1">
    {tabs.map((t) => (
      <button
        key={t.key}
        type="button"
        role="tab"
        aria-selected={value === t.key}
        onClick={() => onChange(t.key)}
        className={`rounded-full px-5 py-1.5 text-[13px] transition-colors sm:px-8 sm:text-[14px] ${
          value === t.key ? "bg-[#C7D3FB] text-[#1F2A5A]" : "text-[#171717] hover:bg-[#F5F5F5]"
        }`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

/* ---------- Səhifə başlığı və naviqasiya yolu ---------- */
export const PageHeader = ({ title, subtitle }) => (
  <div>
    <h1 className="text-[22px] font-semibold text-[#171717] sm:text-[32px]">{title}</h1>
    {subtitle && <p className="mt-1 text-[14px] text-[#737373] sm:text-[20px]">{subtitle}</p>}
  </div>
);

export const Breadcrumb = ({ items }) => (
  <nav aria-label="Naviqasiya yolu" className="mb-3 flex flex-wrap items-center gap-1.5 text-[12px] text-[#737373] sm:text-[13px]">
    {items.map((item, i) => {
      const last = i === items.length - 1;
      return (
        <span key={item.label} className="flex items-center gap-1.5">
          {item.to && !last ? (
            <Link to={item.to} className="hover:text-[#2A4EBB]">
              {item.label}
            </Link>
          ) : (
            <span className={last ? "text-[#2A4EBB]" : ""}>{item.label}</span>
          )}
          {!last && <Icon name="chevronRight" size={12} />}
        </span>
      );
    })}
  </nav>
);

/* ---------- Tez-tez verilən suallar + "Başqa sualınız var?" ---------- */
export const FaqSection = ({ title, items }) => {
  const [open, setOpen] = useState(null);

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-10">
      <div>
        <h3 className="text-[18px] font-medium text-[#171717] sm:text-[24px]">{title}</h3>

        <div className={`mt-4 divide-y divide-[#E5E5E5] ${card}`}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="px-4 sm:px-5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 py-3.5 text-left text-[13px] text-[#171717] sm:text-[14px]"
                >
                  {item.q}
                  <Icon name={isOpen ? "minus" : "plus"} size={16} className="shrink-0" />
                </button>
                {isOpen && (
                  <p className="pb-3.5 text-[13px] leading-relaxed text-[#737373] sm:text-[14px]">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-[18px] font-medium text-[#171717] sm:text-[22px]">Başqa sualınız var?</p>
        <a
          href="mailto:support@cothink.az"
          className="rounded-full bg-[#C7D3FB] px-6 py-2.5 text-[14px] text-[#1F2A5A]"
        >
          Bizə yazın
        </a>
      </div>
    </section>
  );
};