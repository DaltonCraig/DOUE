
let tickNum = 1;
let messages = ['', '', '', ''];
let unlockedMerc = false;

const buttons = {
    killorc: document.getElementById('killOrc'),
    mercBuy: document.getElementById('mercBuy'),
    gatherFood: document.getElementById('foodGather')
}

buttons.killorc.onclick = function(){
    orcs.orc.kill();
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
    starving: false,
    update: function(){
        this.gpw = mercs.income;
        this.fpw = 0 - mercs.upkeepTotal;
        document.getElementById('gpw').innerHTML = `Gold Per Week: ${this.gpw}`;
        document.getElementById('gold').innerHTML = `Gold: ${this.gold}`;
        document.getElementById('food').innerHTML = `Food: ${this.food}`;
        document.getElementById('fpw').innerHTML = `Food Per Week: ${this.fpw}`;
    },
    tick: function() {
        this.gold += this.gpw;
        if(this.starving){
            this.starve();
        }
        if (this.food + this.fpw <= 0 ){
            this.food = 0;
            this.starving = true;
        }else{
            this.food += this.fpw;
            this.starving = false;
        }
        mercs.update();
        economy.update();
    },
    starve: function(){
        if (mercs.employed > 3){
            mercs.employed = Math.ceil(mercs.employed * .75);
        }else if (mercs.employed > 0){
            mercs.employed -= 1;
        }
        
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
    orc: {
        value: 1,
        numKilled: 0,
        kill: function(){
            economy.gold += this.value;
            this.numKilled += 1;
            gui.update();
        }
    },

    update: function(){
        document.getElementById('orcValue').innerHTML = `Value: ${this.orc.value}`;
    }
}



const mercs = {
    income: 0,
    employed: 0,
    strength: 1,
    baseCost: 15,
    cost: 15,
    upkeepPer: 1,
    upkeepTotal: 0,

    purchase: function(){
        if (economy.gold >= this.cost) {
            economy.gold -= this.cost;
            this.cost = Math.floor(this.baseCost * (1.15 ** this.employed));
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
        this.income = this.employed * this.strength * orcs.orc.value;
        this.upkeepTotal = this.employed * this.upkeepPer;
        this.cost = Math.floor(this.baseCost * (1.15 ** this.employed));
        document.getElementById('mercIncome').innerHTML = `Income: ${mercs.income} Gold Per Week`;
        document.getElementById('mercNum').innerHTML = `Total Employed: ${mercs.employed}`;
        document.getElementById('mercStrength').innerHTML = `Strength: ${mercs.strength}`;
        document.getElementById('mercUpkeep').innerHTML = `Upkeep: ${mercs.upkeepTotal} Food Per Week`;
        document.getElementById('mercBuy').innerHTML = `Mercenary Cost: ${mercs.cost} Gold`;
    }
}



const progress = {
    check: function (){
        if (!unlockedMerc){
            if (economy.gold >= 15){
                document.getElementById("baseContainer").style.visibility = "visible";
                document.getElementById("foodContainer").style.visibility = "visible";
                messageBoard.log("You now have enough gold to start a camp. You should hire a mercenary to protect it");
                messageBoard.log("Mercenaries will kill nearby orcs and give you a cut of the loot each week");
                messageBoard.log("They will also consume food in exchange for their services");
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
        calendar.update();
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


const calendar = {
    day: 1,
    month: 1,
    year: 492,
    calendar: [["January", 31],["February", 28],["March", 31],["April", 30],["May", 31],["June", 30],["July", 31],["August", 31],
    ["September", 30],["October", 31],["November", 30],["December", 31]],

    nextDay: function(){
        numDays = this.calendar[this.month-1][1];
        if (this.day == numDays) {
            if (this.month == 12){ //Advances a year
                this.year++;
                this.month = 1;
                this.day = 1;
                this.update();
            }
            else{ //Adances a month
                this.month++;
                this.day = 1;
                this.update();
            }
        }
        else{ //Advances a day
            this.day++;
            this.update();
        }
    },

    update: function(){
        displayDay = this.day;
        displayMonth = this.calendar[this.month-1][0];

        document.getElementById("date").innerHTML = `${displayDay} ${displayMonth} ${this.year}`;
    }
}



const gameTick = function(){
    tickNum++;
    console.log(tickNum);
    if (tickNum%7==0){
        economy.tick();
    }
    calendar.nextDay();
    progress.check();
    gui.update();
}
setInterval(gameTick, 1000)