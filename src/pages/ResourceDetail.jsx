import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getResourceById,
  getCategoryById,
  getPopularResources,
} from "../data/resourcesData";
import ResourceCard from "../components/ResourceCard";
import ShareModal from "../components/ShareModal";

/* ─────────────────────────────────────────────
   SVGs / Icons
───────────────────────────────────────────── */
const Icons = {
  // Folder icon for Növ
  folder: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  // Edit / Author quill / pen in circle
  author: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  // Globe icon for Dil
  globe: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  // Document card / Format icon
  format: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <line x1="7" y1="9" x2="13" y2="9" />
      <line x1="7" y1="13" x2="17" y2="13" />
    </svg>
  ),
  // Open book icon for Səhifə sayı
  bookOpen: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  // Bullseye / target icon for Oxunma sayı
  eyeTarget: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  // Tray download icon for Yüklənmə sayı
  downloadTray: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  // Bookmark outline (orange in design)
  bookmarkOrange: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  // Button bookmark
  bookmarkGray: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  // Button share
  shareNodes: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  // Chevron right
  chevronRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  // Chevron down
  chevronDown: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  // Thumbs up
  thumbsUp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  // Thumbs down
  thumbsDown: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
      <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
    </svg>
  ),
  // Speech bubble for reply
  replyBubble: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  // Paper airplane send icon
  sendAirplane: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  // Three dots
  dots: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
  // Arrow right
  arrowRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   User Avatar (Silhouette matching design)
───────────────────────────────────────────── */
const UserAvatar = ({ size = 42, src = null, alt = "Avatar" }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="flex items-end justify-center overflow-hidden rounded-full bg-[#E5E7EB] shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        style={{ width: size * 1.05, height: size * 1.05 }}
        fill="#9CA3AF"
      >
        <circle cx="12" cy="8" r="4.2" />
        <path d="M3 24c0-5.2 4-8 9-8s9 2.8 9 8z" />
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main ResourceDetail Page
───────────────────────────────────────────── */
const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const resource = getResourceById(id);
  const cat = resource ? getCategoryById(resource.categoryId) : null;

  const [expanded, setExpanded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(null); // 'like' | 'dislike' | null
  const [commentInput, setCommentInput] = useState("");

  const similarResources = useMemo(() => getPopularResources(4), []);

  if (!resource) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-[18px] text-[#6B7280]">Resurs tapılmadı.</p>
        <Link to="/library/resources" className="mt-4 inline-block text-[#2563EB] hover:underline font-medium">
          ← Resurslara qayıt
        </Link>
      </div>
    );
  }

  // Fallback defaults matching design screenshots if not on resource
  const displayTitle = resource.title || "İkigai";
  const displaySubtitle = resource.subtitle || "Uzun və xoşbəxt həyatın yapon sirri";
  const displayCategory = resource.categoryName || cat?.name || "Bədii kitab";
  const displayAuthor = resource.author || "Hektor Qarsiya & Fransesk Mirales";
  const displayLanguage = resource.language || "Azərbaycan";
  const displayFormat = resource.format || "PDF";
  const displayPages = resource.pages || 192;
  const displayViews = resource.readCount || 2391;
  const displayDownloads = resource.downloads || 253;
  const displayCover = resource.image || "/books/ikigai.jpg";

  // Description paragraphs from design
  const descParagraphs = [
    `"İkigai" uzun və xoşbəxt yaşamağın yapon sirridir. Bu kitabda ikigai anlayışının – insanın hər səhər oyanmaq üçün səbəbi olan dəyərin necə tapılacağı izah olunur.`,
    `Yaponların ən uzunömürlü və ən sağlam insanların sırasına daxil olmasının arxasında yatan düşüncə tərzi, gündəlik həyat vərdişləri və sadə, amma dərin prinsiplər bu kitabda bütöv şəkildə təqdim edilir.`,
    `Bu kitab özünü daha yaxşı tanımaq, həyatında nəqsəd və balans yaratmaq istəyən hər kəs üçün ilhamverici bir bələdçidir.`,
  ];

  // Uploader info
  const uploader = resource.uploader || {
    name: "Murad Məmmədzadə",
    role: "Senior UX/Uİ dizayner",
    avatar: "/murad.jpg",
    resources: 18,
    followers: 320,
    likes: 18,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      {/* ─── Breadcrumb ─── */}
      <nav className="mb-6 text-[13px] text-[#6B7280] flex items-center gap-1.5">
        <Link to="/library/resources" className="hover:text-[#111827] transition-colors">Kitabxana</Link>
        <span className="text-[#9CA3AF]">›</span>
        <Link to="/library/resources" className="hover:text-[#111827] transition-colors">Resurslar</Link>
        <span className="text-[#9CA3AF]">›</span>
        <span className="text-[#2563EB] font-medium truncate max-w-[280px]">{displayTitle}</span>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          1. TOP HERO CARD (Dizayn 1)
      ════════════════════════════════════════════════════════════ */}
      <div className="relative rounded-[24px] border border-[#E5E7EB] bg-white p-6 sm:p-8 md:p-10">
        
        {/* Top-Right Bookmark Button */}
        <button
          type="button"
          aria-label="Yadda saxla"
          onClick={() => setBookmarked((v) => !v)}
          className="absolute right-6 top-6 sm:right-8 sm:top-8 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#E5E7EB] bg-white transition-colors hover:border-[#EA580C]"
        >
          {Icons.bookmarkOrange}
        </button>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
          {/* Sol: Kitab Qapağı */}
          <div className="flex shrink-0 justify-center md:justify-start">
            <img
              src={displayCover}
              alt={displayTitle}
              className="h-[310px] w-[215px] sm:h-[330px] sm:w-[230px] rounded-[16px] object-cover shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              onError={(e) => {
                e.currentTarget.src = "/books/ikigai.jpg";
              }}
            />
          </div>

          {/* Sağ: Kitab Məlumatları */}
          <div className="flex-1 min-w-0 pr-8">
            <h1 className="text-[26px] sm:text-[28px] font-bold text-[#111827] leading-tight">
              {displayTitle}
            </h1>
            <p className="mt-1 text-[15px] text-[#4B5563]">
              {displaySubtitle}
            </p>

            {/* Metaməlumat Cədvəli (7 sətir) */}
            <div className="mt-5 space-y-2 text-[14px]">
              {/* Növ */}
              <div className="flex items-center">
                <span className="flex w-[140px] items-center gap-2.5 text-[#6B7280]">
                  {Icons.folder}
                  Növ
                </span>
                <Link
                  to={`/library/resources?category=${resource.categoryId || "bedii"}`}
                  className="text-[#2563EB] hover:underline font-normal"
                >
                  {displayCategory}
                </Link>
              </div>

              {/* Müəllif */}
              <div className="flex items-center">
                <span className="flex w-[140px] items-center gap-2.5 text-[#6B7280]">
                  {Icons.author}
                  Müəllif
                </span>
                <span className="text-[#1F2937] font-normal">{displayAuthor}</span>
              </div>

              {/* Dil */}
              <div className="flex items-center">
                <span className="flex w-[140px] items-center gap-2.5 text-[#6B7280]">
                  {Icons.globe}
                  Dil
                </span>
                <span className="text-[#1F2937] font-normal">{displayLanguage}</span>
              </div>

              {/* Format */}
              <div className="flex items-center">
                <span className="flex w-[140px] items-center gap-2.5 text-[#6B7280]">
                  {Icons.format}
                  Format
                </span>
                <span className="text-[#1F2937] font-normal">{displayFormat}</span>
              </div>

              {/* Səhifə sayı */}
              <div className="flex items-center">
                <span className="flex w-[140px] items-center gap-2.5 text-[#6B7280]">
                  {Icons.bookOpen}
                  Səhifə sayı
                </span>
                <span className="text-[#1F2937] font-normal">{displayPages} səhifə</span>
              </div>

              {/* Oxunma sayı */}
              <div className="flex items-center">
                <span className="flex w-[140px] items-center gap-2.5 text-[#6B7280]">
                  {Icons.eyeTarget}
                  Oxunma sayı
                </span>
                <span className="text-[#1F2937] font-normal">{displayViews.toLocaleString()}</span>
              </div>

              {/* Yüklənmə sayı */}
              <div className="flex items-center">
                <span className="flex w-[140px] items-center gap-2.5 text-[#6B7280]">
                  {Icons.downloadTray}
                  Yüklənmə sayı
                </span>
                <span className="text-[#1F2937] font-normal">{displayDownloads.toLocaleString()}</span>
              </div>
            </div>

            {/* Alt Əməliyyat Düymələri */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Oxumağa başla */}
              <button
                type="button"
                onClick={() => {
                  const isPresentation = 
                    resource.categoryId === 2 || 
                    resource?.categorySlug === "teqdimat" || 
                    resource?.format === "PPTX" || 
                    resource?.format === "SLIDE" || 
                    (resource?.title && resource.title.toLowerCase().includes("prezentasiya"));
                  if (isPresentation) {
                    navigate(`/library/resources/slide/${resource.id}`);
                  } else {
                    navigate(`/library/resources/read/${resource.id}`);
                  }
                }}
                className="flex items-center gap-2 rounded-full bg-[#E8F0FE] px-6 py-2.5 text-[14px] font-medium text-[#2563EB] hover:bg-[#DCE7FD] transition-colors shadow-sm"
              >
                {Icons.bookOpen}
                Oxumağa başla
              </button>

              {/* Yüklə */}
              <button
                type="button"
                onClick={() => alert("Resurs yüklənməyə başladı!")}
                className="flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-6 py-2.5 text-[14px] font-medium text-[#374151] hover:bg-gray-50 transition-colors"
              >
                {Icons.downloadTray}
                Yüklə
              </button>

              {/* Saxla */}
              <button
                type="button"
                onClick={() => setBookmarked((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-6 py-2.5 text-[14px] font-medium text-[#374151] hover:bg-gray-50 transition-colors"
              >
                {Icons.bookmarkGray}
                Saxla
              </button>

              {/* Paylaş */}
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-6 py-2.5 text-[14px] font-medium text-[#374151] hover:bg-gray-50 transition-colors"
              >
                {Icons.shareNodes}
                Paylaş
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          2. AŞAĞI HİSSƏ — Kitab haqqında + Qiymətləndirmə (Dizayn 2)
      ════════════════════════════════════════════════════════════ */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        
        {/* Sol tərəf: Kitab haqqında */}
        <div className="lg:col-span-8">
          <h2 className="text-[20px] font-bold text-[#111827] mb-4">Kitab haqqında</h2>
          
          <div className="space-y-4 text-[14px] text-[#374151] leading-[1.75]">
            <p>{descParagraphs[0]}</p>
            <p>{descParagraphs[1]}</p>
            {expanded && (
              <p>{descParagraphs[2]}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 flex items-center gap-1.5 text-[14px] font-medium text-[#2563EB] hover:underline"
          >
            {expanded ? "Daha az göstər" : "Daha çox göstər"}
            <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
              {Icons.chevronDown}
            </span>
          </button>
        </div>

        {/* Sağ tərəf: Qiymətləndirmə Bloku */}
        <div className="lg:col-span-4">
          <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
            <h3 className="text-[15px] font-semibold text-[#111827]">
              Bu resursu necə qiymətləndirirsiniz?
            </h3>
            <p className="mt-1 text-[13px] text-[#6B7280]">
              Rəyiniz digər istifadəçilər üçün faydalıdır.
            </p>

            <button
              type="button"
              onClick={() => setUserRating(userRating === "like" ? null : "like")}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 px-4 text-[13px] font-medium transition-colors ${
                userRating === "like"
                  ? "bg-[#D1FAE5] text-[#047857] border border-[#6EE7B7]"
                  : "bg-[#EAFBF1] text-[#16A34A] hover:bg-[#D4F7E2]"
              }`}
            >
              {Icons.thumbsUp}
              Faydalı oldu
            </button>

            <button
              type="button"
              onClick={() => setUserRating(userRating === "dislike" ? null : "dislike")}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 px-4 text-[13px] font-medium transition-colors ${
                userRating === "dislike"
                  ? "bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]"
                  : "bg-[#FEEAEA] text-[#EF4444] hover:bg-[#FCD7D7]"
              }`}
            >
              {Icons.thumbsDown}
              Təkmilləşdirilməlidir
            </button>
          </div>
        </div>
      </div>

      {/* ─── Uploader Profil Kartı (Full Width) ─── */}
      <div className="mt-8 rounded-[18px] border border-[#E5E7EB] bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        {/* Sol: Avatar + Ad + Vəzifə + Statistikalar */}
        <div className="flex items-center gap-5">
          <img
            src={uploader.avatar}
            alt={uploader.name}
            className="h-[72px] w-[72px] rounded-full object-cover shrink-0 shadow-sm"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
          <div style={{ display: "none" }}>
            <UserAvatar size={72} />
          </div>

          <div>
            <h4 className="text-[17px] font-semibold text-[#111827]">{uploader.name}</h4>
            <p className="text-[13px] text-[#6B7280]">{uploader.role}</p>

            {/* Statistikalar */}
            <div className="mt-3 flex items-center gap-4 text-left">
              <div>
                <p className="text-[16px] font-bold text-[#111827]">{uploader.resources}</p>
                <p className="text-[12px] text-[#6B7280]">Resurs</p>
              </div>
              <div className="h-6 w-[1px] bg-[#E5E7EB]" />
              <div>
                <p className="text-[16px] font-bold text-[#111827]">{uploader.followers}</p>
                <p className="text-[12px] text-[#6B7280]">İzləyici</p>
              </div>
              <div className="h-6 w-[1px] bg-[#E5E7EB]" />
              <div>
                <p className="text-[16px] font-bold text-[#111827]">{uploader.likes}</p>
                <p className="text-[12px] text-[#6B7280]">Bəyənmə</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ: Profilə bax keçidi */}
        <Link
          to="#"
          className="flex items-center gap-1 text-[14px] font-medium text-[#2563EB] hover:underline shrink-0"
        >
          Profilə bax
          {Icons.chevronRight}
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          3. BƏNZƏR RESURSLAR — Şərhlərdən ÜSTDƏ
      ════════════════════════════════════════════════════════════ */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[20px] font-bold text-[#111827]">Bənzər resurslar</h2>
          <Link
            to="/library/resources"
            className="flex items-center gap-1.5 text-[14px] font-medium text-[#2563EB] hover:underline"
          >
            Hamısına bax
            {Icons.arrowRight}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {similarResources.slice(0, 4).map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. ŞƏRHLƏR HİSSƏSİ (Dizayn 3)
      ════════════════════════════════════════════════════════════ */}
      <section className="mt-12">
        <h2 className="text-[20px] font-bold text-[#111827] mb-6">
          Şərhlər <span className="text-[#6B7280] font-normal">(12)</span>
        </h2>

        {/* Şərh Giriş Sahəsi */}
        <div className="flex items-center gap-3 mb-8">
          <UserAvatar size={42} />
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Şərhinizi yazın"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="w-full rounded-full border border-[#D1D5DB] bg-transparent py-3 pl-5 pr-14 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none"
            />
            <button
              type="button"
              disabled={!commentInput.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#0E254A] text-white disabled:opacity-40 transition-opacity hover:bg-[#163566]"
            >
              {Icons.sendAirplane}
            </button>
          </div>
        </div>

        {/* Şərhlər Siyahısı */}
        <div className="space-y-7">
          
          {/* Şərh 1: Səbinə Quliyeva */}
          <div className="flex items-start gap-3.5">
            <UserAvatar size={42} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-[14px] font-semibold text-[#111827]">Səbinə Quliyeva</span>
                  <span className="text-[12px] text-[#6B7280]">8 gün əvvəl</span>
                </div>
                <button type="button" className="text-[#9CA3AF] hover:text-[#4B5563]">
                  {Icons.dots}
                </button>
              </div>

              <p className="mt-1 text-[13.5px] text-[#374151] leading-relaxed">
                Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.
              </p>

              <div className="mt-2.5 flex items-center gap-4 text-[13px]">
                <button type="button" className="flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
                  {Icons.replyBubble}
                  Cavabla
                </button>
                <button type="button" className="flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
                  {Icons.thumbsUp}
                  12
                </button>
              </div>
            </div>
          </div>

          {/* Şərh 2: Gülara Nəsirova + Alt Cavab (Thread) */}
          <div className="relative">
            {/* Valideyn Şərh */}
            <div className="flex items-start gap-3.5">
              <UserAvatar size={42} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[14px] font-semibold text-[#111827]">Gülara Nəsirova</span>
                    <span className="text-[12px] text-[#6B7280]">2 gün əvvəl</span>
                  </div>
                  <button type="button" className="text-[#9CA3AF] hover:text-[#4B5563]">
                    {Icons.dots}
                  </button>
                </div>

                <p className="mt-1 text-[13.5px] text-[#374151] leading-relaxed">
                  Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.
                </p>

                <div className="mt-2.5 flex items-center gap-4 text-[13px]">
                  <button type="button" className="flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
                    {Icons.replyBubble}
                    Cavabla
                  </button>
                  <button type="button" className="flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
                    {Icons.thumbsUp}
                    12
                  </button>
                </div>
              </div>
            </div>

            {/* Alt Cavab (Reply Thread ilə) */}
            <div className="relative mt-4 ml-[21px] pl-8">
              {/* Zərif Əyri L-şəkilli Birləşdirici Xətt */}
              <div className="absolute -top-7 left-0 h-14 w-6 rounded-bl-[16px] border-b-2 border-l-2 border-[#D1D5DB]" />

              <div className="flex items-start gap-3">
                <UserAvatar size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[14px] font-semibold text-[#111827]">Murad Məmmədzadə</span>
                      <span className="text-[12px] text-[#6B7280]">2 gün əvvəl</span>
                    </div>
                    <button type="button" className="text-[#9CA3AF] hover:text-[#4B5563]">
                      {Icons.dots}
                    </button>
                  </div>

                  <p className="mt-1 text-[13.5px] text-[#374151] leading-relaxed">
                    <span className="text-[#2563EB] font-medium mr-1.5">Gülara Nəsirova</span>
                    Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.
                  </p>

                  <div className="mt-2.5 flex items-center gap-4 text-[13px]">
                    <button type="button" className="flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
                      {Icons.replyBubble}
                      Cavabla
                    </button>
                    <button type="button" className="flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
                      {Icons.thumbsUp}
                      12
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── Paylaşma Modalı ─── */}
      {shareOpen && (
        <ShareModal
          resource={{
            ...resource,
            title: displayTitle,
            shareUrl: window.location.href,
          }}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
};

export default ResourceDetail;
