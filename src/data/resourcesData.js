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

/* ─── Book cover images for resource cards ─── */
const BOOK_COVERS = [
  "/books/ikigai.jpg",
  "/books/atomik.jpg",
  "/books/itmis.jpg",
  "/books/itirilmis.jpg",
  "/books/kim_deyir.jpg",
  "/books/yasil.jpg",
];

/* ─── Default uploader ─── */
const DEFAULT_UPLOADER = {
  name: "Murad Məmmədzadə",
  role: "Senior UX/Uİ dizayner",
  avatar: "/murad.jpg",
  resources: 18,
  followers: 320,
  likes: 18,
  profileUrl: "#",
};

/* ─── Default comments ─── */
const DEFAULT_COMMENTS = [
  {
    id: "c1",
    author: "Səbinə Quliyeva",
    avatar: null,
    time: "8 gün əvvəl",
    text: "Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.",
    likes: 12,
    replies: [],
  },
  {
    id: "c2",
    author: "Gülara Nəsirova",
    avatar: null,
    time: "2 gün əvvəl",
    text: "Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.",
    likes: 12,
    replies: [
      {
        id: "c2r1",
        author: "Murad Məmmədzadə",
        avatar: null,
        time: "2 gün əvvəl",
        replyTo: "Gülara Nəsirova",
        text: "Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.",
        likes: 4,
      },
    ],
  },
  {
    id: "c3",
    author: "Aysel Həsənova",
    avatar: null,
    time: "3 gün əvvəl",
    text: "Bu kitab həyatıma çox müsbət təsir etdi. Tövsiyə edirəm!",
    likes: 8,
    replies: [
      {
        id: "c3r1",
        author: "Leyla Əliyeva",
        avatar: null,
        time: "3 gün əvvəl",
        replyTo: "Aysel Həsənova",
        text: "Mən də eyni fikirdəyəm, çox faydalı məzmunlu kitabdır.",
        likes: 3,
      },
    ],
  },
  {
    id: "c4",
    author: "Nigar Rəsulova",
    avatar: null,
    time: "4 gün əvvəl",
    text: "Müəllif çox sadə və başa düşülən dildə yazmışdır. Tövsiyə edirəm!",
    likes: 7,
    replies: [],
  },
  {
    id: "c5",
    author: "Elnur Məmmədov",
    avatar: null,
    time: "5 gün əvvəl",
    text: "Kitabı bir nəfəsdə oxudum. Çox maraqlı və öyrədici məzmundur.",
    likes: 15,
    replies: [
      {
        id: "c5r1",
        author: "Fərida Babayeva",
        avatar: null,
        time: "5 gün əvvəl",
        replyTo: "Elnur Məmmədov",
        text: "Tamamilə razıyam! Xüsusilə üçüncü fəsil çox faydalıdır.",
        likes: 6,
      },
    ],
  },
  {
    id: "c6",
    author: "Vüsal İsmayılov",
    avatar: null,
    time: "6 gün əvvəl",
    text: "Kitabın strukturu çox yaxşı qurulub, hər bölüm bir-birilə bağlıdır.",
    likes: 9,
    replies: [],
  },
];

/* ─── Book details corresponding to covers ─── */
const BOOK_DETAILS = [
  {
    title: "İkigai",
    author: "Hektor Qarsiya & Fransesk Mirales",
    subtitle: "Uzun və xoşbəxt həyatın yapon sirri",
    format: "PDF",
    pages: 192,
    views: 2391,
    downloads: 253,
    image: "/books/ikigai.jpg",
    description:
      `"İkigai" uzun və xoşbəxt yaşamağın yapon sirridir. Bu kitabda ikigai anlayışının – insanın hər səhər oyanmaq üçün səbəbi olan dəyərin necə tapılacağı izah olunur.\n\n` +
      `Yaponların ən uzunömürlü və ən sağlam insanların sırasına daxil olmasının arxasında yatan düşüncə tərzi, gündəlik həyat vərdişləri və sadə, amma dərin prinsiplər bu kitabda bütöv şəkildə təqdim edilir.\n\n` +
      `Bu kitab özünü daha yaxşı tanımaq, həyatında nəqsəd və balans yaratmaq istəyən hər kəs üçün ilhamverici bir bələdçidir.`,
  },
  {
    title: "Atomik Vərdişlər",
    author: "Ceyms Klir",
    subtitle: "Xırda dəyişikliklər, böyük nəticələr",
    format: "PDF",
    pages: 320,
    views: 1840,
    downloads: 195,
    image: "/books/atomik.jpg",
    description:
      `İnsan həyatında vərdişlərin formalaşması və köhnə zərərli vərdişlərdən imtina yolları haqqında dünya bestselleri.\n\n` +
      `Müəllif hər gün edilən cüzi dəyişikliklərin uzunmüddətli perspektivdə nə qədər nəhəng nailiyyətlərə çevrildiyini elmi prinsiplərlə izah edir.`,
  },
  {
    title: "İtmiş Kitab Dükanı",
    author: "Evi Vudz",
    subtitle: "Sehrli səhifələr və keçmişin sirləri",
    format: "PDF",
    pages: 280,
    views: 1420,
    downloads: 160,
    image: "/books/itmis.jpg",
    description:
      `Dublinin sakit küçələrindən birində qəflətən peyda olan sirli kitab dükanı və onun arxasında yatan qeyri-adi hekayələr.\n\n` +
      `Kitabsevərlər və macəra axtarışında olanlar üçün ürəkaçan bir roman.`,
  },
  {
    title: "İtirilmiş Zaman",
    author: "Xanım Mehdixanlı",
    subtitle: "Keçmişin izləri və yeni başlanğıclar",
    format: "PDF",
    pages: 210,
    views: 980,
    downloads: 110,
    image: "/books/itirilmis.jpg",
    description:
      `Keçmişin izləri, peşmanlıqlar və yenidən başlamaq arzusu haqqında duyğusal Azərbaycan romanı.\n\n` +
      `Zaman geri qayıtmır, amma insan hər gün yenidən başlaya bilər.`,
  },
  {
    title: "Kim Deyir ki, Bir İnsan Hər Şeyi Dəyişə Bilməz?",
    author: "Pol Hokken",
    subtitle: "Dəyişikliyin gücü və fərdi təşəbbüslər",
    format: "PDF",
    pages: 245,
    views: 1120,
    downloads: 145,
    image: "/books/kim_deyir.jpg",
    description:
      `Sosial və ekoloji hərəkatların gücü və tək bir insanın belə cəmiyyətdə nəhəng dalğalanmalar yarada biləcəyinə dair ilhamverici araşdırma.`,
  },
  {
    title: "Yaşıl İşıqlar",
    author: "Metyu Makkonahi",
    subtitle: "Həyat dərsləri və uğurun fəlsəfəsi",
    format: "PDF",
    pages: 304,
    views: 1650,
    downloads: 210,
    image: "/books/yasil.jpg",
    description:
      `Hollivudun ən tanınmış aktyorlarından birinin həyat dərsləri, xatirələri və qırmızı işıqların necə yaşıl işığa çevrilməsi haqqında qeyri-adi avtobioqrafiyası.`,
  },
];

const generateResources = (categoryId, count = 18) => {
  const cat = getCategoryById(categoryId);
  return Array.from({ length: count }, (_, i) => {
    const book = BOOK_DETAILS[i % BOOK_DETAILS.length];
    return {
      id: `${categoryId}-${i + 1}`,
      title: book.title,
      author: book.author,
      categoryId,
      categoryName: cat?.name ?? "Bədii kitab",
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
