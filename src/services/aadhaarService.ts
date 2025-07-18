// Aadhaar Integration Service
// NOTE: This requires official UIDAI API access and proper licensing

interface AadhaarAuthRequest {
  aadhaarNumber: string;
  otp?: string;
  biometric?: string;
  demographic?: {
    name?: string;
    dob?: string;
    gender?: string;
  };
}

interface AadhaarAuthResponse {
  success: boolean;
  txnId: string;
  message: string;
  userData?: {
    name: string;
    dob: string;
    gender: string;
    address: string;
    phone: string;
  };
}

class AadhaarService {
  private baseUrl = 'https://api.uidai.gov.in'; // Official UIDAI endpoint
  private auaCode: string;
  private subAuaCode: string;
  private licenseKey: string;

  constructor(auaCode: string, subAuaCode: string, licenseKey: string) {
    this.auaCode = auaCode;
    this.subAuaCode = subAuaCode;
    this.licenseKey = licenseKey;
  }

  // Step 1: Generate OTP for Aadhaar number
  async generateOtp(aadhaarNumber: string): Promise<AadhaarAuthResponse> {
    try {
      // Check if service is configured with real credentials
      if (this.auaCode === 'YOUR_AUA_CODE' || 
          this.subAuaCode === 'YOUR_SUB_AUA_CODE' || 
          this.licenseKey === 'YOUR_LICENSE_KEY') {
        throw new Error('AadhaarService not configured for real API calls. Using demo mode.');
      }

      // Validate Aadhaar number format
      if (!this.validateAadhaarNumber(aadhaarNumber)) {
        return {
          success: false,
          txnId: '',
          message: 'Invalid Aadhaar number format'
        };
      }

      // Encrypt Aadhaar number (required by UIDAI)
      const encryptedAadhaar = await this.encryptData(aadhaarNumber);

      const requestData = {
        aadhaarNumber: encryptedAadhaar,
        auaCode: this.auaCode,
        subAuaCode: this.subAuaCode,
        txnId: this.generateTransactionId(),
        timestamp: new Date().toISOString()
      };

      // Sign the request (digital signature required)
      const signedRequest = await this.signRequest(requestData);

      const response = await fetch(`${this.baseUrl}/auth/otp/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.licenseKey}`,
          'X-Digital-Signature': signedRequest.signature
        },
        body: JSON.stringify(signedRequest.data)
      });

      const result = await response.json();
      
      return {
        success: result.status === 'SUCCESS',
        txnId: result.txnId,
        message: result.message,
        userData: result.userData
      };

    } catch (error) {
      console.error('Aadhaar OTP generation failed:', error);
      return {
        success: false,
        txnId: '',
        message: 'Service temporarily unavailable'
      };
    }
  }

  // Step 2: Verify OTP and authenticate
  async verifyOtp(aadhaarNumber: string, otp: string, txnId: string): Promise<AadhaarAuthResponse> {
    try {
      // Check if service is configured with real credentials
      if (this.auaCode === 'YOUR_AUA_CODE' || 
          this.subAuaCode === 'YOUR_SUB_AUA_CODE' || 
          this.licenseKey === 'YOUR_LICENSE_KEY') {
        throw new Error('AadhaarService not configured for real API calls. Using demo mode.');
      }

      const encryptedAadhaar = await this.encryptData(aadhaarNumber);
      const encryptedOtp = await this.encryptData(otp);

      const requestData = {
        aadhaarNumber: encryptedAadhaar,
        otp: encryptedOtp,
        txnId: txnId,
        auaCode: this.auaCode,
        subAuaCode: this.subAuaCode,
        timestamp: new Date().toISOString()
      };

      const signedRequest = await this.signRequest(requestData);

      const response = await fetch(`${this.baseUrl}/auth/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.licenseKey}`,
          'X-Digital-Signature': signedRequest.signature
        },
        body: JSON.stringify(signedRequest.data)
      });

      const result = await response.json();

      return {
        success: result.status === 'SUCCESS',
        txnId: result.txnId,
        message: result.message,
        userData: result.userData ? {
          name: result.userData.name,
          dob: result.userData.dob,
          gender: result.userData.gender,
          address: result.userData.address,
          phone: result.userData.phone
        } : undefined
      };

    } catch (error) {
      console.error('Aadhaar OTP verification failed:', error);
      return {
        success: false,
        txnId: '',
        message: 'Verification failed'
      };
    }
  }

  // Validate Aadhaar number using Verhoeff algorithm
  private validateAadhaarNumber(aadhaarNumber: string): boolean {
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return false;
    }

    // Verhoeff algorithm implementation
    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];

    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];

    let c = 0;
    const myArray = aadhaarNumber.split('').reverse();
    
    for (let i = 0; i < myArray.length; i++) {
      c = d[c][p[((i + 1) % 8)][parseInt(myArray[i])]];
    }
    
    return c === 0;
  }

  // Generate unique transaction ID
  private generateTransactionId(): string {
    return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  }

  // Encrypt sensitive data (implement proper encryption)
  private async encryptData(data: string): Promise<string> {
    // Implement AES-256 encryption as required by UIDAI
    // This is a placeholder - use proper encryption library
    return btoa(data); // Base64 encoding (NOT secure - use proper encryption)
  }

  // Digital signature for request authentication
  private async signRequest(data: any): Promise<{ data: any; signature: string }> {
    // Implement digital signature using your private key
    // This is required for UIDAI API authentication
    const signature = 'DIGITAL_SIGNATURE_PLACEHOLDER';
    return { data, signature };
  }
}

export default AadhaarService;