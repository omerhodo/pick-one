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
    "plugins": [
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": process.env.ADMOB_APP_ID_ANDROID,
          "iosAppId": process.env.ADMOB_APP_ID_IOS
        }
      ]
    ],
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#1d4ed8"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.omerhodo.pickone",
      "config": {
        "googleMobileAdsAppId": process.env.ADMOB_APP_ID_IOS
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1d4ed8"
      },
      "package": "com.omerhodo.pickone",
      "config": {
        "googleMobileAdsAppId": process.env.ADMOB_APP_ID_ANDROID
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "tmdbApiKey": process.env.TMDB_API_KEY,
      "admobAndroidAppId": process.env.ADMOB_APP_ID_ANDROID,
      "admobBannerAndroid": process.env.ADMOB_BANNER_ID_ANDROID,
      "admobBannerIos": process.env.ADMOB_BANNER_ID_IOS
    }
  }
};
