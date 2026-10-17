# 🤖 COD+ 2026 — Backend & Yapay Zeka Entegrasyon Rehberi (Esma İçin)

Bu klasör (`backend/`), **COD+ 2026** platformunun **Yapay Zeka (Coddy AI)** ve **Veritabanı (SQLite / PostgreSQL / MongoDB)** mimarisini yönetmek üzere hazırlanmıştır.

---

## 🚀 1. Hızlı Başlangıç (3 Adımda Çalıştırma)

### 1. Adım: Bağımlılıkları Yükleyin
`backend` klasörü içinde bir terminal açın ve şu komutu çalıştırın:
```bash
npm install
```

### 2. Adım: `.env` Dosyasını Oluşturun
Klasördeki `.env.example` dosyasının adını `.env` yapın veya yeni bir `.env` dosyası oluşturup içine Google Gemini API anahtarınızı ekleyin:
```env
PORT=5000
GEMINI_API_KEY=AIzaSy...BURAYA_API_KEY_GELECEK
```
*(Eğer elinizde henüz Gemini API anahtarı yoksa [Google AI Studio](https://aistudio.google.com/app/apikey) üzerinden 1 dakikada ücretsiz alabilirsiniz. Anahtar olmasa dahi sunucu akıllı simülasyon modunda sorunsuz çalışır).*

### 3. Adım: Sunucuyu Başlatın
```bash
npm start
```
Veya otomatik yeniden başlatma (nodemon) ile:
```bash
npm run dev
```

Sunucu başladığında terminalde şu çıktıyı göreceksiniz:
```
🗄️ SQLite veritabani basariyla baglandi: codplus.db
🚀 COD+ 2026 API Sunucusu http://localhost:5000 adresinde aktif!
📡 Saglik Kontrolu: http://localhost:5000/api/health
```

---

## 📡 2. Hazır API Endpoint'leri

Frontend (`script.js`), aşağıdaki endpoint'lerle otomatik haberleşir:

| Metot | Endpoint | Açıklama | Gönderilen Veri (Body) |
|---|---|---|---|
| `GET` | `/api/health` | Sunucu ve AI durum kontrolü | - |
| `GET` | `/api/users/mock` | Hazır Mock Öğrenci ve Danışman bilgileri | - |
| `POST` | `/api/auth/login` | Kullanıcı giriş ve otomatik kayıt | `{ email, password, name, role }` |
| `POST` | `/api/ai/chat` | Coddy AI sohbeti ve mentörlük | `{ prompt, role, user, language, mentor_advices, context }` |
| `POST` | `/api/ai/explain-code` | IDE satır satır kod analizi | `{ code, language }` |
| `GET` | `/api/projects` | Tüm projeleri listeler | - |
| `POST` | `/api/projects` | Yeni proje ve açık pozisyon ekler | `{ id, title, desc, domain, leadName, ... }` |
| `GET` | `/api/messages/:receiver`| Sohbet mesajlarını çeker | `?sender=Ahmet` |
| `POST` | `/api/messages` | Yeni mesaj kaydeder | `{ sender, receiver, text }` |

---

## 👥 3. Hazır Mock Demo Kullanıcı Hesapları (SQLite Veritabanında Kayıtlı)

Veritabanı (`codplus.db`) ilk çalıştığında aşağıdaki 2 mock kullanıcı otomatik olarak oluşturulur:

1. **Öğrenci Hesabı:**
   - **E-posta:** `ogrenci@codplus.com`
   - **Şifre:** `ogrenci123`
   - **Ad:** Deniz Kaya
   - **Rol:** `ogrenci` (Ders haritası, IDE, düellolar ve seviye ilerlemesi)

2. **Danışman / Mentör Hesabı:**
   - **E-posta:** `danisman@codplus.com`
   - **Şifre:** `danisman123`
   - **Ad:** Dr. Selin Demir
   - **Rol:** `danisman` (Proje & Görev Yönetimi)
   - **Özel Yetki:** Danışman dilediği an arayüzdeki **"Öğrenci Görünümüne Geç"** butonuna basarak ders haritasını ve öğrencilerin gördüğü tüm ekranları bir öğrenci gibi deneyimleyebilir; ardından **"Danışman Paneline Dön"** ile tekrar yönetim moduna dönebilir.

---

## 🔄 3. Frontend - Backend İletişim Mantığı

* Frontend (`script.js`), yerel test yaparken otomatik olarak `http://localhost:5000/api` adresine bağlanmayı dener.
* Eğer sunucunuz açıksa, doğrudan **gerçek Google Gemini LLM motoru** ve **SQLite veritabanı** kullanılır.
* Eğer sunucu o an kapalıysa, frontend kesinlikle hata vermez veya çökmez; platform içerisindeki dahili yerel kurallar ve localStorage devreye girerek kesintisiz çalışmayı sürdürür.

---

## 🗄️ 4. Veritabanını Genişletme / Değiştirme
Varsayılan olarak sıfır konfigürasyon gerektiren **SQLite (`codplus.db`)** kullanılmıştır. İlerleyen aşamalarda **PostgreSQL** veya **MongoDB**'ye geçmek isterseniz `server.js` dosyasındaki `db` bağlantısını `pg` (Prisma / TypeORM) veya `mongoose` ile kolayca değiştirebilirsiniz; endpoint JSON formatları aynı kalacaktır.
