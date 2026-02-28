import 'dotenv/config';

export default {
  "expo": {
    "name": "Seç Birini",
    "slug": "pick-one",
    "version": "1.4.1",
    "orientation": "default",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "owner": "omerhodo",
    "extra": {
      "eas": {
        "projectId": "6d7febf5-9d01-4d25-91bf-c36b089710f1"
      },
      "tmdbApiKey": process.env.TMDB_API_KEY,
      "disableAds": process.env.DISABLE_ADS === 'true'
    },
    "plugins": [
      "./plugins/withAndroidManifestFix"
    ],
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#1d4ed8"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.omerhodo.pickone",
      "buildNumber": "15"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1d4ed8"
      },
      "package": "com.omerhodo.pickone",
      "versionCode": 15,
      "edgeToEdgeEnabled": true
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
};
