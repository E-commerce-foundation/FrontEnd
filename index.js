// Main app logic for the demo e-commerce frontend
import { getProduct, PRODUCTS as products } from "./js/data/products.js";
import ProductList from "./components/product-list.js";
import { formatPrice, escapeHtml } from "./js/lib/utils.js";
import Toast from "./components/toast.js";
import CartList from "./components/Cart/cart-list.js";
import { openCartDrawer } from "./components/Cart/cart-drawer.js";
import { addToCart, renderCart } from "./components/Cart/CartSystem.js";

// DOM Elements - Updated for professional design
const productGrid = document.getElementById("productGrid");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const cartBtn = document.getElementById("cartBtn");

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

function toggleFav(id) {
    window.favorites.toggle(id);
}

window.toggleFav = toggleFav;
window.addToCart = addToCart;

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

// Initialize the app
populateCategoryFilter();
renderProducts(products);
renderCart();
wireEvents();
