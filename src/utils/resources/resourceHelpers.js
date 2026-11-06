export const ITEMS_PER_PAGE = 15;

export function paginateResources(items, page, pageSize = ITEMS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  return {
    totalPages,
    currentPage,
    pagedResults: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  };
}

export function getPaginationItems(total) {
  const pages = Array.from({ length: Math.min(3, total) }, (_, index) => index + 1);
  if (total > 4) pages.push("...");
  if (total > 3) pages.push(total);
  return pages;
}

export function getReaderUrl(resource) {
  const isPresentation = resource.categoryId === 2 || resource.categorySlug === "teqdimat" ||
    resource.format === "PPTX" || resource.format === "SLIDE" ||
    resource.title?.toLowerCase().includes("prezentasiya");
  return `/library/resources/${isPresentation ? "slide" : "read"}/${resource.id}`;
}
