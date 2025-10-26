import ProductCard from "./product-card.js";

export default function ProductList(list) {
    const frag = document.createDocumentFragment();

    list.forEach((product) => {
        const card = ProductCard(product);
        frag.appendChild(card);
    });

    return frag;
}
