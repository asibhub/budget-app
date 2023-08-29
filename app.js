// Variables
var budget = document.getElementById("budget");
var budgetBtn = document.getElementById("budget-btn");
var totalBudget = document.getElementById("total-budget");
var productBtn = document.getElementById("product-btn");
var productTitle = document.getElementById("title");
var productCost = document.getElementById("cost");
var expenseList = document.getElementById("expense-list");
var expense = document.getElementById("expense");
var balance = document.getElementById("balance");

// save Loacl Storage
budgetBtn.onclick = (e) => {
  e.preventDefault();
  if (budget.value != "") {
    localStorage.setItem("budget", budget.value);
    location.href = location.href;
  } else {
    alert("Budget Empty");
  }
};

productBtn.onclick = (e) => {
  e.preventDefault();
  if (productTitle.value != "" && productCost.value != "") {
    var title = productTitle.value;
    var cost = productCost.value;
    var data = { title: title, cost: cost };
    var string = JSON.stringify(data);
    localStorage.setItem("budget_" + title, string);
    location.href = location.href;
  } else {
    alert("mdsn");
  }
};

// Retrive data form loaclstorage
function allData() {
  let i;
  for (i = 0; i < localStorage.length; i++) {
    var allKeys = localStorage.key(i);
    if (allKeys.match("budget_")) {
      var jsonData = localStorage.getItem(allKeys);
      var jsonParse = JSON.parse(jsonData);
      expenseList.innerHTML += `<div
        class="row mt-3 text-white  shadow-lg p-3 rounded"
        style="border-top: 5px solid rgb(189, 151, 37)"
      >
        <div
          class="col-md-6 d-flex align-items-center justify-content-between"
        >
          <h5>${jsonParse.title}</h5>
          <p class="price">${jsonParse.cost}</p>
        </div>
        <div class="col-md-6 d-flex align-items-center justify-content-end">
          <i
            class="fa-solid fa-pen-to-square text-success"
            style="cursor: pointer"
          ></i>
          &nbsp; &nbsp;
          <i
            class="fa-solid fa-trash-can text-danger delete-btn"
            style="cursor: pointer"
          ></i>
        </div>
      </div>`;
    }
  }

  var priceElement = document.getElementsByClassName("price");
  var price = [];
  for (i = 0; i < priceElement.length; i++) {
    price[i] = priceElement[i].innerHTML;
  }

  var priceInt = [];
  for (i = 0; i < price.length; i++) {
    priceInt.push(parseInt(price[i]));
  }

  var finalPrice = 0;
  for (i = 0; i < priceInt.length; i++) {
    finalPrice += priceInt[i];
  }
  expense.innerHTML = finalPrice;

  totalBudget.innerHTML = localStorage.getItem("budget");

  var tBudget = totalBudget.innerHTML;
  var tExpense = expense.innerHTML;
  balance.innerHTML = tBudget - tExpense;

  // Delete Element
  var deleteBtn = document.getElementsByClassName("delete-btn");
  for (i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = function () {
      var confrm = window.confirm("Do you Want To Delete");
      if (confrm) {
        var deleteParent = this.parentElement;
        var divPArent = deleteParent.parentElement;
        var h5 = divPArent.firstChild.ChildNodes[0].innerHTML;
        localStorage.removeItem("budget_", +h5);
        location.href = location.href;
      } else {
        alert("Save Data");
      }
    };
  }
}
allData();
