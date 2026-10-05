COTHINK — İKON DƏSTİ (SVG)
============================

Bu qovluqda Figma dizayn faylından developerlərə ötürülən bütün ikonlar
SVG formatında yerləşir.

Ümumi məlumat:
- Kitabxana: Vuesax / Iconsax — "Linear" (outline) stil
- Ümumi say: 47 ikon (46 ədəd Vuesax Linear dəstindən + 1 ədəd custom ikon: volume-high.svg)
- Dizayn grid ölçüsü: 24 x 24 px (hər ikon bu grid daxilində layihələndirilib,
  content ölçüsündən asılı olaraq real viewBox fərqli ola bilər, məs. 22x20, 19x22 və s.)
- Standart stroke-width: 1.5px (bir neçə ikonda 2px)
- Standart rəng: #292D32 (tünd boz/qara)
- İstisnalar: dislike.svg / notification-circle.svg kimi bəzi elementlərdə #FF4E4E (qırmızı),
  star.svg-də #FFE24F (sarı) dolğu rəngi istifadə olunub
- Format: Bütün fayllar təmiz SVG (vektor), stroke/fill path-ları ilə

İstifadə tövsiyəsi (developer üçün):
- İkonların rəngini kod tərəfindən idarə etmək üçün SVG içindəki sabit
  "stroke"/"fill" hex dəyərini "currentColor" ilə əvəz etmək tövsiyə olunur.
- Ölçü dəyişikliyi üçün width/height atributlarını silib, CSS class ilə
  ölçüləndirmək daha rahatdır (məs. .icon { width: 20px; height: 20px; }).

Fayl siyahısı üçün icon-manifest.csv sənədinə baxın.
