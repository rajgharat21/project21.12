// Storage utility for persisting data
export class DataStorage {
  private static readonly KEYS = {
    USER: 'eration_user',
    RATION_CARD: 'eration_ration_card',
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
  static saveUser(user: any): void {
    this.save(this.KEYS.USER, user);
  }

  static loadUser(): any {
    return this.load(this.KEYS.USER);
  }

  static saveRationCard(rationCard: any): void {
    this.save(this.KEYS.RATION_CARD, rationCard);
  }

  static loadRationCard(): any {
    return this.load(this.KEYS.RATION_CARD);
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