//TODO:

// MAKE THE WIN SIGN ONLY COME UP AFTER ALL ENEMIES ARE DEFEATED
// MAKE TOTAL OF 10 CARDS
// MAKE TOTAL OF 3 ENEMYS
// USE CSS TO MAKE BEAUTIFUL
// MAKE CARDS GO TO DRAW PILE AS SOON AS YOU USE THEM






//setting the starting values for game
const user = {
    HP: 10,
    maxHP: 10,
    startStr: 1,
    str: 1,
    shield: 0
}

//testing certain cards
let drawCards = [5,1,1,1,2,2,3,4,1];
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
    drawEnemy();
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
    enemy.ability();
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
    document.getElementById('usrHP').innerHTML = "User Hp: " + user.HP;
    document.getElementById('usrStr').innerHTML = "User Strength: " + user.str;
    document.getElementById('eneHP').innerHTML = "Enemy Health: " + enemy.HP;
    document.getElementById('eneStr').innerHTML = "Enemy Strength: " + enemy.str;
    document.getElementById('draw').innerHTML = "Draw Pile: " + drawCards.length;
    document.getElementById('discard').innerHTML = "Discard Pile: " + discardCards.length;
    document.getElementById('usrShield').innerHTML = 'User Shield: ' + user.shield;
    showCard(card1ID,'slot1');
    showCard(card2ID,'slot2');
    showCard(card3ID,'slot3');
    showCard(card4ID,'slot4');
    if (enemy.HP <= 0) {
        document.getElementById('winScreen').innerHTML = "You Win!!";
    }
}



//figuring out how the cards work

//ENEMYS
eneList = [1]
let enemy = {
    name: "Villian Didn't load",
    description: "Shoots the user with an arrow with damage equal to his strength",
    HP: 10,
    maxHP: 10,
    startStr: 2,
    str: 2,
    damageType: 'projectile',
    ability: function() {
        user.HP -= enemy.str;
    }
}
function enemyAbility(enemyID) {
    switch(enemyID) {
        case 1:
            enemy1.ability();
            break;
    }
}
function drawEnemy() {
    let enemyID = eneList[0];
    eneList.shift();
    switch(enemyID) {
        case 1:
            document.getElementById('enemyName').innerHTML = enemy1.name;
            document.getElementById('enemyDescription').innerHTML = enemy1.description;
            enemy = enemy1;
            break;
    }
}

const enemy1 = {
    name: "Simple Archer",
    description: "Shoots the user with an arrow with damage equal to his strength",
    HP: 10,
    maxHP: 10,
    startStr: 2,
    str: 2,
    damageType: 'projectile',
    ability: function() {
        user.HP -=  5 * enemy.str;
    }
}





//BELOW ARE ALL OF THE CODE FOR THE CARDS TO WORK
//FIRST TWO FUCTIONS MAKE THEM WORK BELOW ARE THE 
//OBJECTS THAT ARE THE CARDS THEMSELVES



function card(cardID) {
    switch(cardID) {
        case 1:
            card1.ability();
            break;
        case 2:
            card2.ability();
            break;
        case 3:
            card3.ability();
            break;
        case 4:
            card4.ability();
            break;
        case 5:
            card5.ability();
            break;
    }
}
function showCard(cardID,slotID) {
    switch(cardID) {
        case 1:
            document.getElementById(slotID).innerHTML = card1.description;
            break;
        case 2:
            document.getElementById(slotID).innerHTML = card2.description;
            break;
        case 3:
            document.getElementById(slotID).innerHTML = card3.description;
            break;
        case 4:
            document.getElementById(slotID).innerHTML = card4.description;
            break;
        case 5:
            document.getElementById(slotID).innerHTML = card5.description;
            break;
    }
}
const card1 = {
    name: "Homming Missile",
    description: "Homming Missile: -1 enemy health, cannot miss",
    ability: function() {
        enemy.HP -= 1;
    }
}
const card2 = {
    name: "Healing Potion",
    description: "Healing Potion: +2 user health",
    ability: function() {
        if (user.HP <= user.maxHP -2) {
            user.HP += 2;
        }
        else if(user.HP <= user.maxHP -1) {
            user.HP = user.maxHP;
        }
    }
}
const card3 = {
    name: "Knuckle Sandwhich",
    description: "Knuckle Sandwhich: Deal user Strength to enemy (" + user.str + ")",
    ability: function() {
        enemy.HP -= user.str;
    }
}
const card4 = {
    name: "Charged Punchh",
    description: "Charged Punch: +1 Strength, then do strength as damage and -1 user HP",
    ability: function() {
        user.str++;
        enemy.HP -= user.str;
        user.HP--;
    }
}
const card5 = {
    name: "Shield",
    description: "Shield: Gives user two shield and halves incomming projectile damage",
    id: 5,
    ability: function() {
        user.shield += 2;
        enemy.str /= 2;
    }
}




start();
console.log(enemy.name);