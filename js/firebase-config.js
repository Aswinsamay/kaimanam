// Firebase Configuration for Kaimanam
// Initialize Firebase services

const firebaseConfig = {
    apiKey: "AIzaSyBEajmSoBjtcepuGXJUopLYmIwTmdW81yA",
    authDomain: "kaimanam-8b7e8.firebaseapp.com",
    projectId: "kaimanam-8b7e8",
    storageBucket: "kaimanam-8b7e8.firebasestorage.app",
    messagingSenderId: "22661493303",
    appId: "1:22661493303:web:36e0eab83126abd3a0c5b2",
    measurementId: "G-W220BB11RJ"
};

// ============================================
// ADMIN CONFIGURATION - UPDATE THIS!
// ============================================
// Add email addresses that should have admin access
const ADMIN_EMAILS = [
    "aswin9866@gmail.com"
];

// ============================================
// Initialize Firebase
// ============================================
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable persistence for offline support
db.enablePersistence().catch((err) => {
    if (err.code === 'failed-precondition') {
        console.log('Persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
        console.log('Persistence not supported by browser');
    }
});

// Helper function to check if user is admin
function isAdmin(email) {
    return ADMIN_EMAILS.includes(email?.toLowerCase());
}

// Generate unique order ID
function generateOrderId() {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `KM-${dateStr}-${randomStr}`;
}

// Format timestamp to readable date
function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

console.log('Firebase initialized successfully');
