(this.cost + 2) * 1.2

let tickNum = 0;
let messages = ['', '', '', ''];

const buttons = {
    killOrc: document.getElementById('orcKill'),
    buySoldier: document.getElementById('soldierBuy'),
    upgradeSoldier: document.getElementById('soldierUpgrade')
}

const gold = {
    total: 0,
    daily: 0,
    update: function(){
        this.total = Math.round(this.total * 10) / 10;
        document.getElementById('gold').innerHTML = `Gold: ${this.total}`;
        document.getElementById('goldDaily').innerHTML = `Daily Gold: ${getGPD()}`;
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
    strength: 0.2,
    cost: 10,
    total: 0,

    buy: function(){
        if (gold.total >= this.cost){
            gold.total -= this.cost;
            this.total += 1;
            this.cost = Math.floor((this.cost + 2) * 1.2);
            gold.update();
            messageBoard.log('Soldier Bought.');
        }else{
            messageBoard.log('You can\'t afford that.');
        }
        this.update();
    },

    upgrade: function(){
        this.update();
    },

    update: function(){
        document.getElementById('soldierTotal').innerHTML = `Total Soldiers: ${this.total}`;
        document.getElementById('soldierStrength').innerHTML = `Soldier Strength: ${this.strength}`;
        document.getElementById('soldierCost').innerHTML = `Soldier Cost: ${this.cost}`;
    }

}

buttons.buySoldier.onclick = function(){
    soldiers.buy();
}

const orcs = {
    total: 0,
    daily: 0,
    value: 1,
    kill: function(numKilled){
        this.total+=numKilled;
        gold.total+=(numKilled * this.value);
        if (this.total%100 == 0){               //Updates the orcs value, temp
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

function getGPD (){
    let GPD = 0;
    GPD += soldiers.total * soldiers.strength;
    GPD = Math.round(GPD * 10) / 10;
    return GPD;
}

const gameTick = function(){
    gold.total += getGPD();
    gold.update();
    orcs.update();
    soldiers.update();
    messageBoard.update();
    tickNum++;
    console.log(tickNum);
}
setInterval(gameTick, 1000);
