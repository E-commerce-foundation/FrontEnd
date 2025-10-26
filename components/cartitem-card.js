import { escapeHtml, formatPrice } from "../js/lib/utils.js";

export default function CartItemCard(product, item, changeCartQty, removeFromCart) {
    const unit = product.details.salePrice || product.getPrice();
    const lineTotal = unit * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
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
              <button class="btn qty-dec" data-id="${product.id}">-</button>
              <div style="padding:0 0.5rem">${item.quantity}</div>
              <button class="btn qty-inc" data-id="${product.id}">+</button>
            </div>
            <button class="btn" style="margin-left:auto" data-remove="${
                product.id
            }">
                Remove
            </button>
          </div>
        </div>
      `;

    // listeners
    cartItem.querySelector(".qty-inc").addEventListener("click", () => {
        changeCartQty(product.id, item.qty + 1);
    });
    cartItem.querySelector(".qty-dec").addEventListener("click", () => {
        changeCartQty(product.id, item.qty - 1);
    });
    cartItem.querySelector("[data-remove]").addEventListener("click", () => {
        removeFromCart(product.id);
    });

    return {
        element : cartItem,
        total : lineTotal
    };
}
