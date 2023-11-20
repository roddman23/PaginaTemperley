document.addEventListener("DOMContentLoaded", function () {
  const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const comprarBtn = document.getElementById("comprar-btn");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn");
  const searchInput = document.getElementById("search-input");
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

  // Maneja cambios en el campo de búsqueda
  searchInput.addEventListener("input", function () {
    const term = searchInput.value.toLowerCase();
    const resultados = buscarProductos(productos, term);
    mostrarProductos(resultados);
  });
});

// Función para buscar productos por término
function buscarProductos(productos, term) {
  return productos.filter((producto) => producto.nombre.toLowerCase().includes(term));
}

// Función para mostrar productos en la página
function mostrarProductos(productos) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Limpiar la lista actual

  productos.forEach((producto) => {
    const enlace = document.createElement("a");
    enlace.textContent = producto.nombre;
    enlace.href = producto.categoria.toLowerCase() + ".html";
    const itemLista = document.createElement("li");
    itemLista.appendChild(enlace);
    productList.appendChild(itemLista);
  });
}

  let carrito = []; // Array para almacenar los elementos del carrito
  let productos = [
    { nombre: "Camperon unisex", categoria: "Buzos", precio: 54000, descripcion: "Camperon Temperley 2023" },
    { nombre: "Buzo dama 2023", categoria: "Buzos", precio: 32000, descripcion: "Buzo dama temperley 2023" },
    { nombre: "buzo hombre", categoria: "Buzos", precio: 32000, descripcion: "buzo hombre temperley 2023" },
    { nombre: "Camiseta rosa", categoria: "camisetas", precio: 29800, descripcion: "camiseta rosa unisex" },
    { nombre: "Camiseta niño", categoria: "camisetas", precio: 31000, descripcion: "camiseta niño" },
    { nombre: "Camiseta Adulto", categoria: "Camisetas", precio: 32000, descripcion: "Camisetas adulto temperley" },
    { nombre: "Bolso viajero temperley", categoria: "bolsos", precio: 6500, descripcion: "bolso viajero" },
    { nombre: "mochila temperley", categoria: "bolsos", precio: 6000, descripcion: "mochila temperley" },
    { nombre: "riñoneras", categoria: "bolsos", precio: 12000, descripcion: "riñoneras temperley" },
    { nombre: "Pulsera temperley", categoria: "pulsera", precio: 5000, descripcion: "pulseras temperley" },
    { nombre: "set asado", categoria: "accesorios", precio: 32000, descripcion: "set asado temperley" },
    { nombre: "vaso temperley", categoria: "acceserios", precio: 3800, descripcion: "vaso temperley" },
  ];

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
      const productoIndex = parseInt(card.getAttribute("data-index"));
      const producto = productos[productoIndex];

      carrito.push(producto);
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

        const direccion = prompt("Por favor, ingrese su dirección de envío y código postal:");

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

  // Maneja clic en el botón "Vaciar Carrito"
  vaciarCarritoBtn.addEventListener("click", function () {
    carrito = []; // Vaciar el carrito
    actualizarCarrito();
  });

  // Maneja cambios en el campo de búsqueda
  searchInput.addEventListener("input", function () {
    const term = searchInput.value.toLowerCase();
    mostrarProductos(productos.filter((producto) => producto.nombre.toLowerCase().includes(term)));
  });

  // Función para mostrar los productos en la interfaz
  function mostrarProductos(productosAMostrar) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    productosAMostrar.forEach((producto, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-index", index);

      const nombre = document.createElement("h3");
      nombre.textContent = producto.nombre;

      const categoria = document.createElement("p");
      categoria.textContent = `Categoría: ${producto.categoria}`;

      const precio = document.createElement("p");
      precio.textContent = `Precio: $${producto.precio}`;

      const descripcion = document.createElement("p");
      descripcion.textContent = `Descripción: ${producto.descripcion}`;

      const addButton = document.createElement("button");
      addButton.classList.add("agregar-carrito");
      addButton.textContent = "Agregar al Carrito";

      card.appendChild(nombre);
      card.appendChild(categoria);
      card.appendChild(precio);
      card.appendChild(descripcion);
      card.appendChild(addButton);

      productList.appendChild(card);
    });

    // Maneja clics en los botones "Agregar al carrito"
    const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");
    agregarCarritoButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const card = this.parentElement;
        const productoIndex = parseInt(card.getAttribute("data-index"));
        const producto = productosAMostrar[productoIndex];

        carrito.push(producto);
        actualizarCarrito();
      });
    });
  }


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

// Manejar envío del formulario
document.getElementById("full-contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  alert("¡Mensaje enviado con éxito!");

  // Limpiar el formulario y ocultarlo
  this.reset();
  contactForm.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const categoriasProductos = ["Buzos", "Camisetas", "Accesorios", "Bolsos"];
  const listaProductos = document.getElementById("product-list");
  const searchInput = document.getElementById("search-input");

  categoriasProductos.forEach((categoria) => {
    const enlace = document.createElement("a");
    enlace.textContent = categoria;
    enlace.href = categoria.toLowerCase() + ".html";
    const itemLista = document.createElement("li");
    itemLista.appendChild(enlace);
    listaProductos.appendChild(itemLista);
  });

  // Maneja cambios en el campo de búsqueda
  searchInput.addEventListener("input", function () {
    const term = searchInput.value.toLowerCase();
    mostrarProductos(productos.filter((producto) => producto.nombre.toLowerCase().includes(term)));
  });
});