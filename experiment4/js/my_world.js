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

"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

//IDEA FOR FIRST GENERATOR
//as you hover over tiles setDelay() makes those tiles your cursors texture
//they fade after a little like drawing
//if you click they stay, so you can paint
//the textures you get are random

let tilesetImage1;
let tilesetImage2;
let tilesetImage3;
let tilesetImage4;
let tilesetImage5;
let tilesetImage6;

let base;
let base2;
let accent;
let paint;

function p3_preload() {
  tilesetImage1 = loadImage("https://cdn.glitch.global/826ccdcf-7e49-4a8d-8304-fa5b91e1f05a/Screen%20Shot%202024-04-30%20at%202.40.40%20PM.png?v=1714513277504"); // base 1
  tilesetImage2 = loadImage("https://cdn.glitch.global/7e1b18ee-699d-4427-94d6-7556ff3b05fa/Forest%20Tilesett.png?v=1714282066913"); //green
  tilesetImage3 = loadImage("https://cdn.glitch.global/826ccdcf-7e49-4a8d-8304-fa5b91e1f05a/Screen%20Shot%202024-04-30%20at%202.38.48%20PM.png?v=1714513276287"); //blue
  tilesetImage4 = loadImage("https://cdn.glitch.global/826ccdcf-7e49-4a8d-8304-fa5b91e1f05a/Screen%20Shot%202024-04-30%20at%202.39.20%20PM.png?v=1714513276824"); //red
  tilesetImage5 = loadImage("https://cdn.glitch.global/826ccdcf-7e49-4a8d-8304-fa5b91e1f05a/Screen%20Shot%202024-04-30%20at%202.39.53%20PM.png?v=1714513277203"); //orange
  tilesetImage6 = loadImage("https://cdn.glitch.global/826ccdcf-7e49-4a8d-8304-fa5b91e1f05a/Screen%20Shot%202024-04-30%20at%202.38.10%20PM.png?v=1714513275778"); //base 2
}

function p3_setup() {}

let worldSeed;

let block_size;

// let path = image;

// let bush = ;

let clicks = 0;
let hovered = {};

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
  block_size = XXH.h32("block", worldSeed) / 25000000
  
  let arr = [tilesetImage2, tilesetImage3, tilesetImage4, tilesetImage5]
  accent = arr[XXH.h32("accent", worldSeed) % 4]
  paint = arr[XXH.h32("paint", worldSeed) % 4]
  base = tilesetImage1
  base2 = tilesetImage6
  clicks = 0;
  hovered = {}
}

function p3_tileWidth() {
  return 16;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];


function p3_tileClicked(i, j) {
  // let key = [i, j];
  // clicks[key] = 1 + (clicks[key] | 0);
  clicks += 1
  let arr = [tilesetImage2, tilesetImage3, tilesetImage4, tilesetImage5]
  paint = arr[XXH.h32("new paint" + clicks, worldSeed) % 4]
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();
  
  let tsi;
  
  
  if (XXH.h32("tile:" + [i, j], worldSeed) % 20 == 0) {
    tsi = accent
  } else {
    tsi = base2
    if (i < block_size && i > -block_size && j < block_size && j > -block_size) {
      tsi = base
    }
  }

  push();
  
  
  //imageMode(CENTER);
  angleMode(DEGREES);
  //translate(width / 2, height / 2);
  rotate(45)
  
  image(base, -tw/2 - 3, -th/2 - 3, 24, 24, tw * 0, th * 0);
  
  let key = [i, j]
  if(hovered[key] == 1){
    image(paint, -tw/2 - 3, -th/2 - 3, 24, 24, tw * 0, th * 0);
  }else {
    image(tsi, -tw/2 - 3, -th/2 - 3, 24, 24, tw * 0, th * 0);
  }
  // beginShape();
  // vertex(-tw, 0);
  // vertex(0, th);
  // vertex(tw, 0);
  // vertex(0, -th);
  // endShape(CLOSE);

  // let n = clicks[[i, j]] | 0;
  // if (n % 2 == 1) {
  //   image(base, -tw/2 - 3, -th/2 - 3, 24, 24, tw * 0, th * 0);
  //   image(paint, -tw/2 - 3, -th/2 - 3, 24, 24, tw * 0, th * 0);
  // }

  pop();
}

function p3_drawSelectedTile(i, j) {
  
  push();
  
  //imageMode(CENTER);
  angleMode(DEGREES);
  //translate(width / 2, height / 2);
  rotate(45)
  
  image(base, -tw/2 - 3, -th/2 - 3, 24, 24, tw * 0, th * 0);
  image(paint, -tw/2 - 3, -th/2 - 3, 24, 24, tw * 0, th * 0);
  
  let key = [i, j];
  hovered[key] = 1;
  
  
  
  pop();
  
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
