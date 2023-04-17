import "./styles.css";

document.getElementById("app").innerHTML = ``;
// Get the calculator display element
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

let currentNumber = '';
let firstOperand = null;
let operator = null;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    if (/\d/.test(buttonText)) {
      currentNumber += buttonText;
      display.value = currentNumber;
    } else if (buttonText === 'C') {
      clear();
    } else if (buttonText === '+/-') {
      toggleSign();
    } else if (buttonText === '%') {
      calculatePercentage();
    } else if (/\+|\-|\*|\//.test(buttonText)) {
      handleOperator(buttonText);
    } else if (buttonText === '=') {
      calculate();
    } else if (buttonText === '.') {
      addDecimal();
    }
  });
});

function clear() {
  currentNumber = '';
  firstOperand = null;
  operator = null;
  display.value = '';
}

function toggleSign() {
  currentNumber = -parseFloat(currentNumber);
  display.value = currentNumber;
}

function calculatePercentage() {
  currentNumber = parseFloat(currentNumber) / 100;
  display.value = currentNumber;
}

function handleOperator(newOperator) {
  if (firstOperand === null) {
    firstOperand = parseFloat(currentNumber);
  } else if (operator) {
    calculate();
  }

  operator = newOperator;
  currentNumber = '';
}

function calculate() {
  if (operator === '+') {
    currentNumber = firstOperand + parseFloat(currentNumber);
  } else if (operator === '-') {
    currentNumber = firstOperand - parseFloat(currentNumber);
  } else if (operator === '*') {
    currentNumber = firstOperand * parseFloat(currentNumber);
  } else if (operator === '/') {
    currentNumber = firstOperand / parseFloat(currentNumber);
  }

  display.value = currentNumber;
  firstOperand = null;
  operator = null;
}

function addDecimal() {
  if (currentNumber.indexOf('.') === -1) {
    currentNumber += '.';
    display.value = currentNumber;
  }
}
99