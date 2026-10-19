import Calendar from "../../assets/icon/calendar-1.svg";
import Share from "../../assets/icon/share.svg";
import Download from "../../assets/icon/dowloand.svg";
import { Link } from "react-router-dom";
import Share_Modal from "./Share_Modal";
import { useState } from "react";


function CertificatesCard({ item }) {
  const [open, setOpen] = useState(false);
  const { type, title, image, date, id,category } = item;

  return (
    <div className="flex flex-col justify-between border border-[#D9D9D9] rounded-[16px] w-full h-[400px] pb-[14px] max-xl:h-auto max-xl:gap-[16px]">
      <div className="px-[11px] pt-[14px] flex flex-col gap-[12px]">
       <div className="relative">
  <Link to={`/details/${id}`}>
    <img
      className="w-full h-[215px] rounded-[16px] object-cover max-xl:h-auto max-xl:aspect-[322/215]"
      src={image}
      alt={title}
    />
  </Link>
  <span className="absolute left-[8px] top-[8px] flex items-center justify-center w-[82px] h-[25px] rounded-full bg-[#6C8BEA] text-[14px] leading-none text-[#FFFFFF]">
    {category === "Professional" ? "Pro" : category}
  </span>
</div>
        <div>
          <Link
            to={`/verify/${id}`}
            className="block pb-[4px] text-[18px] text-[#050505] truncate"
          >
            {title}
          </Link>
          <p className="pb-[16px] text-[16px] text-[#737373] truncate">{type}</p>
          <div className="flex items-center gap-[8px]">
            <img className="w-[16px] h-[16px]" src={Calendar} alt="" />
            <p className="text-[14px]">{date}</p>
          </div>
        </div>
      </div>

      <div className="px-[11px] flex gap-[6px]">
        <button
          type="button"
          className="flex-1 h-[38px] rounded-[32px] border border-[#D9D9D9] flex items-center justify-center gap-[4px] cursor-pointer"
        >
          <img className="w-[20px] h-[20px]" src={Download} alt="" />
          <span className="text-[14px] text-[#595959]">PDF</span>
        </button>
        <button
          type="button"
          className="flex-1 h-[38px] rounded-[32px] bg-[#E5ECFF] flex items-center justify-center gap-[4px] cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <img className="w-[20px] h-[20px]" src={Share} alt="" />
          <span className="text-[14px] text-[#2A4EBB]">Paylaş</span>
        </button>
      </div>

      {open && <Share_Modal onClose={() => setOpen(false)} product={item} />}
    </div>
  );
}

export default CertificatesCard;