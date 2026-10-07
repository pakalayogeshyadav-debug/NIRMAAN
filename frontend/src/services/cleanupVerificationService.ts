import { initialMockVerifications } from '@/data/mockCleanupVerifications';
import type { CleanupVerification } from '@/data/mockCleanupVerifications';

let mockVerifications = [...initialMockVerifications];

export const cleanupVerificationService = {
  async getVerificationForDriveAndUser(driveId: string, userId: string): Promise<CleanupVerification | undefined> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockVerifications.find(v => v.driveId === driveId && v.userId === userId);
  },

  async getVerificationsForDrive(driveId: string): Promise<CleanupVerification[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockVerifications.filter(v => v.driveId === driveId);
  },

  async getUserVerifications(userId: string): Promise<CleanupVerification[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockVerifications.filter(v => v.userId === userId);
  },

  async createVerification(driveId: string, userId: string): Promise<CleanupVerification> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newVer: CleanupVerification = {
      id: `ver-${Date.now()}`,
      driveId,
      userId,
      status: 'PENDING',
      signals: {
        beforePhotoSubmitted: false,
        afterPhotoSubmitted: false,
        locationCaptured: false,
        timestampCaptured: false,
        participationRecorded: false,
        organizerConfirmed: false
      }
    };
    mockVerifications.push(newVer);
    return newVer;
  },

  async submitBeforeEvidence(id: string, photo: string, lat?: number, lng?: number): Promise<CleanupVerification> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const vIndex = mockVerifications.findIndex(v => v.id === id);
    if (vIndex === -1) throw new Error('Verification not found');
    
    const updated = {
      ...mockVerifications[vIndex],
      beforePhoto: photo,
      beforeLatitude: lat,
      beforeLongitude: lng,
      beforeCapturedAt: new Date().toISOString(),
      signals: {
        ...mockVerifications[vIndex].signals,
        beforePhotoSubmitted: true,
        locationCaptured: !!lat && !!lng,
        timestampCaptured: true
      }
    };
    mockVerifications[vIndex] = updated;
    return updated;
  },

  async submitAfterEvidence(id: string, photo: string, lat?: number, lng?: number): Promise<CleanupVerification> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const vIndex = mockVerifications.findIndex(v => v.id === id);
    if (vIndex === -1) throw new Error('Verification not found');
    
    const updated = {
      ...mockVerifications[vIndex],
      afterPhoto: photo,
      afterLatitude: lat,
      afterLongitude: lng,
      afterCapturedAt: new Date().toISOString(),
      signals: {
        ...mockVerifications[vIndex].signals,
        afterPhotoSubmitted: true,
        participationRecorded: true,
      }
    };
    mockVerifications[vIndex] = updated;
    return updated;
  },

  async submitVerification(id: string): Promise<CleanupVerification> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const vIndex = mockVerifications.findIndex(v => v.id === id);
    if (vIndex === -1) throw new Error('Verification not found');
    
    const updated = {
      ...mockVerifications[vIndex],
      status: 'UNDER_REVIEW' as const,
      signals: {
        ...mockVerifications[vIndex].signals,
        aiAssessment: 'AI-assisted evidence assessment pending'
      }
    };
    mockVerifications[vIndex] = updated;
    return updated;
  }
};
