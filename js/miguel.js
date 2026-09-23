// ==========================================
// RELOJ EN TIEMPO REAL // ==========================================

function actualizarReloj() {
    const ahora = new Date();

    // Obtenemos horas, minutos y segundos
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    // Agregamos un "0" adelante si es menor a 10
    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    // Mostramos la hora en el elemento con id="reloj"
    const reloj = document.getElementById("reloj");
    if (reloj) {
        reloj.textContent = `${horas}:${minutos}:${segundos}`;
    }
}

// Actualizamos el reloj cada 1 segundo
setInterval(actualizarReloj, 1000);

// Lo ejecutamos una vez al cargar para que no espere 1 segundo
actualizarReloj();