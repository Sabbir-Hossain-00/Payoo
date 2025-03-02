const addMoneyBtn = document.getElementById("Add-btn");
const amount = document.getElementById("amount");
const amountToAdd = document.getElementById("amount-to-add");
const accountNumber = document.getElementById("number");
const pin = document.getElementById("pin");
const pin2 = document.getElementById("pin2");

const add = document.getElementById("add");
const out = document.getElementById("out");

const addBtn = document.getElementById("add-btn");
const outBtn = document.getElementById("out-btn");

const cashOutBtn = document.getElementById("cash-out");
const amountToWithdraw = document.getElementById("amount-to-withdraw");

const transHistory = document.querySelector(".trans-history");
const transaction = document.getElementById("transaction");
const transactionBtn = document.getElementById("transaction-btn");


const showTransection = ()=>{
   return JSON.parse(localStorage.getItem("historyOfTransection"))
}


const historyArr = showTransection() || [];
const transactionHistory = (method , amount)=>{
    const newElm = document.createElement("div");
    newElm.innerHTML = `<div class="border border-gray-200 p-2 rounded"> <div class="li-left flex justify-start items-center gap-4"> <img src="assets/money1.png" alt=""> <div> <h1>${method}</h1> <span>${amount}</span> </div> </div> </div>`;
    transHistory.append(newElm);
    historyArr.push(newElm.innerText);
    localStorage.setItem("historyOfTransection", JSON.stringify(historyArr));
   
}
for(let arr of historyArr){
const newElm = document.createElement("div");
newElm.innerHTML = `<div class="border border-gray-200 p-2 rounded"> <div class="li-left flex justify-start items-center gap-4"> <img src="assets/money1.png" alt=""> <div><span>${arr}</span> </div> </div> </div>`;
transHistory.append(newElm);
}

const showAddTotal = ()=>{
    return JSON.parse(localStorage.getItem("addTotal"));
}


let addTotalAmount = showAddTotal() ;

const addAmount = (amounts)=>{
    const getAmount = parseInt(amount.innerText);
    const totalAmount = getAmount + amounts ;
    amount.innerText = totalAmount ;
    amountToAdd.value = "";
    pin.value = "";
    localStorage.setItem("addTotal", JSON.stringify(totalAmount));
}
amount.innerText = addTotalAmount;


const outAmount = (amounts)=>{
    const getAmount = parseInt(amount.innerText);
    const totalAmount = getAmount - amounts ;
    amount.innerText = totalAmount ;
    amountToWithdraw.value = "";
    pin2.value = "";
   
}






addMoneyBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const addMoney = "Add Money";
   if(pin.value === "1234"){
    if(accountNumber.value.length === 11){
        if(amountToAdd.value > 0){
            const getAmountToAdd = parseInt(amountToAdd.value);
            addAmount(getAmountToAdd);
            transactionHistory(addMoney, getAmountToAdd);
            accountNumber.value = "";
        }else{
            alert("invalid amount to add");
        }
    }else{
        alert("invalid account number");
    }
    
   }else{
    alert("invalid pin");
   }
});


cashOutBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const cashout = "Cashout";
    const getAmount = parseFloat(amount.innerText);

    // console.log(getAmount);

    if(pin2.value === "1234"){
        if(amountToWithdraw.value < getAmount){
            const getAmountToWithdraw = parseInt(amountToWithdraw.value);
            outAmount(getAmountToWithdraw);
            transactionHistory(cashout , getAmountToWithdraw);
            accountNumber.value = "";
        }else{
            alert("insuficent amount");
        }
        

    }else{
        alert("invalid pin");
    }
});



out.style.display = "none";
transaction.style.display = "none";

addBtn.addEventListener("click",()=>{
    transaction.style.display = "none";
    add.style.display = "block";
    out.style.display = "none";
});

outBtn.addEventListener("click",()=>{
    transaction.style.display = "none";
    add.style.display = "none";
    out.style.display = "block";
});

transactionBtn.addEventListener("click",()=>{
    transaction.style.display = "block";
    add.style.display = "none";
    out.style.display = "none";
});




document.getElementById("logout").addEventListener("click",()=>{
    window.location.href = "index.html"
});


