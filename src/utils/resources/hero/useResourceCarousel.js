import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const wrapIndex = (index, count) => (index + count) % count;

export default function useResourceCarousel(slideCount) {
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
    const next = wrapIndex(index, slideCount);
    const track = viewport.current;
    // Only adjacent navigation uses the duplicates; dot selection uses a real slide.
    const position = index === -1 ? 0 : index === slideCount ? slideCount + 1 : next + 1;
    currentIndex.current = next;
    setActiveIndex(next);
    setKeyboardFocused(false);
    setTimerCycle((cycle) => cycle + 1);
    window.clearTimeout(settleTimer.current);
    track?.scrollTo({
      left: position * track.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [slideCount]);

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
    if (dragging || keyboardFocused || !visible || slideCount < 2) return;
    const timer = window.setTimeout(() => goTo(currentIndex.current + 1), 5000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, timerCycle, dragging, keyboardFocused, visible, goTo, slideCount]);

  const handleScroll = () => {
    window.clearTimeout(settleTimer.current);
    if (gesture.current) return;
    settleTimer.current = window.setTimeout(() => {
      const track = viewport.current;
      if (!track?.clientWidth) return;
      const position = Math.round(track.scrollLeft / track.clientWidth);
      const next = wrapIndex(position - 1, slideCount);
      if (position === 0 || position === slideCount + 1) {
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


  const interactionProps = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: finishGesture,
    onPointerCancel: (event) => finishGesture(event, true),
    onLostPointerCapture: (event) => {
      // Ignore implicit touch capture transferred from a child to the carousel.
      if (event.target === event.currentTarget) finishGesture(event, true);
    },
    onPointerLeave: (event) => {
      if (event.pointerType === "mouse" && !event.currentTarget.hasPointerCapture(event.pointerId)) finishGesture(event, true);
    },
    onFocusCapture: (event) => setKeyboardFocused(event.target.matches(":focus-visible")),
    onBlurCapture: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false);
    },
    onKeyDown: (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(currentIndex.current + (event.key === "ArrowRight" ? 1 : -1));
      }
    },
    onClickCapture: (event) => {
      if (suppressClick.current && event.detail !== 0) {
        event.preventDefault();
        event.stopPropagation();
        suppressClick.current = false;
      }
    },
    onDragStart: (event) => event.preventDefault(),
  };
  return { activeIndex, dragging, viewport, goTo, handleScroll, interactionProps };
}
