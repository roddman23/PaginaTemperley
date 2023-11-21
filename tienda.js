document.addEventListener("DOMContentLoaded", function () {
  const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const comprarBtn = document.getElementById("comprar-btn");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn");
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close");
  const submitPurchaseBtn = document.getElementById("submit-purchase");

  comprarBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  submitPurchaseBtn.addEventListener("click", function () {
    const cuotas = document.getElementById("cuotas").value;

    let email = "";  // Mover la declaración de email aquí

    if (cuotas !== "no") {
      email = document.getElementById("email").value;
    }

    if (cuotas === "no") {
      const precioTotalSinInteres = carrito.reduce((total, item) => total + item.precio, 0);
      const precioTotalConInteres = precioTotalSinInteres * (1 + obtenerInteres(cuotas));

      Toastify({
        text: `Compra realizada. ¡Gracias!\nCorreo electrónico: ${email}\nPrecio total: $${precioTotalConInteres.toFixed(2)}`,
        backgroundColor: "green",
      }).showToast();
    } else {
      const direccion = document.getElementById("direccion").value;
      const cantidadCuotas = parseInt(cuotas);

      const precioTotalSinInteres = carrito.reduce((total, item) => total + item.precio, 0);
      const interes = obtenerInteres(cuotas);
      const precioTotalConInteres = precioTotalSinInteres * (1 + interes);
      const precioCuota = precioTotalConInteres / cantidadCuotas;

      Toastify({
        text: `Compra realizada. ¡Gracias!\nCorreo electrónico: ${email}\nDirección de envío: ${direccion}\nCantidad de cuotas: ${cuotas}\nInterés: ${interes * 100}%\nPrecio total: $${precioTotalConInteres.toFixed(2)}\nPrecio de cada cuota: $${precioCuota.toFixed(2)}`,
        backgroundColor: "green",
      }).showToast();

      carrito = [];
      actualizarCarrito();
      modal.style.display = "none";
    }
  });

  let carrito = []; // Array para almacenar los elementos del carrito

  // Función para actualizar el carrito y el total
  function actualizarCarrito() {
    cartItems.innerHTML = "";
    let total = 0;
    carrito.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = `${item.nombre} - $${item.precio}`;
      cartItems.appendChild(li);
      total += item.precio;
    });
    cartTotal.textContent = total;

    // Guardar el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Cargar el carrito desde localStorage al cargar la página
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }

  // Maneja clics en los botones "Agregar al carrito"
  agregarCarritoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.parentElement;
      const nombre = card.getAttribute("data-nombre");
      const precio = parseInt(card.getAttribute("data-precio"));

      carrito.push({ nombre, precio });
      actualizarCarrito();
    });
  });

  function obtenerInteres(cuotas) {
    switch (parseInt(cuotas)) {
      case 1:
        return 0.00; // 0%
      case 2:
        return 0.10; // 10%
      case 3:
        return 0.15; // 15%
      default:
        return 0.00;
    }
  }

  // Manejar clic en el botón "Vaciar Carrito"
  vaciarCarritoBtn.addEventListener("click", function () {
    carrito = []; // Vaciar el carrito
    actualizarCarrito();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const categoriasProductos = ["Buzos", "Camisetas", "Accesorios", "Bolsos"];
  const listaProductos = document.getElementById("product-list");
  categoriasProductos.forEach((categoria) => {
    const enlace = document.createElement("a");
    enlace.textContent = categoria;
    enlace.href = categoria.toLowerCase() + ".html";
    const itemLista = document.createElement("li");
    itemLista.appendChild(enlace);
    listaProductos.appendChild(itemLista);
  });

  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modoBtn = document.getElementById("modo-btn");
  const body = document.body;

  modoBtn.addEventListener("click", function () {
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    }
  });
});

const contactFloater = document.getElementById("contact-floater");
const contactForm = document.getElementById("contact-form");

// Manejar clic en el ícono de la bolita flotante
contactFloater.addEventListener("click", function () {
  contactForm.style.display = contactForm.style.display === "none" ? "block" : "none";
});

document.getElementById("full-contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  Toastify({
    text: "¡Mensaje enviado con éxito!",
    backgroundColor: "green",
  }).showToast();

  // Limpiar el formulario y ocultarlo
  this.reset();
  contactForm.style.display = "none";
});
document.addEventListener("DOMContentLoaded", function () {
  const busquedaInput = document.getElementById("busqueda-productos");
  const resultadosBusqueda = document.getElementById("resultados-busqueda");
  const productosContainer = document.querySelector(".productos-container");

  // Manejar cambios en el input de búsqueda
  busquedaInput.addEventListener("input", function () {
    const busqueda = busquedaInput.value.toLowerCase();
    const resultados = [];

    // Filtrar productos que coincidan con la búsqueda
    productos.forEach((producto) => {
      if (producto.nombre.toLowerCase().includes(busqueda)) {
        resultados.push(producto);
      }
    });

    // Mostrar resultados en el contenedor
    mostrarResultados(resultados);
  });

  function mostrarResultados(resultados) {
    // Limpiar resultados anteriores
    resultadosBusqueda.innerHTML = "";

    // Mostrar cada resultado
    resultados.forEach((producto) => {
      const divResultado = document.createElement("div");
      divResultado.classList.add("resultado-item");

      // Crear imagen del producto
      const imagenProducto = document.createElement("img");
      imagenProducto.src = `url_de_la_imagen/${producto.nombre.replace(/\s+/g, '-')}.jpg`;
      imagenProducto.alt = producto.nombre;
      divResultado.appendChild(imagenProducto);

      // Crear nombre y precio del producto
      const nombreProducto = document.createElement("p");
      nombreProducto.textContent = producto.nombre;
      divResultado.appendChild(nombreProducto);

      const precioProducto = document.createElement("p");
      precioProducto.textContent = `$${producto.precio.toFixed(2)}`;
      divResultado.appendChild(precioProducto);

      // Crear botón para agregar al carrito
      const agregarCarritoBtn = document.createElement("button");
      agregarCarritoBtn.textContent = "Agregar al carrito";
      agregarCarritoBtn.addEventListener("click", function () {
        carrito.push({ nombre: producto.nombre, precio: producto.precio });
        actualizarCarrito();
      });
      divResultado.appendChild(agregarCarritoBtn);

      // Agregar el resultado al contenedor
      resultadosBusqueda.appendChild(divResultado);
    });
  }
});
