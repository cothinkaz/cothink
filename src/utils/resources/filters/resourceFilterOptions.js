/* ─── Filter constants ─── */
export const EDUCATION_LEVELS = [
  "Bakalavr",
  "Magistr",
  "Doktorantura",
  "Mütaliə/Bədii",
  "Digər",
];

export const RESOURCE_FILTER_CATEGORIES = [
  "Psixologiya",
  "Biznes",
  "Texnologiya",
  "Tibb",
  "Marketing",
  "İqtisadiyyat",
  "Dizayn",
  "Hüquq",
  "Təhsil",
  "Digər",
];

export const LANGUAGES = ["Azərbaycan", "İngilis", "Türk", "Rus"];

export const FORMATS = ["PDF", "DOCX", "PPT", "EPUB", "TXT"];

export const PAGE_STEPS = [0, 100, 200, 300, 500];
export const PAGE_LAST_INDEX = PAGE_STEPS.length - 1;

export const DATE_OPTIONS = [
  { value: "today", label: "Bu gün" },
  { value: "week", label: "Bu həftə" },
  { value: "month", label: "Bu ay" },
  { value: "year", label: "Bu il" },
  { value: "3years", label: "Son 3 il" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Ən yeni" },
  { value: "oldest", label: "Ən köhnə" },
  { value: "downloads", label: "Ən çox yüklənən" },
  { value: "views", label: "Ən çox baxılan" },
];

export const defaultResourceFilters = {
  educationLevel: "",
  categories: [],
  languages: [],
  formats: [],
  pageIndex: PAGE_LAST_INDEX,
  date: "",
  sort: "newest",
};
