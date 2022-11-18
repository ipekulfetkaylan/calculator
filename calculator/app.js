const display= document.querySelector('.process span');
const keys= document.querySelector('.num-container');

let displayValue= '0';

let firstValue= null;
let operator= null;
let waitingForSecondValue= false;

updateDisplay();
function updateDisplay(){
    display.innerHTML= displayValue;
}

keys.addEventListener('click', (e)=>{
    const element= e.target;
    const value= element.value;

    if(!element.matches('button'))return;

//alternatif
    // switch(value){
    //     case'-':
    //     case'+':
    //     case'*':
    //     case'/':
    //     case'=':
    //      handleOprator(value);
    //      break;
    //     case'C': 
    //     clear();
    //     default:
    //      inputNumber(value);
    // }
    // updateDisplay();

    if(element.classList.contains('operator')){
        handleOprator(value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('clear')){
        clear();
        updateDisplay();
        return;
    }
    inputNumber(value);
    updateDisplay();
})

function handleOprator(nextOperator){
    const value= parseFloat(displayValue);

    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

    if(firstValue===null){
        firstValue= value;
    }else if(operator){
        const result= calculate(firstValue, value, operator);

        displayValue= `${parseFloat(result.toFixed(6))}`;
        firstValue= result;
    }

    waitingForSecondValue= true;
    operator= nextOperator;
}

function calculate(first, second, operator){
    if(operator === '-'){
        return first - second;
    }else if(operator === '/'){
        return first / second;
    }else if(operator === '*'){
        return first * second;
    }else if(operator === '+'){
        return first + second;
    }
    return second;
}

function inputNumber(num){
    if(waitingForSecondValue){
        displayValue= num;
        waitingForSecondValue= false;
    }else{
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

function clear(){
    displayValue= '0';
}