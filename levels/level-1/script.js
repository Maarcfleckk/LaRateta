const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let selectedColor = 'black'; // Color de inicio

function selectColor(color) {
  selectedColor = color;
}


function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}



function playAudio() {
  // Agrega aquí la lógica para reproducir el archivo de audio MP3
  // Puedes usar la API Audio de JavaScript
}

function checkDrawing() {
  const centerX = Math.floor(canvas.width / 2);
  const centerY = Math.floor(canvas.height / 2);
  const pixelColor = getColorAtPixel(centerX, centerY);

  if (pixelColor === selectedColor) {
    alert('¡Correcto! El lazo está pintado correctamente.');
  } else {
    alert('¡Incorrecto! El color del lazo no es el esperado.');
  }
}

function getColorAtPixel(x, y) {
  const pixel = context.getImageData(x, y, 1, 1);
  const data = pixel.data;

  // data[0], data[1], data[2] representan los componentes RGB del píxel
  const color = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;

  return color;
}

// Agrega aquí la lógica para dibujar en el canvas según la interacción del usuario

let initialX;
let initialY;
let isDrawing = false;

const dibujar = (cursorX, cursorY) => {
  if (!isDrawing) return;

  context.beginPath();
  context.moveTo(initialX, initialY);
  context.lineWidth = 100; // Ajusta el ancho de la brocha según tus preferencias
  context.strokeStyle = selectedColor;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineTo(cursorX, cursorY);
  context.stroke();

  initialX = cursorX;
  initialY = cursorY;
};

const mouseDown = (evt) => {
  isDrawing = true;
  initialX = evt.offsetX;
  initialY = evt.offsetY;
};

const mouseMove = (evt) => {
  dibujar(evt.offsetX, evt.offsetY);
};

const mouseUp = () => {
  isDrawing = false;
};

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mouseup", mouseUp);
