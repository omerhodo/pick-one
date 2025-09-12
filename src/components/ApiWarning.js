import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from '../i18n/context';
import { COLORS, SIZES } from '../utils/constants';

const ApiWarning = ({ visible, onDismiss, usingTestData }) => {
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.warningBox}>
        <Text style={styles.warningIcon}>⚠️</Text>
        <Text style={styles.title}>{t('apiWarning.title')}</Text>
        <Text style={styles.message}>
          {usingTestData
            ? t('apiWarning.messageWithTestData')
            : t('apiWarning.messageWithoutData')
          }
        </Text>
        <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
          <Text style={styles.dismissText}>{t('apiWarning.dismiss')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    zIndex: 1000,
  },
  warningBox: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
    maxWidth: 300,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA500',
  },
  warningIcon: {
    fontSize: 32,
    marginBottom: SIZES.margin,
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
    textAlign: 'center',
  },
  message: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SIZES.margin * 1.5,
  },
  dismissButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.margin,
    borderRadius: SIZES.radius / 2,
  },
  dismissText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
});

export default ApiWarning;
