# Kaimanam - E-commerce Website

Authentic South Indian Podis, Mixes & Pickles

## 📁 Project Structure

```
kaimanam/
├── Assets/                     # Product images, logo, and menu images
│   ├── food1.jpg - food17.jpg  # Product images
│   ├── logo.png                # Brand logo
│   ├── header_img.jpg          # Hero section background
│   ├── menu1.jpg - menu4.jpg   # Category images
│   └── Menu with prices.jpeg   # Price reference
├── css/
│   └── styles.css              # All website styles
├── js/
│   ├── products.js             # Product data and helper functions
│   ├── cart.js                 # Cart management
│   ├── main.js                 # Main JavaScript functionality
│   ├── firebase-config.js      # Firebase setup & admin config
│   ├── auth.js                 # Authentication functions
│   └── orders.js               # Order management functions
├── index.html                  # Home page
├── products.html               # All products page
├── product.html                # Single product detail page
├── cart.html                   # Shopping cart page
├── checkout.html               # Checkout page (requires login)
├── login.html                  # Login / Sign up page
├── my-orders.html              # Customer order history
├── order-success.html          # Order confirmation page
├── admin.html                  # Admin dashboard
├── about.html                  # About us page
├── contact.html                # Contact page
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

1. **Firebase Project** - Already configured with:
   - Authentication (Email/Password + Google Sign-in)
   - Firestore Database

### Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. For better experience, use a local server:
   - VS Code: Install "Live Server" extension
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve`

### Hosting (Netlify - Recommended)

1. Push code to GitHub
2. Connect repository to [Netlify](https://netlify.com)
3. Auto-deploys on every push

---

## 🔐 Authentication System

### Features
- Email/Password signup and login
- Google Sign-in (one-click)
- Password reset via email
- Persistent sessions

### User Flow
1. Browse products freely
2. Login required at checkout
3. Orders linked to user account
4. View order history in "My Orders"

---

## 📦 Firebase Database Structure

### Collection: `users`
```javascript
{
  uid: "firebase-user-id",
  email: "user@example.com",
  displayName: "John Doe",
  phone: "9876543210",
  addresses: [
    { address: "...", city: "...", state: "...", pincode: "..." }
  ],
  orderCount: 5,
  totalSpent: 2500,
  createdAt: Timestamp,
  lastLoginAt: Timestamp
}
```

### Collection: `orders`
```javascript
{
  orderId: "KM-20260404-ABC123",
  customerId: "firebase-user-id",
  customerEmail: "user@example.com",
  customerName: "John Doe",
  customerPhone: "9876543210",
  shippingAddress: {
    address: "123 Main St",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600001"
  },
  items: [
    { productId: 1, name: "Sambar Podi", price: 510, quantity: 2, subtotal: 1020 }
  ],
  itemCount: 2,
  subtotal: 1020,
  shippingCost: 0,
  totalAmount: 1020,
  status: "pending", // pending | confirmed | shipped | delivered | cancelled
  paymentMethod: "cod",
  paymentStatus: "pending",
  notes: "Special instructions...",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 👨‍💼 Admin Panel

### Access
- URL: `/admin.html`
- Only accessible by admin emails configured in `js/firebase-config.js`
- Current admin: `aswin9866@gmail.com`

### Features

| Feature | Description |
|---------|-------------|
| **Dashboard Stats** | Total orders, revenue, pending orders, today's orders |
| **Order Management** | View all orders, update status, view details |
| **User Management** | View all registered users and their stats |
| **Search & Filter** | Filter orders by status, search by ID/name |
| **Export to CSV** | Download all orders as CSV file |

### Order Status Flow
```
Pending → Confirmed → Shipped → Delivered
    ↓
Cancelled
```

### Adding More Admins
Edit `js/firebase-config.js`:
```javascript
const ADMIN_EMAILS = [
    "aswin9866@gmail.com",
    "another-admin@gmail.com"  // Add more emails here
];
```

---

## 📱 Order Flow

### Customer Journey
```
1. Browse Products → 2. Add to Cart → 3. Login/Signup → 4. Checkout
                                                              ↓
5. Order Saved to Firebase → 6. WhatsApp Message Opens → 7. Order Confirmation Page
```

### WhatsApp Message Format
```
🛒 *New Order from Kaimanam Website*

📋 *Order ID:* KM-20260404-ABC123
📅 *Date:* 04/04/2026

👤 *Customer Details:*
Name: John Doe
Phone: 9876543210
Email: john@email.com

📍 *Delivery Address:*
123 Main Street, Landmark
Chennai, Tamil Nadu
PIN: 600001

🛍️ *Order Items:*
━━━━━━━━━━━━━━━
1. Sambar Podi
   Qty: 2 × ₹510 = ₹1020
━━━━━━━━━━━━━━━
💰 *Total Amount: ₹1020*

Payment: Cash on Delivery
```

---

## 🛠️ Configuration

### Changing WhatsApp Number
Edit `js/products.js`:
```javascript
const WHATSAPP_NUMBER = "919790921516";  // Change this
```

### Changing Admin Email
Edit `js/firebase-config.js`:
```javascript
const ADMIN_EMAILS = [
    "your-email@gmail.com"
];
```

### Changing Products
Edit `js/products.js`:
- Update product names, prices, descriptions
- Add/remove products
- Change categories
- Update product images

### Changing Colors/Theme
Edit `css/styles.css`:
```css
:root {
    --primary-color: #2d5a27;    /* Main green */
    --accent-color: #d4a853;      /* Gold accent */
    --secondary-color: #f4e4ba;   /* Light cream */
}
```

---

## 🔒 Firebase Security Rules

Add these rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can create orders and read their own orders
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
        (resource.data.customerId == request.auth.uid || 
         request.auth.token.email in ['aswin9866@gmail.com']);
      allow update: if request.auth != null && 
         request.auth.token.email in ['aswin9866@gmail.com'];
    }
  }
}
```

---

## 💰 Future Enhancements

### Phase 2: Payment Gateway (Razorpay)
1. Sign up at [razorpay.com](https://razorpay.com)
2. Complete KYC verification
3. Get API keys
4. Integrate payment flow before WhatsApp

### Phase 3: WhatsApp Business API
1. Apply for WhatsApp Business API access
2. Use providers like Twilio, Gupshup, or Meta Cloud API
3. Automate order confirmations to customers
4. Send shipping updates automatically

### Phase 4: Additional Features
- Email notifications
- Order tracking page
- Wishlist functionality
- Product reviews
- Discount coupons

---

## 📊 Viewing Data in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select "kaimanam-8b7e8" project
3. **Firestore Database** → View `users` and `orders` collections
4. **Authentication** → View all registered users

---

## 🐛 Troubleshooting

### "Access Denied" on Admin Page
- Make sure you're logged in with the admin email
- Check `js/firebase-config.js` for correct email

### Orders Not Saving
- Check browser console for errors
- Verify Firebase config in `js/firebase-config.js`
- Check Firestore rules allow writes

### Google Sign-in Not Working
- Enable Google provider in Firebase Console → Authentication
- Add your domain to authorized domains

### WhatsApp Not Opening
- Check WHATSAPP_NUMBER format (no + or spaces)
- Ensure popup blockers are disabled

---

## 📞 Contact

- **Business WhatsApp:** +91 97909 21516
- **Email:** info@kaimanam.com
- **Location:** Tamil Nadu, India

---

Made with ❤️ for Kaimanam
