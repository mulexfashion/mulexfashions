

function getWishlist() {

    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

}



function saveWishlist(wishlist) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}




function updateCartCounter() {

    const counter =
        document.getElementById("cartCounter");

    if (!counter) return;

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    let total = 0;

    cart.forEach(function (item) {

        total += Number(
            item.quantity || 1
        );

    });

    counter.textContent = total;

}




function updateWishlistCounter() {

    const counter =
        document.getElementById(
            "wishlistCounter"
        );

    if (!counter) return;

    const wishlist =
        getWishlist();

    counter.textContent =
        wishlist.length;

}




function displayWishlist() {

    const container =
        document.getElementById(
            "wishlistProducts"
        );

    const empty =
        document.getElementById(
            "emptyWishlist"
        );

    const count =
        document.getElementById(
            "wishlistCount"
        );


    if (!container) return;


    const wishlist =
        getWishlist();


    container.innerHTML = "";


    count.textContent =
        wishlist.length +
        (wishlist.length === 1
            ? " ITEM"
            : " ITEMS");


    if (wishlist.length === 0) {

        empty.classList.add("show");

        return;

    }


    empty.classList.remove("show");


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

                <div class="category">
                    ${product.category || "FASHION"}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <div class="price">
                    UGX ${Number(product.price).toLocaleString()}
                </div>

            </div>


            <div class="wishlist-actions">

                <button
                    class="add-to-cart"
                    onclick="addWishlistToCart(${index})"
                >
                    ADD TO CART
                </button>


                <button
                    class="remove-wishlist"
                    onclick="removeFromWishlist(${index})"
                >
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

    const wishlist =
        getWishlist();


    wishlist.splice(index, 1);


    saveWishlist(wishlist);


    displayWishlist();

    updateWishlistCounter();

}




function addWishlistToCart(index) {

    const wishlist =
        getWishlist();


    const product =
        wishlist[index];


    if (!product) return;


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existing =
        cart.find(function (item) {

            return item.id === product.id;

        });


    if (existing) {

        existing.quantity =
            Number(existing.quantity || 1) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            image: product.image,

            category: product.category || "",

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    wishlist.splice(index, 1);

    saveWishlist(wishlist);


    displayWishlist();

    updateWishlistCounter();

    updateCartCounter();


    alert(
        product.name +
        " has been added to your cart."
    );

}



function updateEverything() {

    displayWishlist();

    updateWishlistCounter();

    updateCartCounter();

}




document.addEventListener(
    "DOMContentLoaded",
    updateEverything
);



window.addEventListener(
    "storage",
    updateEverything
);
