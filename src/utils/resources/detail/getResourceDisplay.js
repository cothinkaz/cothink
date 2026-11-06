export default function getResourceDisplay(resource, cat) {
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

  return { displayTitle, displaySubtitle, displayCategory, displayAuthor, displayLanguage, displayFormat, displayPages, displayViews, displayDownloads, displayCover };
}
