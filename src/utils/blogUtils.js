/* "23.07.2026" -> Date */
export const parseDate = (str) => {
  if (!str) return new Date(0);
  const [d, m, y] = str.split(".").map(Number);
  return new Date(y, m - 1, d);
};

/* "2.4K" -> 2400, 777 -> 777 */
export const parseViews = (value) => {
  if (typeof value === "number") return value;
  const s = String(value).trim().toUpperCase();
  const n = parseFloat(s);
  if (s.endsWith("K")) return n * 1000;
  if (s.endsWith("M")) return n * 1000000;
  return n || 0;
};

/* "8 dəq oku" -> 8 */
export const parseReadTime = (str) => parseInt(str, 10) || 0;

/* Slayder pillələri: 0, 3, 6, 9, 12+ */
export const READ_STEPS = [0, 3, 6, 9, 12];
export const READ_LAST_INDEX = READ_STEPS.length - 1; // 12+ = limitsiz

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
  { value: "likes", label: "Ən çox bəyənilən" },
  { value: "views", label: "Ən çox baxılan" },
];

export const defaultFilters = {
  categories: [],
  languages: [],
  readIndex: READ_LAST_INDEX,
  date: "",
  sort: "newest",
};

const DAY = 24 * 60 * 60 * 1000;

const matchesDate = (blog, option) => {
  if (!option) return true;

  const date = parseDate(blog.date);
  const now = new Date();

  switch (option) {
    case "today":
      return date.toDateString() === now.toDateString();
    case "week":
      return now - date <= 7 * DAY;
    case "month":
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth()
      );
    case "year":
      return date.getFullYear() === now.getFullYear();
    case "3years":
      return (
        date >= new Date(now.getFullYear() - 3, now.getMonth(), now.getDate())
      );
    default:
      return true;
  }
};

const matchesSearch = (blog, text) => {
  if (!text) return true;
  const q = text.toLowerCase();

  return (
    blog.title.toLowerCase().includes(q) ||
    blog.description.toLowerCase().includes(q) ||
    blog.category.toLowerCase().includes(q) ||
    blog.author.toLowerCase().includes(q) ||
    blog.tags.some((tag) => tag.toLowerCase().includes(q))
  );
};

const sortBlogs = (list, sort) => {
  const sorted = [...list];

  switch (sort) {
    case "oldest":
      return sorted.sort((a, b) => parseDate(a.date) - parseDate(b.date));
    case "likes":
      return sorted.sort((a, b) => b.likes - a.likes);
    case "views":
      return sorted.sort((a, b) => parseViews(b.views) - parseViews(a.views));
    case "newest":
    default:
      return sorted.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  }
};

/*
  Fallback məntiqi: boş olan filtr qrupu tətbiq olunmur.
  Yalnız bir parametr seçilibsə, ona uyğun olan hamısı qayıdır.
  Hamısı boşdursa, default (bütün bloqlar) qayıdır.
*/
export const applyFilters = (blogs, search, filters) => {
  const maxRead = READ_STEPS[filters.readIndex];
  const limitRead = filters.readIndex !== READ_LAST_INDEX;

  const filtered = blogs.filter((blog) => {
    if (!matchesSearch(blog, search)) return false;

    if (filters.categories.length && !filters.categories.includes(blog.category))
      return false;

    if (filters.languages.length && !filters.languages.includes(blog.language))
      return false;

    if (limitRead && parseReadTime(blog.readTime) > maxRead) return false;

    if (!matchesDate(blog, filters.date)) return false;

    return true;
  });

  return sortBlogs(filtered, filters.sort);
};

/* Dəyişdirilmiş filtr sayı (Filtrlə düyməsindəki nişan üçün) */
export const countActiveFilters = (filters) => {
  let count = 0;
  if (filters.categories.length) count += 1;
  if (filters.languages.length) count += 1;
  if (filters.readIndex !== READ_LAST_INDEX) count += 1;
  if (filters.date) count += 1;
  if (filters.sort !== "newest") count += 1;
  return count;
};