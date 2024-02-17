// TODO implementar fetch de JSON y una promesa con await...???

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
        this.inventory = savedPlayer.inventory; //tendria que revisar esto para hacer que cada items se instancia como new Item... creo
        }

    addToInventory(listItem){
    
        let existingItem = this.inventory.find((invItem) => invItem.item.name == listItem.item.name)

        if (existingItem){
            existingItem.amount = Number(existingItem.amount) + Number(listItem.amount);
        }
        else{
            this.inventory.push(listItem);
        }
    }

    showInventory(){
        this.inventory.forEach(listItem => {
            let div = document.createElement("div");
            div.innerHTML =`
            <p>-${listItem.item.name}. Type: ${listItem.item.type}. ${listItem.item.description}. Amount: ${listItem.amount}.</p>
            `;
            sceneContainer.appendChild(div);
        })
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

class ListItem{
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
        this.itemList = [];
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

    giveItems(playerT){
        this.itemList.forEach(i =>{
            playerT.addToInventory(i);
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
        
        fetch("https://www.dnd5eapi.co/api/magic-items/potion-of-healing")
        .then((response) => response.json())
        .then((response) => {
            this.itemList.push(new Item(response.name, response.equipment_category.name, 50, "A potion of red glimmering liquid that restores health"))
        });

        fetch("https://www.dnd5eapi.co/api/magic-items/potion-of-speed")
        .then((response) => response.json())
        .then((response) => {
            this.itemList.push(new Item(response.name, response.equipment_category.name, 100, "A potion of yellow liquid with streaks of black that grants haste"))
        });

        fetch("https://www.dnd5eapi.co/api/magic-items/potion-of-invisibility")
        .then((response) => response.json())
        .then((response) => {
            this.itemList.push(new Item(response.name, response.equipment_category.name, 200, "A potion of transparent liquid that renders one invisible"))
        });

        fetch("https://www.dnd5eapi.co/api/equipment/dagger")
        .then((response) => response.json())
        .then((response) => {
            this.itemList.push(new Item(response.name, response.equipment_category.name, 2, "A light dagger that can be wielded with finesse or thrown at enemies"))
        });

        fetch("https://www.dnd5eapi.co/api/equipment/shortsword")
        .then((response) => response.json())
        .then((response) => {
            this.itemList.push(new Item(response.name, response.equipment_category.name, 10, "A steel shortsword which can pierce and cut"))
        });

        fetch("https://www.dnd5eapi.co/api/equipment/longsword")
        .then((response) => response.json())
        .then((response) => {
            this.itemList.push(new Item(response.name, response.equipment_category.name, 15, "A versatile longsword to slash enemies"))
        });

        fetch("https://www.dnd5eapi.co/api/equipment/shield")
        .then((response) => response.json())
        .then((response) => {
            this.itemList.push(new Item(response.name, response.equipment_category.name, 10, "A sturdy wooden shield to protect from attacks"))
        });
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

    buyItems(playerP){
        
            let totalGold = this.shoppingCart.calculateTotal();

            if (totalGold <= playerP.gold) {
                this.shoppingCart.giveItems(playerP);
                this.shoppingCart.emptyCart();
                playerP.gold -= totalGold;
                Swal.fire({title:"Thank you for your purchase!", confirmButtonColor:"grey"});
                savePlayer();
            }
            else if(p.price > playerP.gold){
                Swal.fire({title:"You don't have enough gold.", confirmButtonColor:"grey"});
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
                createPlayer(name, gold);
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

    let div1 = document.createElement("div");
    div1.innerHTML =`
    <h2>The town is quiet.</h2>
    <p>You are standing in the street in the middle of town.</p>
    <p>You check your pockets, you currently have ${player.gold} gold.</p>
    <button id="showinventory">Show Inventory</button>
    `;
    sceneContainer.appendChild(div1);

    let buttonShowInventory = document.getElementById("showinventory");

    // PLAYER SHOW INVENTORY EVENTO
    buttonShowInventory.addEventListener("click", (e) =>{
        player.state.showInventory ? player.state.showInventory = false : player.state.showInventory = true;
        town();
    })

    if(player.state.showInventory){
        player.showInventory();
    }

    let div2 = document.createElement("div");
    div2.innerHTML =`
    <p>Where would you like to go, ${player.name}?.</p>
    <button id="goshop">Shop</button>
    <button id="gowork">Work</button>
    <button id="goadventure">Adventure</button>

    `;
    sceneContainer.appendChild(div2);

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
                Number(itemAmount);
                shop.shoppingCart.itemList.push(new ListItem(shop.itemExists(itemName), itemAmount));
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

    let div4 = document.createElement("div");
    div4.innerHTML =`
    <button id="buy">Buy</button>
    <button id="emptycart">Empty Cart</button>
    `;
    sceneContainer.appendChild(div4);

    let buttonBuy = document.getElementById("buy");
    let buttonEmptyCart = document.getElementById("emptycart");
    
    // EVENTOS BUY Y VACIAR CARRO
    buttonBuy.addEventListener("click", (e) =>{
        shop.buyItems(player);
        shop.shoppingCart.emptyCart();
        itemShop();
    })
    
    buttonEmptyCart.addEventListener("click", (e) =>{
        shop.shoppingCart.emptyCart();
        itemShop();
        Swal.fire({title:"The cart has been emptied.", confirmButtonColor:"grey"});
    })

    let div5 = document.createElement("div");
    div5.innerHTML =`
    <button id="backtown">Go Back</button>
    `;
    sceneContainer.appendChild(div5);

    let buttonBackTown = document.getElementById("backtown");

    // EVENTO BACK
    buttonBackTown.addEventListener("click", (e) =>{
        town();
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
    player = new Player(playerName, playerGold);
}

function savePlayer(){
    localStorage.setItem("player", JSON.stringify(player))
}

function loadPlayer(){
    let savedPlayer = JSON.parse(localStorage.getItem("player"));
    player = new Player(savedPlayer.name, savedPlayer.gold);
    player.loadSavedData(savedPlayer);
}

//--------------------MAIN----------------------------- 

let player = "";

let shop = new Shop();

startGame();