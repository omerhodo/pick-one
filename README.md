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

## 📣 AdMob Kurulumu

Bu proje `expo-ads-admob` ile banner reklamları gösterir. Aşağıdaki adımları izleyin:

1. Google AdMob hesabı açın ve uygulamanızı ekleyin.
2. App ID alın (örnek: `ca-app-pub-xxxxxxxx~yyyyyyyyyy`) ve Banner Ad Unit ID'lerini oluşturun (Android ve iOS için ayrı olabilir).
3. Lokal geliştirme için `.env.example` dosyasını kopyalayın ve `.env` içinde değerleri güncelleyin:

```bash
cp .env.example .env
# .env içindeki ADMOB_* değişkenlerini kendi değerlerinizle değiştirin
```

4. Uygulamayı başlatın ve emulator / cihazda test edin:

```bash
yarn start
yarn android   # veya
yarn ios
```

5. Home ve Pick ekranlarının alt kısmında banner reklamlar otomatik olarak görüntülenecektir. Eğer `.env` içinde ID yoksa kod Google'ın test banner ID'sine döner.

Notlar:
- `.env` dosyası `.gitignore` içinde listelenmiştir; gerçek anahtarları repoya eklemeyin.
- Geliştirme sırasında Google'ın test reklam birimlerini kullanın.
- Gerçek reklam birimlerine geçişte AdMob politikalarına uyduğunuzdan emin olun.

### Hata ayıklama: "runtime not ready" / undefined değer hataları

Eğer Android'de veya iOS'ta "not ready" veya `undefined` değer hatası alıyorsanız, yaygın sebepler ve çözümleri:

- Expo Go sınırlamaları: `expo-ads-admob` bazı durumlarda doğrudan Expo Go içinde tam çalışmayabilir. Reklam SDK'sı native modüller gerektirdiği için gerçek test adlarını görmek veya SDK'yı düzgün başlatmak için ya bir custom dev client (expo-dev-client) ya da standalone build (EAS build / `expo run:android`) kullanmanız gerekebilir.

- App ID manifest eksikliği: Android için App ID'nin `app.config.js` içinde `android.config.googleMobileAdsAppId` olarak veya iOS için `ios.infoPlist.GADApplicationIdentifier` olarak ayarlı olması gerekir. Bu repo için Android App ID `app.config.js` içinde eklidir. (iOS gerekiyorsa ekleyebilirim.)

- `Constants.manifest` boş/undefined olabilir: runtime'da `Constants.manifest.extra` null dönebilir; component buna karşı korunmuştur ama config yoksa banner test ID'sine düşer.

Nasıl ayrıntılı log alırsınız (Android):

1. Metro'yu başlatın:
```bash
yarn start --clear
```
2. Android'i çalıştırın:
```bash
yarn android
```
3. Hatanın terminaldeki stack trace'ini kopyalayın. Eğer `yarn android` doğrudan crash oluyorsa, ayrıntılı Android log almak için bir terminalde aşağıyı çalıştırın (adb kurulu olmalı):
```bash
adb logcat *:S ReactNative:V ReactNativeJS:V
```

Alternatif: Expo dev client ile test etmek için:
```bash
npx expo prebuild --no-install
npx expo run:android
```
veya EAS geliştirme/prod build:
```bash
npx eas build --platform android --profile development
```

Paylaşmanız gerekenler (hızlıca bakmam için):
- Terminalde `yarn android` çalıştırırken çıkan hata stack trace'i
- Eğer varsa `adb logcat` çıktısından ilgili hata satırları

Ben projede `BannerAdBottom` bileşenini hataya dayanıklı hale getirdim (manifest olmaması veya `AdMobBanner` unavailability durumunda çökme engellendi). Ancak gerçek reklam SDK initialization sorunları için yukarıdaki loglar gerekli.

