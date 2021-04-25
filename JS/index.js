const form = document.getElementById("jsForm");
const submit = document.getElementById("jsSubmit");
const date = document.getElementById("jsDate");
const description = document.getElementById("jsDescription");
const amount = document.getElementById("jsAmount");
const list = document.getElementById("jsList");
const allAmount = document.querySelectorAll(".list__amount");
const totalAmount = document.getElementById("jsTotalamount");
const delButton = document.querySelectorAll("button");

let total = 0;
let idNum = 1;

//key
let EXPENSE_LS = "expense";

//value
let expense = [];

const postTotalAmount = (sum) => {
  total += parseInt(sum, 10);
  totalAmount.innerText = `₩${total}`;
};

const removeExpense = (e) => {
  //to target clicked button
  const btn = e.target;
  //to get the parentNode of clicked button
  li = btn.parentNode;
  const removedAmount = li.children[2].innerText;

  list.removeChild(li);

  //remove from the Localstorage
  const filteredExpense = expense.filter((item) => {
    //return if id value of expenseObj inside expense array
    //is not equal to li(btn.parentNode)'s id

    return item.id != li.id;
  });

  //destract from total
  total = total - removedAmount;
  totalAmount.innerText = `₩${total}`;

  //update new expense array
  expense = filteredExpense;
  saveExpense();
};

const saveExpense = () => {
  localStorage.setItem(EXPENSE_LS, JSON.stringify(expense));
};

const loadExpense = () => {
  //load value from local storage(as a string)
  const loadedExpense = localStorage.getItem(EXPENSE_LS);
  //parse stringifies value to object
  const parsedExpense = JSON.parse(loadedExpense);
  if (loadedExpense != null) {
    parsedExpense.forEach(function (expenseItem) {
      addExpense(expenseItem.date, expenseItem.description, expenseItem.amount);
      postTotalAmount(expenseItem.amount);
    });
  }
};

const addExpense = (dat, desc, amnt) => {
  const li = document.createElement("li");
  const divDate = document.createElement("div");
  const divDesc = document.createElement("div");
  const divAmnt = document.createElement("div");
  const delBtn = document.createElement("button");
  divDate.classList.add("list__date");
  divDesc.classList.add("list__description");
  divAmnt.classList.add("list__amount");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", removeExpense);

  divDate.innerText = dat;
  divDesc.innerText = desc;
  divAmnt.innerText = amnt;

  li.appendChild(divDate);
  li.appendChild(divDesc);
  li.appendChild(divAmnt);
  li.appendChild(delBtn);

  const newId = idNum++;
  li.id = newId;
  list.prepend(li);
  const expenseObj = {
    date: dat,
    description: desc,
    amount: amnt,
    id: newId,
  };
  expense.push(expenseObj);
  saveExpense();
};

const handleSubmit = (e) => {
  e.preventDefault();
  const dat = date.value;
  const text = description.value;
  const amnt = amount.value;
  addExpense(dat, text, amnt);
  postTotalAmount(amnt);
  amount.value = "0";
};

function init() {
  form.addEventListener("submit", handleSubmit);

  loadExpense();
  console.log(delButton);
}

init();
