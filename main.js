'use strict'

// handle divide by 0;
// extra credit stuff

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
    button.addEventListener('click', addValueToDisplay)
});


// BUG: cannot add 0s after . because conversion to number removes unnecessary 0 at the end.
// todo: fix this by using string representation
// todo: implement calculation order myself
function addValueToDisplay(e) {
    let value = e.target.dataset.value;
    let current = storage.getDisplay().toString();
    storage.setDisplay(+(current + value));
}


let operators = document.querySelector('#operators').querySelectorAll('button');
operators.forEach(button => {
    button.addEventListener('click', prepareOperation)
});

function prepareOperation(e) {
    let operand = storage.getDisplay();
    let operator = e.target.dataset.value;
    storage.calculations.push(operand, operator);
    storage.setDisplay(0);
}


let btnOperate = document.querySelector('#btnOperate');
btnOperate.addEventListener('click', executeOperation);

function executeOperation(e) {
    let operand = storage.getDisplay();
    storage.calculations.push(operand);

    let result = execute(storage.calculations.join(''));
    storage.calculations = [];
    if(!result) result = 0;
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


let btnDot = document.querySelector('#btnDot');
btnDot.addEventListener('click', addDot);

function addDot(e) {
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
        let updated = current.slice(0,-1);
        if(updated == '') {
            updated = 0;
        }
        storage.setDisplay(updated);
    }
}




// function add (a, b) {
//     return a + b;
// }

// function subtract (a, b) {
//     return a - b;
// }

// function multiply (a, b) {
//     return a * b;
// }

// function divide (a, b) {
//     if (!b) {
//         return alert(`Please do not divide by 0!`)
//     }
//     return a / b;
// }

// function operate(op, a, b) {
//     let operations = {
//         '+': add,
//         '-': subtract,
//         '*': multiply,
//         '/': divide,
//     }
//     return operations[op](a, b)
// }

