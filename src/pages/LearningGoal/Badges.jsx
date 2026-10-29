import { badges, illustrations, streak, streakFaq } from "../../learningGoalData/learningGoalData.js";
import { ordinalAz } from "../../utils/learningGoalUtils";
import { Breadcrumb, FaqSection, Icon, ImageSlot, PageHeader, ProgressBar } from "../../components/LearningGoal/shared";

const BadgeCard = ({ badge, unlocked }) => {
  // Şəkil varsa öz şəklini, yoxdursa kilit illüstrasiyasını götürür
  const displayImage = badge.image || illustrations.locked;
  
  // Datadan arxa fon rəngi gəlmədikdə istifadə olunacaq susmaya görə rəng
  const bgClass = badge.bg || "bg-[#E0F2FE]";

  return (
    <li
      className={`flex flex-col items-center rounded-[16px] border p-3 text-center sm:rounded-[20px] sm:p-5 ${
        unlocked ? "border-[#D9D9D9] bg-white" : "border-[#E5E5E5] bg-[#FAFAFA]"
      }`}
    >
      {displayImage ? (
        <div className="relative flex items-center justify-center">
          {/* Arxa fondakı rəngli dairə */}
          <div
            className={`flex h-[84px] w-[84px] items-center justify-center rounded-full p-2 sm:h-[116px] sm:w-[116px] ${
              unlocked ? bgClass : "bg-[#F3F4F6]"
            }`}
          >
            <ImageSlot
              src={displayImage}
              alt={badge.name}
              className={`h-[72px] w-[72px] sm:h-[104px] sm:w-[104px] ${
                !unlocked ? "grayscale filter opacity-60" : ""
              }`}
              rounded="rounded-full"
            />
          </div>

          {!unlocked && (
            <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#737373] text-white sm:h-8 sm:w-8">
              <Icon name="lock" size={16} />
            </span>
          )}
        </div>
      ) : (
        <span
          aria-label={`${badge.name} (kilidli)`}
          className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#E5E5E5] text-[#A3A3A3] sm:h-[116px] sm:w-[116px]"
        >
          <Icon name="lock" size={28} />
        </span>
      )}

      <p className={`mt-3 text-[13px] font-medium sm:text-[15px] ${unlocked ? "text-[#171717]" : "text-[#737373]"}`}>
        {badge.name}
      </p>
      <p className="mt-0.5 text-[11px] text-[#737373] sm:text-[12px]">{ordinalAz(badge.days)} gün</p>
    </li>
  );
};

const Badges = () => {
  const next = badges.find((b) => b.days > streak.current);
  const earned = badges.filter((b) => b.days <= streak.current).length;

  const nextBadgeImage = next?.image || illustrations.locked;
  const nextBgClass = next?.bg || "bg-[#EEF2FF]";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Öyrənmə hədəfi", to: "/learning-goal" },
          { label: "Nişanlar" },
        ]}
      />
      <PageHeader title="Nişan və Nailiyyətlər" subtitle={`${earned}/${badges.length} nişan qazanılıb`} />

      {/* Növbəti nişan */}
      {next ? (
        <section className="mt-5 flex items-center gap-4 rounded-[16px] border border-[#C7D3FB] bg-[#EEF2FF] p-4 sm:gap-6 sm:rounded-[20px] sm:p-6">
          <div className={`flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full p-2 sm:h-[120px] sm:w-[120px] ${nextBgClass}`}>
            {nextBadgeImage ? (
              <ImageSlot
                src={nextBadgeImage}
                alt={next.name}
                className="h-[72px] w-[72px] sm:h-[104px] sm:w-[104px]"
                rounded="rounded-full"
              />
            ) : (
              <Icon name="lock" size={36} className="text-[#4F46E5]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-[16px] font-medium text-[#171717] sm:text-[22px]">{next.name}</h3>
            <p className="mt-0.5 text-[12px] text-[#737373] sm:text-[14px]">
              {next.days} günlük ardıcıllığa çat
            </p>

            <div className="mt-3 max-w-[520px]">
              <ProgressBar value={streak.current} max={next.days} label={`${next.name} nişanına qədər`} />
              <p className="mt-1 text-right text-[11px] text-[#737373] sm:text-[12px]">
                {streak.current}/{next.days} gün
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-5 rounded-[16px] border border-[#BBF7D0] bg-[#F0FDF4] p-4 sm:rounded-[20px] sm:p-6">
          <h3 className="text-[18px] font-semibold text-[#166534]">Təbriklər! 🎉</h3>
          <p className="mt-1 text-[14px] text-[#15803D]">
            Bütün nişanları qazanmısınız! Ardıcıllığınızı qorumağa davam edin.
          </p>
        </section>
      )}

      {/* Bütün nişanlar */}
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {badges.map((b) => (
          <BadgeCard key={b.id} badge={b} unlocked={b.days <= streak.current} />
        ))}
      </ul>

      <FaqSection title="Nişan və nailiyyətlər" items={streakFaq} />
    </div>
  );
};

export default Badges;