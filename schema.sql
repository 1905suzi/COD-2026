-- ------------------------------------------------------------
-- PostgreSQL Production Schema for COD+ Project (TÜBİTAK 2242)
-- Sokratik Öğrenme, Uyarlanabilir Teşhis (Adaptive Remediation)
-- ve Danışman / Mentör Takip Mimarisi
-- ------------------------------------------------------------

-- 1. KULLANICILAR & ROLLER (USERS)
CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    pwd_hash      VARCHAR(256) NOT NULL,
    role          VARCHAR(20)  DEFAULT 'ogrenci',   -- 'ogrenci' | 'danisman' | 'admin'
    level         VARCHAR(20)  DEFAULT 'Çırak',    -- 'Çırak' | 'Kalfa' | 'Usta' | 'Uzman'
    points        INTEGER      DEFAULT 0,
    streak_days   INTEGER      DEFAULT 0,          -- Günlük çalışma serisi (streak)
    last_active   TIMESTAMP    DEFAULT NOW(),
    created_at    TIMESTAMP    DEFAULT NOW()
);

-- 2. AKTİVİTELER (DERSLER, ALIŞTIRMALAR, MİNİ PROJELER)
CREATE TABLE IF NOT EXISTS activities (
    id            SERIAL PRIMARY KEY,
    category      VARCHAR(30)  NOT NULL,           -- 'frontend' | 'backend'
    subcategory   VARCHAR(30)  NOT NULL,           -- 'html' | 'css' | 'javascript' | 'python' | 'csharp' | 'sql' | 'cpp'
    activity_type VARCHAR(20)  NOT NULL,           -- 'ders' | 'alistirma' | 'mini_proje'
    title         VARCHAR(150) NOT NULL,
    description   TEXT,
    content       TEXT,
    points        INTEGER      NOT NULL DEFAULT 10,
    difficulty    VARCHAR(10)  DEFAULT 'kolay',    -- 'kolay' | 'orta' | 'zor'
    tags          VARCHAR(255),                    -- Konu etiketleri (örn: 'form,input,validation')
    is_repeatable BOOLEAN      DEFAULT FALSE,
    hint          TEXT,
    created_at    TIMESTAMP    DEFAULT NOW()
);

-- 3. QUIZLER & TEST HAVUZU (QUIZZES)
-- Her soru tekil bir konuya (topic) ve derse bağlıdır
CREATE TABLE IF NOT EXISTS quizzes (
    id             SERIAL PRIMARY KEY,
    category       VARCHAR(30)  NOT NULL,          -- 'frontend' | 'backend'
    subcategory    VARCHAR(30)  NOT NULL,          -- 'html' | 'css' | 'javascript' | 'python' | 'csharp' | 'sql' | 'cpp'
    topic          VARCHAR(60),                    -- 'formlar_validation', 'flexbox_justify', 'py_loops'
    tags           VARCHAR(150),                   -- 'validation,required,pattern'
    related_lesson_id INTEGER,                     -- İlişkili ders ID'si
    question       TEXT         NOT NULL,
    option_a       VARCHAR(200) NOT NULL,
    option_b       VARCHAR(200) NOT NULL,
    option_c       VARCHAR(200) NOT NULL,
    option_d       VARCHAR(200) NOT NULL,
    correct_answer CHAR(1)      NOT NULL,          -- 'A' | 'B' | 'C' | 'D'
    difficulty     VARCHAR(10)  DEFAULT 'kolay',   -- 'kolay' | 'orta' | 'zor'
    created_at     TIMESTAMP    DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quizzes_subcategory_topic ON quizzes(subcategory, topic);

-- 4. ÖĞRENCİ KONU HÂKİMİYET VE TEŞHİS TABLOSU (USER_TOPIC_MASTERY)
-- 75 soruyu dayatmak yerine zayıf olunan konuları anında teşhis eden model
CREATE TABLE IF NOT EXISTS user_topic_mastery (
    id                 SERIAL PRIMARY KEY,
    user_id            INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subcategory        VARCHAR(30) NOT NULL,
    topic              VARCHAR(60) NOT NULL,
    correct_count      INTEGER DEFAULT 0,
    wrong_count        INTEGER DEFAULT 0,
    mastery_percentage INTEGER DEFAULT 0,          -- 0 - 100 arası başarı oranı
    needs_review       BOOLEAN DEFAULT FALSE,      -- Eksik var mı bayrağı
    last_attempted_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, subcategory, topic)
);

-- 5. UYARLANABİLİR MİKRO-TELAFİ TESTLERİ (REMEDIATION_QUIZZES)
-- Öğrenci projede takıldığında Z kuşağı dostu 3 soruluk telafi oturumu
CREATE TABLE IF NOT EXISTS remediation_quizzes (
    id                    SERIAL PRIMARY KEY,
    user_id               INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subcategory           VARCHAR(30) NOT NULL,
    topic                 VARCHAR(60) NOT NULL,
    trigger_activity_id   INTEGER REFERENCES activities(id) ON DELETE SET NULL,
    recommended_lesson_id INTEGER,
    question_ids          INTEGER[],               -- Çözülen 3 sorunun ID dizisi
    completed             BOOLEAN DEFAULT FALSE,
    score                 INTEGER DEFAULT 0,
    ai_feedback           TEXT,                    -- Yapay zekânın ürettiği Sokratik tavsiye
    created_at            TIMESTAMP DEFAULT NOW()
);

-- 6. ÖĞRENCİ AKTİVİTE TAMAMLAMA LOGLARI (USER_ACTIVITIES)
CREATE TABLE IF NOT EXISTS user_activities (
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
    activity_id   INTEGER REFERENCES activities(id) ON DELETE CASCADE,
    earned_points INTEGER DEFAULT 0,
    score         INTEGER DEFAULT 0,
    max_score     INTEGER DEFAULT 100,
    passed        BOOLEAN DEFAULT FALSE,
    attempt_count INTEGER DEFAULT 1,
    completed_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, activity_id)
);

-- 7. KULLANICI GENEL İLERLEME (USER_PROGRESS)
CREATE TABLE IF NOT EXISTS user_progress (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    category        VARCHAR(30) NOT NULL,
    subcategory     VARCHAR(30),
    quiz_score      INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    passed          BOOLEAN DEFAULT FALSE,
    completed_at    TIMESTAMP DEFAULT NOW()
);

-- 8. KOD ÇALIŞTIRMA GÜNLÜĞÜ (CODE_LOGS)
CREATE TABLE IF NOT EXISTS code_logs (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    activity_id INTEGER REFERENCES activities(id) ON DELETE SET NULL,
    code        TEXT NOT NULL,
    error_msg   TEXT,                              -- Hata mesajı (derleyici veya test çıktısı)
    exec_time   TIMESTAMP DEFAULT NOW()
);

-- 9. SOKRATİK YAPAY ZEKÂ SOHBET GEÇMİŞİ (AI_CHATS)
CREATE TABLE IF NOT EXISTS ai_chats (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    log_id      INTEGER REFERENCES code_logs(id) ON DELETE CASCADE,
    user_prompt TEXT,
    ai_answer   TEXT NOT NULL,
    is_socratic BOOLEAN DEFAULT TRUE,              -- Doğrudan kod vermeme kuralı
    created_at  TIMESTAMP DEFAULT NOW()
);

-- 10. OYUNLAŞTIRMA: LİGLER VE SIRALAMA (LEAGUES)
CREATE TABLE IF NOT EXISTS leagues (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,              -- 'Bronz', 'Gümüş', 'Altın', 'Usta', 'Şampiyon'
    min_points  INTEGER NOT NULL,
    max_points  INTEGER NOT NULL,
    badge_icon  VARCHAR(100)
);

-- 11. YARDIMCI ADAPTİF SORU ÇEKME FONKSİYONU
CREATE OR REPLACE FUNCTION get_adaptive_quiz(p_subcategory VARCHAR, p_topic VARCHAR, p_limit INT DEFAULT 3)
RETURNS TABLE (
    quiz_id INT,
    subcat VARCHAR,
    top VARCHAR,
    q_text TEXT,
    opt_a VARCHAR,
    opt_b VARCHAR,
    opt_c VARCHAR,
    opt_d VARCHAR,
    correct CHAR(1),
    diff VARCHAR,
    rel_lesson_id INT,
    lesson_title VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        q.id AS quiz_id,
        q.subcategory AS subcat,
        q.topic AS top,
        q.question AS q_text,
        q.option_a AS opt_a,
        q.option_b AS opt_b,
        q.option_c AS opt_c,
        q.option_d AS opt_d,
        q.correct_answer AS correct,
        q.difficulty AS diff,
        q.related_lesson_id AS rel_lesson_id,
        COALESCE(a.title, '')::VARCHAR AS lesson_title
    FROM quizzes q
    LEFT JOIN activities a ON q.related_lesson_id = a.id
    WHERE q.subcategory = p_subcategory 
      AND (p_topic IS NULL OR q.topic = p_topic)
    ORDER BY RANDOM()
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- 12. KULLANICI CEVAP KAYDETME VE KONU HÂKİMİYETİ GÜNCELLEME
CREATE OR REPLACE FUNCTION record_quiz_answer(
    p_user_id INT,
    p_quiz_id INT,
    p_is_correct BOOLEAN
)
RETURNS VOID AS $$
DECLARE
    v_subcat VARCHAR(30);
    v_topic VARCHAR(60);
BEGIN
    SELECT subcategory, topic INTO v_subcat, v_topic
    FROM quizzes WHERE id = p_quiz_id;

    IF v_subcat IS NULL OR v_topic IS NULL THEN
        RETURN;
    END IF;

    INSERT INTO user_topic_mastery (user_id, subcategory, topic, correct_count, wrong_count, mastery_percentage, needs_review, last_attempted_at)
    VALUES (
        p_user_id, 
        v_subcat, 
        v_topic, 
        CASE WHEN p_is_correct THEN 1 ELSE 0 END,
        CASE WHEN p_is_correct THEN 0 ELSE 1 END,
        CASE WHEN p_is_correct THEN 100 ELSE 0 END,
        CASE WHEN p_is_correct THEN FALSE ELSE TRUE END,
        NOW()
    )
    ON CONFLICT (user_id, subcategory, topic) DO UPDATE
    SET 
        correct_count = user_topic_mastery.correct_count + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
        wrong_count = user_topic_mastery.wrong_count + CASE WHEN p_is_correct THEN 0 ELSE 1 END,
        mastery_percentage = ROUND(
            ((user_topic_mastery.correct_count + CASE WHEN p_is_correct THEN 1 ELSE 0 END)::DECIMAL / 
             (user_topic_mastery.correct_count + user_topic_mastery.wrong_count + 1)) * 100
        ),
        needs_review = CASE 
            WHEN ROUND(((user_topic_mastery.correct_count + CASE WHEN p_is_correct THEN 1 ELSE 0 END)::DECIMAL / 
                        (user_topic_mastery.correct_count + user_topic_mastery.wrong_count + 1)) * 100) < 65 
            THEN TRUE 
            ELSE FALSE 
        END,
        last_attempted_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- 13. MİNİ PROJEDE TAKILAN ÖĞRENCİ İÇİN UYARLANABİLİR TEŞHİS MOTORU
-- 75 soruyu çözdürmek yerine projede eksik olduğu konudan 3 soruluk mikro quiz üretir
CREATE OR REPLACE FUNCTION trigger_mini_project_remediation(
    p_user_id INT,
    p_project_id INT
)
RETURNS TABLE (
    remediation_id INT,
    subcategory VARCHAR,
    failed_project_title VARCHAR,
    recommended_lesson_id INT,
    recommended_lesson_title VARCHAR,
    diagnostic_feedback TEXT,
    quiz_id INT,
    question TEXT,
    option_a VARCHAR,
    option_b VARCHAR,
    option_c VARCHAR,
    option_d VARCHAR,
    correct_answer CHAR
) AS $$
DECLARE
    v_proj_subcat VARCHAR(30);
    v_proj_title VARCHAR(150);
    v_proj_tags VARCHAR(255);
    v_target_topic VARCHAR(60);
    v_rec_lesson_id INT;
    v_rec_lesson_title VARCHAR(150);
    v_remed_id INT;
    v_q_ids INT[];
    v_feedback TEXT;
BEGIN
    SELECT a.subcategory, a.title, a.tags 
    INTO v_proj_subcat, v_proj_title, v_proj_tags
    FROM activities a
    WHERE a.id = p_project_id AND a.activity_type = 'mini_proje';

    IF v_proj_subcat IS NULL THEN
        RAISE EXCEPTION 'Geçersiz mini proje ID: %', p_project_id;
    END IF;

    -- 1. Öncelik: Öğrencinin bu dilde en zayıf konusunu bul
    SELECT utm.topic INTO v_target_topic
    FROM user_topic_mastery utm
    WHERE utm.user_id = p_user_id 
      AND utm.subcategory = v_proj_subcat 
      AND utm.needs_review = TRUE
    ORDER BY utm.mastery_percentage ASC, utm.last_attempted_at DESC
    LIMIT 1;

    -- 2. Eğer zayıf konu bulunamazsa, projenin tag'lerinden ilk konuyu eşleştir
    IF v_target_topic IS NULL THEN
        SELECT q.topic INTO v_target_topic
        FROM quizzes q
        WHERE q.subcategory = v_proj_subcat
          AND (v_proj_tags ILIKE '%' || q.topic || '%' OR q.topic ILIKE split_part(v_proj_tags, ',', 1))
        LIMIT 1;
    END IF;

    -- 3. Hâlâ bulunamazsa, o dildeki ilk quiz konusunu seç
    IF v_target_topic IS NULL THEN
        SELECT q.topic INTO v_target_topic
        FROM quizzes q
        WHERE q.subcategory = v_proj_subcat
        ORDER BY q.id ASC
        LIMIT 1;
    END IF;

    -- Hedef konudaki en temel ilişkili dersi ve başlığını bul
    SELECT q.related_lesson_id, a.title 
    INTO v_rec_lesson_id, v_rec_lesson_title
    FROM quizzes q
    JOIN activities a ON q.related_lesson_id = a.id
    WHERE q.subcategory = v_proj_subcat AND q.topic = v_target_topic
    ORDER BY q.id ASC
    LIMIT 1;

    -- 3 soruluk mikro quiz ID'lerini seç
    SELECT ARRAY_AGG(sub.id) INTO v_q_ids
    FROM (
        SELECT q.id 
        FROM quizzes q
        WHERE q.subcategory = v_proj_subcat AND q.topic = v_target_topic
        ORDER BY RANDOM()
        LIMIT 3
    ) sub;

    v_feedback := 'Tebrikler, projeyi denedin! Ancak ' || v_proj_title || ' projesinde ' || 
                  REPLACE(v_target_topic, '_', ' ') || ' konusunda takıldığın tespit edildi. ' ||
                  '75 sorunun hepsini çözmene gerek yok! Senin için özel hazırlanan 3 soruluk mikro teşhis testini ' ||
                  'tamamlamanı ve "' || COALESCE(v_rec_lesson_title, 'İlgili Ders') || '" içeriğini tekrar etmeni öneririm.';

    INSERT INTO remediation_quizzes (
        user_id, subcategory, topic, trigger_activity_id, recommended_lesson_id, question_ids, completed, ai_feedback
    )
    VALUES (
        p_user_id, v_proj_subcat, v_target_topic, p_project_id, v_rec_lesson_id, v_q_ids, FALSE, v_feedback
    )
    RETURNING id INTO v_remed_id;

    RETURN QUERY
    SELECT 
        v_remed_id,
        v_proj_subcat,
        v_proj_title,
        v_rec_lesson_id,
        v_rec_lesson_title,
        v_feedback,
        q.id,
        q.question,
        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,
        q.correct_answer
    FROM quizzes q
    WHERE q.id = ANY(v_q_ids);
END;
$$ LANGUAGE plpgsql;

-- 14. ÖĞRENCİ İÇİN DİNAMİK VE SINIRSIZ ALIŞTIRMA FONKSİYONU
CREATE OR REPLACE FUNCTION get_dynamic_practice_session(
    p_user_id INT,
    p_subcategory VARCHAR(30),
    p_count INT DEFAULT 10,
    p_mode VARCHAR(20) DEFAULT 'karisik' -- 'karisik' | 'eksiklerim' | 'zor'
)
RETURNS TABLE (
    quiz_id INT,
    subcategory VARCHAR,
    topic VARCHAR,
    question TEXT,
    option_a VARCHAR,
    option_b VARCHAR,
    option_c VARCHAR,
    option_d VARCHAR,
    correct_answer CHAR,
    difficulty VARCHAR,
    related_lesson_id INT,
    lesson_title VARCHAR
) AS $$
BEGIN
    IF p_mode = 'eksiklerim' THEN
        RETURN QUERY
        SELECT 
            q.id,
            q.subcategory,
            q.topic,
            q.question,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.correct_answer,
            q.difficulty,
            q.related_lesson_id,
            a.title AS lesson_title
        FROM quizzes q
        LEFT JOIN activities a ON q.related_lesson_id = a.id
        LEFT JOIN user_topic_mastery utm ON (utm.user_id = p_user_id AND utm.subcategory = q.subcategory AND utm.topic = q.topic)
        WHERE q.subcategory = p_subcategory
        ORDER BY 
            COALESCE(utm.needs_review, FALSE) DESC,
            COALESCE(utm.mastery_percentage, 50) ASC,
            RANDOM()
        LIMIT p_count;
    ELSIF p_mode = 'zor' THEN
        RETURN QUERY
        SELECT 
            q.id,
            q.subcategory,
            q.topic,
            q.question,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.correct_answer,
            q.difficulty,
            q.related_lesson_id,
            a.title AS lesson_title
        FROM quizzes q
        LEFT JOIN activities a ON q.related_lesson_id = a.id
        WHERE q.subcategory = p_subcategory AND q.difficulty IN ('orta', 'zor')
        ORDER BY RANDOM()
        LIMIT p_count;
    ELSE
        RETURN QUERY
        SELECT 
            q.id,
            q.subcategory,
            q.topic,
            q.question,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.correct_answer,
            q.difficulty,
            q.related_lesson_id,
            a.title AS lesson_title
        FROM quizzes q
        LEFT JOIN activities a ON q.related_lesson_id = a.id
        WHERE q.subcategory = p_subcategory
        ORDER BY RANDOM()
        LIMIT p_count;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 15. YAPAY ZEKÂ İÇİN DİNAMİK SORU TÜRETME / SÖZ KALIPLARI ŞABLON ÜRETİCİ
CREATE OR REPLACE FUNCTION generate_ai_synthetic_question_prompt(
    p_quiz_id INT
)
RETURNS TABLE (
    base_quiz_id INT,
    subcategory VARCHAR,
    topic VARCHAR,
    original_question TEXT,
    system_instruction TEXT,
    prompt_payload TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        q.id,
        q.subcategory,
        q.topic,
        q.question,
        'Sen COD+ Sokratik Yazılım Eğitmenisin. Görevin, verilen temel soru kalıbını pedagojik olarak aynı kazanıma sahip kalacak şekilde yeniden sözcükleştirmek (paraphrasing), değişken isimlerini veya senaryosunu değiştirerek öğrenciye ezberi bozan taze bir soru üretmektir.'::TEXT AS system_instruction,
        ('{"dil": "' || q.subcategory || '", "konu": "' || q.topic || '", "orijinal_soru": "' || REPLACE(q.question, '"', '\"') || '", "dogru_cevap": "' || REPLACE(CASE q.correct_answer WHEN 'A' THEN q.option_a WHEN 'B' THEN q.option_b WHEN 'C' THEN q.option_c ELSE q.option_d END, '"', '\"') || '", "talimat": "Farklı bir gerçek hayat senaryosu ve yeni değişken adlarıyla aynı kavramı sorgulayan 4 şıklı yeni bir soru üret."}')::TEXT AS prompt_payload
    FROM quizzes q
    WHERE q.id = p_quiz_id;
END;
$$ LANGUAGE plpgsql;

-- 16. ARKADAŞLIK VE AKRAN AĞI (FRIENDSHIPS)
CREATE TABLE IF NOT EXISTS friendships (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    friend_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status      VARCHAR(20) DEFAULT 'accepted',
    created_at  TIMESTAMP DEFAULT NOW(),
    CONSTRAINT unique_friendship UNIQUE (user_id, friend_id),
    CONSTRAINT chk_not_self CHECK (user_id <> friend_id)
);

CREATE INDEX IF NOT EXISTS idx_friendships_user ON friendships(user_id);

-- 17. DİLE ÖZEL 1v1 AKRAN DÜELLOLARI (DUELS)
CREATE TABLE IF NOT EXISTS duels (
    id                SERIAL PRIMARY KEY,
    subcategory       VARCHAR(30) NOT NULL,
    challenger_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    opponent_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_ids      INTEGER[] NOT NULL,
    challenger_score  INTEGER DEFAULT 0,
    opponent_score    INTEGER DEFAULT 0,
    winner_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status            VARCHAR(20) DEFAULT 'completed',
    points_awarded    INTEGER DEFAULT 50,
    created_at        TIMESTAMP DEFAULT NOW(),
    completed_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_duels_subcat ON duels(subcategory);

-- 18. DİLE ÖZEL DÜELLO BAŞLATMA
CREATE OR REPLACE FUNCTION create_peer_duel(
    p_challenger_id INT,
    p_opponent_id INT,
    p_subcategory VARCHAR(30),
    p_question_count INT DEFAULT 5
)
RETURNS TABLE (
    duel_id INT,
    selected_language VARCHAR,
    challenger_name VARCHAR,
    opponent_name VARCHAR,
    question_count INT
) AS $$
DECLARE
    v_duel_id INT;
    v_q_ids INT[];
    v_chal_name VARCHAR(50);
    v_opp_name VARCHAR(50);
BEGIN
    SELECT username INTO v_chal_name FROM users WHERE id = p_challenger_id;
    SELECT username INTO v_opp_name FROM users WHERE id = p_opponent_id;

    IF v_chal_name IS NULL OR v_opp_name IS NULL THEN
        RAISE EXCEPTION 'Meydan okuyan veya rakip kullanıcı bulunamadı.';
    END IF;

    SELECT ARRAY_AGG(sub.id) INTO v_q_ids
    FROM (
        SELECT q.id 
        FROM quizzes q
        WHERE q.subcategory = p_subcategory
        ORDER BY RANDOM()
        LIMIT p_question_count
    ) sub;

    IF v_q_ids IS NULL OR CARDINALITY(v_q_ids) < p_question_count THEN
        RAISE EXCEPTION '% dilinde yeterli soru havuzu bulunamadı.', p_subcategory;
    END IF;

    INSERT INTO duels (subcategory, challenger_id, opponent_id, question_ids, status)
    VALUES (p_subcategory, p_challenger_id, p_opponent_id, v_q_ids, 'active')
    RETURNING id INTO v_duel_id;

    RETURN QUERY
    SELECT v_duel_id, p_subcategory, v_chal_name, v_opp_name, p_question_count;
END;
$$ LANGUAGE plpgsql;

-- 19. DÜELLO BİTİRME VE KAZANANA PUAN VERME
CREATE OR REPLACE FUNCTION finish_peer_duel(
    p_duel_id INT,
    p_challenger_score INT,
    p_opponent_score INT
)
RETURNS TABLE (
    duel_id INT,
    winner_id INT,
    winner_name VARCHAR,
    points_awarded INT,
    result_message TEXT
) AS $$
DECLARE
    v_chal_id INT;
    v_opp_id INT;
    v_win_id INT;
    v_win_name VARCHAR(50);
    v_subcat VARCHAR(30);
    v_msg TEXT;
BEGIN
    SELECT challenger_id, opponent_id, subcategory
    INTO v_chal_id, v_opp_id, v_subcat
    FROM duels WHERE id = p_duel_id;

    IF v_chal_id IS NULL THEN
        RAISE EXCEPTION 'Düello bulunamadı: %', p_duel_id;
    END IF;

    IF p_challenger_score > p_opponent_score THEN
        v_win_id := v_chal_id;
        SELECT username INTO v_win_name FROM users WHERE id = v_win_id;
        v_msg := 'Tebrikler! ' || v_win_name || ' ' || UPPER(v_subcat) || ' düellosunu kazandı! (+50 Puan & +15 Elmas)';
        PERFORM award_user_points(v_win_id, 50, 15);
    ELSIF p_opponent_score > p_challenger_score THEN
        v_win_id := v_opp_id;
        SELECT username INTO v_win_name FROM users WHERE id = v_win_id;
        v_msg := 'Tebrikler! ' || v_win_name || ' ' || UPPER(v_subcat) || ' düellosunu kazandı! (+50 Puan & +15 Elmas)';
        PERFORM award_user_points(v_win_id, 50, 15);
    ELSE
        v_win_id := NULL;
        v_win_name := 'Berabere';
        v_msg := 'Nefes kesen düello berabere bitti! Her iki tarafa da +20 Puan & +5 Elmas verildi.';
        PERFORM award_user_points(v_chal_id, 20, 5);
        PERFORM award_user_points(v_opp_id, 20, 5);
    END IF;

    UPDATE duels
    SET 
        challenger_score = p_challenger_score,
        opponent_score = p_opponent_score,
        winner_id = v_win_id,
        status = 'completed',
        completed_at = NOW()
    WHERE id = p_duel_id;

    RETURN QUERY
    SELECT p_duel_id, v_win_id, v_win_name, 50, v_msg;
END;
$$ LANGUAGE plpgsql;

-- 20. DANIŞMAN / MENTÖR ÖĞRENCİ EŞLEŞTİRME TABLOSU (MENTOR_STUDENTS)
CREATE TABLE IF NOT EXISTS mentor_students (
    id            SERIAL PRIMARY KEY,
    mentor_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_name  VARCHAR(150) NOT NULL,
    status        VARCHAR(20) DEFAULT 'active',
    created_at    TIMESTAMP DEFAULT NOW(),
    CONSTRAINT unique_mentor_student_project UNIQUE (mentor_id, student_id, project_name),
    CONSTRAINT chk_mentor_not_self CHECK (mentor_id <> student_id)
);

CREATE INDEX IF NOT EXISTS idx_mentor_students ON mentor_students(mentor_id, student_id);

-- 21. MENTÖR GERİ BİLDİRİM VE KOD İNCELEME TABLOSU (MENTOR_FEEDBACK)
CREATE TABLE IF NOT EXISTS mentor_feedback (
    id            SERIAL PRIMARY KEY,
    mentor_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_id   INTEGER REFERENCES activities(id) ON DELETE SET NULL,
    feedback_text TEXT NOT NULL,
    code_snippet  TEXT,
    rating        INTEGER DEFAULT 5,
    created_at    TIMESTAMP DEFAULT NOW()
);

-- 22. KULLANICI DETAYLI PROFİL GÜNCELLEME FONKSİYONU
CREATE OR REPLACE FUNCTION update_user_full_profile(
    p_user_id INT,
    p_username VARCHAR(50),
    p_education_level VARCHAR(60),
    p_department VARCHAR(100),
    p_known_languages VARCHAR(255),
    p_domain_area VARCHAR(50),
    p_projects TEXT,
    p_bio TEXT,
    p_avatar_url VARCHAR(255)
)
RETURNS TABLE (
    success BOOLEAN,
    message TEXT,
    updated_username VARCHAR,
    updated_level VARCHAR,
    updated_points INT
) AS $$
DECLARE
    v_u_level VARCHAR(20);
    v_u_points INT;
BEGIN
    UPDATE users
    SET 
        username = COALESCE(NULLIF(p_username, ''), username),
        education_level = COALESCE(NULLIF(p_education_level, ''), education_level),
        department = COALESCE(p_department, department),
        known_languages = COALESCE(p_known_languages, known_languages),
        domain_area = COALESCE(NULLIF(p_domain_area, ''), domain_area),
        projects = COALESCE(p_projects, projects),
        bio = COALESCE(p_bio, bio),
        avatar_url = COALESCE(NULLIF(p_avatar_url, ''), avatar_url),
        last_active = NOW()
    WHERE id = p_user_id
    RETURNING level, total_points INTO v_u_level, v_u_points;

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, 'Kullanıcı bulunamadı.'::TEXT, NULL::VARCHAR, NULL::VARCHAR, NULL::INT;
    ELSE
        RETURN QUERY SELECT TRUE, 'Profil bilgileri başarıyla güncellendi.'::TEXT, p_username, v_u_level, v_u_points;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 23. KULLANICININ ARKADAŞ LİSTESİNİ VE DETAYLARINI GETİRME
CREATE OR REPLACE FUNCTION get_user_friends_list(
    p_user_id INT
)
RETURNS TABLE (
    friendship_id INT,
    friend_id INT,
    friend_username VARCHAR,
    friend_level VARCHAR,
    friend_points INT,
    friend_domain VARCHAR,
    friend_avatar VARCHAR,
    friend_status VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        f.id AS friendship_id,
        u.id AS friend_id,
        u.username AS friend_username,
        u.level AS friend_level,
        u.total_points AS friend_points,
        u.domain_area AS friend_domain,
        u.avatar_url AS friend_avatar,
        f.status AS friend_status
    FROM friendships f
    JOIN users u ON (CASE WHEN f.user_id = p_user_id THEN f.friend_id ELSE f.user_id END = u.id)
    WHERE (f.user_id = p_user_id OR f.friend_id = p_user_id) AND f.status = 'accepted';
END;
$$ LANGUAGE plpgsql;

-- 24. ŞİFREMİ UNUTTUM & GEÇİCİ ŞİFRE TALEBİ
CREATE OR REPLACE FUNCTION request_password_reset(
    p_email VARCHAR(100)
)
RETURNS TABLE (
    success BOOLEAN,
    message TEXT,
    temporary_password VARCHAR(20)
) AS $$
DECLARE
    v_user_id INT;
    v_temp_pwd VARCHAR(20);
BEGIN
    SELECT id INTO v_user_id FROM users WHERE email = p_email;

    IF v_user_id IS NULL THEN
        RETURN QUERY SELECT FALSE, 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.'::TEXT, NULL::VARCHAR;
        RETURN;
    END IF;

    v_temp_pwd := 'COD-' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 6);

    UPDATE users
    SET 
        pwd_hash = MD5(v_temp_pwd),
        must_change_password = TRUE,
        last_active = NOW()
    WHERE id = v_user_id;

    RETURN QUERY 
    SELECT 
        TRUE, 
        'Geçici şifreniz e-posta adresinize iletildi. Uygulamaya ilk girişinizde şifrenizi yenilemeniz istenecektir.'::TEXT, 
        v_temp_pwd;
END;
$$ LANGUAGE plpgsql;

-- 25. İLK GİRİŞTE ZORUNLU ŞİFRE YENİLEME FONKSİYONU
CREATE OR REPLACE FUNCTION change_password_first_login(
    p_user_id INT,
    p_new_pwd_hash VARCHAR(256)
)
RETURNS TABLE (
    success BOOLEAN,
    message TEXT
) AS $$
BEGIN
    UPDATE users
    SET 
        pwd_hash = p_new_pwd_hash,
        must_change_password = FALSE,
        last_active = NOW()
    WHERE id = p_user_id;

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, 'Kullanıcı bulunamadı.'::TEXT;
    ELSE
        RETURN QUERY SELECT TRUE, 'Şifreniz başarıyla güncellendi. Artık uygulamaya tam erişebilirsiniz.'::TEXT;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 26. GOOGLE VE APPLE OAUTH KİMLİK DOĞRULAMA & HIZLI KAYIT
CREATE OR REPLACE FUNCTION oauth_login_or_register(
    p_email VARCHAR(100),
    p_name VARCHAR(50),
    p_provider VARCHAR(30),
    p_oauth_id VARCHAR(150),
    p_education_level VARCHAR(60) DEFAULT 'Üniversite'
)
RETURNS TABLE (
    user_id INT,
    username VARCHAR,
    email VARCHAR,
    education_level VARCHAR,
    role VARCHAR,
    level VARCHAR,
    total_points INT,
    gems INT,
    is_new_user BOOLEAN,
    must_change_pwd BOOLEAN
) AS $$
DECLARE
    v_user_id INT;
    v_is_new BOOLEAN := FALSE;
BEGIN
    SELECT u.id INTO v_user_id FROM users u WHERE u.email = p_email;

    IF v_user_id IS NULL THEN
        INSERT INTO users (username, email, pwd_hash, education_level, auth_provider, oauth_id, role, level, total_points, gems, streak_days)
        VALUES (
            p_name, 
            p_email, 
            'OAUTH_TOKEN_SECURE', 
            COALESCE(p_education_level, 'Üniversite'), 
            p_provider, 
            p_oauth_id, 
            'ogrenci', 
            'Çırak', 
            100, 
            10, 
            1
        )
        RETURNING users.id INTO v_user_id;
        v_is_new := TRUE;
    ELSE
        UPDATE users 
        SET 
            auth_provider = p_provider,
            oauth_id = COALESCE(p_oauth_id, users.oauth_id),
            last_active = NOW()
        WHERE users.id = v_user_id;
    END IF;

    RETURN QUERY
    SELECT 
        u.id,
        u.username,
        u.email,
        u.education_level,
        u.role,
        u.level,
        u.total_points,
        u.gems,
        v_is_new,
        u.must_change_password
    FROM users u
    WHERE u.id = v_user_id;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------
-- 15. DANIŞMANLAR / MENTÖRLER (MENTORS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mentors (
    id                 SERIAL PRIMARY KEY,
    user_id            INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    field              VARCHAR(100) NOT NULL, -- 'Frontend & UI/UX', 'Backend Mimarisi', vb.
    experience_level   VARCHAR(50)  NOT NULL, -- '1-3 Yıl', '3-5 Yıl Mid-Senior', '5-8 Yıl Senior', '8+ Yıl Lead'
    company_or_school  VARCHAR(150),
    bio                TEXT,
    created_at         TIMESTAMP DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 16. PROJELER & EKİP İLANLARI (PROJECTS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id                 SERIAL PRIMARY KEY,
    creator_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title              VARCHAR(200) NOT NULL,
    description        TEXT NOT NULL,
    technologies       TEXT[], -- ['React', 'Python', 'SQL']
    looking_for_roles  TEXT[], -- ['Frontend Geliştirici', 'Backend Geliştirici']
    created_at         TIMESTAMP DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 17. PROJE EKİP ÜYELERİ (PROJECT_MEMBERS)
-- Yalnızca karşılıklı onaylı arkadaşlar projeye doğrudan eklenebilir
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project_members (
    id                 SERIAL PRIMARY KEY,
    project_id         INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id            INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_in_project    VARCHAR(100) DEFAULT 'Geliştirici',
    joined_at          TIMESTAMP DEFAULT NOW(),
    CONSTRAINT unique_project_member UNIQUE (project_id, user_id)
);

-- ------------------------------------------------------------
-- 18. ARKADAŞLIK VE İLETİŞİM AĞI (FRIENDS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS friends (
    id                 SERIAL PRIMARY KEY,
    user_id            INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    friend_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status             VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'accepted' | 'rejected'
    created_at         TIMESTAMP DEFAULT NOW(),
    CONSTRAINT unique_friendship UNIQUE (user_id, friend_id)
);

-- ------------------------------------------------------------
-- 19. SOHBET VE ANLIK MESAJLAR (MESSAGES)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
    id                 SERIAL PRIMARY KEY,
    sender_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content            TEXT NOT NULL,
    sent_at            TIMESTAMP DEFAULT NOW(),
    is_read            BOOLEAN DEFAULT FALSE
);





-- ------------------------------------------------------------
-- 20. DİL BAZLI İLERLEME & PROJE KİLİDİ (SEVİYE TABANLI)
-- Proje oluşturma / projeye başvuru yetkisi puana veya lige DEĞİL,
-- her dilde ulaşılan DERS SEVİYESİNE göre açılır.
-- Eşik kuralı: 40 soruluk dil -> 25. seviye, her ek 10 soru +1 seviye
-- (toplam ders sayısını geçemez). Danışman davetiyle katılımda seviye aranmaz.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS language_project_requirements (
    language        VARCHAR(20) PRIMARY KEY,           -- 'html' | 'sql' | 'python' | 'csharp' | 'cpp'
    total_levels    INTEGER NOT NULL DEFAULT 30,       -- Dildeki toplam ders / seviye sayısı
    question_count  INTEGER NOT NULL,                  -- Dilin soru bankasındaki soru sayısı
    required_level  INTEGER NOT NULL                   -- Proje kilidini açan seviye
);

INSERT INTO language_project_requirements (language, total_levels, question_count, required_level) VALUES
    ('html',   30, 75, LEAST(30, 25 + GREATEST(0, 75 - 40) / 10)),
    ('python', 30, 58, LEAST(30, 25 + GREATEST(0, 58 - 40) / 10)),
    ('sql',    30, 40, LEAST(30, 25 + GREATEST(0, 40 - 40) / 10)),
    ('csharp', 30, 40, LEAST(30, 25 + GREATEST(0, 40 - 40) / 10)),
    ('cpp',    30, 40, LEAST(30, 25 + GREATEST(0, 40 - 40) / 10))
ON CONFLICT (language) DO UPDATE
    SET total_levels = EXCLUDED.total_levels,
        question_count = EXCLUDED.question_count,
        required_level = EXCLUDED.required_level;

CREATE TABLE IF NOT EXISTS user_language_progress (
    user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    language       VARCHAR(20) NOT NULL REFERENCES language_project_requirements(language),
    current_level  INTEGER NOT NULL DEFAULT 1,         -- Bu dilde açılmış en yüksek seviye
    updated_at     TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, language)
);

-- Kullanıcının seviye ilerlemesini kaydet (geri düşmez, yalnızca artar)
CREATE OR REPLACE FUNCTION fn_save_language_progress(p_user_id INTEGER, p_language VARCHAR, p_level INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO user_language_progress (user_id, language, current_level)
    VALUES (p_user_id, LOWER(p_language), GREATEST(1, p_level))
    ON CONFLICT (user_id, language) DO UPDATE
        SET current_level = GREATEST(user_language_progress.current_level, EXCLUDED.current_level),
            updated_at = NOW();
    RETURN fn_user_project_eligible(p_user_id);
END;
$$ LANGUAGE plpgsql;

-- Proje yetkisi: danışman her zaman, öğrenci ise herhangi bir dilde eşiğe ulaştıysa
CREATE OR REPLACE FUNCTION fn_user_project_eligible(p_user_id INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    v_role VARCHAR(20);
BEGIN
    SELECT role INTO v_role FROM users WHERE id = p_user_id;
    IF v_role IN ('danisman', 'admin') THEN
        RETURN TRUE;
    END IF;
    RETURN EXISTS (
        SELECT 1
        FROM user_language_progress p
        JOIN language_project_requirements r ON r.language = p.language
        WHERE p.user_id = p_user_id AND p.current_level >= r.required_level
    );
END;
$$ LANGUAGE plpgsql STABLE;

-- Ekran için: kullanıcının her dildeki durumu (ilerleme / gereken seviye / kilit açık mı)
CREATE OR REPLACE VIEW v_user_project_eligibility AS
SELECT u.id AS user_id,
       r.language,
       COALESCE(p.current_level, 0) AS current_level,
       r.required_level,
       (COALESCE(p.current_level, 0) >= r.required_level) AS language_unlocked,
       fn_user_project_eligible(u.id) AS project_unlocked
FROM users u
CROSS JOIN language_project_requirements r
LEFT JOIN user_language_progress p ON p.user_id = u.id AND p.language = r.language;

-- Projeye katılım yolu: 'creator' | 'application' (başvuru) | 'advisor_invite' (danışman daveti)
ALTER TABLE project_members ADD COLUMN IF NOT EXISTS joined_via VARCHAR(20) DEFAULT 'application';

-- Proje oluşturma kilidi
CREATE OR REPLACE FUNCTION trg_projects_level_check() RETURNS TRIGGER AS $$
BEGIN
    IF NOT fn_user_project_eligible(NEW.creator_id) THEN
        RAISE EXCEPTION 'Proje oluşturmak için bir dilde gerekli seviyeye ulaşmalısınız.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS projects_level_check ON projects;
CREATE TRIGGER projects_level_check BEFORE INSERT ON projects
    FOR EACH ROW EXECUTE FUNCTION trg_projects_level_check();

-- Başvuru kilidi (danışman daveti ve proje kurucusu muaf)
CREATE OR REPLACE FUNCTION trg_project_members_level_check() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.joined_via = 'application' AND NOT fn_user_project_eligible(NEW.user_id) THEN
        RAISE EXCEPTION 'Projeye başvurmak için bir dilde gerekli seviyeye ulaşmalısınız. Danışman daveti ile seviyeden bağımsız katılabilirsiniz.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS project_members_level_check ON project_members;
CREATE TRIGGER project_members_level_check BEFORE INSERT ON project_members
    FOR EACH ROW EXECUTE FUNCTION trg_project_members_level_check();
