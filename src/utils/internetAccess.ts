// Internet access utility functions
export class InternetAccessManager {
  private static readonly STORAGE_KEY = 'internet_access_status';
  
  // Check if user has internet access
  static async checkAccess(aadhaarNumber: string): Promise<boolean> {
    try {
      const accessData = localStorage.getItem(this.STORAGE_KEY);
      if (accessData) {
        const parsed = JSON.parse(accessData);
        return parsed[aadhaarNumber] === true;
      }
      return false;
    } catch (error) {
      console.error('Error checking internet access:', error);
      return false;
    }
  }
  
  // Enable internet access for user
  static async enableAccess(aadhaarNumber: string): Promise<void> {
    try {
      const accessData = localStorage.getItem(this.STORAGE_KEY);
      const parsed = accessData ? JSON.parse(accessData) : {};
      parsed[aadhaarNumber] = true;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(parsed));
      
      // Simulate API call to enable internet
      console.log(`Internet access enabled for Aadhaar: ${aadhaarNumber}`);
    } catch (error) {
      console.error('Error enabling internet access:', error);
    }
  }
  
  // Disable internet access for user
  static async disableAccess(aadhaarNumber: string): Promise<void> {
    try {
      const accessData = localStorage.getItem(this.STORAGE_KEY);
      const parsed = accessData ? JSON.parse(accessData) : {};
      parsed[aadhaarNumber] = false;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(parsed));
      
      // Simulate API call to disable internet
      console.log(`Internet access disabled for Aadhaar: ${aadhaarNumber}`);
    } catch (error) {
      console.error('Error disabling internet access:', error);
    }
  }
  
  // Get internet usage statistics
  static async getUsageStats(aadhaarNumber: string): Promise<{
    dataUsed: number;
    dataLimit: number;
    validUntil: string;
    plan: string;
  }> {
    // Mock data - in real implementation, this would come from API
    return {
      dataUsed: Math.floor(Math.random() * 80) + 10, // 10-90 GB
      dataLimit: 100, // 100 GB
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      plan: 'Premium'
    };
  }
}

// Convenience functions
export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://www.google.com/favicon.ico', {
      method: 'HEAD',
      mode: 'no-cors'
    });
    return true;
  } catch {
    return false;
  }
};

export const enableInternetAccess = async (aadhaarNumber: string): Promise<void> => {
  await InternetAccessManager.enableAccess(aadhaarNumber);
};

export const disableInternetAccess = async (aadhaarNumber: string): Promise<void> => {
  await InternetAccessManager.disableAccess(aadhaarNumber);
};

export const getInternetUsage = async (aadhaarNumber: string) => {
  return await InternetAccessManager.getUsageStats(aadhaarNumber);
};