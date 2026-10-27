import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  REMIND_AFTER_MIN,
  TODAY,
  activeDates,
  badges,
  illustrations,
  streak,
  todayStatus,
  todayTasks,
} from "../../learningGoalData/learningGoalData.js";

import { countActiveInMonth, daysInMonth, getLastDays, parseISO } from "../../utils/learningGoalUtils";
import { ReminderModal } from "../../components/LearningGoal/modals";
import { Icon, ImageSlot, ProgressBar, card } from "../../components/LearningGoal/shared";
const REMINDER_KEY = "lg-reminder";

const readReminder = () => {
  try {
    return JSON.parse(localStorage.getItem(REMINDER_KEY)) || {};
  } catch {
    return {};
  }
};
const writeReminder = (value) => {
  try {
    localStorage.setItem(REMINDER_KEY, JSON.stringify(value));
  } catch {
    /* storage əlçatmazdırsa heç nə etmə */
  }
};

/* Bu gün hələ göstərilməyibsə, və ya "sonra xatırlat" vaxtı çatıbsa göstər */
const shouldShowReminder = () => {
  if (todayStatus.protected) return false;
  const r = readReminder();
  if (r.date !== TODAY) return true;
  return Boolean(r.snoozeUntil) && Date.now() >= r.snoozeUntil;
};

const TaskCard = ({ task }) => (
  <Link
    to={task.href}
    className={`flex items-center gap-3 p-3 transition-colors hover:bg-[#F8F9FF] sm:gap-4 sm:p-4 ${card}`}
  >
    <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF2FF] text-[#2A4EBB] sm:h-[72px] sm:w-[72px]">
      <Icon name={task.icon} size={28} />
    </span>
    <span className="min-w-0">
      <span className="block text-[14px] font-medium text-[#171717] sm:text-[16px]">{task.title}</span>
      <span className="mt-0.5 block text-[12px] text-[#737373] sm:text-[13px]">{task.text}</span>
    </span>
  </Link>
);

const StatCard = ({ icon, iconClass, label, value, to }) => {
  const body = (
    <>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] text-[#737373] sm:text-[13px]">{label}</span>
        <span className="block text-[16px] font-semibold text-[#171717] sm:text-[18px]">{value}</span>
      </span>
      {to && <Icon name="chevronRight" size={16} className="shrink-0 text-[#737373]" />}
    </>
  );
  const cls = `flex items-center gap-3 p-3 sm:p-4 ${card}`;

  return to ? (
    <Link to={to} className={`${cls} hover:bg-[#F8F9FF]`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
};

const TodayTab = () => {
  const navigate = useNavigate();
  const protectedToday = todayStatus.protected;

  const activeSet = useMemo(() => new Set(activeDates), []);
  const lastDays = useMemo(() => getLastDays(TODAY, activeSet), [activeSet]);

  const next = badges.find((b) => b.days > streak.current);
  const percent = next ? Math.min(100, Math.round((streak.current / next.days) * 100)) : 100;

  const t = parseISO(TODAY);
  const monthActive = countActiveInMonth(activeSet, t.getFullYear(), t.getMonth());
  const monthDays = daysInMonth(t.getFullYear(), t.getMonth());

  /* Ardıcıllıq qorunmayıbsa xatırlatma modalı açılır; "20 dəqiqə sonra xatırlat" onu təxirə salır */
  // const [reminderOpen, setReminderOpen] = useState(!protectedToday);
  // const timer = useRef(null);
  // useEffect(() => () => clearTimeout(timer.current), []);

  // const remindLater = () => {
  //   setReminderOpen(false);
  //   clearTimeout(timer.current);
  //   timer.current = setTimeout(() => setReminderOpen(true), REMIND_AFTER_MIN * 60 * 1000);
  // };


  const [reminderOpen, setReminderOpen] = useState(shouldShowReminder);
const timer = useRef(null);

const openAfter = (ms) => {
  clearTimeout(timer.current);
  timer.current = setTimeout(() => {
    writeReminder({ date: TODAY });
    setReminderOpen(true);
  }, ms);
};

useEffect(() => {
  if (todayStatus.protected) return undefined;

  const r = readReminder();
  if (reminderOpen) {
    writeReminder({ date: TODAY }); // göstərildi, bu gün bir daha çıxmasın
  } else if (r.date === TODAY && r.snoozeUntil > Date.now()) {
    openAfter(r.snoozeUntil - Date.now()); // səhifəyə vaxt çatmamış qayıdıbsa, qalan müddəti gözlə
  }

  return () => clearTimeout(timer.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const closeReminder = () => setReminderOpen(false);

const remindLater = () => {
  const ms = REMIND_AFTER_MIN * 60 * 1000;
  writeReminder({ date: TODAY, snoozeUntil: Date.now() + ms });
  setReminderOpen(false);
  openAfter(ms);
};
  return (
    <>
      {/* Ardıcıllıq kartı */}
      <section className="rounded-[16px] border border-[#C7D3FB] bg-[#EEF2FF] p-4 sm:rounded-[20px] sm:p-6">
        <div className="flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="w-full min-w-0 md:max-w-[560px]">
            <p className="flex items-center gap-1.5 text-[14px] font-medium text-[#EA580C] sm:text-[16px]">
              <Icon name="flame" size={18} />
              Ardıcıllıq
            </p>

            <p className="mt-2 text-[32px] font-semibold leading-none text-[#1F2A5A] sm:text-[44px]">
              {streak.current} <span className="text-[20px] sm:text-[28px]">gün</span>
            </p>
            <p className="mt-2 text-[13px] text-[#404040] sm:text-[15px]">
              Möhtəşəm! Artıq {streak.current} gündür ardıcıl öyrənirsən.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <ProgressBar value={percent} label="Növbəti nişana qədər" />
              <span className="shrink-0 text-[12px] text-[#404040]">{percent}%</span>
            </div>
<p className="mt-1.5 text-[12px] text-[#737373]">
  {next ? `${next.name} nişanına ${next.days - streak.current} gün qaldı.` : "Bütün nişanları qazandın!"}
</p>

<Link
  to="/learning-goal/badges"
  className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-[#2A4EBB] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#2A4EBB] transition-colors hover:bg-[#2A4EBB] hover:text-white sm:text-[14px]"
>
  <Icon name="star" size={16} />
  Nişanlarıma bax
  <Icon name="chevronRight" size={16} />
</Link>

            <div className="mt-4">
              <p className="text-[12px] font-medium text-[#171717] sm:text-[13px]">Son 7 gün</p>
              <ul className="mt-2 flex gap-3 sm:gap-4">
                {lastDays.map((d) => (
                  <li key={d.iso} className="flex flex-col items-center gap-1">
                    <span
                      aria-label={d.active ? "Aktiv gün" : "Aktiv olmayan gün"}
                      className={`h-3.5 w-3.5 rounded-full sm:h-4 sm:w-4 ${
                        d.active
                          ? "bg-[#2A4EBB]"
                          : d.isToday
                            ? "border-2 border-[#2A4EBB] bg-white"
                            : "bg-[#C7D3FB]"
                      }`}
                    />
                    <span className="text-[10px] text-[#737373] sm:text-[11px]">{d.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ImageSlot
            src={illustrations.streakMascot}
            alt="Alov maskotu"
            className="h-[140px] w-[140px] sm:h-[200px] sm:w-[200px]"
          />
        </div>
      </section>

      {/* Bugünkü vəziyyət */}
      <div
        className={`mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[14px] border px-4 py-3 ${
          protectedToday ? "border-[#BBF7D0] bg-[#F0FDF4]" : "border-[#D9D9D9] bg-white"
        }`}
      >
        <p className="flex items-center gap-2 text-[13px] text-[#171717] sm:text-[14px]">
          <span className={`h-3 w-3 rounded-full ${protectedToday ? "bg-[#16A34A]" : "bg-[#FBBF24]"}`} />
          {protectedToday ? "Bugünkü ardıcıllıq qorunub" : "Bugünkü ardıcıllıq qorunmayıb"}
        </p>

        {!protectedToday && (
          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="rounded-full bg-[#2A4EBB] px-5 py-2 text-[13px] text-white sm:text-[14px]"
          >
            Öyrənməyə davam et
          </button>
        )}
      </div>

      {/* Bu gün nə etməlisən? */}
      {!protectedToday && (
        <section className="mt-6">
          <h3 className="text-[16px] font-medium text-[#171717] sm:text-[20px]">Bu gün nə etməlisən?</h3>

          <div className="mt-3 grid items-center gap-2 md:grid-cols-[1fr_auto_1fr] md:gap-4">
            <TaskCard task={todayTasks[0]} />
            <span className="text-center text-[13px] text-[#737373]">və ya</span>
            <TaskCard task={todayTasks[1]} />
          </div>
        </section>
      )}

      {/* Statistika */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard
          icon="flame"
          iconClass="bg-[#FFF1E6] text-[#EA580C]"
          label="Ən uzun ardıcıllıq"
          value={`${streak.longest} gün`}
          to="/learning-goal/streak-history"
        />
        <StatCard
          icon="calendar"
          iconClass="bg-[#DCFCE7] text-[#16A34A]"
          label="Bu ay aktiv günlər"
          value={`${monthActive}/${monthDays}`}
          to="/learning-goal/streak-history"
        />
        <StatCard
          icon="star"
          iconClass="bg-[#E8EDFB] text-[#2A4EBB]"
          label="Bugünkü XP"
          value={`+${todayStatus.xp} XP`}
        />
      </div>

      {/* Motivasiya */}
      <section className="mt-6 flex flex-col items-center gap-4 rounded-[16px] border border-[#C7D3FB] bg-[#F5F7FF] p-4 sm:flex-row sm:gap-8 sm:rounded-[20px] sm:p-6">
        <ImageSlot src={illustrations.motivation} alt="" className="h-[120px] w-full sm:h-[150px] sm:w-[260px]" />
        <div className="text-center sm:text-left">
          <h3 className="text-[18px] font-medium text-[#171717] sm:text-[24px]">
            Kiçik addımlar böyük dəyişikliklər yaradır
          </h3>
          <p className="mt-2 text-[13px] text-[#737373] sm:text-[16px]">
            Ardıcıl öyrənmək təkcə bilikləri artırmır, həm də gələcəyini formalaşdırır.
          </p>
        </div>
      </section>
{reminderOpen && (
  <ReminderModal
    streak={streak.current}
    minutes={todayStatus.goalMinutes}
    remindAfter={REMIND_AFTER_MIN}
    onContinue={() => {
      closeReminder();
      navigate("/courses");
    }}
    onLater={remindLater}
    onClose={closeReminder}
  />
)}
    </>
  );
};

export default TodayTab;