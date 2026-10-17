// ============================================================
// COD+ MERKEZİ QUIZ & AKRAN DÜELLOSU SORU BANKASI
// 7 Programlama Dili & 415 Pedagojik Çoktan Seçmeli Soru
// Otomatik Senkronizasyon: PostgreSQL 'quizzes' tablosu
// ============================================================

const quizBank = {
    "html": [
        {
            "id": 16,
            "topic": "iskelet",
            "question": "Bir HTML sayfasında tarayıcıya \"Bu HTML5 belgesidir\" diye bildiren etiket hangisidir?",
            "options": [
                "<!DOCTYPE html>",
                "<html lang=\"tr\">",
                "<meta charset=\"UTF-8\">",
                "<head>"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 17,
            "topic": "iskelet",
            "question": "Kullanıcıya görünen tüm içerik (yazı, resim, buton) hangi etiketin içine yazılır?",
            "options": [
                "<head>",
                "<body>",
                "<meta>",
                "<html>"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 18,
            "topic": "iskelet",
            "question": "Aşağıdakilerden hangisi geçerli bir HTML5 iskelet sıralamasıdır?",
            "options": [
                "body > html > head",
                "html > body > head",
                "DOCTYPE > html > head > body",
                "head > body > html"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 19,
            "topic": "meta_seo",
            "question": "Türkçe karakterlerin (ş, ğ, ç) bozulmaması için hangi meta etiketi kullanılır?",
            "options": [
                "<meta lang=\"tr\">",
                "<meta encoding=\"tr\">",
                "<meta type=\"turkish\">",
                "<meta charset=\"UTF-8\">"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 20,
            "topic": "meta_seo",
            "question": "Sitenin mobil cihazlarda düzgün görünmesi için hangi meta etiketi zorunludur?",
            "options": [
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
                "<meta name=\"screen\">",
                "<meta name=\"mobile\">",
                "<meta type=\"responsive\">"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 21,
            "topic": "meta_seo",
            "question": "Arama motorlarının (Google) sayfayı tanıması için özet açıklama hangi etikette yazılır?",
            "options": [
                "<title>",
                "<meta name=\"description\">",
                "<meta name=\"keywords\">",
                "<header>"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 22,
            "topic": "basliklar",
            "question": "SEO açısından bir sayfada kaç adet H1 etiketi olmalıdır?",
            "options": [
                "İstediğimiz kadar",
                "En az 3",
                "Sadece 1",
                "Hiç olmamalı"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 23,
            "topic": "basliklar",
            "question": "Aşağıdaki başlık etiketlerinden hangisi en küçük boyuttadır?",
            "options": [
                "<h1>",
                "<h3>",
                "<h4>",
                "<h6>"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 24,
            "topic": "basliklar",
            "question": "h1-h6 etiketleri arasında doğru hiyerarşi nasıl olmalıdır?",
            "options": [
                "h1 en b├╝y├╝k h6 en k├╝├ğ├╝k olup b├╝y├╝kten k├╝├ğ├╝─şe s─▒ra izlenmelidir",
                "Rastgele kullan─▒labilir s─▒ra ├Ânemli de─şildir",
                "h6 en büyük h1 en küçüktür",
                "Hepsi aynı boyuttadır sadece numaraları farklıdır"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 25,
            "topic": "paragraf_satir",
            "question": "Yeni bir paragraf açmadan sadece alt satıra geçmek için hangi etiket kullanılır?",
            "options": [
                "<p>",
                "<br>",
                "<hr>",
                "<nl>"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 26,
            "topic": "paragraf_satir",
            "question": "<hr> etiketi ne işe yarar?",
            "options": [
                "Yeni paragraf a├ğar",
                "Kalın metin yazar",
                "Yatay ├ğizgi ekler b├Âl├╝mleri birbirinden ay─▒r─▒r",
                "Sayfa başlığı ekler"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 27,
            "topic": "paragraf_satir",
            "question": "Kod bloğu veya şiir gibi boşlukları ve satır sonlarını aynen koruyan etiket hangisidir?",
            "options": [
                "<code>",
                "<blockquote>",
                "<p>",
                "<pre>"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 28,
            "topic": "metin_vurgulari",
            "question": "Metni kalın yazmak için anlamsal (semantik) olarak doğru etiket hangisidir?",
            "options": [
                "<strong>",
                "<bold>",
                "<b>",
                "<thick>"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 29,
            "topic": "metin_vurgulari",
            "question": "<mark> etiketi metnin görünümünü nasıl değiştirir?",
            "options": [
                "Üstünü çizer",
                "Sarı arka plan ile vurgular",
                "Kalın yapar",
                "Gizler"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 30,
            "topic": "metin_vurgulari",
            "question": "Üstü çizili metin oluşturmak (indirim öncesi fiyat gibi) için hangi etiket kullanılır?",
            "options": [
                "<strike>",
                "<cross>",
                "<del>",
                "<s>"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 31,
            "topic": "linkler",
            "question": "Aynı sayfa içindeki bir bölüme atlamak için href değeri nasıl yazılır?",
            "options": [
                "href=\"bolum1\"",
                "href=\"@bolum1\"",
                "href=\".bolum1\"",
                "href=\"#bolum1\""
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 32,
            "topic": "linkler",
            "question": "Göreceli (relative) link ile mutlak (absolute) link arasındaki temel fark nedir?",
            "options": [
                "G├Âreceli link mevcut site i├ğinde ├ğal─▒┼ş─▒r mutlak link tam URL i├ğerir",
                "Hi├ğbir fark yoktur",
                "Mutlak link daha hızlı çalışır",
                "Göreceli linkler sadece CSS dosyaları için kullanılır"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 33,
            "topic": "linkler",
            "question": "<a> etiketinin href niteliği boş bırakılırsa ne olur?",
            "options": [
                "Hata verir",
                "Sayfanın en üstüne gider",
                "Sayfa yenilenir",
                "Hiçbir şey olmaz link çalışmaz"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 34,
            "topic": "sekme_yonetimi",
            "question": "Linki yeni sekmede açarken güvenlik açığını kapatmak için ne eklenir?",
            "options": [
                "rel=\"safe\"",
                "target=\"_safe\"",
                "rel=\"noopener noreferrer\"",
                "secure=\"true\""
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 35,
            "topic": "sekme_yonetimi",
            "question": "Bir dosyanın tarayıcıda açılmak yerine indirilmesini sağlayan nitelik hangisidir?",
            "options": [
                "save",
                "get",
                "export",
                "download"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 36,
            "topic": "sekme_yonetimi",
            "question": "target=\"_self\" ne anlama gelir?",
            "options": [
                "Linki ayn─▒ sekmede a├ğar (varsay─▒lan davran─▒┼ş)",
                "Linki yeni pencerede açar",
                "Linki yeni sekmede a├ğar",
                "Linki gizler"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 37,
            "topic": "listeler",
            "question": "Sıralı (numaralı) liste oluşturmak için hangi etiket kullanılır?",
            "options": [
                "<ul>",
                "<ol>",
                "<li>",
                "<dl>"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 38,
            "topic": "listeler",
            "question": "Tanım listeleri için kullanılan etiket grubu hangisidir?",
            "options": [
                "<list> ve <item>",
                "<ul> ve <li>",
                "<dl> ve <dt> ve <dd>",
                "<ol> ve <li>"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 39,
            "topic": "listeler",
            "question": "İç içe geçmiş (nested) liste nasıl oluşturulur?",
            "options": [
                "İki ul etiketini yan yana koyarak",
                "M├╝mk├╝n de─şildir",
                "nested=\"true\" niteliği kullanarak",
                "Bir li etiketinin i├ğine yeni bir ul etiketi a├ğarak"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 40,
            "topic": "gorseller",
            "question": "Görme engelli kullanıcılar ve Google için resim açıklaması hangi nitelikte yazılır?",
            "options": [
                "alt",
                "src",
                "title",
                "desc"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 41,
            "topic": "gorseller",
            "question": "loading=\"lazy\" niteliği ne işe yarar?",
            "options": [
                "Sayfayı yavaşlatır",
                "Resmi ekrana gelene kadar yüklemez sayfa performansını artırır",
                "Resmi gizler",
                "Resmi animasyonlu yükler"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 42,
            "topic": "gorseller",
            "question": "img etiketi neden kapanış etiketi (<img/>) gerektirmez?",
            "options": [
                "Hata olduğu için",
                "├ç├╝nk├╝ CSS ile kapat─▒l─▒r",
                "├ç├╝nk├╝ bo┼ş etiket (void element) kategorisindedir i├ğerik ta┼ş─▒maz",
                "Standartta öyle yazılmamıştır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "zor"
        },
        {
            "id": 43,
            "topic": "responsive_gorsel",
            "question": "<picture> etiketinin <img> etiketinden temel farkı nedir?",
            "options": [
                "Sadece PNG destekler",
                "CSS animasyonu destekler",
                "Daha hızlı yüklenir",
                "Ekran boyutuna veya ├ğ├Âz├╝n├╝rl├╝─şe g├Âre farkl─▒ g├Ârsel dosyalar─▒ sunabilir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 44,
            "topic": "responsive_gorsel",
            "question": "<source> etiketi içindeki media niteliği ne işe yarar?",
            "options": [
                "Hangi ekran boyutunda o g├Ârselin g├Âsterilece─şini belirtir",
                "Ses dosyas─▒ ba─şlar",
                "Video formatını tanımlar",
                "Görsel boyutunu küçültür"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 45,
            "topic": "responsive_gorsel",
            "question": "Tarayıcı picture içindeki hiçbir source koşulunu sağlamazsa ne gösterir?",
            "options": [
                "Boş alan gösterir",
                "En sondaki img etiketini yedek olarak g├Âsterir",
                "Hata verir",
                "Sayfayı çökertir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 46,
            "topic": "tablolar_temel",
            "question": "Tabloda başlık hücresi oluşturmak için td yerine hangi etiket kullanılır?",
            "options": [
                "<title>",
                "<header>",
                "<th>",
                "<caption>"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 47,
            "topic": "tablolar_temel",
            "question": "Tablo satırı oluşturmak için hangi etiket kullanılır?",
            "options": [
                "<td>",
                "<row>",
                "<line>",
                "<tr>"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 48,
            "topic": "tablolar_temel",
            "question": "Bir tabloda tüm satırları sarmak için en dıştaki etiket hangisidir?",
            "options": [
                "<table>",
                "<tr>",
                "<td>",
                "<tbody>"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 49,
            "topic": "tablolar_semantik",
            "question": "Tablonun altbilgi satırını (Toplam, Genel Toplam gibi) hangi etiket içine yazarız?",
            "options": [
                "<footer>",
                "<tfoot>",
                "<thead>",
                "<bottom>"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 50,
            "topic": "tablolar_semantik",
            "question": "Tabloya başlık açıklaması eklemek için hangi etiket kullanılır?",
            "options": [
                "<title>",
                "<summary>",
                "<caption>",
                "<label>"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 51,
            "topic": "tablolar_semantik",
            "question": "Neden thead ve tbody ayrımı yapılır?",
            "options": [
                "Sadece görsel amaçlıdır zorunlu değildir",
                "Performans i├ğin zorunludur",
                "Tarayıcılar aksi halde tabloyu okuyamaz",
                "Ekran okuyucular ve CSS stillendirmesi i├ğin anlamsal yap─▒ sa─şlar"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 52,
            "topic": "tablolar_colspan",
            "question": "colspan=\"3\" niteliği ne anlama gelir?",
            "options": [
                "H├╝cre 3 s├╝tunu kaplar",
                "H├╝cre 3 sat─▒r─▒ kaplar",
                "Hücre 3 piksel genişliğinde olur",
                "3 yeni hücre ekler"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 53,
            "topic": "tablolar_colspan",
            "question": "colspan kullandığımızda aynı satırdaki diğer hücreler ne olur?",
            "options": [
                "Silinir",
                "Birleştirilen sütun sayısı kadar hücre azaltılır",
                "Otomatik genişler",
                "Taşar"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 54,
            "topic": "tablolar_colspan",
            "question": "Tablonun başlığını tüm sütunlara yaymak için doğru kullanım hangisidir?",
            "options": [
                "<th rowspan=\"tum\">",
                "<th width=\"100%\">",
                "<th colspan=\"sutun_sayisi\">",
                "<th span=\"all\">"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 55,
            "topic": "tablolar_rowspan",
            "question": "rowspan=\"2\" niteliği ne anlama gelir?",
            "options": [
                "Hücre 2 sütunu kaplar",
                "H├╝cre 2 kez tekrar edilir",
                "2 yeni satır ekler",
                "H├╝cre 2 sat─▒r─▒ kaplar"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 56,
            "topic": "tablolar_rowspan",
            "question": "rowspan kullanan hücrenin alt satırından ne kadar hücre çıkarılmalıdır?",
            "options": [
                "rowspan de─şerinden 1 eksik kadar h├╝cre ├ğ─▒kar─▒l─▒r",
                "Hi├ğbir ┼şey ├ğ─▒kar─▒lmaz",
                "Tüm hücreler çıkarılır",
                "İki kat hücre eklenir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "zor"
        },
        {
            "id": 57,
            "topic": "tablolar_rowspan",
            "question": "colspan ve rowspan aynı anda kullanılabilir mi?",
            "options": [
                "Hayır ikisi birden kullanılamaz",
                "Evet aynı hücrede hem sütun hem satır birleştirilebilir",
                "Sadece th etiketinde kullanılabilir",
                "Sadece thead içinde kullanılabilir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "zor"
        },
        {
            "id": 58,
            "topic": "formlar_temel",
            "question": "label for=\"email\" ile input id=\"email\" eşleştirmesinin amacı nedir?",
            "options": [
                "Sadece CSS için gereklidir",
                "Form g├Ânderimini sa─şlar",
                "Kullan─▒c─▒ etikete t─▒klad─▒─ş─▒nda ilgili input otomatik odaklan─▒r (eri┼şilebilirlik)",
                "Zorunludur yoksa form çalışmaz"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 59,
            "topic": "formlar_temel",
            "question": "GET ve POST metodları arasındaki temel fark nedir?",
            "options": [
                "GET daha güvenlidir",
                "POST daha hızlıdır",
                "Aralar─▒nda hi├ğbir fark yoktur",
                "GET veriyi URL ├╝zerinden g├Ânderir POST gizli g├Ânderir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 60,
            "topic": "formlar_temel",
            "question": "Form içindeki name niteliği neden önemlidir?",
            "options": [
                "Sunucuya g├Ânderilen verinin anahtar─▒ (key) olarak kullan─▒l─▒r",
                "G├Ârsel etiket olarak g├Âsterilir",
                "CSS sınıfı olarak çalışır",
                "Zorunlu alan belirtir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 61,
            "topic": "formlar_input",
            "question": "Şifre alanının girdiyi gizlemesi için hangi type değeri kullanılır?",
            "options": [
                "type=\"hidden\"",
                "type=\"password\"",
                "type=\"secret\"",
                "type=\"private\""
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 62,
            "topic": "formlar_input",
            "question": "placeholder niteliği ne işe yarar?",
            "options": [
                "Varsayılan değer olarak forma gönderilir",
                "Label yerine kullan─▒l─▒r",
                "Alan bo┼şken kullan─▒c─▒ya ipucu g├Âsteren a├ğ─▒k renkli metin",
                "Alanı salt okunur yapar"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 63,
            "topic": "formlar_input",
            "question": "type=\"email\" kullanmanın type=\"text\" e göre avantajı nedir?",
            "options": [
                "Daha hızlı çalışır",
                "Sadece harf kabul eder",
                "G├╝venli ba─şlant─▒ kurar",
                "Taray─▒c─▒ @ i┼şareti olup olmad─▒─ş─▒n─▒ otomatik do─şrular"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 64,
            "topic": "formlar_secim",
            "question": "Kullanıcının birden fazla seçenek işaretleyebilmesi için hangi input türü kullanılır?",
            "options": [
                "checkbox",
                "select",
                "radio",
                "option"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 65,
            "topic": "formlar_secim",
            "question": "Radio butonların bir grup oluşturması ve tek seçim yapılabilmesi için ne aynı olmalıdır?",
            "options": [
                "id değerleri",
                "name de─şerleri",
                "value de─şerleri",
                "type değerleri"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 66,
            "topic": "formlar_secim",
            "question": "select içinde seçenekleri kategorilere ayırmak için hangi etiket kullanılır?",
            "options": [
                "<category>",
                "<group>",
                "<optgroup>",
                "<section>"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 67,
            "topic": "formlar_buton",
            "question": "textarea ile input type=\"text\" arasındaki temel fark nedir?",
            "options": [
                "textarea sadece sayı kabul eder",
                "Hi├ğbir fark yoktur",
                "input daha büyük veri tutar",
                "textarea ├ğok sat─▒rl─▒ metin giri┼şine izin verir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 68,
            "topic": "formlar_buton",
            "question": "<button type=\"reset\"> ne yapar?",
            "options": [
                "T├╝m form alanlar─▒n─▒ ba┼şlang─▒├ğ de─şerlerine d├Ând├╝r├╝r",
                "Sayfayı yeniler",
                "Formu sunucuya g├Ânderir",
                "Formu siler"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 69,
            "topic": "formlar_buton",
            "question": "fieldset ve legend etiketleri ne için kullanılır?",
            "options": [
                "Tablo oluşturmak için",
                "Form alanlarını anlamsal gruplar halinde çerçeve içine almak için",
                "Resim eklemek için",
                "Stil vermek için"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 70,
            "topic": "formlar_html5",
            "question": "Kullanıcının takvimden tarih seçmesi için hangi input türü kullanılır?",
            "options": [
                "type=\"calendar\"",
                "type=\"picker\"",
                "type=\"date\"",
                "type=\"datetime\""
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 71,
            "topic": "formlar_html5",
            "question": "type=\"range\" ile ne oluşturulur?",
            "options": [
                "Renk paleti",
                "Say─▒ yazma alan─▒",
                "Tarih aralığı",
                "S├╝r├╝klenebilir kayd─▒rma ├ğubu─şu (slider)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 72,
            "topic": "formlar_html5",
            "question": "Kullanıcının birden fazla dosya seçebilmesi için file input nasıl düzenlenir?",
            "options": [
                "multiple niteli─şi eklenir",
                "type=\"files\" yazılır",
                "count=\"multiple\" eklenir",
                "max=\"10\" eklenir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 73,
            "topic": "formlar_validation",
            "question": "Alanın boş geçilememesi için hangi nitelik kullanılır?",
            "options": [
                "validate",
                "required",
                "mandatory",
                "notblank"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 74,
            "topic": "formlar_validation",
            "question": "Bir şifre alanında en az 8 karakter zorunluluğu nasıl sağlanır?",
            "options": [
                "min=\"8\"",
                "length=\"8\"",
                "minlength=\"8\"",
                "size=\"8\""
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 75,
            "topic": "formlar_validation",
            "question": "pattern niteliği hangi amaçla kullanılır?",
            "options": [
                "CSS pattern uygulamak için",
                "Placholder ┼şekli vermek i├ğin",
                "Alan şablonu oluşturmak için",
                "Regex ile girdi format─▒n─▒ do─şrulamak i├ğin"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 76,
            "topic": "semantik_layout",
            "question": "Sayfa navigasyonunu (menüyü) sarmak için hangi semantik etiket kullanılır?",
            "options": [
                "<nav>",
                "<navigation>",
                "<menu>",
                "<links>"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 77,
            "topic": "semantik_layout",
            "question": "aside etiketi ne tür içerik için kullanılır?",
            "options": [
                "Sayfanın ana içeriği",
                "Ana içerikle ilişkili ama bağımsız yan içerik (reklam, biyografi)",
                "Altbilgi alanı",
                "Navigasyon menüsü"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 78,
            "topic": "semantik_layout",
            "question": "Her şey için div kullanmak yerine semantik etiket kullanmanın avantajı nedir?",
            "options": [
                "Sayfa daha hızlı yüklenir",
                "CSS yazmak kolayla┼ş─▒r",
                "SEO s─▒ralamalar─▒n─▒ iyile┼ştirir ekran okuyucular i├ğin eri┼şilebilirlik sa─şlar",
                "JavaScript kod azalır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 79,
            "topic": "medya_audio_video",
            "question": "Tarayıcının videoyu otomatik oynaması için autoplay yanına hangi nitelik zorunludur?",
            "options": [
                "silent",
                "noaudio",
                "quiet",
                "muted"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 80,
            "topic": "medya_audio_video",
            "question": "video etiketinde controls niteliği ne sağlar?",
            "options": [
                "Oynat/Duraklat ses gibi kullan─▒c─▒ kontrol butonlar─▒n─▒ g├Âsterir",
                "Videonun kalitesini art─▒r─▒r",
                "Videonun otomatik oynamasını sağlar",
                "Altyazı ekler"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 81,
            "topic": "medya_audio_video",
            "question": "Tarayıcı video formatını desteklemediğinde ne gösterilir?",
            "options": [
                "Hata sayfası açılır",
                "source etiketleri aras─▒ndaki yedek metin veya alternatif source g├Âsterilir",
                "Sayfa ├ğ├Âker",
                "Boş alan kalır"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 82,
            "topic": "iframe_guvenlik",
            "question": "iframe içindeki sandbox niteliği ne işe yarar?",
            "options": [
                "iframe yi hızlandırır",
                "iframe yi gizler",
                "G├Âm├╝len i├ğeri─şin yapabilece─şi i┼şlemleri k─▒s─▒tlayarak g├╝venli─şi art─▒r─▒r",
                "Tam ekran yapar"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 83,
            "topic": "iframe_guvenlik",
            "question": "YouTube videosu sayfaya nasıl gömülür?",
            "options": [
                "video etiketiyle",
                "img etiketiyle",
                "script etiketiyle",
                "iframe ve YouTube embed linki ile"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 84,
            "topic": "iframe_guvenlik",
            "question": "iframe ile gömülen harici sayfanın boyutu nasıl ayarlanır?",
            "options": [
                "width ve height nitelikleri veya CSS ile",
                "Ayarlanamaz",
                "Sadece CSS ile",
                "Sadece JavaScript ile"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 85,
            "topic": "details_dialog",
            "question": "Sıfır JavaScript ile açılıp kapanan akordiyon için hangi etiket çifti kullanılır?",
            "options": [
                "accordion ve item",
                "details ve summary",
                "collapse ve expand",
                "toggle ve content"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 86,
            "topic": "details_dialog",
            "question": "<dialog open> yazıldığında ne olur?",
            "options": [
                "Dialog gizlenir",
                "Dialog animasyonla a├ğ─▒l─▒r",
                "Dialog sayfada g├Âr├╝n├╝r olarak a├ğ─▒l─▒r",
                "Hata verir"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 87,
            "topic": "details_dialog",
            "question": "details etiketinin varsayılan durumu nedir?",
            "options": [
                "Açık",
                "Taray─▒c─▒ya g├Âre de─şi┼şir",
                "Yarı açık",
                "Kapal─▒ (open niteli─şi eklenmedi─şi s├╝rece i├ğerik gizlidir)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 88,
            "topic": "opengraph_seo",
            "question": "WhatsApp veya Twitter da link paylaşıldığında görünen önizleme görseli hangi meta etiketiyle belirlenir?",
            "options": [
                "<meta property=\"og:image\">",
                "<meta name=\"image\">",
                "<meta name=\"thumbnail\">",
                "<link rel=\"preview\">"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 89,
            "topic": "opengraph_seo",
            "question": "og:title meta etiketi ne işe yarar?",
            "options": [
                "Tarayıcı sekmesindeki başlığı belirler",
                "Sosyal medyada paylaşıldığında önizleme kartındaki başlığı belirler",
                "Google arama başlığını belirler",
                "Sayfa içindeki H1 i değiştirir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 90,
            "topic": "opengraph_seo",
            "question": "Open Graph meta etiketleri hangi HTML bölümüne yazılır?",
            "options": [
                "<body> içine",
                "<footer> içine",
                "<head> içine",
                "<header> içine"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        }
    ],
    "css": [
        {
            "id": 91,
            "topic": "css_giris",
            "question": "CSS yazmanın 3 yolundan hangisi en yüksek önceliğe (specificity) sahiptir?",
            "options": [
                "Harici .css dosyası",
                "style etiketi (internal)",
                "Hepsi e┼şit ├Ânceliktedir",
                "Inline style niteli─şi"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 92,
            "topic": "css_giris",
            "question": "Harici CSS dosyasını HTML belgesine bağlamak için hangi etiket kullanılır?",
            "options": [
                "<link rel=\"stylesheet\" href=\"style.css\">",
                "<css href=\"style.css\">",
                "<style src=\"style.css\">",
                "<script src=\"style.css\">"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 93,
            "topic": "css_giris",
            "question": "Aynı elemana hem harici class hem de inline style tanımlandığında hangisi geçerli olur?",
            "options": [
                "Class stili kazanır",
                "Inline style kazanır",
                "En son yüklenen kazanır",
                "Tarayıcı varsayılanı kazanır"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 94,
            "topic": "seciciler_temel",
            "question": ".kutu ve #kutu seçicilerinden hangisinin özgüllüğü (specificity) daha yüksektir?",
            "options": [
                ".kutu (class)",
                "─░kisi de e┼şittir",
                "#kutu (id)",
                "Element türüne göre değişir"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 95,
            "topic": "seciciler_temel",
            "question": "Sayfadaki tüm p etiketlerini seçmek için doğru CSS seçici hangisidir?",
            "options": [
                "#p",
                ".p",
                "*p",
                "p"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 96,
            "topic": "seciciler_temel",
            "question": "* (evrensel seçici) ne işe yarar?",
            "options": [
                "Sayfadaki istisnas─▒z t├╝m HTML elemanlar─▒n─▒ se├ğer",
                "Yaln─▒zca body etiketini se├ğer",
                "Sadece görünür metinleri seçer",
                "Yalnızca div elemanlarını seçer"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 97,
            "topic": "seciciler_kombinator",
            "question": "div > p seçicisi hangi elemanları hedefler?",
            "options": [
                "div içindeki tüm p elemanlarını (torunlar dahil)",
                "Sadece div in doğrudan çocuğu (direct child) olan p elemanlarını",
                "div den sonra gelen tüm p kardeşlerini",
                "div ve p etiketlerinin hepsini"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 98,
            "topic": "seciciler_kombinator",
            "question": "h2 + p seçicisi neyi ifade eder?",
            "options": [
                "h2 içindeki tüm p etiketlerini",
                "h2 den sonra gelen t├╝m karde┼ş p etiketlerini",
                "h2 den hemen sonra gelen ilk karde┼ş p etiketini",
                "h2 ve p etiketlerinin birleşimini"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 99,
            "topic": "seciciler_kombinator",
            "question": "div ~ p seçicisi ile div + p seçicisi arasındaki temel fark nedir?",
            "options": [
                "~ sadece ├ğocuklar─▒ se├ğer",
                "~ hemen sonrakini, + ise tüm kardeşleri seçer",
                "Aralarında hiçbir fark yoktur",
                "+ hemen sonraki tek karde┼şi se├ğer, ~ ise sonraki t├╝m karde┼ş p elemanlar─▒n─▒ se├ğer"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 100,
            "topic": "renkler",
            "question": "rgba(0, 0, 0, 0.5) renk tanımında son değer (0.5) neyi ifade eder?",
            "options": [
                "Opakl─▒k / Alfa ┼şeffafl─▒k oran─▒",
                "Parlakl─▒k derecesi",
                "Doygunluk oranı",
                "Mavi renk tonu"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 101,
            "topic": "renkler",
            "question": "HSL renk formatında \"S\" harfi neyi temsil eder?",
            "options": [
                "Shade (Gölge)",
                "Saturation (Doygunluk)",
                "Shadow (Yansıma)",
                "Spectrum (Işık)"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 102,
            "topic": "renkler",
            "question": "#FF0000 HEX renk kodu hangi rengi verir?",
            "options": [
                "Tam Mavi",
                "Tam Yeşil",
                "Tam K─▒rm─▒z─▒",
                "Tam Siyah"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 103,
            "topic": "arkaplan",
            "question": "background-size: cover özelliğinin davranışı nedir?",
            "options": [
                "Resmi hiç kırpmadan orijinal boyutunda tutar",
                "Resmi sadece yatayda uzat─▒r",
                "Resmi sayfaya 4 kez tekrar eder",
                "Resmi kutuyu tamamen kaplayacak ┼şekilde orant─▒l─▒ b├╝y├╝t├╝r ve gerekirse ta┼şan k─▒sm─▒ k─▒rpar"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 104,
            "topic": "arkaplan",
            "question": "Sayfa kaydırıldığında arka plan görselinin sabit kalması için hangi özellik kullanılır?",
            "options": [
                "background-attachment: fixed",
                "background-position: fixed",
                "background-repeat: no-repeat",
                "background-scroll: none"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 105,
            "topic": "arkaplan",
            "question": "background-repeat: no-repeat ne işe yarar?",
            "options": [
                "Resmin ┼şeffafl─▒─ş─▒n─▒ kald─▒r─▒r",
                "Arka plan resminin d├Â┼şenerek tekrarlanmas─▒n─▒ engeller",
                "Resmi ekranın tam ortasına alır",
                "Arka planı siyah yapar"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 106,
            "topic": "gradyan",
            "question": "Soldan sağa doğru iki renkli yumuşak geçiş yapmak için hangisi kullanılır?",
            "options": [
                "linear-gradient(bottom, red, blue)",
                "radial-gradient(right, red, blue)",
                "linear-gradient(to right, red, blue)",
                "color-gradient(to right, red, blue)"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 107,
            "topic": "gradyan",
            "question": "Merkezden dışa doğru dairesel renk geçişi sağlayan fonksiyon hangisidir?",
            "options": [
                "linear-gradient()",
                "conic-gradient()",
                "circle-gradient()",
                "radial-gradient()"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 108,
            "topic": "gradyan",
            "question": "Bir metnin içini gradient boyamak için background-clip değeri ne olmalıdır?",
            "options": [
                "background-clip: text",
                "background-clip: border-box",
                "background-clip: padding-box",
                "background-clip: content-box"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "zor"
        },
        {
            "id": 109,
            "topic": "tipografi",
            "question": "1rem ölçü birimi neyi referans alır?",
            "options": [
                "En yakın üst elemanın font boyutunu",
                "Kök elemanın (html) font boyutunu",
                "Tarayıcının pencere genişliğini",
                "Ekranın piksel yoğunluğunu"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 110,
            "topic": "tipografi",
            "question": "Satırlar arası mesafeyi belirlemek için hangi CSS özelliği kullanılır?",
            "options": [
                "letter-spacing",
                "word-spacing",
                "line-height",
                "text-indent"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 111,
            "topic": "tipografi",
            "question": "Google Fonts üzerinden font bağlarken HTML de nereye link eklenir?",
            "options": [
                "<body> en sonuna",
                "CSS dosyas─▒n─▒n en alt─▒na",
                "<footer> içine",
                "<head> etiketlerinin aras─▒na"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 112,
            "topic": "metin_efektleri",
            "question": "Tüm metni otomatik olarak BÜYÜK HARFE çevirmek için hangisi kullanılır?",
            "options": [
                "text-transform: uppercase",
                "font-case: upper",
                "text-decoration: uppercase",
                "text-align: uppercase"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 113,
            "topic": "metin_efektleri",
            "question": "Linklerin (<a>) altındaki varsayılan alt çizgiyi kaldırmak için ne yazılır?",
            "options": [
                "text-underline: false;",
                "text-decoration: none;",
                "border: none;",
                "font-style: normal;"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 114,
            "topic": "metin_efektleri",
            "question": "Metne gölge efekti vermek için hangi özellik kullanılır?",
            "options": [
                "box-shadow",
                "filter: shadow",
                "text-shadow",
                "drop-shadow"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 115,
            "topic": "box_model",
            "question": "box-sizing: border-box kullanıldığında padding ve border nereye dahil edilir?",
            "options": [
                "Kutunun dışına eklenir ve kutuyu büyütür",
                "Yaln─▒zca i├ğeri─şi k├╝├ğ├╝lt├╝r geni┼şli─şi etkilemez",
                "Margin değerinden düşülür",
                "Kutunun belirlenen width ve height de─şerinin i├ğine dahil edilir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 116,
            "topic": "box_model",
            "question": "Box Model hiyerarşisi içten dışa doğru hangi sırada ilerler?",
            "options": [
                "Content > Padding > Border > Margin",
                "Margin > Border > Padding > Content",
                "Content > Border > Padding > Margin",
                "Padding > Content > Border > Margin"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 117,
            "topic": "box_model",
            "question": "İki komşu elemanın dikey marginlerinin birleşerek tek bir margin oluşturması olayına ne ad verilir?",
            "options": [
                "Margin Overflow",
                "Margin Collapse (Çökmesi)",
                "Margin Merge",
                "Margin Flexing"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "zor"
        },
        {
            "id": 118,
            "topic": "border_shadow",
            "question": "Bir kutunun köşelerini tam yuvarlak yapmak için border-radius ne verilir?",
            "options": [
                "border-radius: 100px",
                "border-radius: round",
                "border-radius: 50%",
                "border-radius: circle"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 119,
            "topic": "border_shadow",
            "question": "outline ile border arasındaki en temel fark nedir?",
            "options": [
                "outline renk alamaz",
                "outline k├Â┼şeleri yuvarlat─▒lamaz",
                "border sadece kesikli çizgi olur",
                "outline kutunun kaplad─▒─ş─▒ alana ve boyuta etki etmez (yer kaplamaz)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 120,
            "topic": "border_shadow",
            "question": "Kutunun dışına gölge vermek için hangi özellik kullanılır?",
            "options": [
                "box-shadow",
                "text-shadow",
                "element-shadow",
                "drop-border"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 121,
            "topic": "display",
            "question": "display: inline elemanlar hakkında hangisi doğrudur?",
            "options": [
                "Her zaman yeni bir sat─▒r ba┼şlat─▒rlar",
                "Geni┼şlik (width) ve y├╝kseklik (height) de─şerlerini kabul etmezler",
                "Varsayılan olarak yüzde 100 genişlik alırlar",
                "Dikey marginleri normal şekilde uygulanır"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 122,
            "topic": "display",
            "question": "display: none ile visibility: hidden arasındaki temel fark nedir?",
            "options": [
                "visibility: hidden eleman─▒ ekrandan ve DOM dan siler",
                "İkisi tamamen aynıdır",
                "display: none eleman─▒ DOM ve yerle┼şimden tamamen siler gibi yer kaplatmaz, visibility: hidden ise eleman─▒ gizler ama yerini bo┼ş tutar",
                "display: none animasyonla gizler"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 123,
            "topic": "display",
            "question": "Hem yan yana durabilen hem de width/height alabilen display değeri hangisidir?",
            "options": [
                "block",
                "inline",
                "flex-inline",
                "inline-block"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 124,
            "topic": "position",
            "question": "position: absolute olan bir eleman konumunu (top, left) neye göre referans alır?",
            "options": [
                "static olmayan en yak─▒n ├╝st (ancestor) eleman─▒na g├Âre",
                "Her zaman do─şrudan body etiketine g├Âre",
                "Kendi orijinal durduğu yere göre",
                "Tarayıcının son kaydırma konumuna göre"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 125,
            "topic": "position",
            "question": "Sayfa kaydırılsa dahi ekran penceresine göre hep aynı yerde kalan konumlandırma hangisidir?",
            "options": [
                "position: relative",
                "position: fixed",
                "position: absolute",
                "position: static"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 126,
            "topic": "position",
            "question": "z-index özelliğinin çalışabilmesi için elemanın hangi kurala uyması şarttır?",
            "options": [
                "display: block olması",
                "mutlaka float uygulanm─▒┼ş olmas─▒",
                "position de─şerinin static d─▒┼ş─▒nda bir de─şer (relative, absolute vb.) olmas─▒",
                "sadece id seçicisi ile seçilmiş olması"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 127,
            "topic": "float_clear",
            "question": "Bir görselin yanından metnin akması için hangi özellik kullanılır?",
            "options": [
                "flow: text",
                "align: side",
                "display: inline",
                "float: left / right"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 128,
            "topic": "float_clear",
            "question": "Float uygulanan elemanların ebeveyn kapsayıcısının yüksekliğinin sıfırlanmasını önleyen tekniğin adı nedir?",
            "options": [
                "Clearfix Tekni─şi",
                "Overflow Fix",
                "Flex Fallback",
                "Reset Margin"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 129,
            "topic": "float_clear",
            "question": "clear: both kuralı ne işe yarar?",
            "options": [
                "T├╝m stilleri s─▒f─▒rlar",
                "Hem sa─ş─▒ndaki hem solundaki float elemanlar─▒n alt─▒ndan devam etmesini sa─şlar",
                "Sayfayı ikiye böler",
                "Arka planı temizler"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 130,
            "topic": "overflow",
            "question": "Kutudan taşan içeriği kesip tamamen görünmez kılmak için ne yazılır?",
            "options": [
                "overflow: auto",
                "overflow: scroll",
                "overflow: hidden",
                "overflow: visible"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 131,
            "topic": "overflow",
            "question": "overflow: auto ile overflow: scroll arasındaki fark nedir?",
            "options": [
                "Hi├ğbir fark yoktur",
                "auto mobilde çalışmaz",
                "scroll sadece dikey kaydırma yapar",
                "auto sadece i├ğerik ta┼şt─▒─ş─▒nda kayd─▒rma ├ğubu─şu ├ğ─▒kar─▒r, scroll ise her zaman g├Âsterir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 132,
            "topic": "overflow",
            "question": "Sadece yatayda taşan içeriği kaydırılabilir yapmak için hangi özellik kullanılır?",
            "options": [
                "overflow-x: auto",
                "overflow-y: scroll",
                "horizontal-scroll: on",
                "overflow-inline: true"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 133,
            "topic": "boyutlandirma",
            "question": "100vw ölçüsü ne anlama gelir?",
            "options": [
                "Sayfa içeriğinin yüzde 100 genişliği",
                "Tarayıcı penceresinin (viewport) tam yüzde 100 genişliği",
                "100 vektörel piksel",
                "Ebeveyn kutunun yüzde 100 ü"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 134,
            "topic": "boyutlandirma",
            "question": "Bir resmin en-boy oranını (örneğin 16/9) korumak için hangi modern CSS özelliği kullanılır?",
            "options": [
                "ratio: 16-9",
                "size-ratio: 16-9",
                "aspect-ratio: 16 / 9",
                "box-ratio: 16 / 9"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 135,
            "topic": "boyutlandirma",
            "question": "max-width: 1200px kuralının anlamı nedir?",
            "options": [
                "Eleman her zaman tam 1200px genişlikte olur",
                "Mobil cihazlarda ├ğal─▒┼şmaz",
                "Eleman en az 1200px olmak zorundadır",
                "Eleman 1200px e kadar b├╝y├╝yebilir ama ekran daral─▒rsa k├╝├ğ├╝lebilir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 136,
            "topic": "css_degiskenleri",
            "question": "CSS değişkenleri genellikle global erişim için hangi seçici içinde tanımlanır?",
            "options": [
                ":root",
                "body",
                "*",
                "#main"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 137,
            "topic": "css_degiskenleri",
            "question": "Tanımlanmış bir --ana-renk değişkeni CSS te nasıl kullanılır?",
            "options": [
                "color: --ana-renk;",
                "color: var(--ana-renk);",
                "color: $ana-renk;",
                "color: val(--ana-renk);"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 138,
            "topic": "css_degiskenleri",
            "question": "var(--ana-renk, #333) kullanımında ikinci parametre (#333) ne anlama gelir?",
            "options": [
                "Gölge rengidir",
                "Dark mode rengidir",
                "De─şi┼şken tan─▒ml─▒ de─şilse kullan─▒lacak yedek (fallback) de─şerdir",
                "Hover durumundaki renktir"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 139,
            "topic": "flexbox_temel",
            "question": "Bir kutuyu Flexbox kapsayıcısı yapmak için hangi kural verilir?",
            "options": [
                "flex: true",
                "box-type: flexbox",
                "layout: flex",
                "display: flex"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 140,
            "topic": "flexbox_temel",
            "question": "flex-direction: column ne yapar?",
            "options": [
                "Elemanlar─▒ yukar─▒dan a┼şa─ş─▒ya (dikey) dizer",
                "Elemanlar─▒ soldan sa─şa dizer",
                "Elemanları 2 sütun yapar",
                "Elemanları ters çevirir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 141,
            "topic": "flexbox_temel",
            "question": "Elemanların tek satıra sığmadığında alt satıra geçmesi için ne kullanılır?",
            "options": [
                "flex-flow: multi",
                "flex-wrap: wrap",
                "wrap: true",
                "display: multi-flex"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 142,
            "topic": "flexbox_justify",
            "question": "Flex elemanlarını ana eksende (varsayılan yatayda) tam ortalamak için ne yazılır?",
            "options": [
                "align-items: center",
                "text-align: center",
                "justify-content: center",
                "float: center"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 143,
            "topic": "flexbox_justify",
            "question": "justify-content: space-between ne işe yarar?",
            "options": [
                "Sadece iki eleman varsa ├ğal─▒┼ş─▒r",
                "Tüm elemanların etrafına eşit boşluk bırakır",
                "Elemanları merkeze sıkıştırır",
                "─░lk eleman─▒ ba┼şa, sonuncuyu sona yaslar ve aradaki bo┼şlu─şu e┼şit da─ş─▒t─▒r"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 144,
            "topic": "flexbox_justify",
            "question": "justify-content: space-evenly özelliğinin space-around tan farkı nedir?",
            "options": [
                "Tüm elemanlar arası ve kenarlardaki tüm boşluklar harfiyen birbirine eşittir",
                "Kenarlarda boşluk bırakmaz",
                "Dikey eksende çalışır",
                "Sadece mobilde fark eder"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 145,
            "topic": "flexbox_align",
            "question": "Flex elemanlarını dikey eksende ortalamak için kapsayıcıya ne yazılır?",
            "options": [
                "justify-content: center",
                "align-items: center",
                "vertical-align: middle",
                "align-content: middle"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 146,
            "topic": "flexbox_align",
            "question": "Tüm grup yerine sadece tek bir flex elemanının dikey hizasını değiştirmek için hangisi kullanılır?",
            "options": [
                "align-single",
                "item-align",
                "align-self",
                "self-position"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 147,
            "topic": "flexbox_align",
            "question": "align-items özelliğinin varsayılan (default) değeri nedir?",
            "options": [
                "center",
                "flex-start",
                "baseline",
                "stretch"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 148,
            "topic": "flexbox_items",
            "question": "flex: 1 kısayolu ne anlama gelir?",
            "options": [
                "Eleman boş kalan tüm alanı orantılı olarak kaplar",
                "Eleman sadece 1px genişliğinde olur",
                "Eleman küçülmeyi reddeder",
                "Eleman gizlenir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 149,
            "topic": "flexbox_items",
            "question": "flex-shrink: 0 kuralı verilen bir eleman nasıl davranır?",
            "options": [
                "G├Âr├╝nmez olur",
                "Kapsay─▒c─▒ daralsa bile asla orijinal boyutundan daha fazla k├╝├ğ├╝lmez",
                "Yüzde 50 küçülür",
                "Genişliği sıfırlanır"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 150,
            "topic": "flexbox_items",
            "question": "flex-basis özelliği neyi belirler?",
            "options": [
                "Elemanın büyüme hızını",
                "Eleman─▒n z-index de─şerini",
                "Eleman─▒n bo┼ş alan da─ş─▒t─▒lmadan ├Ânceki ba┼şlang─▒├ğ temel boyutunu",
                "Flex yönünü"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 151,
            "topic": "flexbox_layout",
            "question": "align-content özelliği hangi durumda etkili olur?",
            "options": [
                "Sadece flex-direction: column iken",
                "Sadece tek bir eleman varsa",
                "Her zaman etkilidir",
                "Yaln─▒zca flex-wrap: wrap aktif ve birden fazla sat─▒r olu┼ştu─şunda"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 152,
            "topic": "flexbox_layout",
            "question": "Çok satırlı bir flex düzeninde satırları ekranın ortasında toplamak için ne kullanılır?",
            "options": [
                "align-content: center",
                "align-items: center",
                "justify-content: center",
                "flex-line: center"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 153,
            "topic": "flexbox_layout",
            "question": "Flexbox kullanarak bir footer ı sayfanın en altına yapıştırmak (sticky footer) için kapsayıcıya ne verilir?",
            "options": [
                "position: absolute; bottom: 0;",
                "min-height: 100vh; flex-direction: column; ve i├ğerik alan─▒na flex: 1;",
                "clear: both;",
                "margin-bottom: auto;"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "zor"
        },
        {
            "id": 154,
            "topic": "flexbox_layout",
            "question": "Navbarda logo solda, menü linkleri sağda olacak şekilde yerleştirmek için en pratik kural nedir?",
            "options": [
                "float: left ve float: right",
                "position: fixed",
                "display: flex ve justify-content: space-between",
                "display: inline-block"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 155,
            "topic": "grid_temel",
            "question": "Bir elemanı CSS Grid kapsayıcısı yapmak için hangi özellik tanımlanır?",
            "options": [
                "display: table",
                "layout: grid",
                "grid: active",
                "display: grid"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 156,
            "topic": "grid_temel",
            "question": "Grid hücreleri ve sütunları arasındaki boşluğu ayarlayan en pratik özellik hangisidir?",
            "options": [
                "gap",
                "cell-spacing",
                "grid-margin",
                "padding-all"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 157,
            "topic": "grid_temel",
            "question": "grid-template-columns: 200px 1fr 200px; tanımında 1fr ne anlama gelir?",
            "options": [
                "Sabit 100px alan",
                "Kalan tüm boşluğu kaplayan esnek birim",
                "İlk sütunun aynısı",
                "Tarayıcı genişliğinin yüzde 1 i"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 158,
            "topic": "grid_temel",
            "question": "3 eşit sütunlu bir grid oluşturmak için en kısa repeat() yazımı hangisidir?",
            "options": [
                "grid-template-columns: 3 * 1fr;",
                "grid-template-columns: repeat(1fr, 3);",
                "grid-template-columns: repeat(3, 1fr);",
                "grid-template-columns: repeat(equal, 3);"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 159,
            "topic": "grid_temel",
            "question": "minmax(200px, 1fr) fonksiyonu ne işe yarar?",
            "options": [
                "Eleman─▒ ortalar",
                "Sütunu 200px ile sınırlar asla büyütmez",
                "Sadece mobilde çalışır",
                "S├╝tunun en az 200px olmas─▒n─▒ ama yer varsa 1fr oran─▒nda b├╝y├╝mesini sa─şlar"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 160,
            "topic": "grid_ileri",
            "question": "Bir grid elemanının yatayda 2 sütun kaplaması (birleşmesi) için ne yazılır?",
            "options": [
                "grid-column: span 2;",
                "grid-span: 2;",
                "colspan: 2;",
                "grid-merge: 2;"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 161,
            "topic": "grid_ileri",
            "question": "grid-row: 1 / 3; kuralı elemanı dikeyde nasıl konumlandırır?",
            "options": [
                "Sadece 1. ve 3. sat─▒rlara kopyalar",
                "1. sat─▒r ├ğizgisinden ba┼şlar ve 3. sat─▒r ├ğizgisine kadar uzan─▒r (2 sat─▒r kaplar)",
                "3 satır aşağı kaydırır",
                "1. satırdan sonra gizler"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 162,
            "topic": "grid_ileri",
            "question": "grid-template-areas ile oluşturulan şablonda boş bırakılmak istenen hücre için ne yazılır?",
            "options": [
                "none",
                "empty",
                ". (nokta)",
                "null"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 163,
            "topic": "grid_ileri",
            "question": "Bir elemanı template-areas içinde tanımlanan \"header\" bölgesine atamak için ne yazılır?",
            "options": [
                "grid-name: header;",
                "grid-zone: header;",
                "area-target: header;",
                "grid-area: header;"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 164,
            "topic": "grid_ileri",
            "question": "Ekran genişledikçe boş sütunlar yaratmak yerine mevcut elemanları genişleterek alanı dolduran hangisidir?",
            "options": [
                "auto-fit",
                "auto-fill",
                "auto-expand",
                "auto-stretch"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "zor"
        },
        {
            "id": 165,
            "topic": "grid_ileri",
            "question": "Hiç media query yazmadan otomatik responsive kart ızgarası yapan ünlü kalıp hangisidir?",
            "options": [
                "repeat(3, 1fr)",
                "repeat(auto-fit, minmax(250px, 1fr))",
                "flex: 1 1 auto",
                "grid-template: responsive"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "zor"
        },
        {
            "id": 166,
            "topic": "grid_ileri",
            "question": "Flexbox ile CSS Grid arasındaki en temel mimari fark nedir?",
            "options": [
                "Flexbox sadece butonlar içindir, Grid sadece tablolar içindir",
                "Grid daha eski bir teknolojidir",
                "Flexbox tek boyutlu (1D - sat─▒r VEYA s├╝tun), Grid ise iki boyutlu (2D - sat─▒r VE s├╝tun) yerle┼şim sa─şlar",
                "Flexbox responsiveliği desteklemez"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 167,
            "topic": "transitions_transforms",
            "question": "transition: all 0.3s ease; ifadesinde \"ease\" neyi belirtir?",
            "options": [
                "Gecikme süresini (delay)",
                "Renk tonunu",
                "Animasyon adını",
                "Zamanlama e─şrisini / h─▒zlanma-yava┼şlama dinami─şini (timing-function)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 168,
            "topic": "transitions_transforms",
            "question": "Bir hover geçişinin başlamadan önce 0.5 saniye beklemesi için hangi özellik tanımlanır?",
            "options": [
                "transition-delay",
                "transition-duration",
                "transition-wait",
                "transition-pause"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 169,
            "topic": "transitions_transforms",
            "question": "Bir elemanı bulunduğu konumdan 20px sağa ve 10px aşağı kaydırmak için ne yazılır?",
            "options": [
                "position: move(20px, 10px);",
                "transform: translate(20px, 10px);",
                "offset: 20px 10px;",
                "transform: scale(20px, 10px);"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 170,
            "topic": "transitions_transforms",
            "question": "transform: scale(1.2); ne işe yarar?",
            "options": [
                "Elemanı 1.2 derece döndürür",
                "Eleman─▒ sa─şa 12px kayd─▒r─▒r",
                "Eleman─▒n boyutunu orijinalinin y├╝zde 120 sine (1.2 kat─▒na) b├╝y├╝t├╝r",
                "Şeffaflığı artırır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 171,
            "topic": "transitions_transforms",
            "question": "Bir elemanı saat yönünde 45 derece döndürmek için ne kullanılır?",
            "options": [
                "angle: 45deg;",
                "transform: turn(45);",
                "rotate: 45;",
                "transform: rotate(45deg);"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 172,
            "topic": "transitions_transforms",
            "question": "3D dönüşümlerin (rotateY gibi) gerçekçi bir derinlik kazanması için ebeveyne ne verilir?",
            "options": [
                "perspective: 1000px",
                "depth: 1000px",
                "3d-mode: true",
                "view-distance: 1000px"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "zor"
        },
        {
            "id": 173,
            "topic": "transitions_transforms",
            "question": "Kart çevirme efektinde dönen kartın arkası göründüğünde ters metnin gizlenmesi için ne yazılır?",
            "options": [
                "hide-back: true;",
                "backface-visibility: hidden;",
                "face-flip: none;",
                "opacity-back: 0;"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "zor"
        },
        {
            "id": 174,
            "topic": "transitions_transforms",
            "question": "Butonun üzerine gelindiğinde farenin imlecinin \"tıklanabilir el\" şeklini alması için ne yazılır?",
            "options": [
                "pointer: click;",
                "mouse: hand;",
                "cursor: pointer;",
                "touch: active;"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 175,
            "topic": "transitions_transforms",
            "question": "Resmin üzerine siyah şeffaf bir katman bindirip hover da açığa çıkarmak için hangi teknik kullanılır?",
            "options": [
                "margin-top negatif de─şer",
                "display: none / block",
                "filter: invert",
                "Absolute konumlu overlay katman─▒ ve opacity ge├ği┼şi"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 176,
            "topic": "animations_keyframes",
            "question": "CSS te özel bir animasyon adımı zinciri tanımlamak için hangi at-rule kullanılır?",
            "options": [
                "@keyframes",
                "@animation",
                "@motion",
                "@transition"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 177,
            "topic": "animations_keyframes",
            "question": "Bir animasyonun hiç durmadan sonsuza kadar dönmesi için iteration-count ne olmalıdır?",
            "options": [
                "loop",
                "infinite",
                "forever",
                "unlimited"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 178,
            "topic": "animations_keyframes",
            "question": "animation-fill-mode: forwards ne sağlar?",
            "options": [
                "Animasyon bittiğinde elemanın başlangıç durumuna dönmesini",
                "Animasyonun ileri geri oynamas─▒n─▒",
                "Animasyon bitti─şinde eleman─▒n son keyframe deki stilinde sabit kalmas─▒n─▒",
                "Animasyonu hızlandırır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 179,
            "topic": "animations_keyframes",
            "question": "Bir butona neon parlama efekti vermek için hangi özellik çoklu değerlerle kullanılır?",
            "options": [
                "border-color",
                "outline-offset",
                "filter: blur",
                "box-shadow (├Ârn: 0 0 10px #00f, 0 0 20px #00f)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 180,
            "topic": "animations_keyframes",
            "question": "Arka planı buzlu cam gibi bulanıklaştıran modern CSS özelliği hangisidir?",
            "options": [
                "backdrop-filter: blur()",
                "filter: blur()",
                "background-blur()",
                "glass: blur()"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 181,
            "topic": "modern_ui_efektler",
            "question": "Glassmorphism efektinin inandırıcı olması için kartın arkaplanı nasıl olmalıdır?",
            "options": [
                "Tamamen opak beyaz",
                "Yarı şeffaf rgba veya hsla arka plan (örn: rgba(255,255,255,0.1))",
                "Siyah zemin",
                "Gradient siz düz renk"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 182,
            "topic": "modern_ui_efektler",
            "question": "Bir görseli tamamen siyah-beyaza çevirmek için hangi CSS filtresi kullanılır?",
            "options": [
                "filter: blackwhite(100%);",
                "filter: contrast(0%);",
                "filter: grayscale(100%);",
                "filter: invert(100%);"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 183,
            "topic": "modern_ui_efektler",
            "question": "Görselin arkasındaki saydam alana göre kusursuz gölge düşürmek için box-shadow yerine ne kullanılır?",
            "options": [
                "shadow-element",
                "text-shadow",
                "outline: shadow",
                "filter: drop-shadow(...)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 184,
            "topic": "modern_ui_efektler",
            "question": "clip-path özelliği ne işe yarar?",
            "options": [
                "Eleman─▒ daire, ├ğokgen veya ├Âzel ┼şekillerde kesip k─▒rpar",
                "Sayfa ba─şlant─▒lar─▒n─▒ k─▒salt─▒r",
                "Resimleri otomatik sıkıştırır",
                "Metinleri gizler"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 185,
            "topic": "modern_ui_efektler",
            "question": "::before veya ::after pseudo-elementinin ekranda render edilebilmesi için ZORUNLU özellik hangisidir?",
            "options": [
                "display: block",
                "content: \"\" (boş olsa dahi content)",
                "position: absolute",
                "width: 100%"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 186,
            "topic": "modern_ui_efektler",
            "question": "Pseudo-elementler (::before/::after) HTML DOM ağacında gerçek etiket oluşturur mu?",
            "options": [
                "Evet, inspect panelinde yeni <before> etiketi görülür",
                "Sadece JavaScript ile olu┼şturulursa g├Âr├╝n├╝r",
                "Hay─▒r, CSS taraf─▒ndan ├╝retilen yapay (pseudo) sunum katman─▒d─▒r",
                "Yalnızca form elemanlarında görünür"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 187,
            "topic": "responsive_media",
            "question": "Mobile-first (önce mobil) tasarım yaklaşımında media query lerde genellikle hangisi kullanılır?",
            "options": [
                "@media (max-width: ...)",
                "@media (device: hand)",
                "@media (screen: mobile)",
                "@media (min-width: ...)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 188,
            "topic": "responsive_media",
            "question": "@media screen and (max-width: 768px) kuralı ne zaman çalışır?",
            "options": [
                "Ekran genişliği 768px ve daha küçük olduğunda",
                "Ekran 768px den büyük olduğunda",
                "Sadece tabletlerde",
                "Her zaman"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 189,
            "topic": "responsive_media",
            "question": "Web dünyasında yaygın olarak tablet cihazlar için kullanılan başlangıç breakpoint i hangisidir?",
            "options": [
                "320px",
                "768px",
                "480px",
                "1440px"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 190,
            "topic": "responsive_media",
            "question": "font-size: clamp(1rem, 2.5vw, 2rem); kuralında 2.5vw neyi ifade eder?",
            "options": [
                "Minimum sabit boyutu",
                "Maksimum tavan boyutu",
                "─░deal / dinamik ekran geni┼şli─şine g├Âre ├Âl├ğeklenen boyutu",
                "Satır yüksekliğini"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 191,
            "topic": "responsive_media",
            "question": "Görsellerin mobilde kapsayıcısından dışarı taşmasını önleyen altın kural nedir?",
            "options": [
                "width: 1000px;",
                "display: inline;",
                "overflow: hidden;",
                "max-width: 100%; height: auto;"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 192,
            "topic": "responsive_media",
            "question": "Container Queries (@container) ile Media Queries (@media) arasındaki fark nedir?",
            "options": [
                "Media query tarayıcı penceresine (viewport) bakar, Container query ise elemanın doğrudan ebeveyn kutusunun boyutuna bakar",
                "Container query sadece resimler içindir",
                "Container query daha yavaştır",
                "Media query artık kullanılmamaktadır"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "zor"
        },
        {
            "id": 193,
            "topic": "responsive_media",
            "question": "Kullanıcının işletim sistemindeki karanlık tema tercihini yakalayan medya sorgusu hangisidir?",
            "options": [
                "@media (theme: dark)",
                "@media (prefers-color-scheme: dark)",
                "@media (color-mode: dark)",
                "@media (system-dark)"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 194,
            "topic": "modern_css_features",
            "question": "Sayfa kaydırıldığında bölümlerin tam ekran olarak ekrana kilitlenmesi için kapsayıcıya ne yazılır?",
            "options": [
                "page-snap: on;",
                "scroll-lock: true;",
                "scroll-snap-type: y mandatory;",
                "scroll-behavior: snap;"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 195,
            "topic": "modern_css_features",
            "question": "Sayfa içi çapa (#bolum) linklerine tıklandığında yumuşak kayma için html e ne eklenir?",
            "options": [
                "scroll-effect: slow;",
                "transition: scroll 1s;",
                "scroll-animation: ease;",
                "scroll-behavior: smooth;"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 196,
            "topic": "modern_css_features",
            "question": "BEM metodolojisinde \"btn--danger\" ifadesindeki çift çizgi (--) neyi temsil eder?",
            "options": [
                "Modifier (De─şi┼ştirici / Varyasyon)",
                "Element (Öğe)",
                "Block (Blok)",
                "Module (Modül)"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 197,
            "topic": "modern_css_features",
            "question": "BEM de bir kartın başlığı doğru olarak nasıl adlandırılır?",
            "options": [
                ".card-title-header",
                ".card__title",
                ".card.title",
                ".card > title"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 198,
            "topic": "modern_css_features",
            "question": "CSS te !important kullanımı hakkında en doğru profesyonel yaklaşım hangisidir?",
            "options": [
                "Her stil kuralına eklenmelidir",
                "Sadece animasyonlarda kullan─▒l─▒r",
                "Spesifikli─şi k─▒r─▒p ezdi─şi ve bak─▒m─▒ zorla┼şt─▒rd─▒─ş─▒ i├ğin zorunlu kalmad─▒k├ğa ka├ğ─▒n─▒lmal─▒d─▒r",
                "Tarayıcı hızını artırır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 199,
            "topic": "modern_css_features",
            "question": "Hangi seçici grubunun specificity (özgüllük) puanı en yüksektir?",
            "options": [
                "Element (etiket) seçicisi (örn: p)",
                "Class seçicisi (örn: .btn)",
                "Evrensel se├ğici (*)",
                "ID se├ğicisi (├Ârn: #header)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 200,
            "topic": "modern_css_features",
            "question": "CSS te genişliği hesaplamak için genişlikten 40px çıkarmak istendiğinde ne kullanılır?",
            "options": [
                "width: calc(100% - 40px);",
                "width: 100% - 40px;",
                "width: compute(100%, -40px);",
                "width: eval(100% - 40px);"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 201,
            "topic": "modern_css_features",
            "question": "min(50vw, 500px) fonksiyonu ne yapar?",
            "options": [
                "De─şerlerin ortalamas─▒n─▒ al─▒r",
                "50vw ile 500px de─şerlerinden her zaman daha k├╝├ğ├╝k olan─▒n─▒ se├ğip uygular",
                "Her zaman 500px yapar",
                "Hata verir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 202,
            "topic": "css_selectors_ileri",
            "question": "Bir alt grid elemanının, üst kapsayıcısının ızgara çizgilerini birebir miras almasını sağlayan kural nedir?",
            "options": [
                "grid-template: parent;",
                "grid-inherit: true;",
                "grid-template-columns: subgrid;",
                "display: sub-grid;"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "zor"
        },
        {
            "id": 203,
            "topic": "css_selectors_ileri",
            "question": "Tarayıcıya bir elemanın yakında animasyona gireceğini ve GPU optimizasyonu yapmasını bildiren özellik hangisidir?",
            "options": [
                "gpu-accelerate: true;",
                "render-fast: true;",
                "optimize-motion: on;",
                "will-change: transform;"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 204,
            "topic": "css_selectors_ileri",
            "question": "Ekran dışındaki (viewport altında kalan) elemanların ilk açılışta render maliyetini sıfırlayan modern özellik nedir?",
            "options": [
                "content-visibility: auto;",
                "display: lazy;",
                "render-skip: true;",
                "lazy-layout: on;"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "zor"
        },
        {
            "id": 205,
            "topic": "css_selectors_ileri",
            "question": "a:has(img) seçicisi ne anlama gelir?",
            "options": [
                "Tüm img etiketlerini seçer",
                "İçinde img etiketi barındıran a (link) etiketlerini seçer (ebeveyn seçici)",
                "img den sonra gelen a etiketini seçer",
                "img olmayan a etiketlerini seçer"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 206,
            "topic": "css_selectors_ileri",
            "question": ":is(h1, h2, h3) seçicisinin en büyük avantajı nedir?",
            "options": [
                "Taray─▒c─▒y─▒ h─▒zland─▒r─▒r",
                "Yazı boyutunu otomatik ayarlar",
                "Se├ğicileri tekrar tekrar yazmay─▒ ├Ânleyip kodu k─▒salt─▒r ve okunabilirli─şi art─▒r─▒r",
                "SEO puanını artırır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 207,
            "topic": "css_selectors_ileri",
            "question": "ul li:nth-child(2n) kuralı hangi liste elemanlarını seçer?",
            "options": [
                "Sadece ilk iki elemanı",
                "Sadece son eleman─▒",
                "Tüm tek numaralı elemanları",
                "T├╝m ├ğift numaral─▒ elemanlar─▒ (2, 4, 6, ...)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        }
    ],
    "javascript": [
        {
            "id": 266,
            "topic": "js_degiskenler_tipler",
            "question": "JavaScript te let ile const arasındaki en temel fark nedir?",
            "options": [
                "let fonksiyoneldir const blok kapsamlıdır",
                "let sadece say─▒ tutar const metin tutar",
                "const ile tan─▒mlanan de─şi┼şkene yeniden de─şer atanamaz (re-assign edilemez), let e atanabilir",
                "const hoisted edilmez let edilir"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 267,
            "topic": "js_degiskenler_tipler",
            "question": "typeof null ifadesi JavaScript te geriye hangi tipi döndürür (meşhur JS hatası)?",
            "options": [
                "\"null\"",
                "\"undefined\"",
                "\"boolean\"",
                "\"object\""
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 268,
            "topic": "js_degiskenler_tipler",
            "question": "\"5\" + 2 ve \"5\" - 2 işlemlerinin sonuçları sırasıyla nedir?",
            "options": [
                "\"52\" ve 3",
                "7 ve 3",
                "\"52\" ve NaN",
                "7 ve NaN"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 269,
            "topic": "js_degiskenler_tipler",
            "question": "5 === \"5\" ifadesinin false dönmesinin nedeni nedir?",
            "options": [
                "Değerlerin farklı olması",
                "=== operatörünün hem değer hem de veri tipi eşitliğini (strict equality) kontrol etmesi",
                "Stringlerin sayılarla kıyaslanamaması",
                "Yazım hatası olması"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 270,
            "topic": "js_degiskenler_tipler",
            "question": "Nullish Coalescing (??) operatörü || operatöründen farklı olarak hangi değerleri falsy saymaz?",
            "options": [
                "null ve undefined",
                "false ve NaN",
                "0 ve \"\" (bo┼ş string)",
                "Hiçbiri"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "zor"
        },
        {
            "id": 271,
            "topic": "js_degiskenler_tipler",
            "question": "Template literals kullanırken değişkenleri string içine gömmek için hangi sözdizimi kullanılır?",
            "options": [
                "%{degisken}",
                "&{degisken}",
                "#{degisken}",
                "${degisken}"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 272,
            "topic": "js_degiskenler_tipler",
            "question": "\"JavaScript\".slice(0, 4) ifadesinin çıktısı nedir?",
            "options": [
                "\"Java\"",
                "\"Jav\"",
                "\"JavaS\"",
                "\"Script\""
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 273,
            "topic": "js_degiskenler_tipler",
            "question": "Math.floor(4.9) fonksiyonunun dönüş değeri nedir?",
            "options": [
                "5",
                "4",
                "4.9",
                "4.5"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 274,
            "topic": "js_kosullar_donguler",
            "question": "switch-case yapısında bir eşleşme olduktan sonra diğer case lere geçilmesini engellemek için ne yazılır?",
            "options": [
                "stop",
                "exit",
                "break",
                "return"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 275,
            "topic": "js_kosullar_donguler",
            "question": "Ternary (üçlü) operatörünün doğru sözdizimi hangisidir?",
            "options": [
                "ko┼şul -> do─şru : yanl─▒┼ş",
                "koşul : doğruysa ? yanlışsa",
                "if koşul then doğru else yanlış",
                "ko┼şul ? do─şruysa : yanl─▒┼şsa"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 276,
            "topic": "js_kosullar_donguler",
            "question": "do-while döngüsünün while döngüsünden temel farkı nedir?",
            "options": [
                "Ko┼şul yanl─▒┼ş olsa bile g├Âvdesi en az 1 kez garanti ├ğal─▒┼ş─▒r",
                "Daha h─▒zl─▒ ├ğal─▒┼ş─▒r",
                "Sonsuz döngüye girmez",
                "Sadece dizilerde kullanılır"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 277,
            "topic": "js_kosullar_donguler",
            "question": "Döngüde o anki iterasyonu atlayıp bir sonraki adıma geçmek için hangi anahtar kelime kullanılır?",
            "options": [
                "break",
                "continue",
                "skip",
                "pass"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 278,
            "topic": "js_kosullar_donguler",
            "question": "Bir dizinin elemanları üzerinde doğrudan değer bazlı gezinmek için en modern döngü hangisidir?",
            "options": [
                "for...in",
                "while",
                "for...of",
                "do...while"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 279,
            "topic": "js_fonksiyonlar_scope",
            "question": "Arrow function larda (ok fonksiyonları) hangisi normal function lardan farklıdır?",
            "options": [
                "Asenkron olamazlar",
                "Parametre alamazlar",
                "Return kullanamazlar",
                "Kendi this ba─şlamlar─▒ yoktur, ├╝st lexical scope daki this i miras al─▒rlar"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 280,
            "topic": "js_fonksiyonlar_scope",
            "question": "function topla(a, b = 10) tanımındaki b = 10 neyi ifade eder?",
            "options": [
                "b arg├╝man─▒ g├Ânderilmedi─şinde alaca─ş─▒ varsay─▒lan (default) de─şeri",
                "b nin her zaman 10 olaca─ş─▒n─▒",
                "Tip kontrolünü",
                "b nin sabit olduğunu"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 281,
            "topic": "js_fonksiyonlar_scope",
            "question": "function demo(...args) ifadesindeki ... operatörünün görevi nedir?",
            "options": [
                "Diziyi elemanlar─▒na ay─▒r─▒r",
                "Gelen t├╝m arg├╝manlar─▒ args ad─▒nda bir diziye toplar (rest parameter)",
                "Hata fırlatır",
                "Parametreleri çarpar"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 282,
            "topic": "js_fonksiyonlar_scope",
            "question": "Bir fonksiyonun kendi dışındaki (lexical) kapsamdaki değişkenleri fonksiyon bittikten sonra bile hatırlamasına ne denir?",
            "options": [
                "Hoisting",
                "Recursion",
                "Closure (Kapan─▒┼ş)",
                "Currying"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 283,
            "topic": "js_fonksiyonlar_scope",
            "question": "JavaScript te var ile tanımlanan değişkenlerin bildirimin en tepeye taşınması mekanizmasına ne ad verilir?",
            "options": [
                "Scoping",
                "Bubbling",
                "Coercion",
                "Hoisting"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 284,
            "topic": "js_fonksiyonlar_scope",
            "question": "Saf fonksiyon (Pure Function) kavramının temel kuralı nedir?",
            "options": [
                "Ayn─▒ girdilere daima ayn─▒ ├ğ─▒kt─▒y─▒ vermesi ve hi├ğbir d─▒┼ş yan etki (side effect) ├╝retmemesi",
                "─░├ğinde d├Âng├╝ bulundurmamas─▒",
                "Arrow function olarak yazılması",
                "Sadece matematiksel işlem yapması"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 285,
            "topic": "js_diziler_nesneler",
            "question": "Dizinin sonuna yeni eleman ekleyen metod hangisidir?",
            "options": [
                "shift()",
                "push()",
                "pop()",
                "unshift()"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 286,
            "topic": "js_diziler_nesneler",
            "question": "map() metodu ile forEach() metodu arasındaki en kritik fark nedir?",
            "options": [
                "map() diziyi ters ├ğevirir",
                "forEach() daha hızlıdır",
                "map() yeni bir d├Ân├╝┼şt├╝r├╝lm├╝┼ş dizi d├Ând├╝r├╝r, forEach() ise undefined d├Âner ve orijinali gezer",
                "forEach() sadece sayılarda çalışır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 287,
            "topic": "js_diziler_nesneler",
            "question": "[1, 2, 3, 4].filter(x => x % 2 === 0) ifadesinin sonucu nedir?",
            "options": [
                "[1, 3]",
                "4",
                "[true, false]",
                "[2, 4]"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 288,
            "topic": "js_diziler_nesneler",
            "question": "reduce() metodundaki ilk parametre genellikle neyi temsil eder?",
            "options": [
                "Ak├╝m├╝lat├Âr (biriktirici de─şer)",
                "Ge├ğerli indeks",
                "Orijinal dizi",
                "Son eleman"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 289,
            "topic": "js_diziler_nesneler",
            "question": "const { ad, yas } = kisi; yazımı hangi ES6 özelliğidir?",
            "options": [
                "Spread Operator",
                "Object Destructuring (Nesne Parçalama)",
                "Template Literal",
                "Prototype Chain"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 290,
            "topic": "js_diziler_nesneler",
            "question": "const yeniDizi = [...dizi1, ...dizi2] işlemindeki ... operatörünün adı nedir?",
            "options": [
                "Rest Operatörü",
                "Optional Chaining",
                "Spread Operat├Âr├╝ (Yayma)",
                "Nullish Coalescing"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 291,
            "topic": "js_diziler_nesneler",
            "question": "Bir nesnenin değiştirilmesini (yeni alan ekleme, silme, güncelleme) tamamen engellemek için ne kullanılır?",
            "options": [
                "Object.seal()",
                "const",
                "Object.lock()",
                "Object.freeze()"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 292,
            "topic": "js_dom_events",
            "question": "CSS seçici mantığıyla tek bir HTML elemanını seçmek için modern standart metod hangisidir?",
            "options": [
                "document.querySelector()",
                "document.getElementById()",
                "document.getElementsByClassName()",
                "document.select()"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 293,
            "topic": "js_dom_events",
            "question": "Bir elemana sınıf (class) eklemek için classList in hangi metodu kullanılır?",
            "options": [
                "classList.insert()",
                "classList.add()",
                "classList.append()",
                "classList.push()"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 294,
            "topic": "js_dom_events",
            "question": "Form submit edildiğinde sayfanın yenilenmesini durdurmak için ne yazılır?",
            "options": [
                "e.stopPropagation()",
                "return false",
                "e.preventDefault()",
                "e.stop()"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 295,
            "topic": "js_dom_events",
            "question": "Olayın alt çocuktan tetiklenip üst ebeveynlere doğru yayılmasına ne ad verilir?",
            "options": [
                "Event Capturing",
                "Event Loop",
                "Event Delegation",
                "Event Bubbling (Olay Kabarc─▒klanmas─▒)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 296,
            "topic": "js_dom_events",
            "question": "Birçok alt eleman yerine tek bir ortak ebeveyne olay dinleyici ekleme tekniğinin adı nedir?",
            "options": [
                "Event Delegation (Olay Yetkilendirmesi)",
                "Event Throttling",
                "Event Hoisting",
                "Event Propagation"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "zor"
        },
        {
            "id": 297,
            "topic": "js_dom_events",
            "question": "LocalStorage a bir JavaScript nesnesi kaydederken hangi dönüşüm yapılmalıdır?",
            "options": [
                "JSON.parse(nesne)",
                "JSON.stringify(nesne)",
                "nesne.toString()",
                "String(nesne)"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 298,
            "topic": "js_dom_events",
            "question": "LocalStorage ile SessionStorage arasındaki temel fark nedir?",
            "options": [
                "LocalStorage sadece string tutamaz",
                "SessionStorage daha çok veri tutar",
                "LocalStorage verileri taray─▒c─▒/sekme kapansa bile kal─▒c─▒d─▒r, SessionStorage sekme kapat─▒l─▒nca silinir",
                "Aralarında fark yoktur"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 299,
            "topic": "js_asenkron",
            "question": "JavaScript in tek iş parçacıklı (single-threaded) olmasına rağmen asenkron işleri yönetmesini sağlayan mekanizma nedir?",
            "options": [
                "Garbage Collector",
                "Virtual DOM",
                "Compiler",
                "Event Loop (Olay D├Âng├╝s├╝)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 300,
            "topic": "js_asenkron",
            "question": "Bir Promise ın 3 olası yaşam durumu sırasıyla hangileridir?",
            "options": [
                "pending (beklemede), fulfilled (ba┼şar─▒l─▒), rejected (reddedildi)",
                "start, process, end",
                "try, catch, finally",
                "open, wait, close"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 301,
            "topic": "js_asenkron",
            "question": "await anahtar kelimesi sadece hangi fonksiyonların içinde doğrudan kullanılabilir?",
            "options": [
                "Tüm normal fonksiyonlarda",
                "async olarak tanımlanmış fonksiyonların içinde",
                "Generator fonksiyonlarda",
                "Arrow function olmayanlarda"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 302,
            "topic": "js_asenkron",
            "question": "fetch() ile gelen yanıtı JSON nesnesine dönüştürmek için hangi metod await edilir?",
            "options": [
                "response.text()",
                "response.data()",
                "response.json()",
                "response.parse()"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 303,
            "topic": "js_asenkron",
            "question": "Birden fazla bağımsız Promise ı aynı anda paralel başlatıp hepsinin bitmesini beklemek için ne kullanılır?",
            "options": [
                "Promise.race()",
                "Promise.settle()",
                "Promise.any()",
                "Promise.all()"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 304,
            "topic": "js_asenkron",
            "question": "Asenkron fonksiyonlarda ortaya çıkan hataları yakalamak için hangi blok yapısı kullanılır?",
            "options": [
                "try-catch",
                "if-else",
                "check-error",
                "resolve-reject"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 305,
            "topic": "js_oop_moduller",
            "question": "ES6 Sınıflarında (Classes) bir sınıftan başka bir sınıfa kalıtım yapmak için hangi anahtar kelime kullanılır?",
            "options": [
                "implements",
                "extends",
                "inherits",
                "super"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 306,
            "topic": "js_oop_moduller",
            "question": "Türemiş bir sınıfta üst sınıfın constructor ını tetiklemek için ne çağrılır?",
            "options": [
                "this.base()",
                "parent()",
                "super()",
                "upper()"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 307,
            "topic": "js_oop_moduller",
            "question": "Modern JavaScript te bir sınıf alanını gerçekten private (gizli) yapmak için hangi sembolle başlatılır?",
            "options": [
                "_ (alt çizgi)",
                "$ (dolar)",
                "private",
                "# (kare)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 308,
            "topic": "js_oop_moduller",
            "question": "Sınıf örneği (instance) üretmeden doğrudan SınıfAdı.metod() şeklinde çağrılan metodlara ne ad verilir?",
            "options": [
                "Static method (statik metod)",
                "Instance method",
                "Private method",
                "Prototype method"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 309,
            "topic": "js_oop_moduller",
            "question": "Kullanıcı arama kutusuna yazı yazarken her tuşta değil, yazma bittikten 300ms sonra arama yapmak için kullanılan optimizasyon tekniği nedir?",
            "options": [
                "Throttle",
                "Debounce",
                "Memoization",
                "Lazy loading"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "zor"
        },
        {
            "id": 310,
            "topic": "js_oop_moduller",
            "question": "Bir JS dosyasındaki tek bir ana nesneyi dışa aktarmak için hangi sözdizimi kullanılır?",
            "options": [
                "module.exports = ...",
                "export named ...",
                "export default ...",
                "export all ..."
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        }
    ],
    "python": [
        {
            "id": 208,
            "topic": "py_temeller_tipler",
            "question": "Python da kod blokları (örneğin fonksiyon veya döngü gövdeleri) ne ile belirlenir?",
            "options": [
                "Girintileme (Indentation) bo┼şluklar─▒yla",
                "Noktalı virgüllerle ;",
                "S├╝sl├╝ parantezlerle { }",
                "BEGIN ve END anahtar kelimeleriyle"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 209,
            "topic": "py_temeller_tipler",
            "question": "Aşağıdakilerden hangisi Python da geçerli bir değişken adı DEĞİLDİR?",
            "options": [
                "_kullanici",
                "2kullanici",
                "kullanici_1",
                "kullaniciAd"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 210,
            "topic": "py_temeller_tipler",
            "question": "type(5 / 2) ifadesinin sonucu hangi veri tipini döndürür?",
            "options": [
                "int",
                "double",
                "float",
                "number"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 211,
            "topic": "py_temeller_tipler",
            "question": "Python da tam sayı bölmesi (bölümün sadece tam kısmını alan) operatörü hangisidir?",
            "options": [
                "/",
                "div()",
                "%",
                "//"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 212,
            "topic": "py_temeller_tipler",
            "question": "2 ** 3 işleminin sonucu kaçtır?",
            "options": [
                "8",
                "6",
                "5",
                "9"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 213,
            "topic": "py_temeller_tipler",
            "question": "bool(\"\") ve bool(\"0\") ifadelerinin doğruluk değerleri sırasıyla nedir?",
            "options": [
                "True, True",
                "False, True",
                "False, False",
                "True, False"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 214,
            "topic": "py_temeller_tipler",
            "question": "input() fonksiyonu kullanıcıdan alınan veriyi varsayılan olarak hangi tipte döndürür?",
            "options": [
                "int",
                "float",
                "str (string)",
                "Otomatik algılar"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 215,
            "topic": "py_temeller_tipler",
            "question": "f-string kullanarak ad = \"Can\" değişkenini \"Merhaba Can\" olarak yazdırmak için doğru sözdizimi hangisidir?",
            "options": [
                "print(\"Merhaba {ad}\")",
                "print(\"Merhaba \" + f{ad})",
                "print(f\"Merhaba ad\")",
                "print(f\"Merhaba {ad}\")"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 216,
            "topic": "py_temeller_tipler",
            "question": "s = \"Python\" metninde s[::-1] ifadesi ne üretir?",
            "options": [
                "\"nohtyP\"",
                "\"Python\"",
                "\"P\"",
                "Hata verir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 217,
            "topic": "py_temeller_tipler",
            "question": "\"  kod  \".strip() metodunun çıktısı nedir?",
            "options": [
                "\"  kod\"",
                "\"kod\"",
                "\"kod  \"",
                "\"  k  o  d  \""
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 218,
            "topic": "py_veri_yapilari",
            "question": "Listeler (lists) ile Demetler (tuples) arasındaki en temel fark nedir?",
            "options": [
                "Listeler tamsayı tutar, demetler metin tutar",
                "Demetler k├Â┼şeli parantez [] ile tan─▒mlan─▒r",
                "Listeler de─şi┼ştirilebilir (mutable), demetler de─şi┼ştirilemez (immutable)",
                "Listeler daha hızlıdır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 219,
            "topic": "py_veri_yapilari",
            "question": "Bir listenin sonuna yeni bir eleman eklemek için hangi metod kullanılır?",
            "options": [
                "push()",
                "add()",
                "insert_end()",
                "append()"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 220,
            "topic": "py_veri_yapilari",
            "question": "liste = [1, 2, 3] verildiğinde liste.pop() çağrılırsa ne olur?",
            "options": [
                "Listenin son eleman─▒ (3) silinir ve d├Ând├╝r├╝l├╝r",
                "Listenin ilk eleman─▒ silinir",
                "Tüm liste temizlenir",
                "Hata verir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 221,
            "topic": "py_veri_yapilari",
            "question": "a = [1, 2, 3] ve b = a yapıldıktan sonra b.append(4) denirse a nın durumu ne olur?",
            "options": [
                "[1, 2, 3]",
                "[1, 2, 3, 4] (Çünkü b ve a bellekte aynı listeyi referans alır)",
                "[4]",
                "Hata verir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 222,
            "topic": "py_veri_yapilari",
            "question": "Tek elemanlı bir tuple tanımlamak için doğru yazım hangisidir?",
            "options": [
                "t = (5)",
                "t = tuple(5)",
                "t = (5,)",
                "t = [5]"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 223,
            "topic": "py_veri_yapilari",
            "question": "Sözlükten (dict) var olmayan bir anahtar d[\"olmayan\"] şeklinde çağrılırsa ne gerçekleşir?",
            "options": [
                "None döner",
                "Bo┼ş string d├Âner",
                "Otomatik olarak 0 değeri atanır",
                "KeyError hatas─▒ f─▒rlat─▒l─▒r"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 224,
            "topic": "py_veri_yapilari",
            "question": "Sözlükte bir anahtara güvenli erişip yoksa varsayılan değer dönmesini sağlayan metod hangisidir?",
            "options": [
                "d.get()",
                "d.find()",
                "d.search()",
                "d.fetch()"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 225,
            "topic": "py_veri_yapilari",
            "question": "kume = {1, 2, 2, 3, 3, 3} kümesinin eleman sayısı (len(kume)) kaçtır?",
            "options": [
                "6",
                "3",
                "1",
                "Hata verir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 226,
            "topic": "py_veri_yapilari",
            "question": "İki kümenin ortak elemanlarını (kesişim) bulmak için hangi operatör kullanılır?",
            "options": [
                "",
                "|^",
                "&",
                "-"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 227,
            "topic": "py_veri_yapilari",
            "question": "collections modülündeki defaultdict un standart dict e göre en büyük avantajı nedir?",
            "options": [
                "Daha az bellek harcar",
                "Sadece say─▒larla ├ğal─▒┼ş─▒r",
                "Sıralamayı garanti eder",
                "Olmayan bir anahtara eri┼şildi─şinde KeyError vermek yerine varsay─▒lan bir de─şer ├╝retir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 228,
            "topic": "py_kosullar_donguler",
            "question": "Python da \"else if\" koşulu hangi anahtar kelime ile yazılır?",
            "options": [
                "elif",
                "else if",
                "elseif",
                "elsif"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 229,
            "topic": "py_kosullar_donguler",
            "question": "range(2, 10, 2) fonksiyonu hangi sayıları üretir?",
            "options": [
                "2, 3, 4, 5, 6, 7, 8, 9, 10",
                "2, 4, 6, 8",
                "2, 4, 6, 8, 10",
                "4, 6, 8"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 230,
            "topic": "py_kosullar_donguler",
            "question": "Bir döngüde o anki adımı atlayıp bir sonraki iterasyona geçmek için ne kullanılır?",
            "options": [
                "break",
                "pass",
                "continue",
                "skip"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 231,
            "topic": "py_kosullar_donguler",
            "question": "for döngüsünün arkasına yazılan else bloğu (for-else) ne zaman çalışır?",
            "options": [
                "Döngü break ile kırıldığında",
                "Her iterasyonda",
                "Döngü hiç çalışmadığında",
                "D├Âng├╝ break ile kesilmeden normal ┼şekilde tamamland─▒─ş─▒nda"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 232,
            "topic": "py_kosullar_donguler",
            "question": "Döngü içinde hem indeksi hem de elemanı aynı anda almak için hangi fonksiyon kullanılır?",
            "options": [
                "enumerate()",
                "zip()",
                "range()",
                "index()"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 233,
            "topic": "py_kosullar_donguler",
            "question": "zip([\"a\", \"b\"], [1, 2]) ifadesi döngüde ne üretir?",
            "options": [
                "[\"a\", \"b\", 1, 2]",
                "(\"a\", 1) ve (\"b\", 2)",
                "{\"a\": 1, \"b\": 2}",
                "(\"a\", \"b\")"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 234,
            "topic": "py_fonksiyonlar",
            "question": "Python da fonksiyon tanımlamak için hangi anahtar kelime kullanılır?",
            "options": [
                "function",
                "fn",
                "def",
                "func"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 235,
            "topic": "py_fonksiyonlar",
            "question": "Bir fonksiyon açıkça bir değer return etmezse varsayılan dönüş değeri ne olur?",
            "options": [
                "0",
                "False",
                "undefined",
                "None"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 236,
            "topic": "py_fonksiyonlar",
            "question": "def topla(*args) parametresindeki *args fonksiyon içine hangi tipte gelir?",
            "options": [
                "Demet (tuple)",
                "Liste (list)",
                "Sözlük (dict)",
                "Küme (set)"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 237,
            "topic": "py_fonksiyonlar",
            "question": "def kaydet(**kwargs) fonksiyonuna isim=\"Ali\", yas=25 verildiğinde kwargs tipi nedir?",
            "options": [
                "tuple",
                "dict (s├Âzl├╝k)",
                "list",
                "str"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 238,
            "topic": "py_fonksiyonlar",
            "question": "def ekle(x, l=[]) şeklinde mutable default argüman kullanmanın tehlikesi nedir?",
            "options": [
                "SyntaxError verir",
                "Her ├ğa─şr─▒da s─▒f─▒rlan─▒r",
                "Varsay─▒lan liste fonksiyon ├ğa─şr─▒lar─▒ aras─▒nda bellekte payla┼ş─▒larak k├╝m├╝latif b├╝y├╝r",
                "Hız problemi yaratır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "zor"
        },
        {
            "id": 239,
            "topic": "py_fonksiyonlar",
            "question": "Fonksiyon içinde global bir değişkenin değerini değiştirmek için hangi anahtar kelime bildirilir?",
            "options": [
                "nonlocal",
                "static",
                "outer",
                "global"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 240,
            "topic": "py_fonksiyonlar",
            "question": "lambda x, y: x * y fonksiyonunun işlevi nedir?",
            "options": [
                "x ve y yi çarpan tek satırlık anonim fonksiyon",
                "x ve y yi toplayan fonksiyon",
                "İki sayının modunu alan fonksiyon",
                "Fonksiyonel döngü"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 241,
            "topic": "py_fonksiyonlar",
            "question": "sorted([(\"Ali\", 80), (\"Veli\", 95)], key=lambda x: x[1]) neye göre sıralar?",
            "options": [
                "İsimlere göre",
                "Notlara göre (ikinci eleman)",
                "Alfabetik tersine",
                "Rastgele"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 242,
            "topic": "py_comprehensions",
            "question": "[x**2 for x in range(5)] list comprehension ının çıktısı nedir?",
            "options": [
                "[1, 4, 9, 16, 25]",
                "[0, 2, 4, 6, 8]",
                "[0, 1, 4, 9, 16]",
                "[1, 2, 3, 4, 5]"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 243,
            "topic": "py_comprehensions",
            "question": "[x for x in [1, 2, 3, 4] if x % 2 == 0] ifadesi ne üretir?",
            "options": [
                "[1, 3]",
                "[0, 0]",
                "[False, True, False, True]",
                "[2, 4]"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 244,
            "topic": "py_comprehensions",
            "question": "{k: v for k, v in [(\"a\", 1), (\"b\", 2)]} ifadesinin çıktısı nedir?",
            "options": [
                "{\"a\": 1, \"b\": 2}",
                "[(\"a\", 1), (\"b\", 2)]",
                "(\"a\", 1, \"b\", 2)",
                "{\"a\", \"b\"}"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 245,
            "topic": "py_comprehensions",
            "question": "(x for x in range(1000000)) yuvarlak parantezli comprehension ne üretir?",
            "options": [
                "1 milyon elemanlı dev bir liste",
                "Bir generator (üreteç) nesnesi (bellekte yer kaplamaz)",
                "Bir tuple",
                "SyntaxError verir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "zor"
        },
        {
            "id": 246,
            "topic": "py_comprehensions",
            "question": "all([True, True, False]) ifadesinin sonucu nedir?",
            "options": [
                "True",
                "None",
                "False",
                "Hata"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 247,
            "topic": "py_comprehensions",
            "question": "any([False, False, True]) ifadesinin sonucu nedir?",
            "options": [
                "Hata",
                "False",
                "None",
                "True"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 248,
            "topic": "py_hata_dosya",
            "question": "Hata yakalamak için hangi blok yapısı kullanılır?",
            "options": [
                "try - except",
                "try - catch",
                "do - catch",
                "test - error"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 249,
            "topic": "py_hata_dosya",
            "question": "try bloğunda hata çıksa da çıkmasa da kesinlikle çalışan blok hangisidir?",
            "options": [
                "else",
                "finally",
                "always",
                "catch"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 250,
            "topic": "py_hata_dosya",
            "question": "Kasıtlı olarak bir hata fırlatmak için hangi anahtar kelime kullanılır?",
            "options": [
                "throw",
                "error",
                "raise",
                "fire"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 251,
            "topic": "py_hata_dosya",
            "question": "with open(\"veri.txt\", \"r\") as f: kalıbının en büyük avantajı nedir?",
            "options": [
                "Dosyayı daha hızlı okur",
                "Salt okunur yapar",
                "Dosyayı şifreler",
                "─░┼şlem bitince veya hata ├ğ─▒ksa bile dosyay─▒ otomatik kapat─▒r (close)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 252,
            "topic": "py_hata_dosya",
            "question": "open() fonksiyonunda dosyayı üzerine yazmadan sonuna ekleme yapmak için hangi mod kullanılır?",
            "options": [
                "\"a\" (append)",
                "\"r\"",
                "\"w\"",
                "\"x\""
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 253,
            "topic": "py_hata_dosya",
            "question": "Python sözlüğünü JSON metnine dönüştüren json modülü fonksiyonu hangisidir?",
            "options": [
                "json.parse()",
                "json.dumps()",
                "json.loads()",
                "json.stringify()"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 254,
            "topic": "py_oop",
            "question": "Sınıf başlatıldığında (örnek oluşturulduğunda) otomatik çalışan yapıcı metod hangisidir?",
            "options": [
                "def constructor()",
                "def __new__()",
                "def __init__()",
                "def start()"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 255,
            "topic": "py_oop",
            "question": "Sınıf metodlarında ilk parametre olarak gelen self neyi temsil eder?",
            "options": [
                "Sınıfın kendisini",
                "Python ├ğekirde─şini",
                "Global modülü",
                "Olu┼şturulan ge├ğerli nesne ├Ârne─şini (instance)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 256,
            "topic": "py_oop",
            "question": "Bir sınıf niteliğini (attribute) private (özel) yapmak için isminin başına ne konur?",
            "options": [
                "├çift alt ├ğizgi (__)",
                "Tek alt çizgi (_)",
                "private anahtar kelimesi",
                "Kare simgesi (#)"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 257,
            "topic": "py_oop",
            "question": "Bir metodu sanki bir değişken/nitelik gibi parantezsiz (nesne.alan) çağırmak için hangi dekoratör kullanılır?",
            "options": [
                "@classmethod",
                "@property",
                "@staticmethod",
                "@variable"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 258,
            "topic": "py_oop",
            "question": "Alt sınıfta üst sınıfın kurucu metodunu çağırmak için ne yazılır?",
            "options": [
                "parent().__init__()",
                "base().__init__()",
                "super().__init__()",
                "this.__init__()"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 259,
            "topic": "py_oop",
            "question": "print(nesne) dendiğinde kullanıcı dostu metin basılmasını sağlayan dunder metod hangisidir?",
            "options": [
                "__repr__",
                "__show__",
                "__print__",
                "__str__"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 260,
            "topic": "py_oop",
            "question": "len(nesne) çağrısına yanıt verebilmek için sınıfa hangi metod eklenmelidir?",
            "options": [
                "__len__",
                "__count__",
                "__size__",
                "__length__"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 261,
            "topic": "py_ileri",
            "question": "Bir dosyanın doğrudan mı çalıştırıldığını yoksa import mu edildiğini anlamak için hangi kontrol yapılır?",
            "options": [
                "if __run__ == \"__direct__\":",
                "if __name__ == \"__main__\":",
                "if __file__ == \"__entry__\":",
                "if is_main():"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 262,
            "topic": "py_ileri",
            "question": "Bir klasörün Python paketi olarak tanınması için içine geleneksel olarak hangi dosya konur?",
            "options": [
                "package.json",
                "main.py",
                "__init__.py",
                "__package__.py"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 263,
            "topic": "py_ileri",
            "question": "Fonksiyonları sarmalayarak davranışlarını değiştiren @ ile başlayan yapılara ne ad verilir?",
            "options": [
                "Enkaps├╝lat├Âr",
                "Generator",
                "Modülatör",
                "Dekorat├Âr (Decorator)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 264,
            "topic": "py_ileri",
            "question": "Bir fonksiyon içinde return yerine yield kullanılırsa o fonksiyon neye dönüşür?",
            "options": [
                "Generator (├£rete├ğ)",
                "Lambda fonksiyonu",
                "Dekoratör",
                "Asenkron görev"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 265,
            "topic": "py_ileri",
            "question": "Python da CPython uygulamasında birden fazla thread in aynı anda saf Python bayt kodu çalıştırmasını kısıtlayan mekanizma nedir?",
            "options": [
                "V8",
                "GIL (Global Interpreter Lock)",
                "JIT",
                "GC (Garbage Collector)"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "zor"
        }
    ],
    "csharp": [
        {
            "id": 311,
            "topic": "cs_temeller",
            "question": "C# 9 ve sonrasında gelen Top-Level Statements özelliğinin temel amacı nedir?",
            "options": [
                "Program.cs dosyasında Main metodu ve sınıf tanımlama zorunluluğunu kaldırıp temiz kod yazmayı sağlamak",
                "Tüm değişkenleri otomatik global yapmak",
                "Derleyiciyi devre dışı bırakmak",
                "Bellek kullanımını iki katına çıkarmak"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 312,
            "topic": "cs_temeller",
            "question": "C# ta int ve double tipleri belleğin hangi bölgesinde ve nasıl tutulur?",
            "options": [
                "Her ikisi de sadece Heap te tutulur",
                "Değer tipi (Value Type) olup yerel değişken olarak Stack te tutulur",
                "Yalnızca veritabanında tutulur",
                "Statik bellek havuzunda tutulur"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 313,
            "topic": "cs_temeller",
            "question": "var anahtar kelimesi ile object tipi arasındaki en temel fark nedir?",
            "options": [
                "Hiçbir fark yoktur ikisi de aynıdır",
                "object derleme zamanında tip belirler",
                "var derleme zamanında (compile-time) tipini sabitler, object ise çalışma zamanında kutulama (boxing) yapar",
                "var sadece sayılarda kullanılır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 314,
            "topic": "cs_temeller",
            "question": "Büyük bir veri tipini (örneğin double) daha küçük bir tipe (int) dönüştürürken ne kullanılır?",
            "options": [
                "Otomatik aktarım",
                "dynamic",
                "String.Format",
                "Açık dönüşüm (Explicit Casting: (int)deger)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 315,
            "topic": "cs_temeller",
            "question": "int.TryParse(girdi, out int sayi) metodunun int.Parse metoduna göre en büyük avantajı nedir?",
            "options": [
                "Geçersiz formatta FormatException fırlatmak yerine geriye false döndürerek programın çökmesini önler",
                "Sayının iki katını otomatik hesaplar",
                "Sadece pozitif sayılarda çalışır",
                "Veritabanına doğrudan kayıt atar"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 316,
            "topic": "cs_temeller",
            "question": "$\"Merhaba {ad.ToUpper()}\" kullanımının adı nedir?",
            "options": [
                "String Concatenation",
                "String Interpolation (Metin İnterpolasyonu)",
                "Regular Expressions",
                "Text Encoding"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 317,
            "topic": "cs_operatorler_kosullar",
            "question": "C# ta 7 / 2 işleminin sonucu neden 3.5 değil de 3 çıkar?",
            "options": [
                "Derleyici hata yapmıştır",
                "Sayılar yuvarlanmıştır",
                "Her iki terim de int (tamsayı) olduğu için tamsayı bölmesi uygulanır ve ondalık kısım atılır",
                "C# ondalık sayıları desteklemez"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 318,
            "topic": "cs_operatorler_kosullar",
            "question": "if-else bloklarında && (mantıksal VE) operatörünün kısa devre (short-circuit) davranışı nedir?",
            "options": [
                "İkinci koşul her zaman mutlaka çalıştırılır",
                "Tüm koşulları rastgele sırayla kontrol eder",
                "İlk koşul doğruysa diğerini kontrol etmez",
                "İlk koşul false ise ikinci koşula hiç bakmadan doğrudan false üretir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 319,
            "topic": "cs_operatorler_kosullar",
            "question": "C# 8+ ile gelen switch expressions (=>) kullanımında varsayılan (default) durum ne ile belirtilir?",
            "options": [
                "_ (alt çizgi) deseni ile",
                "default anahtar kelimesiyle",
                "else bloğu ile",
                "* simgesiyle"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 320,
            "topic": "cs_operatorler_kosullar",
            "question": "string ad = kullaniciAdi ?? \"Misafir\"; ifadesindeki ?? operatörünün işlevi nedir?",
            "options": [
                "Ternary kontrolü yapar",
                "kullaniciAdi null ise sağdaki \"Misafir\" değerini atar",
                "İki metni yan yana yapıştırır",
                "Metni küçük harfe çevirir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 321,
            "topic": "cs_donguler",
            "question": "for (int i = 0; i < 5; i++) döngüsü toplam kaç kez çalışır?",
            "options": [
                "4 kez",
                "6 kez",
                "5 kez (i: 0, 1, 2, 3, 4)",
                "Sonsuz döngüye girer"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 322,
            "topic": "cs_donguler",
            "question": "do-while döngüsünün while döngüsünden en kritik farkı nedir?",
            "options": [
                "Sadece tek bir sayı alır",
                "Daha yavaş çalışır",
                "Dizilerde kullanılamaz",
                "Koşul en başta false olsa bile döngü gövdesi en az bir kez kesinlikle çalışır"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 323,
            "topic": "cs_donguler",
            "question": "foreach döngüsü ile bir koleksiyon gezinirken koleksiyonun yapısı hakkında ne geçerlidir?",
            "options": [
                "İterasyon esnasında koleksiyona eleman eklenemez veya silinemez (koleksiyon değiştirilemez)",
                "Elemanlar her zaman tersten okunur",
                "Sadece sabit dizilerde çalışır",
                "Elemanlar üzerinde doğrudan güncelleme yapılmalıdır"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 324,
            "topic": "cs_donguler",
            "question": "Döngüde o anki adımı pas geçip bir sonraki iterasyona atlamak için hangi komut verilir?",
            "options": [
                "break",
                "continue",
                "return",
                "exit"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 325,
            "topic": "cs_koleksiyonlar",
            "question": "int[] dizi = new int[5]; ifadesi çalıştırıldığında dizi elemanlarının varsayılan değerleri nedir?",
            "options": [
                "null",
                "-1",
                "0",
                "Rastgele çöp değerler"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 326,
            "topic": "cs_koleksiyonlar",
            "question": "List<T> koleksiyonunun sabit boyutlu dizilere (T[]) göre en belirgin avantajı nedir?",
            "options": [
                "Sadece tamsayı kabul etmesi",
                "Daha az bellek kullanması",
                "Hiçbir metodu olmaması",
                "Eleman eklendikçe veya silindikçe boyutunun dinamik olarak kendiliğinden genişleyip daralabilmesi"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 327,
            "topic": "cs_koleksiyonlar",
            "question": "Dictionary<string, int> koleksiyonunda bir anahtara göre değer aramanın ortalama zaman karmaşıklığı nedir?",
            "options": [
                "O(1) - Sabit zamanlı çok hızlı erişim",
                "O(n) - Tüm elemanları baştan sona arar",
                "O(n^2)",
                "O(log n)"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 328,
            "topic": "cs_koleksiyonlar",
            "question": "HashSet<T> koleksiyonuna aynı eleman ikinci kez eklenmek istendiğinde ne olur?",
            "options": [
                "Program Exception fırlatır",
                "Eleman eklenmez, reddedilir ve küme benzersiz eleman kuralını korur",
                "Eski elemanın üzerine yazar",
                "Kümeyi tamamen temizler"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 329,
            "topic": "cs_metodlar",
            "question": "Bir C# metodunun hiçbir değer döndürmeyeceğini belirtmek için dönüş tipi olarak ne yazılır?",
            "options": [
                "null",
                "empty",
                "void",
                "none"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 330,
            "topic": "cs_metodlar",
            "question": "out anahtar kelimesi ile işaretlenmiş bir parametre hakkında hangisi doğrudur?",
            "options": [
                "Metoda girmeden önce mutlaka değer atanmış olmalıdır",
                "Sadece string tiplerde çalışır",
                "Metod içinde değiştirilemez",
                "Metod tamamlanıp çıkmadan önce metodun gövdesinde kesinlikle bir değer atanmış olması zorunludur"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 331,
            "topic": "cs_metodlar",
            "question": "Aynı isimli fakat farklı parametre sayısı veya tipine sahip birden fazla metod tanımlamaya ne denir?",
            "options": [
                "Metod Aşırı Yükleme (Method Overloading)",
                "Metod Ezme (Method Overriding)",
                "Metod Kapsülleme (Encapsulation)",
                "Metod Miras Alma (Inheritance)"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 332,
            "topic": "cs_hata_yonetimi",
            "question": "try-catch bloklarında finally bloğunun temel görevi nedir?",
            "options": [
                "Sadece hata olduğunda çalışmak",
                "Hata çıksa da çıkmasa da her koşulda mutlaka çalışıp kaynak temizliği (cleanup) yapmak",
                "Programı zorla kapatmak",
                "Kullanıcıya bildirim penceresi açmak"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 333,
            "topic": "cs_oop_temel",
            "question": "Bir sınıftan bellekte yeni bir somut örnek (instance) üretmek için hangi anahtar kelime kullanılır?",
            "options": [
                "create",
                "build",
                "new",
                "init"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 334,
            "topic": "cs_oop_temel",
            "question": "C# ta public string Ad { get; set; } yapısına ne ad verilir?",
            "options": [
                "Alan (Field)",
                "Fonksiyon (Method)",
                "Sabit (Constant)",
                "Otomatik Özellik (Auto-Implemented Property)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 335,
            "topic": "cs_oop_temel",
            "question": "Kurucu metodların (Constructor) sınıf adı ve geri dönüş tipi kuralı nedir?",
            "options": [
                "Sınıfla tamamen aynı ada sahiptir ve hiçbir geri dönüş tipi (void dahil) yazılmaz",
                "Geriye her zaman int döner",
                "Mutlaka construct adıyla tanımlanmalıdır",
                "Sadece private tanımlanabilir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 336,
            "topic": "cs_oop_ileri",
            "question": "Bir alt sınıftan üst sınıfın kurucusunu veya metodunu tetiklemek için hangi anahtar kelime kullanılır?",
            "options": [
                "this",
                "base",
                "parent",
                "super"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 337,
            "topic": "cs_oop_ileri",
            "question": "Bir üst sınıf metodunun alt sınıfta ezilebilmesi (override edilebilmesi) için üst sınıfta nasıl tanımlanması gerekir?",
            "options": [
                "static",
                "private",
                "virtual (veya abstract)",
                "sealed"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 338,
            "topic": "cs_interface_abstract",
            "question": "C# ta bir sınıfın birden fazla sınıftan miras alamayıp ancak birden fazla Interface uygulayabilmesinin nedeni nedir?",
            "options": [
                "Interface lerin hafızada yer tutmaması",
                "Derleyicinin hızlanması",
                "C# ın çoklu sınıf kalıtımındaki Elmas Problemini (Diamond Problem) önlemek için çoklu Interface i desteklemesi",
                "Interface lerin sadece metin içermesi"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 339,
            "topic": "cs_interface_abstract",
            "question": "Abstract bir sınıf (abstract class) hakkında aşağıdakilerden hangisi doğrudur?",
            "options": [
                "new anahtar kelimesiyle doğrudan örneği (nesnesi) üretilemez; sadece miras alınarak alt sınıflar üzerinden kullanılır",
                "İçinde gövdeli metod barındıramaz",
                "Sadece bir adet metod içerebilir",
                "Bütün değişkenleri static olmak zorundadır"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 340,
            "topic": "cs_generics_records",
            "question": "C# 9+ ile gelen record tiplerinin class lardan en belirgin farkı nedir?",
            "options": [
                "Metod kabul etmemesi",
                "Değer tabanlı eşitlik (Value Equality) karşılaştırması yapması ve varsayılan olarak değişmez (immutable) veri modelleri sunması",
                "Yalnızca veritabanında çalışması",
                "Sadece tek bir property alabilmesi"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 341,
            "topic": "cs_generics_records",
            "question": "Generic yapıların (<T>) yazılıma kazandırdığı en büyük fayda nedir?",
            "options": [
                "Kodları gizlemesi",
                "Daha fazla RAM harcaması",
                "Farklı tipler için aynı mantığı tip güvenli (type-safe) şekilde boxing/unboxing maliyeti olmadan tekrar kullanılabilir kılması",
                "Sadece tamsayıları işlemesi"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 342,
            "topic": "cs_linq",
            "question": "sayilar.Where(x => x > 10).ToList() sorgusundaki Where fonksiyonunun işlevi nedir?",
            "options": [
                "Sayıları toplar",
                "Sayıları küçükten büyüğe sıralar",
                "Tüm sayıları siler",
                "Verilen koşulu (10'dan büyük olma) sağlayan elemanları filtreler"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 343,
            "topic": "cs_linq",
            "question": "LINQ sorgularında aranan şartı sağlayan ilk elemanı bulmak, bulamazsa null dönmek için hangisi kullanılır?",
            "options": [
                "FirstOrDefault()",
                "First()",
                "Single()",
                "FindAll()"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 344,
            "topic": "cs_asenkron",
            "question": "async ve await anahtar kelimeleriyle yazılan asenkron metodların en büyük kazanımı nedir?",
            "options": [
                "Kodun çalışma süresini her zaman sıfırlaması",
                "G/Ç (I/O, veritabanı, web istekleri) işlemleri sırasında ana iş parçacığını (UI thread) kilitlemeden eşzamanlı çalışabilirlik sağlaması",
                "Veritabanını otomatik yedeklemesi",
                "Döngüleri devre dışı bırakması"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 345,
            "topic": "cs_asenkron",
            "question": "C# ta using bildirimi (using var dosya = ...) kullanılan nesneler işlem bittiğinde hangi metodu otomatik tetikler?",
            "options": [
                "Stop()",
                "CloseAll()",
                "Dispose()",
                "End()"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 346,
            "topic": "cs_temeller",
            "question": "C# ta sabit (değiştirilemez) bir değer tanımlamak için hangi anahtar kelime kullanılır?",
            "options": [
                "readonly",
                "static",
                "fixed",
                "const"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 347,
            "topic": "cs_koleksiyonlar",
            "question": "List<T> koleksiyonundaki tüm elemanları tek hamlede temizlemek için hangi metod çağrılır?",
            "options": [
                "Clear()",
                "RemoveAll()",
                "Delete()",
                "Empty()"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 348,
            "topic": "cs_linq",
            "question": "Koleksiyonda verilen şarta uyan en az bir eleman olup olmadığını bool olarak dönen en hızlı LINQ metodu hangisidir?",
            "options": [
                "Count() > 0",
                "Any()",
                "All()",
                "Contains()"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 349,
            "topic": "cs_oop_ileri",
            "question": "Bir sınıfın başka bir sınıf tarafından miras alınmasını tamamen engellemek (mührünü basmak) için hangi anahtar kelime kullanılır?",
            "options": [
                "lock",
                "final",
                "sealed",
                "static"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 350,
            "topic": "cs_asenkron",
            "question": "Değer döndürmeyen asenkron bir metodun standart C# dönüş tipi ne olmalıdır?",
            "options": [
                "async void (özel olaylar hariç)",
                "void",
                "Promise",
                "Task"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        }
    ],
    "sql": [
        {
            "id": 351,
            "topic": "sql_temel_select",
            "question": "İlişkisel Veritabanlarında (RDBMS) bir tablonun tüm satır ve sütunlarını çekmek için hangi komut kullanılır?",
            "options": [
                "SELECT * FROM tablo_adi;",
                "GET ALL FROM tablo_adi;",
                "FETCH ROWS FROM tablo_adi;",
                "PULL * FROM tablo_adi;"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 352,
            "topic": "sql_temel_select",
            "question": "SELECT sorgusunda bir sütuna geçici takma isim (alias) vermek için hangi anahtar kelime kullanılır?",
            "options": [
                "LIKE",
                "AS",
                "INTO",
                "NAME"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 353,
            "topic": "sql_temel_select",
            "question": "SELECT sorgusunda tekrar eden (mükerrer) satırları eleyip yalnızca benzersiz değerleri listelemek için ne kullanılır?",
            "options": [
                "UNIQUE ONLY",
                "NO REPEAT",
                "DISTINCT",
                "SINGLE"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 354,
            "topic": "sql_temel_select",
            "question": "Sorgu sonucunun ilk 10 satırını atlayıp sonraki 5 satırını getirmek için doğru kalıp hangisidir?",
            "options": [
                "SKIP 10 TAKE 5",
                "TOP 5 SKIP 10",
                "ROW 10 TO 15",
                "LIMIT 5 OFFSET 10"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 355,
            "topic": "sql_filtreleme_siralama",
            "question": "Tablodan belirli bir şartı (örneğin fiyatı 100 TL'den büyük olanları) sağlayan kayıtları filtrelemek için hangi anahtar kelime kullanılır?",
            "options": [
                "WHERE",
                "HAVING",
                "FILTER",
                "CHECK"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 356,
            "topic": "sql_filtreleme_siralama",
            "question": "Birden fazla filtre şartından HER İKİSİNİN de aynı anda sağlanması istendiğinde hangi mantıksal operatör kullanılır?",
            "options": [
                "OR",
                "AND",
                "BOTH",
                "UNION"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 357,
            "topic": "sql_filtreleme_siralama",
            "question": "Sorgu sonuçlarını en yüksek puandan en düşük puana (büyükten küçüğe / azalan) sıralamak için ne yazılır?",
            "options": [
                "ORDER BY puan ASC",
                "SORT BY puan DOWN",
                "ORDER BY puan DESC",
                "ARRANGE BY puan REVERSE"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 358,
            "topic": "sql_gelismis_operatorler",
            "question": "Bir sütunun birden fazla belirli değerden birine eşit olup olmadığını (örneğin Şehir 'Ankara', 'İzmir' veya 'Bursa') kontrol eden en pratik operatör hangisidir?",
            "options": [
                "BETWEEN",
                "LIKE",
                "EXISTS",
                "IN"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 359,
            "topic": "sql_gelismis_operatorler",
            "question": "WHERE fiyat BETWEEN 100 AND 500 ifadesi hakkında hangisi doğrudur?",
            "options": [
                "100 ve 500 sınır değerleri dahildir ve bu aralıktaki tüm sayıları kapsar",
                "Yalnızca 100 ve 500 sayılarını alır",
                "100 ve 500 sınır değerleri hariç tutulur",
                "Sadece tamsayılarda çalışır"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 360,
            "topic": "sql_gelismis_operatorler",
            "question": "LIKE '%kod%' filtresi hangi metinleri yakalar?",
            "options": [
                "Yalnızca 'kod' harfleriyle başlayanları",
                "İçinde 'kod' kelimesi herhangi bir yerinde geçen tüm metinleri",
                "Sadece tam olarak 'kod' kelimesine eşit olanları",
                "Yalnızca 'kod' ile bitenleri"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 361,
            "topic": "sql_gelismis_operatorler",
            "question": "SQL'de bir sütundaki değerin boş/tanımsız (NULL) olup olmadığını kontrol etmek için neden kolon = NULL yazılamaz?",
            "options": [
                "PostgreSQL'de = işareti yasak olduğu için",
                "NULL sadece sayılarla karşılaştırıldığı için",
                "NULL bilinmeyen bir durumu temsil ettiği için hiçbir şeye (kendine bile) eşitlenemez; bu yüzden IS NULL kullanılır",
                "Sadece metinlerde = NULL çalışır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 362,
            "topic": "sql_gelismis_operatorler",
            "question": "COALESCE(telefon, 'Yok') fonksiyonunun işlevi nedir?",
            "options": [
                "Telefon numarasını şifreler",
                "Telefon numarası formatını doğrular",
                "Telefon kolonunu siler",
                "telefon kolonu NULL ise ekrana 'Yok' yazar, NULL değilse gerçek telefon numarasını yazar"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 363,
            "topic": "sql_aggregate_groupby",
            "question": "Tablodaki tüm satırların sayısını veren toplama fonksiyonu hangisidir?",
            "options": [
                "COUNT(*)",
                "SUM(*)",
                "TOTAL(*)",
                "SIZE(*)"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 364,
            "topic": "sql_aggregate_groupby",
            "question": "Bir tablodaki sayısal bir kolonun ortalama değerini hesaplayan fonksiyon hangisidir?",
            "options": [
                "MEAN()",
                "AVG()",
                "MEDIAN()",
                "AVERAGE()"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 365,
            "topic": "sql_aggregate_groupby",
            "question": "Verileri belirli bir sütuna göre (örneğin kategori veya departman) gruplayıp her grubun istatistiğini almak için ne kullanılır?",
            "options": [
                "ORDER BY",
                "SORT BY",
                "GROUP BY",
                "CLUSTER BY"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 366,
            "topic": "sql_aggregate_groupby",
            "question": "GROUP BY ile gruplanmış sonuçlar üzerinde toplama fonksiyonlarına göre (örneğin COUNT(*) > 5) filtre koymak için hangisi kullanılır?",
            "options": [
                "WHERE",
                "FILTER",
                "CHECK",
                "HAVING"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 367,
            "topic": "sql_ddl_tablolar_constraints",
            "question": "Veritabanında sıfırdan yeni bir tablo oluşturmak için kullanılan SQL komutu hangisidir?",
            "options": [
                "CREATE TABLE",
                "NEW TABLE",
                "ADD TABLE",
                "BUILD TABLE"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 368,
            "topic": "sql_ddl_tablolar_constraints",
            "question": "Bir tabloda PRIMARY KEY tanımlanan bir sütun hangi iki temel kuralı kesinlikle sağlamak zorundadır?",
            "options": [
                "Sadece negatif sayı ve NULL olmalıdır",
                "Değerleri benzersiz (UNIQUE) olmalı ve asla boş (NULL) olamaz",
                "Metin içermeli ve şifrelenmiş olmalıdır",
                "Sadece otomatik artan sayı olabilir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 369,
            "topic": "sql_ddl_tablolar_constraints",
            "question": "İlişkili iki tabloda ana kayıt (örneğin Müşteri) silindiğinde, ona bağlı siparişlerin de otomatik silinmesi için hangi kural tanımlanır?",
            "options": [
                "ON DELETE BLOCK",
                "ON DELETE RESTRICT",
                "ON DELETE CASCADE",
                "ON DELETE SET NULL"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 370,
            "topic": "sql_ddl_tablolar_constraints",
            "question": "Mevcut çalışan bir tabloya yeni bir sütun eklemek için hangi SQL komutu verilir?",
            "options": [
                "UPDATE TABLE tablo ADD COLUMN ...",
                "INSERT COLUMN INTO tablo ...",
                "MODIFY TABLE tablo ...",
                "ALTER TABLE tablo ADD COLUMN ..."
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 371,
            "topic": "sql_ddl_tablolar_constraints",
            "question": "TRUNCATE TABLE ile DROP TABLE arasındaki en temel fark nedir?",
            "options": [
                "TRUNCATE tablonun şemasını koruyarak tüm satırları sıfırlar; DROP ise tabloyu tamamen veritabanından siler",
                "İkisi tamamen aynıdır",
                "DROP sadece tek bir satırı siler",
                "TRUNCATE geri alınamaz ama DROP geri alınabilir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 372,
            "topic": "sql_dml_islemler",
            "question": "Tabloya yeni satır (kayıt) eklemek için hangi komut kullanılır?",
            "options": [
                "ADD ROW INTO",
                "INSERT INTO",
                "NEW RECORD",
                "PUT INTO"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 373,
            "topic": "sql_dml_islemler",
            "question": "PostgreSQL'de INSERT işleminden hemen sonra otomatik üretilen id değerini tek sorguda geri almak için ne eklenir?",
            "options": [
                "RETURN ID",
                "GET ID",
                "RETURNING id",
                "FETCH id"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 374,
            "topic": "sql_dml_islemler",
            "question": "Bir tablodaki verileri güncellerken (UPDATE) WHERE şartı yazılmazsa ne olur?",
            "options": [
                "Hiçbir şey olmaz sorgu hata verir",
                "Sadece ilk satır güncellenir",
                "Sadece son eklenen satır güncellenir",
                "Tablodaki İSTİSNASIZ TÜM satırlar güncellenir ve veri kaybı riski doğar"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 375,
            "topic": "sql_dml_islemler",
            "question": "Tablodan belirli kayıtları güvenli şekilde silmek için kullanılan DML komutu hangisidir?",
            "options": [
                "DELETE FROM tablo WHERE ...",
                "REMOVE FROM tablo WHERE ...",
                "DROP ROWS FROM tablo WHERE ...",
                "CLEAR FROM tablo WHERE ..."
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 376,
            "topic": "sql_joins",
            "question": "INNER JOIN iki tabloyu birleştirirken hangi satırları sonuç kümesine dahil eder?",
            "options": [
                "Her iki tablodaki tüm satırları",
                "Yalnızca her iki tabloda da birbiriyle eşleşen ortak satırları (kesişim)",
                "Yalnızca sol tablodaki eşleşmeyen satırları",
                "Sadece boş (NULL) satırları"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 377,
            "topic": "sql_joins",
            "question": "Müşteriler tablosundaki tüm müşterileri ve varsa siparişlerini listelemek, henüz hiç siparişi olmayan müşterileri de kaybetmemek için hangi JOIN kullanılır?",
            "options": [
                "RIGHT JOIN",
                "INNER JOIN",
                "LEFT JOIN",
                "CROSS JOIN"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 378,
            "topic": "sql_joins",
            "question": "Bir tablonun hiyerarşik ilişkileri (örneğin Çalışan - Yönetici ilişkisi) modellemek için kendisiyle birleştirilmesine ne ad verilir?",
            "options": [
                "Outer Join",
                "Cross Join",
                "Auto Join",
                "Self JOIN"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 379,
            "topic": "sql_subqueries_cte",
            "question": "Bir SELECT sorgusunun WHERE bloğu içine başka bir SELECT sorgusu yazılmasına ne ad verilir?",
            "options": [
                "Alt Sorgu (Subquery / Nested Query)",
                "Stored Procedure",
                "Database Trigger",
                "View"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 380,
            "topic": "sql_subqueries_cte",
            "question": "Karmaşık alt sorguları geçici ve okunabilir bir tablo ifadesi haline getirmek için kullanılan SQL yapısı (WITH) nedir?",
            "options": [
                "Cursor",
                "CTE (Common Table Expression)",
                "Temp File",
                "Index Pool"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 381,
            "topic": "sql_indeks_performans",
            "question": "Milyonlarca satırlık bir tabloda e-posta aramalarının yavaşlamasını önlemek ve hızlandırmak için hangi veritabanı nesnesi oluşturulur?",
            "options": [
                "Trigger",
                "Foreign Key",
                "İndeks (Index: CREATE INDEX)",
                "Check Constraint"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 382,
            "topic": "sql_indeks_performans",
            "question": "PostgreSQL'de bir sorgunun arka planda nasıl çalıştığını ve indeks kullanıp kullanmadığını analiz etmek için sorgunun başına ne yazılır?",
            "options": [
                "DEBUG QUERY",
                "ANALYZE NOW",
                "PROFILE SQL",
                "EXPLAIN ANALYZE"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 383,
            "topic": "sql_indeks_performans",
            "question": "Sıkça kullanılan karmaşık bir JOIN sorgusunu sanal bir tablo olarak kaydedip pratik şekilde SELECT çekmek için ne kullanılır?",
            "options": [
                "VIEW (Görünüm: CREATE VIEW)",
                "TRIGGER",
                "PROCEDURE",
                "SCHEMA"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 384,
            "topic": "sql_transaction_acid",
            "question": "Veritabanlarında ACID prensiplerinden 'A' (Atomicity / Bölünemezlik) neyi garanti eder?",
            "options": [
                "Tüm işlemlerin şifrelenmesini",
                "Bir transaction içindeki tüm adımların 'ya hep birlikte tamamen başarılı olacağını ya da tek bir hata halinde hiçbirinin gerçekleşmemiş gibi geri alınacağını'",
                "Veritabanının asla çökmeyeceğini",
                "Sadece tek bir kullanıcının bağlanabileceğini"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 385,
            "topic": "sql_transaction_acid",
            "question": "Bir Transaction bloğunu başlatmak için kullanılan standart SQL komutu hangisidir?",
            "options": [
                "START RUN;",
                "OPEN TRANSACTION;",
                "BEGIN (veya BEGIN TRANSACTION);",
                "LAUNCH;"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 386,
            "topic": "sql_transaction_acid",
            "question": "Bir Transaction bloğu içindeki işlemlerde hata meydana geldiğinde yapılan tüm değişiklikleri iptal edip geri almak için ne yazılır?",
            "options": [
                "CANCEL;",
                "UNDO;",
                "ABORT ALL;",
                "ROLLBACK;"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 387,
            "topic": "sql_transaction_acid",
            "question": "Bir Transaction bloğunda yapılan tüm değişiklikleri kalıcı hale getirmek ve diske yazmak için hangi komut verilir?",
            "options": [
                "COMMIT;",
                "SAVE NOW;",
                "APPLY;",
                "PERSIST;"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 388,
            "topic": "sql_joins",
            "question": "İki tablo arasındaki Kartezyen çarpımı (sol tablodaki her satırın sağ tablodaki tüm satırlarla eşleştirilmesi) hangi JOIN ile yapılır?",
            "options": [
                "FULL JOIN",
                "CROSS JOIN",
                "NATURAL JOIN",
                "SELF JOIN"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 389,
            "topic": "sql_ddl_tablolar_constraints",
            "question": "Bir sütundaki değerin belirli bir şartı sağlamasını (örneğin yaş >= 0 veya bakiye >= 0) zorunlu kılan kısıtlama hangisidir?",
            "options": [
                "NOT NULL",
                "UNIQUE",
                "CHECK (CHECK constraint)",
                "DEFAULT"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 390,
            "topic": "sql_ddl_tablolar_constraints",
            "question": "Kayıt eklenirken sütuna herhangi bir değer verilmezse otomatik atanacak değeri belirleyen kısıtlama hangisidir?",
            "options": [
                "FALLBACK",
                "INITIAL",
                "AUTO",
                "DEFAULT"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        }
    ],
    "cpp": [
        {
            "id": 391,
            "topic": "cpp_temeller_io",
            "question": "Bir C++ programının işletim sistemi tarafından başlatıldığı ana giriş fonksiyonunun dönüş tipi ne olmalıdır?",
            "options": [
                "int",
                "void",
                "double",
                "bool"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 392,
            "topic": "cpp_temeller_io",
            "question": "auto x = 3.14; ifadesinde derleyici x değişkeninin tipini ne olarak belirler?",
            "options": [
                "float",
                "double",
                "int",
                "auto_type"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 393,
            "topic": "cpp_temeller_io",
            "question": "C++ ta bir ifadenin veya fonksiyonun çalışma zamanında değil, derleme zamanında (compile-time) hesaplanacağını garanti etmek için hangi anahtar kelime kullanılır?",
            "options": [
                "const",
                "inline",
                "constexpr",
                "static"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 394,
            "topic": "cpp_temeller_io",
            "question": "std::cout ile ekrana yazdırma yaparken std::endl ile \"\\n\" arasındaki performans farkının temel nedeni nedir?",
            "options": [
                "\"\\n\" ekrana basamaz",
                "std::endl yeni satıra geçmez",
                "Fark yoktur",
                "std::endl yeni satıra geçtikten sonra çıkış arabelleğini zorla boşaltır (flush)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 395,
            "topic": "cpp_kontrol_donguler",
            "question": "Büyük nesnelerden oluşan bir vektör üzerinde range-based for döngüsüyle gezinirken gereksiz bellek kopyalamasını önlemek için hangi yazım tercih edilmelidir?",
            "options": [
                "for (const auto& eleman : v)",
                "for (auto eleman : v)",
                "for (auto* eleman : v)",
                "for (eleman in v)"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 396,
            "topic": "cpp_kontrol_donguler",
            "question": "C++17 ile gelen başlatıcılı if (if with initializer) yapısının sağladığı en büyük avantaj nedir?",
            "options": [
                "Döngüleri hızlandırması",
                "Koşul için tanımlanan değişkenin kapsamını (scope) sadece if-else bloğu ile sınırlaması",
                "Pointer kullanımını yasaklaması",
                "Belleği otomatik sıfırlaması"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 397,
            "topic": "cpp_kontrol_donguler",
            "question": "switch-case bloklarında bir case tamamlandıktan sonra alttaki case e istemsizce geçilmesini önlemek için hangi anahtar kelime konulmalıdır?",
            "options": [
                "continue",
                "exit",
                "break",
                "return"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "kolay"
        },
        {
            "id": 398,
            "topic": "cpp_kontrol_donguler",
            "question": "Bir for döngüsü içerisinde continue deyimi çalıştığında döngünün davranışı ne olur?",
            "options": [
                "Döngü tamamen sonlanır",
                "Program çöker",
                "Tüm sayaçlar sıfırlanır",
                "O anki iterasyonun kalanını atlayarak doğrudan artırma/güncelleme adımına geçer"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 399,
            "topic": "cpp_fonksiyonlar_referanslar",
            "question": "C++ referansları (&) ile işaretçiler (pointers - *) arasındaki en temel farklardan biri hangisidir?",
            "options": [
                "Referanslar boş (null/nullptr) olamaz ve tanımlandığı anda bir değişkene bağlanmalıdır",
                "Referanslar bellekte tutulamaz",
                "Referanslar fonksiyonlara parametre olarak gönderilemez",
                "İşaretçiler asla nullptr alamaz"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 400,
            "topic": "cpp_fonksiyonlar_referanslar",
            "question": "void takas(int a, int b) şeklinde yazılan bir fonksiyona gonderilen değişkenlerin orijinal değerlerinin değişmemesinin sebebi nedir?",
            "options": [
                "C++ takasa izin vermez",
                "Parametreler değer ile aktarıldığı (pass-by-value) için fonksiyon içinde kopyaları üzerinde çalışılır",
                "Fonksiyon void olduğu için",
                "Bellek kilitlendiği için"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "kolay"
        },
        {
            "id": 401,
            "topic": "cpp_fonksiyonlar_referanslar",
            "question": "Fonksiyonlara büyük bir std::string parametresi gönderilirken neden const std::string& kullanımı tavsiye edilir?",
            "options": [
                "Yalnızca küçük harflere izin vermek için",
                "Metni otomatik ters çevirmek için",
                "Hem gereksiz string kopyalamasını önler hem de orijinal verinin kazara değiştirilmesini engeller",
                "String sınıfında değer aktarımı yasak olduğu için"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 402,
            "topic": "cpp_fonksiyonlar_referanslar",
            "question": "Aynı isimli birden fazla fonksiyonun tanımlanabilmesi (Function Overloading) için hangi koşul ZORUNLUDUR?",
            "options": [
                "Dönüş tiplerinin farklı olması yeterlidir",
                "Fonksiyonların farklı dosyalarda olması gerekir",
                "inline olarak bildirilmeleri gerekir",
                "Parametre sayılarının veya parametre tiplerinin birbirinden farklı olması gerekir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 403,
            "topic": "cpp_pointer_bellek",
            "question": "int x = 25; int* ptr = &x; tanımlamasından sonra *ptr = 50; işlemi yapıldığında x değişkeninin yeni değeri ne olur?",
            "options": [
                "50",
                "25",
                "0",
                "Hata verir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 404,
            "topic": "cpp_pointer_bellek",
            "question": "C++11 ile eski C stili NULL veya 0 sabiti yerine neden nullptr anahtar kelimesi getirilmiştir?",
            "options": [
                "Daha az harf içerdiği için",
                "0 bir tamsayı iken nullptr ın tür güvenli (pointer tipinde) olması ve fonksiyon aşırı yüklemede karışıklığı önlemesi için",
                "NULL artık derlenmediği için",
                "nullptr belleği hızlandırdığı için"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 405,
            "topic": "cpp_pointer_bellek",
            "question": "int* dizi = new int[50]; şeklinde ayrılan dinamik bir diziyi bellekten temizlemek için hangi silme komutu kullanılmalıdır?",
            "options": [
                "free(dizi);",
                "delete dizi;",
                "delete[] dizi;",
                "remove dizi;"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 406,
            "topic": "cpp_pointer_bellek",
            "question": "int sayilar[] = {10, 20, 30}; int* p = sayilar; olduğunda *(p + 2) ifadesi hangi değeri döndürür?",
            "options": [
                "10",
                "20",
                "Tanımsız (Çöp Değer)",
                "30 (Dizinin 2. indeksindeki eleman)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 407,
            "topic": "cpp_smart_pointers_raii",
            "question": "std::unique_ptr akıllı işaretçisiyle ilgili aşağıdaki ifadelerden hangisi DOĞRUDUR?",
            "options": [
                "Kopyalanamaz (copy constructible değildir), tekil mülkiyete sahiptir ancak std::move ile taşınabilir",
                "Birden fazla unique_ptr aynı bellek adresini paylaşabilir",
                "Belleği serbest bırakmak için manuel delete çağırmak şarttır",
                "İçinde sadece ilkel (int, double) tipler tutulabilir"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 408,
            "topic": "cpp_smart_pointers_raii",
            "question": "C++14 ile gelen std::make_unique<T>() fonksiyonunun new T() kullanımına göre en önemli avantajı nedir?",
            "options": [
                "Belleği heap yerine stack te açması",
                "İstisna güvenliği (exception safety) sağlaması ve tekil bellek tahsisini daha temiz ve güvenli yapması",
                "Tüm değişkenleri sıfırlaması",
                "Daha yavaş ama güvenli olması"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "zor"
        },
        {
            "id": 409,
            "topic": "cpp_smart_pointers_raii",
            "question": "İki nesnenin birbirini std::shared_ptr ile tutması sonucu referans sayacının hiçbir zaman sıfırlanamaması (döngüsel referans) sorununu çözmek için hangisi kullanılır?",
            "options": [
                "std::auto_ptr",
                "void*",
                "std::weak_ptr",
                "raw pointer"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "zor"
        },
        {
            "id": 410,
            "topic": "cpp_smart_pointers_raii",
            "question": "RAII (Resource Acquisition Is Initialization) tasarım felsefesinin temel ilkesi nedir?",
            "options": [
                "Tüm değişkenlerin global yapılması",
                "Belleğin yalnızca işletim sistemi kapanırken temizlenmesi",
                "İşaretçilerin tamamen yasaklanması",
                "Kaynağın nesnenin kurucusunda tahsis edilmesi ve nesne kapsam dışına çıktığında yıkıcısında otomatik serbest bırakılması"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 411,
            "topic": "cpp_oop_siniflar_ctor",
            "question": "C++ dilinde class ile struct arasındaki TEK temel sözdizimsel fark nedir?",
            "options": [
                "struct üyeleri varsayılan olarak public, class üyeleri varsayılan olarak private tır",
                "struct içine metot yazılamaz",
                "class kalıtımı desteklemez",
                "struct sanal fonksiyon barındıramaz"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "kolay"
        },
        {
            "id": 412,
            "topic": "cpp_oop_siniflar_ctor",
            "question": "C++ kurucu metodunda Nokta(int x, int y) : x_(x), y_(y) {} (üye başlatma listesi) kullanımının kurucu gövdesinde atama yapmaya göre avantajı nedir?",
            "options": [
                "Daha fazla bellek tüketmesi",
                "Üyeleri önce varsayılan değerle kurup sonra atamak yerine doğrudan istenen değerle tek adımda inşa etmesi",
                "private alanlara erişimi engellemesi",
                "Kalıtımı kapatması"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 413,
            "topic": "cpp_oop_siniflar_ctor",
            "question": "Tek parametre alan bir kurucu metodun başına explicit yazılmasının amacı nedir?",
            "options": [
                "Kurucuyu private yapmak",
                "Sınıfın kopyalanmasını engellemek",
                "Derleyicinin beklenmedik örtük (implicit) tip dönüşümleri yapmasını engellemek",
                "Sınıfı sanal yapmak"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 414,
            "topic": "cpp_oop_siniflar_ctor",
            "question": "Taşıma kurucusunun (Move Constructor) kurucu parametresi olarak aldığı && simgesi neyi temsil eder?",
            "options": [
                "Mantıksal VE işlemini",
                "Çift işaretçiyi (pointer to pointer)",
                "Bit düzeyinde kaydırmayı",
                "Sağ taraf referansını (rvalue reference - geçici nesne referansı)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 415,
            "topic": "cpp_oop_kalitim_polymorphism",
            "question": "Temel bir sınıfta sanal fonksiyonlar (virtual) bulunuyorsa o sınıfın yıkıcısının (destructor) virtual yapılmasının kritik önemi nedir?",
            "options": [
                "Türetilmiş sınıf nesnesi temel sınıf işaretçisiyle delete edildiğinde türemiş sınıfın yıkıcısının da çağrılmasını garanti etmek",
                "Bellek tahsisini 2 kat hızlandırmak",
                "Sınıfın kalıtılmasını engellemek",
                "Sınıf üyelerini korumak"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "zor"
        },
        {
            "id": 416,
            "topic": "cpp_oop_kalitim_polymorphism",
            "question": "virtual void ciz() = 0; sözdizimi C++ ta ne anlama gelir?",
            "options": [
                "ciz fonksiyonunun 0 döndürdüğü",
                "Bu fonksiyonun saf sanal (pure virtual) olduğu ve sınıfı soyut (abstract) sınıf yaptığı",
                "Fonksiyonun silindiği",
                "Fonksiyonun private olduğu"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 417,
            "topic": "cpp_oop_kalitim_polymorphism",
            "question": "Türetilmiş sınıfta ezilen bir sanal metodun sonuna C++11 override yazmanın en büyük faydası nedir?",
            "options": [
                "Metodu static yapar",
                "Metodun hızını artırır",
                "Temel sınıfta aynı imzaya sahip bir sanal metot yoksa derleyicinin hata vermesini sağlayarak yazım hatalarını önler",
                "Metodu private yapar"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 418,
            "topic": "cpp_oop_kalitim_polymorphism",
            "question": "Bir sınıf tanımında class Yonetici final : public Calisan {} ifadesindeki final ne işe yarar?",
            "options": [
                "Yonetici sınıfının tüm metotlarını siler",
                "Yonetici nesnelerinin değiştirilmesini engeller",
                "Yonetici sınıfını soyut yapar",
                "Yonetici sınıfından başka hiçbir sınıfın türetilemeyeceğini (miras alamayacağını) bildirir"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "orta"
        },
        {
            "id": 419,
            "topic": "cpp_operator_overloading_friend",
            "question": "std::cout << nesne yazabilmek için aşırı yüklenen operator<< fonksiyonu neden çoğunlukla friend veya serbest fonksiyon olarak tanımlanır?",
            "options": [
                "Sol taraftaki işlenen std::ostream tipinde olduğu ve sınıfımıza ait bir üye olamayacağı için",
                "cout un private olduğu için",
                "C++ üye fonksiyonlara izin vermediği için",
                "cout un sadece tamsayı basabildiği için"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "zor"
        },
        {
            "id": 420,
            "topic": "cpp_operator_overloading_friend",
            "question": "Bir sınıfın içinde friend class B; bildirimi yapıldığında bu ne anlama gelir?",
            "options": [
                "A sınıfı B nin tüm private üyelerine erişebilir",
                "B sınıfı A nın private ve protected üyelerine doğrudan erişebilir",
                "A ve B birbirini miras almıştır",
                "B sınıfı silinir"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 421,
            "topic": "cpp_operator_overloading_friend",
            "question": "C++ ta iki Vektor nesnesini v1 + v2 şeklinde toplamak için hangi fonksiyon tanımlanmalıdır?",
            "options": [
                "plus(const Vektor&)",
                "add(const Vektor&)",
                "Vektor operator+(const Vektor&) const",
                "operator_add(const Vektor&)"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 422,
            "topic": "cpp_operator_overloading_friend",
            "question": "Aşağıdaki C++ operatörlerinden hangisi aşırı YÜKLENEMEZ (overload edilemez)?",
            "options": [
                "operator+",
                "operator==",
                "operator[]",
                "operator:: (Scope resolution) ve operator. (Nokta üye erişim)"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        },
        {
            "id": 423,
            "topic": "cpp_templates_generic",
            "question": "template <typename T> T topla(T a, T b) şablon fonksiyonu topla(3, 5) şeklinde çağrıldığında ne gerçekleşir?",
            "options": [
                "Derleyici T tipini int olarak çıkarır ve int topla(int, int) fonksiyonunu derleme anında üretir",
                "Çalışma zamanında yorumlanır",
                "Hata verir çünkü tip belirtilmemiştir",
                "void tipine dönüştürülür"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 424,
            "topic": "cpp_templates_generic",
            "question": "template <typename T> class Dizi {} şablon sınıfından int ve double için iki ayrı nesne oluşturulduğunda derleyicinin davranışı nedir?",
            "options": [
                "Tek bir ortak sınıf kullanır",
                "İki bağımsız sınıf kodu üretir (Dizi<int> ve Dizi<double>)",
                "double olanı int e dönüştürür",
                "Hata fırlatır"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 425,
            "topic": "cpp_templates_generic",
            "question": "Şablon özelleştirme (template specialization) hangi amaçla kullanılır?",
            "options": [
                "Şablonları derlemeden kaldırmak için",
                "Sadece int tiplerine izin vermek için",
                "Belirli bir özel tip için şablonun genel algoritması yerine özelleşmiş ve optimize edilmiş bir kod sunmak için",
                "Şablonları çalışma zamanına ertelemek için"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "zor"
        },
        {
            "id": 426,
            "topic": "cpp_templates_generic",
            "question": "Şablon parametre listesinde template <typename T> ile template <class T> arasındaki fark nedir?",
            "options": [
                "typename yalnızca ilkel tipler içindir",
                "class yalnızca sınıflar içindir",
                "class daha hızlı derlenir",
                "Şablon parametre bildiriminde anlamsal olarak tamamen eşdeğerdirler"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "kolay"
        },
        {
            "id": 427,
            "topic": "cpp_stl_modern_ozellikler",
            "question": "std::vector da push_back() yerine emplace_back() kullanmanın en büyük performans artısı nedir?",
            "options": [
                "Nesneyi önceden oluşturup kopyalamak yerine doğrudan vektörün bellek alanında kurucu argümanlarıyla inşa etmesi",
                "Vektörün boyutunu iki katına çıkarması",
                "Vektörü otomatik sıralaması",
                "Vektörü kitlemesi"
            ],
            "correctIndex": 0,
            "correctLetter": "A",
            "difficulty": "orta"
        },
        {
            "id": 428,
            "topic": "cpp_stl_modern_ozellikler",
            "question": "std::map ile std::unordered_map arasındaki zaman karmaşıklığı (time complexity) farkı nasıldır?",
            "options": [
                "İkisi de O(N) dir",
                "std::map dengeli ağaç tabanlı olup O(log N) iken std::unordered_map hash tablosu tabanlı olup ortalama O(1) dir",
                "std::map O(1), unordered_map O(N) dir",
                "std::map her zaman daha hızlıdır"
            ],
            "correctIndex": 1,
            "correctLetter": "B",
            "difficulty": "orta"
        },
        {
            "id": 429,
            "topic": "cpp_stl_modern_ozellikler",
            "question": "auto fn = [&x, y]() {}; lambda ifadesinde yakalama listesi (capture list) ne anlama gelir?",
            "options": [
                "x ve y kopyalanır",
                "x ve y referanstır",
                "x referans olarak, y ise değer olarak (kopya) yakalanır",
                "x silinir, y kalır"
            ],
            "correctIndex": 2,
            "correctLetter": "C",
            "difficulty": "orta"
        },
        {
            "id": 430,
            "topic": "cpp_stl_modern_ozellikler",
            "question": "C++20 standardı ile gelen Concepts (Kavramlar) özelliğinin yazılımcıya sunduğu en önemli kazanım nedir?",
            "options": [
                "Döngüleri ortadan kaldırmak",
                "Pointer ları tamamen silmek",
                "Grafik arayüzü çizmek",
                "Şablon tiplerine derleme zamanında kısıtlamalar koyarak çok daha okunabilir ve net derleyici hata mesajları üretmek"
            ],
            "correctIndex": 3,
            "correctLetter": "D",
            "difficulty": "zor"
        }
    ]
};

// Belirli bir dilde düello için rastgele 5 soru getirme
function getDuelQuestionsForLanguage(langKey, count = 5) {
    const list = quizBank[langKey] || [];
    if (list.length === 0) return [];
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { quizBank, getDuelQuestionsForLanguage };
}
