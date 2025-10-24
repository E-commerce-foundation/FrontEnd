class Product {
    #price;
    constructor(
        name,
        price,
        image,
        description = "",
        rating = "",
        details = {}
    ) {
        this.id = Math.random().toString(36).substring(2, 9);
        this.name = name;
        this.#price = price;
        this.image = image;
        this.description = description;
        this.rating = rating;
        this.details = details;
    }

    getPrice(){
        return this.#price;
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

    add(product, quantity) {
        const existingItem = this.items.get(product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
            this.#total += existingItem.product.price * quantity;
        } else {
            this.items.set(product.id, new CartItem(product.id, quantity));
            this.#total += product.price * quantity;
        }
    }

    remove(product) {
        this.items.delete(product.id);
        this.#total -= product.price * this.items.get(product.id).quantity;
    }

    save() {
        try {
            localStorage.setItem(
                STORAGE_CART,
                JSON.stringify({ items: this.items, total: this.#total })
            );
        } catch (e) {
            console.warn("Failed to save cart", e);
        }
    }

    load() {
        try {
            const items = localStorage.getItem(STORAGE_CART);
            this.items = items ? new Map(JSON.parse(items)) : new Map();
        } catch (e) {
            this.items = new Map();
        }
    }
}

class Favorites {
    STORAGE_FAVS = "shop_favs_v1";
    constructor() {
        this.items = new Set();
        this.load();
    }

    toggle(product_id) {
        if(this.items.has(product_id)){
            this.items.delete(product_id);
        }
        else{
            this.items.add(product_id)
        }
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
