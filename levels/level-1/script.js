const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let selectedColor = 5; // Color inicial (blanco)
let isDrawing = false;

const formasRectangulares = [
  {
    x: 360,
    y: 185,
    side: 190,
    angle: 30,
    tipo: "triangulo",
    color: 5,
  },
  {
    x: 250,
    y: 185,
    side: 190,
    angle: 210,
    tipo: "triangulo",
    color: 5,
  },
  {
    x: 240,
    y: 150,
    width: 130,
    height: 70,
    tipo: "cuadrado",
    color: 5,
  },
];

function drawFormasRectangulares() {
  formasRectangulares.forEach((forma) => {
    if (forma.tipo === "triangulo") {
      context.fillStyle = getColorByNumero(forma.color);
      drawTriangle(forma.x, forma.y, forma.side, forma.angle, forma.color);
    } else {
      context.fillStyle = getColorByNumero(forma.color);
      drawSquare(forma.x, forma.y, forma.width, forma.height, forma.color);
    }
  });
}

function drawSquare(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  context.strokeRect(x, y, width, height);
}

function selectColor(color) {
  selectedColor = color;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawFormasRectangulares();
}

function drawTriangle(x, y, side, angle, color) {
  context.save();
  context.translate(x, y);
  context.rotate((angle * Math.PI) / 180);

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(side / 2, -(side * Math.sqrt(3)) / 2);
  context.lineTo(side, 0);
  context.closePath();
  context.fill();
  context.stroke();

  context.restore();

  context.fillStyle = "black";
  context.font = "18px Arial";
  const textWidth = context.measureText("1").width;
  const textX = x - textWidth / 2;
  const textY = y + (side * Math.sqrt(3)) / 2 / 2 + 4; // Ajusta el valor de "+ 4" según tus preferencias
  context.fillText("1", textX, textY);
}

function isPointInsideForma(mouseX, mouseY, forma) {
  if (forma.tipo === "triangulo") {
    const centerX = forma.x;
    const centerY = forma.y - (forma.side * Math.sqrt(3)) / 2 / 2;
    const distance =
      (Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2) * 2) /
      Math.sqrt(3);
    return distance <= forma.side;
  } else {
    return (
      mouseX >= forma.x &&
      mouseX <= forma.x + forma.width &&
      mouseY >= forma.y &&
      mouseY <= forma.y + forma.height
    );
  }
}

function getColorByNumero(numero) {
  switch (numero) {
    case 1:
      return "red";
    case 2:
      return "yellow";
    case 3:
      return "green";
    case 4:
      return "blue";
    case 5:
      return "white";
    case 6:
      return "black";
    case 7:
      return "pink";
    case 8:
      return "orange";
    default:
      return "white";
  }
}

function draw(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  formasRectangulares.forEach((forma, index) => {
    if (isPointInsideForma(mouseX, mouseY, forma)) {
      forma.color = selectedColor;
      clearCanvas();
    }
  });
}

function toggleColorPalette() {
  const colorPalette = document.getElementById("color-palette");
  const currentState = colorPalette.style.display;

  if (currentState === "none" || currentState === "") {
    colorPalette.style.display = "flex";
  } else {
    colorPalette.style.display = "none";
  }
}

function hideColorPalette() {
  const colorPalette = document.getElementById("color-palette");
  colorPalette.style.display = "none";
}

canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", draw);

drawFormasRectangulares();
hideColorPalette();

function refreshPage() {
  location.reload();
}

function checkColors() {
  let forma1PintadaCorrectamente = false;
  let forma2PintadaCorrectamente = false;

  formasRectangulares.forEach((forma) => {
    if (forma.tipo === "triangulo" && forma.color === 1) {
      forma1PintadaCorrectamente = true;
    } else if (forma.tipo === "cuadrado" && forma.color === 1) {
      forma2PintadaCorrectamente = true;
    }
  });

  console.log("Forma 1 pintada correctamente:", forma1PintadaCorrectamente);
  console.log("Forma 2 pintada correctamente:", forma2PintadaCorrectamente);

  if (forma1PintadaCorrectamente && forma2PintadaCorrectamente) {
    // Muestra el recuadro de mensaje de victoria
    showWinMessage();

    // Oculta el botón "Check"
    const checkButton = document.querySelector(".check-button");
    checkButton.style.display = "none";
  } else {
    // Muestra el recuadro de mensaje de error
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
  }
}

function showNextLevel() {
  // Puedes personalizar este mensaje o realizar otra acción
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML =
    "<div>¡Ganaste el nivel! Pasando al siguiente nivel...</div>";
}

function closeErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none";
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
  const winMessage = document.getElementById("win-message");
  winMessage.style.display = "block";
  score += 10; // Incrementa la puntuación en 10 puntos cuando el jugador gana
  updateScore(); // Actualiza la puntuación en la página
}
