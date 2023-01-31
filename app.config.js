import 'dotenv/config';

export default {
  "expo": {
    "extra": {
      "eas": {
        "projectId": "7997d81b-6dd7-4039-91b9-b5ace1312cb1"
      }
    },
    "name": "rideNow",
    "slug": "rideNow",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "scheme": "com.ridenow",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.ridenow",
      "config": {
        "googleMapsApiKey": "AIzaSyCR_cFKijGnHLL2EL1d4ULr0Dy_s1PvrvQ"
      },
      "entitlements": {
        "com.apple.developer.networking.wifi-info": true
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.ridenow",
      "googleServicesFile": "./google-services.json",
      "config": {
          "googleMaps": {
            "apiKey": "AIzaSyCR_cFKijGnHLL2EL1d4ULr0Dy_s1PvrvQ"
          },
          "permissions":["ACCESS_COARSE_LOCATION","ACCESS_FINE_LOCATION","FOREGROUND_SERVICE"]
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.GOOGLE_MAPS_APIKEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    }
  }
}
