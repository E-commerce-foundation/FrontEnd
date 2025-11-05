const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCartBtn = document.getElementById("closeCart");

export function openCartDrawer() {
    cartDrawer.setAttribute("aria-hidden", false);
}

export function closeCartDrawer() {
    cartDrawer.setAttribute("aria-hidden", true);
}

cartBtn.addEventListener("click", openCartDrawer);
closeCartBtn.addEventListener("click", closeCartDrawer);
