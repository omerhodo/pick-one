import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';
import RadioButton from './RadioButton';

const SelectorGroup = ({ title, options, selectedValue, onSelect, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            selected={selectedValue === option.value}
            onPress={() => onSelect(option.value)}
            style={styles.option}
          >
            {option.label}
          </RadioButton>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.margin * 2,
  },
  title: {
    color: COLORS.surface,
    fontSize: SIZES.h3,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: SIZES.margin,
  },
  option: {
    flex: 0,
    minWidth: 80,
  },
});

export default SelectorGroup;
