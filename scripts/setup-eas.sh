#!/bin/bash

# EAS Setup Script
# Bu script EAS'ı yapılandırır ve secrets ekler

echo "🔧 EAS Setup başlatılıyor..."
echo ""

# EAS CLI'nin yüklü olduğunu kontrol et
if ! command -v eas &> /dev/null
then
    echo "❌ EAS CLI bulunamadı. Yükleniyor..."
    npm install -g eas-cli
fi

# EAS'a giriş
echo "📝 EAS'a giriş yapın:"
eas login

echo ""
echo "🔐 Environment Variables (Secrets) ekleniyor..."
echo ""

# .env dosyasını oku ve secrets ekle
if [ -f .env ]; then
    echo "✅ .env dosyası bulundu"

    # TMDB API Key
    echo "📌 TMDB_API_KEY ekleniyor..."
    TMDB_KEY=$(grep TMDB_API_KEY .env | cut -d '=' -f2)
    eas secret:create --scope project --name TMDB_API_KEY --value "$TMDB_KEY" --type string --force

    # AdMob Android App ID
    echo "📌 ADMOB_APP_ID_ANDROID ekleniyor..."
    ADMOB_ANDROID=$(grep ADMOB_APP_ID_ANDROID .env | cut -d '=' -f2)
    eas secret:create --scope project --name ADMOB_APP_ID_ANDROID --value "$ADMOB_ANDROID" --type string --force

    # AdMob iOS App ID
    echo "📌 ADMOB_APP_ID_IOS ekleniyor..."
    ADMOB_IOS=$(grep ADMOB_APP_ID_IOS .env | cut -d '=' -f2)
    eas secret:create --scope project --name ADMOB_APP_ID_IOS --value "$ADMOB_IOS" --type string --force

    # AdMob Android Banner ID
    echo "📌 ADMOB_BANNER_ID_ANDROID ekleniyor..."
    BANNER_ANDROID=$(grep ADMOB_BANNER_ID_ANDROID .env | cut -d '=' -f2)
    eas secret:create --scope project --name ADMOB_BANNER_ID_ANDROID --value "$BANNER_ANDROID" --type string --force

    # AdMob iOS Banner ID
    echo "📌 ADMOB_BANNER_ID_IOS ekleniyor..."
    BANNER_IOS=$(grep ADMOB_BANNER_ID_IOS .env | cut -d '=' -f2)
    eas secret:create --scope project --name ADMOB_BANNER_ID_IOS --value "$BANNER_IOS" --type string --force

    # Disable Ads Flag
    echo "📌 DISABLE_ADS ekleniyor..."
    DISABLE_ADS=$(grep DISABLE_ADS .env | cut -d '=' -f2)
    eas secret:create --scope project --name DISABLE_ADS --value "$DISABLE_ADS" --type string --force

    echo ""
    echo "✅ Tüm secrets başarıyla eklendi!"
else
    echo "❌ .env dosyası bulunamadı!"
    echo "Lütfen önce .env.example dosyasını kopyalayıp .env olarak kaydedin ve gerekli API key'leri ekleyin."
    exit 1
fi

echo ""
echo "📋 Mevcut secrets:"
eas secret:list

echo ""
echo "✅ EAS setup tamamlandı!"
echo ""
echo "Sonraki adım:"
echo "Build oluşturmak için çalıştırın:"
echo "  ./scripts/build-all.sh"
