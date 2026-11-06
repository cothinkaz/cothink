import { useState } from "react";
import { BOOK_DETAILS } from "../../../data/resourceFixtures";
import { ResourceIcon } from "../shared/ResourceIcons";

const descParagraphs = BOOK_DETAILS[0].description.split("\n\n");

export default function ResourceAbout() {
  const [expanded, setExpanded] = useState(false);
  const [userRating, setUserRating] = useState(null);
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">

      <div className="lg:col-span-8">
        <h2 className="text-[20px] font-bold text-[#111827] mb-4">Kitab haqqında</h2>

        <div className="space-y-4 text-[14px] text-[#374151] leading-[1.75]">
          <p>{descParagraphs[0]}</p>
          <p>{descParagraphs[1]}</p>
          {expanded && (
            <p>{descParagraphs[2]}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1.5 text-[14px] font-medium text-[#2563EB] hover:underline"
        >
          {expanded ? "Daha az göstər" : "Daha çox göstər"}
          <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
            <ResourceIcon name="chevronDown" />
          </span>
        </button>
      </div>

      <div className="lg:col-span-4">
        <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
          <h3 className="text-[15px] font-semibold text-[#111827]">
            Bu resursu necə qiymətləndirirsiniz?
          </h3>
          <p className="mt-1 text-[13px] text-[#6B7280]">
            Rəyiniz digər istifadəçilər üçün faydalıdır.
          </p>

          <button
            type="button"
            onClick={() => setUserRating(userRating === "like" ? null : "like")}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 px-4 text-[13px] font-medium transition-colors ${
              userRating === "like"
                ? "bg-[#D1FAE5] text-[#047857] border border-[#6EE7B7]"
                : "bg-[#EAFBF1] text-[#16A34A] hover:bg-[#D4F7E2]"
            }`}
          >
            <ResourceIcon name="thumbsUp" />
            Faydalı oldu
          </button>

          <button
            type="button"
            onClick={() => setUserRating(userRating === "dislike" ? null : "dislike")}
            className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 px-4 text-[13px] font-medium transition-colors ${
              userRating === "dislike"
                ? "bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]"
                : "bg-[#FEEAEA] text-[#EF4444] hover:bg-[#FCD7D7]"
            }`}
          >
            <ResourceIcon name="thumbsDown" />
            Təkmilləşdirilməlidir
          </button>
        </div>
      </div>
    </div>

  );
}
