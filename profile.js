// Profile page functionality - Figma design

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load user info
    loadUserInfo();
    
    // Setup settings button
    const settingsBtn = document.querySelector('.settings-icon');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showSection('settings');
        });
    }
});

// Load user information
function loadUserInfo() {
    const user = getCurrentUser();
    if (user) {
        // Update all username displays
        const usernameElements = [
            document.getElementById('profile-username'),
            document.getElementById('likes-username'),
            document.getElementById('bookmarks-username')
        ];
        
        usernameElements.forEach(el => {
            if (el) el.textContent = user.username;
        });
    }
}

// Show different sections
function showSection(section) {
    // Hide all sections
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('settings-menu').style.display = 'none';
    document.getElementById('likes-section').style.display = 'none';
    document.getElementById('bookmarks-section').style.display = 'none';
    
    // Hide/show main profile section
    const mainSection = document.querySelector('.profile-main-section');
    const mainHeader = document.querySelector('.profile-simple-header');
    
    switch(section) {
        case 'main':
            if (mainSection) mainSection.style.display = 'block';
            if (mainHeader) mainHeader.style.display = 'flex';
            document.getElementById('main-menu').style.display = 'block';
            break;
            
        case 'settings':
            if (mainSection) mainSection.style.display = 'block';
            if (mainHeader) mainHeader.style.display = 'flex';
            document.getElementById('settings-menu').style.display = 'block';
            break;
            
        case 'likes':
            if (mainSection) mainSection.style.display = 'none';
            if (mainHeader) mainHeader.style.display = 'none';
            document.getElementById('likes-section').style.display = 'block';
            loadLikesContent();
            break;
            
        case 'bookmarks':
            if (mainSection) mainSection.style.display = 'none';
            if (mainHeader) mainHeader.style.display = 'none';
            document.getElementById('bookmarks-section').style.display = 'block';
            loadBookmarksContent();
            break;
    }
}

// Load liked content
async function loadLikesContent() {
    const likedIds = getLikedArticles();
    const likesList = document.getElementById('likes-list');
    
    if (!likesList) return;
    
    if (likedIds.length === 0) {
        likesList.innerHTML = '<p class="empty-state">Henüz beğendiğiniz içerik yok.</p>';
        return;
    }
    
    try {
        const articles = await fetchAllArticles();
        const likedArticles = articles.filter(article => likedIds.includes(article.id));
        
        if (likedArticles.length === 0) {
            likesList.innerHTML = '<p class="empty-state">Henüz beğendiğiniz içerik yok.</p>';
            return;
        }
        
        likesList.innerHTML = likedArticles.map(article => createContentCard(article, 'like')).join('');
    } catch (error) {
        console.error('Error loading likes:', error);
        likesList.innerHTML = '<p class="empty-state">İçerik yüklenirken bir hata oluştu.</p>';
    }
}

// Load bookmarked content
async function loadBookmarksContent() {
    const bookmarkedIds = getBookmarkedArticles();
    const bookmarksList = document.getElementById('bookmarks-list');
    
    if (!bookmarksList) return;
    
    if (bookmarkedIds.length === 0) {
        bookmarksList.innerHTML = '<p class="empty-state">Henüz kaydettiğiniz içerik yok.</p>';
        return;
    }
    
    try {
        const articles = await fetchAllArticles();
        const bookmarkedArticles = articles.filter(article => bookmarkedIds.includes(article.id));
        
        if (bookmarkedArticles.length === 0) {
            bookmarksList.innerHTML = '<p class="empty-state">Henüz kaydettiğiniz içerik yok.</p>';
            return;
        }
        
        bookmarksList.innerHTML = bookmarkedArticles.map(article => createContentCard(article, 'bookmark')).join('');
    } catch (error) {
        console.error('Error loading bookmarks:', error);
        bookmarksList.innerHTML = '<p class="empty-state">İçerik yüklenirken bir hata oluştu.</p>';
    }
}

// Fetch all articles
async function fetchAllArticles() {
    try {
        // First try localStorage
        const localData = localStorage.getItem('yveline-articles');
        if (localData) {
            const data = JSON.parse(localData);
            return data.articles;
        }
        
        // Fallback to JSON file
        const response = await fetch('articles-data.json');
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

// Create content card matching Figma design
function createContentCard(article, type) {
    const iconClass = type === 'like' ? 'fa-heart' : 'fa-bookmark';
    const count = Math.floor(Math.random() * 20) + 1; // Random count for demo
    
    return `
        <div class="content-card" onclick="window.location.href='article.html?id=${article.id}'">
            <div class="content-card-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="content-card-info">
                <h4>${article.title}</h4>
                <div class="content-card-meta">
                    <i class="fas ${iconClass}"></i>
                    <span>${count}</span>
                </div>
            </div>
        </div>
    `;
}
