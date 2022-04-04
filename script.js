
let tickNum = 0;
let messages = ['', '', '', ''];
let unlockedMerc = false;

const buttons = {
    killPlayerOrc: document.getElementById('killPlayerOrc'),
    mercBuy: document.getElementById('mercBuy'),
    gatherFood: document.getElementById('foodGather')
}

buttons.killPlayerOrc.onclick = function(){
    orcs.playerOrc.kill();
}
buttons.mercBuy.onclick = function(){
    mercs.purchase();
}
buttons.gatherFood.onclick = function(){
    food.gatherFood();
}



const economy = {
    gold: 0,
    gpw: 0,
    food: 0,
    fpw: 0,
    update: function(){
        this.gpw = mercs.income;
        this.fpw = 0 - mercs.upkeepTotal;
        document.getElementById('gpw').innerHTML = `Gold Per Week: ${this.gpw}`;
        document.getElementById('gold').innerHTML = `Gold: ${this.gold}`;
        document.getElementById('food').innerHTML = `Food: ${this.food}`;
        document.getElementById('fpw').innerHTML = `Food Per Week: ${this.fpw}`;
    },
    tick: function() {
        this.update();
        this.gold += this.gpw;
        this.food += this.fpw;
    }
}



const food = {
    gatherValue: 1,
    gatherFood: function(){
        economy.food += this.gatherValue;
        economy.update();
    }
}



const orcs = {
    playerOrc: {
        value: 1,
        numKilled: 0,
        kill: function(){
            economy.gold += this.value;
            this.numKilled += 1;
            gui.update();
        }
    },

    update: function(){
        document.getElementById('playerOrcValue').innerHTML = `Orc Value: ${this.playerOrc.value}`
    }
}



const mercs = {
    income: 0,
    employed: 0,
    strength: 1,
    cost: 15,
    upkeepPer: 1,
    upkeepTotal: 0,

    purchase: function(){
        if (economy.gold >= this.cost) {
            economy.gold -= this.cost;
            this.cost = Math.ceil(this.cost *= 1.15);
            this.employed += 1;
            this.upkeepTotal = this.upkeepPer * this.employed;
            this.income = this.strength * this.employed;
            this.update();
            economy.update();
        } else {
            messageBoard.log('You can\'t afford that.'); 
        }
    },

    update: function(){
        this.income = this.employed * this.strength * orcs.playerOrc.value;
        document.getElementById('mercIncome').innerHTML = `Income: ${mercs.income}`;
        document.getElementById('mercNum').innerHTML = `Total Employed: ${mercs.employed}`;
        document.getElementById('mercStrength').innerHTML = `Strength: ${mercs.strength}`;
        document.getElementById('mercUpkeep').innerHTML = `Upkeep: ${mercs.upkeepTotal} Food`;
        document.getElementById('mercBuy').innerHTML = `Mercenary Cost: ${mercs.cost} Gold`;
    }
}



const progress = {
    check: function (){
        if (!unlockedMerc){
            if (economy.food >= 15){
                document.getElementById("baseContainer").style.visibility = "visible";
                messageBoard.log("You now have enough food to start a camp. You should hire a mercenary to protect it");
                messageBoard.log("Mercenaries will consume food in exchange for their protection");
                messageBoard.log("They will also kill nearby Orcs and give you a cut of the weekly loot");
                messageBoard.log("If you run out of food, you will lose 1/4 of your force per week")
                unlockedMerc = true;
            }
        }
    }
}





/* document.getElementById().innerHTML = ` ${}`; */
const gui = {
    update: function(){
        economy.update();
        orcs.update();
        mercs.update();

        messageBoard.update();
    }
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
    tickNum++;
    console.log(tickNum);
    if (tickNum%7==0){
        economy.tick();
    }
    progress.check();
    gui.update();
}
setInterval(gameTick, 1000)