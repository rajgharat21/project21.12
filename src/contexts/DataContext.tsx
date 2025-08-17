import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { RationCard, Notification, Application } from '../types';
import { mockRationCards, mockNotifications } from '../data/mockData';
import { DataStorage } from '../utils/storage';
import { useAuth } from './AuthContext';

interface DataContextType {
  rationCards: RationCard[];
  activeRationCard: RationCard | null;
  notifications: Notification[];
  applications: Application[];
  updateRationCard: (rationCard: RationCard) => void;
  getRationCardByAadhaar: (aadhaarNumber: string) => RationCard | null;
  updateNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addApplication: (application: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { activeUser } = useAuth();
  const [rationCards, setRationCards] = useState<RationCard[]>(Object.values(mockRationCards));
  const [activeRationCard, setActiveRationCard] = useState<RationCard | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      type: 'Address Change Request',
      status: 'approved',
      submittedDate: '2024-12-15',
      lastUpdated: '2024-12-20',
      comments: 'Address verification completed successfully'
    },
    {
      id: '2',
      type: 'Add Family Member',
      status: 'in-review',
      submittedDate: '2024-12-18',
      lastUpdated: '2024-12-22'
    },
    {
      id: '3',
      type: 'Card Renewal',
      status: 'pending',
      submittedDate: '2024-12-20',
      lastUpdated: '2024-12-20'
    },
    {
      id: '4',
      type: 'Income Certificate Update',
      status: 'rejected',
      submittedDate: '2024-12-10',
      lastUpdated: '2024-12-14',
      comments: 'Insufficient documentation provided'
    }
  ]);

  // Load data from storage on initialization
  useEffect(() => {
    const savedRationCards = DataStorage.loadRationCards();
    const savedNotifications = DataStorage.loadNotifications();
    const savedApplications = DataStorage.loadApplications();

    if (savedRationCards.length > 0) {
      setRationCards(savedRationCards);
    }
    if (savedNotifications.length > 0) {
      setNotifications(savedNotifications);
    }
    if (savedApplications.length > 0) {
      setApplications(savedApplications);
    }
  }, []);

  // Update active ration card when active user changes
  useEffect(() => {
    if (activeUser) {
      const card = rationCards.find(card => card.aadhaarNumber === activeUser.aadhaarNumber);
      setActiveRationCard(card || null);
    } else {
      setActiveRationCard(null);
    }
  }, [activeUser, rationCards]);

  const updateRationCard = (updatedCard: RationCard) => {
    const updatedCards = rationCards.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    );
    setRationCards(updatedCards);
    DataStorage.saveRationCards(updatedCards);
    
    // Update active card if it's the one being updated
    if (activeRationCard && activeRationCard.id === updatedCard.id) {
      setActiveRationCard(updatedCard);
    }
  };

  const getRationCardByAadhaar = (aadhaarNumber: string): RationCard | null => {
    return rationCards.find(card => card.aadhaarNumber === aadhaarNumber) || null;
  };

  const updateNotifications = (newNotifications: Notification[]) => {
    setNotifications(newNotifications);
    DataStorage.saveNotifications(newNotifications);
  };

  const addNotification = (notification: Notification) => {
    const newNotifications = [notification, ...notifications];
    setNotifications(newNotifications);
    DataStorage.saveNotifications(newNotifications);
  };

  const markNotificationAsRead = (id: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    DataStorage.saveNotifications(updatedNotifications);
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    DataStorage.saveNotifications(updatedNotifications);
  };

  const addApplication = (application: Application) => {
    const newApplications = [application, ...applications];
    setApplications(newApplications);
    DataStorage.saveApplications(newApplications);
    
    // Add notification for new application
    const notification: Notification = {
      id: Date.now().toString(),
      title: 'Application Submitted',
      message: `Your ${application.type} application has been submitted successfully.`,
      type: 'success',
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    addNotification(notification);
  };

  const updateApplication = (id: string, updates: Partial<Application>) => {
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : app
    );
    setApplications(updatedApplications);
    DataStorage.saveApplications(updatedApplications);

    // Add notification for application update
    const application = updatedApplications.find(app => app.id === id);
    if (application && updates.status) {
      const notification: Notification = {
        id: Date.now().toString(),
        title: 'Application Status Updated',
        message: `Your ${application.type} application status has been updated to ${updates.status}.`,
        type: updates.status === 'approved' ? 'success' : updates.status === 'rejected' ? 'error' : 'info',
        date: new Date().toISOString().split('T')[0],
        read: false
      };
      addNotification(notification);
    }
  };

  return (
    <DataContext.Provider value={{
      rationCards,
      activeRationCard,
      notifications,
      applications,
      updateRationCard,
      getRationCardByAadhaar,
      updateNotifications,
      addNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      addApplication,
      updateApplication
    }}>
      {children}
    </DataContext.Provider>
  );
};