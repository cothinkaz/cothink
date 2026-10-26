import { Link, useParams } from "react-router-dom";
import ArrowRight from "../../assets/icon/arrow-right.svg";
import Info from "../../assets/icon/info-circle.svg";
import ActiveIcon from "../../assets/icon/success.svg";
import WaitingIcon from "../../assets/icon/clock.svg";
import Share from "../../assets/icon/share-1.svg";
import Download from "../../assets/icon/dowloand.svg";
import LinkIcon from "../../assets/icon/share.svg";
import { useEffect, useState } from "react";
import Share_Modal from "../../components/Certificates/Share_Modal";
import axios from "axios";

const CERTIFICATES_URL = "/data/certificates..json";
const FALLBACK_CERTIFICATE_IMG = "https://slidemodel.com/wp-content/uploads/21672-01-award-certificate-template-for-powerpoint-16x9-1.jpg";

function CertificatesDetails() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getCertificates() {
      try {
        const res = await axios.get(CERTIFICATES_URL);
        setData(res.data);
      } catch (error) {
        console.error("Sertifikatlar yüklənmədi:", error);
      } finally {
        setLoading(false);
      }
    }

    getCertificates();
  }, []);

  const handleCopyLink = () => {
    const verifyUrl = `${window.location.origin}/verify/${id}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(verifyUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const product = data.find((item) => item.id === Number(id));

  if (loading) {
    return <h2 className="text-center mt-12">Yüklənir...</h2>;
  }

  if (!product) {
    return (
      <h2 className="text-center mt-12 font-semibold">
        Məhsul tapılmadı
      </h2>
    );
  }

  const {
    type,
    title,
    video,
    image,
    instructor,
    progress,
    date,
    category,
    status,
  } = product;

  const infoRows = [
    { label: "Kurs adı", value: title },
    { label: "Mentor", value: instructor },
    { label: "Verilmə tarixi", value: date },
    { label: "Sertifikat ID", value: product.certificateId || id },
    { label: "Kurs Tipi", value: category || type },
    { label: "Təqdim edən təşkilat", value: type },
  ];

  const isWon = status === "qazanılmış";
  const statusIcon = isWon ? ActiveIcon : WaitingIcon;

  const infoRows2 = [
    { label: "AI yoxlaması", value: `${progress || product.aiScore || 100}%` },
    {
      label: "Mentor qiymətləndirməsi",
      value: isWon ? "Təsdiqləndi" : "Gözləyən",
      icon: statusIcon,
    },
    {
      label: "Sertifikat statusu",
      value: isWon ? "Aktif" : "Gözləyən",
      icon: statusIcon,
    },
  ];

  const actions = [
    {
      title: "PDF Yüklə",
      desc: "Sertifikatı PDF formatında yükləyin",
      icon: Download,
      onClick: () => {
        window.open(video || image || FALLBACK_CERTIFICATE_IMG, "_blank");
      },
    },
    {
      title: copied ? "Kopyalandı!" : "Linki Kopyala",
      desc: "Doğrulama linkini kopyalayın",
      icon: LinkIcon,
      onClick: handleCopyLink,
    },
    {
      title: "Paylaş",
      desc: "Digər sosial şəbəkələrdə paylaşın",
      icon: Share,
      onClick: () => setOpen(true),
    },
  ];

  return (
    <div className="max-w-[1074px] mt-[25px] ml-[86px] mr-[32px] mb-[18px] max-xl:ml-6 max-xl:mr-6 max-md:ml-4 max-md:mr-4">
      {/* title */}
      <div className="">
        <div className="flex items-center justify-start gap-[4px] font-sans pb-[24px] max-md:pb-[16px]">
          <Link to="/certificates" className="text-[14px] text-[#737373] shrink-0">
            Sertifikatlar
          </Link>{" "}
          <img className="w-[16px] h-[16px] shrink-0" src={ArrowRight} alt="ArrowRight" />{" "}
          <h3 className="text-[14px] text-[#2A4EBB] min-w-0 max-md:truncate">{title}</h3>
        </div>
        <div className="flex flex-col mb-[38px] max-xl:mb-[28px] max-md:mb-[20px]">
          <h1 className="pb-[16px] max-md:pb-[8px] max-md:text-[22px]">Sertifikat Detalı</h1>
        </div>
      </div>

      {/* asagi hisse sertifikat ve s */}
      <div className="flex items-center justify-between max-xl:flex-col max-xl:items-stretch max-xl:gap-[20px] max-md:gap-[16px]">
        {/* sol sekil */}
        <div className="max-xl:mt-0 max-xl:w-full">
          <div className="border border-[#D9D9D9] rounded-[16px] w-[618px] h-[436px] flex items-center justify-center max-xl:w-full max-xl:h-auto max-xl:p-[16px] max-md:p-[10px]">
            <img
              className="w-[586px] h-[390px] rounded-[16px] object-cover max-xl:w-full max-xl:h-auto max-xl:aspect-video"
              src={video || image || FALLBACK_CERTIFICATE_IMG}
              alt={title}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_CERTIFICATE_IMG;
              }}
            />
          </div>
        </div>

        {/* sag hisse */}
        <div className="flex flex-col gap-[20px] max-xl:w-full max-xl:grid max-xl:grid-cols-2 max-md:grid-cols-1 max-md:gap-[16px]">
          <div className="flex flex-col gap-[12px] w-[435px] h-[213px] border border-[#D9D9D9] rounded-[16px] pl-[20px] py-[23px] pr-[31px] max-xl:w-full max-xl:min-w-0 max-xl:h-auto max-xl:pr-[20px] max-md:p-[16px]">
            <h3 className="text-[#050505] leading-[22px]">Sertifikat Məlumatları</h3>
            <ul className="flex flex-col gap-[4px]">
              {infoRows.map(({ label, value }) => (
                <li key={label} className="flex justify-between gap-[16px]">
                  <span className="text-[14px] leading-[18px] text-[#404040]">{label}</span>
                  <p className="text-[14px] leading-[18px] text-[#404040] text-right max-md:break-words">
                    {value}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[12px] w-[435px] h-[203px] border border-[#D9D9D9] rounded-[16px] pl-[20px] py-[23px] pr-[31px] max-xl:w-full max-xl:min-w-0 max-xl:h-auto max-xl:min-h-[203px] max-xl:pr-[20px] max-md:min-h-0 max-md:p-[16px]">
            <h3 className="text-[#050505] leading-[22px]">Təsdiq Statusu</h3>
            <ul className="flex flex-col gap-[4px]">
              {infoRows2.map(({ label, value, icon }) => (
                <li key={label} className="flex items-center justify-between gap-[16px]">
                  <span className="flex items-center gap-[4px] text-[14px] text-[#404040]">
                    {label}
                    <img className="w-[16px] h-[16px] shrink-0" src={Info} alt="" />
                  </span>
                  <p className="flex items-center gap-[4px] text-[14px] text-[#404040] shrink-0">
                    {value}{" "}
                    {icon && <img className="w-[16px] h-[16px]" src={icon} alt="" />}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* emeliyyatlar */}
      <div className="border border-[#D9D9D9] rounded-[16px] p-[20px] flex flex-col gap-[24px] mt-[11px] max-xl:mt-[20px] max-md:mt-[16px] max-md:p-[16px] max-md:gap-[16px]">
        <h3 className="text-[18px] text-[#050505]">Əməliyyatlar</h3>

        <div className="flex gap-[20px] max-xl:gap-[12px] max-md:flex-col pt-[61px] pb-[25px] pl-[20px] pr-[22px] max-xl:p-0">
          {actions.map(({ title, desc, icon, onClick }) => (
            <button
              key={title}
              type="button"
              className="flex-1 h-[70px] border border-[#D9D9D9] rounded-[40px] flex flex-col items-center justify-center gap-[8px] cursor-pointer max-xl:h-auto max-xl:min-h-[70px] max-xl:px-[16px] max-xl:py-[12px] text-center"
              onClick={onClick}
            >
              <span className="flex items-center gap-[8px] text-[16px] text-[#2A4EBB]">
                <img className="w-[24px] h-[24px]" src={icon} alt="" />
                {title}
              </span>
            </button>
          ))}
        </div>
        {open && <Share_Modal onClose={() => setOpen(false)} product={product} />}
      </div>
    </div>
  );
}

export default CertificatesDetails;
