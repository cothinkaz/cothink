import { useRef, useState } from "react";

export default function useReaderControls({ initialPage, initialPenMenu = false }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoom, setZoom] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [penMenuOpen, setPenMenuOpen] = useState(initialPenMenu);
  const [activeColor, setActiveColor] = useState("#9751F2");
  const [customHex, setCustomHex] = useState("#9751F2");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pageElements = useRef({});

  const registerPage = (number) => (element) => {
    if (element) pageElements.current[number] = element;
    else delete pageElements.current[number];
  };
  const scrollToPage = (number) => {
    setCurrentPage(number);
    pageElements.current[number]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return {
    currentPage, zoom, isBookmarked, penMenuOpen, activeColor, customHex, searchOpen, searchQuery,
    setIsBookmarked, setPenMenuOpen, setActiveColor, setCustomHex, setSearchOpen, setSearchQuery,
    zoomIn: () => setZoom((value) => Math.min(value + 10, 150)),
    zoomOut: () => setZoom((value) => Math.max(value - 10, 70)),
    resetZoom: () => setZoom(100),
    scrollToPage, registerPage,
  };
}
