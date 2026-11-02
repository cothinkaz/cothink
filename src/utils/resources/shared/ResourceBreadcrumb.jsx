import { Link } from "react-router-dom";

export default function ResourceBreadcrumb({ current, detail = false }) {
  const linkClass = detail ? "hover:text-[#111827] transition-colors" : "hover:text-[#404040]";
  return (
    <nav className={detail ? "mb-6 text-[13px] text-[#6B7280] flex items-center gap-1.5" : "text-[13px] text-[#737373]"}>
      {current ? <Link to="/library/resources" className={linkClass}>Kitabxana</Link> : <span>Kitabxana</span>}
      <span className={detail ? "text-[#9CA3AF]" : "mx-2"}>›</span>
      {current ? <Link to="/library/resources" className={linkClass}>Resurslar</Link> : <span className="font-medium text-[#2A4EBB]">Resurslar</span>}
      {current && <>
        <span className={detail ? "text-[#9CA3AF]" : "mx-2"}>›</span>
        <span className={detail ? "text-[#2563EB] font-medium truncate max-w-[280px]" : "font-medium text-[#2A4EBB]"}>{current}</span>
      </>}
    </nav>
  );
}
