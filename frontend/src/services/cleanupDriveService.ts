import { initialMockCleanupDrives } from '@/data/mockCleanupDrives';
import type { CleanupDrive } from '@/data/mockCleanupDrives';

let mockDrives = [...initialMockCleanupDrives];

export const cleanupDriveService = {
  async getCleanupDrives(filters?: any): Promise<CleanupDrive[]> {
    let result = [...mockDrives];
    
    if (filters?.status && filters.status !== 'All') {
      result = result.filter(d => d.status === filters.status);
    }
    
    // Add fake delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return result;
  },

  async getCleanupDriveById(id: string): Promise<CleanupDrive | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDrives.find(d => d.id === id);
  },

  async joinCleanupDrive(id: string): Promise<CleanupDrive> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const driveIndex = mockDrives.findIndex(d => d.id === id);
    if (driveIndex === -1) throw new Error('Drive not found');
    
    const drive = mockDrives[driveIndex];
    if (drive.participantCount >= drive.capacity) {
      throw new Error('Drive is full');
    }
    
    const updatedDrive = {
      ...drive,
      participantCount: drive.participantCount + 1,
      joinedByMe: true,
      status: (drive.participantCount + 1) >= drive.capacity ? 'Full' : drive.status
    };
    
    mockDrives[driveIndex] = updatedDrive as CleanupDrive;
    return updatedDrive;
  },

  async createCleanupDrive(driveData: Partial<CleanupDrive>): Promise<CleanupDrive> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const newDrive: CleanupDrive = {
      id: `cd-${Date.now()}`,
      title: driveData.title || '',
      description: driveData.description || '',
      organizerId: 'org-current', // Mock ID
      organizerName: 'Current Organization', // Mock Name
      date: driveData.date || '',
      startTime: driveData.startTime || '',
      endTime: driveData.endTime || '',
      latitude: driveData.latitude || 13.0,
      longitude: driveData.longitude || 80.2,
      area: driveData.area || '',
      city: driveData.city || '',
      state: driveData.state || '',
      wasteCategories: driveData.wasteCategories || [],
      participantCount: 0,
      capacity: driveData.capacity || 10,
      status: 'Open',
      requirements: driveData.requirements || [],
    };
    
    mockDrives = [newDrive, ...mockDrives];
    return newDrive;
  },

  async cancelCleanupDrive(id: string): Promise<CleanupDrive> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const driveIndex = mockDrives.findIndex(d => d.id === id);
    if (driveIndex === -1) throw new Error('Drive not found');
    
    const updatedDrive = { ...mockDrives[driveIndex], status: 'Cancelled' as const };
    mockDrives[driveIndex] = updatedDrive;
    return updatedDrive;
  }
};
