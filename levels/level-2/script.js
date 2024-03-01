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
    audio = new Audio("../../audio/rateta.mp3");
  } else if (currentCharacter === "burra") {
    audio = new Audio("../../audio/burro.mp3");
  } else {
    audio = new Audio("../../audio/gos.mp3");
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
    '.vibrate[data-character="' + character + '"]'
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
    scoreElement.textContent = "Puntos: " + score;
  }
  localStorage.setItem("score", score);
}

// Resto del código específico de la página

// Al final de tu script, llama a updateScore para asegurarte de que el marcador se actualice
updateScore();
function showWinMessage() {
  const winMessage = document.getElementById("win-message");
  winMessage.style.display = "block";
  score += 10; // Incrementa la puntuación en 10 puntos cuando el jugador gana
  updateScore(); // Actualiza la puntuación en la página
}

function showErrorMessage() {
  document.getElementById("error-message").style.display = "block";
}

function closeErrorMessage() {
  document.getElementById("error-message").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  randomizeCharacters();
});
