
//BOTON PARA VOLVER HACIA ARRIBA

const btnArriba = document.getElementById("btnArriba");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        btnArriba.classList.add("mostrar");
    } else {
        btnArriba.classList.remove("mostrar");
    }

});

btnArriba.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});