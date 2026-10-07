import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { MapPin, Filter, Search, Users, AlertTriangle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import type { Activity } from '@/data/mockMapData';
import { activityService } from '@/services/activity.service';
import type { ActivityFilterOptions } from '@/services/activity.service';
import { ActivityMap } from '@/components/map/ActivityMap';


export function NearbyActivityFlow() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [hotspots, setHotspots] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [filters, setFilters] = useState<ActivityFilterOptions>({
    type: 'All',
    priority: 'All',
    distance: 'Nearby',
    search: ''
  });
  const [searchInput, setSearchInput] = useState('');

  // Map state
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([13.0827, 80.2707]); // Default Chennai

  // Mock interaction state
  const [actionState, setActionState] = useState<{ id: string, message: string } | null>(null);

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const results = await activityService.getNearbyActivity(filters);
      setActivities(results);
      setIsLoading(false);
    };
    fetchData();
  }, [filters]);

  useEffect(() => {
    activityService.getNearbyHotspots().then(setHotspots);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchInput }));
  };

  const handleClearFilters = () => {
    setFilters({ type: 'All', priority: 'All', distance: 'Nearby', search: '' });
    setSearchInput('');
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setMapCenter([latitude, longitude]);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Location permission denied. Browse the map manually.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError('Location could not be determined.');
        } else {
          setLocationError('Unable to retrieve location.');
        }
        console.warn('Geolocation error:', error);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleActionClick = (activity: Activity) => {
    let message = 'Action flow coming next';
    if (activity.type === 'CLEANUP_DRIVE') {
      message = "You're joining this cleanup drive.";
    }
    
    setActionState({ id: activity.id, message });
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setActionState(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col relative z-10">
      
      {/* Header & Main Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">Nearby Activity</h1>
          <p className="text-text-secondary">Explore waste activity and cleanup opportunities</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search location or area..." 
            className="w-full pl-10 pr-4 py-2 rounded-full border border-border-default bg-surface-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Search className="w-4 h-4 text-text-tertiary absolute left-4 top-1/2 -translate-y-1/2" />
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left: Map Section */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4 min-h-[400px]">
          
          <div className="flex flex-wrap gap-2 items-center bg-surface-primary p-2 rounded-xl border border-border-default shrink-0 shadow-sm">
            <span className="text-sm font-semibold text-text-primary px-2">Filters:</span>
            <select 
              className="text-sm bg-surface-soft border border-border-default rounded-lg px-3 py-1.5 outline-none"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="All">All Activity</option>
              <option value="Waste">Waste Reports</option>
              <option value="Cleanup Drives">Cleanup Drives</option>
              <option value="Hotspots">Hotspots</option>
              <option value="Verified">Verified Actions</option>
            </select>
            
            <select 
              className="text-sm bg-surface-soft border border-border-default rounded-lg px-3 py-1.5 outline-none"
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
              <option value="Critical">Critical</option>
            </select>
            
            <select 
              className="text-sm bg-surface-soft border border-border-default rounded-lg px-3 py-1.5 outline-none"
              value={filters.distance}
              onChange={(e) => setFilters(prev => ({ ...prev, distance: e.target.value }))}
            >
              <option value="Nearby">Nearby</option>
              <option value="5 km">Within 5 km</option>
              <option value="10 km">Within 10 km</option>
              <option value="25 km">Within 25 km</option>
            </select>
          </div>

          <ActivityMap 
            activities={activities}
            mapCenter={mapCenter}
            userLocation={userLocation}
            locationError={locationError}
            onRequestLocation={requestLocation}
            onActionClick={(activity) => handleActionClick(activity)}
            mode="USER"
          />
        </div>

        {/* Right: Activity List & Intelligence */}
        <div className="w-full lg:w-[40%] flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2">
          
          {/* Intelligence Section */}
          <div className="bg-surface-primary border border-border-default rounded-2xl p-5 shadow-sm shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-error" />
              <h3 className="font-bold text-text-primary">Recurring Hotspots</h3>
            </div>
            <p className="text-xs text-text-secondary mb-4">Repeated reports help communities prioritize coordinated cleanup action.</p>
            
            <div className="space-y-3">
              {hotspots.map(h => (
                <div key={h.id} className="flex justify-between items-center bg-surface-soft rounded-lg p-3 border border-border-default">
                  <div>
                    <p className="text-sm font-bold text-text-primary">{h.locationName}</p>
                    <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-border-default text-text-secondary">Demo Data</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-error">{h.reportCount} reports</p>
                    <p className="text-xs text-text-tertiary">Last 30 days</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity List */}
          <div className="flex-1 flex flex-col">
            <h3 className="font-bold text-text-primary mb-4 flex items-center justify-between">
              Activity List
              <span className="text-sm font-normal text-text-tertiary bg-surface-primary px-2 py-0.5 rounded-full border border-border-default">
                {activities.length} results
              </span>
            </h3>

            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-10 bg-surface-primary rounded-2xl border border-border-default">
                <Loader2 className="w-8 h-8 text-nirmaan-green animate-spin mb-4" />
                <p className="text-text-secondary">Loading activity...</p>
              </div>
            ) : activities.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-surface-primary rounded-2xl border border-border-default">
                <Filter className="w-10 h-10 text-text-tertiary mb-3" />
                <p className="font-bold text-text-primary mb-1">No activity matches these filters.</p>
                <p className="text-sm text-text-secondary mb-4 max-w-xs">Try expanding your search area or removing a filter.</p>
                <Button variant="outline" onClick={handleClearFilters}>Clear filters</Button>
              </div>
            ) : (
              <div className="space-y-4 pb-10">
                {activities.map((activity) => (
                  <div key={activity.id} className="bg-surface-primary border border-border-default rounded-2xl p-5 hover:border-nirmaan-green/50 transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {activity.type === 'VERIFIED_CLEANUP' && <CheckCircle className="w-4 h-4 text-nirmaan-green-deep" />}
                        <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">{activity.type.replace('_', ' ')}</span>
                      </div>
                      <span className="text-xs font-medium text-text-secondary bg-surface-soft px-2 py-1 rounded-full border border-border-default">
                        {activity.distanceKm} km away
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-text-primary text-lg mb-1">{activity.title}</h4>
                    <p className="text-sm text-text-secondary flex items-center gap-1.5 mb-3">
                      <MapPin className="w-3.5 h-3.5" /> {activity.locationName}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                      {activity.severity && (
                        <div>
                          <span className="text-[10px] text-text-tertiary uppercase block">Priority</span>
                          <span className={`text-xs font-bold ${activity.severity === 'Critical' ? 'text-error' : activity.severity === 'High' ? 'text-accent-terracotta' : 'text-text-secondary'}`}>
                            {activity.severity}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] text-text-tertiary uppercase block">Status</span>
                        <span className="text-xs font-medium text-text-primary">{activity.status}</span>
                      </div>
                      {activity.volunteers && (
                        <div>
                          <span className="text-[10px] text-text-tertiary uppercase block">Volunteers</span>
                          <span className="text-xs font-medium text-text-primary flex items-center gap-1"><Users className="w-3 h-3" /> {activity.volunteers}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] text-text-tertiary uppercase block">Time</span>
                        <span className="text-xs font-medium text-text-secondary">{activity.timestamp}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border-default">
                      {actionState?.id === activity.id ? (
                        <span className="text-sm font-bold text-nirmaan-green flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> {actionState.message}
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleActionClick(activity)}
                          className="text-sm font-bold text-nirmaan-green hover:text-nirmaan-green-deep transition-colors flex items-center gap-1"
                        >
                          {activity.type === 'CLEANUP_DRIVE' ? 'Join Drive' : activity.type === 'VERIFIED_CLEANUP' ? 'View Evidence' : 'Take Action'} 
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
