import { escapeHtml, formatPrice } from "../js/lib/utils.js";

export default function ProductCard(product, favorite) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("role", "listitem");

    // Generate stars for rating (simple visual representation)
    const fullStars = Math.floor(product.rating || 0);
    const hasHalfStar = (product.rating || 0) % 1 >= 0.5;
    const stars =
        "★".repeat(fullStars) +
        (hasHalfStar ? "☆" : "") +
        "☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0));

    // Badge class based on badge text
    const badgeClass = product.details.badge
        ? product.badge.toLowerCase().replace(/[^a-z]/g, "")
        : "";

    card.innerHTML = `
            <div class="card-image-container" aria-hidden="true">
              <img class="card-image" src="${product.image}" alt="${escapeHtml(
        product.name
    )}" loading="lazy">
              ${
                  product.badge
                      ? `<div class="card-badge ${badgeClass}">${escapeHtml(
                            product.badge
                        )}</div>`
                      : ""
              }
              <button class="quick-view-btn" data-quickview="${
                  product.id
              }" aria-label="Quick view ${escapeHtml(
        product.name
    )}" title="Quick view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>


            <div class="card-content">
              <div>
                <h3 class="card-title">${escapeHtml(product.name)}</h3>
                <product class="card-subtitle">${escapeHtml(
                    product.category
                )} • ${escapeHtml(product.color)}</product>


              </div>
              <div class="rating">
                <span class="stars" aria-label="Rating: ${
                    product.rating || 0
                } out of 5 stars">${stars}</span>
                <span class="rating-count">(${product.reviewCount || 0})</span>
              </div>
              <div class="price-row">
                <span class="price-current">$${formatPrice(
                    product.salePrice || product.getPrice()
                )}</span>
                ${
                    product.salePrice
                        ? `<span class="price-original">$${formatPrice(
                              product.price
                          )}</span>`
                        : ""
                }
              </div>
              <div class="card-actions">
                <button class="btn btn-primary" data-id="${product.id}">
                  Add to cart
                </button>
                
                
                <button class="btn btn-icon ${
                    favorite ? "favorited" : ""
                }" title="Add to favorites" aria-pressed="${favorite}" data-fav="${product.id}">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          `;

    // Event Listeners
    // attach listeners
    card.querySelector(".btn-primary").addEventListener("click", () => {
        addToCart(product.id);
    });

    const favBtn = card.querySelector("[data-fav]");
    favBtn.addEventListener("click", () => {
        toggleFav(product.id, favBtn);
        favBtn.classList.toggle("favorited", favorite);
        // Trigger re-filter if in favorites view
        if (categoryFilter.value === "favorites") {
            onFilterChange();
        }
    });

    const quickViewBtn = card.querySelector("[data-quickview]");
    quickViewBtn.addEventListener("click", () => {
        openQuickViewModal(product.id);
    });

    return card;
}
