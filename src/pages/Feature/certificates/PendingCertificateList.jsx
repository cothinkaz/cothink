import { useEffect } from "react"
import PendingCertificateCard from "../../../components/Certificates/PendingCertificateCard"


function PendingCertificateList({pendingCertificates}) {
    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
  return (
    <div className="bg-[#E5ECFF] flex flex-col gap-[18px]">
      {pendingCertificates?.map((item) => (
        <PendingCertificateCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default PendingCertificateList
