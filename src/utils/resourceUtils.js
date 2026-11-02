import { parseDate } from "./blogUtils.js";

import { PAGE_STEPS, PAGE_LAST_INDEX } from "./resources/filters/resourceFilterOptions.js";
export * from "./resources/filters/resourceFilterOptions.js";

/* ─── Filter logic ─── */
const DAY = 24 * 60 * 60 * 1000;

const matchesDate = (resource, option) => {
  if (!option) return true;
  const date = parseDate(resource.date);
  const now = new Date();
  switch (option) {
    case "today":
      return date.toDateString() === now.toDateString();
    case "week":
      return date <= now && now - date <= 7 * DAY;
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

const matchesSearch = (resource, text) => {
  const normalize = (value) => String(value ?? "").normalize("NFC").toLocaleLowerCase("az");
  const q = normalize(text).trim();
  if (!q) return true;
  return [resource.title, resource.author, resource.categoryName, ...(resource.subjects ?? [])]
    .some((value) => normalize(value).includes(q));
};

const sortResources = (list, sort) => {
  const sorted = [...list];
  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) => parseDate(a.date) - parseDate(b.date)
      );
    case "downloads":
      return sorted.sort((a, b) => b.downloads - a.downloads);
    case "views":
      return sorted.sort((a, b) => b.views - a.views);
    case "newest":
    default:
      return sorted.sort(
        (a, b) => parseDate(b.date) - parseDate(a.date)
      );
  }
};

export const applyResourceFilters = (resources, search, filters) => {
  const maxPages = PAGE_STEPS[filters.pageIndex];
  const limitPages = filters.pageIndex !== PAGE_LAST_INDEX;

  const filtered = resources.filter((r) => {
    if (!matchesSearch(r, search)) return false;
    if (filters.educationLevel && r.educationLevel !== filters.educationLevel) return false;
    if (
      filters.categories.length &&
      !filters.categories.some((category) => category === r.categoryName || r.subjects?.includes(category))
    )
      return false;
    if (filters.languages.length && !filters.languages.includes(r.language))
      return false;
    if (filters.formats.length && !filters.formats.includes(r.format))
      return false;
    if (limitPages && r.pages > maxPages) return false;
    if (!matchesDate(r, filters.date)) return false;
    return true;
  });

  return sortResources(filtered, filters.sort);
};

export const countActiveResourceFilters = (filters) => {
  let count = 0;
  if (filters.educationLevel) count += 1;
  if (filters.categories.length) count += 1;
  if (filters.languages.length) count += 1;
  if (filters.formats.length) count += 1;
  if (filters.pageIndex !== PAGE_LAST_INDEX) count += 1;
  if (filters.date) count += 1;
  if (filters.sort !== "newest") count += 1;
  return count;
};
