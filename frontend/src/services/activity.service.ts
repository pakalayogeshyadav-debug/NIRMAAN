import { mockMapData } from '@/data/mockMapData';
import type { Activity, ActivityType, Priority } from '@/data/mockMapData';
import { wasteReportService } from './wasteReportService';

export interface ActivityFilterOptions {
  type?: string;
  priority?: string;
  distance?: string;
  search?: string;
}

class ActivityService {
  /**
   * Retrieves all nearby activities based on applied filters.
   * Currently mocked using local static data.
   */
  async getNearbyActivity(filters?: ActivityFilterOptions): Promise<Activity[]> {
    return new Promise(async (resolve) => {
      // Fetch dynamic reports from wasteReportService
      const wasteReports = await wasteReportService.getWasteReports();
      
      // Map them to the Activity format
      const dynamicActivities: Activity[] = wasteReports.map(wr => ({
        id: wr.id,
        type: 'WASTE_REPORT',
        title: wr.wasteType.replace('_', ' ') + ' Waste',
        latitude: wr.latitude,
        longitude: wr.longitude,
        locationName: wr.locationLabel || 'Unknown',
        distanceKm: 0.5, // Mock value
        severity: wr.severity as Priority,
        status: 'PENDING_VERIFICATION', // Map appropriately
        timestamp: new Date(wr.reportedAt).toLocaleDateString(),
        description: wr.description
      }));

      // Simulate network delay
      setTimeout(() => {
        let results = [...mockMapData.filter(m => m.type !== 'WASTE_REPORT'), ...dynamicActivities];

        if (filters) {
          // Filter by Activity Type
          if (filters.type && filters.type !== 'All') {
            let mappedType: ActivityType | null = null;
            if (filters.type === 'Waste') mappedType = 'WASTE_REPORT';
            else if (filters.type === 'Cleanup Drives') mappedType = 'CLEANUP_DRIVE';
            else if (filters.type === 'Hotspots') mappedType = 'RECURRING_HOTSPOT';
            else if (filters.type === 'Verified') mappedType = 'VERIFIED_CLEANUP';
            
            if (mappedType) {
              results = results.filter(item => item.type === mappedType);
            }
          }

          // Filter by Priority
          if (filters.priority && filters.priority !== 'All') {
            results = results.filter(item => item.severity === filters.priority);
          }

          // Filter by Distance (mock logic)
          if (filters.distance && filters.distance !== 'Nearby') {
            const maxDistance = parseInt(filters.distance.replace(' km', ''), 10);
            if (!isNaN(maxDistance)) {
              results = results.filter(item => item.distanceKm <= maxDistance);
            }
          }

          // Filter by Search Query
          if (filters.search) {
            const query = filters.search.toLowerCase();
            results = results.filter(item => 
              item.locationName.toLowerCase().includes(query) || 
              item.title.toLowerCase().includes(query) ||
              (item.description && item.description.toLowerCase().includes(query))
            );
          }
        }

        resolve(results);
      }, 300);
    });
  }

  /**
   * Fetches only recurring hotspots for intelligence modules.
   */
  async getNearbyHotspots(): Promise<Activity[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMapData.filter(item => item.type === 'RECURRING_HOTSPOT'));
      }, 200);
    });
  }
}

export const activityService = new ActivityService();
