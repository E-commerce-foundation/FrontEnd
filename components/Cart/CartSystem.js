import { PRODUCTS as products, getProduct } from "../../js/data/products.js";
import { escapeHtml, formatPrice } from "../../js/lib/utils.js";
import CartList from "./cart-list.js";
import Toast from "../toast.js";
import { TAX } from "../../constants/global-variables.js";

const cartBtn = document.getElementById("cartBtn");
const cartList = document.getElementById("cartList");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartClearBtn = document.getElementById("cartClearBtn");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const checkoutModal = document.getElementById("checkoutModal");
const orderSummary = document.getElementById("orderSummary");
const closeModal = document.getElementById("closeModal");
const confirmPayment = document.getElementById("confirmPayment");

const printReceipt = document.getElementById("printReceipt");

// Cart functions
export function addToCart(productId) {
    const product = getProduct(productId);
    shoppingCart.add(product);
    renderCart();
    // visual affordance
    Toast(
        `Added ${getProduct(productId)?.name || "Product"} to cart!`,
        "success"
    );
}

export function renderCart() {
    cartList.innerHTML = "";

    if (!window.shoppingCart.items.size) {
        cartList.innerHTML = '<p class="muted">Your cart is empty.</p>';
        cartTotalEl.textContent = "$0.00";
        return;
    }
    const arrayOfItems = Array.from(window.shoppingCart.items.values());

    const cartListObj = CartList(
        arrayOfItems,
        changeCartQuantity,
        removeFromCart
    );
    cartList.appendChild(cartListObj.element);
    cartTotalEl.textContent = `$${formatPrice(cartListObj.total)}`;
    updateCartCount();
}

export function changeCartQuantity(productId, quantity) {
    shoppingCart.updateQuantity(productId, quantity);
    renderCart();
}

export function removeFromCart(productId) {
    const product = getProduct(productId);
    shoppingCart.remove(product);
    renderCart();
}

export function updateCartCount() {
    const count = window.shoppingCart.getTotalQuantity();
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

export function clearCart() {
    window.shoppingCart.clear();
    renderCart();
}

// Checkout
export function openCheckout() {
    if (!shoppingCart.items.size) {
        alert("Your cart is empty.");
        return;
    }
    renderOrderSummary();
    checkoutModal.setAttribute("aria-hidden", "false");
}

export function closeCheckout() {
    checkoutModal.setAttribute("aria-hidden", "true");
}

export function renderOrderSummary() {
    const cartItems = Array.from(window.shoppingCart.items.values());
    console.log("cart items", cartItems);

    const lines = cartItems.map((item) => {
        const product = getProduct(item.productId);
        const unit = product.details.salePrice || product.getPrice();
        const lineTotal = unit * item.quantity;
        return `
        <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem">
          <div>${escapeHtml(product.name)} x ${item.quantity}</div>
          <div><strong>$${formatPrice(lineTotal)}</strong></div>
        </div>
      `;
    });
    const subtotal = cartItems.reduce((s, i) => {
        const p = getProduct(i.productId);
        const unit = p ? p.details.salePrice || p.getPrice() : 0;
        return s + unit * i.quantity;
    }, 0);
    const tax = subtotal * TAX;
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

export function onConfirmPayment() {
    // simple simulated payment flow
    alert("Payment simulated — thank you for your purchase!");
    // Save receipt content temporarily for print
    renderOrderSummary();
    // clear cart
    window.shoppingCart.clear();
    saveCart();
    renderCart();
    closeCheckout();
}

export function events() {
    checkoutBtn.addEventListener("click", openCheckout);
    cartClearBtn.addEventListener("click", clearCart);
    closeModal.addEventListener("click", closeCheckout);
    confirmPayment.addEventListener("click", onConfirmPayment);
    // printReceipt.addEventListener("click", onPrintReceipt);
}

events();
