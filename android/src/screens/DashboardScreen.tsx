import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { mockRationCard } from '../data/mockData';

const DashboardScreen = () => {
  const { t } = useLanguage();
  const rationCard = mockRationCard;

  const stats = [
    {
      label: t('dashboard.familyMembers'),
      value: rationCard.familyMembers.length,
      icon: 'people',
      color: '#3b82f6'
    },
    {
      label: t('dashboard.cardType'),
      value: rationCard.cardType,
      icon: 'card-membership',
      color: '#10b981'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeHeader}>
          <View style={styles.welcomeIcon}>
            <Text style={styles.welcomeIconText}>महा</Text>
          </View>
          <Text style={styles.welcomeTitle}>{t('dashboard.welcome')}</Text>
        </View>
        <Text style={styles.welcomeDescription}>
          Your ration card is active and up to date.
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
              <Icon name={stat.icon} size={24} color="#ffffff" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Monthly Quota */}
      <View style={styles.quotaCard}>
        <Text style={styles.quotaTitle}>{t('dashboard.monthlyQuota')}</Text>
        <View style={styles.quotaGrid}>
          <View style={styles.quotaItem}>
            <Text style={styles.quotaValue}>{rationCard.monthlyQuota.rice} kg</Text>
            <Text style={styles.quotaLabel}>Rice</Text>
          </View>
          <View style={styles.quotaItem}>
            <Text style={styles.quotaValue}>{rationCard.monthlyQuota.wheat} kg</Text>
            <Text style={styles.quotaLabel}>Wheat</Text>
          </View>
          <View style={styles.quotaItem}>
            <Text style={styles.quotaValue}>{rationCard.monthlyQuota.sugar} kg</Text>
            <Text style={styles.quotaLabel}>Sugar</Text>
          </View>
          <View style={styles.quotaItem}>
            <Text style={styles.quotaValue}>{rationCard.monthlyQuota.kerosene} L</Text>
            <Text style={styles.quotaLabel}>Kerosene</Text>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activityCard}>
        <Text style={styles.activityTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: '#10b981' }]} />
            <View>
              <Text style={styles.activityText}>Ration distributed for December 2024</Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: '#3b82f6' }]} />
            <View>
              <Text style={styles.activityText}>Card renewal notice sent</Text>
              <Text style={styles.activityTime}>1 week ago</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  welcomeCard: {
    backgroundColor: '#2563eb',
    margin: 16,
    padding: 24,
    borderRadius: 12,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  welcomeIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#ea580c',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  welcomeIconText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  welcomeDescription: {
    color: '#bfdbfe',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  quotaCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quotaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  quotaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quotaItem: {
    width: '50%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: '1%',
  },
  quotaValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  quotaLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});

export default DashboardScreen;