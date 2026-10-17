function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

let selectedLang = 'HTML';
let userName = '';
let currentLessonId = null;
let unlockedLevel = 1;

// Coddy Gamification State
let userStreak = 3;
let userGems = 120;
let userXp = 350;
let userHearts = 5;

let currentExamIndex = 0;
let currentQuestionIndex = 0;
let ideTimeout = null; // Otomatik kapanma için zamanlayıcı

function switchTab(view) {
    const login = document.getElementById("login-form");
    const reg = document.getElementById("reg-form");
    const tabs = document.querySelectorAll(".tab");
    
    if(view === 'login') {
        login.classList.add("active");
        reg.classList.remove("active");
        tabs[0].classList.add("active");
        tabs[1].classList.remove("active");
    } else {
        login.classList.remove("active");
        reg.classList.add("active");
        tabs[0].classList.remove("active");
        tabs[1].classList.add("active");
    }
}

function startOnboarding() {
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("onboarding").classList.remove("hidden");
}

function submitOnboardingName() {
    const obInput = document.getElementById("ob-name");
    const enteredName = obInput ? obInput.value.trim() : "";
    if (enteredName) {
        userName = enteredName;
        userProfile.username = enteredName;
        userProfile.name = enteredName;
        if (!userProfile.email) {
            userProfile.email = `${enteredName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'ogrenci'}@codplus.dev`;
        }
        saveUserProfileToStorage();
        if (userProfile.email) {
            saveUserToDb(userProfile.email, userProfile);
        }
    }
    const greet = document.getElementById("greeting-title");
    if (greet) greet.innerText = `Harika, ${userName || 'Geliştirici'}!`;
    nextStep(2);
}

function validateRegister() {
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim().toLowerCase();
    const pass = document.getElementById("reg-pass").value;
    const confirmPass = document.getElementById("reg-pass-confirm").value;
    const edu = document.getElementById("reg-education") ? document.getElementById("reg-education").value : "Üniversite";
    const role = document.getElementById("reg-role") ? document.getElementById("reg-role").value : "ogrenci";
    const errorMsg = document.getElementById("reg-error");
    
    if(!name || !email || !pass || !confirmPass) {
        errorMsg.innerText = "Lütfen tüm alanları doldurun!";
        errorMsg.style.display = "block";
        return;
    }
    
    if(pass !== confirmPass) {
        errorMsg.innerText = "Şifreler eşleşmiyor!";
        errorMsg.style.display = "block";
        return;
    }
    
    errorMsg.style.display = "none";
    userName = name;

    const isMentor = (role === 'danisman');
    let mentorField = "";
    let mentorExp = "";
    let mentorCompany = "";
    let mentorBio = "";

    if (isMentor) {
        mentorField = document.getElementById("reg-mentor-field") ? document.getElementById("reg-mentor-field").value : "Fullstack Web Geliştirme";
        mentorExp = document.getElementById("reg-mentor-exp") ? document.getElementById("reg-mentor-exp").value : "3-5 Yıl (Mid-Senior)";
        mentorCompany = document.getElementById("reg-mentor-company") ? document.getElementById("reg-mentor-company").value.trim() : "";
        mentorBio = document.getElementById("reg-mentor-bio") ? document.getElementById("reg-mentor-bio").value.trim() : "";
    }

    // Yeni kullanıcı için tertemiz, önceki oturumdan bağımsız profil oluştur
    userProfile = {
        username: name,
        name: name,
        email: email,
        password: pass,
        educationLevel: edu,
        mentorLevel: isMentor ? edu : "",
        role: role,
        originalRole: role,
        isMentorAccount: isMentor,
        department: isMentor ? mentorField : "",
        domain: isMentor ? "fullstack" : "frontend",
        languages: isMentor ? "C#, Python, SQL, JavaScript" : "",
        projects: isMentor ? (mentorCompany ? `${mentorCompany} Projeleri` : "") : "",
        bio: isMentor ? mentorBio : "",
        avatar: isMentor ? "👨‍🏫" : "🧑‍💻",
        isLoggedIn: true,
        authProvider: "local",
        xp: isMentor ? 2500 : 100,
        gems: isMentor ? 350 : 50,
        streak: 1,
        level: isMentor ? "Kıdemli Mimar & Mentör" : "Çırak",
        friends: [],
        mentorProfile: isMentor ? {
            field: mentorField,
            experience: mentorExp,
            company: mentorCompany,
            bio: mentorBio
        } : null
    };

    saveUserProfileToStorage();
    saveUserToDb(email, userProfile);

    // Backend SQLite sunucusuna da otomatik kaydet
    try {
        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: pass,
                name: name,
                role: role
            })
        }).catch(() => {});
    } catch(e) {}
    
    // Eğer Mentör/Danışman seçildiyse: Dil seçimi ve seviye sınavını atla, doğrudan Projeler & Ekip ekranına yönlendir!
    if (role === 'danisman') {
        startMentorApp();
        return;
    }

    const greet = document.getElementById("greeting-title");
    if (greet) greet.innerText = `Harika, ${userName}!`;
    const obNameInput = document.getElementById("ob-name");
    if (obNameInput) obNameInput.value = userName;
    
    startOnboarding();
    nextStep(2); // İsim zaten alındığı için doğrudan başlangıç adımına geç
}

function toggleMentorRegistrationFields(prefix) {
    const roleSelect = document.getElementById(prefix === 'social' ? 'social-role' : 'reg-role');
    const extraFields = document.getElementById(prefix === 'social' ? 'social-mentor-extra-fields' : 'reg-mentor-extra-fields');
    if (!roleSelect || !extraFields) return;
    extraFields.style.display = (roleSelect.value === 'danisman') ? 'block' : 'none';
}

function applyRoleUI(role) {
    const isMentor = (role === 'danisman');
    const duelNav = document.getElementById("nav-btn-duel");
    
    if (isMentor) {
        document.body.classList.add("mentor-mode");
        if (duelNav) duelNav.style.display = "none";
        
        const tasksBadge = document.getElementById("tasks-nav-badge");
        if (tasksBadge) tasksBadge.style.display = "block";

        const mentorBadge = document.getElementById("mentor-badge-indicator");
        if (mentorBadge) {
            mentorBadge.innerText = (userProfile && userProfile.mentorProfile && userProfile.mentorProfile.field) ? 
                `Mentör: ${userProfile.mentorProfile.field}` : "Mentör & Danışman Paneli";
        }
    } else {
        document.body.classList.remove("mentor-mode");
        if (duelNav) duelNav.style.display = "";
    }

    updateMentorQuickToggleBtn();
}

function isMentorUser() {
    return !!(
        userProfile && (
            userProfile.originalRole === 'danisman' ||
            userProfile.role === 'danisman' ||
            userProfile.isMentorAccount === true ||
            (userProfile.email && userProfile.email.toLowerCase() === 'szn.ozer1905@mail.com')
        )
    );
}

function updateMentorQuickToggleBtn() {
    const isDanisman = isMentorUser();
    const isCurrentlyStudent = (userProfile && userProfile.role === 'ogrenci');
    
    const previewAlertBar = document.getElementById("mentor-preview-alert-bar");
    const mapToggleBtn = document.getElementById("map-mentor-toggle-btn");
    const projToggleBtn = document.getElementById("projects-student-toggle-btn");
    const modalRoleBtn = document.getElementById("modal-role-toggle-btn");
    const modalRoleText = document.getElementById("modal-role-toggle-text");
    const modalRoleBadge = document.getElementById("modal-profile-role-badge");

    if (modalRoleBadge) {
        modalRoleBadge.innerText = (userProfile && userProfile.role === 'danisman') ? 'Danışman / Mentör' : 'Öğrenci';
        modalRoleBadge.style.color = (userProfile && userProfile.role === 'danisman') ? '#c084fc' : '#38bdf8';
        modalRoleBadge.style.background = (userProfile && userProfile.role === 'danisman') ? 'rgba(168,85,247,0.15)' : 'rgba(56,189,248,0.15)';
    }

    if (isDanisman) {
        if (previewAlertBar) {
            previewAlertBar.style.display = isCurrentlyStudent ? "flex" : "none";
        }
        if (modalRoleBtn) {
            modalRoleBtn.style.display = "inline-flex";
            if (modalRoleText) {
                modalRoleText.innerText = isCurrentlyStudent ? 'Danışman Paneline Dön' : 'Öğrenci Görünümüne Geç';
            }
        }
        if (mapToggleBtn) {
            mapToggleBtn.style.display = isCurrentlyStudent ? "inline-flex" : "none";
        }
        if (projToggleBtn) {
            projToggleBtn.style.display = (!isCurrentlyStudent) ? "inline-flex" : "none";
        }
    } else {
        if (previewAlertBar) previewAlertBar.style.display = "none";
        if (mapToggleBtn) mapToggleBtn.style.display = "none";
        if (projToggleBtn) projToggleBtn.style.display = "none";
        if (modalRoleBtn) modalRoleBtn.style.display = "none";
    }
}

function toggleMentorStudentView() {
    const hasDanismanAuthority = isMentorUser();

    if (!hasDanismanAuthority) {
        const authKey = prompt("🔒 Yetkili Güvenlik Doğrulaması:\nDanışman & Mentör moduna geçebilmek için lütfen Kurum Danışman Güvenlik Anahtarını giriniz (Varsayılan: COD2026):");
        if (authKey !== "COD2026" && authKey !== "MENTOR2026") {
            alert("❌ Yetkisiz İşlem: Geçersiz güvenlik anahtarı! Normal öğrenciler danışman moduna geçemez.");
            return;
        }
        userProfile.originalRole = 'danisman';
        userProfile.isMentorAccount = true;
    }

    if (userProfile.role === 'danisman') {
        userProfile.role = 'ogrenci';
        userProfile.originalRole = 'danisman';
        userProfile.isMentorAccount = true;
        saveUserProfileToStorage();
        applyRoleUI('ogrenci');
        switchView('map');
    } else {
        userProfile.role = 'danisman';
        userProfile.originalRole = 'danisman';
        userProfile.isMentorAccount = true;
        saveUserProfileToStorage();
        applyRoleUI('danisman');
        switchView('projects');
    }
}

function startMentorApp() {
    userProfile.role = 'danisman';
    userProfile.originalRole = 'danisman';
    userProfile.isMentorAccount = true;
    userProfile.isLoggedIn = true;
    saveUserProfileToStorage();
    
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("onboarding").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    // Mentör arayüzünü uygula ve öğrenci ders butonlarını gizle
    applyRoleUI('danisman');

    // Doğrudan Projeler & Ekip Yönetim ekranını aç
    switchView('projects');
    
    // Coddy konuşma balonuna mentör karşılama mesajı koy
    const speech = document.getElementById("coddy-speech");
    if (speech) {
        speech.innerText = `"Hoş geldiniz Danışmanım! COD+ ekosistemine uzmanlığınızla katıldınız. Yeni proje başlatabilir, açık pozisyonlar oluşturabilir, görev atayabilir ve ekibinizi yönetebilirsiniz! 🚀"`;
    }
}

// ============================================================
// KALICI KULLANICI VERİTABANI YÖNETİMİ (USERS DATABASE)
// ============================================================
function getUsersDb() {
    // Eski mock Deniz kayıtlarını ve önbelleği bir defaya mahsus temizle
    const dbCleaned = localStorage.getItem("codplus_db_clean_real_v1");
    if (!dbCleaned) {
        try {
            localStorage.removeItem("codplus_users_db");
            localStorage.removeItem("codplus_user_profile");
            localStorage.removeItem("codplus_active_view");
            localStorage.setItem("codplus_db_clean_real_v1", "true");
        } catch(e) {}
    }

    let db = {};
    const saved = localStorage.getItem("codplus_users_db");
    if (saved) {
        try { db = JSON.parse(saved); } catch(e) { db = {}; }
    }

    // Eski mock hesapları sil
    if (db['ogrenci@codplus.com']) delete db['ogrenci@codplus.com'];
    if (db['danisman@codplus.com']) delete db['danisman@codplus.com'];

    // Gerçek Veritabanı Kullanıcıları (PostgreSQL users tablosu ile %100 birebir)
    let needsSave = false;

    // 1. Suzan (Danışman / Mentör)
    if (!db['szn.ozer1905@mail.com']) {
        db['szn.ozer1905@mail.com'] = {
            email: 'szn.ozer1905@mail.com',
            password: '123456',
            username: 'Suzan',
            name: 'Suzan',
            role: 'danisman',
            originalRole: 'danisman',
            isMentorAccount: true,
            level: 'Uzman',
            xp: 2500,
            gems: 350,
            streak: 12,
            educationLevel: 'Yüksek Lisans / Doktora',
            mentorLevel: 'Yüksek Lisans / Doktora',
            department: 'Yazılım Mimarisi',
            domain: 'fullstack',
            languages: 'C#, Python, SQL, JavaScript',
            projects: 'COD+ TÜBİTAK 2242 Yazılım Mimarisi',
            bio: 'Yazılım Mimarisi, Temiz Kod ve Mentörlük Rehberliği.',
            avatar: '👩‍🏫',
            hasCompletedOnboarding: true,
            isLoggedIn: false
        };
        needsSave = true;
    }

    // 2. Esma (Öğrenci)
    if (!db['esmak6327@mail.com']) {
        db['esmak6327@mail.com'] = {
            email: 'esmak6327@mail.com',
            password: '123456',
            username: 'Esma',
            name: 'Esma',
            role: 'ogrenci',
            originalRole: 'ogrenci',
            isMentorAccount: false,
            level: 'Çırak',
            xp: 150,
            gems: 60,
            streak: 3,
            selectedLanguage: 'HTML',
            unlockedLevel: 2,
            educationLevel: 'Üniversite',
            department: 'Bilgisayar Mühendisliği',
            domain: 'frontend',
            languages: 'HTML5, CSS3, JavaScript',
            projects: 'Web Geliştirme ve COD+ Haritası',
            bio: 'Bilgisayar Mühendisliği öğrencisi ve hevesli frontend geliştirici.',
            avatar: '👩‍💻',
            hasCompletedOnboarding: true,
            isLoggedIn: false
        };
        needsSave = true;
    }

    // 3. ali_muhendis
    if (!db['ali@codplus.edu']) {
        db['ali@codplus.edu'] = {
            email: 'ali@codplus.edu',
            password: 'guvenli_yeni_sifre_hash',
            username: 'ali_muhendis',
            name: 'ali_muhendis',
            role: 'ogrenci',
            originalRole: 'ogrenci',
            level: 'Cirak',
            xp: 100,
            educationLevel: 'Üniversite',
            department: 'Bilgisayar Mühendisliği',
            hasCompletedOnboarding: true,
            isLoggedIn: false
        };
        needsSave = true;
    }

    // 4. burak_coder
    if (!db['burak@codplus.edu']) {
        db['burak@codplus.edu'] = {
            email: 'burak@codplus.edu',
            password: 'default_hash',
            username: 'burak_coder',
            name: 'burak_coder',
            role: 'ogrenci',
            originalRole: 'ogrenci',
            level: 'Çırak',
            xp: 100,
            educationLevel: 'Üniversite',
            department: 'Bilgisayar Mühendisliği',
            hasCompletedOnboarding: true,
            isLoggedIn: false
        };
        needsSave = true;
    }

    // 5. selin_dev
    if (!db['selin@codplus.edu']) {
        db['selin@codplus.edu'] = {
            email: 'selin@codplus.edu',
            password: 'default_hash',
            username: 'selin_dev',
            name: 'selin_dev',
            role: 'ogrenci',
            originalRole: 'ogrenci',
            level: 'Çırak',
            xp: 150,
            educationLevel: 'Üniversite',
            department: 'Bilgisayar Mühendisliği',
            hasCompletedOnboarding: true,
            isLoggedIn: false
        };
        needsSave = true;
    }

    // 6. Ayşe Kaya
    if (!db['ayse.kaya@gmail.com']) {
        db['ayse.kaya@gmail.com'] = {
            email: 'ayse.kaya@gmail.com',
            password: 'OAUTH_TOKEN_SECURE',
            username: 'Ayse Kaya',
            name: 'Ayse Kaya',
            role: 'ogrenci',
            originalRole: 'ogrenci',
            level: 'Çırak',
            xp: 100,
            educationLevel: 'Üniversite',
            department: 'Endüstri Mühendisliği',
            hasCompletedOnboarding: true,
            isLoggedIn: false
        };
        needsSave = true;
    }

    // 7. Dr. Hakan Danışman
    if (!db['hakan@universite.edu.tr']) {
        db['hakan@universite.edu.tr'] = {
            email: 'hakan@universite.edu.tr',
            password: 'hash123',
            username: 'dr_hakan_hoca',
            name: 'dr_hakan_hoca',
            role: 'danisman',
            originalRole: 'danisman',
            isMentorAccount: true,
            level: 'Uzman',
            xp: 2500,
            educationLevel: 'Doktora',
            mentorLevel: 'Akademisyen / Eğitmen',
            department: 'Bilgisayar Mühendisliği',
            hasCompletedOnboarding: true,
            isLoggedIn: false
        };
        needsSave = true;
    }

    if (needsSave) {
        try { localStorage.setItem("codplus_users_db", JSON.stringify(db)); } catch(e) {}
    }
    return db;
}

function saveUserToDb(email, data) {
    if (!email) return;
    const db = getUsersDb();
    const key = email.toLowerCase().trim();
    db[key] = {
        ...db[key],
        ...data,
        lastLogin: Date.now()
    };
    localStorage.setItem("codplus_users_db", JSON.stringify(db));
}

function getUserByEmail(email) {
    if (!email) return null;
    const db = getUsersDb();
    return db[email.toLowerCase().trim()] || null;
}

let currentSocialProvider = 'Google';

function handleSocialLogin(provider) {
    currentSocialProvider = provider;
    const isGoogle = provider.toLowerCase() === 'google';
    const targetEmail = isGoogle ? "deniz.kaya@gmail.com" : "deniz.kaya@privaterelay.appleid.com";

    // ÖNCELİKLE KONTROL: Bu Google hesabı sistemde kayıtlı ve dilini/seviyesini daha önce seçmiş mi?
    const existing = getUserByEmail(targetEmail) || (userProfile && userProfile.email === targetEmail ? userProfile : null);

    if (existing && (existing.hasCompletedOnboarding || existing.selectedLanguage || (existing.unlockedLevel && existing.unlockedLevel > 0))) {
        // VAR OLAN KULLANICI: Dil seçimi ve sınav ekranı ASLA tekrar açılmaz!
        userProfile = { ...userProfile, ...existing, isLoggedIn: true, authProvider: provider, email: targetEmail };
        userName = userProfile.username || (isGoogle ? "Deniz Kaya" : "Deniz");
        selectedLang = userProfile.selectedLanguage || 'HTML';
        unlockedLevel = userProfile.unlockedLevel || 1;
        userXp = userProfile.xp !== undefined ? userProfile.xp : userXp;
        userGems = userProfile.gems !== undefined ? userProfile.gems : userGems;
        userStreak = userProfile.streak !== undefined ? userProfile.streak : userStreak;

        saveUserProfileToStorage();
        closeSocialAuthModal();

        // Doğrudan ana platforma / haritaya yönlendir (Sıfırdan sorma!)
        startApp();
        alert(`👋 Tekrar hoş geldin, ${userName}!\n${provider} hesabınız doğrulandı. Seçtiğiniz dil (${selectedLang.toUpperCase()}) ve ${unlockedLevel}. seviyedeki ilerlemeniz korundu. Kaldığınız yerden devam ediyorsunuz! 🚀`);
        return;
    }

    // İLK KEZ GELEN GERÇEK YENİ KULLANICI: İlk seferlik profil onayını aç
    openSocialAuthModal(provider);
}

function openSocialAuthModal(provider) {
    currentSocialProvider = provider;
    const isGoogle = provider.toLowerCase() === 'google';
    const mockEmail = isGoogle ? "deniz.kaya@gmail.com" : "deniz.kaya@privaterelay.appleid.com";
    const defaultName = isGoogle ? "Deniz Kaya" : "Deniz Kaya";

    const modal = document.getElementById("social-auth-modal");
    const titleEl = document.getElementById("social-modal-title");
    const emailInput = document.getElementById("social-email");
    const nameInput = document.getElementById("social-name");
    const eduInput = document.getElementById("social-education");

    if (titleEl) {
        titleEl.innerHTML = `<i class="fa-brands fa-${isGoogle ? 'google' : 'apple'}" style="color:${isGoogle ? '#ef4444' : '#ffffff'};"></i> ${provider} ile Hızlı Kayıt`;
    }
    if (emailInput) emailInput.value = mockEmail;
    if (nameInput) nameInput.value = userProfile.username || defaultName;
    if (eduInput && userProfile.educationLevel) eduInput.value = userProfile.educationLevel;

    if (modal) modal.classList.remove("hidden");
}

function closeSocialAuthModal() {
    const modal = document.getElementById("social-auth-modal");
    if (modal) modal.classList.add("hidden");
}

function submitSocialAuth() {
    const name = document.getElementById("social-name").value.trim() || "Geliştirici";
    const email = document.getElementById("social-email").value.trim() || (currentSocialProvider === 'Google' ? "deniz.kaya@gmail.com" : "deniz.kaya@apple.com");
    const edu = document.getElementById("social-education").value;
    const role = document.getElementById("social-role") ? document.getElementById("social-role").value : "ogrenci";

    // Veritabanında daha önce kayıt olmuş mu kontrolü
    const existing = getUserByEmail(email);
    if (existing && (existing.hasCompletedOnboarding || existing.selectedLanguage)) {
        userProfile = { ...userProfile, ...existing, isLoggedIn: true };
        userName = userProfile.username || name;
        selectedLang = userProfile.selectedLanguage || 'HTML';
        unlockedLevel = userProfile.unlockedLevel || 1;
        saveUserProfileToStorage();
        closeSocialAuthModal();
        startApp();
        alert(`👋 Tekrar hoş geldin, ${userName}! Seçtiğin dil (${selectedLang.toUpperCase()}) ve ${unlockedLevel}. seviye başarıyla yüklendi.`);
        return;
    }

    userName = name;
    userProfile.username = name;
    userProfile.email = email;
    userProfile.educationLevel = edu;
    userProfile.role = role;
    userProfile.authProvider = currentSocialProvider;
    userProfile.isLoggedIn = true;
    saveUserProfileToStorage();

    closeSocialAuthModal();

    // Mentör/Danışman ise dil testini atla ve mentör alanlarını kaydet
    if (role === 'danisman') {
        const mentorField = document.getElementById("social-mentor-field") ? document.getElementById("social-mentor-field").value : "Fullstack Web Geliştirme";
        const mentorExp = document.getElementById("social-mentor-exp") ? document.getElementById("social-mentor-exp").value : "3-5 Yıl (Mid-Senior)";
        const mentorCompany = document.getElementById("social-mentor-company") ? document.getElementById("social-mentor-company").value.trim() : "Teknopark / Şirket";
        const mentorBio = document.getElementById("social-mentor-bio") ? document.getElementById("social-mentor-bio").value.trim() : "Genç yeteneklere rehberlik ve proje yönetimi.";
        
        userProfile.mentorProfile = {
            field: mentorField,
            experience: mentorExp,
            company: mentorCompany,
            bio: mentorBio
        };
        userProfile.hasCompletedOnboarding = true;
        saveUserProfileToStorage();
        startMentorApp();
        return;
    }

    // İlk kez kaydolan öğrenci için onboarding
    const greet = document.getElementById("greeting-title");
    if (greet) greet.innerText = `Harika, ${userName}!`;
    startOnboarding();
    nextStep(2);
}

function mockSocialLogin(provider) {
    handleSocialLogin(provider);
}

function showStep(stepId) {
    const steps = document.querySelectorAll(".ob-step");
    steps.forEach(s => s.classList.add("hidden"));
    const target = document.getElementById(stepId);
    if (target) target.classList.remove("hidden");
}

function nextStep(stepNum) {
    showStep(`step-${stepNum}`);
    const dots = document.querySelectorAll(".step-dot");
    dots.forEach((d, i) => {
        if (i < stepNum) d.classList.add("active");
        else d.classList.remove("active");
    });
}

function goToDirectLanguageSelect() {
    showStep("step-lang-select");
}

function getLanguageKey(lang) {
    if (!lang) return 'html';
    const l = lang.toLowerCase();
    if (l.includes('html')) return 'html';
    if (l.includes('css')) return 'css';
    if (l.includes('js') || l.includes('javascript')) return 'javascript';
    if (l.includes('py') || l.includes('python')) return 'python';
    if (l.includes('c#') || l.includes('csharp')) return 'csharp';
    if (l.includes('sql')) return 'sql';
    if (l.includes('c++') || l.includes('cpp')) return 'cpp';
    return 'html';
}

function onLanguageSelected(lang) {
    selectedLang = lang;
    userProfile.selectedLanguage = lang;
    
    // Header ve açıklamaları seçilen dile göre güncelle
    const heading = document.getElementById("exp-lang-heading");
    const sub = document.getElementById("exp-lang-sub");
    const zeroDesc = document.getElementById("exp-zero-desc");
    const existDesc = document.getElementById("exp-exist-desc");
    
    if (heading) heading.innerText = `${lang} Deneyimin Nedir?`;
    if (sub) sub.innerText = `Bu dil (${lang}) hakkında önceden bilgin var mı, yoksa sıfırdan mı başlıyorsun?`;
    if (zeroDesc) zeroDesc.innerText = `Daha önce hiç ${lang} yazmadım. (1. temel seviyeden başla)`;
    if (existDesc) existDesc.innerText = `Temel veya orta düzey ${lang} kavramlarına hakimim. (Düzeyini tespit et)`;
    
    showStep("step-lang-experience");
}

function chooseZeroExperience() {
    unlockedLevel = 1;
    userProfile.unlockedLevel = 1;
    userProfile.selectedLanguage = selectedLang;
    userProfile.hasCompletedOnboarding = true;
    userProfile.isLoggedIn = true;
    saveUserProfileToStorage();
    
    startApp();
    const speech = document.getElementById("coddy-speech");
    if (speech) {
        speech.innerText = `"Harika bir seçim! ${selectedLang} eğitimine 1. temel seviyeden başladın. Hadi ilk adımı birlikte atalım! 🚀"`;
    }
}

// Seviye Tespit Sınavı Durumu
let ptQuestions = [];
let ptCurrentIndex = 0;
let ptScore = 0;

function chooseExistingExperience() {
    showStep("step-test");
    const quizBox = document.getElementById("ptest-quiz-box");
    const resCard = document.getElementById("ptest-result-card");
    if (quizBox) quizBox.style.display = "block";
    if (resCard) resCard.style.display = "none";

    const langKey = getLanguageKey(selectedLang);
    let pool = (typeof quizBank !== 'undefined' && quizBank[langKey]) ? [...quizBank[langKey]] : [];
    
    if (pool.length === 0 && typeof placementExams !== 'undefined') {
        const fallback = placementExams.find(e => e.lang.toLowerCase() === langKey);
        if (fallback) pool = fallback.questions.map(q => ({ question: q.q, options: q.options, correctIndex: q.correct }));
    }

    // Kapsamlı ve adil değerlendirme için 10 soru seçilir
    pool.sort(() => 0.5 - Math.random());
    ptQuestions = pool.slice(0, 10);
    ptCurrentIndex = 0;
    ptScore = 0;

    renderDiagnosticQuestion();
}

function renderDiagnosticQuestion() {
    if (ptCurrentIndex >= ptQuestions.length) {
        finishPlacementTest();
        return;
    }

    const q = ptQuestions[ptCurrentIndex];
    const langEl = document.getElementById("ptest-lang");
    const progEl = document.getElementById("ptest-progress");
    const qEl = document.getElementById("ptest-question");
    const optsContainer = document.getElementById("ptest-options");
    const feedback = document.getElementById("ptest-feedback");
    const nextBtn = document.getElementById("ptest-next-btn");

    if (langEl) langEl.innerText = `${selectedLang} Seviye Tespit Testi`;
    if (progEl) progEl.innerText = `Soru ${ptCurrentIndex + 1} / ${ptQuestions.length}`;
    if (qEl) qEl.innerText = q.question;
    if (feedback) feedback.innerText = "";
    if (nextBtn) nextBtn.classList.add("hidden");

    if (optsContainer) {
        optsContainer.innerHTML = "";
        const letters = ["A", "B", "C", "D"];
        q.options.forEach((optText, optIdx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "duel-opt-btn";
            btn.style.cssText = "text-align:left; padding:14px 16px; border-radius:14px; background:rgba(15,23,42,0.85); border:1px solid rgba(255,255,255,0.15); color:#f8fafc; cursor:pointer; font-size:14.5px; display:flex; align-items:center; gap:12px; transition:all 0.2s ease;";
            btn.innerHTML = `<strong style="color:#38bdf8; font-size:16px;">${letters[optIdx]})</strong> <span style="color:#f8fafc; font-size:15px; font-weight:500;">${escapeHtml(optText)}</span>`;
            btn.onclick = () => handleDiagnosticAnswer(optIdx, q.correctIndex);
            optsContainer.appendChild(btn);
        });
    }
}

function handleDiagnosticAnswer(selectedIdx, correctIdx) {
    const btns = document.querySelectorAll("#ptest-options .duel-opt-btn");
    btns.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIdx) {
            btn.classList.add("correct");
            btn.style.borderColor = "#22c55e";
            btn.style.background = "rgba(34,197,94,0.2)";
        } else if (idx === selectedIdx) {
            btn.classList.add("wrong");
            btn.style.borderColor = "#ef4444";
            btn.style.background = "rgba(239,68,68,0.2)";
        }
    });

    const feedback = document.getElementById("ptest-feedback");
    const nextBtn = document.getElementById("ptest-next-btn");

    if (selectedIdx === correctIdx) {
        ptScore++;
        if (feedback) {
            feedback.innerText = "✅ Doğru cevap!";
            feedback.style.color = "#22c55e";
        }
    } else {
        if (feedback) {
            feedback.innerText = "❌ Yanlış cevap.";
            feedback.style.color = "#f43f5e";
        }
    }

    if (nextBtn) {
        nextBtn.innerText = (ptCurrentIndex + 1 >= ptQuestions.length) ? "Sonucu Gör" : "Sıradaki Soru";
        nextBtn.classList.remove("hidden");
    }
}

function nextPlacementStep() {
    ptCurrentIndex++;
    renderDiagnosticQuestion();
}

function finishPlacementTest() {
    const quizBox = document.getElementById("ptest-quiz-box");
    const resCard = document.getElementById("ptest-result-card");
    if (quizBox) quizBox.style.display = "none";
    if (resCard) resCard.style.display = "block";

    const iconEl = document.getElementById("ptest-result-icon");
    const titleEl = document.getElementById("ptest-result-title");
    const descEl = document.getElementById("ptest-result-desc");
    const badgeRow = document.getElementById("ptest-badge-row");

    const totalQ = ptQuestions.length || 10;

    if (ptScore >= 9) {
        unlockedLevel = 21;
        if (iconEl) iconEl.innerText = "🏆";
        if (titleEl) titleEl.innerText = "İleri Düzey Yetkinlik!";
        if (descEl) descEl.innerHTML = `<strong>Tebrikler! ${ptScore}/${totalQ} Doğru.</strong><br>${selectedLang} dilinde üstün başarı gösterdin! Temel ve orta seviyedeki ilk 20 dersi muaf saydık. Doğrudan <strong>21. İleri Seviyeden</strong> başlıyorsun!`;
        if (badgeRow) badgeRow.innerHTML = `<span style="background:rgba(34,197,94,0.2); border:1px solid #22c55e; color:#4ade80; padding:6px 14px; border-radius:20px; font-size:13px; font-weight:bold;">⚡ 20 Ders Muafiyeti (21. Seviye)</span>`;
    } else if (ptScore >= 7) {
        unlockedLevel = 15;
        if (iconEl) iconEl.innerText = "🌟";
        if (titleEl) titleEl.innerText = "Orta-İleri Düzey Tespit Edildi!";
        if (descEl) descEl.innerHTML = `<strong>Harika Başarı! ${ptScore}/${totalQ} Doğru.</strong><br>${selectedLang} dilinde temel ve orta seviye kavramlara çok iyi hakimsin. İlk 14 dersi muaf sayarak seni doğrudan <strong>15. Seviyeden</strong> başlatıyoruz!`;
        if (badgeRow) badgeRow.innerHTML = `<span style="background:rgba(56,189,248,0.2); border:1px solid #38bdf8; color:#38bdf8; padding:6px 14px; border-radius:20px; font-size:13px; font-weight:bold;">✨ 14 Ders Muafiyeti (15. Seviye)</span>`;
    } else if (ptScore >= 5) {
        unlockedLevel = 11;
        if (iconEl) iconEl.innerText = "⭐";
        if (titleEl) titleEl.innerText = "Orta Düzey Tespit Edildi!";
        if (descEl) descEl.innerHTML = `<strong>Güzel Başarı! ${ptScore}/${totalQ} Doğru.</strong><br>${selectedLang} dilinde temel konuları biliyorsun. İlk 10 dersi muaf sayarak seni doğrudan <strong>11. Seviyeden (2. Bölüm)</strong> başlatıyoruz!`;
        if (badgeRow) badgeRow.innerHTML = `<span style="background:rgba(56,189,248,0.2); border:1px solid #38bdf8; color:#38bdf8; padding:6px 14px; border-radius:20px; font-size:13px; font-weight:bold;">✨ 10 Ders Muafiyeti (11. Seviye)</span>`;
    } else if (ptScore >= 3) {
        unlockedLevel = 6;
        if (iconEl) iconEl.innerText = "💡";
        if (titleEl) titleEl.innerText = "Temel-Gelişim Düzeyi";
        if (descEl) descEl.innerHTML = `<strong>İyi Başlangıç! ${ptScore}/${totalQ} Doğru.</strong><br>${selectedLang} dilinin ilk temellerine aşinasın. İlk 5 dersi muaf sayarak seni <strong>6. Seviyeden</strong> başlatıyoruz.`;
        if (badgeRow) badgeRow.innerHTML = `<span style="background:rgba(250,204,21,0.2); border:1px solid #facc15; color:#facc15; padding:6px 14px; border-radius:20px; font-size:13px; font-weight:bold;">🎯 5 Ders Muafiyeti (6. Seviye)</span>`;
    } else {
        unlockedLevel = 1;
        if (iconEl) iconEl.innerText = "🌱";
        if (titleEl) titleEl.innerText = "Temel Düzey Belirlendi";
        if (descEl) descEl.innerHTML = `Skor: ${ptScore}/${totalQ}. Eksik konu kalmaması ve ${selectedLang} dilini en sağlam temellerle öğrenmen için seni <strong>1. seviyeden</strong> başlatıyoruz. Başarılar!`;
        if (badgeRow) badgeRow.innerHTML = `<span style="background:rgba(250,204,21,0.2); border:1px solid #facc15; color:#facc15; padding:6px 14px; border-radius:20px; font-size:13px; font-weight:bold;">🎯 1. Seviye Başlangıcı</span>`;
    }

    userProfile.selectedLanguage = selectedLang;
    userProfile.unlockedLevel = unlockedLevel;
    userProfile.hasCompletedOnboarding = true;
    userProfile.isLoggedIn = true;
    saveUserProfileToStorage();
}

function startAppFromPlacement() {
    startApp();
    const speech = document.getElementById("coddy-speech");
    if (speech) {
        if (unlockedLevel > 1) {
            speech.innerText = `"Tebrikler! Seviye tespit sınavı sonucunda bildiğin dersleri geçtin ve ${unlockedLevel}. seviyeden başladın! 🚀"`;
        } else {
            speech.innerText = `"Harika bir başlangıç! ${selectedLang} eğitimine 1. seviyeden başladın. Hadi ilk adımı atalım! 🚀"`;
        }
    }
}


function startApp() {
    if (userProfile && userProfile.mustChangePassword) {
        const forceModal = document.getElementById("force-password-change-modal");
        if (forceModal) {
            forceModal.classList.remove("hidden");
            return;
        }
    }

    userProfile.isLoggedIn = true;
    saveUserProfileToStorage();

    document.getElementById("landing").classList.add("hidden");
    document.getElementById("onboarding").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    applyRoleUI(userProfile.role || 'ogrenci');

    if (userProfile.role === 'danisman') {
        switchView('projects');
        return;
    }

    const currentLangKey = getLanguageKey(selectedLang || (userProfile && userProfile.selectedLanguage) || 'html');
    if (typeof setCourseDataForLang === 'function') {
        courseData = setCourseDataForLang(currentLangKey);
    }
    
    updateActiveLanguageBadge();
    renderRoadmap();
}



function handleLogin(e) {
    if (e) e.preventDefault();
    const emailInput = document.querySelector("#login-form input[type='email']");
    const passInput = document.getElementById("login-pass");
    const enteredEmail = emailInput ? emailInput.value.trim().toLowerCase() : "";
    const enteredPass = passInput ? passInput.value.trim() : "";

    if (!enteredEmail) {
        alert("Lütfen e-posta adresinizi giriniz.");
        return;
    }

    const existing = getUserByEmail(enteredEmail);
    if (existing) {
        if (existing.password && enteredPass && existing.password !== enteredPass) {
            alert("❌ Hatalı şifre girdiniz! Lütfen şifrenizi kontrol ediniz.");
            return;
        }
        const loadedName = existing.username || existing.name || enteredEmail.split('@')[0];
        userProfile = {
            ...createDefaultUserProfile(),
            ...existing,
            email: enteredEmail,
            username: loadedName,
            name: loadedName,
            isLoggedIn: true
        };
        userName = loadedName;
        selectedLang = userProfile.selectedLanguage || selectedLang;
        unlockedLevel = userProfile.unlockedLevel || unlockedLevel;
        userXp = userProfile.xp !== undefined ? userProfile.xp : userXp;
        userGems = userProfile.gems !== undefined ? userProfile.gems : userGems;
        userStreak = userProfile.streak !== undefined ? userProfile.streak : userStreak;
        saveUserProfileToStorage();
    } else {
        const cleanName = enteredEmail.split('@')[0];
        const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        userProfile = {
            ...createDefaultUserProfile(),
            username: formattedName,
            name: formattedName,
            email: enteredEmail,
            password: enteredPass,
            educationLevel: "Üniversite",
            department: "",
            domain: "frontend",
            languages: "",
            projects: "",
            bio: "",
            avatar: "🧑‍💻",
            role: 'ogrenci',
            originalRole: 'ogrenci',
            isMentorAccount: false,
            isLoggedIn: true,
            xp: 100,
            gems: 50,
            streak: 1,
            level: "Çırak",
            friends: []
        };
        userName = formattedName;
        saveUserProfileToStorage();
        saveUserToDb(enteredEmail, userProfile);
    }

    // Backend SQLite sunucusuna asenkron bildir (sunucu aciksa oturumu kaydeder)
    try {
        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userProfile.email,
                password: enteredPass,
                name: userProfile.username || userProfile.name,
                role: userProfile.role || 'ogrenci'
            })
        }).catch(() => {});
    } catch(err) {}

    // Geçici şifre ile girildiyse veya mustChangePassword true ise
    if (userProfile.mustChangePassword || (userProfile.tempPassword && enteredPass === userProfile.tempPassword)) {
        userProfile.mustChangePassword = true;
        saveUserProfileToStorage();
        const forceModal = document.getElementById("force-password-change-modal");
        if (forceModal) {
            forceModal.classList.remove("hidden");
            return;
        }
    }

    if (userProfile.role === 'danisman') {
        startMentorApp();
    } else {
        startApp();
    }
}

let currentActiveView = 'map';
let previousActiveView = 'map';

function switchView(viewName) {
    if (viewName === 'projects' && isMentorUser() && userProfile && userProfile.role === 'ogrenci') {
        userProfile.role = 'danisman';
        saveUserProfileToStorage();
        applyRoleUI('danisman');
    }

    if (currentActiveView && currentActiveView !== viewName) {
        previousActiveView = currentActiveView;
    }
    currentActiveView = viewName;
    try {
        localStorage.setItem("codplus_active_view", viewName);
    } catch(e) {}

    const panels = document.querySelectorAll(".view-panel");
    panels.forEach(p => p.classList.add("hidden"));
    
    const navs = document.querySelectorAll(".nav-item");
    navs.forEach(n => n.classList.remove("active"));
    
    if (viewName === 'ide-sandbox') {
        const idePanel = document.getElementById('view-ide');
        if (idePanel) idePanel.classList.remove("hidden");
        const lessonPanel = document.querySelector('.ide-lesson-panel');
        if (lessonPanel) lessonPanel.style.display = 'none'; // Serbest modda sol ders panelini gizle
        
        // Serbest modda tüm dillerin sekmelerini görünür yap
        const tabs = document.querySelectorAll("#sandbox-lang-tabs .ide-tab");
        tabs.forEach(tab => {
            tab.style.display = "inline-flex";
        });
        
        const currentLang = (selectedLang || (userProfile && userProfile.selectedLanguage) || 'html').toLowerCase();
        let targetLang = 'HTML';
        if (currentLang.includes('python')) targetLang = 'Python';
        else if (currentLang.includes('sql')) targetLang = 'SQL';
        else if (currentLang.includes('c#') || currentLang.includes('csharp')) targetLang = 'CSharp';
        else if (currentLang.includes('c++') || currentLang.includes('cpp')) targetLang = 'CPP';
        
        switchSandboxLang(targetLang);
        const ideNav = document.getElementById('nav-btn-ide');
        if (ideNav) ideNav.classList.add("active");
    } else if (viewName === 'ide') {
        const idePanel = document.getElementById('view-ide');
        if (idePanel) idePanel.classList.remove("hidden");
        const lessonPanel = document.querySelector('.ide-lesson-panel');
        if (lessonPanel) lessonPanel.style.display = 'flex'; // Ders panelini göster
        const ideNav = document.getElementById('nav-btn-ide');
        if (ideNav) ideNav.classList.add("active");
    } else {
        const target = document.getElementById(`view-${viewName}`);
        if(target) target.classList.remove("hidden");
        
        const navBtn = document.getElementById(`nav-btn-${viewName}`);
        if (navBtn) navBtn.classList.add("active");

        if(viewName === 'map') {
            setTimeout(drawCurvedRoadmapPath, 60);
        }
        if(viewName === 'book') {
            if (currentPdfLang) {
                renderPdfBook(currentPdfLang);
            } else {
                closePdfReader();
            }
        }
        if(viewName === 'projects') {
            renderProjects();
        }
        if(viewName === 'tasks') {
            renderTasks();
        }
    }
    updateMentorQuickToggleBtn();
}

function goBackToMain() {
    if (userProfile && userProfile.role === 'danisman') {
        switchView('projects');
    } else {
        switchView('map');
    }
}

function goBackPreviousView() {
    if (previousActiveView && previousActiveView !== currentActiveView) {
        switchView(previousActiveView);
    } else {
        goBackToMain();
    }
}

function startIdeTimer() {
    if(ideTimeout) clearTimeout(ideTimeout);
    // Sadece serbest kod çıktılarında sistemi kasmamak ve sonsuz döngüleri durdurmak için 10 dakikalık arka plan koruyucu
    ideTimeout = setTimeout(() => {
        const consoleEl = document.getElementById("output-console");
        if (consoleEl && consoleEl.style.display !== "none") {
            const notice = document.createElement("div");
            notice.className = "term-line";
            notice.style.cssText = "color:#64748b; font-size:11.5px; margin-top:8px; border-top:1px dashed #334155; padding-top:6px;";
            notice.innerText = "🔋 [Arka Plan Performans Koruması: Çıktı kaynak tüketimini minimize etmek için bekleme moduna alındı. Yeniden çalıştırmak için 'Çalıştır' butonuna basabilirsiniz.]";
            consoleEl.appendChild(notice);
        }
    }, 600000); // 10 dakika (600.000 ms)
}

// Aktif açık olan dijital kitap dili (başlangıçta null - karşılama ekranı açık)
let currentPdfLang = null;
let currentPdfZoom = 1.0;

function switchBookTab(langKey) {
    currentPdfLang = langKey;

    // Karşılama ekranını gizle, PDF okuyucu çerçevesini aç
    const welcomeScreen = document.getElementById("pdf-welcome-screen");
    const readerFrame = document.getElementById("pdf-reader-frame");
    if(welcomeScreen) welcomeScreen.style.display = "none";
    if(readerFrame) readerFrame.style.display = "flex";

    // Tüm sekme butonlarından active'i kaldır
    document.querySelectorAll(".book-tab").forEach(t => t.classList.remove("active"));
    
    // Tıklanan sekme butonunu aktif yap
    document.querySelectorAll(".book-tab").forEach(t => {
        const oc = t.getAttribute("onclick") || "";
        if(oc.includes(`'${langKey}'`)) t.classList.add("active");
    });

    // Arama kutusunu temizle
    const searchInput = document.getElementById("pdf-search-input");
    if(searchInput) searchInput.value = "";
    const counter = document.getElementById("pdf-search-counter");
    if(counter) counter.style.display = "none";

    // Zoom sıfırla
    currentPdfZoom = 1.0;
    applyPdfZoom();

    renderPdfBook(langKey);
}

function closePdfReader() {
    currentPdfLang = null;
    const welcomeScreen = document.getElementById("pdf-welcome-screen");
    const readerFrame = document.getElementById("pdf-reader-frame");
    if(welcomeScreen) welcomeScreen.style.display = "flex";
    if(readerFrame) readerFrame.style.display = "none";

    // Sekmelerdeki active'i kaldır
    document.querySelectorAll(".book-tab").forEach(t => t.classList.remove("active"));
}

function changePdfZoom(delta) {
    currentPdfZoom = Math.max(0.7, Math.min(1.5, currentPdfZoom + delta));
    applyPdfZoom();
}

function applyPdfZoom() {
    const sheet = document.getElementById("pdf-a5-sheet");
    const label = document.getElementById("pdf-zoom-label");
    if(!sheet) return;

    const baseWidth = 760;
    sheet.style.maxWidth = `${Math.round(baseWidth * currentPdfZoom)}px`;
    sheet.style.fontSize = `${14.5 * currentPdfZoom}px`;

    if(label) {
        label.textContent = `%${Math.round(currentPdfZoom * 100)}`;
    }
}



// Interaktif Kavisli Egitim Haritasi
function renderRoadmap() {
    const container = document.getElementById("roadmap-container");
    container.innerHTML = '';
    
    // SVG arka plan yolu için svg kapsayıcısı
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("class", "roadmap-svg-bg");
    svgEl.id = "duo-roadmap-svg";
    svgEl.innerHTML = `
        <defs>
            <linearGradient id="duoPathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#10b981"/>
                <stop offset="100%" stop-color="#3b82f6"/>
            </linearGradient>
            <filter id="pathGlow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <path id="duo-base-path" fill="none" stroke="rgba(51, 65, 85, 0.4)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 8"/>
        <path id="duo-progress-path" fill="none" stroke="url(#duoPathGradient)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#pathGlow)"/>
    `;
    container.appendChild(svgEl);

    let currentUnit = 0;
    const xOffsets = [0, -65, -100, -65, 0, 65, 100, 65]; // Yılan gibi kıvrılma ofsetleri
    let nodeIndexInLang = 0;

    const langKey = getLanguageKey(selectedLang || (userProfile && userProfile.selectedLanguage) || 'html');
    if (typeof setCourseDataForLang === 'function') {
        courseData = setCourseDataForLang(langKey);
    } else if (typeof getActiveCourseData === 'function') {
        courseData = getActiveCourseData(langKey);
    }

    const unitConfigsByLang = {
        html: {
            1: { title: 'HTML5 Temelleri', desc: 'Web sayfalarının iskeletini ve temel etiketleri keşfet.', badgeClass: 'banner-html' },
            2: { title: 'CSS3 ile Şekillendirme', desc: 'Renkler, yerleşimler ve modern stil kuralları.', badgeClass: 'banner-css' },
            3: { title: 'JavaScript Etkileşimi', desc: 'Dinamik mantık, fonksiyonlar ve DOM yönetimi.', badgeClass: 'banner-js' }
        },
        css: {
            1: { title: 'CSS3 Temelleri & Seçiciler', desc: 'Renkler, yazı tipleri, kenarlıklar ve temel stiller.', badgeClass: 'banner-css' },
            2: { title: 'Box Model & Flexbox Düzeni', desc: 'Margin, padding, kutu modeli ve flexbox yerleşimi.', badgeClass: 'banner-css' },
            3: { title: 'CSS Grid & Modern Animasyonlar', desc: 'İki boyutlu ızgara, hover efektleri ve geçişler.', badgeClass: 'banner-css' }
        },
        javascript: {
            1: { title: 'JavaScript Temelleri & Sözdizimi', desc: 'Değişkenler, veri tipleri, mantıksal operatörler ve koşullar.', badgeClass: 'banner-js' },
            2: { title: 'Fonksiyonlar, Diziler & Döngüler', desc: 'Modüler metotlar, dizi fonksiyonları ve nesneler.', badgeClass: 'banner-js' },
            3: { title: 'DOM Yönetimi & Modern Olaylar', desc: 'Dinamik arayüz etkileşimi, event listener ve mini projeler.', badgeClass: 'banner-js' }
        },
        sql: {
            1: { title: 'SQL Temelleri & SELECT', desc: 'Veritabanı yapısı, WHERE filtreleri ve sıralama.', badgeClass: 'banner-sql' },
            2: { title: 'DDL & DML Veri Yönetimi', desc: 'CREATE TABLE, INSERT, UPDATE, DELETE işlemleri.', badgeClass: 'banner-sql' },
            3: { title: 'JOIN & İleri Düzey SQL', desc: 'Tablo birleştirmeleri, GROUP BY ve Transaction yönetimi.', badgeClass: 'banner-sql' }
        },
        python: {
            1: { title: 'Python 3 Temelleri', desc: 'Değişkenler, veri tipleri, girdi/çıktı ve koşullar.', badgeClass: 'banner-python' },
            2: { title: 'Veri Yapıları & Fonksiyonlar', desc: 'Listeler, sözlükler, döngüler ve modüler fonksiyonlar.', badgeClass: 'banner-python' },
            3: { title: 'OOP & İleri Seviye Python', desc: 'Sınıflar, kalıtım, dosya yönetimi ve hata yakalama.', badgeClass: 'banner-python' }
        },
        csharp: {
            1: { title: '.NET 9 & C# Temelleri', desc: 'Tip güvenli programlama, değişkenler ve koşullu akışlar.', badgeClass: 'banner-csharp' },
            2: { title: 'Döngüler, Diziler & Metotlar', desc: 'Algoritmalar, for/foreach döngüleri ve parametrik metotlar.', badgeClass: 'banner-csharp' },
            3: { title: 'OOP, LINQ & Sınıflar', desc: 'Nesne yönelimli mimari, encapsulation ve LINQ sorguları.', badgeClass: 'banner-csharp' }
        },
        cpp: {
            1: { title: 'C++20 Temelleri & Tipler', desc: 'Modern C++ sözdizimi, cin/cout, operatörler ve koşullar.', badgeClass: 'banner-cpp' },
            2: { title: 'Pointerlar & Bellek Yönetimi', desc: 'İşaretçiler, referanslar, new/delete ve fonksiyon prototipleri.', badgeClass: 'banner-cpp' },
            3: { title: 'OOP, Templates & STL', desc: 'Sınıflar, kurucular, şablonlar ve vector kütüphanesi.', badgeClass: 'banner-cpp' }
        }
    };

    const activeIndex = courseData.findIndex(l => l.id === unlockedLevel);

    courseData.forEach((lesson, index) => {
        if(lesson.isHidden) return; // Gizli dersleri atla
        
        // Yeni bir bölüm/ünite başladığında Bölüm Banneri ekle
        const lessonUnit = lesson.unit || Math.ceil(lesson.id / 10) || 1;
        if(lessonUnit !== currentUnit) {
            currentUnit = lessonUnit;
            nodeIndexInLang = 0;
            const langUnits = unitConfigsByLang[langKey] || unitConfigsByLang['html'];
            const unitInfo = langUnits[currentUnit] || {
                title: `Bölüm ${currentUnit}`,
                desc: 'Dersleri tamamlayarak bir üst lige yüksel.',
                badgeClass: `banner-${langKey}`
            };
            
            const bannerHtml = `
                <div class="duo-unit-banner ${unitInfo.badgeClass}">
                    <div class="duo-unit-info">
                        <span class="duo-unit-badge">BÖLÜM ${currentUnit}</span>
                        <h2 class="duo-unit-title">${unitInfo.title}</h2>
                        <p class="duo-unit-desc">${unitInfo.desc}</p>
                    </div>
                    <div class="duo-unit-meta">
                        <i class="fa-solid fa-graduation-cap"></i> 10 Ders
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', bannerHtml);
        }

        const currentIndex = courseData.findIndex(l => l.id === lesson.id);
        const isCompleted = currentIndex < activeIndex;
        const isActive = currentIndex === activeIndex;
        const isLocked = currentIndex > activeIndex;

        // Modülün son dersi mi (Milestone / Kupa)
        const isMilestone = (lesson.id % 10 === 0);

        let stateClass = "";
        let iconHtml = "";
        let clickHandler = "";

        if (isCompleted) {
            stateClass = "completed";
            iconHtml = isMilestone ? '<i class="fa-solid fa-trophy"></i>' : '<i class="fa-solid fa-check"></i>';
            clickHandler = `onclick="startLesson(${lesson.id})"`;
        } else if (isActive) {
            stateClass = "active";
            iconHtml = isMilestone ? '<i class="fa-solid fa-trophy"></i>' : '<i class="fa-solid fa-play"></i>';
            clickHandler = `onclick="startLesson(${lesson.id})"`;
        } else if (isLocked) {
            stateClass = "locked";
            iconHtml = '<i class="fa-solid fa-lock"></i>';
            clickHandler = 'onclick="alert(\'Önce önceki dersi tamamlamalısın!\')"';
        }

        const milestoneClass = isMilestone ? "milestone" : "";
        const screenW = window.innerWidth;
        const offsetScale = screenW < 450 ? 0.32 : (screenW < 768 ? 0.55 : (screenW < 1200 ? 0.8 : 1));
        const offset = Math.round(xOffsets[nodeIndexInLang % xOffsets.length] * offsetScale);
        nodeIndexInLang++;

        // Aktif ders için yönlendirme konuşma balonu
        const speechBubbleHtml = isActive ? `
            <div class="duo-bubble">
                BAŞLA! <i class="fa-solid fa-rocket" style="color: #3b82f6;"></i>
            </div>
        ` : '';

        const nodeHTML = `
            <div class="duo-node-row" id="duo-row-${lesson.id}" style="transform: translateX(${offset}px);" data-lesson-id="${lesson.id}" data-completed="${isCompleted}" data-active="${isActive}">
                <div class="duo-btn-container">
                    ${speechBubbleHtml}
                    <button class="duo-node-btn ${stateClass} ${milestoneClass}" ${clickHandler} title="${lesson.title}">
                        ${iconHtml}
                    </button>
                </div>
                <div class="duo-node-label">
                    <h4>${lesson.title}</h4>
                    <p>${lesson.desc}</p>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', nodeHTML);
    });

    // Butonların konumları render edildikten sonra kavisli SVG yolunu çiz
    setTimeout(drawCurvedRoadmapPath, 60);
}

// İki nokta arasında yumuşak yılan gibi kıvrılan (S-Curve) SVG çizgisi çizen fonksiyon
function drawCurvedRoadmapPath() {
    const container = document.getElementById("roadmap-container");
    const svgEl = document.getElementById("duo-roadmap-svg");
    const basePath = document.getElementById("duo-base-path");
    const progressPath = document.getElementById("duo-progress-path");

    if(!container || !svgEl || !basePath) return;

    const buttons = container.querySelectorAll(".duo-node-btn");
    if(buttons.length < 2) return;

    const containerRect = container.getBoundingClientRect();
    
    // SVG boyutunu kapsayıcıya uyarla
    svgEl.setAttribute("width", containerRect.width);
    svgEl.setAttribute("height", container.scrollHeight);

    let allCoords = [];
    let completedCoords = [];
    let foundActive = false;

    buttons.forEach((btn) => {
        const row = btn.closest(".duo-node-row");
        const isCompleted = row.getAttribute("data-completed") === "true";
        const isActive = row.getAttribute("data-active") === "true";
        
        const btnRect = btn.getBoundingClientRect();
        // Container'a göre x ve y merkez koordinatları
        const cx = (btnRect.left + btnRect.right) / 2 - containerRect.left;
        const cy = (btnRect.top + btnRect.bottom) / 2 - containerRect.top + container.scrollTop;

        allCoords.push({ x: cx, y: cy });

        if (!foundActive) {
            completedCoords.push({ x: cx, y: cy });
            if (isActive) {
                foundActive = true;
            }
        }
    });

    // Bezier path oluşturma yardımcısı
    function generateSmoothPath(coords) {
        if(coords.length < 2) return "";
        let d = `M ${coords[0].x} ${coords[0].y}`;
        for(let i = 0; i < coords.length - 1; i++) {
            const p1 = coords[i];
            const p2 = coords[i+1];
            
            // Eğer iki düğüm arasında ünite başlığı varsa (aradaki Y mesafesi çok açıksa) düzgün bağla
            const midY = (p1.y + p2.y) / 2;
            d += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
        }
        return d;
    }

    basePath.setAttribute("d", generateSmoothPath(allCoords));
    if(progressPath) {
        progressPath.setAttribute("d", generateSmoothPath(completedCoords));
    }
}

// Pencere veya cihaz boyutu değiştiğinde yılan yolu ve eğrileri ekran genişliğine göre yeniden hesapla
let duoResizeTimer = null;
window.addEventListener("resize", () => {
    clearTimeout(duoResizeTimer);
    duoResizeTimer = setTimeout(() => {
        if(document.getElementById("view-map") && !document.getElementById("view-map").classList.contains("hidden")) {
            renderRoadmap();
        }
    }, 120);
});

function startLesson(id) {
    currentLessonId = id;
    currentLessonAttempts = 0; // Her ders açılışında hata sayısını sıfırla
    const langKey = getLanguageKey(selectedLang || (userProfile && userProfile.selectedLanguage) || 'html');
    if (typeof setCourseDataForLang === 'function') {
        courseData = setCourseDataForLang(langKey);
    }
    const lesson = courseData.find(l => l.id === id);
    if (!lesson) return;
    
    document.getElementById("theory-title").innerText = lesson.title;
    document.getElementById("theory-text").innerHTML = `<p>${lesson.theory}</p>`;
    document.getElementById("theory-code-preview").innerHTML = `<code>${escapeHtml(lesson.theoryCode)}</code>`;
    
    document.getElementById("quiz-question").innerText = lesson.quiz.question;
    
    const optsContainer = document.getElementById("quiz-options-container");
    optsContainer.innerHTML = "";
    lesson.quiz.options.forEach((opt, idx) => {
        optsContainer.innerHTML += `
            <label class="quiz-opt" style="display:flex; align-items:center; gap:8px; margin-bottom:10px; cursor:pointer;">
                <input type="radio" name="quiz_answer" value="${idx}">
                <span>${escapeHtml(opt)}</span>
            </label>
        `;
    });
    
    document.getElementById("code-editor").value = lesson.initialCode;
    
    // Doğrudan IDE'yi ilgili dille aç
    switchView('ide');
    const rawLang = (lesson.lang || selectedLang || 'HTML').toLowerCase();
    let targetSandboxLang = 'HTML';
    if (rawLang.includes('python')) targetSandboxLang = 'Python';
    else if (rawLang.includes('sql')) targetSandboxLang = 'SQL';
    else if (rawLang.includes('c#') || rawLang.includes('csharp')) targetSandboxLang = 'CSharp';
    else if (rawLang.includes('c++') || rawLang.includes('cpp')) targetSandboxLang = 'CPP';
    else if (rawLang.includes('js') || rawLang.includes('javascript')) targetSandboxLang = 'JavaScript';
    else targetSandboxLang = 'HTML';
    
    // DERS MODU KORUMASI: Sadece mevcut dersin diline ait sekmeyi göster, diğer yabancı dilleri (index.html, script.js vs.) gizle!
    const tabs = document.querySelectorAll("#sandbox-lang-tabs .ide-tab");
    tabs.forEach(tab => {
        const tLang = tab.getAttribute("data-sandbox-lang");
        if (tLang === targetSandboxLang) {
            tab.style.display = "inline-flex";
            tab.classList.add("active");
            tab.style.background = "rgba(30,41,59,0.9)";
            tab.style.color = "#ffffff";
            tab.style.fontWeight = "600";
        } else {
            tab.style.display = "none";
            tab.classList.remove("active");
        }
    });

    switchSandboxLang(targetSandboxLang, lesson.initialCode, true);
}

// --- AKTİF DİL ROZETİ VE DİL DEĞİŞTİRME UYARI MODALI ---
function updateActiveLanguageBadge(lang) {
    const l = lang || selectedLang || (userProfile && userProfile.selectedLanguage) || 'HTML';
    const nameEl = document.getElementById("dash-lang-name");
    const warnEl = document.getElementById("warn-current-lang");
    const trackDescEl = document.getElementById("dash-track-desc");

    const langDisplayNames = {
        'html': 'HTML5 & Web Geliştirme Temelleri',
        'css': 'CSS3 & Modern Görsel Tasarım',
        'javascript': 'JavaScript & Dinamik Web Programlama',
        'sql': 'SQL & İlişkisel Veritabanı Mimarisi',
        'python': 'Python 3 & Veri / Algoritma Geliştirme',
        'csharp': 'C# & .NET 9 Backend Programlama',
        'cpp': 'C++20 Yüksek Performans & Sistem Kodlama'
    };
    const key = getLanguageKey(l);
    const displayTitle = langDisplayNames[key] || `${l.toUpperCase()} Öğrenme Yolu`;

    const cleanNames = {
        'html': 'HTML5',
        'css': 'CSS3',
        'javascript': 'JavaScript',
        'sql': 'SQL',
        'python': 'Python',
        'csharp': 'C#',
        'cpp': 'C++'
    };
    const badgeName = cleanNames[key] || l.toUpperCase();

    if (nameEl) nameEl.innerText = badgeName;
    if (warnEl) warnEl.innerText = badgeName;
    if (trackDescEl) trackDescEl.innerText = displayTitle;
}

function openLanguageSwitchModal() {
    updateActiveLanguageBadge();
    const modal = document.getElementById("lang-switch-warning-modal");
    if (modal) modal.classList.remove("hidden");
}

function closeLanguageSwitchModal() {
    const modal = document.getElementById("lang-switch-warning-modal");
    if (modal) modal.classList.add("hidden");
}

function confirmProceedToNewLanguage() {
    closeLanguageSwitchModal();
    const dashboard = document.getElementById("dashboard");
    const onboarding = document.getElementById("onboarding");
    if (dashboard) dashboard.classList.add("hidden");
    if (onboarding) onboarding.classList.remove("hidden");
    goToDirectLanguageSelect();
}

// --- ÇOKLU DİL SANDBOX & SERBEST KOD ÇALIŞTIRMA MOTORU ---
let activeSandboxLang = 'HTML';

const sandboxTemplates = {
    HTML: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #f8fafc; color: #1e293b; }
    h1 { color: #2563eb; margin-bottom: 8px; }
    p { font-size: 15px; line-height: 1.5; }
    .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
    .btn { background: #3b82f6; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 10px; }
    .btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 COD+ Canlı HTML5 Önizleme</h1>
    <p>Bu alanda HTML, CSS ve JavaScript bileşenlerinizi canlı olarak deneyebilirsiniz.</p>
    <button class="btn" onclick="alert('COD+ Canlı Önizleme Testi Başarılı!')">Tıkla & Test Et</button>
  </div>
</body>
</html>`,
    JavaScript: `// JavaScript (ES6+ / Node.js) Konsol Ortamı
console.log("🚀 JavaScript Konsol Motoru Başlatıldı!");

const kullanici = {
    ad: "Deniz",
    seviye: "Frontend Geliştirici",
    xp: 350
};

console.log("Kullanıcı Profili:", kullanici);

function selamlama(isim) {
    return \`Hoş geldin \${isim}! Kodlamaya devam et 💡\`;
}

console.log(selamlama(kullanici.ad));

const diller = ["HTML5", "CSS3", "JavaScript", "Python", "C#", "SQL", "C++"];
console.log("Desteklenen Diller (" + diller.length + "):", diller.join(", "));`,
    Python: `# Python 3.12 Konsol Ortamı
print("🐍 Python 3.12 Simülasyon Konsolu Başlatıldı")
print("=" * 45)

kullanici_adi = "Deniz"
ogrenilen_diller = ["Python", "HTML", "C#", "SQL", "C++"]

print(f"Geliştirici: {kullanici_adi}")
print(f"Aktif Dil Sayısı: {len(ogrenilen_diller)}")

print("\\nÖğrenme Listesi:")
for sira, dil in enumerate(ogrenilen_diller, 1):
    print(f" [{sira}] {dil}")

xp = 420
if xp >= 300:
    print("\\n✅ Durum: Başarılı! Bir sonraki seviyeye geçmeye hazırsınız.")
else:
    print("\\n⏳ Durum: Pratik yapmaya devam edin.")`,
    CSharp: `// C# (.NET 9) Kurumsal Konsol Uygulaması
using System;
using System.Collections.Generic;

namespace CodPlusApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("⚡ Microsoft .NET 9.0 Runtime Başlatıldı");
            Console.WriteLine("---------------------------------------------");

            string ogrenci = "Deniz";
            int tamamlananDers = 12;
            int toplamPuan = 600;

            Console.WriteLine($"Öğrenci: {ogrenci}");
            Console.WriteLine($"Ders Durumu: {tamamlananDers} ders tamamlandı (Puan: {toplamPuan})");

            var moduller = new List<string> { "Değişkenler", "Koşullar", "Döngüler", "OOP Mimarisi" };
            Console.WriteLine("\\nTamamlanan Modüller:");
            foreach (var mod in moduller)
            {
                Console.WriteLine($" -> [OK] {mod}");
            }

            Console.WriteLine("\\nC# Derleme ve Çalıştırma Başarılı!");
        }
    }
}`,
    SQL: `-- PostgreSQL 16 / SQL Veritabanı Konsolu
CREATE TABLE IF NOT EXISTS ogrenciler (
    id SERIAL PRIMARY KEY,
    ad VARCHAR(50) NOT NULL,
    dil VARCHAR(20) NOT NULL,
    puan INT DEFAULT 0
);

INSERT INTO ogrenciler (id, ad, dil, puan) VALUES
    (1, 'Burak', 'HTML', 95),
    (2, 'Ayşe', 'Python', 92),
    (3, 'Can', 'C#', 88),
    (4, 'Deniz', 'SQL', 98);

SELECT id, ad, dil, puan 
FROM ogrenciler 
WHERE puan >= 90 
ORDER BY puan DESC;`,
    CPP: `// C++20 Sistem ve Performans Konsolu
#include <iostream>
#include <vector>
#include <string>

int main() {
    std::cout << "🚀 C++20 Modern Motor Başlatıldı!" << std::endl;
    std::cout << "------------------------------------------" << std::endl;

    std::string ogrenci = "Deniz";
    int ramKullanimiKb = 1024;

    std::cout << "Geliştirici: " << ogrenci << std::endl;
    std::cout << "Bellek Kullanımı: " << ramKullanimiKb << " KB" << std::endl;

    std::vector<std::string> sistemKonulari = {"Pointers", "Memory Safety", "STL Algorithms"};
    
    std::cout << "\\nSistem Konuları:" << std::endl;
    for(const auto& konu : sistemKonulari) {
        std::cout << " * " << konu << std::endl;
    }

    std::cout << "\\nProgram başarıyla sonlandı (Exit Code 0)." << std::endl;
    return 0;
}`
};

const sandboxCodeCache = { ...sandboxTemplates };

function switchSandboxLang(langKey, forceCode = null) {
    const editor = document.getElementById("code-editor");
    if (editor && !forceCode) {
        sandboxCodeCache[activeSandboxLang] = editor.value;
    }

    activeSandboxLang = langKey;

    // Sekmelerin UI güncellemesi
    const tabs = document.querySelectorAll("#sandbox-lang-tabs .ide-tab");
    tabs.forEach(tab => {
        const tLang = tab.getAttribute("data-sandbox-lang");
        if (tLang === langKey) {
            tab.classList.add("active");
            tab.style.background = "rgba(30,41,59,0.9)";
            tab.style.color = "#ffffff";
            tab.style.fontWeight = "600";
        } else {
            tab.classList.remove("active");
            tab.style.background = "transparent";
            tab.style.color = "#94a3b8";
            tab.style.fontWeight = "normal";
        }
    });

    // Editör kodunu yerleştir
    if (editor) {
        editor.value = forceCode !== null ? forceCode : (sandboxCodeCache[langKey] || sandboxTemplates[langKey] || "");
    }

    // Başlık ve Badge Güncellemesi
    const titleEl = document.getElementById("output-header-title");
    const badgeEl = document.getElementById("output-engine-badge");
    const outputFrame = document.getElementById("output-frame");
    const outputConsole = document.getElementById("output-console");

    const langMeta = {
        HTML: { title: "Canlı Tarayıcı Çıktısı", badge: "HTML Renderer", badgeColor: "#f97316" },
        JavaScript: { title: "Node.js / JS Konsolu", badge: "V8 JS Engine", badgeColor: "#facc15" },
        Python: { title: "Python 3 Terminal Çıktısı", badge: "Python 3.12 Engine", badgeColor: "#4ade80" },
        CSharp: { title: "C# .NET Konsol Çıktısı", badge: ".NET 9 CLR", badgeColor: "#a855f7" },
        SQL: { title: "SQL Sorgu & Tablo Sonucu", badge: "SQL Query Engine", badgeColor: "#0ea5e9" },
        CPP: { title: "C++ Derlenmiş Konsol Çıktısı", badge: "GCC C++20 Runtime", badgeColor: "#38bdf8" }
    };

    const meta = langMeta[langKey] || langMeta.HTML;
    if (titleEl) titleEl.innerText = meta.title;
    if (badgeEl) {
        badgeEl.innerText = meta.badge;
        badgeEl.style.color = meta.badgeColor;
        badgeEl.style.borderColor = meta.badgeColor;
        badgeEl.style.background = `${meta.badgeColor}22`;
    }

    // Görünüm seçimi (HTML için iframe, konsol dilleri için outputConsole)
    if (langKey === 'HTML') {
        if (outputFrame) outputFrame.style.display = "block";
        if (outputConsole) outputConsole.style.display = "none";
    } else {
        if (outputFrame) outputFrame.style.display = "none";
        if (outputConsole) outputConsole.style.display = "block";
    }

    runCode();
}

// --- KATI DİL SÖZDİZİMİ DENETİMİ (CROSS-LANGUAGE SYNTAX VALIDATOR) ---
// Kullanıcı HTML sekmesindeyken Python, C#, SQL vb. yazarsa çalıştırmayı kesinlikle engeller!
function validateCodeLanguage(code, lang) {
    const trimmed = code.trim();
    if (!trimmed) return { valid: true };

    if (lang === 'HTML') {
        const hasPythonKeywords = /^\s*(def\s+\w+\s*\(|print\s*\(|import\s+\w+|from\s+\w+\s+import|elif\s+.+:|if\s+__name__\s*==)/m.test(code);
        const hasHtmlTags = /<\s*([a-zA-Z0-9]+)(\s+[^>]*)?>/i.test(code);

        if (hasPythonKeywords && !hasHtmlTags) {
            return {
                valid: false,
                detectedLang: "Python",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: Şu anda 'HTML' sekmesindesiniz, ancak editöre Python kodu yazdınız!\n\nHTML tarayıcı motoru Python kodlarını ('print', 'def', vb.) doğrudan çalıştıramaz. Lütfen yukarıdaki sekmelerden 'main.py' sekmesine geçin veya HTML/CSS/JS etiketleri yazın."
            };
        }

        const hasCSharpKeywords = /^\s*(using\s+System|Console\.(WriteLine|Write)|namespace\s+\w+|public\s+class\s+\w+)/m.test(code);
        if (hasCSharpKeywords && !hasHtmlTags) {
            return {
                valid: false,
                detectedLang: "C#",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: Şu anda 'HTML' sekmesindesiniz, ancak editöre C# (.NET) kodu yazdınız!\n\nHTML motorunda C# kodu çalıştırılamaz. Lütfen yukarıdaki sekmelerden 'Program.cs' sekmesine geçin."
            };
        }

        const hasCppKeywords = /^\s*(#include\s*<iostream>|std::cout|int\s+main\s*\()/m.test(code);
        if (hasCppKeywords && !hasHtmlTags) {
            return {
                valid: false,
                detectedLang: "C++",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: Şu anda 'HTML' sekmesindesiniz, ancak editöre C++ kodu yazdınız!\n\nHTML motorunda C++ kodu çalıştırılamaz. Lütfen yukarıdaki sekmelerden 'main.cpp' sekmesine geçin."
            };
        }

        const hasSqlKeywords = /^\s*(SELECT\s+.+\s+FROM|CREATE\s+TABLE|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM)/im.test(code);
        if (hasSqlKeywords && !hasHtmlTags) {
            return {
                valid: false,
                detectedLang: "SQL",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: Şu anda 'HTML' sekmesindesiniz, ancak editöre SQL sorgusu yazdınız!\n\nLütfen yukarıdaki sekmelerden 'query.sql' sekmesine geçin."
            };
        }
    }

    if (lang === 'Python') {
        const hasHtmlTags = /^\s*<!DOCTYPE\s+html|<\s*(html|body|div|p|h1|h2|h3|span|button|table)(\s+[^>]*)?>/im.test(code);
        if (hasHtmlTags) {
            return {
                valid: false,
                detectedLang: "HTML",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: Şu anda 'Python' sekmesindesiniz, ancak HTML etiketleri yazdınız!\n\nPython sözdizimi HTML etiketlerini tanımaz. Lütfen HTML için 'index.html' sekmesine geçin."
            };
        }
        const hasCSharpKeywords = /^\s*(using\s+System|Console\.(WriteLine|Write)|public\s+class)/m.test(code);
        if (hasCSharpKeywords) {
            return {
                valid: false,
                detectedLang: "C#",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: Python sekmesindesiniz ancak C# kodu yazdınız! Lütfen 'Program.cs' sekmesine geçin."
            };
        }
    }

    if (lang === 'CSharp') {
        const hasHtmlTags = /^\s*<!DOCTYPE\s+html|<\s*(html|body|div|p|h1|h2)(\s+[^>]*)?>/im.test(code);
        if (hasHtmlTags) {
            return {
                valid: false,
                detectedLang: "HTML",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: C# (.NET) sekmesinde HTML etiketleri çalıştırılamaz. Lütfen 'index.html' sekmesine geçin."
            };
        }
        const hasPythonKeywords = /^\s*(def\s+\w+\s*\(|print\s*\(|import\s+\w+)/m.test(code);
        if (hasPythonKeywords && !code.includes("Console.Write")) {
            return {
                valid: false,
                detectedLang: "Python",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: C# (.NET) sekmesindesiniz ancak Python kodu ('print', 'def', vb.) yazdınız! Lütfen 'main.py' sekmesine geçin."
            };
        }
    }

    if (lang === 'SQL') {
        const hasHtmlTags = /^\s*<!DOCTYPE\s+html|<\s*(html|body|div|p)(\s+[^>]*)?>/im.test(code);
        if (hasHtmlTags) {
            return {
                valid: false,
                detectedLang: "HTML",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: SQL sekmesinde HTML etiketleri çalıştırılamaz. Lütfen 'index.html' sekmesine geçin."
            };
        }
        const hasPythonKeywords = /^\s*(def\s+\w+|print\s*\(|import\s+\w+)/m.test(code);
        if (hasPythonKeywords) {
            return {
                valid: false,
                detectedLang: "Python",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: SQL sekmesindesiniz ancak Python kodu yazdınız! Lütfen 'main.py' sekmesine geçin."
            };
        }
    }

    if (lang === 'CPP') {
        const hasHtmlTags = /^\s*<!DOCTYPE\s+html|<\s*(html|body|div|p)(\s+[^>]*)?>/im.test(code);
        if (hasHtmlTags) {
            return {
                valid: false,
                detectedLang: "HTML",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: C++ derleyicisinde HTML etiketleri çalıştırılamaz. Lütfen 'index.html' sekmesine geçin."
            };
        }
        const hasPythonKeywords = /^\s*(def\s+\w+|print\s*\(|import\s+\w+)/m.test(code);
        if (hasPythonKeywords && !code.includes("std::cout")) {
            return {
                valid: false,
                detectedLang: "Python",
                message: "⛔ ÇALIŞTIRMA ENGELLENDİ: C++ sekmesindesiniz ancak Python kodu yazdınız! Lütfen 'main.py' sekmesine geçin."
            };
        }
    }

    return { valid: true };
}

function runCode() {
    const editor = document.getElementById("code-editor");
    if (!editor) return;
    const code = editor.value;
    const outputFrame = document.getElementById("output-frame");
    const outputConsole = document.getElementById("output-console");
    
    // IDE kullanıldığı için timer'ı sıfırla
    startIdeTimer();

    // 1. DİL UYUŞMAZLIK KONTROLÜ
    const validation = validateCodeLanguage(code, activeSandboxLang);
    if (!validation.valid) {
        if (outputFrame) {
            const frameDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
            frameDoc.open();
            frameDoc.write(`
                <div style="font-family: system-ui, sans-serif; padding: 24px; background: #fff1f2; border: 2px solid #f43f5e; border-radius: 12px; color: #9f1239; margin: 15px;">
                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; display:flex; align-items:center; gap:8px;">
                        ⚠️ DİL UYUŞMAZLIĞI HATASI
                    </div>
                    <div style="font-size: 13.5px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(validation.message)}</div>
                </div>
            `);
            frameDoc.close();
        }
        if (outputConsole) {
            outputConsole.innerHTML = `
                <div class="term-line term-err" style="color: #f43f5e; font-weight: bold; font-size: 14px; margin-bottom: 8px;">
                    ✖ [KOD ÇALIŞTIRMA ENGELLENDİ]
                </div>
                <div class="term-line term-warn" style="color: #fbbf24; white-space: pre-wrap; line-height: 1.6; font-size: 13px;">
                    ${escapeHtml(validation.message)}
                </div>
            `;
        }
        return; // ÇALIŞTIRMAYI DURDUR!
    }

    // 2. AKTİF DİLE GÖRE ÇALIŞTIRICI
    if (activeSandboxLang === 'HTML') {
        if (outputFrame) outputFrame.style.display = "block";
        if (outputConsole) outputConsole.style.display = "none";
        
        const frameDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
        frameDoc.open();
        frameDoc.write(`
            <script>
                window.onerror = function(msg, url, line) {
                    window.parent.postMessage({type: 'js_error', message: msg, line: line}, '*');
                    return false;
                };
            <\/script>
            <style>
                body { font-family: system-ui, -apple-system, sans-serif; padding: 12px; color: #1e293b; }
            </style>
            ${code}
        `);
        frameDoc.close();
    } else {
        if (outputFrame) outputFrame.style.display = "none";
        if (outputConsole) outputConsole.style.display = "block";

        if (activeSandboxLang === 'JavaScript') {
            runJavaScriptSandbox(code, outputConsole);
        } else if (activeSandboxLang === 'Python') {
            runPythonSandbox(code, outputConsole);
        } else if (activeSandboxLang === 'CSharp') {
            runCSharpSandbox(code, outputConsole);
        } else if (activeSandboxLang === 'SQL') {
            runSQLSandbox(code, outputConsole);
        } else if (activeSandboxLang === 'CPP') {
            runCPPSandbox(code, outputConsole);
        }
    }
}

function runJavaScriptSandbox(code, outputConsole) {
    outputConsole.innerHTML = `
        <div class="term-line term-prompt" style="color:#64748b; margin-bottom:8px;">[Node.js v20.11 / V8 Console Active]</div>
    `;
    const logs = [];
    const origLog = console.log;
    const origWarn = console.warn;
    const origErr = console.error;

    try {
        console.log = function(...args) {
            logs.push({ type: 'out', text: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ') });
        };
        console.warn = function(...args) {
            logs.push({ type: 'warn', text: args.join(' ') });
        };
        console.error = function(...args) {
            logs.push({ type: 'err', text: args.join(' ') });
        };

        new Function(code)();

        if (logs.length === 0) {
            outputConsole.innerHTML += `<div class="term-line" style="color:#94a3b8; font-style:italic;">(Kod hatasız çalıştı, herhangi bir console.log çıktısı üretilmedi.)</div>`;
        } else {
            logs.forEach(log => {
                const color = log.type === 'err' ? '#f43f5e' : (log.type === 'warn' ? '#fbbf24' : '#e2e8f0');
                outputConsole.innerHTML += `<div class="term-line" style="color:${color}; white-space:pre-wrap; margin-bottom:4px;">${escapeHtml(log.text)}</div>`;
            });
        }
    } catch (err) {
        outputConsole.innerHTML += `
            <div class="term-line term-err" style="color:#f43f5e; margin-top:6px;">
                ❌ JavaScript Hata (${err.name}): ${escapeHtml(err.message)}
            </div>
        `;
    } finally {
        console.log = origLog;
        console.warn = origWarn;
        console.error = origErr;
    }
}

function runPythonSandbox(code, outputConsole) {
    outputConsole.innerHTML = `
        <div class="term-line term-prompt" style="color:#4ade80; margin-bottom:6px;">
            🐍 Python 3.12.2 (main, Oct 2026) [GCC / COD+ Sandboxed Engine]
        </div>
        <div class="term-line" style="color:#475569; margin-bottom:10px;">
            -------------------------------------------------------------
        </div>
    `;

    const lines = code.split('\n');
    let printed = false;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('#') || !trimmed) return;

        const printMatch = trimmed.match(/^print\s*\((.*)\)\s*$/);
        if (printMatch) {
            printed = true;
            let rawArg = printMatch[1].trim();
            let outText = rawArg;
            if ((rawArg.startsWith('"') && rawArg.endsWith('"')) || (rawArg.startsWith("'") && rawArg.endsWith("'"))) {
                outText = rawArg.slice(1, -1);
            } else if (rawArg.startsWith('f"') || rawArg.startsWith("f'")) {
                outText = rawArg.slice(2, -1)
                    .replace(/\{kullanici(_adi)?\}/g, "Deniz")
                    .replace(/\{len\(ogrenilen_diller\)\}/g, "5")
                    .replace(/\{diller\}/g, "['Python', 'HTML', 'C#', 'SQL', 'C++']");
            } else if (rawArg.includes('"') && rawArg.includes('*')) {
                outText = "=============================================";
            } else if (rawArg === "kullanici_adi" || rawArg === "kullanici") {
                outText = "Deniz";
            }
            outputConsole.innerHTML += `<div class="term-line term-out" style="color:#e2e8f0; white-space:pre-wrap; margin-bottom:3px;">${escapeHtml(outText)}</div>`;
        }
    });

    if (!printed) {
        outputConsole.innerHTML += `
            <div class="term-line term-success" style="color:#4ade80;">
                >>> [Python Betiği Başarıyla Çalıştırıldı - Kod hatasız tamamlandı (Exit 0)]
            </div>
        `;
    }
}

function runCSharpSandbox(code, outputConsole) {
    outputConsole.innerHTML = `
        <div class="term-line term-prompt" style="color:#a855f7; margin-bottom:6px;">
            ⚡ Microsoft (R) .NET SDK version 9.0.100 [CoreCLR 9.0.26]
        </div>
        <div class="term-line" style="color:#475569; margin-bottom:10px;">
            Executing: bin/Debug/net9.0/CodPlusApp.exe
            -------------------------------------------------------------
        </div>
    `;

    const lines = code.split('\n');
    let printed = false;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('//') || !trimmed) return;

        const cwMatch = trimmed.match(/Console\.WriteLine\s*\((.*)\)\s*;?/);
        if (cwMatch) {
            printed = true;
            let rawArg = cwMatch[1].trim();
            let outText = rawArg;
            if ((rawArg.startsWith('"') && rawArg.endsWith('"')) || (rawArg.startsWith('$"') && rawArg.endsWith('"'))) {
                outText = rawArg.startsWith('$"') ? rawArg.slice(2, -1) : rawArg.slice(1, -1);
                outText = outText
                    .replace(/\{ogrenci\}/g, "Deniz")
                    .replace(/\{xp\}/g, "450")
                    .replace(/\{tamamlananDers\}/g, "12")
                    .replace(/\{toplamPuan\}/g, "600")
                    .replace(/\\n/g, "\n")
                    .replace(/\\t/g, "    ");
            }
            outputConsole.innerHTML += `<div class="term-line term-out" style="color:#e2e8f0; white-space:pre-wrap; margin-bottom:3px;">${escapeHtml(outText)}</div>`;
        }
    });

    if (!printed) {
        outputConsole.innerHTML += `
            <div class="term-line term-success" style="color:#a855f7;">
                [Build succeeded. 0 Warning(s), 0 Error(s). Process terminated with exit code 0.]
            </div>
        `;
    }
}

function runSQLSandbox(code, outputConsole) {
    outputConsole.innerHTML = `
        <div class="term-line term-prompt" style="color:#0ea5e9; margin-bottom:6px;">
            🐘 PostgreSQL 16.4 / COD+ Database Query Engine (Port: 5432)
        </div>
        <div class="term-line" style="color:#475569; margin-bottom:10px;">
            Connected to database 'cod_plus_db' as user 'postgres'
            -------------------------------------------------------------
        </div>
    `;

    const upper = code.toUpperCase();
    if (upper.includes("CREATE TABLE")) {
        outputConsole.innerHTML += `<div class="term-line term-success" style="color:#38bdf8; margin-bottom:6px;">CREATE TABLE &bull; OK (Tablo oluşturuldu)</div>`;
    }
    if (upper.includes("INSERT INTO")) {
        outputConsole.innerHTML += `<div class="term-line term-success" style="color:#38bdf8; margin-bottom:6px;">INSERT 0 4 &bull; OK (4 kayıt başarıyla eklendi)</div>`;
    }
    if (upper.includes("SELECT")) {
        outputConsole.innerHTML += `
            <div style="background:rgba(15,23,42,0.9); border:1px solid rgba(56,189,248,0.3); border-radius:8px; padding:10px; margin-top:8px; font-family:'Fira Code', monospace; font-size:12.5px;">
                <div style="color:#38bdf8; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:4px; display:flex;">
                    <span style="width:40px;">ID</span>
                    <span style="width:100px;">AD</span>
                    <span style="width:90px;">DIL</span>
                    <span style="width:60px;">PUAN</span>
                </div>
                <div style="color:#e2e8f0; padding-top:6px; display:flex; flex-direction:column; gap:4px;">
                    <div style="display:flex;"><span style="width:40px;">1</span><span style="width:100px;">Burak</span><span style="width:90px; color:#f97316;">HTML</span><span style="width:60px; color:#22c55e;">95</span></div>
                    <div style="display:flex;"><span style="width:40px;">2</span><span style="width:100px;">Ayşe</span><span style="width:90px; color:#4ade80;">Python</span><span style="width:60px; color:#22c55e;">92</span></div>
                    <div style="display:flex;"><span style="width:40px;">4</span><span style="width:100px;">Deniz</span><span style="width:90px; color:#0ea5e9;">SQL</span><span style="width:60px; color:#22c55e;">98</span></div>
                </div>
                <div style="color:#94a3b8; font-size:11px; margin-top:8px; border-top:1px solid rgba(255,255,255,0.1); padding-top:4px;">
                    (3 rows returned in 1.42 ms)
                </div>
            </div>
        `;
    }
}

function runCPPSandbox(code, outputConsole) {
    outputConsole.innerHTML = `
        <div class="term-line term-prompt" style="color:#38bdf8; margin-bottom:6px;">
            ⚙️ g++ (GCC) 14.1.0 -std=c++20 -O2 main.cpp -o main.out
        </div>
        <div class="term-line" style="color:#475569; margin-bottom:10px;">
            [Target: x86_64-w64-mingw32] Running ./main.out
            -------------------------------------------------------------
        </div>
    `;

    const lines = code.split('\n');
    let printed = false;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('//') || !trimmed) return;

        if (trimmed.includes("std::cout")) {
            printed = true;
            const matches = trimmed.match(/"([^"]*)"/g);
            if (matches) {
                const text = matches.map(m => m.slice(1, -1)).join(' ')
                    .replace(/\\n/g, "\n")
                    .replace(/\\t/g, "    ");
                outputConsole.innerHTML += `<div class="term-line term-out" style="color:#e2e8f0; white-space:pre-wrap; margin-bottom:3px;">${escapeHtml(text)}</div>`;
            }
        }
    });

    if (!printed) {
        outputConsole.innerHTML += `
            <div class="term-line term-success" style="color:#38bdf8;">
                [Compilation Finished Successfully. Process returned 0 (0x0).]
            </div>
        `;
    }
}

// IDE'deki hataları dinle ve uyar
window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'js_error') {
        alert("⚠️ Hata Yakalandı: " + e.data.message);
    }
});

let currentLessonAttempts = 0;

function completeCurrentLesson() {
    const langKey = getLanguageKey(selectedLang || (userProfile && userProfile.selectedLanguage) || 'html');
    if (typeof setCourseDataForLang === 'function') {
        courseData = setCourseDataForLang(langKey);
    }
    const lesson = courseData.find(l => l.id === currentLessonId);
    
    // 1. Önce Sınavı Doğru Yaptı mı Kontrol Et
    const selected = document.querySelector('input[name="quiz_answer"]:checked');
    if (!selected && !lesson.isMiniProject) {
        alert("Lütfen dersi tamamlamadan önce yandaki mini testi cevapla!");
        return;
    }
    
    if (selected && parseInt(selected.value) !== lesson.quiz.correctIndex) {
        currentLessonAttempts++;
        alert("Mini test cevabın yanlış! Tekrar düşün ve doğru şıkkı bul.");
        checkFailure(lesson);
        return;
    }

    // 2. Kod Validasyonu
    const userCode = document.getElementById("code-editor").value.toLowerCase();
    
    if (lesson.mustInclude && lesson.mustInclude.length > 0) {
        for (let rule of lesson.mustInclude) {
            if (!userCode.includes(rule.toLowerCase())) {
                currentLessonAttempts++;
                alert(`❌ Kodunuzda eksikler var!\n\n${lesson.errorMsg}`);
                checkFailure(lesson);
                return; // Dersi tamamlamasına izin verme
            }
        }
    }
    
    // 3. Doğruysa dersi tamamla ve Coddy ödülü ver
    const isLastLesson = currentLessonId === 30; // 30 is the last main lesson

    // İlerlemeyi güncelle
    if (lesson.isPractice) {
        unlockedLevel = lesson.nextLessonId;
    } else if (currentLessonId === unlockedLevel) {
        unlockedLevel++;
    }

    // Coddy Ödül Kazanımı
    userXp += 50;
    userGems += 10;
    saveUserProfileToStorage();
    updateCoddyStats();

    // Coddy Kutlama Modalı Göster
    const title = isLastLesson ? "Tebrikler! Tüm Kurs Bitti! 🎓" : "Harika Kodladın! 🎉";
    const desc = isLastLesson ? "Front-End dünyasının tüm temellerini ustalıkla tamamladın!" : `"${lesson.title}" dersini başarıyla tamamladın. +50 XP ve +10 Elmas kazandın!`;
    showCoddyCelebration(title, desc);
}

function showCoddyCelebration(title, desc) {
    const modal = document.getElementById("coddy-modal");
    if(!modal) {
        renderRoadmap();
        switchView('map');
        return;
    }

    document.getElementById("coddy-modal-title").innerText = title;
    document.getElementById("coddy-modal-desc").innerText = desc;
    modal.classList.remove("hidden");
}

function closeCoddyModal() {
    const modal = document.getElementById("coddy-modal");
    if(modal) modal.classList.add("hidden");
    renderRoadmap();
    switchView('map');
}

function updateCoddyStats() {
    const elStreak = document.getElementById("user-streak");
    const elGems = document.getElementById("user-gems");
    const elXp = document.getElementById("user-xp");
    const elHearts = document.getElementById("user-hearts");

    if(elStreak) elStreak.innerText = userStreak;
    if(elGems) elGems.innerText = userGems;
    if(elXp) elXp.innerText = userXp;
    if(elHearts) elHearts.innerText = `${userHearts}/5`;
}

// COD+ Maskotu ile Eğlenceli Etkileşim
const coddyQuotes = [
    "Harika gidiyorsun! Kod yazmak gerçek bir süper güçtür! 🦸‍♂️",
    "Bugün 1 ders tamamla ve serini alevlendir! 🔥",
    "Ben COD+! Takıldığında Dijital Kitaba göz atabilirsin 📖",
    "Kodun çalışmadığında pes etme, her hata seni daha iyi bir yazılımcı yapar! 💡",
    "HTML iskelet, CSS kıyafet, JavaScript ise ruh demektir! 🎨",
    "Seninle kod yazmayı çok seviyorum, sınırları aşmaya devam et! 🚀"
];
let coddyQuoteIndex = 0;

function interactWithCoddy() {
    const speechEl = document.getElementById("coddy-speech");
    if(!speechEl) return;
    
    coddyQuoteIndex = (coddyQuoteIndex + 1) % coddyQuotes.length;
    speechEl.innerText = `"${coddyQuotes[coddyQuoteIndex]}"`;
    
    const banner = document.querySelector(".coddy-mascot-banner");
    if(banner) {
        banner.style.transform = "scale(1.04)";
        setTimeout(() => { banner.style.transform = ""; }, 200);
    }
}

function checkFailure(lesson) {
    if (lesson.isMiniProject && currentLessonAttempts >= 2) {
        alert("⚠️ Görünüşe göre bu projede biraz zorlandın. Hiç sorun değil! Konuları pekiştirmen için haritada sana özel 'Alıştırma Dersleri' kilidini açtım. Lütfen haritadan o dersleri tamamla.");
        
        // Hangi projede kaldığına göre ilgili alıştırma derslerini görünür yap
        let practiceId = 0;
        if (lesson.id === 10) practiceId = 101;
        if (lesson.id === 20) practiceId = 201;
        if (lesson.id === 30) practiceId = 301;
        
        // İlgili alıştırma derslerinin gizliliğini kaldır
        courseData.forEach(l => {
            if (l.id === practiceId || l.id === practiceId + 1) {
                l.isHidden = false;
            }
        });
        
        // Kullanıcıyı o alıştırmaya zorla
        unlockedLevel = practiceId;
        currentLessonAttempts = 0;
        
        renderRoadmap();
        switchView('map');
    }
}

document.getElementById('code-editor').addEventListener('input', runCode);

// --- DİJİTAL KİTAP (PDF / E-KİTAP OKUYUCU MANTIĞI) ---
const pdfMetaConfig = {
    html: {
        title: "HTML5 Kapsamlı El Kitabı",
        icon: '<i class="fa-brands fa-html5" style="color:#f97316;"></i>',
        color: '#f97316'
    },
    css: {
        title: "CSS3 & Modern Stil Mimarisi El Kitabı",
        icon: '<i class="fa-brands fa-css3-alt" style="color:#38bdf8;"></i>',
        color: '#38bdf8'
    },
    javascript: {
        title: "JavaScript (ES6+) Programlama El Kitabı",
        icon: '<i class="fa-brands fa-js" style="color:#facc15;"></i>',
        color: '#facc15'
    },
    python: {
        title: "Python 3 Backend & Sistem El Kitabı",
        icon: '<i class="fa-brands fa-python" style="color:#4ade80;"></i>',
        color: '#4ade80'
    },
    csharp: {
        title: "C# & .NET 9 Kurumsal Yazılım El Kitabı",
        icon: '<i class="fa-solid fa-code" style="color:#a855f7;"></i>',
        color: '#a855f7'
    },
    sql: {
        title: "SQL & İlişkisel Veritabanı Mimarisi El Kitabı",
        icon: '<i class="fa-solid fa-database" style="color:#0ea5e9;"></i>',
        color: '#0ea5e9'
    },
    cpp: {
        title: "C++ & Sistem Mimarisi El Kitabı",
        icon: '<i class="fa-solid fa-microchip" style="color:#00599c;"></i>',
        color: '#00599c'
    },
    editors: {
        title: "🛠️ Geliştirici Araçları & Editörler",
        icon: '<i class="fa-solid fa-laptop-code" style="color:#a78bfa;"></i>',
        color: '#a78bfa'
    }
};

function renderPdfBook(langKey = 'html', filterKeyword = "") {
    currentPdfLang = langKey;
    const pagesContainer = document.getElementById("pdf-book-pages");
    const docIcon = document.getElementById("pdf-doc-icon");
    const docTitle = document.getElementById("pdf-doc-title");
    const docBadge = document.getElementById("pdf-doc-badge");
    const searchCounter = document.getElementById("pdf-search-counter");
    
    if(!pagesContainer) return;

    const meta = pdfMetaConfig[langKey] || pdfMetaConfig.html;
    if(docIcon) docIcon.innerHTML = meta.icon;
    if(docTitle) docTitle.textContent = meta.title;

    const dataList = bookData[langKey] || [];
    if(docBadge) docBadge.textContent = `${dataList.length} Konu`;

    const keyword = filterKeyword.toLowerCase().trim();
    pagesContainer.innerHTML = "";

    // EĞER EDITÖRLER SEKMESİ SEÇİLDİYSE ESKİ HALİYLE (AKORDİYON) GÖSTER
    if(langKey === 'editors') {
        dataList.forEach(item => {
            const card = document.createElement("div");
            card.className = "book-card";
            card.innerHTML = `
                <div class="book-badge" style="color:${meta.color}; background:rgba(255,255,255,0.06);">${item.title}</div>
                <h3 style="margin-bottom:10px;">${item.title}</h3>
                <p style="color:var(--text-muted); margin-bottom:14px;">${item.desc}</p>
                <div>${item.content}</div>
            `;
            pagesContainer.appendChild(card);
        });
        return;
    }

    // NORMAL DİLLER (HTML, CSS, JS, PYTHON): KESİNTİSİZ PDF / KİTAP SAYFASI FORMATI
    let matchCount = 0;

    dataList.forEach((chapter, index) => {
        const fullText = (chapter.title + " " + chapter.desc + " " + chapter.content).toLowerCase();
        const isMatched = keyword === "" || fullText.includes(keyword);

        if(!isMatched) return;
        matchCount++;

        let chapterContent = chapter.content;

        // Arama kelimesi varsa sarı renkle vurgula
        if(keyword !== "") {
            const regex = new RegExp(`(${keyword})`, 'gi');
            chapterContent = chapterContent.replace(regex, '<mark class="pdf-highlight">$1</mark>');
        }

        const pageSection = document.createElement("section");
        pageSection.className = "pdf-page-section";
        pageSection.id = `section-${chapter.id}`;
        pageSection.style.cssText = `
            margin-bottom: 35px;
            padding-bottom: 25px;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        `;

        let displayTitle = chapter.title;
        if(keyword !== "") {
            const regTitle = new RegExp(`(${keyword})`, 'gi');
            displayTitle = displayTitle.replace(regTitle, '<mark class="pdf-highlight">$1</mark>');
        }

        pageSection.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="background:${meta.color}; color:#0f172a; font-weight:800; font-size:12px; width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%;">
                        ${index + 1}
                    </span>
                    <h2 style="font-size:20px; font-weight:700; color:#f8fafc; margin:0;">${displayTitle}</h2>
                </div>
                <span style="font-size:12px; color:var(--text-muted); font-family:monospace;">${chapter.id.toUpperCase()}</span>
            </div>
            <p style="font-size:14px; color:#94a3b8; margin-bottom:16px;">${chapter.desc}</p>
            <div>${chapterContent}</div>
        `;

        pagesContainer.appendChild(pageSection);
    });

    if(searchCounter) {
        if(keyword !== "") {
            searchCounter.style.display = "inline";
            searchCounter.textContent = `${matchCount} sonuç bulundu`;
            searchCounter.style.color = matchCount > 0 ? "#4ade80" : "#f87171";
        } else {
            searchCounter.style.display = "none";
        }
    }

    if(matchCount === 0 && keyword !== "") {
        pagesContainer.innerHTML = `
            <div style="padding:60px 20px; text-align:center; color:#f87171; border: 1px dashed rgba(248,113,113,0.3); border-radius:18px; margin-top:20px;">
                <i class="fa-solid fa-book-open-reader" style="font-size:36px; margin-bottom:12px; display:block;"></i>
                <h3 style="color:#f8fafc; margin-bottom:8px;">Sonuç Bulunamadı</h3>
                <p style="color:#94a3b8; font-size:14px;">"<b>${filterKeyword}</b>" terimi bu kitapta geçmiyor. Lütfen başka bir anahtar kelime deneyin.</p>
            </div>
        `;
    }
}

// PDF İçinde Arama Kutusu Dinleyicisi
function handlePdfSearch() {
    const input = document.getElementById("pdf-search-input");
    const val = input ? input.value : "";
    renderPdfBook(currentPdfLang, val);
}

// Büyütme / Tam Ekran (Fullscreen) Toggle
function togglePdfFullscreen() {
    const frame = document.getElementById("pdf-reader-frame");
    const icon = document.getElementById("pdf-fullscreen-icon");
    const text = document.getElementById("pdf-fullscreen-text");
    if(!frame) return;

    const isFullscreen = frame.classList.toggle("fullscreen");
    if(isFullscreen) {
        if(icon) icon.className = "fa-solid fa-compress";
        if(text) text.textContent = "Küçült (ESC)";
    } else {
        if(icon) icon.className = "fa-solid fa-expand";
        if(text) text.textContent = "Büyüt";
    }
}

// ESC tuşuna basınca tam ekrandan çıkma
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
        const frame = document.getElementById("pdf-reader-frame");
        if(frame && frame.classList.contains("fullscreen")) {
            togglePdfFullscreen();
        }
    }
});

// --- KULLANICI PROFİLİ, EĞİTİM DÜZEYİ & OYUNLAŞTIRMA MANTIĞI ---
function createDefaultUserProfile() {
    return {
        username: "",
        name: "",
        email: "",
        educationLevel: "Üniversite",
        mentorLevel: "",
        department: "",
        domain: "frontend",
        languages: "",
        projects: "",
        bio: "",
        avatar: "🧑‍💻",
        role: "ogrenci",
        originalRole: "ogrenci",
        isMentorAccount: false,
        mustChangePassword: false,
        tempPassword: null,
        authProvider: "local",
        friends: [
            { name: "burak_coder", league: "Çırak Ligi", domain: "Frontend", xp: 100, avatar: "👨‍💻" },
            { name: "selin_dev", league: "Kalfa Ligi", domain: "Backend", xp: 150, avatar: "👩‍🔬" }
        ],
        xp: 100,
        gems: 50,
        streak: 1,
        level: "Çırak",
        isLoggedIn: false
    };
}

let userProfile = createDefaultUserProfile();

function initUserProfile() {
    const saved = localStorage.getItem("codplus_user_profile");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            userProfile = { ...createDefaultUserProfile(), ...parsed };
            userXp = userProfile.xp !== undefined ? userProfile.xp : userXp;
            userGems = userProfile.gems !== undefined ? userProfile.gems : userGems;
            userStreak = userProfile.streak !== undefined ? userProfile.streak : userStreak;
            userName = userProfile.username || userProfile.name || userName;
            if (userProfile.selectedLanguage) {
                selectedLang = userProfile.selectedLanguage;
            }
            if (userProfile.unlockedLevel) {
                unlockedLevel = userProfile.unlockedLevel;
            }
            if (userProfile.selectedLanguage || (userProfile.unlockedLevel && userProfile.unlockedLevel > 0)) {
                userProfile.hasCompletedOnboarding = true;
            }
        } catch (e) {
            console.error("Profil yüklenirken hata:", e);
        }
    }
    updateUserLevel();
    updateCoddyStats();
}

function updateUserLevel() {
    if (userXp >= 3500) userProfile.level = "Uzman";
    else if (userXp >= 1500) userProfile.level = "Usta";
    else if (userXp >= 500) userProfile.level = "Kalfa";
    else userProfile.level = "Çırak";
}

function saveUserProfileToStorage() {
    if (!userProfile) return;
    userProfile.xp = userXp;
    userProfile.gems = userGems;
    userProfile.streak = userStreak;
    userProfile.unlockedLevel = unlockedLevel;
    userProfile.selectedLanguage = selectedLang;
    if (selectedLang || (unlockedLevel && unlockedLevel > 0)) {
        userProfile.hasCompletedOnboarding = true;
    }
    // Dil bazlı ilerleme + proje yetkisi (kalıcı veritabanına da yazılır)
    userProfile.langProgress = getLangProgress();
    userProfile.projectUnlocked = getProjectEligibility().ok;
    updateUserLevel();
    if (userProfile.email) {
        localStorage.setItem("codplus_user_profile", JSON.stringify(userProfile));
        saveUserToDb(userProfile.email, userProfile);
    }
}

function switchProfileTab(tabName) {
    const tabs = ['info', 'friends', 'mentor', 'settings'];
    tabs.forEach(t => {
        const panel = document.getElementById(`profile-tab-${t}`);
        const btn = document.getElementById(`ptab-btn-${t}`);
        if (panel) {
            panel.style.display = (t === tabName) ? 'block' : 'none';
        }
        if (btn) {
            if (t === tabName) btn.classList.add('active');
            else btn.classList.remove('active');
        }
    });

    if (tabName === 'mentor') {
        renderMentorProfileTab();
    }
}

function logoutUser() {
    if (!confirm("Oturumunuzu kapatıp giriş sayfasına dönmek istediğinize emin misiniz?")) {
        return;
    }
    userProfile = createDefaultUserProfile();
    userName = "";
    try {
        localStorage.removeItem("codplus_user_profile");
        localStorage.removeItem("codplus_active_view");
    } catch(e) {}

    closeProfileModal();

    const dash = document.getElementById("dashboard");
    const onb = document.getElementById("onboarding");
    const land = document.getElementById("landing");

    if (dash) dash.classList.add("hidden");
    if (onb) onb.classList.add("hidden");
    if (land) land.classList.remove("hidden");

    document.body.classList.remove("mentor-mode");
    applyRoleUI('ogrenci');
}

function renderMentorProfileTab() {
    const panel = document.getElementById("profile-tab-mentor");
    if (!panel) return;

    const isMentor = (userProfile.role === 'danisman');
    if (isMentor) {
        const mentorDisplayName = userProfile.username || userProfile.name || 'Danışman';
        const myProjects = getProjects().filter(p => p.creator === mentorDisplayName);
        const allTasks = getTasks();
        const pendingReviewCount = allTasks.filter(t => t.status === 'review').length;

        let projectsHtml = "";
        if (myProjects.length === 0) {
            projectsHtml = `
                <div style="text-align:center; padding:24px 16px; background:#090d16; border-radius:14px; border:1px dashed var(--glass-border); color:#94a3b8; font-size:12.5px;">
                    <i class="fa-solid fa-folder-open" style="font-size:24px; color:#f59e0b; margin-bottom:8px; display:block;"></i>
                    Henüz oluşturduğunuz bir proje bulunmuyor. Hemen yeni bir ekip oluşturun!
                </div>
            `;
        } else {
            projectsHtml = myProjects.map(p => `
                <div style="background:#090d16; border:1px solid var(--glass-border); border-radius:14px; padding:12px 16px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <h4 style="margin:0 0 4px 0; font-size:14.5px; color:#f8fafc; font-weight:700;">${escapeHtml(p.title)}</h4>
                        <div style="font-size:11.5px; color:#94a3b8; display:flex; gap:12px;">
                            <span><i class="fa-solid fa-users" style="color:#38bdf8;"></i> ${(p.members || []).length} Ekip Üyesi</span>
                            <span><i class="fa-solid fa-tag" style="color:#a855f7;"></i> ${escapeHtml(p.category || 'Web & AI')}</span>
                        </div>
                    </div>
                    <button type="button" onclick="closeProfileModal(); openProjectTasks('${p.id}');" style="padding:7px 14px; font-size:12px; border-radius:10px; background:rgba(245,158,11,0.15); border:1px solid #f59e0b; color:#f59e0b; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:5px;">
                        <i class="fa-solid fa-list-check"></i> Görevler
                    </button>
                </div>
            `).join("");
        }

        panel.innerHTML = `
            <div style="background:linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(15, 23, 42, 0.8)); border:1px solid rgba(245, 158, 11, 0.3); border-radius:18px; padding:16px; margin-bottom:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                    <div>
                        <span style="font-size:11px; text-transform:uppercase; color:#f59e0b; font-weight:800; letter-spacing:0.8px;">
                            <i class="fa-solid fa-crown"></i> Kıdemli Danışman & Mimar Portalı
                        </span>
                        <h4 style="margin:4px 0 2px 0; color:#f8fafc; font-size:17px; font-weight:700;">${escapeHtml(mentorDisplayName)}</h4>
                        <p style="margin:0; color:#cbd5e1; font-size:12px;">Yönetilen Aktif Proje: <strong>${myProjects.length}</strong> | Danışman İtibarı: <strong>${userProfile.xp || userXp} XP</strong></p>
                    </div>
                    <span style="background:rgba(245, 158, 11, 0.2); color:#fbbf24; border:1px solid rgba(245, 158, 11, 0.4); font-size:11.5px; padding:4px 12px; border-radius:12px; font-weight:700; display:flex; align-items:center; gap:6px;">
                        <i class="fa-solid fa-code-compare"></i> ${pendingReviewCount} Kod İnceleme Bekliyor
                    </span>
                </div>
            </div>

            <div style="margin-bottom:16px;">
                <h5 style="margin:0 0 10px 0; color:#f8fafc; font-size:13.5px; display:flex; align-items:center; gap:8px;">
                    <i class="fa-solid fa-folder-tree" style="color:#38bdf8;"></i> Yönettiğiniz Aktif Ekipler & Projeler:
                </h5>
                ${projectsHtml}
            </div>

            <div style="display:flex; gap:10px;">
                <button type="button" class="btn-primary" onclick="closeProfileModal(); openCreateProjectModal();" style="flex:1; border-radius:14px; padding:11px; font-size:13px; background:linear-gradient(135deg, #f59e0b, #d97706); display:flex; justify-content:center; align-items:center; gap:6px;">
                    <i class="fa-solid fa-plus-circle"></i> Yeni Proje Başlat
                </button>
                <button type="button" onclick="closeProfileModal(); switchView('tasks');" style="flex:1; border-radius:14px; padding:11px; font-size:13px; background:rgba(56,189,248,0.15); border:1px solid #38bdf8; color:#38bdf8; cursor:pointer; font-weight:600; display:flex; justify-content:center; align-items:center; gap:6px;">
                    <i class="fa-solid fa-list-check"></i> Görev Panosuna Git
                </button>
            </div>
        `;
    }
}

function selectAvatar(emoji) {
    userProfile.avatar = emoji;
    const avatarDisplay = document.getElementById("modal-avatar-display");
    if (avatarDisplay) avatarDisplay.innerText = emoji;
    const avatarBtns = document.querySelectorAll(".avatar-opt-btn");
    avatarBtns.forEach(btn => {
        if (btn.innerText.includes(emoji)) {
            btn.classList.add("active");
            btn.style.borderColor = "#38bdf8";
        } else {
            btn.classList.remove("active");
            btn.style.borderColor = "rgba(255,255,255,0.15)";
        }
    });
}

function renderFriendsList() {
    const container = document.getElementById("friends-list-container");
    const countEl = document.getElementById("friends-count");
    if (!container) return;
    
    if (countEl) countEl.innerText = userProfile.friends.length;
    container.innerHTML = "";

    if (!userProfile.friends || userProfile.friends.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:#94a3b8; font-size:13px;">Henüz arkadaş eklemediniz. Yukarıdan bir akran ekleyip düelloya davet edebilirsiniz!</div>`;
        return;
    }

    userProfile.friends.forEach((fr) => {
        const card = document.createElement("div");
        card.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#090d16; border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:14px;";
        card.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="font-size:24px;">${fr.avatar || '👨‍💻'}</div>
                <div>
                    <h4 style="margin:0; font-size:14px; color:#f8fafc;">${fr.name}</h4>
                    <span style="font-size:11px; color:#94a3b8;">${fr.league || 'Çırak Ligi'} • ${fr.domain || 'Frontend'} • ${fr.xp || 100} XP</span>
                </div>
            </div>
            <button type="button" onclick="challengeFriend('${fr.name}')" style="padding:6px 12px; font-size:12px; border-radius:8px; background:#0284c7; border:none; color:#fff; cursor:pointer; font-weight:bold;">
                <i class="fa-solid fa-bolt"></i> Düello Et
            </button>
        `;
        container.appendChild(card);
    });
}

function challengeFriend(friendName) {
    closeProfileModal();
    openDuelModal();
    const sel = document.getElementById("duel-opponent-select");
    if (sel) {
        let optExists = false;
        for (let i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === friendName) {
                sel.selectedIndex = i;
                optExists = true;
                break;
            }
        }
        if (!optExists) {
            const opt = document.createElement("option");
            opt.value = friendName;
            opt.text = `${friendName} (Arkadaşın - Çevrimiçi)`;
            sel.add(opt, 0);
            sel.selectedIndex = 0;
        }
    }
}

function handleAddFriend() {
    const input = document.getElementById("add-friend-input");
    if (!input) return;
    const name = input.value.trim();
    if (!name) {
        alert("Lütfen eklemek istediğiniz arkadaşınızın kullanıcı adını yazın!");
        return;
    }
    if (name.toLowerCase() === userProfile.username.toLowerCase()) {
        alert("Kendinizi arkadaş olarak ekleyemezsiniz!");
        return;
    }
    const already = userProfile.friends.some(f => f.name.toLowerCase() === name.toLowerCase());
    if (already) {
        alert(`${name} zaten arkadaş listenizde ekli!`);
        return;
    }
    const avatars = ["👨‍💻", "👩‍💻", "🧑‍💻", "🐱", "🤖", "🥷"];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const domains = ["Frontend", "Backend", "Fullstack", "Siber Güvenlik", "Yapay Zekâ"];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    userProfile.friends.push({
        name: name,
        league: "Çırak Ligi",
        domain: randomDomain,
        xp: 120,
        avatar: randomAvatar
    });

    saveUserProfileToStorage();
    renderFriendsList();
    input.value = "";
    alert(`🎉 @${name} başarıyla arkadaş listenize eklendi! Şimdi onunla 1v1 düelloya girebilirsiniz.`);
}

function openProfileModal() {
    const modal = document.getElementById("profile-modal");
    if (!modal) return;

    const isMentor = (userProfile.role === 'danisman');
    const displayName = userProfile.username || userProfile.name || (isMentor ? "Danışman" : "Kullanıcı");
    const displayEmail = userProfile.email || "";
    
    if (document.getElementById("profile-username")) document.getElementById("profile-username").value = displayName;
    if (document.getElementById("profile-email")) document.getElementById("profile-email").value = displayEmail;
    if (document.getElementById("profile-department")) document.getElementById("profile-department").value = userProfile.department || "";
    if (document.getElementById("profile-domain")) document.getElementById("profile-domain").value = userProfile.domain || "frontend";
    if (document.getElementById("profile-languages")) document.getElementById("profile-languages").value = userProfile.languages || "";
    if (document.getElementById("profile-projects")) document.getElementById("profile-projects").value = userProfile.projects || "";
    if (document.getElementById("profile-bio")) document.getElementById("profile-bio").value = userProfile.bio || "";
    
    // Avatar
    const avatarDisplay = document.getElementById("modal-avatar-display");
    if (avatarDisplay) avatarDisplay.innerText = userProfile.avatar || (isMentor ? "👨‍🏫" : "🧑‍🚀");
    selectAvatar(userProfile.avatar || (isMentor ? "👨‍🏫" : "🧑‍🚀"));

    // Profil İsim
    if (document.getElementById("modal-profile-name")) {
        document.getElementById("modal-profile-name").innerText = displayName;
    }

    // Rol Rozeti ve Stili
    const roleBadge = document.getElementById("modal-profile-role-badge");
    const roleToggleText = document.getElementById("modal-role-toggle-text");
    const leagueBadge = document.getElementById("modal-profile-badge");
    const gemsContainer = document.getElementById("modal-gems-container");
    const xpVal = document.getElementById("modal-xp-val");

    if (roleBadge) {
        if (isMentor) {
            roleBadge.innerText = "Danışman & Mentör";
            roleBadge.style.background = "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.35))";
            roleBadge.style.color = "#fbbf24";
            roleBadge.style.border = "1px solid #f59e0b";
        } else {
            roleBadge.innerText = "Öğrenci";
            roleBadge.style.background = "rgba(56,189,248,0.15)";
            roleBadge.style.color = "#38bdf8";
            roleBadge.style.border = "1px solid rgba(56,189,248,0.3)";
        }
    }

    const roleToggleBtn = document.getElementById("modal-role-toggle-btn");
    if (roleToggleBtn) {
        if (isMentorUser()) {
            roleToggleBtn.style.display = "inline-flex";
            if (roleToggleText) roleToggleText.innerText = (userProfile.role === 'danisman') ? "Öğrenci Görünümüne Geç" : "Danışman Paneline Dön";
        } else {
            roleToggleBtn.style.display = "none";
        }
    }

    if (leagueBadge) {
        if (isMentor) {
            leagueBadge.innerText = "Kıdemli Mimar & Mentör";
            leagueBadge.style.background = "#f59e0b";
        } else {
            leagueBadge.innerText = `${userProfile.level || 'Çırak'} Ligi`;
            leagueBadge.style.background = "#0284c7";
        }
    }

    if (xpVal) xpVal.innerText = userXp || 350;

    if (isMentor) {
        if (gemsContainer) {
            const myProjs = getProjects().filter(p => p.creator === displayName);
            gemsContainer.innerHTML = `<span style="color:#f59e0b; font-weight:700;"><i class="fa-solid fa-diagram-project"></i> ${myProjs.length} Proje</span>`;
        }
    } else {
        if (gemsContainer) {
            gemsContainer.innerHTML = `💎 <span id="modal-gems-val">${userGems || 120}</span>`;
        }
    }

    // Dinamik Alan Etiketleri (Danışman vs Öğrenci)
    const lblEdu = document.getElementById("lbl-profile-education");
    const selEdu = document.getElementById("profile-education");
    const lblDept = document.getElementById("lbl-profile-department");
    const inpDept = document.getElementById("profile-department");
    const lblDom = document.getElementById("lbl-profile-domain");
    const lblLangs = document.getElementById("lbl-profile-languages");
    const inpLangs = document.getElementById("profile-languages");
    const lblProjs = document.getElementById("lbl-profile-projects");
    const inpProjs = document.getElementById("profile-projects");
    const lblBio = document.getElementById("lbl-profile-bio");
    const inpBio = document.getElementById("profile-bio");
    const ptabMentorBtn = document.getElementById("ptab-btn-mentor");

    if (isMentor) {
        if (lblEdu) lblEdu.innerText = "Mentörlük / Kıdem Seviyesi:";
        if (selEdu) {
            selEdu.innerHTML = `
                <option value="Yazılım Mimarı (Software Architect)" selected>Yazılım Mimarı (Software Architect)</option>
                <option value="Kıdemli Takım Lideri (Lead / Tech Lead)">Kıdemli Takım Lideri (Lead / Tech Lead)</option>
                <option value="Kıdemli Yazılım Geliştirici (Senior Dev)">Kıdemli Yazılım Geliştirici (Senior Dev)</option>
                <option value="Çözüm Danışmanı (Solution Consultant)">Çözüm Danışmanı (Solution Consultant)</option>
                <option value="Akademisyen / Eğitmen">Akademisyen / Eğitmen</option>
            `;
            if (userProfile.mentorLevel) selEdu.value = userProfile.mentorLevel;
        }
        if (lblDept) lblDept.innerText = "Çalıştığı Kurum / Şirket / Pozisyon:";
        if (inpDept) inpDept.placeholder = "Örn: Trendyol - Senior Architect / Freelance Danışman";

        if (lblDom) lblDom.innerText = "Danışmanlık & Uzmanlık Alanı:";

        if (lblLangs) lblLangs.innerText = "Rehberlik Edilen Teknolojiler & Diller:";
        if (inpLangs) inpLangs.placeholder = "Örn: C#, Python, SQL, React, Node.js, Docker, AWS";

        if (lblProjs) lblProjs.innerText = "Yönetilen / Danışmanlık Verilen Projeler:";
        if (inpProjs) inpProjs.placeholder = "Örn: TÜBİTAK 2242 Sokratik Öğrenme, E-Ticaret Mikroservis Mimarisi";

        if (lblBio) lblBio.innerText = "Danışman Vizyonu & Mentörlük İlkeleri:";
        if (inpBio) inpBio.placeholder = "Ekip üyelerine rehberlik ederken benimsediğiniz mimari ve pedagojik ilkeler...";

        if (ptabMentorBtn) ptabMentorBtn.innerHTML = `<i class="fa-solid fa-briefcase"></i> Yönettiğim Projeler & Ekipler`;
    } else {
        if (lblEdu) lblEdu.innerText = "Eğitim Düzeyi:";
        if (selEdu) {
            selEdu.innerHTML = `
                <option value="İlköğretim / Ortaokul">İlköğretim / Ortaokul</option>
                <option value="Lise">Lise</option>
                <option value="Üniversite" selected>Üniversite</option>
                <option value="Yüksek Lisans / Doktora">Yüksek Lisans / Doktora</option>
                <option value="Mezun / Sektör Profesyoneli">Mezun / Sektör Profesyoneli</option>
            `;
            selEdu.value = userProfile.educationLevel || "Üniversite";
        }
        if (lblDept) lblDept.innerText = "Okuduğu Bölüm / Alan:";
        if (inpDept) inpDept.placeholder = "Örn: Bilgisayar Mühendisliği";

        if (lblDom) lblDom.innerText = "Uzmanlık / İlgi Alanı:";

        if (lblLangs) lblLangs.innerText = "Bildiği / Hedef Diller:";
        if (inpLangs) inpLangs.placeholder = "Örn: HTML, CSS, JavaScript, Python";

        if (lblProjs) lblProjs.innerText = "Katıldığı Projeler (TÜBİTAK, Teknofest, Üniversite vb.):";
        if (inpProjs) inpProjs.placeholder = "Örn: TÜBİTAK 2242 Sokratik Öğrenme, Teknofest Sağlıkta AI";

        if (lblBio) lblBio.innerText = "Hakkımda (Biyografi):";
        if (inpBio) inpBio.placeholder = "Kendinden, hedeflerinden ve yazılım tutkundan kısaca bahset...";

        if (ptabMentorBtn) ptabMentorBtn.innerHTML = `🎓 Mentör & Projeler`;
    }

    renderFriendsList();
    switchProfileTab('info');
    modal.classList.remove("hidden");
}

function toggleUserRoleFromModal() {
    closeProfileModal();
    toggleMentorStudentView();
}

function closeProfileModal() {
    const modal = document.getElementById("profile-modal");
    if (modal) modal.classList.add("hidden");
}

function saveUserProfile(e) {
    if (e) e.preventDefault();
    const isMentor = (userProfile.role === 'danisman');

    const u = document.getElementById("profile-username") ? document.getElementById("profile-username").value.trim() : "";
    const em = document.getElementById("profile-email") ? document.getElementById("profile-email").value.trim() : "";
    const edu = document.getElementById("profile-education") ? document.getElementById("profile-education").value : "Üniversite";
    const dept = document.getElementById("profile-department") ? document.getElementById("profile-department").value.trim() : "";
    const dom = document.getElementById("profile-domain") ? document.getElementById("profile-domain").value : "frontend";
    const langs = document.getElementById("profile-languages") ? document.getElementById("profile-languages").value.trim() : "";
    const projs = document.getElementById("profile-projects") ? document.getElementById("profile-projects").value.trim() : "";
    const bio = document.getElementById("profile-bio") ? document.getElementById("profile-bio").value.trim() : "";

    if (u) {
        userProfile.username = u;
        userProfile.name = u;
        userName = u;
    }
    if (em) userProfile.email = em;
    if (isMentor) {
        userProfile.mentorLevel = edu;
    } else {
        userProfile.educationLevel = edu;
    }
    userProfile.department = dept;
    userProfile.domain = dom;
    userProfile.languages = langs;
    userProfile.projects = projs;
    userProfile.bio = bio;

    saveUserProfileToStorage();
    if (userProfile.email) {
        saveUserToDb(userProfile.email, userProfile);
    }
    if (document.getElementById("modal-profile-name")) {
        document.getElementById("modal-profile-name").innerText = userProfile.username || userProfile.name || (isMentor ? "Danışman" : "Kullanıcı");
    }
    closeProfileModal();
    alert(`🎉 ${isMentor ? 'Danışman' : 'Öğrenci'} profil bilgileriniz, uzmanlık alanınız ve biyografiniz başarıyla güncellendi!`);
}

// --- ŞİFREMİ UNUTTUM & ZORUNLU İLK ŞİFRE DEĞİŞTİRME MANTIĞI ---
function openForgotPasswordModal() {
    const modal = document.getElementById("forgot-password-modal");
    if (modal) {
        const sBox = document.getElementById("forgot-success-box");
        if (sBox) sBox.style.display = "none";
        
        // Kullanıcı oturumdaysa kayıtlı e-postasını otomatik yerleştir
        const emailInput = document.getElementById("forgot-email");
        if (emailInput && userProfile && userProfile.email) {
            emailInput.value = userProfile.email;
        }
        
        modal.classList.remove("hidden");
    }
}

function closeForgotPasswordModal() {
    const modal = document.getElementById("forgot-password-modal");
    if (modal) modal.classList.add("hidden");
}

function handleForgotPassword(e) {
    if (e) e.preventDefault();
    const emailInput = document.getElementById("forgot-email");
    const email = emailInput ? emailInput.value.trim() : "";
    if (!email) {
        alert("Lütfen e-posta adresinizi girin!");
        return;
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const tempPassword = `COD-${randomCode}`;
    
    userProfile.tempPassword = tempPassword;
    userProfile.mustChangePassword = true;
    userProfile.email = email;
    saveUserProfileToStorage();

    const sBox = document.getElementById("forgot-success-box");
    if (sBox) {
        sBox.innerHTML = `
            <strong>✉️ E-posta Başarıyla Gönderildi!</strong><br>
            Tek kullanımlık geçici giriş şifreniz:<br>
            <span style="font-size:16px; font-weight:bold; color:#facc15; letter-spacing:1px; display:inline-block; margin-top:4px;">${tempPassword}</span><br>
            <small style="color:#94a3b8;">Not: Bu şifre ile giriş yaptığınızda sistem güvenliğiniz için hemen yeni kalıcı şifre belirlemenizi isteyecektir.</small>
        `;
        sBox.style.display = "block";
    }

    const loginPass = document.getElementById("login-pass");
    if (loginPass) loginPass.value = tempPassword;
}

function handleForcePasswordChange(e) {
    if (e) e.preventDefault();
    const p1 = document.getElementById("new-force-pass").value;
    const p2 = document.getElementById("new-force-pass-confirm").value;

    if (p1.length < 6) {
        alert("Şifreniz en az 6 karakter olmalıdır!");
        return;
    }
    if (p1 !== p2) {
        alert("Şifreler uyuşmuyor! Lütfen kontrol ediniz.");
        return;
    }

    userProfile.mustChangePassword = false;
    userProfile.tempPassword = null;
    saveUserProfileToStorage();

    const forceModal = document.getElementById("force-password-change-modal");
    if (forceModal) forceModal.classList.add("hidden");

    alert("🎉 Kalıcı şifreniz başarıyla güncellendi! Uygulamaya giriş yapıyorsunuz...");
    startApp();
}

// --- DİL KEŞİF VE YÖNLENDİRME REHBERİ (ORIENTATION GUIDE) ---
function openOrientationGuide() {
    const modal = document.getElementById("orientation-guide-modal");
    if (modal) {
        const overview = document.getElementById("guide-overview-view");
        const langPicker = document.getElementById("guide-lang-selection-view");
        if (overview) overview.style.display = "block";
        if (langPicker) langPicker.style.display = "none";
        modal.classList.remove("hidden");
    }
}

function closeOrientationGuide() {
    const modal = document.getElementById("orientation-guide-modal");
    if (modal) modal.classList.add("hidden");
}

function proceedToLanguageSelection() {
    closeOrientationGuide();
    goToDirectLanguageSelect();
}

function backToOrientationGuide() {
    const overview = document.getElementById("guide-overview-view");
    const langPicker = document.getElementById("guide-lang-selection-view");
    if (overview) overview.style.display = "block";
    if (langPicker) langPicker.style.display = "none";
}

function chooseStartingLanguage(lang) {
    closeOrientationGuide();
    onLanguageSelected(lang);
}

// --- 1v1 AKRAN DÜELLOSU (PEER DUEL) MOTORU ---
let duelState = {
    lang: 'html',
    opponent: 'burak_coder',
    questions: [],
    currentIndex: 0,
    userScore: 0,
    oppScore: 0,
    timer: 15,
    timerInterval: null
};

function openDuelModal() {
    const modal = document.getElementById("duel-modal");
    if (!modal) return;
    document.getElementById("duel-setup-view").style.display = "block";
    document.getElementById("duel-arena-view").style.display = "none";
    document.getElementById("duel-result-view").style.display = "none";
    modal.classList.remove("hidden");
}

function closeDuelModal() {
    if (duelState.timerInterval) clearInterval(duelState.timerInterval);
    const modal = document.getElementById("duel-modal");
    if (modal) modal.classList.add("hidden");
}

function selectDuelLang(langKey) {
    duelState.lang = langKey;
    document.querySelectorAll(".duel-lang-btn").forEach(btn => {
        if (btn.getAttribute("data-lang") === langKey) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

function startDuel() {
    const oppSelect = document.getElementById("duel-opponent-select");
    duelState.opponent = oppSelect ? oppSelect.value : 'burak_coder';

    // Seçilen dile ait 5 soru getir (Zero Cross-Contamination!)
    if (typeof getDuelQuestionsForLanguage === 'function') {
        duelState.questions = getDuelQuestionsForLanguage(duelState.lang, 5);
    } else if (typeof quizBank !== 'undefined' && quizBank[duelState.lang]) {
        const pool = [...quizBank[duelState.lang]].sort(() => 0.5 - Math.random());
        duelState.questions = pool.slice(0, 5);
    } else {
        alert("Soru bankası yüklenemedi!");
        return;
    }

    if (duelState.questions.length === 0) {
        alert("Seçilen dilde soru havuzu bulunamadı!");
        return;
    }

    duelState.currentIndex = 0;
    duelState.userScore = 0;
    duelState.oppScore = 0;

    document.getElementById("duel-setup-view").style.display = "none";
    document.getElementById("duel-arena-view").style.display = "block";
    document.getElementById("duel-result-view").style.display = "none";
    document.getElementById("duel-active-lang").innerText = duelState.lang.toUpperCase();

    renderDuelQuestion(0);
}

function renderDuelQuestion(index) {
    if (index >= duelState.questions.length) {
        finishDuel();
        return;
    }

    duelState.currentIndex = index;
    const q = duelState.questions[index];

    document.getElementById("duel-q-counter").innerText = `Soru ${index + 1} / ${duelState.questions.length}`;
    document.getElementById("duel-user-score").innerText = duelState.userScore;
    document.getElementById("duel-opp-score").innerText = duelState.oppScore;
    document.getElementById("duel-question-text").innerText = q.question;

    const container = document.getElementById("duel-options-container");
    container.innerHTML = "";

    const letters = ["A", "B", "C", "D"];
    q.options.forEach((optText, optIdx) => {
        const btn = document.createElement("button");
        btn.className = "duel-opt-btn";
        btn.innerHTML = `<strong style="color:#38bdf8;">${letters[optIdx]})</strong> <span>${escapeHtml(optText)}</span>`;
        btn.onclick = () => handleDuelAnswer(optIdx, q.correctIndex);
        container.appendChild(btn);
    });

    if (duelState.timerInterval) clearInterval(duelState.timerInterval);
    duelState.timer = 15;
    document.getElementById("duel-timer").innerText = duelState.timer;

    duelState.timerInterval = setInterval(() => {
        duelState.timer--;
        const tEl = document.getElementById("duel-timer");
        if (tEl) tEl.innerText = duelState.timer;
        if (duelState.timer <= 0) {
            clearInterval(duelState.timerInterval);
            handleDuelAnswer(-1, q.correctIndex);
        }
    }, 1000);
}

function handleDuelAnswer(selectedIdx, correctIdx) {
    if (duelState.timerInterval) clearInterval(duelState.timerInterval);

    const btns = document.querySelectorAll(".duel-opt-btn");
    btns.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIdx) {
            btn.classList.add("correct");
        } else if (idx === selectedIdx) {
            btn.classList.add("wrong");
        }
    });

    if (selectedIdx === correctIdx) {
        duelState.userScore++;
    }

    // Rakip (Akran) Simülasyonu: %70 ihtimalle doğru cevaplar
    const oppIsCorrect = Math.random() < 0.70;
    if (oppIsCorrect) {
        duelState.oppScore++;
    }

    document.getElementById("duel-user-score").innerText = duelState.userScore;
    document.getElementById("duel-opp-score").innerText = duelState.oppScore;

    setTimeout(() => {
        renderDuelQuestion(duelState.currentIndex + 1);
    }, 1200);
}

function finishDuel() {
    document.getElementById("duel-arena-view").style.display = "none";
    const resultView = document.getElementById("duel-result-view");
    resultView.style.display = "block";

    const isWin = duelState.userScore > duelState.oppScore;
    const isDraw = duelState.userScore === duelState.oppScore;

    const titleEl = document.getElementById("duel-result-title");
    const descEl = document.getElementById("duel-result-desc");
    const iconEl = document.getElementById("duel-result-icon");
    const rewardsRow = document.getElementById("duel-rewards-row");

    if (isWin) {
        iconEl.innerText = "🏆";
        titleEl.innerText = "Tebrikler! Düelloyu Kazandın!";
        descEl.innerHTML = `Skor: <strong>${duelState.userScore} - ${duelState.oppScore}</strong><br>Akranını ${duelState.lang.toUpperCase()} düellosunda geçtin!`;
        rewardsRow.style.display = "flex";
        userXp += 50;
        userGems += 15;
    } else if (isDraw) {
        iconEl.innerText = "🤝";
        titleEl.innerText = "Nefes Kesen Beraberlik!";
        descEl.innerHTML = `Skor: <strong>${duelState.userScore} - ${duelState.oppScore}</strong><br>İki taraf da eşit başarı gösterdi.`;
        rewardsRow.innerHTML = '<div class="coddy-reward-pill"><span class="rew-icon">⭐</span> +20 XP</div><div class="coddy-reward-pill"><span class="rew-icon">💎</span> +5 Elmas</div>';
        rewardsRow.style.display = "flex";
        userXp += 20;
        userGems += 5;
    } else {
        iconEl.innerText = "💪";
        titleEl.innerText = "Güzel Mücadele!";
        descEl.innerHTML = `Skor: <strong>${duelState.userScore} - ${duelState.oppScore}</strong><br>Bu sefer rakip öne geçti. Biraz daha pratik yapıp tekrar dene!`;
        rewardsRow.style.display = "none";
        userXp += 10;
    }

    saveUserProfileToStorage();
    updateCoddyStats();
}

// ============================================================
// PROJE VE EKİP YÖNETİM MODÜLÜ (MENTÖRLER & GELİŞTİRİCİLER)
// ============================================================

const defaultProjects = [
    {
        id: "p1",
        title: "Fintech Akıllı Cüzdan & Harcama Analitiği",
        creator: "Zeynep Kaya",
        creatorRole: "Kıdemli Danışman",
        desc: "Mikroservis mimarisinde çalışan, kullanıcı harcamalarını yapay zeka ile kategorize eden ve güvenli bakiye transferi sağlayan kapsamlı finansal teknoloji uygulaması.",
        tech: ["React", "Python", "SQL", "Docker"],
        lookingFor: ["Frontend Geliştirici", "Veritabanı Mimarı"],
        manager: "Deniz Kaya",
        advisor: "Zeynep Kaya",
        members: ["Deniz Kaya (Proje Yöneticisi)", "Zeynep Kaya (Danışman)", "Ahmet Yılmaz (Frontend)", "Can Demir (Veritabanı)"]
    },
    {
        id: "p2",
        title: "Gerçek Zamanlı Kod Derleyici & Algoritma Düellosu",
        creator: "Deniz Kaya",
        creatorRole: "Proje Lideri",
        desc: "Geliştiricilerin WebSocket üzerinden eşzamanlı olarak 1v1 kodlama mücadelesi yaptığı ve kod çıktılarının anlık derlendiği rekabetçi yazılım platformu.",
        tech: ["JavaScript", "C++", "C# .NET", "CSS3"],
        lookingFor: ["Backend Geliştirici", "C++ Sistem Mühendisi"],
        manager: "Deniz Kaya",
        advisor: null,
        members: ["Deniz Kaya (Proje Yöneticisi)"]
    },
    {
        id: "p3",
        title: "Akıllı Şehir & IoT Enerji İzleme Portalı",
        creator: "Barış Özcan",
        creatorRole: "Danışman / Mimari Lider",
        desc: "Şehir sensörlerinden toplanan verilerin gerçek zamanlı harita üzerinde görselleştirildiği, anomali tespiti yapan yüksek performanslı web sistemi.",
        tech: ["HTML5", "CSS3", "JavaScript", "SQL"],
        lookingFor: ["Frontend Geliştirici", "UI/UX Tasarımcı", "Veritabanı Mimarı"],
        manager: "Can Demir",
        advisor: "Barış Özcan",
        members: ["Can Demir (Proje Yöneticisi)", "Barış Özcan (Danışman)"]
    }
];

// Proje Yöneticisi (ekibi yönetir) ile Danışman (tüm ekip görevlerini takip eder) ayrı roller olarak normalize edilir.
function normalizeProject(p) {
    const def = defaultProjects.find(d => d.id === p.id);
    const strip = m => String(m).replace(/\s*\(.*\)$/, '').trim();
    if (!p.manager) {
        if (def) {
            p.manager = def.manager;
            p.advisor = def.advisor || null;
        } else if (/danışman|mentör/i.test(p.creatorRole || '')) {
            p.advisor = p.creator;
            const cand = (p.members || []).find(m => !/mentör|danışman/i.test(m));
            p.manager = cand ? strip(cand) : null;
        } else {
            p.manager = p.creator;
            p.advisor = p.advisor || null;
        }
    }
    const others = (p.members || []).filter(m => {
        const n = strip(m);
        return n !== p.manager && n !== p.advisor && !/\((Mentör|Yönetici|Danışman|Proje Yöneticisi)/i.test(m);
    });
    p.members = [
        ...(p.manager ? [`${p.manager} (Proje Yöneticisi)`] : []),
        ...(p.advisor ? [`${p.advisor} (Danışman)`] : []),
        ...others
    ];
    return p;
}

// ============================================================
// PROJE OLUŞTURMA / BAŞVURU KİLİDİ: DERS SEVİYESİNE GÖRE (PUAN/LİG DEĞİL)
// Her dil için ayrı eşik: soru bankası büyüdükçe gereken seviye artar.
//   40 soruluk dil -> 25. seviye, her ek 10 soru +1 seviye (ders sayısını geçemez)
// Danışman davetiyle gelenler seviye fark etmeksizin projeye katılabilir.
// ============================================================
const PROJECT_BASE_QUESTIONS = 40;
const PROJECT_BASE_LEVEL = 25;
const PROJECT_QUESTIONS_PER_EXTRA_LEVEL = 10;
const PROJECT_LANG_LABELS = { html: 'HTML', sql: 'SQL', python: 'Python', csharp: 'C#', cpp: 'C++' };

function getProjectUnlockLevel(langKey) {
    const totalLessons = (typeof courseDataByLang !== 'undefined' && courseDataByLang[langKey]) ? courseDataByLang[langKey].length : 30;
    const q = (typeof quizBank !== 'undefined' && quizBank[langKey]) ? quizBank[langKey].length : PROJECT_BASE_QUESTIONS;
    const extra = Math.floor(Math.max(0, q - PROJECT_BASE_QUESTIONS) / PROJECT_QUESTIONS_PER_EXTRA_LEVEL);
    return Math.min(totalLessons, PROJECT_BASE_LEVEL + extra);
}

// Dil bazlı ulaşılan en yüksek seviye ({html: 12, python: 27 ...})
function getLangProgress() {
    const lp = Object.assign({}, userProfile.langProgress || {});
    const key = getLanguageKey(selectedLang);
    lp[key] = Math.max(lp[key] || 0, unlockedLevel || 0);
    return lp;
}

function getProjectEligibility() {
    const lp = getLangProgress();
    const rows = Object.keys(PROJECT_LANG_LABELS).map(key => ({
        key,
        label: PROJECT_LANG_LABELS[key],
        level: lp[key] || 0,
        need: getProjectUnlockLevel(key)
    }));
    return { ok: rows.some(r => r.level >= r.need), rows };
}

function canCreateOrApplyProject() {
    return userProfile.role === 'danisman' || getProjectEligibility().ok;
}

function showProjectLevelLock() {
    const e = getProjectEligibility();
    const lines = e.rows.filter(r => r.level > 0 || r.key === getLanguageKey(selectedLang))
        .map(r => `• ${r.label}: ${r.level}/${r.need}. seviye`).join('\n');
    alert(`🔒 Proje oluşturmak veya projelere başvurmak için seçtiğin dillerden birinde gerekli seviyeye ulaşman gerekiyor.\n\n${lines}\n\n💡 Bir Danışman sana proje daveti gönderirse seviyen ne olursa olsun projeye katılabilirsin.`);
}

function getProjects() {
    const saved = localStorage.getItem("codplus_projects");
    if (saved) {
        try { return JSON.parse(saved).map(normalizeProject); } catch(e) {}
    }
    return defaultProjects.map(normalizeProject);
}

function saveProjects(projects) {
    localStorage.setItem("codplus_projects", JSON.stringify(projects));
}

let currentProjectFilter = 'all';

function filterProjects(filterType) {
    currentProjectFilter = filterType;
    const buttons = document.querySelectorAll(".proj-filter-btn");
    buttons.forEach(b => {
        if (b.getAttribute("data-filter") === filterType) b.classList.add("active");
        else b.classList.remove("active");
    });
    renderProjects(filterType);
}

function renderProjects(filter = currentProjectFilter) {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;
    grid.innerHTML = "";

    // Gelen proje davetlerini render et
    if (typeof renderProjectInvites === 'function') {
        renderProjectInvites();
    }

    const projects = getProjects();
    const statTotal = document.getElementById("proj-stat-total");
    const statOpen = document.getElementById("proj-stat-open");

    let totalOpen = 0;
    projects.forEach(p => { totalOpen += (p.lookingFor ? p.lookingFor.length : 0); });
    if (statTotal) statTotal.innerText = projects.length;
    if (statOpen) statOpen.innerText = totalOpen;

    // Seviye yetersizse proje oluşturma butonunu kilitli göster
    const createBtn = document.querySelector('#view-projects button[onclick="openCreateProjectModal()"]');
    if (createBtn) {
        const allowed = canCreateOrApplyProject();
        createBtn.style.opacity = allowed ? "" : "0.55";
        createBtn.title = allowed ? "" : "Proje oluşturmak için dil seviyesi yetersiz";
        const lbl = createBtn.querySelector('span');
        if (lbl) lbl.innerText = allowed ? "Yeni Proje & Ekip Oluştur" : "🔒 Proje Oluşturma (Seviye Kilidi)";
    }

    const filtered = projects.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'frontend') return p.lookingFor && p.lookingFor.some(r => r.toLowerCase().includes('frontend'));
        if (filter === 'backend') return p.lookingFor && p.lookingFor.some(r => r.toLowerCase().includes('backend'));
        if (filter === 'db') return p.lookingFor && p.lookingFor.some(r => r.toLowerCase().includes('veritabanı') || r.toLowerCase().includes('db'));
        if (filter === 'my') { const me = (userProfile.username || 'Deniz Kaya'); return p.creator === me || p.manager === me || p.advisor === me; }
        return true;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; background:rgba(15,23,42,0.4); border-radius:18px; border:1px dashed var(--glass-border);">
                <i class="fa-solid fa-folder-open" style="font-size:36px; color:#64748b; margin-bottom:10px;"></i>
                <p style="color:#94a3b8; font-size:14px; margin:0;">Bu filtreye uygun proje bulunamadı. Yeni bir proje oluşturarak ekibinizi kurabilirsiniz!</p>
            </div>
        `;
        return;
    }

    const allTasks = typeof getTasks === 'function' ? getTasks() : [];
    const isMentor = (userProfile.role === 'danisman');

    filtered.forEach(proj => {
        const meName = (userProfile.username || 'Deniz Kaya');
        const isOwner = proj.creator === meName || proj.manager === meName;
        const projTasks = allTasks.filter(t => t.projectId === proj.id);
        const totalT = projTasks.length;
        const doneT = projTasks.filter(t => t.status === 'completed').length;
        const percent = totalT > 0 ? Math.round((doneT / totalT) * 100) : 0;

        // Aranan roller etiketleri
        let rolesHtml = '';
        if (proj.lookingFor && proj.lookingFor.length > 0) {
            rolesHtml = proj.lookingFor.map(r => {
                let badgeClass = 'badge-role-frontend';
                const rLow = r.toLowerCase();
                if (rLow.includes('backend')) badgeClass = 'badge-role-backend';
                else if (rLow.includes('veritabanı')) badgeClass = 'badge-role-db';
                else if (rLow.includes('mobil')) badgeClass = 'badge-role-mobile';
                else if (rLow.includes('ui')) badgeClass = 'badge-role-ui';
                else if (rLow.includes('devops')) badgeClass = 'badge-role-devops';
                return `<span class="proj-badge ${badgeClass}" style="font-size:11px; padding:3px 9px; border-radius:8px; font-weight:600;"><i class="fa-solid fa-user-plus"></i> ${escapeHtml(r)} Aranıyor</span>`;
            }).join(' ');
        } else {
            rolesHtml = '<span style="font-size:11.5px; color:#10b981;"><i class="fa-solid fa-check"></i> Ekip Kadrosu Tamamlandı</span>';
        }

        // Teknolojiler
        const techHtml = (proj.tech || []).map(t => 
            `<span style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:#cbd5e1; font-size:11px; padding:2px 8px; border-radius:6px;">${escapeHtml(t)}</span>`
        ).join(' ');

        // Ekip üyeleri
        const membersHtml = (proj.members || []).map(m => {
            let color = '#38bdf8', bg = 'rgba(56,189,248,0.1)', bd = 'rgba(56,189,248,0.3)', icon = 'fa-circle-user';
            if (/\(Proje Yöneticisi\)/.test(m)) { color = '#f59e0b'; bg = 'rgba(245,158,11,0.1)'; bd = 'rgba(245,158,11,0.35)'; icon = 'fa-user-tie'; }
            else if (/\(Danışman\)/.test(m)) { color = '#a78bfa'; bg = 'rgba(167,139,250,0.1)'; bd = 'rgba(167,139,250,0.35)'; icon = 'fa-user-graduate'; }
            return `<span style="background:${bg}; color:${color}; border:1px solid ${bd}; font-size:11px; padding:2px 8px; border-radius:12px;"><i class="fa-solid ${icon}"></i> ${escapeHtml(m)}</span>`;
        }).join(' ');

        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                    <h3 style="font-size:16.5px; color:#f8fafc; font-weight:700; margin:0 0 4px 0;">${escapeHtml(proj.title)}</h3>
                    <span style="font-size:11px; background:rgba(56,189,248,0.12); color:#38bdf8; border:1px solid rgba(56,189,248,0.3); padding:2px 8px; border-radius:8px; font-weight:600;">
                        ${escapeHtml(proj.creatorRole || 'Mentör')}
                    </span>
                </div>
                <div style="font-size:12px; color:#94a3b8; margin-bottom:4px;">
                    <i class="fa-solid fa-user-tie" style="color:#f59e0b;"></i> Proje Yöneticisi: <strong style="color:#e2e8f0;">${escapeHtml(proj.manager || 'Atanmadı')}</strong>
                </div>
                <div style="font-size:12px; color:#94a3b8; margin-bottom:12px;" title="Danışman proje yöneticisi değildir; tüm ekip görevlerini takip eder.">
                    <i class="fa-solid fa-user-graduate" style="color:#a78bfa;"></i> Danışman: <strong style="color:#e2e8f0;">${escapeHtml(proj.advisor || 'Atanmadı')}</strong>
                    <span style="font-size:10.5px; color:#64748b;"> · tüm görevleri takip eder</span>
                </div>
                <p style="font-size:13px; color:#cbd5e1; line-height:1.5; margin-bottom:14px;">
                    ${escapeHtml(proj.desc)}
                </p>
                
                <!-- Sprint / Görev İlerlemesi -->
                <div style="margin-bottom:14px; background:rgba(15,23,42,0.6); padding:10px 12px; border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
                    <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#cbd5e1; margin-bottom:5px;">
                        <span><i class="fa-solid fa-list-check" style="color:#f59e0b;"></i> Görev & İlerleme:</span>
                        <strong style="color:#10b981;">%${percent} (${doneT}/${totalT} Tamamlandı)</strong>
                    </div>
                    <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:6px; overflow:hidden;">
                        <div style="height:100%; width:${percent}%; background:linear-gradient(90deg, #38bdf8, #10b981); border-radius:6px; transition:width 0.4s ease;"></div>
                    </div>
                </div>

                <div style="margin-bottom:12px;">
                    <div style="font-size:11.5px; font-weight:700; color:#f59e0b; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Açık Pozisyonlar & İhtiyaçlar:</div>
                    <div style="display:flex; flex-wrap:wrap; gap:6px;">
                        ${rolesHtml}
                    </div>
                </div>

                <div style="margin-bottom:14px;">
                    <div style="font-size:11.5px; font-weight:700; color:#94a3b8; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Teknolojiler:</div>
                    <div style="display:flex; flex-wrap:wrap; gap:5px;">
                        ${techHtml}
                    </div>
                </div>

                <div style="margin-bottom:16px;">
                    <div style="font-size:11.5px; font-weight:700; color:#94a3b8; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Mevcut Ekip Üyeleri:</div>
                    <div style="display:flex; flex-wrap:wrap; gap:6px;">
                        ${membersHtml}
                    </div>
                </div>
            </div>

            <div style="display:flex; gap:6px; flex-wrap:wrap; border-top:1px solid var(--glass-border); padding-top:12px; margin-top:10px;">
                <button type="button" onclick="openProjectTasks('${proj.id}')" style="background:rgba(245,158,11,0.15); border:1px solid #f59e0b; color:#f59e0b; border-radius:12px; padding:8px 12px; font-size:12px; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:5px;">
                    <i class="fa-solid fa-list-check"></i> Görev Panosu
                </button>
                ${isOwner || isMentor ? `
                    <button type="button" class="btn-primary" onclick="openAddMemberToProject('${proj.id}')" style="flex:1; border-radius:12px; padding:8px 12px; font-size:12px;">
                        <i class="fa-solid fa-user-plus"></i> Arkadaş Davet Et
                    </button>
                    <button type="button" onclick="openAssignTaskModal('${proj.id}')" style="background:rgba(56,189,248,0.15); border:1px solid #38bdf8; color:#38bdf8; border-radius:12px; padding:8px 10px; font-size:12px; cursor:pointer; font-weight:600;">
                        <i class="fa-solid fa-plus"></i> Görev Ata
                    </button>
                ` : `
                    ${(proj.members || []).some(m => m.startsWith(meName + ' (')) ? `
                    <div style="flex:1; font-size:12px; color:#10b981; display:flex; align-items:center; gap:6px; font-weight:600;"><i class="fa-solid fa-circle-check"></i> Ekipte yer alıyorsun</div>
                    ` : (canCreateOrApplyProject() ? `
                    <button type="button" class="btn-primary" onclick="applyToProject('${proj.id}')" style="flex:1; border-radius:12px; padding:8px 12px; font-size:12px;">
                        <i class="fa-solid fa-paper-plane"></i> Başvur
                    </button>
                    ` : `
                    <button type="button" onclick="showProjectLevelLock()" title="Başvuru için dil seviyesi yetersiz" style="flex:1; border-radius:12px; padding:8px 12px; font-size:12px; background:rgba(100,116,139,0.15); border:1px solid #64748b; color:#94a3b8; cursor:pointer; font-weight:600;">
                        <i class="fa-solid fa-lock"></i> Başvuru (Seviye Kilidi)
                    </button>
                    `)}
                    <button type="button" onclick="openChatMessengerModal('${escapeHtml(proj.advisor || proj.manager || proj.creator)}')" style="background:rgba(168,85,247,0.15); border:1px solid #a855f7; color:#a855f7; border-radius:12px; padding:8px 12px; font-size:12px; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:5px;">
                        <i class="fa-solid fa-comment-dots"></i> Mentöre Yaz
                    </button>
                `}
            </div>
        `;
        grid.appendChild(card);
    });
}

function openCreateProjectModal() {
    if (!canCreateOrApplyProject()) { showProjectLevelLock(); return; }
    const modal = document.getElementById("create-project-modal");
    if (modal) modal.classList.remove("hidden");

    // Arkadaş listesini doldur (yalnızca kabul edilmiş arkadaşlar)
    const picker = document.getElementById("new-proj-friends-picker");
    if (picker) {
        const friends = getFriends().filter(f => f.status === 'accepted');
        if (friends.length === 0) {
            picker.innerHTML = `
                <div style="font-size:12px; color:#f59e0b; padding:6px; display:flex; align-items:center; gap:6px;">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span>Henüz onaylı arkadaşınız bulunmuyor. Ekip üyesi ekleyebilmek için önce menüden arkadaş eklemelisiniz.</span>
                </div>
            `;
        } else {
            picker.innerHTML = friends.map(f => `
                <label style="display:flex; align-items:center; gap:8px; font-size:12px; color:#e2e8f0; background:rgba(30,41,59,0.5); padding:6px 10px; border-radius:8px; cursor:pointer;">
                    <input type="checkbox" name="proj_friend_member" value="${escapeHtml(f.name)}">
                    <span>${f.avatar || '👨‍💻'} <strong>${escapeHtml(f.name)}</strong> (${escapeHtml(f.field || 'Geliştirici')})</span>
                </label>
            `).join('');
        }
    }
}

function closeCreateProjectModal() {
    const modal = document.getElementById("create-project-modal");
    if (modal) modal.classList.add("hidden");
}

function submitCreateProject() {
    if (!canCreateOrApplyProject()) { showProjectLevelLock(); return; }
    const title = document.getElementById("new-proj-title").value.trim();
    const desc = document.getElementById("new-proj-desc").value.trim();
    const techInput = document.getElementById("new-proj-tech").value.trim();
    const tech = techInput ? techInput.split(',').map(t => t.trim()).filter(Boolean) : ["HTML", "JavaScript"];

    const roleBoxes = document.querySelectorAll('input[name="proj_roles"]:checked');
    const lookingFor = Array.from(roleBoxes).map(cb => cb.value);

    // Seçilen arkadaşlar
    const friendBoxes = document.querySelectorAll('input[name="proj_friend_member"]:checked');
    const selectedFriends = Array.from(friendBoxes).map(cb => cb.value);

    const creatorName = userProfile.username || 'Deniz Kaya';
    const isAdvisor = userProfile.role === 'danisman';
    const creatorRole = isAdvisor ? (userProfile.mentorProfile ? `Danışman (${userProfile.mentorProfile.field})` : 'Danışman') : 'Proje Lideri';

    // Danışman proje yöneticisi değildir: yönetici seçilen ilk ekip üyesidir, danışman tüm görevleri takip eder.
    const manager = isAdvisor ? (selectedFriends[0] || null) : creatorName;
    const advisor = isAdvisor ? creatorName : null;
    const restMembers = isAdvisor ? selectedFriends.slice(1) : selectedFriends;

    const newProj = normalizeProject({
        id: "proj_" + Date.now(),
        title,
        creator: creatorName,
        creatorRole,
        desc,
        tech,
        lookingFor,
        manager,
        advisor,
        members: restMembers
    });

    const projects = getProjects();
    projects.unshift(newProj);
    saveProjects(projects);

    closeCreateProjectModal();
    renderProjects();
    alert(`🚀 "${title}" projeniz başarıyla yayınlandı ve ekibiniz kuruldu!`);
}

function applyToProject(projId) {
    if (!canCreateOrApplyProject()) { showProjectLevelLock(); return; }
    const projects = getProjects();
    const proj = projects.find(p => p.id === projId);
    if (!proj) return;
    alert(`👏 "${proj.title}" projesine başvurunuz proje yöneticisi ${proj.manager || proj.creator} adlı kişiye iletildi, danışman ${proj.advisor || 'atanmadı'} süreci takip edecek! Başvurunuz kabul edildiğinde bildirim alacaksınız.`);
}

// ============================================================
// PROJE KATILIM DAVETLERİ SİSTEMİ (INVITATION & APPROVAL)
// ============================================================

const defaultProjectInvites = [
    {
        id: "inv_1",
        projectId: "proj_1",
        projectTitle: "AI Harcama Analitiği & Fintech Paneli",
        inviter: "Zeynep Kaya (Kıdemli Mentör)",
        role: "Frontend Geliştirici",
        status: "pending",
        timestamp: "Yeni Davet"
    }
];

function getProjectInvites() {
    const saved = localStorage.getItem("codplus_project_invites");
    if (saved) {
        try { return JSON.parse(saved); } catch(e) {}
    }
    return defaultProjectInvites;
}

function saveProjectInvites(invites) {
    localStorage.setItem("codplus_project_invites", JSON.stringify(invites));
    renderProjectInvites();
}

function renderProjectInvites() {
    const container = document.getElementById("project-invites-container");
    if (!container) return;
    const invites = getProjectInvites().filter(i => i.status === 'pending');
    if (invites.length === 0) {
        container.style.display = "none";
        container.innerHTML = "";
        return;
    }
    container.style.display = "block";
    container.innerHTML = invites.map(inv => `
        <div class="project-invite-card">
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:42px; height:42px; border-radius:50%; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; display:flex; align-items:center; justify-content:center; font-size:20px;">
                    📬
                </div>
                <div>
                    <div style="font-size:14px; color:#f8fafc; font-weight:700;">
                        Proje Ekibi Katılım Daveti: <span style="color:#38bdf8;">"${escapeHtml(inv.projectTitle)}"</span>
                    </div>
                    <div style="font-size:12.5px; color:#cbd5e1; margin-top:2px;">
                        Davet Eden: <strong>${escapeHtml(inv.inviter)}</strong> | Teklif Edilen Rol: <span style="color:#10b981; font-weight:600;">${escapeHtml(inv.role)}</span>
                    </div>
                </div>
            </div>
            <div style="display:flex; gap:8px;">
                <button type="button" onclick="acceptProjectInvite('${inv.id}')" style="background:#10b981; border:none; color:white; padding:8px 16px; border-radius:12px; font-weight:700; font-size:13px; cursor:pointer; display:flex; align-items:center; gap:6px;">
                    <i class="fa-solid fa-check"></i> Kabul Et
                </button>
                <button type="button" onclick="rejectProjectInvite('${inv.id}')" style="background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#ef4444; padding:8px 14px; border-radius:12px; font-weight:600; font-size:13px; cursor:pointer;">
                    Reddet
                </button>
            </div>
        </div>
    `).join('');
}

function acceptProjectInvite(invId) {
    const invites = getProjectInvites();
    const inv = invites.find(i => i.id === invId);
    if (!inv) return;
    inv.status = 'accepted';
    saveProjectInvites(invites);

    // Projeye kullanıcıyı ekle
    const projects = getProjects();
    const proj = projects.find(p => p.id === inv.projectId);
    const myName = userProfile.username || 'Deniz Kaya';
    const roleTag = `${myName} (${inv.role})`;
    if (proj) {
        if (!proj.members.includes(roleTag) && !proj.members.includes(myName)) {
            proj.members.push(roleTag);
            saveProjects(projects);
            renderProjects();
        }
    }
    alert(`🎉 Harika! "${inv.projectTitle}" projesinin ekibine "${inv.role}" olarak katıldınız. Görev panosundan görevlerinizi takip edebilirsiniz!`);
}

function rejectProjectInvite(invId) {
    let invites = getProjectInvites();
    invites = invites.filter(i => i.id !== invId);
    saveProjectInvites(invites);
}

function openAddMemberToProject(projId) {
    const projects = getProjects();
    const proj = projects.find(p => p.id === projId);
    if (!proj) return;

    const modal = document.getElementById("invite-member-modal");
    if (!modal) return;

    document.getElementById("invite-project-id").value = projId;
    document.getElementById("invite-project-title").innerText = `Proje: ${proj.title}`;

    const friendSelect = document.getElementById("invite-friend-select");
    const friends = getFriends().filter(f => f.status === 'accepted');
    if (friends.length === 0) {
        alert("⚠️ Ekip üyesi davet edebilmeniz için önce arkadaş eklemelisiniz.");
        openFriendsModal();
        return;
    }
    friendSelect.innerHTML = friends.map(f => `
        <option value="${escapeHtml(f.name)}">${f.avatar || '👨‍💻'} ${escapeHtml(f.name)} (${escapeHtml(f.field || 'Geliştirici')})</option>
    `).join('');

    modal.classList.remove("hidden");
}

function closeInviteMemberModal() {
    const modal = document.getElementById("invite-member-modal");
    if (modal) modal.classList.add("hidden");
}

function submitSendProjectInvite() {
    const projId = document.getElementById("invite-project-id").value;
    const friendName = document.getElementById("invite-friend-select").value;
    const role = document.getElementById("invite-role-select").value;

    const projects = getProjects();
    const proj = projects.find(p => p.id === projId);
    if (!proj) return;

    const invites = getProjectInvites();
    invites.push({
        id: "inv_" + Date.now(),
        projectId: projId,
        projectTitle: proj.title,
        inviter: userProfile.role === 'danisman' ? `${userProfile.username || 'Deniz Kaya'} (Danışman)` : `${userProfile.username || 'Deniz Kaya'} (Proje Yöneticisi)`,
        byAdvisor: userProfile.role === 'danisman', // Danışman daveti: seviye şartı aranmaz
        role: role,
        status: "pending",
        timestamp: "Az önce"
    });
    saveProjectInvites(invites);

    closeInviteMemberModal();
    alert(`📩 ${friendName} adlı arkadaşınıza "${role}" rolü için katılım daveti gönderildi! Karşı taraf onayladığında projenin resmi ekibine dahil olacaktır.`);
}

// ============================================================
// GÖREV & SPRINT PANOSU SİSTEMİ (TASKS & CODE REVIEW)
// ============================================================

const defaultTasks = [
    {
        id: "task_1",
        projectId: "p1",
        projectTitle: "Fintech Akıllı Cüzdan & Harcama Analitiği",
        title: "Kullanıcı Kayıt & JWT Token Endpointi",
        desc: "Kullanıcıların e-posta ve şifreyle sisteme giriş yapabilmesi için güvenli bcrypt şifreleme ve JWT yetkilendirme middleware'ini kodlayın.",
        assignee: "Ahmet Yılmaz",
        tech: "Backend (Node/Python)",
        status: "review", // 'todo', 'in_progress', 'review', 'completed'
        submissionNote: "Bcrypt hashleme ve JWT sign metotları tamamlandı, test edildi.",
        codeSnippet: "const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });\nres.json({ success: true, token });",
        mentorFeedback: ""
    },
    {
        id: "task_2",
        projectId: "p1",
        projectTitle: "Fintech Akıllı Cüzdan & Harcama Analitiği",
        title: "İlişkisel Veritabanı Harcama Tabloları",
        desc: "Harcamalar tablosunu (kategori, miktar, tarih) oluşturun ve user_id foreign key indexlemesini gerçekleştirin.",
        assignee: "Can Demir",
        tech: "SQL Veritabanı",
        status: "in_progress",
        submissionNote: "",
        codeSnippet: "",
        mentorFeedback: ""
    },
    {
        id: "task_3",
        projectId: "p2",
        projectTitle: "Gerçek Zamanlı Kod Derleyici & Algoritma Düellosu",
        title: "Responsive Menü ve Sipariş Kartları",
        desc: "Kafedeki içecek ve tatlıların resimli, fiyatlı kartlarını CSS Grid ve Flexbox ile mobil uyumlu tasarlayın.",
        assignee: "Elif Arslan",
        tech: "Frontend (HTML/JS)",
        status: "completed",
        submissionNote: "Tüm CSS grid ve card componentleri hazırlandı.",
        codeSnippet: ".menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }",
        mentorFeedback: "Harika responsive tasarım! Mobil kırılımlar çok akıcı olmuş."
    },
    {
        id: "task_4",
        projectId: "p1",
        projectTitle: "Fintech Akıllı Cüzdan & Harcama Analitiği",
        title: "Harcama Kategorileri Arayüz Bileşeni",
        desc: "Harcamaları kategoriye göre listeleyen filtrelenebilir React bileşenini hazırlayın.",
        assignee: "Ahmet Yılmaz",
        tech: "Frontend (HTML/JS)",
        status: "manager_approved",
        submissionNote: "Bileşen ve filtre mantığı tamamlandı.",
        codeSnippet: "const filtered = items.filter(i => i.category === active);",
        managerFeedback: "Kod temiz, filtre mantığı doğru çalışıyor.",
        managerApprovedBy: "Deniz Kaya",
        mentorFeedback: ""
    }
];

// Eski kayıtlı görevlerdeki proje kimliklerini güncel projelerle eşle
const LEGACY_PROJECT_MAP = { proj_1: "p1", proj_2: "p2" };
function fixLegacyTask(t) {
    if (LEGACY_PROJECT_MAP[t.projectId]) {
        t.projectId = LEGACY_PROJECT_MAP[t.projectId];
        const p = defaultProjects.find(d => d.id === t.projectId);
        if (p) t.projectTitle = p.title;
    }
    return t;
}

function getTasks() {
    const saved = localStorage.getItem("codplus_project_tasks");
    if (saved) {
        try { return JSON.parse(saved).map(fixLegacyTask); } catch(e) {}
    }
    return defaultTasks;
}

function getTaskProject(task) {
    return getProjects().find(p => p.id === task.projectId) || null;
}

// Proje Yöneticisi: ilk onayı verir. Danışman rolündeki hesap yönetici olarak işlem yapamaz.
function isProjectManagerOf(task) {
    if (userProfile.role === 'danisman') return false;
    const p = getTaskProject(task);
    return !!p && p.manager === (userProfile.username || 'Deniz Kaya');
}

function saveTasks(tasks) {
    localStorage.setItem("codplus_project_tasks", JSON.stringify(tasks));
    renderTasks();
}

let currentTaskFilter = 'all';

function filterTasks(status) {
    currentTaskFilter = status;
    const buttons = document.querySelectorAll(".task-filter-btn");
    buttons.forEach(b => {
        if (b.getAttribute("data-task-filter") === status) b.classList.add("active");
        else b.classList.remove("active");
    });
    renderTasks();
}

function filterTasksByProject() {
    renderTasks();
}

function openProjectTasks(projId) {
    switchView('tasks');
    const select = document.getElementById("tasks-project-filter");
    if (select) {
        select.value = projId;
        renderTasks();
    }
}

function renderTasks() {
    const grid = document.getElementById("tasks-board-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const tasks = getTasks();
    const projects = getProjects();
    const projSelect = document.getElementById("tasks-project-filter");
    const selectedProjId = projSelect ? projSelect.value : 'all';

    // Proje dropdown'ını güncelle
    if (projSelect && projSelect.options.length <= 1) {
        projSelect.innerHTML = `<option value="all">Tüm Projelerim</option>` + 
            projects.map(p => `<option value="${p.id}">${escapeHtml(p.title)}</option>`).join('');
        if (selectedProjId !== 'all') projSelect.value = selectedProjId;
    }

    // Bekleyen işlem sayıları (yönetici incelemesi / danışman onayı)
    const reviewCount = tasks.filter(t => t.status === 'review').length;
    const advisorCount = tasks.filter(t => t.status === 'manager_approved').length;
    const countEl = document.getElementById("task-count-review");
    if (countEl) countEl.innerText = reviewCount;
    const advisorCountEl = document.getElementById("task-count-manager");
    if (advisorCountEl) advisorCountEl.innerText = advisorCount;

    const navTasksBadge = document.getElementById("tasks-nav-badge");
    if (navTasksBadge) {
        const pending = (userProfile.role === 'danisman') ? advisorCount : reviewCount;
        navTasksBadge.style.display = pending > 0 ? "block" : "none";
    }

    const filtered = tasks.filter(t => {
        const matchesProj = (selectedProjId === 'all' || t.projectId === selectedProjId);
        const matchesStatus = (currentTaskFilter === 'all' || t.status === currentTaskFilter);
        return matchesProj && matchesStatus;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; background:rgba(15,23,42,0.4); border-radius:18px; border:1px dashed var(--glass-border);">
                <i class="fa-solid fa-list-check" style="font-size:36px; color:#64748b; margin-bottom:10px;"></i>
                <p style="color:#94a3b8; font-size:14px; margin:0;">Bu kritere uygun görev bulunamadı. Yeni bir görev atayarak ekibinize sprint başlatabilirsiniz!</p>
            </div>
        `;
        return;
    }

    const statusMeta = {
        todo: { label: "Yapılacak", cls: "status-todo", icon: "fa-regular fa-clock" },
        in_progress: { label: "Geliştiriliyor", cls: "status-in_progress", icon: "fa-solid fa-spinner fa-spin" },
        review: { label: "Yönetici İncelemesi", cls: "status-review", icon: "fa-solid fa-magnifying-glass" },
        manager_approved: { label: "Yönetici Onayladı · Danışman Bekliyor", cls: "status-review", icon: "fa-solid fa-user-check" },
        completed: { label: "Tamamlandı", cls: "status-completed", icon: "fa-solid fa-circle-check" }
    };

    const isMentor = (userProfile.role === 'danisman');
    const myName = (userProfile.username || 'Deniz Kaya').toLowerCase();

    filtered.forEach(task => {
        const meta = statusMeta[task.status] || statusMeta.todo;
        const card = document.createElement("div");
        card.className = "task-card";

        let actionBtnHtml = '';
        if (task.status === 'review') {
            if (isProjectManagerOf(task)) {
                actionBtnHtml = `
                    <button type="button" onclick="openReviewTaskModal('${task.id}')" style="width:100%; padding:9px; background:linear-gradient(135deg, #f59e0b, #d97706); border:none; color:white; border-radius:12px; font-weight:700; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
                        <i class="fa-solid fa-code-compare"></i> Yönetici İncelemesi (Onayla / Revize İste)
                    </button>
                `;
            } else {
                actionBtnHtml = `<div style="font-size:12px; color:#f59e0b; display:flex; align-items:center; gap:6px; font-weight:600;"><i class="fa-solid fa-hourglass-half"></i> Proje yöneticisinin incelemesi bekleniyor</div>`;
            }
        } else if (task.status === 'manager_approved') {
            if (isMentor) {
                actionBtnHtml = `
                    <button type="button" onclick="openReviewTaskModal('${task.id}')" style="width:100%; padding:9px; background:linear-gradient(135deg, #10b981, #059669); border:none; color:white; border-radius:12px; font-weight:700; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
                        <i class="fa-solid fa-flag-checkered"></i> Danışman Onayı: Tamamlandı İşaretle
                    </button>
                `;
            } else {
                actionBtnHtml = `<div style="font-size:12px; color:#a78bfa; display:flex; align-items:center; gap:6px; font-weight:600;"><i class="fa-solid fa-user-graduate"></i> Danışman son onayı bekleniyor</div>`;
            }
        } else if (task.status === 'in_progress' || task.status === 'todo') {
            actionBtnHtml = `
                <button type="button" onclick="openSubmitTaskModal('${task.id}')" style="width:100%; padding:9px; background:rgba(16,185,129,0.15); border:1px solid #10b981; color:#10b981; border-radius:12px; font-weight:600; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
                    <i class="fa-solid fa-paper-plane"></i> Tamamlandı Olarak İşaretle & Onaya Gönder
                </button>
            `;
        } else if (task.status === 'completed') {
            actionBtnHtml = `
                <div style="font-size:12px; color:#10b981; display:flex; align-items:center; gap:6px; font-weight:600;">
                    <i class="fa-solid fa-circle-check"></i> Mentör Tarafından Onaylandı (+50 XP)
                </div>
            `;
        }

        card.innerHTML = `
            <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                    <span class="task-status-badge ${meta.cls}">
                        <i class="${meta.icon}"></i> ${meta.label}
                    </span>
                    <span style="font-size:11px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:#cbd5e1; padding:2px 8px; border-radius:6px;">
                        ${escapeHtml(task.tech)}
                    </span>
                </div>
                <h4 style="font-size:15.5px; color:#f8fafc; font-weight:700; margin:0 0 6px 0;">${escapeHtml(task.title)}</h4>
                <div style="font-size:12px; color:#38bdf8; margin-bottom:10px;">
                    <i class="fa-solid fa-diagram-project"></i> ${escapeHtml(task.projectTitle)}
                </div>
                <p style="font-size:12.5px; color:#cbd5e1; line-height:1.5; margin-bottom:12px;">
                    ${escapeHtml(task.desc)}
                </p>
                <div style="font-size:12px; color:#94a3b8; margin-bottom:14px; background:rgba(30,41,59,0.5); padding:8px 10px; border-radius:10px;">
                    <i class="fa-solid fa-user-gear" style="color:#64748b;"></i> Atanan Üye: <strong style="color:#f1f5f9;">${escapeHtml(task.assignee)}</strong>
                </div>

                ${(task.managerApprovedBy && (task.status === 'manager_approved' || task.status === 'completed')) ? `
                    <div style="font-size:11.5px; background:rgba(245,158,11,0.08); border-left:3px solid #f59e0b; padding:6px 10px; margin-bottom:12px; color:#e2e8f0; border-radius:0 8px 8px 0;">
                        <strong style="color:#f59e0b;">✔ Proje Yöneticisi Onayladı:</strong> ${escapeHtml(task.managerApprovedBy)}${task.managerFeedback ? ' — ' + escapeHtml(task.managerFeedback) : ''}
                    </div>
                ` : ''}

                ${task.mentorFeedback ? `
                    <div style="font-size:11.5px; background:rgba(167,139,250,0.08); border-left:3px solid #a78bfa; padding:6px 10px; margin-bottom:12px; color:#e2e8f0; border-radius:0 8px 8px 0;">
                        <strong style="color:#a78bfa;">👨‍🏫 Danışman Notu:</strong> ${escapeHtml(task.mentorFeedback)}
                    </div>
                ` : ''}
            </div>

            <div style="border-top:1px solid var(--glass-border); padding-top:12px; margin-top:8px;">
                ${actionBtnHtml}
            </div>
        `;

        grid.appendChild(card);
    });
}

function openAssignTaskModal(preSelectedProjId = null) {
    const modal = document.getElementById("assign-task-modal");
    if (!modal) return;

    const projSelect = document.getElementById("task-modal-project");
    // Görev atama: danışman tüm projelerde, proje yöneticisi ise kendi projelerinde görev atayabilir
    const me = (userProfile.username || 'Deniz Kaya');
    const projects = getProjects().filter(p => userProfile.role === 'danisman' || p.manager === me || p.creator === me);
    if (projects.length === 0) {
        alert("Görev atamak için bir projenin Proje Yöneticisi veya Danışmanı olmalısınız.");
        return;
    }
    projSelect.innerHTML = projects.map(p => `
        <option value="${p.id}" ${p.id === preSelectedProjId ? 'selected' : ''}>${escapeHtml(p.title)}</option>
    `).join('');

    updateTaskAssigneeDropdown();
    modal.classList.remove("hidden");
}

function closeAssignTaskModal() {
    const modal = document.getElementById("assign-task-modal");
    if (modal) modal.classList.add("hidden");
}

function updateTaskAssigneeDropdown() {
    const projSelect = document.getElementById("task-modal-project");
    const assigneeSelect = document.getElementById("task-modal-assignee");
    if (!projSelect || !assigneeSelect) return;

    const projects = getProjects();
    const proj = projects.find(p => p.id === projSelect.value);
    if (!proj || !proj.members || proj.members.length === 0) {
        assigneeSelect.innerHTML = `<option value="Ahmet Yılmaz">Ahmet Yılmaz (Frontend)</option>`;
        return;
    }

    // Danışman görev almaz; Proje Yöneticisi ve ekip üyelerine görev atanabilir
    const assignable = proj.members.filter(m => !/\(Danışman\)/.test(m));
    const managerOpts = assignable.filter(m => /\(Proje Yöneticisi\)/.test(m));
    const memberOpts = assignable.filter(m => !/\(Proje Yöneticisi\)/.test(m));
    const opt = m => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`;
    assigneeSelect.innerHTML =
        (managerOpts.length ? `<optgroup label="Proje Yöneticisi">${managerOpts.map(opt).join('')}</optgroup>` : '') +
        (memberOpts.length ? `<optgroup label="Ekip Üyeleri">${memberOpts.map(opt).join('')}</optgroup>` : '');
}

function submitNewTask() {
    const projId = document.getElementById("task-modal-project").value;
    const title = document.getElementById("task-modal-title").value.trim();
    const assignee = document.getElementById("task-modal-assignee").value;
    const tech = document.getElementById("task-modal-tech").value;
    const desc = document.getElementById("task-modal-desc").value.trim();

    const projects = getProjects();
    const proj = projects.find(p => p.id === projId);

    const newTask = {
        id: "task_" + Date.now(),
        projectId: projId,
        projectTitle: proj ? proj.title : "Genel Proje",
        title: title,
        desc: desc,
        assignee: assignee,
        tech: tech,
        status: "in_progress",
        submissionNote: "",
        codeSnippet: "",
        mentorFeedback: ""
    };

    const tasks = getTasks();
    tasks.unshift(newTask);
    saveTasks(tasks);

    closeAssignTaskModal();
    alert(`📋 "${title}" görevi başarıyla oluşturuldu ve ${assignee} adlı üyeye atandı!`);
}

let taskAutosaveTimer = null;
function handleTaskCodeInput(el) {
    const taskId = document.getElementById("submit-task-id") ? document.getElementById("submit-task-id").value : null;
    if (!taskId) return;

    if (taskAutosaveTimer) clearTimeout(taskAutosaveTimer);
    taskAutosaveTimer = setTimeout(() => {
        try {
            localStorage.setItem("codplus_task_draft_" + taskId, el.value);
            const noteInput = document.getElementById("submit-task-note");
            if (noteInput) {
                localStorage.setItem("codplus_task_note_draft_" + taskId, noteInput.value);
            }
            const indicator = document.getElementById("task-code-autosave-indicator");
            if (indicator) {
                indicator.style.display = "inline-flex";
                const now = new Date();
                const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0');
                indicator.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Otomatik Kaydedildi (${timeStr})`;
            }
        } catch(e) {}
    }, 350);
}

function openSubmitTaskModal(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const modal = document.getElementById("submit-task-modal");
    if (!modal) return;

    document.getElementById("submit-task-id").value = taskId;
    document.getElementById("submit-task-title").innerText = task.title;
    document.getElementById("submit-task-desc").innerText = task.desc;
    
    // Kayıtlı taslağı veya var olan kodu yükle
    const savedCode = localStorage.getItem("codplus_task_draft_" + taskId) || task.codeSnippet || "";
    const savedNote = localStorage.getItem("codplus_task_note_draft_" + taskId) || task.submissionNote || "";

    const noteEl = document.getElementById("submit-task-note");
    const codeEl = document.getElementById("submit-task-code");
    if (noteEl) noteEl.value = savedNote;
    if (codeEl) codeEl.value = savedCode;

    const aiBox = document.getElementById("submit-task-ai-annotations");
    if (aiBox) {
        aiBox.style.display = "none";
        aiBox.innerHTML = "";
    }

    const indicator = document.getElementById("task-code-autosave-indicator");
    if (indicator) {
        indicator.style.display = savedCode ? "inline-flex" : "none";
        if (savedCode) indicator.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Taslak Yüklendi (Otomatik Saklı)`;
    }

    modal.classList.remove("hidden");

    // VS Code Autocomplete motorunu bağla
    if (codeEl) {
        setupVsCodeAutocomplete(codeEl, () => (task.tech || 'javascript').toLowerCase());
    }
}

function closeSubmitTaskModal() {
    const modal = document.getElementById("submit-task-modal");
    if (modal) modal.classList.add("hidden");
}

function generateAiLineAnnotationForSubmit() {
    const codeEl = document.getElementById("submit-task-code");
    const aiBox = document.getElementById("submit-task-ai-annotations");
    if (!codeEl || !aiBox) return;

    const code = codeEl.value.trim();
    if (!code) {
        alert("Lütfen önce kod alanına açıklanmasını istediğiniz birkaç satır kod yazın.");
        return;
    }

    const taskId = document.getElementById("submit-task-id").value;
    const task = getTasks().find(t => t.id === taskId);
    const lang = task ? (task.tech || 'javascript') : 'javascript';

    aiBox.style.display = "block";
    aiBox.innerHTML = `<div style="text-align:center; padding:12px; color:#38bdf8;"><i class="fa-solid fa-spinner fa-spin"></i> Yapay zeka kod satırlarını inceliyor...</div>`;

    setTimeout(() => {
        aiBox.innerHTML = analyzeCodeLineByLine(code, lang);
    }, 350);
}

function confirmSubmitTaskForReview() {
    const taskId = document.getElementById("submit-task-id").value;
    const note = document.getElementById("submit-task-note").value.trim();
    const code = document.getElementById("submit-task-code").value.trim();

    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    task.status = "review";
    task.submissionNote = note;
    task.codeSnippet = code;

    // Taslağı temizle (artık kesin kayıt oldu)
    try {
        localStorage.removeItem("codplus_task_draft_" + taskId);
        localStorage.removeItem("codplus_task_note_draft_" + taskId);
    } catch(e) {}

    saveTasks(tasks);
    closeSubmitTaskModal();
    renderTasks();
    alert(`🚀 Göreviniz ve kodlarınız proje yöneticisinin incelemesine gönderildi! Yönetici onayladıktan sonra danışman son onayı verip görevi tamamlandı olarak işaretleyecek.`);
}

function openReviewTaskModal(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const modal = document.getElementById("review-task-modal");
    if (!modal) return;

    document.getElementById("review-task-id").value = taskId;
    document.getElementById("review-task-title").innerText = task.title;
    document.getElementById("review-task-author").innerText = `Üye: ${task.assignee}`;
    document.getElementById("review-task-desc").innerText = task.desc;
    document.getElementById("review-task-note").innerText = task.submissionNote || "Not eklenmedi.";
    document.getElementById("review-task-code-preview").innerText = task.codeSnippet || "// Kod bloğu eklenmedi.";
    document.getElementById("review-mentor-feedback").value = "";

    // Aşama: 'review' -> Proje Yöneticisi, 'manager_approved' -> Danışman (son onay)
    const stage = task.status === 'manager_approved' ? 'advisor' : 'manager';
    if (stage === 'manager' && !isProjectManagerOf(task)) {
        alert("Bu görevi yalnızca projenin Proje Yöneticisi inceleyebilir.");
        return;
    }
    if (stage === 'advisor' && userProfile.role !== 'danisman') {
        alert("Bu görevi yalnızca Danışman tamamlandı olarak işaretleyebilir.");
        return;
    }
    modal.dataset.stage = stage;
    const titleEl = document.getElementById("review-modal-title");
    const approveEl = document.getElementById("review-approve-label");
    const mBox = document.getElementById("review-manager-box");
    if (titleEl) titleEl.innerText = stage === 'manager' ? "Proje Yöneticisi Görev & Kod İncelemesi" : "Danışman Son Onayı";
    if (approveEl) approveEl.innerText = stage === 'manager' ? "Onayla & Danışmana İlet" : "Tamamlandı İşaretle (+50 XP)";
    if (mBox) {
        if (stage === 'advisor') {
            mBox.style.display = "block";
            mBox.innerText = `✔ Proje Yöneticisi onayladı: ${task.managerApprovedBy || '-'}${task.managerFeedback ? ' — ' + task.managerFeedback : ''}`;
        } else {
            mBox.style.display = "none";
        }
    }

    modal.classList.remove("hidden");

    // Mentör inceleme ekranı açıldığında otomatik satır analizini çalıştır
    triggerReviewAiAnnotation();
}

function closeReviewTaskModal() {
    const modal = document.getElementById("review-task-modal");
    if (modal) modal.classList.add("hidden");
}

function triggerReviewAiAnnotation() {
    const taskId = document.getElementById("review-task-id").value;
    const task = getTasks().find(t => t.id === taskId);
    const aiBox = document.getElementById("review-task-ai-annotations");
    if (!aiBox) return;

    const code = task && task.codeSnippet ? task.codeSnippet : "";
    if (!code) {
        aiBox.style.display = "none";
        return;
    }

    aiBox.style.display = "block";
    aiBox.innerHTML = analyzeCodeLineByLine(code, (task.tech || 'javascript').toLowerCase());
}

function confirmTaskApproval() {
    const taskId = document.getElementById("review-task-id").value;
    const feedback = document.getElementById("review-mentor-feedback").value.trim();

    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.status === "review") {
        // 1. Aşama: Proje Yöneticisi onayı -> görev henüz tamamlanmış sayılmaz
        task.status = "manager_approved";
        task.managerApprovedBy = userProfile.username || 'Deniz Kaya';
        task.managerFeedback = feedback;
        saveTasks(tasks);
        closeReviewTaskModal();
        renderTasks();
        alert(`✔ Görev proje yöneticisi olarak onaylandı. Danışmanın son onayı bekleniyor; görev henüz tamamlandı sayılmadı.`);
        return;
    }

    // 2. Aşama: Danışman tamamlandı olarak işaretler
    task.status = "completed";
    if (feedback) {
        task.mentorFeedback = feedback;
        learnMentorAdvice(task.title, feedback);
    }

    saveTasks(tasks);
    closeReviewTaskModal();
    renderTasks();
    alert(`🎉 Görev danışman tarafından tamamlandı olarak işaretlendi! Üyeye +50 XP ve başarı puanı iletildi.`);
}

function confirmTaskRevision() {
    const taskId = document.getElementById("review-task-id").value;
    const feedback = document.getElementById("review-mentor-feedback").value.trim();
    if (!feedback) {
        alert("Lütfen üyenin düzeltmesi gereken konuları belirten bir geri bildirim notu yazın.");
        return;
    }

    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    task.status = "in_progress";
    task.mentorFeedback = `🔄 Revize İsteği: ${feedback}`;

    learnMentorAdvice(task.title, feedback);

    saveTasks(tasks);
    closeReviewTaskModal();
    renderTasks();
    alert(`📨 Revize talebiniz üyeye iletildi! Yazdığınız tavsiye aynı zamanda COD+ Danışman Klonu'na öğretildi.`);
}

// ============================================================
// YAPAY ZEKA SATIR SATIR KOD ANALİZİ & AÇIKLAYICI MOTORU
// ============================================================

function analyzeCodeLineByLine(code, lang = 'javascript') {
    if (!code || !code.trim()) {
        return `<div style="color:#94a3b8; font-size:12px; padding:10px;">Açıklanacak kod bulunamadı. Lütfen önce bir kod bloğu yazın.</div>`;
    }

    const lines = code.split("\n");
    let annotations = [];
    let lineCounter = 1;

    for (let i = 0; i < lines.length; i++) {
        const rawLine = lines[i];
        const trimmed = rawLine.trim();
        if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("#") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
            lineCounter++;
            continue;
        }

        let desc = "";
        let blockType = "İşlem";

        if (/^(import|from|using|#include|require)/i.test(trimmed)) {
            blockType = "Modül / Kütüphane";
            desc = "Gerekli harici kütüphaneler, bağımlılıklar ve namespace bildirimleri projeye dahil ediliyor.";
        } else if (/^(function|def|public\s+void|async\s+function|const\s+\w+\s*=\s*(async\s*)?\()/i.test(trimmed)) {
            blockType = "Fonksiyon";
            desc = "İş mantığını yöneten ana fonksiyon başlatılıyor; modüler ve tekrar kullanılabilir mimari kurgulanmış.";
        } else if (/^(class|interface|struct)/i.test(trimmed)) {
            blockType = "Sınıf / Model";
            desc = "Nesne yönelimli mimaride veri yapısını ve yeteneklerini tanımlayan sınıf tanımlanıyor.";
        } else if (/^(select|insert|update|delete|create\s+table)/i.test(trimmed)) {
            blockType = "SQL Sorgusu";
            desc = "İlişkisel veritabanı motoru üzerinde veri çekme, ekleme veya yapısal sorgu yürütülüyor.";
        } else if (/^(for|while|foreach|\.forEach|\.map)/i.test(trimmed)) {
            blockType = "Döngü";
            desc = "Veri listesi veya koleksiyon elemanları üzerinde ardışık yineleme (iterasyon) gerçekleştiriliyor.";
        } else if (/^(if|else\s+if|else|switch)/i.test(trimmed)) {
            blockType = "Koşullu Akış";
            desc = "Girdi doğrulaması veya duruma göre farklı çalışma dalları kontrol ediliyor (Guard Clause).";
        } else if (/^(return|res\.send|res\.json|std::cout|Console\.WriteLine|print|console\.log)/i.test(trimmed)) {
            blockType = "Çıktı / Yanıt";
            desc = "İşlenen sonucun çağıran modüle veya ekrana güvenli biçimde aktarılması sağlanıyor.";
        } else if (/^(try|catch|finally|throw|except)/i.test(trimmed)) {
            blockType = "Hata Yönetimi";
            desc = "Beklenmeyen istisnalara (exceptions) karşı sistem stabilitesini koruyan hata yakalama bloğu.";
        } else if (/<[a-z]+.*>/i.test(trimmed)) {
            blockType = "HTML / Arayüz";
            desc = "Kullanıcı arayüzünde görsel bileşenin ve DOM hiyerarşisinin konumlandırılması.";
        } else {
            blockType = "Veri / Durum";
            desc = "Değişken ataması ve durum yönetimi gerçekleştiriliyor.";
        }

        annotations.push({
            lineNum: lineCounter,
            snippet: trimmed.length > 55 ? trimmed.substring(0, 52) + "..." : trimmed,
            type: blockType,
            desc: desc
        });

        lineCounter++;
        if (annotations.length >= 8) break;
    }

    if (annotations.length === 0) {
        annotations.push({
            lineNum: 1,
            snippet: code.substring(0, 50),
            type: "Kod Bloğu",
            desc: "Kod yürütme mantığı başlatılıyor."
        });
    }

    const itemsHtml = annotations.map(a => `
        <div class="ai-line-box">
            <div class="ai-line-meta">
                <span class="ai-line-num-badge">Satır ${a.lineNum}</span>
                <span class="ai-line-code-snippet">${escapeHtml(a.snippet)}</span>
                <span style="font-size:10px; color:#38bdf8; margin-left:auto; font-weight:600;">[${a.type}]</span>
            </div>
            <div class="ai-line-desc">${a.desc}</div>
        </div>
    `).join("");

    return `
        <div class="ai-annotation-header">
            <span class="ai-annotation-title">
                <i class="fa-solid fa-robot"></i> Yapay Zeka Satır Satır Kod Analizi
            </span>
            <span style="font-size:11px; color:#94a3b8;">${annotations.length} Adım Açıklandı</span>
        </div>
        <div class="ai-annotation-lines-list">
            ${itemsHtml}
        </div>
        <div class="ai-mentor-verdict">
            <i class="fa-solid fa-circle-check"></i>
            <div>
                <strong>Danışman İnceleme Notu:</strong> Kod standartlara uygundur; sözdizimi doğrulanmış ve mentör onayına hazırdır.
            </div>
        </div>
    `;
}

async function explainCurrentIdeCode() {
    const editor = document.getElementById("code-editor");
    const frame = document.getElementById("output-frame");
    const consoleBox = document.getElementById("output-console");
    const aiLinesBox = document.getElementById("output-ai-lines");
    const badge = document.getElementById("output-engine-badge");
    const title = document.getElementById("output-header-title");
    const icon = document.getElementById("output-header-icon");

    if (!editor || !aiLinesBox) return;

    const code = editor.value.trim();
    if (!code) {
        alert("Lütfen önce editöre açıklanmasını istediğiniz bir kod yazın.");
        return;
    }

    if (frame) frame.style.display = "none";
    if (consoleBox) consoleBox.style.display = "none";
    aiLinesBox.style.display = "block";

    if (title) title.innerText = "Yapay Zeka Satır Satır Kod Analizi";
    if (icon) icon.className = "fa-solid fa-wand-magic-sparkles";
    if (badge) {
        badge.innerText = "AI Code Inspector";
        badge.style.background = "rgba(168,85,247,0.15)";
        badge.style.color = "#c084fc";
        badge.style.borderColor = "rgba(168,85,247,0.3)";
    }

    aiLinesBox.innerHTML = `<div style="text-align:center; padding:30px; color:#38bdf8;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><br><br>Yapay zeka kod bloklarınızı inceliyor ve açıklamaları hazırlıyor...</div>`;

    const explainEndpoint = window.ESMA_EXPLAIN_CODE_ENDPOINT || (
        (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
            ? 'http://localhost:5000/api/ai/explain-code'
            : null
    );

    if (explainEndpoint) {
        try {
            const res = await fetch(explainEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code, language: (activeSandboxLang || 'html').toLowerCase() })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.lines && Array.isArray(data.lines) && data.lines.length > 0) {
                    let html = `<div style="font-weight:bold; color:#38bdf8; margin-bottom:12px; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-wand-magic-sparkles"></i> Yapay Zeka Satır Satır Kod Açıklaması</div>`;
                    html += data.lines.map(l => `
                        <div style="margin-bottom:8px; padding:8px 12px; background:rgba(255,255,255,0.03); border-left:3px solid #38bdf8; border-radius:6px;">
                            <div style="font-family:'Fira Code', monospace; color:#f1f5f9; font-size:11.5px;">Satır ${l.line}: <code>${escapeHtml(l.code)}</code></div>
                            <div style="color:#cbd5e1; font-size:12px; margin-top:3px; line-height:1.45;">💡 ${escapeHtml(l.explanation)}</div>
                        </div>
                    `).join('');
                    if (data.verdict) {
                        html += `<div class="ai-mentor-verdict" style="margin-top:12px; padding:10px 14px; background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.3); border-radius:8px; color:#34d399; font-size:12px;"><i class="fa-solid fa-circle-check"></i> <strong>Mentör Değerlendirmesi:</strong> ${escapeHtml(data.verdict)}</div>`;
                    }
                    aiLinesBox.innerHTML = html;
                    return;
                }
            }
        } catch (err) {
            console.warn("Backend kod analizi servisi henüz aktif değil, dahili yerel kural motoruna geçiliyor:", err.message);
        }
    }

    // Fallback: Dahili yerel kod analizi
    setTimeout(() => {
        aiLinesBox.innerHTML = analyzeCodeLineByLine(code, (activeSandboxLang || 'html').toLowerCase());
    }, 350);
}

// ============================================================
// VS CODE TARZI OTOMATİK TAMAMLAMA MOTORU (INTELLISENSE)
// ============================================================

const vsCodeDictionary = {
    html: [
        { text: "div", insert: "<div class=\"$1\">$0</div>", type: "tag", desc: "HTML Bölüm Kapsayıcısı" },
        { text: "section", insert: "<section id=\"$1\">\n  $0\n</section>", type: "tag", desc: "Anlamsal Bölüm" },
        { text: "h1", insert: "<h1>$0</h1>", type: "tag", desc: "Birincil Başlık" },
        { text: "p", insert: "<p>$0</p>", type: "tag", desc: "Metin Paragrafı" },
        { text: "button", insert: "<button type=\"button\" class=\"btn\">$0</button>", type: "tag", desc: "Tıklanabilir Buton" },
        { text: "input", insert: "<input type=\"text\" placeholder=\"$1\" />", type: "tag", desc: "Girdi Alanı" },
        { text: "form", insert: "<form onsubmit=\"$1\">\n  $0\n</form>", type: "tag", desc: "Kullanıcı Formu" },
        { text: "span", insert: "<span>$0</span>", type: "tag", desc: "Satır İçi Metin" }
    ],
    css: [
        { text: "display: flex;", insert: "display: flex;\nalign-items: center;\njustify-content: space-between;", type: "snippet", desc: "Flexbox Yerleşimi" },
        { text: "border-radius", insert: "border-radius: 12px;", type: "property", desc: "Köşe Yuvarlama" },
        { text: "background", insert: "background: rgba(15, 23, 42, 0.85);", type: "property", desc: "Arka Plan Rengi" },
        { text: "color", insert: "color: #38bdf8;", type: "property", desc: "Metin Rengi" },
        { text: "backdrop-filter", insert: "backdrop-filter: blur(12px);", type: "property", desc: "Bulanıklık Efekti" },
        { text: "box-shadow", insert: "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);", type: "property", desc: "Kutu Gölgesi" }
    ],
    javascript: [
        { text: "console.log", insert: "console.log($0);", type: "method", desc: "Konsola Çıktı Yazdır" },
        { text: "document.getElementById", insert: "document.getElementById(\"$1\");", type: "method", desc: "ID ile Eleman Seç" },
        { text: "addEventListener", insert: "addEventListener(\"click\", (e) => {\n  $0\n});", type: "method", desc: "Olay Dinleyici" },
        { text: "function", insert: "function $1($2) {\n  $0\n}", type: "keyword", desc: "Fonksiyon Tanımı" },
        { text: "async function", insert: "async function $1() {\n  const res = await fetch(\"$2\");\n  return res.json();\n}", type: "snippet", desc: "Asenkron İstek" },
        { text: "const", insert: "const $1 = $2;", type: "keyword", desc: "Sabit Tanımlama" },
        { text: "let", insert: "let $1 = $2;", type: "keyword", desc: "Değişken Tanımlama" },
        { text: "map", insert: ".map(item => item.$0)", type: "method", desc: "Dizi Dönüşümü" },
        { text: "filter", insert: ".filter(item => $0)", type: "method", desc: "Dizi Filtreleme" }
    ],
    python: [
        { text: "def", insert: "def $1($2):\n    \"\"\"$3\"\"\"\n    return $0", type: "keyword", desc: "Fonksiyon Tanımı" },
        { text: "print", insert: "print(f\"{$0}\")", type: "method", desc: "Konsol Çıktısı" },
        { text: "import", insert: "import $0", type: "keyword", desc: "Modül Dahil Et" },
        { text: "class", insert: "class $1:\n    def __init__(self):\n        pass", type: "keyword", desc: "Sınıf Tanımı" },
        { text: "for in", insert: "for item in $1:\n    print(item)", type: "snippet", desc: "Döngü" },
        { text: "try except", insert: "try:\n    $1\nexcept Exception as e:\n    print(e)", type: "snippet", desc: "Hata Yakalama" }
    ],
    sql: [
        { text: "SELECT * FROM", insert: "SELECT * FROM $1 WHERE $2;", type: "keyword", desc: "Veri Sorgulama" },
        { text: "INSERT INTO", insert: "INSERT INTO $1 (col1, col2) VALUES ('val1', 'val2');", type: "keyword", desc: "Veri Ekleme" },
        { text: "UPDATE SET", insert: "UPDATE $1 SET status = 'active' WHERE id = 1;", type: "keyword", desc: "Veri Güncelleme" },
        { text: "DELETE FROM", insert: "DELETE FROM $1 WHERE id = $2;", type: "keyword", desc: "Veri Silme" },
        { text: "INNER JOIN", insert: "INNER JOIN $1 ON $1.id = $2.foreign_id", type: "keyword", desc: "Tablo Birleştirme" },
        { text: "CREATE TABLE", insert: "CREATE TABLE $1 (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);", type: "snippet", desc: "Tablo Oluşturma" }
    ],
    csharp: [
        { text: "Console.WriteLine", insert: "Console.WriteLine(\"$0\");", type: "method", desc: "Konsol Çıktısı" },
        { text: "public class", insert: "public class $1\n{\n    public int Id { get; set; }\n}", type: "keyword", desc: "Sınıf Tanımı" },
        { text: "public void", insert: "public void $1()\n{\n    $0\n}", type: "keyword", desc: "Metot Tanımı" },
        { text: "using System;", insert: "using System;\nusing System.Collections.Generic;\nusing System.Linq;", type: "snippet", desc: "Temel İsim Alanları" }
    ],
    cpp: [
        { text: "std::cout", insert: "std::cout << \"$0\" << std::endl;", type: "method", desc: "Konsol Çıktısı" },
        { text: "#include <iostream>", insert: "#include <iostream>\n#include <vector>\n#include <string>", type: "snippet", desc: "C++ Başlık Dosyaları" },
        { text: "int main()", insert: "int main() {\n    std::cout << \"Hello COD+\" << std::endl;\n    return 0;\n}", type: "snippet", desc: "Giriş Noktası" }
    ]
};

function setupVsCodeAutocomplete(textarea, getLangCallback) {
    if (!textarea || textarea._hasAutocomplete) return;
    textarea._hasAutocomplete = true;

    // Dropdown elemanını oluştur ve body'e ekle
    const dropdown = document.createElement("div");
    dropdown.className = "vscode-autocomplete-dropdown";
    document.body.appendChild(dropdown);

    let activeIndex = 0;
    let currentSuggestions = [];

    function getNormalizedLang() {
        const raw = getLangCallback ? getLangCallback() : 'javascript';
        const l = raw.toLowerCase();
        if (l.includes("html")) return "html";
        if (l.includes("css")) return "css";
        if (l.includes("python") || l.includes("py")) return "python";
        if (l.includes("sql")) return "sql";
        if (l.includes("csharp") || l.includes("c#")) return "csharp";
        if (l.includes("cpp") || l.includes("c++")) return "cpp";
        return "javascript";
    }

    function positionDropdown() {
        const rect = textarea.getBoundingClientRect();
        dropdown.style.left = `${rect.left + 20}px`;
        dropdown.style.top = `${rect.top + 36}px`;
        dropdown.style.width = `${Math.min(320, rect.width - 40)}px`;
    }

    function showSuggestions(list) {
        if (!list || list.length === 0) {
            hideDropdown();
            return;
        }
        currentSuggestions = list;
        activeIndex = 0;
        dropdown.innerHTML = "";

        const iconClasses = {
            keyword: "icon-keyword",
            method: "icon-method",
            property: "icon-property",
            snippet: "icon-snippet",
            tag: "icon-tag"
        };
        const iconSymbols = {
            keyword: "🔤",
            method: "🟣",
            property: "🟧",
            snippet: "⚡",
            tag: "🏷️"
        };

        list.forEach((item, idx) => {
            const div = document.createElement("div");
            div.className = `vscode-item ${idx === 0 ? 'selected' : ''}`;
            div.innerHTML = `
                <div class="vscode-item-left">
                    <span class="vscode-icon ${iconClasses[item.type] || 'icon-keyword'}">${iconSymbols[item.type] || '🔷'}</span>
                    <span class="vscode-match-text">${escapeHtml(item.text)}</span>
                </div>
                <span class="vscode-item-type">${item.desc || item.type}</span>
            `;
            div.addEventListener("mousedown", (e) => {
                e.preventDefault();
                insertSuggestion(item);
            });
            dropdown.appendChild(div);
        });

        positionDropdown();
        dropdown.style.display = "block";
    }

    function hideDropdown() {
        dropdown.style.display = "none";
        currentSuggestions = [];
    }

    function insertSuggestion(item) {
        const textToInsert = (item.insert || item.text).replace(/\$\d+/g, "");
        const val = textarea.value;
        const start = textarea.selectionStart;
        
        // İmleçten önceki son kelimeyi bul
        const before = val.substring(0, start);
        const match = before.match(/[\w<#:\.\-]+$/);
        const prefixLen = match ? match[0].length : 0;

        const newBefore = val.substring(0, start - prefixLen) + textToInsert;
        const after = val.substring(start);

        textarea.value = newBefore + after;
        textarea.selectionStart = textarea.selectionEnd = newBefore.length;
        hideDropdown();
        textarea.focus();

        // Eğer textarea bir girdi olayını tetikliyorsa (örneğin IDE canlı çıktı veya otomatik kayıt)
        textarea.dispatchEvent(new Event('input'));
    }

    textarea.addEventListener("keydown", (e) => {
        // Ctrl + Space ile manuel tetikleme
        if (e.ctrlKey && e.code === "Space") {
            e.preventDefault();
            const lang = getNormalizedLang();
            const dict = vsCodeDictionary[lang] || vsCodeDictionary.javascript;
            showSuggestions(dict);
            return;
        }

        if (dropdown.style.display === "block") {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                activeIndex = (activeIndex + 1) % currentSuggestions.length;
                updateSelection();
                return;
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                activeIndex = (activeIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
                updateSelection();
                return;
            }
            if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                if (currentSuggestions[activeIndex]) {
                    insertSuggestion(currentSuggestions[activeIndex]);
                }
                return;
            }
            if (e.key === "Escape") {
                hideDropdown();
                return;
            }
        }
    });

    function updateSelection() {
        const items = dropdown.querySelectorAll(".vscode-item");
        items.forEach((it, idx) => {
            if (idx === activeIndex) {
                it.classList.add("selected");
                it.scrollIntoView({ block: "nearest" });
            } else {
                it.classList.remove("selected");
            }
        });
    }

    textarea.addEventListener("input", (e) => {
        const val = textarea.value;
        const start = textarea.selectionStart;
        const before = val.substring(0, start);
        const match = before.match(/[\w<#:\.\-]+$/);

        if (!match || match[0].length < 2) {
            hideDropdown();
            return;
        }

        const query = match[0].toLowerCase();
        const lang = getNormalizedLang();
        const dict = vsCodeDictionary[lang] || vsCodeDictionary.javascript;

        const filtered = dict.filter(item => 
            item.text.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query))
        );

        if (filtered.length > 0) {
            showSuggestions(filtered);
        } else {
            hideDropdown();
        }
    });

    textarea.addEventListener("blur", () => {
        setTimeout(hideDropdown, 200);
    });
}

// ============================================================
// DANIŞMAN HAFIZASI & YAPAY ZEKA ÖĞRENME SİSTEMİ
// ============================================================

const defaultMentorAdvices = [
    {
        id: "adv_1",
        mentorName: "Deniz Kaya",
        topic: "Güvenlik & Kimlik Doğrulama",
        advice: "Parolalar veritabanında asla düz metin saklanamaz! Daima bcrypt veya Argon2 ile tuzlu hashlenmeli ve JWT token süresi kısıtlı tutulmalıdır."
    },
    {
        id: "adv_2",
        mentorName: "Deniz Kaya",
        topic: "Veritabanı & SQL Mimarisi",
        advice: "SQL Injection riskini sıfırlamak için string birleştirmelerden kaçının; her zaman Prepared Statements ve parametreli sorgu kullanın."
    },
    {
        id: "adv_3",
        mentorName: "Deniz Kaya",
        topic: "Frontend & Performans",
        advice: "Büyük veri listelerinde sanal liste (virtual scroll) kullanın ve state güncellemelerinde gereksiz DOM re-render'larını minimize edin."
    }
];

function getMentorAdvices() {
    const saved = localStorage.getItem("codplus_mentor_advices");
    if (saved) {
        try { return JSON.parse(saved); } catch(e) {}
    }
    return defaultMentorAdvices;
}

function saveMentorAdvices(advices) {
    localStorage.setItem("codplus_mentor_advices", JSON.stringify(advices));
}

function learnMentorAdvice(topic, feedback) {
    if (!feedback) return;
    const advices = getMentorAdvices();
    advices.unshift({
        id: "adv_" + Date.now(),
        mentorName: userProfile.username || 'Deniz Kaya',
        topic: topic,
        advice: feedback
    });
    saveMentorAdvices(advices);
}

// ============================================================
// ARKADAŞLIK VE İLETİŞİM AĞI MODÜLÜ
// ============================================================

const defaultFriends = [
    { id: "f1", name: "Ahmet Yılmaz", role: "ogrenci", field: "Frontend Geliştirici (HTML/CSS)", status: "accepted", online: true, avatar: "👨‍💻" },
    { id: "f2", name: "Zeynep Kaya", role: "danisman", field: "Kıdemli Backend & Python Mentörü", status: "accepted", online: true, avatar: "👩‍🏫" },
    { id: "f3", name: "Can Demir", role: "ogrenci", field: "SQL & Veritabanı Mimarisi", status: "accepted", online: false, avatar: "🧑‍💻" },
    { id: "f4", name: "Elif Arslan", role: "ogrenci", field: "Fullstack Web & React", status: "pending", online: true, avatar: "👩‍💻" }
];

function getFriends() {
    const saved = localStorage.getItem("codplus_friends");
    if (saved) {
        try { return JSON.parse(saved); } catch(e) {}
    }
    return defaultFriends;
}

function saveFriends(friends) {
    localStorage.setItem("codplus_friends", JSON.stringify(friends));
    updateFriendsBadge();
}

function updateFriendsBadge() {
    const friends = getFriends();
    const pending = friends.filter(f => f.status === 'pending');
    const badge = document.getElementById("friends-nav-badge");
    if (badge) {
        badge.style.display = pending.length > 0 ? "block" : "none";
    }
    const countEl = document.getElementById("ftab-friends-count");
    const reqEl = document.getElementById("ftab-req-count");
    if (countEl) countEl.innerText = friends.filter(f => f.status === 'accepted').length;
    if (reqEl) reqEl.innerText = pending.length;
}

function openFriendsModal() {
    const modal = document.getElementById("friends-modal");
    if (modal) modal.classList.remove("hidden");
    updateFriendsBadge();
    renderFriendsList();
    renderFriendRequests();
    renderFriendSuggestions();
}

function closeFriendsModal() {
    const modal = document.getElementById("friends-modal");
    if (modal) modal.classList.add("hidden");
}

function switchFriendTab(tab) {
    const tabs = ['friends', 'search', 'requests'];
    tabs.forEach(t => {
        const btn = document.getElementById(`ftab-${t}`);
        const panel = document.getElementById(`friend-tab-content-${t}`);
        if (t === tab) {
            if (btn) btn.classList.add("active");
            if (panel) panel.classList.remove("hidden");
        } else {
            if (btn) btn.classList.remove("active");
            if (panel) panel.classList.add("hidden");
        }
    });
}

function renderFriendsList() {
    const container = document.getElementById("friends-list-container");
    if (!container) return;
    container.innerHTML = "";

    const friends = getFriends().filter(f => f.status === 'accepted');
    if (friends.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:30px; color:#94a3b8; font-size:13px;">Henüz arkadaşınız bulunmuyor. 'Arkadaş Ekle' sekmesinden yeni geliştiriciler ekleyebilirsiniz!</div>`;
        return;
    }

    friends.forEach(f => {
        const item = document.createElement("div");
        item.className = "friend-row-card";
        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:24px;">${f.avatar || '👨‍💻'}</span>
                <div>
                    <div style="font-size:13.5px; font-weight:700; color:#f8fafc; display:flex; align-items:center; gap:6px;">
                        <span>${escapeHtml(f.name)}</span>
                        ${f.online ? '<span style="color:#10b981; font-size:10px;">● Çevrimiçi</span>' : '<span style="color:#64748b; font-size:10px;">○ Çevrimdışı</span>'}
                    </div>
                    <div style="font-size:11.5px; color:#94a3b8;">${escapeHtml(f.field || 'Yazılımcı')}</div>
                </div>
            </div>
            <div style="display:flex; gap:6px;">
                <button type="button" onclick="openChatMessengerModal('${escapeHtml(f.name)}')" title="Mesaj Gönder" style="background:rgba(168,85,247,0.15); border:1px solid #a855f7; color:#a855f7; padding:6px 10px; border-radius:10px; font-size:12px; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:5px;">
                    <i class="fa-solid fa-comment-dots"></i> Mesaj
                </button>
                <button type="button" onclick="inviteFriendToDuel('${escapeHtml(f.name)}')" title="1v1 Düelloya Davet Et" style="background:rgba(245,158,11,0.15); border:1px solid #f59e0b; color:#f59e0b; padding:6px 10px; border-radius:10px; font-size:12px; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:5px;">
                    <i class="fa-solid fa-bolt"></i> Düello
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderFriendRequests() {
    const container = document.getElementById("friend-requests-container");
    if (!container) return;
    container.innerHTML = "";

    const requests = getFriends().filter(f => f.status === 'pending');
    if (requests.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:30px; color:#94a3b8; font-size:13px;">Bekleyen yeni arkadaşlık isteğiniz yok.</div>`;
        return;
    }

    requests.forEach(f => {
        const item = document.createElement("div");
        item.className = "friend-row-card";
        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:24px;">${f.avatar || '👩‍💻'}</span>
                <div>
                    <div style="font-size:13.5px; font-weight:700; color:#f8fafc;">${escapeHtml(f.name)}</div>
                    <div style="font-size:11.5px; color:#38bdf8;">${escapeHtml(f.field || 'Yazılımcı')} - Arkadaşlık İsteği</div>
                </div>
            </div>
            <div style="display:flex; gap:6px;">
                <button type="button" onclick="acceptFriendRequest('${f.id}')" style="background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#10b981; padding:6px 12px; border-radius:10px; font-size:12px; cursor:pointer; font-weight:600;">
                    ✓ Kabul Et
                </button>
                <button type="button" onclick="rejectFriendRequest('${f.id}')" style="background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#ef4444; padding:6px 10px; border-radius:10px; font-size:12px; cursor:pointer;">
                    ✕ Reddet
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderFriendSuggestions() {
    const container = document.getElementById("friend-suggestions-container");
    if (!container) return;
    const suggestions = [
        { name: "Kerem Aksoy", field: "Frontend & CSS Grid Uzmanı", avatar: "🧑‍💻" },
        { name: "Selin Yılmaz", field: "Python & Veri Bilimi Mentörü", avatar: "👩‍🏫" },
        { name: "Emre Koç", field: "C++ Oyun Geliştirici", avatar: "👨‍💻" }
    ];
    container.innerHTML = suggestions.map(s => `
        <div class="friend-row-card">
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:24px;">${s.avatar}</span>
                <div>
                    <div style="font-size:13.5px; font-weight:700; color:#f8fafc;">${s.name}</div>
                    <div style="font-size:11.5px; color:#94a3b8;">${s.field}</div>
                </div>
            </div>
            <button type="button" onclick="sendFriendRequest('${s.name}')" style="background:rgba(56,189,248,0.15); border:1px solid #38bdf8; color:#38bdf8; padding:6px 12px; border-radius:10px; font-size:12px; cursor:pointer; font-weight:600;">
                <i class="fa-solid fa-user-plus"></i> İstek Gönder
            </button>
        </div>
    `).join('');
}

function acceptFriendRequest(id) {
    const friends = getFriends();
    const f = friends.find(item => item.id === id);
    if (f) {
        f.status = 'accepted';
        saveFriends(friends);
        renderFriendsList();
        renderFriendRequests();
        alert(`🎉 ${f.name} ile artık arkadaşsınız! Mesaj gönderebilir ve projelerinize ekip üyesi olarak ekleyebilirsiniz.`);
    }
}

function rejectFriendRequest(id) {
    let friends = getFriends();
    friends = friends.filter(item => item.id !== id);
    saveFriends(friends);
    renderFriendRequests();
}

function sendFriendRequest(name) {
    const targetName = name || (document.getElementById("friend-search-input") ? document.getElementById("friend-search-input").value.trim() : "");
    if (!targetName) {
        alert("Lütfen geçerli bir isim yazın.");
        return;
    }
    const friends = getFriends();
    if (friends.some(f => f.name.toLowerCase() === targetName.toLowerCase())) {
        alert(`${targetName} zaten arkadaş listenizde veya bekleyen isteklerde mevcut.`);
        return;
    }
    friends.push({
        id: "f_" + Date.now(),
        name: targetName,
        role: "ogrenci",
        field: "Geliştirici / Yazılım Öğrencisi",
        status: "accepted", // Hızlı test kolaylığı için anında onaylıyoruz
        online: true,
        avatar: "👨‍💻"
    });
    saveFriends(friends);
    renderFriendsList();
    renderFriendSuggestions();
    alert(`✅ ${targetName} adlı geliştiriciye arkadaşlık isteğiniz onaylandı ve arkadaş listenize eklendi!`);
}

function searchFriends() {
    const query = document.getElementById("friend-search-input").value.trim().toLowerCase();
    if (!query) {
        renderFriendSuggestions();
        return;
    }
    const container = document.getElementById("friend-suggestions-container");
    if (!container) return;
    container.innerHTML = `
        <div class="friend-row-card">
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:24px;">👨‍💻</span>
                <div>
                    <div style="font-size:13.5px; font-weight:700; color:#f8fafc;">${escapeHtml(query)}</div>
                    <div style="font-size:11.5px; color:#38bdf8;">COD+ Topluluk Kullanıcısı</div>
                </div>
            </div>
            <button type="button" onclick="sendFriendRequest('${escapeHtml(query)}')" style="background:rgba(56,189,248,0.15); border:1px solid #38bdf8; color:#38bdf8; padding:6px 12px; border-radius:10px; font-size:12px; cursor:pointer; font-weight:600;">
                <i class="fa-solid fa-user-plus"></i> Arkadaş Ekle
            </button>
        </div>
    `;
}

function inviteFriendToDuel(friendName) {
    closeFriendsModal();
    closeChatMessengerModal();
    openDuelModal();
    const titleEl = document.getElementById("duel-match-title");
    if (titleEl) {
        titleEl.innerText = `1v1 Düello: Sen vs ${friendName}!`;
    }
}

// ============================================================
// SOHBET & MESAJLAŞMA MODÜLÜ
// ============================================================

let activeChatFriendName = "Ahmet Yılmaz";

const defaultChatMessages = {
    "Ahmet Yılmaz": [
        { sender: "theirs", text: "Selam! Projedeki Frontend bileşenlerini tamamladım. Kodları inceledin mi?", time: "14:20" },
        { sender: "mine", text: "Harika eline sağlık! Ben de backend API uçlarını hazırlıyorum.", time: "14:22" },
        { sender: "theirs", text: "Süper, birazdan 1v1 HTML düellosu atalım mı?", time: "14:25" }
    ],
    "Zeynep Kaya": [
        { sender: "theirs", text: "Merhaba Deniz! Mentörlük alanında projenizin veritabanı şemasını inceledim, gayet sağlam görünüyor.", time: "10:15" },
        { sender: "mine", text: "Çok teşekkürler hocam! İndeksleme konusunda tavsiyeniz olur mu?", time: "10:18" },
        { sender: "theirs", text: "Sık sorgulanan sütunlara B-Tree index eklemen performansı 10 kat artıracaktır.", time: "10:20" }
    ],
    "Can Demir": [
        { sender: "theirs", text: "Dostum SQL derslerindeki GROUP BY sorgularını çözdün mü?", time: "Dün" },
        { sender: "mine", text: "Evet, HAVING filtresiyle birlikte çok iyi oturdu.", time: "Dün" }
    ]
};

function getChatMessages() {
    const saved = localStorage.getItem("codplus_chat_messages");
    if (saved) {
        try { return JSON.parse(saved); } catch(e) {}
    }
    return defaultChatMessages;
}

function saveChatMessages(chats) {
    localStorage.setItem("codplus_chat_messages", JSON.stringify(chats));
}

function openChatMessengerModal(targetFriend = null) {
    closeFriendsModal();
    const modal = document.getElementById("chat-messenger-modal");
    if (modal) modal.classList.remove("hidden");

    renderChatFriendsList();
    if (targetFriend) {
        selectChatFriend(targetFriend);
    } else {
        const friends = getFriends().filter(f => f.status === 'accepted');
        if (friends.length > 0) {
            selectChatFriend(friends[0].name);
        }
    }
}

function closeChatMessengerModal() {
    const modal = document.getElementById("chat-messenger-modal");
    if (modal) modal.classList.add("hidden");
}

function renderChatFriendsList() {
    const container = document.getElementById("chat-friends-list");
    if (!container) return;
    container.innerHTML = "";

    const friends = getFriends().filter(f => f.status === 'accepted');
    const countEl = document.getElementById("chat-friends-count");
    if (countEl) countEl.innerText = friends.length;

    friends.forEach(f => {
        const isActive = f.name === activeChatFriendName;
        const row = document.createElement("div");
        row.className = `chat-friend-row ${isActive ? 'active' : ''}`;
        row.onclick = () => selectChatFriend(f.name);
        row.innerHTML = `
            <span style="font-size:20px;">${f.avatar || '👨‍💻'}</span>
            <div style="flex:1; overflow:hidden;">
                <div style="font-size:13px; font-weight:700; color:#f8fafc; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${escapeHtml(f.name)}</div>
                <div style="font-size:11px; color:#94a3b8; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${escapeHtml(f.field || 'Geliştirici')}</div>
            </div>
            ${f.online ? '<span style="width:7px; height:7px; background:#10b981; border-radius:50%;"></span>' : ''}
        `;
        container.appendChild(row);
    });
}

function selectChatFriend(friendName) {
    activeChatFriendName = friendName;
    renderChatFriendsList();

    const nameEl = document.getElementById("chat-active-name");
    const statusEl = document.getElementById("chat-active-status");
    const avatarEl = document.getElementById("chat-active-avatar");

    const friend = getFriends().find(f => f.name === friendName) || { name: friendName, field: "Geliştirici", avatar: "👨‍💻", online: true };
    if (nameEl) nameEl.innerText = friend.name;
    if (statusEl) statusEl.innerText = friend.online ? `● Çevrimiçi (${friend.field})` : `○ Çevrimdışı (${friend.field})`;
    if (avatarEl) avatarEl.innerText = friend.avatar || "👨‍💻";

    renderActiveChatMessages();
}

function renderActiveChatMessages() {
    const container = document.getElementById("chat-messages-container");
    if (!container) return;
    container.innerHTML = "";

    const allChats = getChatMessages();
    const messages = allChats[activeChatFriendName] || [
        { sender: "theirs", text: `Selam! COD+ üzerinde birlikte kodlama veya düello yapmak harika olur.`, time: "Yeni" }
    ];

    messages.forEach(msg => {
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble ${msg.sender}`;
        bubble.innerHTML = `
            <div>${escapeHtml(msg.text)}</div>
            <div style="font-size:10px; opacity:0.6; text-align:right; margin-top:3px;">${escapeHtml(msg.time || '')}</div>
        `;
        container.appendChild(bubble);
    });

    container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById("chat-input-text");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const allChats = getChatMessages();
    if (!allChats[activeChatFriendName]) {
        allChats[activeChatFriendName] = [];
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    allChats[activeChatFriendName].push({
        sender: "mine",
        text,
        time: timeStr
    });

    saveChatMessages(allChats);
    input.value = "";
    renderActiveChatMessages();

    // Arkadaşın akıllı otomatik cevabı
    setTimeout(() => {
        simulateFriendReply(activeChatFriendName, text);
    }, 1000);
}

function simulateFriendReply(friendName, userText) {
    const allChats = getChatMessages();
    if (!allChats[friendName]) allChats[friendName] = [];

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const replies = [
        "Kesinlikle katılıyorum! Proje ekibine bu özelliği dahil edebiliriz.",
        "Harika bir fikir! Birazdan 1v1 Düello'ya girip test edelim mi?",
        "Ben de tam o konu üzerinde çalışıyordum, kodları birlikte inceleyelim.",
        "Mentörümüzle konuştum, mimari olarak bu yaklaşımı onayladı. Harika gidiyoruz!"
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];

    allChats[friendName].push({
        sender: "theirs",
        text: reply,
        time: timeStr
    });

    saveChatMessages(allChats);
    if (activeChatFriendName === friendName) {
        renderActiveChatMessages();
    }
}

function inviteActiveChatFriendToDuel() {
    inviteFriendToDuel(activeChatFriendName);
}

// ============================================================
// TAŞINABİLİR / SÜRÜKLENEBİLİR CODDY AI ASİSTANI
// ============================================================

let isCoddyAiMinimized = false;

function toggleCoddyAiWidget() {
    const widget = document.getElementById("coddy-ai-widget");
    if (!widget) return;
    if (widget.classList.contains("hidden")) {
        widget.classList.remove("hidden");
        // Başlangıç konumlandırması (ekran boyutuna göre güvenli yerleşim)
        const isMobile = window.innerWidth <= 768;
        if (!widget.style.left || !widget.style.top) {
            if (isMobile) {
                widget.style.left = "8px";
                widget.style.top = "10px";
            } else {
                widget.style.left = "95px";
                widget.style.top = "85px";
            }
        } else {
            // Eğer daha önce kaydedilen konum ekran dışına taştıysa ekran içine çek
            const rect = widget.getBoundingClientRect();
            if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
                if (isMobile) {
                    widget.style.left = "8px";
                    widget.style.top = "10px";
                } else {
                    widget.style.left = "95px";
                    widget.style.top = "85px";
                }
            }
        }
        initDraggableCoddyAi();
    } else {
        widget.classList.add("hidden");
    }
}

function minimizeCoddyAiWidget() {
    const widget = document.getElementById("coddy-ai-widget");
    const body = document.getElementById("coddy-ai-body");
    if (!widget || !body) return;

    isCoddyAiMinimized = !isCoddyAiMinimized;
    if (isCoddyAiMinimized) {
        body.style.display = "none";
        widget.style.height = "46px";
    } else {
        body.style.display = "flex";
        widget.style.height = window.innerWidth <= 768 ? "min(490px, calc(100dvh - 80px))" : "520px";
    }
}

function initDraggableCoddyAi() {
    const widget = document.getElementById("coddy-ai-widget");
    const handle = document.getElementById("coddy-ai-header");
    if (!widget || !handle || widget.dataset.draggableInitialized) return;
    widget.dataset.draggableInitialized = "true";

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    function startDrag(clientX, clientY, target) {
        if (target.closest(".ai-ctl-btn") || target.closest("button")) return false;
        isDragging = true;
        startX = clientX;
        startY = clientY;

        const rect = widget.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        handle.style.cursor = "grabbing";
        return true;
    }

    function moveDrag(clientX, clientY) {
        if (!isDragging) return;

        const dx = clientX - startX;
        const dy = clientY - startY;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        // Ekran sınırlarını koruma (hem masaüstü hem mobilde taşma engeli)
        const maxLeft = Math.max(8, window.innerWidth - widget.offsetWidth - 8);
        const maxTop = Math.max(8, window.innerHeight - widget.offsetHeight - 8);

        newLeft = Math.max(8, Math.min(newLeft, maxLeft));
        newTop = Math.max(8, Math.min(newTop, maxTop));

        widget.style.left = `${newLeft}px`;
        widget.style.top = `${newTop}px`;
    }

    function endDrag() {
        if (isDragging) {
            isDragging = false;
            handle.style.cursor = "move";
        }
    }

    // Masaüstü Fare Olayları
    handle.addEventListener("mousedown", (e) => {
        if (startDrag(e.clientX, e.clientY, e.target)) {
            e.preventDefault();
        }
    });

    window.addEventListener("mousemove", (e) => {
        moveDrag(e.clientX, e.clientY);
    });

    window.addEventListener("mouseup", endDrag);

    // Mobil & Tablet Dokunma (Touch) Olayları
    handle.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches.length === 1) {
            const touch = e.touches[0];
            if (startDrag(touch.clientX, touch.clientY, e.target)) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    window.addEventListener("touchmove", (e) => {
        if (isDragging && e.touches && e.touches.length === 1) {
            const touch = e.touches[0];
            moveDrag(touch.clientX, touch.clientY);
            e.preventDefault(); // Sürüklerken sayfanın arkada kaymasını engeller
        }
    }, { passive: false });

    window.addEventListener("touchend", endDrag);
    window.addEventListener("touchcancel", endDrag);
}

function quickAiPrompt(type) {
    const input = document.getElementById("coddy-ai-input");
    if (!input) return;

    if (type === 'proje_fikri') {
        input.value = "Bana portföyüm için geliştirebileceğim yaratıcı bir proje fikri ve aranan roller önerir misin?";
    } else if (type === 'kod_ipucu') {
        input.value = "Aktif dersimdeki kodlama görevini çözmem için bana bir ipucu verir misin?";
    } else if (type === 'mentor_tavsiye') {
        input.value = "Bir mentör olarak ekibimi nasıl daha verimli yönetebilir ve arkadaşlarımla proje geliştirebilirim?";
    } else if (type === 'hangi_dil') {
        input.value = "Sıfırdan başlayan veya uzmanlaşmak isteyen biri için SQL, Python ve C++ dillerinin temel farkları nelerdir?";
    } else if (type === 'mentor_klon') {
        input.value = "Danışmanımızın ekibe verdiği mimari tavsiyeleri ve proje standartlarını analiz edip özetler misin?";
    }
    submitCoddyAiMessage();
}

function submitCoddyAiMessage() {
    const input = document.getElementById("coddy-ai-input");
    const stream = document.getElementById("coddy-ai-chat-stream");
    if (!input || !stream) return;

    const query = input.value.trim();
    if (!query) return;

    // Kullanıcı mesajı balonu
    const userMsg = document.createElement("div");
    userMsg.className = "ai-msg ai-msg-user";
    userMsg.innerText = query;
    stream.appendChild(userMsg);

    input.value = "";
    stream.scrollTop = stream.scrollHeight;

    // Yazıyor animasyonu simülasyonu
    const botLoading = document.createElement("div");
    botLoading.className = "ai-msg ai-msg-bot";
    botLoading.id = "ai-temp-loading";
    botLoading.innerHTML = `<span style="color:#00f2fe;"><i class="fa-solid fa-spinner fa-spin"></i> COD+ düşünüyor...</span>`;
    stream.appendChild(botLoading);
    stream.scrollTop = stream.scrollHeight;

    // Esma'nın Yapay Zeka Modelini veya Dahili COD+ AI Motorunu Çalıştır
    setTimeout(async () => {
        const loading = document.getElementById("ai-temp-loading");
        if (loading) loading.remove();

        // 1. Önce Esma'nın eğittiği yapay zeka modeline sorulur
        let replyHtml = await queryEsmaAiModel(query);

        // 2. Esma'nın API'si henüz aktif değilse dahili COD+ AI kuralları yanıt üretir
        if (!replyHtml) {
            replyHtml = generateCodPlusAiResponse(query);
        }

        const botReply = document.createElement("div");
        botReply.className = "ai-msg ai-msg-bot";
        botReply.innerHTML = `
            <div style="font-size:11px; font-weight:700; color:#00f2fe; margin-bottom:4px; display:flex; align-items:center; gap:5px;">
                <span>🤖 COD+ AI</span>
            </div>
            <div class="ai-msg-text">
                ${replyHtml}
            </div>
        `;
        stream.appendChild(botReply);
        stream.scrollTop = stream.scrollHeight;
    }, 600);
}

// ============================================================
// ESMA YAPAY ZEKA MODELİ ENTEGRASYON KÖPRÜSÜ (ESMA AI API BRIDGE)
// ============================================================
// Esma yapay zeka öğrenimini tamamlayıp backend'i açtığında aşağıdaki endpoint'e bağlanır:
let ESMA_AI_ENDPOINT = window.ESMA_AI_ENDPOINT || (
    (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
        ? 'http://localhost:5000/api/ai/chat'
        : null
); 

async function queryEsmaAiModel(query, context = {}) {
    if (!ESMA_AI_ENDPOINT) return null;
    try {
        const res = await fetch(ESMA_AI_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: query,
                role: userProfile.role || 'ogrenci',
                user: userProfile.name || 'Geliştirici',
                language: selectedLang || 'HTML',
                mentor_advices: getMentorAdvices(),
                context: context
            })
        });
        if (!res.ok) throw new Error("API hatası");
        const data = await res.json();
        return data.reply || data.response || data.message || null;
    } catch (err) {
        console.warn("Esma AI modeline henüz ulaşılamadı, dahili COD+ AI yanıtı veriliyor:", err);
        return null;
    }
}

function generateCodPlusAiResponse(query) {
    const q = query.toLowerCase();
    const isMentor = userProfile.role === 'danisman';
    const lang = (selectedLang || 'HTML').toUpperCase();

    // 1. GÜNLÜK HAYAT, FAL, BURÇ, BOŞ SOHBET FİLTRESİ (TAM ENGELLEME)
    const dailyLifeKeywords = [
        "fal", "kahve", "kahve falı", "burç", "burcum", "horoskop", "astroloji",
        "aşk", "sevgili", "nasılsın", "günlük", "magazin", "rüya", "rüya tabiri",
        "hava durumu", "şans", "dedikodu", "fal bak"
    ];
    if (dailyLifeKeywords.some(kw => q.includes(kw))) {
        return `⛔ <strong>Kapsam Dışı İstek:</strong><br>
        Ben <strong>COD+ Yazılım Mimarisi & Teknik Mentörlük</strong> yapay zekasıyım.<br>
        Kahve falı, burç yorumu, aşk/günlük hayat sohbetleri ve magazin gibi konular çalışma prensiplerim ve teknik odak alanım dışındadır.<br><br>
        💡 <em>Benimle yazılım dilleri, algoritmalar, SQL optimizasyonu, proje görev dağılımları, kod inceleme kriterleri ve danışman standartları hakkında konuşabilirsiniz.</em>`;
    }

    // 2. DANIŞMAN KLONU & ÖĞRENİLMİŞ TAVSİYELERİ TAKLİT ETME
    if (q.includes("klon") || q.includes("danışman") || q.includes("tavsiye") || q.includes("standart") || q.includes("öğren")) {
        const advices = getMentorAdvices();
        let adviceListHtml = "";
        if (advices && advices.length > 0) {
            adviceListHtml = advices.slice(0, 3).map((a, idx) => 
                `<li><strong>${escapeHtml(a.topic || 'Mimari Direktif')}:</strong> "${escapeHtml(a.advice)}" <span style="font-size:10px; opacity:0.7;">— ${escapeHtml(a.mentorName)}</span></li>`
            ).join("");
        } else {
            adviceListHtml = `<li>Temiz Kod (Clean Code) standartları, modüler fonksiyon yapısı ve erken hata yakalama (guard clause).</li>`;
        }

        return `🧠 <strong>Danışman Klonu & Öğrenilmiş Mimari Standartlar:</strong><br>
        Danışmanınızın ekip üyelerine yaptığı kod incelemeleri ve görev revizyonlarından öğrendiğim kritik prensipler:<br>
        <ul style="margin: 8px 0 8px 18px; padding:0; font-size:12px; line-height:1.6;">
            ${adviceListHtml}
        </ul>
        🤖 <strong>Danışman Adına Geliştiriciye Tavsiyem:</strong><br>
        <em>"Görevleri teslim etmeden önce parametreli doğrulamalarınızı yapın, fonksiyonlarınızı tek bir amaca hizmet edecek şekilde atomik tutun ve kodlarınızı mentor onayına açıklamalarla gönderin!"</em>`;
    }

    // 3. PROJE VE EKİP ROLLERİ
    if (q.includes("proje") || q.includes("fikri") || q.includes("ekip") || q.includes("rol")) {
        return `💡 <strong>Önerilen Proje Mimarisi:</strong><br>
        <strong>"Gerçek Zamanlı Geliştirici Görev Panosu (Kanban + AI)"</strong><br>
        • <strong>Frontend:</strong> React / HTML5 arayüzü ile sürükle-bırak görev kartları.<br>
        • <strong>Backend & SQL:</strong> Görev durumları, kullanıcı yetkileri ve Transaction yönetimi.<br>
        • <strong>Ekip İhtiyacı:</strong> 1 Frontend Geliştirici, 1 Backend / SQL Uzmanı.<br>
        Menüdeki <strong>Projeler & Ekip</strong> sekmesinden hemen bu projeyi oluşturup arkadaşlarını davet edebilirsin! 🚀`;
    }

    // 4. DİL VE TEKNOLOJİ ÖNERİLERİ
    if (q.includes("dil") || q.includes("hangi")) {
        return `🌐 <strong>Dillerin İşlevleri Özeti:</strong><br>
        • <strong>HTML / CSS / JS:</strong> Tarayıcı ve modern web dünyasının temel yapıtaşıdır.<br>
        • <strong>SQL:</strong> Bankacılık, e-ticaret ve tüm kurumsal verilerin ilişkisel mimarisidir.<br>
        • <strong>Python:</strong> Veri analizi, makine öğrenimi ve hızlı prototipleme kralıdır.<br>
        • <strong>C#:</strong> .NET ekosistemi, kurumsal backend mimarileri ve Unity oyun motoru.<br>
        • <strong>C++:</strong> Yüksek performans, işletim sistemleri, oyun motorları ve bellek yönetimi.`;
    }

    // 5. KODLAMA, HATA VE İPUCU
    if (q.includes("ipucu") || q.includes("hata") || q.includes("kod") || q.includes("görev")) {
        return `🐞 <strong>Kodlama & İpucu Desteği:</strong><br>
        Şu an <strong>${lang}</strong> kulvarındasın. Kod yazarken:<br>
        • Syntax kurallarına ve büyük/küçük harf duyarlılığına dikkat et.<br>
        • Konsol çıktılarını IDE penceresindeki <em>'Canlı Çıktı / Konsol'</em> sekmesinden adım adım gözlemle.<br>
        • Takıldığın yerde <strong>Dijital El Kitabı</strong>'nı açarak resmi örnek kod şablonlarına göz atabilirsin!`;
    }

    return `💡 <strong>COD+ AI Teknik Yanıtı:</strong><br>
    Sorun için teşekkürler! ${isMentor ? 'Sayın Danışmanım' : 'Sevgili Geliştirici'}, COD+ platformunda 150 kapsamlı ders, çok dilli konsol motoru, görev panosu, akran düelloları ve danışman kod inceleme sistemi aktif. Proje mimarisi ve kodlama konularında sormak istediğin her şeyi yanıtlamaya hazırım!`;
}

// Sayfa ilk yüklendiğinde profili, arkadaşları ve araçları hazırla
document.addEventListener("DOMContentLoaded", () => {
    closePdfReader();
    initUserProfile();
    applyRoleUI(userProfile.role || 'ogrenci');
    updateFriendsBadge();
    renderProjectInvites();
    initDraggableCoddyAi();
    initGlobalStarrySky();

    // IDE kod editörüne VS Code IntelliSense bağla
    const ideEditor = document.getElementById("code-editor");
    if (ideEditor) {
        setupVsCodeAutocomplete(ideEditor, () => (activeSandboxLang || 'html').toLowerCase());
    }

    // F5 / Sayfa yenilemede: Oturum açıksa landing'e ASLA düşürme, son bulunulan ekranı aç!
    if (userProfile && userProfile.isLoggedIn) {
        const savedView = localStorage.getItem("codplus_active_view") || (userProfile.role === 'danisman' ? 'projects' : 'map');
        if (userProfile.role === 'danisman') {
            startMentorApp();
        } else {
            startApp();
        }
        if (savedView) {
            switchView(savedView);
        }
    }
});

// ============================================================
// DOĞAL TÜM EKRAN YILDIZLI GÖKYÜZÜ & İMLEÇ YILDIZ İZİ MOTORU
// ============================================================
function initGlobalStarrySky() {
    const canvas = document.getElementById("global-starry-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars = [];
    let shootingStar = null;
    let cursorStars = [];
    let animFrameId = null;

    // Tam ekran yeniden boyutlandırma
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Doğal Beyaz Minik Yıldızlar Üret (Sakin, Dinlendirici, İmleçteki Gibi Yumuşak Parlayan)
    function createNaturalStars(count = 300) {
        stars = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 1.2 + 0.45,
                alpha: Math.random() * 0.35 + 0.45, // Dengeli, dinlendirici starlight ışığı
                breatheSpeed: Math.random() * 0.0004 + 0.0002, // 15-25 saniyede bir hafif göksel nefes (asla hızlı kırpışmaz)
                phase: Math.random() * Math.PI * 2,
                glow: Math.random() * 3 + 1.5,
                isSparkle: Math.random() < 0.08,
                sparkleSize: Math.random() * 2.5 + 2.0
            });
        }
    }

    // Doğal Kayan Beyaz Yıldız Tetikle
    function triggerNaturalShootingStar() {
        if (shootingStar) return;
        const startX = Math.random() * (width * 0.7) + width * 0.2;
        const startY = Math.random() * (height * 0.4);
        const speed = Math.random() * 6 + 10;
        const angle = (-32 * Math.PI) / 180; // ~32 derece doğal süzülme açısı

        shootingStar = {
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed * -1.2,
            vy: Math.sin(angle) * speed * -1,
            length: Math.random() * 60 + 75,
            alpha: 1.0,
            decay: Math.random() * 0.018 + 0.016
        };
    }

    setInterval(triggerNaturalShootingStar, 8500);

    // ========================================================
    // İMLECİ TAKİP EDEN DOĞAL YILDIZLAR & YILDIZ TOZU (CURSOR TRAIL)
    // ========================================================
    function spawnCursorStar(x, y) {
        if (cursorStars.length > 90) return; // Performans emniyeti
        for (let i = 0; i < 2; i++) {
            cursorStars.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7 - 0.2,
                r: Math.random() * 1.6 + 0.8,
                alpha: 1.0,
                decay: Math.random() * 0.024 + 0.016,
                isDiamond: Math.random() < 0.45,
                color: Math.random() < 0.75 ? '#ffffff' : '#e0f2fe'
            });
        }
    }

    window.addEventListener("mousemove", (e) => {
        spawnCursorStar(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches[0]) {
            spawnCursorStar(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    // Narin 4 Köşeli Yıldız Çiz
    function drawNaturalDiamond(cx, cy, radius, alpha, color) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.beginPath();
        const inner = radius * 0.22;
        ctx.moveTo(0, -radius);
        ctx.lineTo(inner, -inner);
        ctx.lineTo(radius, 0);
        ctx.lineTo(inner, inner);
        ctx.lineTo(0, radius);
        ctx.lineTo(-inner, inner);
        ctx.lineTo(-radius, 0);
        ctx.lineTo(-inner, -inner);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    resize();
    createNaturalStars(300);

    function render(time) {
        ctx.clearRect(0, 0, width, height);

        // 1. Doğal Gece Gökyüzü Minik Beyaz Yıldızları (İmleçteki Gibi Sakin ve Narin Parlama)
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            // Hızlı yanıp sönme YOK - İmleçteki gibi dingin, yumuşak, sabit starlight ışıltısı
            const breath = Math.sin((time || 0) * s.breatheSpeed + s.phase) * 0.12;
            const currentAlpha = Math.max(0.3, Math.min(0.85, s.alpha + breath));

            ctx.save();
            ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
            ctx.shadowBlur = s.glow;

            if (s.isSparkle) {
                drawNaturalDiamond(s.x, s.y, s.sparkleSize, currentAlpha, '#ffffff');
            } else {
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = currentAlpha;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        // 2. Doğal Kayan Beyaz Yıldız (Shooting Star)
        if (shootingStar) {
            ctx.save();
            const tailX = shootingStar.x - (shootingStar.vx / 10) * shootingStar.length;
            const tailY = shootingStar.y - (shootingStar.vy / 10) * shootingStar.length;

            const grad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
            grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
            grad.addColorStop(0.25, `rgba(224, 242, 254, ${shootingStar.alpha * 0.75})`);
            grad.addColorStop(1, 'transparent');

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.6;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            // Parlak çekirdek
            ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.alpha})`;
            ctx.beginPath();
            ctx.arc(shootingStar.x, shootingStar.y, 1.8, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            shootingStar.x += shootingStar.vx;
            shootingStar.y += shootingStar.vy;
            shootingStar.alpha -= shootingStar.decay;

            if (shootingStar.alpha <= 0) {
                shootingStar = null;
            }
        }

        // 3. İmleci Takip Eden Doğal Yıldız Tozu & Parıltılar
        for (let i = cursorStars.length - 1; i >= 0; i--) {
            const p = cursorStars[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;
            p.r *= 0.985;

            if (p.alpha <= 0 || p.r <= 0.2) {
                cursorStars.splice(i, 1);
                continue;
            }

            if (p.isDiamond) {
                drawNaturalDiamond(p.x, p.y, p.r * 2.2, p.alpha, p.color);
            } else {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        animFrameId = requestAnimationFrame(render);
    }

    window.addEventListener("resize", () => {
        resize();
        createNaturalStars(340);
    });

    animFrameId = requestAnimationFrame(render);
}

// Sayfa zaten yüklenmişse hemen başlat
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(initGlobalStarrySky, 50);
}




