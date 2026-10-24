import { useState } from "react";
import { CloseButton, Icon, ImageSlot, Modal, useCopy } from "./shared";

const primaryBtn =
  "flex h-[44px] w-full items-center justify-center rounded-full bg-[#2A4EBB] text-[14px] text-white";
const secondaryBtn =
  "flex h-[44px] w-full items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-[14px] text-[#404040]";

/* ---------- Ardıcıllıq qırılmaq üzrədir ---------- */
export const ReminderModal = ({ streak, minutes, remindAfter, onContinue, onLater, onClose }) => (
  <Modal onClose={onClose} label="Ardıcıllıq xatırlatması" className="max-w-[380px] text-center">
    <CloseButton onClick={onClose} />

    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1E6] text-[#F26B1D]">
      <Icon name="alert" size={28} />
    </div>

    <h3 className="mt-4 text-[18px] font-semibold text-[#171717]">Ardıcıllığın qırılmaq üzrədir!</h3>
    <p className="mt-2 text-[14px] leading-relaxed text-[#404040]">
      Bu gün cəmi {minutes} dəqiqə öyrənərək {streak} günlük ardıcıllığını qoru.
    </p>

    <div className="mt-5 flex flex-col gap-3">
      <button type="button" onClick={onContinue} className={primaryBtn}>
        İndi davam et
      </button>
      <button type="button" onClick={onLater} className={secondaryBtn}>
        {remindAfter} dəqiqə sonra xatırlat
      </button>
    </div>
  </Modal>
);

/* ---------- Həftəlik hədəfi dəyiş ---------- */
export const WeeklyGoalModal = ({ current, options, recommended, max, onSave, onClose }) => {
  const [selected, setSelected] = useState(current);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState("");

  const pick = (n) => {
    setSelected(n);
    setCustom("");
    setError("");
  };

  const save = () => {
    if (custom !== "") {
      const n = Number(custom);
      if (!Number.isInteger(n) || n < 1 || n > max) {
        setError(`1 ilə ${max} arasında tam ədəd yaz.`);
        return;
      }
      onSave(n);
      return;
    }
    onSave(selected);
  };

  const activeTile = custom === "" ? selected : null;

  return (
    <Modal onClose={onClose} label="Həftəlik hədəfi dəyiş" className="max-w-[520px]">
      <CloseButton onClick={onClose} />

      <h3 className="pr-8 text-[18px] font-semibold text-[#171717] sm:text-[20px]">
        Bu həftə neçə bölmə tamamlamaq istəyirsən?
      </h3>
      <p className="mt-1 text-[13px] text-[#737373]">
        Həftəlik hədəfini seç. Hədəfi istədiyin vaxt dəyişə bilərsən.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
        {options.map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={activeTile === n}
            onClick={() => pick(n)}
            className={`flex min-h-[72px] flex-col items-center justify-center rounded-[12px] border px-1 py-2 ${
              activeTile === n
                ? "border-[#2A4EBB] bg-[#EEF2FF] text-[#2A4EBB]"
                : "border-[#D9D9D9] bg-white text-[#171717]"
            }`}
          >
            <span className="text-[22px] font-semibold leading-none">{n}</span>
            <span className="mt-1 text-[11px]">bölmə</span>
            {n === recommended && <span className="mt-0.5 text-[9px] text-[#737373]">Tövsiyə olunan</span>}
          </button>
        ))}
      </div>

      <label htmlFor="custom-goal" className="mt-5 block text-[13px] font-medium text-[#171717]">
        Fərdi hədəf
      </label>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex h-[40px] min-w-0 flex-1 items-center rounded-[10px] border border-[#D9D9D9] px-3">
          <input
            id="custom-goal"
            type="number"
            inputMode="numeric"
            min={1}
            max={max}
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setError("");
            }}
            placeholder="İstədiyin bölmə sayını yaz"
            className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
          />
          <span className="shrink-0 border-l border-[#E5E5E5] pl-3 text-[11px] text-[#737373]">Max {max}</span>
        </div>

        <button
          type="button"
          onClick={save}
          className="h-[40px] shrink-0 rounded-full bg-[#C7D3FB] px-5 text-[13px] text-[#1F2A5A]"
        >
          Seç
        </button>
      </div>

      {error && <p className="mt-2 text-[12px] text-[#DC2626]">{error}</p>}
    </Modal>
  );
};

/* ---------- Kupon necə qazanılır? ---------- */
const RuleList = ({ title, items }) => (
  <div className="mt-4 first:mt-0">
    <h4 className="text-[14px] font-medium text-[#171717]">{title}</h4>
    <ul className="mt-2 space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2 text-[12px] leading-relaxed text-[#404040] sm:text-[13px]">
          <Icon name="check" size={14} className="mt-0.5 shrink-0 text-[#404040]" />
          {t}
        </li>
      ))}
    </ul>
  </div>
);

export const CouponRulesModal = ({ rules, onClose }) => (
  <Modal onClose={onClose} label="Kupon necə qazanılır" className="max-w-[560px]">
    <CloseButton onClick={onClose} />
    <div className="pr-6">
      <RuleList title="Kupon necə qazanılır?" items={rules.how} />
      <RuleList title="Kupon şərtləri" items={rules.terms} />
    </div>
  </Modal>
);

/* ---------- Təbriklər, kupon qazandın ---------- */
export const CouponWonModal = ({ coupon, image, onClose, onGo }) => {
  const { copied, copy } = useCopy();

  return (
    <Modal onClose={onClose} label="Kupon qazandın" className="max-w-[400px] text-center">
      <CloseButton onClick={onClose} />

      <ImageSlot src={image} alt="Hədiyyə" className="mx-auto h-[80px] w-[80px]" />
      <h3 className="mt-3 text-[18px] font-semibold text-[#171717]">Təbriklər!</h3>
      <p className="mt-1 text-[13px] text-[#737373]">Bu həftə hədəfini tamamladın.</p>

      <div className="mt-4 rounded-[12px] bg-[#EEF2FF] py-4">
        <p className="text-[26px] font-semibold text-[#2A4EBB]">{coupon.percent}%</p>
        <p className="text-[12px] text-[#2A4EBB]">Endirim kuponu qazandın</p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-[12px] border border-[#D9D9D9] px-4 py-3 text-left">
        <div className="min-w-0">
          <p className="text-[11px] text-[#737373]">Kupon kodu</p>
          <p className="truncate text-[14px] font-medium text-[#171717]">{coupon.code}</p>
        </div>
        <button
          type="button"
          onClick={() => copy(coupon.code)}
          className="shrink-0 rounded-full border border-[#2A4EBB] px-3 py-1 text-[12px] text-[#2A4EBB]"
        >
          {copied ? "Kopyalandı" : "Kopyala"}
        </button>
      </div>

      <button type="button" onClick={onGo} className={`${primaryBtn} mt-4`}>
        Kurslara keç
      </button>
    </Modal>
  );
};