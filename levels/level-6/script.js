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

let moves = 0;
const rows = 4;
const columns = 4;
const board = document.querySelector(".game");
const imageArray = [
  "url(../../images/casa.png)",
  "url(../../images/gato.png)",
  "url(../../images/gallo.png)",
  "url(../../images/level5/moneda.png)",
  "url(../../images/level5/lazo.png)",
  "url(../../images/burra.png)",
  "url(../../images/perrito.png)",
  "url(../../images/rata.png)"
]

// CREATE CARDS
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function shuffleCards() {
  const cards = document.querySelectorAll(".card");
  let orderArray = Array.from({length: cards.length}, (_, i) => i);
  shuffleArray(orderArray);
  cards.forEach((card, index) => {
    card.style.order = orderArray[index];
  });
}

function addImage(){
  let arrayIndex = 0;
  for (let i = 0; i < rows * columns; i++) {
    if(i % 2 === 0){
      const cardArray = document.querySelectorAll(".card");
      cardArray[i].style.backgroundImage = imageArray[arrayIndex];
      cardArray[i+1].style.backgroundImage = imageArray[arrayIndex];
      cardArray[i].id = arrayIndex;
      cardArray[i+1].id = arrayIndex;
      arrayIndex = arrayIndex + 1;
    }
  }
}
function addClick(){
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const cardId = card.id;
    card.addEventListener("click", selectCard(cardId));
  });
}

function createCards(){
  for (let i = 0; i < rows * columns; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(i);
    card.addEventListener("click", selectCard);
    board.appendChild(card);
  }
  addImage();
  shuffleCards();
}

// CHECK MATCH
function selectCard(cardId) {
  console.log("🚀 ~ selectCard ~ id:", cardId);
  
}

function checkMatch() {
  
}

createCards();
