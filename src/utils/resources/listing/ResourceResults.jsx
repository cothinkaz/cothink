import ResourceCard from "../../../components/ResourceCard";
import ResourcePagination from "../../../components/ResourcePagination";

export default function ResourceResults({ pagedResults, currentPage, totalPages, changePage, results, reset, showSummary = false }) {
  const content = (
    <>
      {pagedResults.length > 0 ? (
        <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${showSummary ? "mt-5" : "mt-6"}`}>
          {pagedResults.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
        </div>
      ) : (
        <p className={`text-center text-[#737373] ${showSummary ? "py-16" : "mt-16"}`}>
          {showSummary ? "Axtarışınıza uyğun resurs tapılmadı." : "Nəticə tapılmadı."}
        </p>
      )}
      <ResourcePagination current={currentPage} total={totalPages} onChange={changePage} />
    </>
  );
  if (!showSummary) return content;
  return (
    <section className="mt-10" aria-label="Axtarış nəticələri">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 aria-live="polite" className="text-[20px] font-medium text-[#171717]">Nəticələr ({results.length})</h3>
        <button type="button" onClick={reset} className="text-[14px] text-[#2A4EBB] hover:underline">Axtarışı və filtrləri sıfırla</button>
      </div>
      {content}
    </section>
  );
}
