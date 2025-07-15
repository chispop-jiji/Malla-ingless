const ramos = {
  "1": [
    { id: "english1", nombre: "English 1" },
    { id: "intro_ling", nombre: "Introduction to Linguistics" },
    { id: "identidad_doc", nombre: "Construcción de la Identidad Profesional Docente" },
    { id: "psico_desarrollo", nombre: "Psicología del Desarrollo" },
    { id: "sist_educ", nombre: "Sistema Educativo y Currículum Escolar" }
  ],
  "2": [
    { id: "english2", nombre: "English 2", prereqs: ["english1"] },
    { id: "lex_dev", nombre: "Language Foundations 1: Lexical Development" },
    { id: "psico_aprend", nombre: "Psicología del Aprendizaje" },
    { id: "cfg1", nombre: "CFG 1" },
    { id: "cfg2", nombre: "CFG 2" }
  ],
  "3": [
    { id: "docente1", nombre: "Indagación en el Trabajo Docente y Acercamiento a la Escuela" },
    { id: "english3", nombre: "English 3", prereqs: ["english1", "english2"] },
    { id: "lexico1", nombre: "Language Foundations 2: Lexico Grammar 1", prereqs: ["intro_ling"] },
    { id: "applied_ling", nombre: "EFL Applied Linguistics", prereqs: ["intro_ling"] },
    { id: "cfg3", nombre: "CFG 3" }
  ],
  "4": [
    { id: "english4", nombre: "English 4", prereqs: ["english1", "english2", "english3"] },
    { id: "lexico2", nombre: "Language Foundations 3: Lexico Grammar 2", prereqs: ["lexico1"] },
    { id: "phonology", nombre: "Language Foundations 4: Phonology", prereqs: ["intro_ling", "english3"] },
    { id: "tefl_theory", nombre: "TEFL Methodology: Theories & Strategies", prereqs: ["applied_ling"] },
    { id: "cfg4", nombre: "CFG 4" }
  ],
  "5": [
    { id: "practica1", nombre: "Práctica Inicial 1", prereqs: ["identidad_doc", "docente1"] },
    { id: "english5", nombre: "English 5", prereqs: ["english1", "english2", "english3", "english4"] },
    { id: "tefl_div", nombre: "TEFL Methodology: Diversity & Inclusion", prereqs: ["applied_ling"] },
    { id: "tefl_plan", nombre: "TEFL Methodology: Lesson Planning & Formative Assessment", prereqs: ["applied_ling"] },
    { id: "cfg5", nombre: "CFG 5" }
  ],
  "6": [
    { id: "practica2", nombre: "Práctica Inicial 2", prereqs: ["practica1"] },
    { id: "english6", nombre: "English 6", prereqs: ["english1", "english2", "english3", "english4", "english5"] },
    { id: "tefl_sec", nombre: "TEFL Methodology: Secondary", prereqs: ["tefl_div", "tefl_plan"] },
    { id: "tefl_kids", nombre: "TEFL Methodology: Young Learners", prereqs: ["tefl_div", "tefl_plan"] },
    { id: "liderazgo", nombre: "Liderazgo Pedagógico en la Escuela" }
  ],
  "7": [
    { id: "practica3", nombre: "Práctica Intermedia 1", prereqs: ["practica2"] },
    { id: "english7", nombre: "English 7", prereqs: ["english6"] },
    { id: "culture1", nombre: "English Speaking Countries’s Culture 1", prereqs: ["english6"] },
    { id: "assessment", nombre: "Assessment for Learning", prereqs: ["tefl_sec", "tefl_kids"] },
    { id: "gestion", nombre: "Gestión de Aula" }
  ],
  "8": [
    { id: "practica4", nombre: "Práctica Intermedia 2", prereqs: ["practica3"] },
    { id: "english8", nombre: "English 8", prereqs: ["english7"] },
    { id: "culture2", nombre: "English Speaking Countries’s Culture 2", prereqs: ["culture1"] },
    { id: "curriculum", nombre: "Curriculum & Planning", prereqs: ["assessment"] },
    { id: "research", nombre: "Research Methodology", prereqs: ["assessment", "english7", "practica3"] }
  ],
  "9": [
    { id: "practica5", nombre: "Práctica Profesional 1", prereqs: ["practica4", "english8", "curriculum", "research"] },
    { id: "writing", nombre: "Writing for Academic Purposes" },
    { id: "applied_research", nombre: "Applied Research in TEFL", prereqs: ["research", "english8", "practica4", "curriculum"] },
    { id: "electivo1", nombre: "Electivo 1" }
  ],
  "10": [
    { id: "practica6", nombre: "Práctica Profesional 2", prereqs: ["practica5", "writing", "applied_research"] },
    { id: "seminario", nombre: "Seminario de Titulación", prereqs: ["applied_research", "writing", "practica5"] },
    { id: "cfg6", nombre: "CFG 6" }
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
