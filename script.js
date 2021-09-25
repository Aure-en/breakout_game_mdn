// Select <canvas> element
const canvas = document.querySelector("#canvas");

// Create the "2D rendering context" = Tool used to draw on <canvas>
const ctx = canvas.getContext("2d");

// Create a red square whose left corner position is { x: 20px, y: 40px }.
// All instructions always start with beginPath and end with closePath.
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

// Draw a green circle
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

// Stroke instead of fill to only color the outline.
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();