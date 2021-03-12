"use strict";

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
            stopTheGame();
            break;

        case 'game':
            startTheGame();
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

switchToStateFromURL();