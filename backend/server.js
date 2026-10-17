const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS ve JSON destegi
app.use(cors({ origin: '*' }));
app.use(express.json());

// ============================================================
// 1. VERITABANI BAĞLANTISI VE TABLOLAR (SQLite)
// ============================================================
const db = new sqlite3.Database('./codplus.db', (err) => {
    if (err) {
        console.error("❌ Veritabani baglanti hatasi:", err.message);
    } else {
        console.log("🗄️ SQLite veritabani basariyla baglandi: codplus.db");
    }
});

// Gerekli tablolari otomatik olustur
db.serialize(() => {
    // 1. Kullanicilar Tablosu
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        name TEXT,
        role TEXT DEFAULT 'ogrenci',
        education TEXT DEFAULT 'Universite',
        department TEXT DEFAULT '',
        domain TEXT DEFAULT 'frontend',
        xp INTEGER DEFAULT 100,
        selectedLanguage TEXT DEFAULT 'html',
        completedLessons TEXT DEFAULT '[]',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 2. Projeler Tablosu
    db.run(`CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT,
        desc TEXT,
        domain TEXT,
        leadName TEXT,
        leadRole TEXT,
        members TEXT DEFAULT '[]',
        openRoles TEXT DEFAULT '[]',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 3. Gorevler & Sprint Tablosu
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        title TEXT,
        desc TEXT,
        status TEXT DEFAULT 'todo',
        assigneeName TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 4. Sohbet & Mesajlar Tablosu
    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT,
        receiver TEXT,
        text TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 5. Danisman / Mentor Tavsiyeleri Tablosu (AI Mentor Klonu icin)
    db.run(`CREATE TABLE IF NOT EXISTS mentor_advices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mentorName TEXT,
        topic TEXT,
        advice TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 6. Mock Demo Kullanıcılarını Otomatik Ekle (Öğrenci ve Danışman)
    const mockUsers = [
        {
            email: 'ogrenci@codplus.com',
            password: 'ogrenci123',
            name: 'Deniz Kaya',
            role: 'ogrenci',
            education: 'Üniversite',
            department: 'Bilgisayar Mühendisliği',
            domain: 'frontend',
            xp: 850,
            selectedLanguage: 'html',
            completedLessons: JSON.stringify(['html-1', 'html-2', 'html-3'])
        },
        {
            email: 'danisman@codplus.com',
            password: 'danisman123',
            name: 'Dr. Selin Demir',
            role: 'danisman',
            education: 'Doktora / Akademisyen & Lead Mentor',
            department: 'Yazılım Mimarisi & Mühendisliği',
            domain: 'fullstack',
            xp: 2500,
            selectedLanguage: 'javascript',
            completedLessons: JSON.stringify([])
        }
    ];

    mockUsers.forEach(u => {
        db.run(
            `INSERT OR IGNORE INTO users (email, password, name, role, education, department, domain, xp, selectedLanguage, completedLessons)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [u.email, u.password, u.name, u.role, u.education, u.department, u.domain, u.xp, u.selectedLanguage, u.completedLessons]
        );
    });
});

// ============================================================
// 2. YAPAY ZEKA MOTORU KURULUMU (Google Gemini / Coddy AI)
// ============================================================
const apiKey = process.env.GEMINI_API_KEY;
const genAI = (apiKey && apiKey !== 'AIzaSy_BURAYA_GEMINI_API_KEY_GELECEK') ? new GoogleGenerativeAI(apiKey) : null;

if (!genAI) {
    console.warn("⚠️ UYARI: GEMINI_API_KEY tanimli degil! Coddy AI su anda gelismis simulasyon modunda calisacak.");
    console.warn("👉 Gercek Google Gemini yanitlari icin backend/.env dosyasina API key ekleyin.");
}

const CODDY_SYSTEM_PROMPT = `
Sen "Coddy", COD+ 2026 Yeni Nesil Egitim ve Proje Yonetim Platformunun akilli, sevimli, teknik mentorusun.
Temel Gorev ve Kurallarin:
1. Gelistiricilere HTML, CSS, JavaScript, SQL, Python, C# ve C++ konularinda rehberlik etmek.
2. Temiz Kod (Clean Code), SOLID prensipleri, atomik fonksiyonlar, SQL Transaction yonetimi ve hata yakalama standartlarini asilamak.
3. Asla Turkce disindaki dillere kayma. Yanitlarin motive edici, nazik, somut ve gelistirici dostu olsun.
4. Kapsam Disi Konular: Fal, kahve fali, burc, astroloji, ask, magazin gibi konular calisma prensiplerinin ve platform kapsaminin kesinlikle disindadir. Bu tarz sorularda nazikce teknik bir yazilim mentoru oldugunu hatirlatarak konuyu yazilima yonlendir.
5. Danisman Klonu: Danismanlarin ekibe verdigi mimari tavsiyeleri baglam olarak aldiginda, bir senior tech lead gibi konus ve danismanin belirledigi standartlari vurgula.
6. Kod aciklamalarinda satirlarin mantigini kisa ve net acikla.
`;

// ============================================================
// 3. API ENDPOINT'LERI (ROUTES)
// ============================================================

// Saglik Kontrolu (Health Check)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        platform: 'COD+ 2026 AI Backend',
        aiEngine: genAI ? 'Gemini 1.5 Flash (Active)' : 'Simulation Fallback Mode',
        database: 'SQLite Connected',
        timestamp: new Date().toISOString()
    });
});

// A) Coddy AI Sohbet & Mentorluk Motoru
app.post('/api/ai/chat', async (req, res) => {
    try {
        const { prompt, role, user, language, mentor_advices, context } = req.body;

        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ error: "Lutfen gecerli bir 'prompt' gonderin." });
        }

        // Gemini API Bagli Degilse Akilli Fallback
        if (!genAI) {
            const fallbackReply = generateFallbackAiReply(prompt, role, user, language, mentor_advices);
            return res.json({ reply: fallbackReply, mode: 'simulation' });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: CODDY_SYSTEM_PROMPT
        });

        // Baglam (Context) Olusturma
        let fullPrompt = `[KULLANICI BILGISI]\nAd: ${user || 'Gelistirici'}\nRol: ${role === 'danisman' ? 'Danisman / Mentor' : 'Ogrenci / Gelistirici'}\nAktif Calisilan Dil: ${language || 'HTML'}\n`;
        
        if (mentor_advices && Array.isArray(mentor_advices) && mentor_advices.length > 0) {
            fullPrompt += `\n[DANISMAN MIMARI DIREKTIFLERI]:\n${JSON.stringify(mentor_advices, null, 2)}\n`;
        }

        if (context && context.currentCode) {
            fullPrompt += `\n[KULLANICININ ANLIK EDITORDEN GONDERDIGI KOD]:\n${context.currentCode}\n`;
        }

        fullPrompt += `\n[KULLANICININ SORUSU]:\n${prompt}`;

        const result = await model.generateContent(fullPrompt);
        const replyText = result.response.text();

        return res.json({ reply: replyText, mode: 'gemini' });

    } catch (err) {
        console.error("❌ AI Chat Hatasi:", err.message);
        return res.status(500).json({ error: "Yapay zeka yanit uretemedi: " + err.message });
    }
});

// B) Satir Satir Kod Aciklama (IDE Code Inspector)
app.post('/api/ai/explain-code', async (req, res) => {
    try {
        const { code, language } = req.body;
        if (!code) {
            return res.status(400).json({ error: "Aciklanacak kod bulunamadi." });
        }

        if (!genAI) {
            // Basit yerel cozumleme
            const lines = code.split('\n').filter(l => l.trim().length > 0).slice(0, 10);
            return res.json({
                lines: lines.map((l, idx) => ({
                    line: idx + 1,
                    code: l.trim(),
                    explanation: `${language || 'Web'} dilinde temel calisma blogu.`
                })),
                verdict: "Backend Gemini API key eklendiginde yapay zeka her satiri derinlemesine analiz edecektir."
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Asagidaki ${language || 'Web'} kodunu satir satir incele. 
Sadece ve sadece JSON formatinda su semada yanit dondur:
{
  "lines": [
    { "line": 1, "code": "satir kodu", "explanation": "ne ise yaradigi" }
  ],
  "verdict": "Mentorden genel kod degerlendirmesi ve tavsiyesi"
}

Kod:
${code}`;

        const result = await model.generateContent(prompt);
        let rawText = result.response.text().trim();
        if (rawText.startsWith("```json")) rawText = rawText.replace(/```json|```/g, "").trim();
        if (rawText.startsWith("```")) rawText = rawText.replace(/```/g, "").trim();

        const parsed = JSON.parse(rawText);
        return res.json(parsed);

    } catch (err) {
        console.error("❌ Explain Code Hatasi:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// C) Kullanici Giris & Kayit (Auth)
app.get('/api/users/mock', (req, res) => {
    res.json({
        ogrenci: {
            email: 'ogrenci@codplus.com',
            password: 'ogrenci123',
            name: 'Deniz Kaya',
            role: 'ogrenci',
            education: 'Üniversite (Bilgisayar Mühendisliği)',
            desc: 'Ders haritası, seviye ilerlemesi, kodlama görevleri ve akran düellosu yapabilen öğrenci profili'
        },
        danisman: {
            email: 'danisman@codplus.com',
            password: 'danisman123',
            name: 'Dr. Selin Demir',
            role: 'danisman',
            education: 'Doktora & Lead Mentor',
            desc: 'Proje, sprint ve görev yönetimi yapabilen, dilediğinde tek tıkla Öğrenci Ekranına geçiş yapabilen Danışman profili'
        }
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password, name, role } = req.body;
    if (!email) return res.status(400).json({ error: "Email zorunludur." });

    const cleanEmail = email.toLowerCase().trim();

    db.get(`SELECT * FROM users WHERE LOWER(email) = ?`, [cleanEmail], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) {
            // Otomatik kayit olustur
            const userName = name || cleanEmail.split('@')[0];
            const userRole = role || 'ogrenci';
            db.run(
                `INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)`,
                [cleanEmail, password || '', userName, userRole],
                function(insertErr) {
                    if (insertErr) return res.status(500).json({ error: insertErr.message });
                    return res.json({
                        id: this.lastID,
                        email: cleanEmail,
                        name: userName,
                        role: userRole,
                        xp: 100,
                        completedLessons: []
                    });
                }
            );
        } else {
            // Sifre kontrolu
            if (user.password && password && user.password !== password) {
                return res.status(401).json({ error: "Hatalı şifre! Lütfen şifrenizi kontrol ediniz." });
            }
            return res.json({
                ...user,
                completedLessons: JSON.parse(user.completedLessons || '[]')
            });
        }
    });
});

// D) Projeleri Listele & Ekle
app.get('/api/projects', (req, res) => {
    db.all(`SELECT * FROM projects ORDER BY createdAt DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const parsed = rows.map(r => ({
            ...r,
            members: JSON.parse(r.members || '[]'),
            openRoles: JSON.parse(r.openRoles || '[]')
        }));
        res.json(parsed);
    });
});

app.post('/api/projects', (req, res) => {
    const { id, title, desc, domain, leadName, leadRole, members, openRoles } = req.body;
    db.run(
        `INSERT INTO projects (id, title, desc, domain, leadName, leadRole, members, openRoles) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, title, desc, domain, leadName, leadRole, JSON.stringify(members || []), JSON.stringify(openRoles || [])],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id });
        }
    );
});

// E) Mesajlar (Sohbet)
app.get('/api/messages/:receiver', (req, res) => {
    const receiver = req.params.receiver;
    const sender = req.query.sender;
    db.all(
        `SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY timestamp ASC`,
        [sender, receiver, receiver, sender],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

app.post('/api/messages', (req, res) => {
    const { sender, receiver, text } = req.body;
    db.run(`INSERT INTO messages (sender, receiver, text) VALUES (?, ?, ?)`, [sender, receiver, text], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, messageId: this.lastID });
    });
});

// ============================================================
// 4. FALLBACK SIMULASYON YANIT MOTORU
// ============================================================
function generateFallbackAiReply(prompt, role, user, language, mentor_advices) {
    const q = prompt.toLowerCase();
    const isMentor = (role === 'danisman');

    if (q.includes("fal") || q.includes("burc") || q.includes("ask") || q.includes("sevgili")) {
        return "⛔ <strong>Kapsam Disi:</strong> Ben COD+ Teknik Mentoruyum. Kahve fali veya burc yorumlari kapsamadadir; yazilim dilleri ve mimari konularda danisabilirsiniz.";
    }
    if (q.includes("klon") || q.includes("danisman") || q.includes("tavsiye")) {
        return `🧠 <strong>Mentor Standartlari:</strong> Danismaninizin belirttigi gibi atomik fonksiyonlar, tip guvenligi ve temiz kod kurallarina sadik kaliniz.`;
    }
    if (q.includes("proje")) {
        return `💡 <strong>Oneri:</strong> '${language || 'JavaScript'}' ile Gercek Zamanli Gorev Panosu (Kanban) projesi olusturabilir, 'Projeler' sekmesinden arkadaslarinizi davet edebilirsiniz.`;
    }
    return `🤖 <strong>COD+ AI:</strong> Merhaba ${user || 'Gelistirici'}! Sorunuz alindi. Backend Gemini API baglantisi aktif edildiginde tam kapsamli uretici yanitlar gorunecektir.`;
}

// Sunucuyu Baslat
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 COD+ 2026 API Sunucusu http://localhost:${PORT} adresinde aktif!`);
    console.log(`📡 Saglik Kontrolu: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
});
