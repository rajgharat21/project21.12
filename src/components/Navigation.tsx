import React from 'react';
import { Home, CreditCard, FileText, Bell, Settings, Wifi } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();
  
  const tabs = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Home },
    { id: 'ration-card', label: t('nav.rationCard'), icon: CreditCard },
    { id: 'applications', label: t('nav.applications'), icon: FileText },
    { id: 'internet', label: t('nav.internet'), icon: Wifi },
    { id: 'notifications', label: t('nav.notifications'), icon: Bell },
    { id: 'profile', label: t('nav.profile'), icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;