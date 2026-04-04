// Kaimanam Product Data
// All products with prices from the official menu (500 gms each)

const WHATSAPP_NUMBER = "919790921516";

const categories = [
    {
        id: "podis",
        name: "Podis",
        description: "Traditional South Indian spice powders made with organic ingredients",
        image: "Assets/menu1.jpg"
    },
    {
        id: "mixes",
        name: "Mixes",
        description: "Ready-to-use pastes and thokku for quick and tasty meals",
        image: "Assets/menu2.jpg"
    },
    {
        id: "pickles",
        name: "Pickles",
        description: "Authentic homemade pickles with organic cold-pressed gingelly oil",
        image: "Assets/menu3.jpg"
    },
    {
        id: "bestsellers",
        name: "Bestsellers",
        description: "Our most loved products chosen by customers",
        image: "Assets/menu4.jpg"
    }
];

const products = [
    // PODIS (1-14)
    {
        id: 1,
        name: "Sambar Podi",
        price: 510,
        weight: "500 gms",
        category: "podis",
        description: "Authentic South Indian sambar powder made with freshly roasted spices. Perfect for making flavorful sambar that pairs wonderfully with rice, idli, and dosa.",
        images: ["Assets/food1.jpg", "Assets/food1 - Copy (2).jpg"],
        bestseller: true
    },
    {
        id: 2,
        name: "Rasam Podi",
        price: 485,
        weight: "500 gms",
        category: "podis",
        description: "Aromatic rasam powder with the perfect blend of pepper, cumin, and coriander. Makes comforting rasam that soothes the soul.",
        images: ["Assets/food2.jpg", "Assets/food2 - Copy (2).jpg"],
        bestseller: true
    },
    {
        id: 3,
        name: "Paruppu Podi",
        price: 400,
        weight: "500 gms",
        category: "podis",
        description: "Nutritious dal powder made with roasted lentils and spices. Mix with hot rice and ghee for a simple yet satisfying meal.",
        images: ["Assets/food3.jpg", "Assets/food3 - Copy.jpg"],
        bestseller: false
    },
    {
        id: 4,
        name: "Idli Podi",
        price: 420,
        weight: "500 gms",
        category: "podis",
        description: "Classic gunpowder/chutney podi with the perfect balance of heat and flavor. A must-have accompaniment for idli, dosa, and uttapam.",
        images: ["Assets/food4.jpg"],
        bestseller: true
    },
    {
        id: 5,
        name: "Flax Seeds Idli Podi",
        price: 420,
        weight: "500 gms",
        category: "podis",
        description: "Healthy twist on traditional idli podi with omega-rich flax seeds. All the taste with added nutritional benefits.",
        images: ["Assets/food5.jpg"],
        bestseller: false
    },
    {
        id: 6,
        name: "Karuvepillai Podi",
        price: 420,
        weight: "500 gms",
        category: "podis",
        description: "Curry leaves powder packed with iron and flavor. Mix with rice and ghee for a quick, nutritious meal.",
        images: ["Assets/food6.jpg", "Assets/food6 - Copy (2).jpg"],
        bestseller: true
    },
    {
        id: 7,
        name: "Vathakuzhambu Premix Podi",
        price: 490,
        weight: "500 gms",
        category: "podis",
        description: "Ready-to-use premix for making authentic vathakuzhambu. Just add tamarind extract and your favorite vegetables.",
        images: ["Assets/food7.jpg", "Assets/food7 - Copy.jpg", "Assets/food7 - Copy (2).jpg"],
        bestseller: false
    },
    {
        id: 8,
        name: "Morekuzhambu Premix Podi",
        price: 480,
        weight: "500 gms",
        category: "podis",
        description: "Convenient premix for creamy, tangy morekuzhambu. Perfect for a light, refreshing meal on hot days.",
        images: ["Assets/food8.jpg", "Assets/food8 - Copy.jpg"],
        bestseller: false
    },
    {
        id: 9,
        name: "Angaya Podi",
        price: 420,
        weight: "500 gms",
        category: "podis",
        description: "Traditional digestive powder known for its medicinal properties. Aids digestion and adds unique flavor to rice.",
        images: ["Assets/food9.jpg"],
        bestseller: false
    },
    {
        id: 10,
        name: "Verkadalai Podi",
        price: 450,
        weight: "500 gms",
        category: "podis",
        description: "Crunchy peanut powder with aromatic spices. Rich in protein and absolutely delicious with hot rice.",
        images: ["Assets/food10.jpg"],
        bestseller: false
    },
    {
        id: 11,
        name: "Poondu Podi",
        price: 670,
        weight: "500 gms",
        category: "podis",
        description: "Premium garlic powder with intense flavor. Known for its health benefits and irresistible taste.",
        images: ["Assets/food11.jpg"],
        bestseller: true
    },
    {
        id: 12,
        name: "Bisibelebath Podi",
        price: 445,
        weight: "500 gms",
        category: "podis",
        description: "Special spice blend for making authentic Karnataka-style bisibelebath. Rich, aromatic, and satisfying.",
        images: ["Assets/food12_temp.jpg"],
        bestseller: false
    },
    {
        id: 13,
        name: "Plain Moringa Podi",
        price: 520,
        weight: "500 gms",
        category: "podis",
        description: "Superfood moringa leaves powder with mild spices. Packed with nutrients and perfect for health-conscious foodies.",
        images: ["Assets/food13_temp.jpg"],
        bestseller: false
    },
    {
        id: 14,
        name: "Moringa Idli Podi",
        price: 570,
        weight: "500 gms",
        category: "podis",
        description: "Nutritious combination of moringa and traditional idli podi spices. Health meets taste in every bite.",
        images: ["Assets/food14.jpg"],
        bestseller: false
    },

    // MIXES (15-21)
    {
        id: 15,
        name: "Pulikachal",
        price: 470,
        weight: "500 gms",
        category: "mixes",
        description: "Tangy tamarind rice mix ready to use. Just mix with hot rice for instant puliyodarai - a temple favorite!",
        images: ["Assets/food15.jpg"],
        bestseller: true
    },
    {
        id: 16,
        name: "Tomato Thokku",
        price: 420,
        weight: "500 gms",
        category: "mixes",
        description: "Spicy tomato relish slow-cooked to perfection. Versatile accompaniment for rice, roti, or dosa.",
        images: ["Assets/food16.jpg"],
        bestseller: false
    },
    {
        id: 17,
        name: "Vathakuzhambu Paste",
        price: 470,
        weight: "500 gms",
        category: "mixes",
        description: "Ready-to-cook paste for authentic vathakuzhambu. Rich, tangy, and full of traditional flavors.",
        images: ["Assets/food17.jpg"],
        bestseller: false
    },
    {
        id: 18,
        name: "Pudhina Thokku",
        price: 395,
        weight: "500 gms",
        category: "mixes",
        description: "Fresh mint relish with a spicy kick. Refreshing taste that elevates any meal.",
        images: ["Assets/food1.jpg"],
        bestseller: false
    },
    {
        id: 19,
        name: "Small Onion Thokku",
        price: 420,
        weight: "500 gms",
        category: "mixes",
        description: "Caramelized shallot relish with aromatic spices. Sweet, savory, and absolutely addictive.",
        images: ["Assets/food2.jpg"],
        bestseller: false
    },
    {
        id: 20,
        name: "Kothamalli Thokku",
        price: 420,
        weight: "500 gms",
        category: "mixes",
        description: "Coriander-based relish with vibrant green color and fresh flavors. A unique and flavorful addition to your meal.",
        images: ["Assets/food3.jpg"],
        bestseller: false
    },
    {
        id: 21,
        name: "Mango Thokku",
        price: 470,
        weight: "500 gms",
        category: "mixes",
        description: "Spicy raw mango relish made with tender mangoes. Tangy, spicy, and perfect for mango lovers.",
        images: ["Assets/food4.jpg"],
        bestseller: true
    },

    // PICKLES (22-28)
    {
        id: 22,
        name: "Maavadu",
        price: 600,
        weight: "500 gms",
        category: "pickles",
        description: "Premium tender mango pickle made with baby mangoes. A South Indian delicacy with perfect crunch.",
        images: ["Assets/food5.jpg"],
        bestseller: true
    },
    {
        id: 23,
        name: "Sweet Mango Pickle",
        price: 520,
        weight: "500 gms",
        category: "pickles",
        description: "Unique sweet and tangy mango pickle. Perfect balance of flavors for those who prefer mild pickles.",
        images: ["Assets/food6.jpg"],
        bestseller: false
    },
    {
        id: 24,
        name: "Avakkai",
        price: 470,
        weight: "500 gms",
        category: "pickles",
        description: "Classic Andhra-style raw mango pickle with bold, spicy flavors. Made with traditional recipe.",
        images: ["Assets/food7.jpg"],
        bestseller: true
    },
    {
        id: 25,
        name: "Amla Pickle",
        price: 420,
        weight: "500 gms",
        category: "pickles",
        description: "Vitamin C-rich gooseberry pickle. Tangy, spicy, and incredibly healthy.",
        images: ["Assets/food8.jpg"],
        bestseller: false
    },
    {
        id: 26,
        name: "Narthangai Pickle",
        price: 400,
        weight: "500 gms",
        category: "pickles",
        description: "Citron pickle with unique citrus flavor. A rare delicacy loved by pickle connoisseurs.",
        images: ["Assets/food9.jpg"],
        bestseller: false
    },
    {
        id: 27,
        name: "Organic Lemon Pickle",
        price: 445,
        weight: "500 gms",
        category: "pickles",
        description: "Zesty lemon pickle made with organic lemons. Bright, tangy, and full of sunshine flavors.",
        images: ["Assets/food10.jpg"],
        bestseller: false
    },
    {
        id: 28,
        name: "Cut Mango Pickle",
        price: 520,
        weight: "500 gms",
        category: "pickles",
        description: "Traditional cut mango pickle with chunky pieces. Robust flavor and satisfying texture in every bite.",
        images: ["Assets/food11.jpg"],
        bestseller: true
    }
];

// Helper functions
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

function getProductsByCategory(categoryId) {
    if (categoryId === 'bestsellers') {
        return products.filter(p => p.bestseller);
    }
    return products.filter(p => p.category === categoryId);
}

function getBestsellers() {
    return products.filter(p => p.bestseller);
}

function getAllProducts() {
    return products;
}

function getCategoryById(categoryId) {
    return categories.find(c => c.id === categoryId);
}

function formatPrice(price) {
    return `₹${price}`;
}

function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
}
