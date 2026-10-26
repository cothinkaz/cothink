import Calendar from "../../assets/icon/calendar-1.svg";
import Share from "../../assets/icon/share.svg";
import Download from "../../assets/icon/dowloand.svg";
import { Link } from "react-router-dom";
import Share_Modal from "./Share_Modal";
import { useState } from "react";

const FALLBACK_IMG = "https://slidemodel.com/wp-content/uploads/21672-01-award-certificate-template-for-powerpoint-16x9-1.jpg";

function CertificatesCard({ item }) {
  const [open, setOpen] = useState(false);
  const { type, title, image, video, date, id, category } = item;

  return (
    <div className="group flex flex-col justify-between bg-white border border-[#D9D9D9] rounded-[16px] w-full h-[400px] pb-[14px] max-xl:h-auto max-xl:gap-[16px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4468D5]/40">
      <div className="px-[11px] pt-[14px] flex flex-col gap-[12px]">
        <div className="relative overflow-hidden rounded-[16px] bg-gray-50">
          <Link to={`/details/${id}`} className="block overflow-hidden rounded-[16px]">
            <img
              className="w-full h-[215px] rounded-[16px] object-cover max-xl:h-auto max-xl:aspect-[322/215] transition-transform duration-300 group-hover:scale-105"
              src={video || image || FALLBACK_IMG}
              alt={title}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMG;
              }}
            />
          </Link>
          <span className="absolute left-[8px] top-[8px] flex items-center justify-center w-[82px] h-[25px] rounded-full bg-[#6C8BEA] text-[14px] leading-none text-[#FFFFFF] shadow-sm pointer-events-none">
            {category === "Professional" ? "Pro" : category}
          </span>
        </div>
        <div>
          <Link
            to={`/details/${id}`}
            className="block pb-[4px] text-[18px] font-medium text-[#050505] truncate transition-colors duration-200 group-hover:text-[#2A4EBB]"
          >
            {title}
          </Link>
          <p className="pb-[16px] text-[16px] text-[#737373] truncate">
            {type}
          </p>
          <div className="flex items-center gap-[8px]">
            <img className="w-[16px] h-[16px]" src={Calendar} alt="" />
            <p className="text-[14px]">{date}</p>
          </div>
        </div>
      </div>

      <div className="px-[11px] flex gap-[6px]">
        <button
          type="button"
          className="flex-1 h-[38px] rounded-[32px] border border-[#D9D9D9] flex items-center justify-center gap-[4px] cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <img className="w-[20px] h-[20px]" src={Download} alt="" />
          <span className="text-[14px] text-[#595959]">PDF</span>
        </button>
        <button
          type="button"
          className="flex-1 h-[38px] rounded-[32px] bg-[#E5ECFF] flex items-center justify-center gap-[4px] cursor-pointer hover:bg-[#d5e2ff] transition-colors"
          onClick={() => setOpen(true)}
        >
          <img className="w-[20px] h-[20px]" src={Share} alt="" />
          <span className="text-[14px] text-[#2A4EBB] font-medium">Paylaş</span>
        </button>
      </div>

      {open && <Share_Modal onClose={() => setOpen(false)} product={item} />}
    </div>
  );
}

export default CertificatesCard;
