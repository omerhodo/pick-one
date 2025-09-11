import 'dotenv/config';

export default {
  "expo": {
    "name": "Seç Birini",
    "slug": "pick-one",
    "version": "1.0.0",
    "orientation": "default",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#1d4ed8"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.pickone.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1d4ed8"
      },
      "package": "com.pickone.app",
      "edgeToEdgeEnabled": true
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "tmdbApiKey": process.env.TMDB_API_KEY
    }
  }
};
