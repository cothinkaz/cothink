import { useEffect } from "react"
import CertificatesCard from "../../../components/Certificates/CertificatesCard"

function CertificatesCardList({earnedCertificates}) {
    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
  return (
      <div className="grid grid-cols-3 gap-x-[20px] gap-y-[21px] max-xl:grid-cols-2 max-md:grid-cols-1">
      {earnedCertificates?.map((item) => (
        <CertificatesCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default CertificatesCardList
