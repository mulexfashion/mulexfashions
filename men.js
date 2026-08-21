/*  SIZE SELECTOR */

function toggleSizes(button) {

    const sizeOptions = button.nextElementSibling;

    sizeOptions.classList.toggle("show");

}


function selectSize(button, size) {

    const sizeOptions = button.parentElement;

    const sizeButton = sizeOptions.previousElementSibling;

    const productCard = button.closest(".product-card");




    sizeOptions.querySelectorAll("button").forEach(function (btn) {

        btn.classList.remove("selected");

    });

    button.classList.add("selected");

    sizeButton.textContent = size;


    productCard.dataset.selectedSize = size;


    sizeOptions.classList.remove("show");

}



/* PRODUCT IMAGE SLIDER */

document.addEventListener("DOMContentLoaded", function () {

    const sliders = document.querySelectorAll(".product-slider");


    sliders.forEach(function (slider) {

        const slides = slider.querySelectorAll(".product-slide");

        const dotsContainer = slider.querySelector(".slider-dots");


        if (slides.length === 0) {
            return;
        }


        slides.forEach(function (slide, index) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.classList.add("slider-dot");


            if (index === 0) {

                dot.classList.add("active");

            }


            dot.addEventListener("click", function (event) {

                event.preventDefault();

                event.stopPropagation();

                showSlide(slider, index);

            });


            dotsContainer.appendChild(dot);

        });


        slides[0].classList.add("active");

    });

});



function showSlide(slider, index) {

    const slides = slider.querySelectorAll(".product-slide");

    const dots = slider.querySelectorAll(".slider-dot");


    if (slides.length === 0) {
        return;
    }


    if (index >= slides.length) {

        index = 0;

    }


    if (index < 0) {

        index = slides.length - 1;

    }

    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    dots.forEach(function (dot) {

        dot.classList.remove("active");

    });


    slides[index].classList.add("active");


    if (dots[index]) {

        dots[index].classList.add("active");

    }



    const productCard = slider.closest(".product-card");


    if (productCard) {

        productCard.dataset.selectedImage =
            slides[index].getAttribute("src");

    }

}



function changeSlide(event, button, direction) {

    event.preventDefault();

    event.stopPropagation();


    const slider = button.closest(".product-slider");


    const slides = slider.querySelectorAll(".product-slide");


    let currentIndex = 0;


    slides.forEach(function (slide, index) {

        if (slide.classList.contains("active")) {

            currentIndex = index;

        }

    });


    showSlide(
        slider,
        currentIndex + direction
    );

}



function changeSlide(button, direction) {

    const card = button.closest(".product-image");

    const slides = card.querySelectorAll(".slide");
    const dots = card.querySelectorAll(".dot");

    let current = 0;


    slides.forEach((slide, index) => {

        if (slide.classList.contains("active")) {
            current = index;
        }

    });


    let next = current + direction;


    if (next >= slides.length) {
        next = 0;
    }


    if (next < 0) {
        next = slides.length - 1;
    }


    slides.forEach(slide => {
        slide.classList.remove("active");
    });


    dots.forEach(dot => {
        dot.classList.remove("active");
    });


    slides[next].classList.add("active");


    if (dots[next]) {
        dots[next].classList.add("active");
    }
}


function goToSlide(dot, number) {

    const card = dot.closest(".product-image");

    const slides = card.querySelectorAll(".slide");
    const dots = card.querySelectorAll(".dot");


    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });


    slides[number].classList.add("active");


    dots[number].classList.add("active");
}




/*  WISHLIST SYSTEM  */

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



function toggleWishlist(button) {

    const productCard =
        button.closest(".product-card");


    if (!productCard) {
        return;
    }


    const selectedSize =
        productCard.dataset.selectedSize;


    if (!selectedSize) {

        alert("Please select a size before adding to your wishlist.");

        return;

    }




    const productId =
        productCard.dataset.productId;


    if (!productId) {

        console.error(
            "Product is missing data-product-id"
        );

        return;

    }


    const name =
        productCard
            .querySelector("h3")
            .textContent
            .trim();


    const category =
        productCard
            .querySelector(".product-category")
            .textContent
            .trim();


    const price =
        productCard
            .querySelector(".price")
            .textContent
            .trim();


    const activeImage =
        productCard.querySelector(".slide.active");


    const image =
        activeImage
            ? activeImage.getAttribute("src")
            : "";



    let wishlist =
        getWishlist();



    const existingIndex =
        wishlist.findIndex(function (item) {

            return (
                item.id === productId &&
                item.size === selectedSize
            );

        });


    if (existingIndex !== -1) {

        wishlist.splice(
            existingIndex,
            1
        );


        button.classList.remove("active");

        button.textContent = "♡";

        button.setAttribute(
            "aria-label",
            "Add to wishlist"
        );

    }


    else {

        const product = {

            id: productId,

            name: name,

            category: category,

            price: price,

            image: image,

            size: selectedSize

        };


        wishlist.push(product);


        button.classList.add("active");

        button.textContent = "♥";

        button.setAttribute(
            "aria-label",
            "Remove from wishlist"
        );

    }


    saveWishlist(wishlist);


    updateWishlistCounter();

}


function updateWishlistCounter() {

    const wishlist =
        getWishlist();


    const counters =
        document.querySelectorAll(
            "#wishlistCounter"
        );


    counters.forEach(function (counter) {

        counter.textContent =
            wishlist.length;

    });

}


function restoreWishlistButtons() {

    const wishlist =
        getWishlist();


    document
        .querySelectorAll(".product-card")
        .forEach(function (productCard) {

            const productId =
                productCard.dataset.productId;


            const button =
                productCard.querySelector(
                    ".wishlist"
                );


            if (!button || !productId) {
                return;
            }


            const exists =
                wishlist.some(function (item) {

                    return item.id === productId;

                });


            if (exists) {

                button.classList.add("active");

                button.textContent = "♥";

                button.setAttribute(
                    "aria-label",
                    "Remove from wishlist"
                );

            }

        });

}



document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateWishlistCounter();

        restoreWishlistButtons();

    }
);




/* CART SECTION */


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


function addToCart(button) {

    const productCard =
        button.closest(".product-card");


    if (!productCard) {
        return;
    }


    const selectedSize =
        productCard.dataset.selectedSize;


    if (!selectedSize) {

        alert(
            "Please select a size before adding this product to your cart."
        );

        return;

    }


    const productId =
        productCard.dataset.productId;


    if (!productId) {

        console.error(
            "Product is missing data-product-id"
        );

        return;

    }


    const name =
        productCard
            .querySelector("h3")
            .textContent
            .trim();


    const category =
        productCard
            .querySelector(".product-category")
            .textContent
            .trim();


    const priceText =
        productCard
            .querySelector(".price")
            .textContent
            .trim();


    const price =
        parseInt(
            priceText.replace(/[^\d]/g, ""),
            10
        ) || 0;


    const activeImage =
        productCard.querySelector(".slide.active");


    const image =
        activeImage
            ? activeImage.getAttribute("src")
            : "";


    let cart =
        getCart();


    const existingItem =
        cart.find(function (item) {

            return (
                item.id === productId &&
                item.size === selectedSize
            );

        });


    if (existingItem) {

        existingItem.quantity += 1;

    }


    else {

        const product = {

            id: productId,

            name: name,

            category: category,

            price: price,

            image: image,

            size: selectedSize,

            quantity: 1

        };


        cart.push(product);

    }


    saveCart(cart);


    updateCartCounter();


    const originalText =
        button.textContent;


    button.textContent =
        "ADDED ✓";


    button.classList.add("added");


    setTimeout(function () {

        button.textContent =
            originalText;

        button.classList.remove("added");

    }, 1200);

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


document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCounter();

    }
);

