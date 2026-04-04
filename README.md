# Kaimanam - E-commerce Website

Authentic South Indian Podis, Mixes & Pickles

## 📁 Project Structure

```
kaimanam/
├── Assets/                  # Product images, logo, and menu images
│   ├── food1.jpg - food17.jpg   # Product images
│   ├── logo.png             # Brand logo
│   ├── header_img.jpg       # Hero section background
│   ├── menu1.jpg - menu4.jpg    # Category images
│   └── Menu with prices.jpeg    # Price reference
├── css/
│   └── styles.css           # All website styles
├── js/
│   ├── products.js          # Product data and helper functions
│   ├── cart.js              # Cart management & WhatsApp integration
│   └── main.js              # Main JavaScript functionality
├── index.html               # Home page
├── products.html            # All products page
├── product.html             # Single product detail page
├── cart.html                # Shopping cart page
├── checkout.html            # Checkout page with WhatsApp integration
├── about.html               # About us page
├── contact.html             # Contact page
└── README.md                # This file
```

## 🚀 Getting Started

### Local Development

1. **No installation required!** This is a static HTML website.
2. Simply open `index.html` in your web browser.
3. For better experience, use a local server:
   - VS Code: Install "Live Server" extension, right-click `index.html` → "Open with Live Server"
   - Python: Run `python -m http.server 8000` in the project folder
   - Node.js: Run `npx serve` in the project folder

### Hosting (Make it Live!)

#### Option 1: Netlify (Recommended - FREE)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the entire `kaimanam` folder
4. Your site is live! You'll get a URL like `random-name.netlify.app`
5. (Optional) Add a custom domain in site settings

#### Option 2: Vercel (FREE)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Install Vercel CLI: `npm install -g vercel`
3. Run `vercel` in the project folder
4. Follow the prompts - your site is live!

#### Option 3: GitHub Pages (FREE)

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select "main" branch and "/ (root)" folder
4. Your site is live at `username.github.io/repository-name`

## 📱 How Orders Work

### Customer Journey:
1. Customer browses products and adds items to cart
2. Customer goes to checkout and fills in shipping details
3. Customer clicks "Place Order via WhatsApp"
4. WhatsApp opens with pre-filled order message
5. Customer sends the message to your WhatsApp number

### Order Message Format:
```
🛒 *New Order from Kaimanam Website*

📋 *Order ID:* KM1234ABC
📅 *Date:* 04/04/2026

👤 *Customer Details:*
Name: John Doe
Phone: 9876543210
Email: john@email.com

📍 *Delivery Address:*
123, Main Street, Landmark
Chennai, Tamil Nadu
PIN: 600001

🛍️ *Order Items:*
━━━━━━━━━━━━━━━
1. Sambar Podi
   Qty: 2 × ₹510 = ₹1020
2. Rasam Podi
   Qty: 1 × ₹485 = ₹485
━━━━━━━━━━━━━━━
💰 *Total Amount: ₹1505*

Payment: Cash on Delivery / To be confirmed
```

## 👨‍💼 For Business Owner - Managing Orders

### Viewing Orders:

Orders come directly to your WhatsApp (+91 97909 21516). You can:

1. **WhatsApp Business App** (Recommended)
   - Download WhatsApp Business from Play Store/App Store
   - Use your business number
   - Enable "Labels" to organize orders (New, Processing, Shipped, Delivered)
   - Use "Quick Replies" for common responses

2. **Order Tracking Spreadsheet**
   - Create a Google Sheet with columns:
     - Order ID, Date, Customer Name, Phone, Address, Items, Total, Status
   - Copy order details from WhatsApp to the sheet
   - Track order status and delivery

### Responding to Orders:

**Sample Response Messages:**

✅ **Order Confirmed:**
```
Hi [Name]! 🙏

Thank you for your order at Kaimanam!

✅ Order ID: [ID] confirmed
💰 Total: ₹[Amount]
📦 Estimated delivery: 3-5 business days

We'll share tracking details once shipped.

Questions? Reply here anytime!
```

📦 **Order Shipped:**
```
Great news, [Name]! 🎉

Your Kaimanam order has been shipped!

📦 Order ID: [ID]
🚚 Courier: [Name]
📝 Tracking: [Number]

Track: [Link]

Enjoy the authentic taste of South India! 🌿
```

## 💰 Future Enhancements

### Phase 2: Payment Gateway (Razorpay)

To add online payments:

1. Sign up at [razorpay.com](https://razorpay.com)
2. Complete KYC verification
3. Get API keys from Dashboard → Settings → API Keys
4. Add Razorpay script to checkout page
5. Integrate payment flow before WhatsApp message

### Phase 3: WhatsApp Business API

For automated notifications:

1. Apply for WhatsApp Business API access
2. Use providers like Twilio, Gupshup, or Meta Cloud API
3. Set up webhook for order confirmations
4. Automate order status updates to customers

## 🛠️ Customization

### Changing Products:

Edit `js/products.js` to:
- Update product names, prices, descriptions
- Add/remove products
- Change categories
- Update product images

### Changing Contact Number:

Search and replace `919790921516` in these files:
- `js/products.js` (WHATSAPP_NUMBER constant)
- All HTML files (WhatsApp links)

### Changing Colors:

Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #2d5a27;    /* Main green */
    --accent-color: #d4a853;      /* Gold accent */
    --secondary-color: #f4e4ba;   /* Light cream */
}
```

### Adding New Pages:

1. Copy any existing HTML file as template
2. Update content and navigation
3. Add link in nav-menu of all pages

## 📞 Support

For technical issues with the website:
- Create an issue on GitHub
- Or contact the developer

For business inquiries:
- WhatsApp: +91 97909 21516
- Email: info@kaimanam.com

---

Made with ❤️ for Kaimanam
