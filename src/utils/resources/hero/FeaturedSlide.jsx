import { Link } from "react-router-dom";

function SlideSelection({ resources, activeIndex, goTo }) {
  return (
    <div role="group" aria-label="Kitab seçimi" className="mt-2 flex items-center justify-center lg:absolute lg:inset-x-0 lg:top-full">
      {resources.map((resource, dotIndex) => (
        <button key={resource.id} type="button" onClick={() => goTo(dotIndex)} aria-label={`${resource.title} kitabına keç`} aria-current={dotIndex === activeIndex ? "true" : undefined} className={`flex h-8 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A72FF] ${dotIndex === activeIndex ? "w-10" : "w-6"}`}>
          <span className={`block h-2 rounded-full transition-all motion-reduce:transition-none ${dotIndex === activeIndex ? "w-8 bg-[#4A72FF]" : "w-2 bg-[#D1D5DB] hover:bg-gray-400"}`} />
        </button>
      ))}
    </div>
  );
}

export default function FeaturedSlide({ res, index, isActive, resources, activeIndex, goTo }) {
  const detailUrl = `/library/resources/detail/${res.resourceId ?? `bedii-${index + 1}`}`;
  return (
    <div
      role="group"
      aria-roledescription="slayd"
      aria-label={`${index + 1} / ${resources.length}: ${res.title}`}
      aria-hidden={!isActive}
      inert={!isActive}
      className="flex w-full min-w-0 shrink-0 snap-center px-1 pt-12 pb-14"
    >
      <div className="relative flex w-full items-center overflow-visible rounded-[32px] border border-[#E7ECF8] bg-[#F6F8FE] p-4 shadow-sm sm:p-6 lg:px-8 lg:py-7">
        <div className="grid w-full grid-cols-1 items-center gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
          <div className="order-2 z-10 min-w-0 sm:order-1">
            <h3 className="text-[26px] font-bold tracking-tight text-[#111827] lg:text-[30px]">{res.title}</h3>
            <p className="mt-2 text-[15px] font-medium text-[#4B5563]">{res.author}</p>
            <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-[#6B7280]">{res.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#6B7280]">
              <span>{res.pages} səhifə</span>
              <span>{res.language}</span>
            </div>
            <Link to={detailUrl} draggable={false} className="mt-6 inline-flex items-center justify-center rounded-full border border-[#4A72FF] px-8 py-2.5 text-[14px] font-medium text-[#4A72FF] transition-colors hover:bg-[#4A72FF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A72FF]">
              Ətraflı bax
            </Link>
          </div>

          <div className="relative order-1 z-20 mx-auto w-48 max-w-full sm:order-2 sm:w-44 lg:-my-12 lg:w-[clamp(9rem,17vw,13.125rem)]">
            <Link to={detailUrl} draggable={false} aria-label={`${res.title} — ətraflı bax`} className="block rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A72FF]">
              {res.image ? (
                <img src={res.image} alt={res.title} draggable={false} className="aspect-[2/3] w-full rounded-[14px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.22)] ring-1 ring-black/5" />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center rounded-[14px] bg-gradient-to-b from-[#4ECDC4] to-[#2A9D8F] shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
                  <p className="text-[30px] font-bold text-white">{res.title}</p>
                </div>
              )}
            </Link>
            <SlideSelection resources={resources} activeIndex={activeIndex} goTo={goTo} />
          </div>

          <div className="order-3 z-10 flex min-w-0 flex-col items-stretch justify-center sm:col-span-2 lg:col-span-1 lg:items-end">
            <div className="w-full rounded-[22px] border border-[#E5E7EB]/80 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-6 lg:max-w-[340px]">
              <div className="flex items-start gap-3">
                <span className="font-serif text-[30px] leading-none font-black text-[#4A72FF] select-none">“</span>
                <p className="text-[14px] leading-relaxed text-[#1F2937] sm:text-[15px]">{res.quote}</p>
              </div>
              <p className="mt-4 text-right text-[12px] text-[#6B7280]">~{res.quoteAuthor}</p>
            </div>
            <p className="mt-4 w-full text-[13px] text-[#6B7280] lg:max-w-[340px]">{res.readers} tələbə bu kitabı oxuyur</p>
          </div>
        </div>
      </div>
    </div>
  );
}
