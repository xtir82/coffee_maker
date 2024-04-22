let interactiveScreen = document.getElementById('interactive-text');
let containerCoffee = document.querySelector('.coffee-sel');

//Botones
let buyButton = document.getElementById('buy-btn');
let cancelButton = document.getElementById('cancel-btn');
let continueButton = document.getElementById('continue-btn');
let payButton = document.getElementById('pay-btn');

let moccaButton = document.getElementById('mocca-btn');
let latteButton = document.getElementById('latte-btn');
let cappuccinoButton = document.getElementById('cappucinno-btn');

let userCoffee;

let coffeeMachine = {
    //Estado de la maquina de cafe(true = encendida / false = apagada)
    status: false,
    
    inventory: {
        water: 1000,
        coffee: 500,
        milk: 500,
        chocolate: 200,
        money: 0
    },

    coffeTypes: {
        
    },
    //Metodos
    coffeeFactory (name, water, coffee, milk, chocolate, cost) {
        return {
            name: name,
            water: water,
            coffee: coffee,
            milk: milk,
            cost: cost
        }
    },
    showMenu(){
        interactiveScreen.textContent = 'Seleccione el cafe que desea en el menu de la izquierda..';
        containerCoffee.classList.add('visible');
        buyButton.classList.add('invisible');
    },
    reset(){
        interactiveScreen.textContent = 'Bienvenido a la Coffee O-Matic 3000';
        containerCoffee.classList.remove('visible');
        buyButton.classList.remove('invisible');
        userCoffe = '';
    },
    updateScreen(userCoffee){
        interactiveScreen.textContent = `Es cafe que usted ha seleccionado es ${userCoffee.name} y su precio es ${userCoffee.cost}$ presione continuar para avanzar.`;
    },
    selectCoffee(selection){
        switch (selection) {
            case 'mocca':
                userCoffee = this.coffeTypes.moka;
                console.log(userCoffee);
                this.updateScreen(userCoffee);
                break;
            case 'latte':
                userCoffee = this.coffeTypes.latte;
                console.log(userCoffee);
                this.updateScreen(userCoffee);
                break;
            case 'cappuccino':
                userCoffee = this.coffeTypes.cappuccino;
                console.log(userCoffee);
                this.updateScreen(userCoffee);
                break;
        }
    }
}

//Creamos los Cafes
coffeeMachine.coffeTypes.moka = coffeeMachine.coffeeFactory('Moka', 100, 50, 100, 0, 2);
coffeeMachine.coffeTypes.cappuccino = coffeeMachine.coffeeFactory('Cappuccino', 100, 50, 100, 0, 2);
coffeeMachine.coffeTypes.latte = coffeeMachine.coffeeFactory('Latte', 100, 50, 100, 0, 2);


/*const coffeeFactory = (name, water, coffee, milk, chocolate, cost) => {
    return {
        name: name,
        water: water,
        coffee: coffee,
        milk: milk,
        cost: cost
    }
}
*/

//const moka = coffeeMachine.coffeeFactory('Moka', 100, 50, 100, 0, 2);
//const moka = coffeeFactory('Moka', 100, 50, 100, 0, 2);

/*
Tipos de Cafe
a: Latte
b: Moka
c: Cappucino
*/
let coffeeTypes = [[100, 50, 100, 0, 1, 'Latte'], [100, 50, 100, 0, 2, 'Moka'], [100, 50, 100, 50, 2, 'Cappucino']];


/*
Inventario
0: Agua
1: Cafe
2: Leche
3: Chocolate
4: Dinero o Costo
5: Nombre
*/
let inventory = [1000, 500, 500, 0, 0];



let switchMaquina = false;

let selectMocca = () => {
    coffeeMachine.selectCoffee('mocca');
}

let selectLatte = () => {
    coffeeMachine.selectCoffee('latte');
}

let selectCappuccino = () => {
    coffeeMachine.selectCoffee('cappuccino');
}


buyButton.addEventListener('click', coffeeMachine.showMenu);
cancelButton.addEventListener('click', coffeeMachine.reset);
moccaButton.addEventListener('click', selectMocca);
latteButton.addEventListener('click', selectLatte);
cappuccinoButton.addEventListener('click', selectCappuccino);
//continueButton.

const buyCoffee = () => {
    let userOption = prompt('Desea comprar un cafe? 1) Si - 2) No');
    
    if (userOption == 1) {
        alert('Vale, ya te preparo tu cafe');
        chooseCoffee();
    } else if (userOption == 2) {
        alert('La maquina se apagara.. Si desea activarla nuevamente presione F5');
        switchMaquina = 0;
    } else if (userOption == 3) {
        printReport();
    } else if (userOption == 4) {
        rechargeMachine();
    } else {
        alert('Opcion no valida, seleccione otra opcion');
        buyCoffee();
    }
}


const chooseCoffee = () => {
    let userCoffee = prompt('Que cafe desea? a) Latte - b) Moka - c) Cappucino d) Salir');
    userCoffee = userCoffee.toUpperCase();
    
    if (userCoffee === 'A' || userCoffee === 'B' || userCoffee === 'C') {
        coffeValidation(userCoffee);
    } else if (userCoffee === 'D') {
        alert('Usted ha seleccionado salir');
    } else {
        alert('Esta opcion no es valida')
    }
}

const exitCoffeeMaker = () => {
    alert('Hasta Luego!');
}

const coffeValidation = (userCoffee) => {
    if (userCoffee === 'A') {
        alert('Usted ha seleccionado Latte');
        let coffeeSelection = coffeeTypes[0];
        checkInventory(coffeeSelection);
    
    } else if (userCoffee === 'B') {
        alert('Usted ha seleccionado Moka');
        let coffeeSelection = coffeeTypes[1];
        checkInventory(coffeeSelection);

    } else if (userCoffee === 'C') {
        alert('Usted ha seleccionado Cappucino');
        let coffeeSelection = coffeeTypes[2];
        checkInventory(coffeeSelection);
    }

}

const checkInventory = (coffeeSelection) => {
    if (coffeeSelection[0] > inventory[0]) {
        alert('No hay suficiente agua para preparar su cafe');

    } else if (coffeeSelection[1] > inventory[1]) {
        alert('No hay suficiente Cafe para preparar su cafe');
    
    } else if (coffeeSelection[2] > inventory[2]) {
        alert('No hay suficiente Leche para preparar su cafe');
    
    } else  if (coffeeSelection[3] > inventory[3]) {
        alert('No hay suficiente Chocolate para preparar su cafe');
    
    } else {
        alert('Prepararemos pronto su Cafe!');
        chargeCoffee(coffeeSelection);
    }
}

const chargeCoffee = (coffeeSelection) => {
    let payment = prompt(`El costo de su cafe es de ${coffeeSelection[4]}, a continuacion introduzca la cantidad de dinero con la que pagara.`);
    let coffeeCost = coffeeSelection[4]
if (payment >= coffeeCost) {
    payment -= coffeeCost;
    inventory[4] += coffeeCost; 
    
    if (payment > 0) {
        alert(`Su cambio es de ${payment}. Ya la entregaremos su cafe...`);
    }
    prepareCoffee(coffeeSelection);

    } else {
        alert('Su pago no es suficiente');
        chargeCoffee(coffeeSelection);
    }
}

const prepareCoffee = (coffeeSelection) => {
    inventory[0] -= coffeeSelection[0];
    inventory[1] -= coffeeSelection[1];
    inventory[2] -= coffeeSelection[2];
    inventory[3] -= coffeeSelection[3];
    alert(`Aqui tiene su ${coffeeSelection[5]}, Gracias por su compra`);
    
}

const rechargeMachine = () => {
    let cash = inventory[4]
    inventory = [1000, 500, 500, 200, cash];
    alert('La maquina ha sido recargada');
}

const printReport = () => {
    alert(`REPORTE: La maquina tiene: Agua: ${inventory[0]} Cafe: ${inventory[1]} Leche: ${inventory[2]} Chocolate: ${inventory[3]} Dinero: ${inventory[4]} `)
}

while (switchMaquina === true) {
    //buyCoffee();
}