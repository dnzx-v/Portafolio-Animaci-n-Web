/* Para agregar o editar un proyecto, modifica el arreglo SESIONES. */

const SESIONES = [
  { n: 5, titulo: "Pixel Shop: Etiquetas y Selectores", tags: ["html", "css"], filtro: "HTML · CSS", cover: "assets/previews/sesion-05.png",
    url: "proyectos/sesion-05/index.html", desc: "Tienda de tecnología con catálogo de productos." },

  { n: 6, titulo: "Yume Café", tags: ["html", "css"], filtro: "HTML · CSS", cover: "assets/previews/sesion-06.png",
    url: "proyectos/sesion-06/index.html", desc: "Página kawaii de una cafetería con menú y contacto." },

  { n: 7, titulo: "Transform: Elige tu Movimiento", tags: ["html", "css", "animacion"], filtro: "HTML · CSS · Animación", cover: "assets/previews/sesion-07.png",
    url: "proyectos/sesion-07/index.html", desc: "Práctica interactiva de transform: mover, escalar y rotar." },

  { n: 9, titulo: "Mi Tienda de Tecnología", tags: ["html", "css", "animacion"], filtro: "HTML · CSS", cover: "assets/previews/sesion-09.png",
    url: "proyectos/sesion-09/index.html", desc: "Imágenes animadas y catálogo de productos." },

  { n: 10, titulo: "Neko Pixel + Keyframes", tags: ["html", "css", "animacion"], filtro: "HTML · CSS · @keyframes", cover: "assets/previews/sesion-10.png",
    url: "proyectos/sesion-10/practica.html", desc: "Tienda con animaciones y 3 prácticas de keyframes.",
    links: [
      { txt: "Práctica 1", href: "proyectos/sesion-10/index1.html" },
      { txt: "Práctica 2", href: "proyectos/sesion-10/index2.html" },
      { txt: "Práctica 3", href: "proyectos/sesion-10/index3.html" }] },

  { n: 11, titulo: "Vampire Shop", tags: ["html", "css", "js", "animacion"], filtro: "HTML · CSS · JS", cover: "assets/previews/sesion-11.png",
    url: "proyectos/sesion-11/index.html", desc: "Tienda temática con animaciones y scroll." },

  { n: 12, titulo: "Ciao Benvenuto: Movimiento con JS", tags: ["html", "css", "js", "animacion"], filtro: "HTML · CSS · JavaScript", cover: "assets/previews/sesion-12.png",
    url: "proyectos/sesion-12/index.html", desc: "Mensaje sorpresa y paseos animados con JavaScript." },

  { n: 13, titulo: "Mimo Market: Intervalos y Slider", tags: ["html", "css", "js", "animacion"], filtro: "HTML · CSS · JavaScript", cover: "assets/previews/sesion-13.png",
    url: "proyectos/sesion-13/index.html", desc: "Contador con intervalos y slider automático." },

  { n: 14, titulo: "Vampire Shop: Moda para la noche", tags: ["html", "css", "js", "animacion"], filtro: "HTML · CSS · JavaScript", cover: "assets/previews/sesion-14.png",
    url: "proyectos/sesion-14/index.html", desc: "Tienda de moda alternativa con catálogo y detalles interactivos." },

  { n: 15, titulo: "Vampire Shop: Viste tu propia noche", tags: ["html", "css", "js", "animacion"], filtro: "HTML · CSS · JavaScript", cover: "assets/previews/sesion-15.png",
    url: "proyectos/sesion-15/practica.html", desc: "Tienda de moda alternativa con animaciones y carrito interactivo." }
];

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");

/* ---------- Crear tarjetas ---------- */
SESIONES.forEach(s => {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.tags = s.tags.join(" ");
  card.innerHTML = `
    <div class="card-preview" aria-hidden="true"><img src="${s.cover}" alt="" loading="lazy"></div>
    <div class="card-copy">
      <span class="tag">Sesión ${s.n}</span>
      <span class="card-index">${String(s.n).padStart(2, "0")}</span>
      <h3>${s.titulo}</h3>
      <span class="meta">${s.filtro}</span>
      <button class="btn-view" type="button">Ver proyecto</button>
    </div>`;
  card.querySelector("button").addEventListener("click", () => abrir(s));
  grid.appendChild(card);
});

function abrir(s) {
  if (!s.links) { window.open(s.url, "_blank", "noopener"); return; }
  mostrarVisor(s);
}

/* ---------- Filtros ---------- */
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelector(".chip.active").classList.remove("active");
    chip.classList.add("active");
    const f = chip.dataset.filter;
    let visibles = 0;
    document.querySelectorAll(".card").forEach(c => {
      const ok = f === "todos" || c.dataset.tags.split(" ").includes(f);
      c.classList.toggle("hide", !ok);
      if (ok) visibles++;
    });
    empty.hidden = visibles > 0;
  });
});

/* ---------- Visor (modal) ---------- */
const modal = document.getElementById("modal");
const mMedia = document.getElementById("modalMedia");
const mLinks = document.getElementById("modalLinks");

function mostrarVisor(s) {
  document.getElementById("modalTag").textContent = "Sesión " + s.n;
  document.getElementById("modalTitle").textContent = s.titulo;
  document.getElementById("modalDesc").textContent = s.desc || "";
  mMedia.innerHTML = "";
  mLinks.innerHTML = "";

  const fr = document.createElement("iframe");
  fr.src = s.url; fr.title = s.titulo; fr.loading = "lazy";
  mMedia.appendChild(fr);
  mLinks.appendChild(crearLink("Abrir página completa", s.url));
  (s.links || []).forEach(l => mLinks.appendChild(crearLink(l.txt, l.href)));
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function crearLink(txt, href) {
  const a = document.createElement("a"); a.textContent = txt; a.href = href; a.target = "_blank"; a.rel = "noopener"; return a;
}
function cerrar() {
  modal.hidden = true; mMedia.innerHTML = ""; document.body.style.overflow = "";
}
document.getElementById("modalClose").addEventListener("click", cerrar);
modal.addEventListener("click", e => { if (e.target === modal) cerrar(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) cerrar(); });

/* ---------- Menú lateral ---------- */
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
const links = [...document.querySelectorAll(".nav a")];
links.forEach(a => a.addEventListener("click", () => {
  sidebar.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

/* Resaltar la sección activa al hacer scroll */
const secciones = links.map(a => document.querySelector(a.getAttribute("href")));
const obs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
secciones.forEach(s => s && obs.observe(s));

/* Mostrar las secciones cuando entran en pantalla. */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(section => revealObserver.observe(section));
