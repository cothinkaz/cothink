import { useMemo, useState } from "react";
import {
  TODAY,
  XP_PER_DAY,
  activeDates,
  activityPool,
  badges,
  illustrations,
  streak,
  todayStatus,
} from "../../data/learningGoalData.js";
import {
  MONTHS,
  WEEKDAYS_MON,
  buildMonthGrid,
  formatDate,
  getDayDetails,
  isInRun,
  parseISO,
  weekdayIndex,
  addDays,
} from "../../utils/learningGoalUtils";
import { Breadcrumb, Icon, ImageSlot, PageHeader, card } from "../../components/LearningGoal/shared";

const LEGEND = [
  { color: "bg-[#E5E5E5]", label: "Aktiv olmadığın günlər" },
  { color: "bg-[#FDD66B]", label: "Aktiv olduğun günlər" },
  { color: "bg-[#FDBA3B]", label: "Ardıcıl olduğun günlər" },
  { color: "bg-[#F26B1D]", label: "Bu gün" },
];

const ACTIVITY_ICON = { video: "play", section: "book" };

const StatLine = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 text-[12px] sm:text-[13px]">
    <span className="text-[#737373]">{label}</span>
    <span className="font-medium text-[#171717]">{value}</span>
  </div>
);

/* ---------- Seçilmiş günün paneli ---------- */
const DayPanel = ({ iso, details, onClose }) => {
  const isToday = iso === TODAY;

  let status = { cls: "bg-[#F5F5F5] text-[#404040]", title: "Bu gün aktiv olmamısan", text: "Bu gün öyrənmə fəaliyyəti qeydə alınmayıb." };
  if (details.active) {
    status = { cls: "bg-[#F0FDF4] text-[#15803D]", title: "Ardıcıllıq qorunub", text: "Günlük hədəfini tamamladın." };
  } else if (isToday) {
    status = {
      cls: "bg-[#FFF7ED] text-[#C2410C]",
      title: "Ardıcıllıq hələ qorunmayıb",
      text: `Qorumaq üçün bu gün ${todayStatus.goalMinutes} dəqiqə öyrən.`,
    };
  }

  return (
    <aside className={`p-4 ${card}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-medium text-[#171717]">{formatDate(iso)}</h3>
        <button type="button" onClick={onClose} aria-label="Paneli bağla" className="text-[#737373]">
          <Icon name="close" size={18} />
        </button>
      </div>

      <div className={`mt-3 rounded-[12px] p-3 ${status.cls}`}>
        <p className="flex items-center gap-2 text-[13px] font-medium">
          {details.active && <Icon name="check" size={16} />}
          {status.title}
        </p>
        <p className="mt-0.5 text-[12px] opacity-80">{status.text}</p>
      </div>

      {details.active && (
        <>
          <p className="mt-4 text-[13px] font-medium text-[#171717]">Bugünkü aktivlik</p>
          <ul className="mt-2 space-y-2">
            {details.activities.map((a) => (
              <li key={a.id} className="flex items-center gap-3 rounded-[10px] bg-[#F8F9FF] p-2.5">
                <Icon name={ACTIVITY_ICON[a.type] ?? "book"} size={18} className="shrink-0 text-[#2A4EBB]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-medium text-[#171717]">{a.title}</span>
                  <span className="block text-[11px] text-[#737373]">{a.label}</span>
                </span>
                <span className="shrink-0 text-[11px] text-[#737373]">{a.minutes} dəq</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[13px] font-medium text-[#171717]">Qazanclar</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-[10px] border border-[#E5E5E5] p-2.5">
              <p className="text-[11px] text-[#737373]">XP</p>
              <p className="text-[13px] font-medium text-[#2A4EBB]">+{details.xp} XP</p>
            </div>
            <div className="rounded-[10px] border border-[#E5E5E5] p-2.5">
              <p className="text-[11px] text-[#737373]">Nişan</p>
              <p className="truncate text-[13px] font-medium text-[#171717]">
                {details.badge ? details.badge.name : "Yoxdur"}
              </p>
            </div>
          </div>

          {details.badge && (
            <div className="mt-3 flex items-center gap-3 rounded-[12px] bg-[#EEF2FF] p-3">
              <ImageSlot src={details.badge.image} alt={details.badge.name} className="h-[48px] w-[48px]" rounded="rounded-full" />
              <p className="text-[12px] text-[#1F2A5A]">
                <span className="font-medium">Təbriklər!</span> {details.badge.days} günlük ardıcıllıq rekordunu keçdin.
              </p>
            </div>
          )}
        </>
      )}
    </aside>
  );
};

/* ---------- Təqvim xanası ---------- */
const DayCell = ({ cell, activeSet, selected, onSelect }) => {
  const { iso, inMonth } = cell;
  const active = activeSet.has(iso);
  const flame = isInRun(iso, activeSet);
  const isToday = iso === TODAY;
  const isFuture = iso > TODAY;
  const col = weekdayIndex(iso);

  const joinsLeft = flame && col > 0 && activeSet.has(addDays(iso, -1));
  const joinsRight = flame && col < 6 && activeSet.has(addDays(iso, 1));

  let circle = "bg-[#E5E5E5]";
  if (isToday && active) circle = "bg-[#F26B1D] text-white";
  else if (isToday) circle = "bg-white ring-2 ring-[#F26B1D]";
  else if (flame) circle = "bg-[#FDBA3B] text-[#B45309]";
  else if (active) circle = "bg-[#FDD66B]";

  return (
    <div
      className={`flex justify-center py-1 ${flame ? "bg-[#FFF1CC]" : ""} ${flame && !joinsLeft ? "rounded-l-full" : ""} ${
        flame && !joinsRight ? "rounded-r-full" : ""
      } ${inMonth ? "" : "opacity-40"}`}
    >
      <button
        type="button"
        disabled={!inMonth || isFuture}
        onClick={() => onSelect(iso)}
        aria-label={`${formatDate(iso)}${active ? ", aktiv" : ""}`}
        aria-pressed={selected}
        className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10 ${circle} ${
          selected ? "outline outline-2 outline-offset-2 outline-[#2A4EBB]" : ""
        } disabled:cursor-default`}
      >
        {flame && <Icon name="flame" size={16} fill="currentColor" />}
      </button>
    </div>
  );
};

const StreakHistory = () => {
  const activeSet = useMemo(() => new Set(activeDates), []);
  const detailsCtx = useMemo(
    () => ({ activeSet, startDate: streak.startDate, badges, activityPool, xpPerDay: XP_PER_DAY }),
    [activeSet]
  );

  const today = parseISO(TODAY);
  const first = parseISO(activeDates[0]);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState(TODAY);

  const grid = useMemo(() => buildMonthGrid(view.y, view.m), [view]);

  const monthIndex = (y, m) => y * 12 + m;
  const canPrev = monthIndex(view.y, view.m) > monthIndex(first.getFullYear(), first.getMonth());
  const canNext = monthIndex(view.y, view.m) < monthIndex(today.getFullYear(), today.getMonth());

  const shift = (delta) =>
    setView(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const details = selected ? getDayDetails(selected, detailsCtx) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Öyrənmə hədəfi", to: "/learning-goal" },
          { label: "Ardıcıllıq tarixçəsi" },
        ]}
      />
      <PageHeader title="Ardıcıllıq tarixçəsi" subtitle="Öyrənmə vərdişlərini və statistikanı izlə." />

      <div className={`mt-5 grid gap-5 ${selected ? "lg:grid-cols-[1fr_320px]" : ""}`}>
        <div className="min-w-0">
          {/* Xülasə */}
          <section className={`flex items-center justify-between gap-4 p-4 sm:p-5 ${card}`}>
            <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex items-center gap-3">
                <Icon name="flame" size={44} className="shrink-0 text-[#F26B1D]" fill="currentColor" />
                <div>
                  <p className="text-[26px] font-semibold leading-none text-[#171717] sm:text-[32px]">
                    {streak.current} <span className="text-[16px] sm:text-[18px]">gün</span>
                  </p>
                  <p className="mt-1 text-[13px] text-[#171717]">Cari ardıcıllıq</p>
                  <p className="text-[11px] text-[#737373]">Möhtəşəm! Ardıcıllığını davam etdir.</p>
                </div>
              </div>

              <div className="w-full space-y-1.5 sm:max-w-[260px]">
                <StatLine label="Ən uzun ardıcıllıq" value={`${streak.longest} gün`} />
                <StatLine label="Başlanğıc tarixi" value={formatDate(streak.startDate)} />
                <StatLine label="Ümumi aktiv günlər" value={`${activeDates.length} gün`} />
              </div>
            </div>

            <ImageSlot src={illustrations.mountain} alt="" className="hidden h-[90px] w-[150px] sm:block" />
          </section>

          {/* Təqvim */}
          <h3 className="mt-6 text-[16px] font-medium text-[#171717] sm:text-[20px]">Aktivlik Təqvimi</h3>

          <section className={`mt-3 p-3 sm:p-5 ${card}`}>
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label="Əvvəlki ay"
                disabled={!canPrev}
                onClick={() => shift(-1)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F5F5F5] disabled:opacity-30"
              >
                <Icon name="chevronLeft" size={18} />
              </button>
              <p className="text-[14px] font-medium text-[#171717] sm:text-[16px]">
                {MONTHS[view.m]} {view.y}
              </p>
              <button
                type="button"
                aria-label="Növbəti ay"
                disabled={!canNext}
                onClick={() => shift(1)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F5F5F5] disabled:opacity-30"
              >
                <Icon name="chevronRight" size={18} />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-7 border-b border-[#E5E5E5] pb-2 text-center text-[11px] font-medium text-[#171717] sm:text-[13px]">
              {WEEKDAYS_MON.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7">
              {grid.map((cell) => (
                <DayCell
                  key={cell.iso}
                  cell={cell}
                  activeSet={activeSet}
                  selected={selected === cell.iso}
                  onSelect={setSelected}
                />
              ))}
            </div>
          </section>

          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {LEGEND.map((l) => (
              <li key={l.label} className="flex items-center gap-2 text-[11px] text-[#737373] sm:text-[12px]">
                <span className={`h-3 w-3 rounded-full ${l.color}`} />
                {l.label}
              </li>
            ))}
          </ul>
        </div>

        {selected && details && (
          <DayPanel iso={selected} details={details} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
};

export default StreakHistory;