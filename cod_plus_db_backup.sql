--
-- PostgreSQL database dump
--

\restrict IJZXYkbnB8ZqoOeEEEzbq0cPBIFVwPtrqBjKALq3VP71pV8gNjRfC25An7furDs

-- Dumped from database version 16.15
-- Dumped by pg_dump version 16.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: award_user_points(integer, integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.award_user_points(p_user_id integer, p_points integer, p_gems integer DEFAULT 0) RETURNS TABLE(new_total_points integer, new_gems integer, new_level character varying, level_upgraded boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_cur_points INT;
    v_new_points INT;
    v_cur_gems INT;
    v_new_gems INT;
    v_old_level VARCHAR(20);
    v_new_level VARCHAR(20);
    v_upgraded BOOLEAN := FALSE;
BEGIN
    SELECT total_points, gems, level 
    INTO v_cur_points, v_cur_gems, v_old_level
    FROM users WHERE id = p_user_id;

    IF v_cur_points IS NULL THEN
        RAISE EXCEPTION 'Kullanıcı bulunamadı: %', p_user_id;
    END IF;

    v_new_points := v_cur_points + p_points;
    v_new_gems := v_cur_gems + p_gems;

    -- Puan eşiklerine göre lig seviyesi belirleme
    IF v_new_points >= 3500 THEN
        v_new_level := 'Uzman';
    ELSIF v_new_points >= 1500 THEN
        v_new_level := 'Usta';
    ELSIF v_new_points >= 500 THEN
        v_new_level := 'Kalfa';
    ELSE
        v_new_level := 'Çırak';
    END IF;

    IF v_new_level <> v_old_level THEN
        v_upgraded := TRUE;
    END IF;

    UPDATE users
    SET 
        total_points = v_new_points,
        gems = v_new_gems,
        level = v_new_level,
        last_active = NOW()
    WHERE id = p_user_id;

    RETURN QUERY
    SELECT v_new_points, v_new_gems, v_new_level, v_upgraded;
END;
$$;


ALTER FUNCTION public.award_user_points(p_user_id integer, p_points integer, p_gems integer) OWNER TO postgres;

--
-- Name: change_password_first_login(integer, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.change_password_first_login(p_user_id integer, p_new_pwd_hash character varying) RETURNS TABLE(success boolean, message text)
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.change_password_first_login(p_user_id integer, p_new_pwd_hash character varying) OWNER TO postgres;

--
-- Name: create_peer_duel(integer, integer, character varying, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_peer_duel(p_challenger_id integer, p_opponent_id integer, p_subcategory character varying, p_question_count integer DEFAULT 5) RETURNS TABLE(duel_id integer, selected_language character varying, challenger_name character varying, opponent_name character varying, question_count integer)
    LANGUAGE plpgsql
    AS $$
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

    -- Kesin filtre: YALNIZCA seçilen dilden rastgele 5 soru al
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
$$;


ALTER FUNCTION public.create_peer_duel(p_challenger_id integer, p_opponent_id integer, p_subcategory character varying, p_question_count integer) OWNER TO postgres;

--
-- Name: finish_peer_duel(integer, integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.finish_peer_duel(p_duel_id integer, p_challenger_score integer, p_opponent_score integer) RETURNS TABLE(duel_id integer, winner_id integer, winner_name character varying, points_awarded integer, result_message text)
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.finish_peer_duel(p_duel_id integer, p_challenger_score integer, p_opponent_score integer) OWNER TO postgres;

--
-- Name: generate_ai_synthetic_question_prompt(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_ai_synthetic_question_prompt(p_quiz_id integer) RETURNS TABLE(base_quiz_id integer, subcategory character varying, topic character varying, original_question text, system_instruction text, prompt_payload text)
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.generate_ai_synthetic_question_prompt(p_quiz_id integer) OWNER TO postgres;

--
-- Name: get_adaptive_quiz(character varying, character varying, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_adaptive_quiz(p_subcategory character varying, p_topic character varying, p_limit integer DEFAULT 3) RETURNS TABLE(quiz_id integer, subcat character varying, top character varying, q_text text, opt_a character varying, opt_b character varying, opt_c character varying, opt_d character varying, correct character, diff character varying, rel_lesson_id integer, lesson_title character varying)
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.get_adaptive_quiz(p_subcategory character varying, p_topic character varying, p_limit integer) OWNER TO postgres;

--
-- Name: get_duel_questions(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_duel_questions(p_duel_id integer) RETURNS TABLE(duel_id integer, subcategory character varying, quiz_id integer, question text, option_a character varying, option_b character varying, option_c character varying, option_d character varying, correct_answer character)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_q_ids INT[];
    v_subcat VARCHAR(30);
BEGIN
    SELECT d.question_ids, d.subcategory INTO v_q_ids, v_subcat
    FROM duels d WHERE d.id = p_duel_id;

    IF v_q_ids IS NULL THEN
        RAISE EXCEPTION 'Düello bulunamadı: %', p_duel_id;
    END IF;

    RETURN QUERY
    SELECT 
        p_duel_id,
        v_subcat,
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
$$;


ALTER FUNCTION public.get_duel_questions(p_duel_id integer) OWNER TO postgres;

--
-- Name: get_dynamic_practice_session(integer, character varying, integer, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_dynamic_practice_session(p_user_id integer, p_subcategory character varying, p_count integer DEFAULT 10, p_mode character varying DEFAULT 'karisik'::character varying) RETURNS TABLE(quiz_id integer, subcategory character varying, topic character varying, question text, option_a character varying, option_b character varying, option_c character varying, option_d character varying, correct_answer character, difficulty character varying, related_lesson_id integer, lesson_title character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_mode = 'eksiklerim' THEN
        -- Öğrencinin zayıf olduğu konulara öncelik veren dinamik alıştırma
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
        -- Zorluk seviyesi 'orta' ve 'zor' olan ileri seviye alıştırmalar
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
        -- Tamamen karışık ve harmanlanmış alıştırma modu
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
$$;


ALTER FUNCTION public.get_dynamic_practice_session(p_user_id integer, p_subcategory character varying, p_count integer, p_mode character varying) OWNER TO postgres;

--
-- Name: get_user_friends_list(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_user_friends_list(p_user_id integer) RETURNS TABLE(friendship_id integer, friend_id integer, friend_username character varying, friend_level character varying, friend_points integer, friend_domain character varying, friend_avatar character varying, friend_status character varying)
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.get_user_friends_list(p_user_id integer) OWNER TO postgres;

--
-- Name: oauth_login_or_register(character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.oauth_login_or_register(p_email character varying, p_name character varying, p_provider character varying, p_oauth_id character varying, p_education_level character varying DEFAULT 'Üniversite'::character varying) RETURNS TABLE(user_id integer, username character varying, email character varying, education_level character varying, role character varying, level character varying, total_points integer, gems integer, is_new_user boolean, must_change_pwd boolean)
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.oauth_login_or_register(p_email character varying, p_name character varying, p_provider character varying, p_oauth_id character varying, p_education_level character varying) OWNER TO postgres;

--
-- Name: record_quiz_answer(integer, integer, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.record_quiz_answer(p_user_id integer, p_quiz_id integer, p_is_correct boolean) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_subcat VARCHAR(30);
    v_topic VARCHAR(60);
BEGIN
    -- Sorunun alt kategori ve konusunu al
    SELECT subcategory, topic INTO v_subcat, v_topic
    FROM quizzes WHERE id = p_quiz_id;

    IF v_subcat IS NULL OR v_topic IS NULL THEN
        RETURN;
    END IF;

    -- Kullanıcının konu hâkimiyeti kaydını oluştur veya güncelle
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
$$;


ALTER FUNCTION public.record_quiz_answer(p_user_id integer, p_quiz_id integer, p_is_correct boolean) OWNER TO postgres;

--
-- Name: register_or_update_profile(character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.register_or_update_profile(p_username character varying, p_email character varying, p_education_level character varying, p_pwd_hash character varying DEFAULT 'default_hash'::character varying) RETURNS TABLE(user_id integer, user_name character varying, user_email character varying, user_edu character varying, user_points integer, user_level character varying, user_gems integer, user_streak integer)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_id INT;
BEGIN
    INSERT INTO users (username, email, education_level, pwd_hash, level, total_points, gems, streak_days)
    VALUES (p_username, p_email, p_education_level, p_pwd_hash, 'Çırak', 100, 10, 1)
    ON CONFLICT (email) DO UPDATE
    SET 
        username = EXCLUDED.username,
        education_level = EXCLUDED.education_level,
        last_active = NOW()
    RETURNING id INTO v_id;

    RETURN QUERY
    SELECT 
        u.id,
        u.username,
        u.email,
        u.education_level,
        u.total_points,
        u.level,
        u.gems,
        u.streak_days
    FROM users u
    WHERE u.id = v_id;
END;
$$;


ALTER FUNCTION public.register_or_update_profile(p_username character varying, p_email character varying, p_education_level character varying, p_pwd_hash character varying) OWNER TO postgres;

--
-- Name: request_password_reset(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.request_password_reset(p_email character varying) RETURNS TABLE(success boolean, message text, temporary_password character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_user_id INT;
    v_temp_pwd VARCHAR(20);
BEGIN
    SELECT id INTO v_user_id FROM users WHERE email = p_email;

    IF v_user_id IS NULL THEN
        RETURN QUERY SELECT FALSE, 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.'::TEXT, NULL::VARCHAR;
        RETURN;
    END IF;

    -- 8 karakterli rastgele alfa-numerik geçici şifre üretimi
    v_temp_pwd := 'COD-' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 6);

    UPDATE users
    SET 
        pwd_hash = MD5(v_temp_pwd), -- Gerçek prodüksiyonda argon2 veya bcrypt
        must_change_password = TRUE,
        last_active = NOW()
    WHERE id = v_user_id;

    RETURN QUERY 
    SELECT 
        TRUE, 
        'Geçici şifreniz e-posta adresinize iletildi. Uygulamaya ilk girişinizde şifrenizi yenilemeniz istenecektir.'::TEXT, 
        v_temp_pwd;
END;
$$;


ALTER FUNCTION public.request_password_reset(p_email character varying) OWNER TO postgres;

--
-- Name: trigger_mini_project_remediation(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_mini_project_remediation(p_user_id integer, p_project_id integer) RETURNS TABLE(remediation_id integer, subcategory character varying, failed_project_title character varying, recommended_lesson_id integer, recommended_lesson_title character varying, diagnostic_feedback text, quiz_id integer, question text, option_a character varying, option_b character varying, option_c character varying, option_d character varying, correct_answer character)
    LANGUAGE plpgsql
    AS $$
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
    -- Projenin bilgilerini al
    SELECT a.subcategory, a.title, a.tags 
    INTO v_proj_subcat, v_proj_title, v_proj_tags
    FROM activities a
    WHERE a.id = p_project_id AND a.activity_type = 'mini_proje';

    IF v_proj_subcat IS NULL THEN
        RAISE EXCEPTION 'Geçersiz mini proje ID: %', p_project_id;
    END IF;

    -- 1. Öncelik: Öğrencinin bu dilde 'needs_review = true' olan en zayıf konusunu bul
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

    -- Sokratik teşhis geri bildirimi oluştur
    v_feedback := 'Tebrikler, projeyi denedin! Ancak ' || v_proj_title || ' projesinde ' || 
                  REPLACE(v_target_topic, '_', ' ') || ' konusunda takıldığın tespit edildi. ' ||
                  '75 sorunun hepsini çözmene gerek yok! Senin için özel hazırlanan 3 soruluk mikro teşhis testini ' ||
                  'tamamlamanı ve "' || COALESCE(v_rec_lesson_title, 'İlgili Ders') || '" içeriğini tekrar etmeni öneririm.';

    -- remediation_quizzes tablosuna oturum kaydet
    INSERT INTO remediation_quizzes (
        user_id, subcategory, topic, trigger_activity_id, recommended_lesson_id, question_ids, completed, ai_feedback
    )
    VALUES (
        p_user_id, v_proj_subcat, v_target_topic, p_project_id, v_rec_lesson_id, v_q_ids, FALSE, v_feedback
    )
    RETURNING id INTO v_remed_id;

    -- 3 soruyu ve tavsiye edilen dersi sonuç tablosu olarak döndür
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
$$;


ALTER FUNCTION public.trigger_mini_project_remediation(p_user_id integer, p_project_id integer) OWNER TO postgres;

--
-- Name: update_user_full_profile(integer, character varying, character varying, character varying, character varying, character varying, text, text, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_user_full_profile(p_user_id integer, p_username character varying, p_education_level character varying, p_department character varying, p_known_languages character varying, p_domain_area character varying, p_projects text, p_bio text, p_avatar_url character varying) RETURNS TABLE(success boolean, message text, updated_username character varying, updated_level character varying, updated_points integer)
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.update_user_full_profile(p_user_id integer, p_username character varying, p_education_level character varying, p_department character varying, p_known_languages character varying, p_domain_area character varying, p_projects text, p_bio text, p_avatar_url character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    category character varying(30) NOT NULL,
    subcategory character varying(30),
    activity_type character varying(20) NOT NULL,
    title character varying(150) NOT NULL,
    description text,
    content text,
    points integer NOT NULL,
    difficulty character varying(10) DEFAULT 'kolay'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    tags character varying(255),
    is_repeatable boolean DEFAULT false,
    hint text
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activities_id_seq OWNER TO postgres;

--
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- Name: ai_chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ai_chats (
    id integer NOT NULL,
    user_id integer,
    log_id integer,
    ai_answer text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.ai_chats OWNER TO postgres;

--
-- Name: ai_chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ai_chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ai_chats_id_seq OWNER TO postgres;

--
-- Name: ai_chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ai_chats_id_seq OWNED BY public.ai_chats.id;


--
-- Name: code_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.code_logs (
    id integer NOT NULL,
    user_id integer,
    lesson_id integer,
    code text NOT NULL,
    error_msg text,
    exec_time timestamp without time zone DEFAULT now()
);


ALTER TABLE public.code_logs OWNER TO postgres;

--
-- Name: code_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.code_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.code_logs_id_seq OWNER TO postgres;

--
-- Name: code_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.code_logs_id_seq OWNED BY public.code_logs.id;


--
-- Name: duels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.duels (
    id integer NOT NULL,
    subcategory character varying(30) NOT NULL,
    challenger_id integer NOT NULL,
    opponent_id integer NOT NULL,
    question_ids integer[] NOT NULL,
    challenger_score integer DEFAULT 0,
    opponent_score integer DEFAULT 0,
    winner_id integer,
    status character varying(20) DEFAULT 'completed'::character varying,
    points_awarded integer DEFAULT 50,
    created_at timestamp without time zone DEFAULT now(),
    completed_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.duels OWNER TO postgres;

--
-- Name: duels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.duels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.duels_id_seq OWNER TO postgres;

--
-- Name: duels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.duels_id_seq OWNED BY public.duels.id;


--
-- Name: friendships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friendships (
    id integer NOT NULL,
    user_id integer NOT NULL,
    friend_id integer NOT NULL,
    status character varying(20) DEFAULT 'accepted'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT chk_not_self CHECK ((user_id <> friend_id))
);


ALTER TABLE public.friendships OWNER TO postgres;

--
-- Name: friendships_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.friendships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.friendships_id_seq OWNER TO postgres;

--
-- Name: friendships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.friendships_id_seq OWNED BY public.friendships.id;


--
-- Name: leagues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leagues (
    id integer NOT NULL,
    league_name character varying(30) NOT NULL,
    min_points integer NOT NULL,
    max_points integer NOT NULL,
    badge_icon character varying(10) DEFAULT '🔰'::character varying
);


ALTER TABLE public.leagues OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    pwd_hash character varying(256) NOT NULL,
    level character varying(20) DEFAULT 'Cirak'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    total_points integer DEFAULT 0,
    education_level character varying(60) DEFAULT 'Üniversite'::character varying,
    streak_days integer DEFAULT 0,
    gems integer DEFAULT 0,
    role character varying(20) DEFAULT 'ogrenci'::character varying,
    last_active timestamp without time zone DEFAULT now(),
    department character varying(100) DEFAULT 'Belirtilmedi'::character varying,
    known_languages character varying(255) DEFAULT ''::character varying,
    domain_area character varying(50) DEFAULT 'frontend'::character varying,
    projects text DEFAULT ''::text,
    bio text DEFAULT 'Henüz biyografi eklenmedi.'::text,
    avatar_url character varying(255) DEFAULT 'avatar_default.png'::character varying,
    must_change_password boolean DEFAULT false,
    auth_provider character varying(30) DEFAULT 'local'::character varying,
    oauth_id character varying(150)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: leaderboard; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.leaderboard AS
 SELECT u.id,
    u.username,
    u.total_points,
    l.league_name,
    l.badge_icon,
    rank() OVER (ORDER BY u.total_points DESC) AS siralama
   FROM (public.users u
     LEFT JOIN public.leagues l ON (((u.total_points >= l.min_points) AND (u.total_points <= l.max_points))))
  ORDER BY u.total_points DESC;


ALTER VIEW public.leaderboard OWNER TO postgres;

--
-- Name: leagues_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leagues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.leagues_id_seq OWNER TO postgres;

--
-- Name: leagues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leagues_id_seq OWNED BY public.leagues.id;


--
-- Name: lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons (
    id integer NOT NULL,
    category character varying(20) NOT NULL,
    lesson_id character varying(20) NOT NULL,
    title character varying(150) NOT NULL,
    description text,
    content text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.lessons OWNER TO postgres;

--
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lessons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lessons_id_seq OWNER TO postgres;

--
-- Name: lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;


--
-- Name: mentor_feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mentor_feedback (
    id integer NOT NULL,
    mentor_id integer NOT NULL,
    student_id integer NOT NULL,
    activity_id integer,
    feedback_text text NOT NULL,
    code_snippet text,
    rating integer DEFAULT 5,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.mentor_feedback OWNER TO postgres;

--
-- Name: mentor_feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mentor_feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mentor_feedback_id_seq OWNER TO postgres;

--
-- Name: mentor_feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mentor_feedback_id_seq OWNED BY public.mentor_feedback.id;


--
-- Name: mentor_students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mentor_students (
    id integer NOT NULL,
    mentor_id integer NOT NULL,
    student_id integer NOT NULL,
    project_name character varying(150) NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT chk_mentor_not_self CHECK ((mentor_id <> student_id))
);


ALTER TABLE public.mentor_students OWNER TO postgres;

--
-- Name: mentor_students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mentor_students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mentor_students_id_seq OWNER TO postgres;

--
-- Name: mentor_students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mentor_students_id_seq OWNED BY public.mentor_students.id;


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quizzes (
    id integer NOT NULL,
    category character varying(30) NOT NULL,
    subcategory character varying(30),
    question text NOT NULL,
    option_a character varying(200) NOT NULL,
    option_b character varying(200) NOT NULL,
    option_c character varying(200) NOT NULL,
    option_d character varying(200) NOT NULL,
    correct_answer character(1) NOT NULL,
    difficulty character varying(10) DEFAULT 'kolay'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    topic character varying(60),
    tags character varying(150),
    related_lesson_id integer
);


ALTER TABLE public.quizzes OWNER TO postgres;

--
-- Name: quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quizzes_id_seq OWNER TO postgres;

--
-- Name: quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quizzes_id_seq OWNED BY public.quizzes.id;


--
-- Name: remediation_quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.remediation_quizzes (
    id integer NOT NULL,
    user_id integer,
    subcategory character varying(30) NOT NULL,
    topic character varying(60) NOT NULL,
    trigger_activity_id integer,
    recommended_lesson_id integer,
    question_ids integer[],
    completed boolean DEFAULT false,
    score integer DEFAULT 0,
    ai_feedback text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.remediation_quizzes OWNER TO postgres;

--
-- Name: remediation_quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.remediation_quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.remediation_quizzes_id_seq OWNER TO postgres;

--
-- Name: remediation_quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.remediation_quizzes_id_seq OWNED BY public.remediation_quizzes.id;


--
-- Name: user_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_activities (
    id integer NOT NULL,
    user_id integer,
    activity_id integer,
    earned_points integer DEFAULT 0,
    score integer DEFAULT 0,
    max_score integer DEFAULT 100,
    passed boolean DEFAULT false,
    completed_at timestamp without time zone DEFAULT now(),
    attempt_count integer DEFAULT 1
);


ALTER TABLE public.user_activities OWNER TO postgres;

--
-- Name: user_activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_activities_id_seq OWNER TO postgres;

--
-- Name: user_activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_activities_id_seq OWNED BY public.user_activities.id;


--
-- Name: user_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_progress (
    id integer NOT NULL,
    user_id integer,
    category character varying(30) NOT NULL,
    subcategory character varying(30),
    quiz_score integer DEFAULT 0,
    total_questions integer DEFAULT 0,
    passed boolean DEFAULT false,
    completed_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_progress OWNER TO postgres;

--
-- Name: user_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_progress_id_seq OWNER TO postgres;

--
-- Name: user_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_progress_id_seq OWNED BY public.user_progress.id;


--
-- Name: user_topic_mastery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_topic_mastery (
    id integer NOT NULL,
    user_id integer,
    subcategory character varying(30) NOT NULL,
    topic character varying(60) NOT NULL,
    correct_count integer DEFAULT 0,
    wrong_count integer DEFAULT 0,
    mastery_percentage integer DEFAULT 0,
    needs_review boolean DEFAULT false,
    last_attempted_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_topic_mastery OWNER TO postgres;

--
-- Name: user_topic_mastery_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_topic_mastery_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_topic_mastery_id_seq OWNER TO postgres;

--
-- Name: user_topic_mastery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_topic_mastery_id_seq OWNED BY public.user_topic_mastery.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- Name: ai_chats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_chats ALTER COLUMN id SET DEFAULT nextval('public.ai_chats_id_seq'::regclass);


--
-- Name: code_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.code_logs ALTER COLUMN id SET DEFAULT nextval('public.code_logs_id_seq'::regclass);


--
-- Name: duels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duels ALTER COLUMN id SET DEFAULT nextval('public.duels_id_seq'::regclass);


--
-- Name: friendships id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friendships ALTER COLUMN id SET DEFAULT nextval('public.friendships_id_seq'::regclass);


--
-- Name: leagues id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leagues ALTER COLUMN id SET DEFAULT nextval('public.leagues_id_seq'::regclass);


--
-- Name: lessons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);


--
-- Name: mentor_feedback id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_feedback ALTER COLUMN id SET DEFAULT nextval('public.mentor_feedback_id_seq'::regclass);


--
-- Name: mentor_students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_students ALTER COLUMN id SET DEFAULT nextval('public.mentor_students_id_seq'::regclass);


--
-- Name: quizzes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes ALTER COLUMN id SET DEFAULT nextval('public.quizzes_id_seq'::regclass);


--
-- Name: remediation_quizzes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.remediation_quizzes ALTER COLUMN id SET DEFAULT nextval('public.remediation_quizzes_id_seq'::regclass);


--
-- Name: user_activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_activities ALTER COLUMN id SET DEFAULT nextval('public.user_activities_id_seq'::regclass);


--
-- Name: user_progress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress ALTER COLUMN id SET DEFAULT nextval('public.user_progress_id_seq'::regclass);


--
-- Name: user_topic_mastery id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_topic_mastery ALTER COLUMN id SET DEFAULT nextval('public.user_topic_mastery_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activities (id, category, subcategory, activity_type, title, description, content, points, difficulty, created_at, tags, is_repeatable, hint) FROM stdin;
17	frontend	html	ders	Ders 1: HTML5 İskeleti	Bir web sayfasının temel iskelet yapısı	\N	10	kolay	2026-10-13 00:24:40.160239	iskelet,temel,doctype	f	\N
18	frontend	html	ders	Ders 2: Meta Etiketleri ve SEO	Karakter kodlaması, mobil uyum ve sayfa başlığı	\N	10	kolay	2026-10-13 00:24:40.160239	meta,seo,head,title	f	\N
19	frontend	html	ders	Ders 3: Başlık Hiyerarşisi	H1-H6 başlık kuralları ve SEO standartları	\N	10	kolay	2026-10-13 00:24:40.160239	h1,h6,baslik,seo	f	\N
20	frontend	html	ders	Ders 4: Paragraf ve Satır Yönetimi	p, br ve hr etiketlerinin doğru kullanımı	\N	10	kolay	2026-10-13 00:24:40.160239	paragraf,p,br,hr	f	\N
21	frontend	html	ders	Ders 5: Metin Vurguları	strong, em, mark, del ile kelimeleri biçimlendirme	\N	10	kolay	2026-10-13 00:24:40.160239	strong,em,mark,del,stil	f	\N
22	frontend	html	alistirma	Alıştırma: Boş Sayfa İskeleti Kur	Sayfayı DOCTYPE, html, head ve body etiketleriyle sıfırdan kur.	\N	5	kolay	2026-10-13 00:24:40.160239	iskelet,temel	t	DOCTYPE bildirimini en başa yazmayı unutma.
23	frontend	html	alistirma	Alıştırma: Türkçe Karakter Desteği Ekle	head içine Türkçe karakterlerin bozulmasını engelleyen meta etiketini yaz.	\N	5	kolay	2026-10-13 00:24:40.160239	meta,charset	t	charset="UTF-8" parametresini kullanmalısın.
24	frontend	html	alistirma	Alıştırma: Hiyerarşik Blog Başlıkları	Ana başlık H1, iki alt başlık H2 ve bir alt başlık H3 olacak şekilde yapı kur.	\N	5	kolay	2026-10-13 00:24:40.160239	baslik,h1,h2	t	Bir sayfada sadece 1 adet H1 olmalıdır.
25	frontend	html	alistirma	Alıştırma: Şiir Formatlama (Satır Sonu)	Aynı paragraf içinde alt satıra geçmek için doğru etiketi yerleştir.	\N	5	kolay	2026-10-13 00:24:40.160239	br,satir	t	Yeni paragraf açmak yerine <br> kullanmalısın.
26	frontend	html	alistirma	Alıştırma: İndirimli Fiyat Vurgusu	Eski fiyatın üstünü çiz (del), yeni fiyatı kalın ve sarı vurgulu (mark) yap.	\N	5	kolay	2026-10-13 00:24:40.160239	del,mark,strong	t	<del> ve <mark> etiketlerini iç içe veya ardışık kullanabilirsin.
27	frontend	html	mini_proje	Mini Proje 1: Kişisel Biyografi Sayfası	Hiçbir hazır şablon olmadan; iskelet, SEO başlığı, hiyerarşik başlıklar, vurgulu metinler ve paragraflar içeren bir biyografi sayfası oluştur.	\N	50	orta	2026-10-13 00:24:40.160239	proje,biyografi,iskelet,metin	f	\N
39	frontend	html	ders	Ders 6: Bağlantılar ve Çapa Linkler	a etiketi, link türleri ve sayfa içi çapa navigasyonu	\N	10	kolay	2026-10-13 00:27:25.441803	link,a,href,capa,id	f	\N
40	frontend	html	ders	Ders 7: Sekme Yönetimi ve İndirmeler	target="_blank" kullanımı, rel="noopener" güvenliği ve indirmeler	\N	10	kolay	2026-10-13 00:27:25.441803	target,blank,guvenlik,download	f	\N
41	frontend	html	ders	Ders 8: Listeleme Sanatı	ul, ol, li etiketleri, iç içe menüler ve tanım listeleri	\N	10	kolay	2026-10-13 00:27:25.441803	liste,ul,ol,li,menu	f	\N
42	frontend	html	ders	Ders 9: Görsel Yönetimi ve SEO	img etiketi, alt niteliği ve lazy loading performansı	\N	10	kolay	2026-10-13 00:27:25.441803	resim,img,alt,seo,lazy	f	\N
43	frontend	html	ders	Ders 10: Duyarlı Görseller (Picture)	picture ve source etiketleri ile farklı ekranlara uygun görseller	\N	10	orta	2026-10-13 00:27:25.441803	picture,source,responsive,medya	f	\N
44	frontend	html	alistirma	Alıştırma: Sayfa İçi Başa Dön Linki	Sayfanın en altına link koyup en üstteki id="basa" elemanına zıplat.	\N	5	kolay	2026-10-13 00:27:25.441803	link,href,id,capa	t	href="#basa" şeklinde diyez işareti kullanmalısın.
45	frontend	html	alistirma	Alıştırma: Güvenli Dış Bağlantı	Google adresine giden, yeni sekmede açılan güvenli bir link oluştur.	\N	5	kolay	2026-10-13 00:27:25.441803	link,target,guvenlik	t	target="_blank" yanına rel="noopener noreferrer" eklemelisin.
46	frontend	html	alistirma	Alıştırma: Çok Katmanlı Restoran Menüsü	Sırasız liste içinde iç içe geçmiş bir tatlı ve içecek kategorisi listele.	\N	5	orta	2026-10-13 00:27:25.441803	liste,ul,li,nested	t	li etiketinin içine yeni bir ul açarak iç içe liste yapabilirsin.
47	frontend	html	alistirma	Alıştırma: SEO Uyumlu ve Hızlı Resim	Sayfaya sonradan yüklenecek boyutu ve açıklaması tanımlı fotoğraf ekle.	\N	5	kolay	2026-10-13 00:27:25.441803	img,alt,lazy	t	loading="lazy" ve alt parametrelerini unutma.
48	frontend	html	alistirma	Alıştırma: Ekran Boyutuna Göre Resim	Mobilde küçük masaüstünde büyük fotoğraf gösteren picture bloğu yaz.	\N	5	orta	2026-10-13 00:27:25.441803	picture,source,media	t	picture içinde source media min-width kullanmalısın.
49	frontend	html	mini_proje	Mini Proje 2: Seyahat Rehberi ve Foto Galeri	Boş editörde; sayfa içi çapa menüsü, dışarıya açılan güvenli linkler, gezi rotası listeleri ve optimize edilmiş görsellerden oluşan bir şehir rehberi tasarla.	\N	50	orta	2026-10-13 00:27:25.441803	proje,galeri,rehber,medya,liste	f	\N
50	frontend	html	ders	Ders 11: Tablo Temelleri	table, tr, td ve th etiketleriyle düzenli veri sunumu	\N	10	kolay	2026-10-13 00:28:05.650035	tablo,table,tr,td,th	f	\N
51	frontend	html	ders	Ders 12: Anlamsal Tablo Mimarisi	thead, tbody, tfoot ve tablo başlığı için caption kullanımı	\N	10	kolay	2026-10-13 00:28:05.650035	tablo,thead,tbody,tfoot,caption	f	\N
52	frontend	html	ders	Ders 13: Sütun Birleştirme (colspan)	colspan niteliği ile birden fazla sütunu tek hücrede toplama	\N	10	orta	2026-10-13 00:28:05.650035	tablo,colspan,birlestir,sutun	f	\N
53	frontend	html	ders	Ders 14: Satır Birleştirme (rowspan)	rowspan niteliği ile birden fazla satırı tek hücrede toplama ve karmaşık matrisler	\N	10	orta	2026-10-13 00:28:05.650035	tablo,rowspan,birlestir,satir	f	\N
54	frontend	html	alistirma	Alıştırma: 3x3 Öğrenci Not Çizelgesi	thead ve tbody kullanarak 3 sütunlu ve 3 satırlı düzenli bir not tablosu oluştur.	\N	5	kolay	2026-10-13 00:28:05.650035	tablo,not,th,td	t	Başlık satırlarında td yerine th kullanmalısın.
55	frontend	html	alistirma	Alıştırma: Başlığı Birleştir (colspan)	Tablonun en üst satırındaki hücreyi 3 sütunu birden kaplayacak şekilde birleştir.	\N	5	orta	2026-10-13 00:28:05.650035	tablo,colspan	t	th etiketine colspan="3" parametresini vermelisin.
56	frontend	html	alistirma	Alıştırma: Günleri Birleştir (rowspan)	Ders programında Pazartesi hücresini alt alta 2 ders saatini kapsayacak şekilde birleştir.	\N	5	orta	2026-10-13 00:28:05.650035	tablo,rowspan	t	td etiketine rowspan="2" vermelisin ve alt satırdan bir hücre eksiltmelisin.
57	frontend	html	alistirma	Alıştırma: Muhasebe Toplamı (tfoot + colspan)	Tablonun en altına tfoot ekleyip 2 sütun birleştirerek Genel Toplam hücresi yaz.	\N	5	orta	2026-10-13 00:28:05.650035	tablo,tfoot,colspan	t	tfoot bloğu içinde colspan="2" kullanarak toplam tutarı sağa yasla.
58	frontend	html	mini_proje	Mini Proje 3: Detaylı E-Ticaret Fatura Şablonu	Boş editörde; fatura başlığı (caption), ürün listesi (thead/tbody), ara toplam, kdv ve genel toplam hesaplarının hem colspan hem rowspan ile birleştirildiği profesyonel bir fatura tablosu tasarla.	\N	50	zor	2026-10-13 00:28:05.650035	proje,fatura,tablo,colspan,rowspan	f	\N
59	frontend	html	ders	Ders 15: Form Mimarisi ve Etiketler	form etiketi, GET/POST metodları ve erişilebilirlik için label bağlantısı	\N	10	kolay	2026-10-13 00:28:44.203445	form,label,action,method,input	f	\N
60	frontend	html	ders	Ders 16: Temel Input Türleri	text, password, email girdileri, placeholder ve name niteliğinin önemi	\N	10	kolay	2026-10-13 00:28:44.203445	input,text,password,email,name	f	\N
61	frontend	html	ders	Ders 17: Seçim Elemanları (Radio & Select)	checkbox, tekil seçim için radio grupları ve select-option menüleri	\N	10	kolay	2026-10-13 00:28:44.203445	radio,checkbox,select,option	f	\N
62	frontend	html	ders	Ders 18: Çok Satırlı Metin ve Butonlar	textarea, form butonları (submit, reset) ve fieldset-legend gruplaması	\N	10	kolay	2026-10-13 00:28:44.203445	textarea,button,submit,fieldset	f	\N
63	frontend	html	ders	Ders 19: Yeni Nesil HTML5 Inputları	date, time, color, range, number ve dosya yükleme için file türleri	\N	10	orta	2026-10-13 00:28:44.203445	html5,date,color,range,file	f	\N
64	frontend	html	ders	Ders 20: Tarayıcı Düzeyinde Form Doğrulama	required, min/max, minlength, pattern (Regex) ve disabled özellikleri	\N	10	orta	2026-10-13 00:28:44.203445	validation,dogrulama,required,pattern	f	\N
65	frontend	html	alistirma	Alıştırma: Kusursuz Tıklanabilir Label	Kullanıcı yazıya tıkladığında otomatik olarak şifre kutusuna odaklanan label-input bağı kur.	\N	5	kolay	2026-10-13 00:28:44.203445	form,label,id,for	t	label içindeki for değeri ile input içindeki id değeri birebir aynı olmalıdır.
66	frontend	html	alistirma	Alıştırma: Tekil Cinsiyet Seçimi (Radio)	Kullanıcının sadece tek bir seçenek seçebileceği Kadın/Erkek radio buton grubu oluştur.	\N	5	kolay	2026-10-13 00:28:44.203445	radio,name,secim	t	İki radio inputun da name değerini aynı yapmalısın.
67	frontend	html	alistirma	Alıştırma: Yaş ve Renk Seçici	Kullanıcının rengini renk paletinden seçtiği ve yaşını 18-99 slider ile belirlediği iki alan yap.	\N	5	orta	2026-10-13 00:28:44.203445	color,range,min,max	t	type="color" ve type="range" (min=18, max=99) kullanmalısın.
68	frontend	html	alistirma	Alıştırma: Zorunlu ve Güçlü Şifre Alanı	Boş geçilemeyen (required) ve en az 8 karakter olması zorunlu şifre alanı tanımla.	\N	5	orta	2026-10-13 00:28:44.203445	password,required,minlength	t	type="password" yanına required ve minlength="8" eklemelisin.
69	frontend	html	alistirma	Alıştırma: Çoklu Fotoğraf Yükleme	Kullanıcının aynı anda birden fazla dosya/fotoğraf seçebileceği bir dosya inputu yaz.	\N	5	orta	2026-10-13 00:28:44.203445	file,upload,multiple	t	type="file" yanına multiple niteliğini eklemelisin.
70	frontend	html	mini_proje	Mini Proje 4: Kapsamlı İş Başvuru ve Kayıt Formu	Boş editörde; kişisel bilgiler, dosya (CV) yükleme, tarih seçici, tecrübe sliderı, zorunlu alan doğrulamaları ve gruplanmış (fieldset) bir iş başvuru formu oluştur.	\N	50	zor	2026-10-13 00:28:44.203445	proje,form,kayit,basvuru,validation	f	\N
71	frontend	html	ders	Ders 21: Semantik Web ve Layout Mimarisi	header, nav, main, section, article, aside ve footer ile profesyonel sayfa yapısı	\N	10	orta	2026-10-13 00:29:28.180937	semantik,header,nav,main,section,footer	f	\N
72	frontend	html	ders	Ders 22: Video ve Ses Entegrasyonu	video ve audio etiketleri, controls, autoplay, loop ve codec parametreleri	\N	10	kolay	2026-10-13 00:29:28.180937	video,audio,medya,multimedya	f	\N
73	frontend	html	ders	Ders 23: Güvenli Harici İçerikler (iframe)	iframe etiketi, YouTube ve harita yerleştirme, sandbox güvenlik kısıtlamaları	\N	10	orta	2026-10-13 00:29:28.180937	iframe,youtube,harita,sandbox,guvenlik	f	\N
74	frontend	html	ders	Ders 24: Modern Etkileşim: Details & Dialog	JS olmadan açılır kapanır akordiyon (details-summary) ve yerel popup (dialog)	\N	10	orta	2026-10-13 00:29:28.180937	details,summary,dialog,popup,akordiyon	f	\N
75	frontend	html	ders	Ders 25: Sosyal Medya ve Paylaşım Kartları (Open Graph)	Facebook, Twitter ve WhatsApp paylaşımlarında zengin önizleme sunan meta etiketleri	\N	10	orta	2026-10-13 00:29:28.180937	opengraph,og,seo,sosyalmedya,meta	f	\N
76	frontend	html	alistirma	Alıştırma: Sıfır JS ile Akordiyon Menü	Kullanıcı tıkladığında cevabı aşağı açılan Sıkça Sorulan Sorular kartı oluştur.	\N	5	kolay	2026-10-13 00:29:28.180937	details,summary,faq	t	<details> içine başlık için <summary> ve altına içerik koymalısın.
77	frontend	html	alistirma	Alıştırma: Otomatik Başlayan Sessiz Video	Sayfa açıldığında otomatik oynayan ancak sesi kapalı (muted) video yerleştir.	\N	5	orta	2026-10-13 00:29:28.180937	video,autoplay,muted	t	Tarayıcıların videoyu otomatik oynatması için autoplay yanına muted zorunludur.
78	frontend	html	alistirma	Alıştırma: Güvenli Harita İframe	Sayfaya harici bir harita göm ve sandbox niteliği ile güvenlik önlemini al.	\N	5	orta	2026-10-13 00:29:28.180937	iframe,sandbox,guvenlik	t	<iframe> içine sandbox niteliğini ekleyerek yetkileri sınırlandır.
79	frontend	html	alistirma	Alıştırma: WhatsApp Önizleme Resmi Tanımla	head etiketine link paylaşıldığında görünecek görseli belirten Open Graph etiketini yaz.	\N	5	kolay	2026-10-13 00:29:28.180937	meta,opengraph,ogimage	t	<meta property="og:image" content="resim.jpg"> şeklinde tanımlamalısın.
80	frontend	html	alistirma	Alıştırma: Modal / Dialog Penceresi	Sayfaya doğrudan açık duran modern bir <dialog> penceresi ekle.	\N	5	orta	2026-10-13 00:29:28.180937	dialog,modal,popup	t	<dialog open> etiketi pencereyi doğrudan görünür kılar.
81	frontend	html	mini_proje	Mini Proje 5: Teknoloji Blog ve Haber Portalı	Boş editörde; semantik layout (header, nav, article, aside, footer), video haber, harici harita ve SSS akordiyonu içeren tam teşekküllü bir blog portalı kodla.	\N	50	zor	2026-10-13 00:29:28.180937	proje,semantik,blog,portal,layout	f	\N
82	frontend	html	mini_proje	🏆 HTML Bitirme Projesi: Sıfırdan Çok Sayfalı Kurumsal Web Sitesi	Hiçbir CSS veya JS olmadan, sadece saf HTML kullanarak; Anasayfa, Hakkımızda, Ürünler (Tablolu), Medya Galerisi ve İletişim (Doğrulamalı Form) içeren eksiksiz semantik bir şirket web sitesini sıfırdan inşa et.	\N	100	zor	2026-10-13 00:29:28.180937	mezuniyet,kurumsal,master,html,tam_proje	f	\N
83	frontend	css	ders	Ders 1: CSS Nedir ve Nasıl Bağlanır?	Inline, internal (style) ve external (link) CSS bağlama yöntemleri ve öncelik sırası	\N	10	kolay	2026-10-14 20:03:32.401803	css,baglama,link,style,inline	f	\N
84	frontend	css	ders	Ders 2: Temel Seçiciler (Selectors)	Element, class (.), id (#) seçicileri ve öncelik (specificity) kuralı	\N	10	kolay	2026-10-14 20:03:32.401803	secici,class,id,element,specificity	f	\N
85	frontend	css	ders	Ders 3: Birleşik ve Akraba Seçiciler	Torun (div p), çocuk (div>p), kardeş (~) ve bitişik kardeş (+) seçiciler	\N	10	orta	2026-10-14 20:03:32.401803	secici,torun,cocuk,kardes,kombinator	f	\N
86	frontend	css	ders	Ders 4: Renkler (HEX, RGB, HSL)	Renk formatları, rgba ile şeffaflık ve hsl ile sezgisel renk seçimi	\N	10	kolay	2026-10-14 20:03:32.401803	renk,hex,rgb,rgba,hsl,renk_paleti	f	\N
87	frontend	css	ders	Ders 5: Arka Plan ve Görsel	background-color, background-image, background-size (cover/contain), position ve attachment	\N	10	kolay	2026-10-14 20:03:32.401803	arkaplan,background,cover,image	f	\N
88	frontend	css	ders	Ders 6: Gradyan (Renk Geçişleri)	linear-gradient yön ve açı, radial-gradient merkez ve gradient metin efekti	\N	10	orta	2026-10-14 20:03:32.401803	gradient,gecis,linear,radial,renk	f	\N
89	frontend	css	ders	Ders 7: Tipografi ve Yazı Stilleri	font-family, font-size (rem/em), font-weight, line-height, letter-spacing ve Google Fonts bağlama	\N	10	kolay	2026-10-14 20:03:32.401803	font,yazi,tipografi,fontsize,googlefonts	f	\N
90	frontend	css	ders	Ders 8: Metin Hizalama ve Dekorasyon	text-align, text-decoration, text-transform (uppercase/lowercase), text-shadow ve white-space	\N	10	kolay	2026-10-14 20:03:32.401803	metin,textalign,shadow,decoration,transform	f	\N
91	frontend	css	alistirma	Alıştırma: Üç Yöntemle CSS Bağla	Aynı sayfaya inline, style etiketi ve harici .css dosyası ile renk verip öncelik sırasını gözlemle.	\N	5	kolay	2026-10-14 20:03:32.401803	css,baglama,inline	t	En yüksek öncelik inline stildir, sonra id, sonra class gelir.
92	frontend	css	alistirma	Alıştırma: Spesifik Seçici Yarışı	Aynı elemente hem class hem id ile farklı renkler ver ve hangisinin kazandığını gözlemle.	\N	5	orta	2026-10-14 20:03:32.401803	secici,specificity,oncelik	t	ID seçicisi her zaman class seçicisini ezer.
93	frontend	css	alistirma	Alıştırma: Siluet Arka Plan	Bir görselin üzerine yarı saydam siyah rgba katmanı koyarak metin okunabilir hale getir.	\N	5	orta	2026-10-14 20:03:32.401803	rgba,arkaplan,katman,siluet	t	background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("foto.jpg") kullan.
94	frontend	css	alistirma	Alıştırma: Gradient Yazı Rengi	Bir başlığın yazı rengini soldan sağa mavi-mora geçişli gradient yap.	\N	5	zor	2026-10-14 20:03:32.401803	gradient,yazi,clip,text	t	background-clip: text ve color: transparent kullanmalısın.
95	frontend	css	alistirma	Alıştırma: Google Fonts Entegrasyonu	Sayfaya Google Fonts üzerinden Poppins fontunu bağla ve tüm sayfa metnine uygula.	\N	5	kolay	2026-10-14 20:03:32.401803	font,googlefonts,typography	t	HTML head içine Google Fonts link etiketini ekle, sonra CSS de font-family kullan.
96	frontend	css	mini_proje	Mini Proje 1: Kişisel Marka Renk Paleti ve Tipografi	Boş editörde; özel bir renk paleti (HEX/HSL), gradient başlık, siluetli arka plan görseli, Google Fonts ve siyah/beyaz tipografi hiyerarşisi ile kişisel bir "Hakkımda" kartvizit sayfası tasarla.	\N	50	orta	2026-10-14 20:03:32.401803	proje,tipografi,renk,gradient,arkaplan	f	\N
97	frontend	css	ders	Ders 9: Box Model (Kutu Modeli)	content, padding, border, margin katmanları ve box-sizing: border-box önemi	\N	10	kolay	2026-10-14 20:04:35.578157	boxmodel,padding,margin,border,boxsizing	f	\N
98	frontend	css	ders	Ders 10: Border ve Outline	border kısayolları, border-radius ile yuvarlak köşeler, outline farkı ve box-shadow	\N	10	kolay	2026-10-14 20:04:35.578157	border,radius,outline,shadow,yuvarlak	f	\N
99	frontend	css	ders	Ders 11: Display Türleri	block, inline, inline-block, none ve visibility:hidden farkları ve kullanım senaryoları	\N	10	kolay	2026-10-14 20:04:35.578157	display,block,inline,none,visibility	f	\N
100	frontend	css	ders	Ders 12: Position (Konumlandırma)	static, relative, absolute, fixed ve sticky farkları ve z-index katman yönetimi	\N	10	orta	2026-10-14 20:04:35.578157	position,relative,absolute,fixed,sticky,zindex	f	\N
101	frontend	css	ders	Ders 13: Float ve Clear (Klasik Layout)	float: left/right ve clear ile yan yana içerik yerleştirme ve clearfix tekniği	\N	10	orta	2026-10-14 20:04:35.578157	float,clear,clearfix,layout	f	\N
102	frontend	css	ders	Ders 14: Overflow ve Scroll	overflow: hidden/scroll/auto ile taşan içerik yönetimi ve özel kaydırma çubuğu	\N	10	orta	2026-10-14 20:04:35.578157	overflow,scroll,hidden,clip,kaydirma	f	\N
103	frontend	css	ders	Ders 15: Width, Height ve Boyutlandırma	px, %, vw, vh, min/max-width/height ve aspect-ratio ile akıllı boyutlandırma	\N	10	kolay	2026-10-14 20:04:35.578157	width,height,vw,vh,responsive,boyut	f	\N
104	frontend	css	ders	Ders 16: CSS Değişkenleri (Custom Properties)	:root ile global renk ve boyut değişkenleri, var() kullanımı ve tema sistemi kurma	\N	10	orta	2026-10-14 20:04:35.578157	variable,degisken,root,var,tema,darkmode	f	\N
105	frontend	css	alistirma	Alıştırma: Box Model Hesabı	padding:20px ve border:5px olan 200px genişliğindeki bir kutunun gerçek toplam genişliğini bul ve box-sizing ile düzelt.	\N	5	orta	2026-10-14 20:04:35.578157	boxmodel,padding,border,hesap	t	box-sizing:border-box ekleyince padding ve border genişlik içine dahil olur.
106	frontend	css	alistirma	Alıştırma: Sticky Navigasyon Menüsü	Sayfa aşağı kaydırıldığında üstte sabit kalan bir navbar oluştur.	\N	5	orta	2026-10-14 20:04:35.578157	position,sticky,navbar,fixed	t	position: sticky ve top: 0 kullanmalısın.
107	frontend	css	alistirma	Alıştırma: Ortada Sabit Popup	Ekranın tam ortasında duran ve scroll edilse de yerinden oynamayan bir bildirim kutusu yap.	\N	5	zor	2026-10-14 20:04:35.578157	position,fixed,center,transform	t	position:fixed, top:50%, left:50%, transform:translate(-50%,-50%) kullan.
108	frontend	css	alistirma	Alıştırma: Renk Teması Değişkeni	:root içinde 3 ana renk değişkeni tanımla ve bunları buton, başlık ve arkaplan renklerinde kullan.	\N	5	orta	2026-10-14 20:04:35.578157	variable,root,var,tema	t	--primary-color:#3b82f6 şeklinde tanımlayıp var(--primary-color) ile çağır.
109	frontend	css	alistirma	Alıştırma: Overflow ile Kart İçeriği	Sabit yükseklikteki bir karta sığmayan uzun metni gizle, üzerine gelinince kaydırılabilir yap.	\N	5	orta	2026-10-14 20:04:35.578157	overflow,scroll,hidden,hover	t	overflow:hidden kullan hover durumunda overflow:auto yap.
110	frontend	css	mini_proje	Mini Proje 2: Sticky Navbar ve Konumlandırılmış Hero Bölümü	Boş editörde; sticky menü çubuğu, tam ekran hero alanı (vh kullanarak), üstte sabit bildirim rozeti (absolute konum), CSS değişkenleriyle tema sistemi ve özel kaydırma efekti olan bir ürün açılış sayfası tasarla.	\N	50	orta	2026-10-14 20:04:35.578157	proje,sticky,hero,position,tema,variable	f	\N
111	frontend	css	ders	Ders 17: Flexbox Temelleri	display:flex, flex-direction (row/column), flex-wrap ve flex-flow kısayolu	\N	10	kolay	2026-10-14 20:05:55.283032	flex,flexbox,direction,wrap,layout	f	\N
112	frontend	css	ders	Ders 18: Yatay Hizalama (justify-content)	flex-start, flex-end, center, space-between, space-around ve space-evenly farkları	\N	10	kolay	2026-10-14 20:05:55.283032	flex,justify,hizalama,space,center	f	\N
113	frontend	css	ders	Ders 19: Dikey Hizalama (align-items & align-self)	align-items ile grup hizalama, align-self ile tek eleman hizalama ve stretch davranışı	\N	10	kolay	2026-10-14 20:05:55.283032	flex,align,dikey,stretch,self	f	\N
114	frontend	css	ders	Ders 20: Flex Büyüme ve Küçülme	flex-grow, flex-shrink, flex-basis ve kısayol flex:1 kullanımı ile orantılı boyutlandırma	\N	10	orta	2026-10-14 20:05:55.283032	flex,grow,shrink,basis,orantisal	f	\N
115	frontend	css	ders	Ders 21: Çok Satırlı Flexbox (align-content)	flex-wrap ile sarılan çok satırlı yapılarda satırlar arası boşluk yönetimi	\N	10	orta	2026-10-14 20:05:55.283032	flex,wrap,multiline,aligncontent	f	\N
116	frontend	css	ders	Ders 22: Flexbox ile Gerçek Dünya Layoutları	Navbar, kart ızgarası, footer ve tam sayfa dikey-yatay ortalama senaryoları	\N	10	orta	2026-10-14 20:05:55.283032	flex,navbar,kart,layout,center,gercek	f	\N
117	frontend	css	alistirma	Alıştırma: Mükemmel Ortala	Hem yatay hem dikey olarak ekranın tam ortasında duran bir kutu yap.	\N	5	kolay	2026-10-14 20:05:55.283032	flex,center,justify,align	t	display:flex, justify-content:center ve align-items:center kullan.
118	frontend	css	alistirma	Alıştırma: Eşit Genişlikli 3 Kart	3 kart yan yana dizilsin ve her biri eşit genişlikte olsun. Ekran daralınca alt alta geçsin.	\N	5	orta	2026-10-14 20:05:55.283032	flex,grow,wrap,kart	t	flex:1 ve flex-wrap:wrap kullan.
119	frontend	css	alistirma	Alıştırma: Sol Logo Sağ Menü Navbar	Logo sola, navigasyon linkleri sağa yaslanmış profesyonel navbar oluştur.	\N	5	orta	2026-10-14 20:05:55.283032	flex,navbar,space-between	t	justify-content:space-between ile logo ve nav arasındaki boşluğu otomatik doldur.
120	frontend	css	alistirma	Alıştırma: Farklı Boyutlu Flex Elemanlar	3 kutudan birincisi 2 birim, ikincisi 1 birim, üçüncüsü 3 birim yer kaplasın.	\N	5	zor	2026-10-14 20:05:55.283032	flex,grow,basis,orantisal	t	Her kutuya sırayla flex:2, flex:1 ve flex:3 ver.
121	frontend	css	alistirma	Alıştırma: Align-Self ile Tek Eleman	5 elemanlı flex kutusunda sadece ortadaki eleman diğerlerinden ayrı üste yaslanmış olsun.	\N	5	zor	2026-10-14 20:05:55.283032	flex,alignself,bireysel	t	Sadece o elemana align-self:flex-start ver, diğerleri etkilenmez.
122	frontend	css	mini_proje	Mini Proje 3: Tam Responsive Flexbox Dashboard	Boş editörde; sticky navbar (logo+menü), hero alanı, 3 eşit özellik kartı, 2 sütunlu içerik alanı ve footer içeren ve flex-wrap ile mobilde tek sütuna geçen tam sayfalık bir uygulama panosu tasarla.	\N	50	zor	2026-10-14 20:05:55.283032	proje,flex,dashboard,responsive,navbar,kart	f	\N
123	frontend	css	ders	Ders 23: Grid Temelleri	display:grid, grid-template-columns, grid-template-rows ve gap ile ızgara kurma	\N	10	kolay	2026-10-14 20:08:29.01674	grid,columns,rows,gap,izgara	f	\N
124	frontend	css	ders	Ders 24: fr Birimi ve repeat()	Kesirli birim (fr) ile orantılı sütunlar, repeat() kısayolu ve minmax() esnek boyutlar	\N	10	orta	2026-10-14 20:08:29.01674	grid,fr,repeat,minmax,orantisal	f	\N
125	frontend	css	ders	Ders 25: Grid Elemanı Yerleştirme	grid-column ve grid-row ile elemanı birden fazla hücreye yayma (span) ve kesin konum	\N	10	orta	2026-10-14 20:08:29.01674	grid,column,row,span,yerlestirme	f	\N
126	frontend	css	ders	Ders 26: Grid Template Areas	grid-template-areas ile isimlendirilmiş bölgeler ve sayfa layoutunu görsel olarak tanımlama	\N	10	orta	2026-10-14 20:08:29.01674	grid,areas,template,layout,bolge	f	\N
127	frontend	css	ders	Ders 27: auto-fill ve auto-fit	auto-fill ve auto-fit farkı ile ekrana sığan kadar sütun oluşturan dinamik ızgara	\N	10	zor	2026-10-14 20:08:29.01674	grid,autofill,autofit,responsive,dinamik	f	\N
128	frontend	css	ders	Ders 28: Flexbox mu Grid mi? Doğru Seçim	Tek eksen (Flex) vs çift eksen (Grid) karşılaştırması ve gerçek proje senaryoları	\N	10	orta	2026-10-14 20:08:29.01674	grid,flex,karsilastirma,senaryo,mimari	f	\N
129	frontend	css	alistirma	Alıştırma: Fotoğraf Galerisi Izgarası	3 sütunlu, her fotoğraf eşit boyutlu olan ve boşluklu bir galeri ızgarası oluştur.	\N	5	kolay	2026-10-14 20:08:29.01674	grid,repeat,gap,galeri	t	grid-template-columns:repeat(3,1fr) ve gap kullan.
130	frontend	css	alistirma	Alıştırma: Öne Çıkan Büyük Kart	4 kartlık bir ızgarada ilk kart hem 2 sütun hem 2 satır kaplasın.	\N	5	zor	2026-10-14 20:08:29.01674	grid,span,colspan,rowspan	t	İlk karta grid-column:span 2 ve grid-row:span 2 ver.
131	frontend	css	alistirma	Alıştırma: Named Areas ile Sayfa İskeleti	grid-template-areas ile header, sidebar, main ve footer bölgeli bir sayfa iskeleti kur.	\N	5	zor	2026-10-14 20:08:29.01674	grid,areas,layout,header,footer	t	Her bölgeye aynı ismi grid-area ile ver, template-areas da kullan.
132	frontend	css	alistirma	Alıştırma: Ekrana Sığan Kadar Kart	Ekran büyüdükçe kart sayısı artan küçüldükçe azalan otomatik responsive ızgara yap.	\N	5	zor	2026-10-14 20:08:29.01674	grid,autofit,minmax,responsive	t	grid-template-columns:repeat(auto-fit,minmax(250px,1fr)) kullan.
133	frontend	css	alistirma	Alıştırma: Haber Sitesi Grid Düzeni	Büyük manşet, 2 yan haber ve alt reklam bandı içeren haber sayfası grid layoutu kur.	\N	5	zor	2026-10-14 20:08:29.01674	grid,haber,layout,span,areas	t	grid-template-areas ve farklı span değerlerini birlikte kullan.
134	frontend	css	mini_proje	Mini Proje 4: Pinterest Benzeri Masonry Galeri	Boş editörde; auto-fit ve minmax ile tam responsive, büyük görselin 2 sütun kapladığı, hover efektli ve başlık overlay içeren modern bir fotoğraf galerisi tasarla.	\N	50	zor	2026-10-14 20:08:29.01674	proje,grid,galeri,masonry,responsive,hover,overlay	f	\N
135	frontend	css	ders	Ders 29: Transition (Yumuşak Geçiş)	transition-property, duration, timing-function (ease/linear/cubic-bezier) ve delay ile pürüzsüz animasyon	\N	10	kolay	2026-10-14 20:10:01.129703	transition,gecis,ease,hover,animasyon	f	\N
136	frontend	css	ders	Ders 30: Transform 2D	translate, scale, rotate, skew ve birden fazla transform birleştirme	\N	10	kolay	2026-10-14 20:10:01.129703	transform,translate,scale,rotate,2d	f	\N
137	frontend	css	ders	Ders 31: Transform 3D ve Perspektif	perspective, rotateX/Y/Z, translateZ ve 3D kart çevirme efekti	\N	10	zor	2026-10-14 20:10:01.129703	transform,3d,perspective,rotatex,karti	f	\N
138	frontend	css	ders	Ders 32: Hover Efektleri (Kart, Buton, Resim)	Scale, translateY, brightness ve overlay ile profesyonel hover etkileşimleri	\N	10	orta	2026-10-14 20:10:01.129703	hover,scale,overlay,buton,kart,resim	f	\N
139	frontend	css	ders	Ders 33: @keyframes Animasyonlar	animation-name, duration, iteration-count, direction ve fill-mode ile tam kontrol	\N	10	orta	2026-10-14 20:10:01.129703	keyframes,animation,infinite,iterate,fillmode	f	\N
140	frontend	css	ders	Ders 34: Neon Parlama ve Glow Efekti	box-shadow ve text-shadow ile neon ışık efekti ve pulse animasyonu	\N	10	orta	2026-10-14 20:10:01.129703	neon,glow,shadow,pulse,parlama	f	\N
141	frontend	css	ders	Ders 35: Buzlu Cam (Glassmorphism)	backdrop-filter:blur, rgba arkaplan ve border ile modern saydam kart efekti	\N	10	orta	2026-10-14 20:10:01.129703	glass,glassmorphism,blur,backdrop,seffaf	f	\N
142	frontend	css	ders	Ders 36: filter ile CSS Photoshop	grayscale, brightness, contrast, saturate, blur, hue-rotate ve drop-shadow	\N	10	orta	2026-10-14 20:10:01.129703	filter,grayscale,blur,brightness,photoshop	f	\N
143	frontend	css	ders	Ders 37: clip-path ile Şekil Kesme	polygon, circle, ellipse ile eleman şekillendirme ve hover ile şekil geçişi	\N	10	zor	2026-10-14 20:10:01.129703	clippath,polygon,sekil,kesme,shape	f	\N
144	frontend	css	ders	Ders 38: Pseudo-element (::before ve ::after)	CSS ile HTML eklemeden dekoratif element oluşturma, içerik ekleme ve overlay katmanı	\N	10	zor	2026-10-14 20:10:01.129703	before,after,pseudo,dekoratif,overlay,content	f	\N
145	frontend	css	alistirma	Alıştırma: Zıplayan Buton	Hover ile 8px yukarı kalkan, gölge kazanan ve 0.3s ease geçişli bir buton yap.	\N	5	kolay	2026-10-14 20:10:01.129703	hover,transform,translatey,transition	t	transform:translateY(-8px) ve box-shadow hover durumuna ekle.
146	frontend	css	alistirma	Alıştırma: 3D Kart Çevirme	Hover ile ön yüzü dönen ve arka yüzü ortaya çıkan iki yüzlü bir kart efekti yap.	\N	5	zor	2026-10-14 20:10:01.129703	3d,perspective,rotatey,kart,flip	t	rotateY(180deg), backface-visibility:hidden ve perspective kullan.
147	frontend	css	alistirma	Alıştırma: Yüzen Logo Animasyonu	Sürekli yukarı aşağı yüzen (floating) bir logo animasyonu @keyframes ile oluştur.	\N	5	orta	2026-10-14 20:10:01.129703	keyframes,animation,float,translatey	t	@keyframes içinde translateY(0) den translateY(-20px) ye geçiş tanımla.
148	frontend	css	alistirma	Alıştırma: Glassmorphism Bildirim Kartı	Renkli gradient arka planın üzerinde buzlu cam efektli bir bildirim kutusu yap.	\N	5	orta	2026-10-14 20:10:01.129703	glass,backdrop,blur,rgba	t	backdrop-filter:blur(15px) ve background:rgba(255,255,255,0.1) kullan.
149	frontend	css	alistirma	Alıştırma: ::before ile Süslü Bölüm Başlığı	Bir h2 başlığının soluna CSS ile renk çubuğu ekle, HTML e hiçbir şey ekleme.	\N	5	zor	2026-10-14 20:10:01.129703	before,pseudo,content,dekoratif	t	h2::before { content:""; display:block; width:4px; background:blue } kullan.
150	frontend	css	mini_proje	Mini Proje 5: Animasyonlu Ürün Vitrin Sayfası	Boş editörde; glassmorphism kart, 3D kart çevirme ile ürün detayı, neon fiyat etiketi, hover overlay galeri, yüzen CTA butonu ve ::before/::after süslemeleri içeren tam animasyonlu bir ürün vitrin sayfası tasarla.	\N	50	zor	2026-10-14 20:10:01.129703	proje,animasyon,glass,neon,3d,hover,keyframes	f	\N
151	frontend	css	ders	Ders 39: Media Queries Temelleri	@media ile breakpoint belirleme, min-width/max-width mantığı ve mobile-first yaklaşımı	\N	10	orta	2026-10-14 20:11:37.313009	media,responsive,breakpoint,mobilefirst,query	f	\N
152	frontend	css	ders	Ders 40: Standart Breakpointler ve Cihaz Grupları	Mobil (576px), Tablet (768px), Laptop (1024px) ve Masaüstü (1280px) için layout değişimleri	\N	10	orta	2026-10-14 20:11:37.313009	breakpoint,mobil,tablet,laptop,cihaz	f	\N
153	frontend	css	ders	Ders 41: Responsive Tipografi ve Görseller	clamp() ile akışkan font boyutu, max-width:100% ile taşmayan görseller ve fluid tasarım	\N	10	orta	2026-10-14 20:11:37.313009	responsive,clamp,fluid,font,gorsel	f	\N
154	frontend	css	ders	Ders 42: CSS Container Queries	@container ile ebeveyn boyutuna göre stil değişimi ve modern bileşen bazlı responsive tasarım	\N	10	zor	2026-10-14 20:11:37.313009	container,query,responsive,modern,bilesen	f	\N
155	frontend	css	ders	Ders 43: Dark Mode (Karanlık Tema)	prefers-color-scheme medya sorgusu ve CSS değişkenleri ile otomatik karanlık tema	\N	10	orta	2026-10-14 20:11:37.313009	darkmode,karanlık,tema,prefers,colorscheme	f	\N
156	frontend	css	ders	Ders 44: Scroll Snap ve Yumuşak Kaydırma	scroll-snap-type ile sayfa bölümlere kilitlenme, scroll-behavior:smooth ve overscroll-behavior	\N	10	orta	2026-10-14 20:11:37.313009	scroll,snap,smooth,kaydirma,section	f	\N
157	frontend	css	alistirma	Alıştırma: Mobil Hamburger Menü Layoutu	Masaüstünde yatay navbar, 768px altında dikey blok menüye dönüşen layout yaz.	\N	5	orta	2026-10-14 20:11:37.313009	media,navbar,responsive,mobil	t	@media (max-width:768px) içinde flex-direction:column ve display değerlerini değiştir.
158	frontend	css	alistirma	Alıştırma: Otomatik Karanlık Tema	CSS değişkenleri ile açık tema tanımla, prefers-color-scheme:dark ile otomatik koyu temaya geç.	\N	5	orta	2026-10-14 20:11:37.313009	darkmode,variable,prefers,tema	t	@media (prefers-color-scheme:dark) içinde :root değişkenlerini yeniden tanımla.
159	frontend	css	alistirma	Alıştırma: Akışkan Başlık Boyutu	Ekran daraldıkça küçülen genişledikçe büyüyen ama min-max sınırı olan font boyutu tanımla.	\N	5	zor	2026-10-14 20:11:37.313009	clamp,fluid,font,responsive	t	font-size: clamp(1rem, 4vw, 3rem) kullan.
160	frontend	css	alistirma	Alıştırma: Scroll Snap Bölüm Geçişi	Her section tam ekran yükseklikte olsun ve kaydırınca bir sonraki bölüme kilitlensin.	\N	5	orta	2026-10-14 20:11:37.313009	scroll,snap,section,fullscreen	t	container a scroll-snap-type:y mandatory, her section a scroll-snap-align:start ver.
161	frontend	css	alistirma	Alıştırma: Tablet için 2 Sütun Grid	Mobilde 1, tablette 2, masaüstünde 3 sütunlu kart ızgarası media query ile oluştur.	\N	5	orta	2026-10-14 20:11:37.313009	grid,media,responsive,sutun,breakpoint	t	Önce 1 sütun yaz, @media 768px de 2, @media 1024px de 3 sütuna geç.
162	frontend	css	mini_proje	Mini Proje 6: Tam Responsive Restoran Sitesi	Boş editörde; mobilde hamburger layout, tablette 2 sütun, masaüstünde 3 sütunlu menü kartları, scroll-snap bölüm geçişleri, dark mode desteği ve clamp ile akışkan tipografi içeren eksiksiz bir restoran web sitesi tasarla.	\N	50	zor	2026-10-14 20:11:37.313009	proje,responsive,darkmode,grid,scroll,restoran	f	\N
175	frontend	css	ders	Ders 45: BEM Metodolojisi	Block__Element--Modifier adlandırma sistemi ile ölçeklenebilir ve okunabilir CSS mimarisi	\N	10	orta	2026-10-14 20:13:29.632238	bem,metodoloji,naming,mimari,olceklenebilir	f	\N
176	frontend	css	ders	Ders 46: CSS Specificity ve Cascade Derinliği	Specificity hesaplama (0-0-0-0), !important tehlikesi ve cascade katmanları (@layer)	\N	10	zor	2026-10-14 20:13:29.632238	specificity,cascade,important,layer,oncelik	f	\N
177	frontend	css	ders	Ders 47: CSS Fonksiyonları	calc(), min(), max(), clamp(), env() ve mod() ile dinamik hesaplamalar	\N	10	zor	2026-10-14 20:13:29.632238	calc,min,max,clamp,env,fonksiyon	f	\N
178	frontend	css	ders	Ders 48: CSS Grid ile Gelişmiş Sayfa Mimarisi	Çok bölgeli magazine layout, dense packing ve grid içinde grid (subgrid) kullanımı	\N	10	zor	2026-10-14 20:13:29.632238	grid,subgrid,magazine,dense,mimari	f	\N
179	frontend	css	ders	Ders 49: Performans Odaklı CSS	will-change, contain, content-visibility, kritik CSS ve render blocking optimizasyonu	\N	10	zor	2026-10-14 20:13:29.632238	performans,willchange,contain,contentvisibility,optimize	f	\N
180	frontend	css	ders	Ders 50: Modern CSS Seçiciler ve :has()	:is(), :where(), :not(), :has() (ebeveyn seçici) ve :nth-child(An+B) gelişmiş kalıplar	\N	10	zor	2026-10-14 20:13:29.632238	has,is,where,not,modern,secici,nth	f	\N
181	frontend	css	alistirma	Alıştırma: BEM ile Kart Bileşeni	card, card__title, card__image ve card--featured BEM yapısıyla bir kart bileşeni yaz.	\N	5	orta	2026-10-14 20:13:29.632238	bem,bilesen,naming,kart	t	Block: .card, Element: .card__title, Modifier: .card--featured şeklinde isimlendirmelisin.
182	frontend	css	alistirma	Alıştırma: calc() ile Dinamik Kenar Boşluğu	Sayfanın yüzde 5 i ile 20px nin toplamı kadar padding hesapla ve uygula.	\N	5	orta	2026-10-14 20:13:29.632238	calc,dinamik,padding,hesap	t	padding: calc(5% + 20px) kullanabilirsin.
183	frontend	css	alistirma	Alıştırma: :has() ile Ebeveyn Kontrolü	İçinde resim olan kartı, içinde resim olmayan karttan farklı stille, sadece CSS ile ayırt et.	\N	5	zor	2026-10-14 20:13:29.632238	has,parent,secici,modern	t	.card:has(img) { } şeklinde içinde img olan kartı hedef al.
184	frontend	css	alistirma	Alıştırma: content-visibility ile Liste Performansı	1000 elemanlı uzun listede sadece görünen kısmın render edilmesini sağla.	\N	5	zor	2026-10-14 20:13:29.632238	contentvisibility,performans,render,liste	t	Her liste elemanına content-visibility:auto ve contain-intrinsic-size ver.
185	frontend	css	alistirma	Alıştırma: :nth-child ile Zebra Tablo	Tablonun tek satırları açık, çift satırları koyu renkte sadece CSS ile renklendir.	\N	5	orta	2026-10-14 20:13:29.632238	nth,child,zebra,tablo,secici	t	tr:nth-child(odd) ve tr:nth-child(even) seçicilerini kullan.
186	frontend	css	mini_proje	Mini Proje 7: BEM Mimarili Tasarım Sistemi	Boş editörde; BEM metodolojisi, CSS değişkenleri ile token sistemi, :has() ile akıllı bileşenler, calc() ve clamp() ile fluid spacing ve dark/light tema geçişi içeren tam bir CSS Design System kur.	\N	50	zor	2026-10-14 20:13:29.632238	proje,bem,token,designsystem,has,tema	f	\N
187	frontend	css	mini_proje	🏆 CSS Bitirme Projesi: Sıfırdan Tam SaaS Açılış Sayfası	Hiçbir framework kullanmadan, sadece saf CSS ile; glassmorphism hero, grid kart bölümü, scroll-snap section geçişleri, 3D hover kartlar, neon CTA butonları, dark mode, BEM mimari ve tam responsive tasarım içeren kurumsal bir SaaS ürün açılış sayfası inşa et.	\N	100	zor	2026-10-14 20:13:29.632238	mezuniyet,saas,landing,tam_proje,css_master	f	\N
188	frontend	javascript	ders	Ders 1: JavaScript Nedir ve Nasıl Çalışır?	JS motorları (V8), konsol kullanımı (console.log), HTML e script bağlama ve defer/async farkı	\N	10	kolay	2026-10-14 20:51:38.180458	js,giris,console,script,defer,v8	f	\N
189	frontend	javascript	ders	Ders 2: Değişken Tanımlama (let, const, var)	Blok kapsamı (block scope), değişken yeniden atama, hoisting mantığı ve neden var kullanılmaz	\N	10	kolay	2026-10-14 20:51:38.180458	let,const,var,scope,hoisting,degisken	f	\N
190	frontend	javascript	ders	Ders 3: İlkel (Primitive) Veri Tipleri	String, Number, Boolean, undefined, null, BigInt ve Symbol farkları ve typeof operatörü	\N	10	kolay	2026-10-14 20:51:38.180458	tipler,primitive,string,number,boolean,null,undefined	f	\N
191	frontend	javascript	ders	Ders 4: Aritmetik ve Atama Operatörleri	Toplama, çıkarma, mod alma (%), üs alma (**), artırma/azaltma (++ / --) ve kısayol operatörleri	\N	10	kolay	2026-10-14 20:51:38.180458	operator,aritmetik,mod,artirma,hesap	f	\N
192	frontend	javascript	ders	Ders 5: Karşılaştırma ve Mantıksal Operatörler	Gevşek eşitlik (==) vs sıkı eşitlik (===), !==, mantıksal VE (&&), VEYA (||) ve DEĞİL (!)	\N	10	kolay	2026-10-14 20:51:38.180458	karsilastirma,esitlik,ve,veya,mantiksal,operator	f	\N
193	frontend	javascript	ders	Ders 6: Tip Dönüşümleri (Type Coercion & Casting)	Otomatik (örtük) tip dönüşümü sürprizleri ve açık dönüşümler: Number(), String(), Boolean(), parseInt()	\N	10	orta	2026-10-14 20:51:38.180458	type,donusum,coercion,parseint,casting	f	\N
195	frontend	javascript	ders	Ders 8: String (Metin) Metodları	length, toUpperCase, toLowerCase, trim, includes, indexOf, slice, replace ve split kullanımı	\N	10	orta	2026-10-14 20:51:38.180458	string,metod,slice,replace,split,trim	f	\N
196	frontend	javascript	ders	Ders 9: Number ve Math Nesnesi	Math.floor, Math.ceil, Math.round, Math.random(), toFixed() ve NaN kontrolü (isNaN)	\N	10	orta	2026-10-14 20:51:38.180458	number,math,random,round,tofixed,nan	f	\N
197	frontend	javascript	ders	Ders 10: Nullish Coalescing (??) ve Kısa Devre Mantığı	|| ile ?? arasındaki falsy/nullish farkı, optional chaining (?.) ile güvenli nesne erişimi	\N	10	orta	2026-10-14 20:51:38.180458	nullish,coalescing,optionalchaining,falsy,modern	f	\N
194	frontend	javascript	ders	Ders 7: Template Literals (Şablon Dizgeleri)	Backtick (`) kullanımı, ${} ile değişken gömme, çok satırlı metinler ve güvenli string birleştirme	\N	10	kolay	2026-10-14 20:51:38.180458	template,literal,backtick,string,interpolasyon	f	\N
198	frontend	javascript	alistirma	Alıştırma: Değişken Takası (Swap)	İki değişkenin değerlerini (a=5, b=10) üçüncü bir geçici değişken kullanarak veya destructuring ile takas et.	\N	5	kolay	2026-10-14 20:51:38.180458	degisken,swap,takas	t	Geçici bir let temp = a tanımlayabilir veya [a, b] = [b, a] yapabilirsin.
199	frontend	javascript	alistirma	Alıştırma: Sıkı Eşitlik (===) Dedektifi	Verilen 5 farklı değişken çiftini hem == hem === ile kıyaslayıp konsola farkları yazdır.	\N	5	orta	2026-10-14 20:51:38.180458	esitlik,strict,equality,coercion	t	Örnek: "5" == 5 (true) iken "5" === 5 (false) döner çünkü tipleri farklıdır.
200	frontend	javascript	alistirma	Alıştırma: Rastgele Sayı Üretici Fonksiyon	1 ile 100 arasında (1 ve 100 dahil) rastgele tamsayı üreten matematiksel formülü kur.	\N	5	orta	2026-10-14 20:51:38.180458	math,random,floor,sayi	t	Math.floor(Math.random() * 100) + 1 formülü kullanılır.
201	frontend	javascript	alistirma	Alıştırma: E-Posta Format Temizleme	Kullanıcının girdiği hatalı e-postanın başındaki/sonundaki boşlukları sil ve tüm harfleri küçült.	\N	5	kolay	2026-10-14 20:51:38.180458	string,trim,lowercase,email	t	email.trim().toLowerCase() zincirleme metotlarını kullanabilirsin.
202	frontend	javascript	alistirma	Alıştırma: Güvenli Kullanıcı Karşılama (??)	Kullanıcı adı null veya undefined ise "Misafir", aksi takdirde kullanıcı adını yazan nullish kontrolü yap.	\N	5	orta	2026-10-14 20:51:38.180458	nullish,coalescing,karsilama	t	const isim = girilenIsim ?? "Misafir" ifadesi falsy boşlukları değil sadece null/undefined yakalar.
203	frontend	javascript	mini_proje	Mini Proje 1: Konsol Tabanlı Akıllı Fatura ve İndirim Hesaplayıcı	Değişkenler, tip dönüşümleri, Math fonksiyonları ve template literals kullanarak; kullanıcı adı, sepet tutarı, KDV oranı ve indirim kuponuna göre konsola formatlı fiş yazdıran bir hesaplayıcı program yaz.	\N	50	orta	2026-10-14 20:51:38.180458	proje,fatura,hesaplayici,string,math,console	f	\N
204	frontend	javascript	ders	Ders 11: if, else if ve else Blokları	Karar mekanizmaları, mantıksal koşul dallanmaları ve temiz koşul yazma pratikleri	\N	10	kolay	2026-10-14 20:53:03.632134	if,else,kosul,karar,dallanma	f	\N
205	frontend	javascript	ders	Ders 12: Ternary (Üçlü) Operatör	Tek satırda koşullu atama (kosul ? dogru : yanlis) ve okunabilir ternary kullanımı	\N	10	kolay	2026-10-14 20:53:03.632134	ternary,kosul,kisa,operator	f	\N
206	frontend	javascript	ders	Ders 13: switch - case Karar Yapısı	Çoklu eşitlik kontrollerinde switch, case blokları, break in hayati önemi ve default dalı	\N	10	orta	2026-10-14 20:53:03.632134	switch,case,break,default,karar	f	\N
207	frontend	javascript	ders	Ders 14: Klasik for Döngüsü	Sayaç başlatma, devam koşulu, artış adımı ve indeks üzerinden tekrarlı işlemler	\N	10	kolay	2026-10-14 20:53:03.632134	for,dongu,sayac,iterasyon,loop	f	\N
208	frontend	javascript	ders	Ders 15: while ve do-while Döngüleri	Koşul sağlandığı sürece dönen while ve en az 1 kez garanti çalışan do-while döngüsü	\N	10	orta	2026-10-14 20:53:03.632134	while,dowhile,dongu,loop	f	\N
209	frontend	javascript	ders	Ders 16: Döngü Kırma ve Atlama (break & continue)	Döngüyü anında sonlandıran break ve mevcut adımı atlayıp sonrakine geçen continue	\N	10	orta	2026-10-14 20:53:03.632134	break,continue,akis,atlama,dongu	f	\N
210	frontend	javascript	ders	Ders 17: İç İçe (Nested) Döngüler	Döngü içinde döngü, matris yapıları, çarpım tablosu ve zaman karmaşıklığına giriş	\N	10	zor	2026-10-14 20:53:03.632134	nested,dongu,matris,carpim	f	\N
211	frontend	javascript	ders	Ders 18: for...of Döngüsü ile İterasyon	Dizi ve metin karakterleri üzerinde indeksle uğraşmadan modern ve zarif gezinme	\N	10	kolay	2026-10-14 20:53:03.632134	forof,iterable,dongu,modern,dizi	f	\N
212	frontend	javascript	alistirma	Alıştırma: Klasik FizzBuzz Algoritması	1 den 50 ye kadar sayıları yazdır; 3 e bölünenlere "Fizz", 5 e bölünenlere "Buzz", her ikisine bölünenlere "FizzBuzz" de.	\N	5	orta	2026-10-14 20:53:03.632134	algoritma,fizzbuzz,mod,if,dongu	t	Önce hem 3 e hem 5 e (yani 15 e) bölünme koşulunu kontrol etmelisin.
213	frontend	javascript	alistirma	Alıştırma: Asal Sayı Bulucu	Verilen bir n sayısının asal sayı olup olmadığını döngü ve if kontrolü ile tespit et.	\N	5	zor	2026-10-14 20:53:03.632134	asal,sayi,dongu,algoritma	t	2 den sayının kareköküne kadar olan sayılara bölünüp bölünmediğini test et.
214	frontend	javascript	alistirma	Alıştırma: Yıldızlarla Dik Üçgen Çizdir	Konsola döngü kullanarak 5 satırlı bir dik üçgen şeklinde yıldız (*) deseni bastır.	\N	5	orta	2026-10-14 20:53:03.632134	nested,dongu,desen,string,yildiz	t	İç döngüde satır sayısı kadar yıldız biriktirip her dış adımda konsola yazdır.
215	frontend	javascript	alistirma	Alıştırma: Ternary ile Giriş Kontrolü	Kullanıcı yaşı 18 ve üzeri ise "Hoş geldiniz", değilse "Giriş yasak" mesajını tek satırlık ternary ile üret.	\N	5	kolay	2026-10-14 20:53:03.632134	ternary,kosul,yas	t	const mesaj = yas >= 18 ? "Hoş geldiniz" : "Giriş yasak"; formatını kullan.
216	frontend	javascript	alistirma	Alıştırma: Çift Sayı Filtresi (continue)	1 den 20 ye kadar döngü kur; tek sayılarda continue ile atlayıp sadece çift sayıları konsola yazdır.	\N	5	kolay	2026-10-14 20:53:03.632134	continue,cift,dongu,mod	t	if (i % 2 !== 0) continue; yazarak tek sayı adımlarını pas geçebilirsin.
217	frontend	javascript	mini_proje	Mini Proje 2: Konsol Sayı Tahmin Oyunu (Number Guessing Game)	Bilgisayarın 1-100 arasında tuttuğu rastgele sayıyı; while döngüsü, if/else mantığı, kalan tahmin hakkı sayacı ve "Daha büyük bir sayı gir" / "Daha küçük bir sayı gir" ipuçları içeren interaktif bir konsol oyununa dönüştür.	\N	50	zor	2026-10-14 20:53:03.632134	proje,oyun,sayi_tahmin,while,if,math	f	\N
218	frontend	javascript	ders	Ders 19: Fonksiyon Bildirimi ve return	Fonksiyon anatomisi, parametre vs argüman, dönüş değeri (return) ve erken çıkış (early return)	\N	10	kolay	2026-10-14 20:54:03.692112	fonksiyon,parametre,return,declaration	f	\N
219	frontend	javascript	ders	Ders 20: Fonksiyon İfadeleri ve Anonim Fonksiyonlar	Değişkene fonksiyon atama (function expressions) ve isimsiz (anonim) fonksiyon kullanımı	\N	10	kolay	2026-10-14 20:54:03.692112	fonksiyon,expression,anonim,degisken	f	\N
220	frontend	javascript	ders	Ders 21: Arrow Functions (Ok Fonksiyonları)	Modern ES6 () => {} sözdizimi, örtük dönüş (implicit return) ve this bağlamındaki farklar	\N	10	orta	2026-10-14 20:54:03.692112	arrow,fonksiyon,es6,ok,lambda	f	\N
221	frontend	javascript	ders	Ders 22: Varsayılan Parametreler ve Rest (...args)	Parametrelere varsayılan değer atama ve sınırsız sayıda argümanı diziye toplayan rest operatörü	\N	10	orta	2026-10-14 20:54:03.692112	parametre,default,rest,args,es6	f	\N
222	frontend	javascript	ders	Ders 23: Kapsam Türleri (Global, Function, Block Scope)	Değişkenlerin yaşam alanları, let/const un blok koruması ve scope sızıntılarını engelleme	\N	10	orta	2026-10-14 20:54:03.692112	scope,global,block,function,kapsam	f	\N
223	frontend	javascript	ders	Ders 24: Kapsam Zinciri (Scope Chain) ve Hoisting	İç içe fonksiyonlarda değişken arama sırası, fonksiyon bildirimlerinin tepeye taşınması (hoisting)	\N	10	zor	2026-10-14 20:54:03.692112	scopechain,hoisting,lexical,calisma_mekanizmasi	f	\N
224	frontend	javascript	ders	Ders 25: Closures (Kapanışlar)	Dış fonksiyon bittikten sonra bile değişkenini hafızada tutan iç fonksiyon yapısı ve veri gizleme (data encapsulation)	\N	10	zor	2026-10-14 20:54:03.692112	closure,kapanis,kapsulleme,bellek,mulakat	f	\N
225	frontend	javascript	ders	Ders 26: Callback (Geri Çağırım) Fonksiyonları	Bir fonksiyonu başka bir fonksiyona argüman olarak iletme ve olay tabanlı yürütme mantığı	\N	10	orta	2026-10-14 20:54:03.692112	callback,fonksiyon,arguman,higherorder	f	\N
226	frontend	javascript	ders	Ders 27: Saf Fonksiyonlar (Pure Functions)	Aynı girdiye daima aynı çıktıyı veren, dış dünyayı değiştirmeyen (no side effects) temiz kod prensipleri	\N	10	zor	2026-10-14 20:54:03.692112	pure,saf,sideeffect,fonksiyonel,temizkod	f	\N
227	frontend	javascript	alistirma	Alıştırma: Sıcaklık Dönüştürücü Fonksiyon	Santigrat (°C) değerini Fahrenhayt (°F) değerine çevirip sonucu döndüren saf bir arrow function yaz.	\N	5	kolay	2026-10-14 20:54:03.692112	arrow,fonksiyon,matematik,donusum	t	Formül: (c * 9/5) + 32 dir. const cToF = c => (c * 9/5) + 32;
228	frontend	javascript	alistirma	Alıştırma: Sınırsız Sayı Toplayıcı (...sayilar)	Rest operatörü kullanarak kaç adet sayı girilirse girilsin hepsini toplayıp döndüren fonksiyon yaz.	\N	5	orta	2026-10-14 20:54:03.692112	rest,args,toplam,fonksiyon	t	function topla(...sayilar) { return sayilar.reduce((a, b) => a + b, 0); }
229	frontend	javascript	alistirma	Alıştırma: Closure ile Özel Sayaç	createCounter() çağrıldığında artir() ve azalt() metotları dönen, sayacın doğrudan dışarıdan değiştirilemediği bir closure kur.	\N	5	zor	2026-10-14 20:54:03.692112	closure,sayac,kapsulleme,veri_gizleme	t	Fonksiyon içinde let count = 0 tanımlayıp iç içe fonksiyonlarla count u kontrol et.
230	frontend	javascript	alistirma	Alıştırma: Basit Hesap Makinesi Callback i	hesapla(a, b, islemFonksiyonu) şeklinde üçüncü parametresi callback olan ve istenen işlemi yapan üst düzey fonksiyon yaz.	\N	5	orta	2026-10-14 20:54:03.692112	callback,higherorder,fonksiyon	t	islemFonksiyonu(a, b) çağrısını return et.
231	frontend	javascript	alistirma	Alıştırma: Erken Çıkış (Early Return) Refactoring	İç içe 4 tane if/else bulunan karmaşık bir fonksiyonu erken return teknikleriyle düz ve okunabilir hale getir.	\N	5	orta	2026-10-14 20:54:03.692112	earlyreturn,refactoring,temizkod	t	Hatalı veya geçersiz durumları en başta kontrol edip anında return yap.
232	frontend	javascript	mini_proje	Mini Proje 3: Modüler Banka Hesabı Yöneticisi (Closure & Pure Functions)	Dışarıdan doğrudan müdahale edilemeyen güvenli bakiye (closure), paraYatır, paraCek, bakiyeGor fonksiyonları ve işlem geçmişini tutan saf fonksiyonel bir banka hesabı motoru tasarla.	\N	50	zor	2026-10-14 20:54:03.692112	proje,banka,closure,kapsulleme,moduler,purefunction	f	\N
233	frontend	javascript	ders	Ders 28: Dizi Temelleri ve İndeksleme	Dizi tanımlama, elemanlara erişim, length, push, pop, shift, unshift ve splice metodları	\N	10	kolay	2026-10-14 20:58:19.90672	dizi,array,push,pop,splice,indeks	f	\N
234	frontend	javascript	ders	Ders 29: Dizi İterasyon Metodları (forEach & map)	Dizi elemanlarını dönüştüren map() ve yan etki üreten forEach() farkları ve pratik senaryolar	\N	10	kolay	2026-10-14 20:58:19.90672	map,foreach,dizi,iterasyon,donusum	f	\N
235	frontend	javascript	ders	Ders 30: Filtreleme ve Arama (filter, find, includes)	Şarta uyanları toplayan filter(), ilk eşleşeni getiren find() ve varlık sorgulayan includes/some/every	\N	10	orta	2026-10-14 20:58:19.90672	filter,find,some,every,includes,arama	f	\N
236	frontend	javascript	ders	Ders 31: Güçlü Toplayıcı (reduce)	Diziyi tek bir değere (sayı, nesne, harita) indirgeyen reduce() anatomisi, akümülatör ve kullanım alanları	\N	10	zor	2026-10-14 20:58:19.90672	reduce,akumulator,toplam,gruplama,dizi	f	\N
237	frontend	javascript	ders	Ders 32: Dizi Sıralama (sort) ve Dilimleme (slice)	sort() fonksiyonunda karşılaştırma mantığı ((a,b) => a-b) ve orijinal diziyi bozmayan slice()	\N	10	orta	2026-10-14 20:58:19.90672	sort,slice,siralama,dilimleme,immutable	f	\N
238	frontend	javascript	ders	Ders 33: Nesne (Object) Temelleri	Key-value çiftleri, dot notation (.) vs bracket notation ([]), dinamik özellikler ve delete	\N	10	kolay	2026-10-14 20:58:19.90672	object,nesne,key,value,property	f	\N
239	frontend	javascript	ders	Ders 34: Nesne Metodları ve this Anahtar Kelimesi	Nesne içinde fonksiyon tanımlama, this bağlamı ve metod içi zincirleme (method chaining)	\N	10	orta	2026-10-14 20:58:19.90672	this,metod,nesne,chaining,baglam	f	\N
240	frontend	javascript	ders	Ders 35: Object.keys, values ve entries	Nesne özelliklerini diziye dökme, Object.entries ile döngü kurma ve Object.freeze ile dondurma	\N	10	orta	2026-10-14 20:58:19.90672	object,keys,values,entries,freeze,dongu	f	\N
241	frontend	javascript	ders	Ders 36: Destructuring (Yapı Parçalama)	Dizi ve nesnelerden değişken çıkartma, varsayılan değerler ve takma ad (alias) atama	\N	10	orta	2026-10-14 20:58:19.90672	destructuring,parcalama,alias,es6,modern	f	\N
242	frontend	javascript	ders	Ders 37: Spread Operatörü ve Klonlama	...spread ile dizi/nesne birleştirme, sığ kopya (shallow copy) vs derin kopya (structuredClone)	\N	10	orta	2026-10-14 20:58:19.90672	spread,kopya,clone,shallow,structuredclone	f	\N
243	frontend	javascript	alistirma	Alıştırma: Sepet Toplamı Hesaplayıcı (reduce)	Ürün listesindeki fiyat * adet toplamını tek bir reduce çağrısıyla hesapla.	\N	5	orta	2026-10-14 20:58:19.914347	reduce,sepet,hesap,dizi	t	sepet.reduce((toplam, urun) => toplam + (urun.fiyat * urun.adet), 0) kullan.
244	frontend	javascript	alistirma	Alıştırma: Kullanıcı Arama ve Filtreleme	Aktif olan ve yaşı 18 den büyük kullanıcıları filtreleyip sadece isimlerini dizi olarak döndür.	\N	5	orta	2026-10-14 20:58:19.914347	filter,map,zincirleme,kullanici	t	kullanicilar.filter(u => u.aktif && u.yas > 18).map(u => u.isim) zincirini kur.
245	frontend	javascript	alistirma	Alıştırma: Harf Frekansı Çıkarıcı	Verilen bir metindeki her harfin kaç kez geçtiğini nesne ({ a: 3, b: 1 }) olarak döndür.	\N	5	zor	2026-10-14 20:58:19.914347	reduce,obje,frekans,algoritma	t	Metni split edip reduce ile nesne anahtarlarını sayaç olarak artır.
246	frontend	javascript	alistirma	Alıştırma: Nested Destructuring ile Veri Çekme	Derin API nesnesinden (user.address.geo.lat) tek satırda enlem ve boylam değişkenlerini çıkar.	\N	5	orta	2026-10-14 20:58:19.914347	destructuring,nested,obje	t	const { address: { geo: { lat, lng } } } = user; yazımını dene.
247	frontend	javascript	alistirma	Alıştırma: Dizi Tekilleştirme (Unique Set)	Tekrar eden sayılar içeren bir dizideki kopyaları Set ve spread operatörü ile tek satırda temizle.	\N	5	kolay	2026-10-14 20:58:19.914347	set,spread,unique,tekil	t	const benzersiz = [...new Set(dizi)]; kalıbını kullan.
248	frontend	javascript	mini_proje	Mini Proje 4: E-Ticaret Ürün Kataloğu ve Filtre Motoru	Diziler, nesneler, filter, map, sort ve reduce kullanarak; kategoriye göre filtreleme, fiyata göre sıralama, stok kontrolü ve sepet analitiği sunan tam fonksiyonel bir veri motoru geliştir.	\N	50	zor	2026-10-14 20:58:19.914669	proje,eticaret,katalog,filter,reduce,sort	f	\N
249	frontend	javascript	ders	Ders 38: DOM Nedir? (Document Object Model)	HTML ağacı mantığı, document nesnesi, node türleri ve JavaScript ile HTML köprüsü	\N	10	kolay	2026-10-14 20:58:19.914908	dom,document,agac,node,giris	f	\N
250	frontend	javascript	ders	Ders 39: Eleman Seçiciler (querySelector)	getElementById, querySelector, querySelectorAll, NodeList vs HTMLCollection farkları	\N	10	kolay	2026-10-14 20:58:19.914908	dom,queryselector,getelementbyid,secici	f	\N
251	frontend	javascript	ders	Ders 40: İçerik ve Nitelik Değiştirme	textContent vs innerHTML vs innerText, getAttribute, setAttribute ve veri güvenliği (XSS)	\N	10	kolay	2026-10-14 20:58:19.914908	dom,textcontent,innerhtml,attribute,xss	f	\N
252	frontend	javascript	ders	Ders 41: Stil ve Sınıf Yönetimi (classList)	style nesnesi ile inline stil verme, classList.add, remove, toggle ve contains metodları	\N	10	kolay	2026-10-14 20:58:19.914908	dom,classlist,toggle,style,css	f	\N
253	frontend	javascript	ders	Ders 42: Dinamik Eleman Üretme ve Silme	createElement, appendChild, append, prepend, remove ve DocumentFragment ile performans	\N	10	orta	2026-10-14 20:58:19.914908	dom,createelement,append,fragment,dinamik	f	\N
254	frontend	javascript	ders	Ders 43: Olaylar ve Dinleyiciler (addEventListener)	click, submit, input, change olayları, addEventListener anatomisi ve anonim fonksiyon bağlama	\N	10	kolay	2026-10-14 20:58:19.914908	event,addeventlistener,click,input,dinleyici	f	\N
255	frontend	javascript	ders	Ders 44: Olay Nesnesi (Event Object & e.target)	e.target, e.currentTarget, e.preventDefault() ile form gönderimini engelleme ve koordinatlar	\N	10	orta	2026-10-14 20:58:19.914908	event,target,preventdefault,olay	f	\N
256	frontend	javascript	ders	Ders 45: Olay Yayılımı (Event Bubbling & Capturing)	Kabarcıklanma fazı, e.stopPropagation() ve Event Delegation (Olay Delegasyonu) mimarisi	\N	10	zor	2026-10-14 20:58:19.914908	bubbling,capturing,propagation,delegation,olay	f	\N
257	frontend	javascript	ders	Ders 46: Form Girişleri ve Doğrulama	Form verilerini okuma (input.value), checkbox/radio durumları ve dinamik hata mesajı gösterme	\N	10	orta	2026-10-14 20:58:19.914908	form,input,validation,dogrulama,dom	f	\N
258	frontend	javascript	ders	Ders 47: Klavye ve Fare Olayları	keydown, keyup, e.key kontrolü, mousemove, mouseenter/mouseleave ve koordinat takibi	\N	10	orta	2026-10-14 20:58:19.914908	klavye,fare,keydown,mousemove,etkilesim	f	\N
259	frontend	javascript	ders	Ders 48: LocalStorage ve SessionStorage	Tarayıcı hafızası, setItem, getItem, removeItem, clear ve JSON.stringify/JSON.parse ile nesne saklama	\N	10	orta	2026-10-14 20:58:19.914908	localstorage,sessionstorage,depolama,json	f	\N
260	frontend	javascript	alistirma	Alıştırma: Dinamik Karanlık Mod Anahtarı	Butona tıklandığında body etiketine "dark-mode" sınıfını toggle eden ve tercihi LocalStorage e kaydeden kod yaz.	\N	5	orta	2026-10-14 20:58:19.915212	dom,toggle,localstorage,darkmode	t	classList.toggle("dark-mode") kullan ve localStorage.setItem ile durumu sakla.
261	frontend	javascript	alistirma	Alıştırma: Event Delegation ile Sil Butonları	Dinamik eklenen liste elemanlarının her birine ayrı dinleyici koymak yerine tek ebeveynden e.target ile silme işlemi yap.	\N	5	zor	2026-10-14 20:58:19.915212	delegation,bubbling,target,dom	t	ul ye tek bir addEventListener ekle ve e.target.classList.contains("sil-btn") kontrolü yap.
262	frontend	javascript	alistirma	Alıştırma: Canlı Karakter Sayacı	Textarea ya yazı yazıldıkça kalan karakter sayısını (maks 200) canlı güncelleyen ve 0 olunca alanı kilitleyen kod yaz.	\N	5	kolay	2026-10-14 20:58:19.915212	input,event,sayac,dom	t	input olayını dinle ve e.target.value.length ile kalan hakkı hesapla.
263	frontend	javascript	alistirma	Alıştırma: Form Gönderimini Durdur ve Doğrula	Form submit olduğunda e.preventDefault() kullanarak sayfa yenilenmesini engelle ve boş input varsa kırmızı çerçeve yap.	\N	5	kolay	2026-10-14 20:58:19.915212	form,preventdefault,submit,dom	t	form.addEventListener("submit", (e) => { e.preventDefault(); ... }) kalıbını uygula.
264	frontend	javascript	alistirma	Alıştırma: LocalStorage İsim Hatırlatıcı	Sayfa açıldığında LocalStorage de kayıtlı kullanıcı adı varsa başlığa "Tekrar hoş geldin [İsim]" yazdır.	\N	5	kolay	2026-10-14 20:58:19.915212	localstorage,getitem,dom	t	const isim = localStorage.getItem("kullaniciAdi") kontrolü yap.
265	frontend	javascript	mini_proje	Mini Proje 5: Kalıcı Hafızalı İnteraktif To-Do List	DOM manipülasyonu, event delegation, dinamik eleman üretme, tamamlandı filtreleri ve LocalStorage entegrasyonu ile sayfa yenilense de silinmeyen profesyonel bir yapılacaklar listesi uygulaması inşa et.	\N	50	zor	2026-10-14 20:58:19.915494	proje,todo,dom,localstorage,events,delegation	f	\N
266	frontend	javascript	ders	Ders 49: Asenkron Programlama ve Event Loop	Tek iş parçacığı (single thread), Call Stack, Web APIs, Callback Queue ve Event Loop mekanizması	\N	10	zor	2026-10-14 20:58:19.915738	eventloop,asenkron,callstack,thread,calisma	f	\N
267	frontend	javascript	ders	Ders 50: Zamanlayıcılar (setTimeout & setInterval)	Belirli süre sonra çalıştırma, periyodik döngüler, clearTimeout ve clearInterval ile bellek temizliği	\N	10	kolay	2026-10-14 20:58:19.915738	settimeout,setinterval,timer,zamanlayici	f	\N
268	frontend	javascript	ders	Ders 51: Callback Cehennemi (Callback Hell)	İç içe asenkron işlemlerin yönetilemez hale gelmesi, piramit yapısı ve Promise lere duyulan ihtiyaç	\N	10	orta	2026-10-14 20:58:19.915738	callbackhell,piramit,asenkron,mimari	f	\N
269	frontend	javascript	ders	Ders 52: Promise Temelleri (Resolve & Reject)	Promise durumları (pending, fulfilled, rejected), then(), catch() ve finally() blokları	\N	10	orta	2026-10-14 20:58:19.915738	promise,resolve,reject,then,catch	f	\N
270	frontend	javascript	ders	Ders 53: Async / Await Sözdizimi	Asenkron kodu senkron gibi yazma zarafeti, async fonksiyonlar ve await anahtar kelimesi	\N	10	orta	2026-10-14 20:58:19.915738	async,await,promise,modern,asenkron	f	\N
271	frontend	javascript	ders	Ders 54: Hata Yönetimi (try...catch...finally)	Asenkron fonksiyonlarda try-catch kullanımı, özel Error fırlatma (throw) ve hata yakalama	\N	10	orta	2026-10-14 20:58:19.915738	trycatch,hata,error,throw,guvenlik	f	\N
272	frontend	javascript	ders	Ders 55: Fetch API ile Veri Çekme (GET)	fetch() ile sunucuya istek atma, response.ok kontrolü ve JSON verisini çözümleme (.json())	\N	10	orta	2026-10-14 20:58:19.915738	fetch,api,get,json,http	f	\N
273	frontend	javascript	ders	Ders 56: Fetch ile Veri Gönderme (POST, PUT, DELETE)	Headers (Content-Type: application/json), body stringify, HTTP metodları ve REST API mantığı	\N	10	zor	2026-10-14 20:58:19.915738	fetch,post,put,delete,rest,api	f	\N
274	frontend	javascript	ders	Ders 57: Eşzamanlı İstekler (Promise.all & allSettled)	Birden fazla bağımsız API isteğini aynı anda paralel yürütme ve yarış durumları (race)	\N	10	zor	2026-10-14 20:58:19.915738	promiseall,allsettled,paralel,esbilesen	f	\N
275	frontend	javascript	alistirma	Alıştırma: Geri Sayım Sayacı (setInterval)	10 dan geriye doğru her saniye konsola sayan ve 0 a gelince durup "Süre doldu!" yazan zamanlayıcı yap.	\N	5	kolay	2026-10-14 20:58:19.915977	setinterval,clearinterval,timer	t	let sayac = 10; const id = setInterval(() => { if (--sayac === 0) clearInterval(id); }, 1000);
276	frontend	javascript	alistirma	Alıştırma: Özel Gecikme Fonksiyonu (sleep)	Promise döndüren ve await sleep(2000) şeklinde kodu 2 saniye bekleten yardımcı fonksiyon yaz.	\N	5	orta	2026-10-14 20:58:19.915977	promise,sleep,delay,async	t	const sleep = ms => new Promise(res => setTimeout(res, ms)); kalıbını kur.
277	frontend	javascript	alistirma	Alıştırma: Try-Catch ile Güvenli JSON Ayrıştırma	Bozuk JSON dizgisi girilse bile uygulamanın çökmesini engelleyen güvenli parse fonksiyonu yaz.	\N	5	kolay	2026-10-14 20:58:19.915977	trycatch,json,parse,guvenlik	t	try { return JSON.parse(str); } catch (e) { return null; } yaz.
278	frontend	javascript	alistirma	Alıştırma: async/await ile Kullanıcı Bilgisi Çek	JSONPlaceholder API sine async/await ile istek at ve gelen 5 kullanıcının adını konsola yazdır.	\N	5	orta	2026-10-14 20:58:19.915977	fetch,async,await,api	t	const res = await fetch("https://jsonplaceholder.typicode.com/users"); const data = await res.json();
279	frontend	javascript	alistirma	Alıştırma: Promise.all ile Paralel 3 İstek	Kullanıcılar, gönderiler ve yorumlar verilerini aynı anda çekip üçü de tamamlanınca ekrana yazdır.	\N	5	zor	2026-10-14 20:58:19.915977	promiseall,paralel,api,asenkron	t	const [users, posts] = await Promise.all([fetch(url1), fetch(url2)]);
280	frontend	javascript	mini_proje	Mini Proje 6: Canlı Hava Durumu & Arama Uygulaması	Açık hava durumu API sine (OpenWeather / wttr) bağlanan; şehir arama inputu, dinamik hava kartı, yükleniyor (loader) spinner ı ve try-catch hata bildirimleri içeren gerçek bir asenkron web uygulaması yap.	\N	50	zor	2026-10-14 20:58:19.916194	proje,api,havadurumu,fetch,async,loader	f	\N
281	frontend	javascript	ders	Ders 58: Prototipler ve Prototip Kalıtımı (Prototypes)	__proto__, prototype zinciri, nesnelerin bellek paylaşımı ve kalıtımın perde arkası	\N	10	zor	2026-10-14 20:58:19.916426	prototype,kalitim,oop,bellek,miras	f	\N
282	frontend	javascript	ders	Ders 59: ES6 Sınıfları (Classes) ve Constructor	class bildirimi, constructor metodu, sınıf örnekleri (instances) ve new anahtar kelimesi	\N	10	orta	2026-10-14 20:58:19.916426	class,constructor,sinif,es6,oop	f	\N
283	frontend	javascript	ders	Ders 60: Kalıtım (Inheritance) ve super()	extends ile sınıftan türetme, super() çağrısı ile üst sınıf kurucusuna erişim ve method overriding	\N	10	orta	2026-10-14 20:58:19.916426	extends,super,kalitim,override,oop	f	\N
284	frontend	javascript	ders	Ders 61: Getter, Setter ve Gizli Alanlar (Private Fields #)	get ve set erişimcileri, #ozelAlan sözdizimi ile gerçek veri kapsülleme ve dış erişim yasağı	\N	10	zor	2026-10-14 20:58:19.916426	getter,setter,private,kapsulleme,oop	f	\N
285	frontend	javascript	ders	Ders 62: Statik Alanlar ve Metodlar (static)	Sınıf örneği üretmeden doğrudan sınıf adı üzerinden çağrılan yardımcı static metodlar	\N	10	orta	2026-10-14 20:58:19.916426	static,yardimci,sinif,utility	f	\N
286	frontend	javascript	ders	Ders 63: ES Modülleri (import & export)	Dosyaları modüllere bölme, named export vs default export ve modern script type="module"	\N	10	kolay	2026-10-14 20:58:19.916426	import,export,module,moduler,es6	f	\N
287	frontend	javascript	ders	Ders 64: Debounce ve Throttle Teknikleri	Arama inputlarında performans için debounce ve scroll/resize olayları için throttle mimarisi	\N	10	zor	2026-10-14 20:58:19.916426	debounce,throttle,performans,optimizasyon,event	f	\N
288	frontend	javascript	ders	Ders 65: Bellek Yönetimi ve Garbage Collection	Hafıza sızıntıları (memory leaks), unutulan timer lar, event dinleyicileri kaldırma ve GC mantığı	\N	10	zor	2026-10-14 20:58:19.916426	memoryleak,garbagecollection,bellek,performans	f	\N
289	frontend	javascript	alistirma	Alıştırma: ES6 ile Hayvan Sınıfları Kalıtımı	Hayvan ana sınıfından türeyen Kopek sınıfı yaz; sesCikar() metodunu override ederek "Hav hav" döndür.	\N	5	orta	2026-10-14 20:58:19.916691	class,extends,super,oop	t	class Kopek extends Hayvan { sesCikar() { return "Hav hav"; } } yaz.
290	frontend	javascript	alistirma	Alıştırma: Özel (#) Şifre Alanı	Kullanici sınıfı içinde #sifre gizli alanı tanımla; dışarıdan k.sifre ile erişilemediğini doğrula.	\N	5	orta	2026-10-14 20:58:19.916691	private,class,kapsulleme	t	class Kullanici { #sifre; constructor(s) { this.#sifre = s; } } yazımını kullan.
291	frontend	javascript	alistirma	Alıştırma: Debounce Fonksiyonu Yazımı	Kullanıcı yazmayı bıraktıktan 300ms sonra çalışan sıfırdan bir debounce yardımcı fonksiyonu kur.	\N	5	zor	2026-10-14 20:58:19.916691	debounce,closure,timer,performans	t	clearTimeout ve setTimeout closure yapısıyla gecikmeyi kontrol et.
292	frontend	javascript	alistirma	Alıştırma: Statik Matematik Fabrikası	Matematik sınıfı içinde static topla ve static carp metodları oluşturup new demeden çağır.	\N	5	kolay	2026-10-14 20:58:19.916691	static,metod,utility	t	Matematik.topla(5, 3) şeklinde doğrudan çağır.
293	frontend	javascript	alistirma	Alıştırma: Modüler Matematik Dışa Aktarımı	utils.js dosyasından iki fonksiyon export et, main.js dosyasında import ederek kullan.	\N	5	kolay	2026-10-14 20:58:19.916691	import,export,module	t	export const topla = ... ve import { topla } from "./utils.js"; sözdizimini yaz.
294	frontend	javascript	mini_proje	Mini Proje 7: OOP Tabanlı Görev Yöneticisi ve State Sistemi	ES6 Sınıfları, inheritance, private fields (#), getter/setter ve Custom Events kullanarak; kurumsal ölçekte modüler bir Görev & Proje yönetim kütüphanesi mimarisi kur.	\N	50	zor	2026-10-14 20:58:19.916906	proje,oop,class,state,customevent,mimari	f	\N
295	frontend	javascript	mini_proje	🏆 JavaScript Bitirme Projesi: Sıfırdan Tek Sayfa E-Ticaret Uygulaması (SPA)	Hiçbir harici framework kullanmadan; Fetch API ile sahte mağaza (FakeStoreAPI) ürünlerini çeken, dinamik arama (debounce), kategori filtreleme, modüler OOP sepet yönetimi, LocalStorage kalıcılığı ve bildirim sistemi içeren eksiksiz bir Vanilla JS Single Page Application inşa et.	\N	100	zor	2026-10-14 20:58:19.917062	mezuniyet,spa,vanillajs,eticaret,api,oop,tam_proje	f	\N
296	backend	python	ders	Ders 1: Python Nedir ve Çalıma Ortamı	Python felsefesi (The Zen of Python), yorumlanan dil mantığı, print() fonksiyonu ve girintileme (indentation) kuralı	\N	10	kolay	2026-10-14 21:41:46.03414	python,giris,print,indentation,zen	f	\N
297	backend	python	ders	Ders 2: Değişkenler ve Dinamik Tiplendirme	Değişken tanımlama kuralları, dinamik tiplendirme (dynamic typing), id() ve bellek referansları	\N	10	kolay	2026-10-14 21:41:46.03414	degisken,tip,bellek,referans,isimlendirme	f	\N
298	backend	python	ders	Ders 3: Temel Veri Tipleri (int, float, str, bool)	Tamsayılar, ondalıklı sayılar, metinler, boolean mantığı ve type() fonksiyonu ile tip sorgulama	\N	10	kolay	2026-10-14 21:41:46.03414	int,float,str,bool,tipler,type	f	\N
299	backend	python	ders	Ders 4: Aritmetik ve Atama Operatörleri	Toplama, çıkarma, tam bölme (//), mod (%), üs alma (**) ve artırımlı atama operatörleri	\N	10	kolay	2026-10-14 21:41:46.03414	operator,aritmetik,bolme,mod,us	f	\N
300	backend	python	ders	Ders 5: Tip Dönüşümleri (Type Casting)	int(), float(), str(), bool() dönüşümleri ve truthy/falsy değer kavramı	\N	10	kolay	2026-10-14 21:41:46.03414	casting,donusum,truthy,falsy,tip	f	\N
301	backend	python	ders	Ders 6: Kullanıcıdan Girdi Alma (input)	input() fonksiyonunun string dönüşü, sayısal girdilerde tip dönüşümü ve güvenli girdi alma	\N	10	kolay	2026-10-14 21:41:46.03414	input,girdi,kullanici,etkilesim	f	\N
302	backend	python	ders	Ders 7: Metin (String) Biçimlendirme ve F-Strings	Modern f-strings (f"Merhaba {ad}"), .format() metodu ve string kaçış karakterleri (\\\\n, \\\\t)	\N	10	kolay	2026-10-14 21:41:46.03414	fstring,string,format,metin,interpolasyon	f	\N
303	backend	python	ders	Ders 8: String Dilimleme (Slicing) ve Metodları	İndeksleme, [start:stop:step] dilimleme, upper(), lower(), strip(), replace(), split() ve join()	\N	10	orta	2026-10-14 21:41:46.03414	string,slicing,dilimleme,strip,split,join	f	\N
304	backend	python	alistirma	Alıştırma: Vücut Kitle İndeksi (VKİ) Hesaplayıcı	Kullanıcıdan kilo ve boy alarak kilo / (boy ** 2) formülüyle VKİ hesaplayan ve f-string ile yazdıran kod yaz.	\N	5	kolay	2026-10-14 21:41:46.041811	input,float,fstring,matematik	t	boy = float(input()) ve kilo = float(input()) dönüşümünü unutma.
305	backend	python	alistirma	Alıştırma: String Ters Çevirici (Slicing)	Verilen herhangi bir metni [::-1] adım dilimleme yöntemiyle tek satırda tersine çevir.	\N	5	kolay	2026-10-14 21:41:46.041811	string,slicing,ters,step	t	metin[::-1] ifadesi metni sondan başa doğru okur.
306	backend	python	alistirma	Alıştırma: Kelime Sayacı (split & len)	Kullanıcının girdiği cümledeki toplam kelime sayısını split() ve len() ile hesapla.	\N	5	kolay	2026-10-14 21:41:46.041811	string,split,len,kelime	t	cumle.split() boşluklara göre böler, len() eleman sayısını verir.
307	backend	python	mini_proje	Mini Proje 1: Akıllı Maaş ve Bordro Hesaplayıcı	input(), float dönüşümleri, vergi kesintileri, SGK oranları ve f-strings kullanarak formatlı bordro çıktısı veren bir CLI finans aracı yap.	\N	50	orta	2026-10-14 21:41:46.042117	proje,finans,input,fstring,matematik	f	\N
308	backend	python	ders	Ders 9: Listeler (Lists) Temelleri	Köşeli parantez [], indeksleme, negatif indeks, len() ve listelerin değiştirilebilir (mutable) doğası	\N	10	kolay	2026-10-14 21:41:46.042406	liste,list,mutable,indeks,eleman	f	\N
309	backend	python	ders	Ders 10: Liste Metodları	append(), insert(), extend(), pop(), remove(), clear(), sort() ve reverse() metodları	\N	10	orta	2026-10-14 21:41:46.042406	liste,append,pop,sort,metod	f	\N
310	backend	python	ders	Ders 11: Liste Kopyalama ve Bellek Mantığı	Sığ kopya (list.copy(), [:]) vs referans ataması ve copy.deepcopy() derin kopya mantığı	\N	10	orta	2026-10-14 21:41:46.042406	kopya,referans,shallow,deep,bellek	f	\N
311	backend	python	ders	Ders 12: Demetler (Tuples)	Değiştirilemez (immutable) veri yapısı (), tek elemanlı tuple kuralı ve tuple unpacking	\N	10	kolay	2026-10-14 21:41:46.042406	tuple,demet,immutable,unpacking	f	\N
312	backend	python	ders	Ders 13: Sözlükler (Dictionaries) Temelleri	Anahtar-değer (key-value) mimarisi {}, hızlı hash erişimi ve sözlük oluşturma	\N	10	kolay	2026-10-14 21:41:46.042406	dict,sozluk,key,value,hash	f	\N
313	backend	python	ders	Ders 14: Sözlük Metodları	get() ile güvenli erişim, keys(), values(), items(), update() ve pop() metodları	\N	10	orta	2026-10-14 21:41:46.042406	dict,get,keys,values,items,metod	f	\N
314	backend	python	ders	Ders 15: Kümeler (Sets)	Benzersiz elemanlar kümesi set(), sırasızlık ve matematikteki küme mantığı	\N	10	kolay	2026-10-14 21:41:46.042406	set,kume,benzersiz,unique	f	\N
315	backend	python	ders	Ders 16: Küme İşlemleri	Kesişim (&, intersection), birleşim (|, union), fark (-, difference) ve simetrik fark (^)	\N	10	orta	2026-10-14 21:41:46.042406	set,union,intersection,difference,kume	f	\N
316	backend	python	ders	Ders 17: İç İçe Veri Yapıları (Nested Data)	Liste içinde sözlükler, sözlük içinde listeler ve karmaşık JSON benzeri ağaç yapıları	\N	10	orta	2026-10-14 21:41:46.042406	nested,json,agac,veri_yapilari	f	\N
317	backend	python	ders	Ders 18: collections Modülüne Giriş	defaultdict, Counter ve namedtuple ile gelişmiş veri yapısı çözümleri	\N	10	zor	2026-10-14 21:41:46.042406	collections,counter,defaultdict,namedtuple	f	\N
318	backend	python	alistirma	Alıştırma: Liste Kopyalarını Temizleme (Set)	Tekrar eden sayılar barındıran bir listedeki mükerrerleri set() ile tekilleştirip tekrar liste yap.	\N	5	kolay	2026-10-14 21:41:46.043075	set,list,unique,tekil	t	list(set(sayilar)) ifadesi benzersiz elemanları bırakır.
319	backend	python	alistirma	Alıştırma: Sözlükte En Yüksek Notu Bulan Öğrenci	Öğrenci adı ve notu içeren sözlükten max(sozluk, key=sozluk.get) ile en yüksek notu alanı bul.	\N	5	orta	2026-10-14 21:41:46.043075	dict,max,key,sozluk	t	max() fonksiyonuna key parametresi olarak sozluk.get verilebilir.
320	backend	python	alistirma	Alıştırma: İki Listenin Kesişimi (Set)	İki farklı kullanıcının ortak arkadaşlarını küme kesişim operatörü (&) ile tespit et.	\N	5	kolay	2026-10-14 21:41:46.043075	set,kesisim,intersection	t	set(liste1) & set(liste2) ortak elemanları verir.
321	backend	python	mini_proje	Mini Proje 2: CLI Telefon Rehberi ve İletişim Yöneticisi	Sözlükler ve iç içe listeler kullanarak; kişi ekleme, numara güncelleme, isimle arama ve rehber listeleme yapan menülü konsol uygulaması geliştir.	\N	50	orta	2026-10-14 21:41:46.043369	proje,rehber,dict,list,crud	f	\N
322	backend	python	ders	Ders 19: if, elif ve else Koşul Blokları	Mantıksal karşılaştırmalar, girintileme önemi ve çoklu şart kontrolü	\N	10	kolay	2026-10-14 21:41:46.04372	if,elif,else,kosul,karar	f	\N
323	backend	python	ders	Ders 20: Mantıksal Operatörler (and, or, not)	Koşulları birleştirme, kısa devre değerlendirmesi (short-circuit) ve in / not in operatörleri	\N	10	kolay	2026-10-14 21:41:46.04372	and,or,not,in,mantiksal	f	\N
324	backend	python	ders	Ders 21: for Döngüsü ve range() Fonksiyonu	Koleksiyonlar üzerinde gezinme, range(start, stop, step) kullanımı ve for ile sayaçlar	\N	10	kolay	2026-10-14 21:41:46.04372	for,dongu,range,iterasyon	f	\N
325	backend	python	ders	Ders 22: while Döngüsü	Belirli bir şart sağlandığı sürece dönen while döngüleri ve sonsuz döngü (infinite loop) tehlikesi	\N	10	kolay	2026-10-14 21:41:46.04372	while,dongu,loop,sayac	f	\N
326	backend	python	ders	Ders 23: break, continue ve pass İfadeleri	Döngü sonlandırma (break), adım atlama (continue) ve yer tutucu boş blok (pass)	\N	10	kolay	2026-10-14 21:41:46.04372	break,continue,pass,akis	f	\N
327	backend	python	ders	Ders 24: for-else ve while-else Blokları	Python a özgü döngü-else yapısı; break ile kırılmadan normal biten döngülerin tespiti	\N	10	orta	2026-10-14 21:41:46.04372	forelse,whileelse,dongu,ozel	f	\N
328	backend	python	ders	Ders 25: enumerate() ve zip() Fonksiyonları	Döngüde indeks ve elemanı birlikte alma (enumerate) ve iki listeyi paralel eşleştirme (zip)	\N	10	orta	2026-10-14 21:41:46.04372	enumerate,zip,dongu,paralel,iterasyon	f	\N
329	backend	python	alistirma	Alıştırma: Python ile FizzBuzz	1 den 100 e kadar sayıları yazdır; 3 e bölünenlere Fizz, 5 e bölünenlere Buzz, 15 e bölünenlere FizzBuzz de.	\N	5	kolay	2026-10-14 21:41:46.044059	fizzbuzz,for,if,mod	t	Önce i % 15 == 0 koşulunu kontrol etmelisin.
330	backend	python	alistirma	Alıştırma: zip() ile Ürün ve Fiyat Eşleme	İki ayrı listede tutulan ürün adları ve fiyatları zip() ile birleştirip sözlüğe dönüştür.	\N	5	orta	2026-10-14 21:41:46.044059	zip,dict,esleme	t	dict(zip(urunler, fiyatlar)) tek satırda sözlük üretir.
331	backend	python	alistirma	Alıştırma: Asal Sayı Bulucu (for-else)	Girilen sayının asal olup olmadığını for-else yapısı ve break kullanarak tespit et.	\N	5	zor	2026-10-14 21:41:46.044059	forelse,asal,algoritma	t	for d in range(2, n): if n % d == 0: break else: print("Asal")
332	backend	python	mini_proje	Mini Proje 3: ATM Simülatörü ve Bakiye Yönetimi	while döngüsü, if/elif kontrolleri, bakiye sorgulama, para yatırma/çekme ve 3 hatalı PIN girişinde kart bloke eden güvenlik sistemi tasarla.	\N	50	orta	2026-10-14 21:41:46.044355	proje,atm,while,if,guvenlik	f	\N
333	backend	python	ders	Ders 26: Fonksiyon Bildirimi (def) ve return	Fonksiyon tanımlama, parametreler, argümanlar, None dönüş değeri ve return anatomisi	\N	10	kolay	2026-10-14 21:41:46.044629	def,fonksiyon,return,parametre	f	\N
334	backend	python	ders	Ders 27: Pozisyonel ve Anahtar Kelime Argümanları	Positional vs keyword arguments ve argüman sırasının önemi	\N	10	kolay	2026-10-14 21:41:46.044629	parametre,keyword,positional,arguman	f	\N
335	backend	python	ders	Ders 28: Varsayılan (Default) Parametreler	Varsayılan parametre atama ve dikkat edilmesi gereken tehlike: Mutable default arguments	\N	10	orta	2026-10-14 21:41:46.044629	default,parametre,mutable,hata	f	\N
336	backend	python	ders	Ders 29: Esnek Argümanlar: *args	İstenilen sayıda pozisyonel argümanı demet (tuple) olarak karşılayan *args yapısı	\N	10	orta	2026-10-14 21:41:46.044629	args,esnek,tuple,fonksiyon	f	\N
337	backend	python	ders	Ders 30: Esnek Sözlük Argümanları: **kwargs	İstenilen sayıda anahtar-değer parametresini sözlük olarak alan **kwargs kullanımı	\N	10	orta	2026-10-14 21:41:46.044629	kwargs,sozluk,parametre,fonksiyon	f	\N
338	backend	python	ders	Ders 31: Kapsam (Scope) ve LEGB Kuralı	Local, Enclosing, Global ve Built-in kapsamları ve global / nonlocal anahtar kelimeleri	\N	10	zor	2026-10-14 21:41:46.044629	scope,legb,global,nonlocal,kapsam	f	\N
339	backend	python	ders	Ders 32: Anonim Fonksiyonlar: lambda	Tek satırlık isimsiz lambda fonksiyonları, sözdizimi ve kullanım senaryoları	\N	10	orta	2026-10-14 21:41:46.044629	lambda,anonim,fonksiyon,kisa	f	\N
340	backend	python	ders	Ders 33: map(), filter() ve sorted() Fonksiyonları	Lambda ile birlikte map ve filter kullanımı, sorted() da key parametresi ile özel sıralama	\N	10	orta	2026-10-14 21:41:46.044629	map,filter,sorted,lambda,fonksiyonel	f	\N
341	backend	python	ders	Ders 34: Docstrings ve Tip İpuçları (Type Hints)	Fonksiyon belgelendirme ("""..."""), def topla(a: int, b: int) -> int tip ipuçları	\N	10	kolay	2026-10-14 21:41:46.044629	docstring,typehints,temizkod,belgelendirme	f	\N
342	backend	python	alistirma	Alıştırma: Sınırsız Çarpım Fonksiyonu (*args)	İçine kaç sayı gönderilirse gönderilsin hepsini çarpan bir carpim(*sayilar) fonksiyonu yaz.	\N	5	kolay	2026-10-14 21:41:46.044932	args,carpim,fonksiyon	t	sonuc = 1 başlatıp for s in sayilar: sonuc *= s döngüsü kur.
343	backend	python	alistirma	Alıştırma: Lambda ile Sözlük Listesi Sıralama	Öğrenciler listesini [{ "ad": "Ali", "not": 85 }] notlarına göre büyükten küçüğe sırala.	\N	5	orta	2026-10-14 21:41:46.044932	lambda,sorted,sort,liste	t	sorted(ogrenciler, key=lambda x: x["not"], reverse=True) kullan.
344	backend	python	alistirma	Alıştırma: Güvenli Varsayılan Liste Parametresi	def ekle(eleman, liste=None) kalıbıyla mutable default argüman hatasını önleyen fonksiyon yaz.	\N	5	orta	2026-10-14 21:41:46.044932	default,parametre,mutable,none	t	if liste is None: liste = [] kalıbı standarttır.
345	backend	python	mini_proje	Mini Proje 4: Çoklu Filtreleme ve Raporlama Motoru	*args, **kwargs, lambda ve type hints kullanarak; gelen veri kümesini dinamik parametrelere göre filtreleyen ve istatistik özetleyen fonksiyon kütüphanesi yaz.	\N	50	zor	2026-10-14 21:41:46.04522	proje,args,kwargs,lambda,filtre	f	\N
346	backend	python	ders	Ders 35: List Comprehensions Temelleri	[x for x in liste] sözdizimi, geleneksel for döngüsüne göre hız ve okunabilirlik avantajı	\N	10	orta	2026-10-14 21:41:46.045433	comprehension,list,hiz,pythonic	f	\N
347	backend	python	ders	Ders 36: Şartlı List Comprehensions	[x for x in liste if x > 0] filtreleme ve [a if kosul else b for x in liste] dönüşüm kalıpları	\N	10	orta	2026-10-14 21:41:46.045433	comprehension,if,kosul,filtre	f	\N
348	backend	python	ders	Ders 37: Dictionary Comprehensions	{k: v for k, v in ...} ile tek satırda sözlük üretme ve anahtar/değer takası	\N	10	orta	2026-10-14 21:41:46.045433	comprehension,dict,sozluk	f	\N
349	backend	python	ders	Ders 38: Set ve Generator Comprehensions	{x for x in ...} küme üreteci ve parantez içi (x for x in ...) bellek dostu generator ifadesi	\N	10	zor	2026-10-14 21:41:46.045433	generator,set,comprehension,bellek	f	\N
350	backend	python	ders	Ders 39: all() ve any() Fonksiyonları	Listenin tümü mü şartı sağlıyor (all) yoksa en az biri mi (any) kontrollerinin zarif yazımı	\N	10	kolay	2026-10-14 21:41:46.045433	all,any,mantiksal,koleksiyon	f	\N
351	backend	python	ders	Ders 40: itertools Modülü Temelleri	itertools.chain(), cycle(), repeat() ve combinations() ile ileri düzey kombinatorik iteratörler	\N	10	zor	2026-10-14 21:41:46.045433	itertools,iterasyon,kombinasyon	f	\N
352	backend	python	alistirma	Alıştırma: Çift Sayıların Kareleri Comprehension	1-20 arasındaki çift sayıların karelerini tek satırlık list comprehension ile üret.	\N	5	kolay	2026-10-14 21:41:46.045717	comprehension,kare,cift	t	[x**2 for x in range(1, 21) if x % 2 == 0]
353	backend	python	alistirma	Alıştırma: Sözlük Ters Çevirme (Dict Comprehension)	{ "a": 1, "b": 2 } sözlüğünün anahtar ve değerlerini tek satırda yer değiştir.	\N	5	orta	2026-10-14 21:41:46.045717	dict,comprehension,swap	t	{v: k for k, v in d.items()}
354	backend	python	alistirma	Alıştırma: all() ile Pozitif Sayı Kontrolü	Verilen bir listedeki tüm sayıların pozitif olup olmadığını all() ile tek satırda denetle.	\N	5	kolay	2026-10-14 21:41:46.045717	all,pozitif,liste	t	all(x > 0 for x in sayilar)
355	backend	python	mini_proje	Mini Proje 5: Metin Analitiği ve Kelime Frekans Motoru	Comprehensions, dict mapping ve itertools kullanarak; bir metindeki stopwords temizleyen, kelime sıklığını çıkaran ve en sık geçen 5 kelimeyi raporlayan bir NLP ön işleme aracı yap.	\N	50	zor	2026-10-14 21:41:46.045956	proje,nlp,frekans,comprehension,analiz	f	\N
356	backend	python	ders	Ders 41: Hata Yönetimi: try, except ve finally	İstisnalar (Exceptions), ValueError, TypeError yakalama ve her durumda çalışan finally bloğu	\N	10	orta	2026-10-14 21:41:46.046153	try,except,finally,hata,exception	f	\N
357	backend	python	ders	Ders 42: Özel Hata Fırlatma (raise) ve Custom Exceptions	raise ValueError() ile hata fırlatma ve Exception sınıfından özel hata sınıfı türetme	\N	10	orta	2026-10-14 21:41:46.046153	raise,hata,custom,exception,oop	f	\N
358	backend	python	ders	Ders 43: Dosya Açma ve Okuma (open & read)	open("dosya.txt", "r"), .read(), .readline(), .readlines() metodları ve dosya kapatma gereksinimi	\N	10	kolay	2026-10-14 21:41:46.046153	dosya,file,read,open,io	f	\N
359	backend	python	ders	Ders 44: with Deyimi ve Context Manager	with open(...) as f: kalıbı ile dosyanın otomatik güvenli kapatılması	\N	10	kolay	2026-10-14 21:41:46.046153	with,contextmanager,dosya,guvenli	f	\N
360	backend	python	ders	Ders 45: Dosyaya Yazma ve Ekleme (w, a kipleri)	"w" (write/üzerine yaz) ve "a" (append/sonuna ekle) kipleri ve encoding="utf-8" önemi	\N	10	kolay	2026-10-14 21:41:46.046153	write,append,utf8,dosya,kayit	f	\N
361	backend	python	ders	Ders 46: CSV Dosyaları ile Çalışma	csv modülü, csv.reader, csv.writer ve DictReader / DictWriter ile sütunlu veri işleme	\N	10	orta	2026-10-14 21:41:46.046153	csv,tablo,veri,reader,writer	f	\N
362	backend	python	ders	Ders 47: JSON Veri Formatı ve json Modülü	json.dumps(), json.loads(), json.dump() ve json.load() ile Python nesnelerini JSON a dönüştürme	\N	10	orta	2026-10-14 21:41:46.046153	json,api,dumps,loads,dosya	f	\N
363	backend	python	alistirma	Alıştırma: Sayı Girişi Hata Kalkanı (try-except)	Kullanıcı tamsayı girene kadar döngüde soran ve harf girdiğinde çökmeyen fonksiyon yaz.	\N	5	kolay	2026-10-14 21:41:46.046398	try,except,valueerror,input	t	while True: try: sayi = int(input()); break except ValueError: print("Geçersiz")
364	backend	python	alistirma	Alıştırma: JSON Formatında Ayar Saklama	Kullanıcı profil ayarlarını ({ "tema": "dark", "ses": True }) settings.json dosyasına yaz.	\N	5	orta	2026-10-14 21:41:46.046398	json,dump,dosya	t	with open("settings.json", "w", encoding="utf-8") as f: json.dump(ayarlar, f)
365	backend	python	alistirma	Alıştırma: Log Dosyasına Satır Ekleme (append)	Her çalıştığında sistem saatini ve mesajı log.txt dosyasının sonuna yeni satır olarak ekle.	\N	5	kolay	2026-10-14 21:41:46.046398	dosya,append,log	t	open("log.txt", "a", encoding="utf-8") kipi ile f.write(...)
366	backend	python	mini_proje	Mini Proje 6: CSV & JSON Destekli Öğrenci Bilgi Sistemi	try-except blokları, CSV okuma/yazma ve JSON yedekleme ile; öğrenci notlarını hesaplayan, devamsızlık durumunu kaydeden ve rapor dosyası üreten dayanıklı bir dosya tabanlı sistem kur.	\N	50	zor	2026-10-14 21:41:46.0466	proje,csv,json,dosya,tryexcept,io	f	\N
367	backend	python	ders	Ders 48: OOP Temelleri: Sınıf (class) ve Nesne	class bildirimi, nesne örneği (instance) oluşturma ve self anahtar kelimesinin anlamı	\N	10	kolay	2026-10-14 21:41:46.046773	class,oop,nesne,self,ornek	f	\N
368	backend	python	ders	Ders 49: Yapıcı Metod: __init__ ve Instance Nitelikleri	Nesne ilk başlatıldığında çalışan __init__() metodu ve instance attributes tanımlama	\N	10	kolay	2026-10-14 21:41:46.046773	init,constructor,nitelik,oop	f	\N
369	backend	python	ders	Ders 50: Sınıf Nitelikleri vs Örnek Nitelikleri	Class attributes (tüm örneklerle paylaşılan) ve instance attributes farkları	\N	10	orta	2026-10-14 21:41:46.046773	classattribute,instance,oop,bellek	f	\N
370	backend	python	ders	Ders 51: Metod Türleri: @classmethod ve @staticmethod	Instance method (self), @classmethod (cls) ve bağımsız yardımcı @staticmethod farkları	\N	10	orta	2026-10-14 21:41:46.046773	classmethod,staticmethod,metod,oop	f	\N
371	backend	python	ders	Ders 52: Kapsülleme (Encapsulation) ve Gizli Alanlar	Public, protected (_tekAltCizgi) ve private (__ciftAltCizgi) isim gizleme (name mangling)	\N	10	orta	2026-10-14 21:41:46.046773	kapsulleme,private,protected,namemangling	f	\N
372	backend	python	ders	Ders 53: @property Dekoratörü (Getter & Setter)	@property ve @isim.setter ile nitelikleri fonksiyon gibi sarmalama ve veri doğrulama	\N	10	zor	2026-10-14 21:41:46.046773	property,getter,setter,oop,kapsulleme	f	\N
373	backend	python	ders	Ders 54: Kalıtım (Inheritance) ve super()	Miras alma (class Kopek(Hayvan)), metod ezme (overriding) ve super().__init__() çağrısı	\N	10	orta	2026-10-14 21:41:46.046773	kalitim,inheritance,super,override	f	\N
374	backend	python	ders	Ders 55: Çok Biçimlilik (Polymorphism) ve Duck Typing	"Ördek gibi yürüyorsa ördektir": Farklı sınıfların aynı arayüzü paylaşması ve esneklik	\N	10	orta	2026-10-14 21:41:46.046773	polymorphism,ducktyping,arayuz,esneklik	f	\N
375	backend	python	ders	Ders 56: Dunder (Sihirli) Metodlar (__str__, __repr__, __len__)	__str__, __repr__, __len__, __eq__, __add__ ile sınıflara Python yerleşik operatör desteği kazandırma	\N	10	zor	2026-10-14 21:41:46.046773	dunder,magic,str,repr,operatoroverloading	f	\N
376	backend	python	alistirma	Alıştırma: BankaHesabi Sınıfı Kapsülleme	__bakiye alanını gizli yap; para_yatir() ve bakiye getter property si yaz.	\N	5	orta	2026-10-14 21:41:46.047035	class,oop,private,property	t	self.__bakiye tanımlayıp @property def bakiye(self): return self.__bakiye yaz.
377	backend	python	alistirma	Alıştırma: __str__ ile Güzel Yazdırma	Kitap sınıfı tanımla ve print(k) dendiğinde "Yazar - Kitap Adı" formatı veren __str__ yaz.	\N	5	kolay	2026-10-14 21:41:46.047035	str,dunder,magic,oop	t	def __str__(self): return f"{self.yazar} - {self.ad}"
378	backend	python	alistirma	Alıştırma: super() ile Araç Kalıtımı	Arac sınıfından türeyen ElektrikliArac sınıfı yazıp super().__init__() ile batarya_kapasitesi ekle.	\N	5	orta	2026-10-14 21:41:46.047035	super,kalitim,inheritance,oop	t	super().__init__(marka, model) çağrısını alt sınıf init inde yap.
379	backend	python	mini_proje	Mini Proje 7: OOP Tabanlı RPG Savaş Simülatörü	Karakter, Savasci ve Buyucu sınıfları; kalıtım, encapsulation (can/güç), polymorphism ve __str__ dunder metodları içeren konsol tabanlı bir sıra tabanlı dövüş motoru geliştir.	\N	50	zor	2026-10-14 21:41:46.047274	proje,oop,oyun,kalitim,polymorphism	f	\N
380	backend	python	ders	Ders 57: Modüller ve import Mantığı	Kendi modülünü yazma, import modul, from modul import fonksiyon ve __name__ == "__main__" koruması	\N	10	kolay	2026-10-14 21:41:46.047498	modul,import,main,paket	f	\N
381	backend	python	ders	Ders 58: Standart Kütüphane İncileri (os, sys, math, random, datetime)	İşletim sistemi komutları, argüman okuma, zaman hesaplama ve matematiksel araçlar	\N	10	orta	2026-10-14 21:41:46.047498	os,sys,random,datetime,standartkutuphane	f	\N
382	backend	python	ders	Ders 59: Paketler ve __init__.py	Klasörleri Python paketine dönüştürme, __init__.py dosyasının rolü ve modüler mimari	\N	10	orta	2026-10-14 21:41:46.047498	paket,init,klasor,mimari	f	\N
383	backend	python	ders	Ders 60: pip ve Sanal Ortamlar (venv / virtualenv)	pip install, requirements.txt, python -m venv ile izole çalışma ortamları oluşturma	\N	10	kolay	2026-10-14 21:41:46.047498	pip,venv,requirements,sanalortam	f	\N
384	backend	python	ders	Ders 61: Fonksiyonları Sarmalama: Decorators (Dekoratörler)	Fonksiyon içine fonksiyon alma, @dekorator sözdizimi, functools.wraps ve loglama/süre ölçme	\N	10	zor	2026-10-14 21:41:46.047498	decorator,dekorator,wraps,fonksiyonel,ileri	f	\N
385	backend	python	ders	Ders 62: Üreteçler: Generators ve yield İfadesi	return yerine yield kullanımı, bellek tüketmeyen devasa veri akışları ve next() çağrısı	\N	10	zor	2026-10-14 21:41:46.047498	generator,yield,iteratör,bellek,performans	f	\N
386	backend	python	ders	Ders 63: İçerik Yöneticileri (Context Managers: with)	__enter__ ve __exit__ dunder metodları ile kendi with blok yöneticini yazma	\N	10	zor	2026-10-14 21:41:46.047498	contextmanager,enter,exit,with,dunder	f	\N
387	backend	python	ders	Ders 64: Düzenli İfadeler (Regex - re Modülü)	re.search(), re.findall(), re.sub() ve e-posta/telefon doğrulama desenleri	\N	10	orta	2026-10-14 21:41:46.047498	regex,re,desen,arama,dogrulama	f	\N
388	backend	python	ders	Ders 65: Multithreading ve Multiprocessing Giriş	I/O bağlı (threading) vs CPU bağlı (multiprocessing) işlemler ve Python GIL (Global Interpreter Lock)	\N	10	zor	2026-10-14 21:41:46.047498	threading,multiprocessing,gil,asenkron,paralel	f	\N
389	backend	python	alistirma	Alıştırma: Çalışma Süresi Ölçen Dekoratör (@sure_olc)	Dekoratör yazarak sarılan fonksiyonun kaç saniyede bittiğini time modülüyle ölç ve yazdır.	\N	5	zor	2026-10-14 21:41:46.04774	decorator,time,sure,optimizasyon	t	def sure_olc(fn): def wrapper(*a, **kw): basla=time.time(); res=fn(*a,**kw); print(time.time()-basla); return res
390	backend	python	alistirma	Alıştırma: Sonsuz Fibonacci Generator u (yield)	Sonsuza kadar Fibonacci sayılarını yield ile üreten bellek dostu bir üreteç yaz.	\N	5	zor	2026-10-14 21:41:46.04774	generator,yield,fibonacci	t	a, b = 0, 1; while True: yield a; a, b = b, a + b
391	backend	python	alistirma	Alıştırma: Regex ile E-Posta Ayıklayıcı	Karışık bir metin bloğu içindeki tüm e-postaları re.findall() deseniyle liste olarak çıkar.	\N	5	orta	2026-10-14 21:41:46.04774	regex,re,email,findall	t	r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}" desenini kullan.
392	backend	python	mini_proje	Mini Proje 8: Otomasyon ve Web Kazıma (Scraping) CLI Aracı	requests ve BeautifulSoup (veya dahili urllib) kütüphaneleri, decorators, regex ve JSON çıktı desteği ile; bir web sayfasındaki başlık ve fiyatları otomatik toplayıp raporlayan bir bot yaz.	\N	50	zor	2026-10-14 21:41:46.047943	proje,bot,scraping,otomasyon,regex,decorator	f	\N
393	backend	python	mini_proje	🏆 Python Bitirme Projesi: Tam Kapsamlı Kişisel Finans ve Yatırım Portföy Yöneticisi	OOP mimarisi, CSV/JSON dosya kalıcılığı, özel hata sınıfları (Custom Exceptions), @sure_olc dekoratörü, generator ile büyük işlem taraması, regex giriş doğrulama ve detaylı CLI raporlama sunan uçtan uca eksiksiz bir Python kurumsal terminal yazılımı inşa et.	\N	100	zor	2026-10-14 21:41:46.048182	mezuniyet,tam_proje,finans,oop,generator,decorator,python_master	f	\N
394	backend	csharp	ders	Ders 1: C# ve .NET 9 Dünyasına Giriş	Modern C# sözdizimi, Program.cs ve Console.WriteLine temelleri.	<h3>C# 12 & .NET 9 Dünyasına Hoş Geldin</h3><p>C#, Microsoft tarafından geliştirilen; kurumsal şirketlerden oyun sektörüne (Unity) kadar dünyanın en popüler ve güçlü dillerinden biridir.</p><pre><code>// Modern Top-Level Statements (Tek Satır Başlangıç)\nConsole.WriteLine("Merhaba COD+ ve C# Dünyası!");</code></pre>	10	kolay	2026-10-16 23:57:43.766637	csharp,giris,console,net9,program	f	\N
395	backend	csharp	ders	Ders 2: Değişkenler ve İlkel Veri Tipleri	int, double, bool, char, string tipleri ve bellek yönetimi.	<h3>Tip Güvenli (Type-Safe) Değişken Mimarisi</h3><p>C# statik ve güçlü tipli bir dildir; değişkenin tipi baştan belirlenir ve derleyici tarafından denetlenir.</p><pre><code>int yas = 25;\ndouble bakiye = 1450.75;\nbool ogrenciMi = true;\nstring sehir = "İstanbul";\nConsole.WriteLine($"Kullanıcı {sehir} şehrinde ve {yas} yaşında.");</code></pre>	10	kolay	2026-10-16 23:57:43.775834	csharp,degisken,int,string,double,bool	f	\N
396	backend	csharp	ders	Ders 3: var Anahtar Kelimesi ve Tip Çıkarımı	var anahtar kelimesi ile derleme zamanında tip belirleme.	<h3>Implicit Typing (var)</h3><p>var anahtar kelimesi tipi belirsiz yapmaz; atanan değerden tipi otomatik olarak derleme zamanında tespit eder.</p><pre><code>var isim = "Ahmet"; // Derleyici otomatik string yapar\nvar puan = 95;      // int yapar</code></pre>	10	kolay	2026-10-16 23:57:43.776209	csharp,var,implicit,tip_cikarimi	f	\N
397	backend	csharp	ders	Ders 4: Tip Dönüşümleri (Type Casting & Convert)	Bilinçli, bilinçsiz dönüşümler ve Convert sınıfı.	<h3>Tip Dönüşümleri</h3><p>Küçük tipten büyüğe otomatik (implicit), büyükten küçüğe açık (explicit casting) dönüşüm uygulanır.</p><pre><code>int sayi = 100;\ndouble ondali = sayi; // Otomatik\n\ndouble oran = 9.99;\nint tamSayi = (int)oran; // Açık dönüşüm -> 9\n\nstring metinSayi = "42";\nint parseEdilen = Convert.ToInt32(metinSayi);</code></pre>	10	kolay	2026-10-16 23:57:43.776414	csharp,casting,convert,donusum	f	\N
398	backend	csharp	ders	Ders 5: Konsoldan Veri Alma (Console.ReadLine & TryParse)	Kullanıcı girdisini güvenli şekilde tamsayıya çevirme.	<h3>Güvenli Veri Okuma: int.TryParse</h3><p>int.Parse hatalı girdide programı patlatırken, TryParse bool dönerek güvenli kontrol sağlar.</p><pre><code>Console.Write("Yaşınızı giriniz: ");\nstring? girdi = Console.ReadLine();\nif (int.TryParse(girdi, out int girilenYas)) {\n    Console.WriteLine($"Girdi başarılı: {girilenYas}");\n} else {\n    Console.WriteLine("Geçersiz bir sayı girdiniz!");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.776607	csharp,input,readline,tryparse,guvenlik	f	\N
399	backend	csharp	ders	Ders 6: String İnterpolasyonu ve Metin Metodları	$ ve süslü parantezlerle modern metin birleştirme ve metodlar.	<h3>String Interpolation ($"...")</h3><p>C#'ta string birleştirmek için + yerine her zaman $ interpolasyonu tercih edilir.</p><pre><code>string ad = "Defne";\nint seviye = 5;\nstring mesaj = $"Kahraman: {ad.ToUpper()}, Seviye: {seviye}";\nbool varMi = mesaj.Contains("DEFNE");</code></pre>	10	kolay	2026-10-16 23:57:43.776875	csharp,string,interpolation,fstring,metin	f	\N
400	backend	csharp	ders	Ders 7: Aritmetik ve Karşılaştırma Operatörleri	+, -, *, /, %, ++, ==, !=, &&, || operatörleri.	<h3>Mantıksal ve Aritmetik Operatörler</h3><p>C#'ta tam sayı bölmelerinde sonucun tam kısmı alınır. Ondalık için en az bir terim double olmalıdır.</p><pre><code>int bolum = 5 / 2; // 2\ndouble hassasBolum = 5.0 / 2; // 2.5\nbool girisYetkisi = (yas >= 18) && (bakiye > 50);</code></pre>	10	kolay	2026-10-16 23:57:43.777093	csharp,operatorler,mod,mantiksal,karsilastirma	f	\N
401	backend	csharp	ders	Ders 8: if, else if ve else Koşul Yapıları	Program akışını mantıksal şartlara göre yönlendirme.	<h3>Karar Blokları</h3><p>Koşullar yukarıdan aşağıya kontrol edilir, ilk sağlanan blok çalışır.</p><pre><code>int puan = 75;\nif (puan >= 85) {\n    Console.WriteLine("Harika!");\n} else if (puan >= 50) {\n    Console.WriteLine("Geçti.");\n} else {\n    Console.WriteLine("Kaldı.");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.777339	csharp,if,else,kosul,akiskontrolu	f	\N
402	backend	csharp	ders	Ders 9: Modern switch-case ve Switch Expressions	Klasik switch ve C# 8+ pattern matching ifadeleri.	<h3>Modern Switch Expression (=>)</h3><p>Geleneksel switch yerine tek satırda değer döndüren expression kalıbı kullanılır.</p><pre><code>int gun = 3;\nstring gunAdi = gun switch {\n    1 => "Pazartesi",\n    2 => "Salı",\n    3 => "Çarşamba",\n    _ => "Diğer"\n};</code></pre>	10	kolay	2026-10-16 23:57:43.777549	csharp,switch,pattern_matching,expression	f	\N
403	backend	csharp	ders	Ders 10: Ternary (?:) ve Null Coalescing (??) Operatörleri	Kısa karar ifadeleri ve null kontrol operatörleri.	<h3>Ternary & Null Coalescing</h3><pre><code>string sonuc = (puan >= 50) ? "Geçti" : "Kaldı";\nstring? gelenKullanici = null;\nstring aktifKullanici = gelenKullanici ?? "Misafir";</code></pre>	10	kolay	2026-10-16 23:57:43.777741	csharp,ternary,null_coalescing,operator	f	\N
404	backend	csharp	ders	Ders 11: for Döngüsü ve Sayaç Yönetimi	Belirli sayıda tekrarlanan döngü yapıları.	<h3>Klasik for Döngüsü</h3><pre><code>for (int i = 1; i <= 5; i++) {\n    Console.WriteLine($"Adım: {i}");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.777946	csharp,for,dongu,sayac,iterasyon	f	\N
405	backend	csharp	ders	Ders 12: while ve do-while Döngüleri	Şarta bağlı çalışan döngüler ve farkları.	<h3>while vs do-while</h3><p>do-while koşul yanlış olsa dahi gövdeyi en az bir kez çalıştırır.</p><pre><code>int sayac = 0;\nwhile (sayac < 3) {\n    Console.WriteLine(sayac);\n    sayac++;\n}</code></pre>	10	kolay	2026-10-16 23:57:43.778127	csharp,while,dowhile,dongu	f	\N
406	backend	csharp	ders	Ders 13: foreach Döngüsü ve Koleksiyon İterasyonu	Dizi ve listelerin elemanları üzerinde güvenli gezinme.	<h3>foreach ile Temiz Kod</h3><pre><code>string[] diller = { "C#", "Python", "JavaScript" };\nforeach (var dil in diller) {\n    Console.WriteLine($"Öğreniliyor: {dil}");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.778631	csharp,foreach,iterasyon,koleksiyon	f	\N
407	backend	csharp	ders	Ders 14: Döngü Kontrolü: break ve continue	Döngüyü sonlandırma veya geçerli adımı atlama.	<h3>break vs continue</h3><p>break döngüden tamamen çıkar; continue ise o anki adımı atlayıp sonraki iterasyona geçer.</p><pre><code>for (int i = 1; i <= 10; i++) {\n    if (i == 5) continue; // 5'i atla\n    if (i == 8) break;    // 8'de döngüyü bitir\n    Console.WriteLine(i);\n}</code></pre>	10	kolay	2026-10-16 23:57:43.779239	csharp,break,continue,dongukontrol	f	\N
408	backend	csharp	ders	Ders 15: Sabit Boyutlu Diziler (Arrays)	C# tek boyutlu ve çok boyutlu dizi yapıları.	<h3>Dizi Tanımlama ve İndeksler</h3><p>Diziler sabit boyutludur, tanımlandıktan sonra boyutu değiştirilemez.</p><pre><code>int[] sayilar = new int[3];\nsayilar[0] = 10;\nsayilar[1] = 20;\nsayilar[2] = 30;\nConsole.WriteLine($"Eleman sayısı: {sayilar.Length}");</code></pre>	10	kolay	2026-10-16 23:57:43.779897	csharp,diziler,array,indeks,length	f	\N
409	backend	csharp	ders	Ders 16: Dinamik Listeler: List<T>	Generic dinamik listeler: Add, Remove, Count, Contains.	<h3>Dinamik Koleksiyon: List<T></h3><p>List<T>, System.Collections.Generic altında yer alır ve boyutu otomatik genişler.</p><pre><code>List<string> gorevler = new List<string>();\ngorevler.Add("Rapor Hazırla");\ngorevler.Add("Kod İncele");\ngorevler.Remove("Rapor Hazırla");\nConsole.WriteLine($"Toplam: {gorevler.Count}");</code></pre>	10	kolay	2026-10-16 23:57:43.780675	csharp,list,generic,koleksiyon,dinamik	f	\N
469	backend	sql	ders	Ders 20: Tablo Değiştirme: ALTER TABLE	Canlı tabloda yeni kolon ekleme, silme ve tip değiştirme.	<h3>ALTER TABLE</h3><pre><code>-- Yeni kolon ekle\nALTER TABLE users ADD COLUMN phone VARCHAR(20);\n\n-- Kolonu sil\nALTER TABLE users DROP COLUMN phone;</code></pre>	10	kolay	2026-10-17 01:00:55.830448	sql,altertable,kolonekle,kolonsil,ddl	f	\N
410	backend	csharp	ders	Ders 17: Anahtar-Değer Haritaları: Dictionary<TKey, TValue>	Sözlük yapısı, hızlı O(1) arama ve TryGetValue.	<h3>Dictionary ile Hızlı Erişim</h3><pre><code>Dictionary<string, int> notlar = new() {\n    { "Ali", 85 },\n    { "Ayşe", 95 }\n};\nif (notlar.TryGetValue("Ali", out int notu)) {\n    Console.WriteLine($"Not: {notu}");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.781329	csharp,dictionary,sozluk,keyvalue,hash	f	\N
411	backend	csharp	ders	Ders 18: Hash Tabanlı Kümeler: HashSet<T>	Benzersiz elemanlar ve küme işlemleri (IntersectWith, UnionWith).	<h3>HashSet<T> Benzersizlik Kuralı</h3><p>Aynı elemanı ikinci kez eklemez, O(1) hızında kontrol sağlar.</p><pre><code>HashSet<int> kume = new() { 1, 2, 2, 3 };\nConsole.WriteLine(kume.Count); // 3 (2 tekilleştirildi)</code></pre>	10	kolay	2026-10-16 23:57:43.78209	csharp,hashset,kume,benzersiz,set	f	\N
412	backend	csharp	ders	Ders 19: Metod Bildirimi ve Geri Dönüş Değerleri	Fonksiyon mimarisi, parametreler ve void/değer dönüşü.	<h3>Metod Mimarisi</h3><pre><code>static int Topla(int a, int b) {\n    return a + b;\n}\n\nstatic void Selamla(string isim) {\n    Console.WriteLine($"Merhaba {isim}");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.782546	csharp,metod,fonksiyon,return,void	f	\N
413	backend	csharp	ders	Ders 20: Metod Parametreleri: out, ref ve in	Referans bazlı argüman aktarımı ve out kalıbı.	<h3>out ve ref Parametreleri</h3><p>out anahtar kelimesi metodun birden fazla değer dönmesini sağlar.</p><pre><code>static bool Bol(int a, int b, out int bolum) {\n    if (b == 0) { bolum = 0; return false; }\n    bolum = a / b;\n    return true;\n}</code></pre>	10	kolay	2026-10-16 23:57:43.782728	csharp,out,ref,parametre,referans	f	\N
414	backend	csharp	ders	Ders 21: Opsiyonel Parametreler ve Overloading	Varsayılan parametreler ve aynı isimli farklı imzalı metodlar.	<h3>Metod Aşırı Yükleme (Method Overloading)</h3><pre><code>static void Log(string mesaj, string seviye = "INFO") {\n    Console.WriteLine($"[{seviye}] {mesaj}");\n}\n\nstatic int Carp(int a, int b) => a * b;\nstatic double Carp(double a, double b) => a * b;</code></pre>	10	kolay	2026-10-16 23:57:43.782906	csharp,overloading,optional,varsayilan	f	\N
415	backend	csharp	ders	Ders 22: Hata Yönetimi: try, catch, finally ve throw	İstisnaları güvenle yakalama ve kaynak temizliği.	<h3>Robust Hata Yönetimi</h3><pre><code>try {\n    int sonuc = 10 / int.Parse("0");\n} catch (DivideByZeroException ex) {\n    Console.WriteLine("Sıfıra bölünemez!");\n} catch (Exception ex) {\n    Console.WriteLine($"Hata: {ex.Message}");\n} finally {\n    Console.WriteLine("Her durumda çalışan temizlik bloğu.");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.783091	csharp,trycatch,exception,finally,throw	f	\N
416	backend	csharp	ders	Ders 23: OOP Temelleri: Sınıf (Class) ve Nesne (Object)	Nesne yönelimli programlama, new anahtar kelimesi ve heap belleği.	<h3>Sınıf ve Nesne (Class & Instance)</h3><pre><code>public class Ogrenci {\n    public string Ad;\n    public int Numara;\n}\n\nOgrenci ogr = new Ogrenci();\nogr.Ad = "Zeynep";\nogr.Numara = 101;</code></pre>	10	kolay	2026-10-16 23:57:43.783275	csharp,oop,class,object,instance,sinif	f	\N
417	backend	csharp	ders	Ders 24: Kapsülleme (Encapsulation) ve Properties	get; set; erişimcileri ve veri gizleme prensibi.	<h3>Properties (Özellikler)</h3><p>Alanları doğrudan açmak yerine property ile denetimli erişim sağlanır.</p><pre><code>public class BankaHesabi {\n    public string HesapNo { get; set; }\n    private decimal _bakiye;\n    public decimal Bakiye {\n        get => _bakiye;\n        private set => _bakiye = value >= 0 ? value : 0;\n    }\n}</code></pre>	10	kolay	2026-10-16 23:57:43.783461	csharp,oop,encapsulation,property,kapsulleme	f	\N
418	backend	csharp	ders	Ders 25: Kurucu Metodlar (Constructors & Primary Constructors)	Nesne doğarken çalışan yapıcı metodlar ve C# 12 yeniliği.	<h3>Primary Constructors (C# 12)</h3><pre><code>// Modern C# Primary Constructor\npublic class Urun(string ad, decimal fiyat) {\n    public string Ad { get; set; } = ad;\n    public decimal Fiyat { get; set; } = fiyat;\n}</code></pre>	10	kolay	2026-10-16 23:57:43.783682	csharp,oop,constructor,primary_constructor,yapici	f	\N
419	backend	csharp	ders	Ders 26: Kalıtım (Inheritance) ve base Anahtarı	Sınıflar arası miras alma, kod tekrarını önleme.	<h3>Kalıtım (Inheritance)</h3><pre><code>public class Calisan {\n    public string Ad { get; set; }\n    public decimal Maas { get; set; }\n}\n\npublic class Yazilimci : Calisan {\n    public string UzmanlikDili { get; set; }\n}</code></pre>	10	kolay	2026-10-16 23:57:43.784291	csharp,oop,kalitim,inheritance,base	f	\N
420	backend	csharp	ders	Ders 27: Çok Biçimlilik (Polymorphism): virtual & override	Üst sınıf metodlarını alt sınıfta ezme ve dinamik davranış.	<h3>Polymorphism: virtual & override</h3><pre><code>public class Hayvan {\n    public virtual void SesCikar() => Console.WriteLine("Ses");\n}\n\npublic class Kopek : Hayvan {\n    public override void SesCikar() => Console.WriteLine("Hav hav!");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.784698	csharp,oop,polymorphism,virtual,override,cokbicimlilik	f	\N
421	backend	csharp	ders	Ders 28: Arayüzler (Interfaces)	Sözleşme tabanlı programlama, çoklu kalıtım alternatifi.	<h3>Interface (Sözleşme)</h3><p>Metod gövdesi içermez; sınıfın hangi metodları zorunlu uygulayacağını bildirir.</p><pre><code>public interface IBildirim {\n    void Gonder(string mesaj);\n}\n\npublic class EmailBildirim : IBildirim {\n    public void Gonder(string mesaj) => Console.WriteLine($"E-posta: {mesaj}");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.785325	csharp,oop,interface,arayuz,sozlesme	f	\N
422	backend	csharp	ders	Ders 29: Soyut Sınıflar (abstract Class)	abstract anahtarı ile şablon sınıflar ve interface farkı.	<h3>Abstract Class vs Interface</h3><p>Abstract sınıflar hem gövdeli ortak metodlar hem de abstract gövdesiz metodlar barındırabilir.</p><pre><code>public abstract class Sekil {\n    public abstract double AlanHesapla();\n    public void BilgiYazdir() => Console.WriteLine("Bu bir geometrik şekildir.");\n}</code></pre>	10	kolay	2026-10-16 23:57:43.785883	csharp,oop,abstract,soyut,interface	f	\N
423	backend	csharp	ders	Ders 30: Modern C#: Record Tipleri ve Immutability	Değiştirilemez (immutable) veri modelleri ve with ifadesi.	<h3>Record Tipleri</h3><p>Record'lar değer tabanlı eşitlik (value equality) karşılaştırması yapar.</p><pre><code>public record Kisi(string Ad, string Soyad);\n\nvar k1 = new Kisi("Can", "Yılmaz");\nvar k2 = k1 with { Soyad = "Demir" }; // Klonlama ve güncelleme</code></pre>	10	kolay	2026-10-16 23:57:43.786325	csharp,record,immutability,modern,with	f	\N
424	backend	csharp	ders	Ders 31: Generics: Generic Sınıflar ve Metodlar (<T>)	Tip bağımsız, tip-güvenli kod mimarisi.	<h3>Generic Mimari (<T>)</h3><pre><code>public class Depo<T> {\n    private T _icerik;\n    public void Ekle(T oge) => _icerik = oge;\n    public T Getir() => _icerik;\n}</code></pre>	10	kolay	2026-10-16 23:57:43.786833	csharp,generics,type_safe,sablon	f	\N
425	backend	csharp	ders	Ders 32: LINQ Temelleri: Where, Select ve ToList	Language Integrated Query ile veri filtreleme ve dönüştürme.	<h3>LINQ ile Sorgulama</h3><pre><code>List<int> sayilar = new() { 1, 2, 3, 4, 5, 6 };\nvar ciftler = sayilar.Where(x => x % 2 == 0).ToList();\nvar kareler = sayilar.Select(x => x * x).ToList();</code></pre>	10	kolay	2026-10-16 23:57:43.787144	csharp,linq,where,select,lambda,filtre	f	\N
426	backend	csharp	ders	Ders 33: LINQ ile Sıralama ve Arama (OrderBy, FirstOrDefault)	Koleksiyonlarda gelişmiş sorgulama teknikleri.	<h3>LINQ Gelişmiş Sorgular</h3><pre><code>var enPahaliUrun = urunler.OrderByDescending(u => u.Fiyat).FirstOrDefault();\nbool varMi = urunler.Any(u => u.StoktaMi);\nint toplamStok = urunler.Sum(u => u.Adet);</code></pre>	10	kolay	2026-10-16 23:57:43.787345	csharp,linq,orderby,firstordefault,any,sum	f	\N
427	backend	csharp	ders	Ders 34: Asenkron Programlama: Task, async ve await	Kullanıcı arayüzünü kilitlemeyen eşzamanlı görev yönetimi.	<h3>async & await Mimarisi</h3><p>Uzun süren veritabanı veya web isteklerinde ana iş parçacığı bloklanmaz.</p><pre><code>public async Task<string> VeriCekAsync(string url) {\n    using HttpClient client = new();\n    string sonuc = await client.GetStringAsync(url);\n    return sonuc;\n}</code></pre>	10	kolay	2026-10-16 23:57:43.787583	csharp,async,await,task,asenkron,httpclient	f	\N
428	backend	csharp	ders	Ders 35: Dosya İşlemleri ve using Deyimi	IDisposable, using bloğu ile kaynak güvenliği ve File I/O.	<h3>using Bildirimi ile Otomatik Dispose</h3><p>using ile açılan dosyalar işlem bitince otomatik olarak bellekten serbest bırakılır.</p><pre><code>await File.WriteAllTextAsync("log.txt", "Sistem başarıyla başlatıldı.");\nstring okunan = await File.ReadAllTextAsync("log.txt");</code></pre>	10	kolay	2026-10-16 23:57:43.787742	csharp,file,using,idisposable,io,dosya	f	\N
429	backend	csharp	alistirma	Alıştırma: Konsola Kişisel Tanıtım Mesajı Bas	Console.WriteLine ve string birleştirme alıştırması.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.787906	csharp,console,print	f	\N
430	backend	csharp	alistirma	Alıştırma: KDV ve Toplam Fiyat Hesapla	Aritmetik operatörler ve double dönüşümü alıştırması.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.788052	csharp,double,kdv,hesap	f	\N
431	backend	csharp	alistirma	Alıştırma: Kullanıcı Girişini int.TryParse ile Güvenceye Al	Hatalı girişte programın çökmesini engelleme.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.788211	csharp,tryparse,guvenlik	f	\N
432	backend	csharp	alistirma	Alıştırma: Harf Notu Hesaplama (if-else)	0-100 arası puandan AA, BA, FF harf notu üretme.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.788363	csharp,if,else,not	f	\N
433	backend	csharp	alistirma	Alıştırma: Haftanın Günü (Switch Expression)	C# 8+ pattern matching ile gün adını döndürme.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.788492	csharp,switch,expression	f	\N
434	backend	csharp	alistirma	Alıştırma: 1'den 100'e Kadar Çift Sayıları Topla	for döngüsü ve mod operatörü alıştırması.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.788617	csharp,for,dongu,toplam	f	\N
435	backend	csharp	alistirma	Alıştırma: Sayı Tahmin Oyunu (while)	Doğru sayı bulunana kadar devam eden döngü.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.788787	csharp,while,oyun,rastgele	f	\N
436	backend	csharp	alistirma	Alıştırma: Dizi Elemanlarının Ortalamasını Bul	Döngü ile diziyi gezip ortalamayı hesaplama.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.788971	csharp,array,ortalama	f	\N
437	backend	csharp	alistirma	Alıştırma: Dinamik Alışveriş Listesi Oluştur	List<string> ile eleman ekleme, çıkarma ve sayma.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.789321	csharp,list,alisveris	f	\N
438	backend	csharp	alistirma	Alıştırma: Telefon Rehberi Sözlüğü (Dictionary)	İsimle hızlı telefon numarası sorgulama.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.789835	csharp,dictionary,rehber	f	\N
439	backend	csharp	alistirma	Alıştırma: out Parametreli Matematik Fonksiyonu	Tek metodda hem toplamı hem farkı out ile dönme.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.790293	csharp,out,metod	f	\N
440	backend	csharp	alistirma	Alıştırma: try-catch ile Sıfıra Bölme Koruması	Bölme işleminde sıfıra bölünme hatasını yakalama.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.790789	csharp,exception,trycatch	f	\N
441	backend	csharp	alistirma	Alıştırma: Banka Hesabı Sınıfı ve Kapsülleme	Negatif bakiye kabul etmeyen Bakiye özelliği.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.791306	csharp,oop,encapsulation	f	\N
442	backend	csharp	alistirma	Alıştırma: LINQ ile Yetişkin Kullanıcıları Filtrele	Where(k => k.Yas >= 18) sorgusu çalıştırma.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.791857	csharp,linq,where	f	\N
443	backend	csharp	alistirma	Alıştırma: Asenkron Veri Yükleme Simülasyonu	Task.Delay ile async/await akışını test etme.	Alıştırma içeriği ve canlı editör yönergeleri.	15	orta	2026-10-16 23:57:43.792337	csharp,async,await,task	f	\N
444	backend	csharp	mini_proje	Mini Proje 1: Konsol Tabanlı ATM / Bankamatik	Bakiye sorgulama, para yatırma, çekme ve çıkış döngüsü.	Proje isterleri ve test senaryoları.	30	zor	2026-10-16 23:57:43.792767	csharp,proje,atm,banka,dongu	f	\N
445	backend	csharp	mini_proje	Mini Proje 2: Öğrenci ve Not Takip Otomasyonu	List<Ogrenci> yapısı ile öğrenci ekleme, listeleme ve sınıf ortalaması.	Proje isterleri ve test senaryoları.	30	zor	2026-10-16 23:57:43.793173	csharp,proje,ogrenci,koleksiyon	f	\N
446	backend	csharp	mini_proje	Mini Proje 3: Kütüphane Kitap Katalog Sistemi	Dictionary ve HashSet ile kitap ödünç alma ve iade yönetimi.	Proje isterleri ve test senaryoları.	30	zor	2026-10-16 23:57:43.793581	csharp,proje,kutuphane,dictionary	f	\N
447	backend	csharp	mini_proje	Mini Proje 4: OOP Tabanlı Araç Kiralama Sistemi	Araba, Motorsiklet ve Kamyon sınıflarında kalıtım ve polimorfizm.	Proje isterleri ve test senaryoları.	35	zor	2026-10-16 23:57:43.793965	csharp,proje,oop,kalitim,polimorfizm	f	\N
448	backend	csharp	mini_proje	Mini Proje 5: LINQ Destekli E-Ticaret Ürün Filtresi	Fiyata, kategoriye ve stok durumuna göre LINQ sorguları çalıştırma.	Proje isterleri ve test senaryoları.	35	zor	2026-10-16 23:57:43.795933	csharp,proje,linq,eticaret,filtre	f	\N
449	backend	csharp	mini_proje	🏆 C# Bitirme Projesi: Katmanlı Mimari Sipariş Yönetim Sistemi	Repository Pattern, Interface, async/await ve dosya loglamasıyla uçtan uca kurumsal sistem.	Proje isterleri ve test senaryoları.	50	zor	2026-10-16 23:57:43.796372	csharp,mezuniyet,kurumsal,tam_proje,mimari	f	\N
450	backend	sql	ders	Ders 1: Veritabanı ve SQL Dünyasına Giriş	RDBMS nedir? Tablolar, satırlar, sütunlar ve ilişkisel veri modeli.	<h3>SQL & İlişkisel Veritabanı (RDBMS)</h3><p>SQL (Structured Query Language), verileri düzenli tablolarda saklamak, sorgulamak ve yönetmek için kullanılan evrensel standart dildir.</p><pre><code>-- İlk SQL Sorgusu: Tüm kullanıcıları listele\nSELECT * FROM users;</code></pre>	10	kolay	2026-10-17 01:00:55.809358	sql,giris,rdbms,tablo,select	f	\N
451	backend	sql	ders	Ders 2: SELECT ile Sütun Seçimi ve Takma İsimler (AS)	İhtiyaç duyulan sütunları çekme ve AS ile yeniden adlandırma.	<h3>Hedefe Yönelik Sütun Çekme</h3><p>Tüm tabloyu (SELECT *) çekmek yerine sadece gereken sütunları istemek sorgu hızını ve bellek verimliliğini artırır.</p><pre><code>SELECT \n    first_name AS ad,\n    last_name AS soyad,\n    email AS iletisim_adresi\nFROM customers;</code></pre>	10	kolay	2026-10-17 01:00:55.823003	sql,select,as,alias,kolon	f	\N
452	backend	sql	ders	Ders 3: Tekil Kayıtları Listeleme: DISTINCT	Tekrar eden (mükerrer) kayıtları filtreleyip tekil sonuç alma.	<h3>Mükerrer Verileri Ayıklama</h3><p>DISTINCT anahtar kelimesi, sorgu sonucunda aynı değere sahip satırları tekilleştirir.</p><pre><code>-- Şirketin hangi benzersiz şehirlerde müşterisi var?\nSELECT DISTINCT city FROM customers;</code></pre>	10	kolay	2026-10-17 01:00:55.823762	sql,distinct,tekil,tekillesme	f	\N
453	backend	sql	ders	Ders 4: Sayfalama: LIMIT ve OFFSET	Sonuç sayısını sınırlandırma ve web sayfalaması mimarisi.	<h3>Sonuç Sınırlandırma (LIMIT & OFFSET)</h3><p>Web sayfalarında 'sayfa 2'yi göstermek için 10 satır atlayıp sonraki 10 satırı çekeriz.</p><pre><code>-- En yüksek puanlı 5 ürünü getir\nSELECT title, rating FROM products \nORDER BY rating DESC \nLIMIT 5 OFFSET 0;</code></pre>	10	kolay	2026-10-17 01:00:55.82419	sql,limit,offset,sayfalama,pagination	f	\N
454	backend	sql	ders	Ders 5: Satır Filtreleme: WHERE Koşulu	Tablodan belirli şartı sağlayan satırları getirme.	<h3>WHERE ile Şartlı Sorgular</h3><pre><code>SELECT title, price FROM books \nWHERE price < 100;</code></pre>	10	kolay	2026-10-17 01:00:55.824566	sql,where,filtre,kosul	f	\N
455	backend	sql	ders	Ders 6: Mantıksal Operatörler: AND, OR ve NOT	Birden fazla şartı birleştirerek hassas filtreleme.	<h3>AND, OR, NOT Bileşimi</h3><pre><code>SELECT * FROM employees \nWHERE department = 'IT' AND salary >= 25000 AND NOT is_intern;</code></pre>	10	kolay	2026-10-17 01:00:55.825003	sql,and,or,not,mantiksal	f	\N
456	backend	sql	ders	Ders 7: Sıralama Mimarisi: ORDER BY (ASC / DESC)	Sonuçları alfabetik, kronolojik veya sayısal dizme.	<h3>Sıralama (ORDER BY)</h3><pre><code>SELECT full_name, score FROM students \nORDER BY score DESC, full_name ASC;</code></pre>	10	kolay	2026-10-17 01:00:55.825372	sql,orderby,asc,desc,siralama	f	\N
457	backend	sql	ders	Ders 8: Değer Kümesi Arama: IN ve NOT IN	Birden fazla OR yazmak yerine liste içinde arama.	<h3>IN Operatörü</h3><pre><code>SELECT * FROM orders \nWHERE status IN ('Kargoda', 'Teslim Edildi', 'Hazırlanıyor');</code></pre>	10	kolay	2026-10-17 01:00:55.825797	sql,in,notin,kume,filtre	f	\N
458	backend	sql	ders	Ders 9: Aralık Filtreleme: BETWEEN ve AND	Belirli iki değer (tarih veya sayı) arasındaki verileri alma.	<h3>BETWEEN Operatörü (Sınırlar Dahil)</h3><pre><code>SELECT product_name, price FROM products \nWHERE price BETWEEN 100 AND 500;</code></pre>	10	kolay	2026-10-17 01:00:55.826157	sql,between,aralik,tarih,fiyat	f	\N
459	backend	sql	ders	Ders 10: Metin Deseni Arama: LIKE ve ILIKE (Wildcards)	% ve _ joker karakterleri ile esnek metin araması.	<h3>Joker Karakterlerle Arama (% ve _)</h3><p>% herhangi sayıda karakteri, _ ise tek bir karakteri temsil eder. ILIKE büyük/küçük harf duyarsız arar.</p><pre><code>-- 'Can' ile başlayan tüm isimler\nSELECT * FROM users WHERE username LIKE 'Can%';\n\n-- İkinci harfi 'a' olan 3 harfli kodlar\nSELECT * FROM codes WHERE code LIKE '_a_';</code></pre>	10	kolay	2026-10-17 01:00:55.826574	sql,like,ilike,wildcard,regex,arama	f	\N
460	backend	sql	ders	Ders 11: Boş Değer Kontrolü: IS NULL ve IS NOT NULL	SQL'de eksik/tanımsız verilerle başa çıkma kuralı.	<h3>NULL Eşitlikle Kontrol Edilemez!</h3><p>SQL'de 'degisken = NULL' her zaman geçersizdir; her zaman 'IS NULL' veya 'IS NOT NULL' kullanılır.</p><pre><code>SELECT full_name FROM customers \nWHERE phone_number IS NULL;</code></pre>	10	kolay	2026-10-17 01:00:55.826909	sql,null,isnull,isnotnull,eksikveri	f	\N
461	backend	sql	ders	Ders 12: NULL Önleme Fonksiyonları: COALESCE	Boş değer yerine varsayılan yedek değer yazdırma.	<h3>COALESCE(deger, yedek)</h3><pre><code>SELECT full_name, COALESCE(phone, 'Telefon Belirtilmedi') AS iletisim \nFROM users;</code></pre>	10	kolay	2026-10-17 01:00:55.827308	sql,coalesce,null,fallback,varsayilan	f	\N
462	backend	sql	ders	Ders 13: Toplama Fonksiyonları: COUNT, SUM, AVG	Satır sayısı, toplam ve ortalama hesaplama.	<h3>Temel Toplama Fonksiyonları</h3><pre><code>SELECT \n    COUNT(*) AS toplam_siparis,\n    SUM(total_amount) AS ciro,\n    AVG(total_amount) AS sepet_ortalamasi\nFROM orders;</code></pre>	10	kolay	2026-10-17 01:00:55.827675	sql,count,sum,avg,aggregate,hesap	f	\N
463	backend	sql	ders	Ders 14: En Küçük ve En Büyük Değer: MIN ve MAX	Kategorideki taban ve tavan değerleri yakalama.	<h3>MIN ve MAX</h3><pre><code>SELECT \n    MIN(price) AS en_ucuz_fiyat,\n    MAX(price) AS en_pahali_fiyat\nFROM products;</code></pre>	10	kolay	2026-10-17 01:00:55.82803	sql,min,max,enbuyuk,enkucuk	f	\N
464	backend	sql	ders	Ders 15: Gruplama Mimarisi: GROUP BY	Verileri kategorilere, şehirlere veya tarihlere göre özetleme.	<h3>GROUP BY ile İstatistik Çıkarma</h3><pre><code>SELECT category_name, COUNT(*) AS urun_sayisi, AVG(price) AS ort_fiyat\nFROM products\nGROUP BY category_name;</code></pre>	10	kolay	2026-10-17 01:00:55.828432	sql,groupby,gruplama,istatistik,kategori	f	\N
465	backend	sql	ders	Ders 16: Gruplarda Filtreleme: HAVING	WHERE ile HAVING arasındaki kritik mimari fark.	<h3>WHERE vs HAVING</h3><p>WHERE gruplamadan önce tekil satırları filtreler; HAVING ise gruplamadan sonra grup istatistiklerini (COUNT, SUM vb.) filtreler.</p><pre><code>SELECT department, COUNT(*) AS calisan_sayisi\nFROM employees\nGROUP BY department\nHAVING COUNT(*) >= 5; -- Sadece en az 5 çalışanı olan departmanlar</code></pre>	10	kolay	2026-10-17 01:00:55.828788	sql,having,groupby,filtre,aggregate	f	\N
466	backend	sql	ders	Ders 17: Tablo Oluşturma: CREATE TABLE ve Tipler	INTEGER, VARCHAR, DECIMAL, BOOLEAN, TIMESTAMP veri tipleri.	<h3>Sıfırdan Tablo Oluşturma (DDL)</h3><pre><code>CREATE TABLE categories (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(50) NOT NULL UNIQUE,\n    description TEXT,\n    is_active BOOLEAN DEFAULT TRUE,\n    created_at TIMESTAMP DEFAULT NOW()\n);</code></pre>	10	kolay	2026-10-17 01:00:55.829159	sql,ddl,createtable,veritipleri,primarykey	f	\N
467	backend	sql	ders	Ders 18: Kısıtlamalar (Constraints): PRIMARY KEY & UNIQUE	Veri bütünlüğünün veritabanı seviyesinde garanti altına alınması.	<h3>PRIMARY KEY ve UNIQUE</h3><p>PRIMARY KEY tablo satırını tekil tanımlar (asla NULL ve tekrar edemez). UNIQUE ise o sütundaki verinin benzersiz olmasını zorlar (örn: email).</p>	10	kolay	2026-10-17 01:00:55.82953	sql,constraints,primarykey,unique,kisitlama	f	\N
468	backend	sql	ders	Ders 19: İlişkisel Bütünlük: FOREIGN KEY ve CASCADE	Tabloları birbirine bağlama, ON DELETE CASCADE mantığı.	<h3>FOREIGN KEY & ON DELETE CASCADE</h3><pre><code>CREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,\n    order_date TIMESTAMP DEFAULT NOW(),\n    total_amount DECIMAL(10, 2) NOT NULL\n);</code></pre>	10	kolay	2026-10-17 01:00:55.829976	sql,foreignkey,cascade,iliskisel,tablobaglantisi	f	\N
489	backend	sql	alistirma	Alıştırma: E-postası Olmayan Kayıtları Tespit Et	IS NULL ile eksik verileri listeleme.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.838868	sql,isnull,null,email	f	\N
470	backend	sql	ders	Ders 21: Tablo Silme: DROP vs TRUNCATE	DROP TABLE ile TRUNCATE TABLE arasındaki farklar.	<h3>DROP vs TRUNCATE</h3><p>DROP TABLE tabloyu şemasıyla birlikte tamamen siler. TRUNCATE TABLE ise tablo yapısını korur, içindeki tüm verileri saniyeler içinde sıfırlar.</p><pre><code>TRUNCATE TABLE temp_logs; -- Hızlı veri sıfırlama\nDROP TABLE old_archive;   -- Tabloyu tamamen kaldır</code></pre>	10	kolay	2026-10-17 01:00:55.83094	sql,drop,truncate,silme,temizleme	f	\N
471	backend	sql	ders	Ders 22: Veri Ekleme: INSERT INTO ve RETURNING	Tabloya yeni satırlar kaydetme ve eklenen ID'yi anında alma.	<h3>INSERT INTO & RETURNING</h3><pre><code>INSERT INTO products (name, price, stock) \nVALUES ('Mekanik Klavye', 1250.00, 25)\nRETURNING id; -- PostgreSQL eklenen kaydın ID'sini geri döner</code></pre>	10	kolay	2026-10-17 01:00:55.831352	sql,dml,insert,returning,veriekleme	f	\N
472	backend	sql	ders	Ders 23: Çoklu Veri Ekleme (Bulk Insert)	Tek bir INSERT komutuyla yüzlerce satırı verimli ekleme.	<h3>Toplu Ekleme</h3><pre><code>INSERT INTO tags (name) VALUES \n('Teknoloji'), \n('Yazılım'), \n('TÜBİTAK');</code></pre>	10	kolay	2026-10-17 01:00:55.831746	sql,dml,bulkinsert,topluekleme	f	\N
473	backend	sql	ders	Ders 24: Veri Güncelleme: UPDATE ve WHERE Güvenliği	Kayıtları güncelleme, WHERE unutulursa ne olur?	<h3>UPDATE ile Güvenli Güncelleme</h3><p>DİKKAT: WHERE yazılmazsa tablodaki TÜM satırlar güncellenir!</p><pre><code>UPDATE products \nSET price = price * 1.10, updated_at = NOW() \nWHERE category_id = 3;</code></pre>	10	kolay	2026-10-17 01:00:55.832104	sql,dml,update,where,fiyatguncelleme	f	\N
474	backend	sql	ders	Ders 25: Veri Silme: DELETE FROM	Belirli şartı sağlayan kayıtları tablodan güvenle silme.	<h3>DELETE FROM</h3><pre><code>DELETE FROM cart_items \nWHERE user_id = 42 AND is_purchased = true;</code></pre>	10	kolay	2026-10-17 01:00:55.832442	sql,dml,delete,verisilme,guvenlik	f	\N
475	backend	sql	ders	Ders 26: Tabloları Birleştirme: INNER JOIN	İki tabloda sadece eşleşen ortak satırları listeleme.	<h3>INNER JOIN (Kesişim)</h3><pre><code>SELECT o.id AS siparis_no, c.full_name AS musteri_adi, o.total_amount\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.id;</code></pre>	10	kolay	2026-10-17 01:00:55.832854	sql,join,innerjoin,birlestirme,iliskisel	f	\N
476	backend	sql	ders	Ders 27: Sol Tablo Odaklı: LEFT JOIN	Sol tablodaki tüm satırları getirip eşleşmeyenlere NULL basma.	<h3>LEFT JOIN (Hiç Siparişi Olmayan Müşteriler)</h3><pre><code>SELECT c.full_name, o.id AS siparis_id\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.id IS NULL; -- Henüz hiç sipariş vermemiş müşteriler!</code></pre>	10	kolay	2026-10-17 01:00:55.833293	sql,join,leftjoin,null,solbirlestirme	f	\N
477	backend	sql	ders	Ders 28: Sağ ve Tam Birleştirme: RIGHT JOIN & FULL JOIN	RIGHT JOIN ve FULL OUTER JOIN kullanım senaryoları.	<h3>FULL OUTER JOIN</h3><p>Her iki tablodaki tüm satırları getirir; eşleşme olmayan taraflara NULL koyar.</p><pre><code>SELECT a.name, b.title \nFROM authors a \nFULL OUTER JOIN books b ON a.id = b.author_id;</code></pre>	10	kolay	2026-10-17 01:00:55.833606	sql,join,rightjoin,fulljoin,outerjoin	f	\N
478	backend	sql	ders	Ders 29: Kendi Kendine Birleştirme: Self JOIN	Hiyerarşik verilerde (çalışan-müdür, kategori-üst kategori) aynı tabloyu kendine bağlama.	<h3>Self JOIN (Çalışan - Yönetici Eşleştirmesi)</h3><pre><code>SELECT \n    calisan.full_name AS calisan_adi,\n    yonetici.full_name AS mudur_adi\nFROM employees calisan\nLEFT JOIN employees yonetici ON calisan.manager_id = yonetici.id;</code></pre>	10	kolay	2026-10-17 01:00:55.834028	sql,join,selfjoin,hiyerarsi,yonetici	f	\N
479	backend	sql	ders	Ders 30: Alt Sorgular (Subqueries): WHERE İçi Sorgular	Bir sorgunun sonucunu başka bir sorguda filtre olarak kullanma.	<h3>Subqueries (İç İçe Sorgular)</h3><pre><code>-- Ortalama fiyattan daha pahalı olan ürünler\nSELECT product_name, price FROM products \nWHERE price > (SELECT AVG(price) FROM products);</code></pre>	10	kolay	2026-10-17 01:00:55.834451	sql,subquery,altsorgu,nested,filtre	f	\N
480	backend	sql	ders	Ders 31: Ortak Tablo İfadeleri: CTE (WITH Deyimi)	Karmaşık alt sorguları okunabilir ve tekrar kullanılabilir yapma.	<h3>CTE (Common Table Expressions - WITH)</h3><pre><code>WITH YuksekCiroluMusteriler AS (\n    SELECT customer_id, SUM(total_amount) AS toplam_harcama\n    FROM orders\n    GROUP BY customer_id\n    HAVING SUM(total_amount) > 10000\n)\nSELECT c.full_name, y.toplam_harcama \nFROM YuksekCiroluMusteriler y\nJOIN customers c ON y.customer_id = c.id;</code></pre>	10	kolay	2026-10-17 01:00:55.834907	sql,cte,with,okunabilirlik,sorgu	f	\N
481	backend	sql	ders	Ders 32: İndeksler (Indexes) ve Performans Optimizasyonu	CREATE INDEX, B-Tree mantığı ve EXPLAIN sorgu analizi.	<h3>İndeksler ile Milyonluk Satırlarda Hız</h3><p>İndeks, bir kitabın fihristi gibidir; veritabanının milyonlarca satırı baştan sona taramasını (Seq Scan) engeller.</p><pre><code>CREATE INDEX idx_users_email ON users(email);\n\n-- Sorgu planını incele\nEXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@mail.com';</code></pre>	10	kolay	2026-10-17 01:00:55.835331	sql,index,btree,explain,performans,hiz	f	\N
482	backend	sql	ders	Ders 33: Sanal Tablolar: VIEW (Görünümler)	Sık kullanılan karmaşık sorguları sanal bir tablo olarak kaydetme.	<h3>CREATE VIEW</h3><pre><code>CREATE OR REPLACE VIEW vw_aktif_siparisler AS\nSELECT o.id, c.full_name, o.total_amount, o.order_date\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nWHERE o.status = 'Kargoda';\n\n-- Kullanımı\nSELECT * FROM vw_aktif_siparisler;</code></pre>	10	kolay	2026-10-17 01:00:55.835719	sql,view,sanaltablo,guvenlik,pratik	f	\N
483	backend	sql	ders	Ders 34: Transaction Yönetimi ve ACID Prensipleri	Atomicity, Consistency, Isolation, Durability ve para transferi senaryosu.	<h3>ACID & Transaction</h3><p>Banka havalesinde A hesabından para düşerken elektrik kesilirse B hesabına para geçmezse sistem çöker. Transaction, 'ya hepsi çalışır ya hiçbiri' ilkesidir.</p>	10	kolay	2026-10-17 01:00:55.836184	sql,transaction,acid,guvenlik,banka	f	\N
484	backend	sql	ders	Ders 35: BEGIN, COMMIT ve ROLLBACK Komutları	İşlemleri kalıcılaştırma veya hata anında geri alma.	<h3>Transaction Kullanımı</h3><pre><code>BEGIN;\n\n-- 1. Gönderenden düş\nUPDATE accounts SET balance = balance - 1000 WHERE id = 1;\n\n-- 2. Alıcıya ekle\nUPDATE accounts SET balance = balance + 1000 WHERE id = 2;\n\n-- Hata yoksa kalıcı kaydet\nCOMMIT;\n\n-- Hata olursa geri al\n-- ROLLBACK;</code></pre>	10	kolay	2026-10-17 01:00:55.836569	sql,begin,commit,rollback,transaction	f	\N
485	backend	sql	alistirma	Alıştırma: 18 Yaşından Büyük Kullanıcıları Çek	SELECT ve WHERE ile temel filtreleme alıştırması.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.836947	sql,select,where,yas	f	\N
486	backend	sql	alistirma	Alıştırma: En Pahalı 3 Ürünü Sırala	ORDER BY price DESC LIMIT 3 sorgusu yazma.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.83778	sql,orderby,limit,fiyat	f	\N
487	backend	sql	alistirma	Alıştırma: Ankara ve İzmir'deki Müşterileri Listele	IN ('Ankara', 'İzmir') operatörünü kullanma.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.838063	sql,in,sehir,filtre	f	\N
488	backend	sql	alistirma	Alıştırma: 'Pro' Kelimesi Geçen Ürünleri Bul	LIKE '%Pro%' ile metin araması yapma.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.838435	sql,like,arama,metin	f	\N
490	backend	sql	alistirma	Alıştırma: Toplam Sipariş Cirosunu Hesapla	SUM(total_amount) toplama fonksiyonu kullanımı.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.839222	sql,sum,aggregate,ciro	f	\N
491	backend	sql	alistirma	Alıştırma: Kategori Bazında Ürün Sayılarını Grupla	GROUP BY category_id ile sayım yapma.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.839739	sql,groupby,count,kategori	f	\N
492	backend	sql	alistirma	Alıştırma: 10'dan Fazla Çalışanı Olan Departmanlar	GROUP BY ve HAVING COUNT(*) > 10 sorgusu.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.840126	sql,having,groupby,departman	f	\N
493	backend	sql	alistirma	Alıştırma: Kitaplar Tablosu Oluştur (CREATE TABLE)	PRIMARY KEY, NOT NULL ve DEFAULT kısıtlamaları ekleme.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.840545	sql,createtable,ddl,tablo	f	\N
494	backend	sql	alistirma	Alıştırma: Ürün Fiyatlarına %15 Zam Yap	UPDATE products SET price = price * 1.15 sorgusu.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.840978	sql,update,fiyat,dml	f	\N
495	backend	sql	alistirma	Alıştırma: Müşteri ve Siparişlerini Birleştir (INNER JOIN)	Müşteri adı ile sipariş numarasını yan yana getirme.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.841381	sql,join,innerjoin,siparis	f	\N
496	backend	sql	alistirma	Alıştırma: Hiç Satış Yapmayan Satıcıları Bul (LEFT JOIN)	LEFT JOIN ve WHERE satis.id IS NULL sorgusu.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.841737	sql,leftjoin,null,satici	f	\N
497	backend	sql	alistirma	Alıştırma: Ortalama Maaşın Üzerindeki Personeller	WHERE salary > (SELECT AVG(salary)) alt sorgusu.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.842106	sql,subquery,avg,maas	f	\N
498	backend	sql	alistirma	Alıştırma: E-posta Kolonuna B-Tree İndeksi Ekle	CREATE INDEX ile sorgu performansını artırma.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.842414	sql,index,performans,btree	f	\N
499	backend	sql	alistirma	Alıştırma: Para Transferi Simülasyonu (COMMIT/ROLLBACK)	BEGIN, UPDATE ve COMMIT bloklarıyla transaction çalıştırma.	Alıştırma sorgu isterleri ve yönergeleri.	15	orta	2026-10-17 01:00:55.842927	sql,transaction,commit,rollback	f	\N
500	backend	sql	mini_proje	Mini Proje 1: Kütüphane Kitap Ödünç Takip Veritabanı	Üyeler, Kitaplar ve Ödünç tablosuyla ilişkisel tasarım ve sorgulama.	Veritabanı tasarım isterleri ve ilişkisel şema.	30	zor	2026-10-17 01:00:55.843272	sql,proje,kutuphane,iliskisel,foreignkey	f	\N
501	backend	sql	mini_proje	Mini Proje 2: Şirket İK ve Personel Maaş Analitiği	Departmanlar, unvanlar, primler ve GROUP BY / HAVING raporlaması.	Veritabanı tasarım isterleri ve ilişkisel şema.	30	zor	2026-10-17 01:00:55.843657	sql,proje,ik,maas,groupby,analiz	f	\N
502	backend	sql	mini_proje	Mini Proje 3: Hastane Randevu ve Doktor Yönetim Şeması	Poliklinikler, Doktorlar ve Randevular arası JOIN ve çakışma kontrolü.	Veritabanı tasarım isterleri ve ilişkisel şema.	30	zor	2026-10-17 01:00:55.844097	sql,proje,hastane,randevu,join	f	\N
503	backend	sql	mini_proje	Mini Proje 4: Sosyal Medya Etkileşim ve Takipçi Ağı	Kullanıcılar, Gönderiler, Beğeniler ve Self JOIN ile takipçi mimarisi.	Veritabanı tasarım isterleri ve ilişkisel şema.	35	zor	2026-10-17 01:00:55.844523	sql,proje,sosyalmedya,selfjoin,ag	f	\N
504	backend	sql	mini_proje	Mini Proje 5: B2C E-Ticaret Sipariş & Kargo Raporlama	Kategoriler, Ürünler, Sipariş Detayları ve CTE (WITH) ile ciro analizi.	Veritabanı tasarım isterleri ve ilişkisel şema.	35	zor	2026-10-17 01:00:55.844959	sql,proje,eticaret,cte,rapor	f	\N
505	backend	sql	mini_proje	🏆 SQL Bitirme Projesi: Kurumsal ERP & Depo Stok Veritabanı Mimarisi	Tedarikçiler, Depolar, Stok Hareketleri, Transaction güvenliği, View ve İndeks optimizasyonuyla uçtan uca mimari.	Veritabanı tasarım isterleri ve ilişkisel şema.	50	zor	2026-10-17 01:00:55.845266	sql,mezuniyet,kurumsal,erp,stok,tam_proje	f	\N
506	backend	cpp	ders	Ders 1: C++ Giriş ve main() Fonksiyonu Yapısı	C++ programlama dilinin derleme mantığı, standart iostream kütüphanesi ve programın giriş noktası main fonksiyonu.	#include <iostream>\\n\\nint main() {\\n    std::cout << "Merhaba C++20!" << std::endl;\\n    return 0;\\n}	15	kolay	2026-10-17 01:19:51.359702	cpp_temeller_io,main,iostream	f	C++ programları her zaman int main() fonksiyonu ile yürütülmeye başlar.
507	backend	cpp	ders	Ders 2: Değişkenler, Primitif Veri Tipleri ve auto	int, double, char, bool veri tipleri, tip güvenliği ve C++11 auto ile otomatik tip çıkarımı.	int sayi = 42;\\ndouble ondalik = 3.14159;\\nchar harf = 'A';\\nbool aktif = true;\\nauto otomatik = 100LL; // long long	15	kolay	2026-10-17 01:19:51.359702	cpp_temeller_io,variables,types,auto	f	auto anahtar kelimesi atanan ilk değere bakarak derleme aşamasında tipi belirler.
508	backend	cpp	ders	Ders 3: Sabitler (const) ve Derleme Zamanı Hesaplama (constexpr)	Değeri değiştirilemeyen const değişkenler ve derleyici tarafından derleme anında hesaplanan constexpr ifadeleri.	const int MAKSIMUM = 100;\\nconstexpr int KARE(int x) { return x * x; }\\nconstexpr int sonuc = KARE(5); // Derleme anında 25 olur	15	kolay	2026-10-17 01:19:51.359702	cpp_temeller_io,const,constexpr	f	constexpr derleme anında (compile-time) sabit değerler ve fonksiyonlar üretir.
509	backend	cpp	ders	Ders 4: Konsol Girdi/Çıktı (cin, cout) ve Hızlı I/O	std::cin ile kullanıcıdan veri alma, std::cout ile ekrana yazdırma ve rekabetçi programlama için I/O hızlandırma.	std::ios_base::sync_with_stdio(false);\\nstd::cin.tie(NULL);\\nint yas;\\nstd::cin >> yas;\\nstd::cout << "Yaşınız: " << yas << "\\\\n";	15	kolay	2026-10-17 01:19:51.359702	cpp_temeller_io,cin,cout,fast_io	f	std::endl yerine "\\n" kullanmak arabelleği boşaltma maliyetini önleyerek hızı artırır.
510	backend	cpp	ders	Ders 5: Koşullu İfadeler (if-else & switch-case)	Karar yapıları, mantıksal operatörler ve C++17 if-init (başlatıcılı if) deyimi.	if (int x = 10; x > 5) {\\n    std::cout << "Büyük: " << x << std::endl;\\n} else {\\n    std::cout << "Küçük" << std::endl;\\n}	15	kolay	2026-10-17 01:19:51.359702	cpp_kontrol_donguler,if_else,switch_case	f	C++17 ile if parantezi içinde lokal değişken tanımlanabilir.
511	backend	cpp	ders	Ders 6: Döngüler (for, while, do-while)	Klasik sayaçlı döngüler, koşullu döngüler ve döngü kontrol anahtarları (break, continue).	for (int i = 0; i < 5; ++i) {\\n    if (i == 2) continue;\\n    std::cout << i << " ";\\n}	15	kolay	2026-10-17 01:19:51.359702	cpp_kontrol_donguler,for,while,break_continue	f	continue o anki adımı atlar ve sayaç artırma adımına geçer.
512	backend	cpp	ders	Ders 7: Range-Based for Döngüsü (Aralık Tabanlı)	C++11 ile gelen konteynerler ve diziler üzerinde temiz ve güvenli gezinme sağlayan range-for döngüsü.	int sayilar[] = {10, 20, 30, 40};\\nfor (const auto& sayi : sayilar) {\\n    std::cout << sayi << " ";\\n}	15	kolay	2026-10-17 01:19:51.359702	cpp_kontrol_donguler,range_for,containers	f	Kopyalama maliyetinden kaçınmak için const auto& kullanılır.
513	backend	cpp	ders	Ders 8: Fonksiyonlar ve Değer ile Aktarım (Pass-by-Value)	Fonksiyon prototipleri, dönüş tipleri ve parametrelerin kopyalanarak fonksiyona geçirilmesi.	void arttir(int x) {\\n    x += 1; // Orijinal değişken değişmez, kopya artar\\n}	15	orta	2026-10-17 01:19:51.359702	cpp_fonksiyonlar_referanslar,functions,pass_by_value	f	Değer ile aktarımda argüman yığında yeni bir bellek alanına kopyalanır.
514	backend	cpp	ders	Ders 9: Referanslar (&) ve Referans ile Aktarım (Pass-by-Reference)	C++ referans kavramı (&), takma ad (alias) oluşturma ve fonksiyon parametrelerini doğrudan değiştirme.	void yerDegistir(int& a, int& b) {\\n    int gecici = a;\\n    a = b;\\n    b = gecici;\\n}	15	orta	2026-10-17 01:19:51.359702	cpp_fonksiyonlar_referanslar,references,swap	f	Referanslar boş (null) olamaz ve bir kez bağlandıktan sonra başka adrese bağlanamaz.
515	backend	cpp	ders	Ders 10: Const Referanslar ve Fonksiyon Aşırı Yükleme (Overloading)	Büyük nesneleri kopyalamadan ve değiştirmeden okumak için const T& kullanımı ve aynı isimli farklı parametreli fonksiyonlar.	void yazdir(int x) { std::cout << "Int: " << x; }\\nvoid yazdir(const std::string& s) { std::cout << "Str: " << s; }	15	orta	2026-10-17 01:19:51.359702	cpp_fonksiyonlar_referanslar,const_ref,overloading	f	const referans hem bellekten tasarruf sağlar hem de orijinal veriyi kazara değişime karşı korur.
516	backend	cpp	ders	Ders 11: İşaretçiler (Pointers) ve Adres Operatörü (&, *)	Bellek adresleri, adres alma operatörü (&), işaretçi tanımlama ve işaretçinin gösterdiği değere erişim (*, dereference).	int sayi = 100;\\nint* ptr = &sayi; // ptr sayının adresini tutar\\n*ptr = 200;      // sayının değeri 200 olur	20	orta	2026-10-17 01:19:51.359702	cpp_pointer_bellek,pointers,address_operator	f	* operatörü işaretçinin gösterdiği adresteki gerçek veriye erişir.
517	backend	cpp	ders	Ders 12: nullptr ve İşaretçi Aritmetiği	Eski C stili NULL yerine tür güvenli nullptr kullanımı ve işaretçilerle bellek üzerinde ilerleme.	int* ptr = nullptr;\\nint dizi[] = {1, 2, 3};\\nint* p = dizi;\\nstd::cout << *(p + 1); // 2 basar	20	orta	2026-10-17 01:19:51.359702	cpp_pointer_bellek,nullptr,pointer_arithmetic	f	C++11 ile NULL veya 0 yerine tür güvenli nullptr standardı gelmiştir.
518	backend	cpp	ders	Ders 13: Dinamik Bellek Yönetimi (new ve delete)	Heap (öbek) bölgesinden dinamik bellek tahsisi, new, delete, delete[] ve bellek sızıntıları (memory leak).	int* p = new int(42);\\ndelete p;\\np = nullptr;\\nint* dizi = new int[10];\\ndelete[] dizi;	20	orta	2026-10-17 01:19:51.359702	cpp_pointer_bellek,new_delete,heap_memory	f	new[] ile ayrılan diziler mutlaka delete[] ile serbest bırakılmalıdır.
519	backend	cpp	ders	Ders 14: RAII Prensibi ve Akıllı İşaretçilere Giriş	Resource Acquisition Is Initialization (RAII): Kaynakların yaşam döngüsünün nesne kapsamına bağlanması.	// RAII: Kurucuda kaynağı al, yıkıcıda (destructor) otomatik serbest bırak.\\n// Modern C++ doğrudan raw pointer ve delete kullanımını önermez.	20	zor	2026-10-17 01:19:51.359702	cpp_smart_pointers_raii,raii,resource_management	f	RAII sayesinde hata veya istisna fırlatılsa dahi bellek ve dosya kilitleri otomatik temizlenir.
520	backend	cpp	ders	Ders 15: std::unique_ptr ve std::make_unique	Tekil mülkiyet (exclusive ownership) sağlayan, kopyalanamayan ancak taşınabilen modern akıllı işaretçi.	#include <memory>\\nauto ptr = std::make_unique<int>(50);\\n// auto ptr2 = ptr; // HATA! Kopyalanamaz\\nauto ptr2 = std::move(ptr); // Taşınabilir	20	zor	2026-10-17 01:19:51.359702	cpp_smart_pointers_raii,unique_ptr,make_unique	f	unique_ptr kapsam dışına çıktığı anda bellek otomatik olarak free edilir.
521	backend	cpp	ders	Ders 16: std::shared_ptr, std::weak_ptr ve Referans Sayımı	Paylaşılan mülkiyet (shared ownership), referans sayacı (reference counting) ve döngüsel bağımlılığı kıran weak_ptr.	#include <memory>\\nauto p1 = std::make_shared<int>(100);\\nauto p2 = p1; // Referans sayısı 2 olur\\nstd::cout << p1.use_count();	20	zor	2026-10-17 01:19:51.359702	cpp_smart_pointers_raii,shared_ptr,weak_ptr	f	weak_ptr referans sayacını artırmaz; döngüsel bellek kilitlenmelerini (circular dependency) çözer.
522	backend	cpp	ders	Ders 17: Sınıflar (Class) ve Erişim Belirleyiciler (Access Specifiers)	class vs struct farkı, public, private ve protected erişim seviyeleri, veri kapsülleme (encapsulation).	class BankaHesabi {\\nprivate:\\n    double bakiye;\\npublic:\\n    void paraYatir(double miktar) { bakiye += miktar; }\\n};	20	orta	2026-10-17 01:19:51.359702	cpp_oop_siniflar_ctor,class,struct,encapsulation	f	C++ ta struct üyeleri varsayılan olarak public iken class üyeleri varsayılan olarak private tır.
523	backend	cpp	ders	Ders 18: Kurucular (Constructors) ve Üye Başlatma Listesi (Member Init List)	Default, parametreli kurucular ve performansı maksimize eden üye başlatma listesi (: uye(deger)).	class Nokta {\\n    int x, y;\\npublic:\\n    Nokta(int xVal, int yVal) : x(xVal), y(yVal) {}\\n};	20	orta	2026-10-17 01:19:51.359702	cpp_oop_siniflar_ctor,constructor,member_init_list	f	Üye başlatma listesi nesne üyelerini kurucu gövdesinde atamak yerine doğrudan inşa eder.
524	backend	cpp	ders	Ders 19: Yıkıcı Metotlar (Destructors) ve explicit Anahtar Kelimesi	Nesne ömrü bittiğinde çalışan ~Sinif() yıkıcısı ve tek argümanlı kurucularda örtük tip dönüşümünü engelleyen explicit.	class Kutu {\\npublic:\\n    explicit Kutu(int boyut) {}\\n    ~Kutu() { /* Temizlik */ }\\n};	20	orta	2026-10-17 01:19:51.359702	cpp_oop_siniflar_ctor,destructor,explicit	f	explicit anahtar kelimesi Kutu k = 5 gibi istenmeyen örtük dönüşümleri engeller.
525	backend	cpp	ders	Ders 20: Kopyalama ve Taşıma Kurucuları (Copy & Move Semantics)	Derin kopya (deep copy) yapan Copy Constructor ve kaynak çalan Move Constructor (&& rvalue ref).	class Veri {\\n    int* ptr;\\npublic:\\n    Veri(const Veri& diger) : ptr(new int(*diger.ptr)) {} // Copy\\n    Veri(Veri&& diger) noexcept : ptr(diger.ptr) { diger.ptr = nullptr; } // Move\\n};	20	zor	2026-10-17 01:19:51.359702	cpp_oop_siniflar_ctor,copy_move,rvalue	f	Move constructor geçici nesnelerin belleğini kopyalamak yerine sahipliğini devralır.
526	backend	cpp	ders	Ders 21: Kalıtım (Inheritance) ve protected Seviyesi	Temel sınıftan türetme (single inheritance), miras alma tipleri (public, private) ve protected erişim.	class Hayvan {\\nprotected:\\n    std::string ad;\\n};\\nclass Kopek : public Hayvan {\\npublic:\\n    void havla() { std::cout << ad << " havladı"; }\\n};	20	orta	2026-10-17 01:19:51.359702	cpp_oop_kalitim_polymorphism,inheritance,derived_class	f	public kalıtım "is-a" (bir türüdür) ilişkisini kurar.
527	backend	cpp	ders	Ders 22: Sanal Fonksiyonlar (virtual) ve Dinamik Çok Biçimlilik (Polymorphism)	Çalışma zamanı polimorfizmi (runtime polymorphism), vtable/vptr mimarisi ve override anahtar kelimesi.	class Sekil {\\npublic:\\n    virtual void ciz() const { std::cout << "Şekil\\\\n"; }\\n    virtual ~Sekil() = default;\\n};\\nclass Daire : public Sekil {\\npublic:\\n    void ciz() const override { std::cout << "Daire\\\\n"; }\\n};	25	zor	2026-10-17 01:19:51.359702	cpp_oop_kalitim_polymorphism,virtual,polymorphism,override	f	Temel sınıfta sanal fonksiyon varsa temel sınıf yıkıcısı da mutlaka virtual yapılmalıdır.
528	backend	cpp	ders	Ders 23: Saf Sanal Fonksiyonlar (Pure Virtual) ve Soyut Sınıflar (Abstract Class)	= 0 ile tanımlanan saf sanal fonksiyonlar ve doğrudan örneği oluşturulamayan arayüz (interface) sınıfları.	class IOdenebilir {\\npublic:\\n    virtual void ode(double miktar) = 0; // Saf sanal\\n    virtual ~IOdenebilir() = default;\\n};	25	zor	2026-10-17 01:19:51.359702	cpp_oop_kalitim_polymorphism,pure_virtual,abstract_class	f	En az bir saf sanal fonksiyona sahip olan sınıflar soyut sınıf (abstract class) haline gelir.
529	backend	cpp	ders	Ders 24: final Anahtar Kelimesi ve Çoklu Kalıtım (Multiple Inheritance)	Sınıfın veya metodun daha fazla ezilmesini engelleyen final anahtar kelimesi ve Elmas Problemi (Diamond Problem).	class Taban final {}; // Artık bu sınıftan türetme yapılamaz	20	zor	2026-10-17 01:19:51.359702	cpp_oop_kalitim_polymorphism,final,multiple_inheritance	f	virtual inheritance (sanal kalıtım) elmas probleminde atasal kopyalanmayı önler.
530	backend	cpp	ders	Ders 25: Operatör Aşırı Yükleme (Operator Overloading - +, ==)	Kendi sınıflarımıza +, -, == gibi standart matematiksel ve mantıksal operatör davranışları kazandırma.	class Vektor {\\npublic:\\n    int x, y;\\n    Vektor operator+(const Vektor& diger) const {\\n        return {x + diger.x, y + diger.y};\\n    }\\n};	20	orta	2026-10-17 01:19:51.359702	cpp_operator_overloading_friend,operator_plus,overload	f	operator anahtar kelimesiyle sınıf içi veya global operatör fonksiyonları yazılır.
531	backend	cpp	ders	Ders 26: Akış Operatörlerini Aşırı Yükleme (operator<< ve operator>>)	cout << nesne yazabilmek için std::ostream& referansı döndüren akış operatörünün tanımlanması.	#include <iostream>\\nclass Nokta {\\n    int x, y;\\npublic:\\n    friend std::ostream& operator<<(std::ostream& os, const Nokta& n) {\\n        return os << "(" << n.x << ", " << n.y << ")";\\n    }\\n};	20	orta	2026-10-17 01:19:51.359702	cpp_operator_overloading_friend,stream_insertion,cout	f	operator<< global veya friend fonksiyon olarak tanımlanmalıdır.
532	backend	cpp	ders	Ders 27: friend Fonksiyonlar ve Sınıflar	Bir sınıfın private ve protected üyelerine dışarıdan erişim izni veren friend bildirimi.	class Kutu {\\nprivate:\\n    int gizliSayi = 42;\\n    friend void casusFonksiyon(const Kutu& k);\\n};	20	orta	2026-10-17 01:19:51.359702	cpp_operator_overloading_friend,friend_function,friend_class	f	friend ilişkisi simetrik veya geçişli değildir; yalnızca bildirilen tarafa özel erişim sunar.
533	backend	cpp	ders	Ders 28: Fonksiyon Şablonları (Function Templates)	Farklı veri tipleri için tek bir fonksiyon gövdesi yazmayı sağlayan template<typename T> mimarisi.	template <typename T>\\nT enBuyuk(T a, T b) {\\n    return (a > b) ? a : b;\\n}	20	orta	2026-10-17 01:19:51.359702	cpp_templates_generic,templates,generic_functions	f	Derleyici çağrılan tipe göre derleme anında uygun fonksiyonu otomatik üretir (instantiation).
534	backend	cpp	ders	Ders 29: Sınıf Şablonları (Class Templates)	Herhangi bir veri tipini barındırabilen genel amaçlı yığın, kuyruk veya veri yapısı sınıfları tasarlama.	template <typename T>\\nclass Kutu {\\n    T veri;\\npublic:\\n    Kutu(T v) : veri(v) {}\\n    T al() const { return veri; }\\n};	20	orta	2026-10-17 01:19:51.359702	cpp_templates_generic,class_templates,generic_class	f	Kutu<int> ve Kutu<std::string> derleyici gözünde iki ayrı sınıftır.
535	backend	cpp	ders	Ders 30: Şablon Özelleştirme (Template Specialization)	Belirli bir tip (örneğin bool veya char*) için şablonun farklı ve optimize edilmiş bir versiyonunu sunma.	template <>\\nclass Kutu<bool> {\\n    // bool için bit seviyesinde optimize edilmiş özel gövde\\n};	25	zor	2026-10-17 01:19:51.359702	cpp_templates_generic,template_specialization,metaprogramming	f	Şablon özelleştirme özel durumlar veya performans optimizasyonları için kullanılır.
536	backend	cpp	ders	Ders 31: STL Sıralı Konteynerler: std::vector ve std::array	Dinamik boyutlu dizi (vector), sabit boyutlu güvenli dizi (array) ve push_back vs emplace_back farkı.	#include <vector>\\n#include <array>\\nstd::vector<int> v = {1, 2, 3};\\nv.push_back(4);\\nv.emplace_back(5); // Yerinde inşa eder	15	kolay	2026-10-17 01:19:51.359702	cpp_stl_modern_ozellikler,vector,array,stl	f	emplace_back geçici nesne kopyalama maliyetini önleyerek doğrudan bellek içinde nesneyi inşa eder.
537	backend	cpp	ders	Ders 32: STL İlişkisel Konteynerler: std::map ve std::unordered_map	Kırmızı-siyah ağaç tabanlı sıralı std::map (O(log N)) ile Hash tablosu tabanlı std::unordered_map (O(1)).	#include <unordered_map>\\nstd::unordered_map<std::string, int> notlar;\\nnotlar["Ali"] = 90;\\nnotlar["Ayşe"] = 95;	20	orta	2026-10-17 01:19:51.359702	cpp_stl_modern_ozellikler,map,unordered_map,hash_table	f	Sıralama şart değilse O(1) ortalama erişim süresi için std::unordered_map tercih edilir.
538	backend	cpp	ders	Ders 33: STL Algoritmaları ve İteratörler (std::sort, std::find)	<algorithm> kütüphanesi, begin(), end() iteratörleri ve konteynerler üzerinde yüksek performanslı işlemler.	#include <algorithm>\\n#include <vector>\\nstd::vector<int> v = {4, 1, 3, 2};\\nstd::sort(v.begin(), v.end());	20	orta	2026-10-17 01:19:51.359702	cpp_stl_modern_ozellikler,algorithms,iterators,sort	f	STL algoritmaları doğrudan konteynerleri değil, iteratör aralıklarını [first, last) kabul eder.
539	backend	cpp	ders	Ders 34: Lambda İfadeleri ve Capture List ([=], [&])	Modern C++11 anonim fonksiyonları (lambdas), kapsam değişkenlerini yakalama listesi ve std::sort ile kullanımı.	auto kareAl = [](int x) { return x * x; };\\nint esik = 50;\\nauto filtrele = [esik](int sayi) { return sayi > esik; };	25	zor	2026-10-17 01:19:51.359702	cpp_stl_modern_ozellikler,lambda,capture_list,closures	f	[=] çevredeki değişkenleri değer olarak kopyalar, [&] referans olarak yakalar.
540	backend	cpp	ders	Ders 35: C++20 / C++23 Modern Özellikler: Ranges, Concepts ve std::span	Modern C++20 ile gelen tip kısıtlayıcı Concepts, boru hattı tarzı | Ranges mimarisi ve sıfır maliyetli std::span.	#include <ranges>\\n#include <vector>\\n// auto ciftler = v | std::views::filter([](int x){ return x % 2 == 0; });	25	zor	2026-10-17 01:19:51.359702	cpp_stl_modern_ozellikler,cpp20,concepts,ranges,span	f	Concepts şablonlarda tip kısıtlamalarını derleme anında temiz hata mesajlarıyla sağlar.
541	backend	cpp	alistirma	Alıştırma 1: İki Sayının Değerlerini Referans ile Takas Etme	Pointer kullanmadan referans parametreleri (&) ile iki tamsayı değişkenin değerlerini yer değiştiren swap fonksiyonu yazın.	void takas(int& a, int& b) { /* kodunuz */ }	20	kolay	2026-10-17 01:19:51.372254	cpp_fonksiyonlar_referanslar,swap,references	t	Geçici üçüncü bir değişken kullanarak a ve b nin değerlerini takas edin.
542	backend	cpp	alistirma	Alıştırma 2: const auto& ile Dizi Elemanlarını Yazdırma	Verilen std::vector<int> nesnesini range-based for döngüsü ve const auto& kullanarak ekrana yazdırın.	void yazdir(const std::vector<int>& v) { /* kodunuz */ }	20	kolay	2026-10-17 01:19:51.372254	cpp_kontrol_donguler,range_for,vector	t	Döngüde: for (const auto& eleman : v) kalıbını kullanın.
543	backend	cpp	alistirma	Alıştırma 3: Dinamik Dizi Tahsisi ve Güvenli Temizleme	new int[N] ile bellek ayıran, elemanları dolduran ve delete[] ile temizleyen bellek güvenli kod bloğu oluşturun.	// Dinamik bellek tahsisi ve delete[] temizliği	25	orta	2026-10-17 01:19:51.372254	cpp_pointer_bellek,new_delete,dynamic_array	t	Dizi tahsisinde delete değil delete[] kullanılmalıdır.
544	backend	cpp	alistirma	Alıştırma 4: std::unique_ptr ile Nesne Yaşam Döngüsü	std::make_unique kullanarak bir sınıf nesnesi yaratın ve nesneyi std::move ile başka bir fonksiyona aktarın.	// unique_ptr ve std::move kullanımı	30	orta	2026-10-17 01:19:51.372254	cpp_smart_pointers_raii,unique_ptr,move	t	unique_ptr kopyalanamaz, sahiplik devri için std::move gerekir.
545	backend	cpp	alistirma	Alıştırma 5: Member Initializer List ile Sınıf Tasarımı	Kurucu metodunda üye başlatma listesi kullanan Kisi (ad, yas) sınıfı yazın.	class Kisi { /* kodunuz */ };	25	kolay	2026-10-17 01:19:51.372254	cpp_oop_siniflar_ctor,constructor,member_init_list	t	: ad(a), yas(y) sözdizimini kurucu fonksiyon imzasından sonra kullanın.
546	backend	cpp	alistirma	Alıştırma 6: Yıkıcı Metot ile Kaynak Yönetimi (RAII)	Kurucusunda dosya veya bellek açan, yıkıcısında (~Sinif) kaynağı otomatik serbest bırakan RAII sınıfı kodlayın.	class KaynakYoneticisi { /* RAII kodunuz */ };	30	orta	2026-10-17 01:19:51.372254	cpp_smart_pointers_raii,raii,destructor	t	Yıkıcı metot içinde açık olan işaretçiyi delete edin veya dosyayı kapatın.
547	backend	cpp	alistirma	Alıştırma 7: Virtual Fonksiyon ve Dinamik Polimorfizm	Temel Hayvan sınıfından miras alan Kedi sınıfında sesCikar() metodunu override edin.	class Kedi : public Hayvan { /* override */ };	30	orta	2026-10-17 01:19:51.372254	cpp_oop_kalitim_polymorphism,virtual,override	t	Temel sınıfta virtual olan fonksiyon türetilmiş sınıfta override anahtar kelimesiyle ezilir.
548	backend	cpp	alistirma	Alıştırma 8: Saf Sanal Fonksiyon ile Şekil Arayüzü	Alan() isimli saf sanal fonksiyona (= 0) sahip Sekil soyut sınıfı ve Dikdortgen türetilmiş sınıfı oluşturun.	class Sekil { virtual double alan() const = 0; };	30	zor	2026-10-17 01:19:51.372254	cpp_oop_kalitim_polymorphism,pure_virtual,abstract_class	t	Soyut sınıflardan türeyen sınıflar tüm saf sanal metotları ezmek zorundadır.
549	backend	cpp	alistirma	Alıştırma 9: operator+ ile Karmaşık Sayı Toplama	KarmasikSayi sınıfı için reel ve sanal kısımları toplayan operator+ aşırı yüklemesini gerçekleştirin.	KarmasikSayi operator+(const KarmasikSayi& diger) const { /* kod */ }	30	orta	2026-10-17 01:19:51.372254	cpp_operator_overloading_friend,operator_plus	t	Yeni bir KarmasikSayi nesnesi döndürün.
550	backend	cpp	alistirma	Alıştırma 10: friend operator<< ile Ekrana Basma	Nokta(x, y) sınıfını std::cout << n formatında yazdırabilmek için friend operator<< fonksiyonu tanımlayın.	friend std::ostream& operator<<(std::ostream& os, const Nokta& n);	30	orta	2026-10-17 01:19:51.372254	cpp_operator_overloading_friend,stream_insertion	t	Fonksiyon std::ostream& referansı döndürmelidir.
551	backend	cpp	alistirma	Alıştırma 11: Genel Amaçlı Şablon Takas (Template Swap)	Herhangi bir veri tipi T için çalışan genel amaçlı template <typename T> void genericSwap(T& a, T& b) fonksiyonu yazın.	template <typename T> void genericSwap(T& a, T& b) { /* kod */ }	30	orta	2026-10-17 01:19:51.372254	cpp_templates_generic,template_swap	t	std::move veya geçici değişken kullanarak takas edin.
552	backend	cpp	alistirma	Alıştırma 12: std::vector üzerinde Lambda ile Özel Sıralama	Öğrenci nesnelerinden oluşan bir vektörü notlarına göre büyükten küçüğe std::sort ve lambda ile sıralayın.	std::sort(ogrenciler.begin(), ogrenciler.end(), [](const auto& a, const auto& b){ return a.notu > b.notu; });	30	orta	2026-10-17 01:19:51.372254	cpp_stl_modern_ozellikler,lambda,sort	t	Lambda iki öğrenci alıp boolean dönmelidir.
553	backend	cpp	alistirma	Alıştırma 13: std::unordered_map ile Kelime Frekansı	Bir metin dizisindeki kelimelerin kaçar kez geçtiğini std::unordered_map kullanarak hesaplayın.	std::unordered_map<std::string, int> frekans; // kodunuz	30	orta	2026-10-17 01:19:51.372254	cpp_stl_modern_ozellikler,unordered_map,frequency	t	frekans[kelime]++ operatörü anahtar yoksa otomatik 0 başlatıp 1 artırır.
554	backend	cpp	alistirma	Alıştırma 14: std::shared_ptr Referans Sayacı İnceleme	std::make_shared ile üretilen bir işaretçinin use_count() değerinin kapsam içinde ve dışında değişimini test edin.	// shared_ptr use_count incelemesi	30	zor	2026-10-17 01:19:51.372254	cpp_smart_pointers_raii,shared_ptr,use_count	t	Yeni bir kopya atandığında use_count() artar, kapsam bitince azalır.
555	backend	cpp	alistirma	Alıştırma 15: Move Semantics ile Vektör Veri Taşıma	Büyük bir geçici std::vector nesnesini kopyalamadan std::move ile hedef nesneye sıfır maliyetle taşıyın.	// std::move vektör sahiplik transferi	35	zor	2026-10-17 01:19:51.372254	cpp_oop_siniflar_ctor,move_semantics,performance	t	std::move nesneyi rvalue referansa dönüştürür ve taşıma kurucusunu tetikler.
556	backend	cpp	mini_proje	Mini Proje 1: OOP Tabanlı Konsol Öğrenci Not Sistemi	Ogrenci ve Ders sınıfları tasarlayarak öğrencilerin not ortalamalarını hesaplayan ve harf notunu belirleyen OOP uygulaması.	// Proje Görevi: Ogrenci sınıfı (ad, soyad, vize, final) ve ortalamaHesapla() metodu.	50	orta	2026-10-17 01:19:51.372946	cpp_oop_siniflar_ctor,student_system	f	Vize %40, Final %60 ağırlıklandırma formülü uygulayın.
557	backend	cpp	mini_proje	Mini Proje 2: Akıllı İşaretçi Destekli Banka Hesap Yöneticisi	std::unique_ptr ve std::shared_ptr kullanarak bellek sızıntısı riski taşımayan hesap ve müşteri portföy motoru.	// Proje Görevi: Hesap sınıfı, paraYatir, paraCek ve make_unique ile oluşturulan müşteri listesi.	60	orta	2026-10-17 01:19:51.372946	cpp_smart_pointers_raii,banking_smart_ptr	f	Raw pointer (çıplak işaretçi) kullanmayın, tüm nesneleri smart pointer ile yönetin.
558	backend	cpp	mini_proje	Mini Proje 3: STL Tabanlı Arama ve İndeksleme Motoru	std::unordered_map ve std::vector kullanarak metin içindeki kelimeleri indeksleyen ve anlık arama yapan motor.	// Proje Görevi: Kelime bazlı ters indeks (inverted index) veri yapısı geliştirin.	65	orta	2026-10-17 01:19:51.372946	cpp_stl_modern_ozellikler,inverted_index,stl	f	Her kelime için o kelimenin geçtiği satır numaralarını tutan std::vector<int> kullanın.
559	backend	cpp	mini_proje	Mini Proje 4: Dinamik Matris Sınıfı ve Operator Overloading	2B dinamik bellek yönetimi yapan, Rule of 5 (Kopya/Taşıma kurucuları ve atamaları) uygulayan ve +, *, << operatörlerini aşırı yükleyen Matris sınıfı.	// Proje Görevi: Matris carpimi ve toplami icin operator+ ve operator* asiri yuklemesi.	75	zor	2026-10-17 01:19:51.372946	cpp_operator_overloading_friend,matrix_class,rule_of_five	f	Dinamik 2B diziyi tek boyutlu 1D dizi (satir * SutunSayisi + sutun) olarak modellemek önbellek performansını artırır.
560	backend	cpp	mini_proje	Mini Proje 5: Çok Biçimli (Polymorphic) Çizim ve Oyun Varlıkları Motoru	Soyut OyunVarligi sınıfından türeyen Oyuncu, Dusman ve Engel sınıflarını std::vector<std::unique_ptr<OyunVarligi>> içinde polimorfik olarak güncelleyen motor.	// Proje Görevi: virtual void guncelle() = 0 ve virtual void ciz() metotlari.	80	zor	2026-10-17 01:19:51.372946	cpp_oop_kalitim_polymorphism,game_engine,polymorphism	f	Vektör içinde temel sınıfın unique_ptr referanslarını tutarak dinamik dispatch sağlayın.
561	backend	cpp	mini_proje	Mini Proje 6: Yüksek Başarımlı Sipariş İşleme Motoru (C++ Capstone)	Modern C++20 standartlarında (Ranges, Lambda, RAII, Exception Handling, STL) çalışan kurumsal e-ticaret sipariş işleme ve doğrulama motoru.	// Proje Görevi: Siparis, Urun, Sepet ve SiparisIsleyici sınıflarını içeren uçtan uca modern C++ mimarisi.	100	zor	2026-10-17 01:19:51.372946	cpp_stl_modern_ozellikler,ecommerce_capstone,modern_cpp	f	Tüm sınıfları temiz header/source ayrımı, const doğruluğu ve modern C++ idiomlarıyla kurgulayın.
\.


--
-- Data for Name: ai_chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ai_chats (id, user_id, log_id, ai_answer, created_at) FROM stdin;
\.


--
-- Data for Name: code_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.code_logs (id, user_id, lesson_id, code, error_msg, exec_time) FROM stdin;
\.


--
-- Data for Name: duels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.duels (id, subcategory, challenger_id, opponent_id, question_ids, challenger_score, opponent_score, winner_id, status, points_awarded, created_at, completed_at) FROM stdin;
1	html	3	2	{35,48,38,84,54}	4	3	3	completed	50	2026-10-17 01:40:30.44276	2026-10-17 01:40:30.448721
\.


--
-- Data for Name: friendships; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.friendships (id, user_id, friend_id, status, created_at) FROM stdin;
2	3	2	accepted	2026-10-17 01:40:30.438735
\.


--
-- Data for Name: leagues; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leagues (id, league_name, min_points, max_points, badge_icon) FROM stdin;
1	Cirak	0	199	🔰
2	Kalfa	200	499	⚡
3	Usta	500	999	🔥
4	Buyuk Usta	1000	2499	💎
5	Efsane	2500	99999	👑
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons (id, category, lesson_id, title, description, content, created_at) FROM stdin;
\.


--
-- Data for Name: mentor_feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mentor_feedback (id, mentor_id, student_id, activity_id, feedback_text, code_snippet, rating, created_at) FROM stdin;
1	10	1	\N	Proje mimariniz ve soru havuzu ayrımı çok başarılı. Algoritma optimizasyonuna devam edin.	\N	5	2026-10-17 01:57:22.056896
\.


--
-- Data for Name: mentor_students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mentor_students (id, mentor_id, student_id, project_name, status, created_at) FROM stdin;
1	10	1	TUBITAK 2242 Sokratik Yazilim	active	2026-10-17 01:57:22.05127
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quizzes (id, category, subcategory, question, option_a, option_b, option_c, option_d, correct_answer, difficulty, created_at, topic, tags, related_lesson_id) FROM stdin;
16	frontend	html	Bir HTML sayfasında tarayıcıya "Bu HTML5 belgesidir" diye bildiren etiket hangisidir?	<!DOCTYPE html>	<html lang="tr">	<meta charset="UTF-8">	<head>	A	kolay	2026-10-14 20:02:06.213675	iskelet	iskelet,temel,doctype	17
17	frontend	html	Kullanıcıya görünen tüm içerik (yazı, resim, buton) hangi etiketin içine yazılır?	<head>	<body>	<meta>	<html>	B	kolay	2026-10-14 20:02:06.213675	iskelet	iskelet,temel,doctype	17
19	frontend	html	Türkçe karakterlerin (ş, ğ, ç) bozulmaması için hangi meta etiketi kullanılır?	<meta lang="tr">	<meta encoding="tr">	<meta type="turkish">	<meta charset="UTF-8">	D	kolay	2026-10-14 20:02:06.213675	meta_seo	meta,seo,head,title	18
20	frontend	html	Sitenin mobil cihazlarda düzgün görünmesi için hangi meta etiketi zorunludur?	<meta name="viewport" content="width=device-width, initial-scale=1.0">	<meta name="screen">	<meta name="mobile">	<meta type="responsive">	A	orta	2026-10-14 20:02:06.213675	meta_seo	meta,seo,head,title	18
21	frontend	html	Arama motorlarının (Google) sayfayı tanıması için özet açıklama hangi etikette yazılır?	<title>	<meta name="description">	<meta name="keywords">	<header>	B	orta	2026-10-14 20:02:06.213675	meta_seo	meta,seo,head,title	18
23	frontend	html	Aşağıdaki başlık etiketlerinden hangisi en küçük boyuttadır?	<h1>	<h3>	<h4>	<h6>	D	kolay	2026-10-14 20:02:06.213675	basliklar	h1,h6,baslik,seo	19
24	frontend	html	h1-h6 etiketleri arasında doğru hiyerarşi nasıl olmalıdır?	h1 en b├╝y├╝k h6 en k├╝├ğ├╝k olup b├╝y├╝kten k├╝├ğ├╝─şe s─▒ra izlenmelidir	Rastgele kullan─▒labilir s─▒ra ├Ânemli de─şildir	h6 en büyük h1 en küçüktür	Hepsi aynı boyuttadır sadece numaraları farklıdır	A	orta	2026-10-14 20:02:06.213675	basliklar	h1,h6,baslik,seo	19
25	frontend	html	Yeni bir paragraf açmadan sadece alt satıra geçmek için hangi etiket kullanılır?	<p>	<br>	<hr>	<nl>	B	kolay	2026-10-14 20:02:06.213675	paragraf_satir	paragraf,p,br,hr,pre	20
26	frontend	html	<hr> etiketi ne işe yarar?	Yeni paragraf a├ğar	Kalın metin yazar	Yatay ├ğizgi ekler b├Âl├╝mleri birbirinden ay─▒r─▒r	Sayfa başlığı ekler	C	kolay	2026-10-14 20:02:06.213675	paragraf_satir	paragraf,p,br,hr,pre	20
27	frontend	html	Kod bloğu veya şiir gibi boşlukları ve satır sonlarını aynen koruyan etiket hangisidir?	<code>	<blockquote>	<p>	<pre>	D	orta	2026-10-14 20:02:06.213675	paragraf_satir	paragraf,p,br,hr,pre	20
28	frontend	html	Metni kalın yazmak için anlamsal (semantik) olarak doğru etiket hangisidir?	<strong>	<bold>	<b>	<thick>	A	kolay	2026-10-14 20:02:06.213675	metin_vurgulari	strong,em,mark,del,stil	21
31	frontend	html	Aynı sayfa içindeki bir bölüme atlamak için href değeri nasıl yazılır?	href="bolum1"	href="@bolum1"	href=".bolum1"	href="#bolum1"	D	kolay	2026-10-14 20:02:06.213675	linkler	link,a,href,capa,id	39
32	frontend	html	Göreceli (relative) link ile mutlak (absolute) link arasındaki temel fark nedir?	G├Âreceli link mevcut site i├ğinde ├ğal─▒┼ş─▒r mutlak link tam URL i├ğerir	Hi├ğbir fark yoktur	Mutlak link daha hızlı çalışır	Göreceli linkler sadece CSS dosyaları için kullanılır	A	orta	2026-10-14 20:02:06.213675	linkler	link,a,href,capa,id	39
34	frontend	html	Linki yeni sekmede açarken güvenlik açığını kapatmak için ne eklenir?	rel="safe"	target="_safe"	rel="noopener noreferrer"	secure="true"	C	orta	2026-10-14 20:02:06.213675	sekme_yonetimi	target,blank,guvenlik,download	40
35	frontend	html	Bir dosyanın tarayıcıda açılmak yerine indirilmesini sağlayan nitelik hangisidir?	save	get	export	download	D	kolay	2026-10-14 20:02:06.213675	sekme_yonetimi	target,blank,guvenlik,download	40
36	frontend	html	target="_self" ne anlama gelir?	Linki ayn─▒ sekmede a├ğar (varsay─▒lan davran─▒┼ş)	Linki yeni pencerede açar	Linki yeni sekmede a├ğar	Linki gizler	A	orta	2026-10-14 20:02:06.213675	sekme_yonetimi	target,blank,guvenlik,download	40
37	frontend	html	Sıralı (numaralı) liste oluşturmak için hangi etiket kullanılır?	<ul>	<ol>	<li>	<dl>	B	kolay	2026-10-14 20:02:06.213675	listeler	liste,ul,ol,li,menu	41
18	frontend	html	Aşağıdakilerden hangisi geçerli bir HTML5 iskelet sıralamasıdır?	body > html > head	html > body > head	DOCTYPE > html > head > body	head > body > html	C	kolay	2026-10-14 20:02:06.213675	iskelet	iskelet,temel,doctype	17
38	frontend	html	Tanım listeleri için kullanılan etiket grubu hangisidir?	<list> ve <item>	<ul> ve <li>	<dl> ve <dt> ve <dd>	<ol> ve <li>	C	orta	2026-10-14 20:02:06.213675	listeler	liste,ul,ol,li,menu	41
39	frontend	html	İç içe geçmiş (nested) liste nasıl oluşturulur?	İki ul etiketini yan yana koyarak	M├╝mk├╝n de─şildir	nested="true" niteliği kullanarak	Bir li etiketinin i├ğine yeni bir ul etiketi a├ğarak	D	orta	2026-10-14 20:02:06.213675	listeler	liste,ul,ol,li,menu	41
40	frontend	html	Görme engelli kullanıcılar ve Google için resim açıklaması hangi nitelikte yazılır?	alt	src	title	desc	A	kolay	2026-10-14 20:02:06.213675	gorseller	resim,img,alt,seo,lazy	42
22	frontend	html	SEO açısından bir sayfada kaç adet H1 etiketi olmalıdır?	İstediğimiz kadar	En az 3	Sadece 1	Hiç olmamalı	C	kolay	2026-10-14 20:02:06.213675	basliklar	h1,h6,baslik,seo	19
311	backend	csharp	C# 9 ve sonrasında gelen Top-Level Statements özelliğinin temel amacı nedir?	Program.cs dosyasında Main metodu ve sınıf tanımlama zorunluluğunu kaldırıp temiz kod yazmayı sağlamak	Tüm değişkenleri otomatik global yapmak	Derleyiciyi devre dışı bırakmak	Bellek kullanımını iki katına çıkarmak	A	kolay	2026-10-16 23:58:17.475165	cs_temeller	csharp,cs_temeller,quiz	394
312	backend	csharp	C# ta int ve double tipleri belleğin hangi bölgesinde ve nasıl tutulur?	Her ikisi de sadece Heap te tutulur	Değer tipi (Value Type) olup yerel değişken olarak Stack te tutulur	Yalnızca veritabanında tutulur	Statik bellek havuzunda tutulur	B	kolay	2026-10-16 23:58:17.488508	cs_temeller	csharp,cs_temeller,quiz	395
392	backend	cpp	auto x = 3.14; ifadesinde derleyici x değişkeninin tipini ne olarak belirler?	float	double	int	auto_type	B	kolay	2026-10-17 01:19:51.373673	cpp_temeller_io	auto,type_deduction	507
29	frontend	html	<mark> etiketi metnin görünümünü nasıl değiştirir?	Üstünü çizer	Sarı arka plan ile vurgular	Kalın yapar	Gizler	B	kolay	2026-10-14 20:02:06.213675	metin_vurgulari	strong,em,mark,del,stil	21
30	frontend	html	Üstü çizili metin oluşturmak (indirim öncesi fiyat gibi) için hangi etiket kullanılır?	<strike>	<cross>	<del>	<s>	C	kolay	2026-10-14 20:02:06.213675	metin_vurgulari	strong,em,mark,del,stil	21
33	frontend	html	<a> etiketinin href niteliği boş bırakılırsa ne olur?	Hata verir	Sayfanın en üstüne gider	Sayfa yenilenir	Hiçbir şey olmaz link çalışmaz	B	orta	2026-10-14 20:02:06.213675	linkler	link,a,href,capa,id	39
41	frontend	html	loading="lazy" niteliği ne işe yarar?	Sayfayı yavaşlatır	Resmi ekrana gelene kadar yüklemez sayfa performansını artırır	Resmi gizler	Resmi animasyonlu yükler	B	orta	2026-10-14 20:02:06.213675	gorseller	resim,img,alt,seo,lazy	42
46	frontend	html	Tabloda başlık hücresi oluşturmak için td yerine hangi etiket kullanılır?	<title>	<header>	<th>	<caption>	C	kolay	2026-10-14 20:02:06.213675	tablolar_temel	tablo,table,tr,td,th	50
47	frontend	html	Tablo satırı oluşturmak için hangi etiket kullanılır?	<td>	<row>	<line>	<tr>	D	kolay	2026-10-14 20:02:06.213675	tablolar_temel	tablo,table,tr,td,th	50
48	frontend	html	Bir tabloda tüm satırları sarmak için en dıştaki etiket hangisidir?	<table>	<tr>	<td>	<tbody>	A	kolay	2026-10-14 20:02:06.213675	tablolar_temel	tablo,table,tr,td,th	50
49	frontend	html	Tablonun altbilgi satırını (Toplam, Genel Toplam gibi) hangi etiket içine yazarız?	<footer>	<tfoot>	<thead>	<bottom>	B	orta	2026-10-14 20:02:06.213675	tablolar_semantik	tablo,thead,tbody,tfoot,caption	51
51	frontend	html	Neden thead ve tbody ayrımı yapılır?	Sadece görsel amaçlıdır zorunlu değildir	Performans i├ğin zorunludur	Tarayıcılar aksi halde tabloyu okuyamaz	Ekran okuyucular ve CSS stillendirmesi i├ğin anlamsal yap─▒ sa─şlar	D	orta	2026-10-14 20:02:06.213675	tablolar_semantik	tablo,thead,tbody,tfoot,caption	51
52	frontend	html	colspan="3" niteliği ne anlama gelir?	H├╝cre 3 s├╝tunu kaplar	H├╝cre 3 sat─▒r─▒ kaplar	Hücre 3 piksel genişliğinde olur	3 yeni hücre ekler	A	kolay	2026-10-14 20:02:06.213675	tablolar_colspan	tablo,colspan,birlestir,sutun	52
55	frontend	html	rowspan="2" niteliği ne anlama gelir?	Hücre 2 sütunu kaplar	H├╝cre 2 kez tekrar edilir	2 yeni satır ekler	H├╝cre 2 sat─▒r─▒ kaplar	D	kolay	2026-10-14 20:02:06.213675	tablolar_rowspan	tablo,rowspan,birlestir,satir	53
56	frontend	html	rowspan kullanan hücrenin alt satırından ne kadar hücre çıkarılmalıdır?	rowspan de─şerinden 1 eksik kadar h├╝cre ├ğ─▒kar─▒l─▒r	Hi├ğbir ┼şey ├ğ─▒kar─▒lmaz	Tüm hücreler çıkarılır	İki kat hücre eklenir	A	zor	2026-10-14 20:02:06.213675	tablolar_rowspan	tablo,rowspan,birlestir,satir	53
58	frontend	html	label for="email" ile input id="email" eşleştirmesinin amacı nedir?	Sadece CSS için gereklidir	Form g├Ânderimini sa─şlar	Kullan─▒c─▒ etikete t─▒klad─▒─ş─▒nda ilgili input otomatik odaklan─▒r (eri┼şilebilirlik)	Zorunludur yoksa form çalışmaz	C	orta	2026-10-14 20:02:06.213675	formlar_temel	form,label,action,method,input	59
59	frontend	html	GET ve POST metodları arasındaki temel fark nedir?	GET daha güvenlidir	POST daha hızlıdır	Aralar─▒nda hi├ğbir fark yoktur	GET veriyi URL ├╝zerinden g├Ânderir POST gizli g├Ânderir	D	orta	2026-10-14 20:02:06.213675	formlar_temel	form,label,action,method,input	59
61	frontend	html	Şifre alanının girdiyi gizlemesi için hangi type değeri kullanılır?	type="hidden"	type="password"	type="secret"	type="private"	B	kolay	2026-10-14 20:02:06.213675	formlar_input	input,text,password,email,name	60
62	frontend	html	placeholder niteliği ne işe yarar?	Varsayılan değer olarak forma gönderilir	Label yerine kullan─▒l─▒r	Alan bo┼şken kullan─▒c─▒ya ipucu g├Âsteren a├ğ─▒k renkli metin	Alanı salt okunur yapar	C	kolay	2026-10-14 20:02:06.213675	formlar_input	input,text,password,email,name	60
63	frontend	html	type="email" kullanmanın type="text" e göre avantajı nedir?	Daha hızlı çalışır	Sadece harf kabul eder	G├╝venli ba─şlant─▒ kurar	Taray─▒c─▒ @ i┼şareti olup olmad─▒─ş─▒n─▒ otomatik do─şrular	D	orta	2026-10-14 20:02:06.213675	formlar_input	input,text,password,email,name	60
50	frontend	html	Tabloya başlık açıklaması eklemek için hangi etiket kullanılır?	<title>	<summary>	<caption>	<label>	C	kolay	2026-10-14 20:02:06.213675	tablolar_semantik	tablo,thead,tbody,tfoot,caption	51
64	frontend	html	Kullanıcının birden fazla seçenek işaretleyebilmesi için hangi input türü kullanılır?	checkbox	select	radio	option	A	kolay	2026-10-14 20:02:06.213675	formlar_secim	radio,checkbox,select,option	61
65	frontend	html	Radio butonların bir grup oluşturması ve tek seçim yapılabilmesi için ne aynı olmalıdır?	id değerleri	name de─şerleri	value de─şerleri	type değerleri	B	orta	2026-10-14 20:02:06.213675	formlar_secim	radio,checkbox,select,option	61
53	frontend	html	colspan kullandığımızda aynı satırdaki diğer hücreler ne olur?	Silinir	Birleştirilen sütun sayısı kadar hücre azaltılır	Otomatik genişler	Taşar	B	orta	2026-10-14 20:02:06.213675	tablolar_colspan	tablo,colspan,birlestir,sutun	52
67	frontend	html	textarea ile input type="text" arasındaki temel fark nedir?	textarea sadece sayı kabul eder	Hi├ğbir fark yoktur	input daha büyük veri tutar	textarea ├ğok sat─▒rl─▒ metin giri┼şine izin verir	D	kolay	2026-10-14 20:02:06.213675	formlar_buton	textarea,button,submit,fieldset	62
68	frontend	html	<button type="reset"> ne yapar?	T├╝m form alanlar─▒n─▒ ba┼şlang─▒├ğ de─şerlerine d├Ând├╝r├╝r	Sayfayı yeniler	Formu sunucuya g├Ânderir	Formu siler	A	kolay	2026-10-14 20:02:06.213675	formlar_buton	textarea,button,submit,fieldset	62
71	frontend	html	type="range" ile ne oluşturulur?	Renk paleti	Say─▒ yazma alan─▒	Tarih aralığı	S├╝r├╝klenebilir kayd─▒rma ├ğubu─şu (slider)	D	kolay	2026-10-14 20:02:06.213675	formlar_html5	html5,date,color,range,file	63
72	frontend	html	Kullanıcının birden fazla dosya seçebilmesi için file input nasıl düzenlenir?	multiple niteli─şi eklenir	type="files" yazılır	count="multiple" eklenir	max="10" eklenir	A	orta	2026-10-14 20:02:06.213675	formlar_html5	html5,date,color,range,file	63
73	frontend	html	Alanın boş geçilememesi için hangi nitelik kullanılır?	validate	required	mandatory	notblank	B	kolay	2026-10-14 20:02:06.213675	formlar_validation	validation,dogrulama,required,pattern	64
74	frontend	html	Bir şifre alanında en az 8 karakter zorunluluğu nasıl sağlanır?	min="8"	length="8"	minlength="8"	size="8"	C	orta	2026-10-14 20:02:06.213675	formlar_validation	validation,dogrulama,required,pattern	64
76	frontend	html	Sayfa navigasyonunu (menüyü) sarmak için hangi semantik etiket kullanılır?	<nav>	<navigation>	<menu>	<links>	A	kolay	2026-10-14 20:02:06.213675	semantik_layout	semantik,header,nav,main,section,footer	71
313	backend	csharp	var anahtar kelimesi ile object tipi arasındaki en temel fark nedir?	Hiçbir fark yoktur ikisi de aynıdır	object derleme zamanında tip belirler	var derleme zamanında (compile-time) tipini sabitler, object ise çalışma zamanında kutulama (boxing) yapar	var sadece sayılarda kullanılır	C	kolay	2026-10-16 23:58:17.489072	cs_temeller	csharp,cs_temeller,quiz	396
66	frontend	html	select içinde seçenekleri kategorilere ayırmak için hangi etiket kullanılır?	<category>	<group>	<optgroup>	<section>	C	orta	2026-10-14 20:02:06.213675	formlar_secim	radio,checkbox,select,option	61
70	frontend	html	Kullanıcının takvimden tarih seçmesi için hangi input türü kullanılır?	type="calendar"	type="picker"	type="date"	type="datetime"	C	kolay	2026-10-14 20:02:06.213675	formlar_html5	html5,date,color,range,file	63
77	frontend	html	aside etiketi ne tür içerik için kullanılır?	Sayfanın ana içeriği	Ana içerikle ilişkili ama bağımsız yan içerik (reklam, biyografi)	Altbilgi alanı	Navigasyon menüsü	B	orta	2026-10-14 20:02:06.213675	semantik_layout	semantik,header,nav,main,section,footer	71
79	frontend	html	Tarayıcının videoyu otomatik oynaması için autoplay yanına hangi nitelik zorunludur?	silent	noaudio	quiet	muted	D	orta	2026-10-14 20:02:06.213675	medya_audio_video	video,audio,medya,multimedya	72
82	frontend	html	iframe içindeki sandbox niteliği ne işe yarar?	iframe yi hızlandırır	iframe yi gizler	G├Âm├╝len i├ğeri─şin yapabilece─şi i┼şlemleri k─▒s─▒tlayarak g├╝venli─şi art─▒r─▒r	Tam ekran yapar	C	orta	2026-10-14 20:02:06.213675	iframe_guvenlik	iframe,youtube,harita,sandbox,guvenlik	73
83	frontend	html	YouTube videosu sayfaya nasıl gömülür?	video etiketiyle	img etiketiyle	script etiketiyle	iframe ve YouTube embed linki ile	D	kolay	2026-10-14 20:02:06.213675	iframe_guvenlik	iframe,youtube,harita,sandbox,guvenlik	73
84	frontend	html	iframe ile gömülen harici sayfanın boyutu nasıl ayarlanır?	width ve height nitelikleri veya CSS ile	Ayarlanamaz	Sadece CSS ile	Sadece JavaScript ile	A	kolay	2026-10-14 20:02:06.213675	iframe_guvenlik	iframe,youtube,harita,sandbox,guvenlik	73
85	frontend	html	Sıfır JavaScript ile açılıp kapanan akordiyon için hangi etiket çifti kullanılır?	accordion ve item	details ve summary	collapse ve expand	toggle ve content	B	kolay	2026-10-14 20:02:06.213675	details_dialog	details,summary,dialog,popup,akordiyon	74
86	frontend	html	<dialog open> yazıldığında ne olur?	Dialog gizlenir	Dialog animasyonla a├ğ─▒l─▒r	Dialog sayfada g├Âr├╝n├╝r olarak a├ğ─▒l─▒r	Hata verir	C	orta	2026-10-14 20:02:06.213675	details_dialog	details,summary,dialog,popup,akordiyon	74
88	frontend	html	WhatsApp veya Twitter da link paylaşıldığında görünen önizleme görseli hangi meta etiketiyle belirlenir?	<meta property="og:image">	<meta name="image">	<meta name="thumbnail">	<link rel="preview">	A	orta	2026-10-14 20:02:06.213675	opengraph_seo	opengraph,og,seo,sosyalmedya,meta	75
91	frontend	css	CSS yazmanın 3 yolundan hangisi en yüksek önceliğe (specificity) sahiptir?	Harici .css dosyası	style etiketi (internal)	Hepsi e┼şit ├Ânceliktedir	Inline style niteli─şi	D	kolay	2026-10-14 20:48:04.982268	css_giris	css,baglama,link,style,inline	83
92	frontend	css	Harici CSS dosyasını HTML belgesine bağlamak için hangi etiket kullanılır?	<link rel="stylesheet" href="style.css">	<css href="style.css">	<style src="style.css">	<script src="style.css">	A	kolay	2026-10-14 20:48:04.982268	css_giris	css,baglama,link,style,inline	83
94	frontend	css	.kutu ve #kutu seçicilerinden hangisinin özgüllüğü (specificity) daha yüksektir?	.kutu (class)	─░kisi de e┼şittir	#kutu (id)	Element türüne göre değişir	C	kolay	2026-10-14 20:48:04.982268	seciciler_temel	secici,class,id,element,specificity	84
95	frontend	css	Sayfadaki tüm p etiketlerini seçmek için doğru CSS seçici hangisidir?	#p	.p	*p	p	D	kolay	2026-10-14 20:48:04.982268	seciciler_temel	secici,class,id,element,specificity	84
98	frontend	css	h2 + p seçicisi neyi ifade eder?	h2 içindeki tüm p etiketlerini	h2 den sonra gelen t├╝m karde┼ş p etiketlerini	h2 den hemen sonra gelen ilk karde┼ş p etiketini	h2 ve p etiketlerinin birleşimini	C	orta	2026-10-14 20:48:04.982268	seciciler_kombinator	secici,torun,cocuk,kardes,kombinator	85
100	frontend	css	rgba(0, 0, 0, 0.5) renk tanımında son değer (0.5) neyi ifade eder?	Opakl─▒k / Alfa ┼şeffafl─▒k oran─▒	Parlakl─▒k derecesi	Doygunluk oranı	Mavi renk tonu	A	kolay	2026-10-14 20:48:04.982268	renkler	renk,hex,rgb,rgba,hsl,renk_paleti	86
102	frontend	css	#FF0000 HEX renk kodu hangi rengi verir?	Tam Mavi	Tam Yeşil	Tam K─▒rm─▒z─▒	Tam Siyah	C	kolay	2026-10-14 20:48:04.982268	renkler	renk,hex,rgb,rgba,hsl,renk_paleti	86
103	frontend	css	background-size: cover özelliğinin davranışı nedir?	Resmi hiç kırpmadan orijinal boyutunda tutar	Resmi sadece yatayda uzat─▒r	Resmi sayfaya 4 kez tekrar eder	Resmi kutuyu tamamen kaplayacak ┼şekilde orant─▒l─▒ b├╝y├╝t├╝r ve gerekirse ta┼şan k─▒sm─▒ k─▒rpar	D	orta	2026-10-14 20:48:04.982268	arkaplan	arkaplan,background,cover,image	87
104	frontend	css	Sayfa kaydırıldığında arka plan görselinin sabit kalması için hangi özellik kullanılır?	background-attachment: fixed	background-position: fixed	background-repeat: no-repeat	background-scroll: none	A	orta	2026-10-14 20:48:04.982268	arkaplan	arkaplan,background,cover,image	87
89	frontend	html	og:title meta etiketi ne işe yarar?	Tarayıcı sekmesindeki başlığı belirler	Sosyal medyada paylaşıldığında önizleme kartındaki başlığı belirler	Google arama başlığını belirler	Sayfa içindeki H1 i değiştirir	B	orta	2026-10-14 20:02:06.213675	opengraph_seo	opengraph,og,seo,sosyalmedya,meta	75
106	frontend	css	Soldan sağa doğru iki renkli yumuşak geçiş yapmak için hangisi kullanılır?	linear-gradient(bottom, red, blue)	radial-gradient(right, red, blue)	linear-gradient(to right, red, blue)	color-gradient(to right, red, blue)	C	orta	2026-10-14 20:48:04.982268	gradyan	gradient,gecis,linear,radial,renk	88
107	frontend	css	Merkezden dışa doğru dairesel renk geçişi sağlayan fonksiyon hangisidir?	linear-gradient()	conic-gradient()	circle-gradient()	radial-gradient()	D	kolay	2026-10-14 20:48:04.982268	gradyan	gradient,gecis,linear,radial,renk	88
97	frontend	css	div > p seçicisi hangi elemanları hedefler?	div içindeki tüm p elemanlarını (torunlar dahil)	Sadece div in doğrudan çocuğu (direct child) olan p elemanlarını	div den sonra gelen tüm p kardeşlerini	div ve p etiketlerinin hepsini	B	orta	2026-10-14 20:48:04.982268	seciciler_kombinator	secici,torun,cocuk,kardes,kombinator	85
108	frontend	css	Bir metnin içini gradient boyamak için background-clip değeri ne olmalıdır?	background-clip: text	background-clip: border-box	background-clip: padding-box	background-clip: content-box	A	zor	2026-10-14 20:48:04.982268	gradyan	gradient,gecis,linear,radial,renk	88
314	backend	csharp	Büyük bir veri tipini (örneğin double) daha küçük bir tipe (int) dönüştürürken ne kullanılır?	Otomatik aktarım	dynamic	String.Format	Açık dönüşüm (Explicit Casting: (int)deger)	D	kolay	2026-10-16 23:58:17.489548	cs_temeller	csharp,cs_temeller,quiz	397
101	frontend	css	HSL renk formatında "S" harfi neyi temsil eder?	Shade (Gölge)	Saturation (Doygunluk)	Shadow (Yansıma)	Spectrum (Işık)	B	orta	2026-10-14 20:48:04.982268	renkler	renk,hex,rgb,rgba,hsl,renk_paleti	86
315	backend	csharp	int.TryParse(girdi, out int sayi) metodunun int.Parse metoduna göre en büyük avantajı nedir?	Geçersiz formatta FormatException fırlatmak yerine geriye false döndürerek programın çökmesini önler	Sayının iki katını otomatik hesaplar	Sadece pozitif sayılarda çalışır	Veritabanına doğrudan kayıt atar	A	kolay	2026-10-16 23:58:17.490049	cs_temeller	csharp,cs_temeller,quiz	398
109	frontend	css	1rem ölçü birimi neyi referans alır?	En yakın üst elemanın font boyutunu	Kök elemanın (html) font boyutunu	Tarayıcının pencere genişliğini	Ekranın piksel yoğunluğunu	B	kolay	2026-10-14 20:48:04.982268	tipografi	font,yazi,tipografi,fontsize,googlefonts	89
110	frontend	css	Satırlar arası mesafeyi belirlemek için hangi CSS özelliği kullanılır?	letter-spacing	word-spacing	line-height	text-indent	C	kolay	2026-10-14 20:48:04.982268	tipografi	font,yazi,tipografi,fontsize,googlefonts	89
112	frontend	css	Tüm metni otomatik olarak BÜYÜK HARFE çevirmek için hangisi kullanılır?	text-transform: uppercase	font-case: upper	text-decoration: uppercase	text-align: uppercase	A	kolay	2026-10-14 20:48:04.982268	metin_efektleri	metin,textalign,shadow,decoration,transform	90
115	frontend	css	box-sizing: border-box kullanıldığında padding ve border nereye dahil edilir?	Kutunun dışına eklenir ve kutuyu büyütür	Yaln─▒zca i├ğeri─şi k├╝├ğ├╝lt├╝r geni┼şli─şi etkilemez	Margin değerinden düşülür	Kutunun belirlenen width ve height de─şerinin i├ğine dahil edilir	D	orta	2026-10-14 20:48:04.982268	box_model	boxmodel,padding,margin,border,boxsizing	97
118	frontend	css	Bir kutunun köşelerini tam yuvarlak yapmak için border-radius ne verilir?	border-radius: 100px	border-radius: round	border-radius: 50%	border-radius: circle	C	kolay	2026-10-14 20:48:04.982268	border_shadow	border,radius,outline,shadow,yuvarlak	98
119	frontend	css	outline ile border arasındaki en temel fark nedir?	outline renk alamaz	outline k├Â┼şeleri yuvarlat─▒lamaz	border sadece kesikli çizgi olur	outline kutunun kaplad─▒─ş─▒ alana ve boyuta etki etmez (yer kaplamaz)	D	orta	2026-10-14 20:48:04.982268	border_shadow	border,radius,outline,shadow,yuvarlak	98
120	frontend	css	Kutunun dışına gölge vermek için hangi özellik kullanılır?	box-shadow	text-shadow	element-shadow	drop-border	A	kolay	2026-10-14 20:48:04.982268	border_shadow	border,radius,outline,shadow,yuvarlak	98
121	frontend	css	display: inline elemanlar hakkında hangisi doğrudur?	Her zaman yeni bir sat─▒r ba┼şlat─▒rlar	Geni┼şlik (width) ve y├╝kseklik (height) de─şerlerini kabul etmezler	Varsayılan olarak yüzde 100 genişlik alırlar	Dikey marginleri normal şekilde uygulanır	B	orta	2026-10-14 20:48:04.982268	display	display,block,inline,none,visibility	99
123	frontend	css	Hem yan yana durabilen hem de width/height alabilen display değeri hangisidir?	block	inline	flex-inline	inline-block	D	kolay	2026-10-14 20:48:04.982268	display	display,block,inline,none,visibility	99
124	frontend	css	position: absolute olan bir eleman konumunu (top, left) neye göre referans alır?	static olmayan en yak─▒n ├╝st (ancestor) eleman─▒na g├Âre	Her zaman do─şrudan body etiketine g├Âre	Kendi orijinal durduğu yere göre	Tarayıcının son kaydırma konumuna göre	A	orta	2026-10-14 20:48:04.982268	position	position,relative,absolute,fixed,sticky,zindex	100
125	frontend	css	Sayfa kaydırılsa dahi ekran penceresine göre hep aynı yerde kalan konumlandırma hangisidir?	position: relative	position: fixed	position: absolute	position: static	B	kolay	2026-10-14 20:48:04.982268	position	position,relative,absolute,fixed,sticky,zindex	100
127	frontend	css	Bir görselin yanından metnin akması için hangi özellik kullanılır?	flow: text	align: side	display: inline	float: left / right	D	kolay	2026-10-14 20:48:04.982268	float_clear	float,clear,clearfix,layout	101
128	frontend	css	Float uygulanan elemanların ebeveyn kapsayıcısının yüksekliğinin sıfırlanmasını önleyen tekniğin adı nedir?	Clearfix Tekni─şi	Overflow Fix	Flex Fallback	Reset Margin	A	orta	2026-10-14 20:48:04.982268	float_clear	float,clear,clearfix,layout	101
129	frontend	css	clear: both kuralı ne işe yarar?	T├╝m stilleri s─▒f─▒rlar	Hem sa─ş─▒ndaki hem solundaki float elemanlar─▒n alt─▒ndan devam etmesini sa─şlar	Sayfayı ikiye böler	Arka planı temizler	B	kolay	2026-10-14 20:48:04.982268	float_clear	float,clear,clearfix,layout	101
130	frontend	css	Kutudan taşan içeriği kesip tamamen görünmez kılmak için ne yazılır?	overflow: auto	overflow: scroll	overflow: hidden	overflow: visible	C	kolay	2026-10-14 20:48:04.982268	overflow	overflow,scroll,hidden,clip,kaydirma	102
131	frontend	css	overflow: auto ile overflow: scroll arasındaki fark nedir?	Hi├ğbir fark yoktur	auto mobilde çalışmaz	scroll sadece dikey kaydırma yapar	auto sadece i├ğerik ta┼şt─▒─ş─▒nda kayd─▒rma ├ğubu─şu ├ğ─▒kar─▒r, scroll ise her zaman g├Âsterir	D	orta	2026-10-14 20:48:04.982268	overflow	overflow,scroll,hidden,clip,kaydirma	102
134	frontend	css	Bir resmin en-boy oranını (örneğin 16/9) korumak için hangi modern CSS özelliği kullanılır?	ratio: 16-9	size-ratio: 16-9	aspect-ratio: 16 / 9	box-ratio: 16 / 9	C	orta	2026-10-14 20:48:04.982268	boyutlandirma	width,height,vw,vh,responsive,boyut	103
136	frontend	css	CSS değişkenleri genellikle global erişim için hangi seçici içinde tanımlanır?	:root	body	*	#main	A	kolay	2026-10-14 20:48:04.982268	css_degiskenleri	degisken,root,var,tema,customproperties	104
138	frontend	css	var(--ana-renk, #333) kullanımında ikinci parametre (#333) ne anlama gelir?	Gölge rengidir	Dark mode rengidir	De─şi┼şken tan─▒ml─▒ de─şilse kullan─▒lacak yedek (fallback) de─şerdir	Hover durumundaki renktir	C	orta	2026-10-14 20:48:04.982268	css_degiskenleri	degisken,root,var,tema,customproperties	104
139	frontend	css	Bir kutuyu Flexbox kapsayıcısı yapmak için hangi kural verilir?	flex: true	box-type: flexbox	layout: flex	display: flex	D	kolay	2026-10-14 20:48:04.982268	flexbox_temel	flex,kapsayici,direction,wrap,eksen	111
140	frontend	css	flex-direction: column ne yapar?	Elemanlar─▒ yukar─▒dan a┼şa─ş─▒ya (dikey) dizer	Elemanlar─▒ soldan sa─şa dizer	Elemanları 2 sütun yapar	Elemanları ters çevirir	A	kolay	2026-10-14 20:48:04.982268	flexbox_temel	flex,kapsayici,direction,wrap,eksen	111
142	frontend	css	Flex elemanlarını ana eksende (varsayılan yatayda) tam ortalamak için ne yazılır?	align-items: center	text-align: center	justify-content: center	float: center	C	kolay	2026-10-14 20:48:04.982268	flexbox_justify	justify,center,spacebetween,spacearound,spaceevenly	112
316	backend	csharp	$"Merhaba {ad.ToUpper()}" kullanımının adı nedir?	String Concatenation	String Interpolation (Metin İnterpolasyonu)	Regular Expressions	Text Encoding	B	kolay	2026-10-16 23:58:17.490468	cs_temeller	csharp,cs_temeller,quiz	399
132	frontend	css	Sadece yatayda taşan içeriği kaydırılabilir yapmak için hangi özellik kullanılır?	overflow-x: auto	overflow-y: scroll	horizontal-scroll: on	overflow-inline: true	A	kolay	2026-10-14 20:48:04.982268	overflow	overflow,scroll,hidden,clip,kaydirma	102
133	frontend	css	100vw ölçüsü ne anlama gelir?	Sayfa içeriğinin yüzde 100 genişliği	Tarayıcı penceresinin (viewport) tam yüzde 100 genişliği	100 vektörel piksel	Ebeveyn kutunun yüzde 100 ü	B	kolay	2026-10-14 20:48:04.982268	boyutlandirma	width,height,vw,vh,responsive,boyut	103
317	backend	csharp	C# ta 7 / 2 işleminin sonucu neden 3.5 değil de 3 çıkar?	Derleyici hata yapmıştır	Sayılar yuvarlanmıştır	Her iki terim de int (tamsayı) olduğu için tamsayı bölmesi uygulanır ve ondalık kısım atılır	C# ondalık sayıları desteklemez	C	kolay	2026-10-16 23:58:17.491442	cs_operatorler_kosullar	csharp,cs_operatorler_kosullar,quiz	400
367	backend	sql	Veritabanında sıfırdan yeni bir tablo oluşturmak için kullanılan SQL komutu hangisidir?	CREATE TABLE	NEW TABLE	ADD TABLE	BUILD TABLE	A	kolay	2026-10-17 01:01:54.149293	sql_ddl_tablolar_constraints	sql,sql_ddl_tablolar_constraints,quiz	466
137	frontend	css	Tanımlanmış bir --ana-renk değişkeni CSS te nasıl kullanılır?	color: --ana-renk;	color: var(--ana-renk);	color: $ana-renk;	color: val(--ana-renk);	B	kolay	2026-10-14 20:48:04.982268	css_degiskenleri	degisken,root,var,tema,customproperties	104
146	frontend	css	Tüm grup yerine sadece tek bir flex elemanının dikey hizasını değiştirmek için hangisi kullanılır?	align-single	item-align	align-self	self-position	C	orta	2026-10-14 20:48:04.982268	flexbox_align	alignitems,alignself,dikey,hizalama	113
149	frontend	css	flex-shrink: 0 kuralı verilen bir eleman nasıl davranır?	G├Âr├╝nmez olur	Kapsay─▒c─▒ daralsa bile asla orijinal boyutundan daha fazla k├╝├ğ├╝lmez	Yüzde 50 küçülür	Genişliği sıfırlanır	B	orta	2026-10-14 20:48:04.982268	flexbox_items	flexgrow,flexshrink,flexbasis,oran	114
151	frontend	css	align-content özelliği hangi durumda etkili olur?	Sadece flex-direction: column iken	Sadece tek bir eleman varsa	Her zaman etkilidir	Yaln─▒zca flex-wrap: wrap aktif ve birden fazla sat─▒r olu┼ştu─şunda	D	zor	2026-10-14 20:48:04.982268	flexbox_layout	aligncontent,stickyfooter,navbar,layout	115
155	frontend	css	Bir elemanı CSS Grid kapsayıcısı yapmak için hangi özellik tanımlanır?	display: table	layout: grid	grid: active	display: grid	D	kolay	2026-10-14 20:49:07.721441	grid_temel	grid,fr,repeat,gap,minmax	123
156	frontend	css	Grid hücreleri ve sütunları arasındaki boşluğu ayarlayan en pratik özellik hangisidir?	gap	cell-spacing	grid-margin	padding-all	A	kolay	2026-10-14 20:49:07.721441	grid_temel	grid,fr,repeat,gap,minmax	123
158	frontend	css	3 eşit sütunlu bir grid oluşturmak için en kısa repeat() yazımı hangisidir?	grid-template-columns: 3 * 1fr;	grid-template-columns: repeat(1fr, 3);	grid-template-columns: repeat(3, 1fr);	grid-template-columns: repeat(equal, 3);	C	kolay	2026-10-14 20:49:07.721441	grid_temel	grid,fr,repeat,gap,minmax	124
161	frontend	css	grid-row: 1 / 3; kuralı elemanı dikeyde nasıl konumlandırır?	Sadece 1. ve 3. sat─▒rlara kopyalar	1. sat─▒r ├ğizgisinden ba┼şlar ve 3. sat─▒r ├ğizgisine kadar uzan─▒r (2 sat─▒r kaplar)	3 satır aşağı kaydırır	1. satırdan sonra gizler	B	orta	2026-10-14 20:49:07.721441	grid_ileri	gridrow,gridcolumn,areas,autofit,autofill	125
163	frontend	css	Bir elemanı template-areas içinde tanımlanan "header" bölgesine atamak için ne yazılır?	grid-name: header;	grid-zone: header;	area-target: header;	grid-area: header;	D	kolay	2026-10-14 20:49:07.721441	grid_ileri	gridrow,gridcolumn,areas,autofit,autofill	126
167	frontend	css	transition: all 0.3s ease; ifadesinde "ease" neyi belirtir?	Gecikme süresini (delay)	Renk tonunu	Animasyon adını	Zamanlama e─şrisini / h─▒zlanma-yava┼şlama dinami─şini (timing-function)	D	kolay	2026-10-14 20:49:07.721441	transitions_transforms	transition,ease,delay,scale,rotate,3d	135
168	frontend	css	Bir hover geçişinin başlamadan önce 0.5 saniye beklemesi için hangi özellik tanımlanır?	transition-delay	transition-duration	transition-wait	transition-pause	A	kolay	2026-10-14 20:49:07.721441	transitions_transforms	transition,ease,delay,scale,rotate,3d	135
169	frontend	css	Bir elemanı bulunduğu konumdan 20px sağa ve 10px aşağı kaydırmak için ne yazılır?	position: move(20px, 10px);	transform: translate(20px, 10px);	offset: 20px 10px;	transform: scale(20px, 10px);	B	kolay	2026-10-14 20:49:07.721441	transitions_transforms	transition,ease,delay,scale,rotate,3d	136
170	frontend	css	transform: scale(1.2); ne işe yarar?	Elemanı 1.2 derece döndürür	Eleman─▒ sa─şa 12px kayd─▒r─▒r	Eleman─▒n boyutunu orijinalinin y├╝zde 120 sine (1.2 kat─▒na) b├╝y├╝t├╝r	Şeffaflığı artırır	C	kolay	2026-10-14 20:49:07.721441	transitions_transforms	transition,ease,delay,scale,rotate,3d	136
171	frontend	css	Bir elemanı saat yönünde 45 derece döndürmek için ne kullanılır?	angle: 45deg;	transform: turn(45);	rotate: 45;	transform: rotate(45deg);	D	kolay	2026-10-14 20:49:07.721441	transitions_transforms	transition,ease,delay,scale,rotate,3d	136
152	frontend	css	Çok satırlı bir flex düzeninde satırları ekranın ortasında toplamak için ne kullanılır?	align-content: center	align-items: center	justify-content: center	flex-line: center	A	orta	2026-10-14 20:48:04.982268	flexbox_layout	aligncontent,stickyfooter,navbar,layout	115
172	frontend	css	3D dönüşümlerin (rotateY gibi) gerçekçi bir derinlik kazanması için ebeveyne ne verilir?	perspective: 1000px	depth: 1000px	3d-mode: true	view-distance: 1000px	A	zor	2026-10-14 20:49:07.721441	transitions_transforms	transition,ease,delay,scale,rotate,3d	137
318	backend	csharp	if-else bloklarında && (mantıksal VE) operatörünün kısa devre (short-circuit) davranışı nedir?	İkinci koşul her zaman mutlaka çalıştırılır	Tüm koşulları rastgele sırayla kontrol eder	İlk koşul doğruysa diğerini kontrol etmez	İlk koşul false ise ikinci koşula hiç bakmadan doğrudan false üretir	D	kolay	2026-10-16 23:58:17.491922	cs_operatorler_kosullar	csharp,cs_operatorler_kosullar,quiz	401
160	frontend	css	Bir grid elemanının yatayda 2 sütun kaplaması (birleşmesi) için ne yazılır?	grid-column: span 2;	grid-span: 2;	colspan: 2;	grid-merge: 2;	A	orta	2026-10-14 20:49:07.721441	grid_ileri	gridrow,gridcolumn,areas,autofit,autofill	125
319	backend	csharp	C# 8+ ile gelen switch expressions (=>) kullanımında varsayılan (default) durum ne ile belirtilir?	_ (alt çizgi) deseni ile	default anahtar kelimesiyle	else bloğu ile	* simgesiyle	A	kolay	2026-10-16 23:58:17.492408	cs_operatorler_kosullar	csharp,cs_operatorler_kosullar,quiz	402
162	frontend	css	grid-template-areas ile oluşturulan şablonda boş bırakılmak istenen hücre için ne yazılır?	none	empty	. (nokta)	null	C	orta	2026-10-14 20:49:07.721441	grid_ileri	gridrow,gridcolumn,areas,autofit,autofill	126
320	backend	csharp	string ad = kullaniciAdi ?? "Misafir"; ifadesindeki ?? operatörünün işlevi nedir?	Ternary kontrolü yapar	kullaniciAdi null ise sağdaki "Misafir" değerini atar	İki metni yan yana yapıştırır	Metni küçük harfe çevirir	B	kolay	2026-10-16 23:58:17.492807	cs_operatorler_kosullar	csharp,cs_operatorler_kosullar,quiz	403
145	frontend	css	Flex elemanlarını dikey eksende ortalamak için kapsayıcıya ne yazılır?	justify-content: center	align-items: center	vertical-align: middle	align-content: middle	B	kolay	2026-10-14 20:48:04.982268	flexbox_align	alignitems,alignself,dikey,hizalama	113
148	frontend	css	flex: 1 kısayolu ne anlama gelir?	Eleman boş kalan tüm alanı orantılı olarak kaplar	Eleman sadece 1px genişliğinde olur	Eleman küçülmeyi reddeder	Eleman gizlenir	A	orta	2026-10-14 20:48:04.982268	flexbox_items	flexgrow,flexshrink,flexbasis,oran	114
157	frontend	css	grid-template-columns: 200px 1fr 200px; tanımında 1fr ne anlama gelir?	Sabit 100px alan	Kalan tüm boşluğu kaplayan esnek birim	İlk sütunun aynısı	Tarayıcı genişliğinin yüzde 1 i	B	orta	2026-10-14 20:49:07.721441	grid_temel	grid,fr,repeat,gap,minmax	124
176	frontend	css	CSS te özel bir animasyon adımı zinciri tanımlamak için hangi at-rule kullanılır?	@keyframes	@animation	@motion	@transition	A	kolay	2026-10-14 20:49:07.721441	animations_keyframes	animation,keyframes,infinite,neon,blur	139
182	frontend	css	Bir görseli tamamen siyah-beyaza çevirmek için hangi CSS filtresi kullanılır?	filter: blackwhite(100%);	filter: contrast(0%);	filter: grayscale(100%);	filter: invert(100%);	C	kolay	2026-10-14 20:49:07.721441	modern_ui_efektler	glassmorphism,filter,clippath,pseudoelement	142
183	frontend	css	Görselin arkasındaki saydam alana göre kusursuz gölge düşürmek için box-shadow yerine ne kullanılır?	shadow-element	text-shadow	outline: shadow	filter: drop-shadow(...)	D	orta	2026-10-14 20:49:07.721441	modern_ui_efektler	glassmorphism,filter,clippath,pseudoelement	142
187	frontend	css	Mobile-first (önce mobil) tasarım yaklaşımında media query lerde genellikle hangisi kullanılır?	@media (max-width: ...)	@media (device: hand)	@media (screen: mobile)	@media (min-width: ...)	D	orta	2026-10-14 20:49:07.721441	responsive_media	mediaquery,mobilefirst,clamp,containerqueries,darkmode	151
189	frontend	css	Web dünyasında yaygın olarak tablet cihazlar için kullanılan başlangıç breakpoint i hangisidir?	320px	768px	480px	1440px	B	kolay	2026-10-14 20:49:07.721441	responsive_media	mediaquery,mobilefirst,clamp,containerqueries,darkmode	151
190	frontend	css	font-size: clamp(1rem, 2.5vw, 2rem); kuralında 2.5vw neyi ifade eder?	Minimum sabit boyutu	Maksimum tavan boyutu	─░deal / dinamik ekran geni┼şli─şine g├Âre ├Âl├ğeklenen boyutu	Satır yüksekliğini	C	orta	2026-10-14 20:49:07.721441	responsive_media	mediaquery,mobilefirst,clamp,containerqueries,darkmode	153
191	frontend	css	Görsellerin mobilde kapsayıcısından dışarı taşmasını önleyen altın kural nedir?	width: 1000px;	display: inline;	overflow: hidden;	max-width: 100%; height: auto;	D	kolay	2026-10-14 20:49:07.721441	responsive_media	mediaquery,mobilefirst,clamp,containerqueries,darkmode	153
194	frontend	css	Sayfa kaydırıldığında bölümlerin tam ekran olarak ekrana kilitlenmesi için kapsayıcıya ne yazılır?	page-snap: on;	scroll-lock: true;	scroll-snap-type: y mandatory;	scroll-behavior: snap;	C	orta	2026-10-14 20:49:07.721441	modern_css_features	scrollsnap,smooth,bem,specificity,calc,minmax	156
195	frontend	css	Sayfa içi çapa (#bolum) linklerine tıklandığında yumuşak kayma için html e ne eklenir?	scroll-effect: slow;	transition: scroll 1s;	scroll-animation: ease;	scroll-behavior: smooth;	D	kolay	2026-10-14 20:49:07.721441	modern_css_features	scrollsnap,smooth,bem,specificity,calc,minmax	156
196	frontend	css	BEM metodolojisinde "btn--danger" ifadesindeki çift çizgi (--) neyi temsil eder?	Modifier (De─şi┼ştirici / Varyasyon)	Element (Öğe)	Block (Blok)	Module (Modül)	A	kolay	2026-10-14 20:49:07.721441	modern_css_features	scrollsnap,smooth,bem,specificity,calc,minmax	175
198	frontend	css	CSS te !important kullanımı hakkında en doğru profesyonel yaklaşım hangisidir?	Her stil kuralına eklenmelidir	Sadece animasyonlarda kullan─▒l─▒r	Spesifikli─şi k─▒r─▒p ezdi─şi ve bak─▒m─▒ zorla┼şt─▒rd─▒─ş─▒ i├ğin zorunlu kalmad─▒k├ğa ka├ğ─▒n─▒lmal─▒d─▒r	Tarayıcı hızını artırır	C	orta	2026-10-14 20:49:07.721441	modern_css_features	scrollsnap,smooth,bem,specificity,calc,minmax	176
199	frontend	css	Hangi seçici grubunun specificity (özgüllük) puanı en yüksektir?	Element (etiket) seçicisi (örn: p)	Class seçicisi (örn: .btn)	Evrensel se├ğici (*)	ID se├ğicisi (├Ârn: #header)	D	kolay	2026-10-14 20:49:07.721441	modern_css_features	scrollsnap,smooth,bem,specificity,calc,minmax	176
202	frontend	css	Bir alt grid elemanının, üst kapsayıcısının ızgara çizgilerini birebir miras almasını sağlayan kural nedir?	grid-template: parent;	grid-inherit: true;	grid-template-columns: subgrid;	display: sub-grid;	C	zor	2026-10-14 20:49:07.721441	css_selectors_ileri	subgrid,willchange,contentvisibility,has,is,nthchild	178
188	frontend	css	@media screen and (max-width: 768px) kuralı ne zaman çalışır?	Ekran genişliği 768px ve daha küçük olduğunda	Ekran 768px den büyük olduğunda	Sadece tabletlerde	Her zaman	A	kolay	2026-10-14 20:49:07.721441	responsive_media	mediaquery,mobilefirst,clamp,containerqueries,darkmode	151
203	frontend	css	Tarayıcıya bir elemanın yakında animasyona gireceğini ve GPU optimizasyonu yapmasını bildiren özellik hangisidir?	gpu-accelerate: true;	render-fast: true;	optimize-motion: on;	will-change: transform;	D	zor	2026-10-14 20:49:07.721441	css_selectors_ileri	subgrid,willchange,contentvisibility,has,is,nthchild	179
204	frontend	css	Ekran dışındaki (viewport altında kalan) elemanların ilk açılışta render maliyetini sıfırlayan modern özellik nedir?	content-visibility: auto;	display: lazy;	render-skip: true;	lazy-layout: on;	A	zor	2026-10-14 20:49:07.721441	css_selectors_ileri	subgrid,willchange,contentvisibility,has,is,nthchild	179
321	backend	csharp	for (int i = 0; i < 5; i++) döngüsü toplam kaç kez çalışır?	4 kez	6 kez	5 kez (i: 0, 1, 2, 3, 4)	Sonsuz döngüye girer	C	kolay	2026-10-16 23:58:17.4937	cs_donguler	csharp,cs_donguler,quiz	404
322	backend	csharp	do-while döngüsünün while döngüsünden en kritik farkı nedir?	Sadece tek bir sayı alır	Daha yavaş çalışır	Dizilerde kullanılamaz	Koşul en başta false olsa bile döngü gövdesi en az bir kez kesinlikle çalışır	D	kolay	2026-10-16 23:58:17.494046	cs_donguler	csharp,cs_donguler,quiz	405
323	backend	csharp	foreach döngüsü ile bir koleksiyon gezinirken koleksiyonun yapısı hakkında ne geçerlidir?	İterasyon esnasında koleksiyona eleman eklenemez veya silinemez (koleksiyon değiştirilemez)	Elemanlar her zaman tersten okunur	Sadece sabit dizilerde çalışır	Elemanlar üzerinde doğrudan güncelleme yapılmalıdır	A	kolay	2026-10-16 23:58:17.4945	cs_donguler	csharp,cs_donguler,quiz	406
324	backend	csharp	Döngüde o anki adımı pas geçip bir sonraki iterasyona atlamak için hangi komut verilir?	break	continue	return	exit	B	kolay	2026-10-16 23:58:17.494974	cs_donguler	csharp,cs_donguler,quiz	407
197	frontend	css	BEM de bir kartın başlığı doğru olarak nasıl adlandırılır?	.card-title-header	.card__title	.card.title	.card > title	B	kolay	2026-10-14 20:49:07.721441	modern_css_features	scrollsnap,smooth,bem,specificity,calc,minmax	175
205	frontend	css	a:has(img) seçicisi ne anlama gelir?	Tüm img etiketlerini seçer	İçinde img etiketi barındıran a (link) etiketlerini seçer (ebeveyn seçici)	img den sonra gelen a etiketini seçer	img olmayan a etiketlerini seçer	B	orta	2026-10-14 20:49:07.721441	css_selectors_ileri	subgrid,willchange,contentvisibility,has,is,nthchild	180
181	frontend	css	Glassmorphism efektinin inandırıcı olması için kartın arkaplanı nasıl olmalıdır?	Tamamen opak beyaz	Yarı şeffaf rgba veya hsla arka plan (örn: rgba(255,255,255,0.1))	Siyah zemin	Gradient siz düz renk	B	orta	2026-10-14 20:49:07.721441	modern_ui_efektler	glassmorphism,filter,clippath,pseudoelement	141
208	backend	python	Python da kod blokları (örneğin fonksiyon veya döngü gövdeleri) ne ile belirlenir?	Girintileme (Indentation) bo┼şluklar─▒yla	Noktalı virgüllerle ;	S├╝sl├╝ parantezlerle { }	BEGIN ve END anahtar kelimeleriyle	A	kolay	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	296
209	backend	python	Aşağıdakilerden hangisi Python da geçerli bir değişken adı DEĞİLDİR?	_kullanici	2kullanici	kullanici_1	kullaniciAd	B	kolay	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	297
218	backend	python	Listeler (lists) ile Demetler (tuples) arasındaki en temel fark nedir?	Listeler tamsayı tutar, demetler metin tutar	Demetler k├Â┼şeli parantez [] ile tan─▒mlan─▒r	Listeler de─şi┼ştirilebilir (mutable), demetler de─şi┼ştirilemez (immutable)	Listeler daha hızlıdır	C	kolay	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	308
219	backend	python	Bir listenin sonuna yeni bir eleman eklemek için hangi metod kullanılır?	push()	add()	insert_end()	append()	D	kolay	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	309
220	backend	python	liste = [1, 2, 3] verildiğinde liste.pop() çağrılırsa ne olur?	Listenin son eleman─▒ (3) silinir ve d├Ând├╝r├╝l├╝r	Listenin ilk eleman─▒ silinir	Tüm liste temizlenir	Hata verir	A	orta	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	309
222	backend	python	Tek elemanlı bir tuple tanımlamak için doğru yazım hangisidir?	t = (5)	t = tuple(5)	t = (5,)	t = [5]	C	orta	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	311
224	backend	python	Sözlükte bir anahtara güvenli erişip yoksa varsayılan değer dönmesini sağlayan metod hangisidir?	d.get()	d.find()	d.search()	d.fetch()	A	kolay	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	313
228	backend	python	Python da "else if" koşulu hangi anahtar kelime ile yazılır?	elif	else if	elseif	elsif	A	kolay	2026-10-14 21:42:46.105972	py_kosullar_donguler	elif,range,continue,forelse,enumerate,zip	322
231	backend	python	for döngüsünün arkasına yazılan else bloğu (for-else) ne zaman çalışır?	Döngü break ile kırıldığında	Her iterasyonda	Döngü hiç çalışmadığında	D├Âng├╝ break ile kesilmeden normal ┼şekilde tamamland─▒─ş─▒nda	D	zor	2026-10-14 21:42:46.105972	py_kosullar_donguler	elif,range,continue,forelse,enumerate,zip	327
232	backend	python	Döngü içinde hem indeksi hem de elemanı aynı anda almak için hangi fonksiyon kullanılır?	enumerate()	zip()	range()	index()	A	kolay	2026-10-14 21:42:46.105972	py_kosullar_donguler	elif,range,continue,forelse,enumerate,zip	328
233	backend	python	zip(["a", "b"], [1, 2]) ifadesi döngüde ne üretir?	["a", "b", 1, 2]	("a", 1) ve ("b", 2)	{"a": 1, "b": 2}	("a", "b")	B	kolay	2026-10-14 21:42:46.105972	py_kosullar_donguler	elif,range,continue,forelse,enumerate,zip	328
235	backend	python	Bir fonksiyon açıkça bir değer return etmezse varsayılan dönüş değeri ne olur?	0	False	undefined	None	D	kolay	2026-10-14 21:42:46.105972	py_fonksiyonlar	def,return,args,kwargs,mutable_default,global,lambda,sorted	333
236	backend	python	def topla(*args) parametresindeki *args fonksiyon içine hangi tipte gelir?	Demet (tuple)	Liste (list)	Sözlük (dict)	Küme (set)	A	orta	2026-10-14 21:42:46.105972	py_fonksiyonlar	def,return,args,kwargs,mutable_default,global,lambda,sorted	336
237	backend	python	def kaydet(**kwargs) fonksiyonuna isim="Ali", yas=25 verildiğinde kwargs tipi nedir?	tuple	dict (s├Âzl├╝k)	list	str	B	kolay	2026-10-14 21:42:46.105972	py_fonksiyonlar	def,return,args,kwargs,mutable_default,global,lambda,sorted	337
238	backend	python	def ekle(x, l=[]) şeklinde mutable default argüman kullanmanın tehlikesi nedir?	SyntaxError verir	Her ├ğa─şr─▒da s─▒f─▒rlan─▒r	Varsay─▒lan liste fonksiyon ├ğa─şr─▒lar─▒ aras─▒nda bellekte payla┼ş─▒larak k├╝m├╝latif b├╝y├╝r	Hız problemi yaratır	C	zor	2026-10-14 21:42:46.105972	py_fonksiyonlar	def,return,args,kwargs,mutable_default,global,lambda,sorted	335
239	backend	python	Fonksiyon içinde global bir değişkenin değerini değiştirmek için hangi anahtar kelime bildirilir?	nonlocal	static	outer	global	D	orta	2026-10-14 21:42:46.105972	py_fonksiyonlar	def,return,args,kwargs,mutable_default,global,lambda,sorted	338
242	backend	python	[x**2 for x in range(5)] list comprehension ının çıktısı nedir?	[1, 4, 9, 16, 25]	[0, 2, 4, 6, 8]	[0, 1, 4, 9, 16]	[1, 2, 3, 4, 5]	C	orta	2026-10-14 21:42:46.105972	py_comprehensions	list_comp,dict_comp,generator,all_any	346
221	backend	python	a = [1, 2, 3] ve b = a yapıldıktan sonra b.append(4) denirse a nın durumu ne olur?	[1, 2, 3]	[1, 2, 3, 4] (Çünkü b ve a bellekte aynı listeyi referans alır)	[4]	Hata verir	B	orta	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	310
243	backend	python	[x for x in [1, 2, 3, 4] if x % 2 == 0] ifadesi ne üretir?	[1, 3]	[0, 0]	[False, True, False, True]	[2, 4]	D	kolay	2026-10-14 21:42:46.105972	py_comprehensions	list_comp,dict_comp,generator,all_any	347
325	backend	csharp	int[] dizi = new int[5]; ifadesi çalıştırıldığında dizi elemanlarının varsayılan değerleri nedir?	null	-1	0	Rastgele çöp değerler	C	kolay	2026-10-16 23:58:17.495381	cs_koleksiyonlar	csharp,cs_koleksiyonlar,quiz	408
326	backend	csharp	List<T> koleksiyonunun sabit boyutlu dizilere (T[]) göre en belirgin avantajı nedir?	Sadece tamsayı kabul etmesi	Daha az bellek kullanması	Hiçbir metodu olmaması	Eleman eklendikçe veya silindikçe boyutunun dinamik olarak kendiliğinden genişleyip daralabilmesi	D	kolay	2026-10-16 23:58:17.496136	cs_koleksiyonlar	csharp,cs_koleksiyonlar,quiz	409
229	backend	python	range(2, 10, 2) fonksiyonu hangi sayıları üretir?	2, 3, 4, 5, 6, 7, 8, 9, 10	2, 4, 6, 8	2, 4, 6, 8, 10	4, 6, 8	B	orta	2026-10-14 21:42:46.105972	py_kosullar_donguler	elif,range,continue,forelse,enumerate,zip	324
230	backend	python	Bir döngüde o anki adımı atlayıp bir sonraki iterasyona geçmek için ne kullanılır?	break	pass	continue	skip	C	kolay	2026-10-14 21:42:46.105972	py_kosullar_donguler	elif,range,continue,forelse,enumerate,zip	326
327	backend	csharp	Dictionary<string, int> koleksiyonunda bir anahtara göre değer aramanın ortalama zaman karmaşıklığı nedir?	O(1) - Sabit zamanlı çok hızlı erişim	O(n) - Tüm elemanları baştan sona arar	O(n^2)	O(log n)	A	kolay	2026-10-16 23:58:17.49648	cs_koleksiyonlar	csharp,cs_koleksiyonlar,quiz	410
234	backend	python	Python da fonksiyon tanımlamak için hangi anahtar kelime kullanılır?	function	fn	def	func	C	kolay	2026-10-14 21:42:46.105972	py_fonksiyonlar	def,return,args,kwargs,mutable_default,global,lambda,sorted	333
246	backend	python	all([True, True, False]) ifadesinin sonucu nedir?	True	None	False	Hata	C	kolay	2026-10-14 21:42:46.105972	py_comprehensions	list_comp,dict_comp,generator,all_any	350
247	backend	python	any([False, False, True]) ifadesinin sonucu nedir?	Hata	False	None	True	D	kolay	2026-10-14 21:42:46.105972	py_comprehensions	list_comp,dict_comp,generator,all_any	350
248	backend	python	Hata yakalamak için hangi blok yapısı kullanılır?	try - except	try - catch	do - catch	test - error	A	kolay	2026-10-14 21:42:46.105972	py_hata_dosya	try_except,finally,raise,with_open,json	356
250	backend	python	Kasıtlı olarak bir hata fırlatmak için hangi anahtar kelime kullanılır?	throw	error	raise	fire	C	kolay	2026-10-14 21:42:46.105972	py_hata_dosya	try_except,finally,raise,with_open,json	357
252	backend	python	open() fonksiyonunda dosyayı üzerine yazmadan sonuna ekleme yapmak için hangi mod kullanılır?	"a" (append)	"r"	"w"	"x"	A	kolay	2026-10-14 21:42:46.105972	py_hata_dosya	try_except,finally,raise,with_open,json	360
254	backend	python	Sınıf başlatıldığında (örnek oluşturulduğunda) otomatik çalışan yapıcı metod hangisidir?	def constructor()	def __new__()	def __init__()	def start()	C	kolay	2026-10-14 21:42:46.105972	py_oop	init,self,private,property,super,str,len	368
255	backend	python	Sınıf metodlarında ilk parametre olarak gelen self neyi temsil eder?	Sınıfın kendisini	Python ├ğekirde─şini	Global modülü	Olu┼şturulan ge├ğerli nesne ├Ârne─şini (instance)	D	orta	2026-10-14 21:42:46.105972	py_oop	init,self,private,property,super,str,len	368
256	backend	python	Bir sınıf niteliğini (attribute) private (özel) yapmak için isminin başına ne konur?	├çift alt ├ğizgi (__)	Tek alt çizgi (_)	private anahtar kelimesi	Kare simgesi (#)	A	orta	2026-10-14 21:42:46.105972	py_oop	init,self,private,property,super,str,len	371
257	backend	python	Bir metodu sanki bir değişken/nitelik gibi parantezsiz (nesne.alan) çağırmak için hangi dekoratör kullanılır?	@classmethod	@property	@staticmethod	@variable	B	orta	2026-10-14 21:42:46.105972	py_oop	init,self,private,property,super,str,len	372
262	backend	python	Bir klasörün Python paketi olarak tanınması için içine geleneksel olarak hangi dosya konur?	package.json	main.py	__init__.py	__package__.py	C	kolay	2026-10-14 21:42:46.105972	py_ileri	name_main,init_py,decorators,generators_yield,gil	382
263	backend	python	Fonksiyonları sarmalayarak davranışlarını değiştiren @ ile başlayan yapılara ne ad verilir?	Enkaps├╝lat├Âr	Generator	Modülatör	Dekorat├Âr (Decorator)	D	kolay	2026-10-14 21:42:46.105972	py_ileri	name_main,init_py,decorators,generators_yield,gil	384
264	backend	python	Bir fonksiyon içinde return yerine yield kullanılırsa o fonksiyon neye dönüşür?	Generator (├£rete├ğ)	Lambda fonksiyonu	Dekoratör	Asenkron görev	A	orta	2026-10-14 21:42:46.105972	py_ileri	name_main,init_py,decorators,generators_yield,gil	385
277	frontend	javascript	Döngüde o anki iterasyonu atlayıp bir sonraki adıma geçmek için hangi anahtar kelime kullanılır?	break	continue	skip	pass	B	kolay	2026-10-14 21:44:25.890305	js_kosullar_donguler	switch,ternary,dowhile,continue,forof	209
278	frontend	javascript	Bir dizinin elemanları üzerinde doğrudan değer bazlı gezinmek için en modern döngü hangisidir?	for...in	while	for...of	do...while	C	kolay	2026-10-14 21:44:25.890305	js_kosullar_donguler	switch,ternary,dowhile,continue,forof	211
279	frontend	javascript	Arrow function larda (ok fonksiyonları) hangisi normal function lardan farklıdır?	Asenkron olamazlar	Parametre alamazlar	Return kullanamazlar	Kendi this ba─şlamlar─▒ yoktur, ├╝st lexical scope daki this i miras al─▒rlar	D	zor	2026-10-14 21:44:25.890305	js_fonksiyonlar_scope	arrow,default_param,rest,closure,hoisting,pure	220
328	backend	csharp	HashSet<T> koleksiyonuna aynı eleman ikinci kez eklenmek istendiğinde ne olur?	Program Exception fırlatır	Eleman eklenmez, reddedilir ve küme benzersiz eleman kuralını korur	Eski elemanın üzerine yazar	Kümeyi tamamen temizler	B	kolay	2026-10-16 23:58:17.49681	cs_koleksiyonlar	csharp,cs_koleksiyonlar,quiz	411
329	backend	csharp	Bir C# metodunun hiçbir değer döndürmeyeceğini belirtmek için dönüş tipi olarak ne yazılır?	null	empty	void	none	C	kolay	2026-10-16 23:58:17.497283	cs_metodlar	csharp,cs_metodlar,quiz	412
244	backend	python	{k: v for k, v in [("a", 1), ("b", 2)]} ifadesinin çıktısı nedir?	{"a": 1, "b": 2}	[("a", 1), ("b", 2)]	("a", 1, "b", 2)	{"a", "b"}	A	kolay	2026-10-14 21:42:46.105972	py_comprehensions	list_comp,dict_comp,generator,all_any	348
245	backend	python	(x for x in range(1000000)) yuvarlak parantezli comprehension ne üretir?	1 milyon elemanlı dev bir liste	Bir generator (üreteç) nesnesi (bellekte yer kaplamaz)	Bir tuple	SyntaxError verir	B	zor	2026-10-14 21:42:46.105972	py_comprehensions	list_comp,dict_comp,generator,all_any	349
265	backend	python	Python da CPython uygulamasında birden fazla thread in aynı anda saf Python bayt kodu çalıştırmasını kısıtlayan mekanizma nedir?	V8	GIL (Global Interpreter Lock)	JIT	GC (Garbage Collector)	B	zor	2026-10-14 21:42:46.105972	py_ileri	name_main,init_py,decorators,generators_yield,gil	388
275	frontend	javascript	Ternary (üçlü) operatörünün doğru sözdizimi hangisidir?	ko┼şul -> do─şru : yanl─▒┼ş	koşul : doğruysa ? yanlışsa	if koşul then doğru else yanlış	ko┼şul ? do─şruysa : yanl─▒┼şsa	D	kolay	2026-10-14 21:44:25.890305	js_kosullar_donguler	switch,ternary,dowhile,continue,forof	205
249	backend	python	try bloğunda hata çıksa da çıkmasa da kesinlikle çalışan blok hangisidir?	else	finally	always	catch	B	kolay	2026-10-14 21:42:46.105972	py_hata_dosya	try_except,finally,raise,with_open,json	356
276	frontend	javascript	do-while döngüsünün while döngüsünden temel farkı nedir?	Ko┼şul yanl─▒┼ş olsa bile g├Âvdesi en az 1 kez garanti ├ğal─▒┼ş─▒r	Daha h─▒zl─▒ ├ğal─▒┼ş─▒r	Sonsuz döngüye girmez	Sadece dizilerde kullanılır	A	orta	2026-10-14 21:44:25.890305	js_kosullar_donguler	switch,ternary,dowhile,continue,forof	208
330	backend	csharp	out anahtar kelimesi ile işaretlenmiş bir parametre hakkında hangisi doğrudur?	Metoda girmeden önce mutlaka değer atanmış olmalıdır	Sadece string tiplerde çalışır	Metod içinde değiştirilemez	Metod tamamlanıp çıkmadan önce metodun gövdesinde kesinlikle bir değer atanmış olması zorunludur	D	kolay	2026-10-16 23:58:17.497638	cs_metodlar	csharp,cs_metodlar,quiz	413
261	backend	python	Bir dosyanın doğrudan mı çalıştırıldığını yoksa import mu edildiğini anlamak için hangi kontrol yapılır?	if __run__ == "__direct__":	if __name__ == "__main__":	if __file__ == "__entry__":	if is_main():	B	orta	2026-10-14 21:42:46.105972	py_ileri	name_main,init_py,decorators,generators_yield,gil	380
273	frontend	javascript	Math.floor(4.9) fonksiyonunun dönüş değeri nedir?	5	4	4.9	4.5	B	kolay	2026-10-14 21:44:25.890305	js_degiskenler_tipler	let,const,typeof,coercion,template_literals,math	196
274	frontend	javascript	switch-case yapısında bir eşleşme olduktan sonra diğer case lere geçilmesini engellemek için ne yazılır?	stop	exit	break	return	C	kolay	2026-10-14 21:44:25.890305	js_kosullar_donguler	switch,ternary,dowhile,continue,forof	206
42	frontend	html	img etiketi neden kapanış etiketi (<img/>) gerektirmez?	Hata olduğu için	├ç├╝nk├╝ CSS ile kapat─▒l─▒r	├ç├╝nk├╝ bo┼ş etiket (void element) kategorisindedir i├ğerik ta┼ş─▒maz	Standartta öyle yazılmamıştır	C	zor	2026-10-14 20:02:06.213675	gorseller	resim,img,alt,seo,lazy	42
285	frontend	javascript	Dizinin sonuna yeni eleman ekleyen metod hangisidir?	shift()	push()	pop()	unshift()	B	kolay	2026-10-14 21:44:25.890305	js_diziler_nesneler	push,map,filter,reduce,destructuring,spread,freeze	233
286	frontend	javascript	map() metodu ile forEach() metodu arasındaki en kritik fark nedir?	map() diziyi ters ├ğevirir	forEach() daha hızlıdır	map() yeni bir d├Ân├╝┼şt├╝r├╝lm├╝┼ş dizi d├Ând├╝r├╝r, forEach() ise undefined d├Âner ve orijinali gezer	forEach() sadece sayılarda çalışır	C	orta	2026-10-14 21:44:25.890305	js_diziler_nesneler	push,map,filter,reduce,destructuring,spread,freeze	234
287	frontend	javascript	[1, 2, 3, 4].filter(x => x % 2 === 0) ifadesinin sonucu nedir?	[1, 3]	4	[true, false]	[2, 4]	D	kolay	2026-10-14 21:44:25.890305	js_diziler_nesneler	push,map,filter,reduce,destructuring,spread,freeze	235
288	frontend	javascript	reduce() metodundaki ilk parametre genellikle neyi temsil eder?	Ak├╝m├╝lat├Âr (biriktirici de─şer)	Ge├ğerli indeks	Orijinal dizi	Son eleman	A	orta	2026-10-14 21:44:25.890305	js_diziler_nesneler	push,map,filter,reduce,destructuring,spread,freeze	236
292	frontend	javascript	CSS seçici mantığıyla tek bir HTML elemanını seçmek için modern standart metod hangisidir?	document.querySelector()	document.getElementById()	document.getElementsByClassName()	document.select()	A	kolay	2026-10-14 21:44:25.890305	js_dom_events	queryselector,classlist,preventdefault,bubbling,delegation,localstorage	250
293	frontend	javascript	Bir elemana sınıf (class) eklemek için classList in hangi metodu kullanılır?	classList.insert()	classList.add()	classList.append()	classList.push()	B	kolay	2026-10-14 21:44:25.890305	js_dom_events	queryselector,classlist,preventdefault,bubbling,delegation,localstorage	252
294	frontend	javascript	Form submit edildiğinde sayfanın yenilenmesini durdurmak için ne yazılır?	e.stopPropagation()	return false	e.preventDefault()	e.stop()	C	kolay	2026-10-14 21:44:25.890305	js_dom_events	queryselector,classlist,preventdefault,bubbling,delegation,localstorage	257
295	frontend	javascript	Olayın alt çocuktan tetiklenip üst ebeveynlere doğru yayılmasına ne ad verilir?	Event Capturing	Event Loop	Event Delegation	Event Bubbling (Olay Kabarc─▒klanmas─▒)	D	orta	2026-10-14 21:44:25.890305	js_dom_events	queryselector,classlist,preventdefault,bubbling,delegation,localstorage	256
299	frontend	javascript	JavaScript in tek iş parçacıklı (single-threaded) olmasına rağmen asenkron işleri yönetmesini sağlayan mekanizma nedir?	Garbage Collector	Virtual DOM	Compiler	Event Loop (Olay D├Âng├╝s├╝)	D	zor	2026-10-14 21:44:25.890305	js_asenkron	eventloop,promise,await,fetch,promiseall,trycatch	266
300	frontend	javascript	Bir Promise ın 3 olası yaşam durumu sırasıyla hangileridir?	pending (beklemede), fulfilled (ba┼şar─▒l─▒), rejected (reddedildi)	start, process, end	try, catch, finally	open, wait, close	A	orta	2026-10-14 21:44:25.890305	js_asenkron	eventloop,promise,await,fetch,promiseall,trycatch	269
302	frontend	javascript	fetch() ile gelen yanıtı JSON nesnesine dönüştürmek için hangi metod await edilir?	response.text()	response.data()	response.json()	response.parse()	C	kolay	2026-10-14 21:44:25.890305	js_asenkron	eventloop,promise,await,fetch,promiseall,trycatch	272
303	frontend	javascript	Birden fazla bağımsız Promise ı aynı anda paralel başlatıp hepsinin bitmesini beklemek için ne kullanılır?	Promise.race()	Promise.settle()	Promise.any()	Promise.all()	D	orta	2026-10-14 21:44:25.890305	js_asenkron	eventloop,promise,await,fetch,promiseall,trycatch	274
304	frontend	javascript	Asenkron fonksiyonlarda ortaya çıkan hataları yakalamak için hangi blok yapısı kullanılır?	try-catch	if-else	check-error	resolve-reject	A	kolay	2026-10-14 21:44:25.890305	js_asenkron	eventloop,promise,await,fetch,promiseall,trycatch	271
305	frontend	javascript	ES6 Sınıflarında (Classes) bir sınıftan başka bir sınıfa kalıtım yapmak için hangi anahtar kelime kullanılır?	implements	extends	inherits	super	B	kolay	2026-10-14 21:44:25.890305	js_oop_moduller	classes,super,private_field,static,debounce,export	283
306	frontend	javascript	Türemiş bir sınıfta üst sınıfın constructor ını tetiklemek için ne çağrılır?	this.base()	parent()	super()	upper()	C	kolay	2026-10-14 21:44:25.890305	js_oop_moduller	classes,super,private_field,static,debounce,export	283
307	frontend	javascript	Modern JavaScript te bir sınıf alanını gerçekten private (gizli) yapmak için hangi sembolle başlatılır?	_ (alt çizgi)	$ (dolar)	private	# (kare)	D	orta	2026-10-14 21:44:25.890305	js_oop_moduller	classes,super,private_field,static,debounce,export	284
308	frontend	javascript	Sınıf örneği (instance) üretmeden doğrudan SınıfAdı.metod() şeklinde çağrılan metodlara ne ad verilir?	Static method (statik metod)	Instance method	Private method	Prototype method	A	orta	2026-10-14 21:44:25.890305	js_oop_moduller	classes,super,private_field,static,debounce,export	285
310	frontend	javascript	Bir JS dosyasındaki tek bir ana nesneyi dışa aktarmak için hangi sözdizimi kullanılır?	module.exports = ...	export named ...	export default ...	export all ...	C	kolay	2026-10-14 21:44:25.890305	js_oop_moduller	classes,super,private_field,static,debounce,export	286
301	frontend	javascript	await anahtar kelimesi sadece hangi fonksiyonların içinde doğrudan kullanılabilir?	Tüm normal fonksiyonlarda	async olarak tanımlanmış fonksiyonların içinde	Generator fonksiyonlarda	Arrow function olmayanlarda	B	kolay	2026-10-14 21:44:25.890305	js_asenkron	eventloop,promise,await,fetch,promiseall,trycatch	270
331	backend	csharp	Aynı isimli fakat farklı parametre sayısı veya tipine sahip birden fazla metod tanımlamaya ne denir?	Metod Aşırı Yükleme (Method Overloading)	Metod Ezme (Method Overriding)	Metod Kapsülleme (Encapsulation)	Metod Miras Alma (Inheritance)	A	kolay	2026-10-16 23:58:17.498035	cs_metodlar	csharp,cs_metodlar,quiz	414
332	backend	csharp	try-catch bloklarında finally bloğunun temel görevi nedir?	Sadece hata olduğunda çalışmak	Hata çıksa da çıkmasa da her koşulda mutlaka çalışıp kaynak temizliği (cleanup) yapmak	Programı zorla kapatmak	Kullanıcıya bildirim penceresi açmak	B	kolay	2026-10-16 23:58:17.498762	cs_hata_yonetimi	csharp,cs_hata_yonetimi,quiz	415
333	backend	csharp	Bir sınıftan bellekte yeni bir somut örnek (instance) üretmek için hangi anahtar kelime kullanılır?	create	build	new	init	C	kolay	2026-10-16 23:58:17.49937	cs_oop_temel	csharp,cs_oop_temel,quiz	416
334	backend	csharp	C# ta public string Ad { get; set; } yapısına ne ad verilir?	Alan (Field)	Fonksiyon (Method)	Sabit (Constant)	Otomatik Özellik (Auto-Implemented Property)	D	kolay	2026-10-16 23:58:17.499834	cs_oop_temel	csharp,cs_oop_temel,quiz	417
289	frontend	javascript	const { ad, yas } = kisi; yazımı hangi ES6 özelliğidir?	Spread Operator	Object Destructuring (Nesne Parçalama)	Template Literal	Prototype Chain	B	kolay	2026-10-14 21:44:25.890305	js_diziler_nesneler	push,map,filter,reduce,destructuring,spread,freeze	241
57	frontend	html	colspan ve rowspan aynı anda kullanılabilir mi?	Hayır ikisi birden kullanılamaz	Evet aynı hücrede hem sütun hem satır birleştirilebilir	Sadece th etiketinde kullanılabilir	Sadece thead içinde kullanılabilir	B	zor	2026-10-14 20:02:06.213675	tablolar_rowspan	tablo,rowspan,birlestir,satir	53
69	frontend	html	fieldset ve legend etiketleri ne için kullanılır?	Tablo oluşturmak için	Form alanlarını anlamsal gruplar halinde çerçeve içine almak için	Resim eklemek için	Stil vermek için	B	orta	2026-10-14 20:02:06.213675	formlar_buton	textarea,button,submit,fieldset	62
90	frontend	html	Open Graph meta etiketleri hangi HTML bölümüne yazılır?	<body> içine	<footer> içine	<head> içine	<header> içine	C	kolay	2026-10-14 20:02:06.213675	opengraph_seo	opengraph,og,seo,sosyalmedya,meta	75
43	frontend	html	<picture> etiketinin <img> etiketinden temel farkı nedir?	Sadece PNG destekler	CSS animasyonu destekler	Daha hızlı yüklenir	Ekran boyutuna veya ├ğ├Âz├╝n├╝rl├╝─şe g├Âre farkl─▒ g├Ârsel dosyalar─▒ sunabilir	D	orta	2026-10-14 20:02:06.213675	responsive_gorsel	picture,source,responsive,medya	43
44	frontend	html	<source> etiketi içindeki media niteliği ne işe yarar?	Hangi ekran boyutunda o g├Ârselin g├Âsterilece─şini belirtir	Ses dosyas─▒ ba─şlar	Video formatını tanımlar	Görsel boyutunu küçültür	A	orta	2026-10-14 20:02:06.213675	responsive_gorsel	picture,source,responsive,medya	43
111	frontend	css	Google Fonts üzerinden font bağlarken HTML de nereye link eklenir?	<body> en sonuna	CSS dosyas─▒n─▒n en alt─▒na	<footer> içine	<head> etiketlerinin aras─▒na	D	kolay	2026-10-14 20:48:04.982268	tipografi	font,yazi,tipografi,fontsize,googlefonts	89
113	frontend	css	Linklerin (<a>) altındaki varsayılan alt çizgiyi kaldırmak için ne yazılır?	text-underline: false;	text-decoration: none;	border: none;	font-style: normal;	B	kolay	2026-10-14 20:48:04.982268	metin_efektleri	metin,textalign,shadow,decoration,transform	90
114	frontend	css	Metne gölge efekti vermek için hangi özellik kullanılır?	box-shadow	filter: shadow	text-shadow	drop-shadow	C	kolay	2026-10-14 20:48:04.982268	metin_efektleri	metin,textalign,shadow,decoration,transform	90
122	frontend	css	display: none ile visibility: hidden arasındaki temel fark nedir?	visibility: hidden eleman─▒ ekrandan ve DOM dan siler	İkisi tamamen aynıdır	display: none eleman─▒ DOM ve yerle┼şimden tamamen siler gibi yer kaplatmaz, visibility: hidden ise eleman─▒ gizler ama yerini bo┼ş tutar	display: none animasyonla gizler	C	orta	2026-10-14 20:48:04.982268	display	display,block,inline,none,visibility	99
117	frontend	css	İki komşu elemanın dikey marginlerinin birleşerek tek bir margin oluşturması olayına ne ad verilir?	Margin Overflow	Margin Collapse (Çökmesi)	Margin Merge	Margin Flexing	B	zor	2026-10-14 20:48:04.982268	box_model	boxmodel,padding,margin,border,boxsizing	97
126	frontend	css	z-index özelliğinin çalışabilmesi için elemanın hangi kurala uyması şarttır?	display: block olması	mutlaka float uygulanm─▒┼ş olmas─▒	position de─şerinin static d─▒┼ş─▒nda bir de─şer (relative, absolute vb.) olmas─▒	sadece id seçicisi ile seçilmiş olması	C	orta	2026-10-14 20:48:04.982268	position	position,relative,absolute,fixed,sticky,zindex	100
135	frontend	css	max-width: 1200px kuralının anlamı nedir?	Eleman her zaman tam 1200px genişlikte olur	Mobil cihazlarda ├ğal─▒┼şmaz	Eleman en az 1200px olmak zorundadır	Eleman 1200px e kadar b├╝y├╝yebilir ama ekran daral─▒rsa k├╝├ğ├╝lebilir	D	kolay	2026-10-14 20:48:04.982268	boyutlandirma	width,height,vw,vh,responsive,boyut	103
141	frontend	css	Elemanların tek satıra sığmadığında alt satıra geçmesi için ne kullanılır?	flex-flow: multi	flex-wrap: wrap	wrap: true	display: multi-flex	B	kolay	2026-10-14 20:48:04.982268	flexbox_temel	flex,kapsayici,direction,wrap,eksen	111
143	frontend	css	justify-content: space-between ne işe yarar?	Sadece iki eleman varsa ├ğal─▒┼ş─▒r	Tüm elemanların etrafına eşit boşluk bırakır	Elemanları merkeze sıkıştırır	─░lk eleman─▒ ba┼şa, sonuncuyu sona yaslar ve aradaki bo┼şlu─şu e┼şit da─ş─▒t─▒r	D	orta	2026-10-14 20:48:04.982268	flexbox_justify	justify,center,spacebetween,spacearound,spaceevenly	112
335	backend	csharp	Kurucu metodların (Constructor) sınıf adı ve geri dönüş tipi kuralı nedir?	Sınıfla tamamen aynı ada sahiptir ve hiçbir geri dönüş tipi (void dahil) yazılmaz	Geriye her zaman int döner	Mutlaka construct adıyla tanımlanmalıdır	Sadece private tanımlanabilir	A	kolay	2026-10-16 23:58:17.500348	cs_oop_temel	csharp,cs_oop_temel,quiz	418
45	frontend	html	Tarayıcı picture içindeki hiçbir source koşulunu sağlamazsa ne gösterir?	Boş alan gösterir	En sondaki img etiketini yedek olarak g├Âsterir	Hata verir	Sayfayı çökertir	B	orta	2026-10-14 20:02:06.213675	responsive_gorsel	picture,source,responsive,medya	43
54	frontend	html	Tablonun başlığını tüm sütunlara yaymak için doğru kullanım hangisidir?	<th rowspan="tum">	<th width="100%">	<th colspan="sutun_sayisi">	<th span="all">	C	orta	2026-10-14 20:02:06.213675	tablolar_colspan	tablo,colspan,birlestir,sutun	52
60	frontend	html	Form içindeki name niteliği neden önemlidir?	Sunucuya g├Ânderilen verinin anahtar─▒ (key) olarak kullan─▒l─▒r	G├Ârsel etiket olarak g├Âsterilir	CSS sınıfı olarak çalışır	Zorunlu alan belirtir	A	orta	2026-10-14 20:02:06.213675	formlar_temel	form,label,action,method,input	59
75	frontend	html	pattern niteliği hangi amaçla kullanılır?	CSS pattern uygulamak için	Placholder ┼şekli vermek i├ğin	Alan şablonu oluşturmak için	Regex ile girdi format─▒n─▒ do─şrulamak i├ğin	D	zor	2026-10-14 20:02:06.213675	formlar_validation	validation,dogrulama,required,pattern	64
78	frontend	html	Her şey için div kullanmak yerine semantik etiket kullanmanın avantajı nedir?	Sayfa daha hızlı yüklenir	CSS yazmak kolayla┼ş─▒r	SEO s─▒ralamalar─▒n─▒ iyile┼ştirir ekran okuyucular i├ğin eri┼şilebilirlik sa─şlar	JavaScript kod azalır	C	orta	2026-10-14 20:02:06.213675	semantik_layout	semantik,header,nav,main,section,footer	71
80	frontend	html	video etiketinde controls niteliği ne sağlar?	Oynat/Duraklat ses gibi kullan─▒c─▒ kontrol butonlar─▒n─▒ g├Âsterir	Videonun kalitesini art─▒r─▒r	Videonun otomatik oynamasını sağlar	Altyazı ekler	A	kolay	2026-10-14 20:02:06.213675	medya_audio_video	video,audio,medya,multimedya	72
81	frontend	html	Tarayıcı video formatını desteklemediğinde ne gösterilir?	Hata sayfası açılır	source etiketleri aras─▒ndaki yedek metin veya alternatif source g├Âsterilir	Sayfa ├ğ├Âker	Boş alan kalır	B	orta	2026-10-14 20:02:06.213675	medya_audio_video	video,audio,medya,multimedya	72
87	frontend	html	details etiketinin varsayılan durumu nedir?	Açık	Taray─▒c─▒ya g├Âre de─şi┼şir	Yarı açık	Kapal─▒ (open niteli─şi eklenmedi─şi s├╝rece i├ğerik gizlidir)	D	orta	2026-10-14 20:02:06.213675	details_dialog	details,summary,dialog,popup,akordiyon	74
105	frontend	css	background-repeat: no-repeat ne işe yarar?	Resmin ┼şeffafl─▒─ş─▒n─▒ kald─▒r─▒r	Arka plan resminin d├Â┼şenerek tekrarlanmas─▒n─▒ engeller	Resmi ekranın tam ortasına alır	Arka planı siyah yapar	B	kolay	2026-10-14 20:48:04.982268	arkaplan	arkaplan,background,cover,image	87
147	frontend	css	align-items özelliğinin varsayılan (default) değeri nedir?	center	flex-start	baseline	stretch	D	orta	2026-10-14 20:48:04.982268	flexbox_align	alignitems,alignself,dikey,hizalama	113
150	frontend	css	flex-basis özelliği neyi belirler?	Elemanın büyüme hızını	Eleman─▒n z-index de─şerini	Eleman─▒n bo┼ş alan da─ş─▒t─▒lmadan ├Ânceki ba┼şlang─▒├ğ temel boyutunu	Flex yönünü	C	orta	2026-10-14 20:48:04.982268	flexbox_items	flexgrow,flexshrink,flexbasis,oran	114
153	frontend	css	Flexbox kullanarak bir footer ı sayfanın en altına yapıştırmak (sticky footer) için kapsayıcıya ne verilir?	position: absolute; bottom: 0;	min-height: 100vh; flex-direction: column; ve i├ğerik alan─▒na flex: 1;	clear: both;	margin-bottom: auto;	B	zor	2026-10-14 20:48:04.982268	flexbox_layout	aligncontent,stickyfooter,navbar,layout	116
159	frontend	css	minmax(200px, 1fr) fonksiyonu ne işe yarar?	Eleman─▒ ortalar	Sütunu 200px ile sınırlar asla büyütmez	Sadece mobilde çalışır	S├╝tunun en az 200px olmas─▒n─▒ ama yer varsa 1fr oran─▒nda b├╝y├╝mesini sa─şlar	D	orta	2026-10-14 20:49:07.721441	grid_temel	grid,fr,repeat,gap,minmax	124
164	frontend	css	Ekran genişledikçe boş sütunlar yaratmak yerine mevcut elemanları genişleterek alanı dolduran hangisidir?	auto-fit	auto-fill	auto-expand	auto-stretch	A	zor	2026-10-14 20:49:07.721441	grid_ileri	gridrow,gridcolumn,areas,autofit,autofill	127
165	frontend	css	Hiç media query yazmadan otomatik responsive kart ızgarası yapan ünlü kalıp hangisidir?	repeat(3, 1fr)	repeat(auto-fit, minmax(250px, 1fr))	flex: 1 1 auto	grid-template: responsive	B	zor	2026-10-14 20:49:07.721441	grid_ileri	gridrow,gridcolumn,areas,autofit,autofill	127
166	frontend	css	Flexbox ile CSS Grid arasındaki en temel mimari fark nedir?	Flexbox sadece butonlar içindir, Grid sadece tablolar içindir	Grid daha eski bir teknolojidir	Flexbox tek boyutlu (1D - sat─▒r VEYA s├╝tun), Grid ise iki boyutlu (2D - sat─▒r VE s├╝tun) yerle┼şim sa─şlar	Flexbox responsiveliği desteklemez	C	orta	2026-10-14 20:49:07.721441	grid_ileri	gridrow,gridcolumn,areas,autofit,autofill	128
173	frontend	css	Kart çevirme efektinde dönen kartın arkası göründüğünde ters metnin gizlenmesi için ne yazılır?	hide-back: true;	backface-visibility: hidden;	face-flip: none;	opacity-back: 0;	B	zor	2026-10-14 20:49:07.721441	transitions_transforms	transition,ease,delay,scale,rotate,3d	137
174	frontend	css	Butonun üzerine gelindiğinde farenin imlecinin "tıklanabilir el" şeklini alması için ne yazılır?	pointer: click;	mouse: hand;	cursor: pointer;	touch: active;	C	kolay	2026-10-14 20:49:07.721441	transitions_transforms	transition,ease,delay,scale,rotate,3d	138
175	frontend	css	Resmin üzerine siyah şeffaf bir katman bindirip hover da açığa çıkarmak için hangi teknik kullanılır?	margin-top negatif de─şer	display: none / block	filter: invert	Absolute konumlu overlay katman─▒ ve opacity ge├ği┼şi	D	orta	2026-10-14 20:49:07.721441	transitions_transforms	transition,ease,delay,scale,rotate,3d	138
177	frontend	css	Bir animasyonun hiç durmadan sonsuza kadar dönmesi için iteration-count ne olmalıdır?	loop	infinite	forever	unlimited	B	kolay	2026-10-14 20:49:07.721441	animations_keyframes	animation,keyframes,infinite,neon,blur	139
178	frontend	css	animation-fill-mode: forwards ne sağlar?	Animasyon bittiğinde elemanın başlangıç durumuna dönmesini	Animasyonun ileri geri oynamas─▒n─▒	Animasyon bitti─şinde eleman─▒n son keyframe deki stilinde sabit kalmas─▒n─▒	Animasyonu hızlandırır	C	orta	2026-10-14 20:49:07.721441	animations_keyframes	animation,keyframes,infinite,neon,blur	139
179	frontend	css	Bir butona neon parlama efekti vermek için hangi özellik çoklu değerlerle kullanılır?	border-color	outline-offset	filter: blur	box-shadow (├Ârn: 0 0 10px #00f, 0 0 20px #00f)	D	orta	2026-10-14 20:49:07.721441	animations_keyframes	animation,keyframes,infinite,neon,blur	140
180	frontend	css	Arka planı buzlu cam gibi bulanıklaştıran modern CSS özelliği hangisidir?	backdrop-filter: blur()	filter: blur()	background-blur()	glass: blur()	A	orta	2026-10-14 20:49:07.721441	animations_keyframes	animation,keyframes,infinite,neon,blur	141
184	frontend	css	clip-path özelliği ne işe yarar?	Eleman─▒ daire, ├ğokgen veya ├Âzel ┼şekillerde kesip k─▒rpar	Sayfa ba─şlant─▒lar─▒n─▒ k─▒salt─▒r	Resimleri otomatik sıkıştırır	Metinleri gizler	A	orta	2026-10-14 20:49:07.721441	modern_ui_efektler	glassmorphism,filter,clippath,pseudoelement	143
200	frontend	css	CSS te genişliği hesaplamak için genişlikten 40px çıkarmak istendiğinde ne kullanılır?	width: calc(100% - 40px);	width: 100% - 40px;	width: compute(100%, -40px);	width: eval(100% - 40px);	A	kolay	2026-10-14 20:49:07.721441	modern_css_features	scrollsnap,smooth,bem,specificity,calc,minmax	177
201	frontend	css	min(50vw, 500px) fonksiyonu ne yapar?	De─şerlerin ortalamas─▒n─▒ al─▒r	50vw ile 500px de─şerlerinden her zaman daha k├╝├ğ├╝k olan─▒n─▒ se├ğip uygular	Her zaman 500px yapar	Hata verir	B	orta	2026-10-14 20:49:07.721441	modern_css_features	scrollsnap,smooth,bem,specificity,calc,minmax	177
206	frontend	css	:is(h1, h2, h3) seçicisinin en büyük avantajı nedir?	Taray─▒c─▒y─▒ h─▒zland─▒r─▒r	Yazı boyutunu otomatik ayarlar	Se├ğicileri tekrar tekrar yazmay─▒ ├Ânleyip kodu k─▒salt─▒r ve okunabilirli─şi art─▒r─▒r	SEO puanını artırır	C	kolay	2026-10-14 20:49:07.721441	css_selectors_ileri	subgrid,willchange,contentvisibility,has,is,nthchild	180
185	frontend	css	::before veya ::after pseudo-elementinin ekranda render edilebilmesi için ZORUNLU özellik hangisidir?	display: block	content: "" (boş olsa dahi content)	position: absolute	width: 100%	B	kolay	2026-10-14 20:49:07.721441	modern_ui_efektler	glassmorphism,filter,clippath,pseudoelement	144
192	frontend	css	Container Queries (@container) ile Media Queries (@media) arasındaki fark nedir?	Media query tarayıcı penceresine (viewport) bakar, Container query ise elemanın doğrudan ebeveyn kutusunun boyutuna bakar	Container query sadece resimler içindir	Container query daha yavaştır	Media query artık kullanılmamaktadır	A	zor	2026-10-14 20:49:07.721441	responsive_media	mediaquery,mobilefirst,clamp,containerqueries,darkmode	154
193	frontend	css	Kullanıcının işletim sistemindeki karanlık tema tercihini yakalayan medya sorgusu hangisidir?	@media (theme: dark)	@media (prefers-color-scheme: dark)	@media (color-mode: dark)	@media (system-dark)	B	orta	2026-10-14 20:49:07.721441	responsive_media	mediaquery,mobilefirst,clamp,containerqueries,darkmode	154
336	backend	csharp	Bir alt sınıftan üst sınıfın kurucusunu veya metodunu tetiklemek için hangi anahtar kelime kullanılır?	this	base	parent	super	B	kolay	2026-10-16 23:58:17.500818	cs_oop_ileri	csharp,cs_oop_ileri,quiz	419
337	backend	csharp	Bir üst sınıf metodunun alt sınıfta ezilebilmesi (override edilebilmesi) için üst sınıfta nasıl tanımlanması gerekir?	static	private	virtual (veya abstract)	sealed	C	kolay	2026-10-16 23:58:17.501315	cs_oop_ileri	csharp,cs_oop_ileri,quiz	420
391	backend	cpp	Bir C++ programının işletim sistemi tarafından başlatıldığı ana giriş fonksiyonunun dönüş tipi ne olmalıdır?	int	void	double	bool	A	kolay	2026-10-17 01:19:51.373673	cpp_temeller_io	main,entry_point	506
210	backend	python	type(5 / 2) ifadesinin sonucu hangi veri tipini döndürür?	int	double	float	number	C	kolay	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	298
211	backend	python	Python da tam sayı bölmesi (bölümün sadece tam kısmını alan) operatörü hangisidir?	/	div()	%	//	D	kolay	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	299
212	backend	python	2 ** 3 işleminin sonucu kaçtır?	8	6	5	9	A	kolay	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	299
271	frontend	javascript	Template literals kullanırken değişkenleri string içine gömmek için hangi sözdizimi kullanılır?	%{degisken}	&{degisken}	#{degisken}	${degisken}	D	kolay	2026-10-14 21:44:25.890305	js_degiskenler_tipler	let,const,typeof,coercion,template_literals,math	194
268	frontend	javascript	"5" + 2 ve "5" - 2 işlemlerinin sonuçları sırasıyla nedir?	"52" ve 3	7 ve 3	"52" ve NaN	7 ve NaN	A	orta	2026-10-14 21:44:25.890305	js_degiskenler_tipler	let,const,typeof,coercion,template_literals,math	193
269	frontend	javascript	5 === "5" ifadesinin false dönmesinin nedeni nedir?	Değerlerin farklı olması	=== operatörünün hem değer hem de veri tipi eşitliğini (strict equality) kontrol etmesi	Stringlerin sayılarla kıyaslanamaması	Yazım hatası olması	B	kolay	2026-10-14 21:44:25.890305	js_degiskenler_tipler	let,const,typeof,coercion,template_literals,math	192
280	frontend	javascript	function topla(a, b = 10) tanımındaki b = 10 neyi ifade eder?	b arg├╝man─▒ g├Ânderilmedi─şinde alaca─ş─▒ varsay─▒lan (default) de─şeri	b nin her zaman 10 olaca─ş─▒n─▒	Tip kontrolünü	b nin sabit olduğunu	A	kolay	2026-10-14 21:44:25.890305	js_fonksiyonlar_scope	arrow,default_param,rest,closure,hoisting,pure	221
281	frontend	javascript	function demo(...args) ifadesindeki ... operatörünün görevi nedir?	Diziyi elemanlar─▒na ay─▒r─▒r	Gelen t├╝m arg├╝manlar─▒ args ad─▒nda bir diziye toplar (rest parameter)	Hata fırlatır	Parametreleri çarpar	B	orta	2026-10-14 21:44:25.890305	js_fonksiyonlar_scope	arrow,default_param,rest,closure,hoisting,pure	221
272	frontend	javascript	"JavaScript".slice(0, 4) ifadesinin çıktısı nedir?	"Java"	"Jav"	"JavaS"	"Script"	A	kolay	2026-10-14 21:44:25.890305	js_degiskenler_tipler	let,const,typeof,coercion,template_literals,math	195
282	frontend	javascript	Bir fonksiyonun kendi dışındaki (lexical) kapsamdaki değişkenleri fonksiyon bittikten sonra bile hatırlamasına ne denir?	Hoisting	Recursion	Closure (Kapan─▒┼ş)	Currying	C	orta	2026-10-14 21:44:25.890305	js_fonksiyonlar_scope	arrow,default_param,rest,closure,hoisting,pure	224
283	frontend	javascript	JavaScript te var ile tanımlanan değişkenlerin bildirimin en tepeye taşınması mekanizmasına ne ad verilir?	Scoping	Bubbling	Coercion	Hoisting	D	orta	2026-10-14 21:44:25.890305	js_fonksiyonlar_scope	arrow,default_param,rest,closure,hoisting,pure	223
284	frontend	javascript	Saf fonksiyon (Pure Function) kavramının temel kuralı nedir?	Ayn─▒ girdilere daima ayn─▒ ├ğ─▒kt─▒y─▒ vermesi ve hi├ğbir d─▒┼ş yan etki (side effect) ├╝retmemesi	─░├ğinde d├Âng├╝ bulundurmamas─▒	Arrow function olarak yazılması	Sadece matematiksel işlem yapması	A	orta	2026-10-14 21:44:25.890305	js_fonksiyonlar_scope	arrow,default_param,rest,closure,hoisting,pure	226
290	frontend	javascript	const yeniDizi = [...dizi1, ...dizi2] işlemindeki ... operatörünün adı nedir?	Rest Operatörü	Optional Chaining	Spread Operat├Âr├╝ (Yayma)	Nullish Coalescing	C	kolay	2026-10-14 21:44:25.890305	js_diziler_nesneler	push,map,filter,reduce,destructuring,spread,freeze	242
291	frontend	javascript	Bir nesnenin değiştirilmesini (yeni alan ekleme, silme, güncelleme) tamamen engellemek için ne kullanılır?	Object.seal()	const	Object.lock()	Object.freeze()	D	orta	2026-10-14 21:44:25.890305	js_diziler_nesneler	push,map,filter,reduce,destructuring,spread,freeze	238
296	frontend	javascript	Birçok alt eleman yerine tek bir ortak ebeveyne olay dinleyici ekleme tekniğinin adı nedir?	Event Delegation (Olay Yetkilendirmesi)	Event Throttling	Event Hoisting	Event Propagation	A	zor	2026-10-14 21:44:25.890305	js_dom_events	queryselector,classlist,preventdefault,bubbling,delegation,localstorage	256
338	backend	csharp	C# ta bir sınıfın birden fazla sınıftan miras alamayıp ancak birden fazla Interface uygulayabilmesinin nedeni nedir?	Interface lerin hafızada yer tutmaması	Derleyicinin hızlanması	C# ın çoklu sınıf kalıtımındaki Elmas Problemini (Diamond Problem) önlemek için çoklu Interface i desteklemesi	Interface lerin sadece metin içermesi	D	kolay	2026-10-16 23:58:17.501683	cs_interface_abstract	csharp,cs_interface_abstract,quiz	421
339	backend	csharp	Abstract bir sınıf (abstract class) hakkında aşağıdakilerden hangisi doğrudur?	new anahtar kelimesiyle doğrudan örneği (nesnesi) üretilemez; sadece miras alınarak alt sınıflar üzerinden kullanılır	İçinde gövdeli metod barındıramaz	Sadece bir adet metod içerebilir	Bütün değişkenleri static olmak zorundadır	A	kolay	2026-10-16 23:58:17.502116	cs_interface_abstract	csharp,cs_interface_abstract,quiz	422
297	frontend	javascript	LocalStorage a bir JavaScript nesnesi kaydederken hangi dönüşüm yapılmalıdır?	JSON.parse(nesne)	JSON.stringify(nesne)	nesne.toString()	String(nesne)	B	orta	2026-10-14 21:44:25.890305	js_dom_events	queryselector,classlist,preventdefault,bubbling,delegation,localstorage	259
309	frontend	javascript	Kullanıcı arama kutusuna yazı yazarken her tuşta değil, yazma bittikten 300ms sonra arama yapmak için kullanılan optimizasyon tekniği nedir?	Throttle	Debounce	Memoization	Lazy loading	B	zor	2026-10-14 21:44:25.890305	js_oop_moduller	classes,super,private_field,static,debounce,export	287
215	backend	python	f-string kullanarak ad = "Can" değişkenini "Merhaba Can" olarak yazdırmak için doğru sözdizimi hangisidir?	print("Merhaba {ad}")	print("Merhaba " + f{ad})	print(f"Merhaba ad")	print(f"Merhaba {ad}")	D	kolay	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	302
267	frontend	javascript	typeof null ifadesi JavaScript te geriye hangi tipi döndürür (meşhur JS hatası)?	"null"	"undefined"	"boolean"	"object"	D	orta	2026-10-14 21:44:25.890305	js_degiskenler_tipler	let,const,typeof,coercion,template_literals,math	190
270	frontend	javascript	Nullish Coalescing (??) operatörü || operatöründen farklı olarak hangi değerleri falsy saymaz?	null ve undefined	false ve NaN	0 ve "" (bo┼ş string)	Hiçbiri	C	zor	2026-10-14 21:44:25.890305	js_degiskenler_tipler	let,const,typeof,coercion,template_literals,math	197
213	backend	python	bool("") ve bool("0") ifadelerinin doğruluk değerleri sırasıyla nedir?	True, True	False, True	False, False	True, False	B	orta	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	298
214	backend	python	input() fonksiyonu kullanıcıdan alınan veriyi varsayılan olarak hangi tipte döndürür?	int	float	str (string)	Otomatik algılar	C	kolay	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	301
93	frontend	css	Aynı elemana hem harici class hem de inline style tanımlandığında hangisi geçerli olur?	Class stili kazanır	Inline style kazanır	En son yüklenen kazanır	Tarayıcı varsayılanı kazanır	B	orta	2026-10-14 20:48:04.982268	css_giris	css,baglama,link,style,inline	83
144	frontend	css	justify-content: space-evenly özelliğinin space-around tan farkı nedir?	Tüm elemanlar arası ve kenarlardaki tüm boşluklar harfiyen birbirine eşittir	Kenarlarda boşluk bırakmaz	Dikey eksende çalışır	Sadece mobilde fark eder	A	orta	2026-10-14 20:48:04.982268	flexbox_justify	justify,center,spacebetween,spacearound,spaceevenly	112
217	backend	python	"  kod  ".strip() metodunun çıktısı nedir?	"  kod"	"kod"	"kod  "	"  k  o  d  "	B	kolay	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	303
223	backend	python	Sözlükten (dict) var olmayan bir anahtar d["olmayan"] şeklinde çağrılırsa ne gerçekleşir?	None döner	Bo┼ş string d├Âner	Otomatik olarak 0 değeri atanır	KeyError hatas─▒ f─▒rlat─▒l─▒r	D	orta	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	312
226	backend	python	İki kümenin ortak elemanlarını (kesişim) bulmak için hangi operatör kullanılır?	|	^	&	-	C	kolay	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	315
225	backend	python	kume = {1, 2, 2, 3, 3, 3} kümesinin eleman sayısı (len(kume)) kaçtır?	6	3	1	Hata verir	B	kolay	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	314
227	backend	python	collections modülündeki defaultdict un standart dict e göre en büyük avantajı nedir?	Daha az bellek harcar	Sadece say─▒larla ├ğal─▒┼ş─▒r	Sıralamayı garanti eder	Olmayan bir anahtara eri┼şildi─şinde KeyError vermek yerine varsay─▒lan bir de─şer ├╝retir	D	zor	2026-10-14 21:42:46.105972	py_veri_yapilari	listeler,demetler,sozlukler,kumeler,defaultdict	317
251	backend	python	with open("veri.txt", "r") as f: kalıbının en büyük avantajı nedir?	Dosyayı daha hızlı okur	Salt okunur yapar	Dosyayı şifreler	─░┼şlem bitince veya hata ├ğ─▒ksa bile dosyay─▒ otomatik kapat─▒r (close)	D	orta	2026-10-14 21:42:46.105972	py_hata_dosya	try_except,finally,raise,with_open,json	359
240	backend	python	lambda x, y: x * y fonksiyonunun işlevi nedir?	x ve y yi çarpan tek satırlık anonim fonksiyon	x ve y yi toplayan fonksiyon	İki sayının modunu alan fonksiyon	Fonksiyonel döngü	A	kolay	2026-10-14 21:42:46.105972	py_fonksiyonlar	def,return,args,kwargs,mutable_default,global,lambda,sorted	339
241	backend	python	sorted([("Ali", 80), ("Veli", 95)], key=lambda x: x[1]) neye göre sıralar?	İsimlere göre	Notlara göre (ikinci eleman)	Alfabetik tersine	Rastgele	B	orta	2026-10-14 21:42:46.105972	py_fonksiyonlar	def,return,args,kwargs,mutable_default,global,lambda,sorted	340
253	backend	python	Python sözlüğünü JSON metnine dönüştüren json modülü fonksiyonu hangisidir?	json.parse()	json.dumps()	json.loads()	json.stringify()	B	orta	2026-10-14 21:42:46.105972	py_hata_dosya	try_except,finally,raise,with_open,json	362
258	backend	python	Alt sınıfta üst sınıfın kurucu metodunu çağırmak için ne yazılır?	parent().__init__()	base().__init__()	super().__init__()	this.__init__()	C	kolay	2026-10-14 21:42:46.105972	py_oop	init,self,private,property,super,str,len	373
259	backend	python	print(nesne) dendiğinde kullanıcı dostu metin basılmasını sağlayan dunder metod hangisidir?	__repr__	__show__	__print__	__str__	D	kolay	2026-10-14 21:42:46.105972	py_oop	init,self,private,property,super,str,len	375
260	backend	python	len(nesne) çağrısına yanıt verebilmek için sınıfa hangi metod eklenmelidir?	__len__	__count__	__size__	__length__	A	kolay	2026-10-14 21:42:46.105972	py_oop	init,self,private,property,super,str,len	375
266	frontend	javascript	JavaScript te let ile const arasındaki en temel fark nedir?	let fonksiyoneldir const blok kapsamlıdır	let sadece say─▒ tutar const metin tutar	const ile tan─▒mlanan de─şi┼şkene yeniden de─şer atanamaz (re-assign edilemez), let e atanabilir	const hoisted edilmez let edilir	C	kolay	2026-10-14 21:44:25.890305	js_degiskenler_tipler	let,const,typeof,coercion,template_literals,math	189
96	frontend	css	* (evrensel seçici) ne işe yarar?	Sayfadaki istisnas─▒z t├╝m HTML elemanlar─▒n─▒ se├ğer	Yaln─▒zca body etiketini se├ğer	Sadece görünür metinleri seçer	Yalnızca div elemanlarını seçer	A	kolay	2026-10-14 20:48:04.982268	seciciler_temel	secici,class,id,element,specificity	84
99	frontend	css	div ~ p seçicisi ile div + p seçicisi arasındaki temel fark nedir?	~ sadece ├ğocuklar─▒ se├ğer	~ hemen sonrakini, + ise tüm kardeşleri seçer	Aralarında hiçbir fark yoktur	+ hemen sonraki tek karde┼şi se├ğer, ~ ise sonraki t├╝m karde┼ş p elemanlar─▒n─▒ se├ğer	D	zor	2026-10-14 20:48:04.982268	seciciler_kombinator	secici,torun,cocuk,kardes,kombinator	85
116	frontend	css	Box Model hiyerarşisi içten dışa doğru hangi sırada ilerler?	Content > Padding > Border > Margin	Margin > Border > Padding > Content	Content > Border > Padding > Margin	Padding > Content > Border > Margin	A	kolay	2026-10-14 20:48:04.982268	box_model	boxmodel,padding,margin,border,boxsizing	97
154	frontend	css	Navbarda logo solda, menü linkleri sağda olacak şekilde yerleştirmek için en pratik kural nedir?	float: left ve float: right	position: fixed	display: flex ve justify-content: space-between	display: inline-block	C	kolay	2026-10-14 20:48:04.982268	flexbox_layout	aligncontent,stickyfooter,navbar,layout	116
186	frontend	css	Pseudo-elementler (::before/::after) HTML DOM ağacında gerçek etiket oluşturur mu?	Evet, inspect panelinde yeni <before> etiketi görülür	Sadece JavaScript ile olu┼şturulursa g├Âr├╝n├╝r	Hay─▒r, CSS taraf─▒ndan ├╝retilen yapay (pseudo) sunum katman─▒d─▒r	Yalnızca form elemanlarında görünür	C	orta	2026-10-14 20:49:07.721441	modern_ui_efektler	glassmorphism,filter,clippath,pseudoelement	144
207	frontend	css	ul li:nth-child(2n) kuralı hangi liste elemanlarını seçer?	Sadece ilk iki elemanı	Sadece son eleman─▒	Tüm tek numaralı elemanları	T├╝m ├ğift numaral─▒ elemanlar─▒ (2, 4, 6, ...)	D	orta	2026-10-14 20:49:07.721441	css_selectors_ileri	subgrid,willchange,contentvisibility,has,is,nthchild	180
216	backend	python	s = "Python" metninde s[::-1] ifadesi ne üretir?	"nohtyP"	"Python"	"P"	Hata verir	A	kolay	2026-10-14 21:42:46.105972	py_temeller_tipler	girinti,degisken,veri_tipleri,operatorler,input,fstring,string_metodlari	303
298	frontend	javascript	LocalStorage ile SessionStorage arasındaki temel fark nedir?	LocalStorage sadece string tutamaz	SessionStorage daha çok veri tutar	LocalStorage verileri taray─▒c─▒/sekme kapansa bile kal─▒c─▒d─▒r, SessionStorage sekme kapat─▒l─▒nca silinir	Aralarında fark yoktur	C	kolay	2026-10-14 21:44:25.890305	js_dom_events	queryselector,classlist,preventdefault,bubbling,delegation,localstorage	259
340	backend	csharp	C# 9+ ile gelen record tiplerinin class lardan en belirgin farkı nedir?	Metod kabul etmemesi	Değer tabanlı eşitlik (Value Equality) karşılaştırması yapması ve varsayılan olarak değişmez (immutable) veri modelleri sunması	Yalnızca veritabanında çalışması	Sadece tek bir property alabilmesi	B	kolay	2026-10-16 23:58:17.502529	cs_generics_records	csharp,cs_generics_records,quiz	423
341	backend	csharp	Generic yapıların (<T>) yazılıma kazandırdığı en büyük fayda nedir?	Kodları gizlemesi	Daha fazla RAM harcaması	Farklı tipler için aynı mantığı tip güvenli (type-safe) şekilde boxing/unboxing maliyeti olmadan tekrar kullanılabilir kılması	Sadece tamsayıları işlemesi	C	kolay	2026-10-16 23:58:17.502919	cs_generics_records	csharp,cs_generics_records,quiz	424
342	backend	csharp	sayilar.Where(x => x > 10).ToList() sorgusundaki Where fonksiyonunun işlevi nedir?	Sayıları toplar	Sayıları küçükten büyüğe sıralar	Tüm sayıları siler	Verilen koşulu (10'dan büyük olma) sağlayan elemanları filtreler	D	kolay	2026-10-16 23:58:17.503396	cs_linq	csharp,cs_linq,quiz	425
343	backend	csharp	LINQ sorgularında aranan şartı sağlayan ilk elemanı bulmak, bulamazsa null dönmek için hangisi kullanılır?	FirstOrDefault()	First()	Single()	FindAll()	A	kolay	2026-10-16 23:58:17.503992	cs_linq	csharp,cs_linq,quiz	426
344	backend	csharp	async ve await anahtar kelimeleriyle yazılan asenkron metodların en büyük kazanımı nedir?	Kodun çalışma süresini her zaman sıfırlaması	G/Ç (I/O, veritabanı, web istekleri) işlemleri sırasında ana iş parçacığını (UI thread) kilitlemeden eşzamanlı çalışabilirlik sağlaması	Veritabanını otomatik yedeklemesi	Döngüleri devre dışı bırakması	B	kolay	2026-10-16 23:58:17.504408	cs_asenkron	csharp,cs_asenkron,quiz	427
345	backend	csharp	C# ta using bildirimi (using var dosya = ...) kullanılan nesneler işlem bittiğinde hangi metodu otomatik tetikler?	Stop()	CloseAll()	Dispose()	End()	C	kolay	2026-10-16 23:58:17.504892	cs_asenkron	csharp,cs_asenkron,quiz	428
346	backend	csharp	C# ta sabit (değiştirilemez) bir değer tanımlamak için hangi anahtar kelime kullanılır?	readonly	static	fixed	const	D	kolay	2026-10-16 23:58:17.505331	cs_temeller	csharp,cs_temeller,quiz	395
347	backend	csharp	List<T> koleksiyonundaki tüm elemanları tek hamlede temizlemek için hangi metod çağrılır?	Clear()	RemoveAll()	Delete()	Empty()	A	kolay	2026-10-16 23:58:17.505759	cs_koleksiyonlar	csharp,cs_koleksiyonlar,quiz	409
348	backend	csharp	Koleksiyonda verilen şarta uyan en az bir eleman olup olmadığını bool olarak dönen en hızlı LINQ metodu hangisidir?	Count() > 0	Any()	All()	Contains()	B	kolay	2026-10-16 23:58:17.506107	cs_linq	csharp,cs_linq,quiz	426
349	backend	csharp	Bir sınıfın başka bir sınıf tarafından miras alınmasını tamamen engellemek (mührünü basmak) için hangi anahtar kelime kullanılır?	lock	final	sealed	static	C	kolay	2026-10-16 23:58:17.506478	cs_oop_ileri	csharp,cs_oop_ileri,quiz	419
350	backend	csharp	Değer döndürmeyen asenkron bir metodun standart C# dönüş tipi ne olmalıdır?	async void (özel olaylar hariç)	void	Promise	Task	D	kolay	2026-10-16 23:58:17.506906	cs_asenkron	csharp,cs_asenkron,quiz	427
351	backend	sql	İlişkisel Veritabanlarında (RDBMS) bir tablonun tüm satır ve sütunlarını çekmek için hangi komut kullanılır?	SELECT * FROM tablo_adi;	GET ALL FROM tablo_adi;	FETCH ROWS FROM tablo_adi;	PULL * FROM tablo_adi;	A	kolay	2026-10-17 01:01:54.123149	sql_temel_select	sql,sql_temel_select,quiz	450
352	backend	sql	SELECT sorgusunda bir sütuna geçici takma isim (alias) vermek için hangi anahtar kelime kullanılır?	LIKE	AS	INTO	NAME	B	kolay	2026-10-17 01:01:54.139673	sql_temel_select	sql,sql_temel_select,quiz	451
353	backend	sql	SELECT sorgusunda tekrar eden (mükerrer) satırları eleyip yalnızca benzersiz değerleri listelemek için ne kullanılır?	UNIQUE ONLY	NO REPEAT	DISTINCT	SINGLE	C	kolay	2026-10-17 01:01:54.140251	sql_temel_select	sql,sql_temel_select,quiz	452
354	backend	sql	Sorgu sonucunun ilk 10 satırını atlayıp sonraki 5 satırını getirmek için doğru kalıp hangisidir?	SKIP 10 TAKE 5	TOP 5 SKIP 10	ROW 10 TO 15	LIMIT 5 OFFSET 10	D	kolay	2026-10-17 01:01:54.141999	sql_temel_select	sql,sql_temel_select,quiz	453
355	backend	sql	Tablodan belirli bir şartı (örneğin fiyatı 100 TL'den büyük olanları) sağlayan kayıtları filtrelemek için hangi anahtar kelime kullanılır?	WHERE	HAVING	FILTER	CHECK	A	kolay	2026-10-17 01:01:54.14258	sql_filtreleme_siralama	sql,sql_filtreleme_siralama,quiz	454
356	backend	sql	Birden fazla filtre şartından HER İKİSİNİN de aynı anda sağlanması istendiğinde hangi mantıksal operatör kullanılır?	OR	AND	BOTH	UNION	B	kolay	2026-10-17 01:01:54.143119	sql_filtreleme_siralama	sql,sql_filtreleme_siralama,quiz	455
357	backend	sql	Sorgu sonuçlarını en yüksek puandan en düşük puana (büyükten küçüğe / azalan) sıralamak için ne yazılır?	ORDER BY puan ASC	SORT BY puan DOWN	ORDER BY puan DESC	ARRANGE BY puan REVERSE	C	kolay	2026-10-17 01:01:54.143625	sql_filtreleme_siralama	sql,sql_filtreleme_siralama,quiz	456
358	backend	sql	Bir sütunun birden fazla belirli değerden birine eşit olup olmadığını (örneğin Şehir 'Ankara', 'İzmir' veya 'Bursa') kontrol eden en pratik operatör hangisidir?	BETWEEN	LIKE	EXISTS	IN	D	kolay	2026-10-17 01:01:54.144067	sql_gelismis_operatorler	sql,sql_gelismis_operatorler,quiz	457
359	backend	sql	WHERE fiyat BETWEEN 100 AND 500 ifadesi hakkında hangisi doğrudur?	100 ve 500 sınır değerleri dahildir ve bu aralıktaki tüm sayıları kapsar	Yalnızca 100 ve 500 sayılarını alır	100 ve 500 sınır değerleri hariç tutulur	Sadece tamsayılarda çalışır	A	kolay	2026-10-17 01:01:54.144571	sql_gelismis_operatorler	sql,sql_gelismis_operatorler,quiz	458
360	backend	sql	LIKE '%kod%' filtresi hangi metinleri yakalar?	Yalnızca 'kod' harfleriyle başlayanları	İçinde 'kod' kelimesi herhangi bir yerinde geçen tüm metinleri	Sadece tam olarak 'kod' kelimesine eşit olanları	Yalnızca 'kod' ile bitenleri	B	kolay	2026-10-17 01:01:54.144973	sql_gelismis_operatorler	sql,sql_gelismis_operatorler,quiz	459
361	backend	sql	SQL'de bir sütundaki değerin boş/tanımsız (NULL) olup olmadığını kontrol etmek için neden kolon = NULL yazılamaz?	PostgreSQL'de = işareti yasak olduğu için	NULL sadece sayılarla karşılaştırıldığı için	NULL bilinmeyen bir durumu temsil ettiği için hiçbir şeye (kendine bile) eşitlenemez; bu yüzden IS NULL kullanılır	Sadece metinlerde = NULL çalışır	C	kolay	2026-10-17 01:01:54.145443	sql_gelismis_operatorler	sql,sql_gelismis_operatorler,quiz	460
362	backend	sql	COALESCE(telefon, 'Yok') fonksiyonunun işlevi nedir?	Telefon numarasını şifreler	Telefon numarası formatını doğrular	Telefon kolonunu siler	telefon kolonu NULL ise ekrana 'Yok' yazar, NULL değilse gerçek telefon numarasını yazar	D	kolay	2026-10-17 01:01:54.146343	sql_gelismis_operatorler	sql,sql_gelismis_operatorler,quiz	461
363	backend	sql	Tablodaki tüm satırların sayısını veren toplama fonksiyonu hangisidir?	COUNT(*)	SUM(*)	TOTAL(*)	SIZE(*)	A	kolay	2026-10-17 01:01:54.147388	sql_aggregate_groupby	sql,sql_aggregate_groupby,quiz	462
364	backend	sql	Bir tablodaki sayısal bir kolonun ortalama değerini hesaplayan fonksiyon hangisidir?	MEAN()	AVG()	MEDIAN()	AVERAGE()	B	kolay	2026-10-17 01:01:54.147976	sql_aggregate_groupby	sql,sql_aggregate_groupby,quiz	462
365	backend	sql	Verileri belirli bir sütuna göre (örneğin kategori veya departman) gruplayıp her grubun istatistiğini almak için ne kullanılır?	ORDER BY	SORT BY	GROUP BY	CLUSTER BY	C	kolay	2026-10-17 01:01:54.148447	sql_aggregate_groupby	sql,sql_aggregate_groupby,quiz	464
366	backend	sql	GROUP BY ile gruplanmış sonuçlar üzerinde toplama fonksiyonlarına göre (örneğin COUNT(*) > 5) filtre koymak için hangisi kullanılır?	WHERE	FILTER	CHECK	HAVING	D	kolay	2026-10-17 01:01:54.1489	sql_aggregate_groupby	sql,sql_aggregate_groupby,quiz	465
368	backend	sql	Bir tabloda PRIMARY KEY tanımlanan bir sütun hangi iki temel kuralı kesinlikle sağlamak zorundadır?	Sadece negatif sayı ve NULL olmalıdır	Değerleri benzersiz (UNIQUE) olmalı ve asla boş (NULL) olamaz	Metin içermeli ve şifrelenmiş olmalıdır	Sadece otomatik artan sayı olabilir	B	kolay	2026-10-17 01:01:54.149839	sql_ddl_tablolar_constraints	sql,sql_ddl_tablolar_constraints,quiz	467
369	backend	sql	İlişkili iki tabloda ana kayıt (örneğin Müşteri) silindiğinde, ona bağlı siparişlerin de otomatik silinmesi için hangi kural tanımlanır?	ON DELETE BLOCK	ON DELETE RESTRICT	ON DELETE CASCADE	ON DELETE SET NULL	C	kolay	2026-10-17 01:01:54.150547	sql_ddl_tablolar_constraints	sql,sql_ddl_tablolar_constraints,quiz	468
370	backend	sql	Mevcut çalışan bir tabloya yeni bir sütun eklemek için hangi SQL komutu verilir?	UPDATE TABLE tablo ADD COLUMN ...	INSERT COLUMN INTO tablo ...	MODIFY TABLE tablo ...	ALTER TABLE tablo ADD COLUMN ...	D	kolay	2026-10-17 01:01:54.151128	sql_ddl_tablolar_constraints	sql,sql_ddl_tablolar_constraints,quiz	469
371	backend	sql	TRUNCATE TABLE ile DROP TABLE arasındaki en temel fark nedir?	TRUNCATE tablonun şemasını koruyarak tüm satırları sıfırlar; DROP ise tabloyu tamamen veritabanından siler	İkisi tamamen aynıdır	DROP sadece tek bir satırı siler	TRUNCATE geri alınamaz ama DROP geri alınabilir	A	kolay	2026-10-17 01:01:54.151543	sql_ddl_tablolar_constraints	sql,sql_ddl_tablolar_constraints,quiz	470
372	backend	sql	Tabloya yeni satır (kayıt) eklemek için hangi komut kullanılır?	ADD ROW INTO	INSERT INTO	NEW RECORD	PUT INTO	B	kolay	2026-10-17 01:01:54.152057	sql_dml_islemler	sql,sql_dml_islemler,quiz	471
373	backend	sql	PostgreSQL'de INSERT işleminden hemen sonra otomatik üretilen id değerini tek sorguda geri almak için ne eklenir?	RETURN ID	GET ID	RETURNING id	FETCH id	C	kolay	2026-10-17 01:01:54.152524	sql_dml_islemler	sql,sql_dml_islemler,quiz	471
374	backend	sql	Bir tablodaki verileri güncellerken (UPDATE) WHERE şartı yazılmazsa ne olur?	Hiçbir şey olmaz sorgu hata verir	Sadece ilk satır güncellenir	Sadece son eklenen satır güncellenir	Tablodaki İSTİSNASIZ TÜM satırlar güncellenir ve veri kaybı riski doğar	D	kolay	2026-10-17 01:01:54.152933	sql_dml_islemler	sql,sql_dml_islemler,quiz	473
375	backend	sql	Tablodan belirli kayıtları güvenli şekilde silmek için kullanılan DML komutu hangisidir?	DELETE FROM tablo WHERE ...	REMOVE FROM tablo WHERE ...	DROP ROWS FROM tablo WHERE ...	CLEAR FROM tablo WHERE ...	A	kolay	2026-10-17 01:01:54.153358	sql_dml_islemler	sql,sql_dml_islemler,quiz	474
376	backend	sql	INNER JOIN iki tabloyu birleştirirken hangi satırları sonuç kümesine dahil eder?	Her iki tablodaki tüm satırları	Yalnızca her iki tabloda da birbiriyle eşleşen ortak satırları (kesişim)	Yalnızca sol tablodaki eşleşmeyen satırları	Sadece boş (NULL) satırları	B	kolay	2026-10-17 01:01:54.154046	sql_joins	sql,sql_joins,quiz	475
377	backend	sql	Müşteriler tablosundaki tüm müşterileri ve varsa siparişlerini listelemek, henüz hiç siparişi olmayan müşterileri de kaybetmemek için hangi JOIN kullanılır?	RIGHT JOIN	INNER JOIN	LEFT JOIN	CROSS JOIN	C	kolay	2026-10-17 01:01:54.154506	sql_joins	sql,sql_joins,quiz	476
378	backend	sql	Bir tablonun hiyerarşik ilişkileri (örneğin Çalışan - Yönetici ilişkisi) modellemek için kendisiyle birleştirilmesine ne ad verilir?	Outer Join	Cross Join	Auto Join	Self JOIN	D	kolay	2026-10-17 01:01:54.154899	sql_joins	sql,sql_joins,quiz	478
379	backend	sql	Bir SELECT sorgusunun WHERE bloğu içine başka bir SELECT sorgusu yazılmasına ne ad verilir?	Alt Sorgu (Subquery / Nested Query)	Stored Procedure	Database Trigger	View	A	kolay	2026-10-17 01:01:54.155292	sql_subqueries_cte	sql,sql_subqueries_cte,quiz	479
380	backend	sql	Karmaşık alt sorguları geçici ve okunabilir bir tablo ifadesi haline getirmek için kullanılan SQL yapısı (WITH) nedir?	Cursor	CTE (Common Table Expression)	Temp File	Index Pool	B	kolay	2026-10-17 01:01:54.15586	sql_subqueries_cte	sql,sql_subqueries_cte,quiz	480
381	backend	sql	Milyonlarca satırlık bir tabloda e-posta aramalarının yavaşlamasını önlemek ve hızlandırmak için hangi veritabanı nesnesi oluşturulur?	Trigger	Foreign Key	İndeks (Index: CREATE INDEX)	Check Constraint	C	kolay	2026-10-17 01:01:54.156366	sql_indeks_performans	sql,sql_indeks_performans,quiz	481
382	backend	sql	PostgreSQL'de bir sorgunun arka planda nasıl çalıştığını ve indeks kullanıp kullanmadığını analiz etmek için sorgunun başına ne yazılır?	DEBUG QUERY	ANALYZE NOW	PROFILE SQL	EXPLAIN ANALYZE	D	kolay	2026-10-17 01:01:54.157163	sql_indeks_performans	sql,sql_indeks_performans,quiz	481
383	backend	sql	Sıkça kullanılan karmaşık bir JOIN sorgusunu sanal bir tablo olarak kaydedip pratik şekilde SELECT çekmek için ne kullanılır?	VIEW (Görünüm: CREATE VIEW)	TRIGGER	PROCEDURE	SCHEMA	A	kolay	2026-10-17 01:01:54.157593	sql_indeks_performans	sql,sql_indeks_performans,quiz	482
384	backend	sql	Veritabanlarında ACID prensiplerinden 'A' (Atomicity / Bölünemezlik) neyi garanti eder?	Tüm işlemlerin şifrelenmesini	Bir transaction içindeki tüm adımların 'ya hep birlikte tamamen başarılı olacağını ya da tek bir hata halinde hiçbirinin gerçekleşmemiş gibi geri alınacağını'	Veritabanının asla çökmeyeceğini	Sadece tek bir kullanıcının bağlanabileceğini	B	kolay	2026-10-17 01:01:54.158134	sql_transaction_acid	sql,sql_transaction_acid,quiz	483
385	backend	sql	Bir Transaction bloğunu başlatmak için kullanılan standart SQL komutu hangisidir?	START RUN;	OPEN TRANSACTION;	BEGIN (veya BEGIN TRANSACTION);	LAUNCH;	C	kolay	2026-10-17 01:01:54.158507	sql_transaction_acid	sql,sql_transaction_acid,quiz	484
386	backend	sql	Bir Transaction bloğu içindeki işlemlerde hata meydana geldiğinde yapılan tüm değişiklikleri iptal edip geri almak için ne yazılır?	CANCEL;	UNDO;	ABORT ALL;	ROLLBACK;	D	kolay	2026-10-17 01:01:54.15883	sql_transaction_acid	sql,sql_transaction_acid,quiz	484
387	backend	sql	Bir Transaction bloğunda yapılan tüm değişiklikleri kalıcı hale getirmek ve diske yazmak için hangi komut verilir?	COMMIT;	SAVE NOW;	APPLY;	PERSIST;	A	kolay	2026-10-17 01:01:54.159112	sql_transaction_acid	sql,sql_transaction_acid,quiz	484
388	backend	sql	İki tablo arasındaki Kartezyen çarpımı (sol tablodaki her satırın sağ tablodaki tüm satırlarla eşleştirilmesi) hangi JOIN ile yapılır?	FULL JOIN	CROSS JOIN	NATURAL JOIN	SELF JOIN	B	kolay	2026-10-17 01:01:54.159424	sql_joins	sql,sql_joins,quiz	477
389	backend	sql	Bir sütundaki değerin belirli bir şartı sağlamasını (örneğin yaş >= 0 veya bakiye >= 0) zorunlu kılan kısıtlama hangisidir?	NOT NULL	UNIQUE	CHECK (CHECK constraint)	DEFAULT	C	kolay	2026-10-17 01:01:54.159849	sql_ddl_tablolar_constraints	sql,sql_ddl_tablolar_constraints,quiz	467
390	backend	sql	Kayıt eklenirken sütuna herhangi bir değer verilmezse otomatik atanacak değeri belirleyen kısıtlama hangisidir?	FALLBACK	INITIAL	AUTO	DEFAULT	D	kolay	2026-10-17 01:01:54.160235	sql_ddl_tablolar_constraints	sql,sql_ddl_tablolar_constraints,quiz	466
393	backend	cpp	C++ ta bir ifadenin veya fonksiyonun çalışma zamanında değil, derleme zamanında (compile-time) hesaplanacağını garanti etmek için hangi anahtar kelime kullanılır?	const	inline	constexpr	static	C	orta	2026-10-17 01:19:51.373673	cpp_temeller_io	constexpr,compile_time	508
394	backend	cpp	std::cout ile ekrana yazdırma yaparken std::endl ile "\\n" arasındaki performans farkının temel nedeni nedir?	"\\n" ekrana basamaz	std::endl yeni satıra geçmez	Fark yoktur	std::endl yeni satıra geçtikten sonra çıkış arabelleğini zorla boşaltır (flush)	D	kolay	2026-10-17 01:19:51.373673	cpp_temeller_io	cout,endl,flush	509
395	backend	cpp	Büyük nesnelerden oluşan bir vektör üzerinde range-based for döngüsüyle gezinirken gereksiz bellek kopyalamasını önlemek için hangi yazım tercih edilmelidir?	for (const auto& eleman : v)	for (auto eleman : v)	for (auto* eleman : v)	for (eleman in v)	A	orta	2026-10-17 01:19:51.373673	cpp_kontrol_donguler	range_for,const_ref	512
396	backend	cpp	C++17 ile gelen başlatıcılı if (if with initializer) yapısının sağladığı en büyük avantaj nedir?	Döngüleri hızlandırması	Koşul için tanımlanan değişkenin kapsamını (scope) sadece if-else bloğu ile sınırlaması	Pointer kullanımını yasaklaması	Belleği otomatik sıfırlaması	B	orta	2026-10-17 01:19:51.373673	cpp_kontrol_donguler	if_init,cpp17	510
397	backend	cpp	switch-case bloklarında bir case tamamlandıktan sonra alttaki case e istemsizce geçilmesini önlemek için hangi anahtar kelime konulmalıdır?	continue	exit	break	return	C	kolay	2026-10-17 01:19:51.373673	cpp_kontrol_donguler	switch,fallthrough	510
398	backend	cpp	Bir for döngüsü içerisinde continue deyimi çalıştığında döngünün davranışı ne olur?	Döngü tamamen sonlanır	Program çöker	Tüm sayaçlar sıfırlanır	O anki iterasyonun kalanını atlayarak doğrudan artırma/güncelleme adımına geçer	D	kolay	2026-10-17 01:19:51.373673	cpp_kontrol_donguler	continue,loop	511
399	backend	cpp	C++ referansları (&) ile işaretçiler (pointers - *) arasındaki en temel farklardan biri hangisidir?	Referanslar boş (null/nullptr) olamaz ve tanımlandığı anda bir değişkene bağlanmalıdır	Referanslar bellekte tutulamaz	Referanslar fonksiyonlara parametre olarak gönderilemez	İşaretçiler asla nullptr alamaz	A	orta	2026-10-17 01:19:51.373673	cpp_fonksiyonlar_referanslar	references,nullability	514
400	backend	cpp	void takas(int a, int b) şeklinde yazılan bir fonksiyona gonderilen değişkenlerin orijinal değerlerinin değişmemesinin sebebi nedir?	C++ takasa izin vermez	Parametreler değer ile aktarıldığı (pass-by-value) için fonksiyon içinde kopyaları üzerinde çalışılır	Fonksiyon void olduğu için	Bellek kilitlendiği için	B	kolay	2026-10-17 01:19:51.373673	cpp_fonksiyonlar_referanslar	pass_by_reference,swap	514
401	backend	cpp	Fonksiyonlara büyük bir std::string parametresi gönderilirken neden const std::string& kullanımı tavsiye edilir?	Yalnızca küçük harflere izin vermek için	Metni otomatik ters çevirmek için	Hem gereksiz string kopyalamasını önler hem de orijinal verinin kazara değiştirilmesini engeller	String sınıfında değer aktarımı yasak olduğu için	C	orta	2026-10-17 01:19:51.373673	cpp_fonksiyonlar_referanslar	const_ref,performance	515
402	backend	cpp	Aynı isimli birden fazla fonksiyonun tanımlanabilmesi (Function Overloading) için hangi koşul ZORUNLUDUR?	Dönüş tiplerinin farklı olması yeterlidir	Fonksiyonların farklı dosyalarda olması gerekir	inline olarak bildirilmeleri gerekir	Parametre sayılarının veya parametre tiplerinin birbirinden farklı olması gerekir	D	kolay	2026-10-17 01:19:51.373673	cpp_fonksiyonlar_referanslar	function_overloading	515
403	backend	cpp	int x = 25; int* ptr = &x; tanımlamasından sonra *ptr = 50; işlemi yapıldığında x değişkeninin yeni değeri ne olur?	50	25	0	Hata verir	A	kolay	2026-10-17 01:19:51.373673	cpp_pointer_bellek	pointer,dereference	516
404	backend	cpp	C++11 ile eski C stili NULL veya 0 sabiti yerine neden nullptr anahtar kelimesi getirilmiştir?	Daha az harf içerdiği için	0 bir tamsayı iken nullptr ın tür güvenli (pointer tipinde) olması ve fonksiyon aşırı yüklemede karışıklığı önlemesi için	NULL artık derlenmediği için	nullptr belleği hızlandırdığı için	B	orta	2026-10-17 01:19:51.373673	cpp_pointer_bellek	nullptr,type_safety	517
405	backend	cpp	int* dizi = new int[50]; şeklinde ayrılan dinamik bir diziyi bellekten temizlemek için hangi silme komutu kullanılmalıdır?	free(dizi);	delete dizi;	delete[] dizi;	remove dizi;	C	orta	2026-10-17 01:19:51.373673	cpp_pointer_bellek	delete_array,memory_leak	518
407	backend	cpp	std::unique_ptr akıllı işaretçisiyle ilgili aşağıdaki ifadelerden hangisi DOĞRUDUR?	Kopyalanamaz (copy constructible değildir), tekil mülkiyete sahiptir ancak std::move ile taşınabilir	Birden fazla unique_ptr aynı bellek adresini paylaşabilir	Belleği serbest bırakmak için manuel delete çağırmak şarttır	İçinde sadece ilkel (int, double) tipler tutulabilir	A	orta	2026-10-17 01:19:51.373673	cpp_smart_pointers_raii	unique_ptr,ownership	520
408	backend	cpp	C++14 ile gelen std::make_unique<T>() fonksiyonunun new T() kullanımına göre en önemli avantajı nedir?	Belleği heap yerine stack te açması	İstisna güvenliği (exception safety) sağlaması ve tekil bellek tahsisini daha temiz ve güvenli yapması	Tüm değişkenleri sıfırlaması	Daha yavaş ama güvenli olması	B	zor	2026-10-17 01:19:51.373673	cpp_smart_pointers_raii	make_unique,cpp14	520
409	backend	cpp	İki nesnenin birbirini std::shared_ptr ile tutması sonucu referans sayacının hiçbir zaman sıfırlanamaması (döngüsel referans) sorununu çözmek için hangisi kullanılır?	std::auto_ptr	void*	std::weak_ptr	raw pointer	C	zor	2026-10-17 01:19:51.373673	cpp_smart_pointers_raii	weak_ptr,circular_ref	521
410	backend	cpp	RAII (Resource Acquisition Is Initialization) tasarım felsefesinin temel ilkesi nedir?	Tüm değişkenlerin global yapılması	Belleğin yalnızca işletim sistemi kapanırken temizlenmesi	İşaretçilerin tamamen yasaklanması	Kaynağın nesnenin kurucusunda tahsis edilmesi ve nesne kapsam dışına çıktığında yıkıcısında otomatik serbest bırakılması	D	orta	2026-10-17 01:19:51.373673	cpp_smart_pointers_raii	raii,concept	519
411	backend	cpp	C++ dilinde class ile struct arasındaki TEK temel sözdizimsel fark nedir?	struct üyeleri varsayılan olarak public, class üyeleri varsayılan olarak private tır	struct içine metot yazılamaz	class kalıtımı desteklemez	struct sanal fonksiyon barındıramaz	A	kolay	2026-10-17 01:19:51.373673	cpp_oop_siniflar_ctor	class_vs_struct	522
412	backend	cpp	C++ kurucu metodunda Nokta(int x, int y) : x_(x), y_(y) {} (üye başlatma listesi) kullanımının kurucu gövdesinde atama yapmaya göre avantajı nedir?	Daha fazla bellek tüketmesi	Üyeleri önce varsayılan değerle kurup sonra atamak yerine doğrudan istenen değerle tek adımda inşa etmesi	private alanlara erişimi engellemesi	Kalıtımı kapatması	B	orta	2026-10-17 01:19:51.373673	cpp_oop_siniflar_ctor	member_init_list	523
413	backend	cpp	Tek parametre alan bir kurucu metodun başına explicit yazılmasının amacı nedir?	Kurucuyu private yapmak	Sınıfın kopyalanmasını engellemek	Derleyicinin beklenmedik örtük (implicit) tip dönüşümleri yapmasını engellemek	Sınıfı sanal yapmak	C	orta	2026-10-17 01:19:51.373673	cpp_oop_siniflar_ctor	explicit,conversion	524
414	backend	cpp	Taşıma kurucusunun (Move Constructor) kurucu parametresi olarak aldığı && simgesi neyi temsil eder?	Mantıksal VE işlemini	Çift işaretçiyi (pointer to pointer)	Bit düzeyinde kaydırmayı	Sağ taraf referansını (rvalue reference - geçici nesne referansı)	D	zor	2026-10-17 01:19:51.373673	cpp_oop_siniflar_ctor	move_constructor,rvalue	525
415	backend	cpp	Temel bir sınıfta sanal fonksiyonlar (virtual) bulunuyorsa o sınıfın yıkıcısının (destructor) virtual yapılmasının kritik önemi nedir?	Türetilmiş sınıf nesnesi temel sınıf işaretçisiyle delete edildiğinde türemiş sınıfın yıkıcısının da çağrılmasını garanti etmek	Bellek tahsisini 2 kat hızlandırmak	Sınıfın kalıtılmasını engellemek	Sınıf üyelerini korumak	A	zor	2026-10-17 01:19:51.373673	cpp_oop_kalitim_polymorphism	virtual_destructor	527
416	backend	cpp	virtual void ciz() = 0; sözdizimi C++ ta ne anlama gelir?	ciz fonksiyonunun 0 döndürdüğü	Bu fonksiyonun saf sanal (pure virtual) olduğu ve sınıfı soyut (abstract) sınıf yaptığı	Fonksiyonun silindiği	Fonksiyonun private olduğu	B	orta	2026-10-17 01:19:51.373673	cpp_oop_kalitim_polymorphism	pure_virtual,abstract	528
417	backend	cpp	Türetilmiş sınıfta ezilen bir sanal metodun sonuna C++11 override yazmanın en büyük faydası nedir?	Metodu static yapar	Metodun hızını artırır	Temel sınıfta aynı imzaya sahip bir sanal metot yoksa derleyicinin hata vermesini sağlayarak yazım hatalarını önler	Metodu private yapar	C	orta	2026-10-17 01:19:51.373673	cpp_oop_kalitim_polymorphism	override,keyword	527
418	backend	cpp	Bir sınıf tanımında class Yonetici final : public Calisan {} ifadesindeki final ne işe yarar?	Yonetici sınıfının tüm metotlarını siler	Yonetici nesnelerinin değiştirilmesini engeller	Yonetici sınıfını soyut yapar	Yonetici sınıfından başka hiçbir sınıfın türetilemeyeceğini (miras alamayacağını) bildirir	D	orta	2026-10-17 01:19:51.373673	cpp_oop_kalitim_polymorphism	final,inheritance	529
419	backend	cpp	std::cout << nesne yazabilmek için aşırı yüklenen operator<< fonksiyonu neden çoğunlukla friend veya serbest fonksiyon olarak tanımlanır?	Sol taraftaki işlenen std::ostream tipinde olduğu ve sınıfımıza ait bir üye olamayacağı için	cout un private olduğu için	C++ üye fonksiyonlara izin vermediği için	cout un sadece tamsayı basabildiği için	A	zor	2026-10-17 01:19:51.373673	cpp_operator_overloading_friend	stream_insertion,friend	531
420	backend	cpp	Bir sınıfın içinde friend class B; bildirimi yapıldığında bu ne anlama gelir?	A sınıfı B nin tüm private üyelerine erişebilir	B sınıfı A nın private ve protected üyelerine doğrudan erişebilir	A ve B birbirini miras almıştır	B sınıfı silinir	B	orta	2026-10-17 01:19:51.373673	cpp_operator_overloading_friend	friend_class,access	532
421	backend	cpp	C++ ta iki Vektor nesnesini v1 + v2 şeklinde toplamak için hangi fonksiyon tanımlanmalıdır?	plus(const Vektor&)	add(const Vektor&)	Vektor operator+(const Vektor&) const	operator_add(const Vektor&)	C	orta	2026-10-17 01:19:51.373673	cpp_operator_overloading_friend	operator_overloading_syntax	530
422	backend	cpp	Aşağıdaki C++ operatörlerinden hangisi aşırı YÜKLENEMEZ (overload edilemez)?	operator+	operator==	operator[]	operator:: (Scope resolution) ve operator. (Nokta üye erişim)	D	zor	2026-10-17 01:19:51.373673	cpp_operator_overloading_friend	non_overloadable_operators	530
423	backend	cpp	template <typename T> T topla(T a, T b) şablon fonksiyonu topla(3, 5) şeklinde çağrıldığında ne gerçekleşir?	Derleyici T tipini int olarak çıkarır ve int topla(int, int) fonksiyonunu derleme anında üretir	Çalışma zamanında yorumlanır	Hata verir çünkü tip belirtilmemiştir	void tipine dönüştürülür	A	orta	2026-10-17 01:19:51.373673	cpp_templates_generic	function_templates	533
424	backend	cpp	template <typename T> class Dizi {} şablon sınıfından int ve double için iki ayrı nesne oluşturulduğunda derleyicinin davranışı nedir?	Tek bir ortak sınıf kullanır	İki bağımsız sınıf kodu üretir (Dizi<int> ve Dizi<double>)	double olanı int e dönüştürür	Hata fırlatır	B	orta	2026-10-17 01:19:51.373673	cpp_templates_generic	class_templates,types	534
425	backend	cpp	Şablon özelleştirme (template specialization) hangi amaçla kullanılır?	Şablonları derlemeden kaldırmak için	Sadece int tiplerine izin vermek için	Belirli bir özel tip için şablonun genel algoritması yerine özelleşmiş ve optimize edilmiş bir kod sunmak için	Şablonları çalışma zamanına ertelemek için	C	zor	2026-10-17 01:19:51.373673	cpp_templates_generic	template_specialization	535
426	backend	cpp	Şablon parametre listesinde template <typename T> ile template <class T> arasındaki fark nedir?	typename yalnızca ilkel tipler içindir	class yalnızca sınıflar içindir	class daha hızlı derlenir	Şablon parametre bildiriminde anlamsal olarak tamamen eşdeğerdirler	D	kolay	2026-10-17 01:19:51.373673	cpp_templates_generic	typename_vs_class	533
427	backend	cpp	std::vector da push_back() yerine emplace_back() kullanmanın en büyük performans artısı nedir?	Nesneyi önceden oluşturup kopyalamak yerine doğrudan vektörün bellek alanında kurucu argümanlarıyla inşa etmesi	Vektörün boyutunu iki katına çıkarması	Vektörü otomatik sıralaması	Vektörü kitlemesi	A	orta	2026-10-17 01:19:51.373673	cpp_stl_modern_ozellikler	vector_emplace_back	536
428	backend	cpp	std::map ile std::unordered_map arasındaki zaman karmaşıklığı (time complexity) farkı nasıldır?	İkisi de O(N) dir	std::map dengeli ağaç tabanlı olup O(log N) iken std::unordered_map hash tablosu tabanlı olup ortalama O(1) dir	std::map O(1), unordered_map O(N) dir	std::map her zaman daha hızlıdır	B	orta	2026-10-17 01:19:51.373673	cpp_stl_modern_ozellikler	map_vs_unordered_map	537
429	backend	cpp	auto fn = [&x, y]() {}; lambda ifadesinde yakalama listesi (capture list) ne anlama gelir?	x ve y kopyalanır	x ve y referanstır	x referans olarak, y ise değer olarak (kopya) yakalanır	x silinir, y kalır	C	orta	2026-10-17 01:19:51.373673	cpp_stl_modern_ozellikler	lambda_capture	539
430	backend	cpp	C++20 standardı ile gelen Concepts (Kavramlar) özelliğinin yazılımcıya sunduğu en önemli kazanım nedir?	Döngüleri ortadan kaldırmak	Pointer ları tamamen silmek	Grafik arayüzü çizmek	Şablon tiplerine derleme zamanında kısıtlamalar koyarak çok daha okunabilir ve net derleyici hata mesajları üretmek	D	zor	2026-10-17 01:19:51.373673	cpp_stl_modern_ozellikler	cpp20_concepts	540
406	backend	cpp	int sayilar[] = {10, 20, 30}; int* p = sayilar; olduğunda *(p + 2) ifadesi hangi değeri döndürür?	10	20	Tanımsız (Çöp Değer)	30 (Dizinin 2. indeksindeki eleman)	D	kolay	2026-10-17 01:19:51.373673	cpp_pointer_bellek	pointer_arithmetic	517
\.


--
-- Data for Name: remediation_quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.remediation_quizzes (id, user_id, subcategory, topic, trigger_activity_id, recommended_lesson_id, question_ids, completed, score, ai_feedback, created_at) FROM stdin;
1	1	cpp	cpp_operator_overloading_friend	559	531	{420,419,421}	f	0	Tebrikler, projeyi denedin! Ancak Mini Proje 4: Dinamik Matris Sınıfı ve Operator Overloading projesinde cpp operator overloading friend konusunda takıldığın tespit edildi. 75 sorunun hepsini çözmene gerek yok! Senin için özel hazırlanan 3 soruluk mikro teşhis testini tamamlamanı ve "Ders 26: Akış Operatörlerini Aşırı Yükleme (operator<< ve operator>>)" içeriğini tekrar etmeni öneririm.	2026-10-17 01:30:37.170024
\.


--
-- Data for Name: user_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_activities (id, user_id, activity_id, earned_points, score, max_score, passed, completed_at, attempt_count) FROM stdin;
\.


--
-- Data for Name: user_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_progress (id, user_id, category, subcategory, quiz_score, total_questions, passed, completed_at) FROM stdin;
\.


--
-- Data for Name: user_topic_mastery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_topic_mastery (id, user_id, subcategory, topic, correct_count, wrong_count, mastery_percentage, needs_review, last_attempted_at) FROM stdin;
1	1	python	py_temeller_tipler	0	1	0	t	2026-10-17 01:30:59.031191
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, pwd_hash, level, created_at, total_points, education_level, streak_days, gems, role, last_active, department, known_languages, domain_area, projects, bio, avatar_url, must_change_password, auth_provider, oauth_id) FROM stdin;
2	burak_coder	burak@codplus.edu	default_hash	Çırak	2026-10-17 01:40:05.175591	100	Universite	1	10	ogrenci	2026-10-17 01:40:30.43596	Belirtilmedi		frontend		Henüz biyografi eklenmedi.	avatar_default.png	f	local	\N
3	selin_dev	selin@codplus.edu	default_hash	Çırak	2026-10-17 01:40:30.426747	150	Lise	1	25	ogrenci	2026-10-17 01:40:30.448721	Belirtilmedi		frontend		Henüz biyografi eklenmedi.	avatar_default.png	f	local	\N
1	ali_muhendis	ali@codplus.edu	guvenli_yeni_sifre_hash	Cirak	2026-10-17 01:30:32.259315	100	Universite	0	0	ogrenci	2026-10-17 01:56:42.711567	Bilgisayar Muhendisligi	HTML, CSS, JavaScript, Python	fullstack	TUBITAK 2242 Sokratik Ogrenme, Teknofest Web AI	Web teknolojileri ve yapay zeka alanında kendimi gelistiriyorum.	avatar_astronaut.png	f	local	\N
5	Ayse Kaya	ayse.kaya@gmail.com	OAUTH_TOKEN_SECURE	Çırak	2026-10-17 01:57:01.764162	100	Lise	1	10	ogrenci	2026-10-17 01:57:01.764162	Belirtilmedi		frontend		Henüz biyografi eklenmedi.	avatar_default.png	f	google	goog_sub_987654321
10	dr_hakan_hoca	hakan@universite.edu.tr	hash123	Uzman	2026-10-17 01:57:22.046988	0	Doktora	0	0	danisman	2026-10-17 01:57:22.046988	Belirtilmedi		frontend		Henüz biyografi eklenmedi.	avatar_default.png	f	local	\N
\.


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_id_seq', 505, true);


--
-- Name: ai_chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ai_chats_id_seq', 1, false);


--
-- Name: code_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.code_logs_id_seq', 1, false);


--
-- Name: duels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.duels_id_seq', 1, true);


--
-- Name: friendships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.friendships_id_seq', 2, true);


--
-- Name: leagues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leagues_id_seq', 5, true);


--
-- Name: lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_id_seq', 1, false);


--
-- Name: mentor_feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mentor_feedback_id_seq', 1, true);


--
-- Name: mentor_students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mentor_students_id_seq', 1, true);


--
-- Name: quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quizzes_id_seq', 390, true);


--
-- Name: remediation_quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.remediation_quizzes_id_seq', 1, true);


--
-- Name: user_activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_activities_id_seq', 1, false);


--
-- Name: user_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_progress_id_seq', 1, false);


--
-- Name: user_topic_mastery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_topic_mastery_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: ai_chats ai_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_chats
    ADD CONSTRAINT ai_chats_pkey PRIMARY KEY (id);


--
-- Name: code_logs code_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.code_logs
    ADD CONSTRAINT code_logs_pkey PRIMARY KEY (id);


--
-- Name: duels duels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duels
    ADD CONSTRAINT duels_pkey PRIMARY KEY (id);


--
-- Name: friendships friendships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_pkey PRIMARY KEY (id);


--
-- Name: leagues leagues_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leagues
    ADD CONSTRAINT leagues_pkey PRIMARY KEY (id);


--
-- Name: lessons lessons_lesson_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_lesson_id_key UNIQUE (lesson_id);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: mentor_feedback mentor_feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_feedback
    ADD CONSTRAINT mentor_feedback_pkey PRIMARY KEY (id);


--
-- Name: mentor_students mentor_students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_students
    ADD CONSTRAINT mentor_students_pkey PRIMARY KEY (id);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);


--
-- Name: remediation_quizzes remediation_quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.remediation_quizzes
    ADD CONSTRAINT remediation_quizzes_pkey PRIMARY KEY (id);


--
-- Name: friendships unique_friendship; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT unique_friendship UNIQUE (user_id, friend_id);


--
-- Name: mentor_students unique_mentor_student_project; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_students
    ADD CONSTRAINT unique_mentor_student_project UNIQUE (mentor_id, student_id, project_name);


--
-- Name: user_activities user_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_activities
    ADD CONSTRAINT user_activities_pkey PRIMARY KEY (id);


--
-- Name: user_activities user_activities_user_id_activity_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_activities
    ADD CONSTRAINT user_activities_user_id_activity_id_key UNIQUE (user_id, activity_id);


--
-- Name: user_progress user_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (id);


--
-- Name: user_topic_mastery user_topic_mastery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_topic_mastery
    ADD CONSTRAINT user_topic_mastery_pkey PRIMARY KEY (id);


--
-- Name: user_topic_mastery user_topic_mastery_user_id_subcategory_topic_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_topic_mastery
    ADD CONSTRAINT user_topic_mastery_user_id_subcategory_topic_key UNIQUE (user_id, subcategory, topic);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_duels_subcat; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_duels_subcat ON public.duels USING btree (subcategory);


--
-- Name: idx_friendships_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_friendships_user ON public.friendships USING btree (user_id);


--
-- Name: idx_mentor_students; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_mentor_students ON public.mentor_students USING btree (mentor_id, student_id);


--
-- Name: idx_quizzes_subcategory_topic; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_quizzes_subcategory_topic ON public.quizzes USING btree (subcategory, topic);


--
-- Name: ai_chats ai_chats_log_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_chats
    ADD CONSTRAINT ai_chats_log_id_fkey FOREIGN KEY (log_id) REFERENCES public.code_logs(id) ON DELETE CASCADE;


--
-- Name: ai_chats ai_chats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_chats
    ADD CONSTRAINT ai_chats_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: code_logs code_logs_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.code_logs
    ADD CONSTRAINT code_logs_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE SET NULL;


--
-- Name: code_logs code_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.code_logs
    ADD CONSTRAINT code_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: duels duels_challenger_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duels
    ADD CONSTRAINT duels_challenger_id_fkey FOREIGN KEY (challenger_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: duels duels_opponent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duels
    ADD CONSTRAINT duels_opponent_id_fkey FOREIGN KEY (opponent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: duels duels_winner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duels
    ADD CONSTRAINT duels_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: friendships friendships_friend_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_friend_id_fkey FOREIGN KEY (friend_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: friendships friendships_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: mentor_feedback mentor_feedback_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_feedback
    ADD CONSTRAINT mentor_feedback_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON DELETE SET NULL;


--
-- Name: mentor_feedback mentor_feedback_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_feedback
    ADD CONSTRAINT mentor_feedback_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: mentor_feedback mentor_feedback_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_feedback
    ADD CONSTRAINT mentor_feedback_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: mentor_students mentor_students_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_students
    ADD CONSTRAINT mentor_students_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: mentor_students mentor_students_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_students
    ADD CONSTRAINT mentor_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: quizzes quizzes_related_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_related_lesson_id_fkey FOREIGN KEY (related_lesson_id) REFERENCES public.activities(id) ON DELETE SET NULL;


--
-- Name: remediation_quizzes remediation_quizzes_trigger_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.remediation_quizzes
    ADD CONSTRAINT remediation_quizzes_trigger_activity_id_fkey FOREIGN KEY (trigger_activity_id) REFERENCES public.activities(id) ON DELETE SET NULL;


--
-- Name: remediation_quizzes remediation_quizzes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.remediation_quizzes
    ADD CONSTRAINT remediation_quizzes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: remediation_quizzes remediation_recommended_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.remediation_quizzes
    ADD CONSTRAINT remediation_recommended_lesson_fkey FOREIGN KEY (recommended_lesson_id) REFERENCES public.activities(id) ON DELETE SET NULL;


--
-- Name: user_activities user_activities_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_activities
    ADD CONSTRAINT user_activities_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON DELETE CASCADE;


--
-- Name: user_activities user_activities_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_activities
    ADD CONSTRAINT user_activities_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_progress user_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_topic_mastery user_topic_mastery_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_topic_mastery
    ADD CONSTRAINT user_topic_mastery_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict IJZXYkbnB8ZqoOeEEEzbq0cPBIFVwPtrqBjKALq3VP71pV8gNjRfC25An7furDs

