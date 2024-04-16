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
let seed = 0;

let forwardGrass = '#078a07'
let backGrass = '#0e300e'
let tree = '#48d415'
let mountains = '#535957'
let fmountains = '#1e2120'
let snow = '#f0f5f3'
let sun = "#ffef14"
let moon = "#f5f4eb"

let skyR = 104
let skyG = 210
let skyB = 252

let sunX = 50
let moonX = 450

let deltaSun = 0

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

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  createButton("reimagine").mousePressed(() => seed++);

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  background(100);
  
  noStroke();
  
  fill(skyR, skyG, skyB);
  rect(0, 0, width, ((height) / 2))
  
  fill(backGrass);
  rect(0, height / 2, width, (height / 10))
  
  fill(forwardGrass);
  rect(0, (3*height) / 5, width, (height / 2))
  
  let mountainArray = []
  
  fill(mountains);
  beginShape();
  vertex(0, height / 2)
  for(let i = 0; i < 4; i++) {
    let rand = 100 * random()
    let x = ((width * i) / 4) + rand
    let y = (height / 2) - (random() * (100 - (random() * 90)))
    let w = (width / 4)  - (rand)
    vertex(x, y)
    vertex(x + w, y)
    mountainArray[i] = [x, y, w]
  }
  vertex(width, height / 2)
  endShape()

  
  fill(sun)
  ellipse(sunX, width/8, width * 0.075, width * 0.075)
  
  fill(moon)
  ellipse(moonX, width/8, width * 0.075, width * 0.075)
  
  let scroll = mouseX/(width/2)
  if(scroll < 1) {
    scroll = scroll - 1
  }
  
  deltaSun = sunX
  sunX += (scroll * 1)
  if(sunX < -1 * (7*width)/8) {
    sunX = -1 * (7*width)/8
  }
  if(sunX > width/8) {
    sunX = width/8
  }
  moonX = sunX + width
  deltaSun = sunX - deltaSun
  
  skyR += (104/width) * deltaSun
  skyG += (210/width) * deltaSun
  skyB += (252/width) * deltaSun
  

  fill(snow)
  for(let i = 0; i < 4; i++) {
    let x = mountainArray[i][0]
    let y = mountainArray[i][1]
    let w = mountainArray[i][2]
    triangle(x, y, (x + w/2), 3*y / 4, x + w, y)
  }
  
  fill(fmountains) 
  beginShape();
  vertex(0, height / 2)
  for(let i = 0; i < 8; i++) {
    let x = ((width * i) / 8)
    let y = (height / 2) - (random() * 20)
    vertex(x, y)
  }
  vertex(width, height / 2)
  endShape()
  
  fill(tree);
  const trees = 20*random();
  for (let i = 0; i < trees; i++) {
    let z = random() + millis() / 250000.0;
    let x = width * ((random() + (width/50) / random()) % 1);
    let s = width / 50 / z;
    let y = height / 2 + height / 10 / z;
    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}