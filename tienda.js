document.addEventListener("DOMContentLoaded", function() {
    const productImages = document.getElementById("product-images");
    const installmentsSelect = document.getElementById("installments");
    const resultElement = document.getElementById("result");

    function calcularIntereses() {
        const selectedOption = installmentsSelect.value;
        const productType = productImages.querySelector(".active").getAttribute("data-product");
        const productPrice = parseFloat(productImages.querySelector(".active").getAttribute("data-price"));
        const installments = parseInt(selectedOption);

        let interestRate = 0;

        if (installments === 2) {
            interestRate = 10;
        } else if (installments === 3) {
            interestRate = 15;
        }

        const interestAmount = (productPrice * (interestRate / 100));
        const finalPrice = productPrice + interestAmount;

        resultElement.innerHTML = `Intereses para el ${productType} en ${installments} cuotas: $${interestAmount.toFixed(2)}<br>Precio final: $${finalPrice.toFixed(2)}`;
    }
    productImages.addEventListener("click", function(event) {
        if (event.target.tagName === "IMG") {
            const allImages = productImages.querySelectorAll("img");
            allImages.forEach(image => image.classList.remove("active"));

            event.target.classList.add("active");

            calcularIntereses();
        }
    });
    installmentsSelect.addEventListener("change", function() {
        calcularIntereses();
    });
    calcularIntereses();
});