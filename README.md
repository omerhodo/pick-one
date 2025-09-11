# Seç Birini 🎭

İki ünlü arasından birini seçip, tercihlerini keşfettiğin eğlenceli mobil uygulama!

## 📱 Uygulama Hakkında

"Seç Birini", kullanıcılara sürekli olarak iki ünlü fotoğrafı arasından seçim yaptırarak tercihlerini analiz eden, eğlenceli ve bağımlılık yapan bir mobil uygulamadır. TMDB (The Movie Database) API'sinden gerçek ünlü verileri çekerek otantik bir deneyim sunar.

### ✨ Özellikler

- **TMDB Entegrasyonu**: Gerçek ünlü verileri ve yüksek kaliteli fotoğraflar
- **Turnuva Sistemi**: 10 seçim ile kazanan belirleme
- **Modern UI**: Blur arka plan ve gradient tasarım
- **Yükleme Durumları**: Kullanıcı dostu loading animasyonları
- **Fallback Sistem**: API hatalarında alternatif veri kaynakları
- **İstatistik Takibi**: Hangi ünlüleri ne sıklıkta seçtiğini gör

### 🎯 Nasıl Çalışır?

1. **TMDB API**: Popüler ünlüleri ve fotoğraflarını çeker
2. **Seçim Ekranı**: İki ünlü arasından birini seç
3. **Turnuva**: Seçilen ünlü bir sonraki turda kalır
4. **Kazanan**: 10 seçim sonunda şampiyon belirlenir

## 🔑 Kurulum ve API Setup

### Gereksinimler
- Node.js (>= 14.0.0)
- Expo CLI
- TMDB API Key (ücretsiz)

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

### 3. TMDB API Key Al
1. [TMDB](https://www.themoviedb.org/) hesabı oluştur
2. **Settings > API** sayfasından API key al
3. `.env` dosyasına ekle:
```bash
TMDB_API_KEY=your_actual_api_key_here
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

## 📱 Platform Desteği

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

## 🚀 Deployment

### iOS
```bash
yarn build:ios
```

### Android
```bash
yarn build:android
```

## 👥 Ekip

- **Geliştirici**: [Ömer Hodo]
- **Tasarım**: [Ömer Hodo]
