const randomArray = [];

const randomizer = () => {
    for (let i = 0 ; i < 10 ; i++) {
        randomArray.push(Math.floor(Math.random() * 20));
    }
}

randomizer();
console.log(randomArray);

let randomObj = {};

const objConstructor = () => {
    randomArray.forEach((num) => {
        
        randomObj[num] == num ? randomObj[num]=randomObj[num]++ : randomObj[num] = 1;
        console.log(randomObj);
        })
    }

objConstructor();
console.log(randomObj);