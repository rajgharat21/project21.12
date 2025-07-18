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

const ApplicationsScreen = () => {
  const { t } = useLanguage();

  const applications = [
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
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      case 'in-review':
        return '#f59e0b';
      case 'pending':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return 'check-circle';
      case 'rejected':
        return 'cancel';
      case 'in-review':
        return 'visibility';
      case 'pending':
        return 'schedule';
      default:
        return 'description';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t('applications.title')}</Text>
          <Text style={styles.description}>Track your submitted applications and requests</Text>
        </View>
        <TouchableOpacity style={styles.newButton}>
          <Text style={styles.newButtonText}>New Application</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.applicationsList}>
        {applications.map((application) => (
          <View key={application.id} style={styles.applicationCard}>
            <View style={styles.applicationHeader}>
              <View style={styles.applicationInfo}>
                <Icon
                  name={getStatusIcon(application.status)}
                  size={24}
                  color={getStatusColor(application.status)}
                />
                <View style={styles.applicationDetails}>
                  <Text style={styles.applicationType}>{application.type}</Text>
                  <View style={styles.applicationMeta}>
                    <Text style={styles.metaText}>
                      Submitted: {new Date(application.submittedDate).toLocaleDateString()}
                    </Text>
                    <Text style={styles.metaText}>
                      Updated: {new Date(application.lastUpdated).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.applicationActions}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(application.status) }]}>
                  <Text style={styles.statusText}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace('-', ' ')}
                  </Text>
                </View>
                <TouchableOpacity style={styles.viewButton}>
                  <Icon name="visibility" size={20} color="#2563eb" />
                </TouchableOpacity>
              </View>
            </View>

            {application.comments && (
              <View style={styles.commentsSection}>
                <Text style={styles.commentsLabel}>Comments:</Text>
                <Text style={styles.commentsText}>{application.comments}</Text>
              </View>
            )}

            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View style={[styles.progressStep, { backgroundColor: '#3b82f6' }]} />
                <View style={[
                  styles.progressLine,
                  { backgroundColor: ['in-review', 'approved', 'rejected'].includes(application.status) ? '#3b82f6' : '#e5e7eb' }
                ]} />
                <View style={[
                  styles.progressStep,
                  { backgroundColor: ['in-review', 'approved', 'rejected'].includes(application.status) ? '#3b82f6' : '#e5e7eb' }
                ]} />
                <View style={[
                  styles.progressLine,
                  { backgroundColor: ['approved', 'rejected'].includes(application.status) ? getStatusColor(application.status) : '#e5e7eb' }
                ]} />
                <View style={[
                  styles.progressStep,
                  { backgroundColor: application.status === 'approved' ? '#10b981' : application.status === 'rejected' ? '#ef4444' : '#e5e7eb' }
                ]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabel}>Submitted</Text>
                <Text style={styles.progressLabel}>Under Review</Text>
                <Text style={styles.progressLabel}>Completed</Text>
              </View>
            </View>
          </View>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  newButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  applicationsList: {
    padding: 16,
    gap: 16,
  },
  applicationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  applicationInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  applicationDetails: {
    marginLeft: 12,
    flex: 1,
  },
  applicationType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  applicationMeta: {
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  applicationActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  viewButton: {
    padding: 4,
  },
  commentsSection: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  commentsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  commentsText: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressSection: {
    marginTop: 8,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressStep: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
});

export default ApplicationsScreen;