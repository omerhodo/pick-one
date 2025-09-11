import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GameProvider } from './src/context/GameContext';
import HomeScreen from './src/screens/HomeScreen';
import PickScreen from './src/screens/PickScreen';
import WinnerScreen from './src/screens/WinnerScreen';
import { COLORS } from './src/utils/constants';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
