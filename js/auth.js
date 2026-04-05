// Kaimanam Authentication System
// Handles user signup, login, logout, and session management

// ============================================
// AUTH STATE MANAGEMENT
// ============================================

let currentUser = null;

// Listen for auth state changes
auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    updateUIForAuthState(user);
    
    if (user) {
        // User is signed in
        console.log('User signed in:', user.email);
        
        // Update user document in Firestore
        await updateUserDocument(user);
        
        // Check if on login page, redirect to intended page or home
        if (window.location.pathname.includes('login.html')) {
            const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || 'index.html';
            sessionStorage.removeItem('redirectAfterLogin');
            window.location.href = redirectUrl;
        }
    } else {
        // User is signed out
        console.log('User signed out');
    }
});

// ============================================
// USER DOCUMENT MANAGEMENT
// ============================================

async function updateUserDocument(user) {
    try {
        const userRef = db.collection('users').doc(user.uid);
        const userDoc = await userRef.get();
        
        if (!userDoc.exists) {
            // Create new user document
            await userRef.set({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                phone: user.phoneNumber || '',
                addresses: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
                orderCount: 0,
                totalSpent: 0
            });
            console.log('New user document created');
        } else {
            // Update last login
            await userRef.update({
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
                displayName: user.displayName || userDoc.data().displayName,
                photoURL: user.photoURL || userDoc.data().photoURL
            });
        }
    } catch (error) {
        console.error('Error updating user document:', error);
    }
}

async function getUserData(uid) {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        return userDoc.exists ? userDoc.data() : null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}

async function updateUserProfile(uid, data) {
    try {
        await db.collection('users').doc(uid).update({
            ...data,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error updating user profile:', error);
        return false;
    }
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Sign up with email and password
async function signUpWithEmail(email, password, displayName) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // Update display name
        await userCredential.user.updateProfile({
            displayName: displayName
        });
        
        showNotification('Account created successfully!', 'success');
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Signup error:', error);
        let message = 'Failed to create account';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'This email is already registered. Please login.';
                break;
            case 'auth/invalid-email':
                message = 'Invalid email address';
                break;
            case 'auth/weak-password':
                message = 'Password should be at least 6 characters';
                break;
        }
        
        showNotification(message, 'error');
        return { success: false, error: message };
    }
}

// Login with email and password
async function loginWithEmail(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        showNotification('Welcome back!', 'success');
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Login error:', error);
        let message = 'Failed to login';
        
        switch (error.code) {
            case 'auth/user-not-found':
                message = 'No account found with this email';
                break;
            case 'auth/wrong-password':
                message = 'Incorrect password';
                break;
            case 'auth/invalid-email':
                message = 'Invalid email address';
                break;
            case 'auth/too-many-requests':
                message = 'Too many failed attempts. Please try again later.';
                break;
        }
        
        showNotification(message, 'error');
        return { success: false, error: message };
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        const userCredential = await auth.signInWithPopup(provider);
        showNotification('Signed in with Google!', 'success');
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Google sign-in error:', error);
        let message = 'Failed to sign in with Google';
        
        if (error.code === 'auth/popup-closed-by-user') {
            message = 'Sign-in popup was closed';
        } else if (error.code === 'auth/popup-blocked') {
            message = 'Popup was blocked. Please allow popups.';
        }
        
        showNotification(message, 'error');
        return { success: false, error: message };
    }
}

// Logout
async function logout() {
    try {
        await auth.signOut();
        showNotification('Logged out successfully', 'success');
        
        // Redirect to home if on protected page
        const protectedPages = ['checkout.html', 'admin.html', 'account.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'index.html';
        }
        
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        showNotification('Failed to logout', 'error');
        return false;
    }
}

// Password reset
async function resetPassword(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        showNotification('Password reset email sent!', 'success');
        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        let message = 'Failed to send reset email';
        
        if (error.code === 'auth/user-not-found') {
            message = 'No account found with this email';
        }
        
        showNotification(message, 'error');
        return { success: false, error: message };
    }
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

function updateUIForAuthState(user) {
    // Update header auth section
    const authSection = document.getElementById('auth-section');
    const userSection = document.getElementById('user-section');
    const userNameDisplay = document.getElementById('user-name-display');
    const userAvatar = document.getElementById('user-avatar');
    
    if (user) {
        // User is logged in
        if (authSection) authSection.style.display = 'none';
        if (userSection) userSection.style.display = 'flex';
        
        if (userNameDisplay) {
            userNameDisplay.textContent = user.displayName || user.email.split('@')[0];
        }
        
        if (userAvatar) {
            if (user.photoURL) {
                userAvatar.innerHTML = `<img src="${user.photoURL}" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%;">`;
            } else {
                userAvatar.innerHTML = `<span style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600;">${(user.displayName || user.email)[0].toUpperCase()}</span>`;
            }
        }
        
        // Show admin link if user is admin
        const adminLink = document.getElementById('admin-link');
        if (adminLink) {
            adminLink.style.display = isAdmin(user.email) ? 'block' : 'none';
        }
    } else {
        // User is logged out
        if (authSection) authSection.style.display = 'flex';
        if (userSection) userSection.style.display = 'none';
        
        const adminLink = document.getElementById('admin-link');
        if (adminLink) adminLink.style.display = 'none';
    }
}

// Check if user is logged in (for protected pages)
function requireAuth(redirectUrl = 'login.html') {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            if (!user) {
                sessionStorage.setItem('redirectAfterLogin', window.location.href);
                window.location.href = redirectUrl;
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

// Check if user is admin (for admin pages)
function requireAdmin() {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            if (!user || !isAdmin(user.email)) {
                showNotification('Access denied. Admin only.', 'error');
                window.location.href = 'index.html';
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Check if user is logged in
function isLoggedIn() {
    return currentUser !== null;
}
