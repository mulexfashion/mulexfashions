document.addEventListener("DOMContentLoaded", function () {
    renderCart();
    updateCartCounter();
});


/* =========================
   GET CART
========================= */

function getCart() {
    return JSON.parse(localStorage.getItem("mulexCart")) || [];
}


/* =========================
   SAVE CART
========================= */

function saveCart(cart) {
    localStorage.setItem("mulexCart", JSON.stringify(cart));

    updateCartCounter();
}


/* =========================
   CART COUNTER
========================= */

function updateCartCounter() {

    const cart = getCart();

    const totalQuantity = cart.reduce(function (total, item) {
        return total + Number(item.quantity || 0);
    }, 0);

    document.querySelectorAll("#cartCounter").forEach(function (counter) {
        counter.textContent = totalQuantity;
    });
}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    const cart = getCart();

    const cartProducts =
        document.getElementById("cartProducts");

    const emptyCart =
        document.getElementById("emptyCart");

    const itemCount =
        document.getElementById("itemCount");


    if (!cartProducts) {
        return;
    }


    /* Clear existing products */

    cartProducts.innerHTML = "";


    /* =========================
       EMPTY CART
    ========================= */

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.classList.add("show");
        }

        if (itemCount) {
            itemCount.textContent = "0 ITEMS";
        }

        updateSummary();

        return;
    }


    /* Hide empty cart message */

    if (emptyCart) {
        emptyCart.classList.remove("show");
    }


    /* =========================
       TOTAL NUMBER OF ITEMS
    ========================= */

    const totalItems = cart.reduce(function (total, item) {

        return total + Number(item.quantity || 0);

    }, 0);


    if (itemCount) {

        itemCount.textContent =
            totalItems +
            (totalItems === 1 ? " ITEM" : " ITEMS");
    }


    /* =========================
       CREATE PRODUCTS
    ========================= */

    cart.forEach(function (item, index) {

        const productElement =
            document.createElement("div");

        productElement.className = "cart-product";


        productElement.innerHTML = `

            <div class="cart-product-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-product-details">

                <h3>
                    ${item.name}
                </h3>


                <div class="price">
                    UGX ${formatPrice(item.price)}
                </div>


                <div class="size">
                    Size: ${item.size || "N/A"}
                </div>


                <div class="cart-quantity">

                    <button
                        type="button"
                        onclick="decreaseCartQuantity(${index})"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        onclick="increaseCartQuantity(${index})"
                    >
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    REMOVE
                </button>

            </div>


            <div class="cart-product-total">

                <strong>
                    UGX ${formatPrice(
                        Number(item.price) *
                        Number(item.quantity)
                    )}
                </strong>

            </div>

        `;


        cartProducts.appendChild(productElement);

    });


    /* Update totals */

    updateSummary();
}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseCartQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        Number(cart[index].quantity) + 1;


    saveCart(cart);

    renderCart();
}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseCartQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    if (Number(cart[index].quantity) > 1) {

        cart[index].quantity =
            Number(cart[index].quantity) - 1;

    } else {

        cart.splice(index, 1);
    }


    saveCart(cart);

    renderCart();
}


/* =========================
   REMOVE PRODUCT
========================= */

function removeFromCart(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    saveCart(cart);

    renderCart();
}


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {

    return Number(price).toLocaleString("en-US");
}


/* =========================
   ORDER SUMMARY
========================= */

function updateSummary() {

    const cart = getCart();


    let subtotal = 0;


    cart.forEach(function (item) {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    /*
       DELIVERY

       Change 5,000 to whatever
       delivery fee you want.
    */

    const delivery =
        subtotal > 0 ? 5000 : 0;


    const discount = 0;


    const total =
        subtotal +
        delivery -
        discount;


    const subtotalElement =
        document.getElementById("subtotal");

    const deliveryElement =
        document.getElementById("delivery");

    const discountElement =
        document.getElementById("discount");

    const totalElement =
        document.getElementById("total");


    if (subtotalElement) {

        subtotalElement.textContent =
            "UGX " + formatPrice(subtotal);
    }


    if (deliveryElement) {

        deliveryElement.textContent =
            "UGX " + formatPrice(delivery);
    }


    if (discountElement) {

        discountElement.textContent =
            "UGX " + formatPrice(discount);
    }


    if (totalElement) {

        totalElement.textContent =
            "UGX " + formatPrice(total);
    }
}


/* =========================
   PROMO CODE
========================= */

function applyPromo() {

    const input =
        document.getElementById("promoCode");

    const message =
        document.getElementById("promoMessage");


    if (!input || !message) {
        return;
    }


    const code =
        input.value.trim().toUpperCase();


    if (code === "MULEX10") {

        message.textContent =
            "Promo code applied!";

        message.style.color = "green";


    } else if (code === "") {

        message.textContent =
            "Please enter a promo code.";

        message.style.color = "red";


    } else {

        message.textContent =
            "Invalid promo code.";

        message.style.color = "red";
    }
}


/* =========================
   CHECKOUT
========================= */

function checkout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    alert("Checkout is ready to be connected.");
}
