import Succes from "../../assets/icon/success.svg";
import Clock from "../../assets/icon/clock-1.svg";
import Waiting from "../../assets/icon/gozleyir.svg";
import ClockBlue from "../../assets/icon/clock-blue.svg";
import PendingBlue from "../../assets/icon/Pending-blue.svg";
import Right from "../../assets/icon/arrow-right.svg";
import { Link } from "react-router-dom";

function PendingCertificateCard({ item }) {
  const { type, title, video, instructor, progress, estimatedTime, steps, image } = item;

  const stepIcons = [
    { tamamlandı: Succes, "davam edir": PendingBlue, gözləyir: Waiting }, // AI yoxlanması
    { tamamlandı: Succes, "davam edir": PendingBlue, gözləyir: Waiting }, // Mentor qiymətləndirir
    { tamamlandı: Succes, "davam edir": ClockBlue, gözləyir: Clock }, // Sertifikat yaradılır
  ];

  const statusStyle = {
    tamamlandı: { color: "text-[#00B324]" },
    "davam edir": { color: "text-[#4468D5]" },
    gözləyir: { color: "text-[#6B7080]" },
  };

  const defaultStatus = "gözləyir";

  return (
    <div
      className="bg-[#FFFFFF] rounded-[16px] flex items-center justify-between
        max-xl:grid max-xl:grid-cols-[minmax(0,1fr)_auto] max-xl:items-stretch max-xl:overflow-hidden
        max-md:flex max-md:flex-col max-md:items-stretch max-md:p-3 max-md:gap-3"
    >
      {/* video ve melumatlar */}
      <div className="py-[16px] pl-[12px] flex gap-[20px] max-xl:min-w-0 max-xl:pr-3 max-md:p-0 max-md:gap-3">
        <Link to={`/details/${item.id}`} className="shrink-0">
          <img
            className="w-[160px] h-[100px] rounded-[8px] max-xl:block max-xl:object-cover max-md:w-[112px] max-md:h-[72px]"
            src={video}
            alt="Video"
          />
        </Link>

        {/* title */}
        <div className="flex flex-col gap-[16px] max-xl:min-w-0 max-xl:justify-between max-md:gap-2">
          <div className="max-xl:min-w-0">
            <div className="text-[18px] font-sans text-[#050505] max-xl:line-clamp-2 max-md:text-[16px]">
              {title}
            </div>
            <p className="text-[14px] text-[#00000033] max-xl:truncate">{type}</p>
          </div>
          <div className="flex gap-[8px] items-center min-w-0">
            <img className="w-[24px] h-[24px] rounded-[36px] shrink-0 object-cover" src={image} alt="" />
            <p className="text-[12px] text-[#050505] max-xl:truncate">{instructor}</p>
          </div>
        </div>
      </div>

      {/* veziyyet setri */}
      <div
        className="flex flex-1
          max-xl:col-span-2 max-xl:row-start-2 max-xl:flex-none max-xl:w-full max-xl:border-t max-xl:border-[#E4E6EE] max-xl:px-3 max-xl:py-4
          max-md:border-t max-md:px-0 max-md:py-3"
      >
        {steps?.map((step, index) => {
          const status = statusStyle[step.status] ? step.status : defaultStatus;
          const style = statusStyle[status];
          const icon = stepIcons[index]?.[status] ?? Waiting;

          return (
            <div
              key={step.name}
              className="relative flex-1 min-w-0 flex flex-col items-center gap-[4px] text-center max-md:px-0.5"
            >
              <img className="relative w-[20px] h-[20px] p-[2px]" src={icon} alt="" />
              <p className="text-[12px] text-[#404040] max-md:leading-tight max-md:break-words">{step.name}</p>
              <p className={`text-[12px] ${style.color} max-md:leading-tight max-md:break-words`}>{step.status}</p>
            </div>
          );
        })}
      </div>

      {/* faiz ve muddet */}
      <div
        className="mt-[16px] mr-[12px] mb-[9px] pl-[28px] flex items-center gap-[16px] border-l border-[#E4E6EE]
          max-xl:col-start-2 max-xl:row-start-1 max-xl:m-0 max-xl:w-[280px] max-xl:py-4 max-xl:pr-4 max-xl:pl-6
          max-md:w-full max-md:p-0 max-md:border-l-0"
      >
    {/* sol: faiz, zolaq, vaxt */}
<div className="flex-1 min-w-0 flex flex-col gap-[24px] max-xl:gap-3 max-md:gap-2">
  <div className="max-md:flex max-md:flex-row-reverse max-md:items-center max-md:gap-[8px]">
    <span className="text-[18px] font-medium text-[#050505] max-md:text-[14px] max-md:shrink-0">
      {progress}%
    </span>
    <div className="h-[6px] rounded-full bg-[#E4E6EE] overflow-hidden my-[6px] max-md:flex-1 max-md:my-0">
      <div
        className="h-full rounded-full bg-[#4468D5]"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>

  <div className="max-md:flex max-md:items-center max-md:justify-between max-md:gap-2">
    <p className="text-[12px] text-[#737373]">Təxmini tamamlanma:</p>
    <p className="text-[12px] text-[#0D0D0D]">{estimatedTime}</p>
  </div>
</div>
      </div>
    </div>
  );
}

export default PendingCertificateCard;