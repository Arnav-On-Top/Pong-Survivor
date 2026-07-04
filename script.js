let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
let paddleWidth = 120;
let paddleHeight = 20;
let paddleX = canvas.width / 2 - paddleWidth / 2;
let paddleY = canvas.height - 40;
let ballSize = 15;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let score = 0;
let highScore = localStorage.getItem("highScore");
if (highScore == null) {
    highScore = 0;
}
let lives = 3;
let gameOver = false;
document.addEventListener("mousemove", function(event) {
    let rect = canvas.getBoundingClientRect();
    paddleX = event.clientX - rect.left - paddleWidth / 2;
    if (paddleX < 0) {
        paddleX = 0;
    }
    if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
});
function drawPaddle() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}
function drawBall() {
    ctx.fillStyle = "yellowgreen";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);
    ctx.fillText("High Score: " + highScore, 20, 60);
    ctx.fillText("Lives: " + lives, 20, 90);
}
function moveBall() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
}
function wallCollision() {
    if (ballX <= 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballSize >= canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }
}
function paddleCollision() {
    if (
        ballY + ballSize >= paddleY &&
        ballX + ballSize >= paddleX &&
        ballX <= paddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
        paddleWidth = paddleWidth - 5;
        if (paddleWidth < 20) {
            paddleWidth = 20;
        }
        score = score + 1;
        ballSpeedX = ballSpeedX * 1.1;
        ballSpeedY = ballSpeedY * 1.1;
    }
}
function checkLoose() {
    if (ballY > canvas.height) {
        lives = lives - 1;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 4;
        ballSpeedY = 4;
        if (lives == 0) {
            gameOver = true;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
            }
        }
    }
}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameOver == true) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", 280, 220);
        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText("Final Score: " + score, 300, 270);
        return;
    }
    drawPaddle();
    drawBall();
    drawScore();
    moveBall();
    wallCollision();
    paddleCollision();
    checkLoose();
    requestAnimationFrame(gameLoop);
}
gameLoop();