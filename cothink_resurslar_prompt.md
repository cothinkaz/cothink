Sən mövcud, production-tipli bir web layihəsi üzərində işləyən expert frontend mühəndissən (React/Next.js və ya layihədə istifadə olunan hər hansı stack — əvvəlcə özün müəyyən et).

Tapşırıq: Resurslar/Kitabxana bölməsinin YALNIZ CENTER / MAIN CONTENT sahəsini, verilmiş screenshot-lara uyğun təkmilləşdirmək.

## DƏYİŞDİRİLMƏSİ QADAĞAN OLUNANLAR

- Header
- Sidebar
- Footer
- Qlobal layout/app shell, routing strukturu, authentication
- Başqa səhifələrdə istifadə olunan shared komponentlərin QLOBAL davranışı

Yalnız icazə verilən sahə: Resurslar səhifəsinin mərkəzi content bölgəsi (header/sidebar/footer arasındakı scroll olunan əsas sahə).

## FAZA 1: ANALİZ (heç nə dəyişdirmədən)

Kodu oxu və müəyyən et:

1. Framework/stack, routing, komponent hierarxiyası
2. Resurslar route-unu render edən komponent və onun center-content hissəsi
3. Header/Sidebar/Footer-i təşkil edən fayllar
4. Mövcud resource card, filter, pagination, category page komponentləri
5. API/data fetching qatı, mövcud tip/interface-lər
6. Styling sistemi — layihə Tailwind CSS ilə işləyir: tailwind.config-i, mövcud utility class-ları, mövcud rəng/spacing/radius dəyişənlərini (theme.extend) və layihədə artıq istifadə olunan class pattern-lərini (məs. hansı shadow/rounded/spacing dəyərləri işlədilir) müəyyən et
7. i18n/lokalizasiya quruluşu (Azərbaycan mətnləri haradan gəlir)
8. Loading/empty/error state pattern-ləri

Bu fazada KOD YAZMA. Daxili plan qur və hansı mövcud komponentlərin reuse olunacağını, hansı yenilərin yaradılacağını siyahıya al.

## FAZA 2: HƏDƏF DİZAYN (screenshot + aşağıdakı struktur)

Aşağıdakı ekranları center-content daxilində reallaşdır, amma MÖVCUD arxitektura/pattern-lərə uyğun şəkildə (stack-i faza 1-də tapdığın kimi istifadə et, hazırda yazılan React+Tailwind fərziyyəsini deyil, layihənin özünü əsas götür):

**1. Əsas Resurslar səhifəsi:**
- Breadcrumb: Kitabxana > Resurslar
- Başlıq + alt başlıq, axtarış paneli + "Filtrlə" düyməsi
- Featured resource bloku (üz qabığı + sitat + oxucu sayı)
- 5 kateqoriya kartı (Bədii Kitablar, Dissertasiya, Sərbəst iş, Təqdimatlar, Elmi kitablar) — say + özünəməxsus ikon/rəng
- "Hamısına bax →" olan 3 bölmə: Ən son paylaşılan resurslar / Populyar resurslar / Tövsiyə olunan resurslar

**2. Filter modalı:**
Təhsil səviyyəsi, kateqoriya (multi-select + axtarış), dil, format, səhifə sayı aralığı, yükləmə tarixi, sıralama, "Sıfırla" / "Tətbiq et" düymələri

**3. Kateqoriya səhifələri:**
Hər kateqoriya üçün vahid, konfiqurasiya-əsaslı listing struktur (5 ayrı implementasiya YOX): başlıq kartı (ad + say + ikon), axtarış + filter, responsive grid (3/2/1 sütun), pagination

**4. Resource card (paylaşılan komponent):**
Şəkil və ya fallback ikon, kateqoriya badge, başlıq, müəllif, format + səhifə sayı badge-ləri, baxış/yükləmə sayı, bookmark, hover state

## QORUMA TƏLƏBLƏRİ

Mövcud route, API çağırışları, auth, axtarış/filter/pagination/bookmark məntiqi, data model, i18n, icazələr qırılmamalıdır. Əgər funksionallıq artıq varsa — UI-ni təkmilləşdir, implementasiyanı YENİDƏN YAZMA. Yoxdursa — layihənin öz pattern-ləri ilə implementasiya et.

Əgər lazım olan shared komponent başqa yerdə də istifadə olunursa, onu qlobal dəyişdirmə — lokal wrapper/variant yarat.

## STYLING QAYDASI (Tailwind CSS)

Bütün yeni/dəyişdirilən center-content stilləri YALNIZ Tailwind CSS utility class-ları ilə yazılmalıdır — inline style, yeni CSS/SCSS fayl, CSS-in-JS və ya ayrı stylesheet YARATMA.

Əgər layihənin tailwind.config.js-ində artıq custom rəng/spacing/radius token-ləri varsa (məs. accent blue, dark background), ixtiyari dəyər (arbitrary value, məs. `bg-[#111]`) yazmaq əvəzinə həmin mövcud token-ləri istifadə et. Yalnız tailwind.config-də qarşılığı olmayan, mütləq lazım olan hallarda arbitrary value işlədilə bilər.

Tailwind-in mövcud breakpoint-ləri (sm/md/lg/xl) ilə responsive-i qur, yeni breakpoint əlavə etmə.

## KOD KEYFİYYƏTİ

Yeni komponent yaratmazdan əvvəl REPO-DA AXTAR. Dublikat komponent/CSS, lazımsız asılılıq, qeyri-aid refactor, qlobal CSS dəyişikliyi etmə.

Mümkün komponent adları (yalnız ekvivalenti yoxdursa yarat):
`ResourceCard`, `ResourceGrid`, `ResourceCategoryHeader`, `ResourceSearch`, `ResourceFilters`, `ResourceFilterModal`, `ResourcePagination`, `FeaturedResource`, `ResourceSection`

## RESPONSIVE

- Desktop: 3 sütun grid
- Tablet: adaptiv sütun sayı
- Mobile: tək sütun, horizontal overflow olmadan, istifadə edilə bilən filter/pagination

Header/sidebar davranışına toxunmadan responsivliyi center-dən həll et.

## OUTPUT FORMATI

1. Component tree (yalnız center-content)
2. Hər komponentin tam kodu
3. Onların vahid `<main>`/center container daxilində necə composed olunduğu
4. Dəyişiklik hesabatı:
   - A. Araşdırılan fayllar
   - B. Dəyişdirilən fayllar və səbəbi
   - C. Reuse olunan komponentlər
   - D. Yaradılan yeni komponentlər
   - E. Header/Sidebar/Footer-in TOXUNULMADIĞININ təsdiqi
   - F. Screenshot-lardan qalan fərqlər (əgər varsa)

## VERİFİKASİYA (tətbiqdən sonra özün yoxla)

Resurslar route, bütün kateqoriya route-ları, axtarış, filter, filter sıfırlama, sıralama, pagination, resource card-lar, responsive davranış, konsol xətası olmaması, mövcud naviqasiyanın işləməsi, header/sidebar/footer-in dəyişməməsi.

## UĞUR MEYARI

"Bütün tətbiqi redizayn etmək" DEYİL — Resurslar center-content-ini screenshot-lara uyğun təkmilləşdirmək, Header/Sidebar/Footer/app shell/routing/backend-i tamamilə toxunulmamış saxlamaqla.

Qlobal/lokal arasında şübhən olanda — HƏMIŞƏ ən kiçik, lokal dəyişikliyi seç.
