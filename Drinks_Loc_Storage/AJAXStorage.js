"use strict";

/*class AJAXStorage {

    url = 'https://fe.it-academy.by/AjaxStringStorage2.php';
    updatePassword;

    constructor(itemName) {

        this.name = `MITRICHENKO_AJAXStorage_${itemName}`;

    }

    insert(val) {
        $.ajax({
            url: url, type: 'POST', cache: false, dataType: 'json',
            data: { f: 'INSERT', n: this.name, v: val }
        })
    }


    read() {
        $.ajax(
            {
                url: url, type: 'POST', cache: false, dataType: 'json',
                data: { f: 'READ', n: stringName },
                success: readReady, error: errorHandler
            }
        );


        function readReady(callresult) {
            if (callresult.error != undefined)
                alert(callresult.error);
            else if (callresult.result != "") {
                var info = JSON.parse(callresult.result);
                document.getElementById('IName').value = info.name;
                document.getElementById('IAge').value = info.age;
            }
        }

        function errorHandler(error) {
            console.log(error);
        }
    }


    update() {
        updatePassword = Math.random();
        $.ajax({
            url: url, type: 'POST', cache: false, dataType: 'json',
            data: { f: 'LOCKGET', n: this.name, p: updatePassword },
            success: lockGetReady, error: errorHandler
        }
        );

        function lockGetReady(callresult) {
            if (callresult.error != undefined)
                alert(callresult.error);
            else {
                $.ajax({
                    url: url, type: 'POST', cache: false, dataType: 'json',
                    data: { f: 'UPDATE', n: this.name, v: val, p: updatePassword },
                    success: updateReady, error: errorHandler
                }
                );
            }
        }

        function updateReady(callresult) {
            if (callresult.error != undefined)
                alert(callresult.error);
        }

        function errorHandler(error) {
            console.log(error);
        }
    }
}*/
console.log('ebaaat');