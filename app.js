const bill = document.getElementById("bill");
const people = document.getElementById("numOfPeople");
const tipAmount = document.getElementById("tipAmount");
const total = document.getElementById("total");
const reset = document.getElementById("reset");
const btnTip = document.querySelectorAll(".btn");
const customTip = document.getElementById("customTip");
const errormsg = document.querySelector(".error");
let selectedTip = 0;
let billAmount = 0;
let numOfPeople = 0;

btnTip.forEach((btn) => {
  btn.addEventListener("click", function () {
    btnTip.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");
    customTip.value = "";
    selectedTip = btn.value / 100;
    calculateTipAmount();
  });
});

customTip.addEventListener("input", function () {
  const customValue = parseFloat(customTip.value);
  selectedTip = customValue > 0 ? customValue / 100 : 0; // Validate custom tip
  btnTip.forEach((button) => button.classList.remove("active"));
  calculateTipAmount();
  toggleResetButton();
});

bill.addEventListener("input", function () {
  billAmount = parseFloat(bill.value);
  calculateTipAmount();
  toggleResetButton();
});

people.addEventListener("input", function () {
  numOfPeople = parseFloat(people.value);
  calculateTipAmount();
  toggleResetButton();
});

function calculateTipAmount() {
  if (numOfPeople === "" || isNaN(numOfPeople) || numOfPeople <= 0) {
    errormsg.style.display = "block";
    people.style.border = "2px solid #f95454"
  } else {
    errormsg.style.display = "none";
    people.style.border = "none"
  }

  if (isNaN(billAmount) || billAmount <= 0 || isNaN(numOfPeople) || numOfPeople <= 0) {
    tipAmount.textContent = "$0.00";
    total.textContent = "$0.00";
    return;
  }

  const tipAmountPerPerson = (billAmount * selectedTip) / numOfPeople;
  tipAmount.textContent = `$${tipAmountPerPerson.toFixed(2)}`;

  const totalAmountPerPerson = (billAmount + tipAmountPerPerson) / numOfPeople;
  total.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
}


document.getElementById("reset").addEventListener("click", () => {
  bill.value = "";
  customTip.value = "";
  people.value = "";
  selectedTip = 0;
  tipAmount.textContent = "$0.00";
  total.textContent = "$0.00";
  people.classList.remove("input-error");
  errormsg.style.display = "none";
  btnTip.forEach((button) => button.classList.remove("active"));
  reset.classList.remove("active");
});

function toggleResetButton() {
  const hasInput = bill.value.trim() !== "" || people.value.trim() !== "";

  const hasTip = selectedTip > 0 || customTip.value.trim() !== "";

  if (hasInput || hasTip) {
    reset.classList.add("active");
  } else {
    reset.classList.remove("active");
  }
}

