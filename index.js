const historyDisplay = document.querySelector(".display-history");
const inputDisplay = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".clear-btn");
const lastClearBtn = document.querySelector(".last-clear-btn");
const equal = document.querySelector(".equal");

let displayHistory = "";
let displayInput = "";
let displayResult = "";
let lastOperation = "";
let haveDot = false;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    displayInput += e.target.innerText;
    inputDisplay.innerText = displayInput;
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!displayInput) return;
    haveDot = false;

    const operationName = e.target.innerText;
    if (displayHistory && displayInput && lastOperation) {
      mathOperator();
    } else {
      displayResult = parseFloat(displayInput);
    }

    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  displayHistory += displayInput + " " + name + " ";
  historyDisplay.innerText = displayHistory;
  inputDisplay.innerText = "";
  displayInput = "";
  tempResult.innerText = displayResult;
}

function mathOperator() {
  if (lastOperation === "x") {
    displayResult = parseFloat(displayResult) * parseFloat(displayInput);
  } else if (lastOperation === "+") {
    displayResult = parseFloat(displayResult) + parseFloat(displayInput);
  } else if (lastOperation === "-") {
    displayResult = parseFloat(displayResult) - parseFloat(displayInput);
  } else if (lastOperation === "/") {
    displayResult = parseFloat(displayResult) / parseFloat(displayInput);
  } else if (lastOperation === "%") {
    displayResult = parseFloat(displayResult) % parseFloat(displayInput);
  }
}

equal.addEventListener("click", () => {
  if (!displayHistory || !displayInput) return;
  haveDot = false;
  mathOperator();
  clearVar();
  inputDisplay.innerText = displayResult;
  tempResult.innerText = "";
  displayHistory = "";
  displayInput = "";
});

clearBtn.addEventListener("click", () => {
  displayHistory = "";
  displayInput = "";
  displayResult = "";
  lastOperation = "";
  haveDot = false;
  inputDisplay.innerText = "0";
  tempResult.innerText = "0";
  historyDisplay.innerText = "0";
});

lastClearBtn.addEventListener("click", () => {
  inputDisplay.innerText = inputDisplay.innerText.replace(
    inputDisplay.innerText[inputDisplay.length - 1],
    "",
  );

  displayInput = inputDisplay.innerText;
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9"
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key === "Enter" || e.key === "=") {
    equal.click();
  } else if (e.key === "Backspace") {
    lastClearBtn.click();
  } else if (e.key === "Delete") {
    clearAll.click();
  }
});

function clickButton(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operations.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
