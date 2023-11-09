document.addEventListener("DOMContentLoaded", function () {
  const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const comprarBtn = document.getElementById("comprar-btn");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn");

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

  // Maneja clic en el botón "Comprar"
comprarBtn.addEventListener("click", function () {
  const cuotas = prompt("¿Desea pagar en cuotas? (si/No)");

  if (cuotas === "si" || cuotas === "si") {
    const cantidadCuotas = parseInt(prompt("Elija la cantidad de cuotas (1, 2, o 3):"));

    if ([1, 2, 3].includes(cantidadCuotas)) {
      // Definir el interés según la cantidad de cuotas
      let interes;
      switch (cantidadCuotas) {
        case 1:
          interes = 0.00; // 0%
          break;
        case 2:
          interes = 0.10; // 10%
          break;
        case 3:
          interes = 0.15; // 15%
          break;
      }

      let email = "";
      while (!isValidEmail(email)) {
        email = prompt("Por favor, ingrese su correo electrónico:");
        if (!isValidEmail(email)) {
          alert("Por favor, ingrese un correo electrónico válido.");
        }
      }

      const direccion = prompt("Por favor, ingrese su dirección de envío y codigo postal:");

      if (email && direccion) {
        // Calcula el precio total con interés
        const precioTotalConInteres = carrito.reduce((total, item) => total + item.precio, 0) * (1 + interes);

        // Calcula el precio de cada cuota
        const precioCuota = precioTotalConInteres / cantidadCuotas;

        // Aquí se muestra un resumen de la compra, incluyendo la cantidad de cuotas y el interés
        const confirmacion = `Compra realizada. ¡Gracias!\nCorreo electrónico: ${email}\nDirección de envío: ${direccion}\nCantidad de cuotas: ${cantidadCuotas}\nInterés: ${interes * 100}%\nPrecio total: $${precioTotalConInteres.toFixed(2)}\nPrecio de cada cuota: $${precioCuota.toFixed(2)}`;
        alert(confirmacion);

        carrito = []; // Vaciar el carrito
        actualizarCarrito();
      } else {
        alert("Debes proporcionar una dirección de correo electrónico y una dirección de envío válidas.");
      }
    } else {
      alert("La cantidad de cuotas debe ser 1, 2, o 3.");
    }
  } else {
    alert("Compra realizada. ¡Gracias!");
  }
});

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}


  // Manejar clic en el botón "Vaciar Carrito"
  vaciarCarritoBtn.addEventListener("click", function () {
    carrito = []; // Vaciar el carrito
    actualizarCarrito();
  });
});
document.addEventListener("DOMContentLoaded", function() {
const productList = document.getElementById("product-list");
const categoriasProductos = ["Buzos", "Camisetas", "Accesorios", "Bolsos"];
const listaProductos = document.getElementById("product-list");
categoriasProductos.forEach(categoria => {
  const enlace = document.createElement("a");
  enlace.textContent = categoria;
  enlace.href = categoria.toLowerCase() + ".html";
  const itemLista = document.createElement("li");
  itemLista.appendChild(enlace);
  listaProductos.appendChild(itemLista);
});

  const swiper = new Swiper('.swiper', {
      direction: 'vertical',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
});
document.addEventListener("DOMContentLoaded", function() {
  const modoBtn = document.getElementById("modo-btn");
  const body = document.body;

  modoBtn.addEventListener("click", function() {
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

// Manejar envío del formulario
document.getElementById("full-contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  alert("¡Mensaje enviado con éxito!");

  // Limpiar el formulario y ocultarlo
  this.reset();
  contactForm.style.display = "none";
});
