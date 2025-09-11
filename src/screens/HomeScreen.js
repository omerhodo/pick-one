import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BlurBackground from '../components/BlurBackground';
import Button from '../components/Button';
import { useGame } from '../context/GameContext';
import { COLORS, SIZES } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const { startGame, stats, selections } = useGame();

  const handleStartGame = () => {
    startGame();
    navigation.navigate('PickScreen');
  };

  return (
    <BlurBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Seç Birini</Text>
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
    marginBottom: SIZES.margin * 3,
    flex: 1,
    justifyContent: 'center',
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
});

export default HomeScreen;
