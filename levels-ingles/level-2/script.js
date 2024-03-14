function reloadPage() {
  // Lógica para recargar la página
  location.reload();
}
let currentCharacter = "";

function randomizeCharacters() {
  const characterNumber = Math.floor(Math.random() * 3);
  if (characterNumber === 0) {
    currentCharacter = "rata";
  } else if (characterNumber === 1) {
    currentCharacter = "burra";
  } else {
    currentCharacter = "perrito";
  }
  return currentCharacter;
}

function playSound() {
  let audio = new Audio("");
  if (currentCharacter === "rata") {
    audio = new Audio("../../audio/rateta-ingles.wav");
  } else if (currentCharacter === "burra") {
    audio = new Audio("../../audio/burro-ingles.wav");
  } else {
    audio = new Audio("../../audio/gos-ingles.wav");
  }
  audio.play();
}

function check() {
  var selectedCharacter = document.querySelector(".vibrate.active");
  if (
    selectedCharacter &&
    selectedCharacter.dataset.character === currentCharacter
  ) {
    showWinMessage();
  } else {
    showErrorMessage();
  }
}

function selectCharacter(character) {
  var elements = document.querySelectorAll(".vibrate");
  elements.forEach(function (element) {
    element.classList.remove("active");
  });

  var selectedElement = document.querySelector(
    '.vibrate[data-character="' + character + '"]',
  );
  if (selectedElement) {
    selectedElement.classList.add("active");
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
const audioError = new Audio("../../audio/audio-error.mp3");
const audioPass = new Audio("../../audio/audio-check.mp3");
function showErrorMessage() {
  audioError.play();
  document.getElementById("error-message").style.display = "block";
}

function closeErrorMessage() {
  document.getElementById("error-message").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  randomizeCharacters();
});

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
     LEVEL 2 <br>
     <br> 1- TO GO BACK. <br>
     2- TO HEAR THE NAME OF THE CORRECT CHARACTER.<br>
     3- TO RECHARGE THE NAME OF THE CORRECT CHARACTER. <br>
     4- CHOOSE THE CHARACTER REFERRED TO BY THE SOUND PLAYED. <br>
     5- TO CHECK THE ANSWER. <br>
     <strong>AIM OF THE GAME:</strong>CLICK THE CORRECT CHARACTER ACCORDING TO THE SOUND PLAYED. <br>
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