// Select <canvas> element
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Ball
let x = canvas.width / 2;
let y = canvas.height - 30;
const ballRadius = 10;

// Paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Ball movements
let dx = 2;
let dy = -2;

// Bricks
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let column = 0 ; column < brickColumnCount; column++) {
  bricks[column] = [];
  for (let row = 0; row < brickRowCount; row++) {
    bricks[column][row] = { x: 0, y: 0, status: 1 };
  }
}

// Player controls
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {
      const brick = bricks[column][row];

      if (
        x > brick.x &&
        x < brick.x + brickWidth &&
        y > brick.y &&
        y < brick.y + brickHeight &&
        brick.status === 1
        )
      {
        brick.status = 0;
        dy = -dy;
      }
    }
  }
}

// Draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();

  // Ball coordinates

  // Left and right boundaries
  if (x + dx < ballRadius / 2 || x + dx > canvas.width - ballRadius / 2) {
    dx = -dx;
  }

  // Top boundary
  if (y + dy < ballRadius / 2) {
    dy = -dy;
    // Bottom boundary
  } else if (y + dy > canvas.height - ballRadius) {

    // If we hit the paddle, it is ok.
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("Game over");
      document.location.reload();
      clearInterval(interval);
    }
  }

  // Paddle coordinates
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth
    }

  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {

      if (bricks[column][row].status === 1) {
        const brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
  
        bricks[column][row].x = brickX;
        bricks[column][row].y = brickY;
  
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

const interval = setInterval(draw, 10);