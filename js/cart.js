// Kaimanam Cart Management
// Uses localStorage for persistence

const CART_KEY = 'kaimanam_cart';
const ORDERS_KEY = 'kaimanam_orders';

// Cart operations
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    
    saveCart(cart);
    showNotification('Added to cart!');
    return cart;
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    return cart;
}

function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
        if (quantity <= 0) {
            return removeFromCart(productId);
        }
        item.quantity = quantity;
        saveCart(cart);
    }
    return cart;
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount();
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const product = getProductById(item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const count = getCartItemCount();
    countElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Order management
function getOrders() {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
}

function saveOrder(orderData) {
    const orders = getOrders();
    const order = {
        id: generateOrderId(),
        ...orderData,
        items: getCart().map(item => ({
            ...item,
            product: getProductById(item.productId)
        })),
        total: getCartTotal(),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return order;
}

function generateOrderId() {
    return 'KM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
}

// WhatsApp integration
function generateWhatsAppMessage(customerData) {
    const cart = getCart();
    const total = getCartTotal();
    
    let message = `🛒 *New Order from Kaimanam Website*\n\n`;
    message += `📋 *Order ID:* ${generateOrderId()}\n`;
    message += `📅 *Date:* ${new Date().toLocaleDateString('en-IN')}\n\n`;
    
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerData.name}\n`;
    message += `Phone: ${customerData.phone}\n`;
    message += `Email: ${customerData.email || 'Not provided'}\n\n`;
    
    message += `📍 *Delivery Address:*\n`;
    message += `${customerData.address}\n`;
    message += `${customerData.city}, ${customerData.state}\n`;
    message += `PIN: ${customerData.pincode}\n\n`;
    
    message += `🛍️ *Order Items:*\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    
    cart.forEach((item, index) => {
        const product = getProductById(item.productId);
        if (product) {
            message += `${index + 1}. ${product.name}\n`;
            message += `   Qty: ${item.quantity} × ₹${product.price} = ₹${item.quantity * product.price}\n`;
        }
    });
    
    message += `━━━━━━━━━━━━━━━\n`;
    message += `💰 *Total Amount: ₹${total}*\n\n`;
    
    if (customerData.notes) {
        message += `📝 *Special Instructions:*\n${customerData.notes}\n\n`;
    }
    
    message += `Payment: Cash on Delivery / To be confirmed`;
    
    return encodeURIComponent(message);
}

function sendToWhatsApp(customerData) {
    const message = generateWhatsAppMessage(customerData);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Notification helper
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
