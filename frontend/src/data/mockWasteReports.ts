export type WasteType = 'MIXED_WASTE' | 'PLASTIC' | 'ORGANIC' | 'CONSTRUCTION' | 'E_WASTE' | 'HAZARDOUS' | 'OTHER';
export type WasteSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type WasteReportStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'ACCEPTED' | 'ASSIGNED' | 'CLEANUP_IN_PROGRESS' | 'CLEANED' | 'REJECTED';

export interface AIAssessment {
  detectedWasteTypes: string[];
  estimatedSeverity: WasteSeverity;
  visibleObjects: string[];
  confidence: number;
  possibleHazards: string[];
}

export interface WasteReport {
  id: string;
  reporterId: string;
  photoUrl: string;
  latitude: number;
  longitude: number;
  locationLabel?: string;
  reportedAt: string;
  wasteType: WasteType;
  severity: WasteSeverity;
  description?: string;
  status: WasteReportStatus;
  priority: WasteSeverity;
  aiAssessment?: AIAssessment;
  duplicateWarning?: boolean;
  duplicateOfReportId?: string;
  hotspotId?: string;
  createdAt: string;
  updatedAt: string;
}

const PLACEHOLDER_IMG_1 = 'https://images.unsplash.com/photo-1594705353145-2e65d8c32c4e?auto=format&fit=crop&q=80&w=400';
const PLACEHOLDER_IMG_2 = 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbea5?auto=format&fit=crop&q=80&w=400';

export const initialMockWasteReports: WasteReport[] = [
  {
    id: 'wr-01',
    reporterId: 'user-01',
    photoUrl: PLACEHOLDER_IMG_1,
    latitude: 13.0033,
    longitude: 80.2555,
    locationLabel: 'Adyar River Bank',
    reportedAt: '2026-10-01T10:00:00Z',
    wasteType: 'PLASTIC',
    severity: 'HIGH',
    description: 'Large amount of plastic bottles dumped near the river.',
    status: 'CLEANUP_IN_PROGRESS',
    priority: 'HIGH',
    aiAssessment: {
      detectedWasteTypes: ['PLASTIC', 'MIXED'],
      estimatedSeverity: 'HIGH',
      visibleObjects: ['Plastic bottles', 'Bags'],
      confidence: 89,
      possibleHazards: ['None detected']
    },
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-02T10:00:00Z',
  },
  {
    id: 'wr-02',
    reporterId: 'user-02',
    photoUrl: PLACEHOLDER_IMG_2,
    latitude: 13.0067,
    longitude: 80.2206,
    locationLabel: 'Guindy Industrial Estate',
    reportedAt: '2026-10-02T08:30:00Z',
    wasteType: 'CONSTRUCTION',
    severity: 'MEDIUM',
    description: 'Debris left after recent pipe work.',
    status: 'UNDER_REVIEW',
    priority: 'MEDIUM',
    createdAt: '2026-10-02T08:30:00Z',
    updatedAt: '2026-10-02T09:00:00Z',
  },
  {
    id: 'wr-03',
    reporterId: 'user-01',
    photoUrl: PLACEHOLDER_IMG_1,
    latitude: 12.9784,
    longitude: 80.2467,
    locationLabel: 'Taramani Tech Park',
    reportedAt: '2026-10-02T18:00:00Z',
    wasteType: 'E_WASTE',
    severity: 'CRITICAL',
    description: 'Broken monitors and electronic components dumped on the pavement.',
    status: 'SUBMITTED',
    priority: 'CRITICAL',
    createdAt: '2026-10-02T18:00:00Z',
    updatedAt: '2026-10-02T18:00:00Z',
  }
];
