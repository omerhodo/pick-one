import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiWarning from '../components/ApiWarning';
import BlurBackground from '../components/BlurBackground';
import Button from '../components/Button';
import SelectorGroup from '../components/SelectorGroup';
import { UI } from '../config/categoryChoices';
import { useGame } from '../context/GameContext';
import { COLORS, SIZES } from '../utils/constants';

// Kategori konfigürasyonundan UI seçeneklerini al
const CATEGORY_OPTIONS = UI.getHomepageOptions();

const SELECTION_COUNT_OPTIONS = [
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
];

const HomeScreen = ({ navigation }) => {
  const { startGame, apiWarning, usingTestData, dismissApiWarning, clearCache } = useGame();
  const isFirstMount = useRef(true);
  const previousCategory = useRef(null);
  const isCacheClearingRef = useRef(false);
  const categorySelectorRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCount, setSelectedCount] = useState(10);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  useEffect(() => {
    if (!isFirstMount.current && !isCacheClearingRef.current && previousCategory.current !== selectedCategory) {
      console.log(`🎯 Kategori değişti: ${previousCategory.current} → ${selectedCategory}, cache temizleniyor...`);

      isCacheClearingRef.current = true;
      clearCache();
      previousCategory.current = selectedCategory;

      setTimeout(() => {
        isCacheClearingRef.current = false;
      }, 100);
    }
  }, [selectedCategory]);

  useFocusEffect(
    useCallback(() => {
      if (!isFirstMount.current && !isCacheClearingRef.current) {
        console.log('🏠 HomeScreen\'e geri dönüldü, TÜM CACHE temizleniyor...');

        isCacheClearingRef.current = true;
        clearCache();
        setSelectedCategory(null);
        previousCategory.current = null;

        // Kategori scroll alanını başa kaydır
        if (categorySelectorRef.current) {
          categorySelectorRef.current.scrollTo({ x: 0, animated: true });
        }

        setTimeout(() => {
          isCacheClearingRef.current = false;
        }, 100);
      }
    }, [])
  );

  const handleStartGame = () => {
    console.log(`🏠 HomeScreen.handleStartGame çağrıldı:`);
    console.log(`   selectedCategory: ${selectedCategory}`);
    console.log(`   selectedCount: ${selectedCount}`);

    const gameSettings = {
      category: selectedCategory,
      maxSelections: selectedCount,
    };

    console.log(`🎮 startGame çağrılacak, gameSettings:`, gameSettings);
    startGame(gameSettings);

    console.log(`🗺️  PickScreen'e navigate edilecek`);
    navigation.navigate('PickScreen', {
      maxSelections: selectedCount,
      category: selectedCategory
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
              ref={categorySelectorRef}
              title="Kategori Seçimi"
              options={CATEGORY_OPTIONS}
              selectedValue={selectedCategory}
              onSelect={setSelectedCategory}
              horizontal={true}
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
              title="Seçime Başla"
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
    paddingHorizontal: SIZES.padding,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
  },
  selectorsContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 0,
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
