"use strict";

let backgroundSpace = document.getElementById('space');
let gameDiv = document.getElementById('playGame');
let menuDiv = document.getElementById('mainMenu');
let lifesDiv = document.getElementById('userLifes');
let gameOverDiv = document.getElementById('gameOver');
let gameOverScore = document.getElementById('gameOverScore');
let backToMenuBtn = document.getElementById('backToMenu');
let scoreCounter = document.getElementById('scoreCounter');
let isPlaying = false;
let bottomBorder = document.getElementById('line');
let theMoon = new MainMoon(document.getElementById('moon'));
let theRocket = new TheRocket(document.getElementById('rocket'));
let aPoints = new Points();
let removedLifes = [];
let angryMoons = [];
let nameInput = document.getElementById('nickname');
let playerName;
let userFinalObject = {};
let audioForMainMenu = new Audio('sounds/mainMenuTheme.mp3');
let mainTheme = new Audio('sounds/mainTheme.mp3');
let hitSound = new Audio('sounds/hitTheMoon.mp3');
let shootSound = new Audio('sounds/rocketShoot.mp3');


window.onload = startDocument;

backToMenuBtn.onclick = () => { location.hash = 'mainMenu' };

function startDocument() {
    location.hash = 'mainMenu';
    switchToStateFromURL();
    read();
}

function gameStart() {
    if (isPlaying) return;
    isPlaying = true;
    menuDiv.style.display = 'none';
    gameOverDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    theMoon.animate();
    backgroundSpace.addEventListener('click', theRocket.animate);
    scoreCounter.innerHTML = aPoints.playerScore;
    mainTheme.loop = true;
    mainTheme.volume = 0.5;
    mainTheme.play();
    window.onbeforeunload = function () {
        return false;
    }

    if (nameInput.value) playerName = nameInput.value;
    else playerName = 'user';
}

function gameStop() {
    let userIsLeave;

    confirmLeave();

    function confirmLeave() {
        if (isPlaying) {
            {
                userIsLeave = confirm('Are you sure you want leave? All progress will be lost');
                if (userIsLeave) {
                    clearScreen();
                    gameOverDiv.style.display = 'none';
                    menuDiv.style.display = 'flex';
                } else location.hash = 'game';
            }
        } else {
            return;
        }
    }
    clearScreen();
    gameOverDiv.style.display = 'none';
    menuDiv.style.display = 'flex';
    aPoints.playerScore = 0;
}

function gameOver() {
    clearScreen();
    menuDiv.style.display = 'none';
    gameOverDiv.style.display = 'flex';
    gameOverScore.innerHTML = `Your score: ${aPoints.playerScore}`;
    userFinalObject = { name: playerName, score: aPoints.playerScore };
    updateScoreArray(userFinalObject);
    read();
    aPoints.playerScore = 0;
}

function clearScreen() {
    isPlaying = false;
    gameDiv.style.display = 'none';
    theMoon.timerOff();
    backgroundSpace.removeEventListener('click', theRocket.animate);
    theMoon.hitScore = 0;
    mainTheme.pause();
    mainTheme.currentTime = 0;
    usersLifesBack();
    window.onbeforeunload = function () {
        return null;
    }

    if (angryMoons.length) {
        backgroundSpace.querySelectorAll('div.angryMoon').forEach(element => backgroundSpace.removeChild(element));
    }
}


//делаем SPA    
let spaState = {};
let startGameBtn = document.getElementById('gameStart');

window.addEventListener('hashchange', switchToStateFromURL);
startGameBtn.addEventListener('click', newGame);

function switchToStateFromURL() {
    let UrlHash = window.location.hash;
    let UrlState = UrlHash.substr(1);

    if (UrlState != "") {
        spaState = { pagename: UrlState };
    } else spaState = { pagename: "mainMenu" }

    switch (spaState.pagename) {
        case 'mainMenu':
            gameStop();
            break;

        case 'game':
            gameStart();
            break;

        case 'gameOver':
            gameOver();
            break;
    }
}

function switchToState(newState) {
    let stateStr = newState.pagename;
    location.hash = stateStr;
}

function newGame() {
    switchToState({ pagename: 'game' });
}

function mainMenu() {
    switchToState({ pagename: 'mainMenu' });
}

//убераем жизнь при промахе или попаданию по злой луне
function removeUserLife() {
    let lifesArray = lifesDiv.children;
    if (lifesArray.length) {
        let removeChild = lifesDiv.removeChild(lifesArray[lifesArray.length - 1]);
        removedLifes.push(removeChild);
    } else {
        location.hash = 'gameOver';
    }
}

//восстанавливаем жизни
function usersLifesBack() {
    if (removedLifes) {
        removedLifes.forEach(element => lifesDiv.appendChild(element));
    }
}