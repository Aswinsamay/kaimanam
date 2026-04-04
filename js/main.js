// Kaimanam Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initProductCards();
    initQuantitySelectors();
    initImageGallery();
    initFilterTabs();
    initSearchFunctionality();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuBtn.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// Product Cards - Add to Cart functionality
function initProductCards() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId, 1);
        });
    });
}

// Quantity Selectors
function initQuantitySelectors() {
    document.querySelectorAll('.quantity-controls').forEach(control => {
        const minusBtn = control.querySelector('.quantity-minus');
        const plusBtn = control.querySelector('.quantity-plus');
        const input = control.querySelector('.quantity-input');
        
        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', () => {
                let value = parseInt(input.value) || 1;
                if (value > 1) {
                    input.value = value - 1;
                    input.dispatchEvent(new Event('change'));
                }
            });
            
            plusBtn.addEventListener('click', () => {
                let value = parseInt(input.value) || 1;
                input.value = value + 1;
                input.dispatchEvent(new Event('change'));
            });
        }
    });
}

// Product Image Gallery
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            if (mainImage) {
                mainImage.src = thumb.querySelector('img').src;
            }
        });
    });
}

// Filter Tabs
function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            filterProducts(category);
        });
    });
}

// Filter Products
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const name = card.querySelector('.product-name').textContent.toLowerCase();
                const category = card.dataset.category.toLowerCase();
                
                if (name.includes(query) || category.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Render Products Grid
function renderProductsGrid(containerId, productsList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = productsList.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <a href="product.html?id=${product.id}">
                    <img src="${product.images[0]}" alt="${product.name}">
                </a>
                ${product.bestseller ? '<span class="product-badge">Bestseller</span>' : ''}
                <div class="product-actions">
                    <button class="product-action-btn add-to-cart-btn" data-product-id="${product.id}" title="Add to Cart">
                        🛒
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <p class="product-weight">${product.weight}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="btn btn-cart add-to-cart-btn" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    // Re-initialize product cards
    initProductCards();
}

// Render Categories Grid
function renderCategoriesGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = categories.map(category => `
        <a href="products.html?category=${category.id}" class="category-card">
            <img src="${category.image}" alt="${category.name}">
            <div class="category-overlay">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
            </div>
        </a>
    `).join('');
}

// Render Cart Items
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const cart = getCart();
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="products.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        updateCartSummary(0);
        return;
    }
    
    container.innerHTML = `
        <div class="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span></span>
        </div>
        ${cart.map(item => {
            const product = getProductById(item.productId);
            if (!product) return '';
            return `
                <div class="cart-item" data-product-id="${item.productId}">
                    <div class="cart-product">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <div class="cart-product-info">
                            <h4>${product.name}</h4>
                            <p>${product.weight}</p>
                        </div>
                    </div>
                    <div class="cart-price">${formatPrice(product.price)}</div>
                    <div class="cart-quantity">
                        <div class="quantity-controls">
                            <button class="quantity-btn quantity-minus" onclick="updateCartItem(${item.productId}, ${item.quantity - 1})">−</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateCartItem(${item.productId}, this.value)">
                            <button class="quantity-btn quantity-plus" onclick="updateCartItem(${item.productId}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="cart-subtotal">${formatPrice(product.price * item.quantity)}</div>
                    <button class="cart-remove" onclick="removeCartItem(${item.productId})">✕</button>
                </div>
            `;
        }).join('')}
    `;
    
    updateCartSummary(getCartTotal());
}

function updateCartItem(productId, quantity) {
    updateCartQuantity(productId, parseInt(quantity));
    renderCartItems();
}

function removeCartItem(productId) {
    removeFromCart(productId);
    renderCartItems();
}

function updateCartSummary(total) {
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(total);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

// Render Checkout Order Summary
function renderCheckoutSummary() {
    const container = document.getElementById('order-items-container');
    const cart = getCart();
    
    if (!container) return;
    
    container.innerHTML = cart.map(item => {
        const product = getProductById(item.productId);
        if (!product) return '';
        return `
            <div class="order-item">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="order-item-info">
                    <h4>${product.name}</h4>
                    <p>Qty: ${item.quantity} × ${formatPrice(product.price)}</p>
                </div>
                <div class="order-item-price">${formatPrice(product.price * item.quantity)}</div>
            </div>
        `;
    }).join('');
    
    updateCartSummary(getCartTotal());
}

// Handle Checkout Form Submission
function handleCheckout(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const customerData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        pincode: formData.get('pincode'),
        notes: formData.get('notes')
    };
    
    // Validate required fields
    if (!customerData.name || !customerData.phone || !customerData.address || 
        !customerData.city || !customerData.state || !customerData.pincode) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Save order locally
    const order = saveOrder(customerData);
    
    // Send to WhatsApp
    sendToWhatsApp(customerData);
    
    // Clear cart
    clearCart();
    
    // Show success message
    showNotification('Order placed! Redirecting to WhatsApp...', 'success');
}

// Render Product Detail Page
function renderProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update page title
    document.title = `${product.name} - Kaimanam`;
    
    // Update breadcrumb
    const breadcrumbName = document.getElementById('breadcrumb-product-name');
    if (breadcrumbName) breadcrumbName.textContent = product.name;
    
    // Update gallery
    const mainImage = document.querySelector('.main-image img');
    const thumbnailContainer = document.querySelector('.thumbnail-images');
    
    if (mainImage) mainImage.src = product.images[0];
    
    if (thumbnailContainer && product.images.length > 1) {
        thumbnailContainer.innerHTML = product.images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
                <img src="${img}" alt="${product.name}">
            </div>
        `).join('');
    }
    
    // Update product info
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = formatPrice(product.price);
    document.getElementById('product-weight').textContent = product.weight;
    document.getElementById('product-description').textContent = product.description;
    
    // Set product ID for add to cart
    const addToCartBtn = document.getElementById('add-to-cart-detail');
    if (addToCartBtn) {
        addToCartBtn.dataset.productId = product.id;
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('product-quantity').value) || 1;
            addToCart(product.id, quantity);
        });
    }
}

function changeMainImage(src, thumbnail) {
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) mainImage.src = src;
    
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Sort Products
function sortProducts(criteria) {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    let sortedProducts = [...products];
    
    switch(criteria) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default order
            break;
    }
    
    renderProductsGrid('products-grid', sortedProducts);
}

// Initialize page-specific functions
function initHomePage() {
    renderCategoriesGrid('categories-grid');
    renderProductsGrid('bestsellers-grid', getBestsellers());
}

function initProductsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    let productsList;
    if (category && category !== 'all') {
        productsList = getProductsByCategory(category);
        
        // Set active filter tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    } else {
        productsList = getAllProducts();
    }
    
    renderProductsGrid('products-grid', productsList);
}

function initCartPage() {
    renderCartItems();
}

function initCheckoutPage() {
    renderCheckoutSummary();
    
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}
