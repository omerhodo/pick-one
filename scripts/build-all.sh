#!/bin/bash

# EAS Build Script - Both Platforms
# Bu script hem iOS hem Android için production build oluşturur

echo "🚀 iOS ve Android Production Build başlatılıyor..."
echo ""

# EAS CLI'nin yüklü olduğunu kontrol et
if ! command -v eas &> /dev/null
then
    echo "❌ EAS CLI bulunamadı. Yükleniyor..."
    npm install -g eas-cli
fi

# EAS'a giriş kontrolü
echo "✅ EAS oturum kontrolü..."
eas whoami || {
    echo "❌ EAS'a giriş yapılmamış. Lütfen giriş yapın:"
    eas login
}

echo ""
echo "📦 Her iki platform için build oluşturuluyor..."
echo "⏱️  Bu işlem 20-40 dakika sürebilir."
echo ""

# Her iki platform için production build başlat
eas build --platform all --profile production

echo ""
echo "✅ Build'ler tamamlandı!"
echo ""
echo "📱 iOS - App Store Connect: https://appstoreconnect.apple.com"
echo "🤖 Android - Google Play Console: https://play.google.com/console"
echo ""
echo "Build durumunu kontrol etmek için:"
echo "eas build:list"
