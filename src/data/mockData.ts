import { RationCard, Notification } from '../types';

export const mockRationCards: { [aadhaarNumber: string]: RationCard } = {
  '123456789012': {
    id: '1',
    cardNumber: 'DL01234567890123',
    cardType: 'BPL',
    issuedDate: '2020-01-15',
    validUntil: '2030-01-15',
    aadhaarNumber: '123456789012',
    userId: '1',
    familyMembers: [
      {
        id: '1',
        name: 'Rajesh Kumar',
        age: 45,
        relation: 'Head of Family',
        aadhaarNumber: '123456789012'
      },
      {
        id: '2',
        name: 'Sunita Kumar',
        age: 40,
        relation: 'Spouse',
        aadhaarNumber: '123456789013'
      },
      {
        id: '3',
        name: 'Amit Kumar',
        age: 18,
        relation: 'Son',
        aadhaarNumber: '123456789014'
      },
      {
        id: '4',
        name: 'Priya Kumar',
        age: 15,
        relation: 'Daughter',
        aadhaarNumber: '123456789015'
      }
    ],
    monthlyQuota: {
      rice: 20,
      wheat: 15,
      sugar: 2,
      kerosene: 5
    }
  },
  '234567890123': {
    id: '2',
    cardNumber: 'MH02345678901234',
    cardType: 'APL',
    issuedDate: '2019-03-20',
    validUntil: '2029-03-20',
    aadhaarNumber: '234567890123',
    userId: '2',
    familyMembers: [
      {
        id: '5',
        name: 'Priya Sharma',
        age: 35,
        relation: 'Head of Family',
        aadhaarNumber: '234567890123'
      },
      {
        id: '6',
        name: 'Arjun Sharma',
        age: 12,
        relation: 'Son',
        aadhaarNumber: '234567890124'
      }
    ],
    monthlyQuota: {
      rice: 15,
      wheat: 10,
      sugar: 1,
      kerosene: 3
    }
  },
  '345678901234': {
    id: '3',
    cardNumber: 'KA03456789012345',
    cardType: 'AAY',
    issuedDate: '2021-07-10',
    validUntil: '2031-07-10',
    aadhaarNumber: '345678901234',
    userId: '3',
    familyMembers: [
      {
        id: '7',
        name: 'Amit Singh',
        age: 28,
        relation: 'Head of Family',
        aadhaarNumber: '345678901234'
      },
      {
        id: '8',
        name: 'Neha Singh',
        age: 25,
        relation: 'Spouse',
        aadhaarNumber: '345678901235'
      },
      {
        id: '9',
        name: 'Baby Singh',
        age: 2,
        relation: 'Daughter',
        aadhaarNumber: '345678901236'
      }
    ],
    monthlyQuota: {
      rice: 35,
      wheat: 25,
      sugar: 3,
      kerosene: 8
    }
  },
  '555666777888': {
    id: '4',
    cardNumber: 'TS04567890123456',
    cardType: 'BPL',
    issuedDate: '2020-11-05',
    validUntil: '2030-11-05',
    aadhaarNumber: '555666777888',
    userId: '4',
    familyMembers: [
      {
        id: '10',
        name: 'Meera Joshi',
        age: 42,
        relation: 'Head of Family',
        aadhaarNumber: '555666777888'
      },
      {
        id: '11',
        name: 'Rahul Joshi',
        age: 16,
        relation: 'Son',
        aadhaarNumber: '555666777889'
      },
      {
        id: '12',
        name: 'Pooja Joshi',
        age: 14,
        relation: 'Daughter',
        aadhaarNumber: '555666777890'
      }
    ],
    monthlyQuota: {
      rice: 18,
      wheat: 12,
      sugar: 2,
      kerosene: 4
    }
  }
};

// Default ration card for backward compatibility
export const mockRationCard = mockRationCards['123456789012'];
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Ration Distribution Available',
    message: 'Your monthly ration for December 2024 is now available for collection at your designated Fair Price Shop.',
    type: 'success',
    date: '2024-12-22',
    read: false
  },
  {
    id: '2',
    title: 'Card Renewal Reminder',
    message: 'Your ration card is valid until January 2030. No action required at this time.',
    type: 'info',
    date: '2024-12-20',
    read: false
  },
  {
    id: '3',
    title: 'Address Verification Completed',
    message: 'Your address change request has been approved and updated in the system.',
    type: 'success',
    date: '2024-12-18',
    read: true
  },
  {
    id: '4',
    title: 'Price Update',
    message: 'New subsidized rates effective from January 2025: Rice ₹2/kg, Wheat ₹1.5/kg',
    type: 'info',
    date: '2024-12-15',
    read: true
  },
  {
    id: '5',
    title: 'System Maintenance',
    message: 'The e-Ration portal will be under maintenance on Dec 25, 2024 from 2 AM to 6 AM.',
    type: 'warning',
    date: '2024-12-14',
    read: true
  }
];