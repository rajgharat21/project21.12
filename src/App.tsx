import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { DataProvider, useData } from './contexts/DataContext';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import RationCardView from './components/RationCardView';
import ApplicationStatus from './components/ApplicationStatus';
import NotificationPanel from './components/NotificationPanel';
import ProfileEditor from './components/ProfileEditor';
import InternetAccessPanel from './components/InternetAccessPanel';
import { useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const {
    rationCard,
    notifications,
    applications,
    updateRationCard,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addApplication,
    updateApplication
  } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  if (!user) {
    return <LoginForm />;
  }

  const unreadNotifications = notifications.filter(n => !n.read);

  const handleProfileUpdate = (updateData: any) => {
    if (updateData.type === 'family') {
      const updatedRationCard = {
        ...rationCard,
        familyMembers: updateData.data
      };
      updateRationCard(updatedRationCard);
    }
    console.log('Profile updated:', updateData);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard rationCard={rationCard} />;
      case 'ration-card':
        return <RationCardView rationCard={rationCard} />;
      case 'applications':
        return <ApplicationStatus applications={applications} onUpdateApplication={updateApplication} onAddApplication={addApplication} />;
      case 'profile':
        return (
          <ProfileEditor
            familyMembers={rationCard.familyMembers}
            onUpdateProfile={handleProfileUpdate}
          />
        );
      case 'internet':
        return <InternetAccessPanel />;
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('notifications.allNotifications')}</h2>
              <p className="text-gray-600">{t('notifications.description')}</p>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 bg-white rounded-lg border ${
                    !notification.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      <p className="text-gray-700 mt-1">{notification.message}</p>
                      <span className="text-sm text-gray-500 mt-2 block">
                        {new Date(notification.date).toLocaleDateString()}
                      </span>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {t('notifications.markAsRead')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Dashboard rationCard={rationCard} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onNotificationClick={() => setShowNotifications(true)}
        notificationCount={unreadNotifications.length}
      />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={markNotificationAsRead}
        onMarkAllAsRead={markAllNotificationsAsRead}
      />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;