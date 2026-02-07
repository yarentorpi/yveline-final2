// Authentication handling for Yveline

// Toggle between login/register forms
function toggleForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const resetForm = document.getElementById('reset-form');
    const codeForm = document.getElementById('code-verification-form');
    
    // Hide all forms first
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';
    if (resetForm) resetForm.style.display = 'none';
    if (codeForm) codeForm.style.display = 'none';
    
    // Show selected form
    if (formType === 'login' && loginForm) {
        loginForm.style.display = 'block';
    } else if (formType === 'register' && registerForm) {
        registerForm.style.display = 'block';
    } else if (formType === 'reset' && resetForm) {
        resetForm.style.display = 'block';
    } else if (formType === 'code' && codeForm) {
        codeForm.style.display = 'block';
    }
}

// Check URL parameters on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    
    if (mode === 'register') {
        toggleForm('register');
    }
    
    // Update user menu based on auth status
    updateUserMenu();
});

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    // Simple authentication - in production this would be an API call
    const user = {
        username: username,
        isLoggedIn: true,
        loginDate: new Date().toISOString()
    };
    
    localStorage.setItem('yveline-user', JSON.stringify(user));
    
    // Add to users list if not already there
    let usersList = [];
    const existingList = localStorage.getItem('yveline-users-list');
    if (existingList) {
        try {
            usersList = JSON.parse(existingList);
        } catch(e) {
            console.error('Error parsing users list:', e);
        }
    }
    
    // Check if user already exists
    const existingUserIndex = usersList.findIndex(u => u.username === username);
    if (existingUserIndex === -1) {
        usersList.push(user);
        localStorage.setItem('yveline-users-list', JSON.stringify(usersList));
    }
    
    // Redirect to homepage
    window.location.href = 'index.html';
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    
    // Create user object
    const user = {
        username: username,
        email: email,
        isLoggedIn: true,
        registrationDate: new Date().toISOString()
    };
    
    // Save as current user
    localStorage.setItem('yveline-user', JSON.stringify(user));
    
    // Add to users list
    let usersList = [];
    const existingList = localStorage.getItem('yveline-users-list');
    if (existingList) {
        try {
            usersList = JSON.parse(existingList);
        } catch(e) {
            console.error('Error parsing users list:', e);
        }
    }
    
    // Check if user already exists
    const existingUserIndex = usersList.findIndex(u => u.username === username);
    if (existingUserIndex !== -1) {
        usersList[existingUserIndex] = user;
    } else {
        usersList.push(user);
    }
    
    localStorage.setItem('yveline-users-list', JSON.stringify(usersList));
    
    // Redirect to homepage
    window.location.href = 'index.html';
}

// Handle password reset
function handlePasswordReset(event) {
    event.preventDefault();
    // Show code verification form
    toggleForm('code');
}

// Handle code verification
function handleCodeVerification(event) {
    event.preventDefault();
    // In production, verify code and update password
    alert('Şifreniz başarıyla güncellendi!');
    toggleForm('login');
}

// Check if user is logged in
function isLoggedIn() {
    const user = localStorage.getItem('yveline-user');
    return user !== null;
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('yveline-user');
    return userStr ? JSON.parse(userStr) : null;
}

// Logout user
function logout() {
    localStorage.removeItem('yveline-user');
    window.location.href = 'index.html';
}

// Update user menu based on auth status
function updateUserMenu() {
    const userDropdown = document.getElementById('user-dropdown');
    if (!userDropdown) return;
    
    const loggedIn = isLoggedIn();
    console.log('User logged in:', loggedIn);
    
    if (loggedIn) {
        const user = getCurrentUser();
        userDropdown.innerHTML = `
            <div class="dropdown-user-info">
                <i class="fas fa-user-circle"></i>
                <span>${user.username}</span>
            </div>
            <a href="profile.html" class="dropdown-item">
                <i class="fas fa-user"></i> Profilim
            </a>
            <a href="#" class="dropdown-item" onclick="logout(); return false;">
                <i class="fas fa-sign-out-alt"></i> Çıkış Yap
            </a>
        `;
    } else {
        userDropdown.innerHTML = `
            <a href="login.html" class="dropdown-item">Giriş Yap</a>
            <a href="login.html?mode=register" class="dropdown-item">Kaydol</a>
        `;
    }
}

// Toggle user dropdown menu
document.addEventListener('DOMContentLoaded', () => {
    const userMenuTrigger = document.getElementById('user-menu-trigger');
    const userDropdown = document.getElementById('user-dropdown');
    
    console.log('User menu trigger:', userMenuTrigger);
    console.log('User dropdown:', userDropdown);
    
    if (userMenuTrigger && userDropdown) {
        userMenuTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('User icon clicked!');
            const isVisible = userDropdown.style.display === 'block';
            userDropdown.style.display = isVisible ? 'none' : 'block';
            console.log('Dropdown display:', userDropdown.style.display);
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenuTrigger.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.style.display = 'none';
            }
        });
    } else {
        console.error('User menu elements not found!');
    }
});

// Save liked article
function saveLikedArticle(articleId) {
    const likedArticles = JSON.parse(localStorage.getItem('yveline-liked') || '[]');
    if (!likedArticles.includes(articleId)) {
        likedArticles.push(articleId);
        localStorage.setItem('yveline-liked', JSON.stringify(likedArticles));
    }
}

// Remove liked article
function removeLikedArticle(articleId) {
    const likedArticles = JSON.parse(localStorage.getItem('yveline-liked') || '[]');
    const index = likedArticles.indexOf(articleId);
    if (index > -1) {
        likedArticles.splice(index, 1);
        localStorage.setItem('yveline-liked', JSON.stringify(likedArticles));
    }
}

// Save bookmarked article
function saveBookmarkedArticle(articleId) {
    const bookmarkedArticles = JSON.parse(localStorage.getItem('yveline-bookmarked') || '[]');
    if (!bookmarkedArticles.includes(articleId)) {
        bookmarkedArticles.push(articleId);
        localStorage.setItem('yveline-bookmarked', JSON.stringify(bookmarkedArticles));
    }
}

// Remove bookmarked article
function removeBookmarkedArticle(articleId) {
    const bookmarkedArticles = JSON.parse(localStorage.getItem('yveline-bookmarked') || '[]');
    const index = bookmarkedArticles.indexOf(articleId);
    if (index > -1) {
        bookmarkedArticles.splice(index, 1);
        localStorage.setItem('yveline-bookmarked', JSON.stringify(bookmarkedArticles));
    }
}

// Get liked articles
function getLikedArticles() {
    return JSON.parse(localStorage.getItem('yveline-liked') || '[]');
}

// Get bookmarked articles
function getBookmarkedArticles() {
    return JSON.parse(localStorage.getItem('yveline-bookmarked') || '[]');
}
