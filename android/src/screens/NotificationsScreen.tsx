import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLanguage } from '../contexts/LanguageContext';

const NotificationsScreen = () => {
  const { t } = useLanguage();

  const notifications = [
    {
      id: '1',
      title: 'Ration Distribution Available',
      message: 'Your monthly ration for December 2024 is now available for collection at your designated Fair Price Shop.',
      type: 'success',
      date: '2024-12-22',
      read: false
    },
    {
      id: '2',
      title: 'Card Renewal Reminder',
      message: 'Your ration card is valid until January 2030. No action required at this time.',
      type: 'info',
      date: '2024-12-20',
      read: false
    },
    {
      id: '3',
      title: 'Address Verification Completed',
      message: 'Your address change request has been approved and updated in the system.',
      type: 'success',
      date: '2024-12-18',
      read: true
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#3b82f6';
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return '#f0fdf4';
      case 'warning':
        return '#fffbeb';
      case 'error':
        return '#fef2f2';
      default:
        return '#eff6ff';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleSection}>
            <Icon name="notifications" size={24} color="#6b7280" />
            <Text style={styles.title}>{t('notifications.title')}</Text>
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.description}>Stay updated with your ration card activities</Text>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.notificationsList}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="notifications-none" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationCard,
                { backgroundColor: getNotificationBg(notification.type) },
                !notification.read && styles.unreadCard
              ]}
            >
              <View style={styles.notificationContent}>
                <Icon
                  name={getNotificationIcon(notification.type)}
                  size={20}
                  color={getNotificationColor(notification.type)}
                />
                <View style={styles.notificationText}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <View style={styles.notificationFooter}>
                    <Text style={styles.notificationDate}>
                      {new Date(notification.date).toLocaleDateString()}
                    </Text>
                    {!notification.read && (
                      <TouchableOpacity>
                        <Text style={styles.markReadText}>Mark as read</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    marginBottom: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
  markAllButton: {
    alignSelf: 'flex-start',
  },
  markAllText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  notificationsList: {
    padding: 16,
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
  },
  notificationCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  unreadCard: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationText: {
    marginLeft: 12,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  markReadText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
});

export default NotificationsScreen;