"use strict";

function Clock(timezone) {

    this.currTime = null;
    this.hours = null;
    this.minutes = null;
    this.seconds = null;
    let myView = null;
    let timer;
    this.isTick = false;

    this.start = function (view) {
        myView = view;
    }

    this.updateView = function () {
        myView.updateTime();
    }


    this.tick = function () {
        this.currTime = new Date();
        this.hours = this.currTime.getUTCHours() + timezone;
        if (this.hours < 0) this.hours += 24;
        else if (this.hours > 24) this.hours -= 24;
        else if (this.hours == 24) this.hours = 0;
        this.minutes = this.currTime.getUTCMinutes();
        this.seconds = this.currTime.getUTCSeconds();
        this.isTick = true;
        this.updateView();
        timer = setTimeout(() => this.tick(), 1000 - this.currTime.getMilliseconds());
    }

    this.stop = function () {
        clearTimeout(timer);
        this.isTick = false;
    }

}


