
"use strict";

function ClockViewSVG() {

    let myModel = null;
    let myField = null;
    let hourArrow = null;
    let minuteArrow = null;
    let secondArrow = null;
    let dateDiv = null;
    let secondArrowAngle; //угол секундной стрелки
    let minuteArrowAngle; //угол минутной стрелки
    let hourArrowAngle; //угол часовой стрелки
    let clockCenterX;
    let clockCenterY;

    this.start = function (model, field) {
        myModel = model;
        myField = field;

        hourArrow = myField.querySelector('.hourArrow');
        minuteArrow = myField.querySelector('.minuteArrow');
        secondArrow = myField.querySelector('.secondArrow');
        dateDiv = myField.querySelector('.dateDiv');
        let clock = myField.querySelector('svg > circle');
        clockCenterX = clock.getAttribute('cx');
        clockCenterY = clock.getAttribute('cy');
    }

    this.updateTime = function () {

        dateDiv.innerHTML = formatTime();
        rotateArrow(secondArrow, secondArrowAngle);
        rotateArrow(minuteArrow, minuteArrowAngle);
        rotateArrow(hourArrow, hourArrowAngle);


        function formatTime() {
            let hours = myModel.hours;
            let minutes = myModel.minutes;
            let seconds = myModel.seconds;
            secondArrowAngle = seconds * 6; //задаем угол поворота секундной стрелки: количество секунд умноженное на градус одного деления (360/60)
            minuteArrowAngle = minutes * 6; //тоже самое с минутной стрелкой
            //0.5 - количество градусов проходимое часовой стрелкой за минуту
            //30 - размер часового деления на часах (градусов)
            hourArrowAngle = (hours > 12) ? ((hours - 12) * 30 + minutes * 0.5) : (hours * 30 + minutes * 0.5); //преобразуем в 12-часовой формат и вычисляем положения часовой стрелки


            function addZero(val) {
                if (val.toString().length == 1) return 0 + val.toString();
                else return val.toString();
            }

            return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
        }

        function rotateArrow(arrow, angle) {
            if (angle >= 360) angle = 0;
            arrow.setAttribute('transform', `rotate(${angle},${clockCenterX},${clockCenterY})`);
        }
    }

}