function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "flex";
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
};



var audio = new Audio('./audio/conte-la-rateta-que-escombrava-lescaleta.mp3');
var isPlaying = false;

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('playPauseIcon').src = './images/pausa.png';
        document.getElementById('topBarHeading').innerText = "INICIAR AUDIO";
      } else {
        audio.play();
        document.getElementById('playPauseIcon').src = './images/pausa.png';
        document.getElementById('topBarHeading').innerText = "PAUSAR AUDIO";
    }
    isPlaying = !isPlaying;
}

function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    document.getElementById('playPauseIcon').src = './images/play.png';
    isPlaying = false;
}

var maxSize = 200;
var minSize = 10;

function increaseSize() {
  var increaseText = document.getElementById("scrollableText");
  var computedStyle = window.getComputedStyle(increaseText);
  var currentSize = parseFloat(computedStyle.fontSize);

  if (currentSize < 200) {
    var newSize = currentSize + 5;
    increaseText.style.fontSize = newSize + "px";
  }
}

function reduceSize() {
  var reduceText = document.getElementById("scrollableText");
  var computedStyle = window.getComputedStyle(reduceText);
  var currentSize = parseFloat(computedStyle.fontSize);

  if (currentSize > 10) {
    var newSize = currentSize - 5;
    reduceText.style.fontSize = newSize + "px";
  }
}

var musicAudio = new Audio('./audio/musica-fondo.mp3');
var isMusicPlaying = false;

function toggleMusic() {
    if (isMusicPlaying) {
        musicAudio.pause();
        document.getElementById('musicIcon').src = './images/play.png';
        document.getElementById('musicHeading').innerText = "INICIAR MÚSICA";
    } else {
        musicAudio.play();
        document.getElementById('musicIcon').src = './images/pausa.png';
        document.getElementById('musicHeading').innerText = "PAUSAR MÚSICA";
    }
    isMusicPlaying = !isMusicPlaying;
    musicAudio.volume=(0.1); //VOLUMEN MUSICA
}

// Pausa la música al cerrar el modal
function closeModalWithMusic(modalId) {
    closeModal(modalId);
    if (isMusicPlaying) {
        toggleMusic();
    }
}

// Agrega un event listener para cuando el audio termine
musicAudio.addEventListener('ended', function () {
    // Vuelve a reproducir el audio al finalizar
    if (isMusicPlaying) {
        musicAudio.play();
    }
});
