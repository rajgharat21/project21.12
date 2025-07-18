import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockRationCard } from '../data/mockData';

const ProfileScreen = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const rationCard = mockRationCard;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Management</Text>
        <Text style={styles.description}>Update your personal information and family member details</Text>
      </View>

      {/* Personal Information */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Icon name="person" size={20} color="#6b7280" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={16} color="#2563eb" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{user?.name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <View style={styles.infoWithIcon}>
              <Icon name="phone" size={16} color="#6b7280" />
              <Text style={styles.infoValue}>{user?.phone}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Address</Text>
            <View style={styles.infoWithIcon}>
              <Icon name="location-on" size={16} color="#6b7280" />
              <Text style={styles.infoValue}>{user?.address}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Aadhaar Number</Text>
            <Text style={styles.infoValue}>****-****-{user?.aadhaarNumber?.slice(-4)}</Text>
            <Text style={styles.infoNote}>Aadhaar number cannot be changed</Text>
          </View>
        </View>
      </View>

      {/* Family Members */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Icon name="people" size={20} color="#6b7280" />
            <Text style={styles.sectionTitle}>
              Family Members ({rationCard.familyMembers.length})
            </Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={16} color="#ffffff" />
            <Text style={styles.addButtonText}>Add Member</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.membersList}>
          {rationCard.familyMembers.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberDetails}>{member.relation}, Age {member.age}</Text>
                <Text style={styles.memberAadhaar}>Aadhaar: ****-****-{member.aadhaarNumber.slice(-4)}</Text>
              </View>
              <View style={styles.memberActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="edit" size={16} color="#2563eb" />
                </TouchableOpacity>
                {member.relation !== 'Head of Family' && (
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="delete" size={16} color="#ef4444" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
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
  header: {
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
  sectionCard: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#eff6ff',
  },
  editButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#2563eb',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  infoList: {
    gap: 20,
  },
  infoItem: {
    gap: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
  },
  infoWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoNote: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  membersList: {
    gap: 12,
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  memberDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  memberAadhaar: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'monospace',
    marginTop: 4,
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});

export default ProfileScreen;