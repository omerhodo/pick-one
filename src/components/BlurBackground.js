import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

const BlurBackground = ({ children }) => {
  return (
    <View style={styles.container}>
      <BlurView intensity={10} style={styles.backgroundBlur} />
      <BlurView intensity={5} style={styles.backgroundBlur2} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundBlur: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    width: '100%',
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 1000,
    opacity: 0.3,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
  backgroundBlur2: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    width: '50%',
    height: '50%',
    backgroundColor: '#1d4ed8',
    borderRadius: 800,
    opacity: 0.4,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
});

export default BlurBackground;
