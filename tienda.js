document.addEventListener("DOMContentLoaded", function() {
    const imagenesProducto = document.getElementById("product-images");
    const selectCuotas = document.getElementById("installments");
    const elementoResultado = document.getElementById("result");
    const productos = [
        { nombre: "Camiseta", precio: 18600, categoria: "Camisetas" },
        { nombre: "Bolso", precio: 5600, categoria: "Accesorios" },
    ];

    // Saludo de bienvenida
    alert("Bienvenidos a la tienda oficial del Club Atlético Temperley");

    window.onload = function() {
        const comprarBtn = document.getElementById("comprarBoton");

        comprarBtn.addEventListener("click", function() {
            // Alerta con categorías disponibles
            const categorías = [...new Set(productos.map(producto => producto.categoria))];
            alert("Categorías disponibles: " + categorías.join(", "));

            let productoElegido;
            let productoSeleccionado;

            do {
                const opcionesProductos = productos.map(producto => producto.nombre);
                productoElegido = prompt("Productos disponibles (seleccione uno):\n" + opcionesProductos.join("\n"));

                if (productoElegido === null) {
                    // El usuario canceló el prompt
                    alert("Operación cancelada.");
                    return;
                }

                // Buscar el producto seleccionado por el usuario
                productoSeleccionado = productos.find(producto => 
                    producto.nombre.toLowerCase().includes(productoElegido.toLowerCase())
                );

                if (!productoSeleccionado) {
                    alert("Producto no encontrado o inválido. Intente nuevamente.");
                }
            } while (!productoSeleccionado);

            // Mostrar detalles del producto y confirmar o cancelar la compra
            const cuotas = ["1 cuota (sin interés)", "2 cuotas (interés 10%)", "3 cuotas (interés 15%)"];
            const cuotasElegidas = parseInt(prompt(`Producto seleccionado: ${productoSeleccionado.nombre}\nPrecio: $${productoSeleccionado.precio}\nDescripción: ${productoSeleccionado.nombre} Temperley\n\nElija la cantidad de cuotas:\n1. 1 cuota (sin interés)\n2. 2 cuotas (interés 10%)\n3. 3 cuotas (interés 15%)`));

            if (cuotasElegidas < 1 || cuotasElegidas > 3) {
                alert("Opción de cuotas inválida. Operación cancelada.");
            } else {
                const cuotasTexto = cuotas[cuotasElegidas - 1];
                const confirmarCompra = confirm(`Detalles de la compra:\n\nProducto: ${productoSeleccionado.nombre}\nPrecio inicial: $${productoSeleccionado.precio}\nDescripción: ${productoSeleccionado.nombre} Temperley\nCantidad de Cuotas: ${cuotasTexto}\nPrecio final: $${calcularPrecioFinal(productoSeleccionado.precio, cuotasElegidas)}\n\n¿Desea confirmar la compra?`);

                if (confirmarCompra) {
                    // Lógica para completar la compra

                    // Supuesta fecha de entrega
                    const fechaEntrega = new Date();
                    fechaEntrega.setDate(fechaEntrega.getDate() + 7); // Suponemos entrega en 7 días

                    const dia = fechaEntrega.getDate();
                    const mes = fechaEntrega.getMonth() + 1;
                    const año = fechaEntrega.getFullYear();

                    // Mostrar agradecimiento con fecha de entrega en formato numérico
                    alert(`¡Compra completada! Gracias por su compra. La fecha estimada de entrega es: ${dia}/${mes}/${año}`);
                } else {
                    alert("Compra cancelada.");
                }
            }
        });
    }

    function calcularPrecioFinal(precioInicial, cuotas) {
        let tasaInteres = 0;
        if (cuotas === 2) {
            tasaInteres = 10;
        } else if (cuotas === 3) {
            tasaInteres = 15;
        }
        
        if (cuotas === 1) {
            return precioInicial;
        } else {
            return precioInicial + (precioInicial * tasaInteres / 100);
        }
    }

    function calcularIntereses() {
        const tipoProducto = imagenesProducto.querySelector(".activo").getAttribute("data-producto");
        const precioProducto = parseFloat(imagenesProducto.querySelector(".activo").getAttribute("data-precio"));
        const cuotas = parseInt(selectCuotas.value);

        let tasaInteres = 0;

        if (cuotas === 2) {
            tasaInteres = 10;
        } else if (cuotas === 3) {
            tasaInteres = 15;
        }

        if (cuotas === 1) {
            // No hay intereses para 1 cuota y si lo hay en 2 y 3 cuotas
            elementoResultado.innerHTML = `Intereses para el ${tipoProducto} en ${cuotas} cuotas: $0.00<br>Precio final: $${precioProducto.toFixed(2)}`;
        } else {
            const interestAmount = (precioProducto * (tasaInteres / 100));
            const finalPrice = precioProducto + interestAmount;
            elementoResultado.innerHTML = `Intereses para el ${tipoProducto} en ${cuotas} cuotas: $${interestAmount.toFixed(2)}<br>Precio final: $${finalPrice.toFixed(2)}`;
        }
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
