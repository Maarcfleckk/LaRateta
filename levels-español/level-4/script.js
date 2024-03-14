document.addEventListener("DOMContentLoaded", function () {
  const audioError = new Audio("../../audio/audio-error.mp3");
  const audioPass = new Audio("../../audio/audio-check.mp3");
  const laberinto = document.getElementById("maze");
  const columnas = 11;
  const filas = 8;
  let jugadorPosicion = Math.floor(Math.random() * (filas * columnas));
  const metaPosicion = Math.floor(Math.random() * (filas * columnas));

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
    } else if (celdas[nuevaPosicion].classList.contains("pared")) {
      refreshPage();
    }
  }
  let score = localStorage.getItem("score")
    ? parseInt(localStorage.getItem("score"))
    : 0;

  function updateScore() {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
      scoreElement.textContent = score;
    }
    localStorage.setItem("score", score);
  }

  // Resto del código específico de la página

  // Al final de tu script, llama a updateScore para asegurarte de que el marcador se actualice
  updateScore();
  function showWinMessage() {
    audioPass.play();
    const winMessage = document.getElementById("win-message");
    winMessage.style.display = "block";
    score += 10; // Incrementa la puntuación en 10 puntos cuando el jugador gana
    updateScore(); // Actualiza la puntuación en la página
  }

  function goTop() {
    const nuevaPosicion = jugadorPosicion - columnas;
    moverJugadorEnDireccion(nuevaPosicion);
  }

  function goLeft() {
    const nuevaPosicion =
      jugadorPosicion % columnas !== 0 ? jugadorPosicion - 1 : jugadorPosicion;
    moverJugadorEnDireccion(nuevaPosicion);
  }

  function goBot() {
    const nuevaPosicion = jugadorPosicion + columnas;
    moverJugadorEnDireccion(nuevaPosicion);
  }

  function goRight() {
    const nuevaPosicion =
      (jugadorPosicion + 1) % columnas !== 0
        ? jugadorPosicion + 1
        : jugadorPosicion;
    moverJugadorEnDireccion(nuevaPosicion);
  }

  function moverJugadorEnDireccion(nuevaPosicion) {
    if (!celdas[nuevaPosicion].classList.contains("pared")) {
      jugadorPosicion = nuevaPosicion;
      actualizarJugador();
      verificarMetaAlcanzada();
    }
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
  document.getElementById("up").addEventListener("click", goTop);
  document.getElementById("left").addEventListener("click", goLeft);
  document.getElementById("down").addEventListener("click", goBot);
  document.getElementById("right").addEventListener("click", goRight);
});

function refreshPage() {

  location.reload();
}


function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "flex";
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
  stopAudio();
}

window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
};
// Array de textos correspondientes a cada imagen
var textos = [

 `<p>
     NIVEL 4 <br>
     <br> 1- PARA VOLVER ATRÁS. <br>
     2- PARA MOVER LA RATILLA.<br>
     3- PARA VOLVER A EMPEZAR. <br>
     4- EL PERSONAJE QUE CONTROLAMOS. <br>
     5- EL OBJETIVO DONDE DEBEMOS LLEVAR LA RATILLA. <br>
     <strong>FINALIDAD</strong>: LLEVAR LA RATILLA AL OBJETIVO. <br>
     </p>`
];

// Función para mostrar el texto correspondiente a la imagen actual
function mostrarTextoActual() {
  var indiceActual = getIndiceActual();
  document.getElementById("textoDebajo").innerHTML = textos[indiceActual];
}

// Función para cambiar a la diapositiva anterior
function prevSlide() {
  var slides = document.getElementsByClassName("carousel-slide");
  var indiceActual = getIndiceActual();
  slides[indiceActual].style.display = "none";
  indiceActual = (indiceActual - 1 + slides.length) % slides.length;
  slides[indiceActual].style.display = "block";
  mostrarTextoActual();
}

// Función para cambiar a la siguiente diapositiva
function nextSlide() {
  var slides = document.getElementsByClassName("carousel-slide");
  var indiceActual = getIndiceActual();
  slides[indiceActual].style.display = "none";
  indiceActual = (indiceActual + 1) % slides.length;
  slides[indiceActual].style.display = "block";
  mostrarTextoActual();
}

// Función para obtener el índice de la imagen actual en el carrusel
function getIndiceActual() {
  var slides = document.getElementsByClassName("carousel-slide");
  for (var i = 0; i < slides.length; i++) {
    if (slides[i].style.display === "block") {
      return i;
    }
  }
  return 0;
}

// Inicializar el texto y el carrusel al cargar la página
mostrarTextoActual();