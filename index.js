// Main app logic for the demo e-commerce frontend
import { Cart, Favorites } from "./js/classes.js";
import { PRODUCTS } from "./js/data/products.js";
import ProductList from "./components/product-list.js";
import { formatPrice, escapeHtml } from "./js/lib/utils.js";

// DOM Elements - Updated for professional design
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
const toastContainer = document.getElementById("toastContainer");

const quickViewModal = document.getElementById("quickViewModal");
const quickViewTitle = document.getElementById("quickViewTitle");
const quickViewBody = document.getElementById("quickViewBody");
const quickViewClose = document.getElementById("quickViewClose");

let products = PRODUCTS;
let _lastFocus = null;

const shoppingCart = new Cart();
const favorites = new Favorites();


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

function trapFocusStart(element) {
    // Simple focus trap implementation
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function trapFocusStop() {
    // No-op for simplicity
}

function wireEvents() {
    searchInput.addEventListener("input", debounce(onFilterChange, 250));
    categoryFilter.addEventListener("change", onFilterChange);
    sortSelect.addEventListener("change", onFilterChange);

    cartBtn.addEventListener("click", () => toggleCart(true));
    closeCartBtn.addEventListener("click", () => toggleCart(false));

    checkoutBtn.addEventListener("click", openCheckout);
    closeModal.addEventListener("click", closeCheckout);
    confirmPayment.addEventListener("click", onConfirmPayment);
    printReceipt.addEventListener("click", onPrintReceipt);

    favoritesBtn.addEventListener("click", () => {
        const favCount = favorites.items.length;
        categoryFilter.value = favCount > 0 ? "favorites" : "all";
        onFilterChange();
        showToast(
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
            toggleCart(false);
            closeCheckout();
            closeQuickViewModal();
        }
    });
}

// Make functions available globally for onclick handlers
// window.addToCart = function (productId, qty = 1) {
//     const product = products.find((p) => p.id === productId);
//     if (!product) return;
//     const existing = cart.find((i) => i.id === productId);
//     if (existing) {
//         existing.qty += qty;
//     } else {
//         cart.push({ id: productId, qty: qty });
//     }
//     saveCart();
//     renderCart();
//     updateCartCount();
//     showToast(`Added ${product.name} to cart!`, "success");
//     // visual affordance
//     cartBtn.animate(
//         [
//             { transform: "scale(1)" },
//             { transform: "scale(1.06)" },
//             { transform: "scale(1)" },
//         ],
//         { duration: 220 }
//     );
//     toggleCart(true);
// };

window.toggleFav = toggleFav;

function populateCategoryFilter() {
    const categories = Array.from(
        new Set(products.map((p) => p.category))
    ).sort();
    categories.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
    });
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
        const matchesCategory =
            cat === "all" ||
            (cat === "favorites" ? favs.includes(p.id) : p.category === cat);
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

// Render product cards with premium UI
const productGrid = document.getElementById("productGrid");

function renderProducts(list) {
    productGrid.innerHTML = "";
    if (!list.length) {
        productGrid.innerHTML = '<p class="muted">No products found.</p>';
        return;
    }
    const frag = ProductList(list, favorites.items);

    productGrid.appendChild(frag);
}

function toggleFav(id) {
    favorites.delete(id);
    if (!id) return;
    const idx = favs.indexOf(id);
    const product = products.find((p) => p.id === id);
    if (idx === -1) {
        favs.push(id);
        btnEl.setAttribute("aria-pressed", "true");
        if (product) showToast("Added to favorites ⭐", "success");
    } else {
        favs.splice(idx, 1);
        btnEl.setAttribute("aria-pressed", "false");
        if (product) showToast("Removed from favorites", "error");
    }
    saveFavs();
}

// Toast notifications
function showToast(message, type = "success", duration = 3000) {
    // ensure container is accessible
    try {
        toastContainer.setAttribute("aria-live", "polite");
    } catch (e) {}
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = `
      <div class="toast-message">${escapeHtml(message)}</div>
      <button class="toast-dismiss" aria-label="Dismiss">×</button>
    `;
    toastContainer.appendChild(toast);

    // show with class-based transition (CSS handles .show/.hide)
    requestAnimationFrame(() => toast.classList.add("show"));

    // dismiss handler
    const dismissBtn = toast.querySelector(".toast-dismiss");
    const removeToast = () => {
        toast.classList.remove("show");
        toast.classList.add("hide");
        toast.addEventListener(
            "transitionend",
            () => {
                if (toast.parentElement) toast.remove();
            },
            { once: true }
        );
    };
    dismissBtn.addEventListener("click", removeToast);

    // auto-dismiss
    setTimeout(() => {
        if (toast.parentElement) removeToast();
    }, duration);
}

// Quick view modal
function openQuickViewModal(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    try {
        _lastFocus = document.activeElement;
    } catch (e) {}

    quickViewTitle.textContent = product.name;

    // Generate rating stars
    const fullStars = Math.floor(product.rating || 0);
    const hasHalfStar = (product.rating || 0) % 1 >= 0.5;
    const stars =
        "★".repeat(fullStars) +
        (hasHalfStar ? "☆" : "") +
        "☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0));

    quickViewBody.innerHTML = `
      <div class="quick-view-content">
        <div class="quick-view-image-container">
          <img class="quick-view-image" src="${
              product.image
          }" alt="${escapeHtml(product.name)}">
          ${
              product.badge
                  ? `<div class="quick-view-badge">${escapeHtml(
                        product.badge
                    )}</div>`
                  : ""
          }
        </div>
        <div class="quick-view-meta">
          <p class="quick-view-subtitle">${escapeHtml(
              product.category
          )} • ${escapeHtml(product.color)}</p>
          <div class="quick-view-rating">
            <span class="stars">${stars}</span> (${
        product.reviewCount || 0
    } reviews)
          </div>
          <div class="quick-view-price-row">
            <span class="quick-view-price-current">$${formatPrice(
                product.salePrice || product.price
            )}</span>
            ${
                product.salePrice
                    ? `<span class="quick-view-price-original">$${formatPrice(
                          product.price
                      )}</span>`
                    : ""
            }
          </div>
          <div class="quick-view-description">
            ${escapeHtml(product.description || "No description available.")}
          </div>
          <div class="quick-view-cart-section">
            <button class="btn quick-view-fav-btn ${
                favs.includes(productId) ? "favorited" : ""
            }" onclick="toggleFav('${productId}', this)">
              ${favs.includes(productId) ? "♥" : "♡"}
            </button>
            <button class="btn quick-view-add-btn" onclick="addToCart('${productId}')">Add to Cart</button>
          </div>
        </div>
      </div>
    `;

    quickViewModal.style.display = "";
    quickViewModal.classList.add("active");
    try {
        quickViewModal.setAttribute("tabindex", "-1");
        quickViewModal.focus();
    } catch (e) {}
    trapFocusStart(quickViewModal);
    document.addEventListener("keydown", handleQuickViewEsc);
}

function closeQuickViewModal() {
    quickViewModal.classList.remove("active");
    setTimeout(() => {
        quickViewModal.style.display = "none";
    }, 300);
    document.removeEventListener("keydown", handleQuickViewEsc);
}

function handleQuickViewEsc(e) {
    if (e.key === "Escape") closeQuickViewModal();
}

// Bind quick view close
quickViewClose.addEventListener("click", closeQuickViewModal);
quickViewModal.addEventListener("click", (e) => {
    if (e.target === quickViewModal) closeQuickViewModal();
});

// Cart functions
function addToCart(productId, qty = 1) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const existing = cart.find((i) => i.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: productId, qty: qty });
    }
    saveCart();
    renderCart();
    updateCartCount();
    // visual affordance
    cartBtn.animate(
        [
            { transform: "scale(1)" },
            { transform: "scale(1.06)" },
            { transform: "scale(1)" },
        ],
        { duration: 220 }
    );
    toggleCart(true);
}

function changeCartQty(productId, qty) {
    const idx = cart.findIndex((i) => i.id === productId);
    if (idx === -1) return;
    cart[idx].qty = Math.max(1, qty);
    saveCart();
    renderCart();
    updateCartCount();
}

function removeFromCart(productId) {
    cart = cart.filter((i) => i.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

function renderCart() {
    cartList.innerHTML = "";
    if (!cart.length) {
        cartList.innerHTML = '<p class="muted">Your cart is empty.</p>';
        cartTotalEl.textContent = "$0.00";
        return;
    }

    const frag = document.createDocumentFragment();
    let total = 0;

    cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return;
        const unit = product.salePrice || product.price;
        const lineTotal = unit * item.qty;
        total += lineTotal;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
        <div class="thumb"><img src="${product.image}" alt="${escapeHtml(
            product.name
        )}"></div>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div style="font-weight:600">${escapeHtml(product.name)}</div>
            <div style="font-weight:700;color:var(--accent-600)">$${formatPrice(
                lineTotal
            )}</div>
          </div>
          <div class="muted" style="font-size:0.85rem">${escapeHtml(
              product.color
          )} • ${escapeHtml(product.size)}</div>
          <div style="margin-top:0.45rem;display:flex;align-items:center;gap:0.5rem">
            <div class="qty">
              <button class="btn qty-dec" data-id="${product.id}">−</button>
              <div style="padding:0 0.5rem">${item.qty}</div>
              <button class="btn qty-inc" data-id="${product.id}">+</button>
            </div>
            <button class="btn" style="margin-left:auto" data-remove="${
                product.id
            }">Remove</button>
          </div>
        </div>
      `;

        // listeners
        row.querySelector(".qty-inc").addEventListener("click", () => {
            changeCartQty(product.id, item.qty + 1);
        });
        row.querySelector(".qty-dec").addEventListener("click", () => {
            changeCartQty(product.id, item.qty - 1);
        });
        row.querySelector("[data-remove]").addEventListener("click", () => {
            removeFromCart(product.id);
        });

        frag.appendChild(row);
    });

    cartList.appendChild(frag);
    cartTotalEl.textContent = `$${formatPrice(total)}`;
}

function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
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
}

function toggleCart(open) {
    if (open) {
        try {
            _lastFocus = document.activeElement;
            cartDrawer.setAttribute("tabindex", "-1");
            cartDrawer.focus();
        } catch (e) {}
        cartDrawer.setAttribute("aria-hidden", "false");
        cartBtn.setAttribute("aria-expanded", "true");
        trapFocusStart(cartDrawer);
    } else {
        cartDrawer.setAttribute("aria-hidden", "true");
        cartBtn.setAttribute("aria-expanded", "false");
        trapFocusStop();
        try {
            if (_lastFocus && typeof _lastFocus.focus === "function")
                _lastFocus.focus();
        } catch (e) {}
    }
}

// Checkout
function openCheckout() {
    if (!cart.length) {
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
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    closeCheckout();
    toggleCart(false);
}

function onPrintReceipt() {
    // Prepare printable content in a new window
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
        alert(
            "Unable to open print window. Please allow popups for this site."
        );
        return;
    }

    const date = new Date().toLocaleString();
    const storeName = "ShopLight";
    const itemsHtml = cart
        .map((item) => {
            const p = products.find((x) => x.id === item.id);
            if (!p) return "";
            const unitPrice = p.salePrice || p.price;
            return `<tr>
        <td style="padding:6px 8px">${escapeHtml(p.name)}</td>
        <td style="padding:6px 8px;text-align:center">${item.qty}</td>
        <td style="padding:6px 8px;text-align:right">$${formatPrice(
            unitPrice
        )}</td>
        <td style="padding:6px 8px;text-align:right">$${formatPrice(
            unitPrice * item.qty
        )}</td>
      </tr>`;
        })
        .join("");

    const subtotal = cart.reduce((s, i) => {
        const p = products.find((x) => x.id === i.id);
        const unit = p ? p.salePrice || p.price : 0;
        return s + unit * i.qty;
    }, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const html = `
      <html>
        <head>
          <title>Receipt - ${storeName}</title>
          <style>
            body{ font-family: Arial, Helvetica, sans-serif; padding:20px; color:#111 }
            h1{ margin:0 0 8px 0 }
            table{ width:100%; border-collapse:collapse; margin-top:12px }
            td,th{ border-bottom:1px solid #eee }
            .totals{ margin-top:12px; width:100% }
            .right{ text-align:right }
          </style>
        </head>
        <body>
          <h1>${storeName}</h1>
          <div>Receipt — ${date}</div>
          <table>
            <thead>
              <tr><th style="text-align:left">Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit</th><th style="text-align:right">Line</th></tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div class="totals">
            <div style="display:flex;justify-content:space-between"><div>Subtotal</div><div class="right">$${formatPrice(
                subtotal
            )}</div></div>
            <div style="display:flex;justify-content:space-between"><div>Tax (8%)</div><div class="right">$${formatPrice(
                tax
            )}</div></div>
            <div style="display:flex;justify-content:space-between;font-weight:700;margin-top:8px"><div>Total</div><div class="right">$${formatPrice(
                total
            )}</div></div>
          </div>
          <div style="margin-top:18px">Thank you for shopping with us.</div>
          <script>window.onload = function(){ window.print(); }</script>
        </body>
      </html>
    `;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
}

// Persistence
function saveCart() {
    try {
        localStorage.setItem("shop_cart_v1", JSON.stringify(cart));
    } catch (e) {
        console.warn("Failed to save cart", e);
    }
}

// Helpers

// Initialize the app
populateCategoryFilter();
renderProducts(products);
wireEvents();
