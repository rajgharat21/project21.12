import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'mr' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  en: {
    'header.title': 'Maharashtra Government',
    'header.subtitle': 'E-Ration Card Portal',
    'nav.dashboard': 'Dashboard',
    'nav.rationCard': 'Ration Card',
    'nav.applications': 'Applications',
    'nav.notifications': 'Notifications',
    'nav.profile': 'Profile',
    'login.title': 'Maharashtra Government',
    'login.subtitle': 'E-Ration Card Portal',
    'login.aadhaarLabel': 'Aadhaar Number',
    'login.sendOtp': 'Send OTP',
    'login.verifyLogin': 'Verify & Login',
    'dashboard.welcome': 'Welcome Back!',
    'dashboard.familyMembers': 'Family Members',
    'dashboard.cardType': 'Card Type',
    'dashboard.monthlyQuota': 'Monthly Quota',
    'common.loading': 'Loading...',
  },
  mr: {
    'header.title': 'महाराष्ट्र सरकार',
    'header.subtitle': 'ई-राशन कार्ड पोर्टल',
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.rationCard': 'राशन कार्ड',
    'nav.applications': 'अर्ज',
    'nav.notifications': 'सूचना',
    'nav.profile': 'प्रोफाइल',
    'login.title': 'महाराष्ट्र सरकार',
    'login.subtitle': 'ई-राशन कार्ड पोर्टल',
    'login.aadhaarLabel': 'आधार क्रमांक',
    'login.sendOtp': 'ओटीपी पाठवा',
    'login.verifyLogin': 'सत्यापन आणि लॉगिन',
    'dashboard.welcome': 'स्वागत आहे!',
    'dashboard.familyMembers': 'कुटुंबातील सदस्य',
    'dashboard.cardType': 'कार्डचा प्रकार',
    'dashboard.monthlyQuota': 'मासिक वाटा',
    'common.loading': 'लोड होत आहे...',
  },
  hi: {
    'header.title': 'महाराष्ट्र सरकार',
    'header.subtitle': 'ई-राशन कार्ड पोर्टल',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.rationCard': 'राशन कार्ड',
    'nav.applications': 'आवेदन',
    'nav.notifications': 'सूचनाएं',
    'nav.profile': 'प्रोफाइल',
    'login.title': 'महाराष्ट्र सरकार',
    'login.subtitle': 'ई-राशन कार्ड पोर्टल',
    'login.aadhaarLabel': 'आधार संख्या',
    'login.sendOtp': 'ओटीपी भेजें',
    'login.verifyLogin': 'सत्यापन और लॉगिन',
    'dashboard.welcome': 'स्वागत है!',
    'dashboard.familyMembers': 'परिवारिक सदस्य',
    'dashboard.cardType': 'कार्ड प्रकार',
    'dashboard.monthlyQuota': 'मासिक कोटा',
    'common.loading': 'लोड हो रहा है...',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const changeLanguage = async (lang: Language) => {
    setLanguage(lang);
    await AsyncStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};