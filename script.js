let GRAVITY = 7.5;
let GAP = 25;
let BIRD_POS = 250;
let JUMP = 50;
let SCORE = 0;
let gameStarted = false;

let bird = document.querySelector(".bird");
let pipes = [...document.querySelectorAll(".pipe")];
let score = document.querySelector(".score span");

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  window.removeEventListener("keyup", startGame);
  play();
}
function play() {
  setInterval(() => {
    const randomHeight = Math.floor(Math.random() * 50) + 5;
    pipes[1].style.height = `${randomHeight}%`;
    pipes[0].style.height = `${100 - (randomHeight + GAP)}%`;
    pipes[0].style.top = `${randomHeight + GAP}%`;
    SCORE += 10;
  }, 3000);
  window.addEventListener("keyup", function (e) {
    if (e.code !== "Space") return;
    BIRD_POS -= JUMP;
  });

  setInterval(() => {
    BIRD_POS += GRAVITY;

    if (BIRD_POS >= 550) gameOver();
    if (BIRD_POS <= 0) BIRD_POS = 0;

    if (collided(bird, pipes[0]) || collided(bird, pipes[1])) gameOver();
  }, 100);

  setInterval(() => {
    bird.style.top = `${BIRD_POS}px`;
    score.innerText = SCORE;
  }, 100);
}

function collided(source, target) {
  var sourceRect = source.getBoundingClientRect();

  var targetRect = target.getBoundingClientRect();

  return (
    sourceRect.right >= targetRect.left &&
    sourceRect.left <= targetRect.right &&
    sourceRect.bottom >= targetRect.top &&
    sourceRect.top <= targetRect.bottom
  );
}
function gameOver() {
  window.location.reload();
}

window.addEventListener("keyup", function (e) {
  if (e.code === "Space") {
    startGame();
  }
});
