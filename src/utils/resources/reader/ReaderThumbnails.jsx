function BookThumbnail({ isActive }) {
  return (
    <div
      className={`w-[84px] h-[116px] rounded-[2px] bg-white p-2 flex flex-col justify-between transition-all ${
        isActive
          ? "border-[2px] border-[#2563EB] shadow-md ring-1 ring-blue-100"
          : "border border-gray-200 shadow-sm group-hover:border-gray-400"
      }`}
    >
      <div className="space-y-1">
        <div className="h-1 w-3/4 rounded-full bg-gray-400" />
        <div className="h-0.5 w-full rounded-full bg-gray-300" />
        <div className="h-0.5 w-full rounded-full bg-gray-300" />
        <div className="h-0.5 w-5/6 rounded-full bg-gray-300" />
        <div className="h-0.5 w-full rounded-full bg-gray-300" />
        <div className="h-0.5 w-4/5 rounded-full bg-gray-300" />
        <div className="h-0.5 w-full rounded-full bg-gray-300" />
      </div>
      <div className="space-y-1">
        <div className="h-0.5 w-full rounded-full bg-gray-300" />
        <div className="h-0.5 w-3/4 rounded-full bg-gray-300" />
        <div className="h-0.5 w-1/2 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

function SlideThumbnail({ isActive, slideNum }) {
  return (
    <div
      className={`w-[115px] h-[68px] rounded-[2px] bg-white p-1.5 flex flex-col justify-between overflow-hidden transition-all ${
        isActive
          ? "border-[2px] border-[#2563EB] shadow-md ring-1 ring-blue-100"
          : "border border-gray-200 shadow-sm group-hover:border-gray-400"
      }`}
    >
      {slideNum === 1 ? (
        <div className="h-full w-full rounded bg-gradient-to-br from-gray-900 to-blue-950 p-1 flex flex-col justify-center items-center text-center">
          <span className="text-[7px] font-bold text-white">CoThink</span>
          <span className="text-[5px] text-blue-200">Prezentasiya</span>
        </div>
      ) : slideNum === 4 ? (
        <div className="h-full w-full bg-white p-1 flex flex-col justify-between">
          <span className="text-[6px] font-bold text-blue-900">Rəqib Analizi</span>
          <div className="relative h-7 w-full border-l border-b border-blue-300">
            <div className="absolute top-1 right-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
            <div className="absolute bottom-1 left-2 h-1.5 w-1.5 rounded-full bg-red-500" />
          </div>
        </div>
      ) : slideNum === 5 ? (
        <div className="h-full w-full bg-white flex flex-col justify-end">
          <div className="h-8 w-full rounded-t-full bg-blue-700 p-1 flex flex-col items-center justify-center text-white">
            <span className="text-[5px] font-bold">246K TAM</span>
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-white p-1 flex flex-col justify-between">
          <div className="h-1 w-2/3 rounded-full bg-blue-800" />
          <div className="space-y-0.5">
            <div className="h-0.5 w-full bg-gray-200 rounded-full" />
            <div className="h-0.5 w-4/5 bg-gray-200 rounded-full" />
            <div className="h-0.5 w-3/4 bg-gray-200 rounded-full" />
          </div>
          <div className="flex gap-1 justify-end">
            <div className="h-2 w-3 bg-gray-100 rounded-sm" />
            <div className="h-2 w-3 bg-blue-100 rounded-sm" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReaderThumbnails({ variant, pages, currentPage, scrollToPage }) {
  const isBook = variant === "book";
  return (
    <aside className={isBook ? "w-[145px] shrink-0 overflow-y-auto border-r border-[#E5E7EB] bg-white p-3 space-y-5" : "w-[170px] shrink-0 overflow-y-auto border-r border-[#E5E7EB] bg-white p-3 space-y-4"}>
      {pages.map((number) => {
        const isActive = number === currentPage;
        return (
          <div key={number} onClick={() => scrollToPage(number)} className="flex items-start gap-2.5 cursor-pointer group">
            <span className={`font-bold text-right pt-2 ${isBook ? "text-[14px] w-7" : "text-[13px] w-4"} ${isActive ? "text-[#111827]" : "text-gray-400 group-hover:text-gray-700"}`}>{number}</span>
            {isBook ? <BookThumbnail isActive={isActive} /> : <SlideThumbnail isActive={isActive} slideNum={number} />}
          </div>
        );
      })}
    </aside>
  );
}
