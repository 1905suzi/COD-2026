// ============================================================
// COD+ MÜFREDAT VE SEVİYE SİSTEMİ (TÜM DİLLER - 150 DERS)
// Diller: HTML/Web (30), SQL (30), Python (30), C# (30), C++ (30)
// ============================================================

const placementExams = [
  {
    "lang": "HTML",
    "skipToLevel": 21,
    "questions": [
      {
        "q": "HTML'de tıklanabilir bağlantı (link) oluşturmak için hangi etiket kullanılır?",
        "options": [
          "<link>",
          "<a>",
          "<href>"
        ],
        "correct": 1
      },
      {
        "q": "Tablolarda yeni bir satır oluşturmak için hangi etiket kullanılır?",
        "options": [
          "<td>",
          "<table>",
          "<tr>"
        ],
        "correct": 2
      },
      {
        "q": "Kullanıcıdan şifre almak için hangi input tipi kullanılır?",
        "options": [
          "type='text'",
          "type='password'",
          "type='hidden'"
        ],
        "correct": 1
      },
      {
        "q": "Sayfadaki en büyük ve en önemli başlık etiketi hangisidir?",
        "options": [
          "<h6>",
          "<h1>",
          "<header>"
        ],
        "correct": 1
      },
      {
        "q": "Elemanları esnek kutu düzeniyle yan yana dizmek için hangi CSS kuralı kullanılır?",
        "options": [
          "display: flex",
          "display: block",
          "float: left"
        ],
        "correct": 0
      },
      {
        "q": "Bir nesnenin iç boşluğunu (padding) ayarlayan CSS kuralı nedir?",
        "options": [
          "margin",
          "padding",
          "border"
        ],
        "correct": 1
      },
      {
        "q": "JavaScript'te bir elemanı ID'sine göre seçmek için ne kullanılır?",
        "options": [
          "getElementById()",
          "querySelector()",
          "getElement()"
        ],
        "correct": 0
      },
      {
        "q": "JavaScript'te değişkenin değerinin sonradan değiştirilemeyeceğini belirten anahtar nedir?",
        "options": [
          "let",
          "const",
          "var"
        ],
        "correct": 1
      },
      {
        "q": "Belirli bir sayıda tekrar eden en yaygın döngü türü hangisidir?",
        "options": [
          "for",
          "if",
          "switch"
        ],
        "correct": 0
      },
      {
        "q": "Kullanıcı tıklamasını dinlemek için hangi JavaScript olay adı verilir?",
        "options": [
          "onhover",
          "click",
          "tap"
        ],
        "correct": 1
      }
    ]
  },
  {
    "lang": "SQL",
    "skipToLevel": 21,
    "questions": [
      {
        "q": "Bir tablodaki tüm sütunları tek seferde seçmek için hangi joker karakter kullanılır?",
        "options": [
          "%",
          "*",
          "#"
        ],
        "correct": 1
      },
      {
        "q": "Belirli bir koşulu sağlayan satırları listelemek için hangi anahtar kelime kullanılır?",
        "options": [
          "HAVING",
          "WHERE",
          "FILTER"
        ],
        "correct": 1
      },
      {
        "q": "Sonuçları en yüksekten en düşüğe (büyükten küçüğe) sıralamak için hangisi kullanılır?",
        "options": [
          "ASC",
          "DESC",
          "TOP"
        ],
        "correct": 1
      },
      {
        "q": "Tablodaki mükerrer (çift) kayıtları tekilleştirmek için hangi ifade kullanılır?",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "SINGLE"
        ],
        "correct": 1
      },
      {
        "q": "Puanı 80 ile 100 arasında olanları seçmek için en pratik operatör nedir?",
        "options": [
          "BETWEEN",
          "IN",
          "AMONG"
        ],
        "correct": 0
      },
      {
        "q": "Tabloya yeni satır eklemek için hangi SQL komutu kullanılır?",
        "options": [
          "ADD ROW",
          "INSERT INTO",
          "PUT"
        ],
        "correct": 1
      },
      {
        "q": "Tablodaki her bir satırı benzersiz olarak tanımlayan anahtar nedir?",
        "options": [
          "PRIMARY KEY",
          "FOREIGN KEY",
          "UNIQUE"
        ],
        "correct": 0
      },
      {
        "q": "Yalnızca her iki tabloda da karşılığı olan satırları birleştiren JOIN türü nedir?",
        "options": [
          "LEFT JOIN",
          "INNER JOIN",
          "FULL JOIN"
        ],
        "correct": 1
      },
      {
        "q": "Kategorilere göre satırları kümelemek için hangi ifade kullanılır?",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "WHERE"
        ],
        "correct": 1
      },
      {
        "q": "Bir transaction içindeki tüm adımları onaylayıp kalıcı hale getiren komut nedir?",
        "options": [
          "COMMIT",
          "ROLLBACK",
          "SAVE"
        ],
        "correct": 0
      }
    ]
  },
  {
    "lang": "Python",
    "skipToLevel": 21,
    "questions": [
      {
        "q": "Python'da ekrana çıktı basan temel fonksiyon nedir?",
        "options": [
          "echo()",
          "print()",
          "printf()"
        ],
        "correct": 1
      },
      {
        "q": "Değeri değiştirilemeyen (immutable) parantezli koleksiyon türü nedir?",
        "options": [
          "list",
          "tuple",
          "set"
        ],
        "correct": 1
      },
      {
        "q": "Listenin sonuna yeni bir eleman ekleyen metot hangisidir?",
        "options": [
          "append()",
          "add()",
          "push()"
        ],
        "correct": 0
      },
      {
        "q": "Python'da 'değilse eğer' karar yapısı hangi anahtar kelimedir?",
        "options": [
          "else if",
          "elif",
          "elseif"
        ],
        "correct": 1
      },
      {
        "q": "Python'da fonksiyon tanımlamak için hangi anahtar kelime kullanılır?",
        "options": [
          "function",
          "def",
          "fn"
        ],
        "correct": 1
      },
      {
        "q": "Bir listenin eleman sayısını veren yerleşik fonksiyon nedir?",
        "options": [
          "count()",
          "len()",
          "size()"
        ],
        "correct": 1
      },
      {
        "q": "Olası hataları yakalamak için hangi blok kullanılır?",
        "options": [
          "catch",
          "except",
          "handle"
        ],
        "correct": 1
      },
      {
        "q": "Python sınıfında nesnenin kendisini temsil eden ilk parametre nedir?",
        "options": [
          "this",
          "self",
          "me"
        ],
        "correct": 1
      },
      {
        "q": "Tek satırlık isimsiz (anonim) fonksiyon tanımlamak için ne kullanılır?",
        "options": [
          "lambda",
          "inline",
          "def"
        ],
        "correct": 0
      },
      {
        "q": "Nesne yaratıldığında otomatik çalışan kurucu metodun adı nedir?",
        "options": [
          "__init__",
          "constructor",
          "start"
        ],
        "correct": 0
      }
    ]
  },
  {
    "lang": "CSharp",
    "skipToLevel": 21,
    "questions": [
      {
        "q": "C#'ta konsola yeni satır ekleyerek çıktı yazan metot nedir?",
        "options": [
          "Console.Write",
          "Console.WriteLine",
          "Print.Line"
        ],
        "correct": 1
      },
      {
        "q": "C#'ta her kod satırının sonuna zorunlu olarak ne konulur?",
        "options": [
          "; (Noktalı virgül)",
          ". (Nokta)",
          ": (İki nokta)"
        ],
        "correct": 0
      },
      {
        "q": "Geriye değer döndürmeyen metotların dönüş tipi nedir?",
        "options": [
          "null",
          "void",
          "empty"
        ],
        "correct": 1
      },
      {
        "q": "Dinamik olarak büyüyebilen generic koleksiyon türü hangisidir?",
        "options": [
          "int[] array",
          "List<T>",
          "fixed array"
        ],
        "correct": 1
      },
      {
        "q": "Bir sınıftan yeni bir nesne örneği üretmek için hangi anahtar kullanılır?",
        "options": [
          "new",
          "create",
          "make"
        ],
        "correct": 0
      },
      {
        "q": "C#'ta bir sınıftan miras almak için sınıf adının yanına ne konur?",
        "options": [
          ": (İki nokta)",
          "extends",
          "inherits"
        ],
        "correct": 0
      },
      {
        "q": "Türemiş sınıfta bir ata sınıf metodunu ezmek için hangi kelime kullanılır?",
        "options": [
          "override",
          "new",
          "virtual"
        ],
        "correct": 0
      },
      {
        "q": "Koleksiyonlar üzerinde SQL benzeri sorgular yapmayı sağlayan teknoloji nedir?",
        "options": [
          "LINQ",
          "ADO.NET",
          "ORM"
        ],
        "correct": 0
      },
      {
        "q": "Hata olsa da olmasa da en son mutlaka çalışan blok hangisidir?",
        "options": [
          "finally",
          "always",
          "end"
        ],
        "correct": 0
      },
      {
        "q": "Değeri derleme anında sabitlenen ve değiştirilemeyen anahtar nedir?",
        "options": [
          "const",
          "readonly",
          "static"
        ],
        "correct": 0
      }
    ]
  },
  {
    "lang": "CPP",
    "skipToLevel": 21,
    "questions": [
      {
        "q": "C++'ta ekrana çıktı akışı sağlayan standart nesne nedir?",
        "options": [
          "std::cin",
          "std::cout",
          "printf"
        ],
        "correct": 1
      },
      {
        "q": "Bir değişkenin bellekte kapladığı byte sayısını veren operatör nedir?",
        "options": [
          "sizeof()",
          "length()",
          "size()"
        ],
        "correct": 0
      },
      {
        "q": "Bir değişkenin bellek adresini almak için hangi sembol kullanılır?",
        "options": [
          "*",
          "& (Adres)",
          "%"
        ],
        "correct": 1
      },
      {
        "q": "Pointer'ın işaret ettiği adresteki gerçek veriye ulaşmaya ne denir?",
        "options": [
          "Dereferencing (*)",
          "Indexing",
          "Referencing"
        ],
        "correct": 0
      },
      {
        "q": "Heap bellekten dinamik olarak yer almak için hangi komut kullanılır?",
        "options": [
          "new",
          "malloc",
          "alloc"
        ],
        "correct": 0
      },
      {
        "q": "new ile ayrılan tekil bir bellek alanını iade eden komut nedir?",
        "options": [
          "free",
          "delete",
          "clear"
        ],
        "correct": 1
      },
      {
        "q": "C++ STL dinamik dizisi hangisidir?",
        "options": [
          "std::vector",
          "std::array",
          "std::list"
        ],
        "correct": 0
      },
      {
        "q": "Sınıf dışından erişimi tamamen engelleyen anahtar nedir?",
        "options": [
          "private",
          "protected",
          "hidden"
        ],
        "correct": 0
      },
      {
        "q": "Yıkıcı (Destructor) metodun önünde hangi sembol yer alır?",
        "options": [
          "~ (Tilde)",
          "!",
          "#"
        ],
        "correct": 0
      },
      {
        "q": "Kapsam dışına çıkıldığında belleği otomatik temizleyen akıllı işaretçi nedir?",
        "options": [
          "std::unique_ptr",
          "raw pointer",
          "void*"
        ],
        "correct": 0
      }
    ]
  }
];

const courseDataByLang = {
  html: [
  {
    "id": 1,
    "lang": "HTML",
    "unit": 1,
    "title": "1. İlk Etiketler (Başlık/Paragraf)",
    "desc": "Web sayfasının temel metin yapı taşlarını öğren.",
    "theory": "HTML web sayfalarının iskeletidir. Başlıklar <h1> ile <h6> arasında önem sırasına göre dizilir. Paragraflar ise <p> etiketi ile yazılır.",
    "theoryCode": "<h1>Ana Başlık</h1>\n<p>Bu bir paragraf metnidir.</p>",
    "quiz": {
      "question": "En büyük ve en önemli başlık etiketi hangisidir?",
      "options": [
        "<h6>",
        "<h1>",
        "<p>"
      ],
      "correctIndex": 1
    },
    "initialCode": "<!-- Başlık ve paragraf ekleyin -->\n<h1>Hoş Geldiniz</h1>\n<p>COD+ ile kodlamaya ilk adım.</p>",
    "mustInclude": [
      "<h1",
      "<p"
    ],
    "errorMsg": "Lütfen en az bir <h1> başlığı ve bir <p> paragrafı ekleyin.",
    "isMiniProject": false
  },
  {
    "id": 2,
    "lang": "HTML",
    "unit": 1,
    "title": "2. Metin Formatlama",
    "desc": "Kalın, eğik ve altı çizili metinler.",
    "theory": "Metinleri vurgulamak için <b> veya <strong> (kalın), <i> veya <em> (eğik), <u> (altı çizili) etiketleri kullanılır.",
    "theoryCode": "<p>Bu bir <b>kalın</b> ve <i>eğik</i> metindir.</p>",
    "quiz": {
      "question": "Bir metni kalın (bold) yapmak için hangi etiket kullanılır?",
      "options": [
        "<b>",
        "<i>",
        "<u>"
      ],
      "correctIndex": 0
    },
    "initialCode": "<p>Önemli kelimeleri <b>kalın</b> yapalım.</p>",
    "mustInclude": [
      "<b",
      "</b>"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (<b, </b>) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 3,
    "lang": "HTML",
    "unit": 1,
    "title": "3. Listeler Oluşturma",
    "desc": "Sıralı ve sırasız listeler.",
    "theory": "Maddeler halinde veri sunmak için <ul> (sırasız, noktalı) veya <ol> (sıralı, numaralı) listeler kullanılır. Her madde <li> içine yazılır.",
    "theoryCode": "<ul>\n  <li>HTML5</li>\n  <li>CSS3</li>\n</ul>",
    "quiz": {
      "question": "Sırasız (noktalı) liste oluşturmak için hangi etiket kullanılır?",
      "options": [
        "<ul>",
        "<ol>",
        "<li>"
      ],
      "correctIndex": 0
    },
    "initialCode": "<ul>\n  <li>Öğe 1</li>\n</ul>",
    "mustInclude": [
      "<ul",
      "<li"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (<ul, <li) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 4,
    "lang": "HTML",
    "unit": 1,
    "title": "4. Bağlantılar (Linkler)",
    "desc": "Sayfalar arası köprüler kurun.",
    "theory": "Başka sayfalara veya sitelere köprü oluşturmak için <a> (anchor) etiketi kullanılır. Hedef adres href niteliği ile belirtilir.",
    "theoryCode": "<a href='https://codplus.edu'>COD+ Ana Sayfa</a>",
    "quiz": {
      "question": "Bağlantının hedef URL adresini belirtmek için hangi nitelik kullanılır?",
      "options": [
        "src",
        "href",
        "target"
      ],
      "correctIndex": 1
    },
    "initialCode": "<a href='https://example.com'>Tıkla ve Git</a>",
    "mustInclude": [
      "<a",
      "href="
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (<a, href=) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 5,
    "lang": "HTML",
    "unit": 1,
    "title": "5. Görseller ve Alt Metin",
    "desc": "Sayfana resimler ekle.",
    "theory": "Resim göstermek için <img> etiketi kullanılır. Kapanış etiketi yoktur. src ile resim yolu, alt ile resim yüklenemezse görünecek açıklama belirtilir.",
    "theoryCode": "<img src='logo.png' alt='Platform Logosu'>",
    "quiz": {
      "question": "Resmin dosya yolunu belirten nitelik hangisidir?",
      "options": [
        "alt",
        "href",
        "src"
      ],
      "correctIndex": 2
    },
    "initialCode": "<img src='https://via.placeholder.com/150' alt='Örnek Görsel'>",
    "mustInclude": [
      "<img",
      "src="
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (<img, src=) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 6,
    "lang": "HTML",
    "unit": 1,
    "title": "6. Kapsayıcılar: Div ve Span",
    "desc": "Öğeleri blok ve satır içi gruplayın.",
    "theory": "<div> blok seviyesinde bir kapsayıcıdır ve tüm satırı kaplar. <span> ise satır içi kapsayıcıdır, sadece içeriği kadar yer tutar.",
    "theoryCode": "<div>\n  <span>Vurgulanan Kelime</span>\n</div>",
    "quiz": {
      "question": "Satır içi (inline) gruplama etiketi hangisidir?",
      "options": [
        "<span>",
        "<div>",
        "<section>"
      ],
      "correctIndex": 0
    },
    "initialCode": "<div>\n  <p>Kart İçeriği</p>\n</div>",
    "mustInclude": [
      "<div",
      "</div>"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (<div, </div>) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 7,
    "lang": "HTML",
    "unit": 1,
    "title": "7. Semantik Etiketler",
    "desc": "Arama motoru ve erişilebilirlik dostu yapı.",
    "theory": "Sadece div kullanmak yerine <header> (üst alan), <nav> (menü), <main> (ana içerik) ve <footer> (alt bilgi) gibi anlamsal etiketler kullanılır.",
    "theoryCode": "<header>\n  <nav>Menü</nav>\n</header>",
    "quiz": {
      "question": "Sayfanın navigasyon menüsünü hangi etiketle sarmak semantik açıdan doğrudur?",
      "options": [
        "<div>",
        "<nav>",
        "<aside>"
      ],
      "correctIndex": 1
    },
    "initialCode": "<header>\n  <h1>Site Başlığı</h1>\n</header>",
    "mustInclude": [
      "<header",
      "</header>"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (<header, </header>) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 8,
    "lang": "HTML",
    "unit": 1,
    "title": "8. Tablo Oluşturma",
    "desc": "Verileri satır ve sütunlara böl.",
    "theory": "Tablolar <table> etiketi ile başlar. Satırlar <tr>, başlık hücreleri <th>, veri hücreleri ise <td> ile tanımlanır.",
    "theoryCode": "<table border='1'>\n  <tr><th>Ad</th><th>Puan</th></tr>\n  <tr><td>Ali</td><td>95</td></tr>\n</table>",
    "quiz": {
      "question": "Tabloda yeni bir satır oluşturmak için hangi etiket kullanılır?",
      "options": [
        "<td>",
        "<th>",
        "<tr>"
      ],
      "correctIndex": 2
    },
    "initialCode": "<table>\n  <tr><td>Hücre 1</td><td>Hücre 2</td></tr>\n</table>",
    "mustInclude": [
      "<table",
      "<tr",
      "<td"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (<table, <tr, <td) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 9,
    "lang": "HTML",
    "unit": 1,
    "title": "9. Formlar ve Kullanıcı Girişi",
    "desc": "Kullanıcıdan veri toplama.",
    "theory": "Kullanıcıdan veri almak için <form> kullanılır. <input> etiketinin type özelliğine 'text', 'password', 'email' veya 'submit' yazılır.",
    "theoryCode": "<form>\n  <input type='text' placeholder='Adınız'>\n  <button type='submit'>Gönder</button>\n</form>",
    "quiz": {
      "question": "Kullanıcıdan şifre almak için hangi input tipi kullanılır?",
      "options": [
        "type='text'",
        "type='password'",
        "type='hidden'"
      ],
      "correctIndex": 1
    },
    "initialCode": "<form>\n  <input type='text' placeholder='Kullanıcı Adı'>\n</form>",
    "mustInclude": [
      "<form",
      "<input"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (<form, <input) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 10,
    "lang": "HTML",
    "unit": 1,
    "title": "10. MİNİ PROJE: Kişisel Portfolyo Kartı",
    "desc": "Öğrendiğin tüm HTML etiketlerini birleştir.",
    "theory": "Tebrikler 1. Bölümün sonuna geldin! Şimdi başlık, paragraf, liste, görsel, bağlantı ve semantik etiketleri bir araya getirerek bir profil kartı inşa et.",
    "theoryCode": "<div class='card'>\n  <h1>Deniz Kaya</h1>\n  <p>Yazılım Geliştirici</p>\n</div>",
    "quiz": {
      "question": "Bir HTML dokümanının karakter kodlamasını UTF-8 yapan etiket hangisidir?",
      "options": [
        "<meta charset='UTF-8'>",
        "<lang charset='tr'>",
        "<encoding type='utf8'>"
      ],
      "correctIndex": 0
    },
    "initialCode": "<div class='profile-card'>\n  <h1>Adınız Soyadınız</h1>\n  <p>Hakkımda bilgisi buraya gelecek.</p>\n  <a href='#'>İletişim</a>\n</div>",
    "mustInclude": [
      "<h1",
      "<p",
      "<a",
      "<div"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (<h1, <p, <a, <div) yer aldığından emin olun.",
    "isMiniProject": true
  },
  {
    "id": 11,
    "lang": "HTML",
    "unit": 2,
    "title": "11. CSS'e Giriş & Renkler",
    "desc": "Stil kuralları ve renk paletleri.",
    "theory": "CSS HTML elemanlarını görselleştirir. color metin rengini, background-color arka planı belirler.",
    "theoryCode": "body { background-color: #0f172a; color: #f8fafc; }",
    "quiz": {
      "question": "Metin rengini değiştirmek için hangi CSS kuralı kullanılır?",
      "options": [
        "text-color",
        "color",
        "font-color"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  h1 { color: #3b82f6; }\n</style>\n<h1>Mavi Başlık</h1>",
    "mustInclude": [
      "color:"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (color:) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 12,
    "lang": "HTML",
    "unit": 2,
    "title": "12. Fontlar & Tipografi",
    "desc": "Yazı tipleri ve boyutlandırma.",
    "theory": "font-size metin boyutunu (px, rem), font-weight kalınlığını, font-family yazı tipini belirler.",
    "theoryCode": "p { font-size: 16px; font-weight: bold; }",
    "quiz": {
      "question": "Yazının puntosunu (boyutunu) ayarlayan kural hangisidir?",
      "options": [
        "font-size",
        "text-size",
        "font-height"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  p { font-size: 18px; }\n</style>\n<p>Büyük fontlu yazı.</p>",
    "mustInclude": [
      "font-size"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (font-size) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 13,
    "lang": "HTML",
    "unit": 2,
    "title": "13. Box Model: Margin & Padding",
    "desc": "Elemanların iç ve dış boşlukları.",
    "theory": "Kutu modelinde padding içeriğin iç boşluğudur, margin ise elemanın dışındaki boşluktur.",
    "theoryCode": ".box { padding: 20px; margin: 15px; border: 1px solid #ccc; }",
    "quiz": {
      "question": "Bir nesnenin kenarlık ile içerik arasındaki iç boşluğunu ne ayarlar?",
      "options": [
        "margin",
        "padding",
        "border"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  .kutu { padding: 15px; margin: 10px; background: #eee; }\n</style>\n<div class='kutu'>Kutu</div>",
    "mustInclude": [
      "padding"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (padding) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 14,
    "lang": "HTML",
    "unit": 2,
    "title": "14. Kenarlıklar (Borders & Radius)",
    "desc": "Köşeleri yuvarlatma ve çerçeveler.",
    "theory": "border çerçeve çizer (1px solid #333). border-radius köşeleri yuvarlatır (12px).",
    "theoryCode": ".kart { border: 2px solid #38bdf8; border-radius: 12px; }",
    "quiz": {
      "question": "Köşeleri yuvarlaklaştıran CSS kuralı hangisidir?",
      "options": [
        "corner-radius",
        "border-radius",
        "box-round"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  .kart { border: 1px solid #38bdf8; border-radius: 10px; padding: 10px; }\n</style>\n<div class='kart'>Kart</div>",
    "mustInclude": [
      "border-radius"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (border-radius) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 15,
    "lang": "HTML",
    "unit": 2,
    "title": "15. Flexbox: Hizalama & Düzen",
    "desc": "Modern esnek kutu mimarisi.",
    "theory": "display: flex elemanları yan yana dizer. justify-content yatayda, align-items dikeyde hizalar.",
    "theoryCode": ".container { display: flex; justify-content: space-between; }",
    "quiz": {
      "question": "Elemanları esnek düzenle yan yana sıralamak için hangi display değeri verilir?",
      "options": [
        "display: block",
        "display: flex",
        "display: inline"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  .nav { display: flex; gap: 10px; }\n</style>\n<div class='nav'><span>A</span><span>B</span></div>",
    "mustInclude": [
      "display: flex",
      "display:flex"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (display: flex, display:flex) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 16,
    "lang": "HTML",
    "unit": 2,
    "title": "16. CSS Grid Mimarisi",
    "desc": "İki boyutlu ızgara sistemi.",
    "theory": "display: grid ile 2 boyutlu satır ve sütunlar oluşturulur. grid-template-columns sütun genişliğini belirler.",
    "theoryCode": ".grid { display: grid; grid-template-columns: 1fr 1fr; }",
    "quiz": {
      "question": "İki boyutlu satır ve sütun ızgarası için hangi display türü kullanılır?",
      "options": [
        "grid",
        "flex",
        "table"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .grid { display: grid; gap: 10px; }\n</style>\n<div class='grid'><div>1</div><div>2</div></div>",
    "mustInclude": [
      "grid"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (grid) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 17,
    "lang": "HTML",
    "unit": 2,
    "title": "17. Konumlandırma (Position)",
    "desc": "Relative, absolute ve fixed.",
    "theory": "position: relative kendi yerine göre, absolute en yakın konumlu atasına göre, fixed ise ekrana sabitlenir.",
    "theoryCode": ".menu { position: fixed; top: 0; left: 0; width: 100%; }",
    "quiz": {
      "question": "Sayfa kaydırılsa dahi ekranda hep sabit kalan konum değeri nedir?",
      "options": [
        "relative",
        "absolute",
        "fixed"
      ],
      "correctIndex": 2
    },
    "initialCode": "<style>\n  .sabit { position: relative; }\n</style>\n<div class='sabit'>Konumlu Kutu</div>",
    "mustInclude": [
      "position:"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (position:) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 18,
    "lang": "HTML",
    "unit": 2,
    "title": "18. Hover & Durum Efektleri",
    "desc": "Fare etkileşimleri ve transition.",
    "theory": ":hover ile fare üzerine geldiğindeki stil belirlenir. transition yumuşak geçiş sağlar.",
    "theoryCode": "button:hover { background-color: #2563eb; transition: 0.3s; }",
    "quiz": {
      "question": "Fareyle üzerine gelindiğinde tetiklenen pseudo-class hangisidir?",
      "options": [
        ":active",
        ":hover",
        ":focus"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  button:hover { background: #3b82f6; }\n</style>\n<button>Üzerime Gel</button>",
    "mustInclude": [
      ":hover"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (:hover) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 19,
    "lang": "HTML",
    "unit": 2,
    "title": "19. Responsive Tasarım & Media Queries",
    "desc": "Mobil ve tablet uyumluluğu.",
    "theory": "@media screen and (max-width: 768px) ekran daraldığında özel stiller uygular.",
    "theoryCode": "@media (max-width: 600px) { body { font-size: 14px; } }",
    "quiz": {
      "question": "Ekran boyutuna göre farklı stiller yazmak için hangisi kullanılır?",
      "options": [
        "@import",
        "@keyframes",
        "@media"
      ],
      "correctIndex": 2
    },
    "initialCode": "<style>\n  @media (max-width: 600px) { .kutu { width: 100%; } }\n</style>",
    "mustInclude": [
      "@media"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (@media) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 20,
    "lang": "HTML",
    "unit": 2,
    "title": "20. MİNİ PROJE: Modern Fiyatlandırma Kartı",
    "desc": "Flexbox, gölgeler ve stil uyumu.",
    "theory": "Tebrikler! Şimdi modern bir SaaS fiyatlandırma kartı tasarlayarak CSS yetkinliğini göster.",
    "theoryCode": ".kart { display:flex; flex-direction:column; padding:20px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.1); }",
    "quiz": {
      "question": "Kutulara derinlik (gölge) kazandırmak için hangi CSS kuralı kullanılır?",
      "options": [
        "box-shadow",
        "text-shadow",
        "filter-shadow"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .fiyat-karti { padding: 20px; border-radius: 12px; border: 1px solid #38bdf8; display: flex; flex-direction: column; }\n</style>\n<div class='fiyat-karti'>\n  <h3>Pro Plan</h3>\n  <p>99 TL / ay</p>\n</div>",
    "mustInclude": [
      "padding",
      "border-radius",
      "display: flex",
      "display:flex"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (padding, border-radius, display: flex, display:flex) yer aldığından emin olun.",
    "isMiniProject": true
  },
  {
    "id": 21,
    "lang": "HTML",
    "unit": 3,
    "title": "21. Değişkenler: let, const, var",
    "desc": "Hafızada veri saklama.",
    "theory": "Değişkenler verileri hafızada tutar. const değiştirilemeyen sabitler, let ise değişebilir veriler için kullanılır.",
    "theoryCode": "const siteAdi = 'COD+';\nlet kullaniciPuan = 100;",
    "quiz": {
      "question": "Değeri sonradan değiştirilemeyecek sabit bir değişken tanımlamak için ne kullanılır?",
      "options": [
        "let",
        "var",
        "const"
      ],
      "correctIndex": 2
    },
    "initialCode": "<script>\n  const ad = 'Deniz';\n  console.log(ad);\n</script>",
    "mustInclude": [
      "const",
      "let"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (const, let) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 22,
    "lang": "HTML",
    "unit": 3,
    "title": "22. Veri Tipleri & Konsol Çıktısı",
    "desc": "String, Number, Boolean ve console.log.",
    "theory": "console.log() geliştirici konsoluna çıktı yazar. Metinler string ('merhaba'), sayılar number (42), doğru/yanlış boolean (true/false) tipindedir.",
    "theoryCode": "console.log('Kullanıcı XP:', 350);",
    "quiz": {
      "question": "Tarayıcı geliştirici konsoluna mesaj yazdırmak için hangi komut kullanılır?",
      "options": [
        "print()",
        "console.log()",
        "document.write()"
      ],
      "correctIndex": 1
    },
    "initialCode": "<script>\n  console.log('Merhaba Dünya!');\n</script>",
    "mustInclude": [
      "console.log"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (console.log) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 23,
    "lang": "HTML",
    "unit": 3,
    "title": "23. Fonksiyonlar (Functions)",
    "desc": "Tekrar kullanılabilir kod blokları.",
    "theory": "function anahtar kelimesi ile tekrar tekrar çağrılabilecek fonksiyon blokları tanımlanır.",
    "theoryCode": "function topla(a, b) { return a + b; }",
    "quiz": {
      "question": "JavaScript'te fonksiyon tanımlamak için hangi anahtar kelime kullanılır?",
      "options": [
        "def",
        "function",
        "fn"
      ],
      "correctIndex": 1
    },
    "initialCode": "<script>\n  function selamla(isim) {\n    return 'Merhaba ' + isim;\n  }\n</script>",
    "mustInclude": [
      "function"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (function) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 24,
    "lang": "HTML",
    "unit": 3,
    "title": "24. Koşullu Durumlar: if / else",
    "desc": "Karar verme mekanizmaları.",
    "theory": "if şart sağlanırsa kod bloğu çalışır, sağlanmazsa else bloğu devreye girer.",
    "theoryCode": "if (puan >= 50) { console.log('Geçti'); } else { console.log('Kaldı'); }",
    "quiz": {
      "question": "Şart sağlanmadığında çalışacak alternatif blok hangisidir?",
      "options": [
        "else",
        "then",
        "otherwise"
      ],
      "correctIndex": 0
    },
    "initialCode": "<script>\n  let puan = 75;\n  if (puan >= 50) {\n    console.log('Başarılı');\n  }\n</script>",
    "mustInclude": [
      "if"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (if) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 25,
    "lang": "HTML",
    "unit": 3,
    "title": "25. Diziler (Arrays)",
    "desc": "Birden çok veriyi tek listede tutma.",
    "theory": "Diziler köşeli parantez [] ile tanımlanır. İndeksler 0'dan başlar.",
    "theoryCode": "const diller = ['HTML', 'CSS', 'JavaScript'];\nconsole.log(diller[0]);",
    "quiz": {
      "question": "Dizinin ilk elemanına ulaşmak için hangi indeks kullanılır?",
      "options": [
        "1",
        "0",
        "-1"
      ],
      "correctIndex": 1
    },
    "initialCode": "<script>\n  const liste = ['Elma', 'Muz'];\n  console.log(liste[0]);\n</script>",
    "mustInclude": [
      "["
    ],
    "errorMsg": "Lütfen köşeli parantez [] kullanarak bir dizi oluşturun.",
    "isMiniProject": false
  },
  {
    "id": 26,
    "lang": "HTML",
    "unit": 3,
    "title": "26. Döngüler: for ve while",
    "desc": "İşlemleri otomatik tekrarla.",
    "theory": "for (let i = 0; i < 5; i++) belirli sayıda tekrarlar. while ise koşul sağlandığı sürece döner.",
    "theoryCode": "for (let i = 1; i <= 3; i++) { console.log(i); }",
    "quiz": {
      "question": "Belirli bir sayıda dönen en yaygın döngü türü hangisidir?",
      "options": [
        "for",
        "switch",
        "if"
      ],
      "correctIndex": 0
    },
    "initialCode": "<script>\n  for (let i = 0; i < 3; i++) {\n    console.log(i);\n  }\n</script>",
    "mustInclude": [
      "for"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (for) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 27,
    "lang": "HTML",
    "unit": 3,
    "title": "27. DOM: document.getElementById",
    "desc": "HTML elemanını yakalama ve değiştirme.",
    "theory": "document.getElementById('id') ile sayfadaki bir HTML nesnesi seçilir ve .innerText ile yazısı değiştirilebilir.",
    "theoryCode": "document.getElementById('baslik').innerText = 'Yeni Başlık';",
    "quiz": {
      "question": "ID'si bilinen bir HTML elemanını seçmek için hangi metot kullanılır?",
      "options": [
        "getElementByName",
        "getElementById",
        "selectId"
      ],
      "correctIndex": 1
    },
    "initialCode": "<h1 id='metin'>Eski Yazı</h1>\n<script>\n  document.getElementById('metin').innerText = 'Güncellendi!';\n</script>",
    "mustInclude": [
      "document.getElementById"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (document.getElementById) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 28,
    "lang": "HTML",
    "unit": 3,
    "title": "28. Olaylar (Events): addEventListener",
    "desc": "Tıklamaları dinle.",
    "theory": "Elemanlara click, mouseover gibi olaylar eklemek için element.addEventListener('click', fn) kullanılır.",
    "theoryCode": "btn.addEventListener('click', () => alert('Tıklandı!'));",
    "quiz": {
      "question": "Tıklama olayını dinlemek için hangi olay adı verilir?",
      "options": [
        "hover",
        "click",
        "press"
      ],
      "correctIndex": 1
    },
    "initialCode": "<button id='btn'>Tıkla</button>\n<script>\n  document.getElementById('btn').addEventListener('click', function() { alert('Başarılı!'); });\n</script>",
    "mustInclude": [
      "addEventListener",
      "onclick"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (addEventListener, onclick) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 29,
    "lang": "HTML",
    "unit": 3,
    "title": "29. Nesneler (Objects)",
    "desc": "Key-value veri yapıları.",
    "theory": "Nesneler süslü parantez {} ile tanımlanır ve özellikleri anahtar-değer çiftleri halinde tutar.",
    "theoryCode": "const kisi = { ad: 'Burak', puan: 95 };\nconsole.log(kisi.ad);",
    "quiz": {
      "question": "Bir nesnenin içindeki 'puan' değerine ulaşmak için hangisi yazılır?",
      "options": [
        "kisi.puan",
        "kisi->puan",
        "kisi(puan)"
      ],
      "correctIndex": 0
    },
    "initialCode": "<script>\n  const user = { name: 'Deniz', score: 100 };\n  console.log(user.name);\n</script>",
    "mustInclude": [
      "{",
      "}"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin ({, }) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 30,
    "lang": "HTML",
    "unit": 3,
    "title": "30. MİNİ PROJE: Etkileşimli To-Do Listesi",
    "desc": "Tüm Front-End yeteneklerini sergile.",
    "theory": "Tebrikler! HTML ile yapıyı kurdun, CSS ile şekillendirdin. Şimdi JS ile butona basıldığında listeye yeni eleman ekleyen bir uygulama geliştir.",
    "theoryCode": "function gorevEkle() {\n  const li = document.createElement('li');\n  li.innerText = 'Yeni Görev';\n  document.getElementById('liste').appendChild(li);\n}",
    "quiz": {
      "question": "JavaScript'te sayfaya yeni bir HTML elemanı düğümü oluşturmak için hangi metot kullanılır?",
      "options": [
        "document.createElement()",
        "document.newElement()",
        "document.buildNode()"
      ],
      "correctIndex": 0
    },
    "initialCode": "<input id='inp' type='text' placeholder='Görev yaz'>\n<button id='btn' onclick='ekle()'>Ekle</button>\n<ul id='liste'></ul>\n<script>\nfunction ekle() {\n  const val = document.getElementById('inp').value;\n  if(val) {\n    document.getElementById('liste').innerHTML += '<li>' + val + '</li>';\n    document.getElementById('inp').value = '';\n  }\n}\n</script>",
    "mustInclude": [
      "function",
      "document.getElementById"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (function, document.getElementById) yer aldığından emin olun.",
    "isMiniProject": true
  }
],
  sql: [
  {
    "id": 1,
    "lang": "SQL",
    "unit": 1,
    "title": "1. SELECT & Temel Çekim",
    "desc": "Tablodan sütunları sorgulama.",
    "theory": "SQL'de tablodan veri okumak için SELECT ve FROM ifadeleri kullanılır.",
    "theoryCode": "SELECT ad, soyad FROM kullanicilar;",
    "quiz": {
      "question": "Tüm sütunları getiren joker karakter nedir?",
      "options": [
        "%",
        "*",
        "#"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT * FROM ogrenciler;",
    "mustInclude": [
      "SELECT",
      "FROM"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (SELECT, FROM) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 2,
    "lang": "SQL",
    "unit": 1,
    "title": "2. WHERE ile Filtreleme",
    "desc": "Koşullu satır süzme.",
    "theory": "WHERE şartı sağlayan satırları filtreler.",
    "theoryCode": "SELECT * FROM ogrenciler WHERE puan >= 90;",
    "quiz": {
      "question": "Kayıtları filtrelemek için hangi anahtar kelime kullanılır?",
      "options": [
        "FILTER",
        "WHERE",
        "HAVING"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT * FROM ogrenciler WHERE puan >= 85;",
    "mustInclude": [
      "WHERE"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (WHERE) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 3,
    "lang": "SQL",
    "unit": 1,
    "title": "3. AND / OR Mantıksal Operatörler",
    "desc": "Birden çok şartı bağlama.",
    "theory": "İki şartın da sağlanması için AND, birinin sağlanması için OR kullanılır.",
    "theoryCode": "SELECT * FROM ogrenciler WHERE dil = 'SQL' AND puan > 80;",
    "quiz": {
      "question": "İki şartın da doğru olmasını isteyen bağlaç hangisidir?",
      "options": [
        "AND",
        "OR",
        "NOT"
      ],
      "correctIndex": 0
    },
    "initialCode": "SELECT * FROM ogrenciler WHERE dil = 'SQL' AND puan >= 80;",
    "mustInclude": [
      "AND"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (AND) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 4,
    "lang": "SQL",
    "unit": 1,
    "title": "4. ORDER BY ile Sıralama",
    "desc": "Sonuçları büyükten küçüğe dizme.",
    "theory": "ORDER BY sıralar. ASC küçükten büyüğe, DESC büyükten küçüğedir.",
    "theoryCode": "SELECT * FROM ogrenciler ORDER BY puan DESC;",
    "quiz": {
      "question": "En yüksek puandan en düşüğe sıralamak için hangisi yazılır?",
      "options": [
        "ASC",
        "DESC",
        "TOP"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT * FROM ogrenciler ORDER BY puan DESC;",
    "mustInclude": [
      "ORDER BY"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (ORDER BY) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 5,
    "lang": "SQL",
    "unit": 1,
    "title": "5. DISTINCT ile Tekilleştirme",
    "desc": "Aynı kayıtları eleme.",
    "theory": "SELECT DISTINCT tekrar eden değerleri tekilleştirir.",
    "theoryCode": "SELECT DISTINCT sehir FROM ogrenciler;",
    "quiz": {
      "question": "Mükerrer verileri eleyen komut nedir?",
      "options": [
        "UNIQUE",
        "DISTINCT",
        "FILTER"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT DISTINCT dil FROM ogrenciler;",
    "mustInclude": [
      "DISTINCT"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (DISTINCT) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 6,
    "lang": "SQL",
    "unit": 1,
    "title": "6. LIMIT & OFFSET ile Sayfalama",
    "desc": "Dönen satır adedini sınırlama.",
    "theory": "LIMIT n en fazla n kayıt döndürür.",
    "theoryCode": "SELECT * FROM ogrenciler LIMIT 5;",
    "quiz": {
      "question": "İlk 5 kaydı almak için ne yazılır?",
      "options": [
        "TOP 5",
        "LIMIT 5",
        "COUNT 5"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT * FROM ogrenciler LIMIT 5;",
    "mustInclude": [
      "LIMIT"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (LIMIT) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 7,
    "lang": "SQL",
    "unit": 1,
    "title": "7. LIKE ile Desen Arama",
    "desc": "Metin içinde arama.",
    "theory": "LIKE ile % ve _ joker karakterleri kullanılır.",
    "theoryCode": "SELECT * FROM ogrenciler WHERE ad LIKE 'A%';",
    "quiz": {
      "question": "'B' ile başlayanları bulmak için hangi desen yazılır?",
      "options": [
        "'B*'",
        "'B%'",
        "'%B'"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT * FROM ogrenciler WHERE ad LIKE 'A%';",
    "mustInclude": [
      "LIKE"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (LIKE) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 8,
    "lang": "SQL",
    "unit": 1,
    "title": "8. IN ve BETWEEN Operatörleri",
    "desc": "Aralık ve küme filtreleme.",
    "theory": "BETWEEN a AND b aralığı, IN ('x','y') listeyi temsil eder.",
    "theoryCode": "SELECT * FROM ogrenciler WHERE puan BETWEEN 70 AND 100;",
    "quiz": {
      "question": "70 ile 100 puan arasındakileri getiren operatör nedir?",
      "options": [
        "BETWEEN",
        "IN",
        "RANGE"
      ],
      "correctIndex": 0
    },
    "initialCode": "SELECT * FROM ogrenciler WHERE puan BETWEEN 80 AND 100;",
    "mustInclude": [
      "BETWEEN"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (BETWEEN) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 9,
    "lang": "SQL",
    "unit": 1,
    "title": "9. Toplama Fonksiyonları (COUNT, AVG)",
    "desc": "Satır sayısı ve ortalama.",
    "theory": "COUNT() satır sayısını, AVG() ortalama değeri hesaplar.",
    "theoryCode": "SELECT COUNT(*), AVG(puan) FROM ogrenciler;",
    "quiz": {
      "question": "Toplam satır sayısını veren fonksiyon nedir?",
      "options": [
        "SUM()",
        "COUNT()",
        "TOTAL()"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT COUNT(*) AS toplam, AVG(puan) AS ortalama FROM ogrenciler;",
    "mustInclude": [
      "COUNT"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (COUNT) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 10,
    "lang": "SQL",
    "unit": 1,
    "title": "10. MİNİ PROJE: Kütüphane Kitap Sorgulayıcı",
    "desc": "SELECT ve filtreleri birleştir.",
    "theory": "Tebrikler! 1. Bölüm tamamlandı. Şimdi SELECT, WHERE ve ORDER BY içeren tam rapor sorgusu yaz.",
    "theoryCode": "SELECT ad, puan FROM ogrenciler WHERE puan >= 85 ORDER BY puan DESC;",
    "quiz": {
      "question": "WHERE ve ORDER BY birlikte kullanıldığında hangisi önce gelir?",
      "options": [
        "WHERE önce gelir",
        "ORDER BY önce gelir",
        "Sıra fark etmez"
      ],
      "correctIndex": 0
    },
    "initialCode": "SELECT id, ad, dil, puan FROM ogrenciler WHERE puan >= 80 ORDER BY puan DESC LIMIT 5;",
    "mustInclude": [
      "SELECT",
      "FROM",
      "WHERE",
      "ORDER BY"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (SELECT, FROM, WHERE, ORDER BY) yer aldığından emin olun.",
    "isMiniProject": true
  },
  {
    "id": 11,
    "lang": "SQL",
    "unit": 2,
    "title": "11. CREATE TABLE & Tipler",
    "desc": "Yeni tablo yapısı oluşturma.",
    "theory": "CREATE TABLE ile tablo tanımlanır. VARCHAR metin, INT tam sayı tutar.",
    "theoryCode": "CREATE TABLE kurslar (id INT, ad VARCHAR(50));",
    "quiz": {
      "question": "Metin saklamak için en yaygın SQL veri tipi hangisidir?",
      "options": [
        "INT",
        "VARCHAR",
        "BOOLEAN"
      ],
      "correctIndex": 1
    },
    "initialCode": "CREATE TABLE kurslar (id INT, ad VARCHAR(50));",
    "mustInclude": [
      "CREATE TABLE"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (CREATE TABLE) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 12,
    "lang": "SQL",
    "unit": 2,
    "title": "12. PRIMARY KEY (Birincil Anahtar)",
    "desc": "Satırların benzersiz kimliği.",
    "theory": "PRIMARY KEY satırın kimliğidir, benzersiz ve boş olamaz.",
    "theoryCode": "id INT PRIMARY KEY",
    "quiz": {
      "question": "Tablodaki her satırı benzersiz yapan anahtar nedir?",
      "options": [
        "FOREIGN KEY",
        "PRIMARY KEY",
        "INDEX"
      ],
      "correctIndex": 1
    },
    "initialCode": "CREATE TABLE uyeler (id INT PRIMARY KEY, ad VARCHAR(50));",
    "mustInclude": [
      "PRIMARY KEY"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (PRIMARY KEY) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 13,
    "lang": "SQL",
    "unit": 2,
    "title": "13. NOT NULL & DEFAULT",
    "desc": "Zorunlu ve varsayılan alanlar.",
    "theory": "NOT NULL boş bırakılmayı engeller, DEFAULT varsayılan değer atar.",
    "theoryCode": "email VARCHAR(100) NOT NULL",
    "quiz": {
      "question": "Boş bırakılamaz kısıtı nedir?",
      "options": [
        "REQUIRED",
        "NOT NULL",
        "MANDATORY"
      ],
      "correctIndex": 1
    },
    "initialCode": "CREATE TABLE ayarlar (anahtar VARCHAR(50) NOT NULL);",
    "mustInclude": [
      "NOT NULL"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (NOT NULL) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 14,
    "lang": "SQL",
    "unit": 2,
    "title": "14. INSERT INTO ile Kayıt Ekleme",
    "desc": "Tabloya yeni satır ekleme.",
    "theory": "INSERT INTO tablo (sutunlar) VALUES (degerler);",
    "theoryCode": "INSERT INTO ogrenciler VALUES (1, 'Ali', 'SQL', 90);",
    "quiz": {
      "question": "Yeni veri ekleyen komut nedir?",
      "options": [
        "ADD",
        "INSERT INTO",
        "PUT"
      ],
      "correctIndex": 1
    },
    "initialCode": "INSERT INTO ogrenciler (id, ad, dil, puan) VALUES (5, 'Zeynep', 'SQL', 95);",
    "mustInclude": [
      "INSERT INTO",
      "VALUES"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (INSERT INTO, VALUES) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 15,
    "lang": "SQL",
    "unit": 2,
    "title": "15. UPDATE ile Veri Güncelleme",
    "desc": "Mevcut kaydı değiştirme.",
    "theory": "UPDATE tablo SET sutun = deger WHERE id = x; WHERE unutulursa hepsi değişir!",
    "theoryCode": "UPDATE ogrenciler SET puan = 100 WHERE id = 1;",
    "quiz": {
      "question": "UPDATE komutunda WHERE unutulursa ne olur?",
      "options": [
        "Tüm satırlar güncellenir",
        "Hata verir",
        "Hiçbiri değişmez"
      ],
      "correctIndex": 0
    },
    "initialCode": "UPDATE ogrenciler SET puan = 99 WHERE id = 1;",
    "mustInclude": [
      "UPDATE",
      "SET"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (UPDATE, SET) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 16,
    "lang": "SQL",
    "unit": 2,
    "title": "16. DELETE ile Kayıt Silme",
    "desc": "Tablodan satır çıkarma.",
    "theory": "DELETE FROM tablo WHERE sart; ile sadece şartı sağlayanlar silinir.",
    "theoryCode": "DELETE FROM ogrenciler WHERE id = 10;",
    "quiz": {
      "question": "Kayıt silme komutu nedir?",
      "options": [
        "REMOVE",
        "DROP",
        "DELETE FROM"
      ],
      "correctIndex": 2
    },
    "initialCode": "DELETE FROM ogrenciler WHERE puan < 50;",
    "mustInclude": [
      "DELETE FROM"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (DELETE FROM) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 17,
    "lang": "SQL",
    "unit": 2,
    "title": "17. ALTER TABLE ile Değişim",
    "desc": "Sütun ekleme ve çıkarma.",
    "theory": "ALTER TABLE tablo ADD sutun TIP; ile yeni sütun eklenir.",
    "theoryCode": "ALTER TABLE ogrenciler ADD sehir VARCHAR(30);",
    "quiz": {
      "question": "Tablo yapısını değiştiren komut hangisidir?",
      "options": [
        "MODIFY",
        "ALTER TABLE",
        "UPDATE TABLE"
      ],
      "correctIndex": 1
    },
    "initialCode": "ALTER TABLE ogrenciler ADD telefon VARCHAR(20);",
    "mustInclude": [
      "ALTER TABLE"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (ALTER TABLE) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 18,
    "lang": "SQL",
    "unit": 2,
    "title": "18. TRUNCATE vs DROP",
    "desc": "Tabloyu sıfırlama veya yok etme.",
    "theory": "DROP tabloyu siler, TRUNCATE yapıyı koruyup verileri boşaltır.",
    "theoryCode": "TRUNCATE TABLE loglar;",
    "quiz": {
      "question": "Tablo yapısını koruyup tüm verileri hızlıca temizleyen komut nedir?",
      "options": [
        "DELETE ALL",
        "TRUNCATE",
        "DROP"
      ],
      "correctIndex": 1
    },
    "initialCode": "TRUNCATE TABLE gecici_veriler;",
    "mustInclude": [
      "TRUNCATE"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (TRUNCATE) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 19,
    "lang": "SQL",
    "unit": 2,
    "title": "19. FOREIGN KEY İlişkileri",
    "desc": "Tablolar arası bağ kurma.",
    "theory": "FOREIGN KEY başka bir tablodaki PRIMARY KEY'i referans alır.",
    "theoryCode": "ogrenci_id INT REFERENCES ogrenciler(id)",
    "quiz": {
      "question": "İki tablo arasındaki ilişkiyi temsil eden anahtar nedir?",
      "options": [
        "FOREIGN KEY",
        "PRIMARY KEY",
        "COMPOSITE"
      ],
      "correctIndex": 0
    },
    "initialCode": "CREATE TABLE notlar (id INT PRIMARY KEY, ogrenci_id INT REFERENCES ogrenciler(id));",
    "mustInclude": [
      "REFERENCES",
      "FOREIGN KEY"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (REFERENCES, FOREIGN KEY) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 20,
    "lang": "SQL",
    "unit": 2,
    "title": "20. MİNİ PROJE: E-Ticaret Sipariş Tablo Yönetimi",
    "desc": "Tablo oluştur, veri ekle ve güncelle.",
    "theory": "Tebrikler! 2. Bölüm bitti. Sipariş tablosu kur, kayıt ekle ve güncelle.",
    "theoryCode": "CREATE TABLE siparisler (id INT PRIMARY KEY, tutar INT);\nINSERT INTO siparisler VALUES (1, 100);",
    "quiz": {
      "question": "Bir tabloda kaç tane PRIMARY KEY olabilir?",
      "options": [
        "1 adet",
        "İstediğimiz kadar",
        "Sütun sayısı kadar"
      ],
      "correctIndex": 0
    },
    "initialCode": "CREATE TABLE siparisler (id INT PRIMARY KEY, tutar INT);\nINSERT INTO siparisler VALUES (1, 250);\nUPDATE siparisler SET tutar = 300 WHERE id = 1;",
    "mustInclude": [
      "CREATE TABLE",
      "INSERT INTO",
      "UPDATE"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (CREATE TABLE, INSERT INTO, UPDATE) yer aldığından emin olun.",
    "isMiniProject": true
  },
  {
    "id": 21,
    "lang": "SQL",
    "unit": 3,
    "title": "21. INNER JOIN ile Birleştirme",
    "desc": "Ortak kayıtları eşleştirme.",
    "theory": "INNER JOIN her iki tabloda eşleşen satırları birleştirir.",
    "theoryCode": "SELECT o.ad, n.notu FROM ogrenciler o INNER JOIN notlar n ON o.id = n.ogrenci_id;",
    "quiz": {
      "question": "Eşleşen satırları birleştiren JOIN türü nedir?",
      "options": [
        "LEFT JOIN",
        "INNER JOIN",
        "FULL JOIN"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT ogrenciler.ad, notlar.ders_notu FROM ogrenciler INNER JOIN notlar ON ogrenciler.id = notlar.ogrenci_id;",
    "mustInclude": [
      "INNER JOIN",
      "ON"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (INNER JOIN, ON) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 22,
    "lang": "SQL",
    "unit": 3,
    "title": "22. LEFT JOIN ile Eşleşmeyenleri Koruma",
    "desc": "Sol tablonun tüm satırları.",
    "theory": "LEFT JOIN soldaki tüm kayıtları getirir, eşleşmeyenlere NULL yazar.",
    "theoryCode": "SELECT * FROM ogrenciler LEFT JOIN notlar ON ogrenciler.id = notlar.ogrenci_id;",
    "quiz": {
      "question": "Eşleşmesi olmayan öğrencileri de listelemek için ne kullanılır?",
      "options": [
        "INNER JOIN",
        "LEFT JOIN",
        "RIGHT JOIN"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT ogrenciler.ad, notlar.ders_notu FROM ogrenciler LEFT JOIN notlar ON ogrenciler.id = notlar.ogrenci_id;",
    "mustInclude": [
      "LEFT JOIN"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (LEFT JOIN) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 23,
    "lang": "SQL",
    "unit": 3,
    "title": "23. RIGHT & FULL JOIN",
    "desc": "Tüm yönlü tablo birleştirme.",
    "theory": "RIGHT JOIN sağ tabloyu korur. FULL JOIN ise iki tablodaki her şeyi birleştirir.",
    "theoryCode": "SELECT * FROM bolumler FULL OUTER JOIN ogrenciler ON bolumler.id = ogrenciler.bolum_id;",
    "quiz": {
      "question": "İki tablodaki tüm verileri getiren birleştirme nedir?",
      "options": [
        "FULL OUTER JOIN",
        "CROSS JOIN",
        "NATURAL JOIN"
      ],
      "correctIndex": 0
    },
    "initialCode": "SELECT * FROM bolumler RIGHT JOIN ogrenciler ON bolumler.id = ogrenciler.bolum_id;",
    "mustInclude": [
      "RIGHT JOIN",
      "FULL OUTER JOIN"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (RIGHT JOIN, FULL OUTER JOIN) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 24,
    "lang": "SQL",
    "unit": 3,
    "title": "24. GROUP BY ile Gruplama",
    "desc": "Verileri kategorilere kümeleme.",
    "theory": "GROUP BY sütuna göre gruplar, COUNT/AVG ile özet çıkarır.",
    "theoryCode": "SELECT dil, COUNT(*) FROM ogrenciler GROUP BY dil;",
    "quiz": {
      "question": "Hangi dilde kaç öğrenci olduğunu bulmak için ne kullanılır?",
      "options": [
        "ORDER BY",
        "GROUP BY",
        "WHERE"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT dil, COUNT(*) FROM ogrenciler GROUP BY dil;",
    "mustInclude": [
      "GROUP BY"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (GROUP BY) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 25,
    "lang": "SQL",
    "unit": 3,
    "title": "25. HAVING ile Grup Filtreleme",
    "desc": "Gruplanmış verilerde şart.",
    "theory": "HAVING GROUP BY sonucundaki toplamlara filtre uygular.",
    "theoryCode": "SELECT dil, COUNT(*) FROM ogrenciler GROUP BY dil HAVING COUNT(*) > 1;",
    "quiz": {
      "question": "COUNT(*) sonucuna göre filtre koymak için hangisi kullanılır?",
      "options": [
        "WHERE",
        "HAVING",
        "LIMIT"
      ],
      "correctIndex": 1
    },
    "initialCode": "SELECT dil, COUNT(*) FROM ogrenciler GROUP BY dil HAVING COUNT(*) >= 1;",
    "mustInclude": [
      "HAVING"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (HAVING) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 26,
    "lang": "SQL",
    "unit": 3,
    "title": "26. Subquery (Alt Sorgular)",
    "desc": "Sorgu içinde sorgu çalıştırma.",
    "theory": "Parantez içi alt sorgunun çıktısı üst sorguda şart olarak kullanılır.",
    "theoryCode": "SELECT * FROM ogrenciler WHERE puan > (SELECT AVG(puan) FROM ogrenciler);",
    "quiz": {
      "question": "Ortalamanın üstündeki öğrencileri bulmak için ne kullanılır?",
      "options": [
        "Alt Sorgu (Subquery)",
        "LIKE",
        "ALTER"
      ],
      "correctIndex": 0
    },
    "initialCode": "SELECT ad, puan FROM ogrenciler WHERE puan > (SELECT AVG(puan) FROM ogrenciler);",
    "mustInclude": [
      "(SELECT"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin ((SELECT) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 27,
    "lang": "SQL",
    "unit": 3,
    "title": "27. INDEX Mantığı & Performans",
    "desc": "Sorgu hızlandırma mekanizması.",
    "theory": "CREATE INDEX sütundaki arama hızını katlar.",
    "theoryCode": "CREATE INDEX idx_puan ON ogrenciler(puan);",
    "quiz": {
      "question": "Veritabanında arama hızını artıran yapı nedir?",
      "options": [
        "INDEX",
        "VIEW",
        "TRIGGER"
      ],
      "correctIndex": 0
    },
    "initialCode": "CREATE INDEX idx_puan ON ogrenciler(puan);",
    "mustInclude": [
      "CREATE INDEX"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (CREATE INDEX) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 28,
    "lang": "SQL",
    "unit": 3,
    "title": "28. VIEW ile Sanal Tablolar",
    "desc": "Sorguları saklama.",
    "theory": "CREATE VIEW karmaşık sorguları tek sanal tablo gibi gösterir.",
    "theoryCode": "CREATE VIEW v_basarililar AS SELECT * FROM ogrenciler WHERE puan >= 90;",
    "quiz": {
      "question": "Sanal tablo oluşturan komut nedir?",
      "options": [
        "CREATE TABLE",
        "CREATE VIEW",
        "CREATE SNAPSHOT"
      ],
      "correctIndex": 1
    },
    "initialCode": "CREATE VIEW v_ozet AS SELECT id, ad, puan FROM ogrenciler WHERE puan >= 90;",
    "mustInclude": [
      "CREATE VIEW",
      "AS"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (CREATE VIEW, AS) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 29,
    "lang": "SQL",
    "unit": 3,
    "title": "29. Transactions (ACID)",
    "desc": "Veri tutarlılığı ve geri alma.",
    "theory": "BEGIN başlar, COMMIT onaylar, ROLLBACK hatalı işlemi geri alır.",
    "theoryCode": "BEGIN; UPDATE hesaplar SET bakiye = bakiye - 50; COMMIT;",
    "quiz": {
      "question": "İşlem hatasında yapılanları geri alan komut nedir?",
      "options": [
        "ROLLBACK",
        "CANCEL",
        "REVOKE"
      ],
      "correctIndex": 0
    },
    "initialCode": "BEGIN;\nUPDATE ogrenciler SET puan = puan + 5 WHERE id = 1;\nCOMMIT;",
    "mustInclude": [
      "BEGIN",
      "COMMIT"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (BEGIN, COMMIT) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 30,
    "lang": "SQL",
    "unit": 3,
    "title": "30. MİNİ PROJE: Bankacılık & Raporlama Sistemi",
    "desc": "JOIN, GROUP BY ve Transaction ile tam mimari.",
    "theory": "Tebrikler! SQL Mimarisi bitti! Raporlama ve grup sorgusu hazırla.",
    "theoryCode": "SELECT dil, COUNT(*), AVG(puan) FROM ogrenciler GROUP BY dil HAVING COUNT(*) >= 1;",
    "quiz": {
      "question": "ACID'deki 'A' harfinin açılımı nedir?",
      "options": [
        "Atomicity (Bölünemezlik)",
        "Accuracy",
        "Action"
      ],
      "correctIndex": 0
    },
    "initialCode": "SELECT dil, COUNT(*) AS ogrenci_sayisi, AVG(puan) AS ortalama FROM ogrenciler GROUP BY dil HAVING COUNT(*) >= 1 ORDER BY ortalama DESC;",
    "mustInclude": [
      "SELECT",
      "FROM",
      "GROUP BY",
      "HAVING"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (SELECT, FROM, GROUP BY, HAVING) yer aldığından emin olun.",
    "isMiniProject": true
  }
],
  python: [
  {
    "id": 1,
    "lang": "Python",
    "unit": 1,
    "title": "1. print() & Konsol Çıktısı",
    "desc": "Ekrana mesaj yazdırma.",
    "theory": "Python'da ekrana yazı veya değişken basmak için print() fonksiyonu kullanılır.",
    "theoryCode": "print('Merhaba COD+!')",
    "quiz": {
      "question": "Python'da ekrana çıktı basan temel fonksiyon nedir?",
      "options": [
        "echo()",
        "print()",
        "printf()"
      ],
      "correctIndex": 1
    },
    "initialCode": "print('Merhaba Python!')",
    "mustInclude": [
      "print"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (print) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 2,
    "lang": "Python",
    "unit": 1,
    "title": "2. Değişkenler & Veri Tipleri",
    "desc": "int, float, str ve bool tipleri.",
    "theory": "Python dinamik tiplidir. int tam sayı, float ondalıklı sayı, str metin tutar.",
    "theoryCode": "yas = 20\nisim = 'Deniz'\naktif = True",
    "quiz": {
      "question": "Python'da metin (yazı) veri tipi hangisidir?",
      "options": [
        "str",
        "string",
        "text"
      ],
      "correctIndex": 0
    },
    "initialCode": "yas = 22\nisim = 'Deniz'\nprint(f'{isim} {yas} yaşında.')",
    "mustInclude": [
      "print"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (print) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 3,
    "lang": "Python",
    "unit": 1,
    "title": "3. String Formatlama & f-strings",
    "desc": "Değişkenleri metne gömme.",
    "theory": "f'Merhaba {isim}' sözdizimi ile süslü parantez { } içine doğrudan değişken adı yazılarak değişkenler metin içine gömülür. Örneğin: puan = 95 iken f'Puanınız: {puan}' ekrana 'Puanınız: 95' yazar.",
    "theoryCode": "puan = 95\nprint(f'Puanınız: {puan}')",
    "task": "1. <code>kullanici = 'Burak'</code> satırında değişkene bir isim atayın.<br>2. <code>f-string</code> (<code>f'...'</code>) kullanarak ekrana <code>Hoş geldin, {kullanici}!</code> mesajını yazdırın.<br><div style='margin-top:6px; padding:6px 10px; background:rgba(245,158,11,0.12); border-left:3px solid #f59e0b; border-radius:4px; font-size:12px; color:#fbbf24;'><i class='fa-solid fa-lightbulb'></i> <strong>Önemli Kural:</strong> Süslü parantez içine değerin kendisini (<code>{Burak}</code>) değil, <strong>değişkenin adını</strong> (<code>{kullanici}</code>) yazmalısınız!</div>",
    "expectedOutput": "Hoş geldin, Burak!",
    "quiz": {
      "question": "Modern Python'da en pratik string formatlama yöntemi nedir?",
      "options": [
        "f-string",
        "format()",
        "+ ile bağlama"
      ],
      "correctIndex": 0
    },
    "initialCode": "kullanici = 'Burak'\nprint(f'Hoş geldin, {kullanici}!')",
    "mustInclude": [
      "f'",
      "kullanici"
    ],
    "errorMsg": "Lütfen kodunuzda f-string (f'...') sözdizimini ve {kullanici} değişkenini kullandığınızdan emin olun.",
    "isMiniProject": false
  },
  {
    "id": 4,
    "lang": "Python",
    "unit": 1,
    "title": "4. input() ile Kullanıcı Girişi",
    "desc": "Klavyeden veri alma.",
    "theory": "input('Mesaj') kullanıcıdan veri alır ve daima 'str' (metin) döndürür.",
    "theoryCode": "ad = input('Adınız: ')\nprint(f'Merhaba {ad}')",
    "quiz": {
      "question": "input() fonksiyonu kullanıcıdan veriyi hangi tipte döndürür?",
      "options": [
        "int",
        "str (string)",
        "otomatik tip"
      ],
      "correctIndex": 1
    },
    "initialCode": "# input('Adınız: ')\nprint('Giriş alındı.')",
    "mustInclude": [
      "print"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (print) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 5,
    "lang": "Python",
    "unit": 1,
    "title": "5. Matematiksel & Karşılaştırma Operatörleri",
    "desc": "+, -, *, /, //, % ve ==, !=",
    "theory": "// tam bölme yapar, % kalan bulur. == eşit mi, != eşit değil mi demektir.",
    "theoryCode": "kalan = 10 % 3\nprint(kalan)",
    "quiz": {
      "question": "Bölme işleminde kalanı (mod) veren operatör nedir?",
      "options": [
        "//",
        "%",
        "**"
      ],
      "correctIndex": 1
    },
    "initialCode": "a = 15\nb = 4\nprint('Kalan:', a % b)",
    "mustInclude": [
      "print"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (print) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 6,
    "lang": "Python",
    "unit": 1,
    "title": "6. if / elif / else Karar Blokları",
    "desc": "Şarta göre kod çalıştırma.",
    "theory": "Python'da bloklar girintileme (indentation: 4 boşluk) ile ayrılır.",
    "theoryCode": "if puan >= 50:\n    print('Geçti')\nelse:\n    print('Kaldı')",
    "quiz": {
      "question": "Python'da 'değilse eğer' şartı hangi anahtar kelimedir?",
      "options": [
        "else if",
        "elif",
        "elseif"
      ],
      "correctIndex": 1
    },
    "initialCode": "puan = 85\nif puan >= 50:\n    print('Başarılı')\nelse:\n    print('Tekrar dene')",
    "mustInclude": [
      "if",
      "print"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (if, print) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 7,
    "lang": "Python",
    "unit": 1,
    "title": "7. Mantıksal Operatörler (and, or, not)",
    "desc": "Çoklu şart bağlama.",
    "theory": "and iki şartın doğruluğunu, or en az birini, not ise tersini alır.",
    "theoryCode": "if yas >= 18 and ehliyet:\n    print('Sürebilir')",
    "quiz": {
      "question": "Her iki şartın da sağlanmasını zorunlu kılan operatör nedir?",
      "options": [
        "and",
        "&&",
        "both"
      ],
      "correctIndex": 0
    },
    "initialCode": "xp = 400\nif xp > 300 and xp < 500:\n    print('Kalfa Seviyesi')",
    "mustInclude": [
      "and"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (and) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 8,
    "lang": "Python",
    "unit": 1,
    "title": "8. Tip Dönüşümleri (int, str, float)",
    "desc": "Türler arası çevrim.",
    "theory": "int('42') metni sayıya çevirir. str(100) sayıyı metne çevirir.",
    "theoryCode": "sayi = int('50')\nprint(sayi * 2)",
    "quiz": {
      "question": "'100' metnini tam sayıya çeviren fonksiyon nedir?",
      "options": [
        "toInt()",
        "int()",
        "parse()"
      ],
      "correctIndex": 1
    },
    "initialCode": "fiyat = int('150')\nprint('Toplam:', fiyat + 50)",
    "mustInclude": [
      "int("
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (int() yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 9,
    "lang": "Python",
    "unit": 1,
    "title": "9. Yorum Satırları & PEP8 Standartları",
    "desc": "Temiz ve anlaşılır kodlama.",
    "theory": "# işareti tek satırlık yorumdur. Python PEP8 temiz kod kurallarına dayanır.",
    "theoryCode": "# Bu bir yorumdur\nx = 10",
    "quiz": {
      "question": "Python'da tek satırlık yorum başlatma karakteri nedir?",
      "options": [
        "//",
        "/*",
        "#"
      ],
      "correctIndex": 2
    },
    "initialCode": "# Öğrenci not kontrolü\npuan = 90\nprint(puan)",
    "mustInclude": [
      "#"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (#) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 10,
    "lang": "Python",
    "unit": 1,
    "title": "10. MİNİ PROJE: Akıllı Bilet Fiyat Hesaplayıcı",
    "desc": "1. Bölüm şart ve mantık entegrasyonu.",
    "theory": "Tebrikler! Yaşa ve öğrenci durumuna göre bilet fiyatı hesaplayan karar algoritmasını kur.",
    "theoryCode": "yas = 16\nif yas < 18:\n    print('İndirimli Bilet')\nelse:\n    print('Tam Bilet')",
    "quiz": {
      "question": "Python'da kod bloklarının sınırını ne belirler?",
      "options": [
        "Süslü parantezler {}",
        "Girintileme (Indentation)",
        "Noktalı virgül ;"
      ],
      "correctIndex": 1
    },
    "initialCode": "yas = 20\nogrenci = True\nif yas < 25 and ogrenci:\n    print('İndirimli Bilet: 50 TL')\nelse:\n    print('Tam Bilet: 100 TL')",
    "mustInclude": [
      "if",
      "print"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (if, print) yer aldığından emin olun.",
    "isMiniProject": true
  },
  {
    "id": 11,
    "lang": "Python",
    "unit": 2,
    "title": "11. Listeler (Lists) & Metotları",
    "desc": "Değiştirilebilir sıralı koleksiyonlar.",
    "theory": "diller = ['Python', 'SQL'] listesi [] ile tanımlanır. append() yeni eleman ekler.",
    "theoryCode": "diller.append('C#')\nprint(diller)",
    "quiz": {
      "question": "Listenin sonuna yeni bir eleman ekleyen metot nedir?",
      "options": [
        "add()",
        "append()",
        "push()"
      ],
      "correctIndex": 1
    },
    "initialCode": "diller = ['Python', 'HTML']\ndiller.append('SQL')\nprint(diller)",
    "mustInclude": [
      "append"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (append) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 12,
    "lang": "Python",
    "unit": 2,
    "title": "12. Demetler (Tuples)",
    "desc": "Değiştirilemez sabit koleksiyonlar.",
    "theory": "Demetler () ile tanımlanır ve oluşturulduktan sonra elemanları değiştirilemez.",
    "theoryCode": "koordinat = (41.0, 29.0)\nprint(koordinat[0])",
    "quiz": {
      "question": "Tuple (demet) veri yapısının en belirgin özelliği nedir?",
      "options": [
        "Değiştirilemez (Immutable) olması",
        "Sadece sayı tutması",
        "Sırasız olması"
      ],
      "correctIndex": 0
    },
    "initialCode": "nokta = (10, 20)\nprint(nokta[0])",
    "mustInclude": [
      "("
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (() yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 13,
    "lang": "Python",
    "unit": 2,
    "title": "13. Kümeler (Sets) & Benzersizlik",
    "desc": "Tekrar etmeyen sırasız koleksiyonlar.",
    "theory": "Kümeler {} ile tanımlanır ve aynı elemanı asla iki kez barındırmaz.",
    "theoryCode": "sayilar = {1, 2, 2, 3}\nprint(len(sayilar))  # 3",
    "quiz": {
      "question": "Mükerrer elemanları otomatik olarak temizleyen Python koleksiyonu nedir?",
      "options": [
        "list",
        "set",
        "tuple"
      ],
      "correctIndex": 1
    },
    "initialCode": "kume = {1, 2, 2, 3}\nprint(kume)",
    "mustInclude": [
      "{"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin ({) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 14,
    "lang": "Python",
    "unit": 2,
    "title": "14. Sözlükler (Dictionaries)",
    "desc": "Key-Value eşleşmeleri.",
    "theory": "ogrenci = {'ad': 'Ali', 'puan': 90} anahtar ile değere erişir.",
    "theoryCode": "print(ogrenci['ad'])",
    "quiz": {
      "question": "Sözlükte bir anahtarın değerine ulaşmak için hangisi yazılır?",
      "options": [
        "ogrenci['ad']",
        "ogrenci(ad)",
        "ogrenci->ad"
      ],
      "correctIndex": 0
    },
    "initialCode": "profil = {'ad': 'Deniz', 'xp': 450}\nprint(profil['ad'])",
    "mustInclude": [
      ":",
      "{"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (:, {) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 15,
    "lang": "Python",
    "unit": 2,
    "title": "15. for Döngüsü & range()",
    "desc": "Elemanlar üzerinde gezinme.",
    "theory": "for x in range(5) 0'dan 4'e kadar döner.",
    "theoryCode": "for i in range(1, 4):\n    print(i)",
    "quiz": {
      "question": "range(1, 5) ifadesi hangi sayıları üretir?",
      "options": [
        "1, 2, 3, 4, 5",
        "1, 2, 3, 4",
        "0, 1, 2, 3, 4"
      ],
      "correctIndex": 1
    },
    "initialCode": "for d in ['Python', 'SQL', 'C#']:\n    print(f'Dil: {d}')",
    "mustInclude": [
      "for"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (for) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 16,
    "lang": "Python",
    "unit": 2,
    "title": "16. while Döngüsü",
    "desc": "Şart sağlandığı sürece dönme.",
    "theory": "while kosul: şart True olduğu sürece bloğu tekrarlar.",
    "theoryCode": "sayac = 0\nwhile sayac < 3:\n    sayac += 1",
    "quiz": {
      "question": "while döngüsünün sonsuz döngüye girmemesi için ne yapılmalıdır?",
      "options": [
        "Şart değişkeni döngü içinde güncellenmelidir",
        "range() yazılmalıdır",
        "break yasaklanmalıdır"
      ],
      "correctIndex": 0
    },
    "initialCode": "i = 1\nwhile i <= 3:\n    print(i)\n    i += 1",
    "mustInclude": [
      "while"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (while) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 17,
    "lang": "Python",
    "unit": 2,
    "title": "17. break, continue & pass",
    "desc": "Döngü akış kontrolü.",
    "theory": "break döngüyü sonlandırır, continue o adımı atlar, pass boş blok tutar.",
    "theoryCode": "for i in range(5):\n    if i == 2: continue",
    "quiz": {
      "question": "Döngüyü anında kıran ve dışarı çıkaran komut nedir?",
      "options": [
        "stop",
        "break",
        "exit"
      ],
      "correctIndex": 1
    },
    "initialCode": "for i in range(5):\n    if i == 3:\n        break\n    print(i)",
    "mustInclude": [
      "break"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (break) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 18,
    "lang": "Python",
    "unit": 2,
    "title": "18. def ile Fonksiyon Tanımlama & return",
    "desc": "Tekrar kullanılabilir kod modülleri.",
    "theory": "def fonksiyon_adi(parametre): return sonuc ile değer döndürür.",
    "theoryCode": "def topla(a, b):\n    return a + b",
    "quiz": {
      "question": "Python'da fonksiyon tanımlamak için hangi anahtar kelime kullanılır?",
      "options": [
        "function",
        "def",
        "func"
      ],
      "correctIndex": 1
    },
    "initialCode": "def kare_al(x):\n    return x * x\nprint(kare_al(5))",
    "mustInclude": [
      "def",
      "return"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (def, return) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 19,
    "lang": "Python",
    "unit": 2,
    "title": "19. Varsayılan Parametreler & *args",
    "desc": "Esnek fonksiyon argümanları.",
    "theory": "def selamla(isim='Misafir'): şeklinde varsayılan değer verilebilir.",
    "theoryCode": "def selamla(ad='Gezgin'):\n    return f'Merhaba {ad}'",
    "quiz": {
      "question": "Fonksiyona parametre gönderilmediğinde devreye giren değere ne denir?",
      "options": [
        "Varsayılan (Default) Argüman",
        "Global Değişken",
        "Static Değer"
      ],
      "correctIndex": 0
    },
    "initialCode": "def selamla(isim='Geliştirici'):\n    print(f'Hoş geldin, {isim}!')\nselamla()",
    "mustInclude": [
      "def"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (def) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 20,
    "lang": "Python",
    "unit": 2,
    "title": "20. MİNİ PROJE: Öğrenci Not & Performans Sistemi",
    "desc": "Liste, sözlük ve fonksiyon entegrasyonu.",
    "theory": "Tebrikler! 2. Bölüm bitti. Bir öğrenci listesi tanımla ve ortalamasını hesaplayan fonksiyon yaz.",
    "theoryCode": "notlar = [85, 90, 95]\ndef ortalama(liste): return sum(liste)/len(liste)",
    "quiz": {
      "question": "Python'da bir listenin eleman sayısını veren fonksiyon nedir?",
      "options": [
        "count()",
        "size()",
        "len()"
      ],
      "correctIndex": 2
    },
    "initialCode": "notlar = [80, 90, 100]\ndef ort(liste):\n    return sum(liste) / len(liste)\nprint('Ortalama:', ort(notlar))",
    "mustInclude": [
      "def",
      "len("
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (def, len() yer aldığından emin olun.",
    "isMiniProject": true
  },
  {
    "id": 21,
    "lang": "Python",
    "unit": 3,
    "title": "21. try / except / finally Hata Yönetimi",
    "desc": "Çökmeyen güvenli kodlar.",
    "theory": "Hata çıkabilecek kodlar try içine alınır, except ile yakalanır.",
    "theoryCode": "try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print('Sıfıra bölünemez')",
    "quiz": {
      "question": "Python'da hataları yakalamak için hangi blok kullanılır?",
      "options": [
        "catch",
        "except",
        "handle"
      ],
      "correctIndex": 1
    },
    "initialCode": "try:\n    sayi = int('abc')\nexcept ValueError:\n    print('Dönüşüm hatası yakalandı!')",
    "mustInclude": [
      "try:",
      "except"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (try:, except) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 22,
    "lang": "Python",
    "unit": 3,
    "title": "22. Dosya İşlemleri: with open()",
    "desc": "Dosya okuma ve yazma.",
    "theory": "with open('dosya.txt', 'r') as f: dosyayı otomatik kapatır.",
    "theoryCode": "with open('log.txt', 'w') as f:\n    f.write('Sistem aktif')",
    "quiz": {
      "question": "Dosyayı işlem bitince otomatik ve güvenli kapatan yapı nedir?",
      "options": [
        "with open()",
        "file.autoClose()",
        "safe_open()"
      ],
      "correctIndex": 0
    },
    "initialCode": "# with open('test.txt', 'w') as f:\nprint('Dosya işlemi simüle edildi.')",
    "mustInclude": [
      "print"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (print) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 23,
    "lang": "Python",
    "unit": 3,
    "title": "23. Sınıflar (Class) & Nesneler (Object)",
    "desc": "Nesne yönelimli programlama temeli.",
    "theory": "class Taslak: nesnelerin şablonudur. Obje new olmadan çağrılarak üretilir.",
    "theoryCode": "class Araba:\n    marka = 'Tesla'\na1 = Araba()",
    "quiz": {
      "question": "Python'da sınıf tanımlamak için hangi kelime kullanılır?",
      "options": [
        "object",
        "class",
        "struct"
      ],
      "correctIndex": 1
    },
    "initialCode": "class Kurs:\n    dil = 'Python'\nk = Kurs()\nprint(k.dil)",
    "mustInclude": [
      "class"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (class) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 24,
    "lang": "Python",
    "unit": 3,
    "title": "24. __init__() Kurucu Metodu & self",
    "desc": "Nesne ilk değer ataması.",
    "theory": "__init__(self, ...) nesne yaratıldığında otomatik çalışan yapıcıdır. self nesneyi temsil eder.",
    "theoryCode": "class Kisi:\n    def __init__(self, ad):\n        self.ad = ad",
    "quiz": {
      "question": "Python sınıfında nesnenin kendisini temsil eden ilk parametre nedir?",
      "options": [
        "this",
        "self",
        "me"
      ],
      "correctIndex": 1
    },
    "initialCode": "class Ogrenci:\n    def __init__(self, ad, puan):\n        self.ad = ad\n        self.puan = puan\no = Ogrenci('Deniz', 95)\nprint(o.ad, o.puan)",
    "mustInclude": [
      "def __init__",
      "self"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (def __init__, self) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 25,
    "lang": "Python",
    "unit": 3,
    "title": "25. Kalıtım (Inheritance) & super()",
    "desc": "Ata sınıftan özellik miras alma.",
    "theory": "class Yonetici(Calisan): ata sınıfın tüm yeteneklerini miras alır.",
    "theoryCode": "class Kus(Hayvan):\n    def uc(self): print('Uçuyor')",
    "quiz": {
      "question": "Ata sınıfın kurucusunu çağırmak için hangi fonksiyon kullanılır?",
      "options": [
        "parent()",
        "super()",
        "base()"
      ],
      "correctIndex": 1
    },
    "initialCode": "class Hayvan:\n    tur = 'Canlı'\nclass Kopek(Hayvan):\n    pass\nk = Kopek()\nprint(k.tur)",
    "mustInclude": [
      "class",
      "("
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (class, () yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 26,
    "lang": "Python",
    "unit": 3,
    "title": "26. Kapsülleme (Encapsulation) & Private",
    "desc": "Veri gizleme ve koruma.",
    "theory": "__bakiye gibi çift alt tire ile başlayan değişkenler private olur.",
    "theoryCode": "class Hesap:\n    def __init__(self): self.__bakiye = 100",
    "quiz": {
      "question": "Python'da bir niteliği private (özel) yapmak için önüne ne konur?",
      "options": [
        "__ (çift alt tire)",
        "private",
        "#"
      ],
      "correctIndex": 0
    },
    "initialCode": "class Kasa:\n    def __init__(self):\\n        self.__gizli = 500\\nprint('Kapsülleme hazır.')",
    "mustInclude": [
      "__"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (__) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 27,
    "lang": "Python",
    "unit": 3,
    "title": "27. Polimorfizm (Çok Biçimlilik)",
    "desc": "Aynı metot adıyla farklı davranışlar.",
    "theory": "Farklı sınıfların aynı isimli metodu kendine göre uygulamasıdır.",
    "theoryCode": "kedi.ses_cikar()\nkopek.ses_cikar()",
    "quiz": {
      "question": "Farklı nesnelerin aynı arayüz/metot ile farklı çalışabilmesine ne denir?",
      "options": [
        "Kalıtım",
        "Polimorfizm",
        "Soyutlama"
      ],
      "correctIndex": 1
    },
    "initialCode": "class Kedi:\n    def ses(self): return 'Miyav'\nclass Kopek:\n    def ses(self): return 'Hav'\nprint(Kedi().ses(), Kopek().ses())",
    "mustInclude": [
      "def ses"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (def ses) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 28,
    "lang": "Python",
    "unit": 3,
    "title": "28. Lambda, map & filter",
    "desc": "Tek satırlık anonim fonksiyonlar.",
    "theory": "kare = lambda x: x ** 2 tek satırda fonksiyon üretir.",
    "theoryCode": "ciftler = list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4]))",
    "quiz": {
      "question": "Python'da tek satırlık isimsiz fonksiyon yazmak için ne kullanılır?",
      "options": [
        "anon",
        "lambda",
        "inline"
      ],
      "correctIndex": 1
    },
    "initialCode": "kare = lambda x: x * x\nprint(kare(6))",
    "mustInclude": [
      "lambda"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (lambda) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 29,
    "lang": "Python",
    "unit": 3,
    "title": "29. Modüller & import",
    "desc": "Hazır kütüphanelerle çalışma.",
    "theory": "import math veya from random import randint ile harici fonksiyonlar kullanılır.",
    "theoryCode": "import math\nprint(math.sqrt(16))",
    "quiz": {
      "question": "Python'da harici bir kütüphaneyi dahil etmek için hangi komut kullanılır?",
      "options": [
        "include",
        "import",
        "using"
      ],
      "correctIndex": 1
    },
    "initialCode": "import math\nprint('Karekök:', math.sqrt(25))",
    "mustInclude": [
      "import"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (import) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 30,
    "lang": "Python",
    "unit": 3,
    "title": "30. MİNİ PROJE: Banka Hesap & Bakiye OOP Sistemi",
    "desc": "OOP, hata yakalama ve metotlar ile tam banka sistemi.",
    "theory": "Tebrikler! Python mimarisi bitti! Para yatırma, çekme ve bakiye sorgulama metotları olan bir BankaHesabi sınıfı yaz.",
    "theoryCode": "class Hesap:\n    def __init__(self, bakiye): self.bakiye = bakiye\n    def yatir(self, tutar): self.bakiye += tutar",
    "quiz": {
      "question": "Python nesne yönelimli programlamada kurucu metodun adı nedir?",
      "options": [
        "__init__",
        "constructor",
        "main"
      ],
      "correctIndex": 0
    },
    "initialCode": "class BankaHesabi:\n    def __init__(self, sahip, bakiye=0):\n        self.sahip = sahip\n        self.bakiye = bakiye\n    def yatir(self, miktar):\n        self.bakiye += miktar\n        return self.bakiye\nh = BankaHesabi('Deniz', 1000)\nh.yatir(500)\nprint(f'{h.sahip} Bakiye: {h.bakiye} TL')",
    "mustInclude": [
      "class",
      "def __init__",
      "self"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (class, def __init__, self) yer aldığından emin olun.",
    "isMiniProject": true
  }
],
  csharp: [
  {
    "id": 1,
    "lang": "CSharp",
    "unit": 1,
    "title": "1. Console.WriteLine & İlk Program",
    "desc": "C# ile konsol çıktısı.",
    "theory": "C#'ta ekrana yazı basmak için System kütüphanesindeki Console.WriteLine() metodu kullanılır.",
    "theoryCode": "Console.WriteLine(\"Merhaba COD+!\");",
    "quiz": {
      "question": "C#'ta konsola yeni satır ekleyerek yazı yazan metot nedir?",
      "options": [
        "Console.Write",
        "Console.WriteLine",
        "Print.Line"
      ],
      "correctIndex": 1
    },
    "initialCode": "using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Merhaba C#!\");\n    }\n}",
    "mustInclude": [
      "Console.WriteLine"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (Console.WriteLine) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 2,
    "lang": "CSharp",
    "unit": 1,
    "title": "2. Değişkenler & İlkel Tipler",
    "desc": "int, double, string, bool.",
    "theory": "C# statik ve katı tipli bir dildir. Her değişkenin tipi önceden bildirilir.",
    "theoryCode": "int yas = 22; string ad = \"Deniz\"; bool aktif = true;",
    "quiz": {
      "question": "C#'ta tam sayı saklamak için kullanılan temel tip nedir?",
      "options": [
        "int",
        "number",
        "float"
      ],
      "correctIndex": 0
    },
    "initialCode": "int puan = 100;\nstring dil = \"C#\";\nConsole.WriteLine($\"{dil} Puan: {puan}\");",
    "mustInclude": [
      "Console.WriteLine"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (Console.WriteLine) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 3,
    "lang": "CSharp",
    "unit": 1,
    "title": "3. Tür Dönüşümleri (Convert & Parse)",
    "desc": "Metin ve sayı dönüşümleri.",
    "theory": "int.Parse(\"123\") veya Convert.ToInt32() ile string tam sayıya çevrilir.",
    "theoryCode": "int sayi = int.Parse(\"50\");",
    "quiz": {
      "question": "String değeri tam sayıya çevirmek için hangi yöntem kullanılır?",
      "options": [
        "int.Parse()",
        "cast.int()",
        "toInt()"
      ],
      "correctIndex": 0
    },
    "initialCode": "string str = \"42\";\nint deger = Convert.ToInt32(str);\nConsole.WriteLine(deger + 8);",
    "mustInclude": [
      "Convert",
      "Parse",
      "Console.WriteLine"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (Convert, Parse, Console.WriteLine) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 4,
    "lang": "CSharp",
    "unit": 1,
    "title": "4. Aritmetik ve Atama Operatörleri",
    "desc": "+, -, *, /, %, ++, --.",
    "theory": "sayac++ değeri 1 artırır, % kalan (mod) hesaplar.",
    "theoryCode": "int kalan = 17 % 5; // 2",
    "quiz": {
      "question": "Bir değişkenin değerini 1 artıran operatör nedir?",
      "options": [
        "+1",
        "++",
        "+="
      ],
      "correctIndex": 1
    },
    "initialCode": "int a = 10;\na++;\nConsole.WriteLine($\"Sonuç: {a}\");",
    "mustInclude": [
      "++",
      "Console.WriteLine"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (++, Console.WriteLine) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 5,
    "lang": "CSharp",
    "unit": 1,
    "title": "5. if, else if, else Şart Blokları",
    "desc": "Karar yapıları.",
    "theory": "if (sart) { ... } else { ... } ile karar mekanizması kurulur.",
    "theoryCode": "if (puan >= 50) Console.WriteLine(\"Geçti\");",
    "quiz": {
      "question": "C#'ta şart kontrolünün içine yazıldığı parantez nedir?",
      "options": [
        "Normal parantez ()",
        "Süslü parantez {}",
        "Köşeli parantez []"
      ],
      "correctIndex": 0
    },
    "initialCode": "int notu = 85;\nif (notu >= 50) {\n    Console.WriteLine(\"Başarılı!\");\n}",
    "mustInclude": [
      "if",
      "Console.WriteLine"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (if, Console.WriteLine) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 6,
    "lang": "CSharp",
    "unit": 1,
    "title": "6. switch-case & Desen Eşleme",
    "desc": "Çoklu durum kontrolü.",
    "theory": "Bir değişkenin birden fazla olası değerini kontrol etmek için switch-case kullanılır.",
    "theoryCode": "switch(gun) { case 1: Console.WriteLine(\"Pzt\"); break; }",
    "quiz": {
      "question": "switch-case bloğunda eşleşme bittiğinde durmak için ne yazılır?",
      "options": [
        "stop",
        "break",
        "exit"
      ],
      "correctIndex": 1
    },
    "initialCode": "int rol = 1;\nswitch(rol) {\n    case 1: Console.WriteLine(\"Yönetici\"); break;\n    default: Console.WriteLine(\"Öğrenci\"); break;\n}",
    "mustInclude": [
      "switch",
      "case"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (switch, case) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 7,
    "lang": "CSharp",
    "unit": 1,
    "title": "7. Mantıksal Operatörler (&&, ||, !)",
    "desc": "VE, VEYA, DEĞİL bağlaçları.",
    "theory": "&& her iki şartın doğru olmasını, || birinin doğru olmasını arar.",
    "theoryCode": "if (yas >= 18 && aktif) { ... }",
    "quiz": {
      "question": "C#'ta 'VE' mantıksal operatörü hangisidir?",
      "options": [
        "and",
        "&&",
        "&"
      ],
      "correctIndex": 1
    },
    "initialCode": "int xp = 450;\nif (xp > 300 && xp < 600) {\n    Console.WriteLine(\"Kalfa Seviyesi\");\n}",
    "mustInclude": [
      "&&"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (&&) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 8,
    "lang": "CSharp",
    "unit": 1,
    "title": "8. Sabitler (const) & Readonly",
    "desc": "Değiştirilemeyen veriler.",
    "theory": "const int PI = 3; derleme zamanı sabitidir, sonradan değiştirilemez.",
    "theoryCode": "const double KDV = 0.20;",
    "quiz": {
      "question": "Değeri sonradan değiştirilemeyecek sabit tanımlamak için ne kullanılır?",
      "options": [
        "fixed",
        "const",
        "static"
      ],
      "correctIndex": 1
    },
    "initialCode": "const int maxPuan = 100;\nConsole.WriteLine($\"Maksimum Puan: {maxPuan}\");",
    "mustInclude": [
      "const"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (const) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 9,
    "lang": "CSharp",
    "unit": 1,
    "title": "9. String Manipülasyonu & $ Interpolation",
    "desc": "Metin formatlama.",
    "theory": "$\"Ad: {ad}\" ile değişkenler doğrudan metne yerleştirilir.",
    "theoryCode": "string mesaj = $\"Merhaba {ad}!\";",
    "quiz": {
      "question": "C#'ta string interpolation başlatmak için çift tırnağın önüne ne konur?",
      "options": [
        "$",
        "@",
        "#"
      ],
      "correctIndex": 0
    },
    "initialCode": "string isim = \"Deniz\";\nConsole.WriteLine($\"Hoş geldin, {isim}!\");",
    "mustInclude": [
      "$\""
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin ($\") yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 10,
    "lang": "CSharp",
    "unit": 1,
    "title": "10. MİNİ PROJE: Konsol Tabanlı ATM Uygulaması",
    "desc": "1. Bölüm şart ve karar mimarisi.",
    "theory": "Tebrikler! 1. Bölüm bitti. Bu mini projede bakiye kontrolü yapan ve para çeken ATM konsol programını kendiniz yazacaksınız.",
    "theoryCode": "// İpucu: if (koşul) bloğu kurarak bakiyeyi kontrol edebilir ve bakiye -= cekim; ile düşebilirsiniz.",
    "task": "1. <code>int bakiye = 1500;</code> ve <code>int cekim = 500;</code> değişkenlerini kullanın.<br>2. <code>if (cekim <= bakiye)</code> şartı ile bakiyenin yeterli olup olmadığını kontrol edin.<br>3. Şart sağlanıyorsa <code>bakiye -= cekim;</code> işlemi ile parayı çekin.<br>4. <code>Console.WriteLine($\"Kalan Bakiye: {bakiye} TL\");</code> ile sonucu ekrana yazdırın.",
    "expectedOutput": "Kalan Bakiye: 1000 TL",
    "quiz": {
      "question": "C#'ta her kod satırının sonuna zorunlu olarak ne konulmalıdır?",
      "options": [
        ". (Nokta)",
        "; (Noktalı virgül)",
        ": (İki nokta)"
      ],
      "correctIndex": 1
    },
    "initialCode": "// 🏦 10. MİNİ PROJE: Konsol Tabanlı ATM Uygulaması\nint bakiye = 1500;\nint cekim = 500;\n\n// GÖREV: Aşağıya if kontrolü yazarak bakiye yeterli ise çekimi düşün\n// ve Console.WriteLine ile ekrana kalan bakiyeyi yazdırın:\n",
    "mustInclude": [
      "if",
      "Console.WriteLine"
    ],
    "errorMsg": "Lütfen if şartını ve Console.WriteLine yazdırma kodunu eksiksiz yazınız.",
    "isMiniProject": true
  },
  {
    "id": 11,
    "lang": "CSharp",
    "unit": 2,
    "title": "11. for Döngüsü",
    "desc": "Sayaca bağlı tekrarlar.",
    "theory": "for (int i = 0; i < 5; i++) { ... } belirli sayıda döner.",
    "theoryCode": "for(int i = 1; i <= 3; i++) Console.WriteLine(i);",
    "quiz": {
      "question": "for döngüsünde sayaç artırma kısmı neresidir?",
      "options": [
        "1. kısım",
        "2. kısım",
        "3. kısım (i++)"
      ],
      "correctIndex": 2
    },
    "initialCode": "for (int i = 1; i <= 3; i++) {\n    Console.WriteLine($\"Adım {i}\");\n}",
    "mustInclude": [
      "for"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (for) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 12,
    "lang": "CSharp",
    "unit": 2,
    "title": "12. while & do-while Döngüleri",
    "desc": "Koşullu döngüler.",
    "theory": "do-while şart yanlış olsa bile en az 1 kez mutlaka çalışır.",
    "theoryCode": "int sayi = 0; while(sayi < 3) { sayi++; }",
    "quiz": {
      "question": "Şart yanlış olsa bile en az 1 defa çalışan döngü hangisidir?",
      "options": [
        "for",
        "while",
        "do-while"
      ],
      "correctIndex": 2
    },
    "initialCode": "int i = 0;\nwhile (i < 3) {\n    Console.WriteLine(i);\n    i++;\n}",
    "mustInclude": [
      "while"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (while) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 13,
    "lang": "CSharp",
    "unit": 2,
    "title": "13. Tek Boyutlu Diziler (Arrays)",
    "desc": "Sabit boyutlu veri dizisi.",
    "theory": "int[] sayilar = new int[5]; veya string[] diller = { \"C#\", \"SQL\" };",
    "theoryCode": "string[] diller = { \"C#\", \"SQL\" };\nConsole.WriteLine(diller[0]);",
    "quiz": {
      "question": "C#'ta dizilerin ilk elemanının indeksi nedir?",
      "options": [
        "0",
        "1",
        "-1"
      ],
      "correctIndex": 0
    },
    "initialCode": "string[] diller = { \"C#\", \"SQL\", \"Python\" };\nConsole.WriteLine(diller[0]);",
    "mustInclude": [
      "string[]",
      "int[]"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (string[], int[]) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 14,
    "lang": "CSharp",
    "unit": 2,
    "title": "14. foreach Döngüsü ile Gezinme",
    "desc": "Koleksiyon elemanlarını gezme.",
    "theory": "foreach (var d in diller) koleksiyondaki tüm elemanları sırayla gezer.",
    "theoryCode": "foreach(string d in diller) Console.WriteLine(d);",
    "quiz": {
      "question": "Bir dizideki tüm elemanları indeksle uğraşmadan gezen döngü nedir?",
      "options": [
        "for",
        "foreach",
        "repeat"
      ],
      "correctIndex": 1
    },
    "initialCode": "string[] liste = { \"HTML\", \"CSS\", \"C#\" };\nforeach(var item in liste) {\n    Console.WriteLine(item);\n}",
    "mustInclude": [
      "foreach"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (foreach) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 15,
    "lang": "CSharp",
    "unit": 2,
    "title": "15. Generic Listeler (List<T>)",
    "desc": "Dinamik boyutlu koleksiyonlar.",
    "theory": "List<string> liste = new List<string>(); eleman eklendikçe boyutu büyür.",
    "theoryCode": "List<int> notlar = new List<int>(); notlar.Add(90);",
    "quiz": {
      "question": "Generic List'e yeni eleman eklemek için hangi metot çağrılır?",
      "options": [
        "Push()",
        "Add()",
        "Append()"
      ],
      "correctIndex": 1
    },
    "initialCode": "using System.Collections.Generic;\nList<string> kurslar = new List<string>();\nkurslar.Add(\"C# Core\");\nConsole.WriteLine(kurslar[0]);",
    "mustInclude": [
      "List<"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (List<) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 16,
    "lang": "CSharp",
    "unit": 2,
    "title": "16. Metot Bildirimi & Geri Dönüş Tipleri",
    "desc": "Fonksiyon mimarisi.",
    "theory": "static int Topla(int a, int b) { return a + b; }",
    "theoryCode": "static void Selamla() { Console.WriteLine(\"Selam!\"); }",
    "quiz": {
      "question": "Geriye değer döndürmeyen metotların dönüş tipi nedir?",
      "options": [
        "null",
        "void",
        "empty"
      ],
      "correctIndex": 1
    },
    "initialCode": "static int Kare(int x) { return x * x; }\nConsole.WriteLine(Kare(5));",
    "mustInclude": [
      "static",
      "return"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (static, return) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 17,
    "lang": "CSharp",
    "unit": 2,
    "title": "17. Parametre Aktarımı (ref & out)",
    "desc": "Referans yoluyla değişken iletme.",
    "theory": "ref değişkenin referansını verir, out metot içinde değer atanmasını zorunlu kılar.",
    "theoryCode": "static void Degistir(ref int x) { x += 10; }",
    "quiz": {
      "question": "Metot içerisinden birden fazla değer döndürmek için ne kullanılır?",
      "options": [
        "out parametresi",
        "const",
        "virtual"
      ],
      "correctIndex": 0
    },
    "initialCode": "static void Arttir(ref int sayi) { sayi += 5; }\nint a = 10;\nArttir(ref a);\nConsole.WriteLine(a);",
    "mustInclude": [
      "ref",
      "out"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (ref, out) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 18,
    "lang": "CSharp",
    "unit": 2,
    "title": "18. Metot Aşırı Yükleme (Overloading)",
    "desc": "Aynı isimde farklı parametreli metotlar.",
    "theory": "Aynı isimli fakat farklı parametre tiplerine sahip birden fazla metot tanımlanabilir.",
    "theoryCode": "static int Topla(int a, int b) { ... }\nstatic double Topla(double a, double b) { ... }",
    "quiz": {
      "question": "Aynı isimli metotların farklı parametrelerle yeniden yazılmasına ne ad verilir?",
      "options": [
        "Overriding",
        "Overloading",
        "Shadowing"
      ],
      "correctIndex": 1
    },
    "initialCode": "static int Topla(int a, int b) { return a + b; }\nstatic int Topla(int a, int b, int c) { return a + b + c; }\nConsole.WriteLine(Topla(2, 3, 5));",
    "mustInclude": [
      "Topla"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (Topla) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 19,
    "lang": "CSharp",
    "unit": 2,
    "title": "19. DateTime ile Tarih & Zaman",
    "desc": "Tarihsel verileri yönetme.",
    "theory": "DateTime.Now şu anki tarihi ve saati verir.",
    "theoryCode": "DateTime bugun = DateTime.Now; Console.WriteLine(bugun.Year);",
    "quiz": {
      "question": "Sistemin o anki tarih ve saatini veren özellik nedir?",
      "options": [
        "DateTime.Today",
        "DateTime.Now",
        "DateTime.Current"
      ],
      "correctIndex": 1
    },
    "initialCode": "DateTime simdikiZaman = DateTime.Now;\nConsole.WriteLine($\"Yıl: {simdikiZaman.Year}\");",
    "mustInclude": [
      "DateTime"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (DateTime) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 20,
    "lang": "CSharp",
    "unit": 2,
    "title": "20. MİNİ PROJE: Personel Maaş & Prim Hesaplayıcı",
    "desc": "Döngü, liste ve metot entegrasyonu.",
    "theory": "Tebrikler! 2. Bölüm bitti. Bir personelin maaşına prim ekleyen metot ve liste simülasyonu kur.",
    "theoryCode": "static double PrimHesapla(double maas, double oran) => maas + (maas * oran);",
    "quiz": {
      "question": "C#'ta dinamik büyüyebilen koleksiyon türü hangisidir?",
      "options": [
        "int[] array",
        "List<T>",
        "fixed array"
      ],
      "correctIndex": 1
    },
    "initialCode": "static double MaasHesapla(double anaMaas, double prim) {\n    return anaMaas + prim;\n}\nConsole.WriteLine($\"Toplam Gelir: {MaasHesapla(30000, 5000)} TL\");",
    "mustInclude": [
      "static",
      "return"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (static, return) yer aldığından emin olun.",
    "isMiniProject": true
  },
  {
    "id": 21,
    "lang": "CSharp",
    "unit": 3,
    "title": "21. class & new ile Nesne Üretimi",
    "desc": "OOP sınıf tasarımı.",
    "theory": "class Ogrenci { public string Ad; } Ogrenci o = new Ogrenci();",
    "theoryCode": "Araba a = new Araba(); a.Marka = \"Volvo\";",
    "quiz": {
      "question": "C#'ta bir sınıftan yeni bir nesne örneği (instance) üretmek için ne kullanılır?",
      "options": [
        "make",
        "new",
        "create"
      ],
      "correctIndex": 1
    },
    "initialCode": "class Ogrenci {\n    public string Ad;\n}\nOgrenci o = new Ogrenci();\no.Ad = \"Deniz\";\nConsole.WriteLine(o.Ad);",
    "mustInclude": [
      "class",
      "new"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (class, new) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 22,
    "lang": "CSharp",
    "unit": 3,
    "title": "22. Constructor (Yapıcı Metot)",
    "desc": "Nesne ilk değer ataması.",
    "theory": "Sınıfla aynı ada sahip ve dönüş tipi olmayan metottur. new dendiğinde çalışır.",
    "theoryCode": "public Ogrenci(string ad) { this.Ad = ad; }",
    "quiz": {
      "question": "Constructor metodunun geri dönüş tipi ne olmalıdır?",
      "options": [
        "void",
        "int",
        "Hiçbir dönüş tipi yazılmaz"
      ],
      "correctIndex": 2
    },
    "initialCode": "class Kisi {\n    public string Isim;\n    public Kisi(string isim) { Isim = isim; }\n}\nKisi k = new Kisi(\"Burak\");\nConsole.WriteLine(k.Isim);",
    "mustInclude": [
      "class"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (class) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 23,
    "lang": "CSharp",
    "unit": 3,
    "title": "23. Properties (get/set) & Encapsulation",
    "desc": "Kapsülleme.",
    "theory": "public int Yas { get; set; } ile güvenli veri erişimi sağlanır.",
    "theoryCode": "public string Ad { get; set; }",
    "quiz": {
      "question": "C#'ta özelliklerin okunmasını ve yazılmasını yöneten bloklar nedir?",
      "options": [
        "read / write",
        "get / set",
        "in / out"
      ],
      "correctIndex": 1
    },
    "initialCode": "class Urun {\n    public string Ad { get; set; }\n    public int Fiyat { get; set; }\n}\nUrun u = new Urun { Ad = \"Klavye\", Fiyat = 750 };\nConsole.WriteLine(u.Ad);",
    "mustInclude": [
      "get;",
      "set;"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (get;, set;) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 24,
    "lang": "CSharp",
    "unit": 3,
    "title": "24. Kalıtım (Inheritance: : base)",
    "desc": "Sınıf mirası.",
    "theory": "class Kopek : Hayvan { ... } Kopek sınıfı Hayvan'ın özelliklerini alır.",
    "theoryCode": "class Calisan : Kisi { public double Maas; }",
    "quiz": {
      "question": "C#'ta bir sınıftan miras almak için sınıf adının yanına hangi işaret konur?",
      "options": [
        ": (İki nokta)",
        "-> (Ok)",
        "extends"
      ],
      "correctIndex": 0
    },
    "initialCode": "class Ata { public string Soyad = \"Kaya\"; }\nclass Cocuk : Ata { }\nCocuk c = new Cocuk();\nConsole.WriteLine(c.Soyad);",
    "mustInclude": [
      "class",
      ":"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (class, :) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 25,
    "lang": "CSharp",
    "unit": 3,
    "title": "25. Polimorfizm: virtual ve override",
    "desc": "Metot ezme.",
    "theory": "Ata sınıfta virtual tanımlanan metot, çocuk sınıfta override ile ezilir.",
    "theoryCode": "public virtual void Ses() { ... }\npublic override void Ses() { ... }",
    "quiz": {
      "question": "Türemiş sınıfta bir metodu ezmek (yeniden yazmak) için hangi kelime kullanılır?",
      "options": [
        "new",
        "override",
        "replace"
      ],
      "correctIndex": 1
    },
    "initialCode": "class Hayvan { public virtual void Ses() { Console.WriteLine(\"Ses\"); } }\nclass Kedi : Hayvan { public override void Ses() { Console.WriteLine(\"Miyav\"); } }\nnew Kedi().Ses();",
    "mustInclude": [
      "virtual",
      "override"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (virtual, override) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 26,
    "lang": "CSharp",
    "unit": 3,
    "title": "26. Soyutlama (abstract & interface)",
    "desc": "Arayüz sözleşmeleri.",
    "theory": "interface IBanka { void ParaYatir(); } sınıfların uyması gereken şablondur.",
    "theoryCode": "public interface ILog { void Logla(string msg); }",
    "quiz": {
      "question": "Bir interface (arayüz) içindeki metotların gövdesi olur mu?",
      "options": [
        "Hayır, sadece metot imzası bildirilir",
        "Evet, zorunludur",
        "Sadece private metotlarda olur"
      ],
      "correctIndex": 0
    },
    "initialCode": "interface IBildirici {\n    void Bildir();\n}\nclass EmailBildirici : IBildirici {\n    public void Bildir() { Console.WriteLine(\"Mail gönderildi\"); }\n}\nnew EmailBildirici().Bildir();",
    "mustInclude": [
      "interface"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (interface) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 27,
    "lang": "CSharp",
    "unit": 3,
    "title": "27. Exception Handling (try-catch)",
    "desc": "Hata yakalama.",
    "theory": "try { ... } catch (Exception ex) { Console.WriteLine(ex.Message); }",
    "theoryCode": "try { int x = 0; int y = 10 / x; } catch(DivideByZeroException) { ... }",
    "quiz": {
      "question": "Hata olsa da olmasa da en son mutlaka çalışan blok hangisidir?",
      "options": [
        "finally",
        "always",
        "end"
      ],
      "correctIndex": 0
    },
    "initialCode": "try {\n    int a = int.Parse(\"abc\");\n} catch (Exception ex) {\n    Console.WriteLine(\"Hata yakalandı.\");\n}",
    "mustInclude": [
      "try",
      "catch"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (try, catch) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 28,
    "lang": "CSharp",
    "unit": 3,
    "title": "28. LINQ: Where, Select, OrderBy",
    "desc": "Koleksiyon sorgulama dili.",
    "theory": "var liste = notlar.Where(n => n >= 50).OrderByDescending(n => n);",
    "theoryCode": "var sonuc = sayilar.Where(x => x > 10).ToList();",
    "quiz": {
      "question": "Koleksiyon üzerinde SQL benzeri filtreleme yapan C# teknolojisi nedir?",
      "options": [
        "ADO.NET",
        "LINQ",
        "WPF"
      ],
      "correctIndex": 1
    },
    "initialCode": "using System.Linq;\nint[] sayilar = { 10, 50, 80, 20 };\nvar buyukler = sayilar.Where(x => x >= 50);\nforeach(var s in buyukler) Console.WriteLine(s);",
    "mustInclude": [
      "Where"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (Where) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 29,
    "lang": "CSharp",
    "unit": 3,
    "title": "29. Static Sınıflar & Extension Methods",
    "desc": "Yardımcı metotlar.",
    "theory": "static class Matematik { public static int Topla(int a, int b) => a+b; } new yapılamaz.",
    "theoryCode": "public static class Helper { ... }",
    "quiz": {
      "question": "static bir sınıfın nesne örneği (new ile) üretilebilir mi?",
      "options": [
        "Hayır, static sınıflar new'lenemez",
        "Evet, istenildiği kadar üretilir",
        "Sadece 1 kez üretilir"
      ],
      "correctIndex": 0
    },
    "initialCode": "static class Hesaplayici {\n    public static int Karesi(int x) => x * x;\n}\nConsole.WriteLine(Hesaplayici.Karesi(8));",
    "mustInclude": [
      "static"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (static) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 30,
    "lang": "CSharp",
    "unit": 3,
    "title": "30. MİNİ PROJE: Envanter & Stok Yönetim Sistemi",
    "desc": "OOP, LINQ ve Class mimarisi ile tam sistem.",
    "theory": "Tebrikler! C# .NET Mimarisi tamamlandı! Ürün sınıfı tanımla, List<Urun> içine at ve LINQ ile filtrele.",
    "theoryCode": "var filtreli = urunler.Where(u => u.Fiyat > 100).ToList();",
    "quiz": {
      "question": "C# dilinin arkasındaki çalışma zamanı motoru (Virtual Machine) nedir?",
      "options": [
        "CLR (Common Language Runtime)",
        "JVM",
        "V8 Engine"
      ],
      "correctIndex": 0
    },
    "initialCode": "class Urun {\n    public string Ad { get; set; }\n    public int Stok { get; set; }\n}\nvar liste = new System.Collections.Generic.List<Urun> {\n    new Urun { Ad = \"Laptop\", Stok = 15 },\n    new Urun { Ad = \"Fare\", Stok = 3 }\n};\nforeach(var u in liste) Console.WriteLine($\"{u.Ad}: {u.Stok} adet\");",
    "mustInclude": [
      "class",
      "List<"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (class, List<) yer aldığından emin olun.",
    "isMiniProject": true
  }
],
  cpp: [
  {
    "id": 1,
    "lang": "CPP",
    "unit": 1,
    "title": "1. std::cout, std::endl & main()",
    "desc": "İlk C++ programı ve I/O.",
    "theory": "#include <iostream> ile std::cout kullanarak konsola çıktı verilir.",
    "theoryCode": "std::cout << \"Merhaba COD+!\" << std::endl;",
    "quiz": {
      "question": "C++'ta ekrana çıktı akışı sağlayan standart nesne nedir?",
      "options": [
        "std::cin",
        "std::cout",
        "printf"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    std::cout << \"Merhaba C++20!\" << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "std::cout"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (std::cout) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 2,
    "lang": "CPP",
    "unit": 1,
    "title": "2. Değişken Tipleri & Boyutları (sizeof)",
    "desc": "int, float, double, char, bool.",
    "theory": "sizeof(int) bellek boyutunu byte cinsinden verir (genellikle 4 byte).",
    "theoryCode": "std::cout << sizeof(int) << std::endl;",
    "quiz": {
      "question": "Bir değişkenin bellekte kapladığı byte sayısını veren operatör nedir?",
      "options": [
        "bytesize()",
        "sizeof()",
        "length()"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    int a = 42;\n    std::cout << \"Boyut: \" << sizeof(a) << \" bytes\" << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "sizeof"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (sizeof) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 3,
    "lang": "CPP",
    "unit": 1,
    "title": "3. std::cin ile Konsol Girişi",
    "desc": "Klavyeden veri akışı.",
    "theory": "std::cin >> degisken; klavyeden girilen veriyi değişkene aktarır.",
    "theoryCode": "int yas; std::cin >> yas;",
    "quiz": {
      "question": "C++'ta klavyeden veri okumak için hangi akış nesnesi kullanılır?",
      "options": [
        "std::cout",
        "std::cin",
        "std::scanf"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    int puan = 95;\n    std::cout << \"Puan: \" << puan << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "std::cout"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (std::cout) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 4,
    "lang": "CPP",
    "unit": 1,
    "title": "4. Aritmetik ve Mantıksal İşlemler",
    "desc": "+, -, *, /, %, &&, ||.",
    "theory": "Tamsayı bölmesinde 5/2 = 2'dir. Mod için % kullanılır.",
    "theoryCode": "int kalan = 14 % 3; // 2",
    "quiz": {
      "question": "C++'ta iki tam sayı bölündüğünde sonuç ne olur?",
      "options": [
        "Tam sayı (kesir atılır)",
        "Ondalıklı sayı",
        "Derleme hatası"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nint main() {\n    std::cout << \"Sonuç: \" << (10 + 5) * 2 << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "std::cout"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (std::cout) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 5,
    "lang": "CPP",
    "unit": 1,
    "title": "5. if, else ve Mantık Blokları",
    "desc": "Karar mekanizması.",
    "theory": "if (yas >= 18) { std::cout << \"Reşit\"; } else { ... }",
    "theoryCode": "if (puan >= 50) std::cout << \"Geçti\";",
    "quiz": {
      "question": "C++'ta şart bloklarında kod gruplamak için ne kullanılır?",
      "options": [
        "Süslü parantez {}",
        "Girinti",
        "begin-end"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nint main() {\n    int notu = 80;\n    if (notu >= 50) std::cout << \"Gecti\" << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "if"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (if) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 6,
    "lang": "CPP",
    "unit": 1,
    "title": "6. switch-case Kontrol Yapısı",
    "desc": "Sabit değer dallanması.",
    "theory": "switch(deger) { case 1: ... break; } tam sayı ve char tipleriyle çalışır.",
    "theoryCode": "switch(secim) { case 1: std::cout << \"A\"; break; }",
    "quiz": {
      "question": "switch bloğundan çıkmak için ne yazılır?",
      "options": [
        "stop",
        "break",
        "continue"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    int secim = 1;\n    switch(secim) {\n        case 1: std::cout << \"Aktif\" << std::endl; break;\n    }\n    return 0;\n}",
    "mustInclude": [
      "switch",
      "case"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (switch, case) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 7,
    "lang": "CPP",
    "unit": 1,
    "title": "7. while Döngüsü",
    "desc": "Koşullu tekrar.",
    "theory": "while (sayac < 5) { sayac++; } şart sağlandığı sürece döner.",
    "theoryCode": "while(i < 3) { std::cout << i++; }",
    "quiz": {
      "question": "Döngü şartı başlangıçta yanlışsa while kaç kez çalışır?",
      "options": [
        "0 kez",
        "1 kez",
        "Sonsuz kez"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nint main() {\n    int i = 0;\n    while(i < 3) { std::cout << i << std::endl; i++; }\n    return 0;\n}",
    "mustInclude": [
      "while"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (while) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 8,
    "lang": "CPP",
    "unit": 1,
    "title": "8. for Döngüsü",
    "desc": "Sayaçlı döngü mimarisi.",
    "theory": "for (int i = 0; i < 5; i++) { ... }",
    "theoryCode": "for(int i = 0; i < 3; i++) std::cout << i;",
    "quiz": {
      "question": "Standart for döngüsünün ilk parçasında ne yapılır?",
      "options": [
        "Sayaç değişkeni tanımlanır/başlatılır",
        "Şart kontrol edilir",
        "Sayaç artırılır"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nint main() {\n    for(int i = 1; i <= 3; i++) std::cout << i << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "for"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (for) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 9,
    "lang": "CPP",
    "unit": 1,
    "title": "9. const & constexpr Bellek Sabitleri",
    "desc": "Derleme zamanı sabitleri.",
    "theory": "constexpr int limit = 100; derleme zamanında hesaplanır ve RAM tasarrufu sağlar.",
    "theoryCode": "constexpr int MAX = 500;",
    "quiz": {
      "question": "Değeri derleme aşamasında (compile-time) sabitlenen C++ anahtarı nedir?",
      "options": [
        "static",
        "constexpr",
        "inline"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    const int maxPuan = 100;\n    std::cout << \"Max: \" << maxPuan << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "const"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (const) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 10,
    "lang": "CPP",
    "unit": 1,
    "title": "10. MİNİ PROJE: Donanım Sıcaklık & Fan Kontrolcüsü",
    "desc": "1. Bölüm I/O ve karar mantığı.",
    "theory": "Tebrikler! 1. Bölüm bitti. Donanım sıcaklık eşik değerini kontrol eden ve fanı açan program yaz.",
    "theoryCode": "int sicaklik = 75; if (sicaklik > 70) std::cout << \"Fan Aktif\";",
    "quiz": {
      "question": "C++ kaynak kodlarını makine diline çeviren yazılıma ne ad verilir?",
      "options": [
        "Derleyici (Compiler)",
        "Yorumlayıcı (Interpreter)",
        "Tarayıcı (Browser)"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nint main() {\n    int isi = 82;\n    if (isi > 70) {\n        std::cout << \"UYARI: Fan %100 Calisiyor!\" << std::endl;\n    }\n    return 0;\n}",
    "mustInclude": [
      "if",
      "std::cout"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (if, std::cout) yer aldığından emin olun.",
    "isMiniProject": true
  },
  {
    "id": 11,
    "lang": "CPP",
    "unit": 2,
    "title": "11. Fonksiyon Bildirimi & Prototip",
    "desc": "Modüler fonksiyonlar.",
    "theory": "int Topla(int a, int b) { return a + b; }",
    "theoryCode": "void Selamla() { std::cout << \"Selam\"; }",
    "quiz": {
      "question": "Değer döndürmeyen fonksiyonların dönüş tipi nedir?",
      "options": [
        "null",
        "void",
        "none"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint Kare(int x) { return x * x; }\nint main() {\n    std::cout << Kare(5) << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "return"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (return) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 12,
    "lang": "CPP",
    "unit": 2,
    "title": "12. Değer ile Çağırma (Pass by Value)",
    "desc": "Parametre kopyalanması.",
    "theory": "Değer kopyalanır, orijinal değişken fonksiyon içindeki değişimden etkilenmez.",
    "theoryCode": "void Arttir(int x) { x++; }",
    "quiz": {
      "question": "Değer ile çağırmada orijinal değişken değişir mi?",
      "options": [
        "Hayır, sadece kopyası üzerinde çalışılır",
        "Evet, doğrudan değişir",
        "Hata verir"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nvoid Degistir(int a) { a = 100; }\nint main() {\n    int x = 10;\n    Degistir(x);\n    std::cout << x << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "void"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (void) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 13,
    "lang": "CPP",
    "unit": 2,
    "title": "13. Referans ile Çağırma (&)",
    "desc": "Doğrudan orijinal veriyi iletme.",
    "theory": "void Arttir(int& x) referans alır, kopyalama maliyeti sıfırdır.",
    "theoryCode": "void Takas(int& a, int& b) { ... }",
    "quiz": {
      "question": "Bir değişkenin referansını parametre olarak almak için hangi sembol kullanılır?",
      "options": [
        "*",
        "& (Adres operatörü)",
        "@"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nvoid Arttir(int& n) { n += 10; }\nint main() {\n    int val = 20;\n    Arttir(val);\n    std::cout << val << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "&"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (&) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 14,
    "lang": "CPP",
    "unit": 2,
    "title": "14. Statik Diziler & Bellek",
    "desc": "Sabit boyutlu diziler.",
    "theory": "int sayilar[5] = {1, 2, 3, 4, 5}; bellekte ardışık dizilir.",
    "theoryCode": "int dizi[3] = {10, 20, 30}; std::cout << dizi[0];",
    "quiz": {
      "question": "Diziler bellekte nasıl yerleşir?",
      "options": [
        "Ardışık (Contiguous) bellek bloklarında",
        "Rastgele yerlerde",
        "Sanal diskte"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nint main() {\n    int arr[3] = {5, 10, 15};\n    std::cout << arr[0] << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "int arr["
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (int arr[) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 15,
    "lang": "CPP",
    "unit": 2,
    "title": "15. Pointer (İşaretçi) Mantığı & & (Adres)",
    "desc": "Bellek adresi kavramı.",
    "theory": "int* ptr = &sayi; ptr sayının bellekteki hex adresini (0x...) tutar.",
    "theoryCode": "int a = 10; int* p = &a; std::cout << p;",
    "quiz": {
      "question": "Bir değişkenin bellekteki adresini almak için hangi operatör kullanılır?",
      "options": [
        "*",
        "& (Adres operatörü)",
        "%"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    int x = 42;\n    int* p = &x;\n    std::cout << \"Adres alindi\" << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "int*",
      "&"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (int*, &) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 16,
    "lang": "CPP",
    "unit": 2,
    "title": "16. * (Dereference) ile Değere Ulaşma",
    "desc": "Adresteki veriyi okuma ve yazma.",
    "theory": "*ptr adresteki değeri verir. *ptr = 100 adresteki değeri günceller.",
    "theoryCode": "std::cout << *ptr << std::endl;",
    "quiz": {
      "question": "Pointer'ın işaret ettiği adresteki gerçek veriye ulaşmaya ne ad verilir?",
      "options": [
        "Referencing",
        "Dereferencing (*)",
        "Indexing"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    int sayi = 50;\n    int* ptr = &sayi;\n    std::cout << *ptr << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "*ptr"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (*ptr) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 17,
    "lang": "CPP",
    "unit": 2,
    "title": "17. Dinamik Bellek: new ve delete",
    "desc": "Heap bellek yönetimi.",
    "theory": "int* p = new int(10); Heap'ten yer alır. delete p; ile iade edilir.",
    "theoryCode": "int* dizi = new int[10];\ndelete[] dizi;",
    "quiz": {
      "question": "new ile Heap'ten alınan belleği işletim sistemine iade eden komut nedir?",
      "options": [
        "free",
        "delete",
        "clear"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    int* p = new int(100);\n    std::cout << *p << std::endl;\n    delete p;\n    return 0;\n}",
    "mustInclude": [
      "new",
      "delete"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (new, delete) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 18,
    "lang": "CPP",
    "unit": 2,
    "title": "18. Bellek Sızıntısı (Memory Leak) Önleme",
    "desc": "delete edilmeyen işaretçiler.",
    "theory": "delete yapılmazsa RAM şişer ve sistem yavaşlar.",
    "theoryCode": "// Her new için mutlaka bir delete yazılmalıdır!",
    "quiz": {
      "question": "Ayrılan belleğin serbest bırakılmaması sonucu oluşan sorun nedir?",
      "options": [
        "Buffer Overflow",
        "Memory Leak (Bellek Sızıntısı)",
        "Stack Overflow"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    int* ptr = new int(25);\n    delete ptr;\n    ptr = nullptr;\n    std::cout << \"Bellek temizlendi.\" << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "delete",
      "nullptr"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (delete, nullptr) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 19,
    "lang": "CPP",
    "unit": 2,
    "title": "19. std::vector ile Dinamik Dizi",
    "desc": "Modern STL dizisi.",
    "theory": "#include <vector> std::vector<int> v; v.push_back(10); otomatik büyür.",
    "theoryCode": "std::vector<int> vec = {1, 2, 3}; vec.push_back(4);",
    "quiz": {
      "question": "std::vector'ün sonuna yeni eleman ekleyen fonksiyon nedir?",
      "options": [
        "append()",
        "push_back()",
        "insert_end()"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> v = {10, 20};\n    v.push_back(30);\n    std::cout << v.size() << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "std::vector",
      "push_back"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (std::vector, push_back) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 20,
    "lang": "CPP",
    "unit": 2,
    "title": "20. MİNİ PROJE: RAM Bellek Blok Tahsis Simülatörü",
    "desc": "Pointer ve vector ile dinamik tahsis.",
    "theory": "Tebrikler! 2. Bölüm bitti. Dinamik dizi oluşturan, değer atayan ve temizleyen simülatör yaz.",
    "theoryCode": "int* blok = new int[5]; for(int i=0; i<5; i++) blok[i] = i*10; delete[] blok;",
    "quiz": {
      "question": "new[] ile ayrılan bir diziyi serbest bırakırken hangi komut kullanılır?",
      "options": [
        "delete",
        "delete[]",
        "free[]"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nint main() {\n    int* blok = new int[3]{10, 20, 30};\n    std::cout << \"Blok 0: \" << blok[0] << std::endl;\n    delete[] blok;\n    return 0;\n}",
    "mustInclude": [
      "new",
      "delete[]"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (new, delete[]) yer aldığından emin olun.",
    "isMiniProject": true
  },
  {
    "id": 21,
    "lang": "CPP",
    "unit": 3,
    "title": "21. class & struct Farkı",
    "desc": "Nesne yönelimli C++.",
    "theory": "class içinde varsayılan erişim private, struct içinde ise public'tir.",
    "theoryCode": "class Araba { public: int hiz; };",
    "quiz": {
      "question": "C++'ta class ve struct arasındaki temel fark nedir?",
      "options": [
        "Varsayılan erişim belirteci (private vs public)",
        "struct'ta metot tanımlanamaz",
        "class daha yavaştır"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nclass Cihaz {\npublic:\n    int id = 1;\n};\nint main() {\n    Cihaz c;\n    std::cout << c.id << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "class",
      "public:"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (class, public:) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 22,
    "lang": "CPP",
    "unit": 3,
    "title": "22. public, private & Erişim Belirteçleri",
    "desc": "Veri gizleme.",
    "theory": "private verilere sadece sınıfın kendi metotları erişebilir.",
    "theoryCode": "class Kasa { private: int sifre; public: int getSifre(); };",
    "quiz": {
      "question": "Sınıf dışından erişimi tamamen engelleyen anahtar kelime nedir?",
      "options": [
        "protected",
        "private",
        "hidden"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nclass Kasa {\nprivate:\n    int bakiye = 500;\npublic:\n    int GetBakiye() { return bakiye; }\n};\nint main() {\n    Kasa k;\n    std::cout << k.GetBakiye() << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "private:",
      "public:"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (private:, public:) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 23,
    "lang": "CPP",
    "unit": 3,
    "title": "23. Constructor & Destructor",
    "desc": "Kurucu ve yıkıcı metotlar.",
    "theory": "Cihaz() kurar, ~Cihaz() nesne yok olduğunda kaynakları temizler.",
    "theoryCode": "class Cihaz { public: Cihaz(); ~Cihaz(); };",
    "quiz": {
      "question": "Yıkıcı (Destructor) metodun önünde hangi sembol yer alır?",
      "options": [
        "~ (Tilde)",
        "!",
        "#"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nclass Nesne {\npublic:\n    Nesne() { std::cout << \"Olustu\"; }\n    ~Nesne() { std::cout << \"Silindi\"; }\n};\nint main() {\n    Nesne n;\n    return 0;\n}",
    "mustInclude": [
      "~"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (~) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 24,
    "lang": "CPP",
    "unit": 3,
    "title": "24. Copy Constructor & Kopyalama",
    "desc": "Derin kopyalama (Deep Copy).",
    "theory": "ClassName(const ClassName& other); nesneler kopyalandığında çağrılır.",
    "theoryCode": "Nokta(const Nokta& n) { x = n.x; y = n.y; }",
    "quiz": {
      "question": "Pointer barındıran sınıflarda sığ kopyalama (shallow copy) yerine ne yapılmalıdır?",
      "options": [
        "Deep copy (Derin kopyalama)",
        "Hiç kopyalanmamalıdır",
        "delete kaldırılmalıdır"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nclass Nokta {\npublic:\n    int x;\n    Nokta(int v) : x(v) {}\n    Nokta(const Nokta& d) { x = d.x; }\n};\nint main() {\n    Nokta n1(10);\n    Nokta n2 = n1;\n    std::cout << n2.x << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "const Nokta&"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (const Nokta&) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 25,
    "lang": "CPP",
    "unit": 3,
    "title": "25. Kalıtım (Inheritance: public Base)",
    "desc": "Ata sınıftan miras alma.",
    "theory": "class Kedi : public Hayvan { ... }",
    "theoryCode": "class Araba : public Arac { ... };",
    "quiz": {
      "question": "Türemiş sınıf ata sınıfın public üyelerini public korumak için nasıl miras almalıdır?",
      "options": [
        ": public Base",
        ": private Base",
        ": extends Base"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nclass Ata { public: int deger = 100; };\nclass Ogul : public Ata {};\nint main() {\n    Ogul o;\n    std::cout << o.deger << std::endl;\n    return 0;\n}",
    "mustInclude": [
      ": public"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (: public) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 26,
    "lang": "CPP",
    "unit": 3,
    "title": "26. Sanal Fonksiyonlar (virtual) & VTable",
    "desc": "Çalışma zamanı polimorfizmi.",
    "theory": "virtual void Ses() { ... } ata sınıfta işaretlenir, türemiş sınıfta ezilir.",
    "theoryCode": "virtual void Calis() = 0;",
    "quiz": {
      "question": "C++'ta dinamik (çalışma zamanı) polimorfizm sağlamak için metot hangi kelimeyle işaretlenir?",
      "options": [
        "abstract",
        "virtual",
        "dynamic"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\nclass Hayvan {\npublic:\n    virtual void Ses() { std::cout << \"Ses\"; }\n};\nclass Kopek : public Hayvan {\npublic:\n    void Ses() override { std::cout << \"Hav\"; }\n};\nint main() {\n    Hayvan* h = new Kopek();\n    h->Ses();\n    delete h;\n    return 0;\n}",
    "mustInclude": [
      "virtual",
      "override"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (virtual, override) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 27,
    "lang": "CPP",
    "unit": 3,
    "title": "27. Saf Sanal Fonksiyonlar & Arayüzler",
    "desc": "Soyut sınıflar (Abstract Class).",
    "theory": "virtual void Calis() = 0; içeren sınıftan doğrudan nesne üretilemez.",
    "theoryCode": "class IArayuz { public: virtual void Basla() = 0; };",
    "quiz": {
      "question": "= 0 ile tanımlanan ve gövdesi olmayan sanal fonksiyonlara ne denir?",
      "options": [
        "Pure Virtual Function (Saf Sanal Fonksiyon)",
        "Null Function",
        "Inline Function"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\nclass IArayuz {\npublic:\n    virtual void Calis() = 0;\n};\nclass Motor : public IArayuz {\npublic:\n    void Calis() override { std::cout << \"Motor Aktif\"; }\n};\nint main() {\n    Motor m;\n    m.Calis();\n    return 0;\n}",
    "mustInclude": [
      "= 0",
      "virtual"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (= 0, virtual) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 28,
    "lang": "CPP",
    "unit": 3,
    "title": "28. Şablonlar (Templates: template<typename T>)",
    "desc": "Türden bağımsız jenerik kodlama.",
    "theory": "template <typename T> T Topla(T a, T b) { return a + b; }",
    "theoryCode": "template <typename T> void Yazdir(T deger) { std::cout << deger; }",
    "quiz": {
      "question": "C++'ta türden bağımsız jenerik fonksiyon ve sınıf yazmayı sağlayan mekanizma nedir?",
      "options": [
        "Generic",
        "Templates (Şablonlar)",
        "Macro"
      ],
      "correctIndex": 1
    },
    "initialCode": "#include <iostream>\ntemplate <typename T>\nT Maks(T a, T b) { return (a > b) ? a : b; }\nint main() {\n    std::cout << Maks(10, 20) << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "template",
      "typename"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (template, typename) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 29,
    "lang": "CPP",
    "unit": 3,
    "title": "29. std::unique_ptr & Akıllı İşaretçiler",
    "desc": "Otomatik bellek temizliği (RAII).",
    "theory": "#include <memory> std::unique_ptr<int> p = std::make_unique<int>(10); delete gerekmez!",
    "theoryCode": "auto ptr = std::make_unique<Cihaz>();",
    "quiz": {
      "question": "Kapsam dışına çıkıldığında belleği otomatik olarak serbest bırakan modern işaretçi nedir?",
      "options": [
        "std::unique_ptr",
        "raw pointer",
        "void*"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\n#include <memory>\nint main() {\n    auto p = std::make_unique<int>(99);\n    std::cout << *p << std::endl;\n    return 0;\n}",
    "mustInclude": [
      "std::make_unique",
      "std::unique_ptr"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (std::make_unique, std::unique_ptr) yer aldığından emin olun.",
    "isMiniProject": false
  },
  {
    "id": 30,
    "lang": "CPP",
    "unit": 3,
    "title": "30. MİNİ PROJE: Gömülü Sistem Cihaz Yöneticisi",
    "desc": "OOP, smart pointers ve kalıtım ile tam mimari.",
    "theory": "Tebrikler! C++ Mimarisi tamamlandı! Cihaz ata sınıfı kur, akıllı işaretçilerle nesne yönet.",
    "theoryCode": "std::vector<std::unique_ptr<Cihaz>> cihazlar;",
    "quiz": {
      "question": "C++'ta kaynak yönetimini nesnenin ömrüne bağlayan felsefe nedir?",
      "options": [
        "RAII (Resource Acquisition Is Initialization)",
        "SOLID",
        "KISS"
      ],
      "correctIndex": 0
    },
    "initialCode": "#include <iostream>\n#include <memory>\n#include <vector>\nclass Sensor {\npublic:\n    virtual void Oku() { std::cout << \"Sensor Verisi: 24 C\" << std::endl; }\n};\nint main() {\n    auto s = std::make_unique<Sensor>();\n    s->Oku();\n    return 0;\n}",
    "mustInclude": [
      "class",
      "virtual"
    ],
    "errorMsg": "Lütfen kodunuzda istenen anahtar ifadelerin (class, virtual) yer aldığından emin olun.",
    "isMiniProject": true
  }
],
  css: [
  {
    "id": 1,
    "lang": "CSS",
    "unit": 1,
    "title": "1. CSS'e Giriş & Renkler",
    "desc": "Stil kuralları ve renk paletleri.",
    "theory": "CSS HTML elemanlarını görselleştirir. color metin rengini, background-color arka planı belirler.",
    "theoryCode": "body { background-color: #0f172a; color: #f8fafc; }",
    "quiz": {
      "question": "Metin rengini değiştirmek için hangi CSS kuralı kullanılır?",
      "options": [
        "text-color",
        "color",
        "font-color"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  h1 { color: #3b82f6; }\n</style>\n<h1>Mavi Başlık</h1>",
    "mustInclude": [
      "color:"
    ],
    "errorMsg": "Lütfen kodunuzda color: kuralını kullandığınızdan emin olun.",
    "isMiniProject": false
  },
  {
    "id": 2,
    "lang": "CSS",
    "unit": 1,
    "title": "2. Fontlar & Tipografi",
    "desc": "Yazı tipleri ve boyutlandırma.",
    "theory": "font-size metin boyutunu (px, rem), font-weight kalınlığını, font-family yazı tipini belirler.",
    "theoryCode": "p { font-size: 16px; font-weight: bold; }",
    "quiz": {
      "question": "Yazının puntosunu (boyutunu) ayarlayan kural hangisidir?",
      "options": [
        "font-size",
        "text-size",
        "font-height"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  p { font-size: 18px; font-weight: bold; }\n</style>\n<p>Büyük ve kalın yazı.</p>",
    "mustInclude": [
      "font-size"
    ],
    "errorMsg": "Lütfen kodunuzda font-size kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 3,
    "lang": "CSS",
    "unit": 1,
    "title": "3. Metin Hizalama (text-align)",
    "desc": "Metinleri sola, sağa veya ortaya hizalama.",
    "theory": "text-align özelliği metinleri center, left veya right olarak hizalar.",
    "theoryCode": "h1 { text-align: center; }",
    "quiz": {
      "question": "Metni yatayda ortalamak için ne kullanılır?",
      "options": [
        "align: center",
        "text-align: center",
        "center: true"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  h1 { text-align: center; }\n</style>\n<h1>Ortalanmış Başlık</h1>",
    "mustInclude": [
      "text-align"
    ],
    "errorMsg": "Lütfen text-align özelliğini kullanın.",
    "isMiniProject": false
  },
  {
    "id": 4,
    "lang": "CSS",
    "unit": 1,
    "title": "4. CSS Seçicileri: Sınıf & ID",
    "desc": "Nokta (.) sınıfı, kare (#) tekil ID'yi hedefler.",
    "theory": ".btn tüm btn sınıflı elemanları, #ana-baslik ise o ID'li tekil elemanı hedefler.",
    "theoryCode": ".kart { background: #1e293b; }\n#ozel { color: #f59e0b; }",
    "quiz": {
      "question": "CSS'te bir sınıfı (class) hangi işaretle seçeriz?",
      "options": [
        ". (nokta)",
        "# (kare)",
        "@ (at)"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .vurgu { color: #10b981; font-weight: bold; }\n</style>\n<p class='vurgu'>Yeşil Vurgu</p>",
    "mustInclude": [
      ".vurgu"
    ],
    "errorMsg": "Lütfen .vurgu sınıf seçicisini tanımlayın.",
    "isMiniProject": false
  },
  {
    "id": 5,
    "lang": "CSS",
    "unit": 1,
    "title": "5. Arka Planlar & Gradyanlar",
    "desc": "linear-gradient ve arka plan resimleri.",
    "theory": "background: linear-gradient(135deg, #38bdf8, #818cf8) ile iki veya daha fazla renk arasında geçiş oluşturulur.",
    "theoryCode": ".banner { background: linear-gradient(90deg, #3b82f6, #10b981); }",
    "quiz": {
      "question": "CSS'te renk geçişi (gradyan) oluşturan fonksiyon hangisidir?",
      "options": [
        "gradient-color()",
        "linear-gradient()",
        "color-blend()"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  .kutu { background: linear-gradient(135deg, #0284c7, #38bdf8); height: 80px; }\n</style>\n<div class='kutu'></div>",
    "mustInclude": [
      "linear-gradient"
    ],
    "errorMsg": "Lütfen linear-gradient ifadesini kullanın.",
    "isMiniProject": false
  },
  {
    "id": 6,
    "lang": "CSS",
    "unit": 1,
    "title": "6. Display Özellikleri (block & inline)",
    "desc": "Elemanların sayfa içi davranış türleri.",
    "theory": "block tüm satırı kaplar, inline sadece içeriği kadar yer tutar, inline-block ise genişlik/yükseklik alabilir.",
    "theoryCode": "span { display: inline-block; width: 100px; }",
    "quiz": {
      "question": "Satırın tamamını kaplayıp alt satıra geçen display tipi hangisidir?",
      "options": [
        "block",
        "inline",
        "hidden"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  span.kutu { display: inline-block; width: 120px; background: #334155; }\n</style>\n<span class='kutu'>Kutu</span>",
    "mustInclude": [
      "display:"
    ],
    "errorMsg": "Lütfen display özelliğini tanımlayın.",
    "isMiniProject": false
  },
  {
    "id": 7,
    "lang": "CSS",
    "unit": 1,
    "title": "7. CSS Birimleri (px, rem, vh, vw)",
    "desc": "Piksel ve duyarlı (responsive) birimler.",
    "theory": "rem kök yazı boyutuna (genelde 16px) oranla hesaplanır, vh ve vw ise ekran pencere genişlik/yüksekliğidir.",
    "theoryCode": "h1 { font-size: 2rem; }\n.hero { height: 100vh; }",
    "quiz": {
      "question": "1rem varsayılan tarayıcı ayarlarında yaklaşık kaç pikseldir?",
      "options": [
        "10px",
        "16px",
        "24px"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  .kart { font-size: 1.5rem; padding: 1rem; }\n</style>\n<div class='kart'>Rem ile boyutlandırma</div>",
    "mustInclude": [
      "rem"
    ],
    "errorMsg": "Lütfen rem birimini kullanın.",
    "isMiniProject": false
  },
  {
    "id": 8,
    "lang": "CSS",
    "unit": 1,
    "title": "8. Durum Seçicileri (:hover & :focus)",
    "desc": "Kullanıcı fareyi üzerine getirdiğinde stil değiştirme.",
    "theory": "a:hover veya button:hover ile imleç üzerindeyken renk ve efekt değişimi yapılır.",
    "theoryCode": "button:hover { background: #2563eb; }",
    "quiz": {
      "question": "İmleç bir butonun üzerine geldiğinde tetiklenen pseudo-class hangisidir?",
      "options": [
        ":active",
        ":hover",
        ":focus"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  .btn:hover { background-color: #22c55e; color: white; }\n</style>\n<button class='btn'>Üzerime Gel</button>",
    "mustInclude": [
      ":hover"
    ],
    "errorMsg": "Lütfen :hover seçicisini kullanın.",
    "isMiniProject": false
  },
  {
    "id": 9,
    "lang": "CSS",
    "unit": 1,
    "title": "9. Gölgelendirme (box-shadow & text-shadow)",
    "desc": "Derinlik ve estetik gölge efektleri.",
    "theory": "box-shadow: 0 10px 20px rgba(0,0,0,0.2) elemana yumuşak derinlik hissi katar.",
    "theoryCode": ".kart { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }",
    "quiz": {
      "question": "Kutulara derinlik gölgesi veren kural hangisidir?",
      "options": [
        "box-shadow",
        "shadow-box",
        "drop-shadow"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .kart { box-shadow: 0 8px 16px rgba(0,0,0,0.3); padding: 20px; }\n</style>\n<div class='kart'>Gölgeli Kart</div>",
    "mustInclude": [
      "box-shadow"
    ],
    "errorMsg": "Lütfen box-shadow kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 10,
    "lang": "CSS",
    "unit": 1,
    "title": "10. MİNİ PROJE: Modern Profil & Buton Kartı",
    "desc": "1. Bölümde öğrendiğin tüm CSS stil kurallarını birleştir.",
    "theory": "Tebrikler 1. Bölüm bitti! Renkler, fontlar, gölgeler ve hover efektleriyle göz alıcı bir kart inşa et.",
    "theoryCode": ".profil-kart { background: #1e293b; color: white; border-radius: 16px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }",
    "quiz": {
      "question": "CSS'te bir kutunun köşelerini yuvarlatan özellik nedir?",
      "options": [
        "corner-round",
        "border-radius",
        "border-round"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  .profil-kart {\n    background: #0f172a;\n    color: #f8fafc;\n    border-radius: 16px;\n    padding: 20px;\n    box-shadow: 0 8px 20px rgba(0,0,0,0.3);\n  }\n</style>\n<div class='profil-kart'>\n  <h2>Deniz Kaya</h2>\n  <p>CSS Uzmanı</p>\n</div>",
    "mustInclude": [
      "border-radius",
      "box-shadow"
    ],
    "errorMsg": "Lütfen border-radius ve box-shadow kurallarını kartınıza uygulayın.",
    "isMiniProject": true
  },
  {
    "id": 11,
    "lang": "CSS",
    "unit": 2,
    "title": "11. Box Model: Margin & Padding",
    "desc": "İç boşluk (padding) ve dış boşluk (margin).",
    "theory": "Padding kutunun içiyle içerik arasındaki boşluktur, margin ise komşu elemanlar arasındaki mesafedir.",
    "theoryCode": ".kutu { padding: 20px; margin: 15px; }",
    "quiz": {
      "question": "Bir nesnenin kenarlık ile içerik arasındaki iç boşluğunu ne ayarlar?",
      "options": [
        "margin",
        "padding",
        "border"
      ],
      "correctIndex": 1
    },
    "initialCode": "<style>\n  .kutu { padding: 15px; margin: 10px; background: #1e293b; color: white; }\n</style>\n<div class='kutu'>Kutu</div>",
    "mustInclude": [
      "padding"
    ],
    "errorMsg": "Lütfen padding kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 12,
    "lang": "CSS",
    "unit": 2,
    "title": "12. Kenarlıklar (Border & Radius)",
    "desc": "Çerçeve kalınlığı, tipi ve köşe yuvarlatma.",
    "theory": "border: 2px solid #38bdf8; border-radius: 12px; ile çerçeve ve yuvarlak hatlar verilir.",
    "theoryCode": ".panel { border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; }",
    "quiz": {
      "question": "Köşeleri yuvarlatmaya yarayan CSS kuralı hangisidir?",
      "options": [
        "border-radius",
        "corner-radius",
        "border-curve"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .kart { border: 2px solid #38bdf8; border-radius: 12px; padding: 10px; }\n</style>\n<div class='kart'>Mavi Çerçeve</div>",
    "mustInclude": [
      "border-radius"
    ],
    "errorMsg": "Lütfen border-radius kuralını uygulayın.",
    "isMiniProject": false
  },
  {
    "id": 13,
    "lang": "CSS",
    "unit": 2,
    "title": "13. Flexbox: Giriş & display flex",
    "desc": "Elemanları esnek düzenle yan yana sıralama.",
    "theory": "display: flex kapsayıcı içindeki tüm çocuk elemanları esnek kutu modeline sokar.",
    "theoryCode": ".satir { display: flex; }",
    "quiz": {
      "question": "Flexbox mimarisini başlatmak için kapsayıcıya ne yazılır?",
      "options": [
        "display: flex",
        "flex: true",
        "layout: flexbox"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .menu { display: flex; gap: 12px; }\n</style>\n<div class='menu'><span>Anasayfa</span><span>Dersler</span></div>",
    "mustInclude": [
      "display: flex"
    ],
    "errorMsg": "Lütfen display: flex kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 14,
    "lang": "CSS",
    "unit": 2,
    "title": "14. Flexbox: justify-content ile Yatay Hizalama",
    "desc": "space-between, center, flex-start mantığı.",
    "theory": "justify-content ana eksende (varsayılan yatayda) elemanları dağıtır.",
    "theoryCode": ".nav { display: flex; justify-content: space-between; }",
    "quiz": {
      "question": "Elemanları iki uca yaslamak için hangi justify-content değeri kullanılır?",
      "options": [
        "space-between",
        "space-around",
        "center"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .bar { display: flex; justify-content: space-between; }\n</style>\n<div class='bar'><span>Logo</span><span>Giriş</span></div>",
    "mustInclude": [
      "justify-content"
    ],
    "errorMsg": "Lütfen justify-content kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 15,
    "lang": "CSS",
    "unit": 2,
    "title": "15. Flexbox: align-items ile Dikey Hizalama",
    "desc": "Elemanları dikey eksende kusursuz ortalama.",
    "theory": "align-items: center çocukları dikey eksenin tam ortasına hizalar.",
    "theoryCode": ".hero { display: flex; align-items: center; justify-content: center; height: 200px; }",
    "quiz": {
      "question": "Dikey eksende ortalama yapan kural hangisidir?",
      "options": [
        "align-items: center",
        "vertical-align: middle",
        "dikey: orta"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .kutu { display: flex; align-items: center; height: 100px; }\n</style>\n<div class='kutu'><span>Dikey Ortalanmış</span></div>",
    "mustInclude": [
      "align-items"
    ],
    "errorMsg": "Lütfen align-items kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 16,
    "lang": "CSS",
    "unit": 2,
    "title": "16. CSS Grid: display grid & Şablon",
    "desc": "İki boyutlu ızgara yerleşim mimarisi.",
    "theory": "display: grid; grid-template-columns: repeat(3, 1fr); ile eşit 3 sütunlu ızgara oluşturulur.",
    "theoryCode": ".galeri { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }",
    "quiz": {
      "question": "Grid sütun sayısını ve genişliğini belirleyen kural hangisidir?",
      "options": [
        "grid-template-columns",
        "grid-cols",
        "columns-count"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }\n</style>\n<div class='grid'><div>1</div><div>2</div></div>",
    "mustInclude": [
      "grid-template-columns"
    ],
    "errorMsg": "Lütfen grid-template-columns kuralını uygulayın.",
    "isMiniProject": false
  },
  {
    "id": 17,
    "lang": "CSS",
    "unit": 2,
    "title": "17. CSS Grid: gap ile Boşluk Bırakma",
    "desc": "Satır ve sütunlar arasına modern boşluk verme.",
    "theory": "gap: 16px tüm ızgara hücreleri arasına eşit mesafeli aralık koyar.",
    "theoryCode": ".kartlar { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }",
    "quiz": {
      "question": "Grid veya Flex kutular arasına boşluk veren modern CSS özelliği nedir?",
      "options": [
        "gap",
        "space",
        "between"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .kapsayici { display: flex; gap: 15px; }\n</style>\n<div class='kapsayici'><div>A</div><div>B</div></div>",
    "mustInclude": [
      "gap"
    ],
    "errorMsg": "Lütfen gap özelliğini kullanın.",
    "isMiniProject": false
  },
  {
    "id": 18,
    "lang": "CSS",
    "unit": 2,
    "title": "18. Konumlandırma: relative & absolute",
    "desc": "Elemanları serbestçe istenen piksele yerleştirme.",
    "theory": "Kapsayıcıya position: relative, içindeki elemana position: absolute; top: 10px; right: 10px; verilir.",
    "theoryCode": ".kapsayici { position: relative; }\n.rozet { position: absolute; top: 0; right: 0; }",
    "quiz": {
      "question": "Bir elemanı en yakın konumlandırılmış üst öğesine göre sabitlemek için hangi position kullanılır?",
      "options": [
        "absolute",
        "fixed",
        "static"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .kutu { position: relative; height: 100px; background: #334155; }\n  .etiket { position: absolute; top: 5px; right: 5px; }\n</style>\n<div class='kutu'><span class='etiket'>Yeni</span></div>",
    "mustInclude": [
      "position: absolute"
    ],
    "errorMsg": "Lütfen position: absolute kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 19,
    "lang": "CSS",
    "unit": 2,
    "title": "19. Sabit Konumlandırma: fixed & sticky",
    "desc": "Kaydırıldıkça ekranda sabit kalan menüler.",
    "theory": "position: fixed pencereye sabitler, position: sticky ise belirli bir kaydırma noktasına gelince yapışır.",
    "theoryCode": ".ust-menu { position: sticky; top: 0; z-index: 100; }",
    "quiz": {
      "question": "Ekran kaydırılsa dahi hep en üstte yapışık kalan menü position değeri nedir?",
      "options": [
        "sticky",
        "relative",
        "inline"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .header { position: sticky; top: 0; background: #0f172a; color: white; }\n</style>\n<header class='header'>Yapışkan Menü</header>",
    "mustInclude": [
      "position: sticky"
    ],
    "errorMsg": "Lütfen position: sticky kuralını uygulayın.",
    "isMiniProject": false
  },
  {
    "id": 20,
    "lang": "CSS",
    "unit": 2,
    "title": "20. MİNİ PROJE: Flexbox & Grid Vitrin Paneli",
    "desc": "2. Bölümün sonu: E-ticaret ürün vitrin kartları ızgarası.",
    "theory": "Tebrikler 2. Bölüm tamamlandı! Flexbox ve Grid mimarisini birleştirerek ürün vitrini inşa et.",
    "theoryCode": ".vitrin { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }",
    "quiz": {
      "question": "Hem Flex hem Grid'de elemanların dizilimini sağlayan ana display tipi nedir?",
      "options": [
        "display: grid / flex",
        "type: layout",
        "table: modern"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .vitrin {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n  }\n  .urun { background: #1e293b; padding: 16px; border-radius: 12px; color: white; }\n</style>\n<div class='vitrin'>\n  <div class='urun'>Ürün 1</div>\n  <div class='urun'>Ürün 2</div>\n</div>",
    "mustInclude": [
      "display: grid",
      "gap:"
    ],
    "errorMsg": "Lütfen display: grid ve gap kurallarını vitrininize uygulayın.",
    "isMiniProject": true
  },
  {
    "id": 21,
    "lang": "CSS",
    "unit": 3,
    "title": "21. Media Queries: @media ile Mobil Uyum",
    "desc": "Telefon ve tablet ekranları için dinamik CSS.",
    "theory": "@media (max-width: 768px) { .menu { flex-direction: column; } } ile mobil kurallar yazılır.",
    "theoryCode": "@media (max-width: 600px) { body { font-size: 14px; } }",
    "quiz": {
      "question": "Mobil ekranlara özel stil yazmak için hangi kural kullanılır?",
      "options": [
        "@media",
        "@screen",
        "@device"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  @media (max-width: 600px) {\n    .kutu { width: 100%; }\n  }\n</style>\n<div class='kutu'>Responsive Kutu</div>",
    "mustInclude": [
      "@media"
    ],
    "errorMsg": "Lütfen @media kuralını ekleyin.",
    "isMiniProject": false
  },
  {
    "id": 22,
    "lang": "CSS",
    "unit": 3,
    "title": "22. Akıcı Geçişler (transition)",
    "desc": "Renk ve boyut değişimlerini yumuşatma.",
    "theory": "transition: all 0.3s ease; animasyon yumuşaklığı ve akıcılık kazandırır.",
    "theoryCode": ".btn { transition: background 0.3s ease, transform 0.2s ease; }",
    "quiz": {
      "question": "Stil değişimlerinin ani değil yumuşak gerçekleşmesini ne sağlar?",
      "options": [
        "transition",
        "transform",
        "smooth"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .btn { transition: all 0.3s ease; background: #3b82f6; }\n  .btn:hover { background: #1d4ed8; }\n</style>\n<button class='btn'>Yumuşak Geçiş</button>",
    "mustInclude": [
      "transition"
    ],
    "errorMsg": "Lütfen transition özelliğini kullanın.",
    "isMiniProject": false
  },
  {
    "id": 23,
    "lang": "CSS",
    "unit": 3,
    "title": "23. Transform: rotate, scale, translate",
    "desc": "Döndürme, büyütme ve kaydırma efektleri.",
    "theory": "transform: translateY(-5px) scale(1.02); kartların üzerine gelindiğinde yukarı süzülmesini sağlar.",
    "theoryCode": ".kart:hover { transform: translateY(-4px); }",
    "quiz": {
      "question": "Bir nesneyi 5 piksel yukarı kaydırmak için ne yazılır?",
      "options": [
        "transform: translateY(-5px)",
        "move-y: -5px",
        "shift: up 5px"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .kart:hover { transform: scale(1.05); }\n</style>\n<div class='kart'>Büyüyen Kart</div>",
    "mustInclude": [
      "transform:"
    ],
    "errorMsg": "Lütfen transform özelliğini kullanın.",
    "isMiniProject": false
  },
  {
    "id": 24,
    "lang": "CSS",
    "unit": 3,
    "title": "24. Keyframe Animasyonları (@keyframes)",
    "desc": "Kendi döngüsel animasyonlarını kodla.",
    "theory": "@keyframes yanip-son { 0% { opacity: 0; } 100% { opacity: 1; } } ve animation: yanip-son 1s infinite;",
    "theoryCode": "@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }",
    "quiz": {
      "question": "Özel kare kare animasyon tanımlamak için hangi CSS kuralı kullanılır?",
      "options": [
        "@keyframes",
        "@animate",
        "@motion"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } }\n  .roket { animation: float 2s infinite ease-in-out; }\n</style>\n<div class='roket'>🚀 Uçan Roket</div>",
    "mustInclude": [
      "@keyframes",
      "animation:"
    ],
    "errorMsg": "Lütfen @keyframes ve animation: kurallarını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 25,
    "lang": "CSS",
    "unit": 3,
    "title": "25. CSS Değişkenleri (Variables / :root)",
    "desc": "Tek noktadan tema renklerini yönetme.",
    "theory": ":root { --ana-renk: #38bdf8; } ve var(--ana-renk) ile global tema yönetimi yapılır.",
    "theoryCode": ":root { --primary: #3b82f6; }\n.btn { background: var(--primary); }",
    "quiz": {
      "question": "CSS değişkenini çağırmak için hangi fonksiyon kullanılır?",
      "options": [
        "var()",
        "val()",
        "get()"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  :root { --ana-renk: #38bdf8; }\n  h1 { color: var(--ana-renk); }\n</style>\n<h1>Değişkenli Renk</h1>",
    "mustInclude": [
      "--ana-renk",
      "var("
    ],
    "errorMsg": "Lütfen CSS değişkeni (--ana-renk) ve var() fonksiyonunu kullanın.",
    "isMiniProject": false
  },
  {
    "id": 26,
    "lang": "CSS",
    "unit": 3,
    "title": "26. Saydamlık & Opaklık (opacity & rgba)",
    "desc": "Saydam zeminler ve cam morfizim efektleri.",
    "theory": "background: rgba(15, 23, 42, 0.75); alfa kanalı ile %75 görünürlük verir.",
    "theoryCode": ".cam { background: rgba(255,255,255,0.08); backdrop-filter: blur(12px); }",
    "quiz": {
      "question": "RGBA renk fonksiyonundaki 'A' harfi neyi temsil eder?",
      "options": [
        "Alpha (Saydamlık)",
        "Amount (Miktar)",
        "Auto (Otomatik)"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .panel { background: rgba(56, 189, 248, 0.2); border: 1px solid rgba(56, 189, 248, 0.4); padding: 12px; }\n</style>\n<div class='panel'>Saydam Mavi Panel</div>",
    "mustInclude": [
      "rgba("
    ],
    "errorMsg": "Lütfen rgba() renk fonksiyonunu kullanın.",
    "isMiniProject": false
  },
  {
    "id": 27,
    "lang": "CSS",
    "unit": 3,
    "title": "27. Cam Tasarımı: backdrop-filter (Glassmorphism)",
    "desc": "Bulanık modern cam arayüz tasarımı.",
    "theory": "backdrop-filter: blur(16px); arkadaki nesneleri buzlu cam gibi gösterir.",
    "theoryCode": ".glass-card { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }",
    "quiz": {
      "question": "Arka planı buzlu cam gibi bulanıklaştıran kural hangisidir?",
      "options": [
        "backdrop-filter: blur()",
        "filter: glass()",
        "background-blur: true"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .cam { backdrop-filter: blur(12px); background: rgba(15,23,42,0.6); padding: 15px; }\n</style>\n<div class='cam'>Cam Kart</div>",
    "mustInclude": [
      "backdrop-filter"
    ],
    "errorMsg": "Lütfen backdrop-filter kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 28,
    "lang": "CSS",
    "unit": 3,
    "title": "28. Taşma Yönetimi: overflow & scroll",
    "desc": "Kutudan taşan içerikleri gizleme veya kaydırma.",
    "theory": "overflow: hidden taşan kısmı keser, overflow-y: auto ise gerekirse dikey kaydırma çubuğu açar.",
    "theoryCode": ".liste { max-height: 200px; overflow-y: auto; }",
    "quiz": {
      "question": "Kutunun dışına taşan içeriği gizlemek için ne kullanılır?",
      "options": [
        "overflow: hidden",
        "overflow: none",
        "clip: true"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .kutu { width: 100px; height: 50px; overflow: hidden; background: #334155; }\n</style>\n<div class='kutu'>Çok uzun metin içeriği buraya sığmayacak</div>",
    "mustInclude": [
      "overflow: hidden"
    ],
    "errorMsg": "Lütfen overflow: hidden kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 29,
    "lang": "CSS",
    "unit": 3,
    "title": "29. Katman Yönetimi: z-index",
    "desc": "Üst üste binen elemanların öncelik sırası.",
    "theory": "z-index: 100 değeri yüksek olan eleman diğerlerinin önünde görünür (position zorunludur).",
    "theoryCode": ".modal { position: fixed; z-index: 9999; }",
    "quiz": {
      "question": "z-index özelliğinin çalışması için elemanın position değeri ne olamaz?",
      "options": [
        "static",
        "relative",
        "absolute"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .on-katman { position: relative; z-index: 10; }\n</style>\n<div class='on-katman'>Ön Katman</div>",
    "mustInclude": [
      "z-index"
    ],
    "errorMsg": "Lütfen z-index kuralını kullanın.",
    "isMiniProject": false
  },
  {
    "id": 30,
    "lang": "CSS",
    "unit": 3,
    "title": "30. BİTİRME PROJESİ: Kusursuz Modern Web Arayüzü",
    "desc": "Tüm CSS3 eğitimini tamamladın! Usta seviyesinde portfolyo ve vitrin oluştur.",
    "theory": "Tebrikler! CSS3 yolculuğunu başarıyla bitirdin. Grid, Flexbox, Glassmorphism ve animasyonlarla göz kamaştıran bir web arayüzü inşa et.",
    "theoryCode": ".master-hero {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  border-radius: 24px;\n  padding: 40px;\n  backdrop-filter: blur(16px);\n  box-shadow: 0 20px 40px rgba(0,0,0,0.5);\n}",
    "quiz": {
      "question": "CSS3'te modern, esnek ve duyarlı tasarımlar üretmek için en güçlü iki yerleşim mimarisi nedir?",
      "options": [
        "Flexbox ve CSS Grid",
        "Table ve Float",
        "Frameset ve Inline"
      ],
      "correctIndex": 0
    },
    "initialCode": "<style>\n  .master-hero {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: linear-gradient(135deg, #0f172a, #334155);\n    border-radius: 20px;\n    padding: 30px;\n    box-shadow: 0 10px 30px rgba(0,0,0,0.4);\n    color: white;\n  }\n</style>\n<div class='master-hero'>\n  <h1>CSS3 Ustası</h1>\n</div>",
    "mustInclude": [
      "display: flex",
      "border-radius",
      "box-shadow"
    ],
    "errorMsg": "Lütfen display: flex, border-radius ve box-shadow kurallarını bitirme projenize uygulayın.",
    "isMiniProject": true
  }
],
  javascript: [
  {
    "id": 1,
    "lang": "JavaScript",
    "unit": 1,
    "title": "1. JavaScript Giriş & console.log",
    "desc": "JavaScript temellerini ve konsola mesaj yazdırmayı öğrenin.",
    "theory": "JavaScript, web sayfalarına etkileşim ve dinamizm kazandıran dünyanın en popüler programlama dillerinden biridir. Geliştiriciler kodlarını test etmek ve çıktı üretmek için console.log() fonksiyonunu kullanır.",
    "theoryCode": "console.log(\"Merhaba JavaScript Dünyası!\");",
    "quiz": {
      "question": "JavaScript dilinde konsola mesaj veya veri yazdırmak için hangi komut kullanılır?",
      "options": [
        "print()",
        "console.log()",
        "System.out.println()"
      ],
      "answer": 1
    },
    "initialCode": "// Konsola Merhaba COD+ yazdırın\nconsole.log(\"Merhaba COD+\");",
    "mustInclude": [
      "console.log"
    ],
    "errorMsg": "Lütfen console.log kullanarak konsola çıktı yazdırın."
  },
  {
    "id": 2,
    "lang": "JavaScript",
    "unit": 1,
    "title": "2. Değişken Tanımlama: let ve const",
    "desc": "Modern JavaScript ile değişken ve sabit tanımlamayı keşfedin.",
    "theory": "Modern JavaScript (ES6+), değerleri saklamak için let ve const anahtar kelimelerini kullanır. Değeri daha sonra değişebilecek değişkenler için let, sabit ve değiştirilemez değerler için const tercih edilir.",
    "theoryCode": "let puan = 100;\npuan = 150;\nconst pi = 3.14;",
    "quiz": {
      "question": "Değeri sonradan ASLA değiştirilemeyecek sabit bir değişken için hangisi kullanılır?",
      "options": [
        "var",
        "let",
        "const"
      ],
      "answer": 2
    },
    "initialCode": "let sehir = \"İstanbul\";\nconst ulke = \"Türkiye\";\nconsole.log(sehir, ulke);",
    "mustInclude": [
      "const",
      "let"
    ],
    "errorMsg": "Lütfen kodunuzda hem let hem de const değişkenlerini kullanın."
  },
  {
    "id": 3,
    "lang": "JavaScript",
    "unit": 1,
    "title": "3. Temel Veri Tipleri & typeof",
    "desc": "String, Number, Boolean tiplerini ve typeof operatörünü öğrenin.",
    "theory": "JavaScript dilinde en sık kullanılan ilkel veri tipleri: metinler için String, sayılar için Number ve doğru/yanlış mantığı için Boolean veri tipidir. Bir değişkenin tipini öğrenmek için typeof operatörü kullanılır.",
    "theoryCode": "let isim = \"Deniz\"; // string\nlet yas = 20; // number\nlet aktif = true; // boolean\nconsole.log(typeof isim);",
    "quiz": {
      "question": "JavaScript dilinde true veya false değerlerini temsil eden veri tipi hangisidir?",
      "options": [
        "Boolean",
        "String",
        "Integer"
      ],
      "answer": 0
    },
    "initialCode": "let yas = 25;\nlet mezun = true;\nconsole.log(typeof yas, typeof mezun);",
    "mustInclude": [
      "typeof"
    ],
    "errorMsg": "Lütfen typeof operatörünü kullanarak veri tiplerini konsola yazdırın."
  },
  {
    "id": 4,
    "lang": "JavaScript",
    "unit": 1,
    "title": "4. Aritmetik & Karşılaştırma Operatörleri",
    "desc": "Matematiksel işlemler ve katı eşitlik kontrolü.",
    "theory": "Aritmetik operatörler (+, -, *, /, %) matematiksel hesaplamalar yapar. Karşılaştırma işlemlerinde hem değeri hem de veri tipini kontrol etmek için katı eşitlik operatörü (===) kullanılması en iyi uygulamadır.",
    "theoryCode": "let toplam = 10 + 5;\nlet esitMi = (5 === \"5\"); // false (tipler farklı)",
    "quiz": {
      "question": "Hem değeri hem de veri tipini kontrol eden katı eşitlik operatörü hangisidir?",
      "options": [
        "==",
        "===",
        "="
      ],
      "answer": 1
    },
    "initialCode": "let a = 15;\nlet b = 4;\nlet sonuc = a % b;\nconsole.log(\"Kalan:\", sonuc);",
    "mustInclude": [
      "%"
    ],
    "errorMsg": "Lütfen mod alma (%) operatörünü kullanarak kalanı hesaplayın."
  },
  {
    "id": 5,
    "lang": "JavaScript",
    "unit": 1,
    "title": "5. Koşullu İfadeler: if / else",
    "desc": "Karar yapıları ile program akışını yönlendirin.",
    "theory": "if/else blokları belirli koşulların doğru veya yanlış olmasına göre farklı kod bloklarının çalıştırılmasını sağlar.",
    "theoryCode": "let notu = 75;\nif (notu >= 50) {\n  console.log(\"Geçti\");\n} else {\n  console.log(\"Kaldı\");\n}",
    "quiz": {
      "question": "Koşul sağlanmadığında alternatif kod bloğunu çalıştırmak için ne kullanılır?",
      "options": [
        "then",
        "else",
        "default"
      ],
      "answer": 1
    },
    "initialCode": "let skor = 85;\nif (skor >= 60) {\n  console.log(\"Başarılı\");\n} else {\n  console.log(\"Geliştirilmeli\");\n}",
    "mustInclude": [
      "if",
      "else"
    ],
    "errorMsg": "Lütfen if ve else bloklarını içeren koşul yapısı kurun."
  },
  {
    "id": 6,
    "lang": "JavaScript",
    "unit": 1,
    "title": "6. Mantıksal Operatörler (&&, ||, !)",
    "desc": "Çoklu koşulları birleştirin ve tersleyin.",
    "theory": "Mantıksal VE (&&) tüm koşulların doğru olmasını ister. Mantıksal VEYA (||) koşullardan en az birinin doğru olmasını yeterli bulur. Mantıksal DEĞİL (!) ise değeri tersine çevirir.",
    "theoryCode": "let yas = 22;\nlet ehliyet = true;\nif (yas >= 18 && ehliyet) {\n  console.log(\"Araç kullanabilir\");\n}",
    "quiz": {
      "question": "Her iki koşulun da aynı anda DOĞRU olmasını gerektiren mantıksal operatör hangisidir?",
      "options": [
        "||",
        "&&",
        "!"
      ],
      "answer": 1
    },
    "initialCode": "let girisYapti = true;\nlet admin = true;\nif (girisYapti && admin) {\n  console.log(\"Yönetim paneline erişildi\");\n}",
    "mustInclude": [
      "&&"
    ],
    "errorMsg": "Lütfen && (mantıksal VE) operatörünü kullanarak koşulları birleştirin."
  },
  {
    "id": 7,
    "lang": "JavaScript",
    "unit": 1,
    "title": "7. Fonksiyon Tanımlama & Parametreler",
    "desc": "Tekrar kullanılabilir kod blokları oluşturun.",
    "theory": "Fonksiyonlar belirli bir görevi yerine getiren ve tekrar tekrar çağrılabilen kod bloklarıdır. function anahtar kelimesi ile tanımlanırlar ve parametre alabilirler.",
    "theoryCode": "function topla(sayi1, sayi2) {\n  return sayi1 + sayi2;\n}\nlet sonuc = topla(4, 7);",
    "quiz": {
      "question": "JavaScript dilinde fonksiyon tanımlamak için hangi anahtar kelime kullanılır?",
      "options": [
        "def",
        "func",
        "function"
      ],
      "answer": 2
    },
    "initialCode": "function selamla(isim) {\n  console.log(\"Merhaba, \" + isim);\n}\nselamla(\"COD+\");",
    "mustInclude": [
      "function"
    ],
    "errorMsg": "Lütfen function anahtar kelimesi ile fonksiyon tanımlayın."
  },
  {
    "id": 8,
    "lang": "JavaScript",
    "unit": 1,
    "title": "8. Return İfadesi & Değer Döndürme",
    "desc": "Fonksiyondan hesaplanan değerleri dışarı aktarın.",
    "theory": "return ifadesi fonksiyonun çalışmasını sonlandırır ve çağrıldığı noktaya bir değer döndürür. return kullanılmazsa fonksiyon undefined döndürür.",
    "theoryCode": "function carp(x, y) {\n  return x * y;\n}\nlet alan = carp(5, 10);",
    "quiz": {
      "question": "Fonksiyondan sonuç değerini çağıran yere aktaran anahtar kelime hangisidir?",
      "options": [
        "give",
        "return",
        "output"
      ],
      "answer": 1
    },
    "initialCode": "function kareAl(sayi) {\n  return sayi * sayi;\n}\nconsole.log(kareAl(6));",
    "mustInclude": [
      "return"
    ],
    "errorMsg": "Lütfen fonksiyonunuzda return ifadesi kullanın."
  },
  {
    "id": 9,
    "lang": "JavaScript",
    "unit": 1,
    "title": "9. Ok Fonksiyonları (Arrow Functions)",
    "desc": "Modern ve kısa fonksiyon sözdizimi.",
    "theory": "ES6 ile gelen ok fonksiyonları (arrow functions), fonksiyon tanımlamayı çok daha sade ve okunabilir hale getirir: (parametreler) => ifade.",
    "theoryCode": "const kup = x => x * x * x;\nconst topla = (a, b) => a + b;\nconsole.log(kup(3));",
    "quiz": {
      "question": "Arrow fonksiyonlarını tanımlamak için hangi sembol çifti kullanılır?",
      "options": [
        "->",
        "=>",
        "~>"
      ],
      "answer": 1
    },
    "initialCode": "const ikiKat = n => n * 2;\nconsole.log(ikiKat(8));",
    "mustInclude": [
      "=>"
    ],
    "errorMsg": "Lütfen ok fonksiyonu (=>) sözdizimini kullanın."
  },
  {
    "id": 10,
    "lang": "JavaScript",
    "unit": 1,
    "title": "10. MİNİ PROJE: Basit Not Hesaplayıcı",
    "desc": "Fonksiyonlar ve koşullarla öğrenci harf notu hesaplama motoru.",
    "theory": "İlk 9 derste öğrendiğiniz değişkenler, koşul blokları, ok fonksiyonları ve karşılaştırma mantıklarını bir araya getirerek dinamik bir not hesaplama motoru inşa edin.",
    "theoryCode": "const notHesapla = (puan) => {\n  if (puan >= 85) return \"A\";\n  if (puan >= 70) return \"B\";\n  return \"C\";\n};",
    "quiz": {
      "question": "Bir fonksiyonda çoklu koşullu return ifadeleri kullanılabilir mi?",
      "options": [
        "Evet, koşula uyan ilk return çalışıp fonksiyondan çıkar",
        "Hayır, fonksiyon başına yalnızca bir return yazılabilir",
        "Sadece while döngüsünde kullanılabilir"
      ],
      "answer": 0
    },
    "initialCode": "const notHesapla = (puan) => {\n  if (puan >= 90) return \"AA\";\n  if (puan >= 70) return \"BB\";\n  return \"FF\";\n};\nconsole.log(notHesapla(82));",
    "mustInclude": [
      "notHesapla",
      "return",
      "if"
    ],
    "errorMsg": "Lütfen notHesapla fonksiyonunda koşullara göre harf notu döndürün.",
    "isMiniProject": true
  },
  {
    "id": 11,
    "lang": "JavaScript",
    "unit": 2,
    "title": "11. Dizilere Giriş & İndeksleme",
    "desc": "Birden fazla veriyi tek bir listede sıralı depolayın.",
    "theory": "Diziler (Arrays), köşeli parantez içinde birden çok veriyi sıralı olarak saklar. JavaScript dilinde dizi indeksleri 0 dan başlar.",
    "theoryCode": "const diller = [\"HTML\", \"CSS\", \"JS\"];\nconsole.log(diller[0]); // HTML\nconsole.log(diller.length); // 3",
    "quiz": {
      "question": "Dizinin ilk elemanının indeks numarası kaçtır?",
      "options": [
        "1",
        "0",
        "-1"
      ],
      "answer": 1
    },
    "initialCode": "const meyveler = [\"Elma\", \"Muz\", \"Çilek\"];\nconsole.log(meyveler[0]);",
    "mustInclude": [
      "[",
      "]"
    ],
    "errorMsg": "Lütfen köşeli parantez kullanarak bir dizi oluşturun."
  },
  {
    "id": 12,
    "lang": "JavaScript",
    "unit": 2,
    "title": "12. Temel Dizi Metotları (push & pop)",
    "desc": "Dizinin sonuna eleman ekleme ve çıkarma.",
    "theory": "push() metodu dizinin sonuna yeni bir eleman ekler. pop() metodu ise dizinin en sonundaki elemanı çıkarır ve döndürür.",
    "theoryCode": "const sayilar = [1, 2, 3];\nsayilar.push(4); // [1, 2, 3, 4]\nsayilar.pop(); // [1, 2, 3]",
    "quiz": {
      "question": "Dizinin sonuna yeni bir eleman eklemek için hangi metot kullanılır?",
      "options": [
        "append()",
        "add()",
        "push()"
      ],
      "answer": 2
    },
    "initialCode": "const liste = [\"HTML\", \"CSS\"];\nliste.push(\"JavaScript\");\nconsole.log(liste);",
    "mustInclude": [
      "push"
    ],
    "errorMsg": "Lütfen push() metodunu kullanarak listeye eleman ekleyin."
  },
  {
    "id": 13,
    "lang": "JavaScript",
    "unit": 2,
    "title": "13. Modern Dizi İterasyonu: forEach",
    "desc": "Dizinin her bir elemanı üzerinde fonksiyon çalıştırın.",
    "theory": "forEach() metodu dizideki her bir eleman için belirtilen geri çağırım fonksiyonunu sırayla çalıştırır.",
    "theoryCode": "const sayilar = [10, 20, 30];\nsayilar.forEach((sayi, i) => {\n  console.log(i + \": \" + sayi);\n});",
    "quiz": {
      "question": "forEach metodu her turda parametre olarak ne alır?",
      "options": [
        "Dizinin kendisini ve elemanını",
        "Mevcut elemanı ve opsiyonel indeksi",
        "Yalnızca son elemanı"
      ],
      "answer": 1
    },
    "initialCode": "const sehirler = [\"Ankara\", \"İzmir\", \"Bursa\"];\nsehirler.forEach(s => console.log(s));",
    "mustInclude": [
      "forEach"
    ],
    "errorMsg": "Lütfen forEach metodunu kullanarak elemanları ekrana yazdırın."
  },
  {
    "id": 14,
    "lang": "JavaScript",
    "unit": 2,
    "title": "14. Dizileri Dönüştürme: map",
    "desc": "Mevcut diziden yeni bir dönüştürülmüş dizi üretin.",
    "theory": "map() metodu orijinal diziyi değiştirmeden, her bir elemanı bir işlemden geçirerek aynı uzunlukta YEPYENİ bir dizi oluşturur.",
    "theoryCode": "const sayilar = [1, 2, 3];\nconst ikiKat = sayilar.map(x => x * 2); // [2, 4, 6]",
    "quiz": {
      "question": "map() metodunun en önemli özelliği nedir?",
      "options": [
        "Orijinal diziyi silmesi",
        "Dönüştürülmüş elemanlarla yeni bir dizi döndürmesi",
        "Sadece sayıları kabul etmesi"
      ],
      "answer": 1
    },
    "initialCode": "const fiyatlar = [100, 200, 300];\nconst indirimli = fiyatlar.map(f => f * 0.9);\nconsole.log(indirimli);",
    "mustInclude": [
      "map"
    ],
    "errorMsg": "Lütfen map() metodunu kullanarak yeni bir dizi üretin."
  },
  {
    "id": 15,
    "lang": "JavaScript",
    "unit": 2,
    "title": "15. Dizi Elemanlarını Filtreleme: filter",
    "desc": "Belirli bir şarta uyan elemanları ayıklayın.",
    "theory": "filter() metodu verilen test fonksiyonundan true dönen tüm elemanları toplayarak yeni bir filtrelenmiş dizi döndürür.",
    "theoryCode": "const yaslar = [14, 18, 22, 12, 29];\nconst yetiskinler = yaslar.filter(y => y >= 18);",
    "quiz": {
      "question": "filter() fonksiyonunun callback dönüşü ne olmalıdır?",
      "options": [
        "Boolean (true/false)",
        "String",
        "Number"
      ],
      "answer": 0
    },
    "initialCode": "const sayilar = [5, 12, 8, 130, 44];\nconst buyukler = sayilar.filter(x => x > 10);\nconsole.log(buyukler);",
    "mustInclude": [
      "filter"
    ],
    "errorMsg": "Lütfen filter() metodunu kullanarak 10 dan büyük sayıları filtreleyin."
  },
  {
    "id": 16,
    "lang": "JavaScript",
    "unit": 2,
    "title": "16. Nesneler (Objects) & Özellik Erişimi",
    "desc": "Anahtar-değer çiftleriyle yapılandırılmış veriler.",
    "theory": "Nesneler süslü parantez {} içinde özellikler barındırır. Nokta notasyonu (obj.alan) veya köşeli parantez ile erişilir.",
    "theoryCode": "const ogrenci = {\n  ad: \"Can\",\n  bolum: \"Yazılım\",\n  aktif: true\n};\nconsole.log(ogrenci.ad);",
    "quiz": {
      "question": "Bir nesnenin özelliklerine erişmek için en yaygın sözdizimi hangisidir?",
      "options": [
        "Nokta notasyonu: nesne.ozellik",
        "Ok işareti: nesne->ozellik",
        "İki nokta: nesne::ozellik"
      ],
      "answer": 0
    },
    "initialCode": "const araba = {\n  marka: \"Tesla\",\n  model: \"Model 3\",\n  yil: 2024\n};\nconsole.log(araba.marka);",
    "mustInclude": [
      "marka",
      "model"
    ],
    "errorMsg": "Lütfen marka ve model özelliklerine sahip bir nesne tanımlayın."
  },
  {
    "id": 17,
    "lang": "JavaScript",
    "unit": 2,
    "title": "17. for ve while Döngüleri",
    "desc": "Belirli adımları veya şartları tekrar tekrar çalıştırın.",
    "theory": "for döngüsü sayaç tabanlı tekrar işlemlerinde, while döngüsü ise bir şart doğru olduğu sürece çalışmaya devam eden yapılarda kullanılır.",
    "theoryCode": "for (let i = 1; i <= 5; i++) {\n  console.log(\"Adım:\", i);\n}",
    "quiz": {
      "question": "for döngüsünün başlığında sırasıyla hangi 3 ifade yer alır?",
      "options": [
        "Başlangıç, Koşul, Artırım/Azaltım",
        "Koşul, Fonksiyon, Return",
        "Dizi, Obje, String"
      ],
      "answer": 0
    },
    "initialCode": "for (let i = 0; i < 3; i++) {\n  console.log(\"Döngü:\", i);\n}",
    "mustInclude": [
      "for"
    ],
    "errorMsg": "Lütfen for döngüsü kullanarak çıktı üretin."
  },
  {
    "id": 18,
    "lang": "JavaScript",
    "unit": 2,
    "title": "18. String Metotları (includes, toUpperCase, slice)",
    "desc": "Metin verilerini arayın, kesin ve dönüştürün.",
    "theory": "JavaScript metinler üzerinde arama yapmak için includes(), büyük harfe çevirmek için toUpperCase() ve belirli bir parçayı almak için slice() sunar.",
    "theoryCode": "let metin = \"Frontend Geliştirme\";\nconsole.log(metin.toUpperCase());\nconsole.log(metin.includes(\"Front\")); // true",
    "quiz": {
      "question": "Bir metnin içinde belirli bir alt kelimenin geçip geçmediğini kontrol eden metot hangisidir?",
      "options": [
        "hasWord()",
        "includes()",
        "contains()"
      ],
      "answer": 1
    },
    "initialCode": "let dil = \"JavaScript\";\nconsole.log(dil.toUpperCase(), dil.includes(\"Script\"));",
    "mustInclude": [
      "toUpperCase",
      "includes"
    ],
    "errorMsg": "Lütfen toUpperCase ve includes metotlarını uygulayın."
  },
  {
    "id": 19,
    "lang": "JavaScript",
    "unit": 2,
    "title": "19. Math Nesnesi & Rastgele Sayı Üretimi",
    "desc": "Matematiksel fonksiyonlar ve Math.random().",
    "theory": "Math nesnesi matematiksel sabitler ve fonksiyonlar içerir. Math.random() 0 ile 1 arasında rastgele bir sayı üretir. Math.floor() ise sayıyı aşağı yuvarlar.",
    "theoryCode": "let rastgeleZar = Math.floor(Math.random() * 6) + 1;\nconsole.log(\"Zar:\", rastgeleZar);",
    "quiz": {
      "question": "Ondalıklı bir sayıyı en yakın alt tam sayıya yuvarlayan metot hangisidir?",
      "options": [
        "Math.ceil()",
        "Math.floor()",
        "Math.round()"
      ],
      "answer": 1
    },
    "initialCode": "let zar = Math.floor(Math.random() * 6) + 1;\nconsole.log(\"Zar Sonucu:\", zar);",
    "mustInclude": [
      "Math.floor",
      "Math.random"
    ],
    "errorMsg": "Lütfen Math.floor ve Math.random kullanarak rastgele bir değer üretin."
  },
  {
    "id": 20,
    "lang": "JavaScript",
    "unit": 2,
    "title": "20. MİNİ PROJE: Alışveriş Sepeti Hesaplama",
    "desc": "Diziler, nesneler ve dizi metotları ile toplam tutar ve KDV hesaplama.",
    "theory": "Nesnelerden oluşan bir ürünler dizisini map ve forEach kullanarak işleyin ve sepet toplamını hesaplayın.",
    "theoryCode": "const sepet = [\n  { urun: \"Kitap\", fiyat: 100 },\n  { urun: \"Defter\", fiyat: 50 }\n];\nlet toplam = 0;\nsepet.forEach(item => toplam += item.fiyat);",
    "quiz": {
      "question": "Gerçek dünyadaki e-ticaret sepetleri genellikle hangi veri yapısında tutulur?",
      "options": [
        "Nesnelerden oluşan bir dizi (Array of Objects)",
        "Tek bir boolean değişken",
        "Yalnızca bir string"
      ],
      "answer": 0
    },
    "initialCode": "const sepet = [\n  { urun: \"Klavye\", fiyat: 400 },\n  { urun: \"Mouse\", fiyat: 250 }\n];\nlet toplam = 0;\nsepet.forEach(item => toplam += item.fiyat);\nconsole.log(\"Sepet Toplamı:\", toplam);",
    "mustInclude": [
      "sepet",
      "toplam",
      "forEach"
    ],
    "errorMsg": "Lütfen sepet dizisindeki ürünlerin toplam fiyatını hesaplayın.",
    "isMiniProject": true
  },
  {
    "id": 21,
    "lang": "JavaScript",
    "unit": 3,
    "title": "21. DOM Giriş: document.getElementById",
    "desc": "HTML belgesindeki bir elemana benzersiz ID ile erişin.",
    "theory": "DOM (Document Object Model), HTML sayfasını JavaScript programının anlayabileceği nesneler ağacına çevirir. document.getElementById(\"id\") ile o elemana hızla erişebilirsiniz.",
    "theoryCode": "const baslik = document.getElementById(\"ana-baslik\");",
    "quiz": {
      "question": "Bir HTML elemanını ID değerine göre seçmek için hangi document metodu kullanılır?",
      "options": [
        "document.getId()",
        "document.getElementById()",
        "document.selectId()"
      ],
      "answer": 1
    },
    "initialCode": "// ID değeri baslik olan elemanı seçin\nconst baslik = document.getElementById(\"baslik\");\nconsole.log(baslik);",
    "mustInclude": [
      "getElementById"
    ],
    "errorMsg": "Lütfen document.getElementById metodunu kullanın."
  },
  {
    "id": 22,
    "lang": "JavaScript",
    "unit": 3,
    "title": "22. querySelector ve querySelectorAll",
    "desc": "CSS seçicileri kullanarak DOM elemanlarını seçin.",
    "theory": "querySelector() CSS seçicilerini (.sinif, #id, tag) kullanarak eşleşen İLK elemanı döner. querySelectorAll() ise eşleşen TÜM elemanları bir NodeList olarak döner.",
    "theoryCode": "const buton = document.querySelector(\".btn-primary\");\nconst kartlar = document.querySelectorAll(\".card\");",
    "quiz": {
      "question": "Bir class adına göre ilk eşleşen elemanı CSS seçici mantığıyla seçmek için ne kullanılır?",
      "options": [
        "document.querySelector(\".sinif\")",
        "document.getClass(\"sinif\")",
        "document.find(\"sinif\")"
      ],
      "answer": 0
    },
    "initialCode": "const buton = document.querySelector(\".btn\");\nconsole.log(buton);",
    "mustInclude": [
      "querySelector"
    ],
    "errorMsg": "Lütfen document.querySelector metodunu kullanın."
  },
  {
    "id": 23,
    "lang": "JavaScript",
    "unit": 3,
    "title": "23. Eleman İçeriğini Değiştirme: textContent",
    "desc": "Seçilen HTML elemanının metin içeriğini güncelleyin.",
    "theory": "Bir DOM elemanının metnini güvenli bir şekilde değiştirmek için textContent özelliği kullanılır. HTML etiketlerini işlemek gerekirse innerHTML tercih edilir.",
    "theoryCode": "const p = document.getElementById(\"aciklama\");\np.textContent = \"Yeni güncellenmiş metin\";",
    "quiz": {
      "question": "XSS güvenlik risklerini önleyerek sadece düz metin değiştirmek için hangisi önerilir?",
      "options": [
        "innerHTML",
        "textContent",
        "outerHTML"
      ],
      "answer": 1
    },
    "initialCode": "const baslik = document.getElementById(\"baslik\");\nif (baslik) baslik.textContent = \"Hoş Geldiniz!\";",
    "mustInclude": [
      "textContent"
    ],
    "errorMsg": "Lütfen textContent özelliğini kullanarak metni değiştirin."
  },
  {
    "id": 24,
    "lang": "JavaScript",
    "unit": 3,
    "title": "24. Dinamik Stil Değiştirme (style Özelliği)",
    "desc": "JavaScript ile elemanların CSS stillerini canlı değiştirin.",
    "theory": "DOM elemanlarının style özelliği üzerinden inline CSS stilleri atanabilir. CSS tireli isimlendirmeleri (background-color) JavaScript dilinde camelCase (backgroundColor) haline gelir.",
    "theoryCode": "const kutu = document.getElementById(\"kutu\");\nkutu.style.backgroundColor = \"#3b82f6\";\nkutu.style.padding = \"20px\";",
    "quiz": {
      "question": "CSS dilindeki font-size kuralı JavaScript style nesnesinde nasıl yazılır?",
      "options": [
        "style.fontSize",
        "style.font_size",
        "style[\"font-size-px\"]"
      ],
      "answer": 0
    },
    "initialCode": "const kutu = document.getElementById(\"kutu\");\nif (kutu) kutu.style.color = \"#4ade80\";",
    "mustInclude": [
      "style"
    ],
    "errorMsg": "Lütfen elemanın style özelliğine erişin."
  },
  {
    "id": 25,
    "lang": "JavaScript",
    "unit": 3,
    "title": "25. Olay Dinleyicileri: addEventListener",
    "desc": "Kullanıcı tıklamalarını ve klavye etkileşimlerini yakalayın.",
    "theory": "addEventListener() metodu bir elemana olay (tıklama, fare hareketi, tuşa basma) dinleyicisi bağlar ve olay gerçekleştiğinde bir fonksiyon çalıştırır.",
    "theoryCode": "const btn = document.getElementById(\"btn\");\nbtn.addEventListener(\"click\", () => {\n  console.log(\"Butona tıklandı!\");\n});",
    "quiz": {
      "question": "Tıklama olayını dinlemek için olay tipi olarak ne verilir?",
      "options": [
        "\"onclick\"",
        "\"click\"",
        "\"press\""
      ],
      "answer": 1
    },
    "initialCode": "const btn = document.getElementById(\"kaydet\");\nif (btn) {\n  btn.addEventListener(\"click\", () => {\n    console.log(\"Kaydedildi\");\n  });\n}",
    "mustInclude": [
      "addEventListener",
      "click"
    ],
    "errorMsg": "Lütfen addEventListener(\"click\", ...) yapısını kurun."
  },
  {
    "id": 26,
    "lang": "JavaScript",
    "unit": 3,
    "title": "26. Sınıf Yönetimi: classList (add, remove, toggle)",
    "desc": "CSS sınıflarını dinamik ekleyin, çıkarın veya tersleyin.",
    "theory": "classList nesnesi bir elemanın class özniteliğini yönetmeyi çok kolaylaştırır. .add(\"aktif\"), .remove(\"gizli\") ve .toggle(\"karanlik\") en sık kullanılan metotlarıdır.",
    "theoryCode": "const modal = document.querySelector(\".modal\");\nmodal.classList.add(\"open\");\nmodal.classList.toggle(\"active\");",
    "quiz": {
      "question": "Bir sınıf varsa kaldıran, yoksa ekleyen classList metodu hangisidir?",
      "options": [
        "switch()",
        "toggle()",
        "flip()"
      ],
      "answer": 1
    },
    "initialCode": "const kart = document.getElementById(\"kart\");\nif (kart) kart.classList.add(\"aktif\");",
    "mustInclude": [
      "classList"
    ],
    "errorMsg": "Lütfen classList nesnesini kullanın."
  },
  {
    "id": 27,
    "lang": "JavaScript",
    "unit": 3,
    "title": "27. Form Yönetimi & e.preventDefault()",
    "desc": "Sayfa yenilenmesini engelleyerek form verilerini işleyin.",
    "theory": "Form submit edildiğinde tarayıcı varsayılan olarak sayfayı yeniler. e.preventDefault() bu varsayılan davranışı durdurur ve form verilerini JavaScript ile AJAX/API yapısına göndermeyi sağlar.",
    "theoryCode": "const form = document.querySelector(\"form\");\nform.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  console.log(\"Form gönderimi yakalandı!\");\n});",
    "quiz": {
      "question": "Form gönderildiğinde sayfanın yeniden yüklenmesini önleyen metot hangisidir?",
      "options": [
        "e.stop()",
        "e.preventDefault()",
        "e.cancel()"
      ],
      "answer": 1
    },
    "initialCode": "const form = document.getElementById(\"form\");\nif (form) {\n  form.addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n  });\n}",
    "mustInclude": [
      "preventDefault"
    ],
    "errorMsg": "Lütfen e.preventDefault() metodunu kullanın."
  },
  {
    "id": 28,
    "lang": "JavaScript",
    "unit": 3,
    "title": "28. Hata Yönetimi: try / catch",
    "desc": "Beklenmeyen çalışma zamanı hatalarını yakalayın ve yönetin.",
    "theory": "try bloğu içine hata oluşma ihtimali olan kodlar yazılır. Bir hata meydana gelirse akış kesilmez, catch bloğu çalıştırılarak hata nesnesi incelenir.",
    "theoryCode": "try {\n  let veri = JSON.parse(\"{gecersiz json}\");\n} catch (hata) {\n  console.error(\"Hata oluştu:\", hata.message);\n}",
    "quiz": {
      "question": "try bloğunda bir hata fırlatıldığında hangi blok devreye girer?",
      "options": [
        "catch",
        "finally",
        "rescue"
      ],
      "answer": 0
    },
    "initialCode": "try {\n  let sayi = 10;\n  console.log(sayi);\n} catch (err) {\n  console.error(err);\n}",
    "mustInclude": [
      "try",
      "catch"
    ],
    "errorMsg": "Lütfen try ve catch bloklarını kullanın."
  },
  {
    "id": 29,
    "lang": "JavaScript",
    "unit": 3,
    "title": "29. LocalStorage ile Tarayıcıda Veri Saklama",
    "desc": "Sayfa yenilense de kaybolmayan istemci tabanlı veriler.",
    "theory": "localStorage, verileri anahtar-değer çifti olarak kullanıcının tarayıcısında kalıcı olarak saklar. setItem(\"anahtar\", \"deger\") ve getItem(\"anahtar\") metotları kullanılır.",
    "theoryCode": "localStorage.setItem(\"kullaniciAdi\", \"Deniz\");\nconst kayitli = localStorage.getItem(\"kullaniciAdi\");",
    "quiz": {
      "question": "localStorage nesnesine veri kaydetmek için hangi metot kullanılır?",
      "options": [
        "saveItem()",
        "setItem()",
        "write()"
      ],
      "answer": 1
    },
    "initialCode": "localStorage.setItem(\"dil\", \"JavaScript\");\nconst aktifDil = localStorage.getItem(\"dil\");\nconsole.log(aktifDil);",
    "mustInclude": [
      "localStorage"
    ],
    "errorMsg": "Lütfen localStorage nesnesini kullanın."
  },
  {
    "id": 30,
    "lang": "JavaScript",
    "unit": 3,
    "title": "30. MİNİ PROJE: İnteraktif Görev Listesi (To-Do List)",
    "desc": "DOM, olaylar ve yerel depolama ile çalışan dinamik görev yöneticisi.",
    "theory": "Tüm JavaScript eğitiminin zirvesi: Formdan girilen görevi alıp listeye dinamik eleman olarak ekleyen ve tamamlandı işaretlemesi yapan tam fonksiyonel bir proje geliştirin.",
    "theoryCode": "function gorevEkle(metin) {\n  const li = document.createElement(\"li\");\n  li.textContent = metin;\n  li.addEventListener(\"click\", () => li.classList.toggle(\"tamamlandi\"));\n  document.getElementById(\"liste\").appendChild(li);\n}",
    "quiz": {
      "question": "DOM yapısına yeni bir HTML elemanı düğümü oluşturup eklemek için hangi metotlar kullanılır?",
      "options": [
        "createElement ve appendChild",
        "newElement ve insert",
        "makeNode ve attach"
      ],
      "answer": 0
    },
    "initialCode": "function gorevEkle(gorev) {\n  const li = document.createElement(\"li\");\n  li.textContent = gorev;\n  console.log(\"Görev oluşturuldu:\", li.textContent);\n}\ngorevEkle(\"JavaScript Projesini Tamamla\");",
    "mustInclude": [
      "createElement",
      "textContent"
    ],
    "errorMsg": "Lütfen createElement ve textContent kullanarak yeni görev düğümü oluşturun.",
    "isMiniProject": true
  }
]
};

function getLanguageKey(lang) {
    if (!lang) return 'html';
    const l = String(lang).toLowerCase().trim();
    if (l.includes('css')) return 'css';
    if (l.includes('js') || l.includes('javascript')) return 'javascript';
    if (l.includes('html') || l.includes('web') || l.includes('front')) return 'html';
    if (l.includes('sql') || l.includes('data')) return 'sql';
    if (l.includes('py') || l.includes('python')) return 'python';
    if (l.includes('c#') || l.includes('csharp') || l.includes('cs')) return 'csharp';
    if (l.includes('c++') || l.includes('cpp')) return 'cpp';
    return 'html';
}

function getActiveCourseData(lang) {
    const key = getLanguageKey(lang || (typeof selectedLang !== 'undefined' ? selectedLang : 'html'));
    return courseDataByLang[key] || courseDataByLang.html;
}

// Aktif ders dizisi (geriye dönük tam uyumluluk)
let courseData = courseDataByLang.html;

function setCourseDataForLang(lang) {
    courseData = getActiveCourseData(lang);
    return courseData;
}
