import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { DataStorage } from '../utils/storage';
import { checkInternetConnection, enableInternetAccess } from '../utils/internetAccess';

interface OtpResponse {
  success: boolean;
  maskedPhone?: string;
  message: string;
  hasInternetAccess?: boolean;
}

interface AuthContextType {
  user: User | null;
  sendOtp: (phoneNumber: string) => Promise<OtpResponse>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<{ success: boolean; message: string; hasInternetAccess?: boolean }>;
  getLinkedAadhaar: (phoneNumber: string) => Promise<{ success: boolean; aadhaarNumber?: string; message: string }>;
  logout: () => void;
  isLoading: boolean;
  hasInternetAccess: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInternetAccess, setHasInternetAccess] = useState(false);

  // Load user from storage on initialization
  React.useEffect(() => {
    const savedUser = DataStorage.loadUser();
    if (savedUser) {
      setUser(savedUser);
      checkInternetConnection().then(setHasInternetAccess);
    }
  }, []);

  // Mock database of phone numbers linked to Aadhaar cards
  const phoneToAadhaarMap = {
    '+919876543210': { aadhaar: '123456789012', name: 'Rajesh Kumar', address: '123, Main Street, New Delhi, 110001', internetPlan: 'premium' },
    '9876543210': { aadhaar: '123456789012', name: 'Rajesh Kumar', address: '123, Main Street, New Delhi, 110001', internetPlan: 'premium' },
    '+918765432109': { aadhaar: '234567890123', name: 'Priya Sharma', address: '456, Park Avenue, Mumbai, 400001', internetPlan: 'basic' },
    '8765432109': { aadhaar: '234567890123', name: 'Priya Sharma', address: '456, Park Avenue, Mumbai, 400001', internetPlan: 'basic' },
    '+917654321098': { aadhaar: '345678901234', name: 'Amit Singh', address: '789, Gandhi Road, Bangalore, 560001', internetPlan: 'premium' },
    '7654321098': { aadhaar: '345678901234', name: 'Amit Singh', address: '789, Gandhi Road, Bangalore, 560001', internetPlan: 'premium' },
    '+916543210987': { aadhaar: '456789012345', name: 'Sunita Devi', address: '321, Temple Street, Chennai, 600001', internetPlan: 'basic' },
    '6543210987': { aadhaar: '456789012345', name: 'Sunita Devi', address: '321, Temple Street, Chennai, 600001', internetPlan: 'basic' },
    '+919123456789': { aadhaar: '444452518437', name: 'Vikram Patel', address: '567, MG Road, Pune, 411001', internetPlan: 'premium' },
    '9123456789': { aadhaar: '444452518437', name: 'Vikram Patel', address: '567, MG Road, Pune, 411001', internetPlan: 'premium' }
  };

  const getLinkedAadhaar = async (phoneNumber: string): Promise<{ success: boolean; aadhaarNumber?: string; message: string }> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const normalizedPhone = phoneNumber.replace(/\D/g, '');
    const userData = phoneToAadhaarMap[normalizedPhone] || phoneToAadhaarMap[`+91${normalizedPhone}`];
    
    setIsLoading(false);
    
    if (!userData) {
      return {
        success: false,
        message: 'Phone number not linked to any Aadhaar card. Please contact your service provider.'
      };
    }
    
    return {
      success: true,
      aadhaarNumber: userData.aadhaar,
      message: `Aadhaar card found: ****-****-${userData.aadhaar.slice(-4)}`
    };
  };

  const sendOtp = async (phoneNumber: string): Promise<OtpResponse> => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const normalizedPhone = phoneNumber.replace(/\D/g, '');
    const userData = phoneToAadhaarMap[normalizedPhone] || phoneToAadhaarMap[`+91${normalizedPhone}`];
    
    if (!userData) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Phone number not linked to any Aadhaar card. Please ensure you have a valid ration card.'
      };
    }

    // Mask phone number for security
    const maskedPhone = `+91 ******${normalizedPhone.slice(-4)}`;
    const hasInternet = userData.internetPlan === 'premium';
    
    setIsLoading(false);
    return {
      success: true,
      maskedPhone,
      message: `OTP sent successfully to ${maskedPhone}`,
      hasInternetAccess: hasInternet
    };
  };

  const verifyOtp = async (phoneNumber: string, otp: string): Promise<{ success: boolean; message: string; hasInternetAccess?: boolean }> => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const normalizedPhone = phoneNumber.replace(/\D/g, '');
    const userData = phoneToAadhaarMap[normalizedPhone] || phoneToAadhaarMap[`+91${normalizedPhone}`];
    
    if (!userData) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Invalid phone number'
      };
    }

    // For demo purposes, accept any 6-digit OTP
    // In real implementation, this would verify against the actual OTP sent
    if (otp.length !== 6) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Please enter a valid 6-digit OTP',
        hasInternetAccess: false
      };
    }
    
    const hasInternet = userData.internetPlan === 'premium';
    
    const mockUser: User = {
      id: '1',
      aadhaarNumber: userData.aadhaar,
      name: userData.name,
      phone: `+91 ${normalizedPhone}`,
      address: userData.address
    };
    
    // Enable internet access if user has premium plan
    if (hasInternet) {
      await enableInternetAccess(userData.aadhaar);
      setHasInternetAccess(true);
    }
    
    setUser(mockUser);
    DataStorage.saveUser(mockUser);
    setIsLoading(false);
    
    return {
      success: true,
      message: 'Login successful',
      hasInternetAccess: hasInternet
    };
  };

  const logout = () => {
    setUser(null);
    setHasInternetAccess(false);
    DataStorage.clearAll();
  };

  return (
    <AuthContext.Provider value={{ user, sendOtp, verifyOtp, getLinkedAadhaar, logout, isLoading, hasInternetAccess }}>
      {children}
    </AuthContext.Provider>
  );
};