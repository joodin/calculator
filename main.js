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
    },
}


numberButtons.forEach(button => {
    button.addEventListener('click', addValueToDisplay)
});

function addValueToDisplay(e) {
    let value = e.target.dataset.value;
    storage.setDisplay(+(storage.getDisplay().toString() + value));
}


let operators = document.querySelector('#operators').querySelectorAll('button');
operators.forEach(button => {
    button.addEventListener('click', prepareOperation)
});

function prepareOperation(e) {
    let operand = storage.getDisplay();
    let operator = e.target.dataset.value;
    storage.calculations.push(operand, operator);
    console.log(storage.calculations.join(''));
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

