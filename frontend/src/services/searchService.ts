import { mockMapData } from '@/data/mockMapData';
import type { Activity } from '@/data/mockMapData';
import { getNavigationForRole } from '@/components/navigation/navigationConfig';

export interface PageResult {
  title: string;
  href: string;
  icon?: any;
}

export interface SearchResults {
  pages: PageResult[];
  activities: Activity[];
}

export const searchService = {
  async search(query: string, accountType: any = 'USER', basePath: string): Promise<SearchResults> {
    const q = query.toLowerCase().trim();
    
    // Pages
    const navigation = getNavigationForRole(accountType, basePath);
    const pages: PageResult[] = [];
    
    navigation.forEach(section => {
      section.items.forEach(item => {
        if (!q || item.name.toLowerCase().includes(q)) {
          pages.push({
            title: item.name,
            href: item.href,
            icon: item.icon
          });
        }
      });
    });

    if (!q) {
      return { pages: pages.slice(0, 5), activities: [] }; // Quick access
    }

    // Activities
    const activities = mockMapData.filter(activity => {
      return activity.title.toLowerCase().includes(q) || 
             activity.locationName.toLowerCase().includes(q) ||
             activity.type.toLowerCase().includes(q);
    });

    return {
      pages,
      activities
    };
  }
};
