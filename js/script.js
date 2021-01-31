function startProgram(){

let maxDiceValues = new Array();

//Получение значений из html
let d4 = +document.getElementById('d4__value').value;
let d6 = +document.getElementById('d6__value').value;
let d8 = +document.getElementById('d8__value').value;
let d10 = +document.getElementById('d10__value').value;
let d12 = +document.getElementById('d12__value').value;
let plus = +document.getElementById('plus__value').value; //Отдельно
let monster = +document.getElementById('monster__value').value;

monster -= plus;

if(d4 > 0){
    for(let i =0; i < d4; i++){
        maxDiceValues.push(4);
    }
}

if(d6 > 0){
    for(let i =0; i < d6; i++){
        maxDiceValues.push(6);
    }
}

if(d8 > 0){
    for(let i =0; i < d8; i++){
        maxDiceValues.push(8);
    }
}

if(d10 > 0){
    for(let i =0; i < d10; i++){
        maxDiceValues.push(10);
    }
}

if(d12 > 0){
    for(let i =0; i < d12; i++){
        maxDiceValues.push(12);
    }
}

let currDiceValues = new Array(maxDiceValues.length).fill(1);


// _________________________________________



function goodSet(boarder){
    let res = 0;
    currDiceValues.forEach(function(item) {
        res = res + item;
        if(res>=boarder){
            return true;
        }
    })
    if(res > (boarder-1)){
        return true;
    }
    return false;
}

function aboveOrEquals(boarder){
    let result = 0;
    do{
        if (goodSet(boarder)) {
            result++;
        }
    }while(nextSetExist());
    
    return result;
}

function nextSetExist(){
    let i = currDiceValues.length - 1;
    while(i >= 0 && currDiceValues[i] == maxDiceValues[i]){
        i--;
    }
    if(i<0) {return false;}
    if(currDiceValues[i] >= maxDiceValues[i]) {i--;}
    currDiceValues[i]++;
    if(i == currDiceValues.length-1) {return true;}
    for(let j = i+1; j < currDiceValues.length; j++){
        currDiceValues[j]=1;
    }
    return true;
}


function probabilityInPercents(positiveExperiments){
    let allCombinations = 1;
    maxDiceValues.forEach(function(item){
        allCombinations *= item;
    })

    return positiveExperiments / allCombinations * 100;
}


let totalResult = probabilityInPercents(aboveOrEquals(monster));
totalResult = totalResult.toFixed(0);
totalResult = totalResult + "%";
document.getElementById('result').innerHTML = totalResult;

}
