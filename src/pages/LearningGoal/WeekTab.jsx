import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TODAY,
  illustrations,
  monthReward,
  sectionsByDate,
  weekCourses,
  weekStats,
  weeklyGoal,
  wonCoupon,
} from "../../data/learningGoalData.js";
import { addDays, dayMonth, formatMinutes, getWeekDays, weekdayLabel } from "../../utils/learningGoalUtils";
import { CouponWonModal, WeeklyGoalModal } from "../../components/LearningGoal/modals";
import { Icon, ImageSlot, ProgressBar, card } from "../../components/LearningGoal/shared";

const THEME = {
  green: { chip: "bg-[#DDF3E6] text-[#1E7A4A]", btn: "bg-[#DDF3E6] text-[#1E7A4A]", bar: "#1E7A4A" },
  orange: { chip: "bg-[#FFE3C4] text-[#B45309]", btn: "bg-[#FFE3C4] text-[#B45309]", bar: "#EA580C" },
  purple: { chip: "bg-[#EBD5FB] text-[#7C3AED]", btn: "bg-[#EBD5FB] text-[#7C3AED]", bar: "#7C3AED" },
};

const MIN_OFFSET = -8;
const MAX_OFFSET = 1;

const sumWeek = (days) => days.reduce((s, d) => s + (sectionsByDate[d] || 0), 0);

const DayCell = ({ iso }) => {
  const count = sectionsByDate[iso] || 0;
  const isToday = iso === TODAY;
  const isFuture = iso > TODAY;

  let circle = "border-2 border-[#D9D9D9] bg-white";
  if (count > 0) circle = "bg-[#FBBF24]";
  else if (isToday) circle = "border-2 border-[#F26B1D] bg-white";

  return (
    <li className="flex min-w-0 flex-col items-center text-center">
      <span className="text-[11px] font-medium text-[#171717] sm:text-[13px]">{weekdayLabel(iso)}</span>
      <span className="text-[9px] text-[#737373] sm:text-[11px]">
        <span className="sm:hidden">{iso.slice(8)}</span>
        <span className="hidden sm:inline">({dayMonth(iso)})</span>
      </span>

      <span className={`mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10 ${circle}`} />

      <span
        className={`mt-1.5 text-[10px] sm:text-[12px] ${
          isToday && count === 0 ? "font-medium text-[#F26B1D]" : "text-[#737373]"
        }`}
      >
        {count > 0 ? `${count} bölmə` : isToday ? "Bu gün" : isFuture ? "–" : "–"}
      </span>
    </li>
  );
};

const CourseCard = ({ course }) => {
  const theme = THEME[course.theme] ?? THEME.green;

  return (
    <article className={`relative flex h-full flex-col overflow-hidden ${card}`}>
      <ImageSlot src={course.cover} alt={course.title} className="aspect-[2/1] w-full" rounded="rounded-none" />

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className={`rounded-full px-3 py-0.5 text-[11px] ${theme.chip}`}>{course.category}</span>
          <span className="flex items-center gap-2 text-[11px] text-[#404040]">
            <span className="flex items-center gap-1">
              <Icon name="star" size={12} className="text-[#FBBF24]" fill="currentColor" />
              {course.rating}
            </span>
            <span>{course.students}</span>
          </span>
        </div>

        <h4 className="mt-2 text-[14px] font-medium text-[#171717] sm:text-[16px]">
          <Link to={`/courses/${course.id}`} className="after:absolute after:inset-0">
            {course.title}
          </Link>
        </h4>
        <p className="mt-1 text-[12px] text-[#737373]">{course.instructor}</p>

        <div className="mt-3">
          <ProgressBar value={course.done} max={course.total} color={theme.bar} label={course.title} />
          <div className="mt-1 flex justify-between text-[10px] text-[#737373] sm:text-[11px]">
            <span>
              {course.done}/{course.total} dərs tamamlandı
            </span>
            <span>Sonuncu: {course.last}</span>
          </div>
        </div>

        <span className={`mt-3 flex h-[38px] items-center justify-center gap-2 rounded-full text-[13px] ${theme.btn}`}>
          <Icon name="play" size={14} />
          Davam et
        </span>
      </div>
    </article>
  );
};

const WeekTab = () => {
  const navigate = useNavigate();

  const [target, setTarget] = useState(weeklyGoal.target);
  const [offset, setOffset] = useState(0);
  const [goalOpen, setGoalOpen] = useState(false);
  const [wonOpen, setWonOpen] = useState(false);
  const [awarded, setAwarded] = useState(false);

  const currentWeek = useMemo(() => getWeekDays(TODAY), []);
  const shownWeek = useMemo(() => getWeekDays(addDays(TODAY, offset * 7)), [offset]);

  const done = sumWeek(currentWeek);
  const remaining = Math.max(target - done, 0);

  /* Hədəfi dəyişəndə artıq tamamlanıbsa, kupon qazanılır (yalnız bir dəfə) */
  const saveGoal = (n) => {
    setTarget(n);
    setGoalOpen(false);
    if (done >= n && !awarded) {
      setAwarded(true);
      setWonOpen(true);
    }
  };

  return (
    <>
      {/* Həftənin hədəfi */}
      <section className={`p-4 sm:p-6 ${card}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-[14px] font-medium text-[#1F2A5A] sm:text-[16px]">
              <Icon name="flame" size={16} className="text-[#EA580C]" />
              Bu həftənin hədəfi
            </p>
            <p className="mt-2 text-[28px] font-semibold leading-none text-[#171717] sm:text-[40px]">
              {target} <span className="text-[18px] sm:text-[24px]">bölmə</span>
            </p>

            <div className="mt-4 max-w-[520px]">
              <ProgressBar value={done} max={target} label="Həftəlik hədəf" />
              <div className="mt-1.5 flex justify-between text-[12px] text-[#737373] sm:text-[13px]">
                <span>
                  {done}/{target} tamamlanıb
                </span>
                <span>{remaining} bölmə qalıb</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setGoalOpen(true)}
              className="mt-4 rounded-full border border-[#2A4EBB] px-5 py-2 text-[13px] text-[#2A4EBB]"
            >
              Hədəfi dəyiş
            </button>
          </div>

          <ImageSlot
            src={illustrations.weekTarget}
            alt="Hədəf"
            className="h-[96px] w-[96px] sm:h-[220px] sm:w-[220px]"
          />
        </div>
      </section>

      {/* Həftəlik plan */}
      <section className="mt-6">
        <h3 className="text-[16px] font-medium text-[#171717] sm:text-[20px]">Həftəlik planım</h3>

        <div className={`mt-3 flex items-center gap-1 p-3 sm:gap-3 sm:p-5 ${card}`}>
          <button
            type="button"
            aria-label="Əvvəlki həftə"
            disabled={offset <= MIN_OFFSET}
            onClick={() => setOffset((o) => o - 1)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#171717] hover:bg-[#F5F5F5] disabled:opacity-30"
          >
            <Icon name="chevronLeft" size={18} />
          </button>

          <ul className="grid min-w-0 flex-1 grid-cols-7 gap-1">
            {shownWeek.map((iso) => (
              <DayCell key={iso} iso={iso} />
            ))}
          </ul>

          <button
            type="button"
            aria-label="Növbəti həftə"
            disabled={offset >= MAX_OFFSET}
            onClick={() => setOffset((o) => o + 1)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#171717] hover:bg-[#F5F5F5] disabled:opacity-30"
          >
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </section>

      {/* Həftənin statistikası */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
        <div className={`flex items-center gap-3 p-3 sm:p-4 ${card}`}>
          <Icon name="book" size={26} className="shrink-0 text-[#2A4EBB]" />
          <div>
            <p className="text-[14px] font-medium text-[#171717]">{done} Bölmə tamamlanıb</p>
            <p className="text-[12px] text-[#737373]">Bu həftə</p>
          </div>
        </div>
        <div className={`flex items-center gap-3 p-3 sm:p-4 ${card}`}>
          <Icon name="clock" size={26} className="shrink-0 text-[#2A4EBB]" />
          <div>
            <p className="text-[14px] font-medium text-[#171717]">
              Öyrənmə vaxtı: {formatMinutes(weekStats.minutes)}
            </p>
            <p className="text-[12px] text-[#737373]">
              Tövsiyə olunan: {formatMinutes(weekStats.recommendedMinutes)}
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-3 p-3 sm:p-4 ${card}`}>
          <Icon name="cap" size={26} className="shrink-0 text-[#2A4EBB]" />
          <div>
            <p className="text-[14px] font-medium text-[#171717]">{weekStats.activeCourses} kurs</p>
            <p className="text-[12px] text-[#737373]">Aktiv kurslar</p>
          </div>
        </div>
      </div>

      {/* Ay sonu mükafatı */}
      <section className={`mt-4 flex flex-col items-center gap-4 p-4 sm:flex-row sm:gap-6 sm:p-5 ${card}`}>
        <ImageSlot src={illustrations.gift} alt="Hədiyyə" className="h-[80px] w-[80px] sm:h-[96px] sm:w-[96px]" />

        <div className="w-full min-w-0 flex-1 text-center sm:text-left">
          <h4 className="text-[15px] font-medium text-[#171717] sm:text-[18px]">{monthReward.title}</h4>
          <p className="mt-1 text-[12px] text-[#737373] sm:text-[13px]">{monthReward.text}</p>
        </div>

        <div className="w-full shrink-0 sm:w-[240px]">
          <p className="text-[12px] font-medium text-[#171717]">{monthReward.couponName}</p>
          <div className="mt-1.5">
            <ProgressBar value={monthReward.completedWeeks} max={monthReward.totalWeeks} label="Ay sonu mükafatı" />
          </div>
          <p className="mt-1 text-[11px] text-[#737373]">
            {monthReward.completedWeeks}/{monthReward.totalWeeks} həftə tamamlandı
          </p>
        </div>

        <Link
          to="/learning-goal/coupons"
          className="shrink-0 rounded-full border border-[#2A4EBB] px-5 py-2 text-[13px] text-[#2A4EBB]"
        >
          Ətraflı bax
        </Link>
      </section>

      {/* Bu həftəki kurslarım */}
      <section className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[16px] font-medium text-[#171717] sm:text-[20px]">Bu həftəki kurslarım</h3>
          <Link to="/courses" className="flex shrink-0 items-center gap-1.5 text-[13px] text-[#2A4EBB] sm:text-[14px]">
            Hamısına bax
            <Icon name="chevronRight" size={16} />
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {weekCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {goalOpen && (
        <WeeklyGoalModal
          current={target}
          options={weeklyGoal.options}
          recommended={weeklyGoal.recommended}
          max={weeklyGoal.max}
          onSave={saveGoal}
          onClose={() => setGoalOpen(false)}
        />
      )}

      {wonOpen && (
        <CouponWonModal
          coupon={wonCoupon}
          image={illustrations.gift}
          onClose={() => setWonOpen(false)}
          onGo={() => navigate("/courses")}
        />
      )}
    </>
  );
};

export default WeekTab;