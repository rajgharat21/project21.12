import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'mr' as Language, name: 'Marathi', nativeName: 'मराठी' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(true)}
      >
        <Icon name="language" size={20} color="#6b7280" />
        <Text style={styles.buttonText}>{currentLanguage?.nativeName}</Text>
        <Icon name="keyboard-arrow-down" size={16} color="#6b7280" />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  language === lang.code && styles.selectedOption
                ]}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <View style={styles.languageInfo}>
                  <Text style={styles.nativeName}>{lang.nativeName}</Text>
                  <Text style={styles.englishName}>{lang.name}</Text>
                </View>
                {language === lang.code && (
                  <Icon name="check" size={20} color="#2563eb" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    marginRight: 8,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginHorizontal: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '80%',
    maxWidth: 300,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  selectedOption: {
    backgroundColor: '#dbeafe',
  },
  languageInfo: {
    flex: 1,
  },
  nativeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  englishName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});

export default LanguageSwitcher;