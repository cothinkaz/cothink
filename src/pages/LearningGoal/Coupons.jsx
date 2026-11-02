import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TODAY,
  activeCoupons,
  couponFaq,
  couponHistory,
  couponRules,
  earningCoupon,
  illustrations,
  sectionsByDate,
  weeklyGoal,
} from "../../data/learningGoalData.js";
import { getWeekDays } from "../../utils/learningGoalUtils";
import { CouponRulesModal } from "../../components/LearningGoal/modals";
import {
  Breadcrumb,
  FaqSection,
  Icon,
  ImageSlot,
  PageHeader,
  ProgressBar,
  SegmentedTabs,
  card,
  useCopy,
} from "../../components/LearningGoal/shared";

const TABS = [
  { key: "active", label: "Aktiv Kuponlar" },
  { key: "history", label: "Tarixçə" },
];

const ACCENT = {
  indigo: { bar: "border-l-[#6B5CE7]", text: "text-[#4F46E5]", btn: "border-[#6B5CE7] text-[#4F46E5]" },
  green: { bar: "border-l-[#22A06B]", text: "text-[#16A34A]", btn: "border-[#22A06B] text-[#16A34A]" },
  orange: { bar: "border-l-[#F26B1D]", text: "text-[#EA580C]", btn: "border-[#F26B1D] text-[#EA580C]" },
};

const STATUS = {
  used: { label: "İstifadə olunub", chip: "bg-[#DCFCE7] text-[#15803D]", bg: "bg-white" },
  expired: { label: "Müddəti bitib", chip: "bg-[#FEE2E2] text-[#B91C1C]", bg: "bg-[#FFF6F4]" },
};

const DateRow = ({ label, value }) => (
  <p className="flex justify-between gap-2 text-[11px] text-[#737373]">
    <span>{label}</span>
    <span className="text-[#404040]">{value}</span>
  </p>
);

/* Aktiv kupon: solda rəngli zolaq, kod kopyalama və "Kurslara bax" */
const ActiveCouponCard = ({ coupon }) => {
  const a = ACCENT[coupon.accent] ?? ACCENT.indigo;
  const { copied, copy } = useCopy();

  return (
    <article className={`flex flex-col border-l-4 p-4 ${card} ${a.bar}`}>
      <p className={`text-[26px] font-semibold leading-none ${a.text}`}>{coupon.percent}%</p>
      <p className={`text-[14px] ${a.text}`}>Endirim</p>
      <p className="mt-3 text-[14px] font-medium text-[#171717]">{coupon.scope}</p>

      <div className="mt-2 space-y-0.5">
        <DateRow label="Alınma tarixi:" value={coupon.receivedAt} />
        <DateRow label="Bitmə tarixi:" value={coupon.expiresAt} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] text-[#737373]">KOD</p>
          <p className="truncate text-[13px] font-medium text-[#171717]">{coupon.code}</p>
        </div>
        <button
          type="button"
          onClick={() => copy(coupon.code)}
          aria-label="Kodu kopyala"
          className="flex shrink-0 items-center gap-1 text-[11px] text-[#737373]"
        >
          {copied ? "Kopyalandı" : <Icon name="copy" size={16} />}
        </button>
      </div>

      <Link
        to="/courses"
        className={`mt-3 flex h-[36px] items-center justify-center rounded-full border text-[13px] ${a.btn}`}
      >
        Kurslara bax
      </Link>
    </article>
  );
};

/* Tarixçə kuponu: status nişanı ilə */
const HistoryCouponCard = ({ coupon }) => {
  const a = ACCENT[coupon.accent] ?? ACCENT.indigo;
  const s = STATUS[coupon.status] ?? STATUS.used;

  return (
    <article className={`p-4 ${card} ${s.bg}`}>
      <p className={`text-[26px] font-semibold leading-none ${a.text}`}>{coupon.percent}%</p>
      <p className={`text-[14px] ${a.text}`}>Endirim</p>
      <p className="mt-3 text-[14px] font-medium text-[#171717]">{coupon.scope}</p>

      <p className="mt-2 flex items-center gap-2 text-[11px] text-[#737373]">
        Kod: <span className="text-[#404040]">{coupon.code}</span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] ${s.chip}`}>{s.label}</span>
      </p>

      <div className="mt-2 space-y-0.5">
        <DateRow label="Alınma tarixi:" value={coupon.receivedAt} />
        {coupon.status === "used" ? (
          <DateRow label="İstifadə edilib:" value={coupon.usedAt} />
        ) : (
          <DateRow label="Bitmə tarixi:" value={coupon.expiresAt} />
        )}
      </div>
    </article>
  );
};

/* Qazanılacaq kupon: həftəlik hədəfin gedişatı */
const EarningCard = () => {
  const done = getWeekDays(TODAY).reduce((s, d) => s + (sectionsByDate[d] || 0), 0);
  const target = weeklyGoal.target;

  return (
    <section className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5 ${card}`}>
      <ImageSlot src={illustrations.gift} alt="Hədiyyə" className="h-[80px] w-[80px] shrink-0 sm:h-[110px] sm:w-[110px]" />

      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-[#2A4EBB]">Qazanılacaq kupon</p>
        <h3 className="mt-1 text-[16px] font-medium text-[#171717] sm:text-[18px]">{earningCoupon.title}</h3>
        <p className="mt-0.5 text-[12px] text-[#737373] sm:text-[13px]">{earningCoupon.text}</p>

        <div className="mt-3">
          <ProgressBar value={done} max={target} label="Kupona qədər" />
          <div className="mt-1 flex flex-wrap justify-between gap-x-4 text-[11px] text-[#737373]">
            <span>
              {done}/{target} tamamlandı
            </span>
            <span>
              {Math.max(target - done, 0)} bölmə qalıb | Bitməsinə:{" "}
              <span className="text-[#EA580C]">{earningCoupon.timeLeft}</span>
            </span>
          </div>
        </div>
      </div>

      <Link
        to="/learning-goal?tab=week"
        className="shrink-0 self-start rounded-full border border-[#2A4EBB] px-5 py-2 text-[13px] text-[#2A4EBB] sm:self-center"
      >
        Hədəfə keç
      </Link>
    </section>
  );
};

/* Aktiv kupon yoxdur */
const EmptyCoupons = () => (
  <div className="flex flex-col items-center px-4 py-16 text-center">
    <ImageSlot src={illustrations.emptyCoupons} alt="" className="h-[110px] w-[110px]" />
    <p className="mt-4 text-[16px] font-medium text-[#171717] sm:text-[18px]">Aktiv kuponunuz yoxdur</p>
    <p className="mt-1 max-w-[420px] text-[12px] text-[#737373] sm:text-[13px]">
      Hədəflərinizi tamamlayın və endirim kuponu qazanmağa başlayın.
    </p>
    <Link
      to="/learning-goal?tab=week"
      className="mt-4 rounded-full bg-[#2A4EBB] px-6 py-2.5 text-[13px] text-white"
    >
      Hədəfə keç
    </Link>
  </div>
);

const Coupons = () => {
  const [tab, setTab] = useState("active");
  const [rulesOpen, setRulesOpen] = useState(false);

  const tabLabel = TABS.find((t) => t.key === tab).label;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Öyrənmə hədəfi", to: "/learning-goal" },
          { label: "Kuponlarım" },
          { label: tabLabel },
        ]}
      />
      <PageHeader title="Kuponlarım" subtitle="Endirim kuponlarını buradan idarə edə bilərsiniz." />

      <div className="mt-4 sm:mt-5">
        <SegmentedTabs tabs={TABS} value={tab} onChange={setTab} />
      </div>

      {tab === "active" ? (
        activeCoupons.length === 0 ? (
          <EmptyCoupons />
        ) : (
          <>
            <div className="mt-5">
              <EarningCard />
            </div>

            <section className="mt-8">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[18px] font-medium text-[#171717] sm:text-[22px]">Aktiv kuponlar</h3>
                  <p className="text-[12px] text-[#737373]">Hazırda istifadə edə biləcəyin kuponlar.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRulesOpen(true)}
                  className="flex shrink-0 items-center gap-1.5 text-[12px] text-[#2A4EBB] sm:text-[13px]"
                >
                  Kuponlar haqqında
                  <Icon name="info" size={14} />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {activeCoupons.map((c) => (
                  <ActiveCouponCard key={c.id} coupon={c} />
                ))}
              </div>
            </section>

            <FaqSection title="Kuponlar" items={couponFaq} />
          </>
        )
      ) : couponHistory.length === 0 ? (
        <p className="mt-10 text-center text-[13px] text-[#737373]">Tarixçə hələ boşdur.</p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {couponHistory.map((c) => (
            <HistoryCouponCard key={c.id} coupon={c} />
          ))}
        </div>
      )}

      {rulesOpen && <CouponRulesModal rules={couponRules} onClose={() => setRulesOpen(false)} />}
    </div>
  );
};

export default Coupons;