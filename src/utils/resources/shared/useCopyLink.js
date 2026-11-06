import { useEffect, useRef, useState } from "react";

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const input = document.createElement("textarea");
    input.value = value;
    document.body.appendChild(input);
    try {
      input.select();
      document.execCommand("copy");
    } finally {
      input.remove();
    }
  }
}

export default function useCopyLink(url) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    await copyText(url);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2500);
  };
  return { copied, handleCopy };
}
