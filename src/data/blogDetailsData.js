/*
  Detal səhifəsi üçün əlavə data.
  Açar = blogun id-si (blogData.js-dəki id).
  Burada olmayan bloqlar üçün sadə ehtiyat (fallback) göstərilir.

  content blokları:
    { type: "p", text }
    { type: "h2", text }
    { type: "image", src, caption }     // src yoxdursa boz yer tutucu görünür
    { type: "table", headers: [], rows: [[]] }
    { type: "code", language, code }
    { type: "note", text }
*/

export const authorInfo = {
  "Aydan Muradova": {
    bio: "Proseslərin avtomatlaşdırılması mühəndisliyi tələbəsi",
    followers: 320,
  },
};

const defaultAuthor = { bio: "Platforma müəllifi", followers: 0 };

export const getAuthorInfo = (name) => authorInfo[name] ?? defaultAuthor;

export const blogDetails = {
  1: {
    heading:
      "Android-də ListView və RecyclerView: Fərqləri, Üstünlükləri və Hansını seçməliyik?",
    saves: 5,
    feedback: { helpful: 198, neutral: 47, notHelpful: 22 },
    content: [
      {
        type: "p",
        text: "Android tətbiqlərində siyahıların göstərilməsi ən çox rast gəlinən funksiyalardan biridir. Məsələn, mesajlar, məhsullar, kontaktlar və ya xəbər lentləri kimi bir çox ekranlar siyahı strukturuna əsaslanır. Android SDK-da bu işi görmək üçün ListView istifadə olunsa da, daha yüksək performans və çeviklik tələb edən yerlərdə RecyclerView təklif edilir. Bəs bu ikisi arasında hansı fərqlər var? Gəlin birlikdə baxaq.",
      },

      { type: "h2", text: "1. ListView nədir ?" },
      {
        type: "p",
        text: "ListView — Android-də elementləri şaquli, sürüşdürülə bilən siyahı formasında göstərmək üçün istifadə olunan komponentdir. Hər bir məlumat siyahıda bir sətir kimi göstərilir və Adapter vasitəsilə məlumat mənbəyi ilə əlaqələndirilir.",
      },
      {
        type: "p",
        text: "ListView sadə siyahılar üçün kifayət qədər əlverişlidir. Lakin məlumatların sayı artdıqca və daha mürəkkəb interfeyslər tələb olunduqca performans problemləri yaranmağa başlayır.",
      },
      { type: "image", src: null, caption: "Şəkil 1. ListView görünüşü" },

      { type: "h2", text: "2. RecyclerView nədir?" },
      {
        type: "p",
        text: "RecyclerView Android Jetpack kitabxanasına daxil olan və ListView-dən daha müasir alternativ komponentdir. Onun əsas məqsədi ekrandan çıxan elementləri yenidən istifadə etməklə (View Recycling) böyük siyahıları daha səmərəli göstərməkdir.",
      },
      {
        type: "p",
        text: "Bundan əlavə, RecyclerView LinearLayoutManager, GridLayoutManager və StaggeredGridLayoutManager dəstəkləyir. Bu da onu hər cür siyahı, grid və ya mürəkkəb maketlər üçün uyğun edir.",
      },
      {
        type: "image",
        src: null,
        caption:
          "Şəkil 2. RecyclerView-in list və grid maketlərində istifadəsinə dair misal",
      },

      {
        type: "h2",
        text: "3. ListView və RecyclerView arasındakı əsas fərqlər",
      },
      {
        type: "p",
        text: "Aşağıdakı cədvəldə hər iki komponent arasındakı fərqləri qısa şəkildə görə bilərsiniz.",
      },
      {
        type: "table",
        headers: ["Xüsusiyyət", "ListView", "RecyclerView"],
        rows: [
          ["Performans", "Orta", "Yüksək"],
          ["ViewHolder", "Məcburi deyil", "Məcburidir"],
          ["Grid görünüşü", "Dəstəklənmir", "Dəstəklənir"],
          ["Üfüqi sürüşdürmə", "Dəstəklənmir", "Dəstəklənir"],
          ["Animasiyalar", "Məhduddur", "Dəstəklənir"],
          [
            "Böyük məlumatlarla iş",
            "Performansı zəifləyə bilər",
            "Daha optimallaşdırılmışdır",
          ],
        ],
      },
      {
        type: "image",
        src: null,
        caption: "Şəkil 3. ListView və RecyclerView müqayisəsi",
      },

      { type: "h2", text: "4. RecyclerView nümunəsi" },
      {
        type: "p",
        text: "Aşağıdakı kod nümunəsində onBindViewHolder() metodu siyahıdakı məlumatı uyğun elementə ötürür:",
      },
      {
        type: "code",
        language: "kotlin",
        code: `class MyViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val title: TextView = view.findViewById(R.id.tvTitle)
}

override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
    holder.title.text = items[position]
}`,
      },
      {
        type: "note",
        text: "Bu nümunədə onBindViewHolder() metodu siyahıdakı məlumatı uyğun elementə ötürür. ViewHolder isə eyni görünüşün təkrar istifadəsini təmin edərək RecyclerView-un daha performanslı işləməsinə kömək edir.",
      },

      { type: "h2", text: "5. Hansını seçməliyik?" },
      {
        type: "p",
        text: "Əgər kiçik və sadə bir layihə hazırlayırsınızsa, ListView hələ də istifadə oluna bilər. Lakin performans, animasiya imkanları və genişləndirilə bilən kod strukturu tələb edən layihələr üçün RecyclerView daha doğru seçimdir.",
      },
      {
        type: "p",
        text: "Bu gün e-ticarət tətbiqləri, sosial media platformaları, xəbər portalları və mesajlaşma proqramlarının böyük əksəriyyəti məhz RecyclerView istifadə edir. Buna görə də Android proqramçıları üçün onun işləmə prinsipini bilmək vacib hesab olunur.",
      },

      { type: "h2", text: "6. Nəticə" },
      {
        type: "p",
        text: "ListView Android inkişafında uzun müddət əsas siyahı komponenti kimi istifadə olunsa da, müasir tətbiqlərin tələblərini tam qarşılamır. RecyclerView isə daha yüksək performans, yaddaşdan səmərəli istifadə və çevik dizayn imkanları ilə bu sahədə standarta çevrilib. Android layihələri hazırlayarkən RecyclerView seçmək həm tətbiqin performansını artırır, həm də gələcəkdə layihənin inkişaf etdirilməsini daha rahat edir.",
      },
    ],
    comments: [
      {
        id: 1,
        author: "Səbinə Quliyeva",
        time: "6 gün əvvəl",
        text: "Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.",
        likes: 12,
        replies: [],
      },
      {
        id: 2,
        author: "Gülarə Nəsirova",
        time: "2 gün əvvəl",
        text: "Çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.",
        likes: 12,
        replies: [
          {
            id: 21,
            author: "Murad Məmmədzadə",
            time: "3 gün əvvəl",
            text: "Gülarə Nəsirova çox gözəl izah olunub. Sağ olun! İzahın sadəliyi həqiqətən mükəmməldir.",
            likes: 12,
            replies: [],
          },
        ],
      },
    ],
  },
};

/* Datası olmayan bloq üçün ehtiyat məzmun */
export const getBlogDetails = (blog) => {
  const details = blogDetails[blog.id];

  if (details) return { saves: 0, feedback: { helpful: 0, neutral: 0, notHelpful: 0 }, comments: [], ...details };

  return {
    heading: blog.title,
    saves: 0,
    feedback: { helpful: 0, neutral: 0, notHelpful: 0 },
    content: [{ type: "p", text: blog.description }],
    comments: [],
  };
};