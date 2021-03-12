"use strict";

let ajaxHandlerScript = 'https://fe.it-academy.by/AjaxStringStorage2.php';
let usersArray = [];
let updatePassword = Math.random();
let tableScoreDiv = document.getElementById('topScores');
let scoreTableBtn = document.getElementById('scoreTable');
let closeTableBtn = document.getElementById('closeScoreTable');

scoreTableBtn.addEventListener('click', animateTableDiv);
closeTableBtn.addEventListener('click', animateTableDivBack);

function read() {
    // отдельно создаём набор POST-параметров запроса
    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', 'MITRICHENKO_GAME');


    fetch(ajaxHandlerScript, { method: 'post', body: sp })
        .then(response => response.json())
        .then(data => { usersArray = JSON.parse(data.result) }) //кладем в переменную массив с пользователями
        .then(() => { createTable() }) //и создаем таблицу
        .catch(error => { console.error(error); });
}


function insert(data) {
    let sp = new URLSearchParams();
    sp.append('f', 'INSERT');
    sp.append('n', 'MITRICHENKO_GAME');
    sp.append('v', data)

    fetch(ajaxHandlerScript, { method: 'post', body: sp })
        .then(response => response.text())
        .then(data => { console.log(data) })
        .catch(error => { console.error(error); });
}


function lockgetAndUpdate(password, newData) {
    let sp = new URLSearchParams();
    sp.append('f', 'LOCKGET');
    sp.append('n', 'MITRICHENKO_GAME');
    sp.append('p', password)

    fetch(ajaxHandlerScript, { method: 'post', body: sp })
        .then(() => { update(password, newData) })
        .catch(error => { console.error(error); });
}

function update(password, newData) {
    let sp = new URLSearchParams();
    sp.append('f', 'UPDATE');
    sp.append('n', 'MITRICHENKO_GAME');
    sp.append('p', password);
    sp.append('v', newData)

    fetch(ajaxHandlerScript, { method: 'post', body: sp })
        .then(response => response.text())
        .then(text => { console.log(text); })
        .catch(error => { console.error(error); });
}


//делаем максимальную длинну массива в 15 игроков и сортируем на месте по количеству очков
function updateScoreArray(obj) {
    if (usersArray.length > 14) {
        if (obj.score > usersArray[usersArray.length - 1].score) {  //сравниваем результат с последним элементом массива и если подходит то добавляем 
            usersArray.push(obj);
            usersArray = usersArray.sort((a, b) => a.score > b.score ? -1 : 1);
            usersArray.pop(); //удаляем последний результат который вытеснил новый
            lockgetAndUpdate(updatePassword, JSON.stringify(usersArray));
        } else alert("vash resultat ne popal v tablicu recordov");
    }
    else {
        usersArray.push(obj);
        usersArray = usersArray.sort((a, b) => a.score > b.score ? -1 : 1);
        lockgetAndUpdate(updatePassword, JSON.stringify(usersArray));
    }
}


function createTable() {
    let mainTable = document.createElement('table');
    let tr = document.createElement('tr')
    let th1 = document.createElement('th');
    th1.innerHTML = '#';
    tr.appendChild(th1);

    let th2 = document.createElement('th');
    th2.innerHTML = 'Name';
    tr.appendChild(th2);

    let th3 = document.createElement('th');
    th3.innerHTML = 'Score';
    tr.appendChild(th3);
    mainTable.appendChild(tr);

    for (let i = 0; i < usersArray.length; i++) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = `${i + 1}`;
        tr.appendChild(td);

        let td1 = document.createElement('td');
        td1.innerHTML = usersArray[i].name;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerHTML = usersArray[i].score;
        tr.appendChild(td2);

        mainTable.appendChild(tr);
    }

    mainTable.style.backgroundColor = 'white';
    mainTable.style.position = 'absolute';
    mainTable.style.width = 90 + '%';
    mainTable.style.height = 90 + '%';
    mainTable.style.left = '5%';
    mainTable.style.top = '5%';
    mainTable.style.boxShadow = '4px 4px 6px #000000';
    mainTable.style.textAlign = 'center';
    mainTable.style.font = 'bold 3em Arial, sans-serif;';
    mainTable.style.color = '#0d3967';
    mainTable.style.textShadow = '1px 1px 0 #cad5e2, 2px 2px 0 #cad5e2 , 3px 3px 0 #cad5e2, 4px 4px 0 #cad5e2, 5px 5px 0 #cad5e2;'
    mainTable.style.fontSize = 'xx-large';
    mainTable.style.borderRadius = '10%';

    tableScoreDiv.appendChild(mainTable);

    scoreTableBtn.removeAttribute('disabled');
    scoreTableBtn.style.backgroundColor = 'rgba(220, 0, 0, 1)';
}

function animateTableDiv() {
    tableScoreDiv.style.top = '5%';
}

function animateTableDivBack() {
    tableScoreDiv.style.top = '-100%';
}
