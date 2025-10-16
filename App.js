import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GameProvider } from './src/context/GameContext';
import { I18nProvider } from './src/i18n/context';
import HomeScreen from './src/screens/HomeScreen';
import PickScreen from './src/screens/PickScreen';
import WinnerScreen from './src/screens/WinnerScreen';
import { COLORS } from './src/utils/constants';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Check if we're running in Expo Go
    const isExpoGo = Constants.appOwnership === 'expo';

    // Only initialize Google Mobile Ads in development builds, not in Expo Go
    if (!isExpoGo) {
      try {
        const mobileAds = require('react-native-google-mobile-ads').default;
        mobileAds()
          .initialize()
          .then(adapterStatuses => {
            // Initialization complete
            console.log('Google Mobile Ads initialized');
          })
          .catch(error => {
            console.error('Google Mobile Ads initialization error:', error);
          });
      } catch (error) {
        console.log('Google Mobile Ads not available:', error.message);
      }
    }
  }, []);

  return (
    <SafeAreaProvider>
      <I18nProvider>
        <GameProvider>
          <NavigationContainer>
            <StatusBar style="light" backgroundColor={COLORS.primary} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: COLORS.background },
              cardStyleInterpolator: ({ current, next, layouts }) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                        }),
                      },
                    ],
                  },
                };
              },
            }}
          >
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: 'Ana Sayfa' }}
            />
            <Stack.Screen
              name="PickScreen"
              component={PickScreen}
              options={{ title: 'Seç Birini' }}
            />
            <Stack.Screen
              name="WinnerScreen"
              component={WinnerScreen}
              options={{ title: 'Kazanan' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GameProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}
