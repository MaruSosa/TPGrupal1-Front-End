// ==========================================
// MENÚ HAMBURGUESA (MOBILE)
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    // Cambiamos el ícono (barras / equis)
    const icono = menuToggle.querySelector("i");
    if (icono) {
      if (navMenu.classList.contains("open")) {
        icono.classList.remove("fa-bars");
        icono.classList.add("fa-times");
      } else {
        icono.classList.remove("fa-times");
        icono.classList.add("fa-bars");
      }
    }
  });
}

// ==========================================
// SALUDO SEGÚN LA HORA
// ==========================================

function actualizarSaludo() {
  const hora = new Date().getHours();
  const saludo = document.getElementById("saludo");

  if (!saludo) return;

  if (hora < 12) {
    saludo.textContent = "🌅 Buenos días";
  } else if (hora < 19) {
    saludo.textContent = "☀️ Buenas tardes";
  } else {
    saludo.textContent = "🌙 Buenas noches";
  }
}

actualizarSaludo();

// ==========================================
// CARRUSEL DE HABILIDADES
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("skillsCarousel");
  const track = document.getElementById("skillsTrack");
  const prevButton = document.getElementById("prevSkill");
  const nextButton = document.getElementById("nextSkill");
  const dotsContainer = document.getElementById("carouselDots");

  // Verificamos que exista el carrusel
  if (!carousel || !track || !prevButton || !nextButton || !dotsContainer) {
    return;
  }

  // Tarjetas originales
  const originalCards = Array.from(track.querySelectorAll(".skill-card"));
  const totalCards = originalCards.length;

  if (totalCards === 0) {
    return;
  }

  // Variables
  let currentIndex = 0;
  let cardsPerView = 3;
  let autoPlay = null;
  let isLocked = false; // evita clics repetidos durante la animación
  let touchStartX = 0;
  let touchEndX = 0;

  const TRANSITION_MS = 600;

  // ------------------------------------------
  // Calcular tarjetas visibles
  // ------------------------------------------
  function updateCardsPerView() {
    const width = window.innerWidth;

    if (width <= 600) {
      cardsPerView = 1;
    } else if (width <= 900) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
  }

  // ------------------------------------------
  // Crear clones para el efecto infinito
  // ------------------------------------------
  function createClones() {
    track
      .querySelectorAll(".skill-card.clone")
      .forEach((card) => card.remove());

    for (let i = 0; i < cardsPerView; i++) {
      const clone = originalCards[i % totalCards].cloneNode(true);
      clone.classList.add("clone");
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    }
  }

  // ------------------------------------------
  // Ancho de una tarjeta + separación
  // ------------------------------------------
  function getCardWidth() {
    const card = track.querySelector(".skill-card");

    if (!card) {
      return 0;
    }

    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;

    return card.offsetWidth + gap;
  }

  // ------------------------------------------
  // Mover carrusel
  // ------------------------------------------
  function moveCarousel(animate = true) {
    const cardWidth = getCardWidth();

    if (!cardWidth) {
      return;
    }

    track.style.transition = animate
      ? `transform ${TRANSITION_MS}ms ease`
      : "none";

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    updateDots();
  }

  // ------------------------------------------
  // Siguiente
  // ------------------------------------------
  function nextSlide() {
    if (isLocked) return;
    isLocked = true;

    currentIndex++;
    moveCarousel(true);

    setTimeout(() => {
      // Llegamos a los clones: volvemos al inicio sin animación
      if (currentIndex >= totalCards) {
        currentIndex = 0;
        moveCarousel(false);
      }
      isLocked = false;
    }, TRANSITION_MS + 50);
  }

  // ------------------------------------------
  // Anterior
  // ------------------------------------------
  function previousSlide() {
    if (isLocked) return;
    isLocked = true;

    if (currentIndex <= 0) {
      // Saltamos a los clones (sin animación) y retrocedemos con animación
      currentIndex = totalCards;
      moveCarousel(false);

      // Forzamos el reflow para que el navegador aplique el salto
      void track.offsetWidth;

      setTimeout(() => {
        currentIndex--;
        moveCarousel(true);
      }, 30);
    } else {
      currentIndex--;
      moveCarousel(true);
    }

    setTimeout(() => {
      isLocked = false;
    }, TRANSITION_MS + 80);
  }

  // ------------------------------------------
  // Autoplay
  // ------------------------------------------
  function startAutoPlay() {
    stopAutoPlay();
    autoPlay = setInterval(nextSlide, 3500);
  }

  function stopAutoPlay() {
    if (autoPlay) {
      clearInterval(autoPlay);
      autoPlay = null;
    }
  }

  // ------------------------------------------
  // Botones
  // ------------------------------------------
  nextButton.addEventListener("click", () => {
    nextSlide();
    startAutoPlay();
  });

  prevButton.addEventListener("click", () => {
    previousSlide();
    startAutoPlay();
  });

  // ------------------------------------------
  // Pausar con el mouse
  // ------------------------------------------
  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);

  // ------------------------------------------
  // Swipe en celular
  // ------------------------------------------
  carousel.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
      stopAutoPlay();
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    },
    { passive: true }
  );

  function handleSwipe() {
    const difference = touchStartX - touchEndX;

    // Ignoramos movimientos muy pequeños
    if (Math.abs(difference) < 50) {
      return;
    }

    if (difference > 0) {
      nextSlide(); // deslizó hacia la izquierda
    } else {
      previousSlide(); // deslizó hacia la derecha
    }
  }

  // ------------------------------------------
  // Puntos indicadores
  // ------------------------------------------
  function createDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.classList.add("carousel-dot");
      dot.setAttribute("aria-label", `Ir a la habilidad ${i + 1}`);

      dot.addEventListener("click", () => {
        currentIndex = i;
        moveCarousel(true);
        startAutoPlay();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex % totalCards);
    });
  }

  // ------------------------------------------
  // Responsive
  // ------------------------------------------
  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      const oldCardsPerView = cardsPerView;
      updateCardsPerView();

      if (oldCardsPerView !== cardsPerView) {
        currentIndex = 0;
        createClones();
      }

      moveCarousel(false);
    }, 200);
  });

  // ------------------------------------------
  // Iniciar
  // ------------------------------------------
  updateCardsPerView();
  createClones();
  createDots();
  moveCarousel(false);
  startAutoPlay();
});
