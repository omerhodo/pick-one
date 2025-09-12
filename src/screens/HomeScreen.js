import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiWarning from '../components/ApiWarning';
import BlurBackground from '../components/BlurBackground';
import Button from '../components/Button';
import LanguageSelector from '../components/LanguageSelector';
import SelectorGroup from '../components/SelectorGroup';
import { UI } from '../config/categoryChoices';
import { useGame } from '../context/GameContext';
import { useTranslation } from '../i18n/context';
import { COLORS, SIZES } from '../utils/constants';

const getCategoryOptions = (t) => UI.getHomepageOptions(t);

const SELECTION_COUNT_OPTIONS = [
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
];

const HomeScreen = ({ navigation }) => {
  const { startGame, apiWarning, usingTestData, dismissApiWarning, clearCache } = useGame();
  const { t } = useTranslation();
  const isFirstMount = useRef(true);
  const previousCategory = useRef(null);
  const isCacheClearingRef = useRef(false);
  const categorySelectorRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCount, setSelectedCount] = useState(10);
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  // Get category options with current translation function
  const categoryOptions = getCategoryOptions(t);

  // Check if screen is in landscape mode
  const isLandscape = screenData.width > screenData.height;

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
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
          <View style={[styles.header, isLandscape && styles.headerLandscape]}>
            <Text style={styles.title}>{t('home.title')}</Text>
            {usingTestData && (
              <View style={styles.testDataBadge}>
                <Text style={styles.testDataText}>{t('app.demoMode')}</Text>
              </View>
            )}
          </View>

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.selectorsContainer}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            <LanguageSelector style={styles.languageSelector} />

            <SelectorGroup
              ref={categorySelectorRef}
              title={t('home.categorySelection')}
              options={categoryOptions}
              selectedValue={selectedCategory}
              onSelect={setSelectedCategory}
              horizontal={true}
            />

            <SelectorGroup
              title={t('home.selectionCount')}
              options={SELECTION_COUNT_OPTIONS}
              selectedValue={selectedCount}
              onSelect={setSelectedCount}
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              title={t('home.startSelection')}
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
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.margin,
    paddingBottom: SIZES.margin * 2,
  },
  headerLandscape: {
    paddingBottom: SIZES.margin * 0.5, // Reduced margin for landscape mode
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  selectorsContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.margin * 2,
    minHeight: 300, // Minimum height to ensure content is accessible
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
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.margin * 2,
    paddingTop: SIZES.margin,
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
  languageSelector: {
    marginBottom: SIZES.margin * 2,
    width: '100%',
  },
});

export default HomeScreen;
