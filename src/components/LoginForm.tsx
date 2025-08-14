import React, { useState } from 'react';
import { Shield, CheckCircle, Loader2, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const LoginForm: React.FC = () => {
  const { t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'aadhaar' | 'otp'>('phone');
  const [maskedPhone, setMaskedPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasInternetAccess, setHasInternetAccess] = useState(false);
  const { sendOtp, verifyOtp, getLinkedAadhaar, isLoading } = useAuth();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (phoneNumber.length === 10) {
      const aadhaarResult = await getLinkedAadhaar(phoneNumber);
      
      if (aadhaarResult.success) {
        setAadhaarNumber(aadhaarResult.aadhaarNumber || '');
        setSuccess(aadhaarResult.message);
        setStep('aadhaar');
      } else {
        setError(aadhaarResult.message);
      }
    }
  };

  const handleAadhaarConfirm = async () => {
    setError('');
    setSuccess('');
    
    const result = await sendOtp(phoneNumber);
    
    if (result.success) {
      setMaskedPhone(result.maskedPhone || '');
      setHasInternetAccess(result.hasInternetAccess || false);
      setSuccess(result.message);
      setStep('otp');
    } else {
      setError(result.message);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (otp.length === 6) {
      const result = await verifyOtp(phoneNumber, otp);
      
      if (result.success) {
        setHasInternetAccess(result.hasInternetAccess || false);
      } else {
        setError(result.message);
      }
      // If successful, the user will be logged in automatically via context
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    const result = await sendOtp(phoneNumber);
    
    if (result.success) {
      setSuccess('OTP resent successfully');
    } else {
      setError(result.message);
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.slice(0, 10);
  };

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 14);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-4 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('login.title')}</h1>
          <h2 className="text-xl font-semibold text-orange-600 mb-2">{t('login.subtitle')}</h2>
          <p className="text-gray-600">{t('login.description')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.phoneLabel')}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={formatPhone(phoneNumber)}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('login.phonePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={10}
                    required
                  />
                  <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('login.phoneHelp')}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Demo: Try 9876543210, 8765432109, 7654321098, 6543210987, or 9123456789
                </p>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length !== 10}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  t('login.findAadhaar')
                )}
              </button>
            </form>
          ) : step === 'aadhaar' ? (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">{t('login.aadhaarFound')}</h3>
                <div className="text-gray-600 space-y-2">
                  <p>{t('login.aadhaarConfirm')}</p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-mono text-lg">{formatAadhaar(aadhaarNumber)}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAadhaarConfirm}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    t('login.sendOtp')
                  )}
                </button>
                <button
                  onClick={() => {
                    setStep('phone');
                    setAadhaarNumber('');
                    setError('');
                    setSuccess('');
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  {t('login.changePhone')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">{t('login.otpSent')}</h3>
                <div className="text-gray-600 space-y-1">
                  <p>{t('login.otpDescription')}</p>
                  <div className="flex items-center justify-center text-sm font-medium">
                    <Phone className="w-4 h-4 mr-2" />
                    {maskedPhone}
                  </div>
                  {hasInternetAccess && (
                    <div className="mt-3 p-2 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">
                        🌐 Internet access will be enabled after login
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.otpLabel')}
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder={t('login.otpPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                  maxLength={6}
                  autoComplete="one-time-code"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={otp.length !== 6 || isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {t('login.verifying')}
                  </>
                ) : (
                  t('login.verifyLogin')
                )}
              </button>

              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setOtp('');
                    setPhoneNumber('');
                    setAadhaarNumber('');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {t('login.changePhone')}
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  disabled={isLoading}
                >
                  {t('login.resendOtp')}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">{t('login.securityTitle')}</p>
              <p className="text-xs text-blue-700 mt-1">
                {t('login.securityDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;