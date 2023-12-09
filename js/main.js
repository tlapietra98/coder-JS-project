
const textElement = document.getElementById('text1');

/* let playerState = {};

function startAdventure(){
    playerState = {};
    showSceneText(1);
}

function showSceneText(sceneIndex){}

function selectOption(option){}

startAdventure(); */


let playerName = "";
let playerGold = -1;
let playerInventory = {};

while(playerName == ""){

    playerName = prompt("Enter your name:");
    console.log("Enter your name:");

    if(playerName != "")
    {
        alert("Welcome to the Magic Shop, " + playerName.toString() + "!");
        console.log("Welcome to the Magic Shop, " + playerName.toString() + "!");
    }
    else{
        alert("Please enter a valid name.");
        console.log("Please enter a valid name.");
    }
}

while(playerGold <= -1){

    playerGold = prompt("How much gold do you have?");
    console.log("How much gold do you have?");

    if(!isNaN(playerGold) && playerGold > -1)
    {
        alert("You currently have: " + playerGold.toString() + " gold.");
        console.log("You currently have: " + playerGold.toString() + " gold.");
    }
    else{
        playerGold = -1;
        alert("Please enter a valid amount.");
        console.log("Please enter a valid amount.");
    }
}


const products = [
    { id: 1, prodName: "life potion", price: 50},
    { id: 2, prodName: "mana potion", price: 60},
    { id: 3, prodName: "invisibility potion", price: 100},
];



let shopped = false;

while(!shopped){


    let shopChoice = prompt("Please enter the ID of the product you would like to purchase:");

    if (shopChoice == 1) {
        alert("You have selected the Life Potion.");
    }
    else if (shopChoice == 2) {
        alert("You have selected the Mana Potion.");
    }
    else if (shopChoice == 3) {
        alert("You have selected the Invisibility Potion.");
    }
    else{
        shopChoice = 0;
        alert("Please enter a valid ID or name.");
    }


    if (shopChoice > 0) {
        
        if (products[shopChoice - 1].price <= playerGold) {
            playerGold -= products[shopChoice - 1].price;
            alert("Thank you for your purchase!");
            shopped = true;
        }
        else if(products[shopChoice - 1].price > playerGold){
            shopChoice = 0;
            alert("You don't have enough gold!");
        }
    }


}

alert("You currently have: " + playerGold.toString() + " gold.");
console.log("You currently have: " + playerGold.toString() + " gold.");







