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

const RationCardScreen = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const rationCard = mockRationCard;

  const getCardTypeColor = (type: string) => {
    switch (type) {
      case 'APL':
        return '#10b981';
      case 'BPL':
        return '#3b82f6';
      case 'AAY':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Digital Ration Card */}
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>{t('nav.rationCard')}</Text>
            <Text style={styles.cardSubtitle}>{t('header.title')}</Text>
          </View>
          <View style={[styles.cardTypeBadge, { backgroundColor: getCardTypeColor(rationCard.cardType) }]}>
            <Text style={styles.cardTypeText}>{rationCard.cardType}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Card Number</Text>
              <Text style={styles.infoValue}>{rationCard.cardNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Head of Family</Text>
              <Text style={styles.infoValue}>{user?.name}</Text>
            </View>
            <View style={styles.infoGrid}>
              <View style={styles.infoGridItem}>
                <Text style={styles.infoLabel}>Issued</Text>
                <Text style={styles.infoValue}>{new Date(rationCard.issuedDate).toLocaleDateString()}</Text>
              </View>
              <View style={styles.infoGridItem}>
                <Text style={styles.infoLabel}>Valid Until</Text>
                <Text style={styles.infoValue}>{new Date(rationCard.validUntil).toLocaleDateString()}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.qrContainer}>
            <View style={styles.qrCode}>
              <Icon name="qr-code" size={80} color="#374151" />
            </View>
          </View>
        </View>
      </View>

      {/* Card Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Icon name="download" size={20} color="#ffffff" />
          <Text style={styles.primaryButtonText}>Download Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Icon name="edit" size={20} color="#374151" />
          <Text style={styles.secondaryButtonText}>Update Details</Text>
        </TouchableOpacity>
      </View>

      {/* Personal Information */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Icon name="location-on" size={20} color="#6b7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoItemLabel}>Address</Text>
              <Text style={styles.infoItemValue}>{user?.address}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Icon name="phone" size={20} color="#6b7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoItemLabel}>Phone</Text>
              <Text style={styles.infoItemValue}>{user?.phone}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Family Members */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          Family Members ({rationCard.familyMembers.length})
        </Text>
        <View style={styles.membersList}>
          {rationCard.familyMembers.map((member) => (
            <View key={member.id} style={styles.memberItem}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberDetails}>{member.relation}, Age {member.age}</Text>
              </View>
              <Text style={styles.memberAadhaar}>****{member.aadhaarNumber.slice(-4)}</Text>
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
  cardContainer: {
    backgroundColor: '#2563eb',
    margin: 16,
    borderRadius: 12,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#bfdbfe',
  },
  cardTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardTypeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardInfo: {
    flex: 1,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#bfdbfe',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  infoGrid: {
    flexDirection: 'row',
  },
  infoGridItem: {
    flex: 1,
    marginRight: 16,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '600',
    marginLeft: 8,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  infoList: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoItemLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  infoItemValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  membersList: {
    gap: 12,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  memberDetails: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  memberAadhaar: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'monospace',
  },
});

export default RationCardScreen;