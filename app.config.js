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
    "owner": "omerhodo",
    "extra": {
      "eas": {
        "projectId": "6d7febf5-9d01-4d25-91bf-c36b089710f1"
      },
      "tmdbApiKey": process.env.TMDB_API_KEY,
      "admobAndroidAppId": process.env.ADMOB_APP_ID_ANDROID,
      "admobBannerAndroid": process.env.ADMOB_BANNER_ID_ANDROID,
      "admobBannerIos": process.env.ADMOB_BANNER_ID_IOS
    },
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
      "buildNumber": "1",
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
      "versionCode": 1,
      "config": {
        "googleMobileAdsAppId": process.env.ADMOB_APP_ID_ANDROID
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
};
