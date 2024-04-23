// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    //fill grid with _
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }
  
  //make fun pathways - 2 of 'em
  for(let n = 1; n <= 2; n++){
    //two random points on each side of map
    let p1i = Math.floor(random() * 20)
    let p2i = Math.floor(random() * 20)
    //calculate their slope
    //for every 1 over, how many up do we go
    let slope = ((p1i - p2i)/20)
    for(let i = 19; i >= 0; i--) {
      p2i += slope
      grid[i][Math.trunc(p2i)-1] = "~"
      grid[i][Math.trunc(p2i)] = "~"
      grid[i][Math.trunc(p2i)+1] = "~"
    }
  }
  
  //make puddles
  //five of them
  for(let r = 0; r < 5; r++){
    let coord1 = Math.trunc(random() * 20)
    let coord2 = Math.trunc(random() * 20)
    console.log("coord1:", coord1)
    console.log("coord2:", coord2)
    grid[coord1][coord2] = "*"
    if(coord1 < 19 && (random() * 2) < 1){
      grid[coord1 + 1][coord2] = "*"
    }
    if(coord1 > 0 && (random() * 2) < 1){
      grid[coord1 - 1][coord2] = "*"
    }
    if(coord2 < 19 && (random() * 2) < 1){
      grid[coord1][coord2 + 1] = "*"
    }
    if(coord1 > 0 && (random() * 2) < 1){
      grid[coord1][coord2 - 1] = "*"
    }
    // let bonus = Math.floor(random() * 2)
    // grid[coord1+bonus][coord2+bonus] = "*"
  }
  
  //make random gardens
  let offset = 0
  let offsetJ = 0
  
  //repeat twice for 2 gardens
  for(let i = 1; i <= 2; i++) {
    //make a random corner with i,j
    let randI = Math.floor(random() * (5))
    let randJ = Math.floor(random() * (5))
    //make a random offset of at least 2 and at most 6 to make other corner at a diaganol
    let randX = Math.floor(random() * (4) + 2)
    let randY = Math.floor(random() * (4) + 2)
    //draw the four corners relative to one another
    grid[randI + offset][randJ + offsetJ] = "."
    grid[randI + randX + offset][randJ + offsetJ]= '.'
    grid[randI + randX + offset][randJ + randY + offsetJ] = "."
    grid[randI + offset][randJ + randY + offsetJ] = "."
    //draw the rows between each corner horizontally
    for(let _ = randI + offset; _ <= randI + randX + offset; _++){
      grid[_][randJ + offsetJ] = "."
      grid[_][randJ + offsetJ + randY] = "."
    }
    //draw the rows between each corner vertically
    for(let _ = randJ + offsetJ; _ <= randJ + randY + offsetJ; _++){
      grid[randI + offset][_] = "."
      grid[randI + offset + randX][_] = "."
    }
    //fill each room
    for(let i = randI + offset + 1; i < randI + randX + offset; i++) {
      for(let j = randJ + offsetJ + 1; j < randJ + randY + offsetJ; j++)
        grid[i][j] = '.'
    }
    
    //scale offset to put garden in a different region
 
    offset += Math.floor(random(10) + 2)
    offsetJ += Math.floor(random(10) + 2)

  }
  
  return grid;
}


function drawGrid(grid) {
  background(128);
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == '_') {
        placeTile(i, j, (floor(random(millis() / 2000) % 4)), 0);
      }
      if (grid[i][j] == '.') {
        placeTile(i, j, 16, 7)
        drawContext(grid, i, j, '.', 4, 3)
      }
      if (grid[i][j] == '~') {
        placeTile(i, j, 16, 4)
        drawContext(grid, i, j, '~', 4, 0)
      }
      if (grid[i][j] == '*') {
        placeTile(i, j, (floor(random(millis() / 2000) % 4)), 14);
      }
    }
  }
}

function gridCheck(grid, i, j, target) {
  if(i >= 0 && i < grid.length && j >= 0 && j < grid[i].length){ 
    let c = grid[i][j]
    if(c == target){
      return true
    }
    return false
  }
  return false
}

function gridCode(grid, i, j, target) {
  let code = 0
  if(gridCheck(grid, i - 1, j, target)){
    code += 1
  }
  if(gridCheck(grid, i + 1, j, target)){
    code += 8
  }
  if(gridCheck(grid, i, j - 1, target)){
    //console.log(2)
    code += 2
  }
  if(gridCheck(grid, i, j + 1, target)){
    //console.log(4)
    code += 4
  }
  return code
}

function drawContext(grid, i, j, target, dti, dtj) {
  let gc = gridCode(grid, i, j, target)
  let code = lookup[gc]
  placeTile(i, j, dti + code[0], dtj + code[1])
}

const lookup = [
  [10, 3],
  [1, 2],
  [2, 2],
  [2, 2],
  [0, 2],
  [0, 2],
  [1, 0],
  [1, 2],
  [0, 1],
  [2, 1],
  [2, 0],
  [2, 1],
  [0, 0],
  [0, 1],
  [1, 0],
  [12, 4]
];

/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();
}


function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}




// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}