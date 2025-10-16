# Seç Birini 🎭

İki fotoğraf arasından birini seçip, gerçek favorini keşfet! 🎯

[![iOS](https://img.shields.io/badge/iOS-App%20Store-blue)](https://appstoreconnect.apple.com)
[![Android](https://img.shields.io/badge/Android-Play%20Store-green)](https://play.google.com/console)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-lightgrey)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue)](https://reactnative.dev)

## 📱 Uygulama Hakkında

"Seç Birini", kullanıcılara sürekli olarak iki fotoğraf arasından seçim yaptırarak gerçek tercihlerini keşfettiren, eğlenceli ve bağımlılık yapan bir mobil uygulamadır. TMDB (The Movie Database) API'sinden gerçek verileri çekerek otantik bir deneyim sunar.

### ✨ Özellikler

- **🎬 Çeşitli Kategoriler**: Erkek/Kadın Aktörler, Sporcular, Müzisyenler
- **🎯 Esnek Seçenekler**: 10, 15 veya 20 fotoğraf arasından seçim
- **🌍 Çift Dil Desteği**: Türkçe ve İngilizce
- **🖼️ Kaliteli Görseller**: TMDB API'den yüksek çözünürlüklü fotoğraflar
- **⚡ Hızlı ve Akıcı**: Optimize edilmiş performans
- **📱 Modern UI**: Blur arka plan, gradient ve animasyonlar
- **🎉 Confetti Animasyonu**: Kazanan ekranında şölen!
- **📊 AdMob Entegrasyonu**: Banner reklamlar ile monetizasyon
- **🔄 Fallback Sistem**: İnternet yoksa demo mode
- **💾 Offline Cache**: AsyncStorage ile veri saklama

### 🎯 Nasıl Çalışır?

1. **Kategori Seç**: Aktörler, sporcular veya müzisyenler
2. **Sayı Belirle**: 10, 15 veya 20 seçim
3. **İki Fotoğraf**: Aralarından birini seç
4. **Turnuva Sistemi**: Kazanan bir sonraki turda kalır
5. **Şampiyon**: En sonunda gerçek favorin ortaya çıkar! 🏆

## 🔑 Kurulum ve API Setup

### Gereksinimler
- Node.js (>= 14.0.0)
- Expo CLI
- TMDB API Key

### 1. Projeyi Klonla
```bash
git clone <project-url>
cd pick-one
yarn install
```

### 2. Environment Dosyasını Ayarla
```bash
cp .env.example .env
```

### 3. API Keys'leri Al

#### TMDB API
1. [TMDB](https://www.themoviedb.org/) hesabı oluştur
2. **Settings > API** sayfasından API key al

#### AdMob (Opsiyonel - Reklamlar için)
1. [AdMob](https://apps.admob.com/) hesabı oluştur
2. Yeni uygulama oluştur
3. Banner Ad Unit'leri oluştur (iOS ve Android için ayrı)

### 4. .env Dosyasını Doldur
```bash
# TMDB API
TMDB_API_KEY=your_tmdb_api_key_here

# AdMob (Opsiyonel)
ADMOB_APP_ID_ANDROID=ca-app-pub-xxxxxxxxxx~yyyyyyyyyy
ADMOB_APP_ID_IOS=ca-app-pub-xxxxxxxxxx~yyyyyyyyyy
ADMOB_BANNER_ID_ANDROID=ca-app-pub-xxxxxxxxxx/yyyyyyyyyy
ADMOB_BANNER_ID_IOS=ca-app-pub-xxxxxxxxxx/yyyyyyyyyy
```

### 4. Uygulamayı Çalıştır
```bash
yarn start    # Expo development server
yarn ios      # iOS simulator
yarn android  # Android emulator
```

## 🏗️ Teknik Yapı

### Frontend (React Native + Expo)
```
src/
├── screens/           # Ana ekranlar
│   ├── HomeScreen     # Başlangıç ekranı
│   ├── PickScreen     # Fotoğraf seçim ekranı
├── components/        # Yeniden kullanılabilir bileşenler
│   ├── Button         # Özel buton bileşeni
│   ├── PhotoCard      # Fotoğraf kartı bileşeni
│   └── Loader         # Yüklenme bileşeni
├── context/           # Global state yönetimi
│   └── GameContext    # Oyun durumu context'i
├── api/               # API servisleri
│   ├── apiClient      # Fetch wrapper
│   └── photoService   # Fotoğraf API servisi
├── storage/           # Yerel depolama
│   └── storage        # AsyncStorage wrapper
└── utils/             # Yardımcı fonksiyonlar
    ├── constants      # Sabitler ve örnek veriler
    └── helpers        # Yardımcı fonksiyonlar
```

### 🔧 Kullanılan Teknolojiler

- **React Native**: Mobil uygulama framework'ü
- **Expo**: Hızlı geliştirme platformu
- **React Navigation**: Sayfa geçişleri
- **Context API**: Global state yönetimi
- **AsyncStorage**: Yerel veri depolama
- **Linear Gradient**: Gradient efektleri
- **Expo Image**: Gelişmiş resim gösterimi

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- Yarn package manager
- Expo CLI
- iOS Simulator / Android Emulator

### Adımlar

1. **Repoyu klonla**
```bash
git clone <repo-url>
cd pick-one
```

2. **Bağımlılıkları yükle**
```bash
yarn install
```

3. **Uygulamayı başlat**
```bash
yarn start
```

4. **Platform seç**
- iOS: `i` tuşuna bas
- Android: `a` tuşuna bas
- Web: `w` tuşuna bas

## 📱 Deployment

### 🚀 Hızlı Başlangıç

Uygulamamızı yayınlamak için adım adım kılavuz: **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)**

#### Hızlı Komutlar

```bash
# EAS Setup (ilk kez)
./scripts/setup-eas.sh

# iOS Build
./scripts/build-ios.sh

# Android Build
./scripts/build-android.sh

# Her iki platform
./scripts/build-all.sh
```

### 📦 Build Gereksinimleri

- **Apple Developer Account** ($99/yıl) - iOS için
- **Google Play Console Account** ($25 tek seferlik) - Android için
- **Expo Account** (ücretsiz) - EAS Build için

### 🔐 Environment Variables (Production)

Production build'leri için EAS secrets kullanın:

```bash
eas secret:create --name TMDB_API_KEY --value "your-key"
eas secret:create --name ADMOB_APP_ID_ANDROID --value "your-id"
eas secret:create --name ADMOB_APP_ID_IOS --value "your-id"
# ... diğer secrets
```

Detaylar için: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

## 📱 Platform Desteği

- ✅ **iOS**: iPhone ve iPad (iOS 13.0+)
- ✅ **Android**: Phone ve Tablet (Android 6.0+)
- ⏳ **Web**: Yakında (temel destek mevcut)

- ✅ **iOS**: iPhone ve iPad
- ✅ **Android**: Tüm Android cihazlar
- ✅ **Web**: Modern web tarayıcıları

## 🎨 Tasarım

### Renk Paleti
- **Primary**: #1d4ed8 (Navy Blue)
- **Secondary**: #3b82f6 (Blue)
- **Background**: #f8fafc (Light Gray)
- **Surface**: #ffffff (White)
- **Text**: #1e293b (Dark Gray)

### Tipografi
- **Başlıklar**: System Bold
- **Alt başlıklar**: System Medium
- **Metin**: System Regular

## � Dökümanlar

- 📖 **[Deployment Rehberi](./DEPLOYMENT-GUIDE.md)**: App Store ve Play Store'da yayınlama kılavuzu
- 🎨 **[Store Assets](./store-assets/README.md)**: Ekran görüntüleri ve store materyalleri
- 📝 **[TMDB Entegrasyonu](./TMDB-INTEGRATION.md)**: API kullanım detayları

## 🧪 Test

### Development Build ile Test

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

**Not**: Google Mobile Ads native bir modül olduğu için Expo Go'da çalışmaz. Development build kullanmalısınız.

### Expo Go ile Test (Reklamlar Olmadan)

```bash
npx expo start
# QR kodu tarayın
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje [MIT Lisansı](./LICENSE) altında lisanslanmıştır.

## 👥 Geliştirici

- **Geliştirici**: Ömer Hodo
- **GitHub**: [@omerhodo](https://github.com/omerhodo)

## 📞 İletişim

- **Email**: omerhodo@gmail.com
- **Website**: https://xhodo.com

## 🔗 Linkler

- **App Store**: Yakında
- **Play Store**: Yakında
- **Demo Video**: Yakında

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
- Geliştirme sırasında Google'ın test reklam birimlerini kullanın.
- Gerçek reklam birimlerine geçişte AdMob politikalarına uyduğunuzdan emin olun.
