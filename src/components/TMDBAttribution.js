import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from '../i18n/context';

const TMDBAttribution = ({ style, variant = 'default' }) => {
  const { t } = useTranslation();

  const handlePress = () => {
    Linking.openURL('https://www.themoviedb.org/');
  };

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={[styles.compactContainer, style]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.compactText}>
          {t('attribution.poweredBy')} TMDB
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.text}>
          {t('attribution.poweredBy')}
        </Text>
        <View style={styles.logoContainer}>
          <Text style={styles.tmdbText}>TMDB</Text>
        </View>
      </View>
      <Text style={styles.disclaimerText}>
        {t('attribution.disclaimer')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 6,
  },
  logoContainer: {
    backgroundColor: '#01b4e4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tmdbText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  disclaimerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
  compactContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  compactText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontWeight: '500',
  },
});

export default TMDBAttribution;
