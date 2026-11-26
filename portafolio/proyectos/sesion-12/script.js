const botonSorpresa = document.querySelector('#surprise-button');
const tarjetaMensaje = document.querySelector('.greeting-card');
const mensaje = document.querySelector('#greeting-message');
const pistaIda = document.querySelector('#one-way-track');
const cajitaIda = document.querySelector('#one-way-box');
const botonPaseo = document.querySelector('#start-button');
const estadoPaseo = document.querySelector('#one-way-status');
const pistaRegreso = document.querySelector('#loop-track');
const cajitaRegreso = document.querySelector('#loop-box');

let animacionIda = null;
let inicioIda = null;
let inicioRegreso = null;
const inicioX = 8;
const duracionIda = 1800;
const duracionRegreso = 2200;

function alternarSorpresa() {
    const mostrarMensaje = botonSorpresa.getAttribute('aria-pressed') !== 'true';
    botonSorpresa.setAttribute('aria-pressed', String(mostrarMensaje));

    tarjetaMensaje.classList.toggle('is-loved', mostrarMensaje);
    mensaje.textContent = mostrarMensaje
        ? 'El Señor está cerca de los quebrantados de corazón, y salva a los de espíritu abatido'
        : 'Salmo 34:17-18';
    botonSorpresa.textContent = mostrarMensaje ? '¡Otra vez!' : '¡Dame una sorpresa!';
}

function moverCajitaIda(ahora) {
    const progreso = Math.min((ahora - inicioIda) / duracionIda, 1);
    const finX = pistaIda.clientWidth - cajitaIda.offsetWidth - inicioX;
    const posicionX = inicioX + (finX - inicioX) * progreso;

    cajitaIda.style.left = `${posicionX}px`;

    if (progreso < 1) {
        animacionIda = requestAnimationFrame(moverCajitaIda);
        return;
    }

    animacionIda = null;
    botonPaseo.disabled = false;
    botonPaseo.textContent = '¡Otra vuelta!';
    estadoPaseo.textContent = 'Llegó a la meta';
}

function iniciarPaseo() {
    if (animacionIda !== null) {
        return;
    }

    inicioIda = performance.now();
    cajitaIda.style.left = `${inicioX}px`;
    botonPaseo.disabled = true;
    botonPaseo.textContent = '¡Allá va!';
    estadoPaseo.textContent = 'En camino';
    animacionIda = requestAnimationFrame(moverCajitaIda);
}

function moverCajitaDeRegreso(ahora) {
    if (inicioRegreso === null) {
        inicioRegreso = ahora;
    }

    const finX = pistaRegreso.clientWidth - cajitaRegreso.offsetWidth - inicioX;
    const ciclo = ((ahora - inicioRegreso) % duracionRegreso) / duracionRegreso;
    const progreso = ciclo < 0.5 ? ciclo * 2 : (1 - ciclo) * 2;
    const posicionX = inicioX + (finX - inicioX) * progreso;

    cajitaRegreso.style.left = `${posicionX}px`;
    requestAnimationFrame(moverCajitaDeRegreso);
}

botonSorpresa.addEventListener('click', alternarSorpresa);
botonPaseo.addEventListener('click', iniciarPaseo);

requestAnimationFrame(moverCajitaDeRegreso);
