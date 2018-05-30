const view = {
    instruction: document.getElementById("instruction"),
    gameSection: document.getElementById("game"),
    gameOver: document.getElementById("gameOver"),
    inputBox: document.getElementById("input"),
    playBtn: document.getElementById("playBtn"),
    guessBtn: document.getElementById("guessBtn"),
    errMessage: document.getElementById("validateMessage"),
    replayBtn: document.getElementById("replayBtn"),
    result: document.getElementById("result"),
    congrats: document.getElementById("congratsMessage"),
    displayAns: document.getElementById("displayAns"),
    displayInp: document.getElementById("displayInp"),
    show: function(element) {
        element.style.display = "block";
    },
    hide: function(element) {
        element.style.display = "none";
    }
}

const answers = {
    ones: 0,
    tens: 0,
    hundreds: 0,
    thousands: 0,
    answer: 0,
    generateAnswers: function() {
        answers.ones = Math.floor(Math.random() * 10);
        do {
            answers.tens = Math.floor(Math.random() * 10);
        } while(answers.tens == answers.ones);
        do {
            answers.hundreds = Math.floor(Math.random() * 10);
        } while(answers.hundreds == answers.ones ||
                answers.hundreds == answers.tens);
        do {
            answers.thousands = Math.floor(Math.random() * 10);
        } while(answers.thousands == answers.ones ||
                answers.thousands == answers.tens ||
                answers.thousands == answers.hundreds);
        answers.answer = answers.ones + answers.tens * 10 + answers.hundreds * 100 + answers.thousands * 1000;
    },
    displayAnswers: function() {
        view.displayAns.innerHTML = 
            answers.thousands.toString() + 
            answers.hundreds.toString() +
            answers.tens.toString() +
            answers.ones.toString();
    }
}

const input = {
    ones: 0,
    tens: 0,
    hundreds: 0,
    thousands: 0,
    input: 0,
    getInput: function() {
        input.input = parseInt(view.inputBox.value);
        input.ones = Math.floor(input.input % 10);
        input.tens = Math.floor(input.input / 10 % 10);
        input.hundreds = Math.floor(input.input / 100 % 10);
        input.thousands = Math.floor(input.input / 1000);
        view.inputBox.value = "";
        view.inputBox.focus();
    },
    displayInput: function() {
        view.displayInp.innerHTML = 
            input.thousands.toString() +
            input.hundreds.toString() +
            input.tens.toString() +
            input.ones.toString();
    }
}

const game = {
    A: 0,
    B: 0,
    counter: 0,
    guessing: function() {
        game.counter++;
        input.getInput();
        game.comparingAns();
        if(game.A == 4) {
            gameDestructor();
            return;
        }
        game.displayResult();
        game.resetValues();
    },
    comparingAns: function() {
        switch(input.ones) {
            case answers.ones:
                game.A++;
                break;
            case answers.tens:
                game.B++;
                break;
            case answers.hundreds:
                game.B++;
                break;
            case answers.thousands:
                game.B++;
                break;
            default:
                break;
        }
        
        switch(input.tens) {
            case answers.ones:
                game.B++;
                break;
            case answers.tens:
                game.A++;
                break;
            case answers.hundreds:
                game.B++;
                break;
            case answers.thousands:
                game.B++;
                break;
            default:
                break;                
        }
        
        switch(input.hundreds) {
            case answers.ones:
                game.B++;
                break;
            case answers.tens:
                game.B++;
                break;
            case answers.hundreds:
                game.A++;
                break;
            case answers.thousands:
                game.B++;
                break;
            default:
                break;                
        }
        
        switch(input.thousands) {
            case answers.ones:
                game.B++;
                break;
            case answers.tens:
                game.B++;
                break;
            case answers.hundreds:
                game.B++;
                break;
            case answers.thousands:
                game.A++;
                break;
            default:
                break;                
        }        
    },
    displayResult: function() {
        view.result.innerHTML += 
            game.counter.toString() + ": "
            + input.thousands.toString()
            + input.hundreds.toString()
            + input.tens.toString()
            + input.ones.toString() + " - " 
            + game.A.toString() + "A" 
            + game.B.toString() + "B<br>";
    },
    resetValues: function() {
        game.A = 0;
        game.B = 0;
    }
}

function gameConstructor() {
    view.hide(view.instruction);
    view.show(view.gameSection);
    view.hide(view.gameOver);
    view.result.innerHTML = "";
    answers.generateAnswers();
}

function gameDestructor() {
    view.hide(view.gameSection);
    view.show(view.gameOver);
    view.congrats.innerHTML = "You used " + game.counter.toString() + " times to guess the number " + answers.answer;
}

function playAgain() {
    view.show(view.instruction);
    view.hide(view.gameSection);
    view.hide(view.gameOver);
}

function validateInput() {
    var template = /^\d{4}$/;
    
    if(view.inputBox.value.match(template)) {
        view.errMessage.innerHTML = "";
        game.guessing();
    } else {
        view.errMessage.innerHTML = "The number must be 4 different number digits!!";
        view.inputBox.value = "";
        view.inputBox.focus();
    }
}

function de() {
    document.getElementById("asdf").innerHTML = "Working Correctly!";
}

view.playBtn.addEventListener("click", gameConstructor);
view.guessBtn.addEventListener("click", validateInput);
view.replayBtn.addEventListener("click", playAgain);
view.getElementById("myBtn").addEventlistener("click", de);



function tryVar(v) {
    document.getElementById("try").innerHTML = v;
}