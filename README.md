# Yveline Blog - Kategori Sistemi Rehberi

## 🎯 Özellikler

### ✅ Tamamlanan Özellikler:
1. **Dinamik Kategori Sayfaları** - Her kategori için otomatik sayfa oluşturma
2. **Okuma Sayısı Takibi** - LocalStorage ile en çok okunan içerikleri belirleme
3. **Mega Menu'de Dinamik İçerikler** - En çok okunan içeriklerin otomatik gösterimi
4. **Kategori Filtreleme** - Ana kategori ve alt kategorilere göre filtreleme
5. **Görsel Tutarlılık** - Tüm sayfalarda aynı tasarım dili
6. **İçerik Detay Sayfası** - Her içerik için tam sayfa görünümü
7. **Like ve Bookmark** - İçerikleri beğenme ve kaydetme

## 📁 Dosya Yapısı

```
yveline-site/
├── index.html              # Ana sayfa
├── category.html           # Kategori sayfası (template)
├── styles.css              # Tüm stiller
├── script.js               # Ana sayfa JavaScript
├── category-script.js      # Kategori sayfası JavaScript
├── articles-data.json      # İçerik veritabanı (ÖNEMLİ!)
├── yvelinelogo.svg         # Logo
└── arrow-right.svg         # Ok ikonu
```

## 🚀 Netlify'a Yükleme

1. Tüm dosyaları aynı klasöre çıkartın
2. Netlify'da "Sites" > "Add new site" > "Deploy manually"
3. Klasörü sürükleyip bırakın
4. Site yayınlandığında tüm özellikler çalışacak!

## ✏️ Yeni İçerik Ekleme

### 1. articles-data.json Dosyasını Düzenleyin

```json
{
  "id": 11,  // Benzersiz ID (son ID'den bir fazla)
  "title": "Başlık",
  "category": "FITNESS",  // Alt kategori (BÜYÜK HARF)
  "mainCategory": "saglik-wellness",  // Ana kategori slug
  "excerpt": "Kısa açıklama...",
  "image": "https://images.unsplash.com/...",  // Görsel URL
  "content": "İçerik metni...",
  "featured": false,  // true yaparsanız öne çıkar
  "tags": ["etiket1", "etiket2"]
}
```

### 2. Kategori ve Alt Kategoriler

**Ana Kategoriler:**
- `saglik-wellness` → "SAĞLIK + WELLNESS"
- `yasam-stil` → "YAŞAM + STİL"
- `ev-eglence` → "EV + EĞLENCE"

**Alt Kategoriler (category field):**
- BESLENME, FITNESS, YOGA, MENTAL SAĞLIK
- MODA, SEYAHAT, AKSESUAR, GÜZELLIK
- DEKORASYON, EĞLENCE, TARİFLER, DIY

### 3. Görsel Önerileri

- **Boyut:** 500x500px (kare format)
- **Kaynak:** Unsplash.com (ücretsiz, yüksek kalite)
- **Format:** `https://images.unsplash.com/photo-XXXXXX?w=500&h=500&fit=crop`

## 🎨 Özelleştirme

### Yeni Ana Kategori Eklemek:

1. **articles-data.json** içinde:
```json
"categories": {
  "yeni-kategori": {
    "name": "YENİ KATEGORİ",
    "slug": "yeni-kategori",
    "subcategories": ["ALT1", "ALT2", "ALT3"]
  }
}
```

2. **index.html** ve **category.html** içinde yeni mega menu ekleyin:
```html
<div class="nav-item mega-menu-wrapper mega-menu-wrapper-4" data-menu="4">
    <span>YENİ KATEGORİ</span>
    <i class="fas fa-chevron-down"></i>
</div>
```

3. Mega menu içeriği:
```html
<div class="mega-menu mega-menu-4" id="mega-menu-4" style="display: none;">
    <div class="mega-menu-content">
        <div class="mega-menu-categories">
            <a href="category.html?cat=yeni-kategori&sub=ALT1" class="mega-category">ALT1</a>
        </div>
        <div class="mega-menu-items" id="featured-yeni-kategori">
            <!-- Otomatik yüklenecek -->
        </div>
    </div>
</div>
```

## 📊 Okuma Sayısı Sistemi

Sistem otomatik olarak:
1. Her içerik tıklamasını kaydeder (localStorage)
2. En çok tıklanan içerikleri mega menu'de gösterir
3. Kategori bazlı sıralama yapar

**Not:** LocalStorage temizlenirse sayaçlar sıfırlanır.

## 🔗 URL Yapısı

- Ana sayfa: `index.html`
- Kategori (tüm): `category.html?cat=saglik-wellness`
- Alt kategori: `category.html?cat=saglik-wellness&sub=FITNESS`

## 💡 İpuçları

1. **Görsel Kalitesi:** Unsplash'tan yüksek kaliteli görseller kullanın
2. **Excerpt Uzunluğu:** 100-150 karakter arası ideal
3. **Başlık Uzunluğu:** Maksimum 60 karakter (2 satır)
4. **İçerik Güncelleme:** JSON'u güncelleyip Netlify'a tekrar yükleyin
5. **Test:** Yerel olarak test etmek için bir HTTP server kullanın:
   ```bash
   python -m http.server 8000
   # veya
   npx serve
   ```

## 🐛 Sorun Giderme

### İçerikler Görünmüyor
- `articles-data.json` dosyasının doğru yerde olduğundan emin olun
- Browser console'da hata var mı kontrol edin (F12)
- JSON syntax hatası olabilir (jsonlint.com'da kontrol edin)

### Mega Menu Açılmıyor
- JavaScript dosyalarının yüklendiğinden emin olun
- Browser cache'i temizleyin (Ctrl+F5)

### Kategoriler Çalışmıyor
- URL parametrelerini kontrol edin
- `mainCategory` ve `category` fieldlarının doğru olduğundan emin olun

## 📝 Notlar

- **Backup:** JSON dosyasını düzenlemeden önce yedek alın
- **Test:** Büyük değişiklikleri önce yerel olarak test edin
- **Performans:** 50+ içerikten sonra sayfalama eklemek gerekebilir

---

**Sorularınız için:** İhtiyacınız olursa her zaman yardımcı olabilirim! 🚀
