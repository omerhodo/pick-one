import { forwardRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';
import RadioButton from './RadioButton';

const SelectorGroup = forwardRef(({ title, options, selectedValue, onSelect, style, horizontal = false, buttonWidth = 'auto' }, ref) => {
  const renderOptions = () => {
    const buttonStyle = buttonWidth !== 'auto' ? { width: buttonWidth } : {};

    if (horizontal) {
      return (
        <ScrollView
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContainer}
          style={styles.scrollView}
          contentInset={{ left: 0, right: 0 }}
          contentOffset={{ x: 0, y: 0 }}
        >
          {options.map((option, index) => (
            <RadioButton
              key={option.value}
              selected={selectedValue === option.value}
              onPress={() => onSelect(option.value)}
              style={[
                styles.horizontalOption,
                buttonStyle,
                index === 0 && styles.firstOption,
                index === options.length - 1 && styles.lastOption
              ]}
            >
              {option.label}
            </RadioButton>
          ))}
        </ScrollView>
      );
    }

    return (
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            selected={selectedValue === option.value}
            onPress={() => onSelect(option.value)}
            style={[styles.option, buttonStyle]}
          >
            {option.label}
          </RadioButton>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {renderOptions()}
    </View>
  );
});

SelectorGroup.displayName = 'SelectorGroup';

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.margin * 2,
    width: '100%',
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
  },
  scrollView: {
    maxHeight: 60,
    width: '100%',
  },
  horizontalContainer: {
    paddingLeft: SIZES.margin,
    paddingRight: 0,
    gap: SIZES.margin * 0.6,
    alignItems: 'center',
  },
  horizontalOption: {
    flex: 0,
    paddingHorizontal: SIZES.margin * 0.6,
  },
});

export default SelectorGroup;
