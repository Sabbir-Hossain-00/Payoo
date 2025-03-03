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

let historyArr = showTransection() || [];
const time = new Date().toLocaleTimeString();
const date = new Date().toDateString();
const transactionHistory = (method , amount , fromTo , toFrom)=>{
    const bank = document.getElementById("bank").value;
    const newElm = document.createElement("div");
    newElm.innerHTML = `
    <div>
    <div class = "border border-gray-600 p-2 rounded-lg flex justify-center items-center gap-2 ">
     <img src="assets/money1.png" alt="">
     <p>${method} ${amount}$ ${fromTo} ${bank} ${toFrom} 01319556163 at ${time} on ${date}</p>
    </div>
    </div>
    
    `;
    transHistory.append(newElm);
    historyArr.push(newElm.innerText);
    localStorage.setItem("historyOfTransection", JSON.stringify(historyArr));
   
}

  for(let arr of historyArr){
    const newElm = document.createElement("div");
    newElm.innerHTML = ` <div>
    <div class = "border border-gray-600 p-2 rounded-lg flex justify-center items-center gap-2 ">
     <img src="assets/money1.png" alt="">
     <p>${arr}</p>
    </div>
    </div>`;
    transHistory.append(newElm);
}



document.getElementById("clear-history").addEventListener("click" , ()=>{
    historyArr = [];
    console.log(historyArr);
    localStorage.setItem("historyOfTransection",JSON.stringify(historyArr));
    transHistory.innerHTML = "";
})



const addAmount = (amounts)=>{
    const getAmount = parseInt(amount.innerText);
    const totalAmount = getAmount + amounts ;
    amount.innerText = totalAmount ;
    amountToAdd.value = "";
    pin.value = "";
}



const outAmount = (amounts)=>{
    const getAmount = parseInt(amount.innerText);
    const totalAmount = getAmount - amounts ;
    amount.innerText = totalAmount ;
    amountToWithdraw.value = "";
    pin2.value = "";
   
}



const getLoaclTotal = ()=>{
    return JSON.parse(localStorage.getItem("localTotal"));
}
let localAmount = getLoaclTotal() || 50000;

const showLocalTotal = (amount)=>{
    localAmount = amount.innerText ;
   localStorage.setItem("localTotal", JSON.stringify(localAmount));
}
amount.innerText = localAmount ;



addMoneyBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const addMoney = "Money added ";
    const from = "from";
    const to = "to"
   if(pin.value === "1234"){
    if(accountNumber.value.length === 11){
        if(amountToAdd.value > 0){
            const getAmountToAdd = parseInt(amountToAdd.value);
            addAmount(getAmountToAdd);
            transactionHistory(addMoney, getAmountToAdd,from , to);
            showLocalTotal(amount);
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
    const to = "to";
    const from = "from"
    const getAmount = parseFloat(amount.innerText);

    // console.log(getAmount);

    if(pin2.value === "1234"){
        if(amountToWithdraw.value < getAmount){
            const getAmountToWithdraw = parseInt(amountToWithdraw.value);
            outAmount(getAmountToWithdraw);
            transactionHistory(cashout , getAmountToWithdraw , to , from);
            showLocalTotal(amount);
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


