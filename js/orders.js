// Kaimanam Orders Management
// Handles saving orders to Firebase and order management

// ============================================
// CREATE ORDER
// ============================================

async function createOrder(customerData) {
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please login to place an order', 'error');
        return null;
    }

    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return null;
    }

    try {
        const orderId = generateOrderId();
        const orderItems = cart.map(item => {
            const product = getProductById(item.productId);
            return {
                productId: item.productId,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                weight: product.weight,
                subtotal: product.price * item.quantity
            };
        });

        const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

        const orderData = {
            orderId: orderId,
            customerId: user.uid,
            customerEmail: user.email,
            customerName: customerData.name,
            customerPhone: customerData.phone,
            shippingAddress: {
                address: customerData.address,
                city: customerData.city,
                state: customerData.state,
                pincode: customerData.pincode
            },
            items: orderItems,
            itemCount: cart.reduce((count, item) => count + item.quantity, 0),
            subtotal: subtotal,
            shippingCost: 0, // Can be calculated based on location
            totalAmount: subtotal,
            status: 'pending',
            paymentMethod: customerData.paymentMethod || 'cod',
            paymentStatus: 'pending',
            notes: customerData.notes || '',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Save order to Firestore
        await db.collection('orders').doc(orderId).set(orderData);

        // Update user's order count and total spent
        await db.collection('users').doc(user.uid).update({
            orderCount: firebase.firestore.FieldValue.increment(1),
            totalSpent: firebase.firestore.FieldValue.increment(subtotal)
        });

        // Clear cart after successful order
        clearCart();

        console.log('Order created:', orderId);
        return { success: true, orderId: orderId, order: orderData };

    } catch (error) {
        console.error('Error creating order:', error);
        showNotification('Failed to create order. Please try again.', 'error');
        return { success: false, error: error.message };
    }
}

// ============================================
// GET USER ORDERS
// ============================================

async function getUserOrders(userId) {
    try {
        const snapshot = await db.collection('orders')
            .where('customerId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();

        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        return orders;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return [];
    }
}

// ============================================
// ADMIN: GET ALL ORDERS
// ============================================

async function getAllOrders(filters = {}) {
    try {
        let query = db.collection('orders').orderBy('createdAt', 'desc');

        // Apply filters
        if (filters.status && filters.status !== 'all') {
            query = query.where('status', '==', filters.status);
        }

        if (filters.limit) {
            query = query.limit(filters.limit);
        }

        const snapshot = await query.get();

        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        return orders;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        return [];
    }
}

// ============================================
// ADMIN: UPDATE ORDER STATUS
// ============================================

async function updateOrderStatus(orderId, newStatus) {
    try {
        await db.collection('orders').doc(orderId).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification(`Order status updated to ${newStatus}`, 'success');
        return true;
    } catch (error) {
        console.error('Error updating order status:', error);
        showNotification('Failed to update order status', 'error');
        return false;
    }
}

// ============================================
// ADMIN: GET ORDER STATISTICS
// ============================================

async function getOrderStats() {
    try {
        const ordersSnapshot = await db.collection('orders').get();
        
        let stats = {
            totalOrders: 0,
            pendingOrders: 0,
            confirmedOrders: 0,
            shippedOrders: 0,
            deliveredOrders: 0,
            cancelledOrders: 0,
            totalRevenue: 0,
            todayOrders: 0,
            todayRevenue: 0
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        ordersSnapshot.forEach(doc => {
            const order = doc.data();
            stats.totalOrders++;
            stats.totalRevenue += order.totalAmount || 0;

            // Count by status
            switch (order.status) {
                case 'pending': stats.pendingOrders++; break;
                case 'confirmed': stats.confirmedOrders++; break;
                case 'shipped': stats.shippedOrders++; break;
                case 'delivered': stats.deliveredOrders++; break;
                case 'cancelled': stats.cancelledOrders++; break;
            }

            // Today's orders
            if (order.createdAt) {
                const orderDate = order.createdAt.toDate();
                if (orderDate >= today) {
                    stats.todayOrders++;
                    stats.todayRevenue += order.totalAmount || 0;
                }
            }
        });

        return stats;
    } catch (error) {
        console.error('Error fetching order stats:', error);
        return null;
    }
}

// ============================================
// GET SINGLE ORDER
// ============================================

async function getOrder(orderId) {
    try {
        const doc = await db.collection('orders').doc(orderId).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching order:', error);
        return null;
    }
}

// ============================================
// WHATSAPP MESSAGE GENERATION
// ============================================

function generateWhatsAppOrderMessage(order) {
    let message = `🛒 *New Order from Kaimanam Website*\n\n`;
    message += `📋 *Order ID:* ${order.orderId}\n`;
    message += `📅 *Date:* ${new Date().toLocaleDateString('en-IN')}\n\n`;

    message += `👤 *Customer Details:*\n`;
    message += `Name: ${order.customerName}\n`;
    message += `Phone: ${order.customerPhone}\n`;
    message += `Email: ${order.customerEmail}\n\n`;

    message += `📍 *Delivery Address:*\n`;
    message += `${order.shippingAddress.address}\n`;
    message += `${order.shippingAddress.city}, ${order.shippingAddress.state}\n`;
    message += `PIN: ${order.shippingAddress.pincode}\n\n`;

    message += `🛍️ *Order Items:*\n`;
    message += `━━━━━━━━━━━━━━━\n`;

    order.items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Qty: ${item.quantity} × ₹${item.price} = ₹${item.subtotal}\n`;
    });

    message += `━━━━━━━━━━━━━━━\n`;
    message += `💰 *Total Amount: ₹${order.totalAmount}*\n\n`;

    if (order.notes) {
        message += `📝 *Special Instructions:*\n${order.notes}\n\n`;
    }

    message += `Payment: ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}`;

    return encodeURIComponent(message);
}

function sendOrderToWhatsApp(order) {
    const message = generateWhatsAppOrderMessage(order);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// ============================================
// ADMIN: GET USERS LIST
// ============================================

async function getAllUsers() {
    try {
        const snapshot = await db.collection('users')
            .orderBy('createdAt', 'desc')
            .get();

        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

// ============================================
// EXPORT ORDERS TO CSV
// ============================================

function exportOrdersToCSV(orders) {
    const headers = [
        'Order ID', 'Date', 'Customer Name', 'Email', 'Phone',
        'Address', 'City', 'State', 'PIN', 'Items', 'Total', 'Status', 'Payment'
    ];

    const rows = orders.map(order => [
        order.orderId,
        order.createdAt ? formatDate(order.createdAt) : 'N/A',
        order.customerName,
        order.customerEmail,
        order.customerPhone,
        order.shippingAddress?.address || '',
        order.shippingAddress?.city || '',
        order.shippingAddress?.state || '',
        order.shippingAddress?.pincode || '',
        order.items?.map(i => `${i.name} x${i.quantity}`).join('; ') || '',
        order.totalAmount,
        order.status,
        order.paymentMethod
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kaimanam-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}
