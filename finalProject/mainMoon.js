"use strict";


function MainMoon(moon) { 

    let self = this;
    let theMoon = moon;
    let newMoon;
    self.offsetHeight = moon.offsetHeight;
    self.offsetWidth = moon.offsetWidth;
    self.posX = 0;
    self.posY = 0;
    let speedX = 2;
    let speedY = 1;
    let hitMoon = false;
    let hitCounter = 0;
    self.hitScore = 0;
    let speedYhit = 5;
    let gameTimer = null;
    self.mouth = document.getElementById('mouth');
    self.mouthTop = self.posY + self.mouth.getAttribute('cy');
    self.mouthLeft = self.posX + self.mouth.getAttribute('cx');


    MainMoon.prototype.animate = function () {
        self.posX += speedX;
        self.posY += speedY;

        theMoon.style.transform = `translateX(${self.posX}px) translateY(${self.posY}px) translateZ(0)`;

        if (self.posX + theMoon.offsetWidth >= backgroundSpace.offsetWidth) {
            self.posX = backgroundSpace.offsetWidth - theMoon.offsetWidth;
            speedX = -speedX;
        } else if (self.posX <= 0) {
            self.posX = 0;
            speedX = -speedX;
        }

        if (self.posY + theMoon.offsetHeight >= bottomBorder.offsetTop) {
            self.posY = bottomBorder.offsetTop - theMoon.offsetHeight;
            speedY = -speedY;
        } else if (self.posY <= 0) {
            self.posY = 0;
            speedY = -speedY;
        }

        if (!hitMoon) gameTimer = requestAnimationFrame(self.animate);

    }

    MainMoon.prototype.timerOff = function () {
        if (gameTimer) {
            cancelAnimationFrame(gameTimer);
            gameTimer = null;
            self.posX = 0;
            self.posY = 0;
            speedX = 2;
            speedY = 1;
        }
    }

    MainMoon.prototype.hitTheMoon = function () {
        speedY *= 1.1;
        speedX *= 1.1;
        //иммитируем удар по луне снизу
        function animateHitting() {
            hitCounter++;
            hitMoon = true;
            theMoon.style.top = theMoon.offsetTop - speedYhit + 'px';

            if (hitCounter == 5) speedYhit = -speedYhit;
            if (hitCounter == 10) {
                hitMoon = false;
                self.hitScore++;
                hitCounter = 0;
                speedYhit = -speedYhit;
                self.animate();
                return;
            }
            requestAnimationFrame(animateHitting);
        }
        hitSound.volume = 0.5;
        hitSound.play();
        animateHitting();

        //добавляем злую луну
        if(self.hitScore == 2) {
            newMoon = new AngryMoon(self.posX, self.posY);
            newMoon.create();
            angryMoons.push(newMoon);
            if (angryMoons.length < 4) self.hitScore = 0;  // если злых лун меньше 4, добавляем еще
        }
        
    }

}



/*class MainMoon {

    constructor(moon) {
        this.theMoon = moon
        this.offsetHeight = moon.offsetHeight;
        this.offsetWidth = moon.offsetWidth;
        this.posX = 0;
        this.posY = 0;
        this.speedX = 2;
        this.speedY = 1;
        this.hitMoon = false;
        this.hitCounter = 0;
        this.hitScore = 0;
        this.speedYhit = 5;
        this.gameTimer = null;
        this.mouth = document.getElementById('mouth');
        this.mouthTop = self.posY + self.mouth.getAttribute('cy');
        this.mouthLeft = self.posX + self.mouth.getAttribute('cx');
    }


    animate () {
        this.posX += this.speedX;
        this.posY += this.speedY;

        this.theMoon.style.transform = `translateX(${this.posX}px) translateY(${this.posY}px) translateZ(0)`;

        if (this.posX + this.theMoon.offsetWidth >= backgroundSpace.offsetWidth) {
            this.posX = backgroundSpace.offsetWidth - this.theMoon.offsetWidth;
            this.speedX = -this.speedX;
        } else if (this.posX <= 0) {
            this.posX = 0;
            this.speedX = -this.speedX;
        }

        if (this.posY + this.theMoon.offsetHeight >= bottomBorder.offsetTop) {
            this.posY = bottomBorder.offsetTop - this.theMoon.offsetHeight;
            this.speedY = -this.speedY;
        } else if (this.posY <= 0) {
            this.posY = 0;
            this.speedY = -this.speedY;
        }

        if (!this.hitMoon) this.gameTimer = requestAnimationFrame(this.animate.bind(this));

    }

    timerOff () {
        if (this.gameTimer) {
            cancelAnimationFrame(this.gameTimer);
            this.gameTimer = null;
            this.posX = 0;
            this.posY = 0;
        }
    }

    hitTheMoon () {
        
        //иммитируем удар по луне снизу
        function animateHitting() {
            this.hitCounter++;
            this.hitMoon = true;
            this.theMoon.style.top = this.theMoon.offsetTop - this.speedYhit + 'px';

            if (this.hitCounter == 5) this.speedYhit = -this.speedYhit;
            if (this.hitCounter == 10) {
                this.hitMoon = false;
                this.hitScore++;
                this.hitCounter = 0;
                this.speedYhit = -this.speedYhit;
                this.animate();
                return;
            }
            requestAnimationFrame(animateHitting.bind(this));
        }

        animateHitting.bind(this)();
    }

}*/




