#!/bin/bash

# EAS Build sırasında AndroidManifest.xml'i düzelt
# Bu script DELAY_APP_MEASUREMENT_INIT satırına tools:replace ekler

MANIFEST_FILE="android/app/src/main/AndroidManifest.xml"

if [ -f "$MANIFEST_FILE" ]; then
    echo "🔧 AndroidManifest.xml düzenleniyor..."

    # DELAY_APP_MEASUREMENT_INIT satırını bul ve tools:replace ekle
    # Eğer zaten yoksa ekle
    if grep -q 'DELAY_APP_MEASUREMENT_INIT.*tools:replace' "$MANIFEST_FILE"; then
        echo "✅ tools:replace zaten mevcut"
    else
        echo "📝 tools:replace ekleniyor..."

        # macOS ve Linux uyumlu sed komutu
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' 's/\(DELAY_APP_MEASUREMENT_INIT.*value="[^"]*"\)/\1 tools:replace="android:value"/' "$MANIFEST_FILE"
        else
            # Linux (EAS Build)
            sed -i 's/\(DELAY_APP_MEASUREMENT_INIT.*value="[^"]*"\)/\1 tools:replace="android:value"/' "$MANIFEST_FILE"
        fi

        echo "✅ tools:replace eklendi"
    fi

    # Sonucu göster
    echo ""
    echo "📄 DELAY_APP_MEASUREMENT_INIT satırı:"
    grep "DELAY_APP_MEASUREMENT_INIT" "$MANIFEST_FILE"
    echo ""
else
    echo "❌ AndroidManifest.xml bulunamadı: $MANIFEST_FILE"
    exit 1
fi

exit 0
