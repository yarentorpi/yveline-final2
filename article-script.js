// Article page functionality
let articlesData = null;

// Load articles data
async function loadArticlesData() {
    try {
        // First try localStorage (if admin added content)
        const localData = localStorage.getItem('yveline-articles');
        if (localData) {
            articlesData = JSON.parse(localData);
            console.log('✅ İçerikler admin panelinden yüklendi!');
            return articlesData;
        }
        
        // Fallback to JSON file
        const response = await fetch('articles-data.json');
        articlesData = await response.json();
        console.log('📄 İçerikler JSON dosyasından yüklendi');
        return articlesData;
    } catch (error) {
        console.error('Error loading articles:', error);
        return null;
    }
}

// Get article ID from URL
function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Render article page
function renderArticlePage(article) {
    const container = document.getElementById('article-page');
    
    if (!article) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Makale bulunamadı</h2>
                <p>Aradığınız makale mevcut değil veya kaldırılmış olabilir.</p>
                <a href="index.html" class="back-home-btn">Ana Sayfaya Dön</a>
            </div>
        `;
        return;
    }

    // Check if article has real content
    let contentToShow = '';
    if (article.content && article.content.trim() !== '') {
        contentToShow = article.content;
    } else {
        // If no content, show a message instead of lorem ipsum
        contentToShow = `
            <div style="text-align: center; padding: 40px 20px;">
                <p style="font-size: 18px; color: #666; margin-bottom: 20px;">
                    Bu makale için henüz içerik eklenmemiş.
                </p>
                <p style="font-size: 16px; color: #999;">
                    Admin panelinden içerik ekleyebilirsiniz.
                </p>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="article-detail-container">
            <div class="article-detail-header">
                <button class="back-button" onclick="window.history.back()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div class="article-detail-actions">
                    <button class="icon-btn bookmark-btn" onclick="toggleBookmark(this)">
                        <i class="far fa-bookmark"></i>
                    </button>
                    <button class="icon-btn heart-btn" onclick="toggleLike(this)">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            
            <div class="article-detail-hero">
                <img src="${article.image}" alt="${article.title}">
                <div class="article-detail-title-box">
                    <span class="article-category-badge">${article.category}</span>
                    <h1 class="article-detail-title">${article.title}</h1>
                </div>
            </div>
            
            <div class="article-detail-content">
                ${contentToShow}
            </div>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load articles data
    await loadArticlesData();
    
    // Get article ID from URL
    const articleId = getArticleIdFromUrl();
    
    if (!articlesData || !articlesData.articles) {
        document.getElementById('article-page').innerHTML = `
            <div class="error-message">
                <h2>Veri yüklenemedi</h2>
                <p>Makaleler yüklenirken bir hata oluştu.</p>
                <a href="index.html" class="back-home-btn">Ana Sayfaya Dön</a>
            </div>
        `;
        return;
    }
    
    // Find the article
    const article = articlesData.articles.find(a => a.id === articleId);
    
    // Render the article
    renderArticlePage(article);
    
    // Update page title
    if (article) {
        document.title = `${article.title} - Yveline`;
    }
});
