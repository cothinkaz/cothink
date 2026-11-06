import { BOOK_PAGES } from "../../../data/readerData";

export default function BookPages({ zoom, registerPage, totalPages }) {
  return (
    <main className="flex-1 overflow-y-auto py-10 px-6 flex flex-col items-center gap-8">
      {BOOK_PAGES.map((page) => (
        <div key={page.number} ref={registerPage(page.number)} className="bg-white rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-[720px] max-w-full min-h-[960px] p-12 md:p-16 transition-transform duration-200 origin-top text-[#1F2937]" style={{ transform: `scale(${zoom / 100})` }}>
          {page.number === 257 && <div className="mb-8 text-center px-6">
            <h2 className="text-[15px] font-bold tracking-tight text-[#111827] leading-snug">Rosen_Discrete_Mathematics_and_Its_Applica<br />tions_7th_Edition</h2>
          </div>}
          <div className={`space-y-5 text-[13.5px] leading-[1.75] text-[#222222] text-justify font-serif ${page.number === 257 ? "selection:bg-[#E0D4FC]" : ""}`}>
            {page.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>CoThink Digital Library</span><span>Səhifə {page.number} / {totalPages}</span>
          </div>
        </div>
      ))}
    </main>
  );
}
