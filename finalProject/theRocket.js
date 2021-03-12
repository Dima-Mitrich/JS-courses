"use strict";

function TheRocket(rocket) {
    let self = this;
    let theRocket = rocket;
    let isRocketFlying = false;
    let speedRocket = 5;
    let myCanvas = document.getElementById('myCanvas');
    let theBoom = document.getElementById('boom'); 
    let ctx = myCanvas.getContext('2d');
    let frames = 8;
    let currentFrame = 0;
    let spriteImg = new Image();
    spriteImg.src = 'images/css_sprites (3).png';


    self.animate = function (event) {
        if (isRocketFlying == true) return;

        event = event || window.event;
        theRocket.style.display = 'block';
        theRocket.style.top = backgroundSpace.offsetHeight + 'px';
        theRocket.style.left = event.clientX - backgroundSpace.offsetLeft - theRocket.offsetWidth / 2 + 'px';
        shootSound.volume = 0.2;
        shootSound.play();

        function pusk() {
            isRocketFlying = true;
            theRocket.style.top = theRocket.offsetTop - speedRocket + 'px';

            if (theRocket.offsetTop + 10 <= theMoon.posY + theMoon.offsetHeight && theRocket.offsetTop > theMoon.posY + theMoon.offsetHeight / 2 && theRocket.offsetLeft + theRocket.offsetWidth / 2 >= theMoon.posX && theRocket.offsetLeft + theRocket.offsetWidth / 2 <= theMoon.posX + theMoon.offsetWidth) {
                targetMainMoon(theRocket.offsetLeft, theRocket.offsetTop);
                theRocket.style.display = 'none';
                isRocketFlying = false;
                return;
            }

            if (angryMoons.length) {
                for (let i = 0; i < angryMoons.length; i++) {
                    if (theRocket.offsetTop + 10 <= angryMoons[i].posY + angryMoons[i].offsetHeight && theRocket.offsetTop > angryMoons[i].posY + angryMoons[i].offsetHeight / 2 && theRocket.offsetLeft + theRocket.offsetWidth / 2 >= angryMoons[i].posX && theRocket.offsetLeft + theRocket.offsetWidth / 2 <= angryMoons[i].posX + angryMoons[i].offsetWidth) {
                        boomDraw(theRocket.offsetLeft, theRocket.offsetTop);
                        angryMoons[i].destroy(angryMoons[i].posX, angryMoons[i].posY);
                        angryMoons.splice(i, 1)
                        theRocket.style.display = 'none';
                        isRocketFlying = false;
                        removeUserLife();
                        return;
                    }
                }
            }

            if (theRocket.offsetTop + theRocket.offsetHeight > 0) requestAnimationFrame(pusk);
            else {
                isRocketFlying = false;
                removeUserLife();
            }
        }
        pusk();
    }

    //рисуем взрыв
    let boomDraw = function (x, y) {
        theBoom.style.top = y + theBoom.offsetHeight / 2 + 'px';
        theBoom.style.left = x + theBoom.offsetWidth / 2 + 'px';
        theBoom.style.display = 'block';

        function boom() {
            let drawTimer;
            ctx.clearRect(0, 0, 120, 90);
            ctx.drawImage(spriteImg, 0, 90 * currentFrame, 120, 90, 0, 0, 120, 90);

            if (currentFrame == frames) {
                currentFrame = 0;
                clearTimeout(drawTimer);
                theBoom.style.display = 'none';
                return;
            } else {
                currentFrame++;
            }
            drawTimer = setTimeout(boom, 40);
        }
        boom();
    }

    let targetMainMoon = function (hitX, hitY) {
        boomDraw(hitX, hitY);
        theMoon.hitTheMoon();
        aPoints.showPoints();
    }
}