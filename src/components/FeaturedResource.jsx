import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { featuredResources } from "../data/resourcesData";

const SLIDE_COUNT = featuredResources.length;
// The extra slides let either end wrap without reversing through every book.
const SLIDES = [featuredResources.at(-1), ...featuredResources, featuredResources[0]];
const wrapIndex = (index) => (index + SLIDE_COUNT) % SLIDE_COUNT;

export default function FeaturedResource() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [timerCycle, setTimerCycle] = useState(0);
  const viewport = useRef(null);
  const currentIndex = useRef(0);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const settleTimer = useRef(null);

  const goTo = useCallback((index) => {
    const next = wrapIndex(index);
    const track = viewport.current;
    // Only adjacent navigation uses the duplicates; dot selection uses a real slide.
    const position = index === -1 ? 0 : index === SLIDE_COUNT ? SLIDE_COUNT + 1 : next + 1;
    currentIndex.current = next;
    setActiveIndex(next);
    setKeyboardFocused(false);
    setTimerCycle((cycle) => cycle + 1);
    window.clearTimeout(settleTimer.current);
    track?.scrollTo({
      left: position * track.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, []);

  useLayoutEffect(() => {
    const track = viewport.current;
    const align = () => {
      window.clearTimeout(settleTimer.current);
      track.scrollTo({ left: (currentIndex.current + 1) * track.clientWidth, behavior: "instant" });
    };
    align();
    const observer = new ResizeObserver(align);
    observer.observe(track);
    return () => {
      observer.disconnect();
      window.clearTimeout(settleTimer.current);
    };
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (dragging || keyboardFocused || !visible || SLIDE_COUNT < 2) return;
    const timer = window.setTimeout(() => goTo(currentIndex.current + 1), 5000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, timerCycle, dragging, keyboardFocused, visible, goTo]);

  const handleScroll = () => {
    window.clearTimeout(settleTimer.current);
    if (gesture.current) return;
    settleTimer.current = window.setTimeout(() => {
      const track = viewport.current;
      if (!track?.clientWidth) return;
      const position = Math.round(track.scrollLeft / track.clientWidth);
      const next = wrapIndex(position - 1);
      if (position === 0 || position === SLIDE_COUNT + 1) {
        track.scrollTo({ left: (next + 1) * track.clientWidth, behavior: "instant" });
      }
      currentIndex.current = next;
      setActiveIndex(next);
    }, 140);
  };

  const handlePointerDown = (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    setKeyboardFocused(false);
    if (event.target.closest("button")) return;
    const track = viewport.current;
    window.clearTimeout(settleTimer.current);
    // Finish any previous animation before starting a new gesture.
    const left = (currentIndex.current + 1) * track.clientWidth;
    track.scrollTo({ left, behavior: "instant" });
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left, index: currentIndex.current, horizontal: false };
    setDragging(true);
  };

  const handlePointerMove = (event) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.horizontal && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      start.horizontal = true;
      suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (start.horizontal) {
      const width = viewport.current.clientWidth;
      // Keep a gesture within the two neighbouring slides, even on a very long drag.
      viewport.current.scrollTo({ left: start.left - Math.max(-width, Math.min(width, dx)), behavior: "instant" });
    }
  };

  const finishGesture = (event, cancelled = false) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const threshold = Math.min(70, Math.max(35, viewport.current.clientWidth * 0.08));
    const changed = !cancelled && Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.2;
    gesture.current = null;
    setDragging(false);
    if (changed) suppressClick.current = true;
    goTo(start.index + (changed ? (dx < 0 ? 1 : -1) : 0));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section
      aria-label="Seçilmiş resurslar"
      aria-roledescription="karusel"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishGesture}
      onPointerCancel={(event) => finishGesture(event, true)}
      onLostPointerCapture={(event) => {
        // Touch starts with implicit capture on the cover. Moving capture to the
        // carousel must not be treated as cancelling the gesture.
        if (event.target === event.currentTarget) finishGesture(event, true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !event.currentTarget.hasPointerCapture(event.pointerId)) finishGesture(event, true);
      }}
      onFocusCapture={(event) => setKeyboardFocused(event.target.matches(":focus-visible"))}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(currentIndex.current + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
      onClickCapture={(event) => {
        if (suppressClick.current && event.detail !== 0) {
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }
      }}
      onDragStart={(event) => event.preventDefault()}
      className={`mt-4 mb-2 min-w-0 touch-pan-y focus-visible:rounded-[32px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A72FF] ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
    >
      <div
        ref={viewport}
        onScroll={handleScroll}
        className={`flex touch-pan-y overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragging ? "snap-none" : "snap-x snap-mandatory"}`}
      >
        {SLIDES.map((res, position) => {
          const index = wrapIndex(position - 1);
          const isActive = position === activeIndex + 1;
          const detailUrl = `/library/resources/detail/${res.resourceId ?? `bedii-${index + 1}`}`;
          return (
            <div
              key={`${res.id}-${position}`}
              role="group"
              aria-roledescription="slayd"
              aria-label={`${index + 1} / ${SLIDE_COUNT}: ${res.title}`}
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
                    <div role="group" aria-label="Kitab seçimi" className="mt-2 flex items-center justify-center lg:absolute lg:inset-x-0 lg:top-full">
                      {featuredResources.map((resource, dotIndex) => (
                        <button key={resource.id} type="button" onClick={() => goTo(dotIndex)} aria-label={`${resource.title} kitabına keç`} aria-current={dotIndex === activeIndex ? "true" : undefined} className={`flex h-8 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A72FF] ${dotIndex === activeIndex ? "w-10" : "w-6"}`}>
                          <span className={`block h-2 rounded-full transition-all motion-reduce:transition-none ${dotIndex === activeIndex ? "w-8 bg-[#4A72FF]" : "w-2 bg-[#D1D5DB] hover:bg-gray-400"}`} />
                        </button>
                      ))}
                    </div>
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
        })}
      </div>
    </section>
  );
}
