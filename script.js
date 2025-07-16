const ramos = {
  "Semestre 1": [
    "Laboratorio de Investigación Publicitaria",
    "Taller de Imagen y Retoque Digital",
    "Antropología del consumo",
    "Teoría de la Imagen y Sociedad",
    "Economía de la Empresa",
    "Ética y Legislación"
  ],
  "Semestre 2": [
    "Laboratorio de Narrativa de Marca",
    "Taller de Video y Animación Digital",
    "Métodos y Conocimiento",
    "Creación y Narrativa 1",
    "Marketing Estratégico",
    "Inglés 1"
  ],
  "Semestre 3": [
    "Laboratorio de Branding 1",
    "Taller de Integración Gráfica y Audiovisual",
    "Técnicas Cualitativas y Análisis de la Comunicación Publicitaria",
    "Creación y Narrativa 2",
    "Análisis y Estrategia de Marca",
    "Inglés 2"
  ],
  "Semestre 4": [
    "Laboratorio de Branding 2",
    "Taller de Análisis y Gestión de Contenido Digital",
    "Etnografía del Consumo",
    "Gestión Comunicacional Estratégica y Corporativa 1",
    "Branding Estratégico",
    "Inglés 3"
  ],
  "Semestre 5": [
    "Laboratorio Transmedia",
    "Analítica Digital",
    "Técnicas Cuantitativas y Audiencias",
    "Gestión Comunicacional Estratégica y Corporativa 2",
    "Planificación Estratégica de Medios",
    "CFG 1"
  ],
  "Semestre 6": [
    "Laboratorio de Comunicación integrada",
    "Introducción al Diseño Web",
    "Taller de Guión Audiovisual",
    "Plan de Negocios",
    "Marketing Metrics",
    "CFG 2"
  ],
  "Semestre 7": [
    "Clínica Profesional",
    "Taller de Diseño y Plataformas Digitales",
    "Storytelling",
    "Estrategia de Sostenibilidad",
    "Comunicación Gubernamental y Política",
    "CFG 3"
  ],
  "Semestre 8": [
    "Práctica Profesional",
    "Electivo 1",
    "Electivo 2",
    "CFG 4"
  ]
};

const prerequisitos = {
  // Segundo año
  "Métodos y Conocimiento": ["Antropología del consumo"],
  "Creación y Narrativa 2": ["Creación y Narrativa 1"],
  "Laboratorio de Branding 2": ["Laboratorio de Branding 1"],
  "Etnografía del Consumo": ["Antropología del consumo"],

  // Tercer año
  "Técnicas Cuantitativas y Audiencias": ["Técnicas Cualitativas y Análisis de la Comunicación Publicitaria"],
  "Gestión Comunicacional Estratégica y Corporativa 2": ["Gestión Comunicacional Estratégica y Corporativa 1"],

  // Cuarto año
  "Clínica Profesional": ["Laboratorio de Comunicación integrada"],
  "Práctica Profesional": ["Clínica Profesional"]
};

const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function crearMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  Object.entries(ramos).forEach(([semestre, listaRamos]) => {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    columna.appendChild(titulo);

    listaRamos.forEach(ramo => {
      const div = document.createElement("div");
      div.textContent = ramo;
      div.className = "ramo";

      if (estado[ramo]) {
        div.classList.add("aprobado");
      }

      const requisitos = prerequisitos[ramo];
      if (requisitos && !requisitos.every(r => estado[r])) {
        div.classList.add("bloqueado");
      }

      div.addEventListener("click", () => toggleRamo(div, ramo));
      columna.appendChild(div);
    });

    malla.appendChild(columna);
  });
}

function toggleRamo(div, ramo) {
  estado[ramo] = !estado[ramo];
  localStorage.setItem("estadoRamos", JSON.stringify(estado));
  crearMalla(); // vuelve a generar la malla con cambios aplicados
}

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("¿Quieres reiniciar toda la malla?")) {
    localStorage.removeItem("estadoRamos");
    location.reload();
  }
});

crearMalla();
