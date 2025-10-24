import ProductCard from "./product-card.js";

export default function ProductList(list, favorites) {
    const frag = document.createDocumentFragment();

    list.forEach((p) => {
        const card = ProductCard(p, favorites.has(p.id));
        frag.appendChild(card);
    });

    return frag;
}
