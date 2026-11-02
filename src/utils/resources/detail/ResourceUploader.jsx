import { Link } from "react-router-dom";
import ResourceAvatar from "../shared/ResourceAvatar";
import { ResourceIcon } from "../shared/ResourceIcons";

export default function ResourceUploader({ uploader }) {
  return (
    <div className="mt-8 rounded-[18px] border border-[#E5E7EB] bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">

      <div className="flex items-center gap-5">
        <ResourceAvatar key={uploader.avatar} src={uploader.avatar} alt={uploader.name} size={72} className="shadow-sm" />

        <div>
          <h4 className="text-[17px] font-semibold text-[#111827]">{uploader.name}</h4>
          <p className="text-[13px] text-[#6B7280]">{uploader.role}</p>

          <div className="mt-3 flex items-center gap-4 text-left">
            <div>
              <p className="text-[16px] font-bold text-[#111827]">{uploader.resources}</p>
              <p className="text-[12px] text-[#6B7280]">Resurs</p>
            </div>
            <div className="h-6 w-[1px] bg-[#E5E7EB]" />
            <div>
              <p className="text-[16px] font-bold text-[#111827]">{uploader.followers}</p>
              <p className="text-[12px] text-[#6B7280]">İzləyici</p>
            </div>
            <div className="h-6 w-[1px] bg-[#E5E7EB]" />
            <div>
              <p className="text-[16px] font-bold text-[#111827]">{uploader.likes}</p>
              <p className="text-[12px] text-[#6B7280]">Bəyənmə</p>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="#"
        className="flex items-center gap-1 text-[14px] font-medium text-[#2563EB] hover:underline shrink-0"
      >
        Profilə bax
        <ResourceIcon name="chevronRight" />
      </Link>
    </div>

  );
}
