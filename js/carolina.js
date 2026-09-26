// ==========================================
// FUNCIÓN DINÁMICA: BARRAS DE NIVEL DE HABILIDADES
// ==========================================
// Anima el ancho de cada barra hasta el porcentaje indicado en
// data-percent cuando la sección entra en pantalla, en vez de
// mostrarlas ya completas al cargar la página.

const barrasHabilidad = document.querySelectorAll(".skill-bar-track");

if (barrasHabilidad.length > 0) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const track = entrada.target;
          const relleno = track.querySelector(".skill-bar-fill");
          const porcentaje = track.dataset.percent;

          if (relleno) {
            relleno.style.width = `${porcentaje}%`;
          }

          // Una vez animada, dejamos de observarla
          observador.unobserve(track);
        }
      });
    },
    { threshold: 0.4 }
  );

  barrasHabilidad.forEach((track) => observador.observe(track));
}

// ==========================================
// FUNCIÓN DINÁMICA: RECOMENDADOR DE DISCO AL AZAR
// ==========================================
// Al hacer clic en el botón, elige al azar uno de los artistas
// favoritos de la sección "Discos favoritos" y lo muestra como
// recomendación, resaltando su tarjeta correspondiente.

const btnDiscoRandom = document.getElementById("btnDiscoRandom");
const resultadoRandom = document.getElementById("resultadoRandom");
const tarjetasMusica = document.querySelectorAll("#musicaGrid .card-item");

if (btnDiscoRandom && resultadoRandom && tarjetasMusica.length > 0) {
  btnDiscoRandom.addEventListener("click", () => {
    // Quitamos el resaltado de la tarjeta elegida anteriormente
    tarjetasMusica.forEach((tarjeta) => tarjeta.classList.remove("destacado"));

    // Elegimos un índice al azar entre las tarjetas disponibles
    const indiceAlAzar = Math.floor(Math.random() * tarjetasMusica.length);
    const tarjetaElegida = tarjetasMusica[indiceAlAzar];
    const artista = tarjetaElegida.dataset.artista;

    // Resaltamos la tarjeta elegida
    tarjetaElegida.classList.add("destacado");

    // Mostramos el resultado
    resultadoRandom.textContent = `🎧 Hoy escuchá: ${artista}`;

    // Llevamos la vista hacia la tarjeta elegida (útil en mobile)
    tarjetaElegida.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
