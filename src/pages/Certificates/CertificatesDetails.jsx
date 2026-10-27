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

  const product = data.find((item) => item.id === Number(id));

  const certId = product?.certificateId || `CT-2026-00000${id}`;
  const fullVerifyUrl = `${window.location.origin}/verify/${id}`;
  const displayVerifyUrl = `https://cothink.az/verify/${certId}`;

  const handleCopyLink = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullVerifyUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (loading) {
    return <h2 className="text-center mt-12 text-[#737373]">Yüklənir...</h2>;
  }

  if (!product) {
    return (
      <h2 className="text-center mt-12 font-semibold text-[#050505]">
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
    <div
      className="
        w-full max-w-[1074px] mb-[18px]
        min-[1440px]:mt-[25px] min-[1440px]:ml-[86px] min-[1440px]:mr-[32px]
        max-[1439px]:mt-[20px] max-[1439px]:mx-auto max-[1439px]:px-4 sm:max-[1439px]:px-6
        max-md:mt-[14px] max-md:px-3.5 max-md:mb-[28px]
      "
    >
      {/* Title / Breadcrumbs */}
      <div>
        <div className="flex items-center justify-start gap-[4px] font-sans pb-[16px] sm:pb-[20px] max-md:pb-[12px]">
          <Link
            to="/certificates"
            className="text-[13px] sm:text-[14px] text-[#737373] hover:text-[#2A4EBB] transition-colors shrink-0"
          >
            Sertifikatlar
          </Link>{" "}
          <img className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] shrink-0" src={ArrowRight} alt="ArrowRight" />{" "}
          <h3 className="text-[13px] sm:text-[14px] text-[#2A4EBB] min-w-0 truncate">{title}</h3>
        </div>
        <div className="flex flex-col mb-[24px] sm:mb-[32px] max-md:mb-[16px]">
          <h1 className="text-[#050505] font-semibold text-[22px] sm:text-[28px] min-[1440px]:text-[32px]">
            Sertifikat Detalı
          </h1>
        </div>
      </div>

      {/* Sertifikat Şəkli + Məlumat Kartları */}
      <div
        className="
          flex items-start justify-between gap-[16px] sm:gap-[20px]
          min-[1280px]:flex-row flex-col items-stretch
        "
      >
        {/* Sol Şəkil */}
        <div className="min-[1280px]:flex-1 min-[1280px]:min-w-0 w-full">
          <div
            className="
              border border-[#D9D9D9] rounded-[16px] sm:rounded-[20px] flex items-center justify-center bg-gray-50/40
              min-[1440px]:w-[618px] min-[1440px]:h-[436px]
              w-full h-auto p-[12px] sm:p-[16px] max-md:p-[8px]
            "
          >
            <img
              className="
                rounded-[12px] sm:rounded-[16px] object-cover
                min-[1440px]:w-[586px] min-[1440px]:h-[390px]
                w-full h-auto aspect-[586/390] max-h-[420px]
              "
              src={video || image || FALLBACK_CERTIFICATE_IMG}
              alt={title}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_CERTIFICATE_IMG;
              }}
            />
          </div>
        </div>

        {/* Sağ Məlumat Kartları */}
        <div
          className="
            flex flex-col gap-[14px] sm:gap-[16px]
            min-[1440px]:w-[435px] min-[1280px]:w-[390px] w-full
            min-[680px]:max-[1279px]:grid min-[680px]:max-[1279px]:grid-cols-2
          "
        >
          {/* Sertifikat Məlumatları */}
          <div
            className="
              flex flex-col border border-[#D9D9D9] rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[20px] min-[1440px]:p-[24px] bg-white
              w-full
            "
          >
            <h3 className="text-[#050505] font-semibold text-[16px] sm:text-[18px] mb-[12px] sm:mb-[16px]">
              Sertifikat Məlumatları
            </h3>
            <ul className="flex flex-col gap-[9px] sm:gap-[11px]">
              {infoRows.map(({ label, value }) => (
                <li key={label} className="flex justify-between items-center gap-[8px] sm:gap-[12px] text-[13px] sm:text-[14px]">
                  <span className="text-[#595959] shrink-0">{label}</span>
                  <span className="text-[#1A1A1A] text-right font-medium truncate max-w-[60%] sm:max-w-[65%]">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Təsdiq Statusu */}
          <div
            className="
              flex flex-col border border-[#D9D9D9] rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[20px] min-[1440px]:p-[24px] bg-white
              w-full
            "
          >
            <h3 className="text-[#050505] font-semibold text-[16px] sm:text-[18px] mb-[12px] sm:mb-[16px]">
              Təsdiq Statusu
            </h3>

            <ul className="flex flex-col gap-[9px] sm:gap-[11px]">
              {/* AI yoxlaması */}
              <li className="flex items-center justify-between text-[13px] sm:text-[14px]">
                <span className="flex items-center gap-[5px] sm:gap-[6px] text-[#595959]">
                  AI yoxlaması
                  <img className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] shrink-0 opacity-70" src={Info} alt="" />
                </span>
                <span className="text-[#00B324] font-medium text-[14px] sm:text-[15px]">
                  {progress || product.aiScore || 100}%
                </span>
              </li>

              {/* Mentor qiymətləndirməsi */}
              <li className="flex items-center justify-between text-[13px] sm:text-[14px]">
                <span className="flex items-center gap-[5px] sm:gap-[6px] text-[#595959]">
                  Mentor qiymətləndirməsi
                  <img className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] shrink-0 opacity-70" src={Info} alt="" />
                </span>
                <span className="flex items-center gap-[5px] sm:gap-[6px] text-[#00B324] font-medium text-[13px] sm:text-[14px]">
                  {isWon ? "Təsdiqləndi" : "Gözləyən"}
                  <img className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] shrink-0" src={statusIcon} alt="" />
                </span>
              </li>

              {/* Sertifikat statusu */}
              <li className="flex items-center justify-between text-[13px] sm:text-[14px]">
                <span className="flex items-center gap-[5px] sm:gap-[6px] text-[#595959]">
                  Sertifikat statusu
                  <img className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] shrink-0 opacity-70" src={Info} alt="" />
                </span>
                <span className="flex items-center gap-[5px] sm:gap-[6px] text-[#00B324] font-medium text-[13px] sm:text-[14px]">
                  {isWon ? "Aktiv" : "Gözləyən"}
                  <img className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] shrink-0" src={statusIcon} alt="" />
                </span>
              </li>

              {/* Doğrulama linki (Pill formalı input + kopyala düyməsi) */}
              <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-[6px] sm:gap-[8px] text-[13px] sm:text-[14px] pt-[2px]">
                <span className="text-[#595959] shrink-0">
                  Doğrulama linki
                </span>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-between gap-[6px] w-full sm:w-auto pl-[10px] sm:pl-[12px] pr-[8px] sm:pr-[10px] py-[5px] border border-[#BFBFBF] rounded-full hover:border-[#213D92] bg-white transition-colors cursor-pointer max-w-full sm:max-w-[240px] min-w-0"
                  title="Linki kopyala"
                >
                  <span className="text-[12px] text-[#213D92] truncate font-normal select-all flex-1 min-w-0 text-left">
                    {displayVerifyUrl}
                  </span>
                  <span className="flex items-center gap-[3px] text-[11px] text-[#595959] shrink-0 pl-1 border-l border-gray-200">
                    <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{copied ? "Kopyalandı!" : "Kopyala"}</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Əməliyyatlar Bölməsi */}
      <div
        className="
          border border-[#D9D9D9] rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[20px] flex flex-col gap-[16px] sm:gap-[20px] mt-[14px] sm:mt-[16px]
        "
      >
        <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#050505]">
          Əməliyyatlar
        </h3>

        <div
          className="
            flex gap-[12px] sm:gap-[16px] min-[1440px]:gap-[20px]
            min-[1440px]:pt-[30px] min-[1440px]:pb-[15px] min-[1440px]:pl-[20px] min-[1440px]:pr-[22px]
            pt-[12px] sm:pt-[16px] pb-[8px] sm:pb-[12px]
            max-sm:flex-col max-sm:gap-[8px] max-sm:p-0
          "
        >
          {actions.map(({ title, desc, icon, onClick }) => (
            <button
              key={title}
              type="button"
              className="
                flex-1 border border-[#D9D9D9] cursor-pointer text-center
                min-[1440px]:h-[70px] min-[1440px]:rounded-[40px] min-[1440px]:flex min-[1440px]:flex-col min-[1440px]:items-center min-[1440px]:justify-center min-[1440px]:gap-[6px]
                min-[640px]:h-[60px] min-[640px]:rounded-[24px] min-[640px]:flex min-[640px]:flex-col min-[640px]:items-center min-[640px]:justify-center min-[640px]:gap-[2px] min-[640px]:px-3
                max-sm:h-[46px] max-sm:rounded-[12px] max-sm:flex max-sm:flex-row max-sm:items-center max-sm:justify-center max-sm:gap-[8px] max-sm:px-3
                hover:border-[#2A4EBB] hover:bg-gray-50/60 transition-colors
              "
              onClick={onClick}
            >
              <span className="flex items-center gap-[6px] sm:gap-[8px] text-[14px] sm:text-[15px] min-[1440px]:text-[16px] font-medium text-[#2A4EBB]">
                <img className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] min-[1440px]:w-[22px] min-[1440px]:h-[22px] shrink-0" src={icon} alt="" />
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
