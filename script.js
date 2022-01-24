const inkColor = "rgb(35, 35, 35)";
const erreaserColor = "blanchedalmond";
const markingColor = "rgba(81, 142, 255, 0.329)";
const gridContainer = document.querySelector(".gridContainer");
let cellsArray = [];
let currentColor;
let drawingColor = inkColor;
let drawing = false;
const gridMaxSize = 64;
const drawButton = document.querySelector(".drawButton");
const erraseButton = document.querySelector(".erraseButton");
const restartButton = document.querySelector(".restartButton");
let gridRange = document.querySelector(".gridRange");
const numberOfColumns = document.querySelector(".demo1");
const numberOfRows = document.querySelector(".demo2");

//Creates divs with the "cell" class
function createDivs(){
  let cell = document.createElement("div");
  cell.className = "cell";
  return cell;
}

//Create an array of divs of the class "cell" and add events listeners to each cell
function createArray(){
  for (i = 0; i < (gridMaxSize * gridMaxSize); i++){
    cellsArray.push(createDivs());
  }
  for (cell of cellsArray){
    cell.addEventListener("mouseenter", changeColor);
    cell.addEventListener("mouseleave", unmakrCurrentCell);
    cell.addEventListener("mousedown", toggleDrawing);
  }
}

//Append or remove cell into grid container
function createGrid(){
  while(gridContainer.firstChild){
    gridContainer.removeChild(gridContainer.lastChild);
  }
  for (i=0; i < (gridRange.value * gridRange.value); i++){
    gridContainer.appendChild(cellsArray[i]);
  }
  gridContainer.style.gridTemplateColumns = `repeat(${gridRange.value}, 1fr)`;
}

//Change the grid on input on the slider
gridRange.oninput = changeGrid;

function changeGrid(){
  numberOfColumns.innerHTML = this.value;
  numberOfRows.innerHTML = this.value;
  createGrid();
  turnGridWhite();
}

////////////////////////////////////////////

//Restart the grid
restartButton.addEventListener("click", turnGridWhite);

function turnGridWhite(){
  for (cell of cellsArray){
    cell.style.backgroundColor = erreaserColor;
  }
  drawing = false;
}

//Switches between drawing and errasing
drawButton.addEventListener("click", turnColorBlack);
erraseButton.addEventListener("click", turnColorWhite);

function turnColorBlack(){
  drawingColor = inkColor;
  drawing = false;
}

function turnColorWhite(){
  drawingColor = erreaserColor;
  drawing = false;
}

//Activates and desactivates the drawing
//If drawing is true, changes the color of the clicked cell to the drawing color
function toggleDrawing(e){
  drawing = !drawing;
  if (drawing == true){
    e.currentTarget.style.backgroundColor = drawingColor;
    currentColor = drawingColor;
  }
}

//If drawing is true: changes the color of cell to drawing color on mouse-enter
//If drawing is false: changes the color of cell to marking color on mouse-enter
function changeColor(e){
  currentColor = e.currentTarget.style.backgroundColor;
  if(drawing == true){
    e.currentTarget.style.backgroundColor = drawingColor;
    currentColor = e.currentTarget.style.backgroundColor;
  }
  else{
    e.currentTarget.style.backgroundColor = markingColor;
  }
}


//revert to previous color on mouse leave
function unmakrCurrentCell(e){
  if (drawing == true){
    e.currentTarget.style.changeColor = drawingColor;
  } else {
    e.currentTarget.style.backgroundColor = currentColor;
  }
}  

//Initializes the page
numberOfColumns.innerHTML = gridRange.value;
numberOfRows.innerHTML = gridRange.value;
createArray();
createGrid();