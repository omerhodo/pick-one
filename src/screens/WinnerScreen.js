import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import PhotoCard from '../components/PhotoCard';
import { COLORS, SIZES } from '../utils/constants';

const WinnerScreen = ({ navigation, route }) => {
  const { winner } = route.params;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setShowConfetti(true);
    }, 500);
  }, []);

  const handleBackHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      {/* Geniş Lacivert Blur Background - Multiple layers */}
      <View style={styles.backgroundBlur} />
      <View style={styles.backgroundBlur2} />
      <View style={styles.backgroundBlur3} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>

          {showConfetti && (
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              autoStart={true}
              fadeOut={true}
            />
          )}

          <Text style={styles.title}>🎉 Kazanan! 🎉</Text>

          <Animated.View
            style={[
              styles.winnerContainer,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <PhotoCard
              photo={winner}
              style={styles.winnerPhoto}
              showName={false}
            />
            <Text style={styles.winnerName}>{winner.name}</Text>
          </Animated.View>

          <Button
            title="Tekrar Oyna"
            onPress={handleBackHome}
            size="large"
            style={styles.button}
          />
        </View>
      </SafeAreaView>
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
    top: '30%',
    left: '50%',
    width: 600,
    height: 600,
    backgroundColor: '#2563eb',
    borderRadius: 300,
    opacity: 0.3,
    transform: [{ translateX: -300 }, { translateY: -300 }],
    shadowColor: '#2563eb',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 200,
    elevation: 50,
  },
  backgroundBlur2: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    width: 400,
    height: 400,
    backgroundColor: '#1d4ed8',
    borderRadius: 200,
    opacity: 0.4,
    transform: [{ translateX: -200 }, { translateY: -200 }],
    shadowColor: '#1d4ed8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 150,
    elevation: 40,
  },
  backgroundBlur3: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    width: 200,
    height: 200,
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
    opacity: 0.6,
    transform: [{ translateX: -100 }, { translateY: -100 }],
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 30,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  title: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.surface,
    textAlign: 'center',
    marginBottom: SIZES.margin * 3,
  },
  winnerContainer: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 4,
  },
  winnerPhoto: {
    width: 250,
    height: 250,
    marginBottom: SIZES.margin,
  },
  winnerName: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.surface,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
  },
});

export default WinnerScreen;
