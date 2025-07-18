import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const LoginScreen = () => {
  const { t } = useLanguage();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'aadhaar' | 'otp'>('aadhaar');
  const [maskedPhone, setMaskedPhone] = useState('');
  const { sendOtp, verifyOtp, isLoading } = useAuth();

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 14);
  };

  const handleAadhaarSubmit = async () => {
    if (aadhaarNumber.length === 12) {
      const result = await sendOtp(aadhaarNumber);
      
      if (result.success) {
        setMaskedPhone(result.maskedPhone || '');
        setStep('otp');
      } else {
        Alert.alert('Error', result.message);
      }
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length === 6) {
      const result = await verifyOtp(aadhaarNumber, otp);
      
      if (!result.success) {
        Alert.alert('Error', result.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <LanguageSwitcher />
      </View>
      
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Icon name="security" size={40} color="#ffffff" />
        </View>
        <Text style={styles.title}>{t('login.title')}</Text>
        <Text style={styles.subtitle}>{t('login.subtitle')}</Text>
      </View>

      <View style={styles.formContainer}>
        {step === 'aadhaar' ? (
          <View>
            <Text style={styles.label}>{t('login.aadhaarLabel')}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formatAadhaar(aadhaarNumber)}
                onChangeText={(text) => setAadhaarNumber(text.replace(/\s/g, ''))}
                placeholder="1234 5678 9012"
                keyboardType="numeric"
                maxLength={14}
              />
              <Icon name="security" size={20} color="#9ca3af" style={styles.inputIcon} />
            </View>
            
            <TouchableOpacity
              style={[styles.button, aadhaarNumber.length !== 12 && styles.buttonDisabled]}
              onPress={handleAadhaarSubmit}
              disabled={aadhaarNumber.length !== 12 || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>{t('login.sendOtp')}</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.otpHeader}>
              <Icon name="check-circle" size={48} color="#10b981" />
              <Text style={styles.otpTitle}>OTP Sent Successfully</Text>
              <Text style={styles.otpDescription}>
                Enter the 6-digit OTP sent to: {maskedPhone}
              </Text>
            </View>

            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={[styles.input, styles.otpInput]}
              value={otp}
              onChangeText={(text) => setOtp(text.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              keyboardType="numeric"
              maxLength={6}
              textAlign="center"
            />

            <TouchableOpacity
              style={[styles.button, otp.length !== 6 && styles.buttonDisabled]}
              onPress={handleOtpSubmit}
              disabled={otp.length !== 6 || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>{t('login.verifyLogin')}</Text>
              )}
            </TouchableOpacity>

            <View style={styles.otpActions}>
              <TouchableOpacity onPress={() => setStep('aadhaar')}>
                <Text style={styles.linkText}>Change Aadhaar Number</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAadhaarSubmit()}>
                <Text style={styles.linkText}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.securityNote}>
        <Icon name="security" size={20} color="#2563eb" />
        <View style={styles.securityText}>
          <Text style={styles.securityTitle}>Secure Authentication</Text>
          <Text style={styles.securityDescription}>
            OTP is sent to your registered mobile number. Your data is encrypted and secure.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  header: {
    alignItems: 'flex-end',
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#ea580c',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ea580c',
    marginBottom: 8,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    paddingRight: 40,
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  otpInput: {
    fontSize: 24,
    letterSpacing: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  otpHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  otpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
  },
  otpDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  otpActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  linkText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  securityNote: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  securityText: {
    marginLeft: 12,
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
  securityDescription: {
    fontSize: 12,
    color: '#1e40af',
    marginTop: 4,
  },
});

export default LoginScreen;