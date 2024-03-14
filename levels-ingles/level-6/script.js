const audioError = new Audio("../../audio/audio-error.mp3");
const audioPass = new Audio("../../audio/audio-check.mp3");

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
  score += 30; // Incrementa la puntuación en 10 puntos cuando el jugador gana
  updateScore(); // Actualiza la puntuación en la página
}
function openErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "block";
}
function closeErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none";
}

const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      setTimeout(() => {
        showWinMessage();
      });
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  console.log("Shuffling cards...");
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let imageNames = [
    "rata.png",
    "burra.png",
    "casa.png",
    "perrito.png",
    "level5/moneda.png",
    "level5/lazo.png",
    "gatito.png",
    "gallito.png",
  ];
  imageNames = imageNames.concat(imageNames);
  imageNames.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, i) => {
    card.classList.remove("flip");
    card.classList.remove("shake");

    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `../../images/${imageNames[i]}`;
    card.addEventListener("click", flipCard);
  });
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

shuffleCard();

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
         LEVEL 6 <br>
         <br> 1- TO GO BACK. <br>
         2- MEMORY TYPE JOPC.<br>
         <strong>AIM OF THE GAME:<strong> COMPLETE ALL PAIRS OF PICTURES
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