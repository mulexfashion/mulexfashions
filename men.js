
/* SIZE SELECTOR */

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


