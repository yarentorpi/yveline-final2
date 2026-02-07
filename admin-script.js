// Admin Panel Script

// Initialize Quill Rich Text Editor
let quill;
function initQuillEditor() {
    quill = new Quill('#content-editor', {
        theme: 'snow',
        placeholder: 'İçeriğinizi buraya yazın...',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link'],
                ['clean']
            ]
        }
    });
    
    // Sync Quill content to hidden textarea
    quill.on('text-change', function() {
        document.getElementById('content').value = quill.root.innerHTML;
    });
}

let articlesData = {
    articles: [],
    categories: {
        "saglik-wellness": {
            "name": "SAĞLIK + WELLNESS",
            "slug": "saglik-wellness",
            "subcategories": ["BESLENME", "FITNESS", "YOGA", "MENTAL SAĞLIK"]
        },
        "yasam-stil": {
            "name": "YAŞAM + STİL",
            "slug": "yasam-stil",
            "subcategories": ["MODA", "SEYAHAT", "AKSESUAR", "GÜZELLIK"]
        },
        "ev-eglence": {
            "name": "EV + EĞLENCE",
            "slug": "ev-eglence",
            "subcategories": ["DEKORASYON", "EĞLENCE", "TARİFLER", "DIY"]
        }
    }
};

// Load existing data
async function loadData() {
    try {
        const response = await fetch('articles-data.json');
        const data = await response.json();
        articlesData = data;
        renderContentList();
        showAlert('success', 'Mevcut içerikler yüklendi!');
    } catch (error) {
        console.log('İlk kullanım - yeni veri oluşturulacak');
    }
}

// Character counters and SEO score
function setupCharCounters() {
    const fields = [
        { id: 'title', countId: 'titleCount', counterId: 'titleCounter', min: 40, max: 60 },
        { id: 'excerpt', countId: 'excerptCount', counterId: 'excerptCounter', min: 100, max: 155 },
        { id: 'seoTitle', countId: 'seoTitleCount', counterId: 'seoTitleCounter', min: 50, max: 60 },
        { id: 'metaDescription', countId: 'metaDescCount', counterId: 'metaDescCounter', min: 150, max: 160 }
    ];

    fields.forEach(field => {
        const element = document.getElementById(field.id);
        element.addEventListener('input', function() {
            const length = this.value.length;
            const countSpan = document.getElementById(field.countId);
            const counterDiv = document.getElementById(field.counterId);
            
            countSpan.textContent = `${length}/${field.max}`;
            
            if (counterDiv) {
                counterDiv.textContent = `${length} karakter`;
                counterDiv.classList.remove('warning', 'danger');
                
                if (length < field.min) {
                    counterDiv.classList.add('danger');
                    counterDiv.textContent += ` (En az ${field.min} önerilir)`;
                } else if (length > field.max - 10) {
                    counterDiv.classList.add('warning');
                }
            }
            
            updateSERPPreview();
            calculateSEOScore();
        });
    });
    
    // Content word counter
    const contentField = document.getElementById('content');
    const contentInfo = document.createElement('div');
    contentInfo.className = 'char-counter';
    contentInfo.id = 'contentWordCount';
    contentField.parentNode.insertBefore(contentInfo, contentField.nextSibling);
    
    contentField.addEventListener('input', function() {
        const text = this.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;
        
        contentInfo.textContent = `${words} kelime • ${chars} karakter`;
        contentInfo.classList.remove('warning', 'danger');
        
        if (words < 300) {
            contentInfo.classList.add('danger');
            contentInfo.textContent += ' (SEO için en az 300 kelime önerilir)';
        } else if (words >= 300 && words < 500) {
            contentInfo.classList.add('warning');
            contentInfo.textContent += ' (İyi, 500+ kelime daha iyi olur)';
        }
    });
}

// Update SERP Preview
function updateSERPPreview() {
    const title = document.getElementById('seoTitle').value || document.getElementById('title').value || 'Başlık buraya gelecek...';
    const description = document.getElementById('metaDescription').value || document.getElementById('excerpt').value || 'Meta description buraya gelecek...';
    const slug = document.getElementById('slug').value || 'ornek-icerik';
    
    document.getElementById('serpTitle').textContent = title;
    document.getElementById('serpDescription').textContent = description;
    document.getElementById('serpSlug').textContent = slug;
    document.getElementById('slugPreview').textContent = slug;
}

// Auto-generate slug from title
document.getElementById('title').addEventListener('input', function() {
    const slugField = document.getElementById('slug');
    if (!slugField.value) {
        const slug = generateSlug(this.value);
        slugField.value = slug;
        updateSERPPreview();
    }
    
    // Auto-fill SEO title if empty
    const seoTitleField = document.getElementById('seoTitle');
    if (!seoTitleField.value) {
        seoTitleField.value = this.value;
        document.getElementById('seoTitleCount').textContent = `${this.value.length}/60`;
        updateSERPPreview();
    }
});

// Auto-fill meta description from excerpt
document.getElementById('excerpt').addEventListener('input', function() {
    const metaDescField = document.getElementById('metaDescription');
    if (!metaDescField.value) {
        metaDescField.value = this.value;
        document.getElementById('metaDescCount').textContent = `${this.value.length}/160`;
        updateSERPPreview();
    }
});

// Generate slug
function generateSlug(text) {
    const turkishMap = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'İ': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'c', 'Ğ': 'g', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
    };
    
    return text
        .toLowerCase()
        .split('')
        .map(char => turkishMap[char] || char)
        .join('')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 50);
}

// Calculate SEO Score
function calculateSEOScore() {
    let score = 0;
    const scoreElement = document.getElementById('seoScore');
    
    // Title length (50-60 ideal)
    const titleLength = document.getElementById('seoTitle').value.length;
    if (titleLength >= 50 && titleLength <= 60) score += 25;
    else if (titleLength >= 40 && titleLength <= 70) score += 15;
    
    // Meta description length (150-160 ideal)
    const descLength = document.getElementById('metaDescription').value.length;
    if (descLength >= 150 && descLength <= 160) score += 25;
    else if (descLength >= 120 && descLength <= 170) score += 15;
    
    // Slug quality
    const slug = document.getElementById('slug').value;
    if (slug.length > 0 && slug.length <= 50 && slug.includes('-')) score += 20;
    
    // Focus keyword presence
    const keyword = document.getElementById('focusKeyword').value.toLowerCase();
    const title = document.getElementById('seoTitle').value.toLowerCase();
    const desc = document.getElementById('metaDescription').value.toLowerCase();
    
    if (keyword && title.includes(keyword)) score += 15;
    if (keyword && desc.includes(keyword)) score += 15;
    
    // Update score display
    if (score >= 75) {
        scoreElement.textContent = 'Mükemmel';
        scoreElement.className = 'seo-score good';
    } else if (score >= 50) {
        scoreElement.textContent = 'İyi';
        scoreElement.className = 'seo-score medium';
    } else {
        scoreElement.textContent = 'Geliştirilmeli';
        scoreElement.className = 'seo-score poor';
    }
}

// Category dropdown management
document.getElementById('mainCategory').addEventListener('change', function() {
    const categorySelect = document.getElementById('category');
    const mainCat = this.value;
    
    categorySelect.disabled = false;
    categorySelect.innerHTML = '<option value="">Alt kategori seçin...</option>';
    
    if (mainCat && articlesData.categories[mainCat]) {
        articlesData.categories[mainCat].subcategories.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub;
            categorySelect.appendChild(option);
        });
    }
});

// Save content
function saveContent() {
    // Validate form
    const form = document.getElementById('contentForm');
    if (!form.checkValidity()) {
        showAlert('error', 'Lütfen tüm zorunlu alanları doldurun!');
        form.reportValidity();
        return;
    }
    
    // Get content and convert to HTML paragraphs
    const contentText = document.getElementById('content').value;
    const contentHTML = formatContent(contentText);
    
    // Get form data
    const newArticle = {
        id: articlesData.articles.length + 1,
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        mainCategory: document.getElementById('mainCategory').value,
        excerpt: document.getElementById('excerpt').value,
        image: document.getElementById('image').value,
        content: contentHTML,
        featured: document.getElementById('featured').checked,
        tags: document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t),
        date: new Date().toISOString().split('T')[0],
        seo: {
            title: document.getElementById('seoTitle').value || document.getElementById('title').value,
            description: document.getElementById('metaDescription').value || document.getElementById('excerpt').value,
            slug: document.getElementById('slug').value,
            focusKeyword: document.getElementById('focusKeyword').value
        }
    };
    
    // Add to articles
    articlesData.articles.unshift(newArticle); // Add to beginning (newest first)
    
    // Save to localStorage for homepage
    localStorage.setItem('yveline-articles', JSON.stringify(articlesData));
    
    // Update UI
    renderContentList();
    showAlert('success', `✅ İçerik başarıyla eklendi ve ana sayfaya aktarıldı! (ID: ${newArticle.id})`);
    
    // Clear form
    document.getElementById('contentForm').reset();
    quill.setContents([]); // Clear Quill editor
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Format content text to HTML
function formatContent(text) {
    // Split by double line breaks (paragraphs)
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
    
    return paragraphs.map(para => {
        para = para.trim();
        
        // Check if it's a list item
        if (para.match(/^[-•]\s/)) {
            // Convert to list items
            const items = para.split('\n').filter(i => i.trim());
            const listItems = items.map(item => {
                return `<li>${item.replace(/^[-•]\s/, '').trim()}</li>`;
            }).join('\n                ');
            return `<ul>\n                ${listItems}\n            </ul>`;
        }
        
        // Check if it's a numbered list
        if (para.match(/^\d+\.\s/)) {
            const items = para.split('\n').filter(i => i.trim());
            const listItems = items.map(item => {
                return `<li>${item.replace(/^\d+\.\s/, '').trim()}</li>`;
            }).join('\n                ');
            return `<ol>\n                ${listItems}\n            </ol>`;
        }
        
        // Check if it's a heading (starts with ##)
        if (para.startsWith('## ')) {
            return `<h2>${para.substring(3)}</h2>`;
        }
        
        if (para.startsWith('### ')) {
            return `<h3>${para.substring(4)}</h3>`;
        }
        
        // Regular paragraph
        return `<p>${para}</p>`;
    }).join('\n            ');
}

// Download JSON
function downloadJSON() {
    if (articlesData.articles.length === 0) {
        showAlert('error', 'Henüz içerik eklenmedi!');
        return;
    }
    
    const dataStr = JSON.stringify(articlesData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'articles-data.json';
    link.click();
    
    showAlert('success', 'JSON dosyası indirildi! Şimdi Netlify\'a yükleyebilirsiniz.');
}

// Reset form
function resetForm() {
    document.getElementById('contentForm').reset();
    document.getElementById('seoTitle').value = '';
    document.getElementById('metaDescription').value = '';
    document.getElementById('slug').value = '';
    document.getElementById('focusKeyword').value = '';
    document.getElementById('content').value = '';
    document.getElementById('category').disabled = true;
    
    // Reset counters
    document.querySelectorAll('.char-count').forEach(el => {
        el.textContent = '0/' + el.textContent.split('/')[1];
    });
    document.querySelectorAll('.char-counter').forEach(el => {
        el.textContent = '';
    });
    
    const wordCount = document.getElementById('contentWordCount');
    if (wordCount) wordCount.textContent = '';
    
    updateSERPPreview();
    calculateSEOScore();
    
    showAlert('success', 'Form sıfırlandı!');
}

// Render content list
function renderContentList() {
    const container = document.getElementById('contentList');
    
    if (articlesData.articles.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 40px;">Henüz içerik eklenmedi. Yukarıdaki formu kullanarak yeni içerik ekleyebilirsiniz.</p>';
        return;
    }
    
    container.innerHTML = articlesData.articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(article => `
            <div class="content-item">
                <div class="content-info">
                    <h4>
                        ${article.title}
                        ${article.featured ? '<i class="fas fa-star" style="color: #ffc107;"></i>' : ''}
                    </h4>
                    <p>
                        <strong>${article.category}</strong> • 
                        ${article.date} • 
                        ID: ${article.id}
                        ${article.seo ? ' • <i class="fas fa-check" style="color: #28a745;"></i> SEO' : ''}
                    </p>
                </div>
                <div class="content-actions">
                    <button class="btn btn-small btn-secondary" onclick="editContent(${article.id})">
                        <i class="fas fa-edit"></i> Düzenle
                    </button>
                    <button class="btn btn-small btn-danger" onclick="deleteContent(${article.id})">
                        <i class="fas fa-trash"></i> Sil
                    </button>
                </div>
            </div>
        `).join('');
}

// Edit content
function editContent(id) {
    const article = articlesData.articles.find(a => a.id === id);
    if (!article) return;
    
    // Fill form
    document.getElementById('title').value = article.title;
    document.getElementById('mainCategory').value = article.mainCategory;
    document.getElementById('mainCategory').dispatchEvent(new Event('change'));
    setTimeout(() => {
        document.getElementById('category').value = article.category;
    }, 100);
    document.getElementById('excerpt').value = article.excerpt;
    document.getElementById('image').value = article.image;
    document.getElementById('featured').checked = article.featured;
    document.getElementById('tags').value = article.tags.join(', ');
    
    // Fill content (convert HTML back to plain text)
    const plainContent = htmlToPlainText(article.content);
    document.getElementById('content').value = plainContent;
    
    if (article.seo) {
        document.getElementById('seoTitle').value = article.seo.title || '';
        document.getElementById('metaDescription').value = article.seo.description || '';
        document.getElementById('slug').value = article.seo.slug || '';
        document.getElementById('focusKeyword').value = article.seo.focusKeyword || '';
    }
    
    // Remove old article for update
    articlesData.articles = articlesData.articles.filter(a => a.id !== id);
    
    // Update counters
    ['title', 'excerpt', 'seoTitle', 'metaDescription', 'content'].forEach(id => {
        document.getElementById(id).dispatchEvent(new Event('input'));
    });
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showAlert('success', `İçerik düzenleme moduna alındı. Değişiklikleri yapıp "Kaydet" butonuna tıklayın.`);
}

// Convert HTML to plain text for editing
function htmlToPlainText(html) {
    return html
        .replace(/<h2>/g, '## ')
        .replace(/<\/h2>/g, '\n\n')
        .replace(/<h3>/g, '### ')
        .replace(/<\/h3>/g, '\n\n')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '\n\n')
        .replace(/<ul>\s*/g, '')
        .replace(/<\/ul>/g, '\n\n')
        .replace(/<ol>\s*/g, '')
        .replace(/<\/ol>/g, '\n\n')
        .replace(/<li>/g, '- ')
        .replace(/<\/li>/g, '\n')
        .replace(/\s+\n/g, '\n')
        .replace(/\n\n\n+/g, '\n\n')
        .trim();
}

// Delete content
function deleteContent(id) {
    if (!confirm('Bu içeriği silmek istediğinizden emin misiniz?')) return;
    
    articlesData.articles = articlesData.articles.filter(a => a.id !== id);
    renderContentList();
    showAlert('success', 'İçerik silindi!');
}

// Show alert
function showAlert(type, message) {
    const alertId = type === 'success' ? 'alertSuccess' : 'alertError';
    const messageId = type === 'success' ? 'successMessage' : 'errorMessage';
    
    document.getElementById(messageId).textContent = message;
    document.getElementById(alertId).classList.add('show');
    
    setTimeout(() => {
        document.getElementById(alertId).classList.remove('show');
    }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initQuillEditor(); // Initialize rich text editor
    loadData();
    setupCharCounters();
    updateSERPPreview();
    calculateSEOScore();
    loadUsers(); // Load registered users
});

// ==================== USER MANAGEMENT ====================

// Load and display registered users
function loadUsers() {
    const usersListElement = document.getElementById('users-list');
    if (!usersListElement) return;
    
    // Get all registered users from localStorage
    const users = getAllUsers();
    
    if (users.length === 0) {
        usersListElement.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">Henüz kayıtlı kullanıcı yok.</p>';
        return;
    }
    
    usersListElement.innerHTML = users.map((user, index) => `
        <div class="user-item" style="padding: 15px; background: #f9f9f9; border-radius: 8px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong style="font-size: 16px; color: #333;">${user.username}</strong>
                ${user.email ? `<br><span style="font-size: 14px; color: #666;">${user.email}</span>` : ''}
                <br><span style="font-size: 12px; color: #999;">Kayıt: ${formatDate(user.registrationDate || user.loginDate)}</span>
            </div>
            <button class="btn btn-small btn-danger" onclick="deleteUser('${user.username}')" style="padding: 6px 12px; font-size: 12px;">
                <i class="fas fa-trash"></i> Sil
            </button>
        </div>
    `).join('');
    
    // Update user count
    const userCountElement = document.getElementById('user-count');
    if (userCountElement) {
        userCountElement.textContent = users.length;
    }
}

// Get all users from localStorage
function getAllUsers() {
    const users = [];
    
    // Check for single user (old format)
    const currentUser = localStorage.getItem('yveline-user');
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            users.push(user);
        } catch(e) {
            console.error('Error parsing user:', e);
        }
    }
    
    // Check for multiple users list
    const usersList = localStorage.getItem('yveline-users-list');
    if (usersList) {
        try {
            const allUsers = JSON.parse(usersList);
            return allUsers;
        } catch(e) {
            console.error('Error parsing users list:', e);
        }
    }
    
    return users;
}

// Delete user
function deleteUser(username) {
    if (!confirm(`${username} kullanıcısını silmek istediğinizden emin misiniz?`)) return;
    
    let usersList = getAllUsers();
    usersList = usersList.filter(u => u.username !== username);
    
    localStorage.setItem('yveline-users-list', JSON.stringify(usersList));
    
    // If deleted user is the current user, log them out
    const currentUser = localStorage.getItem('yveline-user');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.username === username) {
            localStorage.removeItem('yveline-user');
        }
    }
    
    loadUsers();
    showAlert('success', 'Kullanıcı silindi!');
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'Bilinmiyor';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
