import smallFire from "../../assets/Vector.svg?url";
import bigFire from "../../assets/bigfire.svg?url";
import playCircle from "../../assets/play-circle.svg?url";
import calendar from "../../assets/Icon set.svg?url";
import star from "../../assets/Icon set (1).svg?url";
import studyGirl from "../../assets/image 226 [Vectorized].svg?url";

function getAsset(name) {
  const fireAssets = {
    "fire-small": smallFire,
    "fire-big": bigFire,
    "play-circle": playCircle,
    calendar,
    star,
    "study-girl": studyGirl,
  };
  return fireAssets[name] ?? null;
}

function AssetImage({ name, alt = "", className = "" }) {
  const src = getAsset(name);
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt || name}
        className={`flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 text-center text-[10px] leading-tight text-gray-400 ${className}`}
      >
        {name}
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} />;
}

function ChevronRight() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-ink"

    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

const DAYS = [
  { label: "B.E", done: true },
  { label: "Ç.A", done: true },
  { label: "Ç", done: true },
  { label: "C", done: true },
  { label: "C.A", done: true },
  { label: "Ş", done: true },
  { label: "B", done: false },
];

const TASKS = [
  {
    icon: "play-circle",
    title: "Minimum 10 dəqiqə video izlə",
    text: "İstənilən kursda video izləyərək gününü tamamla.",
  },
  {
    icon: "play-circle",
    title: "Açıq qalan bölməni tamamla",
    text: "Başladığın bölməni tamamla və ardıcıllığı qoru.",
  },
];

const STATS = [
  { icon: "fire-small", label: "Ən uzun ardıcıllıq", value: "168 gün", link: true },
  { icon: "calendar", label: "Bu ay aktiv günlər", value: "15/31", link: true },
  { icon: "star", label: "Bugünkü XP", value: "+15 XP", link: false },
];

export default function LearningGoalToday({ streakDays = 187, progress = 75 }) {
  return (
    <div className="font-dm flex w-full max-w-[1192px] flex-col items-stretch gap-6 text-left  p-10">
      <div className="flex flex-col items-start gap-4 text-left">
        <h1 className="type-medium-32 text-left text-ink">
          Öyrənmə hədəfi və ardıcıllıq
        </h1>
        <p className="type-regular-20 text-left  text-muted">
          Planınızı izləyin, ardıcıl öyrənin və inkişaf edin.
        </p>
      </div>
      <div className="flex h-[50px] w-[356px] max-w-full gap-3 rounded-full border border-border bg-surface p-[4px]">
        <button
          type="button"
          className="type-medium-18 flex-1 rounded-full bg-[#C8D6FF] text-[#213D92]"
        >
          Bu gün
        </button>
        <button
          type="button"
          className="type-medium-18 flex-1 rounded-full text-ink"
        >
          Bu həftə
        </button>
      </div>
      <section className="flex cursor-pointer flex-col gap-6 overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,var(--color-card-from)_0%,var(--color-card-mid)_50%,var(--color-card-to)_100%)] p-8 md:h-[404px] md:flex-row md:items-stretch md:justify-between">
        <div className="flex flex-col justify-between gap-6">
          <div className="flex items-center gap-2">
            <AssetImage name="fire-small" className="h-6 w-6 object-contain" />
            <span className="type-medium-24 leading-none text-brand-title">
              Ardıcıllıq
            </span>
          </div>

          <p className="flex items-baseline gap-3 leading-none text-brand-ink">
            <span className="type-semibold-48">{streakDays}</span>
            <span className="type-medium-32">gün</span>
          </p>

          <p className="type-regular-24 leading-none text-muted">
            Möhtəşəm! Artıq {streakDays} gündür ardıcıl öyrənirsən
          </p>

          <div className="flex items-center gap-5">
            <div className="h-2.5 w-[500px] max-w-full overflow-hidden rounded-full bg-track">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="type-regular-18 leading-none text-ink">
              {progress}%
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <p className="type-medium text-[20px] leading-none text-ink">Son 7 gün</p>
            <div className="flex gap-7">
              {DAYS.map((d) => (
                <div
                  key={d.label}
                  className="flex w-7 flex-col items-center gap-1.5"
                >
                  <span
                    className={`h-7 w-7 rounded-full ${d.done
                        ? "bg-day"
                        : "border-[1.5px] border-day bg-surface"
                      }`}
                  />
                  <span className="type-regular-14 whitespace-nowrap leading-none text-muted">
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AssetImage
          name="fire-big"
          alt="Alov personajı"
          className="hidden h-[300px] w-[300px] shrink-0 self-center object-contain md:flex"
        />
      </section>

      <div className="flex h-16 items-center justify-between rounded-full border border-border bg-surface pl-4 pr-3">
        <div className="flex items-center gap-6">
          <span className="h-7 w-7 rounded-full bg-[#D9D9D9]" />
          <span className="type-regular-24 leading-none text-muted">
            Bugünkü ardıcıllıq qorunmayıb
          </span>
        </div>
        <button
          type="button"
          className="type-medium-20 h-[44px] rounded-full bg-brand px-10 text-on-brand transition hover:bg-brand-hover"
        >
          Öyrənməyə davam et
        </button>
      </div>

      <h2 className="type-medium-24 text-[#0D0D0D]">
        Bu gün nə etməlisən?
      </h2>

      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
        {TASKS.map((t, i) => (
          <div key={t.title} className="contents">
            {i > 0 && (
              <span className="type-regular-20 leading-none text-[#000000]">
                və ya
              </span>
            )}
            <article className="flex w-full flex-1 items-center gap-4 rounded-[20px] border border-border bg-surface p-6">
              <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-2xl bg-icon-tile">
                <AssetImage name={t.icon} className="h-16 w-16 object-contain" />
              </div>
              <div className="flex max-w-[250px] flex-col gap-2">
                <h3 className="type-medium-20 leading-snug text-ink">
                  {t.title}
                </h3>
                <p className="type-regular-16 leading-snug text-muted">
                  {t.text}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STATS.map((s) => (
          <article
            key={s.label}
            className={`flex h-[118px] items-center gap-8 rounded-[20px] border border-gray-300 shadow-xs bg-surface px-6 ${s.link ? "cursor-pointer" : ""
              }`}
          >
            <AssetImage name={s.icon} className="h-9 w-9 shrink-0 object-contain" />
            <div className="flex flex-1 flex-col gap-2">
              <span className="type-regular-20 leading-none text-ink whitespace-nowrap">
                {s.label}
              </span>
              <span className="type-medium-32 leading-none text-ink">
                {s.value}
              </span>
            </div>
            <span className="-translate-x-4">
              {s.link && <ChevronRight />}
            </span>
          </article>
        ))}
      </div>
      <section className="flex flex-col gap-8 overflow-hidden rounded-[20px] border border-gray-300 shadow-xs bg-card-from px-8 pt-8 md:h-[291px] md:flex-row md:gap-24 md:pt-0">
        <AssetImage
          name="study-girl"
          alt="Laptopla öyrənən qız"
          className="h-[243px] w-[326px] max-w-full shrink-0 self-center md:self-end"
        />
        <div className="flex flex-col gap-6 pb-8 md:pb-0 md:pt-11">
          <h2 className="type-medium-32 leading-[1.3] text-ink">
            Kiçik addımlar böyük dəyişikliklər yaradır
          </h2>
          <p className="type-regular-24 leading-[1.3] text-[#737373]">
            Ardıcıl öyrənmək təkcə bilikləri artırmır , həm də gələcəyini
            formalaşdırır
          </p>
        </div>
      </section>
    </div>
  );
}