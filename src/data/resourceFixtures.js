/* ─── Default uploader ─── */
export const DEFAULT_UPLOADER = {
  name: "Murad Məmmədzadə",
  role: "Senior UX/Uİ dizayner",
  avatar: "/murad.jpg",
  resources: 18,
  followers: 320,
  likes: 18,
  profileUrl: "#",
};

/* ─── Default comments ─── */
export const DEFAULT_COMMENTS = [
  {
    id: "c1",
    author: "Səbinə Quliyeva",
    avatar: null,
    time: "8 gün əvvəl",
    text: "Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.",
    likes: 12,
    replies: [],
  },
  {
    id: "c2",
    author: "Gülara Nəsirova",
    avatar: null,
    time: "2 gün əvvəl",
    text: "Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.",
    likes: 12,
    replies: [
      {
        id: "c2r1",
        author: "Murad Məmmədzadə",
        avatar: null,
        time: "2 gün əvvəl",
        replyTo: "Gülara Nəsirova",
        text: "Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.",
        likes: 4,
      },
    ],
  },
  {
    id: "c3",
    author: "Aysel Həsənova",
    avatar: null,
    time: "3 gün əvvəl",
    text: "Bu kitab həyatıma çox müsbət təsir etdi. Tövsiyə edirəm!",
    likes: 8,
    replies: [
      {
        id: "c3r1",
        author: "Leyla Əliyeva",
        avatar: null,
        time: "3 gün əvvəl",
        replyTo: "Aysel Həsənova",
        text: "Mən də eyni fikirdəyəm, çox faydalı məzmunlu kitabdır.",
        likes: 3,
      },
    ],
  },
  {
    id: "c4",
    author: "Nigar Rəsulova",
    avatar: null,
    time: "4 gün əvvəl",
    text: "Müəllif çox sadə və başa düşülən dildə yazmışdır. Tövsiyə edirəm!",
    likes: 7,
    replies: [],
  },
  {
    id: "c5",
    author: "Elnur Məmmədov",
    avatar: null,
    time: "5 gün əvvəl",
    text: "Kitabı bir nəfəsdə oxudum. Çox maraqlı və öyrədici məzmundur.",
    likes: 15,
    replies: [
      {
        id: "c5r1",
        author: "Fərida Babayeva",
        avatar: null,
        time: "5 gün əvvəl",
        replyTo: "Elnur Məmmədov",
        text: "Tamamilə razıyam! Xüsusilə üçüncü fəsil çox faydalıdır.",
        likes: 6,
      },
    ],
  },
  {
    id: "c6",
    author: "Vüsal İsmayılov",
    avatar: null,
    time: "6 gün əvvəl",
    text: "Kitabın strukturu çox yaxşı qurulub, hər bölüm bir-birilə bağlıdır.",
    likes: 9,
    replies: [],
  },
];

/* ─── Book details corresponding to covers ─── */
export const BOOK_DETAILS = [
  {
    title: "İkigai",
    author: "Hektor Qarsiya & Fransesk Mirales",
    subtitle: "Uzun və xoşbəxt həyatın yapon sirri",
    format: "PDF",
    pages: 192,
    views: 2391,
    downloads: 253,
    image: "/books/ikigai.jpg",
    description:
      `"İkigai" uzun və xoşbəxt yaşamağın yapon sirridir. Bu kitabda ikigai anlayışının – insanın hər səhər oyanmaq üçün səbəbi olan dəyərin necə tapılacağı izah olunur.\n\n` +
      `Yaponların ən uzunömürlü və ən sağlam insanların sırasına daxil olmasının arxasında yatan düşüncə tərzi, gündəlik həyat vərdişləri və sadə, amma dərin prinsiplər bu kitabda bütöv şəkildə təqdim edilir.\n\n` +
      `Bu kitab özünü daha yaxşı tanımaq, həyatında nəqsəd və balans yaratmaq istəyən hər kəs üçün ilhamverici bir bələdçidir.`,
  },
  {
    title: "Atomik Vərdişlər",
    author: "Ceyms Klir",
    subtitle: "Xırda dəyişikliklər, böyük nəticələr",
    format: "PDF",
    pages: 320,
    views: 1840,
    downloads: 195,
    image: "/books/atomik.jpg",
    description:
      `İnsan həyatında vərdişlərin formalaşması və köhnə zərərli vərdişlərdən imtina yolları haqqında dünya bestselleri.\n\n` +
      `Müəllif hər gün edilən cüzi dəyişikliklərin uzunmüddətli perspektivdə nə qədər nəhəng nailiyyətlərə çevrildiyini elmi prinsiplərlə izah edir.`,
  },
  {
    title: "İtmiş Kitab Dükanı",
    author: "Evi Vudz",
    subtitle: "Sehrli səhifələr və keçmişin sirləri",
    format: "PDF",
    pages: 280,
    views: 1420,
    downloads: 160,
    image: "/books/itmis.jpg",
    description:
      `Dublinin sakit küçələrindən birində qəflətən peyda olan sirli kitab dükanı və onun arxasında yatan qeyri-adi hekayələr.\n\n` +
      `Kitabsevərlər və macəra axtarışında olanlar üçün ürəkaçan bir roman.`,
  },
  {
    title: "İtirilmiş Zaman",
    author: "Xanım Mehdixanlı",
    subtitle: "Keçmişin izləri və yeni başlanğıclar",
    format: "PDF",
    pages: 210,
    views: 980,
    downloads: 110,
    image: "/books/itirilmis.jpg",
    description:
      `Keçmişin izləri, peşmanlıqlar və yenidən başlamaq arzusu haqqında duyğusal Azərbaycan romanı.\n\n` +
      `Zaman geri qayıtmır, amma insan hər gün yenidən başlaya bilər.`,
  },
  {
    title: "Kim Deyir ki, Bir İnsan Hər Şeyi Dəyişə Bilməz?",
    author: "Pol Hokken",
    subtitle: "Dəyişikliyin gücü və fərdi təşəbbüslər",
    format: "PDF",
    pages: 245,
    views: 1120,
    downloads: 145,
    image: "/books/kim_deyir.jpg",
    description:
      `Sosial və ekoloji hərəkatların gücü və tək bir insanın belə cəmiyyətdə nəhəng dalğalanmalar yarada biləcəyinə dair ilhamverici araşdırma.`,
  },
  {
    title: "Yaşıl İşıqlar",
    author: "Metyu Makkonahi",
    subtitle: "Həyat dərsləri və uğurun fəlsəfəsi",
    format: "PDF",
    pages: 304,
    views: 1650,
    downloads: 210,
    image: "/books/yasil.jpg",
    description:
      `Hollivudun ən tanınmış aktyorlarından birinin həyat dərsləri, xatirələri və qırmızı işıqların necə yaşıl işığa çevrilməsi haqqında qeyri-adi avtobioqrafiyası.`,
  },
];


export const DETAIL_COMMENTS = DEFAULT_COMMENTS.slice(0, 2).map((comment) => ({
  ...comment,
  replies: comment.replies.map((reply) => ({ ...reply, likes: 12 })),
}));
