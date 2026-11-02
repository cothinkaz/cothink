import { useEffect } from "react";

export default function useModalDismiss(onClose, lockScroll = true) {
  useEffect(() => {
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    if (lockScroll) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      if (lockScroll) document.body.style.overflow = previousOverflow;
    };
  }, [onClose, lockScroll]);
}
