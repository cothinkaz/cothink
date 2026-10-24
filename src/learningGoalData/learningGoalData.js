import { addDays } from "../utils/learningGoalUtils";
const badgeImages = import.meta.glob("../assets/learning-goal/badges/*.{png,svg,webp}", {
  eager: true,
  import: "default",
});
import motivation from "../assets/learning-goal/badges/motivation.svg";
import locked from "../assets/learning-goal/badges/locked.svg";
const img = (name) => badgeImages[`../assets/learning-goal/badges/${name}`] ?? null;

export const illustrations = {
  get streakMascot() {
    return getStreakMascot(streak.current);
  },
  motivation,
  weekTarget: null,
  gift: null,
  mountain: null,
  emptyCoupons: null,
  locked,
};


export const TODAY = "2026-07-18";
export const REMIND_AFTER_MIN = 20; // "20 dəqiqə sonra xatırlat"
export const XP_PER_DAY = 15;

export const streak = {
  current: 187,
  longest: 187,
  startDate: "2026-01-12",
};

/* Aktiv günlər: yanvarın əvvəlində 3 tək-tək gün, sonra startDate-dən dünənə qədər fasiləsiz ardıcıllıq.
   Bu gün (TODAY) hələ aktiv deyil, çünki todayStatus.protected = false. */
const earlyDates = ["2026-01-02", "2026-01-06", "2026-01-09"];
const run = [];
for (let d = streak.startDate; d < TODAY; d = addDays(d, 1)) run.push(d);
export const activeDates = [...earlyDates, ...run];

/* ================= Bu gün ================= */
export const todayStatus = {
  protected: false, // true edəndə "qorunub" vəziyyəti və xatırlatma modalı gizlənir
  goalMinutes: 10,
  xp: 15,
};

export const todayTasks = [
  {
    id: "video",
    icon: "play",
    title: "Minimum 10 dəqiqə video izlə",
    text: "İstənilən kursda video izləyərək günü tamamla.",
    href: "/courses",
  },
  {
    id: "section",
    icon: "book",
    title: "Açıq qalan bölməni tamamla",
    text: "Başladığın bölməni tamamla və ardıcıllığını qoru.",
    href: "/courses",
  },
];

/* ================= Nişanlar =================
   days: nişanın açılması üçün lazım olan ardıcıl gün sayı. Ada və gün sayına görə dəyiş. */
export const badges = [


  { id: 1, name: "İlk addım", days: 1, image: img("ilkaddim.svg"), bg: "bg-[#DBF6FF]" },
  { id: 2, name: "Qığılcım", days: 7, image: img("qigilcim.svg") , bg: "bg-[#CCF66A]" },
  { id: 3, name: "Alov", days: 30, image: img("alov.svg"), bg: "bg-[#FFED7A]" },
  { id: 4, name: "Sabit Ritm", days: 50, image: img("ritm.svg"), bg: "bg-[#E3CEFF]" },
  { id: 5, name: "İlham", days: 100, image: img("ilham.svg"), bg: "bg-[#FFDDE4]" },
  { id: 6, name: "Alov Ustası", days: 150, image: img("alovusdasi.svg"), bg: "bg-[#FFC865]" },
  { id: 7, name: "İradə", days: 200, image: img("irade.svg"), bg: "bg-[#D5FCFF]" },
  { id: 8, name: "Yüksəliş", days: 250, image: img("yukselis.svg"), bg: "bg-[#FFF17D]" },
  { id: 9, name: "Gecə Baykuşu", days: 300, image: img("baygus.svg"), bg: "bg-[#E5F2F9]" },
  { id: 10, name: "Kəşf", days: 350, image: img("kesf.svg"), bg: "bg-[#F6FF96]" },
  { id: 11, name: "Həftənin Ulduzu", days: 400, image: img("hefteninulduzu.svg"), bg: "bg-[#FFF05D]" },
  { id: 12, name: "Təşviqatçı", days: 450, image: img("tedgigatci.svg"), bg: "bg-[#F7EAFF]" },
  { id: 13, name: "Dahi", days: 500, image: img("dahi.svg"), bg: "bg-[#F7EAFF]" },
  { id: 14, name: "Kosmos", days: 550, image: img("kosmos.svg"), bg: "bg-[#F7EAFF]" },
  { id: 15, name: "Bilik Ovçusu", days: 600, image: img("bilikovcusu.svg"), bg: "bg-[#F7EAFF]" },
  { id: 16, name: "Çempion", days: 650, image: img("cempion.svg"), bg: "bg-[#F7EAFF]" },
  { id: 17, name: "Okean", days: 700, image: img("okean.svg"), bg: "bg-[#F7EAFF]" },
  { id: 18, name: "Almaz", days: 750, image: img("almaz.png"), bg: "bg-[#F7EAFF]" },
  { id: 19, name: "Əfsanə", days: 800, image: img("efsane.png"), bg: "bg-[#F7EAFF]" },
  { id: 20, name: "Böyük Ustad", days: 850, image: img("boyuk-ustad.png"), bg: "bg-[#F7EAFF]" },
];

/* Cari streak sayına görə uyğun nişan şəklini tapır */
export const getStreakMascot = (currentStreak) => {
  const matchedBadge = [...badges]
    .sort((a, b) => b.days - a.days)
    .find((badge) => currentStreak >= badge.days);

  return matchedBadge?.image ?? locked;
};

/* Ardıcıllıq tarixçəsində günün aktivlik siyahısı üçün nümunə fondu */
export const activityPool = [
  { id: 1, type: "video", title: "UX dizayn əsasları", label: "Video izlədi", minutes: 14 },
  { id: 2, type: "section", title: "Süni intellektə giriş", label: "Bölmə tamamladı", minutes: 22 },
  { id: 3, type: "video", title: "Riyazi analiz: limitlər", label: "Video izlədi", minutes: 18 },
  { id: 4, type: "section", title: "UX dizayn əsasları", label: "Bölmə tamamladı", minutes: 12 },
];

/* ================= Bu həftə ================= */
export const weeklyGoal = {
  target: 8,
  options: [3, 5, 8, 10, 12],
  recommended: 8,
  max: 15,
};

/* Tarix → həmin gün tamamlanan bölmə sayı */
export const sectionsByDate = {
  "2026-07-06": 2,
  "2026-07-07": 1,
  "2026-07-08": 3,
  "2026-07-09": 2,
  "2026-07-10": 1,
  "2026-07-13": 1,
  "2026-07-14": 2,
  "2026-07-15": 2,
};

export const weekStats = {
  minutes: 205, // 3s 25dq
  recommendedMinutes: 300, // 5s
  activeCourses: 2,
};

export const monthReward = {
  title: "Ay sonu mükafatı",
  text: "Bu həftəni tamamla və ay sonu 10% endirim kuponunu qazanmağa daha yaxın ol!",
  couponName: "Aylıq Kupon",
  completedWeeks: 2,
  totalWeeks: 4,
};

/* theme: green | orange | purple (düymə və kateqoriya rəngi) */
export const weekCourses = [
  {
    id: 1,
    title: "Dizaynın ilkin anlayışları",
    category: "Dizayn",
    label: "Yeni",
    instructor: "Murad Məmmədzadə",
    rating: 4.7,
    students: 777,
    done: 15,
    total: 20,
    last: "2 gün əvvəl",
    theme: "green",
    cover: null,
  },
  {
    id: 2,
    title: "Süni intellekt",
    category: "IT",
    label: "Populyar",
    instructor: "Murad Məmmədzadə",
    rating: 4.7,
    students: 777,
    done: 15,
    total: 20,
    last: "2 gün əvvəl",
    theme: "orange",
    cover: null,
  },
  {
    id: 3,
    title: "Riyazi Analiz - 1",
    category: "Riyaziyyat",
    label: "Premium",
    instructor: "Murad Məmmədzadə",
    rating: 4.7,
    students: 777,
    done: 15,
    total: 20,
    last: "2 gün əvvəl",
    theme: "purple",
    cover: null,
  },
];

/* ================= Kuponlar =================
   accent: indigo | green | orange.  status (tarixçə): used | expired
   Aktiv kuponlar massivini boş ([]) etsən, "Aktiv kuponunuz yoxdur" ekranı görünür. */
export const earningCoupon = {
  percent: 10,
  title: "10% Endirim kuponu",
  text: "Bu həftəlik hədəfi tamamla və kupona bir addım daha yaxınlaş",
  timeLeft: "2 gün 14 saat",
};

export const activeCoupons = [
  { id: 1, percent: 10, scope: "Professional kurslar", code: "CO-9A2B4D", receivedAt: "12 may 2026", expiresAt: "31 avqust 2026", accent: "indigo" },
  { id: 2, percent: 15, scope: "Premium kurslar", code: "CO-7F31C9", receivedAt: "12 may 2026", expiresAt: "31 avqust 2026", accent: "green" },
  { id: 3, percent: 10, scope: "Bütün kurslar", code: "CO-4D82E1", receivedAt: "12 may 2026", expiresAt: "31 avqust 2026", accent: "orange" },
];

export const couponHistory = [
  { id: 11, percent: 10, scope: "Professional kurslar", code: "CO-9A2B4D", receivedAt: "12 may 2026", usedAt: "31 avqust 2026", status: "used", accent: "indigo" },
  { id: 12, percent: 10, scope: "Bütün kurslar", code: "CO-5C10AB", receivedAt: "12 may 2026", expiresAt: "31 avqust 2026", status: "expired", accent: "orange" },
  { id: 13, percent: 10, scope: "Professional kurslar", code: "CO-2E77D0", receivedAt: "12 may 2026", usedAt: "28 iyun 2026", status: "used", accent: "indigo" },
  { id: 14, percent: 10, scope: "Bütün kurslar", code: "CO-8B93F2", receivedAt: "12 apr 2026", expiresAt: "12 may 2026", status: "expired", accent: "orange" },
  { id: 15, percent: 10, scope: "Professional kurslar", code: "CO-1A64C7", receivedAt: "12 mar 2026", usedAt: "30 mar 2026", status: "used", accent: "indigo" },
  { id: 16, percent: 15, scope: "Premium kurslar", code: "CO-6D05B8", receivedAt: "12 fev 2026", usedAt: "20 fev 2026", status: "used", accent: "green" },
];

/* "Hədəf qazanıldı" modalında göstərilən kupon */
export const wonCoupon = { percent: 10, code: "CO-98A7B2" };

export const couponRules = {
  how: [
    "Həftənin əvvəlində öyrənmə hədəfini seç.",
    "Həftə ərzində seçdiyin sayda kurs bölməsini tamamla.",
    "Ardıcıllığını (streak) qırmadan həftəni bitir.",
    "Həftə sonunda sistem nəticəni avtomatik qiymətləndirir və şərtlər ödənilibsə, endirim kuponu hesabına əlavə olunur.",
  ],
  terms: [
    "Kupon yalnız ödənişli kurslar və Premium abunəliklərdə keçərlidir.",
    "Kupon 30 gün ərzində istifadə edilməlidir.",
    "Bir alışda yalnız bir kupon istifadə oluna bilər.",
    "Kupon yalnız onu qazanan hesabda istifadə edilə bilər.",
    "İstifadə müddəti bitən kuponlar etibarsız hesab olunur.",
  ],
};

/* ================= Tez-tez verilən suallar ================= */
export const streakFaq = [
  { q: "Ardıcıllığım nə zaman sıfırlanır?", a: "Bir təqvim günü ərzində heç bir öyrənmə fəaliyyəti etməsən, ardıcıllıq sıfırlanır." },
  { q: "Gün necə hesablanır?", a: "Gün ərzində ən azı 10 dəqiqə video izləsən və ya bir bölməni tamamlasan, həmin gün aktiv sayılır." },
  { q: "Eyni gün bir neçə bölmə öyrənsəm nə olar?", a: "Ardıcıllıq günlə hesablanır, amma tamamladığın hər bölmə həftəlik hədəfinə ayrıca əlavə olunur." },
  { q: "Videonun nə qədərini izləsəm sayılır?", a: "Günlük hədəf üçün cəmi 10 dəqiqə izləmək kifayətdir. Bu vaxt bir neçə videoya bölünə bilər." },
  { q: "Ardıcıllığı itirsəm geri ala bilərəm?", a: "Itirilmiş ardıcıllıq bərpa olunmur. Yenidən başlayıb nişanları təkrar qazana bilərsən." },
];

export const couponFaq = [
  { q: "Kupon kodunu harada istifadə edə bilərəm?", a: "Kursun ödəniş səhifəsində “Kupon kodu” xanasına kodu yazıb tətbiq et düyməsini sıx." },
  { q: "Kuponun etibarlılıq müddəti nə qədərdir?", a: "Hər kuponun bitmə tarixi kartında göstərilir. Əksər kuponlar qazanılandan sonra 30 gün keçərlidir." },
  { q: "Bir neçə kuponu eyni anda istifadə etmək olarmı?", a: "Xeyr, bir alışda yalnız bir kupon istifadə oluna bilər." },
  { q: "Kupondan istifadə etdikdən sonra geri qaytarmaq olarmı?", a: "İstifadə olunmuş kupon geri qaytarılmır və tarixçədə “İstifadə olunub” kimi görünür." },
  { q: "Kupon kodu niyə işləmir?", a: "Kuponun müddəti bitmiş, artıq istifadə olunmuş və ya seçdiyin kurs kuponun əhatə dairəsindən kənarda ola bilər." },
];