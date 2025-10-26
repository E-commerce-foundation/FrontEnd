// Sample product data for the demo app
// Edit or extend this array to add more products.
// Images referenced are in assets/images/ (placeholders provided separately).
// New fields added for premium UI: salePrice (optional), rating, reviewCount, badge
import { Product } from "../classes.js";

const PRODUCTS = [
    new Product(
        "Linen Classic Shirt",
        29.99,
        "../assets/images/image (1).jpg",
        "Lightweight linen shirt, breathable and perfect for warm days.",
        {
            category: "Clothing",
            color: "Beige",
            size: "M",
            salePrice: 24.99, // 20% off for demo
            rating: 5,
            reviewCount: 128,
            badge: "20% OFF",
        }
    ),
    new Product(
        "Everyday Sneakers",
        64.99,
        "assets/images/product-2.svg",
        "Comfortable sneakers with a minimalist design.",
        {
            category: "Shoes",
            color: "White",
            size: "42",
            salePrice: 59.99, // 8% off for demo
            rating: 4.2,
            reviewCount: 89,
            badge: "BESTSELLER",
        }
    ),
    new Product(
        "Minimalist Watch",
        89.0,
        "assets/images/product-3.svg",
        "Slim profile watch with leather strap.",
        {
            category: "Accessories",
            color: "Black",
            size: "One Size",
            salePrice: 79.99, // 11% off for demo
            rating: 4.2,
            reviewCount: 89,
            badge: "BESTSELLER",
        }
    ),
    new Product(
        "Cozy Knit Sweater",
        49.5,
        "assets/images/product-4.svg",
        "Warm knit sweater with soft fibers and relaxed fit.",
        {
            category: "Clothing",
            color: "Olive",
            size: "L",
            salePrice: 39.99, // 20% off for demo
            rating: 4.3,
            reviewCount: 67,
            badge: "20% OFF",
        }
    ),
    new Product(
        "Minimalist Watch",
        89.0,
        "assets/images/product-3.svg",
        "Slim profile watch with leather strap.",
        {
            category: "Accessories",
            color: "Black",
            size: "One Size",
            salePrice: 79.99, // 11% off for demo
            rating: 4.8,
            reviewCount: 256,
            badge: "NEW",
        }
    ),
    new Product(
        "Cozy Knit Sweater",
        49.5,
        "assets/images/product-4.svg",
        "Warm knit sweater with soft fibers and relaxed fit.",
        {
            category: "Clothing",
            color: "Olive",
            size: "L",
            salePrice: 39.99, // 20% off for demo
            rating: 4.3,
            reviewCount: 67,
            badge: "20% OFF",
        }
    ),
    new Product(
        "Classic Denim",
        54.0,
        "assets/images/product-5.svg",
        "Durable denim jeans with modern cut.",
        {
            category: "Clothing",
            color: "Blue",
            size: "32",
            rating: 4.1,
            reviewCount: 145,
            badge: null, // no badge for this one
        }
    ),
    new Product(
        "Canvas Tote Bag",
        19.99,
        "assets/images/product-6.svg",
        "Sturdy tote for everyday errands.",
        {
            category: "Accessories",
            color: "Natural",
            size: "One Size",
            rating: 4.6,
            reviewCount: 203,
            badge: "POPULAR",
        }
    ),
    new Product(
        "Trail Running Shoes",
        79.99,
        "assets/images/product-7.svg",
        "Lightweight trail shoes with extra grip.",
        {
            category: "Shoes",
            color: "Gray",
            size: "43",
            rating: 4.4,
            reviewCount: 112,
            badge: "NEW",
        }
    ),
    new Product(
        "Classic Baseball Cap",
        14.5,
        "assets/images/product-8.svg",
        "Simple cap with embroidered logo.",
        {
            category: "Accessories",
            color: "Navy",
            size: "Adjustable",
            rating: 4.0,
            reviewCount: 78,
            badge: null,
        }
    ),
];

export { PRODUCTS };

export const getProduct = (productId) => {
    console.log({PRODUCTS}, productId)
    return PRODUCTS.find((product) => {
        return product.id == productId;
    });
};
