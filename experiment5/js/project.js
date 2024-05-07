// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  // create an instance of the class
  let myInstance = new MyProjectClass("value1", "value2");

  // call a method on the instance
  myInstance.myMethod();
}

function getInspirations() {
  return [
    {
      name: "Ali vs Liston", 
      assetUrl: "https://cdn.glitch.global/4d33257b-f1de-4e33-a7df-be4be5746118/Ali-vs-Liston.jpg?v=1714966370541",
      canvas: 4,
      base: 24
    },
    {
      name: "Bowler Hat Painting", 
      assetUrl: "https://cdn.glitch.global/4d33257b-f1de-4e33-a7df-be4be5746118/BowlerHat.jpg?v=1715104740861",
      canvas: 1,
      base: 13
    },
    {
      name: "Astronaut in Space", 
      assetUrl: "https://cdn.glitch.global/4d33257b-f1de-4e33-a7df-be4be5746118/download.jpg?v=1714966369423",
      canvas: 1,
      base: 14
    },
  ];
}

function initDesign(inspiration) {
  let squares = 4
  let iterations = 1
  resizeCanvas(inspiration.image.width / inspiration.canvas, inspiration.image.height / inspiration.canvas);
  let stepSizeW = (inspiration.image.width / inspiration.canvas) / squares
  let stepSizeH = (inspiration.image.height / inspiration.canvas) / squares
  for(let i = 0; i < iterations; i++) {
    stepSizeW  = stepSizeW / squares
    stepSizeH  = stepSizeH / squares
  }
  console.log("W size: ", stepSizeW)
  console.log("H size: ", stepSizeH)
  console.log("Canvas W: ", inspiration.image.width / inspiration.canvas)
  console.log("Canvas H: ", inspiration.image.height / inspiration.canvas)
  let coords = generateSquares(inspiration.image.width / inspiration.canvas, inspiration.image.width / inspiration.canvas, Math.ceil(stepSizeW), Math.ceil(stepSizeH))
  console.log(coords)
  let des = {"squares": squares, "iterations": iterations, "coords": coords, "size": inspiration.base, "canvas": inspiration.canvas};
  return des;
}

function renderDesign(design, inspiration) {
  // let squares = design["squares"]
  // let iterations = design["iterations"]
  //console.log(design["coords"])
  //console.log("Canvas W: ", inspiration.image.width / inspiration.canvas)
  //console.log("Canvas H: ", inspiration.image.height / inspiration.canvas)
  for(const sq of design["coords"]) {
    //console.log("sq: ", sq)
    let avR = 0
    let avG = 0
    let avB = 0
    let x = (sq[3][0] - sq[0][0]) / 2 + sq[0][0]
    let y = (sq[3][1] - sq[0][1]) / 2 + sq[0][1]
    //get is getting the triangles under the the others, so its propagating upward
    let arr = inspiration.image.get(design["canvas"] * x, design["canvas"] * y)
    //console.log("x, y ", x, y)
    avR += arr[0]
    avG += arr[1]
    avB += arr[2]
    //console.log("Colors: ", avR, avG, avB)
    //DRAW TRIANGLES HERE
    let points = makeTrianglePoints(design, x, y)
    
    noStroke()
    fill(avR, avG, avB)
    //console.log("triangle drawn")
    triangle(points[0], points[1], points[2], points[3], points[4], points[5])
  }
}

function mutateDesign(design, inspiration, rate) {
  let minBase = design["size"]
  let minSquares = design["squares"]
  let minIterations = design["iterations"]
  let randBase = mut(minBase + 2, minBase, minBase + 5, rate)
  let randSquares = mut(minSquares + 1, minSquares, minSquares + 3, rate)
  //let randIterations = mut(minIterations + 1, minIterations, minIterations + 3, rate)
  
  design["size"] = randBase
  design["squares"] = randSquares
  //design["iterations"] = randIterations
  
  let stepSizeW = (inspiration.image.width / inspiration.canvas) / randSquares
  let stepSizeH = (inspiration.image.height / inspiration.canvas) / randSquares
  for(let i = 0; i < minIterations; i++) {
    stepSizeW  = stepSizeW / randSquares
    stepSizeH  = stepSizeH / randSquares
  }
  console.log("W size: ", stepSizeW)
  console.log("H size: ", stepSizeH)
  console.log("Canvas W: ", inspiration.image.width / inspiration.canvas)
  console.log("Canvas H: ", inspiration.image.height / inspiration.canvas)
  design["coords"] = generateSquares(inspiration.image.width / inspiration.canvas, inspiration.image.width / inspiration.canvas, Math.ceil(stepSizeW), Math.ceil(stepSizeH))
  console.log(design["coords"])  
}

function generateSquares(canvasW, canvasH, stepSizeW, stepSizeH) {
  let squares = []
  let x = 0
  let y = 0
  for(x; x < canvasW; x += stepSizeW){
    y = 0
    for(y; y < canvasH; y += stepSizeH) {
      squares.push([[x ,y], [x + stepSizeW, y], [x, y + stepSizeH], [x + stepSizeW, y + stepSizeH]])
    }
  }
  return squares
}

//make semi-random triangle points
function makeTrianglePoints(des, originX, originY) {
  let size = des["size"]
  let pointA = [originX, originY - size]
  let pointB = [originX - size, originY + size]
  let pointC = [originX + size, originY + size]
  return [pointA[0], pointA[1], pointB[0], pointB[1], pointC[0], pointC[1]]
}


// unction mut(num,,min,,max,,rate) {
 //   return constrain(randomGaussiannum, (rate * (max - min)) / 20),, min, max);}// 


function mut(num, min, max, rate) {
  let rand = randomGaussian(num, (rate * (max - min)) / 5)
  console.log("rand", rand)
  console.log("min", min)
  console.log("max", max)
  return constrain(rand, min, max)
}
