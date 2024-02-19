function playSound() {
  // Lógica para reproducir sonido
  alert("Reproducir sonido");
}

function reloadPage() {
  // Lógica para recargar la página
  location.reload();
}

function check() {
  // Lógica para checkear
  var selectedCharacter = document.querySelector(".vibrate.active");
  if (selectedCharacter && selectedCharacter.dataset.character === "burra") {
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
