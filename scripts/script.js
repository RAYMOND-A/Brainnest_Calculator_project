const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationsEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearLastEl = document.querySelector(".clear-last-element");
const clearAllEl = document.querySelector(".clear-all");


let dis1Num = "";
let dis2Num = "";
let haveDot = false;
let result ="";
let lastOperation = "";

numbersEl.forEach( number => {
  number.addEventListener('click', (e) => {
    if(e.target.innerText === '.' && !haveDot){ // if we do not have a dot and we clicking to add dot then add dot
      haveDot = true;
    } else if(e.target.innerText === '.' && haveDot){ // else if have dot already we don't need to add extra dot
      return;
    }
    dis2Num += e.target.innerText; // storing string clicked into dis2Num variable
    display2El.innerText = dis2Num; 
  })
});


operationsEl.forEach( operator => {
  operator.addEventListener('click', (e) => {
    if (!dis2Num) result; // if not number to operate on return null/empty string
    haveDot = false; // after adding/clicking operator, we can now add a dot, hence haveDot is false
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
    console.log(result);
  })
});

function clearVar(name = '') {
  dis1Num += dis2Num+ '' + name + '';
  display1El.innerText = dis1Num; // copies display 2 and operators clicked to display 1 screen
  display2El.innerText = ''; //clears display 2 screen
  dis2Num = ''; // clear display 2 variable
  tempResultEl.innerText = result;
}

function mathOperation() {
  if(lastOperation === 'x'){
    result = parseFloat(result) * parseFloat(dis2Num); // takes temporal and display 2 operands, multiply both operands and display result in temporal result screen
  }else if (lastOperation === '+') {
    result = parseFloat(result) + parseFloat(dis2Num);
  }else if (lastOperation === '-') {
    result = parseFloat(result) - parseFloat(dis2Num);
  }else if (lastOperation === '/') {
    result = parseFloat(result) / parseFloat(dis2Num);
  }else if (lastOperation === '%') {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
}

equalEl.addEventListener('click', (e) => {
  if(!dis1Num || !dis2Num) result;
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = '';
  dis2Num = result;
  dis1Num = '';
});

clearAllEl.addEventListener('click', (e) => {
  display1El.innerText = '0';
  display2El.innerText = '0';
  dis1Num = '';
  dis2Num = '';
  result ='';
  tempResultEl.innerText = '0';
})

clearLastEl.addEventListener('click', (e) => {
  display2El.innerText = '';
  dis2Num = '';
})


window.addEventListener('keydown', (e) => {
  if(
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.' 
  ){
    clickNumButtonEl(e.key);
  } else if(
    
    e.key === '/' ||
    e.key === '+' ||
    e.key === '-' ||
    e.key === '%'
  ){
    clickOperationButtonEl(e.key);
  } else if(
    e.key === '*'
  ){
    clickOperationButtonEl('x')
  } else if(
    e.key === "Enter" ||
    e.key === '='
  ){
    clickEqualOrEnter();
  }
});

function clickNumButtonEl(key) {
  numbersEl.forEach(button => {
    if (button.innerText === key){
      button.click();
    }
  })
}

function clickOperationButtonEl(key) {
   operationsEl.forEach(button => {
    if (button.innerText === key){
      button.click();
    }
  })
}

function clickEqualOrEnter() {
  equalEl.click()
}