import { initialMockWasteReports } from '@/data/mockWasteReports';
import type { WasteReport, AIAssessment } from '@/data/mockWasteReports';

let mockReports = [...initialMockWasteReports];

export const wasteReportService = {
  async getWasteReports(): Promise<WasteReport[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockReports].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getWasteReportById(id: string): Promise<WasteReport | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockReports.find(r => r.id === id);
  },

  async createWasteReport(reportData: Partial<WasteReport>): Promise<WasteReport> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newReport: WasteReport = {
      id: `wr-${Date.now()}`,
      reporterId: 'user-01', // Mock current user
      photoUrl: reportData.photoUrl || '',
      latitude: reportData.latitude || 13.0,
      longitude: reportData.longitude || 80.2,
      locationLabel: reportData.locationLabel || 'Unknown Location',
      reportedAt: new Date().toISOString(),
      wasteType: reportData.wasteType || 'MIXED_WASTE',
      severity: reportData.severity || 'MEDIUM',
      description: reportData.description || '',
      status: 'SUBMITTED',
      priority: reportData.severity || 'MEDIUM',
      aiAssessment: reportData.aiAssessment,
      duplicateWarning: reportData.duplicateWarning,
      duplicateOfReportId: reportData.duplicateOfReportId,
      hotspotId: reportData.hotspotId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockReports.push(newReport);
    return newReport;
  },

  async updateWasteReport(id: string, updates: Partial<WasteReport>): Promise<WasteReport> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockReports.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Report not found');
    
    const updated = {
      ...mockReports[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    mockReports[index] = updated;
    return updated;
  },

  async checkDuplicateReport(lat: number, lng: number): Promise<{ isDuplicate: boolean; existingReport?: WasteReport }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple mock logic: if within roughly ~100 meters (0.001 degrees)
    const duplicate = mockReports.find(r => {
      const distance = Math.sqrt(Math.pow(r.latitude - lat, 2) + Math.pow(r.longitude - lng, 2));
      return distance < 0.001;
    });

    if (duplicate) {
      return { isDuplicate: true, existingReport: duplicate };
    }
    return { isDuplicate: false };
  },

  async assessWasteReport(_photoUrl: string, wasteType: string): Promise<AIAssessment> {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI delay
    
    // Mock response based on input
    const isPlastic = wasteType === 'PLASTIC';
    const isCritical = wasteType === 'HAZARDOUS' || wasteType === 'E_WASTE';
    
    return {
      detectedWasteTypes: [wasteType, isPlastic ? 'MIXED' : 'ORGANIC'],
      estimatedSeverity: isCritical ? 'CRITICAL' : 'HIGH',
      visibleObjects: isPlastic ? ['Plastic bags', 'Bottles'] : ['Mixed debris', 'Cardboard'],
      confidence: Math.floor(Math.random() * 20) + 75, // 75-95%
      possibleHazards: isCritical ? ['Potential chemical leak', 'Sharp objects'] : ['None detected']
    };
  }
};
