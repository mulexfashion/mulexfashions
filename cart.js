/* CART SYSTEM  */

function getCart() {

    return JSON.parse(
        localStorage.getItem("mulexCart")
    ) || [];

}

function saveCart(cart) {

    localStorage.setItem(
        "mulexCart",
        JSON.stringify(cart)
    );

}


function formatPrice(amount) {

    return "UGX " +
        Number(amount).toLocaleString("en-US");

}


function displayCart() {

    const cart =
        getCart();


    const cartProducts =
        document.getElementById("cartProducts");


    const emptyCart =
        document.getElementById("emptyCart");


    if (!cartProducts || !emptyCart) {
        return;
    }


    cartProducts.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.classList.add("show");

        updateCartSummary();

        return;

    }


    emptyCart.classList.remove("show");


    cart.forEach(function (item, index) {

        const cartProduct =
            document.createElement("div");


        cartProduct.className =
            "cart-product";


        cartProduct.innerHTML = `

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


                <p class="price">
                    ${formatPrice(item.price)}
                </p>


                <p class="size">
                    SIZE: ${item.size}
                </p>


                <div class="cart-quantity">

                    <button
                        type="button"
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        onclick="changeQuantity(${index}, 1)"
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
                    ${formatPrice(
            item.price * item.quantity
        )}
                </strong>

            </div>

        `;


        cartProducts.appendChild(
            cartProduct
        );

    });


    updateCartSummary();

}



function updateWishlistCounter() {

    const wishlist =
        JSON.parse(
            localStorage.getItem("mulexWishlist")
        ) || [];

    const counters =
        document.querySelectorAll(
            "#wishlistCounter"
        );

    counters.forEach(function (counter) {

        counter.textContent =
            wishlist.length;

    });
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCounter();

        updateWishlistCounter();

    }
);


document.addEventListener(
    "visibilitychange",
    function () {

        if (!document.hidden) {

            updateWishlistCounter();

            updateCartCounter();

        }

    }
);



function changeQuantity(index, change) {

    let cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    cart[index].quantity += change;



    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);


    displayCart();


    updateCartCounter();

}


function removeFromCart(index) {

    let cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    saveCart(cart);


    displayCart();


    updateCartCounter();

}


function updateCartCounter() {

    const cart =
        getCart();


    const totalItems =
        cart.reduce(function (total, item) {

            return total + item.quantity;

        }, 0);


    const counters =
        document.querySelectorAll(
            "#cartCounter"
        );


    counters.forEach(function (counter) {

        counter.textContent =
            totalItems;

    });

}


function updateCartSummary() {

    const cart =
        getCart();


    const itemCount =
        document.getElementById("itemCount");


    const subtotalElement =
        document.getElementById("subtotal");


    const deliveryElement =
        document.getElementById("delivery");


    const discountElement =
        document.getElementById("discount");


    const totalElement =
        document.getElementById("total");


    const totalItems =
        cart.reduce(function (total, item) {

            return total + item.quantity;

        }, 0);


    if (itemCount) {

        itemCount.textContent =
            totalItems +
            (totalItems === 1
                ? " ITEM"
                : " ITEMS");

    }


    const subtotal =
        cart.reduce(function (total, item) {

            return total +
                (item.price * item.quantity);

        }, 0);



    const delivery =
        cart.length > 0
            ? 0
            : 0;


    const discount = 0;



    const total =
        subtotal +
        delivery -
        discount;


    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(subtotal);

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            formatPrice(delivery);

    }


    if (discountElement) {

        discountElement.textContent =
            formatPrice(discount);

    }


    if (totalElement) {

        totalElement.textContent =
            formatPrice(total);

    }

}



function applyPromo() {

    const input =
        document.getElementById("promoCode");


    const message =
        document.getElementById("promoMessage");


    if (!input || !message) {
        return;
    }


    const code =
        input.value
            .trim()
            .toUpperCase();


    if (!code) {

        message.textContent =
            "Please enter a promo code.";

        message.style.color =
            "red";

        return;

    }




    if (code === "MULEX10") {

        const cart =
            getCart();


        const subtotal =
            cart.reduce(function (total, item) {

                return total +
                    (item.price * item.quantity);

            }, 0);


        const discount =
            Math.round(
                subtotal * 0.10
            );


        const delivery =
            cart.length > 0
                ? 10000
                : 0;


        const total =
            subtotal +
            delivery -
            discount;


        document.getElementById(
            "discount"
        ).textContent =
            formatPrice(discount);


        document.getElementById(
            "total"
        ).textContent =
            formatPrice(total);


        message.textContent =
            "Promo code applied — 10% OFF!";


        message.style.color =
            "green";

    }


    else {

        message.textContent =
            "Invalid promo code.";

        message.style.color =
            "red";

    }

}


function checkout() {

    const cart = getCart();

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add some products first."
        );

        return;

    }

    window.location.href = "checkout.html";

}



document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCounter();

    }
);
