import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { COLORS, SIZES } from '../utils/constants';

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    onPress?.();
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return {
          height: 40,
          paddingHorizontal: 16,
        };
      case 'large':
        return {
          height: 56,
          paddingHorizontal: 24,
        };
      default:
        return {
          height: 48,
          paddingHorizontal: 20,
        };
    }
  };

  const getBackgroundColor = () => {
    if (disabled) return COLORS.border;

    switch (variant) {
      case 'secondary':
        return COLORS.surface;
      case 'outline':
        return 'transparent';
      default:
        return COLORS.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.surface;

    switch (variant) {
      case 'secondary':
        return COLORS.text;
      case 'outline':
        return COLORS.primary;
      default:
        return COLORS.surface;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return SIZES.small + 2;
      case 'large':
        return SIZES.base + 2;
      default:
        return SIZES.base;
    }
  };

  const buttonSizeStyle = getButtonSize();
  const backgroundColor = getBackgroundColor();
  const textColor = getTextColor();
  const textSize = getTextSize();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled || loading}
      style={[
        styles.container,
        buttonSizeStyle,
        { backgroundColor },
        variant === 'outline' && styles.outlineButton,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: textColor,
              fontSize: textSize,
            },
            textStyle,
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignSelf: 'stretch',
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Button;
