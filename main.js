'use strict'


// todo: write something to handle calculations
// todo: handle divide by 0;

// BUG: cannot add 0s after . because conversion to number removes unnecessary 0 at the end.
// todo: fix this by using string representation
// todo: implement calculation order myself

let numPad = document.querySelector('#numbers');
let numberButtons = numPad.querySelectorAll('button');


let storage = {
    calculations: [],
    displayValue: 0,

    getDisplay() {
        return this.displayValue;
    },

    setDisplay(number) {
        this.displayValue = number;
        let display = document.querySelector('#display');
        display.textContent = this.displayValue;
        handleDotButton(this.displayValue);
    },
}


numberButtons.forEach(button => {
    button.addEventListener('click', btnPressNumber)
});

function btnPressNumber(e) {
    addValueToDisplay(e.target.dataset.value);
}

function addValueToDisplay(value) {
    let current = storage.getDisplay().toString();
    storage.setDisplay((current + value));
}


let operators = document.querySelectorAll('.operator');
operators.forEach(button => {
    button.addEventListener('click', btnPressOperator)
});

function btnPressOperator(e) {
    let operator = e.target.dataset.value;
    prepareOperation(operator);
}

function prepareOperation(operator) {
    let operand = storage.getDisplay();
    storage.calculations.push(operand, operator);
    storage.setDisplay(0);
}


let btnOperate = document.querySelector('#btnOperate');
btnOperate.addEventListener('click', executeOperation);

function executeOperation() {
    let operand = storage.getDisplay();
    storage.calculations.push(operand);
    console.log(storage.calculations);
    let result = execute(storage.calculations.join(''));
    console.log(storage.calculations.join(''));
    storage.calculations = [];
    if (!result) result = 0;
    storage.setDisplay(result);
}

function execute(calculations) {
    return new Function('return ' + calculations)();
}


let btnClear = document.querySelector('#btnClear');
btnClear.addEventListener('click', clearCalculator);

function clearCalculator(e) {
    storage.calculations = [];
    storage.setDisplay(0);
}

function addDot() {
    let oldDisplay = storage.getDisplay();
    let newDisplay = oldDisplay + '.'
    storage.setDisplay(newDisplay);
}

function handleDotButton(currentNumber) {
    let btnDot = document.querySelector('#btnDot');
    if (currentNumber.toString().includes('.')) {
        btnDot.disabled = true;
    } else {
        btnDot.disabled = false;
    }
}

let btnBackspace = document.querySelector('#btnBackspace');
btnBackspace.addEventListener('click', removeLastInput);

function removeLastInput() {
    let current = storage.getDisplay().toString();
    if (current.length > 0) {
        let updated = current.slice(0, -1);
        if (updated == '') {
            updated = 0;
        }
        storage.setDisplay(updated);
    }
}

document.addEventListener('keypress', handleKeyPress);


// No Keysupport for 'clear' and 'backspace'.
function handleKeyPress(event) {
    if (isFinite(event.key)) {
        addValueToDisplay(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        prepareOperation(event.key);
    } else if (event.key == ',' || event.key == '.') {
        let btnDot = document.querySelector('#btnDot');
        if (!btnDot.disabled) {
            addDot();
        }
    } else if (event.key == 'Enter') {
        executeOperation();
    }
    console.log(event.key)
}