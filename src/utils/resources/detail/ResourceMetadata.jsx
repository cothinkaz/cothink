import { Link } from "react-router-dom";
import { ResourceIcon } from "../shared/ResourceIcons";

export default function ResourceMetadata({ resource, display }) {
  const rows = [
    ["folder", "Növ", <Link to={`/library/resources?category=${resource.categoryId || "bedii"}`} className="text-[#2563EB] hover:underline font-normal">{display.displayCategory}</Link>],
    ["author", "Müəllif", display.displayAuthor],
    ["globe", "Dil", display.displayLanguage],
    ["format", "Format", display.displayFormat],
    ["bookOpen", "Səhifə sayı", `${display.displayPages} səhifə`],
    ["eyeTarget", "Oxunma sayı", display.displayViews.toLocaleString()],
    ["downloadTray", "Yüklənmə sayı", display.displayDownloads.toLocaleString()],
  ];
  return (
    <div className="mt-5 space-y-2 text-[14px]">
      {rows.map(([icon, label, value]) => (
        <div key={label} className="flex items-center">
          <span className="flex w-[140px] items-center gap-2.5 text-[#6B7280]"><ResourceIcon name={icon} />{label}</span>
          <span className="text-[#1F2937] font-normal">{value}</span>
        </div>
      ))}
    </div>
  );
}
