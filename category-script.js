// Category page functionality
let articlesData = null;

// Load articles data
async function loadArticlesData() {
    try {
        const response = await fetch('articles-data.json');
        articlesData = await response.json();
        return articlesData;
    } catch (error) {
        console.error('Error loading articles:', error);
        return null;
    }
}

// Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get('cat'),
        subcategory: params.get('sub')
    };
}

// Track article views
function trackArticleView(articleId) {
    const views = JSON.parse(localStorage.getItem('article_views') || '{}');
    views[articleId] = (views[articleId] || 0) + 1;
    localStorage.setItem('article_views', JSON.stringify(views));
}

// Get most viewed articles
function getMostViewedArticles(articles, mainCategory = null, limit = 3) {
    const views = JSON.parse(localStorage.getItem('article_views') || '{}');
    
    let filteredArticles = articles;
    if (mainCategory) {
        filteredArticles = articles.filter(a => a.mainCategory === mainCategory);
    }
    
    // Sort by views (most viewed first)
    const sortedArticles = filteredArticles
        .map(article => ({
            ...article,
            viewCount: views[article.id] || 0
        }))
        .sort((a, b) => b.viewCount - a.viewCount);
    
    return sortedArticles.slice(0, limit);
}

// Render article card
function renderArticleCard(article) {
    return `
        <article class="article-card" data-article-id="${article.id}">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
                <div class="article-icons">
                    <button class="icon-btn heart-btn" onclick="toggleLike(this); event.stopPropagation();">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="icon-btn bookmark-btn" onclick="toggleBookmark(this); event.stopPropagation();">
                        <i class="far fa-bookmark"></i>
                    </button>
                </div>
            </div>
            <div class="article-text">
                <span class="article-tag">${article.category}</span>
                <h3>${article.title}</h3>
                <p class="article-description">${article.excerpt}</p>
                <button class="read-more-btn">
                    <span>Devamını Gör</span>
                    <span class="arrow-icon"></span>
                </button>
            </div>
        </article>
    `;
}

// Render featured card for mega menu
function renderFeaturedCard(article) {
    return `
        <div class="mega-menu-card" data-article-id="${article.id}">
            <img src="${article.image}" alt="${article.title}">
            <p>${article.title}</p>
        </div>
    `;
}

// Load featured articles in mega menu
function loadMegaMenuFeatured() {
    if (!articlesData) return;
    
    const categories = ['saglik-wellness', 'yasam-stil', 'ev-eglence'];
    
    categories.forEach(cat => {
        const container = document.getElementById(`featured-${cat}`);
        if (!container) return;
        
        const featuredArticles = getMostViewedArticles(articlesData.articles, cat, 3);
        container.innerHTML = featuredArticles.map(article => renderFeaturedCard(article)).join('');
        
        // Add click handlers
        container.querySelectorAll('.mega-menu-card').forEach(card => {
            card.addEventListener('click', function() {
                // Close all mega menus
                document.querySelectorAll('.mega-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
                
                const articleId = parseInt(this.getAttribute('data-article-id'));
                const article = articlesData.articles.find(a => a.id === articleId);
                if (article) {
                    trackArticleView(articleId);
                    openArticleDetailFromData(article);
                }
            });
        });
    });
}

// Load category page articles
function loadCategoryArticles() {
    const { category, subcategory } = getUrlParams();
    const container = document.getElementById('articles-container');
    const titleEl = document.getElementById('category-title');
    const descEl = document.getElementById('category-description');
    
    if (!articlesData || !category) {
        container.innerHTML = '<p>İçerik bulunamadı.</p>';
        return;
    }
    
    // Filter articles
    let filteredArticles = articlesData.articles.filter(a => a.mainCategory === category);
    
    if (subcategory) {
        filteredArticles = filteredArticles.filter(a => a.category === subcategory);
        titleEl.textContent = subcategory;
        descEl.textContent = `${subcategory} kategorisindeki tüm içerikler`;
    } else {
        const catData = articlesData.categories[category];
        titleEl.textContent = catData ? catData.name : 'Kategori';
        descEl.textContent = `${catData ? catData.name : 'Kategori'} içerikleri`;
    }
    
    // Render articles
    if (filteredArticles.length === 0) {
        container.innerHTML = '<p class="no-articles">Bu kategoride henüz içerik bulunmamaktadır.</p>';
        return;
    }
    
    container.innerHTML = filteredArticles.map(article => renderArticleCard(article)).join('');
    
    // Add click handlers
    container.querySelectorAll('.article-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            if (e.target.closest('.article-icons') || e.target.closest('.read-more-btn')) {
                return;
            }
            const articleId = parseInt(this.getAttribute('data-article-id'));
            const article = articlesData.articles.find(a => a.id === articleId);
            if (article) {
                trackArticleView(articleId);
                openArticleDetailFromData(article);
            }
        });
    });
    
    // Add read more button handlers
    container.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.article-card');
            const articleId = parseInt(card.getAttribute('data-article-id'));
            const article = articlesData.articles.find(a => a.id === articleId);
            if (article) {
                trackArticleView(articleId);
                openArticleDetailFromData(article);
            }
        });
    });
    
    // Load saved like/bookmark states
    loadSavedStates();
}

// Open article detail from data
function openArticleDetailFromData(article) {
    let detailPage = document.querySelector('.article-detail-page');
    if (!detailPage) {
        detailPage = document.createElement('div');
        detailPage.className = 'article-detail-page';
        document.body.appendChild(detailPage);
    }
    
    const sampleContent = `
        <p>Lorem ipsum dolor sit amet consectetur. Sit nibh enim suspendisse euismod urna. Lectus vel pellentesque eget et donec. Suspendisse aliquam morbi nibh nec enim sagittis venenatis enim. Id a adipiscing mi vel eget in in. Pretium vel consequat purus semper. Eros magna massa sed placerat auctor montes vulputate nullam tincidunt. Egestas eu convallis aliquet ornare id. Mattis dignissim blandit ullamcorper nibh. Donec odio dui nullam donec feugiat est. Pulvinar egestas ac pellentesque elit auctor semper. Eget ut placerat ornare blandit luctus.</p>
        
        <p>Est ut faucibus nunc vulputate hendrerit maecenas viverra. Magna quisque a sed at dignissim. Lectus pretium elementum pharetra viverra dictumst. Cursus laoreet sed amet id amet. Nunc tincidunt lectus pretium volutpat etiam. Nisl eu a scelerisque fringilla nam id. Volutpat elit massa risus mattis rhoncus. Eu diam purus est ornare volutpat varius. Egestas ullamcorper est quam non integer curabitur egestas in bibendum.</p>
        
        <p>Porta viverra vestibulum at venenatis. Eleifend ultrices imperdiet sagittis amet netus adipiscing mattis. Quis feugiat felis ultrices ut ante mi pretium. Euismod mauris mi in at non proin. Dignissim purus massa in et. Nulla interdum eget ipsum nullam varius at tincidunt sagittis. Tortor duis a duis semper nec. Ac proin nunc ac placerat et volutpat nisl. Volutpat commodo tristique elit fermentum et posuere duis. In volutpat ornare ornare enim.</p>
        
        <p>Sed ac consequat in ac. Neque viverra rhoncus eu commodo sit sed tortor. Arcu pretium commodo sit sit. Mauris id a nulla pellentesque dolor aliquam elit magnis duis. Varius dui viverra nulla hac quis vestibulum sed neque a. Non ultrices phasellus mi condimentum vitae elit ac nec nec. Ultrices sed et elit quisque faucibus faucibus. Id ut massa erat libero lorem rhoncus rhoncus.</p>
        
        <p>Nulla metus praesent enim purus non non dui pellentesque morbi. Dictum mattis risus nec morbi gravida. Nibh amet consectetur tristique vitae amet eu euismod. Quis vitae iaculis purus in proin sit adipiscing est. Maecenas scelerisque bibendum consectetur aliquam adipiscing dignissim duis arcu. Amet quis neque a ornare. Ultricies tellus nibh maecenas cras. Massa varius nisi morbi cum consectetur faucibus.</p>
        
        <p>Porta in aliquet adipiscing commodo et cursus felis aliquet. Risus nulla egestas ultricies tincidunt dolor tempor. Hendrerit mattis pharetra aliquet pellentesque. At arcu rhoncus blandit nunc et cursus in sed. Suspendisse etiam nullam vestibulum sed pulvinar aliquam blandit. Faucibus sit sollicitudin gravida elit.</p>
    `;
    
    detailPage.innerHTML = `
        <div class="article-detail-container">
            <div class="article-detail-header">
                <button class="back-button" onclick="closeArticleDetail()">
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
                    <h1 class="article-detail-title">${article.title}</h1>
                </div>
            </div>
            
            <div class="article-detail-content">
                ${sampleContent}
            </div>
        </div>
    `;
    
    detailPage.classList.add('active');
    document.body.style.overflow = '';
    detailPage.scrollTop = 0;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load articles data
    await loadArticlesData();
    
    // If on category page, load articles
    if (document.getElementById('articles-container')) {
        loadCategoryArticles();
    }
    
    // Load featured articles in mega menu
    loadMegaMenuFeatured();
});
