
// EXPLICACION FUTURA
// AÑADIR CLASE DE MURO
// AÑADIR SPRINTS PARA EL JUGADOR, PARED I CELDA
// NO ALERTAS
document.addEventListener("DOMContentLoaded", function() {
  const laberinto = document.getElementById("maze");

  // Define el tamaño del laberinto (en este caso, 5x5)
  const columnas = 10;
  const filas = 8;

  // Crea el laberinto
  for (let i = 0; i < filas * columnas; i++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    laberinto.appendChild(celda);
  }

  

  const celdas = document.querySelectorAll(".celda");
  let jugadorPosicion = 0; // Inicializa al jugador en la esquina superior izquierda

  // Establece la posición de la meta (esquina inferior derecha)
  const metaPosicion = filas * columnas - 1;
  celdas[metaPosicion].classList.add("meta");

  // Muestra al jugador en la posición inicial
  actualizarJugador();

  function actualizarJugador() {
    // Limpia la posición anterior del jugador
    celdas.forEach(celda => celda.classList.remove("jugador"));

    // Muestra al jugador en su nueva posición
    celdas[jugadorPosicion].classList.add("jugador");
  }

// Añade la clase 'vacio' a las celdas 10, 11 y 12
celdas[10].classList.add("pared");
celdas[11].classList.add("pared");
celdas[12].classList.add("pared");

// Modifica la función de manejo de eventos del teclado
document.addEventListener("keydown", function(event) {
  let nuevaPosicion = jugadorPosicion;
  switch (event.key) {
    case "ArrowUp":
      if (jugadorPosicion - columnas >= 0) {
        nuevaPosicion = jugadorPosicion - columnas;
      }
      break;
    case "ArrowDown":
      if (jugadorPosicion + columnas < filas * columnas) {
        nuevaPosicion = jugadorPosicion + columnas;
      }
      break;
    case "ArrowLeft":
      if (jugadorPosicion % columnas !== 0) {
        nuevaPosicion = jugadorPosicion - 1;
      }
      break;
    case "ArrowRight":
      if ((jugadorPosicion + 1) % columnas !== 0) {
        nuevaPosicion = jugadorPosicion + 1;
      }
      break;
  }

  // Solo actualiza la posición del jugador si la celda no tiene la clase 'vacio'
  if (!celdas[nuevaPosicion].classList.contains("pared")) {
    jugadorPosicion = nuevaPosicion;
    actualizarJugador();
  }

  // Verifica si el jugador ha alcanzado la meta
  if (jugadorPosicion === metaPosicion) {
    alert("¡Felicidades! Has llegado a la meta.");
  }
});});