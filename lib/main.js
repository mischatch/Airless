const collisions = require('./util.js');


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
  window.circle2 = new Circle(undefined, undefined, 10, '#5092ff');
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
  let h = Math.random() * 40 + 5;
  let color = '#ff7171';
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
      cancelAnimationFrame(gameAnimation);
      modal();
      gameArea.score = 0;
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



// $('body').addEventListener('click', () => {
//
// })
