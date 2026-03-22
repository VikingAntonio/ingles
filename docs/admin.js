// Admin Panel Logic for Menutech using Supabase
const supabaseUrl = 'https://ojpyfjgkffmzwvukjagf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcHlmamdrZmZtend2dWtqYWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDIwMzYsImV4cCI6MjA3OTcxODAzNn0.dlVYmoMumBse_O1PLBx0FeNITqY4YktefD6l_uonSgo';
const _supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let dbData = {}; // Structured like old courseData but with DB IDs
let selectedSubjectId = null;
let selectedLevelId = null;
let editingQuestionId = null;

// DOM Elements
const subjectList = document.getElementById('subject-list');
const levelList = document.getElementById('level-list');
const levelsSection = document.getElementById('levels-section');
const adminMain = document.getElementById('admin-main');
const welcomeScreen = document.getElementById('welcome-screen');
const levelEditor = document.getElementById('level-editor');
const questionsList = document.getElementById('questions-list');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadDataFromSupabase();
});

async function loadDataFromSupabase() {
    try {
        console.log("🔄 Loading data from Supabase...");

        // Fetch Subjects
        const { data: subjects, error: sErr } = await _supabase.from('subjects').select('*').order('created_at', { ascending: true });
        if (sErr) throw sErr;

        dbData = {};
        for (const s of subjects) {
            dbData[s.id] = { ...s, levels: [] };

            // Fetch Levels for this subject
            const { data: levels, error: lErr } = await _supabase.from('levels').select('*').eq('subject_id', s.id).order('level_number', { ascending: true });
            if (lErr) throw lErr;

            for (const l of levels) {
                // Fetch Questions for this level
                const { data: questions, error: qErr } = await _supabase.from('questions').select('*').eq('level_id', l.id).order('order_index', { ascending: true });
                if (qErr) throw qErr;

                dbData[s.id].levels.push({ ...l, questions });
            }
        }

        renderSubjects();
        if (selectedSubjectId) renderLevels();
        if (selectedLevelId) renderLevelDetails();

        console.log("✅ Data synced:", dbData);
    } catch (err) {
        console.error("❌ Sync Error:", err);
        alert("Error al sincronizar con la base de datos: " + err.message);
    }
}

// --- SUBJECT CRUD ---
function renderSubjects() {
    subjectList.innerHTML = '';
    Object.keys(dbData).forEach(id => {
        const s = dbData[id];
        const li = document.createElement('li');
        li.className = `sidebar-item ${selectedSubjectId === id ? 'active' : ''}`;
        li.innerHTML = `
            <span>${s.title}</span>
            <div class="q-actions">
                <button class="icon-btn small" onclick="renameSubject('${id}', event)"><i class="fas fa-edit"></i></button>
                <button class="icon-btn small delete" onclick="deleteSubject('${id}', event)"><i class="fas fa-trash"></i></button>
            </div>
        `;
        li.onclick = () => selectSubject(id);
        subjectList.appendChild(li);
    });
}

function selectSubject(id) {
    selectedSubjectId = id;
    selectedLevelId = null;
    welcomeScreen.style.display = 'block';
    levelEditor.style.display = 'none';
    levelsSection.style.display = 'block';
    renderSubjects();
    renderLevels();
}

async function addNewSubject() {
    const title = prompt("Nombre de la nueva materia:");
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '_');

    const { data, error } = await _supabase.from('subjects').insert([{ title, slug, description: "Nueva materia." }]).select();
    if (error) {
        alert("Error: " + error.message);
        return;
    }
    await loadDataFromSupabase();
}

async function renameSubject(id, e) {
    e.stopPropagation();
    const newTitle = prompt("Nuevo nombre para la materia:", dbData[id].title);
    if (newTitle) {
        const { error } = await _supabase.from('subjects').update({ title: newTitle }).eq('id', id);
        if (error) alert(error.message);
        else await loadDataFromSupabase();
    }
}

async function deleteSubject(id, e) {
    e.stopPropagation();
    if (confirm(`¿Estás seguro de eliminar "${dbData[id].title}"?`)) {
        const { error } = await _supabase.from('subjects').delete().eq('id', id);
        if (error) alert(error.message);
        else {
            if (selectedSubjectId === id) {
                selectedSubjectId = null;
                levelsSection.style.display = 'none';
            }
            await loadDataFromSupabase();
        }
    }
}

// --- LEVEL CRUD ---
function renderLevels() {
    levelList.innerHTML = '';
    if (!selectedSubjectId) return;

    dbData[selectedSubjectId].levels.forEach((level) => {
        const li = document.createElement('li');
        li.className = `sidebar-item ${selectedLevelId === level.id ? 'active' : ''}`;
        li.innerHTML = `
            <span>Nivel ${level.level_number}: ${level.title}</span>
            <div class="q-actions">
                <button class="icon-btn small delete" onclick="deleteLevel('${level.id}', event)"><i class="fas fa-trash"></i></button>
            </div>
        `;
        li.onclick = () => selectLevel(level.id);
        levelList.appendChild(li);
    });
}

function selectLevel(id) {
    selectedLevelId = id;
    welcomeScreen.style.display = 'none';
    levelEditor.style.display = 'block';
    renderLevels();
    renderLevelDetails();
}

async function addNewLevel() {
    if (!selectedSubjectId) return;
    const levels = dbData[selectedSubjectId].levels;
    const nextNum = levels.length > 0 ? Math.max(...levels.map(l => l.level_number)) + 1 : 1;

    const newLevel = {
        subject_id: selectedSubjectId,
        level_number: nextNum,
        title: `Nivel ${nextNum}`,
        lesson_title: "Nueva Lección",
        lesson_content: "<h2>Contenido</h2><p>Agrega explicación aquí.</p>",
        game_title: "Práctica del Nivel"
    };

    const { data, error } = await _supabase.from('levels').insert([newLevel]).select();
    if (error) alert(error.message);
    else {
        await loadDataFromSupabase();
        selectLevel(data[0].id);
    }
}

async function deleteLevel(id, e) {
    e.stopPropagation();
    if (confirm("¿Eliminar este nivel por completo?")) {
        const { error } = await _supabase.from('levels').delete().eq('id', id);
        if (error) alert(error.message);
        else {
            if (selectedLevelId === id) {
                selectedLevelId = null;
                levelEditor.style.display = 'none';
            }
            await loadDataFromSupabase();
        }
    }
}

// --- LESSON EDITOR ---
function editLevelBasics() {
    const level = findLevelById(selectedLevelId);
    document.getElementById('lesson-title').value = level.lesson_title;
    document.getElementById('lesson-content').value = level.lesson_content;
    document.getElementById('modal-lesson').classList.add('active');
}

async function saveLesson() {
    const lt = document.getElementById('lesson-title').value;
    const lc = document.getElementById('lesson-content').value;

    const { error } = await _supabase.from('levels').update({ lesson_title: lt, lesson_content: lc }).eq('id', selectedLevelId);
    if (error) alert(error.message);
    else {
        closeModal('modal-lesson');
        await loadDataFromSupabase();
    }
}

function renderLevelDetails() {
    const level = findLevelById(selectedLevelId);
    document.getElementById('edit-level-title').textContent = `Nivel ${level.level_number}: ${level.title}`;
    document.getElementById('edit-level-subtitle').textContent = `Materia: ${dbData[selectedSubjectId].title}`;
    renderQuestions();
}

// --- QUESTION CRUD ---
function renderQuestions() {
    questionsList.innerHTML = '';
    const level = findLevelById(selectedLevelId);
    const questions = level.questions || [];

    document.getElementById('q-count').textContent = questions.length;

    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'question-card';
        div.innerHTML = `
            <div class="q-info">
                <span>Tipo: ${q.type}</span>
                <h4>${q.title || q.question_text || `Pregunta ${index + 1}`}</h4>
            </div>
            <div class="q-actions">
                <button class="icon-btn" title="Cambiar de Nivel" onclick="moveQuestionToLevel('${q.id}', event)"><i class="fas fa-exchange-alt"></i></button>
                <button class="icon-btn" title="Editar" onclick="editQuestion('${q.id}', event)"><i class="fas fa-edit"></i></button>
                <button class="icon-btn delete" title="Eliminar" onclick="deleteQuestion('${q.id}', event)"><i class="fas fa-trash"></i></button>
            </div>
        `;
        div.onclick = () => editQuestion(q.id);
        questionsList.appendChild(div);
    });
}

function addNewQuestion() {
    editingQuestionId = null;
    document.getElementById('question-modal-title').textContent = "Nueva Pregunta";
    document.getElementById('q-type').value = "quiz-item";
    document.getElementById('q-title').value = "";
    document.getElementById('q-instruction').value = "";
    renderQuestionFields();
    document.getElementById('modal-question').classList.add('active');
}

function editQuestion(id, e) {
    if (e) e.stopPropagation();
    editingQuestionId = id;
    const q = findQuestionById(id);

    document.getElementById('question-modal-title').textContent = "Editar Pregunta";
    document.getElementById('q-type').value = q.type;
    document.getElementById('q-title').value = q.title || q.question_text || "";
    document.getElementById('q-instruction').value = q.instruction || "";

    renderQuestionFields(q);
    document.getElementById('modal-question').classList.add('active');
}

async function deleteQuestion(id, e) {
    e.stopPropagation();
    if (confirm("¿Eliminar esta pregunta?")) {
        const { error } = await _supabase.from('questions').delete().eq('id', id);
        if (error) alert(error.message);
        else await loadDataFromSupabase();
    }
}

async function moveQuestionToLevel(id, e) {
    e.stopPropagation();
    const levels = dbData[selectedSubjectId].levels;
    let options = levels.map((l, i) => `${i + 1}: ${l.title}`).join('\n');
    let targetIdxStr = prompt(`Selecciona el número del nivel destino (1-${levels.length}):\n\n${options}`);

    if (targetIdxStr === null) return;
    let targetIdx = parseInt(targetIdxStr) - 1;
    if (isNaN(targetIdx) || targetIdx < 0 || targetIdx >= levels.length) {
        alert("Nivel inválido.");
        return;
    }

    const targetLevelId = levels[targetIdx].id;
    const { error } = await _supabase.from('questions').update({ level_id: targetLevelId }).eq('id', id);
    if (error) alert(error.message);
    else await loadDataFromSupabase();
}

// --- DYNAMIC FIELD RENDERING ---
function renderQuestionFields(q = null) {
    const type = document.getElementById('q-type').value;
    const container = document.getElementById('dynamic-fields');
    container.innerHTML = '';

    const addField = (label, id, typeInput = 'text', value = '', placeholder = '') => {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
            <label>${label}</label>
            ${typeInput === 'textarea' ? `<textarea id="${id}" placeholder="${placeholder}">${value}</textarea>` : `<input type="${typeInput}" id="${id}" value="${value}" placeholder="${placeholder}">`}
        `;
        container.appendChild(div);
    };

    if (type === 'quiz-item') {
        const options = q ? q.options.join('\n') : "Opción A\nOpción B\nOpción C\nOpción D";
        const correct = q ? q.correct_answer : 0;
        addField('Opciones (una por línea)', 'q-options', 'textarea', options);
        addField('Índice Correcto (0, 1, 2...)', 'q-correct', 'number', correct);
    }
    else if (type === 'speech-practice') {
        const text = q ? q.question_text : "Menutech is a leading software company.";
        addField('Texto para pronunciar', 'q-speech-text', 'textarea', text);
    }
    else if (type === 'listening-practice') {
        const options = q ? q.options.join('\n') : "Opción A\nOpción B\nOpción C\nOpción D";
        const correct = q ? q.correct_answer : 0;
        const audioUrl = q ? q.audio_url || '' : '';

        addField('Pregunta específica', 'q-listening-question', 'text', q ? q.question_text : "What is the speaker talking about?");
        addField('Opciones (una por línea)', 'q-options', 'textarea', options);
        addField('Índice Correcto (0, 1, 2...)', 'q-correct', 'number', correct);

        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
            <label>Audio URL (Cloudinary)</label>
            <div style="display:flex; gap:10px;">
                <input type="text" id="q-audio-url" value="${audioUrl}" style="flex:1">
                <button class="modal-btn small-btn" onclick="uploadAudioToCloudinary()" style="white-space:nowrap;">Subir Audio</button>
            </div>
            <input type="file" id="audio-file-input" style="display:none" accept="audio/*" onchange="handleAudioFileSelection(this)">
        `;
        container.appendChild(div);
    }
    else if (type === 'builder') {
        const blocks = q ? (q.data.blocks).join(', ') : "SELECT, *, FROM, table";
        const correct = q ? (q.correct_answer) : "SELECT * FROM table";
        addField('Misión/Objetivo', 'q-goal', 'text', q ? q.question_text : "Selecciona todo...");
        addField('Respuesta Correcta', 'q-builder-correct', 'text', correct);
        addField('Bloques Disponibles (separados por coma)', 'q-blocks', 'text', blocks);
    }
    else if (type === 'sorter') {
        const lines = q ? q.data.lines.join('\n') : "Inicio\nEscribir \"Hola\"\nFin";
        addField('Líneas de Pseudocódigo (en orden correcto)', 'q-lines', 'textarea', lines);
    }
    else if (type === 'match') {
        const pairs = q ? q.data.pairs.map(p => `${p.es}|${p.en}`).join('\n') : "Hola|Hello\nMundo|World";
        addField('Pares (Español|Inglés, uno por línea)', 'q-pairs', 'textarea', pairs);
    }
    else if (type === 'flowchart-free') {
        const items = q ? q.data.items.map(i => `${i.id}|${i.text}`).join('\n') : "s|Inicio\nf|Fin";
        const edges = q ? q.data.solution.edges.map(e => `${e[0]}|${e[1]}`).join('\n') : "s|f";
        addField('Elementos (id|Texto, uno por línea)', 'q-fc-items', 'textarea', items);
        addField('Solución: Bordes (id_desde|id_hasta, uno por línea)', 'q-fc-edges', 'textarea', edges);
    }
}

// --- CLOUDINARY AUDIO UPLOAD ---
async function uploadAudioToCloudinary() {
    document.getElementById('audio-file-input').click();
}

async function handleAudioFileSelection(input) {
    const file = input.files[0];
    if (!file) return;

    const btn = document.querySelector('button[onclick="uploadAudioToCloudinary()"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subiendo...';
    btn.disabled = true;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'de3n9pg8x');

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/vikingdevBdd/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.secure_url) {
            document.getElementById('q-audio-url').value = data.secure_url;
            alert('¡Audio subido con éxito!');
        } else {
            throw new Error(data.error?.message || 'Error desconocido');
        }
    } catch (err) {
        console.error("Cloudinary Error:", err);
        alert("Error al subir audio: " + err.message);
    } finally {
        btn.innerHTML = 'Subir Audio';
        btn.disabled = false;
    }
}

// --- SAVE QUESTION ---
function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dbData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "menutech_exams_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

async function importJSON(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (confirm("¿Estás seguro de importar? Esto podría duplicar materias si ya existen con el mismo nombre.")) {
                for (const sid in data) {
                    const s = data[sid];
                    const { data: newS, error: sErr } = await _supabase.from('subjects').insert([{ title: s.title, slug: s.slug, description: s.description }]).select();
                    if (sErr) continue;

                    for (const l of s.levels) {
                        const { data: newL, error: lErr } = await _supabase.from('levels').insert([{
                            subject_id: newS[0].id, level_number: l.level_number, title: l.title,
                            lesson_title: l.lesson_title, lesson_content: l.lesson_content, game_title: l.game_title
                        }]).select();
                        if (lErr) continue;

                        for (const q of l.questions) {
                            delete q.id;
                            q.level_id = newL[0].id;
                            await _supabase.from('questions').insert([q]);
                        }
                    }
                }
                await loadDataFromSupabase();
                alert("Importación completada.");
            }
        } catch (err) { alert("Error al importar JSON."); }
    };
    reader.readAsText(file);
}

async function saveQuestion() {
    const type = document.getElementById('q-type').value;
    const title = document.getElementById('q-title').value;
    const instruction = document.getElementById('q-instruction').value;

    let payload = {
        level_id: selectedLevelId,
        type: type,
        title: title,
        instruction: instruction,
        data: {}
    };

    if (type === 'quiz-item') {
        payload.question_text = title;
        payload.options = document.getElementById('q-options').value.split('\n').filter(l => l.trim());
        payload.correct_answer = document.getElementById('q-correct').value;
    }
    else if (type === 'speech-practice') {
        payload.question_text = document.getElementById('q-speech-text').value;
    }
    else if (type === 'listening-practice') {
        payload.question_text = document.getElementById('q-listening-question').value;
        payload.options = document.getElementById('q-options').value.split('\n').filter(l => l.trim());
        payload.correct_answer = document.getElementById('q-correct').value;
        payload.audio_url = document.getElementById('q-audio-url').value;
    }
    else if (type === 'builder') {
        payload.question_text = document.getElementById('q-goal').value;
        payload.correct_answer = document.getElementById('q-builder-correct').value;
        payload.data.blocks = document.getElementById('q-blocks').value.split(',').map(b => b.trim()).filter(b => b);
    }
    else if (type === 'sorter') {
        payload.data.lines = document.getElementById('q-lines').value.split('\n').filter(l => l.trim());
    }
    else if (type === 'match') {
        payload.data.pairs = document.getElementById('q-pairs').value.split('\n').filter(l => l.trim()).map(line => {
            const [es, en] = line.split('|');
            return { es, en };
        });
    }
    else if (type === 'flowchart-free') {
        payload.data.items = document.getElementById('q-fc-items').value.split('\n').filter(l => l.trim()).map(line => {
            const [id, text] = line.split('|');
            return { id, text };
        });
        const edges = document.getElementById('q-fc-edges').value.split('\n').filter(l => l.trim()).map(line => line.split('|'));
        payload.data.solution = {
            nodes: payload.data.items.map(i => ({ contentId: i.id })),
            edges: edges
        };
    }

    if (editingQuestionId) {
        const { error } = await _supabase.from('questions').update(payload).eq('id', editingQuestionId);
        if (error) alert(error.message);
    } else {
        const { error } = await _supabase.from('questions').insert([payload]);
        if (error) alert(error.message);
    }

    closeModal('modal-question');
    await loadDataFromSupabase();
}

// --- HELPERS ---
function findLevelById(id) {
    for (const sid in dbData) {
        const found = dbData[sid].levels.find(l => l.id === id);
        if (found) return found;
    }
    return null;
}

function findQuestionById(id) {
    const level = findLevelById(selectedLevelId);
    return level.questions.find(q => q.id === id);
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

document.getElementById('btn-save-all').onclick = () => {
    alert("Los cambios se guardan automáticamente en Supabase al realizar cada operación.");
};
