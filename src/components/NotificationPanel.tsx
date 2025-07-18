import React from 'react';
import { X, Bell, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { Notification } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  const { t } = useLanguage();
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-6 h-6 text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">{t('notifications.title')}</h2>
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 mt-2"
              >
                {t('notifications.markAllRead')}
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>{t('notifications.noNotifications')}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${getNotificationBg(notification.type)} ${
                      !notification.read ? 'ring-2 ring-blue-500 ring-opacity-20' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500">
                            {new Date(notification.date).toLocaleDateString()}
                          </span>
                          {!notification.read && (
                            <button
                              onClick={() => onMarkAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              {t('notifications.markAsRead')}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;