// ======================================================
// ELECTROMART - ELECTRONICS SHOPPING PORTAL
// FRONTEND ONLY - NO SUPABASE
// ======================================================


// ======================================================
// PRODUCTS
// ======================================================

const products = [

    {
        id: 1,
        name: "iPhone 15",
        brand: "Apple",
        category: "Smartphones",
        description:
            "Apple iPhone with powerful performance and excellent camera.",
        price: 69999,
        originalPrice: 79999,
        discount: 13,
        rating: 4.5,
        stock: 20,
        icon: "bi-phone"
    },

    {
        id: 2,
        name: "Galaxy S24",
        brand: "Samsung",
        category: "Smartphones",
        description:
            "Premium Samsung smartphone with advanced features.",
        price: 74999,
        originalPrice: 84999,
        discount: 12,
        rating: 4.6,
        stock: 15,
        icon: "bi-phone"
    },

    {
        id: 3,
        name: "MacBook Air M2",
        brand: "Apple",
        category: "Laptops",
        description:
            "Lightweight laptop powered by Apple's M2 chip.",
        price: 89999,
        originalPrice: 99999,
        discount: 10,
        rating: 4.8,
        stock: 10,
        icon: "bi-laptop"
    },

    {
        id: 4,
        name: "Dell Inspiron 15",
        brand: "Dell",
        category: "Laptops",
        description:
            "Reliable laptop suitable for students and professionals.",
        price: 58999,
        originalPrice: 64999,
        discount: 9,
        rating: 4.3,
        stock: 18,
        icon: "bi-laptop"
    },

    {
        id: 5,
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "Headphones",
        description:
            "Premium wireless headphones with noise cancellation.",
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        rating: 4.7,
        stock: 12,
        icon: "bi-headphones"
    },

    {
        id: 6,
        name: "Apple Watch Series 9",
        brand: "Apple",
        category: "Smartwatches",
        description:
            "Smartwatch with health and fitness tracking features.",
        price: 41999,
        originalPrice: 45999,
        discount: 9,
        rating: 4.6,
        stock: 14,
        icon: "bi-watch"
    },

    {
        id: 7,
        name: "Samsung 55 Inch 4K TV",
        brand: "Samsung",
        category: "Televisions",
        description:
            "4K smart television with vibrant picture quality.",
        price: 54999,
        originalPrice: 64999,
        discount: 15,
        rating: 4.5,
        stock: 8,
        icon: "bi-tv"
    },

    {
        id: 8,
        name: "Sony Bravia 43 Inch",
        brand: "Sony",
        category: "Televisions",
        description:
            "Smart 4K television with excellent picture quality.",
        price: 44999,
        originalPrice: 52999,
        discount: 15,
        rating: 4.4,
        stock: 9,
        icon: "bi-tv"
    },

    {
        id: 9,
        name: "Canon EOS 1500D",
        brand: "Canon",
        category: "Cameras",
        description:
            "DSLR camera suitable for photography enthusiasts.",
        price: 42999,
        originalPrice: 49999,
        discount: 14,
        rating: 4.4,
        stock: 7,
        icon: "bi-camera"
    },

    {
        id: 10,
        name: "Sony Alpha A6400",
        brand: "Sony",
        category: "Cameras",
        description:
            "Compact mirrorless camera with excellent image quality.",
        price: 69999,
        originalPrice: 79999,
        discount: 13,
        rating: 4.5,
        stock: 6,
        icon: "bi-camera"
    }

];


// ======================================================
// GLOBAL VARIABLES
// ======================================================

let displayedProducts = [...products];

let cart = [];

let compareProducts = [];


// ======================================================
// DISPLAY PRODUCTS
// ======================================================

function displayProducts(productList) {

    const container =
        document.getElementById("productContainer");

    const noProducts =
        document.getElementById("noProducts");

    if (!container) {
        console.warn(
            "productContainer not found in index.html"
        );
        return;
    }

    container.innerHTML = "";

    // No products found
    if (!productList || productList.length === 0) {

        if (noProducts) {
            noProducts.style.display = "block";
        }

        return;
    }

    if (noProducts) {
        noProducts.style.display = "none";
    }

    productList.forEach(product => {

        let discount =
            Number(product.discount) || 0;

        // Calculate discount if not provided
        if (
            discount === 0 &&
            product.originalPrice > product.price
        ) {

            discount =
                Math.round(
                    (
                        (product.originalPrice - product.price)
                        / product.originalPrice
                    ) * 100
                );
        }

        // Check comparison
        const isCompared =
            compareProducts.includes(product.id);

        // Rating stars
        const fullStars =
            Math.floor(product.rating);

        const ratingStars =
            "★".repeat(fullStars);

        // Product card
        container.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    <i class="bi ${product.icon}"></i>

                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.brand}
                    </p>

                    <div class="rating">

                        ${ratingStars}

                        <span>
                            ${product.rating}
                        </span>

                    </div>

                    <div class="price">

                        ₹${product.price.toLocaleString("en-IN")}

                        ${
                            product.originalPrice > product.price
                                ? `
                                    <span class="original-price">
                                        ₹${product.originalPrice.toLocaleString("en-IN")}
                                    </span>
                                `
                                : ""
                        }

                    </div>

                    ${
                        discount > 0
                            ? `
                                <div class="discount">
                                    ${discount}% OFF
                                </div>
                            `
                            : ""
                    }

                    <div class="product-buttons">

                        <button
                            class="cart-btn"
                            onclick="addToCart(${product.id})"
                        >

                            <i class="bi bi-cart-plus"></i>

                            Cart

                        </button>

                        <button
                            class="compare-btn ${
                                isCompared ? "selected" : ""
                            }"
                            onclick="toggleCompare(${product.id})"
                        >

                            <i class="bi bi-arrow-left-right"></i>

                            ${
                                isCompared
                                    ? "Selected"
                                    : "Compare"
                            }

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// ======================================================
// SEARCH PRODUCTS
// ======================================================

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();

    displayedProducts =
        products.filter(product => {

            return (

                product.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.brand
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.description
                    .toLowerCase()
                    .includes(searchValue)

            );

        });

    displayProducts(displayedProducts);

}


// ======================================================
// CATEGORY FILTER
// ======================================================

function filterCategory(category) {

    if (category === "All") {

        displayedProducts =
            [...products];

    } else {

        displayedProducts =
            products.filter(
                product =>
                    product.category === category
            );

    }

    displayProducts(displayedProducts);

    // Clear search field
    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {
        searchInput.value = "";
    }

    // Reset sort
    const sortSelect =
        document.getElementById("sortSelect");

    if (sortSelect) {
        sortSelect.value = "default";
    }

    // Scroll to products
    const productsSection =
        document.getElementById("products");

    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ======================================================
// SORT PRODUCTS
// ======================================================

function sortProducts() {

    const sortSelect =
        document.getElementById("sortSelect");

    if (!sortSelect) {
        return;
    }

    const sortValue =
        sortSelect.value;

    if (sortValue === "low") {

        displayedProducts.sort(
            (a, b) =>
                a.price - b.price
        );

    }

    else if (sortValue === "high") {

        displayedProducts.sort(
            (a, b) =>
                b.price - a.price
        );

    }

    else if (sortValue === "rating") {

        displayedProducts.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }

    else {

        displayedProducts =
            [...products];

    }

    displayProducts(displayedProducts);

}


// ======================================================
// ADD TO CART
// ======================================================

function addToCart(productId) {

    const product =
        products.find(
            product =>
                product.id === productId
        );

    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;
    }

    const existingProduct =
        cart.find(
            item =>
                item.id === productId
        );

    // Check stock
    if (existingProduct) {

        if (
            existingProduct.quantity >=
            product.stock
        ) {

            alert(
                `Only ${product.stock} units of ${product.name} are available.`
            );

            return;
        }

        existingProduct.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    updateCartCount();

    displayCart();

    alert(
        `${product.name} added to cart!`
    );

}


// ======================================================
// UPDATE CART COUNT
// ======================================================

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


// ======================================================
// DISPLAY CART
// ======================================================

function displayCart() {

    const container =
        document.getElementById("cartContainer");

    if (!container) {
        return;
    }

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <i class="bi bi-cart-x"></i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add products to your cart
                    to see them here.
                </p>

            </div>

        `;

        return;
    }

    let total = 0;

    container.innerHTML = "";

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        container.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <div class="cart-item-icon">

                        <i class="bi ${item.icon}"></i>

                    </div>

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ₹${item.price.toLocaleString("en-IN")}
                        </p>

                    </div>

                </div>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>

                </div>

                <strong>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </strong>

                <button
                    class="remove-cart"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;

    });

    container.innerHTML += `

        <div class="cart-summary">

            <h2>
                Total:
                ₹${total.toLocaleString("en-IN")}
            </h2>

            <button
                class="checkout-btn"
                onclick="checkout()"
            >
                Proceed to Checkout
            </button>

        </div>

    `;

}


// ======================================================
// CHANGE QUANTITY
// ======================================================

function changeQuantity(productId, change) {

    const item =
        cart.find(
            item =>
                item.id === productId
        );

    if (!item) {
        return;
    }

    // Check stock when increasing
    if (
        change > 0 &&
        item.quantity >= item.stock
    ) {

        alert(
            `Only ${item.stock} units of ${item.name} are available.`
        );

        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;
    }

    updateCartCount();

    displayCart();

}


// ======================================================
// REMOVE FROM CART
// ======================================================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );

    updateCartCount();

    displayCart();

}


// ======================================================
// COMPARE PRODUCTS
// ======================================================

function toggleCompare(productId) {

    if (
        compareProducts.includes(productId)
    ) {

        compareProducts =
            compareProducts.filter(
                id =>
                    id !== productId
            );

    }

    else {

        if (compareProducts.length >= 4) {

            alert(
                "You can compare a maximum of 4 products."
            );

            return;
        }

        compareProducts.push(productId);

    }

    displayProducts(displayedProducts);

    displayComparison();

}


// ======================================================
// DISPLAY COMPARISON
// ======================================================

function displayComparison() {

    const container =
        document.getElementById(
            "compareContainer"
        );

    if (!container) {
        return;
    }

    if (compareProducts.length === 0) {

        container.innerHTML = `

            <div class="empty-compare">

                <i class="bi bi-arrow-left-right"></i>

                <h3>
                    No Products Selected
                </h3>

                <p>
                    Select products using the
                    Compare button to compare them here.
                </p>

            </div>

        `;

        return;
    }

    const selectedProducts =
        compareProducts
            .map(id =>
                products.find(
                    product =>
                        product.id === id
                )
            )
            .filter(Boolean);

    let table = `

        <table class="compare-table">

            <tr>

                <th>
                    Specification
                </th>

    `;

    selectedProducts.forEach(product => {

        table += `

            <th>

                ${product.name}

                <br><br>

                <button
                    class="remove-compare"
                    onclick="toggleCompare(${product.id})"
                >
                    Remove
                </button>

            </th>

        `;

    });

    table += `

            </tr>

            <tr>

                <td>
                    Brand
                </td>

    `;

    selectedProducts.forEach(product => {

        table += `

            <td>
                ${product.brand}
            </td>

        `;

    });

    table += `

            </tr>

            <tr>

                <td>
                    Category
                </td>

    `;

    selectedProducts.forEach(product => {

        table += `

            <td>
                ${product.category}
            </td>

        `;

    });

    table += `

            </tr>

            <tr>

                <td>
                    Price
                </td>

    `;

    selectedProducts.forEach(product => {

        table += `

            <td>
                ₹${product.price.toLocaleString("en-IN")}
            </td>

        `;

    });

    table += `

            </tr>

            <tr>

                <td>
                    Rating
                </td>

    `;

    selectedProducts.forEach(product => {

        table += `

            <td>
                ⭐ ${product.rating}
            </td>

        `;

    });

    table += `

            </tr>

            <tr>

                <td>
                    Discount
                </td>

    `;

    selectedProducts.forEach(product => {

        let discount =
            Number(product.discount) || 0;

        if (
            discount === 0 &&
            product.originalPrice > product.price
        ) {

            discount =
                Math.round(
                    (
                        (product.originalPrice - product.price)
                        / product.originalPrice
                    ) * 100
                );

        }

        table += `

            <td>
                ${discount}%
            </td>

        `;

    });

    table += `

            </tr>

        </table>

    `;

    container.innerHTML =
        table;

}


// ======================================================
// CHECKOUT
// ======================================================

function checkout() {

    // Check whether the user is logged in
    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        alert(
            "Please login before placing an order."
        );

        window.location.href =
            "login.html";

        return;
    }

    // Check if cart is empty
    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

    });

    const customerName =
        prompt(
            "Enter your name:"
        );

    if (!customerName) {
        return;
    }

    const address =
        prompt(
            "Enter your delivery address:"
        );

    if (!address) {
        return;
    }

    const paymentMethod =
        prompt(
            "Enter payment method:\n\n" +
            "1. Cash on Delivery\n" +
            "2. UPI\n" +
            "3. Card"
        );

    if (!paymentMethod) {
        return;
    }

    alert(

        `Order Placed Successfully! 🎉\n\n` +

        `Customer: ${customerName}\n` +

        `Address: ${address}\n` +

        `Total: ₹${total.toLocaleString("en-IN")}\n` +

        `Payment: ${paymentMethod}\n\n` +

        `Thank you for shopping with ElectroMart!`

    );

    // Clear cart after checkout
    cart = [];

    updateCartCount();

    displayCart();

}


// ======================================================
// MOBILE MENU
// ======================================================

function toggleMenu() {

    const navLinks =
        document.getElementById(
            "navLinks"
        );

    if (navLinks) {

        navLinks.classList.toggle(
            "active"
        );

    }

}


// ======================================================
// CLOSE MOBILE MENU
// ======================================================

function closeMobileMenu() {

    const navLinks =
        document.getElementById(
            "navLinks"
        );

    if (navLinks) {

        navLinks.classList.remove(
            "active"
        );

    }

}


// ======================================================
// LOGIN STATUS
// ======================================================

function checkLoginStatus() {

    const loginLink =
        document.getElementById(
            "loginLink"
        );

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    const isLoggedIn =
        localStorage.getItem(
            "isLoggedIn"
        );

    if (!loginLink || !logoutBtn) {
        return;
    }

    if (isLoggedIn === "true") {

        loginLink.style.display =
            "none";

        logoutBtn.style.display =
            "inline-block";

    }

    else {

        loginLink.style.display =
            "inline-block";

        logoutBtn.style.display =
            "none";

    }

}


// ======================================================
// LOGOUT
// ======================================================

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    alert(
        "You have been logged out!"
    );

    window.location.href =
        "login.html";

}


// ======================================================
// INITIALIZE WEBSITE
// ======================================================

function initializeWebsite() {

    console.log(
        "Initializing ElectroMart..."
    );

    // Display products
    displayedProducts =
        [...products];

    displayProducts(
        displayedProducts
    );

    // Initialize cart
    updateCartCount();

    displayCart();

    // Initialize comparison
    displayComparison();

    // Check login status
    checkLoginStatus();

    // Mobile navigation links
    const navLinks =
        document.querySelectorAll(
            "#navLinks a"
        );

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });

    console.log(
        "ElectroMart initialized successfully! 🚀"
    );

}


// ======================================================
// START APPLICATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);