#!/bin/bash

# EAS Build Script - iOS Production Build
# Bu script iOS için production build oluşturur

echo "🍎 iOS Production Build başlatılıyor..."
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
echo "📦 iOS build oluşturuluyor..."
echo "⏱️  Bu işlem 15-30 dakika sürebilir."
echo ""

# iOS production build başlat
eas build --platform ios --profile production

echo ""
echo "✅ Build tamamlandı!"
echo "📱 App Store Connect'te build'i bulabilirsiniz."
echo ""
echo "Sonraki adımlar:"
echo "1. App Store Connect'e git: https://appstoreconnect.apple.com"
echo "2. Uygulamanızı seçin"
echo "3. Version → Build bölümünden build'i seçin"
echo "4. Submit for Review'a tıklayın"
