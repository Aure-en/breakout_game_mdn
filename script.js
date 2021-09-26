// Select <canvas> element
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let color = 'blue';
const ballRadius = 10;

let dx = 2;
let dy = -2;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  if(y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
    dy = -dy;
    color = 'red';
  }

  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
    color = 'green';
  }

  x += dx;
  y += dy;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

setInterval(draw, 10);