import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { DataStorage } from '../utils/storage';
import AadhaarService from '../services/aadhaarService';

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
  
  // Initialize Aadhaar service with your credentials
  // NOTE: These need to be obtained from UIDAI after proper licensing
  const aadhaarService = new AadhaarService(
    'YOUR_AUA_CODE',      // Authentication User Agency Code
    'YOUR_SUB_AUA_CODE',  // Sub-AUA Code
    'YOUR_LICENSE_KEY'    // API License Key
  );

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
    
    try {
      // Use real Aadhaar API for OTP generation
      const result = await aadhaarService.generateOtp(aadhaarNumber);
      
      setIsLoading(false);
      
      if (result.success) {
        // Store transaction ID for OTP verification
        sessionStorage.setItem('aadhaar_txn_id', result.txnId);
        
        return {
          success: true,
          maskedPhone: result.userData?.phone?.replace(/(\+91\s)(\d{6})(\d{4})/, '$1******$3'),
          message: result.message
        };
      } else {
        return {
          success: false,
          message: result.message
        };
      }
    } catch (error) {
      setIsLoading(false);
      
      // Fallback to demo mode if API is not available or not configured
      console.warn('Aadhaar API not available, using demo mode');
      
      // Keep existing demo functionality as fallback
      const userData = registeredUsers[aadhaarNumber as keyof typeof registeredUsers];
      
      if (!userData) {
        return {
          success: false,
          message: 'Aadhaar number not found. Using demo mode - try: 123456789012, 234567890123, 345678901234, or 456789012345'
        };
      }

      const maskedPhone = userData.phone.replace(/(\+91\s)(\d{6})(\d{4})/, '$1******$3');
      
      return {
        success: true,
        maskedPhone,
        message: `Demo Mode: OTP sent to ${maskedPhone}`
      };
    }
  };

  const verifyOtp = async (aadhaarNumber: string, otp: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      const txnId = sessionStorage.getItem('aadhaar_txn_id');
      
      if (!txnId) {
        setIsLoading(false);
        return {
          success: false,
          message: 'Session expired. Please request OTP again.'
        };
      }

      // Use real Aadhaar API for OTP verification
      const result = await aadhaarService.verifyOtp(aadhaarNumber, otp, txnId);
      
      setIsLoading(false);
      
      if (result.success && result.userData) {
        const authenticatedUser: User = {
          id: txnId,
          aadhaarNumber,
          name: result.userData.name,
          phone: result.userData.phone,
          address: result.userData.address
        };
        
        setUser(authenticatedUser);
        DataStorage.saveUser(authenticatedUser);
        
        // Clear transaction ID
        sessionStorage.removeItem('aadhaar_txn_id');
        
        return {
          success: true,
          message: 'Authentication successful'
        };
      } else {
        return {
          success: false,
          message: result.message
        };
      }
    } catch (error) {
      setIsLoading(false);
      
      // Fallback to demo mode if API is not available or not configured
      console.warn('Aadhaar API not available, using demo mode');
      
      const userData = registeredUsers[aadhaarNumber as keyof typeof registeredUsers];
      
      if (!userData) {
        return {
          success: false,
          message: 'Invalid Aadhaar number'
        };
      }

      if (otp.length !== 6) {
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
      
      return {
        success: true,
        message: 'Demo Mode: Login successful'
      };
    }
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