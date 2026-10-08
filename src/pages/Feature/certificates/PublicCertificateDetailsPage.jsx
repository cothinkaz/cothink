import { useParams } from "react-router-dom";
import certificates from "./certificates..json";
import Succes from "../../../assets/icon/success.svg";
import IdIcon from "../../../assets/icon/card.svg";
import CalendarIcon from "../../../assets/icon/calendar-1.svg";
import DownloadIcon from "../../../assets/icon/dowloand-blue.svg";
import UserIcon from "../../../assets/icon/user.svg";
import AiIcon from "../../../assets/icon/verified-badge-svgrepo-com 1.svg";
import OrgIcon from "../../../assets/icon/copyright.svg";
import InfoIcon from "../../../assets/icon/info-circle.svg";
import CartIcon from "../../../assets/icon/shopping-cart.svg";
import MentorIcon from "../../../assets/icon/mentor.svg";
import PlayIcon from "../../../assets/icon/palyiocn.svg";
import { useEffect } from "react";


const cardSoft =
  "max-xl:rounded-[20px] max-xl:shadow-[0_4px_20px_rgba(15,23,42,0.05)] max-md:rounded-[16px]";

function Row({ icon, label, value, green }) {
  return (
    <li className="flex items-center justify-between gap-[72px] text-[14px] text-[#404040] max-xl:gap-[24px] max-md:gap-[16px]">
      <span className="flex items-center gap-[8px]">
        <img className="w-[16px] h-[16px] shrink-0" src={icon} alt="" />
        {label}
      </span>
      <span className={`text-right ${green ? "text-[#00A31F]" : ""}`}>{value}</span>
    </li>
  );
}

function InfoRow({ icon, label, value, green }) {
  return (
    <li className="flex items-center gap-[8px] text-[14px] text-[#404040] max-md:justify-between max-md:gap-[16px] max-md:border-b max-md:border-[#F0F0F0] max-md:pb-[12px]">
      <span className="flex items-center gap-[8px] w-[294px] shrink-0 max-xl:w-[200px] max-md:w-auto">
        <img className="w-[16px] h-[16px] shrink-0" src={icon} alt="" />
        {label}
      </span>
      <span className={`min-w-0 max-md:text-right ${green ? "text-[#00A31F]" : ""}`}>
        {value}
      </span>
    </li>
  );
}

function PublicCertificateDetailsPage() {
    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
  const { id } = useParams();
  const data = certificates.find(
    (item) => String(item.id) === id && item.status === "qazanılmış",
  );

  if (!data) {
    return (
      <main className="mx-auto w-full max-w-[1097px] px-4 py-10 text-center text-[#737373]">
        Sertifikat tapılmadı
      </main>
    );
  }

  const {
    video, certificateId, qr, date, mentorStatus,
    aiScore, category, instructor, title, fullName,
  } = data;

  const summaryRows = [
    { icon: CalendarIcon, label: "Verilmə tarixi", value: date },
    { icon: IdIcon, label: "Sertifikat ID", value: certificateId },
    { icon: Succes, label: "Status", value: "Təsdiqlənib", green: true },
  ];

  const leftRows = [
    { icon: UserIcon, label: "Ad və Soyad", value: fullName },
    { icon: PlayIcon, label: "Kurs adı", value: title },
    { icon: MentorIcon, label: "Mentor", value: instructor },
    { icon: CartIcon, label: "Kurs Tipi", value: category },
  ];

  const rightRows = [
    { icon: OrgIcon, label: "Təqdim edən təşkilat", value: "CoThink" },
    { icon: AiIcon, label: "AI yoxlaması", value: `${aiScore}%`, green: true },
    { icon: Succes, label: "Mentor qiymətləndirməsi", value: mentorStatus, green: true },
  ];

  return (
    <main className="mx-auto w-full max-w-[1097px] max-xl:px-6 max-xl:py-8 max-md:px-4 max-md:py-6 mt-[36px]">
      {/* title */}
      <header className="flex flex-col gap-[10px] items-center text-center">
        <div className="flex items-center gap-[16px] max-md:gap-[8px]">
          <img
            className="w-[36px] h-[36px] shrink-0 max-md:w-[24px] max-md:h-[24px]"
            src={Succes}
            alt=""
          />
          <h3 className="text-[36px] text-[#00801A] max-xl:text-[30px] max-md:text-[22px]">
            Sertifikat Doğrulanıb
          </h3>
        </div>
        <p className="text-[#737373] max-md:text-[14px]">
          Bu sertifikat CoThink tərəfindən rəsmi olaraq yaradılıb və etibarlıdır.
        </p>
      </header>

      {/* descc */}
      <div className="mt-[24px] grid grid-cols-[minmax(0,672px)_400px] gap-x-[25px] gap-y-[24px] max-xl:grid-cols-1 max-xl:mt-[28px] max-xl:gap-y-[20px] max-md:mt-[20px] max-md:gap-y-[16px]">
        {/* sertifikat */}
        <section
          className={`min-w-0 w-full max-w-[672px] h-[464px] pl-[18px] pt-[11px] border border-[#D9D9D9] rounded-[16px] max-xl:max-w-none max-xl:h-auto max-xl:p-[12px] max-md:p-[8px] ${cardSoft}`}
        >
          <img
            className="w-[615px] h-[420px] rounded-[16px] object-cover max-xl:w-full max-xl:h-auto max-xl:aspect-[615/420] max-md:rounded-[10px]"
            src={video}
            alt={`${title} sertifikatı`}
          />
        </section>

        {/* qr kod */}
        <section
          className={`h-[464px] border border-[#D9D9D9] rounded-[16px] flex flex-col items-center gap-[16px] pl-[37px] pt-[25px] pr-[36px] pb-[32px] max-xl:h-auto max-xl:items-stretch max-xl:p-[24px] max-md:items-center max-md:p-[16px] ${cardSoft}`}
        >
          <h2 className="text-[20px] text-[#000000] max-xl:text-[18px] max-xl:font-semibold max-md:text-center">
            Sertifikat Məlumatları
          </h2>

          <div className="w-full flex flex-col items-center gap-[16px] flex-1 max-xl:flex-row max-xl:gap-[32px] max-md:flex-col max-md:gap-[16px]">
            <img
              className="w-[198px] h-[196px] p-[10px] border border-[#D9D9D9] rounded-[16px] object-contain shrink-0"
              src={qr}
              alt="Doğrulama QR kodu"
            />
            <div className="w-full flex flex-col gap-[16px] flex-1">
              <ul className="w-full flex flex-col gap-[12px] max-xl:gap-[14px]">
                {summaryRows.map((row) => (
                  <Row key={row.label} {...row} />
                ))}
              </ul>
              <button
                type="button"
                className="mt-auto w-full h-[48px] rounded-[40px] border border-[#2A4EBB] flex items-center justify-center gap-[8px] text-[16px] text-[#2A4EBB] cursor-pointer max-xl:mt-[4px] max-xl:hover:bg-[#E5ECFF] max-xl:transition-colors"
              >
                <img className="w-[20px] h-[20px]" src={DownloadIcon} alt="" />
                PDF Yüklə
              </button>
            </div>
          </div>
        </section>

        {/* Əlavə Məlumatlar */}
        <section
          className={`col-span-2 max-xl:col-span-1 border border-[#D9D9D9] rounded-[16px] p-[20px] flex flex-col gap-[16px] max-xl:p-[24px] max-md:p-[16px] ${cardSoft}`}
        >
          <h2 className="text-[18px] font-semibold text-[#050505]">Əlavə Məlumatlar</h2>

          <div className="grid grid-cols-2 gap-x-[40px] gap-y-[14px] max-xl:gap-x-[32px] max-md:grid-cols-1 max-md:gap-y-[12px]">
            <ul className="flex flex-col gap-[14px] max-md:gap-[12px]">
              {leftRows.map((row) => (
                <InfoRow key={row.label} {...row} />
              ))}
            </ul>
            <ul className="flex flex-col gap-[14px] max-md:gap-[12px] max-md:[&>li:last-child]:border-b-0 max-md:[&>li:last-child]:pb-0">
              {rightRows.map((row) => (
                <InfoRow key={row.label} {...row} />
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-[12px] rounded-[32px] bg-[#E5ECFF] px-[20px] py-[12px] text-[16px] text-[#2A4EBB] max-xl:text-[15px] max-md:items-start max-md:rounded-[16px] max-md:px-[14px] max-md:text-[14px]">
            <img className="w-[20px] h-[20px] shrink-0 max-md:mt-[2px]" src={InfoIcon} alt="" />
            <p>
              Bu sertifikat əldə edən şəxs CoThink platformasında kursu uğurla
              tamamlamış və bütün yoxlama mərhələlərindən keçmişdir.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PublicCertificateDetailsPage;