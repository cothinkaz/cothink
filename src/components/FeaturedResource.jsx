import { featuredResources } from "../data/resourcesData";
import useResourceCarousel from "../utils/resources/hero/useResourceCarousel";
import FeaturedSlide from "../utils/resources/hero/FeaturedSlide";

// Duplicates at either end allow continuous looping in both directions.
const slides = [featuredResources.at(-1), ...featuredResources, featuredResources[0]];

export default function FeaturedResource() {
  const { activeIndex, dragging, viewport, goTo, handleScroll, interactionProps } = useResourceCarousel(featuredResources.length);
  return (
    <section aria-label="Seçilmiş resurslar" aria-roledescription="karusel" tabIndex={0} {...interactionProps}
      className={`mt-4 mb-2 min-w-0 touch-pan-y focus-visible:rounded-[32px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A72FF] ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}>
      <div ref={viewport} onScroll={handleScroll}
        className={`flex touch-pan-y overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragging ? "snap-none" : "snap-x snap-mandatory"}`}>
        {slides.map((resource, position) => (
          <FeaturedSlide key={`${resource.id}-${position}`} res={resource}
            index={(position - 1 + featuredResources.length) % featuredResources.length}
            isActive={position === activeIndex + 1} resources={featuredResources} activeIndex={activeIndex} goTo={goTo} />
        ))}
      </div>
    </section>
  );
}
