
const collisions = require('./util.js');


  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext('2d');

  let mouse = {
    x: innerWidth,
    y: innerHeight,
  };

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

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

    let circle1;
    let circle2;
    let obstacle = [];

    function init(){
      // circle1 = new Circle(150, 150, 60, 'orange');
      circle2 = new Circle(undefined, undefined, 10, 'orange');
      obstacle = obstacle.concat(obstacleInit());
    }

    function animate(){
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circle2.x = mouse.x;
      circle2.y = mouse.y;
      circle2.update();
      obstacle.forEach((obst) => obst.update());
      obstacle.forEach((obst) => {
        obst.move();
        if (collisions(circle2, obst)){

          modal();
          window.addEventListener('click', () => $("#modal").removeClass("is-active"));
        }
      });
    }

    function obstacleInit(){
      let wid = twoRandomWidth();
      let h = 20;
      let color = 'green';
      return [new Obstacle(0, 0, wid[0], h, color),
              new Obstacle(canvas.width - wid[1], 0, wid[1], h, color)];
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
        ctx.fillStyle = this.color;
        this.y += 1.5;
        ctx.fillRect(this.x, this.y, this.w, this.h);
      };
    }

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

    function gamePlay(){
        setInterval(init, 1000);
        animate();

    }

    function modal(){
      $(document).ready(function(){
          return $("#modal").addClass("is-active");
      });
    }

gamePlay();

// setInterval(tileUpdate, 1000);
