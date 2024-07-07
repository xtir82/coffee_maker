let interactiveScreen = document.getElementById('interactive-text');
let containerCoffee = document.querySelector('.container-coffee');

//Botones
let buyButton = document.getElementById('buy-btn');
let cancelButton = document.getElementById('cancel-btn');
let continueButton = document.getElementById('continue-btn');
let payButton = document.getElementById('pay-btn');
let resetButton = document.getElementById('reset-btn');
let coffeeBtn = document.querySelectorAll('.coffee-btn');

//Inputs
let payForm = document.getElementById('pay-form');
let paymentInput = document.getElementById('payment');

let userCoffee;

let coffeeMachine = {
    //Estado de la maquina de cafe(true = encendida / false = apagada)
    status: false,
    
    inventory: {
        water: 1000,
        coffee: 500,
        milk: 500,
        chocolate: 100,
        money: 0
    },

    coffeTypes: {},
    coffeTypesArray: [],

    //Metodos
    showMenu(){
        interactiveScreen.textContent = 'Seleccione el cafe que desea en el menu de la izquierda..';
        containerCoffee.classList.remove('invisible');
        buyButton.classList.add('invisible');
    },
    reset(){
        interactiveScreen.textContent = 'Bienvenido a la Coffee O-Matic 3000';
        containerCoffee.classList.add('invisible');
        buyButton.classList.remove('invisible');
        payButton.classList.add('invisible');
        continueButton.classList.add('invisible');
        payForm.classList.add('invisible');
        paymentInput.value = '';
        userCoffee = '';
    },
    updateText(text){
        interactiveScreen.textContent = text;
    },
    paymentCheck(payment) {
        if (payment >= userCoffee.cost) {
            payment -= userCoffee.cost;
            this.inventory.money += userCoffee.cost; 

            console.log('holis');
            if (payment === 0) {
                this.updateText(`Ya la entregaremos su cafe...`);
                payButton.classList.add('invisible');
                buyButton.classList.remove('invisible');
                payForm.classList.add('invisible');
            } else if (payment > 0) {
                this.updateText(`Su cambio es de ${payment}. Ya la entregaremos su cafe...`);
                payButton.classList.add('invisible');
                buyButton.classList.remove('invisible');
                payForm.classList.add('invisible');
            }
            this.prepareCoffee();
        
            } else {
                this.updateText('Su pago no es suficiente, por favor introduzca un monto mayor.');
            }
    },
    selectCoffee(selection){
        continueButton.classList.remove('invisible');
        console.log(selection)
        userCoffee = coffeeMachine.coffeTypesArray.filter((coffee) => {return coffee.name === selection})[0]
        console.log(userCoffee);
        this.updateText(`El cafe que usted ha seleccionado es ${userCoffee.name} y su precio es ${userCoffee.cost}$ presione continuar para avanzar o si desea puede seleccionar otro cafe.`);
    },
    checkInventory(){
        payButton.classList.remove('invisible');
        continueButton.classList.add('invisible');
        payForm.classList.remove('invisible');

        if (userCoffee.water > this.inventory.water) {
            this.updateText('No hay suficiente agua para preparar su cafe. Seleccione otro cafe');
            payButton.classList.add('invisible');
    
        } else if (userCoffee.coffee > this.inventory.coffee) {
            this.updateText('No hay suficiente Cafe para preparar su cafe. Seleccione otro cafe');
            payButton.classList.add('invisible');
        
        } else if (userCoffee.milk > this.inventory.milk) {
            this.updateText('No hay suficiente Leche para preparar su cafe. Seleccione otro cafe');
            payButton.classList.add('invisible');
        
        } else  if (userCoffee.chocolate > this.inventory.chocolate) {
            this.updateText('No hay suficiente Chocolate para preparar su cafe. Seleccione otro cafe');
            payButton.classList.add('invisible');
        
        } else {
            this.updateText('Prepararemos pronto su Cafe! Introduzca el pago para continuar');

        }
    },
    prepareCoffee () {
        buyButton.classList.add('invisible');
        cancelButton.classList.add('invisible');
        console.log(this.inventory);
        this.inventory.water -= userCoffee.water;
        this.inventory.milk -= userCoffee.milk;
        this.inventory.chocolate -= userCoffee.chocolate;
        this.inventory.coffee -= userCoffee.coffee;
        console.log(this.inventory);
        updateLocalInv();
        setTimeout( () => {Swal.fire({
            title: "Disfruta tu cafe!!",
            text: "Ya esta Listo!",
            imageUrl: `img/${userCoffee.name}.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: `${userCoffee.name} image`,
            confirmButtonText: `<i class="fa fa-thumbs-up"></i> Gracias!`
          }).then((result) => {
            if (result.isConfirmed) {
                coffeeMachine.reset();
            }
          })}, 3000);
    }
}
/*Swal.fire({
  title: "Sweet!",
  text: "Modal with a custom image.",
  imageUrl: "https://unsplash.it/400/200",
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: "Custom image"
});*/


//EventListeners de los botones (Se usan funciones anonimas para pasar los parametros a la funcion en el EventListener)
buyButton.addEventListener('click', coffeeMachine.showMenu);
cancelButton.addEventListener('click', coffeeMachine.reset);
payButton.addEventListener('click', () => {coffeeMachine.paymentCheck(paymentInput.value);});
continueButton.addEventListener('click', () => {coffeeMachine.checkInventory(userCoffee);});

//Implementacion del LocalStorage
const checkLocalInv = () => {
    if (localStorage.getItem('coffeeInventory') === null) {
        localStorage.setItem('coffeeInventory', JSON.stringify(coffeeMachine.inventory)); //El JSON.stringify convierte el objeto en un String
    } else {
        coffeeMachine.inventory = JSON.parse(localStorage.getItem('coffeeInventory'));  //El JSON.parse convierte el string en un objeto
    }
}

const updateLocalInv = () => {
    localStorage.setItem('coffeeInventory', JSON.stringify(coffeeMachine.inventory));
}

checkLocalInv();

//Boton de reset para reiniciar el LocalStorage y el inventario a su estado Original
resetButton.addEventListener('click', () => {
    coffeeMachine.inventory = {
        water: 1000,
        coffee: 500,
        milk: 500,
        chocolate: 100,
        money: 0
    }
    updateLocalInv()
    coffeeMachine.reset()
});

//Testing Area
const showCoffee = (coffee) => {
    containerCoffee.innerHTML += `
    <div class="card coffee-card">
        <img class="img-coffee" src="img/${coffee.name}.png" class="card-img-top coffee-img" alt="...">
        <div class="card-body">
            <h2 class="card-title">${coffee.name}</h2>
            <p class="card-text">${coffee.description}</p>
            <a id="${coffee.name}" class="btn btn-primary buy-button coffee-btn">Seleccionar</a>
        </div>
    </div>`;
}

const getData = async() => {
    try {
        const response = await fetch('./assets/data.json');
        if (response.ok) {
            const coffeeData = await response.json();
            coffeeData.forEach((coffee) => {
                coffeeMachine.coffeTypesArray.push(coffee);
                showCoffee(coffee);
            })
            coffeeBtn = document.querySelectorAll('.coffee-btn');
            coffeeBtn.forEach(btn => {btn.addEventListener("click", () =>{coffeeMachine.selectCoffee(btn.id)})});
            
            //funcion para guardar el menu en una variable global
        } else {throw new Error ('Error al cargar el menu, por favor recargue la pagina o comuniquese con el administrador.');}
    } catch(error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error
          });;
    }
}

getData()

/*coffeeMachine.coffeeFactory (name, water, coffee, milk, chocolate, cost, description, picture) {
        return {
            name: name,
            water: water,
            coffee: coffee,
            milk: milk,
            chocolate:chocolate,
            cost: cost,
            description: description,
            picture: picture
        }
    }*/

//De aqui pa abajo nada sirve aun :(
    
let switchMaquina = false;

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
/*
const printCoff = (event) => {
    console.log(event.target.id);
}*/





/*
coffeeBtn = document.getElementsByClassName('coffee-btn');
console.log(coffeeBtn);
coffeeBtn.addEventListener('click', printCoff);
*/
