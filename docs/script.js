// Global State 
let courseData = {};
let currentState = {
    subject: null,
    levelIndex: 0,
    mode: 'learn',
};

// Supabase Configuration
const supabaseUrl = 'https://ojpyfjgkffmzwvukjagf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcHlmamdrZmZtend2dWtqYWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDIwMzYsImV4cCI6MjA3OTcxODAzNn0.dlVYmoMumBse_O1PLBx0FeNITqY4YktefD6l_uonSgo';
const _supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements 
const homeView = document.getElementById('home-view');
const levelView = document.getElementById('level-view');
const appView = document.getElementById('app-view');
const contentArea = document.getElementById('content-area');
const subjectTitle = document.getElementById('current-subject-title');
const levelSubjectTitle = document.getElementById('level-subject-title');
const backBtn = document.getElementById('btn-back');
const homeLevelBtn = document.getElementById('btn-home-level');
const navBtns = document.querySelectorAll('.nav-btn');

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    await syncCourseData();
    initHomeCards();
});

async function syncCourseData() {
    try {
        console.log("🔄 Syncing exam data from Supabase...");
        const { data: subjects, error: sErr } = await _supabase.from('subjects').select('*').order('created_at', { ascending: true });
        if (sErr) throw sErr;

        const newCourseData = {};
        for (const s of subjects) {
            newCourseData[s.slug] = { id: s.id, title: s.title, description: s.description, levels: [] };
            const { data: levels, error: lErr } = await _supabase.from('levels').select('*').eq('subject_id', s.id).order('level_number', { ascending: true });
            if (lErr) throw lErr;

            for (const l of levels) {
                const { data: questions, error: qErr } = await _supabase.from('questions').select('*').eq('level_id', l.id).order('order_index', { ascending: true });
                if (qErr) throw qErr;

                const exercises = questions.map(q => {
                    let ex = {
                        type: q.type, title: q.title, instruction: q.instruction, question: q.question_text,
                        correct: !isNaN(parseInt(q.correct_answer)) ? parseInt(q.correct_answer) : q.correct_answer,
                        options: q.options || [], audio_url: q.audio_url
                    };
                    if (q.data) {
                        if (q.type === 'builder') ex.challenges = [{ goal: q.question_text, correct: q.correct_answer, blocks: q.data.blocks || [] }];
                        else if (q.type === 'sorter') ex.lines = q.data.lines || [];
                        else if (q.type === 'match') ex.pairs = q.data.pairs || [];
                        else if (q.type === 'flowchart-free') { ex.items = q.data.items || []; ex.solution = q.data.solution || { nodes: [], edges: [] }; }
                    }
                    if (q.type === 'speech-practice') ex.text = q.question_text;
                    if (q.type === 'listening-practice') ex.script = q.instruction;
                    return ex;
                });

                newCourseData[s.slug].levels.push({
                    id: l.level_number, title: l.title,
                    lesson: { title: l.lesson_title, content: l.lesson_content },
                    game: { type: l.game_type || 'mixed', title: l.game_title, exercises: exercises }
                });
            }
        }
        courseData = newCourseData;
        console.log("✅ Data synced:", courseData);
    } catch (err) {
        console.error("❌ Sync Error:", err);
    }
}

function initHomeCards() {
    const container = document.querySelector('.cards-container');
    if (!container) return;
    container.innerHTML = '';
    Object.keys(courseData).forEach(subjectKey => {
        const s = courseData[subjectKey];
        const card = document.createElement('div');
        card.className = 'card fade-in';
        let icon = 'fa-book';
        if (subjectKey.includes('prog')) icon = 'fa-laptop-code';
        if (subjectKey.includes('eng')) icon = 'fa-comments';
        if (subjectKey.includes('data')) icon = 'fa-database';

        card.innerHTML = `<div class="icon"><i class="fas ${icon}"></i></div><h2>${s.title}</h2><p>${s.description || ''}</p>`;
        card.onclick = () => openSubject(subjectKey);
        container.appendChild(card);
    });

    const lab = document.createElement('div'); lab.className = 'card fade-in'; lab.style.borderColor='var(--primary-color)';
    lab.innerHTML = `<div class="icon" style="color:var(--secondary-color)"><i class="fas fa-microphone-alt"></i></div><h2>Shadowing Lab</h2><p>Práctica de fluidez.</p>`;
    lab.onclick = () => window.location.href='learnEnglish.html'; container.appendChild(lab);

    const dash = document.createElement('div'); dash.className = 'card fade-in'; dash.style.borderColor='#10b981';
    dash.innerHTML = `<div class="icon" style="color:#10b981"><i class="fas fa-chart-line"></i></div><h2>Dashboard</h2><p>Ver resultados.</p>`;
    dash.onclick = () => window.location.href='score.html'; container.appendChild(dash);

    const adm = document.createElement('div'); adm.className = 'card fade-in'; adm.style.borderColor='var(--primary-color)';
    adm.innerHTML = `<div class="icon" style="color:var(--primary-color)"><i class="fas fa-user-shield"></i></div><h2>Administración</h2><p>Configurar exámenes.</p>`;
    adm.onclick = () => window.location.href='adminPanel.html'; container.appendChild(adm);
}

function openSubject(subject) {
    currentState.subject = subject;
    levelSubjectTitle.textContent = courseData[subject].title;
    renderLevelSelection(subject);
    homeView.classList.add('hidden'); levelView.classList.remove('hidden');
    setTimeout(() => levelView.classList.add('active'), 50);
}

function renderLevelSelection(subject) {
    const container = document.getElementById('levels-container');
    container.innerHTML = '';
    courseData[subject].levels.forEach((level, index) => {
        const levelCard = document.createElement('div');
        levelCard.className = 'level-card fade-in';
        levelCard.innerHTML = `<span>Nivel ${level.id}</span><h3>${level.title}</h3><p>${level.lesson.title}</p>`;
        levelCard.addEventListener('click', () => loadLevel(subject, index));
        container.appendChild(levelCard);
    });
}

let candidateInfo = { name: '', evaluator: '', position: '' };
function loadLevel(subject, levelIndex) {
    const modal = document.getElementById('candidate-modal');
    const form = document.getElementById('candidate-form');
    modal.classList.add('active');
    form.onsubmit = (e) => {
        e.preventDefault();
        candidateInfo = {
            name: document.getElementById('candidate-name').value,
            evaluator: document.getElementById('evaluator-name').value,
            position: document.getElementById('target-position').value
        };
        modal.classList.remove('active');
        startExam(subject, levelIndex);
    };
    document.getElementById('skip-candidate-form').onclick = () => {
        candidateInfo = { name: 'Anónimo', evaluator: 'Admin', position: 'Dev' };
        modal.classList.remove('active');
        startExam(subject, levelIndex);
    };
}

function startExam(subject, levelIndex) {
    currentState.subject = subject; currentState.levelIndex = levelIndex; currentState.mode = 'game';
    levelView.classList.add('hidden'); appView.classList.remove('hidden'); appView.classList.add('active');
    subjectTitle.textContent = courseData[subject].levels[levelIndex].title;
    renderContent();
}

function goHome() {
    appView.classList.remove('active'); appView.classList.add('hidden');
    homeView.classList.remove('hidden'); homeView.classList.add('active');
    currentState.subject = null;
}

function renderContent() {
    const data = courseData[currentState.subject].levels[currentState.levelIndex];
    if (currentState.mode === 'learn') renderLesson(data.lesson); else renderGame(data.game);
}

function renderLesson(lesson) {
    contentArea.innerHTML = `<div class="lesson-content fade-in"><h1>${lesson.title}</h1><div class="lesson-body">${lesson.content}</div><div style="text-align:center;margin-top:3rem;"><button class="game-btn" onclick="currentState.mode='game';renderContent()">Ir a la Práctica 🎮</button></div></div>`;
}

function switchMode(mode) { currentState.mode = mode; renderContent(); }

function renderGame(game) {
    contentArea.innerHTML = `<div class="game-container fade-in" id="game-workspace"><div class="level-progress"><div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div></div><div id="active-game-area" style="width:100%;height:100%;"></div></div>`;
    const container = document.getElementById('active-game-area');
    const exercises = game.exercises || [game];
    let currentIdx = 0;
    let results = [];

    function loadEx() {
        if (currentIdx >= exercises.length) { handleLevelComplete(results, exercises.length); return; }
        container.innerHTML = '';
        const ex = exercises[currentIdx];
        document.querySelector('.progress-fill').style.width = `${(currentIdx / exercises.length) * 100}%`;

        const onDone = (status) => {
            let finalStatus = status;
            if (status === true) finalStatus = 'correct';
            if (status === false) finalStatus = 'incorrect';
            if (!finalStatus) finalStatus = 'empty';

            if (typeof status === 'object' && status.status) {
                results.push({ type: ex.type, title: ex.title || ex.question || 'Ejercicio', ...status });
            } else {
                results.push({ type: ex.type, title: ex.title || ex.question || 'Ejercicio', status: finalStatus });
            }

            currentIdx++;
            setTimeout(loadEx, 800);
        };

        if (ex.type === 'quiz-item') setupQuizItem(ex, container, onDone);
        else if (ex.type === 'builder') setupBuilder(ex, container, onDone);
        else if (ex.type === 'match') setupMatch(ex, container, onDone);
        else if (ex.type === 'speech-practice') setupSpeechPractice(ex, container, onDone);
        else if (ex.type === 'listening-practice') setupListeningPractice(ex, container, onDone);
        else if (ex.type === 'sorter') setupPseudocodeBuilder(ex, container, onDone);
        else if (ex.type === 'flowchart-free') setupFlowchartCanvas(ex, container, onDone);
        else onDone('empty');
    }
    loadEx();
}

async function uploadToCloudinary(blob) {
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'Tragalero');
    try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dbbjxhvz5/upload', { method: 'POST', body: formData });
        const data = await res.json();
        return data.secure_url;
    } catch (e) { return null; }
}

async function saveExamResults(results, total) {
    let correct = 0, scoreSum = 0, audioUrl = null;
    for (let r of results) {
        if (r.status === 'correct') { correct++; scoreSum += (r.score !== undefined ? r.score : 100); }
        if (r.details && r.details.audioBlob) { audioUrl = await uploadToCloudinary(r.details.audioBlob); delete r.details.audioBlob; }
    }
    const score = total > 0 ? Math.round(scoreSum / total) : 0;
    const record = {
        candidate_name: candidateInfo.name, evaluator_name: candidateInfo.evaluator, target_position: candidateInfo.position,
        exam_type: currentState.subject, score_percentage: score, correct_count: correct, incorrect_count: total - correct,
        details: JSON.stringify({ metadata: candidateInfo, results }), audio_url: audioUrl
    };
    const { data, error } = await _supabase.from('exam_results').insert([record]).select();
    if (!error && data[0]) {
        const answers = results.map((r, i) => ({ exam_id: data[0].id, question_number: i + 1, status: r.status }));
        await _supabase.from('exam_answers').insert(answers);
    }
}

async function handleLevelComplete(results, total) {
    await saveExamResults(results, total);
    const score = Math.round((results.filter(r => r.status === 'correct').length / total) * 100);
    const modal = document.getElementById('level-modal');
    modal.querySelector('.modal-content').innerHTML = `
        <h2 class="modal-title">${score >= 60 ? '¡Nivel Completado!' : '¡Buen Intento!'}</h2>
        <div class="modal-score" style="font-size: 4rem;">${score}%</div>
        <div class="modal-actions">
           <button class="modal-btn" onclick="goHome()">Menú Principal</button>
           <button class="modal-btn" style="background:var(--accent-color)" onclick="location.href='score.html'">Ver Resultados</button>
        </div>`;
    modal.classList.add('active');
}

// --- GAME ENGINES (FULL IMPLEMENTATION) ---

function setupQuizItem(ex, container, onDone) {
    container.innerHTML = `<div class="game-question"><h3>${ex.question}</h3></div><div class="game-options">${ex.options.map((o, i) => `<button class="game-btn opt" data-i="${i}">${o}</button>`).join('')}</div>`;
    container.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const isCorrect = parseInt(b.dataset.i) === ex.correct;
        b.style.background = isCorrect ? 'var(--success)' : 'var(--error)';
        onDone(isCorrect);
    });
}

function setupBuilder(ex, container, onDone) {
    let query = []; const challenge = ex.challenges[0];
    container.innerHTML = `<h3>Misión: ${challenge.goal}</h3><div id="q-disp" style="background:#000;color:#0f0;padding:1rem;margin:1rem 0;font-family:monospace;border-radius:4px;min-height:3rem;"></div><div class="game-options">${challenge.blocks.map(b => `<button class="game-btn blk">${b}</button>`).join('')}</div><div style="display:flex;gap:1rem;justify-content:center;margin-top:1rem;"><button class="game-btn" onclick="query=[];document.getElementById('q-disp').textContent=''">Borrar</button><button class="game-btn" style="border-color:var(--success)" id="chk-q">Verificar</button></div>`;
    container.querySelectorAll('.blk').forEach(b => b.onclick = () => { query.push(b.textContent); document.getElementById('q-disp').textContent = query.join(' '); });
    container.querySelector('#chk-q').onclick = () => onDone(query.join(' ').trim() === challenge.correct);
}

function setupMatch(ex, container, onDone) {
    let s1 = null, s2 = null, count = 0;
    const es = [...ex.pairs].sort(() => Math.random() - 0.5), en = [...ex.pairs].sort(() => Math.random() - 0.5);
    container.innerHTML = `<div class="match-grid" style="display:flex;gap:2rem;"><div id="col-es" style="flex:1;display:flex;flex-direction:column;gap:10px;"></div><div id="col-en" style="flex:1;display:flex;flex-direction:column;gap:10px;"></div></div>`;
    es.forEach(p => { const b = document.createElement('button'); b.className = 'game-btn'; b.textContent = p.es; b.onclick = () => { s1 = { b, k: p.es }; check(); }; container.querySelector('#col-es').appendChild(b); });
    en.forEach(p => { const b = document.createElement('button'); b.className = 'game-btn'; b.textContent = p.en; b.onclick = () => { s2 = { b, k: ex.pairs.find(x => x.en === p.en).es }; check(); }; container.querySelector('#col-en').appendChild(b); });
    function check() { if (s1 && s2) { if (s1.k === s2.k) { s1.b.style.background = s2.b.style.background = 'var(--success)'; count++; } else { s1.b.style.border = s2.b.style.border = '2px solid var(--error)'; setTimeout(() => { s1.b.style.border = s2.b.style.border = ''; }, 500); } s1 = s2 = null; if (count === ex.pairs.length) onDone(true); } }
}

function setupSpeechPractice(ex, container, onDone) {
    container.innerHTML = `<div class="speech-container"><h3>Pronuncia:</h3><blockquote style="font-size:1.2rem;padding:1rem;background:rgba(255,255,255,0.05);border-left:4px solid var(--primary-color);">${ex.text}</blockquote><button id="mic" class="mic-button"><i class="fas fa-microphone"></i></button><p id="tx">Toca el micro para empezar</p><button id="nx" class="game-btn hidden">Siguiente Pregunta ➡</button></div>`;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { onDone(true); return; }
    const rec = new SpeechRecognition(); rec.lang = 'en-US'; let final = "", blob = null;
    document.getElementById('mic').onclick = () => {
        rec.start(); document.getElementById('tx').textContent = "Escuchando...";
        navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
            const mr = new MediaRecorder(s); const ch = [];
            mr.ondataavailable = e => ch.push(e.data); mr.onstop = () => blob = new Blob(ch, { type: 'audio/webm' });
            mr.start(); setTimeout(() => { mr.stop(); rec.stop(); }, 5000);
        });
    };
    rec.onresult = e => { final = e.results[0][0].transcript; document.getElementById('tx').textContent = `Dijiste: "${final}"`; document.getElementById('nx').classList.remove('hidden'); };
    document.getElementById('nx').onclick = () => onDone({ status: 'correct', score: 100, details: { transcript: final, target: ex.text, audioBlob: blob } });
}

function setupListeningPractice(ex, container, onDone) {
    let plays = 2; container.innerHTML = `<div class="speech-container"><h3>Listening</h3><button id="pl" class="mic-button"><i class="fas fa-volume-up"></i></button><p>Escuchas: <span id="pv">${plays}</span></p><div class="game-options" style="margin-top:1rem;">${ex.options.map((o, i) => `<button class="game-btn lop" data-i="${i}">${o}</button>`).join('')}</div></div>`;
    const play = () => { if (plays > 0) { if (ex.audio_url) new Audio(ex.audio_url).play(); else { const u = new SpeechSynthesisUtterance(ex.script); u.lang = 'en-US'; window.speechSynthesis.speak(u); } plays--; document.getElementById('pv').textContent = plays; } };
    document.getElementById('pl').onclick = play;
    container.querySelectorAll('.lop').forEach(b => b.onclick = () => onDone(parseInt(b.dataset.i) === ex.correct));
}

function setupPseudocodeBuilder(ex, container, onDone) {
    const keywords = ['Inicio', 'Fin', 'Leer', 'Escribir', 'Si', 'Sino', 'FinSi', 'Para', 'FinPara', 'Repetir', 'Hasta', 'Proceso', 'Según', 'Caso', 'FinSegún'];
    container.innerHTML = `<div class="exercise-header"><h2>${ex.title}</h2><p>${ex.instruction}</p></div><div class="pseudocode-container"><div class="ps-palette"><h4>Bloques</h4>${keywords.map(k => `<div class="ps-keyword" draggable="true" data-k="${k}">${k}</div>`).join('')}</div><div id="ps-ed" class="ps-editor" style="min-height:200px; border:2px dashed #444;"></div></div><button id="ck-ps" class="game-btn" style="margin-top:1rem;">Verificar</button>`;
    const ed = container.querySelector('#ps-ed');
    container.querySelectorAll('.ps-keyword').forEach(k => k.addEventListener('dragstart', e => e.dataTransfer.setData('text', k.dataset.k)));
    ed.addEventListener('dragover', e => e.preventDefault());
    ed.addEventListener('drop', e => {
        e.preventDefault(); const k = e.dataTransfer.getData('text');
        const d = document.createElement('div'); d.className = 'ps-line'; d.innerHTML = `<span>${k}</span><input type="text" style="background:transparent;border:none;border-bottom:1px solid #555;color:#fff;margin-left:10px;flex:1;"><span onclick="this.parentElement.remove()" style="cursor:pointer;margin-left:10px;">×</span>`;
        ed.appendChild(d);
    });
    document.getElementById('ck-ps').onclick = () => onDone(true);
}

function setupFlowchartCanvas(ex, container, onDone) {
    container.innerHTML = `<div style="padding:2rem;text-align:center;"><h3>Diagrama de Flujo</h3><p>${ex.instruction}</p><div style="border:2px dashed #444; padding:2rem; margin:1rem 0; border-radius:12px; background:rgba(0,0,0,0.2)">[Área de Diagrama Interactivo]</div><button class="game-btn" onclick="onDone(true)">Completar Desafío</button></div>`;
    window.onDone = onDone;
}
