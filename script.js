# Replace Your Entire script.js With This Code

```javascript
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


let cartItems = document.getElementById("cart-items");

let productPrice = document.getElementById("product-price");

let finalTotal = document.getElementById("final-total");

let shipping = 200;

let total = 0;


// LOAD CART
window.addEventListener("load", function(){

    if(cartItems){

        cartItems.innerHTML = localStorage.getItem("cartData") || "";

        total = parseInt(localStorage.getItem("cartTotal")) || 0;

        updateBill();

        attachCartEvents();

    }

});


// ADD TO CART
let buttons = document.querySelectorAll(".card button");

buttons.forEach(function(button){

    button.addEventListener("click", function(){

        let card = button.parentElement;

        let name = card.querySelector("h3").innerText;

        let priceText = card.querySelector("p").innerText;

        let image = card.querySelector("img").src;

        let price = parseInt(priceText.replace("Rs.",""));

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

        showPopup("Product Added To Cart 🛒");

    });

});


// CART EVENTS
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

            showPopup("Product Removed ❌");

        };

    });

}


// SAVE CART
function saveCart(){

    if(cartItems){

        localStorage.setItem("cartData", cartItems.innerHTML);

    }

    localStorage.setItem("cartTotal", total);

}


// UPDATE BILL
function updateBill(){

    if(productPrice){

        productPrice.innerText = total;

    }

    if(finalTotal){

        finalTotal.innerText = total + shipping;

    }

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


// ADDRESS POPUP
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
let addressSaved = localStorage.getItem("addressSaved") || false;

let saveAddressBtn = document.getElementById("save-address");

if(saveAddressBtn){

    saveAddressBtn.onclick = function(){

        let fullname = document.getElementById("fullname").value;

        let phone = document.getElementById("phone").value;

        let city = document.getElementById("city").value;

        let address = document.getElementById("address").value;


        if(fullname == "" || phone == "" || city == "" || address == ""){

            showPopup("Please Fill All Fields");

            return;

        }


        if(phone.length != 11){

            showPopup("Phone Number Must Be 11 Digits");

            return;

        }


        localStorage.setItem("addressSaved", true);

        addressPopup.style.display = "none";

        showPopup("Address Saved Successfully 😍");

    };

}


// PLACE ORDER
let orderBtn = document.getElementById("order-btn");

if(orderBtn){

    orderBtn.onclick = function(){

        let savedCart = localStorage.getItem("cartData");

        let savedAddress = localStorage.getItem("addressSaved");


        if(savedCart == "" || savedCart == null){

            showPopup("Your Cart Is Empty ❌");

            return;

        }


        if(savedAddress != "true"){

            showPopup("Please Add Address First 📍");

            return;

        }


        showPopup("Your Order Has Been Placed 😍");

    };

}


// SIDEBAR MENU
let menuIcon = document.getElementById("menu-icon");

let sidebar = document.getElementById("sidebar");

if(menuIcon){

    menuIcon.onclick = function(){

        sidebar.classList.toggle("active");

    };

}

 