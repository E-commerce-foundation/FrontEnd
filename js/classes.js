class Product {
    #price;
    constructor(id, name, price, image, description = "", details = {}) {
        // this.id = Math.random().toString(36).substring(2, 9);
        this.id = id;
        this.name = name;
        this.#price = price;
        this.image = image;
        this.description = description;
        this.details = details;
        this.isFavorite = false;
    }

    getPrice() {
        return this.#price;
    }

    getRatingStars() {
        const fullStars = Math.floor(this.details.rating || 0);
        const hasHalfStar = (this.details.rating || 0) % 1 >= 0.5;
        return (
            "★".repeat(fullStars) +
            (hasHalfStar ? "☆" : "") +
            "☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0))
        );
    }
}

class Favorites {
    STORAGE_FAVS = "shop_favs_v1";
    constructor() {
        this.items = new Set();
        this.load();
    }

    toggle(product_id) {
        if (this.items.has(product_id)) {
            this.items.delete(product_id);
        } else {
            this.items.add(product_id);
        }
        this.save();
    }

    save() {
        try {
            const keys = Array.from(this.items.keys());
            localStorage.setItem(STORAGE_FAVS, JSON.stringify(keys));
        } catch (e) {
            console.warn("Failed to save favorites", e);
        }
    }
    load() {
        try {
            const items = localStorage.getItem(STORAGE_FAVS);
            this.items = items ? new Set(JSON.parse(items)) : new Set();
        } catch (e) {
            this.items = new Set();
        }
    }
}

class CartItem {
    constructor(productId, quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
}

class Cart {
    STORAGE_CART = "shop_cart_v1";

    #total;
    constructor() {
        this.items = new Map();
        this.#total = 0;
        this.load();
    }

    add(product, quantity = 1) {
        const existingCartItem = this.items.get(product.id);
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            this.#total += product.getPrice() * quantity;
        } else {
            this.items.set(product.id, new CartItem(product.id, quantity));
            this.#total += product.getPrice() * quantity;
        }
        this.save();
    }

    remove(product) {
        this.#total -= product.getPrice() * this.items.get(product.id).quantity;
        this.items.delete(product.id);
        this.save();
    }

    updateQuantity(productId, quantity) {
        const cartItem = this.items.get(productId);
        cartItem.quantity = Math.max(1, quantity);
        this.save();
    }

    save() {
        const toStore = JSON.stringify({
            items: [...this.items],
            total: this.#total,
        });
        console.log(toStore);
        try {
            localStorage.setItem(this.STORAGE_CART, toStore);
        } catch (e) {
            console.warn("Failed to save cart", e);
        }
    }

    load() {
        try {
            const cart = localStorage.getItem(this.STORAGE_CART);
            const parsedCart = cart ? JSON.parse(cart) : null;

            this.items = parsedCart ? new Map(parsedCart.items) : new Map();
            this.#total = parsedCart ? parsedCart.total : 0;
        } catch (e) {
            this.items = new Map();
        }
    }

    clear() {
        this.items = new Map();
        this.#total = 0;
        this.save();
    }

    getTotal() {
        return this.#total;
    }

    getTotalQuantity() {
        const count = Array.from(window.shoppingCart.items.values()).reduce(
            (acc, item) => {
                acc += item.quantity;
                return acc;
            },
            0
        );
        return count;
    }
}

class Order {
    constructor(userId, cartId) {
        this.userId = userId;
        this.cartId = cartId;
        this.orderDate = new Date();
    }
}

class OrderQueue {
    orders = [];
    enqueue(orderId) {
        this.orders.push(orderId);
    }
    dequeue() {
        return this.orders.shift();
    }
}

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
        this.cart = new Cart();
    }
}

class Admin extends User {
    constructor(username, email) {
        super(username, email);
    }
    manageProducts() {
        // Admin-specific product management logic
    }
}

export { Product, CartItem, Cart, Favorites, Order, OrderQueue, User, Admin };

window.shoppingCart = new Cart();
window.shoppingCart.load();
window.favorites = new Favorites();
