const ramos = {
    "1": [
        { id: "english1", nombre: "English 1" },
        { id: "intro_ling", nombre: "Introduction to Linguistics" },
        { id: "identidad_doc", nombre: "Construcción de la Identidad Profesional Docente" },
        { id: "psico_desarrollo", nombre: "Psicología del Desarrollo" },
        { id: "sist_educ_curr", nombre: "Sistema Educativo y Currículum Escolar" }
    ],
    "2": [
        { id: "english2", nombre: "English 2", prereqs: ["english1"] },
        { id: "lex_dev", nombre: "Language Foundations 1: Lexical Development" },
        { id: "psico_aprend", nombre: "Psicología del Aprendizaje" },
        { id: "cfg1", nombre: "CFG 1" },
        { id: "cfg2", nombre: "CFG 2" }
    ]
};

let estado = {};

function crearMalla() {
    const contenedor = document.getElementById("malla");
    contenedor.innerHTML = "";
    for (const [semestre, ramosSemestre] of Object.entries(ramos)) {
        const div = document.createElement("div");
        div.className = "semestre";
        div.innerHTML = `<h2>Semestre ${semestre}</h2>`;
        for (const ramo of ramosSemestre) {
            const btn = document.createElement("div");
            btn.className = "ramo";
            btn.textContent = ramo.nombre;
            btn.dataset.id = ramo.id;
            if (ramo.prereqs) {
                btn.classList.add("bloqueado");
            }
            if (estado[ramo.id]) {
                btn.classList.add("aprobado");
            }
            btn.onclick = () => marcarRamo(btn, ramo);
            div.appendChild(btn);
        }
        contenedor.appendChild(div);
    }
    verificarPrerequisitos();
}

function marcarRamo(btn, ramo) {
    if (btn.classList.contains("bloqueado")) return;
    const aprobado = btn.classList.toggle("aprobado");
    estado[ramo.id] = aprobado;
    guardarEstado();
    verificarPrerequisitos();
}

function verificarPrerequisitos() {
    for (const ramosSemestre of Object.values(ramos)) {
        for (const ramo of ramosSemestre) {
            const btn = document.querySelector(`[data-id='${ramo.id}']`);
            if (!btn) continue;
            if (!ramo.prereqs || ramo.prereqs.every(id => estado[id])) {
                btn.classList.remove("bloqueado");
            } else {
                btn.classList.add("bloqueado");
            }
        }
    }
}

function guardarEstado() {
    localStorage.setItem("estadoMallaUDP", JSON.stringify(estado));
}

function cargarEstado() {
    const guardado = localStorage.getItem("estadoMallaUDP");
    if (guardado) {
        estado = JSON.parse(guardado);
    }
}

function reiniciarMalla() {
    if (confirm("¿Estás segura/o que quieres reiniciar la malla?")) {
        localStorage.removeItem("estadoMallaUDP");
        estado = {};
        crearMalla();
    }
}

cargarEstado();
crearMalla();
