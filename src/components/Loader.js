import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../utils/constants';

const Loader = ({ size = 'large', color = COLORS.primary, style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
