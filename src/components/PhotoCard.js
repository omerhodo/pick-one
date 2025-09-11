import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';

const PhotoCard = ({ photo, onPress, style, showName = true }) => {
  const handlePress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress(photo);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, style]}
      activeOpacity={onPress ? 0.9 : 1}
      disabled={!onPress}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: photo.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {showName && (
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.gradient}
          >
            <Text style={styles.name}>{photo.name}</Text>
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
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.margin,
    paddingTop: 10,
  },
  name: {
    color: COLORS.surface,
    fontSize: SIZES.medium,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PhotoCard;
