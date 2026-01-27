# 📝 İÇERİK EKLEME REHBERİ - Yveline Blog

## 🎯 İçerik Sistemi Nasıl Çalışır?

### Ana Sayfa Yapısı:
1. **Carousel (Öne Çıkanlar)** → `featured: true` olan içerikler
2. **Grid Kartlar (Son Eklenenler)** → Tarihe göre sıralı tüm içerikler

### Mega Menu Yapısı:
- **En Çok Okunanlar** → Tıklanma sayısına göre otomatik sıralı

---

## ✨ YENİ İÇERİK NASIL EKLENİR?

### Adım 1: articles-data.json Dosyasını Açın

Netlify'da yüklediğiniz dosyalar arasından `articles-data.json` dosyasını bulun.

### Adım 2: Yeni İçerik Ekleyin

JSON dosyasının `"articles"` dizisine yeni bir obje ekleyin:

```json
{
  "id": 11,
  "title": "İçerik Başlığınız",
  "category": "FITNESS",
  "mainCategory": "saglik-wellness",
  "excerpt": "Kısa açıklama (100-150 karakter)",
  "image": "https://images.unsplash.com/photo-XXXXX?w=500&h=500&fit=crop",
  "content": "İçerik metni buraya...",
  "featured": true,
  "tags": ["etiket1", "etiket2", "etiket3"],
  "date": "2026-01-28"
}
```

### Adım 3: Dosyayı Kaydedin ve Yükleyin

1. JSON dosyasını kaydedin
2. Netlify'a tekrar yükleyin (drag & drop)
3. Site otomatik güncellenir!

---

## 📋 ALAN AÇIKLAMALARI

### **id** (zorunlu)
- Benzersiz numara
- Her yeni içerik için bir sonraki numarayı kullanın
- Örnek: `11, 12, 13...`

### **title** (zorunlu)
- İçerik başlığı
- Maksimum 60 karakter önerilir
- Örnek: `"Evde Yoga Yaparken Dikkat Edilmesi Gerekenler"`

### **category** (zorunlu)
- Alt kategori - MUTLAKA BÜYÜK HARF
- Seçenekler:
  - **Sağlık + Wellness:** BESLENME, FITNESS, YOGA, MENTAL SAĞLIK
  - **Yaşam + Stil:** MODA, SEYAHAT, AKSESUAR, GÜZELLIK
  - **Ev + Eğlence:** DEKORASYON, EĞLENCE, TARİFLER, DIY

### **mainCategory** (zorunlu)
- Ana kategori slug (küçük harf, tire ile)
- Seçenekler:
  - `saglik-wellness`
  - `yasam-stil`
  - `ev-eglence`

### **excerpt** (zorunlu)
- Kısa özet/açıklama
- 100-150 karakter ideal
- Kart üzerinde görünür

### **image** (zorunlu)
- Görsel URL'i
- **Önerilen kaynak:** https://unsplash.com
- **Format:** `https://images.unsplash.com/photo-XXXXX?w=500&h=500&fit=crop`
- **Boyut:** 500x500px (kare)

### **content** (zorunlu)
- İçerik metni
- HTML kullanabilirsiniz: `<p>`, `<strong>`, `<em>`, vb.
- Şimdilik placeholder Lorem Ipsum kullanabilirsiniz

### **featured** (zorunlu)
- `true` → Carousel'de (Öne Çıkanlar) görünür
- `false` → Sadece grid kartlarda görünür
- **Öneri:** En fazla 5-6 içeriği featured yapın

### **tags** (zorunlu)
- Etiket dizisi
- 3-5 etiket ideal
- Örnek: `["yoga", "sağlık", "fitness"]`

### **date** (zorunlu)
- YYYY-MM-DD formatında tarih
- **Önemli:** Yeni içerikler için bugünün veya daha yakın bir tarih
- Örnek: `"2026-01-28"`
- Grid kartlar bu tarihe göre sıralanır (en yeni üstte)

---

## 🎨 GÖRSEL BULMA - UNSPLASH REHBERİ

### 1. Unsplash.com'a Gidin
https://unsplash.com

### 2. Arama Yapın
- İngilizce anahtar kelimeler kullanın
- Örnek: "yoga", "healthy food", "home decor"

### 3. Görseli Seçin
- Görsele tıklayın
- "Download" butonunun yanındaki URL'i kopyalayın
- Örnek: `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b`

### 4. URL'i Düzenleyin
Original URL'in sonuna ekleyin: `?w=500&h=500&fit=crop`
- Sonuç: `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop`

---

## 📝 ÖRNEK İÇERİK EKLEME

### Senaryo: Yeni bir yoga içeriği eklemek istiyorsunuz

```json
{
  "id": 11,
  "title": "Sabah Yoga Rutini ile Güne Enerjik Başlayın",
  "category": "YOGA",
  "mainCategory": "saglik-wellness",
  "excerpt": "Her sabah 15 dakika yoga yaparak enerjinizi artırın ve zihninizi dinlendirin.",
  "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
  "content": "Sabah yoga rutini hakkında detaylı bilgiler...",
  "featured": true,
  "tags": ["yoga", "sabah rutini", "enerji"],
  "date": "2026-01-28"
}
```

### Bu İçerik Nerede Görünecek:

1. ✅ **Ana Sayfa Carousel'de** (featured: true olduğu için)
2. ✅ **Ana Sayfa Grid Kartlarda** (en üstte, tarih en yeni)
3. ✅ **Kategori Sayfasında** (Sağlık + Wellness > Yoga)
4. ✅ **Mega Menu'de** (tıklanma aldıkça öne çıkacak)

---

## 🔄 İÇERİK GÜNCELLEME ADIMLAR I

### 1. Mevcut JSON'u Yedekleyin
- `articles-data.json` dosyasının bir kopyasını alın
- Bilgisayarınızda saklayın

### 2. JSON Dosyasını Düzenleyin
- Not Defteri, VS Code veya herhangi bir text editor kullanın
- Yeni içeriği `"articles"` dizisinin EN BAŞINA ekleyin

### 3. JSON Syntax'ını Kontrol Edin
- https://jsonlint.com adresine gidin
- JSON'unuzu yapıştırın
- "Validate JSON" butonuna tıklayın
- Hata varsa düzeltin

### 4. Netlify'a Yükleyin
- Netlify'da sitenize gidin
- "Deploys" sekmesine tıklayın
- Dosyaları sürükle-bırak alanına yeni `articles-data.json` dosyasını bırakın
- Site otomatik güncellenecek (30 saniye - 1 dakika)

---

## ⚠️ YAYGN HATALAR VE ÇÖZÜMLER

### Hata: "İçerikler Görünmüyor"
**Çözüm:**
- JSON syntax hatası olabilir → jsonlint.com'da kontrol edin
- Virgülleri kontrol edin (son eleman sonunda virgül olmamalı)
- Tırnak işaretlerini kontrol edin (çift tırnak kullanın: `"`)

### Hata: "Featured İçerikler Carousel'de Yok"
**Çözüm:**
- `"featured": true` olduğundan emin olun
- Boolean değer olmalı (tırnak yok): `true` veya `false`

### Hata: "Sıralama Yanlış"
**Çözüm:**
- `"date"` alanını kontrol edin
- Format: `"2026-01-28"` (tırnak içinde, YYYY-MM-DD)
- En yeni içerikler en üstte görünür

### Hata: "Kategori Sayfasında Görünmüyor"
**Çözüm:**
- `"category"` BÜYÜK HARF olmalı: `"YOGA"`
- `"mainCategory"` küçük harf + tire: `"saglik-wellness"`
- İzin verilen kategorilerden biri olmalı

---

## 🎯 İPUÇLARI

### Carousel (Öne Çıkanlar) İçin:
- ✅ En kaliteli görselleri kullanın
- ✅ Maksimum 5-6 içeriği featured yapın
- ✅ Çeşitli kategorilerden seçin
- ✅ Düzenli güncelleyin

### Grid Kartlar (Son Eklenenler) İçin:
- ✅ Yeni içeriklere güncel tarih verin
- ✅ Excerpt'i dikkatli yazın (ilk izlenim önemli)
- ✅ Görseller tutarlı ve kaliteli olmalı

### Mega Menu Optimizasyonu:
- ✅ İçerikler tıklandıkça otomatik öne çıkar
- ✅ Her kategoriden içerik ekleyin
- ✅ Başlıklar kısa ve çekici olsun

---

## 📊 İÇERİK PLANLAMASI ÖNERİSİ

### Haftalık Plan:
- **Pazartesi:** 1 featured + 2 normal içerik
- **Çarşamba:** 2 normal içerik
- **Cuma:** 1 featured + 1 normal içerik

### Kategori Dengesi:
- Her kategoriden eşit miktarda içerik hedefleyin
- Popüler kategorilere biraz daha fazla ağırlık verin

---

## 🚀 HIZLI BAŞLANGIÇ ŞABLONUtext editor kullanın
- Yeni içeriği `"articles"` dizisinin EN BAŞINA ekleyin

### 3. JSON Syntax'ını Kontrol Edin
- https://jsonlint.com adresine gidin
- JSON'unuzu yapıştırın
- "Validate JSON" butonuna tıklayın
- Hata varsa düzeltin

### 4. Netlify'a Yükleyin
- Netlify'da sitenize gidin
- "Deploys" sekmesine tıklayın
- Dosyaları sürükle-bırak alanına yeni `articles-data.json` dosyasını bırakın
- Site otomatik güncellenecek (30 saniye - 1 dakika)

---

## 🎓 YENİ İÇERİK EKLEMEK İÇİN ADIM ADIM

1. ✅ `articles-data.json` dosyasını açın
2. ✅ Aşağıdaki şablonu kopyalayın
3. ✅ Bilgileri doldurun (id, title, category, vs.)
4. ✅ Görseli Unsplash'tan bulun
5. ✅ JSON syntax kontrolü yapın (jsonlint.com)
6. ✅ Netlify'a yükleyin
7. ✅ Siteyi kontrol edin!

```json
{
  "id": SONRAKI_NUMARA,
  "title": "Başlığınız",
  "category": "KATEGORİ",
  "mainCategory": "ana-kategori",
  "excerpt": "Kısa açıklama...",
  "image": "https://images.unsplash.com/photo-XXXXX?w=500&h=500&fit=crop",
  "content": "İçerik metni...",
  "featured": true,
  "tags": ["etiket1", "etiket2"],
  "date": "2026-01-28"
}
```

---

**Sorularınız için:** Her zaman yardımcı olabilirim! 🎨
