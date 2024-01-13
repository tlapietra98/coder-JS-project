
// REFERENCIAS A ELEMENTOS HTML
const sceneHeader = document.getElementById("sceneHeader");
const sceneContainer = document.getElementById("sceneContainer");

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

// VOIDS - ESCENAS

function playerCreation(){
    
    clearScene();

    let div = document.createElement("div");
    div.innerHTML =`
    <h2>Welcome to the Magic Shop!</h2>
    <p>Please enter your name and gold:</p>
    <form id="playerform">
    <input type="text">
    <input type="number">
    <input type="submit" value="Confirm">
    </form>
    `;
    sceneContainer.appendChild(div);

    let form = document.getElementById("playerform");

    // PLAYER CREATION EVENTO
    form.addEventListener("submit", (e) =>{
        e.preventDefault();

        let inputs = e.target.children;
        let name = inputs[0].value;
        let gold = inputs[1].value;

        if(name != "")
        {
            if(!isNaN(gold) && gold > 0)
            {
                player = createPlayer(name, gold); //creo al jugador y le asigno a player
                welcomePlayer(player);
            }
            else{
                writeMessage("Please enter a valid amount.");
                gold = -1;
            }
        }
        else{
            writeMessage("Please enter a valid name.");
            name = "";
        }
    })
}

// FUNCIONES

function writeMessage(message){
    let div = document.createElement("div");
    div.innerHTML = message;
    sceneContainer.appendChild(div);
}

function clearScene(){
    while(sceneContainer.firstChild){
        sceneContainer.removeChild(sceneContainer.firstChild);
    }
}

function createPlayer(playerName, playerGold){
    const createdPlayer = new Player(playerName, playerGold);
    return createdPlayer;
}

function welcomePlayer(player){
    clearScene();
    writeMessage("Welcome to the Magic Shop, " + player.name.toString() + "!");
    writeMessage("You currently have: " + player.gold.toString() + " gold.");
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

let player = "";

playerCreation();

let shop = new Shop(generateItems());

//shop.showItems();

//shop.buyItems(player);


