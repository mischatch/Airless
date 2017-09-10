/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const collisions = __webpack_require__(1);


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

let mouse = {
  x: innerWidth,
  y: innerHeight,
};

canvas.addEventListener('mousemove', (e) => {
  var rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

let obstacle = [];
let interval;
let gameAnimation;
// let circle2;

function startGame(){
  window.circle2 = new Circle(undefined, undefined, 10, 'orange');
  gameArea.start();
  $("#start-modal").removeClass("is-active");
}


let gameArea = {          //gameArea ______________________//
  score: 0,
  start: () => {
    interval = setInterval(updateGameArea, 500);
  },

  clear: () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
};


function Circle(x, y, rad, color){
  this.x = x;
  this.y = y;
  this.rad = rad;
  this.color = color;

  this.update = () => {
    this.draw();
  };

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
}


function Obstacle(x, y, w, h, color){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;
  this.rad = Math.sqrt(Math.pow(this.w/2, 2) + Math.pow((this.h/2), 2));

  this.update = () => {
    this.draw();
  };

  this.draw = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  this.move = () => {
    this.y += 1;
  };
}

function obstacleInit(){
  let wid = twoRandomWidth();
  let h = Math.random() * 20 + 2;
  let color = 'green';
  return [new Obstacle(0, Math.random() * -10, wid[0], h, color),
          new Obstacle(canvas.width - wid[1], Math.random() * -10, wid[1], h, color)];
}


function updateGameArea(){
  gameAnimation = requestAnimationFrame(updateGameArea);

  document.getElementById("score").innerHTML = gameArea.score;
  gameArea.score += 1;
  gameArea.clear();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();
  obstacle.forEach((obst) => {
    if (collisions(circle2, obst)){
      gameArea.score = 0;
      cancelAnimationFrame(gameAnimation);
      modal();
    }
  });

  if (gameAnimation % 75 === 0) {
    obstacle = obstacle.concat(obstacleInit());
  }
  obstacle.forEach((obst) => {
    clearInterval(interval);
    obst.move();
    obst.update();
  });
}

function startOver(){
  obstacle = [];
  startGame();
  $("#modal").removeClass("is-active");
}




var b = document.getElementById('start');
b.onclick = startGame;

var bb = document.getElementById('startover');
bb.onclick = startOver;


function modal(){
$(document).ready(function(){
    return $("#modal").addClass("is-active");
});
}

function startModal(){
$(document).ready(function(){
    return $("#start-modal").addClass("is-active");
});
}

window.onload = () => {
  startModal();
};


const h7 = document.querySelector("h7");

h7.addEventListener('click', () => {

  if($('#info').hasClass('hidden') === true){
    $('#info').removeClass('hidden');
  } else {
    $('#info').addClass('hidden');
  }
});



function twoRandomWidth(){
  let res = [];
  let hole = circle2.rad * 2 + 10;
  while(res.length < 2){
    let w1 = Math.floor(Math.random() * (canvas.width - hole));
    let w2 = Math.floor(Math.random() * (canvas.width - hole));
    if((w1 + w2) <= (canvas.width - hole)){
      res.push(w1, w2);
    }
  }
  return res;
}

function show(id){
  let e = document.getElementById("h7");
  e.onclick = () => {
    $('info').addClass('is-active');
  };
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {


 // collision detection between circle and rectangular

function collisions(obj1, obj2){
  // obj1 — circle , obj2 — rectangular
  // X collision

  const collX = between((obj1.x + obj1.rad), obj2.x, (obj2.x + obj2.w)) ||
     between((obj1.x - obj1.rad), obj2.x, (obj2.x + obj2.w));
  // Y collision
  const collY = between((obj1.y + obj1.rad), obj2.y, (obj2.y + obj2.h)) ||
     between((obj1.y - obj1.rad), obj2.y, (obj2.y + obj2.h));
     if(collX && collY){
       return true;
     } else {
       return false;
     }
}

function between(val, lim1, lim2){
  if (val >= lim1 && val <= lim2){
    return true;
  }
  return false;
}



module.exports = collisions;


/***/ })
/******/ ]);