import { useEffect, useState } from "react";
import Search from "../../../assets/icon/search-normal.svg";
import Filter from "../../../assets/icon/filter.svg";
import Timer from "../../../assets/icon/timer.svg";
import Notification from "../../../assets/icon/notification-ding.svg";
import CategoryFilterMobileModal from "../../../components/Certificates/CategoryFilterMobileModal";
import PendingCertificateList from "./PendingCertificateList";
import certificates from "./certificates..json";
import CertificatesCardList from "./CertificatesCardList";

const categories = ["Pulsuz", "Xüsusi", "Professional"];

function Certificates() {
  // ---------- STATE ----------
  const [activeCategory, setActiveCategory] = useState("Hamısı");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [tab, setTab] = useState("won"); // "won" = Qazanılmış, "wait" = Gözləyən

    useEffect(()=>{
      window.scrollTo(0,0)
    },[])

  const gozleyenSay = certificates.filter(
    (item) => item.status === "gözləyən",
  ).length;
  const qazanilmisSay = certificates?.filter(
    (item) => item.status === "qazanılmış",
  ).length;
  const pendingCertificates =
    certificates?.filter((item) => item.status === "gözləyən") ?? [];
  const earnedCertificates =
    certificates?.filter((item) => item.status === "qazanılmış") ?? [];

  return (
    <>
      {/* main baslangic */}
      <div className="max-w-[1074px] mt-[25px] ml-[86px] mr-[32px] mb-[18px] max-md:ml-4 max-md:mr-4">
        <div className="">
          {/* Baslangic */}
          <div className="flex items-start flex-col gap-[16px]">
            <h1 className="text-[#050505]">Sertifikatlar</h1>
            <p className="text-[20px]">
              Qazanılmış və gözləyən sertifikatları görüntüləyin, paylaşın və
              karyeranızda istifadə edin
            </p>
          </div>
          {/* Axtaris ve category hissesi */}
          <div className="flex items-center justify-between gap-[36px] mt-[8px] max-md:gap-[12px]">
            {/* sertifikat axtar */}
            <div className="flex items-center gap-2 w-[636px] bg-[#FCFCFC] rounded-[32px] px-4 border-[1px] max-md:w-full max-md:min-w-0">
              <img className="w-[20.5px] h-[20.5px]" src={Search} alt="" />
              <input
                className="pl-[11px] py-[10px] flex-1 min-w-0 bg-[#FCFCFC] outline-none"
                type="text"
                placeholder="Setifikat axtar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Desktop: sizin kateqoriya duymeleri (mobilde gizlenir) */}
            <div className="flex items-center gap-[12px] text-[14px] max-md:hidden">
              {["Hamısı", ...categories].map((item) => (
                <button
                  key={item}
                  className={`flex px-4 py-2 rounded-[55px] border text-sm font-medium transition-colors ${
                    activeCategory === item
                      ? "bg-[#C8D6FF] text-[#213D92] border-transparent"
                      : "bg-white text-[#050505] border-[#D9D9D9]"
                  }`}
                  onClick={() => setActiveCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobil: filtr duymesi (desktopda gizlenir) */}
            <button
              onClick={() => setFilterOpen(true)}
              className={`md:hidden shrink-0 flex items-center gap-2 px-4 py-2 rounded-[55px] border text-sm font-medium transition-colors ${
                filterOpen || activeCategory !== "Hamısı"
                  ? "bg-[#C8D6FF] text-[#213D92] border-transparent"
                  : "bg-white text-[#050505] border-[#D9D9D9]"
              }`}
            >
              <img src={Filter} alt="" />
              <span className="max-w-[120px] truncate">
                {activeCategory === "Hamısı" ? "Filtr" : activeCategory}
              </span>
            </button>
          </div>

          {/* Mobil: kateqoriya secimi (asagidan acilir) */}
          {filterOpen && (
            <CategoryFilterMobileModal
              setFilterOpen={setFilterOpen}
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}

          {/* Mobil tablar (desktopda gizli) */}
          <div className="md:hidden grid grid-cols-2 bg-[#E5ECFF] rounded-[14px] p-1 mt-4">
            <button
              onClick={() => setTab("won")}
              className={`flex items-center justify-center gap-2 py-2 rounded-[11px] text-sm font-medium transition-colors ${
                tab === "won" ? "bg-white text-[#213D92]" : "text-[#6B7080]"
              }`}
            >
              Qazanılmış
              <span className="bg-[#213D92] text-white text-[12px] rounded-full px-[7px]">
                {qazanilmisSay}
              </span>
            </button>

            <button
              onClick={() => setTab("wait")}
              className={`flex items-center justify-center gap-2 py-2 rounded-[11px] text-sm font-medium transition-colors ${
                tab === "wait" ? "bg-white text-[#213D92]" : "text-[#6B7080]"
              }`}
            >
              Gözləyən
              <span className="bg-[#213D92] text-white text-[12px] rounded-full px-[7px]">
                {gozleyenSay}
              </span>
            </button>
          </div>

          {/* gozlemede olan sertifikatlar */}
          <div className={tab === "wait" ? "block" : "max-md:hidden"}>
            <div className="bg-[#E5ECFF] mt-[21px] pb-[20px] pl-[24px]  pr-[22px] rounded-[20px] flex flex-col gap-[18px]">
              {/* Gozleme sertifikat title */}
              <div className="flex items-center justify-between pt-[20px] pb-[18px] max-lg:flex-col max-lg:items-start max-lg:gap-[12px] max-md:px-4">
                <div className="flex items-center gap-[20px] max-md:gap-[12px]">
                  <div className="w-[48px] h-[48px] bg-[#C8D6FF] rounded-[8px] shrink-0">
                    <img
                      className="w-[30px] h-[30px] mt-[9px] ml-[9px]"
                      src={Timer}
                      alt="timer.svg"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-[18px] text-[#0D0D0D] font-sans">
                      Gözləyən Sertifikatlar ({pendingCertificates.length})
                    </h3>
                    <p className="text-[14px]">
                      Sertifikatlarınızın hazırlanma mərhələsini buradan izləyə
                      bilərsiniz.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[8px] border border-[#404040] rounded-[32px] py-[6px] px-[12px] max-lg:w-full">
                  <img
                    className="w-[20px] h-[20px] shrink-0"
                    src={Notification}
                    alt="notification"
                  />
                  <p className="text-[14px]">
                    Sertifikat hazır olduqda sizə bildiriş göndəriləcək
                  </p>
                </div>
              </div>
              {/* PaindingCertificatList */}
              <div>
                <PendingCertificateList
                  pendingCertificates={pendingCertificates}
                />
              </div>
            </div>
          </div>

          {/* Qazanilmis sertifikatlar */}
          <div className={tab !== "won" ? "max-md:hidden" : ""}>
            <h2 className="pt-[21px] pb-[20px]">Qazanılmış Sertifikatlar</h2>
            <CertificatesCardList earnedCertificates={earnedCertificates} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Certificates;
