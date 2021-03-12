"use strict";

function AngryMoon(x, y) {

    let self = this;
    self.posX = x;
    self.posY = y;
    self.creatingNewMoon = false;
    let moon = document.createElement('div');
    moon.style.backgroundImage = 'url(images/angryMoon.png)';
    moon.style.width = '50px';
    moon.style.height = '50px';
    moon.style.position = 'absolute';
    moon.style.top = `${self.posY}px`;
    moon.style.left = `${self.posX}px`;
    moon.style.borderRadius = '50%';
    moon.style.backgroundRepeat = 'no-repeat';
    moon.style.backgroundSize = '100%';
    moon.style.boxShadow = '0 0 5px red, 0 0 20px red, 0 0 30px red';
    moon.style.transition = 'opacity 2s';
    moon.style.opacity = 0;
    moon.className = 'angryMoon';
    backgroundSpace.appendChild(moon);
    self.offsetWidth = moon.offsetWidth;
    self.offsetHeight = moon.offsetHeight;
    let speedX = 2;
    let speedY = 1;

    let myCanvas = document.getElementById('myCanvas1');
    let theBoom = document.getElementById('boom1');
    let ctx = myCanvas.getContext('2d');
    let frames = 8;
    let currentFrame = 0;
    let spriteImg = new Image();
    spriteImg.src = 'images/boomMoon.png';


    self.animate = function () {
        self.posX += speedX;
        self.posY += speedY;

        moon.style.top = self.posY + 'px';
        moon.style.left = self.posX + 'px';

        if (self.posX + moon.offsetWidth >= backgroundSpace.offsetWidth) {
            self.posX = backgroundSpace.offsetWidth - moon.offsetWidth;
            speedX = -speedX;
        } else if (self.posX <= 0) {
            self.posX = 0;
            speedX = -speedX;
        }

        if (self.posY + moon.offsetHeight >= bottomBorder.offsetTop) {
            self.posY = bottomBorder.offsetTop - moon.offsetHeight;
            speedY = -speedY;
        } else if (self.posY <= 0) {
            self.posY = 0;
            speedY = -speedY;
        }

        if (theRocket.offsetTop + 10 <= self.posY + moon.offsetHeight && theRocket.offsetTop > self.posY + moon.offsetHeight / 2 && theRocket.offsetLeft + theRocket.offsetWidth / 2 >= self.posX && theRocket.offsetLeft + theRocket.offsetWidth / 2 <= self.posX + moon.offsetWidth) {
            console.log('here we go');
            return;
        }

        requestAnimationFrame(self.animate);
    }

    self.create = function () {

        setTimeout(changeOpacity, 0);

        function changeOpacity() {
            self.creatingNewMoon = true;
            moon.style.opacity = 1;
        }
        moon.addEventListener('transitionend', self.animate);
    }


    self.destroy = function (x, y) {
        theBoom.style.top = y + theBoom.offsetHeight / 2 + 'px';
        theBoom.style.left = x + theBoom.offsetWidth / 2 + 'px';
        theBoom.style.display = 'block';

        function boom() {
            let drawTimer;
            ctx.clearRect(0, 0, 60, 60);
            ctx.drawImage(spriteImg, 0, 60 * currentFrame, 60, 60, 0, 0, 60, 60);

            if (currentFrame == frames) {
                currentFrame = 0;
                clearTimeout(drawTimer);
                theBoom.style.display = 'none';
                return;
            } else {
                currentFrame++;
            }
            drawTimer = setTimeout(boom, 60);
        }
        boom();
        backgroundSpace.removeChild(moon);
    }
}


