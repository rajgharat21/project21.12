import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  aadhaarNumber: string;
  name: string;
  phone: string;
  address: string;
}

interface OtpResponse {
  success: boolean;
  maskedPhone?: string;
  message: string;
}

interface AuthContextType {
  user: User | null;
  sendOtp: (aadhaarNumber: string) => Promise<OtpResponse>;
  verifyOtp: (aadhaarNumber: string, otp: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
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

  const registeredUsers = {
    '123456789012': { phone: '+91 9876543210', name: 'Rajesh Kumar', address: '123, Main Street, New Delhi, 110001' },
    '234567890123': { phone: '+91 8765432109', name: 'Priya Sharma', address: '456, Park Avenue, Mumbai, 400001' },
    '345678901234': { phone: '+91 7654321098', name: 'Amit Singh', address: '789, Gandhi Road, Bangalore, 560001' },
    '456789012345': { phone: '+91 6543210987', name: 'Sunita Devi', address: '321, Temple Street, Chennai, 600001' },
    '444452518437': { phone: '+91 9123456789', name: 'Vikram Patel', address: '567, MG Road, Pune, 411001' }
  };

  const sendOtp = async (aadhaarNumber: string): Promise<OtpResponse> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData = registeredUsers[aadhaarNumber as keyof typeof registeredUsers];
    
    if (!userData) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Aadhaar number not found in our records. Please ensure you have a valid ration card.'
      };
    }

    const maskedPhone = userData.phone.replace(/(\+91\s)(\d{6})(\d{4})/, '$1******$3');
    
    setIsLoading(false);
    return {
      success: true,
      maskedPhone,
      message: `OTP sent successfully to ${maskedPhone}`
    };
  };

  const verifyOtp = async (aadhaarNumber: string, otp: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData = registeredUsers[aadhaarNumber as keyof typeof registeredUsers];
    
    if (!userData) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Invalid Aadhaar number'
      };
    }

    if (otp.length !== 6) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Please enter a valid 6-digit OTP'
      };
    }
    
    const mockUser: User = {
      id: '1',
      aadhaarNumber,
      name: userData.name,
      phone: userData.phone,
      address: userData.address
    };
    
    setUser(mockUser);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
    
    return {
      success: true,
      message: 'Login successful'
    };
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, sendOtp, verifyOtp, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};