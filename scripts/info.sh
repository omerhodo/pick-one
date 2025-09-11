#!/bin/bash

echo "🎭 Seç Birini Mobil Uygulaması"
echo "================================"
echo ""
echo "📱 Proje Yapısı:"
echo ""
find . -type f \( -name "*.js" -o -name "*.json" -o -name "*.md" \) ! -path "./node_modules/*" ! -path "./.expo/*" ! -path "./.git/*" | sort

echo ""
echo "📝 Ana Özellikler:"
echo "✅ React Native + Expo"
echo "✅ Navigation sistemi (Stack Navigator)"
echo "✅ Global state yönetimi (Context API)"
echo "✅ Local storage (AsyncStorage)"
echo "✅ Modern UI tasarım"
echo "✅ Gradient efektler"
echo "✅ İstatistik takibi"
echo "✅ Responsive design"
echo ""

echo "🚀 Başlatma Komutları:"
echo "yarn install        # Bağımlılıkları yükle"
echo "yarn start          # Development server'ı başlat"
echo "yarn start --web    # Web versiyonunu başlat"
echo "yarn start --ios    # iOS simulator'da aç"
echo "yarn start --android # Android emulator'da aç"
