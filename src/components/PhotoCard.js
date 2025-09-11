import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';

const PhotoCard = ({ photo, onPress, style, showName = true, showDetails = false, isLoading = false }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handlePress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress(photo);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  const renderPlaceholder = () => (
    <View style={[styles.image, styles.placeholder]}>
      <Text style={styles.placeholderText}>{photo.name?.charAt(0) || '?'}</Text>
    </View>
  );

  const renderLoadingIndicator = () => (
    <View style={[styles.image, styles.loadingContainer]}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, style]}
      activeOpacity={onPress ? 0.9 : 1}
      disabled={!onPress || isLoading}
    >
      <View style={styles.card}>
        {loading && renderLoadingIndicator()}

        {photo.image && !error ? (
          <Image
            source={{ uri: photo.image }}
            style={[styles.image, loading && styles.hidden]}
            resizeMode="cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          !loading && renderPlaceholder()
        )}

        {isLoading && (
          <View style={styles.externalLoadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.white} />
            <Text style={styles.loadingText}>Yeni rakip aranıyor...</Text>
          </View>
        )}

        {(showName || showDetails) && (
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.gradient}
          >
            {showName && (
              <Text style={styles.name} numberOfLines={2}>
                {photo.name}
              </Text>
            )}

            {showDetails && (
              <View style={styles.detailsContainer}>
                {photo.knownFor && (
                  <Text style={styles.detail}>
                    {photo.knownFor}
                  </Text>
                )}

                {photo.category && (
                  <Text style={styles.category}>
                    {photo.category}
                  </Text>
                )}

                {photo.source && (
                  <Text style={styles.source}>
                    {photo.source}
                  </Text>
                )}
              </View>
            )}
          </LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.margin,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  hidden: {
    opacity: 0,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '20',
  },
  placeholderText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.7,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.margin,
    paddingVertical: 10,
  },
  name: {
    color: COLORS.surface,
    fontSize: SIZES.medium,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  detailsContainer: {
    alignItems: 'center',
    gap: 2,
  },
  detail: {
    color: COLORS.surface,
    fontSize: SIZES.small,
    opacity: 0.9,
    textAlign: 'center',
  },
  category: {
    color: COLORS.accent,
    fontSize: SIZES.small - 1,
    fontWeight: '500',
    textAlign: 'center',
  },
  source: {
    color: COLORS.surface,
    fontSize: SIZES.small - 2,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 2,
  },
  externalLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    zIndex: 10,
  },
  loadingText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default PhotoCard;
