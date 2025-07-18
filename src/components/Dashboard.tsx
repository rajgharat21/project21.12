import React from 'react';
import { Users, Calendar, Package, AlertCircle } from 'lucide-react';
import { RationCard } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  rationCard: RationCard;
}

const Dashboard: React.FC<DashboardProps> = ({ rationCard }) => {
  const { t } = useLanguage();
  
  const stats = [
    {
      label: t('dashboard.familyMembers'),
      value: rationCard.familyMembers.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: t('dashboard.cardType'),
      value: rationCard.cardType,
      icon: Package,
      color: 'bg-green-500'
    },
    {
      label: t('dashboard.validUntil'),
      value: new Date(rationCard.validUntil).getFullYear(),
      icon: Calendar,
      color: 'bg-orange-500'
    },
    {
      label: t('dashboard.cardNumber'),
      value: `****${rationCard.cardNumber.slice(-4)}`,
      icon: AlertCircle,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">महा</span>
          </div>
          <h2 className="text-2xl font-bold">{t('dashboard.welcome')}</h2>
        </div>
        <p className="text-blue-100">
          {t('dashboard.description')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Quota */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.monthlyQuota')}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{rationCard.monthlyQuota.rice} {t('common.kg')}</div>
            <div className="text-sm text-gray-600">{t('dashboard.rice')}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{rationCard.monthlyQuota.wheat} {t('common.kg')}</div>
            <div className="text-sm text-gray-600">{t('dashboard.wheat')}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{rationCard.monthlyQuota.sugar} {t('common.kg')}</div>
            <div className="text-sm text-gray-600">{t('dashboard.sugar')}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{rationCard.monthlyQuota.kerosene} {t('common.liter')}</div>
            <div className="text-sm text-gray-600">{t('dashboard.kerosene')}</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.recentActivity')}</h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">{t('dashboard.rationDistributed')}</p>
              <p className="text-xs text-gray-500">2 {t('dashboard.daysAgo')}</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">{t('dashboard.renewalNotice')}</p>
              <p className="text-xs text-gray-500">1 {t('dashboard.weekAgo')}</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">{t('dashboard.addressVerification')}</p>
              <p className="text-xs text-gray-500">2 {t('dashboard.weeksAgo')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;