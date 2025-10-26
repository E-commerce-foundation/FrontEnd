// Main app logic for the demo e-commerce frontend
import { getProduct, PRODUCTS as products } from "./js/data/products.js";
import ProductList from "./components/product-list.js";
import { formatPrice, escapeHtml } from "./js/lib/utils.js";
import Toast from "./components/toast.js";
import CartList from "./components/cart-list.js";

// DOM Elements - Updated for professional design
const productGrid = document.getElementById("productGrid");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCartBtn = document.getElementById("closeCart");

const cartList = document.getElementById("cartList");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const orderSummary = document.getElementById("orderSummary");
const closeModal = document.getElementById("closeModal");
const confirmPayment = document.getElementById("confirmPayment");

const printReceipt = document.getElementById("printReceipt");
const favoritesBtn = document.getElementById("favoritesBtn");

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

cartBtn.addEventListener("click", openCartDrawer);
closeCartBtn.addEventListener("click", closeCartDrawer);

function openCartDrawer() {
    cartDrawer.setAttribute("aria-hidden", false);
}

function closeCartDrawer() {
    cartDrawer.setAttribute("aria-hidden", true);
}

// Filtering / sorting
function onFilterChange() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const cat = categoryFilter.value;
    const sort = sortSelect.value;

    let list = products.filter((p) => {
        const matchesQuery =
            p.name.toLowerCase().includes(q) ||
            (p.description || "").toLowerCase().includes(q);
        const matchesCategory = cat === "all" || p.details.category === cat;
        return matchesQuery && matchesCategory;
    });

    if (sort === "price-asc") {
        list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
        list.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    renderProducts(list);
}

function wireEvents() {
    searchInput.addEventListener("input", debounce(onFilterChange, 250));
    categoryFilter.addEventListener("change", onFilterChange);
    sortSelect.addEventListener("change", onFilterChange);

    checkoutBtn.addEventListener("click", openCheckout);
    closeModal.addEventListener("click", closeCheckout);
    confirmPayment.addEventListener("click", onConfirmPayment);
    // printReceipt.addEventListener("click", onPrintReceipt);

    favoritesBtn.addEventListener("click", () => {
        const favCount = window.favorites.items.length;
        categoryFilter.value = favCount > 0 ? "favorites" : "all";
        onFilterChange();
        Toast(
            favCount > 0 ? `Showing ${favCount} favorites` : "No favorites yet",
            favCount > 0 ? "success" : "error"
        );
    });

    // close modal on overlay click
    checkoutModal.addEventListener("click", (e) => {
        if (e.target === checkoutModal) closeCheckout();
    });

    // keyboard accessibility
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeCheckout();
            closeQuickViewModal();
        }
    });
}

function populateCategoryFilter() {
    const categories = Array.from(
        new Set(products.map((p) => p.details.category))
    ).sort();
    categories.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
    });
}

// Render product cards with premium UI
function renderProducts(products_list) {
    productGrid.innerHTML = "";
    if (!products_list.length) {
        productGrid.innerHTML = '<p class="muted">No products found.</p>';
        return;
    }
    productGrid.appendChild(ProductList(products_list));
}

function toggleFav(id) {
    window.favorites.toggle(id);
}

// Cart functions
function addToCart(productId) {
    shoppingCart.add(productId);
    renderCart();
    updateCartCount();
    // visual affordance
    Toast(
        `Added ${getProduct(productId)?.name || "Product"} to cart!`,
        "success"
    );
}

window.toggleFav = toggleFav;
window.addToCart = addToCart;

function renderCart() {
    console.log("cart", window.shoppingCart)
    cartList.innerHTML = "";
    
    if (!window.shoppingCart.items.size) {
        cartList.innerHTML = '<p class="muted">Your cart is empty.</p>';
        cartTotalEl.textContent = "$10.00";
        return;
    }
    const cartListObj = CartList(Array.from(window.shoppingCart.items.values()), changeCartQuantity, removeFromCart);
    cartList.appendChild(cartListObj.element);
    cartTotalEl.textContent = `$${formatPrice(cartListObj.total)}`;
}


function changeCartQuantity(productId, quantity) {
    shoppingCart.updateQuantity(productId, quantity);
    renderCart();
    updateCartCount();
}

function removeFromCart(productId) {
    shoppingCart.remove(productId);
    renderCart();
    updateCartCount();
}


function updateCartCount() {
    const count = Array.from(shoppingCart.items.values()).reduce(
        (acc, item) => {
            acc += item.quantity;
            return acc;
        },
        0
    );
    cartCountEl.textContent = String(count);

    // one-shot pop animation to indicate update (CSS .cart-count.pop)
    try {
        cartCountEl.classList.remove("pop");
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        void cartCountEl.offsetWidth;
        cartCountEl.classList.add("pop");
    } catch (e) {
        // element may not exist or animation not supported — ignore
    }
    cartBtn.animate(
        [
            { transform: "scale(1)" },
            { transform: "scale(1.06)" },
            { transform: "scale(1)" },
        ],
        { duration: 220 }
    );
}

// Checkout
function openCheckout() {
    if (!shoppingCart.items.length) {
        alert("Your cart is empty.");
        return;
    }
    renderOrderSummary();
    checkoutModal.setAttribute("aria-hidden", "false");
}

function closeCheckout() {
    checkoutModal.setAttribute("aria-hidden", "true");
}

function renderOrderSummary() {
    const lines = cart.map((item) => {
        const product = products.find((p) => p.id === item.id);
        const unit = product.salePrice || product.price;
        const lineTotal = unit * item.qty;
        return `
        <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem">
          <div>${escapeHtml(product.name)} × ${item.qty}</div>
          <div><strong>$${formatPrice(lineTotal)}</strong></div>
        </div>
      `;
    });
    const subtotal = cart.reduce((s, i) => {
        const p = products.find((x) => x.id === i.id);
        const unit = p ? p.salePrice || p.price : 0;
        return s + unit * i.qty;
    }, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    orderSummary.innerHTML = `
      <div>
        ${lines.join("")}
        <hr>
        <div style="display:flex;justify-content:space-between"><div>Subtotal</div><div>$${formatPrice(
            subtotal
        )}</div></div>
        <div style="display:flex;justify-content:space-between"><div>Tax (8%)</div><div>$${formatPrice(
            tax
        )}</div></div>
        <div style="display:flex;justify-content:space-between;font-weight:700;margin-top:0.5rem"><div>Total</div><div>$${formatPrice(
            total
        )}</div></div>
      </div>
    `;
}

function onConfirmPayment() {
    // simple simulated payment flow
    alert("Payment simulated — thank you for your purchase!");
    // Save receipt content temporarily for print
    renderOrderSummary();
    // clear cart
    window.shoppingCart.clear();
    saveCart();
    renderCart();
    updateCartCount();
    closeCheckout();
}

// Initialize the app
populateCategoryFilter();
renderProducts(products);
wireEvents();
