function showWinMessage() {
  const winMessage = document.getElementById("win-message");
  winMessage.style.display = "block";
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
      showWinMessage();
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
    "level5/moneda.png",
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
