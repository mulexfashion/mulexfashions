/* =====================================================
   SIZE SELECTOR
===================================================== */

function toggleSizes(button) {

    const sizeOptions = button.nextElementSibling;

    sizeOptions.classList.toggle("show");

}


function selectSize(button, size) {

    const sizeOptions = button.parentElement;

    const sizeButton = sizeOptions.previousElementSibling;

    const productCard = button.closest(".product-card");


    // Remove previous selected size

    sizeOptions.querySelectorAll("button").forEach(function (btn) {

        btn.classList.remove("selected");

    });


    // Select clicked size

    button.classList.add("selected");


    // Change SIZE button text

    sizeButton.textContent = size;


    // Save selected size

    productCard.dataset.selectedSize = size;


    // Close size menu

    sizeOptions.classList.remove("show");

}



/* =====================================================
   PRODUCT IMAGE SLIDER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const sliders = document.querySelectorAll(".product-slider");


    sliders.forEach(function (slider) {

        const slides = slider.querySelectorAll(".product-slide");

        const dotsContainer = slider.querySelector(".slider-dots");


        // If there are no slides, stop

        if (slides.length === 0) {
            return;
        }


        // Create dots

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


        // Make first image active

        slides[0].classList.add("active");

    });

});



/* =====================================================
   SHOW A PARTICULAR SLIDE
===================================================== */

function showSlide(slider, index) {

    const slides = slider.querySelectorAll(".product-slide");

    const dots = slider.querySelectorAll(".slider-dot");


    if (slides.length === 0) {
        return;
    }


    // Go back to first image

    if (index >= slides.length) {

        index = 0;

    }


    // Go to last image

    if (index < 0) {

        index = slides.length - 1;

    }


    // Hide all images

    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    // Remove active from all dots

    dots.forEach(function (dot) {

        dot.classList.remove("active");

    });


    // Show selected image

    slides[index].classList.add("active");


    // Activate selected dot

    if (dots[index]) {

        dots[index].classList.add("active");

    }


    // Save currently displayed image

    const productCard = slider.closest(".product-card");


    if (productCard) {

        productCard.dataset.selectedImage =
            slides[index].getAttribute("src");

    }

}



/* =====================================================
   NEXT / PREVIOUS BUTTON
===================================================== */

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

