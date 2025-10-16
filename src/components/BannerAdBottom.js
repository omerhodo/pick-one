import Constants from 'expo-constants';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BannerAdBottom = ({ style }) => {
  // Check if ads are disabled via environment variable
  const manifest = Constants.expoConfig || Constants.manifest || {};
  const adsDisabled = manifest?.extra?.disableAds || process.env.DISABLE_ADS === 'true';

  if (adsDisabled) {
    return null;
  }

  // Check if we're running in Expo Go
  const isExpoGo = Constants.appOwnership === 'expo';

  // Google Mobile Ads only works in development builds, not in Expo Go
  if (isExpoGo) {
    // Return null when running in Expo Go
    return null;
  }

  // Dynamically import BannerAd to avoid errors in Expo Go
  let BannerAd, BannerAdSize, TestIds;
  try {
    const GoogleMobileAds = require('react-native-google-mobile-ads');
    BannerAd = GoogleMobileAds.BannerAd;
    BannerAdSize = GoogleMobileAds.BannerAdSize;
    TestIds = GoogleMobileAds.TestIds;
  } catch (error) {
    // Module not available, return null
    return null;
  }

  // Get AdMob IDs from manifest
  const admobAndroid = manifest?.extra?.admobBannerAndroid || process.env.ADMOB_BANNER_ID_ANDROID;
  const admobIos = manifest?.extra?.admobBannerIos || process.env.ADMOB_BANNER_ID_IOS;

  const adUnitID = Platform.OS === 'ios' ? admobIos : admobAndroid;

  // Fallback to Google test ad unit if not provided
  const finalAdUnit = adUnitID || TestIds.ADAPTIVE_BANNER;

  return (
    <SafeAreaView edges={["bottom"]} style={[styles.safeArea, style]}>
      <View style={styles.container} pointerEvents="box-none">
        <BannerAd
          unitId={finalAdUnit}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdFailedToLoad={(error) => {
            // eslint-disable-next-line no-console
            console.log('AdMob banner error:', error);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default BannerAdBottom;
