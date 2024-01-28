// TODO implementar escena donde se muestran los items del shop y la compra de items y su guardado en el inventario del jugador
// TODO agregar opcione de checkout de la tienda en la funcion del item shop
// TODO agregar chequeo del shopping cart, para que si ya tenes cierto item en el cart solo te agregue amount
// TODO agregar boton para vaciar el cart

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

    loadSavedData(savedPlayer){
        this.name = savedPlayer.name;
        this.gold = savedPlayer.gold;
        this.state = savedPlayer.state;
        this.inventory = savedPlayer.inventory;
        }

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

class CartItem{
    constructor(cItem, cAmount){
        this.item = new Item(cItem.name, cItem.type, cItem.price, cItem.description);
        this.amount = cAmount;
    }

    getPrice(){
        return this.item.price * this.amount;
    }
}

class ShoppingCart{
    constructor(){
        this.itemList = [];
    }

    emptyCart(){
        itemList = [];
    }

    calculateTotal(){
        let total = 0;
        this.itemList.forEach(i =>{
            total += i.getPrice();
        })
        return total;
    }

    showCartItems(){
        this.itemList.forEach(i =>{
            let div = document.createElement("div");
            div.innerHTML =`
            <p>-${i.item.name}. Amount: ${i.amount}. Price: ${i.getPrice()} gold.</p>
            `;
            sceneContainer.appendChild(div);
        })
    }
}

class Shop{
    constructor(){
        this.itemList = [];
        this.generateItems();
        this.shoppingCart = new ShoppingCart();
    }

    generateItems(){
        let lifePotion = new Item("life potion", "consumable", 50, "a potion that restores health");
        let manaPotion = new Item("mana potion", "consumable", 60, "a potion that restores mana");
        let invisibilityPotion = new Item("invisibility potion", "consumable", 100, "a potion that makes one invisible");
        let dagger = new Item("dagger", "weapon", 20, "a sharp dagger");
        let sword = new Item("sword", "weapon", 40, "a steel sword");
        let shield = new Item("shield", "shield", 30, "a standard wooden shield");
    
        this.itemList = [lifePotion, manaPotion, invisibilityPotion, dagger, sword, shield]
    }

    itemExists(itemN){ 
        return this.itemList.find((item) => item.name == itemN);
    }

    showItems(){
        this.itemList.forEach(item => {
            let div = document.createElement("div");
            div.innerHTML =`
            <p>-${item.name}. Type: ${item.type}. ${item.description}. Cost: ${item.price} gold.</p>
            `;
            sceneContainer.appendChild(div);
        })
    }

    //borrar ?
    buyItems(playerP){
        
        let finishedShopping = false;

        while(!finishedShopping){
        
            let shopChoice = prompt("Please enter the name of the product you would like to purchase:");
        
            let p = this.itemList.find((item) => item.name === shopChoice);

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

// ESCENAS

function startGame(){
    clearScene();

    sceneHeader.textContent = "Game Start";

    let div = document.createElement("div");
    div.innerHTML =`
    <h2>Welcome to Adventure Game!</h2>
    <p>Would you like to start a new game?</p>
    <button id="newgame">New Game</button>
    <button id="loadgame">Load Game</button>
    `;
    sceneContainer.appendChild(div);

    let buttonNew = document.getElementById("newgame");
    let buttonLoad = document.getElementById("loadgame");
    
    // GAME START EVENTOS

    buttonNew.addEventListener("click", (e) =>{
        playerCreation();
    })

    buttonLoad.addEventListener("click", (e) =>{
        localStorage.getItem("player") ? (loadPlayer(), town()) : Swal.fire({title:"There is no saved game!", confirmButtonColor:"grey"});
    })
}

function playerCreation(){
    clearScene();

    sceneHeader.textContent = "Player Creation";

    let div = document.createElement("div");
    div.innerHTML =`
    <h2>Welcome!</h2>
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
                welcomePlayer();
            }
            else{
                Swal.fire({title:"Please enter a valid amount.", confirmButtonColor:"grey"});
                gold = -1;
            }
        }
        else{
            Swal.fire({title:"Please enter a valid name.", confirmButtonColor:"grey"});
            name = "";
        }
    })
}

function welcomePlayer(){
    clearScene();

    sceneHeader.textContent = "Player Creation";

    let div = document.createElement("div");
    div.innerHTML =`
    <h2>Welcome, ${player.name}!</h2>
    <p>You currently have: ${player.gold} gold.</p>
    <button id="pcconfirm">Confirm</button>
    <button id="pcback">Go Back</button>
    `;
    sceneContainer.appendChild(div);

    let buttonPCConfirm = document.getElementById("pcconfirm");
    let buttonPCBack = document.getElementById("pcback");
    
    // PLAYER CREATION EVENTOS
    
    buttonPCConfirm.addEventListener("click", (e) =>{
        savePlayer(); //guardo el jugador en la memoria local
        town();
    })
    
    buttonPCBack.addEventListener("click", (e) =>{
        player = "";
        playerCreation();
    })


}

function town(){
    clearScene();

    sceneHeader.textContent = "Town";

    let div = document.createElement("div");
    div.innerHTML =`
    <h2>The town is quiet.</h2>
    <p>You are standing in the street in the middle of town.</p>
    <p>You check your pockets, you currently have ${player.gold} gold.</p>
    <p>Where would you like to go, ${player.name}?.</p>
    <button id="goshop">Shop</button>
    <button id="gowork">Work</button>
    <button id="goadventure">Adventure</button>

    `;
    sceneContainer.appendChild(div);

    let buttonGoShop = document.getElementById("goshop");
    let buttonGoWork = document.getElementById("gowork");
    let buttonGoAdventure = document.getElementById("goadventure");
    
    // PLAYER CREATION EVENTOS
    
    buttonGoShop.addEventListener("click", (e) =>{
        itemShop();
    })
    
    buttonGoWork.addEventListener("click", (e) =>{
        //hacer funcion de work simple que te un poquito de gold
    })

    buttonGoAdventure.addEventListener("click", (e) =>{
        //hacer funcion de adventure con opciones que requieren que tengas ciertos items y te dan mas gold
    })
}

function itemShop(){
    clearScene();

    sceneHeader.textContent = "Item Shop";

    let div1 = document.createElement("div");
    div1.innerHTML =`
    <h2>The shop is open for business.</h2>
    <p>You currently have ${player.gold} gold.</p>
    <p>The shop clerk greets you and shows you what items are currently available:</p>
    `;
    sceneContainer.appendChild(div1);

    shop.showItems();

    let div2 = document.createElement("div");
    div2.innerHTML =`
    <p>The clerk asks you what you're interested in.</p>
    <form id="buyform">
    <input type="text">
    <input type="number">
    <input type="submit" value="Add to Cart">
    </form>
    `;
    sceneContainer.appendChild(div2);
    let form = document.getElementById("buyform");

    // ITEM SHOP BUY EVENTO
    form.addEventListener("submit", (e) =>{
        e.preventDefault();

        let inputs = e.target.children;
        let itemName = inputs[0].value;
        let itemAmount = inputs[1].value;

        if(itemName != "" && shop.itemExists(itemName))
        {
            if(!isNaN(itemAmount) && itemAmount > 0)
            {
                shop.shoppingCart.itemList.push(new CartItem(shop.itemExists(itemName), itemAmount));
                itemShop();
            }
            else{
                Swal.fire({title:"Please enter a valid amount.", confirmButtonColor:"grey"});
                itemAmount = -1;
            }
        }
        else{
            Swal.fire({title:"Please enter a valid item.", confirmButtonColor:"grey"});
            itemName = "";
        }
    })

    // agregar opciones de mostrar shopping cart y de checkout de la tienda

    let div3 = document.createElement("div");
    div3.innerHTML =`
    <p>These are the items in your cart:</p>
    `;
    sceneContainer.appendChild(div3);

    shop.shoppingCart.showCartItems();

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

function savePlayer(){
    localStorage.setItem("player", JSON.stringify(player))
}

function loadPlayer(){
    player = JSON.parse(localStorage.getItem("player"));
}

//--------------------MAIN----------------------------- 

let player = "";

let shop = new Shop();

startGame();