import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const HeaderComponent = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <View style={styles.logo}>
          <Icon name="security" size={24} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.title}>{t('header.title')}</Text>
          <Text style={styles.subtitle}>{t('header.subtitle')}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <LanguageSwitcher />
        
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="#6b7280" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>2</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userId}>ID: {user?.aadhaarNumber?.slice(-4)}</Text>
          </View>
          <View style={styles.userAvatar}>
            <Icon name="person" size={20} color="#ffffff" />
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Icon name="logout" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#ea580c',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#ea580c',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    marginRight: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  userName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  userId: {
    fontSize: 10,
    color: '#6b7280',
  },
  userAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#2563eb',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoutButton: {
    padding: 8,
  },
});

export default HeaderComponent;