// 1. CONTADOR: n\u00%BAmeros del 1 al 5, luego intervalo detenido
const numeroEjecucion = document.getElementById("numeroEjecucion");
const estadoEjecucion = document.getElementById("estadoEjecucion");
const iniciarContador = document.getElementById("iniciarContador");

let intervaloContador = null;
let numero = 0;

iniciarContador.addEventListener("click", function () {
    if (intervaloContador !== null) return;

    numero = 0;
    numeroEjecucion.textContent = numero;
    estadoEjecucion.textContent = "Ejecutando...";
    iniciarContador.disabled = true;
    iniciarContador.textContent = "En ejecuci\u00f3n";

    intervaloContador = setInterval(function () {
        numero++;
        numeroEjecucion.textContent = numero;

        if (numero === 5) {
            clearInterval(intervaloContador);
            intervaloContador = null;

            setTimeout(function () {
                estadoEjecucion.textContent = "Intervalo detenido";
                iniciarContador.disabled = false;
                iniciarContador.textContent = "Volver a ejecutar";
            }, 500);
        }
    }, 1000);
});

// 2. SLIDER: 3 im\u00e1genes autom\u00e1ticas, siguiente/anterior, pausa al pasar el mouse
const diapositivas = [
    {
        imagen: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=85",
        alt: "Papeler\u00eda y art\u00edculos de escritorio",
        etiqueta: "COLECCI\u00d3N DESTACADA",
        titulo: "Detalles que inspiran"
    },
    {
        imagen: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1400&q=85",
        alt: "Productos de belleza y cuidado personal",
        etiqueta: "CUIDADO PERSONAL",
        titulo: "Un momento para ti"
    },
    {
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1400&q=85",
        alt: "Computadora port\u00e1til y tecnolog\u00eda",
        etiqueta: "TECNOLOG\u00cdA PARA TI",
        titulo: "Ideas que se conectan"
    }
];

const imagenSlider = document.getElementById("imagenSlider");
const sliderEtiqueta = document.getElementById("sliderEtiqueta");
const sliderTitulo = document.getElementById("sliderTitulo");
const puntosSlider = document.getElementById("puntosSlider");
const botonPausa = document.getElementById("pausarSlider");
const sliderImagen = document.getElementById("sliderImagen");

let indiceActual = 0;
let intervaloSlider = null;
let sliderEnPausa = false;

diapositivas.forEach(function (_, i) {
    const punto = document.createElement("button");
    punto.type = "button";
    punto.className = "punto" + (i === 0 ? " activo" : "");
    punto.dataset.indice = i;
    punto.setAttribute("aria-label", "Mostrar im\u00e1gen " + (i + 1));
    punto.addEventListener("click", function () {
        irADiapositiva(i);
        reiniciarSlider();
    });
    puntosSlider.appendChild(punto);
});

function mostrarDiapositiva(indice) {
    indiceActual = (indice + diapositivas.length) % diapositivas.length;
    const d = diapositivas[indiceActual];
    imagenSlider.src = d.imagen;
    imagenSlider.alt = d.alt;
    sliderEtiqueta.textContent = d.etiqueta;
    sliderTitulo.textContent = d.titulo;

    const puntos = document.querySelectorAll(".punto");
    puntos.forEach(function (p, pos) {
        p.classList.toggle("activo", pos === indiceActual);
    });
}

function avanzar() { mostrarDiapositiva(indiceActual + 1); }
function irADiapositiva(i) { mostrarDiapositiva(i); }

function iniciarSlider() {
    if (intervaloSlider !== null || sliderEnPausa) return;
    intervaloSlider = setInterval(avanzar, 4000);
}
function detenerSlider() {
    if (intervaloSlider !== null) {
        clearInterval(intervaloSlider);
        intervaloSlider = null;
    }
}
function reiniciarSlider() {
    if (!sliderEnPausa) {
        detenerSlider();
        iniciarSlider();
    }
}

document.getElementById("siguiente").addEventListener("click", function () {
    avanzar();
    reiniciarSlider();
});
document.getElementById("anterior").addEventListener("click", function () {
    mostrarDiapositiva(indiceActual - 1);
    reiniciarSlider();
});

sliderImagen.addEventListener("mouseenter", detenerSlider);
sliderImagen.addEventListener("mouseleave", function () {
    if (!sliderEnPausa) iniciarSlider();
});

botonPausa.addEventListener("click", function () {
    sliderEnPausa = !sliderEnPausa;
    if (sliderEnPausa) {
        detenerSlider();
        botonPausa.textContent = "Reanudar";
    } else {
        botonPausa.textContent = "Pausar";
        iniciarSlider();
    }
});

mostrarDiapositiva(0);
iniciarSlider();
