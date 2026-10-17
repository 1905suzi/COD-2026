// ============================================================
// COD+ DİJİTAL KİTAP (E-BOOK) BİLGİ BANKASI
// Format: Kısa Tanım + 1 Kod Örneği + Satır Satır Parça Açıklaması
// Hedef Kitle: Hiç kodlama bilmeyen birinin tek okumada anlayacağı dil
// ============================================================

const bookData = {
    // ============================================================
    // 1. BÖLÜM: HTML (WEB İSKELETİ)
    // ============================================================
    html: [
        {
            id: "html-1",
            title: "HTML5 Sayfa İskeleti",
            desc: "Bir web sayfasının omurgası ve olmazsa olmaz temel çatısı.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Temel Kural</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Nasıl ki bir insanın ayakta durması için bir kemik iskeletine ihtiyacı varsa, bir web sayfasının da tarayıcıda hatasız açılabilmesi için bu standart şablona ihtiyacı vardır. Tarayıcı (Chrome, Edge vb.) bu kodları okuyarak sayfanın nerede başlayıp nerede bittiğini anlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="tr"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;İlk Web Sitem&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;p&gt;Merhaba Dünya!&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>&lt;!DOCTYPE html&gt;</code>: Tarayıcıya "Bu sayfa en modern HTML5 kurallarına göre yazılmıştır" mesajını verir. Sayfanın en üstünde tek başına yer almalıdır.</li>
                        <li><code>&lt;html lang="tr"&gt;</code>: Sayfadaki tüm içeriği kapsayan ana kutudur. <code>lang="tr"</code> parçası ise sayfanın Türkçe olduğunu belirtir; bu sayede arama motorları ve çeviri araçları dili doğru tanır.</li>
                        <li><code>&lt;head&gt; ... &lt;/head&gt;</code>: Sayfanın "beyin" kısmıdır. Buraya yazılanlar ekranda doğrudan görünmez; sayfa başlığı, yazı tipi ve karakter ayarları gibi arka plan bilgileri tutulur.</li>
                        <li><code>&lt;meta charset="UTF-8"&gt;</code>: Türkçe karakterlerin (ş, ğ, ç, ö, ü) ekranda bozulmadan, düzgün görünmesini sağlar.</li>
                        <li><code>&lt;title&gt;İlk Web Sitem&lt;/title&gt;</code>: Tarayıcının en üstteki sekmesinde ve Google arama sonuçlarında görünen sayfa başlığıdır.</li>
                        <li><code>&lt;body&gt; ... &lt;/body&gt;</code>: Sayfanın "gövde" kısmıdır. Ziyaretçinin ekranda gördüğü tüm yazılar, resimler, butonlar ve videolar mutlaka bu iki etiketin arasına yazılmalıdır.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "html-2",
            title: "Başlık Hiyerarşisi (H1 - H6)",
            desc: "Sayfadaki başlıkların önem sırasına göre hiyerarşik dizilimi.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Tipografi & SEO</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Gazetelerdeki manşet başlığı, alt başlıklar ve ara başlıklar gibi düşünün. Kullanıcı ve Google, bir sayfayı okurken neyin önemli olduğunu bu başlık hiyerarşisine bakarak anlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>&lt;h1&gt;COD+ Yazılım Akademisi&lt;/h1&gt;
&lt;h2&gt;Frontend Geliştirici Kursu&lt;/h2&gt;
&lt;h3&gt;HTML ve CSS Dersleri&lt;/h3&gt;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>&lt;h1&gt;</code>: Sayfanın ana gazete manşetidir. En büyük ve en güçlü başlıktır. <strong>Kural:</strong> SEO ve arama motorlarının sayfayı karıştırmaması için her sayfada sadece <strong>1 adet</strong> <code>&lt;h1&gt;</code> kullanılması uygundur.</li>
                        <li><code>&lt;h2&gt;</code>: Sayfanın ana bölümlerini ayıran ikincil başlıktır (Örneğin "Hakkımızda", "Kurslarımız").</li>
                        <li><code>&lt;h3&gt;</code>: H2 başlığının altındaki detay konular için kullanılan üçüncü derece başlıktır. (Hiyerarşi h4, h5 ve en küçük olan h6'ya kadar devam eder).</li>
                    </ul>
                </div>
            `
        },
        {
            id: "html-3",
            title: "Paragraf, Vurgular ve Satır Atlatma (p, br, strong, mark)",
            desc: "Düz metin blokları, önemli kelimeleri kalınlaştırma ve satır kırma.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Metin Biçimlendirme</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Kitaplardaki paragrafları, altı çizili veya sarı fosforlu kalemle çizilmiş önemli yerleri web sayfasına dökmek için kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>&lt;p&gt;
  Yazılım öğrenmek &lt;strong&gt;sabır&lt;/strong&gt; gerektirir.&lt;br&gt;
  Bu eğitimde &lt;mark&gt;önemli kuralları&lt;/mark&gt; adım adım öğreneceğiz.
&lt;/p&gt;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>&lt;p&gt; ... &lt;/p&gt;</code>: Paragraph (Paragraf) kelimesinden gelir. Yazıyı kendi bağımsız bloğuna alır ve altından/üstünden otomatik boşluk bırakır.</li>
                        <li><code>&lt;strong&gt;</code>: İçindeki metni hem <strong>kalın</strong> yapar hem de arama motorlarına "bu kelime çok önemli" mesajı verir (anlamsal vurgu).</li>
                        <li><code>&lt;br&gt;</code>: Break (Kırılma) kelimesinden gelir. Yeni bir paragraf açmadan yazıyı bir alt satıra düşürmek için kullanılır. Kapanış etiketi yoktur.</li>
                        <li><code>&lt;mark&gt;</code>: Metnin arkasına sarı fosforlu kalem sürülmüş gibi vurgulu arka plan ekler.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "html-4",
            title: "Bağlantılar ve Sayfa İçi Atlama (a etiketi)",
            desc: "Tıklanabilir linkler, başka sitelere yönlendirme ve yeni sekme açma.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Navigasyon</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>İnterneti internet yapan şey linklerdir. Bir yazıya tıklandığında başka bir web sitesine gitmesini ya da sayfanın en altına anında atlamasını sağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>&lt;a href="https://google.com" target="_blank" rel="noopener noreferrer"&gt;Google'da Ara&lt;/a&gt;
&lt;a href="#iletisim"&gt;Sayfa Altındaki İletişime Git&lt;/a&gt;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>&lt;a&gt; ... &lt;/a&gt;</code>: Anchor (Çapa) kelimesinden gelir. Tıklanabilir bağlantı oluşturur.</li>
                        <li><code>href="https://..."</code>: Tıklandığında gidilecek olan internet adresini veya dosya yolunu belirtmek için kullanılır.</li>
                        <li><code>target="_blank"</code>: Tıklanan bağlantının kullanıcının mevcut sekmesini kapatmadan <strong>yeni bir tarayıcı sekmesinde</strong> açılmasını sağlar.</li>
                        <li><code>rel="noopener noreferrer"</code>: Yeni sekmede açılan sitenin bizim sitemize zararlı kod göndermesini engelleyen güvenlik kalkanıdır.</li>
                        <li><code>href="#iletisim"</code>: Sayfa içinde <code>id="iletisim"</code> verilmiş olan bölüme anında kaydırarak atlar (çapa link).</li>
                    </ul>
                </div>
            `
        },
        {
            id: "html-5",
            title: "Görsel ve Medya Yönetimi (img etiketi)",
            desc: "Sayfaya resim ekleme, kırık link koruması ve arama motoru optimizasyonu.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Görseller</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Sayfada ziyaretçilere fotoğraf, logo veya çizim göstermek için kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>&lt;img src="logo.png" alt="COD+ Platform Logosu" width="200" loading="lazy"&gt;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>&lt;img&gt;</code>: Image (Resim) kelimesinin kısaltmasıdır. Tek başına kullanılır, kapanış etiketi bulunmaz.</li>
                        <li><code>src="logo.png"</code>: Source (Kaynak) kelimesinden gelir. Gösterilecek resim dosyasının adını veya internet bağlantısını belirtmek için zorunludur.</li>
                        <li><code>alt="COD+ Platform Logosu"</code>: Resim internet yavaşlığı nedeniyle yüklenemezse veya görme engelli bir kullanıcı ekran okuyucu programla sayfayı geziyorsa, resmin ne olduğunu anlatan metindir. <strong>Google SEO için zorunludur.</strong></li>
                        <li><code>loading="lazy"</code>: Sayfanın altındaki resimleri kullanıcı ekrana kaydırana kadar indirmeyip sayfa açılışını hızlandırmak için kullanılır.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "html-6",
            title: "Tablolar, Sütun ve Satır Birleştirme (table, colspan, rowspan)",
            desc: "Verileri satır ve sütunlar halinde listeleme, hücreleri birleştirme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Veri Gösterimi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Excel tabloları gibi; öğrenci notları, fiyat listeleri veya ders programlarını düzenli kutucuklar halinde göstermek için kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>&lt;table border="1"&gt;
  &lt;tr&gt;
    &lt;th colspan="2"&gt;Haftalık Ders Programı&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td rowspan="2"&gt;Pazartesi&lt;/td&gt;
    &lt;td&gt;09:00 - HTML Giriş&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;11:00 - CSS Temelleri&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>&lt;table&gt; ... &lt;/table&gt;</code>: Tablonun tamamını saran ana çerçeve etiketidir.</li>
                        <li><code>&lt;tr&gt;</code>: Table Row (Tablo Satırı). Tabloda yatay bir satır başlatır.</li>
                        <li><code>&lt;th&gt;</code>: Table Header (Tablo Başlığı). Hücreyi otomatik olarak <strong>kalın ve ortalanmış</strong> başlık yapar.</li>
                        <li><code>&lt;td&gt;</code>: Table Data (Tablo Hücresi). Normal satır içindeki standart veri kutusudur.</li>
                        <li><code>colspan="2"</code>: Column Span (Sütun Yayılması). <strong>Yan yana duran 2 ayrı sütunu tek bir geniş hücre haline birleştirmek</strong> için kullanılır.</li>
                        <li><code>rowspan="2"</code>: Row Span (Satır Yayılması). <strong>Alt alta duran 2 ayrı satırı tek bir dikey hücre halinde birleştirmek</strong> için kullanılır (örnekte "Pazartesi" iki ders saatini birden kapsar).</li>
                    </ul>
                </div>
            `
        },
        {
            id: "html-7",
            title: "Formlar ve Kullanıcı Girişleri (form, input, required)",
            desc: "Kullanıcıdan ad, şifre, e-posta gibi bilgileri güvenle toplama aracı.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Etkileşim & Veri Toplama</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Kayıt olma ekranları, giriş yapma pencereleri veya mesaj gönderme kutuları hazırlamak için kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>&lt;form action="/kaydet" method="POST"&gt;
  &lt;label for="ad"&gt;Adınız:&lt;/label&gt;
  &lt;input type="text" id="ad" name="kullanici_adi" placeholder="Örn: Ahmet" required&gt;
  
  &lt;label for="sifre"&gt;Şifreniz:&lt;/label&gt;
  &lt;input type="password" id="sifre" name="sifre" minlength="6" required&gt;
  
  &lt;button type="submit"&gt;Kayıt Ol&lt;/button&gt;
&lt;/form&gt;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>&lt;form method="POST"&gt;</code>: Tüm form alanlarını paketler. <code>POST</code>, şifre gibi hassas verilerin adres çubuğunda açıkça görünmeden gizlice sunucuya gönderilmesini sağlar.</li>
                        <li><code>&lt;label for="ad"&gt;</code>: Kutunun ne olduğunu belirten etikettir. Kullanıcı bu yazıya tıkladığında bile ilgili kutucuk otomatik aktifleşir.</li>
                        <li><code>type="text"</code>: Kullanıcının normal düz yazı yazabileceği tek satırlık standart girdi alanıdır.</li>
                        <li><code>type="password"</code>: Yazılan karakterleri ekranda nokta (••••) olarak gizleyip arkadan bakanların şifreyi görmesini engeller.</li>
                        <li><code>placeholder="Örn: Ahmet"</code>: Kutu boşken içine silik bir renkle ipucu metni yazar; kullanıcı yazmaya başlayınca kaybolur.</li>
                        <li><code>required</code>: Bu alanın <strong>boş geçilemeyeceğini</strong> belirtir. Doldurulmadan butona basılırsa tarayıcı uyarı verir ve formu göndermez.</li>
                        <li><code>minlength="6"</code>: Şifrenin en az 6 karakter uzunluğunda olmasını zorunlu kılar.</li>
                        <li><code>&lt;button type="submit"&gt;</code>: Formdaki tüm verileri sunucuya gönderme işlemini tetikleyen onay butonudur.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "html-8",
            title: "Modern Semantik Düzen (header, nav, main, footer)",
            desc: "Her şey için div kullanmak yerine sayfaya anlam katan etiketler.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Modern Mimari</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Eski web sitelerinde her şey anlamsız <code>&lt;div&gt;</code> kutularından ibaretti. Semantik etiketler ise sayfanın neresinin menü, neresinin ana yazı, neresinin altbilgi olduğunu hem geliştiriciye hem de arama motoruna açıkça ilan eder.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>&lt;header&gt;
  &lt;nav&gt;&lt;a href="/"&gt;Ana Sayfa&lt;/a&gt;&lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;
    &lt;h1&gt;Yazılım Nasıl Öğrenilir?&lt;/h1&gt;
    &lt;p&gt;Düzenli pratik yaparak...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;
  &lt;p&gt;&copy; 2026 COD+. Tüm Hakları Saklıdır.&lt;/p&gt;
&lt;/footer&gt;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>&lt;header&gt;</code>: Sayfanın en üst tavan kısmıdır; genellikle site logosu ve giriş butonları burada yer alır.</li>
                        <li><code>&lt;nav&gt;</code>: Navigation (Gezinme). Sayfadaki ana menü linklerini sarmak için özel olarak ayrılmış anlamsal alandır.</li>
                        <li><code>&lt;main&gt;</code>: Sayfanın asıl odak noktası olan benzersiz ana içeriğini temsil eder. Bir sayfada yalnızca 1 adet bulunmalıdır.</li>
                        <li><code>&lt;article&gt;</code>: Tek başına başka bir yerde de yayınlansa anlam ifade edecek bağımsız içerikler (örneğin blog yazısı veya haber) için kullanılır.</li>
                        <li><code>&lt;footer&gt;</code>: Sayfanın taban kısmıdır; telif hakkı, sosyal medya ikonları ve iletişim bilgileri buraya yerleştirilir.</li>
                    </ul>
                </div>
            `
        }
    ],

    // ============================================================
    // 2. BÖLÜM: CSS (GÖRSEL STİL & DÜZEN)
    // ============================================================
    css: [
        {
            id: "css-1",
            title: "CSS Nedir ve Nasıl Bağlanır?",
            desc: "HTML iskeletini renklendirme, süsleme ve dış dosya bağlantısı.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Giriş</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>HTML çıplak bir ev inşaatıysa; CSS o evin boyası, mobilyası, pencereleri ve aydınlatmasıdır. Sitenin güzel, modern ve estetik görünmesini sağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>&lt;!-- HTML head içine yazılır: --&gt;
&lt;link rel="stylesheet" href="style.css"&gt;

/* style.css dosyasının içi: */
body {
  background-color: #0f172a;
  color: #f8fafc;
  font-family: 'Segoe UI', sans-serif;
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>&lt;link rel="stylesheet" href="style.css"&gt;</code>: HTML dosyasının dışarıda duran bağımsız CSS stil dosyasını okuyup sayfaya uygulamasını sağlar. En profesyonel yöntemdir.</li>
                        <li><code>body { ... }</code>: Sayfanın tamamını seçen ana seçicidir. İçindeki kurallar bütün sayfaya uygulanır.</li>
                        <li><code>background-color: #0f172a;</code>: Arka planı gözü yormayan koyu lacivert renge boyar.</li>
                        <li><code>color: #f8fafc;</code>: Yazıların rengini koyu zemin üzerinde rahat okunsun diye beyaza yakın açık renk yapar.</li>
                        <li><code>font-family: ...</code>: Sayfadaki yazıların hangi yazı tipinde (fontta) görüntüleneceğini belirler.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "css-2",
            title: "Kutu Modeli (Box Model: Padding vs Margin)",
            desc: "İç boşluk ve dış boşluk arasındaki kritik fark.",
            content: `
                <div class="book-card">
                    <div class="book-badge">En Önemli CSS Kuralı</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Web üzerindeki her şey bir dikdörtgen kutudur. Bir hediye paketini düşünün: Kutunun içindeki eşya ile kutu kenarı arasındaki boşluk <strong>Padding</strong>'dir. Kutunun diğer eşyalardan uzak durması ise <strong>Margin</strong>'dir.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>.kart {
  width: 300px;
  padding: 20px;
  margin: 40px auto;
  border: 2px solid #3b82f6;
  box-sizing: border-box;
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>padding: 20px;</code>: <strong>İç Boşluk.</strong> Yazının kartın kenarlarına yapışmasını engeller, içeriğe nefes aldırır.</li>
                        <li><code>margin: 40px auto;</code>: <strong>Dış Boşluk.</strong> Üstten ve alttan 40px mesafe bırakır; <code>auto</code> parçası ise kartı ekranın <strong>tam ortasına</strong> yatay olarak kilitler.</li>
                        <li><code>border: 2px solid #3b82f6;</code>: Kartın etrafına 2 piksel kalınlığında, düz, mavi renkli bir çerçeve çizer.</li>
                        <li><code>box-sizing: border-box;</code>: <strong>Hayati Kural:</strong> Padding ve border eklendiğinde kutunun dışa doğru şişip 300px genişliğini bozmasını engeller; tüm kalınlığı 300px'in içine hapseder.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "css-3",
            title: "Flexbox (Esnek Kutu Mimarisi)",
            desc: "Elemanları yan yana dizme ve ekranın ortasına kusursuz hizalama.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Layout / Yerleşim</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Eskiden yan yana menüler ve kartlar yapmak büyük bir çileydi. Flexbox, tek bir komutla kutuları yan yana sıralar ve aralarındaki boşluğu otomatik dengeler.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>.menu-cubugu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>display: flex;</code>: Kapsayıcıyı esnek kutu moduna geçirir; içindeki alt elemanlar alt alta dizilmek yerine anında <strong>yan yana</strong> geçer.</li>
                        <li><code>justify-content: space-between;</code>: İlk elemanı en sola (örneğin logoyu), son elemanı en sağa (örneğin profil butonunu) yaslar ve ortadaki boşluğu eşit paylaştırır.</li>
                        <li><code>align-items: center;</code>: Farklı boyuttaki elemanları <strong>dikey eksende tam ortalayarak</strong> aynı hizada tutar.</li>
                        <li><code>gap: 15px;</code>: Yan yana dizilen kutuların birbirine yapışmaması için aralarına 15 piksel hava boşluğu koyar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "css-4",
            title: "CSS Grid (İki Boyutlu Sayfa Izgarası)",
            desc: "Hem satırları hem sütunları aynı anda yöneten profesyonel tablo ızgarası.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Gelişmiş Düzen</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Flexbox tek bir yönde (sadece yatayda veya sadece dikeyde) dizilim yaparken, CSS Grid sayfayı satranç tahtası gibi karelere bölerek fotoğraf galerileri ve kart listeleri oluşturur.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>.galeri {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>display: grid;</code>: Izgara mimarisini aktif eder.</li>
                        <li><code>grid-template-columns: ...</code>: Sütunların nasıl dağılacağını belirler.</li>
                        <li><code>repeat(auto-fit, minmax(250px, 1fr))</code>: <strong>Sihirli Responsive Kalıp:</strong> Kartların genişliği en az 250px olsun, ekranda yer kaldıkça yan yana yeni sütun açılsın, ekran küçüldüğünde ise kartlar otomatik olarak alt satıra geçsin demektir. Sıfır media query ile tam mobil uyum sağlar!</li>
                        <li><code>gap: 20px;</code>: Izgara kutuları arasındaki yatay ve dikey boşluk mesafesidir.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "css-5",
            title: "Hover Efektleri ve Yumuşak Geçiş (transition)",
            desc: "Farenin üzerine gelmesiyle tetiklenen canlı animasyonlar.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Etkileşim & Animasyon</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Kullanıcı bir butona veya karta geldiğinde onun tıklanabilir olduğunu hissettirmek için renk değiştirmesini veya hafifçe yukarı doğru zıplamasını sağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>.buton {
  background-color: #3b82f6;
  transition: all 0.3s ease;
  cursor: pointer;
}

.buton:hover {
  background-color: #1d4ed8;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4);
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>transition: all 0.3s ease;</code>: Değişikliklerin aniden pat diye olmak yerine <strong>0.3 saniye boyunca pürüzsüz ve yumuşak</strong> akmasını sağlar.</li>
                        <li><code>cursor: pointer;</code>: Fare butonun üzerine gelince imlecin tıklanabilir el simgesine dönüşmesini sağlar.</li>
                        <li><code>:hover</code>: Farenin o nesnenin tam üzerinde olduğu anı yakalar.</li>
                        <li><code>transform: translateY(-5px);</code>: Butonu olduğu yerden 5 piksel havaya kaldırır (zıplatır).</li>
                        <li><code>box-shadow: ...</code>: Butonun altına renkli bir ışık/gölge düşürerek 3 boyutlu derinlik katar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "css-6",
            title: "Buzlu Cam Efekti (Glassmorphism)",
            desc: "Modern arayüzlerin gözdesi olan şeffaf ve bulanık cam kart tasarımı.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Modern Tasarım Trendi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Apple iOS ve Windows 11 arayüzlerinde sıkça gördüğünüz, arkadaki renkli nesneleri buzlu bir camın arkasındaymış gibi bulanık gösteren şık bir tekniktir.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>.cam-kart {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>background: rgba(255, 255, 255, 0.08);</code>: Kartın arka planını %8 oranında çok hafif şeffaf beyaz yapar; arkadaki içerik görünür.</li>
                        <li><code>backdrop-filter: blur(16px);</code>: <strong>Sihirli Kod:</strong> Kartın arkasında kalan tüm yazıları ve görselleri 16 piksel buzlu cam gibi bulanıklaştırır.</li>
                        <li><code>border: 1px solid rgba(...);</code>: Camın kenarındaki ince ışık kırılması yansımasını taklit eden saydam bir çerçeve çizer.</li>
                        <li><code>border-radius: 20px;</code>: Kartın sivri köşelerini yumuşatarak modern bir kavis verir.</li>
                    </ul>
                </div>
            `
        }
    ],

    // ============================================================
    // 3. BÖLÜM: JAVASCRIPT (ETKİLEŞİM & BEYİN)
    // ============================================================
    javascript: [
        {
            id: "js-1",
            title: "Değişkenler (let ve const)",
            desc: "Verileri hafızada saklama kutuları.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Temel Mantık</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Değişkenler, bir oyundaki can sayısı, kullanıcının girdiği isim veya sepetteki ürün adeti gibi sonradan kullanmak istediğimiz bilgileri bilgisayarın hafızasında tutan etiketli kutulardır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>const piSayisi = 3.14;
let kullaniciPuani = 100;

kullaniciPuani = kullaniciPuani + 50; // Yeni puan: 150</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>const</code>: Constant (Sabit) kelimesinden gelir. <strong>Değeri asla değişmeyecek</strong> bilgiler için kullanılır. Yanlışlıkla piSayisi = 5 yazarsanız JavaScript hata verir ve sistemi korur.</li>
                        <li><code>let</code>: Değeri zaman içinde değişebilen (örneğin artan puan, azalan can) değişkenleri tanımlamak için kullanılır.</li>
                        <li><code>= (Atama Operatörü)</code>: Sağ taraftaki değeri alır ve sol taraftaki kutunun içine koyar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "js-2",
            title: "Koşul Yapıları (if / else)",
            desc: "Programın şartlara göre farklı kararlar vermesi.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Karar Mekanizması</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>"Eğer kullanıcının parası yetiyorsa ürünü sat, yetmiyorsa yetersiz bakiye uyarısı ver" gibi mantıksal yol ayrımları kurmak için kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>const bakiye = 50;
const urunFiyati = 80;

if (bakiye >= urunFiyati) {
  console.log("Satın alma başarılı!");
} else {
  console.log("Yetersiz bakiye, lütfen para yükleyin.");
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>if (şart) { ... }</code>: Parantez içindeki şart doğruysa (true) süslü parantez arasındaki kodları çalıştırır.</li>
                        <li><code>>=</code>: Büyük veya eşit mi kontrolü yapan karşılaştırma operatörüdür.</li>
                        <li><code>else { ... }</code>: Yukarıdaki şart sağlanmadığı (false çıktığı) tüm diğer durumlarda devreye giren B planı bloğudur.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "js-3",
            title: "Fonksiyonlar (Arrow Functions)",
            desc: "Tekrar tekrar kullanılabilen akıllı kod fabrikaları.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Temiz Kod</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Aynı hesaplama veya işlemi 50 farklı yerde tekrar tekrar yazmak yerine tek bir fonksiyon yazarız; ihtiyaç olduğunda adını çağırıp çalıştırırız.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>const kdvHesapla = (fiyat) => {
  const kdvliFiyat = fiyat * 1.20;
  return kdvliFiyat;
};

const sonuc = kdvHesapla(100); // 120 döner</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>const kdvHesapla =</code>: Fonksiyona istediğimiz zaman çağırabilmek için verdiğimiz isimdir.</li>
                        <li><code>(fiyat)</code>: Fonksiyonun içine alıp üzerinde işlem yapacağı dış girdidir (parametre).</li>
                        <li><code>=></code>: Modern ES6 Ok Fonksiyonu (Arrow Function) işaretidir; fonksiyon olduğunu belirtir.</li>
                        <li><code>return kdvliFiyat;</code>: Yapılan hesabın sonucunu fonksiyonu çağıran kişiye geri teslim eder.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "js-4",
            title: "DOM Manipülasyonu ve Tıklama Dinleyicisi (addEventListener)",
            desc: "JavaScript ile sayfadaki butonlara hayat verme ve yazıları değiştirme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Kullanıcı Etkileşimi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Kullanıcı butona tıkladığında bir yazıyı değiştirmek, karanlık moda geçmek veya ekrana yeni bir kutu açmak için HTML ile JavaScript'i birbirine bağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>const baslik = document.querySelector("#ana-baslik");
const buton = document.querySelector("#degistir-btn");

buton.addEventListener("click", () => {
  baslik.textContent = "Butona Tıklandı ve Başlık Değişti! 🎉";
  baslik.classList.toggle("aktif");
});</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>document.querySelector("#ana-baslik")</code>: Sayfada <code>id="ana-baslik"</code> olan HTML elemanını bulup JavaScript değişkeninin içine yakalar.</li>
                        <li><code>addEventListener("click", ...)</code>: Butonun üzerine görünmez bir bekçi koyar; kullanıcı fareyle her tıkladığında içindeki fonksiyonu tetikler.</li>
                        <li><code>baslik.textContent = "..."</code>: Başlığın içindeki yazıyı anında yenisiyle değiştirir.</li>
                        <li><code>baslik.classList.toggle("aktif")</code>: Başlığa "aktif" isimli CSS sınıfını ekler; zaten varsa kaldırır (aç-kapa anahtarı).</li>
                    </ul>
                </div>
            `
        },
        {
            id: "js-5",
            title: "Asenkron Programlama ve Veri Çekme (fetch & async/await)",
            desc: "Sunuculardan canlı veri (hava durumu, ürünler) çekip sayfada gösterme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">API & İnternet İletişimi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Sayfayı yenilemeden bir sunucuya internet üzerinden bağlanıp en güncel döviz kurlarını veya ürün listesini arka planda çekmek için kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>const kullanicilariGetir = async () => {
  try {
    const cevap = await fetch("https://api.github.com/users");
    const veriler = await cevap.json();
    console.log("Kullanıcı Listesi:", veriler);
  } catch (hata) {
    console.error("İnternet bağlantısı koptu!", hata);
  }
};</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>async</code>: Bu fonksiyonun arka planda zaman alan işler yapacağını (asenkron olduğunu) tarayıcıya bildirir. Sayfanın donmasını engeller.</li>
                        <li><code>fetch("https://...")</code>: Belirtilen internet adresine kurye gibi gidip veriyi talep eder.</li>
                        <li><code>await</code>: İnternetten veri gelene kadar sabırla bekler, geldiği anda alt satıra geçer.</li>
                        <li><code>cevap.json()</code>: Sunucudan gelen ham internet paketini JavaScript'in okuyabileceği düzenli nesne/dizi formatına çevirir.</li>
                        <li><code>try ... catch</code>: Güvenlik kalkanıdır. Eğer internet koparsa uygulamanın çökmesini engeller, <code>catch</code> bloğuna geçip kullanıcıya uyarı gösterir.</li>
                    </ul>
                </div>
            `
        }
    ],

    // ============================================================
    // 4. BÖLÜM: PYTHON (SİSTEM & VERİ GÜCÜ)
    // ============================================================
    python: [
        {
            id: "py-1",
            title: "Python Sözdizimi ve Ekrana Yazdırma (print & f-strings)",
            desc: "Süslü parantezlerden arınmış temiz dil ve dinamik metin formatlama.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Python Felsefesi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Python dünyanın en sade ve insan diline en yakın yazılım dilidir. Noktalı virgül (;) veya süslü parantez ({}) kullanmaz; sadece girintilerle (boşluklarla) çalışır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>ad = "Deniz"
yas = 22

print(f"Merhaba {ad}, seneye {yas + 1} yaşında olacaksın!")</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>ad = "Deniz"</code>: Değişken tanımlarken let veya const yazmaya gerek yoktur; doğrudan isim ve değer yazılır (dinamik tipleme).</li>
                        <li><code>print(...)</code>: İçine yazılan her şeyi terminal/konsol ekranına basan temel fonksiyondur.</li>
                        <li><code>f"..." (f-string)</code>: Metnin başına koyulan <code>f</code> harfi, metnin içine <code>{degisken}</code> yazarak canlı değişkenleri ve matematiksel işlemleri doğrudan metne gömmemizi sağlar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "py-2",
            title: "Koşullu Durumlar ve Döngüler (if-elif-else, for, enumerate)",
            desc: "Karar mekanizmaları, sayaçsız döngüler ve indeks-eleman eşleşmesi.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Akış Denetimi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Belirli şartlara göre farklı kod bloklarını çalıştırmak (if-elif-else) ve bir veri listesi üzerinde tek tek gezinmek (for döngüsü) için kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>puan = 85

if puan >= 90:
    print("Derece: A")
elif puan >= 70:
    print("Derece: B")
else:
    print("Geliştirilmeli")

kurslar = ["HTML", "Python", "SQL"]
for sira, kurs in enumerate(kurslar, start=1):
    print(f"{sira}. Modül: {kurs}")</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>if - elif - else</code>: Koşul bloklarıdır. "elif", diğer dillerdeki "else if" yapısının Python'daki temiz karşılığıdır.</li>
                        <li><code>for kurs in kurslar:</code>: Listeyi baştan sona otomatik gezen sayaçsız döngüdür.</li>
                        <li><code>enumerate(kurslar, start=1)</code>: Döngü esnasında hem sıra numarasını (1, 2, 3...) hem de elemanın kendisini ("HTML", "Python"...) aynı anda paketleyerek verir.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "py-3",
            title: "Python Listeleri, Demetler (Tuples) ve Slicing (Dilimleme)",
            desc: "Değiştirilebilir listeler, sabit demetler ve [start:stop:step] ile ters çevirme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Veri Yapıları</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Birden çok veriyi sırayla saklamak için liste (mutable - değiştirilebilir) veya içeriği asla değiştirilemeyen güvenli demetler (tuple - immutable) kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>meyveler = ["Elma", "Armut", "Muz", "Çilek"]
meyveler.append("Kivi")

ilk_iki = meyveler[0:2]     # ['Elma', 'Armut']
ters_liste = meyveler[::-1] # Listeyi sondan başa çevirir

koordinat = (41.0082, 28.9784) # Tuple (Değiştirilemez)</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>["Elma", ...]</code>: Köşeli parantezler listeyi temsil eder. Eleman eklenebilir veya silinebilir.</li>
                        <li><code>(41.0, 28.9)</code>: Normal parantezler demet (tuple) oluşturur. Tanımlandıktan sonra elemanları değiştirilemez (salt okunurdur).</li>
                        <li><code>meyveler.append("Kivi")</code>: Listenin en sonuna yeni bir eleman ekler.</li>
                        <li><code>[::-1]</code>: <strong>Sihirli Dilimleme (Slicing):</strong> Adım değerini -1 vererek listeyi veya bir metni tek bir hamlede tersine çevirir.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "py-4",
            title: "Sözlükler (Dictionaries) ve Kümeler (Sets)",
            desc: "Anahtar-değer (Key-Value) tabanlı hızlı arama ve benzersiz eleman kümeleri.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Hızlı Arama & JSON</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Sözlükler indeks yerine etiketle (isimle) anında arama yapmayı sağlar. Kümeler (Set) ise matematikteki gibi içinde asla mükerrer (tekrar eden) eleman barındırmaz.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>kullanici = {
    "kullanici_adi": "deniz_dev",
    "rol": "admin",
    "puan": 1450
}

print(kullanici.get("rol", "ziyaretci")) # "admin"

etiketler = {"python", "sql", "python", "ai"}
print(etiketler) # {'python', 'sql', 'ai'} (Tekrarlar otomatik silinir)</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>{ "anahtar": deger }</code>: Sözlük (dict) oluşturur. JSON veri formatıyla birebir aynı mantıktadır.</li>
                        <li><code>kullanici.get("rol", "varsayilan")</code>: Aranan anahtar sözlükte yoksa hata verip çökmez; güvenle varsayılan değeri döndürür.</li>
                        <li><code>set(...) / { "a", "b" }</code>: Küme veri tipidir. Tekrar eden verileri otomatik olarak ayıklar (benzersizleştirir).</li>
                    </ul>
                </div>
            `
        },
        {
            id: "py-5",
            title: "Fonksiyonlar, *args, **kwargs ve Lambda İfadeleri",
            desc: "Yeniden kullanılabilir kod blokları, esnek argümanlar ve tek satırlık anonim fonksiyonlar.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Modüler Kodlama</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Sürekli tekrarlanan hesaplama veya mantıkları tek bir isim altında toplar; parametre sayısı belli olmayan durumlarda sınırsız argüman kabul eder.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>def siparis_ozeti(musteri, *urunler, **detaylar):
    toplam_adet = len(urunler)
    indirim = detaylar.get("indirim", 0)
    return f"{musteri}: {toplam_adet} ürün aldı (İndirim: %{indirim})"

kare_al = lambda x: x ** 2
print(kare_al(6)) # 36</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>def isim(parametre):</code>: Fonksiyon tanımlama anahtarıdır.</li>
                        <li><code>*urunler (*args)</code>: İstenildiği kadar virgüllü argümanı fonksiyon içine bir <code>tuple</code> olarak toplar.</li>
                        <li><code>**detaylar (**kwargs)</code>: İsimli parametreleri (anahtar=değer) fonksiyon içine bir <code>dict</code> (sözlük) olarak aktarır.</li>
                        <li><code>lambda x: x ** 2</code>: İsimsiz, tek satırlık pratik matematiksel veya filtreleme fonksiyonudur.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "py-6",
            title: "List & Dict Comprehensions ve Generator İfadeleri",
            desc: "Döngüleri tek satırda şık ve performanslı veri filtreleme araçlarına dönüştürme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">İleri Python Mimarisi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Klasik 4-5 satırlık döngü ve append işlemlerini tek bir satıra indirgeyerek CPython seviyesinde optimize edilmiş yüksek hız sağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>sayilar = [1, 2, 3, 4, 5, 6, 7, 8]

# Sadece çift sayıların karesini al:
cift_kareler = [x ** 2 for x in sayilar if x % 2 == 0] # [4, 16, 36, 64]

# Bellek tüketmeyen devasa generator:
milyon_uretec = (x * 2 for x in range(1000000))</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>[x ** 2 for x in sayilar]</code>: Liste üretecidir (List Comprehension). Her elemanı gezip formülü uygular ve yeni listeyi anında oluşturur.</li>
                        <li><code>if x % 2 == 0</code>: Yalnızca koşulu sağlayan elemanları yeni listeye dahil eder.</li>
                        <li><code>(x for x in ...)</code>: Yuvarlak parantez kullanıldığında liste belleğe yüklenmez; her adımda yalnızca bir eleman üreten <strong>Generator</strong> nesnesi yaratılır.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "py-7",
            title: "Hata Yönetimi (try-except-finally) ve Güvenli Dosya İşlemleri (with open)",
            desc: "Uygulamanın çökmesini önleme ve diske veri kaydederken bellek sızıntısını engelleme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Kararlılık & I/O</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Hatalı bir giriş yapıldığında uygulamanın hata verip kapanmasını engeller; dosyaların elektrik kesilse dahi güvenle diske kaydedilip kapatılmasını garanti eder.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>try:
    bolum = 10 / 0
except ZeroDivisionError as hata:
    print(f"Hata yakalandı: Sıfıra bölünemez! ({hata})")
finally:
    print("İşlem adımı tamamlandı.")

with open("log.txt", "a", encoding="utf-8") as f:
    f.write("Sistem başarıyla başlatıldı.\n")</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>try - except</code>: Tehlikeli kodları güvenli havuzda çalıştırır; hata çıkarsa <code>except</code> bloğu programı kurtarır.</li>
                        <li><code>finally</code>: Hata çıksa da çıkmasa da en sonda kesinlikle çalışan temizlik bloğudur.</li>
                        <li><code>with open(...) as f:</code>: <strong>Context Manager:</strong> Dosyayı açar ve blok bitiminde <code>f.close()</code> komutunu otomatik çağırarak bellek sızıntısını ve dosya kilitlenmesini imkansız kılar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "py-8",
            title: "Nesne Yönelimli Programlama (OOP: Class, self, @property ve Kalıtım)",
            desc: "Gerçek dünya sistemlerini sınıflarla modelleme, kapsülleme ve kurumsal mimari.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Yazılım Mimarisi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Birbiriyle ilişkili verileri ve bu veriler üzerinde çalışan fonksiyonları tek bir sınıf çatısı altında toplayarak düzenli ve ölçeklenebilir kod yazmayı sağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>class Calisan:
    def __init__(self, ad, maas):
        self.ad = ad
        self._maas = maas # Korumalı alan

    @property
    def maas(self):
        return self._maas

    def bilgileri_goster(self):
        return f"{self.ad} - Maaş: {self._maas} TL"

class Gelistirici(Calisan):
    def __init__(self, ad, maas, dil):
        super().__init__(ad, maas) # Üst sınıf kurucusunu çağırır
        self.dil = dil

yazilimci = Gelistirici("Selin", 45000, "Python")
print(yazilimci.bilgileri_goster())</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>class Calisan:</code>: Nesne türünü tanımlayan ana şablondur.</li>
                        <li><code>def __init__(self, ...):</code>: <strong>Kurucu Metod:</strong> Nesne ilk oluşturulduğu anda çalışan fonksiyondur.</li>
                        <li><code>self</code>: Oluşturulan nesnenin kendisine işaret eder. Her nesnenin kendi bağımsız verilerini tutmasını sağlar.</li>
                        <li><code>@property</code>: Bir metodu sanki bir değişkenmiş gibi <code>nesne.maas</code> şeklinde parantezsiz ve güvenli çağırmayı sağlar.</li>
                        <li><code>super().__init__(...)</code>: Alt sınıfın üst sınıftaki özellikleri miras alarak başlatmasını sağlar.</li>
                    </ul>
                </div>
            `
        }
    ],

    // ============================================================
    // 5. BÖLÜM: C# & .NET 9 (KURUMSAL VE SİSTEM YAZILIMI)
    // ============================================================
    csharp: [
        {
            id: "cs-1",
            title: "C# Program Yapısı ve Konsol Çıktısı",
            desc: "Modern C# ve .NET 9 dünyasına ilk adım.",
            content: `
                <div class="book-card">
                    <div class="book-badge">C# Temelleri</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>C#, Microsoft tarafından geliştirilen; kurumsal şirketlerden oyun sektörüne (Unity) kadar kullanılan dünyanın en popüler ve güçlü dillerinden biridir. Ekrana yazı yazdırmak ve kullanıcıyla etkileşime girmek için konsol komutları kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>// Modern .NET 9 Top-Level Statements
Console.WriteLine("COD+ ile C# Dünyasına Hoş Geldiniz!");

string kullanici = "Yazılımcı";
int seviye = 1;
Console.WriteLine($"Kullanıcı: {kullanici}, Seviye: {seviye}");</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>Console.WriteLine(...)</code>: Konsol ekranına metin yazdırıp imleci otomatik olarak bir alt satıra indirir.</li>
                        <li><code>string kullanici = "..."</code>: Metinsel veri tutan değişken tipidir. C# statik ve tip-güvenli (type-safe) bir dildir.</li>
                        <li><code>int seviye = 1</code>: Tamsayı türünde veri tutan değişken tipidir.</li>
                        <li><code>$"..."</code>: String interpolasyonudur. Süslü parantez içine değişkenleri gömerek şık ve okunaklı metin üretir.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cs-2",
            title: "Değişkenler, Tipler ve Güvenli Dönüşüm (TryParse)",
            desc: "int, double, bool ve güvenli kullanıcı girdisi.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Veri Tipleri</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Kullanıcıdan alınan her veri konsoldan string (metin) olarak gelir. Yaş veya para gibi hesaplamalarda kullanmak için bunu sayıya çevirmeliyiz. Programın hatalı girdide çökmemesi için <code>TryParse</code> altın anahtardır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>Console.Write("Lütfen yaşınızı girin: ");
string? girdi = Console.ReadLine();

if (int.TryParse(girdi, out int yas)) {
    Console.WriteLine($"Giriş başarılı! 5 yıl sonra {yas + 5} yaşında olacaksınız.");
} else {
    Console.WriteLine("Hata: Lütfen geçerli bir tamsayı giriniz!");
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>Console.ReadLine()</code>: Kullanıcının klavyeden yazdığı ve Enter'a bastığı metni okur.</li>
                        <li><code>string?</code>: Değişkenin boş (null) olabileceğini belirten güvenli C# tip bildirimidir.</li>
                        <li><code>int.TryParse(..., out int yas)</code>: Metni sayıya çevirmeyi dener; başarırsa true dönüp sonucu <code>yas</code> değişkenine atar, başaramazsa çökmeden false döner.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cs-3",
            title: "Karar Yapıları ve Modern Switch Expressions",
            desc: "if-else ve C# 8+ tek satırlık modern switch kalıbı.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Akış Kontrolü</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Programın farklı durumlarda farklı kararlar almasını sağlar. C#'ın modern <code>switch</code> ifadesi sayesinde sayfalarca if-else yazmak yerine tek satırda şık değer eşleştirmesi yapılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>int rolKodu = 2;

string unvan = rolKodu switch {
    1 => "Çırak Öğrenci",
    2 => "Usta Geliştirici",
    3 => "Akademik Mentör",
    _ => "Misafir Kullanıcı"
};

Console.WriteLine($"Kullanıcı Ünvanı: {unvan}");</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>switch { ... }</code>: Değişkenin değerine göre doğrudan bir sonuç üreten expression (ifade) bloğudur.</li>
                        <li><code>1 => "..."</code>: Lambda ok işaretiyle "eğer 1 ise bu metni ata" kuralını tanımlar.</li>
                        <li><code>_ => "..."</code>: Alt çizgi (discard), yukarıdakilerin hiçbiri uymadığında çalışan "varsayılan / default" durumdur.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cs-4",
            title: "Dinamik Koleksiyonlar: List<T> ve Dictionary",
            desc: "Boyutu esneyen listeler ve anahtar-değer haritaları.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Koleksiyonlar</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Sabit boyutlu diziler (array) yerine, eleman eklendikçe kendiliğinden büyüyen <code>List&lt;T&gt;</code> veya kimlik numarasıyla öğrenci aramak gibi anında O(1) hızında arama yapan <code>Dictionary</code> kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>// 1. Dinamik Liste
List<string> gorevler = new() { "Quiz Çöz", "A5 Kitabı Oku" };
gorevler.Add("Mini Projeyi Tamamla");

// 2. Sözlük (Dictionary)
Dictionary<string, int> skorlar = new() {
    { "Ali", 95 },
    { "Ayşe", 100 }
};

Console.WriteLine($"Ayşe'nin Skoru: {skorlar["Ayşe"]}");</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>List&lt;string&gt;</code>: Sadece metin tutabilen, eleman sayısı sınırsız generic liste tipidir.</li>
                        <li><code>new() { ... }</code>: C#'ın hedef tipten türetilen temiz nesne üretim sözdizimidir.</li>
                        <li><code>Dictionary&lt;string, int&gt;</code>: İlk tip anahtar (Key), ikinci tip değer (Value) olmak üzere sözlük veri yapısı kurar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cs-5",
            title: "Nesne Yönelimli Programlama (OOP) ve Properties",
            desc: "Class, Object, new anahtarı ve get; set; kapsüllemesi.",
            content: `
                <div class="book-card">
                    <div class="book-badge">OOP Temelleri</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Gerçek dünyadaki varlıkları (Banka Hesabı, Kullanıcı, Robot) kod dünyasında modellememizi sağlar. <code>get; set;</code> özellikleri ile verilerin güvenliği (kapsülleme) sağlanır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>public class BankaHesabi {
    public string HesapSahibi { get; set; } = "";
    private decimal _bakiye;

    public decimal Bakiye {
        get => _bakiye;
        set => _bakiye = value >= 0 ? value : 0; // Negatif bakiye engeli
    }

    public void ParaYatir(decimal miktar) {
        if (miktar > 0) Bakiye += miktar;
    }
}

var hesap = new BankaHesabi { HesapSahibi = "Kerem", Bakiye = 500 };
hesap.ParaYatir(250);
Console.WriteLine($"{hesap.HesapSahibi} Bakiye: {hesap.Bakiye} TL");</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>public class BankaHesabi</code>: Yeni bir nesne şablonu (sınıf) tanımlar.</li>
                        <li><code>private decimal _bakiye</code>: Sınıfın dışından doğrudan erişilemeyen gizli alan (field).</li>
                        <li><code>public decimal Bakiye { get; set; }</code>: Kapsülleme (Encapsulation) uygulayan, dışarıya kontrollü erişim açan özelliktir (Property).</li>
                        <li><code>new BankaHesabi(...)</code>: Sınıfı RAM belleğinde canlı bir nesneye dönüştürür.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cs-6",
            title: "Arayüzler (Interfaces) ve Kalıtım",
            desc: "Interface ile sözleşmeli mimari ve gevşek bağlı (loosely coupled) kod.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Yazılım Mimarisi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Kurumsal yazılımlarda ve TÜBİTAK/TEKNOFEST projelerinde kodların birbirine körü körüne bağımlı olmasını engeller. Bir arayüz (Interface), sınıflara "bu metodları mutlaka uygulamak zorundasın" sözleşmesi imzalatır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>public interface IBildirimServisi {
    void BildirimGonder(string mesaj);
}

public class SmsBildirim : IBildirimServisi {
    public void BildirimGonder(string mesaj) => Console.WriteLine($"SMS İletildi: {mesaj}");
}

public class EmailBildirim : IBildirimServisi {
    public void BildirimGonder(string mesaj) => Console.WriteLine($"E-Posta İletildi: {mesaj}");
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>public interface IBildirimServisi</code>: Arayüz tanımıdır. Kurumsal standart gereği ismi "I" harfi ile başlar.</li>
                        <li><code>void BildirimGonder(...)</code>: Gövdesiz kural tanımıdır; arayüzü uygulayan tüm sınıflar bu metodu yazmak zorundadır.</li>
                        <li><code>: IBildirimServisi</code>: Sınıfın o arayüzün kurallarını taahhüt ettiğini (implementasyon) bildirir.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cs-7",
            title: "LINQ (Language Integrated Query) ile Veri Sorgulama",
            desc: "SQL benzeri kolaylıkla liste filtreleme, sıralama ve arama.",
            content: `
                <div class="book-card">
                    <div class="book-badge">LINQ & Lambda</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Onlarca satır for döngüsü ve if yazmak yerine; veritabanı veya liste üzerindeki verileri tek bir satırda filtrelemenizi, sıralamanızı ve dönüştürmenizi sağlayan C#'ın en sevilen özelliğidir.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>List<int> sayilar = new() { 12, 5, 8, 20, 3, 15, 40 };

// 1. 10'dan büyük çift sayıları filtrele
var filtrelenmis = sayilar
    .Where(s => s > 10 && s % 2 == 0)
    .OrderBy(s => s)
    .ToList();

// 2. Şartı sağlayan ilk elemanı bul
int ilkBuyuk = sayilar.FirstOrDefault(s => s > 30);

Console.WriteLine($"Bulunan: {ilkBuyuk}"); // 40</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>.Where(s => ...)</code>: SQL'deki WHERE gibidir; koşulu sağlayanları filtreler.</li>
                        <li><code>.OrderBy(...)</code>: Elemanları küçükten büyüğe sıralar.</li>
                        <li><code>.FirstOrDefault(...)</code>: Koşula uyan ilk elemanı getirir; hiçbiri uymazsa hata vermeden tipin varsayılanını (0 veya null) döner.</li>
                        <li><code>.ToList()</code>: LINQ sorgusunu anında bellekte çalıştırıp somut bir Listeye dönüştürür.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cs-8",
            title: "Asenkron Programlama (async & await)",
            desc: "Uygulamanın donmasını engelleyen modern eşzamanlı görevler.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Asenkron Mimari</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>İnternetten büyük bir dosya indirirken veya veritabanından rapor çekerken ekranın donmasını ("Uygulama Yanıt Vermiyor" hatasını) engeller. İşlem arka planda akarken kullanıcı arayüzü akıcı kalır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>public async Task VeriYukleAsync() {
    Console.WriteLine("Veriler sunucudan çekiliyor...");
    
    // 2 saniyelik ağ gecikmesini simüle ediyoruz (Donma yok!)
    await Task.Delay(2000);
    
    Console.WriteLine("Veriler başarıyla yüklendi ve işlendi!");
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>async</code>: Metodun içinde arka plan görevleri çalışacağını bildirir.</li>
                        <li><code>Task</code>: Geriye değer döndürmeyen asenkron metodların C# dönüş tipidir (void yerine kullanılır).</li>
                        <li><code>await</code>: Arka plan görevi bitene kadar bekler, ancak bu esnada ana iş parçacığını (thread) asla kilitlemez.</li>
                        <li><code>Task.Delay(...)</code>: Thread'i uyutmadan asenkron zamanlayıcı başlatır.</li>
                    </ul>
                </div>
            `
        }
    ],

    // ============================================================
    // 6. BÖLÜM: SQL & İLİŞKİSEL VERİTABANI YÖNETİMİ
    // ============================================================
    sql: [
        {
            id: "sql-1",
            title: "Veritabanı Mimarisi ve SELECT Sorgusu",
            desc: "Tablolar, satırlar ve sütunlardan veri çekmenin evrensel standardı.",
            content: `
                <div class="book-card">
                    <div class="book-badge">SQL Temelleri</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>SQL, milyarlarca kullanıcının ve ürünün bilgilerini düzenli tablolarda saklamak ve milisaniyeler içinde çekmek için kullanılan evrensel standart dildir. Web sitelerinin ve yapay zekâ modellerinin arkasındaki hafızadır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>-- Tüm müşterilerin ad, soyad ve e-postasını getir
SELECT 
    first_name AS ad,
    last_name AS soyad,
    email AS iletisim
FROM customers
LIMIT 10;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>SELECT ...</code>: Tablodan hangi sütunların ekrana getirileceğini belirtir. <code>*</code> tüm sütunları, sütun adları ise sadece seçilenleri çeker.</li>
                        <li><code>AS ad</code>: Takma isimdir (Alias); veritabanındaki teknik sütun adını kullanıcıya anlaşılır şekilde gösterir.</li>
                        <li><code>FROM customers</code>: Verilerin hangi tablodan çekileceğini belirtir.</li>
                        <li><code>LIMIT 10</code>: Sonuç kümesini ilk 10 satırla sınırlar (sayfalama performansı).</li>
                    </ul>
                </div>
            `
        },
        {
            id: "sql-2",
            title: "Şartlı Filtreleme: WHERE, AND ve OR",
            desc: "Milyonlarca satır arasından tam aradığınız kayıtları filtreleme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Filtreleme</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Tüm tabloyu çekmek yerine sadece belirli bir koşulu (örneğin İstanbul'da yaşayan ve 18 yaşından büyük olanları) filtreleyerek sunucuyu yormadan hedef veriye ulaşmamızı sağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>SELECT title, price, stock 
FROM products 
WHERE category = 'Elektronik' AND price <= 5000 AND stock > 0
ORDER BY price DESC;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>WHERE ...</code>: Satır düzeyinde filtreleme koşulunu başlatır.</li>
                        <li><code>AND</code>: Her iki şartın da (hem fiyatın 5000'den küçük hem stoğun 0'dan büyük olması) aynı anda sağlanmasını zorunlu kılar.</li>
                        <li><code>ORDER BY price DESC</code>: Sonuçları fiyata göre en pahalıdan en ucuza (azalan sırada) dizer.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "sql-3",
            title: "Esnek Arama ve Aralıklar: LIKE, IN, IS NULL",
            desc: "Metin desenleri, liste içi aramalar ve boş değer yönetimi.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Gelişmiş Arama</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Kullanıcı arama kutusuna yarım bir kelime yazdığında (Google araması gibi) veya belirli bir şehirler listesindeki müşterileri ararken kullanılır. SQL'de boş veriler <code>IS NULL</code> ile sorgulanır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>-- 1. İçinde 'Pro' geçen ürünler
SELECT name, price FROM products WHERE name LIKE '%Pro%';

-- 2. Ankara veya İzmir'deki kayıtlar
SELECT full_name, city FROM users WHERE city IN ('Ankara', 'İzmir');

-- 3. Telefonu girilmemiş (boş) kullanıcılar
SELECT full_name FROM users WHERE phone IS NULL;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>LIKE '%Pro%'</code>: <code>%</code> joker karakteriyle başında ve sonunda ne olursa olsun içinde 'Pro' geçen metinleri yakalar.</li>
                        <li><code>IN ('...', '...')</code>: Arka arkaya 10 tane OR yazmak yerine temiz liste karşılaştırması yapar.</li>
                        <li><code>IS NULL</code>: Değerin tanımsız/boş olduğunu kontrol eder. SQL'de <code>= NULL</code> asla çalışmaz!</li>
                    </ul>
                </div>
            `
        },
        {
            id: "sql-4",
            title: "Toplama ve Gruplama: COUNT, SUM, GROUP BY, HAVING",
            desc: "Kategorilere göre ciro, ürün sayısı ve ortalama hesaplama.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Veri Analitiği</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Yönetici panelleri ve grafikler için özet raporlar üretir. Örneğin: 'Her kategoride kaç ürün var ve toplam ciromuz nedir?' sorusunun cevabını milisaniyede hesaplar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>SELECT 
    category_name,
    COUNT(*) AS urun_sayisi,
    AVG(price) AS ortalama_fiyat,
    SUM(stock) AS toplam_stok
FROM products
GROUP BY category_name
HAVING COUNT(*) >= 5;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>COUNT(*)</code>: Gruptaki toplam satır adedini sayar.</li>
                        <li><code>AVG(price)</code>: Sütundaki fiyatların aritmetik ortalamasını alır.</li>
                        <li><code>GROUP BY category_name</code>: Satırları kategori isimlerine göre demetler.</li>
                        <li><code>HAVING COUNT(*) >= 5</code>: Gruplanmış istatistikler üzerinde filtreleme yapar (Sadece en az 5 ürünü olan kategoriler).</li>
                    </ul>
                </div>
            `
        },
        {
            id: "sql-5",
            title: "Tablo Tasarımı ve Kısıtlamalar (CREATE TABLE & Constraints)",
            desc: "PRIMARY KEY, FOREIGN KEY, UNIQUE ve CASCADE ile hatasız şema.",
            content: `
                <div class="book-card">
                    <div class="book-badge">DDL & Şema</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Veritabanının temel iskeletini ve kurallarını belirler. Aynı e-postayla iki kez kayıt olmayı veya var olmayan bir müşteriye sipariş açılmasını veritabanı düzeyinde engeller.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    order_date TIMESTAMP DEFAULT NOW()
);</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>SERIAL PRIMARY KEY</code>: Otomatik 1, 2, 3 diye artan, benzersiz ve asla boş olamayan ana kimlik sütunudur.</li>
                        <li><code>REFERENCES customers(id)</code>: Yabancı anahtar (Foreign Key) ile siparişi müşteriler tablosuna kilitler.</li>
                        <li><code>ON DELETE CASCADE</code>: Müşteri silinirse ona ait tüm siparişlerin de otomatik temizlenmesini sağlar.</li>
                        <li><code>CHECK (total_price >= 0)</code>: Fiyatın negatif girilmesini veritabanı seviyesinde yasaklar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "sql-6",
            title: "Veri Ekleme, Güncelleme ve Silme (INSERT, UPDATE, DELETE)",
            desc: "DML komutları ile kayıt yönetimi ve güvenli silme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">DML İşlemleri</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Tablolara yeni veriler kaydetmek, mevcut bilgileri güncellemek veya eskiyen kayıtları silmek için kullanılan temel veri manipülasyon komutlarıdır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>-- 1. Veri Ekleme
INSERT INTO users (username, email) 
VALUES ('can_dev', 'can@codplus.com')
RETURNING id;

-- 2. Veri Güncelleme
UPDATE products 
SET price = price * 1.10 
WHERE category_id = 2;

-- 3. Veri Silme
DELETE FROM cart_items 
WHERE user_id = 15;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>INSERT INTO ... VALUES</code>: Tabloya yeni bir satır ekler.</li>
                        <li><code>RETURNING id</code>: PostgreSQL'in eklenen kaydın ID'sini anında geri dönmesini sağlar.</li>
                        <li><code>UPDATE ... SET ... WHERE</code>: Belirli satırların değerini değiştirir. WHERE unutulursa tüm tablo güncellenir!</li>
                        <li><code>DELETE FROM ... WHERE</code>: Şartı sağlayan satırları siler.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "sql-7",
            title: "Tablo Birleştirme Sanatı: INNER JOIN & LEFT JOIN",
            desc: "Farklı tablolardaki ilişkili verileri yan yana getirme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">JOIN Mimarisi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>İlişkisel veritabanlarının en güçlü silahıdır. Müşteri bilgisi ayrı tabloda, sipariş bilgisi ayrı tablodadır; JOIN ile bu iki tablo tek bir sanal raporda yan yana getirilir.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>-- Müşteri adı ile verdiği sipariş tutarını yan yana getir
SELECT 
    c.full_name AS musteri,
    o.id AS siparis_no,
    o.total_price AS tutar
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;

-- Henüz hiç sipariş vermemiş müşterileri bul (LEFT JOIN)
SELECT c.full_name 
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>INNER JOIN</code>: Sadece her iki tabloda da birbiriyle eşleşen satırları (kesişim kümesini) getirir.</li>
                        <li><code>ON c.id = o.customer_id</code>: İki tablonun hangi sütunlar üzerinden birbirine bağlanacağını bildirir.</li>
                        <li><code>LEFT JOIN</code>: Sol tablodaki (customers) herkesi getirir; siparişi olmayanların yanına NULL basar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "sql-8",
            title: "Transaction Güvenliği ve ACID Prensipleri",
            desc: "Banka havalesi senaryosu: BEGIN, COMMIT ve ROLLBACK.",
            content: `
                <div class="book-card">
                    <div class="book-badge">ACID & Güvenlik</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Banka havalesinde Ali'den 1000 TL düşüp Veli'ye aktarılırken elektrik kesilirse para kaybolur! Transaction, 'bu işlemler ya hep birlikte tamamen başarılı olur ya da tek bir hata varsa hiçbiri olmamış gibi geri alınır' kuralıdır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>BEGIN; -- İşlem paketini başlat

-- 1. Gönderenin bakiyesini düş
UPDATE accounts SET balance = balance - 1000 WHERE id = 101;

-- 2. Alıcının bakiyesini artır
UPDATE accounts SET balance = balance + 1000 WHERE id = 102;

-- Her şey hatasızsa kalıcı olarak kaydet
COMMIT;

-- Eğer hata olsaydı tüm adımları geri alırdık:
-- ROLLBACK;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>BEGIN</code>: Atomik (bölünemez) bir işlem oturumu başlatır.</li>
                        <li><code>COMMIT</code>: Oturum içindeki tüm SQL komutlarını kalıcı olarak veritabanı diskine mühürler.</li>
                        <li><code>ROLLBACK</code>: Beklenmeyen bir hata veya bakiye yetersizliğinde yapılan tüm adımları başa sarar.</li>
                    </ul>
                </div>
            `
        }
    ],

    // ============================================================
    // 7. BÖLÜM: C++ & SİSTEM MİMARİSİ (YÜKSEK PERFORMANS)
    // ============================================================
    cpp: [
        {
            id: "cpp-1",
            title: "C++ Giriş, İsim Uzayları (std::) ve Hızlı Konsol I/O (cin, cout)",
            desc: "Doğrudan donanıma hükmeden C++ mimarisi ve optimize edilmiş konsol akışı.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Temel Sistem Mimarisi</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>C++ oyun motorlarından işletim sistemlerine, finansal işlem sistemlerinden uzay araçlarına kadar dünyanın en hızlı ve kaynak kontrollü dillerinden biridir.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>#include &lt;iostream&gt;

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    int yas;
    std::cout &lt;&lt; "Yaşınızı giriniz: ";
    if (std::cin &gt;&gt; yas) {
        std::cout &lt;&lt; "Gelecek yıl: " &lt;&lt; (yas + 1) &lt;&lt; "\n";
    }
    return 0;
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>#include &lt;iostream&gt;</code>: Giriş/Çıkış akışlarını (cout, cin) sağlayan standart C++ kütüphanesini projeye dahil eder.</li>
                        <li><code>int main()</code>: Her C++ programının işletim sistemi tarafından başlatıldığı zorunlu ana giriş fonksiyonudur.</li>
                        <li><code>std::cout &lt;&lt; ...</code>: Ekrana veri basmak için kullanılan standart çıkış akışıdır.</li>
                        <li><code>std::endl yerine "\n"</code>: <code>std::endl</code> her satırda arabelleği (buffer) zorla boşaltarak yavaşlatır; <code>"\n"</code> kullanmak performansı onlarca kat hızlandırır.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cpp-2",
            title: "Fonksiyonlar, Değer vs Referans (&) ve Const Referans",
            desc: "Kopyalama maliyetini sıfırlayan takma ad (alias) referans mimarisi.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Bellek & Performans</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Fonksiyonlara parametre aktarırken megabaytlarca büyüklükteki nesneleri kopyalamak yerine, orijinal adresini (&) referans olarak geçirip sıfır maliyetle işlem yapmayı sağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

void takas(int& a, int& b) {
    int gecici = a;
    a = b;
    b = gecici;
}

void ekranaBas(const std::string& metin) {
    std::cout &lt;&lt; metin &lt;&lt; "\n";
}</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>int& a</code>: Referans parametresidir. Değişkenin bir kopyasını almaz; doğrudan ana fonksiyondaki orijinal değişkene bağlanır (değişiklikler kalıcı olur).</li>
                        <li><code>const std::string& metin</code>: <strong>Altın Standart:</strong> Metni kopyalamadan belleği korur; <code>const</code> sayesinde de fonksiyon içinde metnin kazara değiştirilmesini imkansız kılar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cpp-3",
            title: "İşaretçiler (Pointers), Adres Operatörleri (&, *) ve nullptr",
            desc: "Bellekteki fiziksel RAM adreslerini yönetme ve doğrudan adrese erişim.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Donanım Seviyesi Bellek</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Değişkenin değerini değil, RAM'de tam olarak hangi adreste durduğunu saklar. Donanım aygıtlarına erişirken veya dinamik veri yapıları kurarken kullanılır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>int sayi = 100;
int* ptr = &sayi; // ptr sayının bellek adresini tutar

*ptr = 250;      // Gösterilen adresteki değeri 250 yapar

int* bosPtr = nullptr; // Güvenli boş işaretçi</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>int* ptr</code>: Bir tamsayı adresini saklayabilen işaretçi (pointer) değişkenidir.</li>
                        <li><code>&sayi</code>: Adres alma operatörüdür; <code>sayi</code> değişkeninin RAM üzerindeki hex adresini (örn: 0x7ffd...) döndürür.</li>
                        <li><code>*ptr = 250</code>: <strong>Dereference (Adrese Gitme):</strong> İşaretçinin baktığı adresteki gerçek veriyi günceller.</li>
                        <li><code>nullptr</code>: C++11 ile gelen tür güvenli boşluk göstergesidir. Eski tehlikeli NULL yerine kullanılır.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cpp-4",
            title: "Dinamik Bellek Yönetimi (new / delete) ve RAII Prensibi",
            desc: "Heap bölgesinden bellek tahsis etme ve bellek sızıntılarını (leak) önleme.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Kaynak Yaşam Döngüsü</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Program çalışırken boyutu önceden bilinmeyen veriler için Heap (Öbek) bölgesinden dinamik bellek ayırır. RAII prensibi ise bu belleğin işi bittiğinde otomatik silinmesini güvenceye alır.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>// Dinamik Dizi Tahsisi
int boyut = 10;
int* dinamikDizi = new int[boyut];

dinamikDizi[0] = 42;

// Mutlaka serbest bırakılmalıdır:
delete[] dinamikDizi;
dinamikDizi = nullptr;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>new int[boyut]</code>: Heap bölgesinde belirtilen boyutta dinamik bellek alanı tahsis eder.</li>
                        <li><code>delete[]</code>: Dizi olarak ayrılmış dinamik belleği işletim sistemine geri iade eder. Unutulursa <strong>Bellek Sızıntısı (Memory Leak)</strong> oluşur.</li>
                        <li><code>RAII Kuralı</code>: Kaynaklar nesnenin kurucusunda alınmalı, yıkıcısında (destructor) otomatik serbest bırakılmalıdır.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cpp-5",
            title: "Modern Akıllı İşaretçiler (std::unique_ptr ve std::shared_ptr)",
            desc: "Manuel delete komutunu tarihe gömen otomatik bellek temizleyiciler.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Modern C++ (Smart Pointers)</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Modern C++'ta artık çıplak <code>delete</code> kullanılmaz. Akıllı işaretçiler, değişken kapsam dışına çıktığı anda belleği mikro-saniyeler içinde otomatik olarak iade eder.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>#include &lt;memory&gt;

// 1. Tekil Mülkiyet (Unique Pointer):
auto uPtr = std::make_unique&lt;int&gt;(500);

// 2. Paylaşılan Mülkiyet (Shared Pointer):
auto sPtr1 = std::make_shared&lt;std::string&gt;("COD+ C++");
auto sPtr2 = sPtr1; // Referans sayacı 2 olur

// sPtr1 ve sPtr2 yok olduğunda bellek otomatik temizlenir!</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>std::unique_ptr</code>: Nesnenin tek bir sahibi olduğunu garanti eder. Kopyalanamaz, sadece <code>std::move</code> ile sahipliği devredilebilir.</li>
                        <li><code>std::shared_ptr</code>: Bir nesneye birden fazla işaretçinin bakmasına izin verir; içindeki referans sayacı 0 olduğunda belleği serbest bırakır.</li>
                        <li><code>std::make_unique / std::make_shared</code>: İstisna güvenliği (exception safety) sağlayan modern tahsis fonksiyonlarıdır.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cpp-6",
            title: "Sınıflar (Class), Kurucular (Constructor) ve Kapsülleme (Encapsulation)",
            desc: "Özel (private) alanlar, üye başlatma listeleri ve ~Destructor temizliği.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Nesne Yönelimli Mimari</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Verileri dış dünyanın hatalı müdahalelerinden koruyarak (private), yalnızca kontrollü metotlar (public) üzerinden işlem yapılmasını sağlayan güvenli kurumsal sınıf mimarisidir.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>class BankaHesabi {
private:
    double bakiye;
public:
    // Üye Başlatma Listesi (Member Initializer List)
    explicit BankaHesabi(double baslangic) : bakiye(baslangic) {}

    void paraYatir(double miktar) {
        if (miktar > 0) bakiye += miktar;
    }

    double getBakiye() const { return bakiye; }

    ~BankaHesabi() { /* Nesne yok edilirken çalışan temizlik */ }
};</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>private: double bakiye;</code>: Bakiyeye dışarıdan doğrudan erişilmesini engeller; yalnızca kuralları belirlenmiş metotlar güncelleyebilir.</li>
                        <li><code>: bakiye(baslangic)</code>: <strong>Üye Başlatma Listesi:</strong> Değişkeni kurucu gövdesinde atamak yerine doğrudan inşa anında başlatarak yüksek hız sağlar.</li>
                        <li><code>explicit</code>: İstenmeyen örtük tip dönüşümlerini engeller.</li>
                        <li><code>~BankaHesabi()</code>: <strong>Yıkıcı (Destructor):</strong> Nesne bellekten silinirken çalışan veda metodudur.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cpp-7",
            title: "Kalıtım (Inheritance), Virtual Fonksiyonlar ve Dinamik Polimorfizm",
            desc: "Çalışma zamanı çok biçimliliği (runtime polymorphism) ve arayüz (Interface) sınıfları.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Polimorfizm & VTable</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Tek bir temel işaretçi (örn: Sekil*) üzerinden alt sınıfların (Daire, Kare) kendi özel çizim metotlarını çalışma zamanında dinamik olarak tetiklemesini sağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>class Sekil {
public:
    virtual void ciz() const = 0; // Saf Sanal (Pure Virtual - Soyut Sınıf)
    virtual ~Sekil() = default;   // Sanal Yıkıcı (Hayati Önem Taşır!)
};

class Daire : public Sekil {
public:
    void ciz() const override {
        std::cout &lt;&lt; "◯ Daire Çizildi\n";
    }
};</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>virtual void ciz() = 0;</code>: Bu sınıfın soyut bir arayüz olduğunu ve alt sınıfların bu metodu ezmek zorunda olduğunu bildirir.</li>
                        <li><code>virtual ~Sekil()</code>: Temel sınıf üzerinden türetilmiş nesneler silindiğinde türemiş sınıfın yıkıcısının da çalışmasını garanti eder; bellek sızıntısını önler.</li>
                        <li><code>override</code>: Derleyicinin temel sınıftaki fonksiyon imzasıyla eşleşmeyi denetlemesini sağlar; harf hatalarını derleme anında yakalar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cpp-8",
            title: "Standart Şablon Kütüphanesi (STL) ve Modern Lambda İfadeleri",
            desc: "Yüksek performanslı std::vector, std::unordered_map ve [capture] anonim fonksiyonlar.",
            content: `
                <div class="book-card">
                    <div class="book-badge">STL & Fonksiyonel C++</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Sıfırdan dinamik dizi veya hash tablosu yazmak yerine, C++ mühendislerince en üst düzeyde optimize edilmiş hazır veri yapıları ve algoritmaları kullanmayı sağlar.</p>
                    
                    <h4>💻 Canlı Kod Örneği:</h4>
                    <pre><code>#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;unordered_map&gt;

std::vector&lt;int&gt; sayilar = {5, 2, 8, 1, 9};

// Lambda ile küçükten büyüğe sıralama:
std::sort(sayilar.begin(), sayilar.end(), [](int a, int b) {
    return a &lt; b;
});

// O(1) Anlık Hash Tablosu:
std::unordered_map&lt;std::string, int&gt; skorlar;
skorlar["Deniz"] = 98;</code></pre>

                    <h4>🔍 Hangi Kod Parçası Ne İçin Kullanıldı?</h4>
                    <ul class="book-explain-list">
                        <li><code>std::vector&lt;T&gt;</code>: Boyutu otomatik büyüyüp küçülebilen dinamik bellek dizisidir.</li>
                        <li><code>std::unordered_map&lt;K, V&gt;</code>: Ortalama O(1) sürede anahtara göre değere erişen hash tablosudur.</li>
                        <li><code>[](int a, int b) { ... }</code>: Modern C++11 Lambda ifadesidir. Fonksiyon yazmadan yerinde sıralama veya filtreleme kriteri belirler.</li>
                    </ul>
                </div>
            `
        }
    ],

    // ============================================================
    // 7. BÖLÜM: ARAÇLAR & TEKNOLOJİLER (Mevcut Haliyle Korunuyor)
    // ============================================================
    editors: [
        {
            id: "ed-1",
            title: "VS Code Kısayolları ve Eklentiler",
            desc: "Dünyanın en popüler kod editörünü ustalıkla kullanma.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Geliştirici Araçları</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Visual Studio Code, kod yazarken size otomatik tamamlama, hata bulma ve renklendirme sağlayan ücretsiz profesyonel geliştirici ortamıdır.</p>
                    <h4>Önemli Kısayollar:</h4>
                    <ul class="book-explain-list">
                        <li><code>Ctrl + /</code>: Seçili satırı yorum satırı yapar veya yorumdan çıkarır.</li>
                        <li><code>Alt + Yukarı/Aşağı Ok</code>: Satırı fareye dokunmadan bir üst veya alt satıra taşır.</li>
                        <li><code>Ctrl + D</code>: Aynı kelimeden sonrakini de seçip aynı anda çoklu düzenleme yapmanızı sağlar.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "ed-2",
            title: "Git ve GitHub Temelleri",
            desc: "Kodlarınızı buluta yedekleme ve takım halinde çalışma.",
            content: `
                <div class="book-card">
                    <div class="book-badge">Versiyon Kontrolü</div>
                    <h4>💡 Ne İşe Yarar?</h4>
                    <p>Oyunlardaki save noktası gibidir. Kodunuz çalışırken bir save noktası (commit) alırsınız; ileride kod bozulursa tek tıkla eski çalışan haline geri dönebilirsiniz.</p>
                    <h4>Temel Komutlar:</h4>
                    <ul class="book-explain-list">
                        <li><code>git init</code>: Proje klasöründe versiyon takibini başlatır.</li>
                        <li><code>git add .</code>: Yapılan tüm değişiklikleri kayıt odasına alır.</li>
                        <li><code>git commit -m "ilk versiyon"</code>: Değişiklikleri kalıcı bir checkpoint olarak kaydeder.</li>
                        <li><code>git push</code>: Bilgisayarınızdaki kayıtları GitHub sunucularına gönderir.</li>
                    </ul>
                </div>
            `
        }
    ]
};
