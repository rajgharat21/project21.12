import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { DataStorage } from '../utils/storage';

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

  // Load user from storage on initialization
  React.useEffect(() => {
    const savedUser = DataStorage.loadUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Mock database of registered Aadhaar numbers with phone numbers
  const registeredUsers = {
    '123456789012': { phone: '+91 9876543210', name: 'Rajesh Kumar', address: '123, Main Street, New Delhi, 110001' },
    '234567890123': { phone: '+91 8765432109', name: 'Priya Sharma', address: '456, Park Avenue, Mumbai, 400001' },
    '345678901234': { phone: '+91 7654321098', name: 'Amit Singh', address: '789, Gandhi Road, Bangalore, 560001' },
    '456789012345': { phone: '+91 6543210987', name: 'Sunita Devi', address: '321, Temple Street, Chennai, 600001' }
  };

  const sendOtp = async (aadhaarNumber: string): Promise<OtpResponse> => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData = registeredUsers[aadhaarNumber as keyof typeof registeredUsers];
    
    if (!userData) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Aadhaar number not found in our records. Please ensure you have a valid ration card.'
      };
    }

    // Mask phone number for security (show only last 4 digits)
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
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData = registeredUsers[aadhaarNumber as keyof typeof registeredUsers];
    
    if (!userData) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Invalid Aadhaar number'
      };
    }

    // For demo purposes, accept any 6-digit OTP
    // In real implementation, this would verify against the actual OTP sent
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
    DataStorage.saveUser(mockUser);
    setIsLoading(false);
    
    return {
      success: true,
      message: 'Login successful'
    };
  };

  const logout = () => {
    setUser(null);
    DataStorage.clearAll();
  };

  return (
    <AuthContext.Provider value={{ user, sendOtp, verifyOtp, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};