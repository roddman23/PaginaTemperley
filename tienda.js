document.addEventListener("DOMContentLoaded", function() {
    const imagenesProducto = document.getElementById("product-images");
    const selectCuotas = document.getElementById("installments");
    const elementoResultado = document.getElementById("result");

    function calcularIntereses() {
        const opcionSeleccionada = selectCuotas.value;
        const tipoProducto = imagenesProducto.querySelector(".activo").getAttribute("data-producto");
        const precioProducto = parseFloat(imagenesProducto.querySelector(".activo").getAttribute("data-precio"));
        const cuotas = parseInt(opcionSeleccionada);

        let tasaInteres = 0;

        if (cuotas === 2) {
            tasaInteres = 10;
        } else if (cuotas === 3) {
            tasaInteres = 15;
        }

        const montoIntereses = (precioProducto * (tasaInteres / 100));
        const precioFinal = precioProducto + montoIntereses;

        console.log("Producto seleccionado:", tipoProducto);
        console.log("Precio del producto:", precioProducto);
        console.log("Cantidad de cuotas:", cuotas);
        console.log("Intereses calculados:", montoIntereses);
        console.log("Precio final:", precioFinal);

        elementoResultado.innerHTML = `Intereses para el ${tipoProducto} en ${cuotas} cuotas: $${montoIntereses.toFixed(2)}<br>Precio final: $${precioFinal.toFixed(2)}`;
    }

    imagenesProducto.addEventListener("click", function(evento) {
        if (evento.target.tagName === "IMG") {
            const todasLasImagenes = imagenesProducto.querySelectorAll("img");
            todasLasImagenes.forEach(imagen => imagen.classList.remove("activo"));

            evento.target.classList.add("activo");

            calcularIntereses();
        }
    });

    selectCuotas.addEventListener("change", function() {
        calcularIntereses();
    });

    calcularIntereses();
});