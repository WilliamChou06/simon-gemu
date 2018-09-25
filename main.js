
var game = {
    count: 0,
    possib: ['#btnGreen', '#btnYellow', '#btnRed', '#btnBlue'],
    currentGame: [],
    player: [],
    sound: {
        btnGreen: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        btnYellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        btnRed: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        btnBlue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    },
    strict: false,
}


var power = 'off';




var offBtn = document.getElementById('offBtn');
var onBtn = document.getElementById('onBtn');
var displayText = document.getElementById('displayText');
var message = document.getElementById('message');
var strictBtn = document.getElementById('strictBtn');
var startBtn = document.getElementById('startBtn');

document.getElementById('switch').addEventListener('click', powerToggle);
startBtn.addEventListener('click', newGame);
strictBtn.addEventListener('click', function () {
    if (game.strict == false) {
        game.strict = true;
        strictBtn.style.background = 'green';
    } else if (game.strict == true) {
        game.strict = false;
        strictBtn.style.background = 'rgb(230, 230, 24)';
    }
})

var fourBtns = document.querySelectorAll('.fourBtns');
for (var i = 0; i < fourBtns.length; i++) {
    fourBtns[i].addEventListener('click', playerAdd);
}



function powerToggle() {

    if (power == 'off') {
        power = 'on';
        offBtn.style.visibility = 'hidden';
        onBtn.style.visibility = 'visible';
        displayText.style.display = 'inline-block';
        for (var i = 0; i < fourBtns.length; i++) {
            fourBtns[i].classList.remove('offline');
        };
        startBtn.classList.remove('offline');
    } else if (power == 'on') {
        power = 'off';
        offBtn.style.visibility = 'visible';
        onBtn.style.visibility = 'hidden';
        displayText.style.display = 'none';

        game.strict = false;
        strictBtn.style.background = 'rgb(230, 230, 24)';
        game.count = 0;
        game.currentGame = 0;
        game.player = 0;
        displayText.innerHTML = '--';

        for (var i = 0; i < fourBtns.length; i++) {
            fourBtns[i].classList.add('offline');
        };
        startBtn.classList.add('offline');
    }
}

function newGame() {
    clearGame();
}

function clearGame() {
    game.currentGame = [];
    game.count = 0;
    addCount();
}

function addCount() {
    game.count++;
    document.getElementById('displayText').innerHTML = game.count;
    generateMove()
}

function generateMove() {
    game.currentGame.push(game.possib[Math.floor(Math.random() * 4)]);
    showMoves();
}

function showMoves() {
    var i = 0;
    var moves = setInterval(function () {
        playMoves(game.currentGame[i]);
        i++;
        if (i >= game.currentGame.length) {
            clearInterval(moves);
        }
    }, 650);

    clearPlayer();
}

function playMoves(btn) {
    document.querySelector(btn).classList.add('hover');
    // playSound(btn);
    setTimeout(function () {
        document.querySelector(btn).classList.remove('hover');
    }, 300);
}

function clearPlayer() {
    game.player = [];
}

function playerAdd() {
    var id = this.id;
    var field = '#' + id;
    game.player.push(field);
    playerTurn(field);
}

function playerTurn(x) {
    if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
        if (game.strict) {

            newGame();
        } else {
            message.innerText = 'Wrong! Try again!';
            message.classList.add('fadeInRight');
            message.style.display = 'block';
            setTimeout(function () {
                message.classList.add('slideOutUp');
                message.classList.remove('fadeInRight');
            }, 1000)
            showMoves();
        }
    } else {
        if (game.player.length === game.currentGame.length) {
            addCount();
        }
    }
}

function playSound(id) {
    game.sound(x).load();
    game.sound(x).play()
}