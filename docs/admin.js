// Admin Panel Logic for Menutech
let selectedSubject = null;
let selectedLevelIndex = null;
let editingQuestionIdx = null;

// DOM Elements
const subjectList = document.getElementById('subject-list');
const levelList = document.getElementById('level-list');
const levelsSection = document.getElementById('levels-section');
const adminMain = document.getElementById('admin-main');
const welcomeScreen = document.getElementById('welcome-screen');
const levelEditor = document.getElementById('level-editor');
const questionsList = document.getElementById('questions-list');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderSubjects();
});

// --- SUBJECT CRUD ---
function renderSubjects() {
    subjectList.innerHTML = '';
    Object.keys(courseData).forEach(key => {
        const li = document.createElement('li');
        li.className = `sidebar-item ${selectedSubject === key ? 'active' : ''}`;
        li.innerHTML = `
            <span>${courseData[key].title}</span>
            <div class="q-actions">
                <button class="icon-btn small" onclick="renameSubject('${key}', event)"><i class="fas fa-edit"></i></button>
                <button class="icon-btn small delete" onclick="deleteSubject('${key}', event)"><i class="fas fa-trash"></i></button>
            </div>
        `;
        li.onclick = () => selectSubject(key);
        subjectList.appendChild(li);
    });
}

function selectSubject(key) {
    selectedSubject = key;
    selectedLevelIndex = null;
    welcomeScreen.style.display = 'block';
    levelEditor.style.display = 'none';
    levelsSection.style.display = 'block';
    renderSubjects();
    renderLevels();
}

function addNewSubject() {
    const title = prompt("Nombre de la nueva materia:");
    if (!title) return;
    const key = title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (courseData[key]) {
        alert("Ya existe una materia con un nombre similar.");
        return;
    }
    courseData[key] = {
        title: title,
        description: "Nueva materia configurada.",
        levels: []
    };
    renderSubjects();
}

function renameSubject(key, e) {
    e.stopPropagation();
    const newTitle = prompt("Nuevo nombre para la materia:", courseData[key].title);
    if (newTitle) {
        courseData[key].title = newTitle;
        renderSubjects();
    }
}

function deleteSubject(key, e) {
    e.stopPropagation();
    if (confirm(`¿Estás seguro de eliminar "${courseData[key].title}"? Se perderán todos sus niveles.`)) {
        delete courseData[key];
        if (selectedSubject === key) {
            selectedSubject = null;
            levelsSection.style.display = 'none';
        }
        renderSubjects();
    }
}

// --- LEVEL CRUD ---
function renderLevels() {
    levelList.innerHTML = '';
    if (!selectedSubject) return;

    courseData[selectedSubject].levels.forEach((level, index) => {
        const li = document.createElement('li');
        li.className = `sidebar-item ${selectedLevelIndex === index ? 'active' : ''}`;
        li.innerHTML = `
            <span>Nivel ${level.id}: ${level.title}</span>
            <div class="q-actions">
                <button class="icon-btn small" onclick="moveLevel(${index}, -1, event)"><i class="fas fa-arrow-up"></i></button>
                <button class="icon-btn small delete" onclick="deleteLevel(${index}, event)"><i class="fas fa-trash"></i></button>
            </div>
        `;
        li.onclick = () => selectLevel(index);
        levelList.appendChild(li);
    });
}

function selectLevel(index) {
    selectedLevelIndex = index;
    welcomeScreen.style.display = 'none';
    levelEditor.style.display = 'block';
    renderLevels();
    renderLevelDetails();
}

function addNewLevel() {
    if (!selectedSubject) return;
    const levels = courseData[selectedSubject].levels;
    const nextId = levels.length > 0 ? Math.max(...levels.map(l => l.id)) + 1 : 1;

    const newLevel = {
        id: nextId,
        title: `Nivel ${nextId}`,
        lesson: {
            title: "Nueva Lección",
            content: "<h2>Contenido de la lección</h2><p>Agrega aquí tu explicación.</p>"
        },
        game: {
            type: "mixed",
            title: "Práctica del Nivel",
            exercises: []
        }
    };
    levels.push(newLevel);
    renderLevels();
    selectLevel(levels.length - 1);
}

function deleteLevel(index, e) {
    e.stopPropagation();
    if (confirm("¿Eliminar este nivel por completo?")) {
        courseData[selectedSubject].levels.splice(index, 1);
        selectedLevelIndex = null;
        levelEditor.style.display = 'none';
        renderLevels();
    }
}

function moveLevel(index, direction, e) {
    e.stopPropagation();
    const levels = courseData[selectedSubject].levels;
    const newIdx = index + direction;
    if (newIdx >= 0 && newIdx < levels.length) {
        [levels[index], levels[newIdx]] = [levels[newIdx], levels[index]];
        if (selectedLevelIndex === index) selectedLevelIndex = newIdx;
        else if (selectedLevelIndex === newIdx) selectedLevelIndex = index;
        renderLevels();
    }
}

// --- LESSON EDITOR ---
function editLevelBasics() {
    const level = courseData[selectedSubject].levels[selectedLevelIndex];
    document.getElementById('lesson-title').value = level.lesson.title;
    document.getElementById('lesson-content').value = level.lesson.content;
    document.getElementById('modal-lesson').classList.add('active');
}

function saveLesson() {
    const level = courseData[selectedSubject].levels[selectedLevelIndex];
    level.lesson.title = document.getElementById('lesson-title').value;
    level.lesson.content = document.getElementById('lesson-content').value;
    closeModal('modal-lesson');
    renderLevelDetails();
}

function renderLevelDetails() {
    const level = courseData[selectedSubject].levels[selectedLevelIndex];
    document.getElementById('edit-level-title').textContent = `Nivel ${level.id}: ${level.title}`;
    document.getElementById('edit-level-subtitle').textContent = `Materia: ${courseData[selectedSubject].title}`;

    renderQuestions();
}

// --- QUESTION CRUD ---
function renderQuestions() {
    questionsList.innerHTML = '';
    const level = courseData[selectedSubject].levels[selectedLevelIndex];
    const exercises = level.game.exercises || [];

    document.getElementById('q-count').textContent = exercises.length;

    exercises.forEach((ex, index) => {
        const div = document.createElement('div');
        div.className = 'question-card';
        div.innerHTML = `
            <div class="q-info">
                <span>Tipo: ${ex.type}</span>
                <h4>${ex.title || ex.question || `Pregunta ${index + 1}`}</h4>
            </div>
            <div class="q-actions">
                <button class="icon-btn" title="Subir" onclick="moveQuestion(${index}, -1, event)"><i class="fas fa-arrow-up"></i></button>
                <button class="icon-btn" title="Bajar" onclick="moveQuestion(${index}, 1, event)"><i class="fas fa-arrow-down"></i></button>
                <button class="icon-btn" title="Cambiar de Nivel" onclick="moveQuestionToLevel(${index}, event)"><i class="fas fa-exchange-alt"></i></button>
                <button class="icon-btn" title="Editar" onclick="editQuestion(${index}, event)"><i class="fas fa-edit"></i></button>
                <button class="icon-btn delete" title="Eliminar" onclick="deleteQuestion(${index}, event)"><i class="fas fa-trash"></i></button>
            </div>
        `;
        div.onclick = () => editQuestion(index);
        questionsList.appendChild(div);
    });
}

function addNewQuestion() {
    editingQuestionIdx = null;
    document.getElementById('question-modal-title').textContent = "Nueva Pregunta";
    document.getElementById('q-type').value = "quiz-item";
    document.getElementById('q-title').value = "";
    document.getElementById('q-instruction').value = "";
    renderQuestionFields();
    document.getElementById('modal-question').classList.add('active');
}

function editQuestion(index, e) {
    if (e) e.stopPropagation();
    editingQuestionIdx = index;
    const ex = courseData[selectedSubject].levels[selectedLevelIndex].game.exercises[index];

    document.getElementById('question-modal-title').textContent = "Editar Pregunta";
    document.getElementById('q-type').value = ex.type;
    document.getElementById('q-title').value = ex.title || ex.question || "";
    document.getElementById('q-instruction').value = ex.instruction || ex.script || "";

    renderQuestionFields(ex);
    document.getElementById('modal-question').classList.add('active');
}

function deleteQuestion(index, e) {
    e.stopPropagation();
    if (confirm("¿Estás seguro de eliminar esta pregunta?")) {
        courseData[selectedSubject].levels[selectedLevelIndex].game.exercises.splice(index, 1);
        renderQuestions();
    }
}

function moveQuestionToLevel(index, e) {
    e.stopPropagation();
    const levels = courseData[selectedSubject].levels;
    if (levels.length <= 1) {
        alert("Necesitas al menos dos niveles en esta materia para mover preguntas.");
        return;
    }

    let options = levels.map((l, i) => `${i + 1}: ${l.title}`).join('\n');
    let targetIdxStr = prompt(`Selecciona el número del nivel destino (1-${levels.length}):\n\n${options}`, selectedLevelIndex + 1);

    if (targetIdxStr === null) return;

    let targetIdx = parseInt(targetIdxStr) - 1;
    if (isNaN(targetIdx) || targetIdx < 0 || targetIdx >= levels.length) {
        alert("Nivel inválido.");
        return;
    }

    if (targetIdx === selectedLevelIndex) {
        alert("Ya estás en ese nivel.");
        return;
    }

    const question = courseData[selectedSubject].levels[selectedLevelIndex].game.exercises.splice(index, 1)[0];
    courseData[selectedSubject].levels[targetIdx].game.exercises.push(question);

    alert(`Pregunta movida al Nivel ${levels[targetIdx].id}`);
    renderQuestions();
}

function moveQuestion(index, direction, e) {
    e.stopPropagation();
    const ex = courseData[selectedSubject].levels[selectedLevelIndex].game.exercises;
    const newIdx = index + direction;
    if (newIdx >= 0 && newIdx < ex.length) {
        [ex[index], ex[newIdx]] = [ex[newIdx], ex[index]];
        renderQuestions();
    }
}

// --- DYNAMIC FIELD RENDERING ---
function renderQuestionFields(ex = null) {
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
        const options = ex ? ex.options.join('\n') : "Opción A\nOpción B\nOpción C\nOpción D";
        const correct = ex ? ex.correct : 0;
        addField('Opciones (una por línea)', 'q-options', 'textarea', options);
        addField('Índice Correcto (0, 1, 2...)', 'q-correct', 'number', correct);
    }
    else if (type === 'speech-practice') {
        const text = ex ? ex.text : "Menutech is a leading software company.";
        addField('Texto para pronunciar', 'q-speech-text', 'textarea', text);
    }
    else if (type === 'listening-practice') {
        const options = ex ? ex.options.join('\n') : "Opción A\nOpción B\nOpción C\nOpción D";
        const correct = ex ? ex.correct : 0;
        const audioUrl = ex ? ex.audio_url || '' : '';

        addField('Pregunta específica', 'q-listening-question', 'text', ex ? ex.question : "What is the speaker talking about?");
        addField('Opciones (una por línea)', 'q-options', 'textarea', options);
        addField('Índice Correcto (0, 1, 2...)', 'q-correct', 'number', correct);

        // Audio Upload Simulation (Cloudinary logic will be here)
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
            <label>Audio URL (opcional, si está vacío usará IA para leer el script)</label>
            <div style="display:flex; gap:10px;">
                <input type="text" id="q-audio-url" value="${audioUrl}" style="flex:1">
                <button class="modal-btn small-btn" onclick="uploadAudioToCloudinary()" style="white-space:nowrap;">Subir Audio</button>
            </div>
            <input type="file" id="audio-file-input" style="display:none" accept="audio/*" onchange="handleAudioFileSelection(this)">
        `;
        container.appendChild(div);
    }
    else if (type === 'builder') {
        const blocks = ex ? (ex.blocks || ex.challenges[0].blocks).join(', ') : "SELECT, *, FROM, table";
        const correct = ex ? (ex.correct || ex.challenges[0].correct) : "SELECT * FROM table";
        addField('Misión/Objetivo', 'q-goal', 'text', ex ? (ex.goal || ex.challenges[0].goal) : "Selecciona todo...");
        addField('Respuesta Correcta', 'q-builder-correct', 'text', correct);
        addField('Bloques Disponibles (separados por coma)', 'q-blocks', 'text', blocks);
    }
    else if (type === 'sorter') {
        const lines = ex ? ex.lines.join('\n') : "Inicio\nEscribir \"Hola\"\nFin";
        addField('Líneas de Pseudocódigo (en orden correcto)', 'q-lines', 'textarea', lines);
    }
    else if (type === 'match') {
        const pairs = ex ? ex.pairs.map(p => `${p.es}|${p.en}`).join('\n') : "Hola|Hello\nMundo|World";
        addField('Pares (Español|Inglés, uno por línea)', 'q-pairs', 'textarea', pairs);
    }
    else if (type === 'flowchart-free') {
        const items = ex ? ex.items.map(i => `${i.id}|${i.text}`).join('\n') : "s|Inicio\nf|Fin";
        const edges = ex ? ex.solution.edges.map(e => `${e[0]}|${e[1]}`).join('\n') : "s|f";
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
    formData.append('upload_preset', 'de3n9pg8x'); // Unsigned preset

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

// --- VALIDATION ---
function validateQuestion() {
    const type = document.getElementById('q-type').value;
    const title = document.getElementById('q-title').value;

    if (!title.trim()) {
        alert("El título es obligatorio.");
        return false;
    }

    if (type === 'quiz-item' || type === 'listening-practice') {
        const options = document.getElementById('q-options').value.split('\n').filter(l => l.trim());
        const correct = parseInt(document.getElementById('q-correct').value);
        if (options.length < 2) {
            alert("Debes agregar al menos 2 opciones.");
            return false;
        }
        if (isNaN(correct) || correct < 0 || correct >= options.length) {
            alert(`El índice correcto (${correct}) no es válido para ${options.length} opciones.`);
            return false;
        }
    }

    if (type === 'builder') {
        const goal = document.getElementById('q-goal').value;
        const correct = document.getElementById('q-builder-correct').value;
        const blocks = document.getElementById('q-blocks').value.split(',').map(b => b.trim()).filter(b => b);
        if (!goal || !correct || blocks.length === 0) {
            alert("Completa todos los campos del SQL Builder.");
            return false;
        }
    }

    return true;
}

// --- SAVE QUESTION ---
function saveQuestion() {
    if (!validateQuestion()) return;

    const type = document.getElementById('q-type').value;
    const title = document.getElementById('q-title').value;
    const instruction = document.getElementById('q-instruction').value;

    let newEx = {
        type: type,
        title: title,
    };

    if (type === 'quiz-item') {
        newEx.question = title;
        newEx.options = document.getElementById('q-options').value.split('\n').filter(l => l.trim());
        newEx.correct = parseInt(document.getElementById('q-correct').value);
    }
    else if (type === 'speech-practice') {
        newEx.text = document.getElementById('q-speech-text').value;
        newEx.instruction = instruction;
    }
    else if (type === 'listening-practice') {
        newEx.script = instruction;
        newEx.question = document.getElementById('q-listening-question').value;
        newEx.options = document.getElementById('q-options').value.split('\n').filter(l => l.trim());
        newEx.correct = parseInt(document.getElementById('q-correct').value);
        newEx.audio_url = document.getElementById('q-audio-url').value;
    }
    else if (type === 'builder') {
        const challenge = {
            goal: document.getElementById('q-goal').value,
            correct: document.getElementById('q-builder-correct').value,
            blocks: document.getElementById('q-blocks').value.split(',').map(b => b.trim()).filter(b => b)
        };
        newEx.challenges = [challenge];
    }
    else if (type === 'sorter') {
        newEx.instruction = instruction;
        newEx.lines = document.getElementById('q-lines').value.split('\n').filter(l => l.trim());
    }
    else if (type === 'match') {
        newEx.pairs = document.getElementById('q-pairs').value.split('\n').filter(l => l.trim()).map(line => {
            const [es, en] = line.split('|');
            return { es, en };
        });
    }
    else if (type === 'flowchart-free') {
        newEx.instruction = instruction;
        newEx.items = document.getElementById('q-fc-items').value.split('\n').filter(l => l.trim()).map(line => {
            const [id, text] = line.split('|');
            return { id, text };
        });
        const edges = document.getElementById('q-fc-edges').value.split('\n').filter(l => l.trim()).map(line => line.split('|'));
        newEx.solution = {
            nodes: newEx.items.map(i => ({ contentId: i.id })),
            edges: edges
        };
    }

    const exList = courseData[selectedSubject].levels[selectedLevelIndex].game.exercises;
    if (editingQuestionIdx !== null) {
        exList[editingQuestionIdx] = newEx;
    } else {
        exList.push(newEx);
    }

    closeModal('modal-question');
    renderQuestions();
}

// --- UTILS ---
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(courseData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "menutech_exams_config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importJSON(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (confirm("¿Estás seguro de importar esta configuración? Sobrescribirá tus cambios actuales.")) {
                courseData = data;
                localStorage.setItem('menutech_course_data', JSON.stringify(courseData));
                location.reload();
            }
        } catch (err) {
            alert("Error al parsear el archivo JSON.");
        }
    };
    reader.readAsText(file);
}

document.getElementById('btn-save-all').onclick = () => {
    localStorage.setItem('menutech_course_data', JSON.stringify(courseData));
    alert("¡Cambios guardados en el navegador! Ahora puedes verlos en la aplicación principal.");
};
