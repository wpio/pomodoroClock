var loop = false;
var checkBox = document.getElementById("checkBox");
checkBox.addEventListener('change', (event) => {
    if (event.target.checked) {
        loop = true;
    } else {
        loop = false;
    }
});


var x = document.getElementById("myAudio");
const viewer = document.getElementById('viewer');
var isRunning = false;
var pausedTime = 0;
var restart = document.getElementById('valorPomodoro').value;
var startTime = document.getElementById('valorPomodoro').value;
var control;
var modeRunning = 'pomodoro';
var numberSessions = 0;

function setTimers(action) {

    switch (action) {
        case 'plusPomodoro':
            var valorPomodoro = document.getElementById('valorPomodoro').value;
            document.getElementById('valorPomodoro').value = Number(valorPomodoro) + 1;
            break;
        case 'minusPomodoro':
            var valorPomodoro = document.getElementById('valorPomodoro').value;
            if (valorPomodoro > 1) {
                document.getElementById('valorPomodoro').value = Number(valorPomodoro) - 1;
            }
            break;
        case 'plusShort':
            var valorShort = document.getElementById('valorShort').value;
            document.getElementById('valorShort').value = Number(valorShort) + 1;
            break;
        case 'minusShort':
            var valorShort = document.getElementById('valorShort').value;
            if (valorShort > 1) {
                document.getElementById('valorShort').value = Number(valorShort) - 1;
            }
            break;
        case 'plusLong':
            var valorLong = document.getElementById('valorLong').value;
            document.getElementById('valorLong').value = Number(valorLong) + 1;
            break;
        case 'minusLong':
            var valorLong = document.getElementById('valorLong').value;
            if (valorLong > 1) {
                document.getElementById('valorLong').value = Number(valorLong) - 1;
            }
            break;

    }
}

function setMode(action) {
    switch (action) {


        case 'pomodoro':
            document.body.style.backgroundColor = "rgb(240, 91, 86)";
            clearInterval(control);
            var startTime = document.getElementById('valorPomodoro').value;
            if (startTime < 1) {
                alert("Valor em minutos deve ser maior ou igual a 1");
                document.getElementById('valorPomodoro').value = 1;
                startTime = 1;
            }
            time = startTime * 60;
            countdown();
            restart = startTime;
            modeRunning = 'pomodoro';
            isRunning = true;
            control = setInterval(countdown, 1000);

            break;
        case 'short':
            document.body.style.backgroundColor = "#279bbe";
            clearInterval(control);
            var startTime = document.getElementById('valorShort').value;
            if (startTime < 1) {
                alert("Valor em minutos deve ser maior ou igual a 1");
                document.getElementById('valorShort').value = 1;
                startTime = 1;
            }
            time = startTime * 60;
            countdown();
            restart = startTime;
            modeRunning = 'short';
            isRunning = true;
            control = setInterval(countdown, 1000);

            break;


        case 'long':
            document.body.style.backgroundColor = "#46a046";
            clearInterval(control);
            var startTime = document.getElementById('valorLong').value;
            if (startTime < 1) {
                alert("Valor em minutos deve ser maior ou igual a 1");
                document.getElementById('valorLong').value = 1;
                startTime = 1;
            }
            time = startTime * 60;
            countdown();
            restart = startTime;
            modeRunning = 'long';
            isRunning = true;
            control = setInterval(countdown, 1000);

            break;

    }

};



function play() {
    if (!isRunning) {
        isRunning = true;

        if (pausedTime == 0) {

            time = startTime * 60;
            restart = startTime;
            countdown();
        } else {
            time = pausedTime;
        }

        control = setInterval(countdown, 1000);
    }
};

$("#pause").on("click", function () {
    pausedTime = time;
    clearInterval(control);
    isRunning = false;
});

function reStart() {
    if (isRunning) {
        clearInterval(control);
        startTime = restart;
        time = startTime * 60;

        control = setInterval(countdown, 1000);
    } else {
        pausedTime = 0;
        clearInterval(control);
        startTime = restart;
        time = startTime * 60;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        viewer.innerHTML = minutes + ":" + seconds;
    }
};

function countdown() {
    if (time >= 0) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        viewer.innerHTML = minutes + ":" + seconds;
        document.title = modeRunning+" - "+ viewer.textContent;
        time--;
        if (time < 0) {

            x.play();
            //setTimeout(function () { clearInterval(control); }, 1500);
            if (loop) {
                if (modeRunning == 'short') { numberSessions++; }

                switch (modeRunning) {
                    case 'pomodoro':
                        setMode('short');
                        break;
                    case 'short':

                        if (numberSessions <= 4) {
                            setMode('pomodoro');
                        } else {
                            setMode('long');
                        }
                        break;
                    case 'long':
                        numberSessions = 0;
                        setMode('pomodoro')
                        break;
                }
            }
        }
    }


};