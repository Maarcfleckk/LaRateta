// Función para abrir el modal
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "flex";
}

// Función para cerrar el modal
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// Cierra el modal si se hace clic fuera de él
window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
};

// Variables para el audio y el estado de reproducción
var audio = new Audio('./path/to/your/audio.mp3');
var isPlaying = false;

// Función para pausar o continuar la reproducción del audio
function toggleAudio() {
    audio.pause();
}

// Función para detener la reproducción del audio
function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    document.getElementById('playButton').innerText = 'Play';
    isPlaying = false;
}

// Resto del código...
