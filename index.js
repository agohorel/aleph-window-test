const dragItem = document.querySelector(".drag-item");
const dropTargets = document.querySelectorAll(".drop-target");

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  e.dataTransfer.setData("text", e.target.className);
}

function drop(e) {
  e.preventDefault();
  const item = e.dataTransfer.getData("text");
  e.target.appendChild(document.querySelector(`.${item}`));
}

dropTargets.forEach(target => {
  target.addEventListener("dragover", allowDrop);
  target.addEventListener("drop", drop);
});

dragItem.addEventListener("dragstart", drag);
