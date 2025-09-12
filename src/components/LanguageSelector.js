import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAvailableLanguages } from '../i18n';
import { useI18n } from '../i18n/context';
import { COLORS, SIZES } from '../utils/constants';

const LanguageSelector = ({ style }) => {
  const { language, changeLanguage, isLoading, t } = useI18n();
  const availableLanguages = getAvailableLanguages();

  const handleLanguageChange = async (newLanguage) => {
    if (newLanguage !== language && !isLoading) {
      await changeLanguage(newLanguage);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{t('settings.language')}</Text>
      <View style={styles.languageButtons}>
        {availableLanguages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              language === lang.code && styles.languageButtonActive,
              isLoading && styles.languageButtonDisabled
            ]}
            onPress={() => handleLanguageChange(lang.code)}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            <Text
              style={[
                styles.languageName,
                language === lang.code && styles.languageNameActive
              ]}
            >
              {lang.native}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  label: {
    color: COLORS.surface,
    fontSize: SIZES.medium,
    fontWeight: '600',
    marginBottom: SIZES.margin,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: SIZES.margin,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.margin,
    paddingVertical: SIZES.margin * 0.6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    gap: SIZES.margin * 0.5,
  },
  languageButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  languageButtonDisabled: {
    opacity: 0.5,
  },
  flag: {
    fontSize: SIZES.medium,
  },
  languageName: {
    color: COLORS.surface,
    fontSize: SIZES.small + 1,
    fontWeight: '500',
    opacity: 0.8,
  },
  languageNameActive: {
    color: COLORS.white,
    fontWeight: '600',
    opacity: 1,
  },
});

export default LanguageSelector;
