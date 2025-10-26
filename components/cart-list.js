import { getProduct } from "../js/data/products.js";
import CartItemCard from "./cartitem-card.js";

export default function CartList(items, changeCartQuantity, removeFromCart) {
    const frag = document.createDocumentFragment();
    let total = 0;
    items.forEach((item) => {
        const product = getProduct(item.productId);
        const cartItem = CartItemCard(
            product,
            item,
            changeCartQuantity,
            removeFromCart
        );
        total += cartItem.total;
        frag.appendChild(cartItem.element);
    });

    return {
        element: frag,
        total,
    };
}
