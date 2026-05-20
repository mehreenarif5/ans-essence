let popup = document.getElementById("popup");

function showPopup(message){

if(popup){

popup.innerText = message;

popup.style.display = "block";

setTimeout(function(){

popup.style.display = "none";

},2000);

}

}


// CART
let cartItems = document.getElementById("cart-items");

let productPrice = document.getElementById("product-price");

let finalTotal = document.getElementById("final-total");

let shipping = 200;

let total = parseInt(localStorage.getItem("cartTotal")) || 0;


// UPDATE BILL
function updateBill(){

if(productPrice){

productPrice.innerText = total;

}

if(finalTotal){

finalTotal.innerText = total + shipping;

}

}


// SAVE CART
function saveCart(){

if(cartItems){

localStorage.setItem("cartData", cartItems.innerHTML);

}

localStorage.setItem("cartTotal", total);

}


// LOAD CART
window.onload = function(){

if(cartItems){

cartItems.innerHTML = localStorage.getItem("cartData") || "";

attachCartEvents();

updateBill();

}

};


// ADD TO CART
let buttons = document.querySelectorAll(".card button");

buttons.forEach(function(button){

button.onclick = function(){

let card = button.parentElement;

let name = card.querySelector("h3").innerText;

let price = parseInt(card.querySelector(".price").innerText.replace("Rs.",""));

let image = card.querySelector("img").src;

total += price;

let item = document.createElement("div");

item.classList.add("cart-item");

item.innerHTML = `

<img src="${image}" class="cart-image">

<h3>${name}</h3>

<p class="item-price">${price}</p>

<button class="minus-btn">-</button>

<span class="qty">1</span>

<button class="plus-btn">+</button>

<button class="remove-btn">Remove</button>

`;

let currentCart = localStorage.getItem("cartData") || "";

currentCart += item.outerHTML;

localStorage.setItem("cartData", currentCart);

localStorage.setItem("cartTotal", total);

showPopup("Added To Cart");

};

});


// EVENTS
function attachCartEvents(){

let items = document.querySelectorAll(".cart-item");

items.forEach(function(item){

let plusBtn = item.querySelector(".plus-btn");

let minusBtn = item.querySelector(".minus-btn");

let removeBtn = item.querySelector(".remove-btn");

let qty = item.querySelector(".qty");

let price = parseInt(item.querySelector(".item-price").innerText);

let quantity = parseInt(qty.innerText);


// PLUS
plusBtn.onclick = function(){

quantity++;

qty.innerText = quantity;

total += price;

updateBill();

saveCart();

};


// MINUS
minusBtn.onclick = function(){

if(quantity > 1){

quantity--;

qty.innerText = quantity;

total -= price;

updateBill();

saveCart();

}

};


// REMOVE
removeBtn.onclick = function(){

total -= price * quantity;

item.remove();

updateBill();

saveCart();

showPopup("Removed");

};

});

}


// SEARCH
let search = document.getElementById("search");

if(search){

search.addEventListener("keyup", function(){

let value = search.value.toLowerCase();

let cards = document.querySelectorAll(".card");

cards.forEach(function(card){

let title = card.querySelector("h3").innerText.toLowerCase();

if(title.includes(value)){

card.style.display = "block";

}
else{

card.style.display = "none";

}

});

});

}


// SIDEBAR
let menuIcon = document.getElementById("menu-icon");

let sidebar = document.getElementById("sidebar");

if(menuIcon){

menuIcon.onclick = function(){

sidebar.classList.toggle("active");

};   

}


//open-addressADDRESS
let openAddress = document.getElementById("open-address");

let addressPopup = document.getElementById("address-popup");

let closePopup = document.getElementById("close-popup");

if(openAddress){

openAddress.onclick = function(){

addressPopup.style.display = "flex";

};

}

if(closePopup){

closePopup.onclick = function(){

addressPopup.style.display = "none";

};

}


// SAVE ADDRESS
let saveAddress = document.getElementById("save-address");

if(saveAddress){

saveAddress.onclick = function(){

let fullname = document.getElementById("fullname").value;

let phone = document.getElementById("phone").value;

let city = document.getElementById("city").value;

let address = document.getElementById("address").value;

if(fullname == "" || phone == "" || city == "" || address == ""){

showPopup("Fill All Fields");

return;

}

localStorage.setItem("savedAddress", address);

showPopup("Address Saved");

addressPopup.style.display = "none";

};

}


// PLACE ORDER
let orderBtn = document.getElementById("order-btn");

if(orderBtn){

orderBtn.onclick = function(){

let savedCart = localStorage.getItem("cartData");

let savedAddress = localStorage.getItem("savedAddress");

if(savedCart == "" || savedCart == null){

showPopup("Cart Empty");

return;

}

if(savedAddress == null){

showPopup("Add Address");

return;

}

showPopup("Order Placed");

};

}


// SIGNUP
let signupBtn = document.getElementById("signup-btn");
let phone = document.getElementById("signup-phone").value;

if(signupBtn)

signupBtn.onclick = function(){

let name = document.getElementById("signup-name").value;

let email = document.getElementById("signup-email").value;

let password = document.getElementById("signup-password").value;
if(name == "" || email == "" || phone == "" || password == ""){

localStorage.setItem("userName", name);

localStorage.setItem("userEmail", email);
localStorage.setItem("userPhone", phone);

localStorage.setItem("userPassword", password);

alert("Signup Successful");

window.location.href = "login.html";

};

}


// LOGIN
let loginBtn = document.getElementById("login-btn");

if(loginBtn){

loginBtn.onclick = function(){

let email = document.getElementById("login-email").value;

let password = document.getElementById("login-password").value;

let savedEmail = localStorage.getItem("userEmail");

let savedPassword = localStorage.getItem("userPassword");

if(email == savedEmail && password == savedPassword){

alert("Login Successful");

window.location.href = "index.html";

}
else{

alert("Wrong Email Or Password");

}

};

}
