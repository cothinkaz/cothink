import { useEffect } from "react";
import CertificatesCard from "../../components/Certificates/CertificatesCard";

function CertificatesCardList({ earnedCertificates }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!earnedCertificates || earnedCertificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50/70 rounded-[16px] border border-dashed border-gray-300 my-4">
        <div className="w-16 h-16 rounded-full bg-[#E5ECFF] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#2A4EBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-[18px] font-semibold text-[#050505] mb-1">
          Qazanılmış sertifikat tapılmadı
        </h3>
        <p className="text-[14px] text-[#737373] max-w-[360px]">
          Axtarışınıza və ya seçilmiş kateqoriyaya uyğun qazanılmış sertifikat mövcud deyil.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-x-[20px] gap-y-[21px] max-xl:grid-cols-2 max-md:grid-cols-1">
      {earnedCertificates.map((item) => (
        <CertificatesCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CertificatesCardList;
