import { useEffect, useState } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import photoService from '../api/photoService';
import BlurBackground from '../components/BlurBackground';
import Button from '../components/Button';
import Loader from '../components/Loader';
import PhotoCard from '../components/PhotoCard';
import { useGame } from '../context/GameContext';
import { useTranslation } from '../i18n/context';
import { ANIMATION_DURATION, COLORS, SIZES } from '../utils/constants';
import { getNewOpponent, getRandomPair, getUsedOpponents } from '../utils/helpers';

const PickScreen = ({ navigation, route }) => {
  const { maxSelections = 10, category } = route?.params || {};
  const { t } = useTranslation();

  const {
    photos,
    currentPair,
    setCurrentPair,
    setCurrentWinner,
    makeSelection,
    selections,
    loading,
    currentWinner,
    usingTestData
  } = useGame();

  const [animatedValue] = useState(new Animated.Value(1));
  const [isSelecting, setIsSelecting] = useState(false);
  const [isLoadingOpponent, setIsLoadingOpponent] = useState(false);
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove?.();
  }, []);

  const isLandscape = screenData.width > screenData.height;

  useEffect(() => {
    if (selections.length >= maxSelections) return;

    if (!currentPair && photos.length > 0) {
      if (currentWinner) {
        const usedOpponentIds = getUsedOpponents(currentWinner.id, selections);
        const newOpponent = getNewOpponent(currentWinner, photos, usedOpponentIds);

        if (newOpponent) {
          setCurrentPair([currentWinner, newOpponent]);
        }
      } else {
        const pair = getRandomPair(photos, [], selections, null);
        if (pair) {
          setCurrentPair(pair);
        }
      }
    }
  }, [photos, currentPair, setCurrentPair, selections, currentWinner]);

  const animateSelection = (callback) => {
    setIsSelecting(true);
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.8,
        duration: ANIMATION_DURATION / 2,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: ANIMATION_DURATION / 2,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsSelecting(false);
      callback();
    });
  };

  const handlePhotoSelection = (selectedPhoto) => {
    if (isSelecting || !currentPair || isLoadingOpponent) {
      // Selection blocked due to state
      return;
    }

    const rejectedPhoto = currentPair.find(photo => photo.id !== selectedPhoto.id);
    const selectedPhotoIndex = currentPair.findIndex(photo => photo.id === selectedPhoto.id);

    const willBeLastSelection = selections.length + 1 >= maxSelections;

    animateSelection(async () => {
      const success = await makeSelection(selectedPhoto, rejectedPhoto);

      if (success) {
        if (willBeLastSelection) {
          navigation.navigate('WinnerScreen', { winner: selectedPhoto });
          return;
        }

        setCurrentWinner(selectedPhoto);
        const usedOpponentIds = getUsedOpponents(selectedPhoto.id, [
          ...selections,
          { selectedId: selectedPhoto.id, rejectedId: rejectedPhoto.id }
        ]);

  // Trying to find a fresh opponent
        setIsLoadingOpponent(true);

        try {
          const freshOpponent = await photoService.getFreshOpponent(selectedPhoto, usedOpponentIds);

          if (freshOpponent) {
            // Using fresh opponent
            if (selectedPhotoIndex === 0) {
              setCurrentPair([selectedPhoto, freshOpponent]);
            } else {
              setCurrentPair([freshOpponent, selectedPhoto]);
            }
          } else {
            const newOpponent = getNewOpponent(selectedPhoto, photos, usedOpponentIds);

            if (newOpponent) {
              if (selectedPhotoIndex === 0) {
                setCurrentPair([selectedPhoto, newOpponent]);
              } else {
                setCurrentPair([newOpponent, selectedPhoto]);
              }
            } else {
              const pair = getRandomPair(photos, [], [...selections, { selectedId: selectedPhoto.id, rejectedId: rejectedPhoto.id }], selectedPhoto);
              if (pair) {
                setCurrentPair(pair);
              } else {
                const newPair = getRandomPair(photos, [], [...selections, { selectedId: selectedPhoto.id, rejectedId: rejectedPhoto.id }]);
                if (newPair) {
                  setCurrentPair(newPair);
                }
              }
            }
          }
        } catch (error) {
          const newOpponent = getNewOpponent(selectedPhoto, photos, usedOpponentIds);
          if (newOpponent) {
            if (selectedPhotoIndex === 0) {
              setCurrentPair([selectedPhoto, newOpponent]);
            } else {
              setCurrentPair([newOpponent, selectedPhoto]);
            }
          }
        } finally {
          setIsLoadingOpponent(false);
        }
      }
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return <Loader />;
  }

  if (!currentPair) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('pick.insufficientPhotos')}</Text>
          <Button
            title={t('pick.backToHome')}
            onPress={handleBackPress}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <BlurBackground>
      <SafeAreaView style={styles.safeArea}>
        {isLandscape ? (
          <View style={styles.landscapeContainer}>
            <Animated.View
              style={[
                styles.landscapePhotosContainer,
                { transform: [{ scale: animatedValue }] }
              ]}
            >
              <PhotoCard
                photo={currentPair[0]}
                onPress={handlePhotoSelection}
                style={[styles.landscapePhoto, styles.leftPhoto]}
                isLoading={isLoadingOpponent && currentWinner && currentPair[0].id !== currentWinner.id}
              />
              <PhotoCard
                photo={currentPair[1]}
                onPress={handlePhotoSelection}
                style={[styles.landscapePhoto, styles.rightPhoto]}
                isLoading={isLoadingOpponent && currentWinner && currentPair[1].id !== currentWinner.id}
              />
            </Animated.View>

            <View style={styles.landscapeOverlay}>
              <View style={styles.landscapeHeader}>
                <Button
                  title="←"
                  onPress={handleBackPress}
                  variant="outline"
                  size="small"
                  style={styles.landscapeBackButton}
                  textStyle={styles.backButtonText}
                />
                <View style={styles.headerCenter}>
                  {usingTestData && (
                    <Text style={styles.testDataIndicator}>{t('app.demo')}</Text>
                  )}
                  <Text style={styles.landscapeCounter}>
                    {t('pick.counter', { current: selections.length + 1, total: maxSelections })}
                  </Text>
                </View>
              </View>

              <View style={styles.landscapeVS}>
                <Text style={styles.landscapeVSText}>{t('pick.vs')}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.portraitContainer}>
            <View style={styles.portraitHeader}>
              <Button
                title="←"
                onPress={handleBackPress}
                variant="outline"
                size="small"
                style={styles.portraitBackButton}
                textStyle={styles.backButtonText}
              />
              <View style={styles.headerCenter}>
                {usingTestData && (
                  <Text style={styles.testDataIndicator}>{t('app.demo')}</Text>
                )}
                <Text style={styles.portraitCounter}>
                  {t('pick.counter', { current: selections.length + 1, total: maxSelections })}
                </Text>
              </View>
            </View>

            <Animated.View
              style={[
                styles.portraitPhotosContainer,
                { transform: [{ scale: animatedValue }] }
              ]}
            >
              <PhotoCard
                photo={currentPair[0]}
                onPress={handlePhotoSelection}
                style={[styles.portraitPhoto, styles.topPhoto]}
                isLoading={isLoadingOpponent && currentWinner && currentPair[0].id !== currentWinner.id}
              />

              <PhotoCard
                photo={currentPair[1]}
                onPress={handlePhotoSelection}
                style={[styles.portraitPhoto, styles.bottomPhoto]}
                isLoading={isLoadingOpponent && currentWinner && currentPair[1].id !== currentWinner.id}
              />
            </Animated.View>
            <View style={styles.portraitVS}>
              <Text style={styles.portraitVSText}>{t('pick.vs')}</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </BlurBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.margin,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin / 2,
  },
  subtitle: {
    fontSize: SIZES.base,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  photosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  photoCard: {
    flex: 1,
    height: 350,
  },
  vsContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.margin,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  vsText: {
    color: COLORS.surface,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.margin,
  },
  selectionCount: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: SIZES.margin,
  },
  backButton: {
    alignSelf: 'stretch',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  emptyText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },

  landscapeContainer: {
    flex: 1,
    position: 'relative',
  },
  landscapePhotosContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: SIZES.marginLg,
    paddingHorizontal: SIZES.padding,
    gap: SIZES.margin,
  },
  landscapePhoto: {
    flex: 1,
    height: '100%',
    borderRadius: 0,
  },
  leftPhoto: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightPhoto: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  landscapeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.marginLg,
    pointerEvents: 'box-none',
  },
  landscapeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.margin,
    paddingTop: SIZES.margin / 2,
    height: 56,
  },
  landscapeTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.surface,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  landscapeCounter: {
    marginTop: -50,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.surface,
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: 60,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    lineHeight: 50,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  landscapeVS: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 60,
    height: 60,
    transform: [{ translateX: -10 }, { translateY: 0 }],
    borderRadius: 30,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  landscapeVSText: {
    color: COLORS.surface,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  landscapeBackButton: {
    marginTop: -25,
    width: 60,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: Platform.OS === 'android' ? -10 : 3,
  },
  portraitContainer: {
    flex: 1,
    position: 'relative',
  },
  portraitPhotosContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 100,
  },
  portraitPhoto: {
    flex: 1,
    width: '100%',
    borderRadius: 0,
  },
  topPhoto: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottomPhoto: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  portraitHeader: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.margin,
    paddingVertical: SIZES.margin,
    zIndex: 10,
  },
  portraitTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.surface,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  portraitCounter: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.surface,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: 60,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    lineHeight: 50,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  portraitVS: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }],
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  portraitVSText: {
    color: COLORS.surface,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  portraitBackButton: {
    width: 60,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  portraitContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portraitMainText: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.surface,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerCenter: {
    alignItems: 'center',
  },
  testDataIndicator: {
    color: '#FFA500',
    fontSize: SIZES.small,
    fontWeight: '600',
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 2,
  },
});

export default PickScreen;
