function getWishlist() {

    return JSON.parse(
        localStorage.getItem("mulexWishlist")
    ) || [];

}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "mulexWishlist",
        JSON.stringify(wishlist)
    );

}


function displayWishlist() {

    const wishlist =
        getWishlist();


    const container =
        document.getElementById(
            "wishlistProducts"
        );


    const emptyWishlist =
        document.getElementById(
            "emptyWishlist"
        );


    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length +
            (
                wishlist.length === 1
                    ? " ITEM"
                    : " ITEMS"
            );

    }


    if (wishlist.length === 0) {

        if (emptyWishlist) {

            emptyWishlist.classList.add(
                "show"
            );

        }

        return;

    }


    if (emptyWishlist) {

        emptyWishlist.classList.remove(
            "show"
        );

    }


    wishlist.forEach(function (product, index) {

        const productElement =
            document.createElement("div");


        productElement.className =
            "wishlist-product";


        productElement.innerHTML = `

            <div class="wishlist-product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="wishlist-product-details">

                <p class="category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="price">
                    ${product.price}
                </p>

                <p class="wishlist-size">
                    SIZE: ${product.size}
                </p>

            </div>


            <div class="wishlist-actions">

                <button
                    class="add-to-cart"
                    type="button"
                    onclick="addWishlistToCart(${index})">

                    ADD TO CART

                </button>


                <button
                    class="remove-wishlist"
                    type="button"
                    onclick="removeFromWishlist(${index})">

                    REMOVE

                </button>

            </div>

        `;


        container.appendChild(
            productElement
        );

    });

}


function removeFromWishlist(index) {

    let wishlist =
        getWishlist();


    wishlist.splice(
        index,
        1
    );


    saveWishlist(
        wishlist
    );


    displayWishlist();

    updateWishlistCounter();

}


function updateWishlistCounter() {

    const wishlist =
        getWishlist();


    const counter =
        document.getElementById(
            "wishlistCounter"
        );


    if (counter) {

        counter.textContent =
            wishlist.length;

    }

}


/* UPDATE CART COUNTER */

function updateCartCounter() {

    const cart =
        JSON.parse(
            localStorage.getItem("mulexCart")
        ) || [];


    const counter =
        document.getElementById(
            "cartCounter"
        );


    if (counter) {

        counter.textContent =
            cart.length;

    }

}


/* WISHLIST CART */

function addWishlistToCart(index) {

    const wishlist =
        getWishlist();


    const product =
        wishlist[index];


    if (!product) {
        return;
    }


    alert(
        product.name +
        " (" +
        product.size +
        ") added to cart."
    );

}


function addWishlistToCart(index) {

    const wishlist = getWishlist();
    const product = wishlist[index];

    if (!product) {
        return;
    }

    let cart =
        JSON.parse(
            localStorage.getItem("mulexCart")
        ) || [];


    // Convert price into a proper number
    const numericPrice =
        Number(
            String(product.price)
                .replace(/[^0-9.]/g, "")
        );


    if (isNaN(numericPrice)) {

        alert("Invalid product price.");

        return;
    }


   
    const existingProduct =
        cart.find(function (item) {

            return (
                item.name === product.name &&
                item.size === product.size
            );

        });


    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    } else {

        cart.push({

            ...product,

            price: numericPrice,

            quantity: 1

        });

    }


    localStorage.setItem(
        "mulexCart",
        JSON.stringify(cart)
    );


    updateCartCounter();


    alert(
        product.name +
        " (" +
        (product.size || "N/A") +
        ") added to cart."
    );
}



/* PAGE LOAD */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayWishlist();

        updateWishlistCounter();

        updateCartCounter();

    }
);

