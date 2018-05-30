const view = {
    game: document.getElementById("game"),
    stage: document.getElementById("stage"),
    health: document.getElementById("health"),
    monster: document.getElementById("monster"),
    status: document.getElementById("status"),
    abilities: document.getElementById("abilities"),
    menu: document.getElementById("menu"),
    debug: document.getElementById("debug")
}

const game = {
    stage: 1,
    constructor: function() {
        status.damage = 1;
        monster.generateMonster(game.stage);
    }
}

const monster = {
    health: 10,
    alive: false,
    gold: 100,
    generateMonster: function(stage) {
        monster.health = Math.pow(10, stage * 0.3 + 1);
        monster.alive = true;
        monster.gold = Math.pow(100, stage * 0.2 + 1);
    }
}

const status = {
    gold: 0,
    damage: 0
}

function debug() {
    document.getElementById("display").innerHTML = "Working Correctly!";
}

document.getElementById("debug").addEventListener("click", debug);