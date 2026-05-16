let popup = document.getElementById("popup");

function showPopup(message){

    popup.innerText = message;

    popup.style.display = "block";

    setTimeout(() => {

        popup.style.display = "none";

    },2000);

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

    localStorage.setItem("cartData", cartItems.innerHTML);

    localStorage.setItem("cartTotal", total);

}


// LOAD CART
window.addEventListener("load", function(){

    if(cartItems){

        cartItems.innerHTML = localStorage.getItem("cartData") || "";

        attachCartEvents();

        updateBill();

    }

});


// ADD TO CART
let buttons = document.querySelectorAll(".card button");

buttons.forEach(button => {

    button.addEventListener("click", function(){

        let card = button.parentElement;

        let name = card.querySelector("h3").innerText;

        let priceText = card.querySelector(".price").innerText;

        let image = card.querySelector("img").src;

        let price = parseInt(priceText.replace("Rs.",""));

        total += price;

        let item = `

        <div class="cart-item">

            <img src="${image}" class="cart-image">

            <h3>${name}</h3>

            <p class="item-price">${price}</p>

            <div class="quantity-box">

                <button class="minus-btn">-</button>

                <span class="qty">1</span>

                <button class="plus-btn">+</button>

            </div>

            <button class="remove-btn">Remove</button>

        </div>

        `;

        let currentCart = localStorage.getItem("cartData") || "";

        currentCart += item;

        localStorage.setItem("cartData", currentCart);

        localStorage.setItem("cartTotal", total);

        showPopup("Product Added To Cart 🛒");

    });

});


// CART EVENTS
function attachCartEvents(){

    let items = document.querySelectorAll(".cart-item");

    items.forEach(item => {

        let plusBtn = item.querySelector(".plus-btn");

        let minusBtn = item.querySelector(".minus-btn");

        let removeBtn = item.querySelector(".remove-btn");

        let qty = item.querySelector(".qty");

        let price = parseInt(item.querySelector(".item-price").innerText);

        let quantity = parseInt(qty.innerText);


        plusBtn.onclick = function(){

            quantity++;

            qty.innerText = quantity;

            total += price;

            updateBill();

            saveCart();

        };


        minusBtn.onclick = function(){

            if(quantity > 1){

                quantity--;

                qty.innerText = quantity;

                total -= price;

                updateBill();

                saveCart();

            }

        };


        removeBtn.onclick = function(){

            total -= price * quantity;

            item.remove();

            updateBill();

            saveCart();

            showPopup("Product Removed ❌");

        };

    });

}


// SEARCH
let search = document.getElementById("search");

if(search){

    search.addEventListener("keyup", function(){

        let value = search.value.toLowerCase();

        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {

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
