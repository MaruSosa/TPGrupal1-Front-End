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

// ==========================================
// FILTRO DE HABILIDADES
// ==========================================

const botonesFiltro = document.querySelectorAll(".filtro-btn");
const habilidades = document.querySelectorAll(".profile-box");

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Quitamos la clase "active" de todos los botones
    botonesFiltro.forEach((b) => b.classList.remove("active"));

    // Agregamos la clase "active" al botón clickeado
    boton.classList.add("active");

    // Obtenemos el valor del filtro
    const filtro = boton.dataset.filtro;

    // Recorremos cada habilidad
    habilidades.forEach((habilidad) => {
      const categoria = habilidad.dataset.categoria;

      if (filtro === "todas" || categoria === filtro) {
        habilidad.style.display = "flex";
      } else {
        habilidad.style.display = "none";
      }
    });
  });
});

// ==========================================
// VER MÁS EN PELÍCULAS
// ==========================================

const botonesVerMas = document.querySelectorAll(".btn-ver-mas");

botonesVerMas.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Buscamos el párrafo con clase "texto-extra" dentro de la misma tarjeta
    const textoExtra = boton.parentElement.querySelector(".texto-extra");

    // Si está oculto, lo mostramos y cambiamos el texto
    if (
      textoExtra.style.display === "none" ||
      textoExtra.style.display === ""
    ) {
      textoExtra.style.display = "block";
      boton.textContent = "Ver menos";
    } else {
      textoExtra.style.display = "none";
      boton.textContent = "Ver más...";
    }
  });
});


// ==========================================
// TOP 3 DE DISCOS
// ==========================================

const botonesTop3 = document.querySelectorAll(".btn-top3");

botonesTop3.forEach((boton) => {
    // Verificamos si el botón está en una tarjeta de discos
    const listaTop = boton.parentElement.querySelector(".top-temas");

    if (listaTop) {
        boton.addEventListener("click", () => {
            if (listaTop.style.display === "none" || listaTop.style.display === "") {
                listaTop.style.display = "block";
                boton.textContent = "Ocultar";
            } else {
                listaTop.style.display = "none";
                boton.textContent = "Ver top 3...";
            }
        });
    }
});