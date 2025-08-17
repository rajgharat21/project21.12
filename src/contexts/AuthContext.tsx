import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserProfile } from '../types';
import { DataStorage } from '../utils/storage';
import { checkInternetConnection, enableInternetAccess } from '../utils/internetAccess';

interface OtpResponse {
  success: boolean;
  maskedPhone?: string;
  message: string;
  hasInternetAccess?: boolean;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  activeUser: User | null;
  sendOtp: (phoneNumber: string) => Promise<OtpResponse>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<{ success: boolean; message: string; hasInternetAccess?: boolean }>;
  getLinkedAadhaar: (phoneNumber: string) => Promise<{ success: boolean; aadhaarNumber?: string; message: string }>;
  addUser: (aadhaarNumber: string, otp: string) => Promise<{ success: boolean; message: string; user?: User }>;
  switchUser: (userId: string) => void;
  removeUser: (userId: string) => Promise<{ success: boolean; message: string }>;
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInternetAccess, setHasInternetAccess] = useState(false);

  // Load user from storage on initialization
  React.useEffect(() => {
    const savedProfile = DataStorage.loadUserProfile();
    if (savedProfile) {
      setUserProfile(savedProfile);
      const active = savedProfile.linkedUsers.find(u => u.id === savedProfile.activeUserId) || savedProfile.primaryUser;
      setActiveUser(active);
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
    '9123456789': { aadhaar: '444452518437', name: 'Vikram Patel', address: '567, MG Road, Pune, 411001', internetPlan: 'premium' },
    // Additional users for testing multiple Aadhaar cards
    '9988776655': { aadhaar: '555666777888', name: 'Meera Joshi', address: '890, Lake View, Hyderabad, 500001', internetPlan: 'premium' },
    '8877665544': { aadhaar: '666777888999', name: 'Ravi Gupta', address: '234, Hill Station, Shimla, 171001', internetPlan: 'basic' },
    '7766554433': { aadhaar: '777888999000', name: 'Kavita Reddy', address: '567, Beach Road, Goa, 403001', internetPlan: 'premium' }
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
    
    const newUser: User = {
      id: Date.now().toString(),
      aadhaarNumber: userData.aadhaar,
      name: userData.name,
      phone: `+91 ${normalizedPhone}`,
      address: userData.address,
      isActive: true,
      addedDate: new Date().toISOString()
    };
    
    // Create or update user profile
    let profile = userProfile;
    if (!profile) {
      profile = {
        id: Date.now().toString(),
        primaryUser: newUser,
        linkedUsers: [],
        activeUserId: newUser.id
      };
    } else {
      // Check if user already exists
      const existingUser = [profile.primaryUser, ...profile.linkedUsers].find(u => u.aadhaarNumber === userData.aadhaar);
      if (existingUser) {
        profile.activeUserId = existingUser.id;
        setActiveUser(existingUser);
        setUserProfile(profile);
        DataStorage.saveUserProfile(profile);
        setIsLoading(false);
        return {
          success: true,
          message: 'Switched to existing user',
          hasInternetAccess: hasInternet
        };
      }
      
      profile.linkedUsers.push(newUser);
      profile.activeUserId = newUser.id;
    }
    
    setUserProfile(profile);
    setActiveUser(newUser);
    DataStorage.saveUserProfile(profile);
    setIsLoading(false);
    
    return {
      success: true,
      message: 'Login successful',
      hasInternetAccess: hasInternet
    };
  };

  const addUser = async (aadhaarNumber: string, otp: string): Promise<{ success: boolean; message: string; user?: User }> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Find user data by Aadhaar
    const userData = Object.values(phoneToAadhaarMap).find(u => u.aadhaar === aadhaarNumber);
    
    if (!userData) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Aadhaar number not found in our records'
      };
    }

    if (otp.length !== 6) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Please enter a valid 6-digit OTP'
      };
    }

    if (!userProfile) {
      setIsLoading(false);
      return {
        success: false,
        message: 'No active session found'
      };
    }

    // Check if user already exists
    const existingUser = [userProfile.primaryUser, ...userProfile.linkedUsers].find(u => u.aadhaarNumber === aadhaarNumber);
    if (existingUser) {
      setIsLoading(false);
      return {
        success: false,
        message: 'This Aadhaar card is already linked to your account'
      };
    }

    const newUser: User = {
      id: Date.now().toString(),
      aadhaarNumber: userData.aadhaar,
      name: userData.name,
      phone: Object.keys(phoneToAadhaarMap).find(phone => phoneToAadhaarMap[phone].aadhaar === aadhaarNumber) || '',
      address: userData.address,
      isActive: false,
      addedDate: new Date().toISOString()
    };

    const updatedProfile = {
      ...userProfile,
      linkedUsers: [...userProfile.linkedUsers, newUser]
    };

    setUserProfile(updatedProfile);
    DataStorage.saveUserProfile(updatedProfile);
    setIsLoading(false);

    return {
      success: true,
      message: 'User added successfully',
      user: newUser
    };
  };
  const logout = () => {
    setUser(null);
    setHasInternetAccess(false);
    DataStorage.clearAll();
  };

  const switchUser = (userId: string) => {
    if (!userProfile) return;
    
    const user = [userProfile.primaryUser, ...userProfile.linkedUsers].find(u => u.id === userId);
    if (user) {
      const updatedProfile = {
        ...userProfile,
        activeUserId: userId
      };
  const removeUser = async (userId: string): Promise<{ success: boolean; message: string }> => {
    if (!userProfile) {
      return {
        success: false,
        message: 'No active session found'
      };
    }
      
    // Cannot remove primary user
    if (userProfile.primaryUser.id === userId) {
      return {
        success: false,
        message: 'Cannot remove primary user'
      };
    }
      setUserProfile(updatedProfile);
    const updatedLinkedUsers = userProfile.linkedUsers.filter(u => u.id !== userId);
    let newActiveUserId = userProfile.activeUserId;
    
    // If removing active user, switch to primary user
    if (userProfile.activeUserId === userId) {
      newActiveUserId = userProfile.primaryUser.id;
      setActiveUser(userProfile.primaryUser);
    }
      setActiveUser(user);
    const updatedProfile = {
      ...userProfile,
      linkedUsers: updatedLinkedUsers,
      activeUserId: newActiveUserId
    };
      DataStorage.saveUserProfile(updatedProfile);
    setUserProfile(updatedProfile);
    DataStorage.saveUserProfile(updatedProfile);
      
    return {
      success: true,
      message: 'User removed successfully'
    };
  };
      // Update internet access based on new user
      const userData = Object.values(phoneToAadhaarMap).find(u => u.aadhaar === user.aadhaarNumber);
    setUserProfile(null);
    setActiveUser(null);
        setHasInternetAccess(userData.internetPlan === 'premium');
      }
    }
  };
  return (
    <AuthContext.Provider value={{ 
      userProfile, 
      activeUser, 
      sendOtp, 
      verifyOtp, 
      getLinkedAadhaar, 
      addUser, 
      switchUser, 
      removeUser, 
      logout, 
      isLoading, 
      hasInternetAccess 
    }}>
      {children}
    </AuthContext.Provider>
  );
};