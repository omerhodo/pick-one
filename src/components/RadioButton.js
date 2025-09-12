import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';

const RadioButton = ({ selected, onPress, children, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.radioButton,
        selected && styles.radioButtonSelected,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.radioText,
        selected && styles.radioTextSelected,
        textStyle
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    paddingVertical: SIZES.margin * 0.8,
    paddingHorizontal: SIZES.margin * 1.2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  radioText: {
    color: COLORS.surface,
    fontSize: SIZES.medium,
    fontWeight: '500',
    opacity: 0.8,
    textAlign: 'center',
  },
  radioTextSelected: {
    color: COLORS.white,
    fontWeight: '600',
    opacity: 1,
  },
});

export default RadioButton;
