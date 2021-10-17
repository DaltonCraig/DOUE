let tickNum = 0;
let messages = ['Message1', 'Message2', 'Message3', 'Message4'];

const buttons = {
    killOrc: document.getElementById('orcKill'),
    buySoldier: document.getElementById('soldierBuy'),
    upgradeSoldier: document.getElementById('soldierUpgrade')
}

const gold = {
    total: 0,
    daily: 0,
    update: function(){
        document.getElementById('gold').innerHTML = `Gold: ${this.total}`;
        document.getElementById('goldDaily').innerHTML = `Daily Gold: ${this.daily}`;
    }

}

const clicks = {
    allowed: true,
    strength: 1
}

const heroes = {
    gimlet: {

    },

    kreolas: {

    },

    goodgulf: {

    },

    viggorn: {

    },

    beanomir: {

    }
}

const soldiers = {
    strength: 1,
    cost: 10,
    total: 0,

    buy: function(){
        this.update();
    },

    upgrade: function(){
        this.update();
    },

    update: function(){

    }

}

const orcs = {
    total: 0,
    daily: 0,
    value: 1,
    kill: function(numKilled){
        this.total+=numKilled;
        gold.total+=(numKilled * this.value);
        if (this.total%100 == 0){
            this.value*=2;
        }
        gold.update();
        this.update();
    },
    update: function(){
        document.getElementById('orcTotal').innerHTML = `Total Orcs Killed: ${this.total}`;
        document.getElementById('orcDaily').innerHTML = `Orcs Killed Per Day: ${this.daily}`;
        document.getElementById('orcValue').innerHTML = `Orc Value: ${this.value}`;
    }
}

buttons.killOrc.onclick = function(){
    orcs.kill(clicks.strength);
}

const messageBoard = {  //Scrolling Message Board
    log: function(message){
        messages.unshift(message);
        messages.pop();
        this.update();
    },
    update: function(){
        document.getElementById('message1').innerHTML = `${messages[3]}`;
        document.getElementById('message2').innerHTML = `${messages[2]}`;
        document.getElementById('message3').innerHTML = `${messages[1]}`;
        document.getElementById('message4').innerHTML = `${messages[0]}`;
    }
}



const gameTick = function(){
    gold.update();
    orcs.update();
    soldiers.update();
    messageBoard.log(tickNum);
    messageBoard.update();
    tickNum++;
    console.log(tickNum);
}
setInterval(gameTick, 1000);
