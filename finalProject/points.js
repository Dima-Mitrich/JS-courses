"use strict";

function Points() {

    let self = this;
    let points = document.getElementById('points');
    let scoreCounter = document.getElementById('scoreCounter');
    self.playerScore = 0;
    let gameZone = bottomBorder.offsetTop / 10;

    //функция появления количества очков при попадании
    self.showPoints = function () {
        let countPoints;

        if (theMoon.posY < gameZone * 1) countPoints = 10;
        else if (theMoon.posY <= gameZone * 2) countPoints = 9; 
        else if (theMoon.posY <= gameZone * 3) countPoints = 8;
        else if (theMoon.posY <= gameZone * 4) countPoints = 7;
        else if (theMoon.posY <= gameZone * 5) countPoints = 6;
        else if (theMoon.posY <= gameZone * 6) countPoints = 5;
        else if (theMoon.posY <= gameZone * 7) countPoints = 4;
        else if (theMoon.posY <= gameZone * 8) countPoints = 3;

        self.playerScore += countPoints;
        scoreCounter.innerHTML = `${self.playerScore}`;

        points.style.backgroundImage = `url(images/${countPoints}.png)`
        points.style.top = theMoon.posY + theMoon.offsetHeight + 'px';
        points.style.left = theMoon.posX + 'px';
        points.style.width = 60 + 'px';
        points.style.height = 60 + 'px';
        points.style.opacity = 0;

        points.addEventListener('transitionend', goBack);

        function goBack(event) {
            event = event || window.event;
            if (event.propertyName == 'width') points.style.width = 20 + 'px';
            if (event.propertyName == 'height') points.style.height = 30 + 'px';
            if (event.propertyName == 'opacity') {
                points.style.opacity = 1;
                points.style.backgroundImage = 'none';
            }
        }
    }

}