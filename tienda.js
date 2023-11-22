document.addEventListener("DOMContentLoaded", function () {
  const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const comprarBtn = document.getElementById("comprar-btn");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn");
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close");
  const submitPurchaseBtn = document.getElementById("submit-purchase");

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

 comprarBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  submitPurchaseBtn.addEventListener("click", function () {
    const cuotas = document.getElementById("cuotas").value;
    const emailInput = document.getElementById("email");
    const direccionInput = document.getElementById("direccion");

    let email = "";
    let direccion = "";

    if (emailInput && emailInput.value.trim() !== "") {
      email = emailInput.value.trim();
    }

    if (direccionInput && direccionInput.value.trim() !== "") {
      direccion = direccionInput.value.trim();
    }

    if (cuotas === "no") {
      const precioTotalSinInteres = carrito.reduce((total, item) => total + item.precio, 0);
      const precioTotalConInteres = precioTotalSinInteres * (1 + obtenerInteres(cuotas));

      Toastify({
        text: `Compra realizada. ¡Gracias!\nCorreo electrónico: ${email}\nDirección: ${direccion}\nPrecio total: $${precioTotalConInteres.toFixed(2)}`,
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

  let carrito = [];

  function actualizarCarrito() {
    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.nombre} - $${item.precio}</span>
        <button class="eliminar-item" data-index="${index}">Eliminar</button>
      `;
      cartItems.appendChild(li);
      total += item.precio;
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    const eliminarButtons = document.querySelectorAll(".eliminar-item");
    eliminarButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        carrito.splice(index, 1);
        actualizarCarrito();
      });
    });

    cartTotal.textContent = total;
  }

  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }

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
        return 0.00;
      case 2:
        return 0.10;
      case 3:
        return 0.15;
      default:
        return 0.00;
    }
  }

  vaciarCarritoBtn.addEventListener("click", function () {
    carrito = [];
    actualizarCarrito();
  });

  const contactFloater = document.getElementById("contact-floater");
  const contactForm = document.getElementById("contact-form");

  contactFloater.addEventListener("click", function () {
    contactForm.style.display = contactForm.style.display === "none" ? "block" : "none";
  });

  document.getElementById("full-contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    Toastify({
      text: "¡Mensaje enviado con éxito!",
      backgroundColor: "green",
    }).showToast();

    this.reset();
    contactForm.style.display = "none";
  });

  const ordenarBtn = document.getElementById("ordenar-btn");

  ordenarBtn.addEventListener("click", function () {
    const ordenarPor = document.getElementById("ordenar-productos").value;

    const productCardsContainer = document.querySelector(".product-cards");
    const productCards = Array.from(productCardsContainer.getElementsByClassName("product-card"));

    let sortedProductCards;
    switch (ordenarPor) {
      case "alfabeticamente":
        sortedProductCards = productCards.sort((a, b) => {
          const nombreA = a.getAttribute("data-nombre").toLowerCase();
          const nombreB = b.getAttribute("data-nombre").toLowerCase();
          return nombreA.localeCompare(nombreB);
        });
        break;
      case "precio-ascendente":
        sortedProductCards = productCards.sort((a, b) => {
          const precioA = parseInt(a.getAttribute("data-precio"));
          const precioB = parseInt(b.getAttribute("data-precio"));
          return precioA - precioB;
        });
        break;
      case "precio-descendente":
        sortedProductCards = productCards.sort((a, b) => {
          const precioA = parseInt(a.getAttribute("data-precio"));
          const precioB = parseInt(b.getAttribute("data-precio"));
          return precioB - precioA;
        });
        break;
      default:
        sortedProductCards = productCards.sort((a, b) => {
          const nombreA = a.getAttribute("data-nombre").toLowerCase();
          const nombreB = b.getAttribute("data-nombre").toLowerCase();
          return nombreA.localeCompare(nombreB);
        });
    }

    productCardsContainer.innerHTML = "";

    sortedProductCards.forEach((card) => {
      productCardsContainer.appendChild(card);
    });
  });

  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");

  searchBtn.addEventListener("click", function () {
    buscarProductos();
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      buscarProductos();
    }
  });

  function buscarProductos() {
    fetch('../productos.json')
      .then(response => response.json())
      .then(data => {
        const searchTerm = searchInput.value.toLowerCase();
        const productCardsContainer = document.querySelector(".product-cards");
        const productCards = Array.from(productCardsContainer.getElementsByClassName("product-card"));

        productCards.forEach((card) => {
          const nombreProducto = card.getAttribute("data-nombre").toLowerCase();
          const deberiaMostrarse = nombreProducto.includes(searchTerm);

          if (deberiaMostrarse) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
});
