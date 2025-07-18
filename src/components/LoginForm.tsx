import React, { useState } from 'react';
import { Shield, CheckCircle, Loader2, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const LoginForm: React.FC = () => {
  const { t } = useLanguage();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'aadhaar' | 'otp'>('aadhaar');
  const [maskedPhone, setMaskedPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { sendOtp, verifyOtp, isLoading } = useAuth();

  const handleAadhaarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (aadhaarNumber.length === 12) {
      const result = await sendOtp(aadhaarNumber);
      
      if (result.success) {
        setMaskedPhone(result.maskedPhone || '');
        setSuccess(result.message);
        setStep('otp');
      } else {
        setError(result.message);
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (otp.length === 6) {
      const result = await verifyOtp(aadhaarNumber, otp);
      
      if (!result.success) {
        setError(result.message);
      }
      // If successful, the user will be logged in automatically via context
    }
  };

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 14); // Max 12 digits + 2 spaces
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    const result = await sendOtp(aadhaarNumber);
    
    if (result.success) {
      setSuccess('OTP resent successfully');
    } else {
      setError(result.message);
    }
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

          {step === 'aadhaar' ? (
            <form onSubmit={handleAadhaarSubmit} className="space-y-6">
              <div>
                <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.aadhaarLabel')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="aadhaar"
                    value={formatAadhaar(aadhaarNumber)}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\s/g, ''))}
                    placeholder={t('login.aadhaarPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={14}
                    required
                  />
                  <Shield className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('login.aadhaarHelp')}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {t('login.demoText')}
                </p>
              </div>

              <button
                type="submit"
                disabled={aadhaarNumber.length !== 12}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  t('login.sendOtp')
                )}
              </button>
            </form>
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
                    setStep('aadhaar');
                    setOtp('');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {t('login.changeAadhaar')}
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