import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiWarning from '../components/ApiWarning';
import BlurBackground from '../components/BlurBackground';
import Button from '../components/Button';
import SelectorGroup from '../components/SelectorGroup';
import { useGame } from '../context/GameContext';
import { COLORS, SIZES } from '../utils/constants';

const GENDER_OPTIONS = [
  { value: null, label: 'Hepsi' },
  { value: 2, label: 'Erkek' },
  { value: 1, label: 'Kadın' },
];

const SELECTION_COUNT_OPTIONS = [
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
];

const HomeScreen = ({ navigation }) => {
  const { startGame, stats, selections, apiWarning, usingTestData, dismissApiWarning, resetGenderFilter, clearCache } = useGame();
  const isFirstMount = useRef(true);
  const previousGender = useRef(null);
  const isCacheClearingRef = useRef(false);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCount, setSelectedCount] = useState(10);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  useEffect(() => {
    if (!isFirstMount.current && !isCacheClearingRef.current && previousGender.current !== selectedGender) {
      console.log(`🎯 Gender değişti: ${previousGender.current} → ${selectedGender}, cache temizleniyor...`);

      isCacheClearingRef.current = true;
      clearCache();
      previousGender.current = selectedGender;

      setTimeout(() => {
        isCacheClearingRef.current = false;
      }, 100);
    }
  }, [selectedGender]);

  useFocusEffect(
    useCallback(() => {
      if (!isFirstMount.current && !isCacheClearingRef.current) {
        console.log('🏠 HomeScreen\'e geri dönüldü, TÜM CACHE temizleniyor...');

        isCacheClearingRef.current = true;
        clearCache();
        setSelectedGender(null);
        previousGender.current = null;

        setTimeout(() => {
          isCacheClearingRef.current = false;
        }, 100);
      }
    }, [])
  );

  const handleStartGame = () => {
    const gameSettings = {
      gender: selectedGender,
      maxSelections: selectedCount,
    };

    startGame(gameSettings);
    navigation.navigate('PickScreen', {
      maxSelections: selectedCount,
      gender: selectedGender
    });
  };

  return (
    <BlurBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Seç Birini</Text>
            {usingTestData && (
              <View style={styles.testDataBadge}>
                <Text style={styles.testDataText}>Demo Modu</Text>
              </View>
            )}
          </View>

          <View style={styles.selectorsContainer}>
            <SelectorGroup
              title="Cinsiyet Seçimi"
              options={GENDER_OPTIONS}
              selectedValue={selectedGender}
              onSelect={setSelectedGender}
            />

            <SelectorGroup
              title="Kaç Seçim?"
              options={SELECTION_COUNT_OPTIONS}
              selectedValue={selectedCount}
              onSelect={setSelectedCount}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Oyuna Başla"
              onPress={handleStartGame}
              size="large"
              style={styles.button}
            />
          </View>
        </View>

        <ApiWarning
          visible={apiWarning}
          usingTestData={usingTestData}
          onDismiss={dismissApiWarning}
        />
      </SafeAreaView>
    </BlurBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
  },
  selectorsContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: SIZES.padding,
  },
  title: {
    fontSize: SIZES.xl * 1.5,
    fontWeight: 'bold',
    color: COLORS.surface,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.surface,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SIZES.margin * 3,
  },
  stat: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: SIZES.margin,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.margin,
  },
  statNumber: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.surface,
    opacity: 0.8,
    marginTop: 4,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 50,
  },
  button: {
    marginBottom: SIZES.margin,
  },
  testDataBadge: {
    backgroundColor: 'rgba(255, 165, 0, 0.9)',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.margin / 2,
    borderRadius: SIZES.radius / 2,
    marginTop: SIZES.margin,
  },
  testDataText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
});

export default HomeScreen;
