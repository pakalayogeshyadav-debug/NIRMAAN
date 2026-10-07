export interface CleanupDrive {
  id: string;
  title: string;
  description: string;
  organizerId: string;
  organizerName: string;
  date: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  area: string;
  city: string;
  state: string;
  wasteCategories: string[];
  participantCount: number;
  capacity: number;
  status: 'Open' | 'Almost Full' | 'Full' | 'Completed' | 'Cancelled';
  requirements: string[];
  joinedByMe?: boolean;
}

export const initialMockCleanupDrives: CleanupDrive[] = [
  {
    id: 'cd-01',
    title: 'Adyar Community Cleanup',
    description: 'Join us for a community-driven cleanup operation along the Adyar river banks. We will be focusing on plastic and mixed solid waste removal.',
    organizerId: 'org-01',
    organizerName: 'Green Chennai Initiative',
    date: '2026-10-04',
    startTime: '07:00 AM',
    endTime: '10:00 AM',
    latitude: 13.0033,
    longitude: 80.2555,
    area: 'Adyar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    wasteCategories: ['Mixed waste', 'Plastic'],
    participantCount: 18,
    capacity: 30,
    status: 'Open',
    requirements: ['Gloves', 'Water bottle', 'Comfortable clothing'],
    joinedByMe: false
  },
  {
    id: 'cd-02',
    title: 'Guindy Waste Cleanup',
    description: 'A major cleanup drive in the Guindy industrial sector. High impact expected.',
    organizerId: 'org-01',
    organizerName: 'Green Chennai Initiative',
    date: '2026-10-06',
    startTime: '06:30 AM',
    endTime: '09:30 AM',
    latitude: 13.0067,
    longitude: 80.2206,
    area: 'Guindy',
    city: 'Chennai',
    state: 'Tamil Nadu',
    wasteCategories: ['Industrial', 'Mixed waste'],
    participantCount: 28,
    capacity: 30,
    status: 'Almost Full',
    requirements: ['Gloves', 'Safety boots'],
    joinedByMe: false
  },
  {
    id: 'cd-03',
    title: 'Taramani Tech Park Surroundings',
    description: 'Weekend cleanup for IT professionals and local community around the tech parks.',
    organizerId: 'org-02',
    organizerName: 'Clean Tech Alliance',
    date: '2026-10-10',
    startTime: '08:00 AM',
    endTime: '11:00 AM',
    latitude: 12.9784,
    longitude: 80.2467,
    area: 'Taramani',
    city: 'Chennai',
    state: 'Tamil Nadu',
    wasteCategories: ['E-waste', 'Plastic'],
    participantCount: 50,
    capacity: 50,
    status: 'Full',
    requirements: ['Water bottle'],
    joinedByMe: false
  }
];
