let pbtm = document.querySelector(".pbtm")
let ptop = document.querySelector(".ptop")
let gameOverScreen = document.querySelector(".gameOver")
let home = document.querySelector(".home")

let gameTime = 60;
let timer = gameTime;
let score = 0;
let hitRn;
let timeInt;

//audios
const gameOverMusic = new Audio("./audios/gameOver.mp3")
const correctSound = new Audio('./audios/correct.mp3');
const wrongSound = new Audio('./audios/wrong.mp3');
const startMusic = new Audio('./audios/start.mp3');
const heartbeat = new Audio('./audios/heartbeat1.mp3');


let makeBubbles = () => {
    let clutter = "";
    let loopcount;

    if (window.innerWidth <= 768) {
        loopcount = 160;
    } else {

        loopcount = 319;
    }
    console.log(loopcount);
    
    for (let i = 1; i <= loopcount; i++) {
        clutter += `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`
    }

    pbtm.innerHTML = clutter;
}

let runTimer = () => {
    clearInterval(timeInt);
    timer = gameTime;
    document.querySelector("#timer").textContent = timer;
    timeInt = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timer").textContent = timer;

            if(timer<=10){
                heartbeat.play();
            }

        }
        else {
            clearInterval(timeInt)
            gameOver();
        }
    }, 1000)
}

let changeHit = () => {
    hitRn = Math.floor(Math.random() * 10);
    document.querySelector("#hitRn").textContent = hitRn;

}

let updateScore = () => {
    score = 0;
    document.querySelector("#score").textContent = score;
    pbtm.onclick = (dets) => {
        if (Number(dets.target.textContent) === hitRn) {
            correctSound.play();
            score += 10;
            timer = timer+2;
            changeHit();
            makeBubbles();
        } else if ((Number(dets.target.textContent)) == Infinity) {
        } else {
            wrongSound.play();
            score -= 10;
            timer = timer-5;
            changeHit();
            makeBubbles();
        }
        document.querySelector("#score").textContent = score;

    };
}

let gameOver = () => {
    gameOverMusic.play();
    pbtm.style.display = "none";
    ptop.style.display = "none";
    home.style.display = "none";
    gameOverScreen.style.display = "flex";
    document.querySelector("#urScore").textContent = score;
}

let game = () => {
    startMusic.play();
    home.style.display = "none";
    gameOverScreen.style.display = "none";
    pbtm.style.display = "flex";
    ptop.style.display = "flex";
    makeBubbles();
    changeHit();
    updateScore();
    runTimer();
};

let tryAgain = () => {
    score = 0;
    game();

}

let playGame = () => {
    document.querySelector("#start").addEventListener("click", () => {
        game();
    })
    document.querySelector("#tryAgain").onclick = () => tryAgain();
}

playGame();