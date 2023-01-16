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
    previousNumber = undefined;
});

document.getElementById('<<').addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
});

document.getElementById('±').addEventListener('click', () => {
    newNumber = true;
    atualizeDisplay(display.textContent * -1);
});

document.getElementById('ponto').addEventListener('click', () => {
    if (display.textContent.indexOf('.') == -1) {
        if (display.textContent.length > 0) {
            atualizeDisplay('.');
        } else {
            atualizeDisplay('0.');
        }
    }
});

const mapKeyboard = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    'Backspace' : '<<',
    'Delete' : 'AC',
    '+' : 'operador-mais',
    '-' : 'operador-menos',    
    '*' : 'operador-vezes',
    '/' : 'operador-divisao',
    '.' : 'ponto',
    ',' : 'ponto',
    '=' : 'igual',
    'Enter' : 'igual',
};

document.addEventListener('keydown', (event) => {
    const key = event.key

    if(Object.keys(mapKeyboard).indexOf(key) !== -1) {
    document.getElementById(mapKeyboard[key]).click();
    }
});