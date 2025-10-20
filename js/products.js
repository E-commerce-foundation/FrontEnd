// Sample product data for the demo app
// Edit or extend this array to add more products.
// Images referenced are in assets/images/ (placeholders provided separately).
// New fields added for premium UI: salePrice (optional), rating, reviewCount, badge
window.PRODUCTS = [
  {
    id: "p1",
    name: "Linen Classic Shirt",
    price: 29.99,
    salePrice: 24.99, // 20% off for demo
    category: "Clothing",
    color: "Beige",
    size: "M",
    image: "assets/images/product-1.svg",
    description: "Lightweight linen shirt, breathable and perfect for warm days.",
    rating: 4.5,
    reviewCount: 128,
    badge: "20% OFF"
  },
  {
    id: "p2",
    name: "Everyday Sneakers",
    price: 64.99,
    category: "Shoes",
    color: "White",
    size: "42",
    image: "assets/images/product-2.svg",
    description: "Comfortable sneakers with a minimalist design.",
    rating: 4.2,
    reviewCount: 89,
    badge: "BESTSELLER"
  },
  {
    id: "p3",
    name: "Minimalist Watch",
    price: 89.0,
    category: "Accessories",
    color: "Black",
    size: "One Size",
    image: "assets/images/product-3.svg",
    description: "Slim profile watch with leather strap.",
    rating: 4.8,
    reviewCount: 256,
    badge: "NEW"
  },
  {
    id: "p4",
    name: "Cozy Knit Sweater",
    price: 49.5,
    salePrice: 39.99, // 20% off
    category: "Clothing",
    color: "Olive",
    size: "L",
    image: "assets/images/product-4.svg",
    description: "Warm knit sweater with soft fibers and relaxed fit.",
    rating: 4.3,
    reviewCount: 67,
    badge: "20% OFF"
  },
  {
    id: "p5",
    name: "Classic Denim",
    price: 54.0,
    category: "Clothing",
    color: "Blue",
    size: "32",
    image: "assets/images/product-5.svg",
    description: "Durable denim jeans with modern cut.",
    rating: 4.1,
    reviewCount: 145,
    badge: null // no badge for this one
  },
  {
    id: "p6",
    name: "Canvas Tote Bag",
    price: 19.99,
    category: "Accessories",
    color: "Natural",
    size: "One Size",
    image: "assets/images/product-6.svg",
    description: "Sturdy tote for everyday errands.",
    rating: 4.6,
    reviewCount: 203,
    badge: "POPULAR"
  },
  {
    id: "p7",
    name: "Trail Running Shoes",
    price: 79.99,
    category: "Shoes",
    color: "Gray",
    size: "43",
    image: "assets/images/product-7.svg",
    description: "Lightweight trail shoes with extra grip.",
    rating: 4.4,
    reviewCount: 112,
    badge: "NEW"
  },
  {
    id: "p8",
    name: "Classic Baseball Cap",
    price: 14.5,
    category: "Accessories",
    color: "Navy",
    size: "Adjustable",
    image: "assets/images/product-8.svg",
    description: "Simple cap with embroidered logo.",
    rating: 4.0,
    reviewCount: 78,
    badge: null
  }
];
