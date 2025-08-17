// Storage utility for persisting data
import { UserProfile } from '../types';

export class DataStorage {
  private static readonly KEYS = {
    USER_PROFILE: 'eration_user_profile',
    RATION_CARD: 'eration_ration_card',
    RATION_CARDS: 'eration_ration_cards',
    NOTIFICATIONS: 'eration_notifications',
    APPLICATIONS: 'eration_applications'
  };

  // Generic storage methods
  static save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static load<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  // Specific data methods
  static saveUserProfile(profile: UserProfile): void {
    this.save(this.KEYS.USER_PROFILE, profile);
  }

  static loadUserProfile(): UserProfile | null {
    return this.load(this.KEYS.USER_PROFILE);
  }

  static saveRationCard(rationCard: any): void {
    this.save(this.KEYS.RATION_CARD, rationCard);
  }

  static loadRationCard(): any {
    return this.load(this.KEYS.RATION_CARD);
  }

  static saveRationCards(rationCards: any[]): void {
    this.save(this.KEYS.RATION_CARDS, rationCards);
  }

  static loadRationCards(): any[] {
    return this.load(this.KEYS.RATION_CARDS) || [];
  }

  static saveNotifications(notifications: any[]): void {
    this.save(this.KEYS.NOTIFICATIONS, notifications);
  }

  static loadNotifications(): any[] {
    return this.load(this.KEYS.NOTIFICATIONS) || [];
  }

  static saveApplications(applications: any[]): void {
    this.save(this.KEYS.APPLICATIONS, applications);
  }

  static loadApplications(): any[] {
    return this.load(this.KEYS.APPLICATIONS) || [];
  }

  static clearAll(): void {
    Object.values(this.KEYS).forEach(key => this.remove(key));
  }
}