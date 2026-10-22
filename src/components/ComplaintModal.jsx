import { useState } from "react";
import Close from "../assets/icon/close.svg";

const REASONS = [
  { value: "spam", label: "Spam" },
  { value: "harassment", label: "Zorakılıq və ya taciz" },
  { value: "inappropriate", label: "Uyğun olmayan məzmun" },
  { value: "misinformation", label: "Düzgün olmayan məlumat" },
  { value: "other", label: "Digər" },
];

function ComplaintModal({ setComplaint, complaint }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const handleClose = () => setComplaint(!complaint);

  const handleSubmit = () => {
    console.log({ reason, details: details.trim() });
    handleClose();
  };

  return (
    <div
      className="
        absolute top-0 right-6 z-50 w-[589px] h-[528px] p-[40px] flex flex-col justify-between bg-white border border-gray-200 rounded-[10px] shadow-lg

        max-[1440px]:w-[480px] max-[1440px]:h-auto max-[1440px]:max-h-[90vh] max-[1440px]:overflow-y-auto
        max-[1440px]:p-[28px] max-[1440px]:gap-[20px] max-[1440px]:justify-start

        max-md:fixed max-md:inset-x-0 max-md:top-auto max-md:bottom-0 max-md:w-full
        max-md:p-[20px] max-md:gap-[16px] max-md:rounded-b-none max-md:rounded-t-[16px] max-md:shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-medium text-black max-[1440px]:text-[16px]">
          Bu postu şikayət et
        </p>
        <button type="button" onClick={handleClose} aria-label="Bağla">
          <img className="w-[24px] h-[24px] max-md:w-[20px] max-md:h-[20px]" src={Close} alt="" />
        </button>
      </div>

      {/* Reasons */}
      <div className="flex flex-col gap-[20px] max-[1440px]:gap-[14px] max-md:gap-[12px]">
        {REASONS.map((item) => (
          <label
            key={item.value}
            className="flex items-center gap-[24px] max-[1440px]:gap-[16px] max-md:gap-[12px] cursor-pointer"
          >
            <input
              type="radio"
              name="complaint-reason"
              value={item.value}
              checked={reason === item.value}
              onChange={(e) => setReason(e.target.value)}
              className="w-[18px] h-[18px] max-md:w-[16px] max-md:h-[16px] accent-[#4468D5]"
            />
            <span className="text-[18px] max-[1440px]:text-[16px] max-md:text-[15px] text-[#737373]">
              {item.label}
            </span>
          </label>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Zəhmət olmasa təklifinizi yazın."
        className="w-full h-[50px] max-[1440px]:h-[44px] px-[16px] text-[14px] border border-[#BFBFBF] rounded-[10px] outline-none focus:border-[#4468D5]"
      />

      {/* Actions */}
      <div className="flex justify-end gap-[20px] max-[1440px]:gap-[12px] max-md:pb-[env(safe-area-inset-bottom)]">
        <button
          type="button"
          onClick={handleClose}
          className="w-[130px] h-[50px] text-[16px] text-black border border-gray-300 rounded-[10px]
                     max-[1440px]:w-[110px] max-[1440px]:h-[44px] max-[1440px]:text-[15px]
                     max-md:flex-1 max-md:w-auto"
        >
          Sil
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-[212px] h-[50px] text-[16px] text-white bg-[#4468D5] rounded-[10px]
                     max-[1440px]:w-[180px] max-[1440px]:h-[44px] max-[1440px]:text-[15px]
                     max-md:flex-[2] max-md:w-auto"
        >
          Qeyd et
        </button>
      </div>
    </div>
  );
}

export default ComplaintModal;