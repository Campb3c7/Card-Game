//TODO:

// MAKE IT SO YOU GET NEW CARD AFTER DEFEATING ENEMY
// ADD SCREEN SO YOU CAN PICK FROM CARDS
// MAKE IT SO THAT YOU CAN DRAW MORE THAN ONE CARD
// ADD IN DISCARDING


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
    startShield: 0,
    shield: 0
}

//testing certain cards
//1. Homming Missile
//2. Healing Pot
//3. Knuckle Sandwhich
//4. Charged Punch
//5. Basic Shield
//6. Strength Potion
let drawCards = [1,1,2,2,3,3,3,3,4,5,5,6];
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
    if (enemy.HP > 0) {
        enemy.ability();
    }
    checkHealth();
    resetBasics();
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
    document.getElementById('eneStr').innerHTML = "Enemy Strength: " + enemy.str;
    document.getElementById('draw').innerHTML = "Draw Pile: " + drawCards.length;
    document.getElementById('discard').innerHTML = "Discard Pile: " + discardCards.length;
    document.getElementById('usrShield').innerHTML = 'User Shield: ' + user.shield;
    document.getElementById('eneShield').innerHTML = 'Enemy Shield: ' + enemy.shield;
    if (enemy.HP <=0){
        document.getElementById('eneHP').innerHTML = "Enemy Health: 0";
    }
    else{
        document.getElementById('eneHP').innerHTML = "Enemy Health: " + enemy.HP;
    }
    showCard(card1ID,'slot1');
    showCard(card2ID,'slot2');
    showCard(card3ID,'slot3');
    showCard(card4ID,'slot4');
}
function checkHealth() {
    if (user.HP <= 0) {
        loseGame();
    }
    else if(enemy.HP <=0) {
        if (eneList.length <= 0){
            winGame();
        }
        else {
            drawEnemy();
        }
    }
}
function winGame() {
    document.getElementById('winScreen').innerHTML = "You Win!";
}
function loseGame() {
    document.getElementById('loseScreen').innerHTML = "You Lose!";
}
function dealDamage(damage) {
    damage = damage - enemy.shield;
    if (damage >= 0){
        enemy.HP -= damage;
        enemy.shield = 0;
    }
    else {
        enemy.shield = damage * -1;
    }
}
function takeDamage(damage) {
    damage = damage - user.shield;
    if (damage >= 0) {
        user.HP -= damage;
        user.shield = 0;
    }
    else {
        user.shield = damage * -1;
    }
}   
function resetBasics() {
    user.shield = user.startShield;
    enemy.shield = enemy.startShield;
    user.str = user.startStr;
    enemy.str = enemy.startStr;
}
//figuring out how the cards work




//ENEMYS
eneList = [1,2]
let enemy = {
    name: "Villian Didn't load",
    description: "Error in script",
    HP: 5,
    maxHP: 5,
    startStr: 2,
    str: 2,
    startShield: 0,
    shield: 0,
    damageType: 'projectile',
    ability: function() {
        dealDamage(str);
    }
}
function enemyAbility(enemyID) {
    switch(enemyID) {
        case 1:
            enemy1.ability();
            break;
        case 2:
            enemy2.ability();
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
            enemy = Object.create(enemy1);
            break;
        case 2:
            document.getElementById('enemyName').innerHTML = enemy2.name;
            document.getElementById('enemyDescription').innerHTML = enemy2.description;
            enemy = Object.create(enemy2);
            break;
    }
    console.log(enemy);
}



const enemy1 = {
    name: "Simple Archer",
    description: "Shoots the user with an arrow with damage twice to his strength",
    HP: 6,
    maxHP: 10,
    startStr: 2,
    str: 2,
    startShield: 0,
    shield: 0,
    damageType: 'projectile',
    ability: function() {
        takeDamage(3*enemy.str);
    }
}
const enemy2 = {
    name: "Simple Knight",
    description: "A Knight with full glisening armor. He Begins Ever Round with 3 armor and does his Strength in damage every round",
    HP: 14,
    maxHP: 14,
    startStr: 2,
    str: 2,
    startShield: 3,
    shield: 3,
    damageType: 'physical',
    ability: function() {
        takeDamage(enemy.str);
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
        case 6:
            card6.ability();
            break;
    }
}
function showCard(cardID,slotID) {
    switch(cardID) {
        case 1:
            document.getElementById(slotID).innerHTML = card1.name + ": " + card1.description;
            break;
        case 2:
            document.getElementById(slotID).innerHTML = card2.name + ": " + card2.description;
            break;
        case 3:
            document.getElementById(slotID).innerHTML = card3.name + ": " + card3.description;
            break;
        case 4:
            document.getElementById(slotID).innerHTML = card4.name + ": " + card4.description;
            break;
        case 5:
            document.getElementById(slotID).innerHTML = card5.name + ": " + card5.description;
            break;
        case 6:
            document.getElementById(slotID).innerHTML = card6.name + ": " + card6.description;
            break;
    }
}
const card1 = {
    name: "Homming Missile",
    description: "-1 enemy health, cannot miss",
    ability: function() {
        dealDamage(1);
    }
}
const card2 = {
    name: "Healing Potion",
    description: "+2 user health",
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
    description: "Deal user Strength to enemy",
    ability: function() {
        dealDamage(user.str);
    }
}
const card4 = {
    name: "Charged Punch",
    description: "+1 Strength, then do strength as damage and -1 user HP",
    ability: function() {
        user.str++;
        dealDamage(user.str);
        user.HP--;
    }
}
const card5 = {
    name: "Shield",
    description: "Gives user two shield and halves incomming damage",
    id: 5,
    ability: function() {
        user.shield += 2;
        enemy.str /= 2;
    }
}
const card6 = {
    name: "Strength Potion",
    description: "Gives the user +1 permanent damage bonus",
    id: 6,
    ability: function() {
        user.startStr += 1;
        user.str += 1;
    }
}




start();
console.log(enemy.name);