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

    },

    upgrade: function(){

    }
}

const orcs = {
    total: 0,
    daily: 0,
    value: 1,
    kill: function(numKilled){
        this.update();
    },
    update: function(){

    }
}

const messageBoard = {
    message1: ' ',
    message2: ' ',
    message3: ' ',
    message4: ' ',
    log: function(message){
        this.update();
    },
    update: function(){

    }
}