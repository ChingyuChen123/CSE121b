const view = {
    mainPage: document.getElementById("mainPage"),
    menuPage: document.getElementById("menuPage"),
    start: document.getElementById("start"),
    game: document.getElementById("game"),
    stage: document.getElementById("stage"),
    health: document.getElementById("health"),
    monster: document.getElementById("monster"),
    status: document.getElementById("status"),
    abilities: document.getElementById("abilities"),
    menu: document.getElementById("menu"),
    level: document.getElementById("level"),
    quit: document.getElementById("quit"),
    show: function(e) {
        e.style.display = "block";
    },
    hide: function(e) {
        e.style.display = "none";
    }
}   

const game = {
    stage: 1,
    block: 1,
    start: function() {
        view.hide(view.mainPage);
        view.show(view.game);
        game.constructor();
    },
    constructor: function() {
        game.stage = 1;
        game.block = 1;
        hero.damage = 1;
        hero.abilityLv = 1;
        monster.generateMonster(game.stage, game.block);
        game.display();
    },
    display: function() {
        view.stage.innerHTML = "<span>STAGE: " + game.stage.toString() + "</span><span>" + game.block.toString() + "/8</span>";
        view.health.innerHTML = "HP: " + monster.health.toFixed(0).toString();
        view.monster.innerHTML = monster.monsterImg;
        view.status.innerHTML = "<span>DAMAGE: " + hero.damage.toString() + "</span><span>GOLD: " + hero.gold.toFixed(0).toString() + "</span>";
        view.menu.innerHTML = "<span>LEVEL: " + hero.level.toString() + "</span><span>" + "ABILITY: " + "SLASH";
    }
}

const monster = {
    health: 10,
    isAlive: false,
    gold: 100,
    monsterImg: "",
    generateMonster: function(stage, block) {
        //block monster
        if(block % 8 !== 0) {
            monster.health = Math.pow(10, stage * 0.25 + 0.9) / 13 * block;
            monster.isAlive = true;
            monster.gold = Math.pow(100, stage * 0.005) / 15 * block;
            monster.monsterImg = '<img src="src/monster' + (Math.floor(Math.random() * 10) + 1) + '.png">';

        }
        //stage monster
        else if(stage % 3 !== 0) {
            monster.health = Math.pow(10, stage * 0.25 + 0.9) * 3;
            monster.isAlive = true;
            monster.gold = monster.health * 0.0225;
            monster.monsterImg = '<img src="src/monster' + (Math.floor(Math.random() * 10) + 1) + '.png">';
        }
        //boss
        else {
            monster.health = Math.pow(10, stage * 0.35 + 0.9) * 9;
            monster.isAlive = true;
            monster.gold = Math.pow(100, stage * 0.1);
            monster.monsterImg = '<img src="src/boss' + (Math.floor(Math.random() * 10) + 1) + '.png">';
        }
    },
    checkMonster: function() {
        if(monster.health <= 0) {
            hero.gold += monster.gold;
            game.block++;
            if(game.block > 8) {
                game.block = 1;
                game.stage++;
            }
            game.display();
            monster.generateMonster(game.stage, game.block);
        }
    }
}

const hero = {
    level: 1,
    gold: 1,
    damage: 0,
    abilityLv: 0,
    attack: function() {
        monster.health -= hero.damage;
        if(monster.health < 1)
            monster.health = 0;
        monster.checkMonster();
        game.display();
    },
    toNextLevel: function() {
        return Math.pow(2, hero.level - 1);
    },
    useAbility: function() {
        return 15 * ability;
    }
}

const menu = {
    mainPage: function() {
        view.hide(view.game);
        view.show(view.menuPage);
        menu.display();
    },
    display: function() {
        view.level.innerHTML = "LEVEL: " + hero.level.toString() + "<br>" +
            "SPEND " + hero.toNextLevel().toFixed(0).toString() + " GOLD TO LEVEL UP!";
    },
    quit: function() {
        view.hide(view.menuPage);
        view.show(view.game);
    },
    levelUp: function() {
        if(hero.gold >= hero.toNextLevel()) {
            hero.gold -= hero.toNextLevel();
            hero.level++;
            hero.damage *= 2;
        }
        menu.display();
        game.display();
    }
}

function de() {
    document.getElementById("display").innerHTML = "Working Correctly!";
}


view.start.addEventListener("click", game.start);
view.quit.addEventListener("click", menu.quit);
view.level.addEventListener("click", menu.levelUp);
view.menu.addEventListener("click", menu.mainPage);
view.monster.addEventListener("click", hero.attack);
