
function reloadPage() {
  // Lógica para recargar la página
  location.reload();
}
function randomizeCharacters() {
  const characterNumber = Math.floor(Math.random() * 3);
  let  rightCharacter = "";
  if (characterNumber === 0) {
    rightCharacter = "burra";
  } else if (characterNumber === 1) {
    rightCharacter = "perrito";
  } else {
    rightCharacter = "rata";
  }
  return characterNumber
}
function playSound(characterNumber) {
  let audio = new Audio("");
  if (characterNumber == 0) {
    audio = new Audio("../../audio/burro.mp3");
  } else if (characterNumber == 1) {
    audio = new Audio("../../audio/Gos.mp3");
  } else if (characterNumber == 2){
    audio = new Audio("../../audio/rateta.mp3");
  }
  audio.play();
}
function check(rightCharacter) {
  // Lógica para checkear
  var selectedCharacter = document.querySelector(".vibrate.active");
  if (selectedCharacter && selectedCharacter.dataset.character === rightCharacter) {
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

function showWinMessage() {
  document.getElementById("win-message").style.display = "block";
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