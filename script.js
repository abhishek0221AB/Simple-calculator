const display = document.getElementById('display');
let memory = 0;
let memoryRecallFlag = false;

function clearDisplay(){
    display.value = '';
    memoryRecallFlag = false;
}

function deleteLast(){
    display.value = display.value.slice(0, -1);
    memoryRecallFlag = false;
}

function appendValue(value){
    display.value += value;
    memoryRecallFlag = false;
}

function calculateSquare(){
    try{
        let value = parseFloat(display.value);
        display.value = value * value;
        memoryRecallFlag = false;
    }catch(error){
        display.value = 'Error';
    }
}

function calculatePercentage(){
    try{
        let expression = display.value;
        let match = expression.match(/([\d.]+)([+\-*/])([\d.]+)$/);
        if (match) {
            let num1 = parseFloat(match[1]);
            let operator = match[2];
            let num2 = parseFloat(match[3]);
            let percentageValue = (num1 * num2) / 100;
            display.value = expression.replace(/([\d.]+)([+\-*/])([\d.]+)$/, `${num1}${operator}${percentageValue}`);
        }
        else{
            let value = parseFloat(expression);
            display.value = value / 100;
        }
        memoryRecallFlag = false;
    }catch(error){
        display.value = 'Error';
    }
}

function calculateResult(){
    try{
        display.value = eval (display.value);
        memoryRecallFlag = false;
    }catch(error){
        display.value = 'Error';
    }
}

function memoryRecall(){
    if(memoryRecallFlag){
        // if MR is pressed twice, reset memory
        memory = 0;
        display.value = '';
        memoryRecallFlag = false;
    }
    else{
        display.value = memory;
        memoryRecallFlag = true;
    }
}

function memoryAdd(){
    try{
        let result = eval(display.value);
        memory += result;
        display.value = '';
        memoryRecallFlag = false;
    }catch(error){
        display.value = 'Error';
    }
}

function memorySubtract(){
    try{
        let result = eval(display.value);
        memory -= result;
        display.value='';
        memoryRecallFlag = false;
    }catch(error){
        display.value = 'Error';
    }
}

document.addEventListener('keydown',(event) => {
    if (!isNaN(event.key) || ['+','-','*','/','.'].includes(event.key)) {
        appendValue(event.key)
    } else if (event.key === '%'){
        calculatePercentage();
    } else if (event.key === 'Enter'){
        calculateResult();
    } else if (event.key === 'Backspace'){
        deleteLast();
    } else if (event.key === 'Escape'){
        clearDisplay();
    }
});


