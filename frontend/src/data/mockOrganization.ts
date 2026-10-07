import type { User } from '@/types';

export const mockOrganization: User & Record<string, any> = {
  id: 'org-123',
  email: 'contact@greenchennai.org',
  name: 'Green Chennai Initiative',
  accountType: 'ORGANIZATION',
  role: 'NGO',
  createdAt: '2023-04-10T10:00:00.000Z',
  
  // Extended profile fields
  registrationNumber: 'TN-NGO-2023-4567',
  yearEstablished: '2023',
  description: 'Green Chennai Initiative is a local NGO focused on restoring water bodies, organizing regular coastal cleanups, and educating the community on proper waste segregation practices.',
  
  contactPhone: '+91 88888 77777',
  website: 'https://greenchennai.org',
  primaryContactPerson: 'Ravi Kumar',
  
  state: 'Tamil Nadu',
  city: 'Chennai',
  area: 'Besant Nagar',
  pincode: '600090',
  operatingRegions: 'South Chennai, ECR',
  
  mission: 'To create a zero-waste Chennai through community empowerment and active cleanup interventions.',
  areasOfFocus: ['Cleanup Drives', 'Waste Segregation', 'Environmental Awareness'],
  volunteerCapacity: '50-100 active volunteers',
  preferredCleanupRadius: '10 km',
  
  stats: {
    cleanupDrives: 24,
    volunteersEngaged: 350,
    wasteReportsAddressed: 120,
    verifiedCleanups: 85,
    fundsAllocated: '₹1,25,000'
  },
  
  verificationStatus: 'UNVERIFIED'
};
