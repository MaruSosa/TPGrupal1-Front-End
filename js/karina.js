document.addEventListener('DOMContentLoaded', () => {
    // 1. FUNCIÓN DINÁMICA: FRASES DE VOLUNTAD Y ESFUERZO
    const btnInteractive = document.getElementById('btn-interactive');
    const interactiveText = document.getElementById('interactive-text');

    const mantras = [
        "🔥 'La disciplina de hoy es la maestría del mañana. Cada línea de código cuenta.'",
        "⚙️ 'El talento abre puertas, pero la voluntad y la constancia construyen el camino.'",
        "🎨 'Sin esfuerzo no hay transformación: de la idea al diseño perfecto.'",
        "🚀 'Superando cada desafío con código, arte y determinación pura.'"
    ];

    let index = 0;

    if (btnInteractive && interactiveText) {
        btnInteractive.addEventListener('click', () => {
            interactiveText.style.opacity = '0';
            interactiveText.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                index = (index + 1) % mantras.length;
                interactiveText.textContent = mantras[index];
                interactiveText.style.opacity = '1';
                interactiveText.style.color = '#c084fc';
            }, 300);
        });
    }

    // 2. EFECTO DINÁMICO 3D EN CADA CUADRADO INDIVIDUAL
    const detailCards = document.querySelectorAll('.detail-card');

    detailCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
});