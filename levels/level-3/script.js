document.addEventListener("DOMContentLoaded", () => {
  const puzzleSection = document.getElementById("puzzle-section");
  const puzzleDropArea = document.getElementById("puzzle-drop-area");
  const dropSlots = document.querySelectorAll(".drop-slot");
  const puzzlePieces = [];
  const imageURLs = [
    "../../images/puzle1.png",
    "../../images/puzle3.png",
    "../../images/puzle2.png",
    "../../images/puzle4.png",
  ];

  function loadImages() {
    imageURLs.forEach((url, index) => {
      const piece = document.createElement("img");
      piece.src = url;
      piece.alt = `Piece ${index + 1}`;
      piece.classList.add("puzzle-piece");
      piece.dataset.piece = index + 1;
      piece.draggable = true;
      piece.addEventListener("dragstart", (event) =>
        handleDragStart(event, piece),
      );
      puzzleSection.appendChild(piece);
      puzzlePieces.push(piece);
    });
  }

  function handleDragStart(event, piece) {
    event.dataTransfer.setData("text/plain", piece.dataset.piece);
  }

  puzzleDropArea.addEventListener("dragover", (event) =>
    event.preventDefault(),
  );

  dropSlots.forEach((slot) => {
    slot.addEventListener("dragover", (event) => event.preventDefault());

    slot.addEventListener("drop", (event) => {
      event.preventDefault();
      const droppedPieceNumber = event.dataTransfer.getData("text/plain");
      const droppedPiece = puzzlePieces.find(
        (piece) => piece.dataset.piece === droppedPieceNumber,
      );

      droppedPiece.style.width = "200px";
      droppedPiece.style.height = "150px";

      slot.appendChild(droppedPiece);
    });
  });

  loadImages();
});

document.addEventListener("DOMContentLoaded", () => {
  function check() {
    const slots = document.querySelectorAll(".drop-slot");

    const correctOrderForSlots = {
      slot1: 1,
      slot2: 2,
      slot3: 4,
      slot4: 3,
    };

    const isCorrectOrder = Array.from(slots).every((slot) => {
      const slotId = slot.id;
      const correctPieceNumber = correctOrderForSlots[slotId];
      const droppedPieceNumber =
        slot.children.length > 0 ? parseInt(slot.children[0].dataset.piece) : 0;

      return correctPieceNumber === droppedPieceNumber;
    });

    if (isCorrectOrder) {
      showWinMessage("¡Ganaste!");
    } else {
      showError("Assegurat que has posat les peces on toquen!");
    }
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

  updateScore();
  function showWinMessage() {
    const winMessage = document.getElementById("win-message");
    winMessage.style.display = "block";
    score += 10;
    updateScore();
  }

  function showError(message) {
    const errorMessage = document.getElementById("error-message");
    const errorText = document.getElementById("error-text");
    errorText.textContent = message;
    errorMessage.style.display = "block";
  }

  function hideMessages() {
    const winMessage = document.getElementById("win-message");
    const errorMessage = document.getElementById("error-message");
    winMessage.style.display = "none";
    errorMessage.style.display = "none";
  }

  const checkButton = document.querySelector(".check");
  checkButton.addEventListener("click", check);

  const okButton = document.querySelector("#error-message button");
  if (okButton) {
    okButton.addEventListener("click", hideMessages);
  }
});

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