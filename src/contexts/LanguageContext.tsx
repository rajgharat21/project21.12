import React, { createContext, useContext, useState, ReactNode } from 'react';

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
    // Header
    'header.title': 'Maharashtra Government',
    'header.subtitle': 'E-Ration Card Portal',
    'header.logout': 'Logout',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.rationCard': 'Ration Card',
    'nav.applications': 'Applications',
    'nav.internet': 'Internet',
    'nav.notifications': 'Notifications',
    'nav.profile': 'Profile',
    
    // Login
    'login.title': 'Maharashtra Government',
    'login.subtitle': 'E-Ration Card Portal',
    'login.description': 'Secure access to your ration card services',
    'login.phoneLabel': 'Mobile Number',
    'login.phonePlaceholder': '9876543210',
    'login.phoneHelp': 'Enter your 10-digit mobile number linked to Aadhaar',
    'login.findAadhaar': 'Find Aadhaar Card',
    'login.aadhaarFound': 'Aadhaar Card Found',
    'login.aadhaarConfirm': 'Please confirm this is your Aadhaar number:',
    'login.aadhaarLabel': 'Aadhaar Number',
    'login.aadhaarPlaceholder': '1234 5678 9012',
    'login.aadhaarHelp': 'Enter your 12-digit Aadhaar number registered with ration card',
    'login.demoText': 'Demo: Try 9876543210, 8765432109, 7654321098, 6543210987, or 9123456789',
    'login.sendOtp': 'Send OTP',
    'login.otpSent': 'OTP Sent Successfully',
    'login.otpDescription': 'Enter the 6-digit OTP sent to:',
    'login.otpLabel': 'Enter OTP',
    'login.otpPlaceholder': '123456',
    'login.verifyLogin': 'Verify & Login',
    'login.verifying': 'Verifying...',
    'login.changePhone': 'Change Phone Number',
    'login.changeAadhaar': 'Change Aadhaar Number',
    'login.resendOtp': 'Resend OTP',
    'login.securityTitle': 'Secure Authentication',
    'login.securityDescription': 'OTP is sent to your registered mobile number. Your data is encrypted and secure.',
    
    // Dashboard
    'dashboard.welcome': 'Welcome Back!',
    'dashboard.description': 'Your ration card is active and up to date.',
    'dashboard.familyMembers': 'Family Members',
    'dashboard.cardType': 'Card Type',
    'dashboard.validUntil': 'Valid Until',
    'dashboard.cardNumber': 'Card Number',
    'dashboard.monthlyQuota': 'Monthly Quota',
    'dashboard.rice': 'Rice',
    'dashboard.wheat': 'Wheat',
    'dashboard.sugar': 'Sugar',
    'dashboard.kerosene': 'Kerosene',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.rationDistributed': 'Ration distributed for December 2024',
    'dashboard.renewalNotice': 'Card renewal notice sent',
    'dashboard.addressVerification': 'Address verification completed',
    'dashboard.daysAgo': 'days ago',
    'dashboard.weekAgo': 'week ago',
    'dashboard.weeksAgo': 'weeks ago',
    
    // Ration Card
    'rationCard.title': 'Ration Card',
    'rationCard.government': 'Government of Maharashtra',
    'rationCard.cardNumber': 'Card Number',
    'rationCard.headOfFamily': 'Head of Family',
    'rationCard.issued': 'Issued',
    'rationCard.validUntil': 'Valid Until',
    'rationCard.downloadCard': 'Download Card',
    'rationCard.updateDetails': 'Update Details',
    'rationCard.personalInfo': 'Personal Information',
    'rationCard.address': 'Address',
    'rationCard.phone': 'Phone',
    'rationCard.cardType': 'Card Type',
    'rationCard.familyMembers': 'Family Members',
    'rationCard.apl': 'Above Poverty Line',
    'rationCard.bpl': 'Below Poverty Line',
    'rationCard.aay': 'Antyodaya Anna Yojana',
    
    // Applications
    'applications.title': 'Application Status',
    'applications.description': 'Track your submitted applications and requests',
    'applications.newApplication': 'New Application',
    'applications.submitted': 'Submitted',
    'applications.lastUpdated': 'Last Updated',
    'applications.comments': 'Comments',
    'applications.pending': 'Pending',
    'applications.inReview': 'In Review',
    'applications.approved': 'Approved',
    'applications.rejected': 'Rejected',
    'applications.completed': 'Completed',
    'applications.underReview': 'Under Review',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.description': 'Stay updated with your ration card activities',
    'notifications.markAllRead': 'Mark all as read',
    'notifications.markAsRead': 'Mark as read',
    'notifications.noNotifications': 'No notifications yet',
    'notifications.allNotifications': 'All Notifications',
    
    // Profile
    'profile.title': 'Profile Management',
    'profile.description': 'Update your personal information and family member details',
    'profile.personalInfo': 'Personal Information',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'profile.cancel': 'Cancel',
    'profile.fullName': 'Full Name',
    'profile.phoneNumber': 'Phone Number',
    'profile.address': 'Address',
    'profile.email': 'Email (Optional)',
    'profile.emailPlaceholder': 'your.email@example.com',
    'profile.notProvided': 'Not provided',
    'profile.aadhaarNumber': 'Aadhaar Number',
    'profile.aadhaarCannotChange': 'Aadhaar number cannot be changed',
    'profile.familyMembers': 'Family Members',
    'profile.addMember': 'Add Member',
    'profile.addNewMember': 'Add New Family Member',
    'profile.name': 'Name',
    'profile.age': 'Age',
    'profile.relation': 'Relation',
    'profile.selectRelation': 'Select relation',
    'profile.addMemberButton': 'Add Member',
    'profile.editMember': 'Edit member',
    'profile.removeMember': 'Remove member',
    
    // Common
    'common.kg': 'kg',
    'common.liter': 'L',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.language': 'Language',
  },
  
  mr: {
    // Header
    'header.title': 'महाराष्ट्र सरकार',
    'header.subtitle': 'ई-राशन कार्ड पोर्टल',
    'header.logout': 'लॉगआउट',
    
    // Navigation
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.rationCard': 'राशन कार्ड',
    'nav.applications': 'अर्ज',
    'nav.internet': 'इंटरनेट',
    'nav.notifications': 'सूचना',
    'nav.profile': 'प्रोफाइल',
    
    // Login
    'login.title': 'महाराष्ट्र सरकार',
    'login.subtitle': 'ई-राशन कार्ड पोर्टल',
    'login.description': 'तुमच्या राशन कार्ड सेवांमध्ये सुरक्षित प्रवेश',
    'login.phoneLabel': 'मोबाइल नंबर',
    'login.phonePlaceholder': '९८७६५४३२१०',
    'login.phoneHelp': 'आधारशी जोडलेला तुमचा १० अंकी मोबाइल नंबर प्रविष्ट करा',
    'login.findAadhaar': 'आधार कार्ड शोधा',
    'login.aadhaarFound': 'आधार कार्ड सापडले',
    'login.aadhaarConfirm': 'कृपया पुष्टी करा की हा तुमचा आधार क्रमांक आहे:',
    'login.aadhaarLabel': 'आधार क्रमांक',
    'login.aadhaarPlaceholder': '१२३४ ५६७८ ९०१२',
    'login.aadhaarHelp': 'राशन कार्डासह नोंदणीकृत तुमचा १२ अंकी आधार क्रमांक प्रविष्ट करा',
    'login.demoText': 'डेमो: ९८७६५४३२१०, ८७६५४३२१०९, ७६५४३२१०९८, ६५४३२१०९८७, किंवा ९१२३४५६७८९ वापरून पहा',
    'login.sendOtp': 'ओटीपी पाठवा',
    'login.otpSent': 'ओटीपी यशस्वीरित्या पाठवला',
    'login.otpDescription': 'या नंबरवर पाठवलेला ६ अंकी ओटीपी प्रविष्ट करा:',
    'login.otpLabel': 'ओटीपी प्रविष्ट करा',
    'login.otpPlaceholder': '१२३४५६',
    'login.verifyLogin': 'सत्यापन आणि लॉगिन',
    'login.verifying': 'सत्यापन करत आहे...',
    'login.changePhone': 'फोन नंबर बदला',
    'login.changeAadhaar': 'आधार क्रमांक बदला',
    'login.resendOtp': 'ओटीपी पुन्हा पाठवा',
    'login.securityTitle': 'सुरक्षित प्रमाणीकरण',
    'login.securityDescription': 'ओटीपी तुमच्या नोंदणीकृत मोबाइल नंबरवर पाठवला जातो. तुमचा डेटा एन्क्रिप्टेड आणि सुरक्षित आहे.',
    
    // Dashboard
    'dashboard.welcome': 'स्वागत आहे!',
    'dashboard.description': 'तुमचे राशन कार्ड सक्रिय आणि अद्ययावत आहे.',
    'dashboard.familyMembers': 'कुटुंबातील सदस्य',
    'dashboard.cardType': 'कार्डचा प्रकार',
    'dashboard.validUntil': 'वैध मुदत',
    'dashboard.cardNumber': 'कार्ड क्रमांक',
    'dashboard.monthlyQuota': 'मासिक वाटा',
    'dashboard.rice': 'तांदूळ',
    'dashboard.wheat': 'गहू',
    'dashboard.sugar': 'साखर',
    'dashboard.kerosene': 'रॉकेल',
    'dashboard.recentActivity': 'अलीकडील क्रियाकलाप',
    'dashboard.rationDistributed': 'डिसेंबर २०२४ साठी राशन वितरित',
    'dashboard.renewalNotice': 'कार्ड नूतनीकरण सूचना पाठवली',
    'dashboard.addressVerification': 'पत्ता सत्यापन पूर्ण',
    'dashboard.daysAgo': 'दिवसांपूर्वी',
    'dashboard.weekAgo': 'आठवड्यापूर्वी',
    'dashboard.weeksAgo': 'आठवड्यांपूर्वी',
    
    // Ration Card
    'rationCard.title': 'राशन कार्ड',
    'rationCard.government': 'महाराष्ट्र सरकार',
    'rationCard.cardNumber': 'कार्ड क्रमांक',
    'rationCard.headOfFamily': 'कुटुंबप्रमुख',
    'rationCard.issued': 'जारी केले',
    'rationCard.validUntil': 'वैध मुदत',
    'rationCard.downloadCard': 'कार्ड डाउनलोड करा',
    'rationCard.updateDetails': 'तपशील अपडेट करा',
    'rationCard.personalInfo': 'वैयक्तिक माहिती',
    'rationCard.address': 'पत्ता',
    'rationCard.phone': 'फोन',
    'rationCard.cardType': 'कार्डचा प्रकार',
    'rationCard.familyMembers': 'कुटुंबातील सदस्य',
    'rationCard.apl': 'दारिद्र्यरेषेवरील',
    'rationCard.bpl': 'दारिद्र्यरेषेखालील',
    'rationCard.aay': 'अंत्योदय अन्न योजना',
    
    // Applications
    'applications.title': 'अर्जाची स्थिती',
    'applications.description': 'तुमच्या सबमिट केलेल्या अर्जांचा आणि विनंत्यांचा मागोवा घ्या',
    'applications.newApplication': 'नवीन अर्ज',
    'applications.submitted': 'सबमिट केले',
    'applications.lastUpdated': 'शेवटचे अपडेट',
    'applications.comments': 'टिप्पण्या',
    'applications.pending': 'प्रलंबित',
    'applications.inReview': 'पुनरावलोकनात',
    'applications.approved': 'मंजूर',
    'applications.rejected': 'नाकारले',
    'applications.completed': 'पूर्ण',
    'applications.underReview': 'पुनरावलोकनाधीन',
    
    // Notifications
    'notifications.title': 'सूचना',
    'notifications.description': 'तुमच्या राशन कार्ड क्रियाकलापांची माहिती मिळवा',
    'notifications.markAllRead': 'सर्व वाचले म्हणून चिन्हांकित करा',
    'notifications.markAsRead': 'वाचले म्हणून चिन्हांकित करा',
    'notifications.noNotifications': 'अद्याप कोणत्या सूचना नाहीत',
    'notifications.allNotifications': 'सर्व सूचना',
    
    // Profile
    'profile.title': 'प्रोफाइल व्यवस्थापन',
    'profile.description': 'तुमची वैयक्तिक माहिती आणि कुटुंबातील सदस्यांचे तपशील अपडेट करा',
    'profile.personalInfo': 'वैयक्तिक माहिती',
    'profile.edit': 'संपादित करा',
    'profile.save': 'जतन करा',
    'profile.cancel': 'रद्द करा',
    'profile.fullName': 'पूर्ण नाव',
    'profile.phoneNumber': 'फोन नंबर',
    'profile.address': 'पत्ता',
    'profile.email': 'ईमेल (पर्यायी)',
    'profile.emailPlaceholder': 'your.email@example.com',
    'profile.notProvided': 'प्रदान केले नाही',
    'profile.aadhaarNumber': 'आधार क्रमांक',
    'profile.aadhaarCannotChange': 'आधार क्रमांक बदलता येत नाही',
    'profile.familyMembers': 'कुटुंबातील सदस्य',
    'profile.addMember': 'सदस्य जोडा',
    'profile.addNewMember': 'नवीन कुटुंब सदस्य जोडा',
    'profile.name': 'नाव',
    'profile.age': 'वय',
    'profile.relation': 'नाते',
    'profile.selectRelation': 'नाते निवडा',
    'profile.addMemberButton': 'सदस्य जोडा',
    'profile.editMember': 'सदस्य संपादित करा',
    'profile.removeMember': 'सदस्य काढा',
    
    // Common
    'common.kg': 'किलो',
    'common.liter': 'लिटर',
    'common.loading': 'लोड होत आहे...',
    'common.error': 'त्रुटी',
    'common.success': 'यश',
    'common.close': 'बंद करा',
    'common.language': 'भाषा',
  },
  
  hi: {
    // Header
    'header.title': 'महाराष्ट्र सरकार',
    'header.subtitle': 'ई-राशन कार्ड पोर्टल',
    'header.logout': 'लॉगआउट',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.rationCard': 'राशन कार्ड',
    'nav.applications': 'आवेदन',
    'nav.internet': 'इंटरनेट',
    'nav.notifications': 'सूचनाएं',
    'nav.profile': 'प्रोफाइल',
    
    // Login
    'login.title': 'महाराष्ट्र सरकार',
    'login.subtitle': 'ई-राशन कार्ड पोर्टल',
    'login.description': 'राशन कार्ड सेवाओं तक सुरक्षित पहुंच',
    'login.phoneLabel': 'मोबाइल नंबर',
    'login.phonePlaceholder': '९८७६५४३२१०',
    'login.phoneHelp': 'आधार से जुड़ा अपना 10 अंकीय मोबाइल नंबर दर्ज करें',
    'login.findAadhaar': 'आधार कार्ड खोजें',
    'login.aadhaarFound': 'आधार कार्ड मिल गया',
    'login.aadhaarConfirm': 'कृपया पुष्टि करें कि यह आपका आधार नंबर है:',
    'login.aadhaarLabel': 'आधार संख्या',
    'login.aadhaarPlaceholder': '१२३४ ५६७८ ९०१२',
    'login.aadhaarHelp': 'राशन कार्ड के साथ पंजीकृत अपना 12 अंकीय आधार नंबर दर्ज करें',
    'login.demoText': 'डेमो: ९८७६५४३२१०, ८७६५४३२१०९, ७६५४३२१०९८, ६५४३२१०९८७, या ९१२३४५६७८९ आज़माएं',
    'login.sendOtp': 'ओटीपी भेजें',
    'login.otpSent': 'ओटीपी सफलतापूर्वक भेजा गया',
    'login.otpDescription': 'इस नंबर पर भेजा गया 6 अंकीय ओटीपी दर्ज करें:',
    'login.otpLabel': 'ओटीपी दर्ज करें',
    'login.otpPlaceholder': '१२३४५६',
    'login.verifyLogin': 'सत्यापन और लॉगिन',
    'login.verifying': 'सत्यापन कर रहे हैं...',
    'login.changePhone': 'फोन नंबर बदलें',
    'login.changeAadhaar': 'आधार संख्या बदलें',
    'login.resendOtp': 'ओटीपी पुनः भेजें',
    'login.securityTitle': 'सुरक्षित प्रमाणीकरण',
    'login.securityDescription': 'ओटीपी आपके पंजीकृत मोबाइल नंबर पर भेजा जाता है। आपका डेटा एन्क्रिप्टेड और सुरक्षित है।',
    
    // Dashboard
    'dashboard.welcome': 'स्वागत है!',
    'dashboard.description': 'आपका राशन कार्ड सक्रिय और अद्यतन है।',
    'dashboard.familyMembers': 'परिवारिक सदस्य',
    'dashboard.cardType': 'कार्ड प्रकार',
    'dashboard.validUntil': 'वैध तक',
    'dashboard.cardNumber': 'कार्ड संख्या',
    'dashboard.monthlyQuota': 'मासिक कोटा',
    'dashboard.rice': 'चावल',
    'dashboard.wheat': 'गेहूं',
    'dashboard.sugar': 'चीनी',
    'dashboard.kerosene': 'मिट्टी का तेल',
    'dashboard.recentActivity': 'हाल की गतिविधि',
    'dashboard.rationDistributed': 'दिसंबर 2024 के लिए राशन वितरित',
    'dashboard.renewalNotice': 'कार्ड नवीनीकरण सूचना भेजी गई',
    'dashboard.addressVerification': 'पता सत्यापन पूर्ण',
    'dashboard.daysAgo': 'दिन पहले',
    'dashboard.weekAgo': 'सप्ताह पहले',
    'dashboard.weeksAgo': 'सप्ताह पहले',
    
    // Ration Card
    'rationCard.title': 'राशन कार्ड',
    'rationCard.government': 'महाराष्ट्र सरकार',
    'rationCard.cardNumber': 'कार्ड संख्या',
    'rationCard.headOfFamily': 'परिवार के मुखिया',
    'rationCard.issued': 'जारी किया गया',
    'rationCard.validUntil': 'वैध तक',
    'rationCard.downloadCard': 'कार्ड डाउनलोड करें',
    'rationCard.updateDetails': 'विवरण अपडेट करें',
    'rationCard.personalInfo': 'व्यक्तिगत जानकारी',
    'rationCard.address': 'पता',
    'rationCard.phone': 'फोन',
    'rationCard.cardType': 'कार्ड प्रकार',
    'rationCard.familyMembers': 'परिवारिक सदस्य',
    'rationCard.apl': 'गरीबी रेखा से ऊपर',
    'rationCard.bpl': 'गरीबी रेखा से नीचे',
    'rationCard.aay': 'अंत्योदय अन्न योजना',
    
    // Applications
    'applications.title': 'आवेदन स्थिति',
    'applications.description': 'अपने जमा किए गए आवेदनों और अनुरोधों को ट्रैक करें',
    'applications.newApplication': 'नया आवेदन',
    'applications.submitted': 'जमा किया गया',
    'applications.lastUpdated': 'अंतिम अपडेट',
    'applications.comments': 'टिप्पणियां',
    'applications.pending': 'लंबित',
    'applications.inReview': 'समीक्षाधीन',
    'applications.approved': 'स्वीकृत',
    'applications.rejected': 'अस्वीकृत',
    'applications.completed': 'पूर्ण',
    'applications.underReview': 'समीक्षाधीन',
    
    // Notifications
    'notifications.title': 'सूचनाएं',
    'notifications.description': 'अपनी राशन कार्ड गतिविधियों के साथ अपडेट रहें',
    'notifications.markAllRead': 'सभी को पढ़ा हुआ चिह्नित करें',
    'notifications.markAsRead': 'पढ़ा हुआ चिह्नित करें',
    'notifications.noNotifications': 'अभी तक कोई सूचना नहीं',
    'notifications.allNotifications': 'सभी सूचनाएं',
    
    // Profile
    'profile.title': 'प्रोफाइल प्रबंधन',
    'profile.description': 'अपनी व्यक्तिगत जानकारी और परिवारिक सदस्यों का विवरण अपडेट करें',
    'profile.personalInfo': 'व्यक्तिगत जानकारी',
    'profile.edit': 'संपादित करें',
    'profile.save': 'सहेजें',
    'profile.cancel': 'रद्द करें',
    'profile.fullName': 'पूरा नाम',
    'profile.phoneNumber': 'फोन नंबर',
    'profile.address': 'पता',
    'profile.email': 'ईमेल (वैकल्पिक)',
    'profile.emailPlaceholder': 'your.email@example.com',
    'profile.notProvided': 'प्रदान नहीं किया गया',
    'profile.aadhaarNumber': 'आधार संख्या',
    'profile.aadhaarCannotChange': 'आधार संख्या बदली नहीं जा सकती',
    'profile.familyMembers': 'परिवारिक सदस्य',
    'profile.addMember': 'सदस्य जोड़ें',
    'profile.addNewMember': 'नया परिवारिक सदस्य जोड़ें',
    'profile.name': 'नाम',
    'profile.age': 'उम्र',
    'profile.relation': 'रिश्ता',
    'profile.selectRelation': 'रिश्ता चुनें',
    'profile.addMemberButton': 'सदस्य जोड़ें',
    'profile.editMember': 'सदस्य संपादित करें',
    'profile.removeMember': 'सदस्य हटाएं',
    
    // Common
    'common.kg': 'किलो',
    'common.liter': 'लीटर',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.close': 'बंद करें',
    'common.language': 'भाषा',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};