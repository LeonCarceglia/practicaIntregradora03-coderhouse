document.addEventListener("DOMContentLoaded", function () {
    const addToCartForms = document.querySelectorAll(".addToCartForm")

    addToCartForms.forEach(function (form) {
        const addToCartButton = form.querySelector(".addToCartButton")
        addToCartButton.addEventListener("click", function (event) {
            event.preventDefault()
            const quantityInput = form.querySelector(".quantity")
            const quantity = quantityInput.value
            const cartId = form.dataset.cart
            const productId = form.dataset.productId
            form.action = `/api/carts/${cartId}/product/${productId}/?quantity=${quantity}`
            form.submit()
        })
    })
})