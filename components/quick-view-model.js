import { PRODUCTS as products, getProduct } from "../js/data/products.js";
import { escapeHtml, formatPrice } from "../js/lib/utils.js";

const quickViewModal = document.getElementById("quickViewModal");
const quickViewTitle = document.getElementById("quickViewTitle");
const quickViewBody = document.getElementById("quickViewBody");
const quickViewClose = document.getElementById("quickViewClose");

// Quick view modal
export function openQuickViewModal(productId) {
    const product = getProduct(productId);
    if (!product) return;

    quickViewTitle.textContent = product.name;
    // Generate rating stars
    const stars = product.getRatingStars();

    quickViewBody.innerHTML = `
      <div class="quick-view-content">
        <div class="quick-view-image-container">
          <img class="quick-view-image" src="${
              product.image
          }" alt="${escapeHtml(product.name)}">
          ${
              product.badge
                  ? `<div class="quick-view-badge">${escapeHtml(
                        product.details.badge
                    )}</div>`
                  : ""
          }
        </div>
        <div class="quick-view-meta">
          <p class="quick-view-subtitle">${escapeHtml(
              product.details.category
          )} • ${escapeHtml(product.details.color)}</p>
          <div class="quick-view-rating">
            <span class="stars">${stars}</span> (${
        product.details.reviewCount || 0
    } reviews)
          </div>
          
          
          <div class="quick-view-price-row">
            <span class="quick-view-price-current">$${formatPrice(
                product.details.salePrice || product.getPrice()
            )}</span>
            ${
                product?.details?.salePrice
                    ? `<span class="quick-view-price-original">$${formatPrice(
                          product.getPrice()
                      )}</span>`
                    : ""
            }
          </div>
          <div class="quick-view-description">
            ${escapeHtml(product.description || "No description available.")}
          </div>
          <div class="quick-view-cart-section">
            <button class="btn quick-view-fav-btn ${
                product.isFavorite ? "favorited" : ""
            }" onclick="toggleFav('${productId}', this)">
              ${product.isFavorite ? "♥" : "♡"}
            </button>
            <button class="btn quick-view-add-btn" onclick="addToCart('${productId}')">Add to Cart</button>
          </div>
        </div>
      </div>
    `;

    quickViewModal.style.display = "";
    quickViewModal.classList.add("active");
    document.addEventListener("keydown", handleQuickViewEsc);
}

export function closeQuickViewModal() {
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
