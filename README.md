# Seç Birini 🎭

İki fotoğraf arasından birini seçip, tercihlerini keşfettiğin eğlenceli mobil uygulama!

## 📱 Uygulama Hakkında

"Seç Birini", kullanıcılara sürekli olarak iki fotoğraf arasından seçim yaptırarak tercihlerini analiz eden, eğlenceli ve bağımlılık yapan bir mobil uygulamadır. Tinder tarzı kaydırma yerine, dokunarak seçim yapma sistemi kullanır.

### ✨ Özellikler

- **Basit Seçim Sistemi**: İki fotoğraf arasından birini seçmen yeterli
- **İstatistik Takibi**: Hangi fotoğrafları ne sıklıkta seçtiğini gör
- **Favori Analizi**: En çok tercih ettiğin fotoğrafları keşfet
- **Sonsuz İçerik**: Tüm kombinasyonları bitene kadar devam et
- **Modern UI/UX**: Kullanıcı dostu, gradient tasarım

### 🎯 Nasıl Çalışır?

1. **Ana Ekran**: Oyuna başla veya sonuçlarını gör
2. **Seçim Ekranı**: İki fotoğraf arasından birini seç
3. **Sonuçlar Ekranı**: İstatistiklerini ve favorilerini incele

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
