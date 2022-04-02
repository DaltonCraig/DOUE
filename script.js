
let tickNum = 0;
let messages = ['', '', '', ''];

const buttons = {
    killPlayerOrc: document.getElementById('killPlayerOrc')
}

buttons.killPlayerOrc.onclick = function(){
    orcs.playerOrc.kill();
}





const economy = {
    gold: 0,
    gpd: 0
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
    }
}














const gui = {
    update: function(){
        document.getElementById('gold').innerHTML = `Gold: ${economy.gold}`;
        document.getElementById('gpd').innerHTML = `Gold Per Day: ${economy.gpd}`;
        document.getElementById('playerOrcKilled').innerHTML = `Orcs Killed: ${orcs.playerOrc.numKilled}`;
        document.getElementById().innerHTML = `Orc Value: ${orcs.playerOrc.value}`
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
}
setInterval(gameTick, 1000)