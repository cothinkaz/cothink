import { useEffect } from "react";
import PendingCertificateCard from "../../components/Certificates/PendingCertificateCard";

function PendingCertificateList({ pendingCertificates }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!pendingCertificates || pendingCertificates.length === 0) {
    return (
      <div className="p-8 text-center text-[15px] text-[#737373] bg-white rounded-[16px] border border-gray-100">
        Gözləmədə olan sertifikat tapılmadı.
      </div>
    );
  }

  return (
    <div className="bg-[#E5ECFF] flex flex-col gap-[18px]">
      {pendingCertificates.map((item) => (
        <PendingCertificateCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default PendingCertificateList;
