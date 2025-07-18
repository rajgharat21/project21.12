export interface User {
  id: string;
  aadhaarNumber: string;
  name: string;
  phone: string;
  address: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relation: string;
  aadhaarNumber: string;
}

export interface RationCard {
  id: string;
  cardNumber: string;
  cardType: 'APL' | 'BPL' | 'AAY';
  issuedDate: string;
  validUntil: string;
  familyMembers: FamilyMember[];
  monthlyQuota: {
    rice: number;
    wheat: number;
    sugar: number;
    kerosene: number;
  };
}

export interface Application {
  id: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  submittedDate: string;
  lastUpdated: string;
  comments?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}