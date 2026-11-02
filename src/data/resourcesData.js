import { DEFAULT_UPLOADER, DEFAULT_COMMENTS, BOOK_DETAILS } from "./resourceFixtures.js";

/* ─── Kateqoriya konfiqurasiyası ─── */
export const RESOURCE_CATEGORIES = [
  {
    id: "bedii",
    name: "Bədii Kitablar",
    slug: "bedii-kitablar",
    count: 1248,
    color: "#F5A623",       // badge / accent
    bgColor: "#FFF8ED",     // card background
    borderColor: "#F5A623",
  },
  {
    id: "dissertasiya",
    name: "Dissertasiya",
    slug: "dissertasiya",
    count: 1248,
    color: "#7B61FF",
    bgColor: "#F3F0FF",
    borderColor: "#7B61FF",
  },
  {
    id: "serbest",
    name: "Sərbəst iş",
    slug: "serbest-is",
    count: 1248,
    color: "#34C759",
    bgColor: "#EEFBF2",
    borderColor: "#34C759",
  },
  {
    id: "teqdimat",
    name: "Təqdimatlar",
    slug: "teqdimatlar",
    count: 1248,
    color: "#FF9500",
    bgColor: "#FFF5E6",
    borderColor: "#FF9500",
  },
  {
    id: "elmi",
    name: "Elmi kitablar",
    slug: "elmi-kitablar",
    count: 1248,
    color: "#2A4EBB",
    bgColor: "#EDF1FC",
    borderColor: "#2A4EBB",
  },
];

/* Helper: slug -> category object */
export const getCategoryBySlug = (slug) =>
  RESOURCE_CATEGORIES.find((c) => c.slug === slug);

export const getCategoryById = (id) =>
  RESOURCE_CATEGORIES.find((c) => c.id === id);

/* ─── Featured resources (carousel) ─── */
export const featuredResources = [
  {
    id: "featured-1",
    resourceId: "bedii-1",
    title: "İkigai",
    author: "Hektor Qarsiya & Fransesik Mirales",
    description:
      "Həyatın mənasını tapmaq və gündəlik xoşbəxtliyi kəşf etmək",
    quote: "İkigai – hər səhər oyanmağınıza səbəb olan şeydir.",
    quoteAuthor: "Hektor Qarsiya & Fransesik Mirales",
    pages: 192,
    language: "Azərbaycan dili",
    readers: 74,
    image: "/svgs/featured_0.svg",
    started: true,
    completed: false,
    progress: 45,
  },
  {
    id: "featured-2",
    resourceId: "bedii-2",
    title: "Atomik Vərdişlər",
    author: "Ceyms Klir",
    description:
      "Həyatın mənasını tapmaq və gündəlik xoşbəxtliyi kəşf etmək",
    quote: "Hər gün 1% daha yaxşı olmaq zamanla böyük dəyişikliklər yaradır.",
    quoteAuthor: "Ceyms Klir",
    pages: 192,
    language: "Azərbaycan dili",
    readers: 74,
    image: "/svgs/featured_1.svg",
    started: true,
    completed: true,
    progress: 100,
  },
  {
    id: "featured-3",
    resourceId: "bedii-3",
    title: "İtmiş Kitab Dükanı",
    author: "Evi Vudz",
    description:
      "Kitabların sehrli, sirli keçmiş və yeni başlanğıclar haqqında təsirli roman. Oxucunu macəraya aparır.",
    quote: "Bəzən insanın axtardığı həyat, bir kitabın səhifələri arasında gizlənir.",
    quoteAuthor: "Evi Vudz",
    pages: 192,
    language: "Azərbaycan dili",
    readers: 74,
    image: "/svgs/featured_2.svg",
    started: false,
    completed: false,
    progress: 0,
  },
  {
    id: "featured-4",
    resourceId: "bedii-4",
    title: "İtirilmiş Zaman",
    author: "Xanım Mehdixanlı",
    description:
      "Keçmişin izləri, peşmanlıqlar və yenidən başlamaq arzusu haqqında duyğusal Azərbaycan romanı.",
    quote: "Zaman geri qayıtmır, amma insan hər gün yenidən başlaya bilər.",
    quoteAuthor: "Xanım Mehdixanlı",
    pages: 192,
    language: "Azərbaycan dili",
    readers: 74,
    image: "/svgs/featured_3.svg",
    started: false,
    completed: false,
    progress: 0,
  },
];

/* Keep backward compat */
export const featuredResource = featuredResources[0];

const generateResources = (categoryId, count = 18) => {
  const cat = getCategoryById(categoryId);
  // Metadata for the local demo collection; real records can supply these fields directly.
  const educationByCategory = {
    bedii: "Mütaliə/Bədii",
    dissertasiya: "Magistr",
    serbest: "Bakalavr",
    teqdimat: "Bakalavr",
    elmi: "Doktorantura",
  };
  const subjectsByBook = [
    ["Psixologiya"],
    ["Psixologiya", "Təhsil"],
    ["Digər"],
    ["Digər"],
    ["Digər"],
    ["Psixologiya"],
  ];
  return Array.from({ length: count }, (_, i) => {
    const book = BOOK_DETAILS[i % BOOK_DETAILS.length];
    return {
      id: `${categoryId}-${i + 1}`,
      title: book.title,
      author: book.author,
      categoryId,
      categoryName: cat?.name ?? "Bədii kitab",
      educationLevel: educationByCategory[categoryId] ?? "Digər",
      subjects: subjectsByBook[i % BOOK_DETAILS.length],
      format: book.format,
      pages: book.pages,
      views: book.views,
      downloads: book.downloads,
      bookmarked: false,
      image: book.image,
      date: `${String(23 - (i % 23)).padStart(2, "0")}.07.2026`,
      isPopular: i < 6,
      isRecommended: i >= 6 && i < 12,
      /* ── Detail page fields ── */
      subtitle: book.subtitle,
      language: "Azərbaycan",
      readCount: book.views,
      description: book.description,
      uploader: DEFAULT_UPLOADER,
      shareUrl: `https://cothink.az/library/resources/detail/${categoryId}-${i + 1}`,
      comments: DEFAULT_COMMENTS,
    };
  });
};

export const allResources = [
  ...generateResources("bedii"),
  ...generateResources("dissertasiya"),
  ...generateResources("serbest"),
  ...generateResources("teqdimat"),
  ...generateResources("elmi"),
];

/* Section helpers */
export const getLatestResources = (limit = 4) =>
  [...allResources].sort((a, b) => {
    const [dA, mA, yA] = a.date.split(".").map(Number);
    const [dB, mB, yB] = b.date.split(".").map(Number);
    return new Date(yB, mB - 1, dB) - new Date(yA, mA - 1, dA);
  }).slice(0, limit);

export const getPopularResources = (limit = 4) =>
  allResources.filter((r) => r.isPopular).slice(0, limit);

export const getRecommendedResources = (limit = 4) =>
  allResources.filter((r) => r.isRecommended).slice(0, limit);

export const getResourcesByCategory = (categoryId) =>
  allResources.filter((r) => r.categoryId === categoryId);

export const getResourceById = (id) =>
  allResources.find((r) => r.id === id) ?? null;
