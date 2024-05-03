let cars = ["car-1", "car-2", "car-3", "car-4", "car-5"];

let winner;
let timer;
let speedtrack = document.getElementById("speedtrack").getBoundingClientRect();
let speedtrackWidth = speedtrack.width;
let userBalance = 100;
let raceFinished = false;

const BetButton = document.getElementById("BetButton");
const retryButton = document.getElementById("retryButton");
const moneyInput = document.getElementById("moneyInput");
const carsSelect = document.getElementById("carsSelect");

let userBalanceElement = document.getElementById("user-balance");
let bet = {
  carId: "",
  money: 0,
}

function makeBet() {
  let money = moneyInput.value;
  let carSelected = carsSelect.value;

  if (money < 5) {
    alert("Hey Pal, the mininum money is 5$!");
    moneyInput.value = "";
    return;
  }
  
  if (money > userBalance) {
    alert("I bet you don't have anything else, i'm right?");
    moneyInput.value = "";
    return;
  }
  
  bet.money = money;
  bet.carId = carSelected;

  debit(money);
  BetButton.disabled = true;
  retryButton.disabled = true;
  Start();
}

function debit(money) {
  userBalance -= money;
  userBalanceElement.innerHTML = "$" + userBalance;
}

function moveCars() {
  if (raceFinished == false) {
    cars.forEach((id) => {
      let randomNumber = Math.floor(Math.random() * 11);
      let element = document.getElementById(id);
      let currentPosition = element.getBoundingClientRect().x;
      let newPosition = currentPosition + randomNumber;

      element.style.translate = newPosition + "px";

      if (newPosition + 100 >= speedtrackWidth) {
        winner = id;
        raceFinished = true;
      }
    });

    if (raceFinished) {
      if (winner === bet.carId) {
        alert("You won!");
        userBalance += 2 * bet.money;
        userBalanceElement.innerHTML = "$" + userBalance;
      } else {
        alert("You lost!");
      }
      clearInterval(timer);
      retryButton.disabled = false;
    }

  }
}

function retryBet() {
  cars.forEach(id => {
    let element = document.getElementById(id);
    element.style.translate = "0px";
  });
  BetButton.disabled = false;
  retryButton.disabled = true;
  raceFinished = false;
  timer = clearInterval();
}

function Start() {
  timer = setInterval(moveCars, 50);
}

function Stop() {
  clearInterval();
}