const API = "https://www.thecocktaildb.com/api/json/v1/1/";
const contenedorCategorias = document.getElementById("categorias");
const contenedorCocteles = document.getElementById("cocteles");
const contenedorFavoritos = document.getElementById("favoritos");

limpiarFavoritosInvalidos();
mostrarFavoritos();

document.addEventListener("DOMContentLoaded", () => {
  obtenerCategorias();
  mostrarFavoritos();
});

function obtenerCategorias() {
  fetch(API + "list.php?c=list")
    .then(respuesta => respuesta.json())
    .then(data => {
      contenedorCategorias.innerHTML = "";
      data.drinks.forEach(categoria => {
        const boton = document.createElement("button");
        boton.textContent = categoria.strCategory;
        boton.onclick = () => obtenerCoctelesPorCategoria(categoria.strCategory);
        contenedorCategorias.appendChild(boton);
      });
    });
}

function buscarCoctel() {
  const consulta = document.getElementById("searchInput").value;
  fetch(API + "search.php?s=" + consulta)
    .then(respuesta => respuesta.json())
    .then(data => mostrarCocteles(data.drinks));
}

function cargarCoctelAleatorio() {
  fetch(API + "random.php")
    .then(respuesta => respuesta.json())
    .then(data => mostrarCocteles(data.drinks));
}

function obtenerCoctelesPorCategoria(categoria) {
  fetch(API + "filter.php?c=" + encodeURIComponent(categoria))
    .then(respuesta => respuesta.json())
    .then(data => mostrarCocteles(data.drinks));
}

function mostrarCocteles(lista) {
  contenedorCocteles.innerHTML = "";
  if (!lista) {
    contenedorCocteles.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  lista.forEach(coctel => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card";
    tarjeta.innerHTML = `
      <img src="${coctel.strDrinkThumb}" alt="${coctel.strDrink}">
      <h3>${coctel.strDrink}</h3>
      <button onclick="verDetallesCoctel(${coctel.idDrink})">Ver más</button>
      <button onclick="agregarAFavoritos(${coctel.idDrink})">⭐</button>
    `;
    contenedorCocteles.appendChild(tarjeta);
  });
}

function verDetallesCoctel(id) {
  fetch(API + "lookup.php?i=" + id)
    .then(respuesta => respuesta.json())
    .then(data => {
      const coctel = data.drinks[0];
      alert(`🍸 ${coctel.strDrink}\n\n${coctel.strInstructions}`);
    });
}

function agregarAFavoritos(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  id = String(id);
  if (!favoritos.includes(id)) {
    favoritos.push(id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
  }
}

function mostrarFavoritos() {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  contenedorFavoritos.innerHTML = "";

  favoritos.forEach(id => {
    if (!id) return;

    fetch(API + "lookup.php?i=" + id)
      .then(respuesta => respuesta.json())
      .then(data => {
        if (!data.drinks || !data.drinks[0]) return;

        const coctel = data.drinks[0];
        const tarjeta = crearTarjetaCoctel(coctel, true);
        contenedorFavoritos.appendChild(tarjeta);

        const botonQuitar = tarjeta.querySelector('.quitar-favorito');
        if (botonQuitar) {
          botonQuitar.addEventListener('click', () => {
            quitarDeFavoritos(String(coctel.idDrink));
          });
        }
      })
      .catch(error => console.error("Error al cargar cóctel:", error));
  });
}

function crearTarjetaCoctel(coctel, esFavorito = false) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card");

  tarjeta.innerHTML = `
    <img src="${coctel.strDrinkThumb}" alt="${coctel.strDrink}">
    <h3>${coctel.strDrink}</h3>
    ${esFavorito ? `<button class="quitar-favorito" data-id="${coctel.idDrink}">Quitar</button>` : ""}
  `;

  return tarjeta;
}

function quitarDeFavoritos(id) {
  id = String(id);
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(fav => fav !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarFavoritos();
}

function limpiarFavoritosInvalidos() {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos
    .filter(f => typeof f === "string" || typeof f === "number")
    .map(f => String(f))
    .filter(f => f.trim() !== "");
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}