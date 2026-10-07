import type { User } from '@/types';

export const mockUser: User & Record<string, any> = {
  id: 'usr-123',
  email: 'user@nirmaan.demo',
  name: 'Demo User',
  accountType: 'USER',
  role: 'CITIZEN',
  createdAt: '2025-01-15T08:00:00.000Z',
  
  // Extended profile fields
  mobile: '+91 98765 43210',
  dateOfBirth: '1995-08-22',
  gender: 'Prefer not to say',
  
  state: 'Tamil Nadu',
  city: 'Chennai',
  area: 'Adyar',
  pincode: '600020',
  
  aboutMe: 'Passionate about keeping Chennai clean and green. Always ready for weekend cleanup drives.',
  preferredWasteCategories: ['Plastic', 'Mixed waste', 'E-waste'],
  preferredActivityRadius: '5 km',
  
  reportsSubmitted: 12,
  drivesJoined: 4,
  verifiedActions: 8
};
