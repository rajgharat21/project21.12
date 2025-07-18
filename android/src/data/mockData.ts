export const mockRationCard = {
  id: '1',
  cardNumber: 'DL01234567890123',
  cardType: 'BPL' as const,
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