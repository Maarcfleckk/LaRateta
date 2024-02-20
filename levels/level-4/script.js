document.addEventListener("DOMContentLoaded", function () {
  const laberinto = document.getElementById("maze");
  const columnas = 11;
  const filas = 8;
  let jugadorPosicion = 0;
  const metaPosicion = filas * columnas - 1;

  function crearCelda() {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    return celda;
  }

  function actualizarJugador() {
    celdas.forEach((celda) => celda.classList.remove("jugador"));
    celdas[jugadorPosicion].classList.add("jugador");
  }

  function crearParedesAleatorias() {
    const totalCeldas = filas * columnas;
    const cantidadParedes = Math.floor(totalCeldas * 0.2);

    for (let i = 0; i < cantidadParedes; i++) {
      const indiceAleatorio = Math.floor(Math.random() * totalCeldas);
      const celda = celdas[indiceAleatorio];
      if (
        !celda.classList.contains("meta") &&
        !celda.classList.contains("jugador") &&
        !celda.classList.contains("pared")
      ) {
        celda.classList.add("pared");
      }
      protegirJugador();
      protegirMeta();
    }
  }

  function protegirJugador() {
    celdas[1].classList.remove("pared");
    celdas[1].classList.add("celda");
    celdas[11].classList.remove("pared");
    celdas[11].classList.add("celda");
    celdas[12].classList.remove("pared");
    celdas[12].classList.add("celda");
  }

  function protegirMeta() {
    celdas[75].classList.remove("pared");
    celdas[75].classList.add("celda");
    celdas[76].classList.remove("pared");
    celdas[76].classList.add("celda");
    celdas[86].classList.remove("pared");
    celdas[86].classList.add("celda");
  }

  function verificarMetaAlcanzada() {
    if (jugadorPosicion === metaPosicion) {
      showWinMessage();
    }
  }

  function moverJugador(event) {
    let nuevaPosicion = jugadorPosicion;
    switch (event.key) {
      case "ArrowUp":
        nuevaPosicion = jugadorPosicion - columnas;
        break;
      case "ArrowDown":
        nuevaPosicion = jugadorPosicion + columnas;
        break;
      case "ArrowLeft":
        nuevaPosicion =
          jugadorPosicion % columnas !== 0
            ? jugadorPosicion - 1
            : jugadorPosicion;
        break;
      case "ArrowRight":
        nuevaPosicion =
          (jugadorPosicion + 1) % columnas !== 0
            ? jugadorPosicion + 1
            : jugadorPosicion;
        break;
    }

    if (!celdas[nuevaPosicion].classList.contains("pared")) {
      jugadorPosicion = nuevaPosicion;
      actualizarJugador();
      verificarMetaAlcanzada();
    }
  }

  function showWinMessage() {
    const winMessage = document.getElementById("win-message");
    winMessage.style.display = "block";
  }

  // Crear el laberinto
  for (let i = 0; i < filas * columnas; i++) {
    const celda = crearCelda();
    laberinto.appendChild(celda);
  }

  const celdas = document.querySelectorAll(".celda");
  celdas[metaPosicion].classList.add("meta");
  actualizarJugador();
  crearParedesAleatorias();
  document.addEventListener("keydown", moverJugador);
});

function refreshPage() {
  location.reload();
}
