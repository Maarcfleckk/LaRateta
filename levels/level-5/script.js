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
function refreshPage() {
  location.reload();
}
function randomImg() {
  const imgNumber = Math.floor(Math.random() * 3);
  const image = document.querySelector(".itemImg");
  if (imgNumber === 0) {
    return "../../images/level5/lazo.png";
  } else if (imgNumber === 1) {
    return "../../images/level5/moneda.png";
  }
  return "../../images/casa.png";
}
function handleIncrement() {
  const resultInput = document.querySelector(".resultInput");
  return (resultInput.value = parseInt(resultInput.value) + 1);
}
function handleDecrement() {
  const resultInput = document.querySelector(".resultInput");
  return (resultInput.value = parseInt(resultInput.value) - 1);
}
function itemGenerator() {
  const itemContainer = document.querySelector(".gameItemContainer");
  let itemNumber = Math.floor(Math.random() * 10) + 1;
  const imageSrc = randomImg();
  for (let index = 0; index < itemNumber; index++) {
    const item = document.createElement("img");
    item.classList.add("itemImg");
    item.src = imageSrc;
    itemContainer.appendChild(item);
  }
}
function checkResult() {
  const resultInput = document.querySelector(".resultInput");
  const givenResult = resultInput.value;
  const result = document.querySelectorAll(".itemImg").length;
  if (givenResult === result.toString()) {
    showWinMessage();
  } else {
    openErrorMessage();
  }
}
itemGenerator();
