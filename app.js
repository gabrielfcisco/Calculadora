'use strict';

var display = document.getElementById('display');
var numbers = document.querySelectorAll('[id*=tecla]');
var operators = document.querySelectorAll('[id*=operador]');

let newNumber = true;
let operator;
let previousNumber;

const equalOperator = () => {
    calculate();
    operator = undefined;
}

const pendingOperation = () => operator !== undefined

const calculate = () => {
    if (pendingOperation()) {
        const atualNumber = parseFloat(display.textContent);
        newNumber = true;
        switch (operator) {
            case '+':
                atualizeDisplay(previousNumber + atualNumber);
                break;
            case '–':
                atualizeDisplay(previousNumber - atualNumber);
                break;
            case '×':
                atualizeDisplay(previousNumber * atualNumber);
                break;
            case '÷':
                atualizeDisplay(previousNumber / atualNumber);
                break;
        }
    }
}

const atualizeDisplay = (text) => {
    if (newNumber) {
        display.textContent = text;
        newNumber = false;
    } else {
        display.textContent += text;
    }
}

const insertNumber = (event) => atualizeDisplay(event.target.textContent);

const selectOperator = (event) => {
    if (!newNumber) {
        calculate();
        newNumber = true;
        operator = event.target.textContent;
        previousNumber = parseFloat(display.textContent);
    }
}

numbers.forEach(number => number.addEventListener('click', insertNumber));

operators.forEach(operator => operator.addEventListener('click', selectOperator));

document.getElementById('igual').addEventListener('click', equalOperator);

document.getElementById('AC').addEventListener('click', () => {
    display.textContent = '';
    operator = undefined;
    newNumber = true;
    numeroAnterior = undefined;
})