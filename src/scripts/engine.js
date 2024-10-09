const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
    timerId: setInterval(randomSquare, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    alert("Game Over! Your final score is " + state.values.result);
  }
}

function playSound() {
  let audio = new Audio("./src/audios/hit.m4a");
  audio.volume = 0.2;
  audio.play();
} // resolver bug audio

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }

      if (square.classList.contains("enemy")) {
        state.view.score.textContent =
          parseInt(state.view.score.textContent) + 1;
        clearInterval(state.values.timerId);
        moveEnemy();        
      }else {
        state.view.lives.textContent = parseInt(state.view.lives.textContent) - 1;
      
        if(state.view.lives.textContent < 0){          
          alert("Game Over! Your final score is " + state.values.result);
         
          restartGame() ;

        }
      }
    });
  });
}

function restartGame() {
  state.values.result = 0;
  state.view.score.textContent = state.values.result;
  state.values.currentTime = 60;
  state.view.timeLeft.textContent = state.values.currentTime;
  state.view.lives.textContent = 3;
  state.actions.countDownTimerId = setInterval(countDown, 1000);
  state.actions.timerId = setInterval(randomSquare, 1000);
  }

function main() {
  addListenerHitBox();
 
}

main();

