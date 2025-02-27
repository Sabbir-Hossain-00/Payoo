const loginBtn = document.getElementById("login-btn");
const number = document.getElementById("number");
const pin = document.getElementById("pin");



loginBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log(number.value.length);
    if(pin.value === "1234"){
        if(number.value.length === 11){
           window.location.href = "main.html";
        }else{
            alert("invalid number")
        } 
    }
    else{
        alert("invalid pin")
    }
});
