# Resources bölməsinin quruluşu

`src/pages` səhifələri məlumatı seçir və aşağıdakı komponentləri birləşdirir.
Kiçik UI hissələri `.jsx`, React hook-ları və köməkçi funksiyalar `.js` fayllarındadır.

- `shared`: ikonlar, avatar, naviqasiya yolu, modalın bağlanması və keçidin kopyalanması.
- `listing`: kateqoriya kartları, bölmələr, nəticələr və ortaq axtarış/filtr/səhifələmə hook-u.
- `detail`: kitab kartı, məlumat sətirləri, əməliyyatlar, təsvir, qiymətləndirmə və şərhlər.
- `hero`: slaydın görünüşü və taymer/siçan/toxunma/klaviatura idarəetməsi.
- `filters`: filtr seçimləri və onların görünüşü.
- `reader`: kitab və slayd oxuyucularının ortaq alətləri, önizləmələri və UI vəziyyəti.

Nümunə resurs və şərh məlumatları `src/data/resourceFixtures.js`, oxuyucu
mətnləri və konfiqurasiyası `src/data/readerData.js` faylındadır.
`resourcesData.js` və `resourceUtils.js` mövcud importlar üçün ixracları saxlayır.

Bu refaktor mövcud nümunə davranışını saxlayır. Real fayl yükləmə, sənəd
daxilində axtarış, şərhlərin göndərilməsi və saxlamanın qalıcı olması ayrıca
funksional işdir. Mövcud kateqoriya/oxuyucu keçidləri və demo məlumat
uyğunsuzluqları da ayrıca düzəldilməlidir.

Hero-nun həm kök elementi, həm sürüşən konteyneri `touch-pan-y` istifadə edir.
Uşaq elementdən ötürülən pointer capture hadisəsi sürüşdürməni dayandırmamalıdır.
Detaldakı əməliyyatlar `lg:grid-cols-4` ilə desktopda bir sırada qalır.

Yoxlama: `node --test tests/resourceUtils.test.js`, `npm run build` və lokal
server işləyərkən `node scripts/check-resources-responsive.mjs refactor`.
Yalnız keçid və idarəetmələr üçün son əmrə `--flows-only` əlavə etmək olar.
