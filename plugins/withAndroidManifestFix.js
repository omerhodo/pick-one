const {
  withAndroidManifest,
  AndroidConfig,
} = require('@expo/config-plugins');

/**
 * Expo config plugin to fix AndroidManifest merge conflict
 * Adds tools:replace to DELAY_APP_MEASUREMENT_INIT meta-data
 */
const withAndroidManifestFix = (config) => {
  return withAndroidManifest(config, async (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );

    // DELAY_APP_MEASUREMENT_INIT meta-data'sını bul
    const metaDataArray = mainApplication['meta-data'] || [];

    for (let metaData of metaDataArray) {
      const name = metaData.$?.['android:name'];

      if (name === 'com.google.android.gms.ads.DELAY_APP_MEASUREMENT_INIT') {
        metaData.$['tools:replace'] = 'android:value';
        console.log('✅ Added tools:replace to DELAY_APP_MEASUREMENT_INIT');
      }

      if (
        name === 'com.google.android.gms.ads.APPLICATION_ID' ||
        name === 'com.google.android.gms.ads.flag.OPTIMIZE_AD_LOADING' ||
        name === 'com.google.android.gms.ads.flag.OPTIMIZE_INITIALIZATION'
      ) {
        metaData.$['tools:replace'] = 'android:value';
      }
    }

    const manifest = config.modResults.manifest;
    if (manifest && manifest.$) {
      manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
    }

    return config;
  });
};

module.exports = withAndroidManifestFix;
