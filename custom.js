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

var audio = new Audio("./audio/conte-la-rateta-que-escombrava-lescaleta.mp3");

function toggleAudio() {
  if (localStorage.getItem("isPlaying") === "true") {
    audio.pause();
    document.getElementById("playPauseIcon").src = "./images/pausa.png";
    document.getElementById("topBarHeading").innerText = "INICIAR AUDIO";
    localStorage.setItem("isPlaying", "false");
  } else {
    audio.play();
    document.getElementById("playPauseIcon").src = "./images/pausa.png";
    document.getElementById("topBarHeading").innerText = "PAUSAR AUDIO";
    localStorage.setItem("isPlaying", "true");
  }
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("playPauseIcon").src = "./images/play.png";
  localStorage.setItem("isPlaying", "false");
  document.getElementById("topBarHeading").innerText = "INICIAR AUDIO";
}

// Verificar y establecer el estado de reproducción al cargar la página
window.addEventListener("load", function() {
  if (localStorage.getItem("isPlaying") === null) {
    localStorage.setItem("isPlaying", "false");
  } else if (localStorage.getItem("isPlaying") === "true") {
    toggleAudio();
  }
});

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

var musicAudio = new Audio("./audio/musica-fondo.mp3");
var isMusicPlaying = false;
var musicButton = document.getElementById("music");

function toggleMusic() {
  if (isMusicPlaying) {
    musicAudio.pause();
  } else {
    musicAudio.play();
  }
  isMusicPlaying = !isMusicPlaying;
  musicAudio.volume = 0.3; //VOLUMEN MUSICA
  updateAfterVisibility();
}

function updateAfterVisibility() {
  var afterElement = musicButton.querySelector(".imgAfter");
  if (isMusicPlaying) {
    afterElement.style.display = "none";
  } else {
    afterElement.style.display = "block";
  }
}

// Agrega un event listener para cuando el audio termine
musicAudio.addEventListener("ended", function () {
  // Vuelve a reproducir el audio al finalizar
  if (isMusicPlaying) {
    musicAudio.play();
  }
});

// CARRUSSEL
function showSlide(index) {
  const slider = document.querySelector(".carousel-slider");
  const totalSlides = document.querySelectorAll(".carousel-slider img").length;

  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  const translationValue = -currentIndex * 100 + "%";
  slider.style.transform = "translateX(" + translationValue + ")";
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

// Mostrar la primera imagen al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  showSlide(0);
});

let isTextVisible = true;

function toggleContent() {
  const carouselContainer = document.querySelector(".carousel-container");
  const scrollableText = document.getElementById("scrollableText");
  const toggleTextImg = document.getElementById("toggleTextImg");

  if (isTextVisible) {
    carouselContainer.style.display = "block";
    scrollableText.style.display = "none";
    scrollableText.style.textAlign = "center";
    toggleTextImg.textContent = "CONTE";
  } else {
    carouselContainer.style.display = "none";
    scrollableText.style.display = "block";
    scrollableText.style.textAlign = "justify";
    toggleTextImg.textContent = "IMATGES";
  }

  isTextVisible = !isTextVisible;
}

document.addEventListener("DOMContentLoaded", () => {
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
  updateScore();
});

// Wrapping the script in a document ready function
$(document).ready(function () {
  $(".page").click(function () {
    $(this).removeClass("no-anim").toggleClass("flipped");
    $(".page > div").click(function (e) {
      e.stopPropagation();
    });
    reorder();
  });

  function reorder() {
    $(".book").each(function () {
      var pages = $(this).find(".page");
      var pages_flipped = $(this).find(".flipped");
      pages.each(function (i) {
        $(this).css("z-index", pages.length - i);
      });
      pages_flipped.each(function (i) {
        $(this).css("z-index", i + 1);
      });
    });
  }

  reorder();
});
$(document).ready(function () {
  $(".carousel").slick({
    dots: true, // Muestra los puntos de navegación
    infinite: true,
    speed: 300,
    slidesToShow: 1, // Número de imágenes a mostrar al mismo tiempo
    adaptiveHeight: true, // Ajusta automáticamente la altura de las imágenes
    prevArrow: $(".prevBtn"), // Utiliza el botón personalizado "Prev"
    nextArrow: $(".nextBtn"), // Utiliza el botón personalizado "Next"
  });
});
