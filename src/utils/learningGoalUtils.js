/* Öyrənmə hədəfi modulu üçün tarix və hesablama köməkçiləri.
   Bütün tarixlər "YYYY-MM-DD" (ISO) sətri kimi saxlanılır. */

const pad = (n) => String(n).padStart(2, "0");

export const MONTHS = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
  "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];
const MONTHS_LOWER = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr",
];

/* Təqvim başlığı: bazar ertəsindən başlayır */
export const WEEKDAYS_MON = ["B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş.", "B."];
/* JS getDay(): 0 = bazar */
const WEEKDAYS_SUN_FIRST = ["B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş."];

export const toISO = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const parseISO = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (iso, n) => {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
};

export const diffDays = (a, b) =>
  Math.round((parseISO(a) - parseISO(b)) / 86400000);

/* 0 = bazar ertəsi ... 6 = bazar */
export const weekdayIndex = (iso) => (parseISO(iso).getDay() + 6) % 7;
export const weekdayLabel = (iso) => WEEKDAYS_SUN_FIRST[parseISO(iso).getDay()];

export const dayMonth = (iso) => {
  const d = parseISO(iso);
  return `${d.getDate()} ${MONTHS_LOWER[d.getMonth()]}`;
};
export const formatDate = (iso) => `${dayMonth(iso)} ${parseISO(iso).getFullYear()}`;

export const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

/* Verilən günün olduğu həftənin 7 günü (b.e → bazar) */
export const getWeekDays = (iso) => {
  const start = addDays(iso, -weekdayIndex(iso));
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

/* Ayın təqvim şəbəkəsi: tam həftələrə tamamlanır, ay xaricindəki günlər inMonth=false */
export const buildMonthGrid = (year, month) => {
  const first = toISO(new Date(year, month, 1));
  const lead = weekdayIndex(first);
  const total = Math.ceil((lead + daysInMonth(year, month)) / 7) * 7;
  const start = addDays(first, -lead);

  return Array.from({ length: total }, (_, i) => {
    const iso = addDays(start, i);
    return { iso, inMonth: parseISO(iso).getMonth() === month };
  });
};

/* "Son 7 gün" nöqtələri */
export const getLastDays = (todayIso, activeSet, count = 7) =>
  Array.from({ length: count }, (_, i) => {
    const iso = addDays(todayIso, i - (count - 1));
    return {
      iso,
      label: weekdayLabel(iso),
      active: activeSet.has(iso),
      isToday: iso === todayIso,
    };
  });

export const countActiveInMonth = (activeSet, year, month) =>
  [...activeSet].filter((iso) => {
    const d = parseISO(iso);
    return d.getFullYear() === year && d.getMonth() === month;
  }).length;

/* Ardıcıl günün bir hissəsidirsə (qonşu günlərdən biri aktivdirsə) alov göstərilir */
export const isInRun = (iso, activeSet) =>
  activeSet.has(iso) &&
  (activeSet.has(addDays(iso, -1)) || activeSet.has(addDays(iso, 1)));

/* 205 → "3s 25dq" */
export const formatMinutes = (m) => {
  if (m < 60) return `${m}dq`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest === 0 ? `${h}s` : `${h}s ${rest}dq`;
};

/* 1 → "1-ci", 30 → "30-cu", 200 → "200-cü" (Azərbaycan dilində sıra sayı şəkilçisi) */
export const ordinalAz = (n) => {
  const byDigit = { 1: "ci", 2: "ci", 3: "cü", 4: "cü", 5: "ci", 6: "cı", 7: "ci", 8: "ci", 9: "cu" };
  const byTens = { 1: "cu", 2: "ci", 3: "cu", 4: "cı", 5: "ci", 6: "cı", 7: "ci", 8: "ci", 9: "cı" };

  let suffix;
  if (n % 1000 === 0) suffix = "ci";
  else if (n % 100 === 0) suffix = "cü";
  else if (n % 10 === 0) suffix = byTens[(n / 10) % 10];
  else suffix = byDigit[n % 10];

  return `${n}-${suffix}`;
};

/* Seçilmiş günün təfərrüatı (mock: aktivlik siyahısı gündən asılı olaraq sabit seçilir) */
export const getDayDetails = (iso, { activeSet, startDate, badges, activityPool, xpPerDay }) => {
  if (!activeSet.has(iso)) {
    return { active: false, activities: [], xp: 0, badge: null };
  }

  const seed = parseISO(iso).getDate();
  const count = 1 + (seed % 3);
  const activities = Array.from(
    { length: count },
    (_, i) => activityPool[(seed + i) % activityPool.length]
  );

  const streakDay = diffDays(iso, startDate) + 1;
  const badge = iso >= startDate ? badges.find((b) => b.days === streakDay) ?? null : null;

  return { active: true, activities, xp: xpPerDay, badge, streakDay };
};