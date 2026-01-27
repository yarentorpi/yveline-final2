# 🎛️ ADMIN PANEL KULLANIM REHBERİ

## 🚀 Admin Panele Nasıl Erişilir?

1. Netlify'a tüm dosyaları yükleyin
2. Tarayıcıda şu adresi açın: `https://siteniz.netlify.app/admin.html`
3. Paneli kullanmaya başlayın!

**Not:** Admin panel şu an şifre korumasız. İsterseniz Netlify Identity ile şifre ekleyebiliriz.

---

## 📝 YENİ İÇERİK EKLEME

### Adım 1: Temel Bilgiler

#### **İçerik Başlığı** (Zorunlu)
- **Ne:** Kart ve detay sayfasında görünecek başlık
- **Önerilen:** 40-60 karakter
- **Örnek:** "Sabah Yoga Rutini ile Güne Enerjik Başlayın"

#### **Ana Kategori** (Zorunlu)
- Sağlık + Wellness
- Yaşam + Stil
- Ev + Eğlence

#### **Alt Kategori** (Zorunlu)
- Ana kategori seçtikten sonra otomatik yüklenir
- Örnek: FITNESS, YOGA, MODA, DEKORASYON

#### **Kısa Açıklama / Excerpt** (Zorunlu)
- **Ne:** Kart üzerinde görünecek özet
- **Önerilen:** 100-155 karakter
- **Örnek:** "Her sabah 15 dakika yoga yaparak enerjinizi artırın ve zihninizi dinlendirin."

#### **Görsel URL** (Zorunlu)
- **Kaynak:** Unsplash.com önerilir
- **Format:** `https://images.unsplash.com/photo-xxxxx?w=500&h=500&fit=crop`
- **Boyut:** 500x500px (kare)

#### **Öne Çıkan İçerik**
- ☑️ İşaretlenirse carousel'de (ana sayfa üst kısım) görünür
- ☐ İşaretlenmezse sadece grid kartlarda görünür

#### **Etiketler**
- Virgülle ayırarak girin
- **Örnek:** `yoga, sağlık, wellness`

---

### Adım 2: SEO Ayarları

#### **SEO Title** (Zorunlu)
- **Ne:** Google arama sonuçlarında görünecek başlık
- **Önerilen:** 50-60 karakter
- **İpucu:** Anahtar kelimeyi başa koyun
- **Örnek:** "Sabah Yoga Rutini: Güne Enerjik Başlamanın 7 Yolu"

#### **Meta Description** (Zorunlu)
- **Ne:** Google'da başlığın altında görünecek açıklama
- **Önerilen:** 150-160 karakter
- **İpucu:** Harekete geçirici olsun
- **Örnek:** "Her sabah 15 dakikalık yoga rutini ile enerjinizi artırın. Uzmanlar tarafından önerilen 7 etkili yoga hareketi ile güne başlayın. Hemen öğrenin!"

#### **URL Slug** (Zorunlu)
- **Ne:** İçeriğin URL'i
- **Otomatik:** Başlıktan otomatik oluşturulur
- **Düzenlenebilir:** İsterseniz manuel değiştirebilirsiniz
- **Format:** küçük-harf-tire-ile
- **Örnek:** `sabah-yoga-rutini-enerji`

#### **Focus Keyword** (Önerilen)
- **Ne:** İçeriğin odaklandığı anahtar kelime
- **Kullanımı:** Title ve description'da kullanın
- **Örnek:** "sabah yoga"

---

## 📊 SEO SKORU SİSTEMİ

Panel otomatik olarak SEO skorunuzu hesaplar:

### 🟢 Mükemmel (75-100 puan)
- Title: 50-60 karakter ✅
- Description: 150-160 karakter ✅
- Slug: Kısa ve anlamlı ✅
- Focus keyword title'da ✅
- Focus keyword description'da ✅

### 🟡 İyi (50-74 puan)
- Bazı alanlar ideal değil
- İyileştirme önerileri var

### 🔴 Geliştirilmeli (0-49 puan)
- Birçok alan eksik veya kısa
- SEO optimizasyonu gerekli

---

## 🔍 GOOGLE SERP ÖNİZLEME

Panel size içeriğinizin Google'da nasıl görüneceğini gerçek zamanlı gösterir:

```
yveline.com › icerik › sabah-yoga-rutini
Sabah Yoga Rutini: Güne Enerjik Başlamanın 7 Yolu
Her sabah 15 dakikalık yoga rutini ile enerjinizi artırın...
```

- Mavi başlık: SEO Title
- Gri açıklama: Meta Description
- Yeşil URL: Slug

---

## 💾 İÇERİK KAYDETME VE YAYINLAMA

### 1. Kaydet Butonu
- Formu doldurduktan sonra "İçeriği Kaydet" butonuna tıklayın
- İçerik admin panelin belleğine kaydedilir
- Hemen altta "Mevcut İçerikler" listesinde görünür

### 2. JSON İndir
- "JSON İndir" butonuna tıklayın
- `articles-data.json` dosyası bilgisayarınıza indirilir
- Bu dosya tüm içeriklerinizi içerir

### 3. Netlify'a Yükle
- Netlify sitenize gidin
- "Deploys" sekmesi
- İndirilen JSON dosyasını sürükle-bırak
- Site otomatik güncellenir (30 saniye)

**Önemli:** "Kaydet" butonu sadece admin panelde saklar. Siteye yansıması için JSON'u indirip Netlify'a yüklemelisiniz!

---

## ✏️ İÇERİK DÜZENLEME

1. "Mevcut İçerikler" listesinde düzenlemek istediğiniz içeriği bulun
2. "Düzenle" butonuna tıklayın
3. Form otomatik doldurulur
4. Değişiklikleri yapın
5. "İçeriği Kaydet" butonuna tıklayın
6. JSON'u indirin ve Netlify'a yükleyin

---

## 🗑️ İÇERİK SİLME

1. "Mevcut İçerikler" listesinde silinecek içeriği bulun
2. "Sil" butonuna tıklayın
3. Onaylayın
4. İçerik listeden kaldırılır
5. JSON'u indirin ve Netlify'a yükleyin

---

## 💡 SEO İPUÇLARI

### Title Yazarken:
✅ **İyi:** "Sabah Yoga Rutini: Güne Enerjik Başlamanın 7 Yolu"
- Anahtar kelime başta
- Sayı içeriyor (7 Yolu)
- Fayda vaat ediyor
- 55 karakter

❌ **Kötü:** "Yoga Hakkında Bilmeniz Gerekenler"
- Anahtar kelime net değil
- Spesifik değil
- Çok genel

### Description Yazarken:
✅ **İyi:** "Her sabah 15 dakikalık yoga rutini ile enerjinizi artırın. Uzmanlar tarafından önerilen 7 etkili yoga hareketi ile güne başlayın. Hemen öğrenin!"
- Harekete geçirici (Hemen öğrenin!)
- Somut bilgi (15 dakika, 7 hareket)
- Fayda vaat ediyor
- 155 karakter

❌ **Kötü:** "Yoga yapmak sağlıklıdır. Bu makalede yoga hakkında bilgiler bulacaksınız."
- Sıkıcı
- Spesifik değil
- Harekete geçirici değil

### Slug Yazarken:
✅ **İyi:** `sabah-yoga-rutini-enerji`
- Kısa ve öz
- Anahtar kelime içeriyor
- Okunabilir

❌ **Kötü:** `sabah-yoga-rutini-ile-gune-enerjik-baslamanin-7-yolu`
- Çok uzun
- Gereksiz kelimeler

---

## 📈 İÇERİK PLANLAMASI

### Haftalık Öneriler:
- **3-5 yeni içerik** ekleyin
- **1-2 featured** (öne çıkan) yapın
- **Kategorileri dengeleyin** (her kategoriden içerik)

### Öne Çıkan (Featured) Stratejisi:
- Maksimum **5-6 içeriği** featured yapın
- Carousel çok dolmasın
- En kaliteli içerikler için kullanın
- Düzenli güncelleyin (haftalık)

### SEO Optimizasyonu:
- Her içerik için focus keyword belirleyin
- Title ve description'a keyword yayın
- Slug'ı SEO dostu yapın
- Meta description harekete geçirici olsun

---

## ⚠️ SLIK SORUNLAR

### "JSON indiremedim"
- Önce en az 1 içerik ekleyin
- "Kaydet" butonuna bastınız mı?
- Tarayıcı indirmeleri engelliyor olabilir

### "Netlify'a yükledim ama görünmüyor"
- 30 saniye - 1 dakika bekleyin
- Sayfayı yenileyin (Ctrl+F5)
- Cache temizleyin

### "SEO skoru düşük"
- Title: 50-60 karakter hedefleyin
- Description: 150-160 karakter hedefleyin
- Focus keyword kullanın
- Slug'ı optimize edin

### "İçerikler kayboldu"
- Admin panel tarayıcı belleğinde çalışır
- JSON indirmeyi unutmayın
- Her değişiklikten sonra JSON indirin

---

## 🎯 HIZLI BAŞLANGIÇ

1. ✅ Admin panel aç (`/admin.html`)
2. ✅ Başlık yaz (40-60 karakter)
3. ✅ Kategori seç
4. ✅ Açıklama yaz (100-155 karakter)
5. ✅ Görsel URL ekle (Unsplash)
6. ✅ SEO ayarlarını kontrol et
7. ✅ SERP önizlemeye bak
8. ✅ "Kaydet" butonuna tıkla
9. ✅ JSON indir
10. ✅ Netlify'a yükle

**Tamamdır!** İçerik 30 saniye içinde sitede 🎉

---

## 📞 DESTEK

Sorunuz mu var? Herhangi bir konuda yardıma ihtiyacınız olursa, bana ulaşabilirsiniz!
