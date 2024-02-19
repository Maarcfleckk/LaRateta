
// EXPLICACION FUTURA
// AÑADIR CLASE DE MURO
// AÑADIR SPRINTS PARA EL JUGADOR, PARED I CELDA
// NO ALERTAS
document.addEventListener("DOMContentLoaded", function() {
  const laberinto = document.getElementById("maze");

  // Define el tamaño del laberinto (en este caso, 5x5)
  const filas = 5;
  const columnas = 5;

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

  // Maneja los eventos del teclado
  document.addEventListener("keydown", function(event) {
    switch (event.key) {
      case "ArrowUp":
        if (jugadorPosicion - columnas >= 0) {
          jugadorPosicion -= columnas;
        }
        break;
      case "ArrowDown":
        if (jugadorPosicion + columnas < filas * columnas) {
          jugadorPosicion += columnas;
        }
        break;
      case "ArrowLeft":
        if (jugadorPosicion % columnas !== 0) {
          jugadorPosicion -= 1;
        }
        break;
      case "ArrowRight":
        if ((jugadorPosicion + 1) % columnas !== 0) {
          jugadorPosicion += 1;
        }
        break;
    }

    actualizarJugador();

    // Verifica si el jugador ha alcanzado la meta
    if (jugadorPosicion === metaPosicion) {
      alert("¡Felicidades! Has llegado a la meta.");
      
    }
  });
});