#!/bin/bash

# EAS Build Script - Android Production Build
# Bu script Android için production build oluşturur

echo "🤖 Android Production Build başlatılıyor..."
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
echo "📦 Android build oluşturuluyor..."
echo "⏱️  Bu işlem 15-30 dakika sürebilir."
echo ""

# Android production build başlat
eas build --platform android --profile production

echo ""
echo "✅ Build tamamlandı!"
echo "📱 Google Play Console'da yükleyebilirsiniz."
echo ""
echo "Sonraki adımlar:"
echo "1. Build linkinden .aab dosyasını indirin"
echo "2. Google Play Console'a git: https://play.google.com/console"
echo "3. Uygulamanızı seçin → Production → Create new release"
echo "4. .aab dosyasını yükleyin"
echo "5. Release notes ekleyin ve publish edin"
