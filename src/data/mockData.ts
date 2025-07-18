import { RationCard, Notification } from '../types';

export const mockRationCard: RationCard = {
  id: '1',
  cardNumber: 'DL01234567890123',
  cardType: 'BPL',
  issuedDate: '2020-01-15',
  validUntil: '2030-01-15',
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
};

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