
"use strict";

function ClockViewCanvas() {

    let myModel = null;
    let myField = null;
    let canvas = null;
    let context = null;
    let clockCenterX = null;
    let clockCenterY = null;
    let clockRadius = null; // радиус немного меньше размеров канваса для красоты
    let hourRadius = 15; //радиус маленьких кругов;
    let oneHourAngle = 120; //угол соответствующий "часу";
    let secondArrowAngle; //угол секундной стрелки
    let minuteArrowAngle; //угол минутной стрелки
    let hourArrowAngle; //угол часовой стрелки

    this.start = function (model, field) {
        myModel = model;
        myField = field;
        canvas = myField.querySelector('canvas');
        context = canvas.getContext('2d');
        clockCenterX = canvas.width / 2;
        clockCenterY = canvas.height / 2;
        clockRadius = canvas.width / 2 - 5;
    }

    this.updateTime = function() {

      //  let currTime = new Date();

        //рисуем циферблат
        context.beginPath();
        context.arc(clockCenterX, clockCenterY, clockRadius, 0, Math.PI * 2, false);
        context.fillStyle = 'darkgoldenrod';
        context.fill();

        //конвертация градусов в радианы
        function convertInRad(grad) {
            return grad * Math.PI / 180;
        }

        //строим круги для "часов"
        for (let i = 1; i <= 12; i++) {
            let hourCenterX = clockCenterX - 0.85 * clockRadius * Math.cos(convertInRad(oneHourAngle));
            let hourCenterY = clockCenterY - 0.85 * clockRadius * Math.sin(convertInRad(oneHourAngle));
            context.beginPath();
            context.arc(hourCenterX, hourCenterY, hourRadius, 0, Math.PI * 2, false);
            context.fillStyle = 'gray';
            context.fill();

            context.fillStyle = 'white';
            context.font = 'italic 15px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(`${i}`, hourCenterX, hourCenterY);
            oneHourAngle += 30;
        }

        //height задается в долях от радиуса (1 - радиус, 0.5 - половина)
        function buildArrow(width, height, angle) {
            let destX = clockCenterX + height * clockRadius * Math.sin(convertInRad(angle));
            let destY = clockCenterY - height * clockRadius * Math.cos(convertInRad(angle));
            context.beginPath();
            context.moveTo(clockCenterX, clockCenterY);
            context.lineWidth = width;
            context.lineTo(destX, destY);
            context.lineCap = 'round';
            context.strokeStyle = 'black';
            context.stroke();
        }

        //рисуем цифровые часы и строим стрелки
        context.fillStyle = 'white';
        context.font = 'italic 15px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`${formatTime()}`, clockCenterX, clockCenterY - 20);
        buildArrow(7, 0.75, hourArrowAngle); //часовая стрелка
        buildArrow(5, 0.8, minuteArrowAngle); //минутная стрелка
        buildArrow(3, 0.85, secondArrowAngle); //секундная стрелка

        //рассчитываем нужные углы, приводим время к нужному формату
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
    }
}