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
        if (selectedSubjectId && dbData[selectedSubjectId]) {
            renderLevels();
            if (selectedLevelId && findLevelById(selectedLevelId)) {
                renderLevelDetails();
            } else {
                selectedLevelId = null;
                levelEditor.style.display = 'none';
            }
        } else {
            selectedSubjectId = null;
            selectedLevelId = null;
            levelsSection.style.display = 'none';
            levelEditor.style.display = 'none';
            welcomeScreen.style.display = 'block';
        }

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
                <button class="icon-btn small" onclick="openSubjectModal('${id}', event)"><i class="fas fa-cog"></i></button>
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

function openSubjectModal(id = null, e = null) {
    if (e) e.stopPropagation();
    const modal = document.getElementById('modal-subject');
    const titleInput = document.getElementById('subject-title-input');
    const descInput = document.getElementById('subject-description-input');
    const modalTitle = document.getElementById('subject-modal-title');

    if (id) {
        const s = dbData[id];
        titleInput.value = s.title;
        descInput.value = s.description || "";
        modalTitle.textContent = "Editar Materia";
        modal.dataset.id = id;
    } else {
        titleInput.value = "";
        descInput.value = "";
        modalTitle.textContent = "Nueva Materia";
        delete modal.dataset.id;
    }
    modal.classList.add('active');
}

function addNewSubject() {
    openSubjectModal();
}

async function saveSubject() {
    console.log("💾 saveSubject called");
    const modal = document.getElementById('modal-subject');
    const id = modal.dataset.id;
    const title = document.getElementById('subject-title-input').value;
    const description = document.getElementById('subject-description-input').value;

    if (!title) return alert("El título es obligatorio");

    if (id) {
        // Update
        const { error } = await _supabase.from('subjects').update({ title, description }).eq('id', id);
        if (error) alert(error.message);
    } else {
        // Insert
        const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const { error } = await _supabase.from('subjects').insert([{ title, slug, description }]);
        if (error) alert(error.message);
    }

    closeModal('modal-subject');
    await loadDataFromSupabase();
}

async function deleteSubject(id, e) {
    e.stopPropagation();
    if (confirm(`¿Estás seguro de eliminar "${dbData[id].title}"?`)) {
        const { error } = await _supabase.from('subjects').delete().eq('id', id);
        if (error) alert(error.message);
        else {
            if (selectedSubjectId === id) {
                selectedSubjectId = null;
                selectedLevelId = null;
                levelsSection.style.display = 'none';
                levelEditor.style.display = 'none';
            }
            await loadDataFromSupabase();
        }
    }
}

// --- LEVEL CRUD ---
function renderLevels() {
    levelList.innerHTML = '';
    if (!selectedSubjectId) return;

    const levels = dbData[selectedSubjectId].levels;

    levels.forEach((level, index) => {
        const li = document.createElement('li');
        li.className = `sidebar-item ${selectedLevelId === level.id ? 'active' : ''}`;
        li.innerHTML = `
            <span>Nivel ${level.level_number}: ${level.title}</span>
            <div class="q-actions">
                <button class="icon-btn small" onclick="reorderLevel('${level.id}', -1, event)" ${index === 0 ? 'style="opacity:0.2; pointer-events:none"' : ''}><i class="fas fa-arrow-up"></i></button>
                <button class="icon-btn small" onclick="reorderLevel('${level.id}', 1, event)" ${index === levels.length - 1 ? 'style="opacity:0.2; pointer-events:none"' : ''}><i class="fas fa-arrow-down"></i></button>
                <button class="icon-btn small delete" onclick="deleteLevel('${level.id}', event)"><i class="fas fa-trash"></i></button>
            </div>
        `;
        li.onclick = () => selectLevel(level.id);
        levelList.appendChild(li);
    });
}

async function reorderLevel(id, direction, e) {
    if (e) e.stopPropagation();
    const levels = dbData[selectedSubjectId].levels;
    const idx = levels.findIndex(l => l.id === id);
    if (idx === -1) return;

    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= levels.length) return;

    const current = levels[idx];
    const target = levels[targetIdx];

    // Swap level_number
    const tempNum = current.level_number;

    // We need to use a temporary value to avoid unique constraint if we had one (we do have a UNIQUE(subject_id, level_number))
    // So let's use a very large number as temp.
    const { error: err1 } = await _supabase.from('levels').update({ level_number: -999 }).eq('id', current.id);
    if (err1) return alert(err1.message);

    const { error: err2 } = await _supabase.from('levels').update({ level_number: current.level_number }).eq('id', target.id);
    if (err2) return alert(err2.message);

    const { error: err3 } = await _supabase.from('levels').update({ level_number: target.level_number }).eq('id', current.id);
    if (err3) return alert(err3.message);

    await loadDataFromSupabase();
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
    document.getElementById('level-schema-url').value = level.schema_url || "";
    document.getElementById('modal-lesson').classList.add('active');
}

async function saveLesson() {
    console.log("💾 saveLesson called");
    const lt = document.getElementById('lesson-title').value;
    const lc = document.getElementById('lesson-content').value;
    const lsu = document.getElementById('level-schema-url').value;

    const { error } = await _supabase.from('levels').update({
        lesson_title: lt,
        lesson_content: lc,
        schema_url: lsu
    }).eq('id', selectedLevelId);
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

        let extraInfo = "";
        if (q.type === 'quiz-item' || q.type === 'listening-practice' || q.type === 'quiz-diagram') {
            const correctText = q.options && q.options[q.correct_answer] ? q.options[q.correct_answer] : (q.correct_answer !== undefined ? q.correct_answer : "N/A");
            extraInfo = `<div style="font-size:0.8rem; color:#aaa; margin-top:5px;">Respuesta Correcta: <b style="color:var(--success)">${correctText}</b></div>`;
        } else if (q.type === 'builder') {
             extraInfo = `<div style="font-size:0.8rem; color:#aaa; margin-top:5px;">Query: <b style="color:var(--secondary-color)">${q.correct_answer}</b></div>`;
        }

        if (q.audio_url) {
            extraInfo += `<div style="font-size:0.7rem; color:#64748b; margin-top:3px; word-break:break-all;"><i class="fas fa-music"></i> Audio: ${q.audio_url}</div>`;
        }
        if (q.diagram_url) {
            extraInfo += `<div style="font-size:0.7rem; color:#64748b; margin-top:3px; word-break:break-all;"><i class="fas fa-image"></i> Diagrama: ${q.diagram_url}</div>`;
        }

        div.innerHTML = `
            <div class="q-info">
                <span>#${index + 1} - Tipo: ${q.type}</span>
                <h4>${q.title || q.question_text || `Pregunta ${index + 1}`}</h4>
                ${extraInfo}
            </div>
            <div class="q-actions">
                <button class="icon-btn" title="Subir" onclick="reorderQuestion('${q.id}', -1, event)" ${index === 0 ? 'style="opacity:0.2; pointer-events:none"' : ''}><i class="fas fa-arrow-up"></i></button>
                <button class="icon-btn" title="Bajar" onclick="reorderQuestion('${q.id}', 1, event)" ${index === questions.length - 1 ? 'style="opacity:0.2; pointer-events:none"' : ''}><i class="fas fa-arrow-down"></i></button>
                <button class="icon-btn" title="Cambiar de Nivel" onclick="moveQuestionToLevel('${q.id}', event)"><i class="fas fa-exchange-alt"></i></button>
                <button class="icon-btn" title="Editar" onclick="editQuestion('${q.id}', event)"><i class="fas fa-edit"></i></button>
                <button class="icon-btn delete" title="Eliminar" onclick="deleteQuestion('${q.id}', event)"><i class="fas fa-trash"></i></button>
            </div>
        `;
        div.onclick = () => editQuestion(q.id);
        questionsList.appendChild(div);
    });
}

async function reorderQuestion(id, direction, e) {
    if (e) e.stopPropagation();
    const level = findLevelById(selectedLevelId);
    const questions = level.questions;
    const idx = questions.findIndex(q => q.id === id);
    if (idx === -1) return;

    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= questions.length) return;

    const current = questions[idx];
    const target = questions[targetIdx];

    // Swap order_index
    const { error: err1 } = await _supabase.from('questions').update({ order_index: target.order_index }).eq('id', current.id);
    if (err1) return alert(err1.message);

    const { error: err2 } = await _supabase.from('questions').update({ order_index: current.order_index }).eq('id', target.id);
    if (err2) return alert(err2.message);

    await loadDataFromSupabase();
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

    if (type === 'quiz-item' || type === 'quiz-diagram' || type === 'listening-practice') {
        let optionsArr = [];
        let correct = 0;

        if (type === 'listening-practice') {
            optionsArr = q ? q.options : ["Opción A", "Opción B", "Opción C", "Opción D"];
            correct = q ? q.correct_answer : 0;
            const audioUrl = q ? q.audio_url || '' : '';

            addField('Pregunta específica', 'q-listening-question', 'text', q ? q.question_text : "What is the speaker talking about?");

            const divAudio = document.createElement('div');
            divAudio.className = 'form-group';
            divAudio.innerHTML = `
                <label>Audio del Ejercicio</label>
                <div style="display:flex; gap:10px;">
                    <input type="text" id="q-audio-url" value="${audioUrl}" style="flex:1">
                    <button class="modal-btn small-btn" onclick="uploadAudioToStorage('q-audio-url')" style="white-space:nowrap;">Subir Audio</button>
                </div>
            `;
            container.appendChild(divAudio);
        } else {
            optionsArr = q ? q.options : ["Opción A", "Opción B", "Opción C", "Opción D"];
            correct = q ? q.correct_answer : 0;
            const diagramUrl = q ? q.diagram_url || '' : '';

            if (type === 'quiz-diagram') {
                addField('Pregunta (Ej: ¿Qué valor tiene S si E=5?)', 'q-diagram-question', 'text', q ? q.question_text : "");

                const divImg = document.createElement('div');
                divImg.className = 'form-group';
                divImg.innerHTML = `
                    <label>Imagen del Diagrama</label>
                    <div style="display:flex; gap:10px;">
                        <input type="text" id="q-diagram-url" value="${diagramUrl}" style="flex:1">
                        <button class="modal-btn small-btn" onclick="uploadImageToStorage('q-diagram-url')" style="white-space:nowrap;">Subir Imagen</button>
                    </div>
                `;
                container.appendChild(divImg);
            }
        }

        const options = optionsArr.join('\n');
        addField('Opciones (una por línea)', 'q-options', 'textarea', options);

        // Numbered preview for clarity
        const previewDiv = document.createElement('div');
        previewDiv.style.background = 'rgba(0,0,0,0.2)';
        previewDiv.style.padding = '10px';
        previewDiv.style.borderRadius = '8px';
        previewDiv.style.marginBottom = '1rem';
        previewDiv.innerHTML = `<label style="color:var(--secondary-color); font-size:0.8rem;">Vista previa de índices:</label>` +
            optionsArr.map((opt, i) => `<div style="font-size:0.8rem; color:#aaa;">${i}: ${opt}</div>`).join('');
        container.appendChild(previewDiv);

        addField('Índice Correcto (Escribe el número)', 'q-correct', 'number', correct);

        const correctText = optionsArr[correct] || "N/A";
        const feedbackDiv = document.createElement('div');
        feedbackDiv.style.marginTop = "-10px";
        feedbackDiv.style.marginBottom = "15px";
        feedbackDiv.style.fontSize = "0.9rem";
        feedbackDiv.innerHTML = `Respuesta Correcta actual: <b style="color:var(--success)">${correctText}</b>`;
        container.appendChild(feedbackDiv);
    }
    else if (type === 'speech-practice') {
        const text = q ? q.question_text : "Menutech is a leading software company.";
        addField('Texto para pronunciar', 'q-speech-text', 'textarea', text);
    }
    else if (type === 'listening-practice') {
        // Already handled in the combined if block above
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

// --- ASSET STORAGE UPLOADS ---
async function uploadAudioToStorage(targetId = 'q-audio-url') {
    const input = document.getElementById('audio-file-input');
    input.onchange = (e) => handleFileSelection(e.target, 'audio', targetId);
    input.click();
}

async function uploadImageToStorage(targetId) {
    const input = document.getElementById('image-file-input');
    input.onchange = (e) => handleFileSelection(e.target, 'image', targetId);
    input.click();
}

async function handleFileSelection(input, type, targetId) {
    const file = input.files[0];
    if (!file) return;

    // Find the button that triggered this
    let btn;
    if (type === 'audio') {
        btn = document.querySelector(`button[onclick*="uploadAudioToStorage('${targetId}')"]`) ||
              document.querySelector('button[onclick*="uploadAudioToStorage"]');
    } else {
        btn = document.querySelector(`button[onclick*="uploadImageToStorage('${targetId}')"]`);
    }

    const originalHTML = btn ? btn.innerHTML : 'Subir';
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subiendo...';
        btn.disabled = true;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Tragalero');

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dbbjxhvz5/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.secure_url) {
            document.getElementById(targetId).value = data.secure_url;
            alert('¡Archivo subido con éxito!');
        } else {
            throw new Error(data.error?.message || 'Error desconocido');
        }
    } catch (err) {
        console.error("Upload Error:", err);
        alert("Error al subir archivo: " + err.message);
    } finally {
        if (btn) {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }
    }
}

// --- SAVE QUESTION ---
async function saveQuestion() {
    console.log("💾 saveQuestion called");
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
        payload.options = document.getElementById('q-options').value.split('\n').map(l => l.trim()).filter(l => l);
        payload.correct_answer = parseInt(document.getElementById('q-correct').value) || 0;
    }
    else if (type === 'quiz-diagram') {
        payload.question_text = document.getElementById('q-diagram-question').value;
        payload.options = document.getElementById('q-options').value.split('\n').map(l => l.trim()).filter(l => l);
        payload.correct_answer = parseInt(document.getElementById('q-correct').value) || 0;
        payload.diagram_url = document.getElementById('q-diagram-url').value;
    }
    else if (type === 'speech-practice') {
        payload.question_text = document.getElementById('q-speech-text').value;
    }
    else if (type === 'listening-practice') {
        payload.question_text = document.getElementById('q-listening-question').value;
        payload.options = document.getElementById('q-options').value.split('\n').map(l => l.trim()).filter(l => l);
        payload.correct_answer = parseInt(document.getElementById('q-correct').value) || 0;
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
        // Get max order_index for this level
        const level = findLevelById(selectedLevelId);
        const maxIdx = level.questions.length > 0 ? Math.max(...level.questions.map(q => q.order_index || 0)) : -1;
        payload.order_index = maxIdx + 1;

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
