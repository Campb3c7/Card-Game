//setting the starting values for game
let usrHP = 2;
let usrMaxHP =  10;
let usrstartStr = 1;
let usrStr = usrstartStr;
let usrShield = 0;

let eneHP = 10;
let eneMaxHP = 10;
let enestartStr = 2;
let eneStr = enestartStr;
let damageType 

//testing certain cards
let drawCards = [5,1,1,1,2,2,3,4];
let discardCards = [];

document.getElementById("draw").innerHTML = "Draw Pile: " + drawCards.length;

let card1ID;
let card2ID;
let card3ID;
let card4ID;

function start() {
    drawCards.sort(() => Math.random() - 0.5);
    console.log(drawCards);
    card1ID = drawCards[0];
    card2ID = drawCards[1];
    card3ID = drawCards[2];
    card4ID = drawCards[3];
    drawCards.splice(0,4);
    document.getElementById('slot1').style.backgroundColor = 'white';
    document.getElementById('slot2').style.backgroundColor = 'white';
    document.getElementById('slot3').style.backgroundColor = 'white';
    document.getElementById('slot4').style.backgroundColor = 'white';
    update()
}
function draw() {
    discardCards.push(card1ID);
    discardCards.push(card2ID);
    discardCards.push(card3ID);
    discardCards.push(card4ID);
    if (drawCards.length < 4){
        shuffle();
    }
    card1ID = drawCards[0];
    card2ID = drawCards[1];
    card3ID = drawCards[2];
    card4ID = drawCards[3];
    drawCards.splice(0,4);
    document.getElementById('slot1').style.backgroundColor = 'white';
    document.getElementById('slot2').style.backgroundColor = 'white';
    document.getElementById('slot3').style.backgroundColor = 'white';
    document.getElementById('slot4').style.backgroundColor = 'white';
    update()
}
function shuffle() {
    discardCards.sort(() => Math.random() - 0.5);
    drawCards = drawCards.concat(discardCards);
    console.log(drawCards)
    discardCards = [];
}
function playCard(slotID,cardID){
    switch (document.getElementById(slotID).style.backgroundColor) {
        case 'white':
            card(cardID);
            console.log(slotID)
            console.log(cardID)
            document.getElementById(slotID).style.backgroundColor = 'green';
            break;
    
        default:
            break;
    }
    update();
    
}
function update() {
    document.getElementById('usrHP').innerHTML = "User Hp: " + usrHP;
    document.getElementById('usrStr').innerHTML = "User Strength: " + usrStr;
    document.getElementById('eneHP').innerHTML = "Enemy Health: " + eneHP;
    document.getElementById('eneStr').innerHTML = "Enemy Strength: " + eneStr;
    document.getElementById('draw').innerHTML = "Draw Pile :" + drawCards.length;
    document.getElementById('discard').innerHTML = "Discard Pile :" + discardCards.length;
    showCard(card1ID,'slot1');
    showCard(card2ID,'slot2');
    showCard(card3ID,'slot3');
    showCard(card4ID,'slot4');
    if (eneHP <= 0) {
        document.getElementById('winScreen').innerHTML = "You Win!!";
    }
}


start();

//figuring out how the cards work

//ENEMYS
eneList = [1]





class Enemy {
    constructor(name,description,ability) {
        this.name = name;
        this.description = description;
        this.ability = ability
    }
    Ability(){
        this.ability;
    }
}





function card1() {
    //homing misile, do one guarenteed damage on the enemy
    eneHP -= 1;
}
function card2() {
    //healing potion, heal two HP, max of max hp
    if (usrHP <= usrMaxHP -2) {
        usrHP += 2;
    }
}
function card3() {
    //punch, do the users strenth to enemy
    eneHP -= usrStr;
}
function card4() {
    //charged punch, gain one strength, do strength as damage then take one damage
    usrStr++;
    eneHP -= usrStr;
    usrHP--;
}



function card(cardID) {
    switch(cardID) {
        case 1:
            card1();
            break;
        case 2:
            card2();
            break;
        case 3:
            card3();
            break;
        case 4:
            card4();
            break;
        case 5:
            card5.ability();
    }
}

function showCard(cardID,slotID) {
    switch(cardID) {
        case 1:
            document.getElementById(slotID).innerHTML = "Homming Missile: -1 enemy health";
            break;
        case 2:
            document.getElementById(slotID).innerHTML = "Healing Potion: +2 user health";
            break;
        case 3:
            document.getElementById(slotID).innerHTML = "Knuckle Sandwhich: Deal user Strength to enemy (" + usrStr + ")";
            break;
        case 4:
            document.getElementById(slotID).innerHTML = "Charged Punch: +1 Strength, then do strength as damage and -1 user HP";
            break;
        case 5:
            document.getElementById(slotID).innerHTML = card5.description;
    }
}

const card5 = {
    name: "Shield",
    description: "Shield: Gives user two shield and halves incomming projectile damage",
    id: 5,
    ability: function() {
        usrShield == 2;
        eneStr /= 2;
        console.log('ability working');
    }
}
card5.ability();