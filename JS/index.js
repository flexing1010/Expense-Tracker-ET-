const form = document.getElementById("jsForm");
const submit = document.getElementById("jsSubmit");
const date = document.getElementById("jsDate");
const description = document.getElementById("jsDescription");
const amount = document.getElementById("jsAmount");
const list = document.getElementById("jsList");
const allAmount = document.querySelectorAll(".list__amount");
const totalAmount = document.getElementById("jsTotalamount");

let total = 0;

let EXPENSE_LS = "expense";
let expense = [];

const postTotalAmount = (sum) => {
  total += parseInt(sum, 10);
  console.log(total, parseInt(sum, 10));
  totalAmount.innerText = `₩${total}`;
};

const saveExpense = () => {
  localStorage.setItem(EXPENSE_LS, JSON.stringify(expense));
};

const addExpense = (dat, desc, amnt) => {
  const li = document.createElement("li");
  const divDate = document.createElement("div");
  const divDesc = document.createElement("div");
  const divAmnt = document.createElement("div");
  divDate.classList.add("list__date");
  divDesc.classList.add("list__description");
  divAmnt.classList.add("list__amount");
  divDate.innerText = dat;
  divDesc.innerText = desc;
  divAmnt.innerText = amnt;
  li.appendChild(divDate);
  li.appendChild(divDesc);
  li.appendChild(divAmnt);
  list.prepend(li);
  const expenseObj = {
    date: dat,
    description: desc,
    amount: amnt,
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
};

function init() {
  form.addEventListener("submit", handleSubmit);
}

init();
