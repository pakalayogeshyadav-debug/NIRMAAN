export type ActivityType = 'WASTE_REPORT' | 'CLEANUP_DRIVE' | 'VERIFIED_CLEANUP' | 'RECURRING_HOTSPOT';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'PENDING_VERIFICATION' | 'ACTIVE' | 'OPEN' | 'COMPLETED' | 'NEEDS_ATTENTION' | 'VERIFIED';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  latitude: number;
  longitude: number;
  locationName: string;
  distanceKm: number;
  severity?: Priority;
  status: Status;
  timestamp: string;
  description?: string;
  volunteers?: number;
  reportCount?: number;
}

export const mockMapData: Activity[] = [
  {
    id: 'nir-m-001',
    type: 'WASTE_REPORT',
    title: 'Mixed Solid Waste Overflow',
    latitude: 12.9934,
    longitude: 80.2447, // Adyar
    locationName: 'Adyar',
    distanceKm: 1.8,
    severity: 'High',
    status: 'NEEDS_ATTENTION',
    timestamp: 'Reported 2 hours ago',
    description: 'Large pile of mixed waste blocking the sidewalk near the bus stand.'
  },
  {
    id: 'nir-m-002',
    type: 'CLEANUP_DRIVE',
    title: 'Velachery Lake Cleanup',
    latitude: 12.9782,
    longitude: 80.2212, // Velachery
    locationName: 'Velachery',
    distanceKm: 3.2,
    severity: 'Medium',
    status: 'OPEN',
    timestamp: 'Saturday, 4 Oct',
    volunteers: 18,
    description: 'Join us to clear the edges of the Velachery lake. Gloves and bags provided.'
  },
  {
    id: 'nir-m-003',
    type: 'VERIFIED_CLEANUP',
    title: 'Saidapet Riverbank Clearing',
    latitude: 13.0213,
    longitude: 80.2231, // Saidapet
    locationName: 'Saidapet',
    distanceKm: 4.5,
    severity: 'Low',
    status: 'VERIFIED',
    timestamp: 'Completed 2 days ago',
    volunteers: 8,
    description: 'Before/after evidence available. Team successfully cleared 400kg of waste.'
  },
  {
    id: 'nir-m-004',
    type: 'RECURRING_HOTSPOT',
    title: 'Guindy Industrial Waste Dump',
    latitude: 13.0067,
    longitude: 80.2206, // Guindy
    locationName: 'Guindy',
    distanceKm: 5.1,
    severity: 'Critical',
    status: 'ACTIVE',
    timestamp: 'Ongoing issue',
    reportCount: 12,
    description: 'Needs coordinated action. Repeated dumping of industrial and construction waste.'
  },
  {
    id: 'nir-m-005',
    type: 'WASTE_REPORT',
    title: 'Plastic Waste Accumulation',
    latitude: 13.0405,
    longitude: 80.2337, // T. Nagar
    locationName: 'T. Nagar',
    distanceKm: 6.8,
    severity: 'Medium',
    status: 'PENDING_VERIFICATION',
    timestamp: 'Reported 5 hours ago',
    description: 'Plastic bags and packaging material scattered around the market corner.'
  },
  {
    id: 'nir-m-006',
    type: 'CLEANUP_DRIVE',
    title: 'Besant Nagar Beach Cleanup',
    latitude: 12.9995,
    longitude: 80.2715, // Besant Nagar
    locationName: 'Besant Nagar',
    distanceKm: 2.1,
    severity: 'High',
    status: 'OPEN',
    timestamp: 'Sunday, 5 Oct',
    volunteers: 45,
    description: 'Mass coastal cleanup drive following the weekend.'
  },
  {
    id: 'nir-m-007',
    type: 'WASTE_REPORT',
    title: 'E-Waste Dumped in Empty Lot',
    latitude: 12.9830,
    longitude: 80.2590, // Thiruvanmiyur
    locationName: 'Thiruvanmiyur',
    distanceKm: 2.5,
    severity: 'Medium',
    status: 'NEEDS_ATTENTION',
    timestamp: 'Reported 1 day ago',
    description: 'Old computers and tube lights dumped in the empty residential plot.'
  },
  {
    id: 'nir-m-008',
    type: 'RECURRING_HOTSPOT',
    title: 'Taramani Open Drain Blockage',
    latitude: 12.9785,
    longitude: 80.2450, // Taramani
    locationName: 'Taramani',
    distanceKm: 3.5,
    severity: 'High',
    status: 'ACTIVE',
    timestamp: 'Ongoing issue',
    reportCount: 8,
    description: 'Waste constantly clogging the main storm water drain.'
  }
];
