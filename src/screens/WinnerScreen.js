import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import PhotoCard from '../components/PhotoCard';
import TMDBAttribution from '../components/TMDBAttribution';
import { useTranslation } from '../i18n/context';
import { COLORS, SIZES } from '../utils/constants';

const WinnerScreen = ({ navigation, route }) => {
  const { winner } = route.params;
  const { t } = useTranslation();
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const [showConfetti, setShowConfetti] = useState(false);
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window }) => setScreenData(window);
    const sub = Dimensions.addEventListener?.('change', onChange) || Dimensions.addEventListener('change', onChange);
    return () => sub?.remove?.();
  }, []);

  const isLandscape = screenData.width > screenData.height;

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

          <Text style={styles.title}>{t('winner.title')}</Text>
          <TMDBAttribution style={{ marginBottom: 16 }} variant="compact" />

          <Animated.View
            style={[
              styles.winnerContainer,
              isLandscape && styles.winnerContainerLandscape,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <PhotoCard
              photo={winner}
              style={[styles.winnerPhoto, isLandscape && styles.winnerPhotoLandscape]}
              showName={false}
            />

                        <View style={[styles.winnerMeta, isLandscape && styles.winnerMetaLandscape]}>
              <Text style={[styles.winnerName, isLandscape && styles.winnerNameLandscape]} numberOfLines={2}>
                {winner.name}
              </Text>

              <Button
                title={t('winner.playAgain')}
                onPress={handleBackHome}
                size="large"
                style={[styles.button, isLandscape && styles.buttonLandscape]}
              />
            </View>
          </Animated.View>
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
  winnerContainerLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.margin * 2,
  },
  winnerPhoto: {
    width: 250,
    height: 250,
    marginBottom: SIZES.margin,
  },
  winnerPhotoLandscape: {
    width: 180,
    height: 180,
    marginBottom: 0,
  },
  winnerMeta: {
    alignItems: 'center',
  },
  winnerMetaLandscape: {
    marginLeft: SIZES.padding,
    alignItems: 'flex-start',
  },
  winnerName: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.surface,
    textAlign: 'center',
  },
  winnerNameLandscape: {
    fontSize: SIZES.large,
    textAlign: 'left',
  },
  button: {
    width: 200,
    marginTop: SIZES.margin * 2,
    alignSelf: 'center',
  },
  buttonLandscape: {
    width: 160,
    alignSelf: 'flex-start',
  },
});

export default WinnerScreen;
