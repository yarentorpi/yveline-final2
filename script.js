// Load articles from localStorage (admin panel) or fallback to JSON
async function loadArticles() {
    try {
        // First try localStorage (if admin added content)
        const localData = localStorage.getItem('yveline-articles');
        if (localData) {
            const data = JSON.parse(localData);
            renderHomepageArticles(data.articles);
            console.log('✅ İçerikler admin panelinden yüklendi!');
            return;
        }
        
        // Fallback to JSON file
        const response = await fetch('articles-data.json');
        const data = await response.json();
        renderHomepageArticles(data.articles);
        console.log('📄 İçerikler JSON dosyasından yüklendi');
    } catch (error) {
        console.error('İçerik yükleme hatası:', error);
    }
}

// Render articles on homepage
function renderHomepageArticles(articles) {
    // Get featured articles (for hero carousel if needed)
    const featured = articles.filter(a => a.featured).slice(0, 3);
    
    // Get articles by category
    const saglikArticles = articles.filter(a => a.mainCategory === 'saglik-wellness').slice(0, 3);
    const fitnessArticles = articles.filter(a => a.mainCategory === 'saglik-wellness' && a.category === 'FITNESS').slice(0, 3);
    
    // Render SAĞLIK section
    const saglikContainer = document.querySelector('.section-content[data-section="saglik"]');
    if (saglikContainer && saglikArticles.length > 0) {
        saglikContainer.innerHTML = saglikArticles.map(article => createArticleCard(article)).join('');
    }
    
    // Render FITNESS section
    const fitnessContainer = document.querySelector('.section-content[data-section="fitness"]');
    if (fitnessContainer && fitnessArticles.length > 0) {
        fitnessContainer.innerHTML = fitnessArticles.map(article => createArticleCard(article)).join('');
    }
}

// Create article card HTML
function createArticleCard(article) {
    return `
        <div class="article-card" data-article-id="${article.id}">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <div class="article-icons">
                    <button class="icon-btn heart-btn" onclick="toggleLike(this); event.stopPropagation();">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="icon-btn bookmark-btn" onclick="toggleBookmark(this); event.stopPropagation();">
                        <i class="far fa-bookmark"></i>
                    </button>
                </div>
                <div class="article-text">
                    <span class="category-badge">${article.category}</span>
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <button class="read-more-btn" onclick="window.location.href='article.html?id=${article.id}'">
                        <span>Devamını Gör</span>
                        <span class="arrow-icon"></span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Toggle Like functionality
function toggleLike(button) {
    button.classList.toggle('active');
    const icon = button.querySelector('i');
    const article = button.closest('.article-card');
    const articleId = parseInt(article.dataset.articleId);
    
    if (button.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        if (typeof saveLikedArticle === 'function') {
            saveLikedArticle(articleId);
        }
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        if (typeof removeLikedArticle === 'function') {
            removeLikedArticle(articleId);
        }
    }
}

// Toggle Bookmark functionality
function toggleBookmark(button) {
    button.classList.toggle('active');
    const icon = button.querySelector('i');
    const article = button.closest('.article-card');
    const articleId = parseInt(article.dataset.articleId);
    
    if (button.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        if (typeof saveBookmarkedArticle === 'function') {
            saveBookmarkedArticle(articleId);
        }
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        if (typeof removeBookmarkedArticle === 'function') {
            removeBookmarkedArticle(articleId);
        }
    }
}

// Save like state to localStorage
function saveLikeState(button, state) {
    const article = button.closest('.article-card');
    const articleTitle = article.querySelector('h3').textContent;
    const likes = JSON.parse(localStorage.getItem('likes') || '{}');
    likes[articleTitle] = state;
    localStorage.setItem('likes', JSON.stringify(likes));
}

// Save bookmark state to localStorage
function saveBookmarkState(button, state) {
    const article = button.closest('.article-card');
    const articleTitle = article.querySelector('h3').textContent;
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    bookmarks[articleTitle] = state;
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Load saved states on page load
function loadSavedStates() {
    const likes = JSON.parse(localStorage.getItem('likes') || '{}');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    
    document.querySelectorAll('.article-card').forEach(article => {
        const articleTitle = article.querySelector('h3').textContent;
        
        // Restore like state
        const likeButton = article.querySelector('.heart-btn');
        const likeIcon = likeButton.querySelector('i');
        
        // Always start with far (outline) by default
        likeIcon.classList.remove('fas');
        likeIcon.classList.add('far');
        likeButton.classList.remove('active');
        
        if (likes[articleTitle]) {
            likeButton.classList.add('active');
            likeIcon.classList.remove('far');
            likeIcon.classList.add('fas');
        }
        
        // Restore bookmark state
        const bookmarkButton = article.querySelector('.bookmark-btn');
        const bookmarkIcon = bookmarkButton.querySelector('i');
        
        // Always start with far (outline) by default
        bookmarkIcon.classList.remove('fas');
        bookmarkIcon.classList.add('far');
        bookmarkButton.classList.remove('active');
        
        if (bookmarks[articleTitle]) {
            bookmarkButton.classList.add('active');
            bookmarkIcon.classList.remove('far');
            bookmarkIcon.classList.add('fas');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load articles from admin or JSON
    loadArticles();
    
    // Load saved states
    loadSavedStates();
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopBtn);
    
    // ===== HEADER HIDE ON SCROLL =====
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide header based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        // Show/hide scroll to top button
        if (scrollTop > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // MEGA MENU HANDLING - COMPLETE REWRITE
    const megaMenus = {
        '1': document.getElementById('mega-menu-1'),
        '2': document.getElementById('mega-menu-2'),
        '3': document.getElementById('mega-menu-3')
    };
    
    let currentOpenMenu = null;
    let menuTimeout = null;
    
    // Function to close all menus
    function closeAllMenus() {
        Object.values(megaMenus).forEach(menu => {
            if (menu) menu.style.display = 'none';
        });
        currentOpenMenu = null;
    }
    
    // Function to open a specific menu
    function openMenu(menuId) {
        closeAllMenus();
        if (megaMenus[menuId]) {
            megaMenus[menuId].style.display = 'block';
            currentOpenMenu = menuId;
            console.log('Opening menu:', menuId);
        }
    }
    
    // Add event listeners to wrappers
    document.querySelectorAll('.mega-menu-wrapper').forEach(wrapper => {
        const menuId = wrapper.getAttribute('data-menu');
        
        wrapper.addEventListener('mouseenter', function() {
            clearTimeout(menuTimeout);
            openMenu(menuId);
        });
        
        wrapper.addEventListener('mouseleave', function() {
            menuTimeout = setTimeout(() => {
                if (megaMenus[menuId] && !megaMenus[menuId].matches(':hover')) {
                    closeAllMenus();
                }
            }, 100);
        });
    });
    
    // Keep menu open when hovering over it
    Object.entries(megaMenus).forEach(([id, menu]) => {
        if (menu) {
            menu.addEventListener('mouseenter', function() {
                clearTimeout(menuTimeout);
            });
            
            menu.addEventListener('mouseleave', function() {
                menuTimeout = setTimeout(() => {
                    closeAllMenus();
                }, 100);
            });
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mesajınız başarıyla gönderildi! Teşekkür ederiz.');
            contactForm.reset();
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    alert(`Arama: "${searchTerm}"`);
                }
            }
        });
    }
    
    // Read more button handlers - Navigate to detail page
    document.querySelectorAll('.read-more-btn').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const articleCard = btn.closest('.article-card');
            openArticleDetail(articleCard, index);
        });
    });
    
    // Article card click handler
    document.querySelectorAll('.article-card').forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Don't open if clicking on icons
            if (e.target.closest('.article-icons') || e.target.closest('.read-more-btn')) {
                return;
            }
            openArticleDetail(card, index);
        });
    });
    
    // Load articles data for content
    let articlesData = null;
    async function loadArticlesData() {
        try {
            // First try localStorage (if admin added content)
            const localData = localStorage.getItem('yveline-articles');
            if (localData) {
                articlesData = JSON.parse(localData);
                console.log('✅ İçerikler admin panelinden yüklendi!');
                return;
            }
            
            // Fallback to JSON file
            const response = await fetch('articles-data.json');
            articlesData = await response.json();
            console.log('📄 İçerikler JSON dosyasından yüklendi');
        } catch (error) {
            console.log('Articles data not found, using placeholder content');
        }
    }
    loadArticlesData();
    
    // Function to open article detail page
    function openArticleDetail(articleCard, index) {
        // Close all mega menus first
        document.querySelectorAll('.mega-menu').forEach(menu => {
            menu.style.display = 'none';
        });
        
        const title = articleCard.querySelector('h3').textContent;
        const category = articleCard.querySelector('.article-tag') ? 
                        articleCard.querySelector('.article-tag').textContent : 
                        articleCard.querySelector('.category') ? 
                        articleCard.querySelector('.category').textContent : 'WELLNESS';
        const excerpt = articleCard.querySelector('.article-description') ? 
                       articleCard.querySelector('.article-description').textContent : 
                       'Wellness ve sağlıklı yaşam hakkında detaylı bilgiler içeren bu makaleyi keşfedin.';
        const image = articleCard.querySelector('img').src;
        
        // Try to find matching article in data
        let articleContent = null;
        if (articlesData && articlesData.articles) {
            const matchedArticle = articlesData.articles.find(article => 
                article.title === title || article.image === image
            );
            if (matchedArticle && matchedArticle.content) {
                articleContent = matchedArticle.content;
            }
        }
        
        // Create detail page if it doesn't exist
        let detailPage = document.querySelector('.article-detail-page');
        if (!detailPage) {
            detailPage = document.createElement('div');
            detailPage.className = 'article-detail-page';
            document.body.appendChild(detailPage);
        }
        
        // Check if we have real content, otherwise show a message
        let contentToShow = '';
        if (articleContent && articleContent.trim() !== '') {
            contentToShow = articleContent;
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
        
        const contentToShowFinal = contentToShow;
        
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
                    <img src="${image}" alt="${title}">
                    <div class="article-detail-title-box">
                        <h1 class="article-detail-title">${title}</h1>
                    </div>
                </div>
                
                <div class="article-detail-content">
                    ${contentToShowFinal}
                </div>
            </div>
        `;
        
        detailPage.classList.add('active');
        document.body.style.overflow = '';
        detailPage.scrollTop = 0;
    }
    
    // Function to close article detail page
    window.closeArticleDetail = function() {
        const detailPage = document.querySelector('.article-detail-page');
        if (detailPage) {
            detailPage.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Carousel scroll buttons (optional enhancement)
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        // Enable horizontal scroll with mouse wheel
        carousel.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                carousel.scrollLeft += e.deltaY;
            }
        });
    }
    
    // Add fade-in animation for articles on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all article cards
    document.querySelectorAll('.article-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe carousel items
    document.querySelectorAll('.carousel-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
        
        // Add click handler to carousel items
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const title = item.querySelector('h3').textContent;
            const category = item.querySelector('.category').textContent;
            const image = item.querySelector('img').src;
            
            // Create a temporary article card object for consistency
            const tempCard = {
                querySelector: function(selector) {
                    if (selector === 'h3') return { textContent: title };
                    if (selector === '.article-tag') return { textContent: category };
                    if (selector === '.article-description') return { textContent: 'Wellness ve sağlıklı yaşam hakkında detaylı bilgiler içeren bu makaleyi keşfedin.' };
                    if (selector === 'img') return { src: image };
                }
            };
            
            openArticleDetail(tempCard, 100 + index);
        });
    });
    
    // Add click handlers for mega menu cards
    document.querySelectorAll('.mega-menu-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close all mega menus
            document.querySelectorAll('.mega-menu').forEach(menu => {
                menu.style.display = 'none';
            });
            
            const title = this.querySelector('p').textContent;
            const image = this.querySelector('img').src;
            
            console.log('Mega menu card clicked:', title);
            
            // Create a temporary article card object
            const tempCard = {
                querySelector: function(selector) {
                    if (selector === 'h3') return { textContent: title };
                    if (selector === '.article-tag') return { textContent: 'WELLNESS' };
                    if (selector === '.article-description') return { textContent: 'İlgili içeriği keşfedin.' };
                    if (selector === 'img') return { src: image };
                }
            };
            
            openArticleDetail(tempCard, 200);
        });
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Refresh any layout-dependent calculations
        console.log('Window resized');
    }, 250);
});
