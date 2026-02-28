import { useState } from 'react';
import { Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from '../i18n/context';
import { COLORS } from '../utils/constants';

const DataSourcesInfo = ({ style }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const dataSources = [
    {
      name: 'TMDB (The Movie Database)',
      url: 'https://www.themoviedb.org/',
      description: t('dataSources.tmdbDescription'),
      license: t('dataSources.tmdbLicense'),
    },
    {
      name: 'PokeAPI',
      url: 'https://pokeapi.co/',
      description: t('dataSources.pokeapiDescription'),
      license: t('dataSources.pokeapiLicense'),
    },
    {
      name: 'Jikan (MyAnimeList)',
      url: 'https://jikan.moe/',
      description: t('dataSources.jikanDescription'),
      license: t('dataSources.jikanLicense'),
    },
  ];

  return (
    <>
      <TouchableOpacity
        style={[styles.trigger, style]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>ℹ️ {t('dataSources.title')}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{t('dataSources.title')}</Text>

              <Text style={styles.disclaimer}>
                {t('dataSources.mainDisclaimer')}
              </Text>

              {dataSources.map((source, index) => (
                <View key={index} style={styles.sourceCard}>
                  <Text style={styles.sourceName}>{source.name}</Text>
                  <Text style={styles.sourceDescription}>{source.description}</Text>
                  <Text style={styles.sourceLicense}>{source.license}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(source.url)}>
                    <Text style={styles.sourceLink}>{source.url}</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.legalSection}>
                <Text style={styles.legalTitle}>{t('dataSources.legalTitle')}</Text>
                <Text style={styles.legalText}>
                  {t('dataSources.legalText')}
                </Text>
              </View>

              <View style={styles.legalSection}>
                <Text style={styles.legalTitle}>{t('dataSources.trademarkTitle')}</Text>
                <Text style={styles.legalText}>
                  {t('dataSources.trademarkText')}
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>{t('app.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  triggerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    maxHeight: '85%',
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 165, 0, 0.15)',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 165, 0, 0.3)',
    overflow: 'hidden',
  },
  sourceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  sourceName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 6,
  },
  sourceDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
    marginBottom: 4,
  },
  sourceLicense: {
    fontSize: 11,
    color: 'rgba(255, 200, 100, 0.9)',
    lineHeight: 16,
    marginBottom: 6,
    fontStyle: 'italic',
  },
  sourceLink: {
    fontSize: 12,
    color: '#4da6ff',
    textDecorationLine: 'underline',
  },
  legalSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  legalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 6,
  },
  legalText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.65)',
    lineHeight: 18,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default DataSourcesInfo;
