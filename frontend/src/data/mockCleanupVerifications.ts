export type VerificationStatus = 'PENDING' | 'SUBMITTED' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';

export interface CleanupVerification {
  id: string;
  driveId: string;
  userId: string;
  beforePhoto?: string;
  afterPhoto?: string;
  beforeLatitude?: number;
  beforeLongitude?: number;
  afterLatitude?: number;
  afterLongitude?: number;
  beforeCapturedAt?: string;
  afterCapturedAt?: string;
  status: VerificationStatus;
  signals: {
    beforePhotoSubmitted: boolean;
    afterPhotoSubmitted: boolean;
    locationCaptured: boolean;
    timestampCaptured: boolean;
    participationRecorded: boolean;
    aiAssessment?: string;
    organizerConfirmed: boolean;
  };
}

// Demo images (placeholders simulating uploaded photos)
const PLACEHOLDER_BEFORE = 'https://images.unsplash.com/photo-1594705353145-2e65d8c32c4e?auto=format&fit=crop&q=80&w=400';
const PLACEHOLDER_AFTER = 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbea5?auto=format&fit=crop&q=80&w=400';

export const initialMockVerifications: CleanupVerification[] = [
  {
    id: 'ver-01',
    driveId: 'cd-01', // Adyar Community Cleanup
    userId: 'user-01',
    beforePhoto: PLACEHOLDER_BEFORE,
    afterPhoto: PLACEHOLDER_AFTER,
    beforeLatitude: 13.0033,
    beforeLongitude: 80.2555,
    afterLatitude: 13.0034,
    afterLongitude: 80.2556,
    beforeCapturedAt: '2026-10-04T07:15:00Z',
    afterCapturedAt: '2026-10-04T09:45:00Z',
    status: 'VERIFIED',
    signals: {
      beforePhotoSubmitted: true,
      afterPhotoSubmitted: true,
      locationCaptured: true,
      timestampCaptured: true,
      participationRecorded: true,
      aiAssessment: 'High confidence: Waste cleared',
      organizerConfirmed: true
    }
  },
  {
    id: 'ver-02',
    driveId: 'cd-02', // Guindy Waste Cleanup
    userId: 'user-01',
    beforePhoto: PLACEHOLDER_BEFORE,
    beforeLatitude: 13.0067,
    beforeLongitude: 80.2206,
    beforeCapturedAt: '2026-10-06T06:40:00Z',
    status: 'PENDING',
    signals: {
      beforePhotoSubmitted: true,
      afterPhotoSubmitted: false,
      locationCaptured: true,
      timestampCaptured: true,
      participationRecorded: false,
      organizerConfirmed: false
    }
  },
  {
    id: 'ver-03',
    driveId: 'cd-03', // Taramani Tech Park
    userId: 'user-02',
    beforePhoto: PLACEHOLDER_BEFORE,
    afterPhoto: PLACEHOLDER_AFTER,
    beforeLatitude: 12.9784,
    beforeLongitude: 80.2467,
    afterLatitude: 12.9784,
    afterLongitude: 80.2467,
    beforeCapturedAt: '2026-10-10T08:05:00Z',
    afterCapturedAt: '2026-10-10T11:00:00Z',
    status: 'UNDER_REVIEW',
    signals: {
      beforePhotoSubmitted: true,
      afterPhotoSubmitted: true,
      locationCaptured: true,
      timestampCaptured: true,
      participationRecorded: true,
      aiAssessment: 'Moderate confidence: Partial clearing detected',
      organizerConfirmed: false
    }
  }
];
