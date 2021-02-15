
"use strict";

function ClockControlButtons() { 

    let myModel = null;
    let myField = null;

    this.start = function (model, field) {
        myModel = model;
        myField = field;

        let startButton = myField.querySelector('.start');
        let stopButton = myField.querySelector('.stop');

        startButton.addEventListener('click', this.pusk);
        stopButton.addEventListener('click', this.stop)
    }

    this.pusk = function () {
        myModel.tick();
    }

    this.stop = function () {
        myModel.stop();
    }

}