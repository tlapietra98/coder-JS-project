
// REFERENCIAS A ELEMENTOS HTML

const textElement = document.getElementById('text1');

// CLASES

class Player{
    
    constructor(nameP, goldP){
        this.name = nameP;
        this.gold = goldP;
        this.state = {};
        this.inventory = [];
    }  

/*     constructor(savedPlayer){
        this.name = savedPlayer.name;
        this.gold = savedPlayer.gold;
        this.state = savedPlayer.state;
        this.inventory = savedPlayer.inventory;
    } */


    showInfo(){
    }


    showInventoryString(){
        
    }


}


class Item{

    constructor(nameP, typeP, priceP, descriptionP){
        this.name = nameP;
        this.type = typeP;
        this.price = priceP;
        this.description = descriptionP;
        
    }
}


class Shop{

    constructor(productsP){
        this.products = productsP;
    }


    showItems(){
        this.products.forEach(item => {
            console.log(item);
        })

    }


    buyItems(playerP){
        
        let finishedShopping = false;

        while(!finishedShopping){
        
            let shopChoice = prompt("Please enter the name of the product you would like to purchase:");
        
            let p = this.products.find((item) => item.name === shopChoice);

            if (p){
                alert(`You have selected the ${p.name}.`);
            }
            else{
                shopChoice = "";
                p = "";
                alert("Please enter a valid name.");
            }
        
        
            if (p.price > 0) {
                
                if (p.price <= playerP.gold) {
                    playerP.gold -= p.price;
                    alert("Thank you for your purchase!");
                    playerP.inventory.push(p);
                    finishedShopping = true;
                }
                else if(p.price > playerP.gold){
                    shopChoice = "";
                    p = "";
                    alert("You don't have enough gold!");
                }
            }
        
            alert(`You currently have: ${playerP.gold} gold.`);
            console.log(`You currently have: ${playerP.gold} gold.`);

/*             alert(`You currently possess the following items in your inventory: ${playerP.inventory}.`);
            console.log(`You currently possess the following items in your inventory: ${playerP.inventory}.`); */
        
        }

        

    }

}


// FUNCIONES

function createPlayer(){
    
    let playerName = "";
    let playerGold = -1;
    
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
    
    
    const player = new Player(playerName, playerGold);
    
    return player;

}

function generateItems(){
    let lifePotion = new Item("life potion", "consumable", 50, "a potion that restores health");
    let manaPotion = new Item("mana potion", "consumable", 60, "a potion that restores mana");
    let invisibilityPotion = new Item("invisibility potion", "consumable", 100, "a potion that makes one invisible");
    let dagger = new Item("dagger", "weapon", 20, "a sharp dagger");
    let sword = new Item("sword", "weapon", 40, "a steel sword");
    let shield = new Item("shield", "shield", 30, "a standard wooden shield");

    const itemList = [lifePotion, manaPotion, invisibilityPotion, dagger, sword, shield]

    return itemList;
}


//------------------------------------------------- 


let player = createPlayer();


let shop = new Shop(generateItems());

shop.showItems();

shop.buyItems(player);





