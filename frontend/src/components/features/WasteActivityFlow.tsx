import { useState, useEffect } from 'react';
import { Search, AlertTriangle, Loader2, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import type { Activity } from '@/data/mockMapData';
import { activityService } from '@/services/activity.service';
import type { ActivityFilterOptions } from '@/services/activity.service';
import { ActivityMap } from '@/components/map/ActivityMap';

export function WasteActivityFlow() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [hotspots, setHotspots] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Organization Filters
  const [filters, setFilters] = useState<ActivityFilterOptions>({
    type: 'All', // We'll map this to Waste Type later if needed, but keeping simple for now
    priority: 'All',
    search: ''
  });
  
  // Local state for additional org filters (mock logic)
  const [statusFilter, setStatusFilter] = useState('All');
  const [recurrenceFilter, setRecurrenceFilter] = useState('All');
  
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
      
      // Let's adapt the base filters to the org filters
      let baseFilters = { ...filters };
      
      const results = await activityService.getNearbyActivity(baseFilters);
      
      // Further filter locally based on status/recurrence for demo purposes
      let filteredResults = results;
      
      if (statusFilter !== 'All') {
        filteredResults = filteredResults.filter(r => r.status.replace(/_/g, ' ').toLowerCase().includes(statusFilter.toLowerCase()));
      }
      
      if (recurrenceFilter !== 'All') {
        if (recurrenceFilter === 'Frequent hotspot' || recurrenceFilter === 'Recurring') {
          filteredResults = filteredResults.filter(r => r.type === 'RECURRING_HOTSPOT' || (r.reportCount && r.reportCount > 3));
        } else if (recurrenceFilter === 'One-time') {
          filteredResults = filteredResults.filter(r => r.type !== 'RECURRING_HOTSPOT' && (!r.reportCount || r.reportCount <= 1));
        }
      }
      
      setActivities(filteredResults);
      setIsLoading(false);
    };
    fetchData();
  }, [filters, statusFilter, recurrenceFilter]);

  useEffect(() => {
    activityService.getNearbyHotspots().then(setHotspots);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchInput }));
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

  const handleActionClick = (activity: Activity, actionType: string) => {
    let message = 'Opening details...';
    if (actionType === 'coordinate') {
      message = "Coordinate Cleanup workflow initiated.";
    }
    
    setActionState({ id: activity.id, message });
    
    setTimeout(() => {
      setActionState(null);
    }, 3000);
  };

  const handleHotspotClick = (hotspot: Activity) => {
    setMapCenter([hotspot.latitude, hotspot.longitude]);
  };

  // Compute operational intelligence numbers
  const activeReports = activities.filter(a => a.type === 'WASTE_REPORT').length;
  const highPriority = activities.filter(a => a.severity === 'High' || a.severity === 'Critical').length;
  const recurringHotspotsCount = activities.filter(a => a.type === 'RECURRING_HOTSPOT').length;
  const cleanupActions = activities.filter(a => a.type === 'CLEANUP_DRIVE' || a.type === 'VERIFIED_CLEANUP').length;

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col relative z-10">
      
      {/* Header & Main Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">Waste Activity</h1>
          <p className="text-text-secondary">Monitor waste activity, recurring hotspots, and cleanup opportunities across your operating area.</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search area, location, or activity..." 
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
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
            <select 
              className="text-sm bg-surface-soft border border-border-default rounded-lg px-3 py-1.5 outline-none"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="All">All Waste Types</option>
              <option value="Waste">Mixed Solid Waste</option>
              <option value="Plastic">Plastic</option>
              <option value="Organic">Organic Waste</option>
              <option value="E-waste">E-waste</option>
            </select>
            
            <select 
              className="text-sm bg-surface-soft border border-border-default rounded-lg px-3 py-1.5 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="Pending">Pending Verification</option>
              <option value="Verified">Verified Cleanup</option>
              <option value="Active">Active</option>
            </select>
            
            <select 
              className="text-sm bg-surface-soft border border-border-default rounded-lg px-3 py-1.5 outline-none"
              value={recurrenceFilter}
              onChange={(e) => setRecurrenceFilter(e.target.value)}
            >
              <option value="All">All Recurrences</option>
              <option value="One-time">One-time</option>
              <option value="Recurring">Recurring</option>
              <option value="Frequent hotspot">Frequent hotspot</option>
            </select>
          </div>

          <ActivityMap 
            activities={activities}
            mapCenter={mapCenter}
            userLocation={userLocation}
            locationError={locationError}
            onRequestLocation={requestLocation}
            onActionClick={handleActionClick}
            mode="ORGANIZATION"
          />
        </div>

        {/* Right: Operational Intelligence & Lists */}
        <div className="w-full lg:w-[40%] flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2">
          
          {/* Operational Overview */}
          <div className="bg-surface-primary border border-border-default rounded-2xl p-5 shadow-sm shrink-0">
            <h3 className="font-bold text-text-primary mb-4 text-sm uppercase tracking-wider">Activity Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-soft rounded-lg p-3 border border-border-default">
                <span className="text-2xl font-bold text-text-primary block">{activeReports}</span>
                <span className="text-xs text-text-secondary">Active Reports</span>
              </div>
              <div className="bg-surface-soft rounded-lg p-3 border border-border-default">
                <span className="text-2xl font-bold text-accent-terracotta block">{highPriority}</span>
                <span className="text-xs text-text-secondary">High Priority</span>
              </div>
              <div className="bg-surface-soft rounded-lg p-3 border border-border-default">
                <span className="text-2xl font-bold text-error block">{recurringHotspotsCount}</span>
                <span className="text-xs text-text-secondary">Recurring Hotspots</span>
              </div>
              <div className="bg-surface-soft rounded-lg p-3 border border-border-default">
                <span className="text-2xl font-bold text-nirmaan-green block">{cleanupActions}</span>
                <span className="text-xs text-text-secondary">Cleanup Actions</span>
              </div>
            </div>
          </div>

          {/* Hotspot List */}
          <div className="bg-surface-primary border border-border-default rounded-2xl p-5 shadow-sm shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-error" />
              <h3 className="font-bold text-text-primary text-sm uppercase tracking-wider">Hotspot List</h3>
            </div>
            
            <div className="space-y-3">
              {hotspots.map(h => (
                <button 
                  key={h.id} 
                  onClick={() => handleHotspotClick(h)}
                  className="w-full text-left flex justify-between items-center bg-surface-soft hover:bg-surface-primary rounded-lg p-3 border border-border-default hover:border-nirmaan-green/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-text-primary">{h.locationName}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] text-text-secondary uppercase">Last 30 days</span>
                      {h.severity && <span className={`text-[10px] font-bold uppercase ${h.severity === 'Critical' ? 'text-error' : 'text-accent-terracotta'}`}>{h.severity}</span>}
                      <span className="text-[10px] text-text-tertiary uppercase">Frequent</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-error">{h.reportCount} reports</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Activity List */}
          <div className="flex-1 flex flex-col">
            <h3 className="font-bold text-text-primary mb-4 flex items-center justify-between text-sm uppercase tracking-wider">
              Activity List
            </h3>

            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-10 bg-surface-primary rounded-2xl border border-border-default">
                <Loader2 className="w-8 h-8 text-nirmaan-green animate-spin mb-4" />
                <p className="text-text-secondary">Loading activity...</p>
              </div>
            ) : activities.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-surface-primary rounded-2xl border border-border-default">
                <p className="font-bold text-text-primary mb-1">No matching waste activity</p>
                <p className="text-sm text-text-secondary mb-4 max-w-xs">Try changing your filters or searching another area.</p>
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
                    
                    <h4 className="font-bold text-text-primary text-base mb-1">{activity.title}</h4>
                    <p className="text-sm text-text-secondary flex items-center gap-1.5 mb-3">
                      <MapPin className="w-3.5 h-3.5" /> {activity.locationName}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 bg-surface-soft p-3 rounded-lg border border-border-default">
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
                      <div>
                        <span className="text-[10px] text-text-tertiary uppercase block">Time</span>
                        <span className="text-xs font-medium text-text-secondary">{activity.timestamp}</span>
                      </div>
                      {activity.reportCount && (
                        <div>
                          <span className="text-[10px] text-text-tertiary uppercase block">Reports</span>
                          <span className="text-xs font-medium text-text-primary">{activity.reportCount}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {actionState?.id === activity.id ? (
                        <span className="text-sm font-bold text-nirmaan-green flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> {actionState.message}
                        </span>
                      ) : (
                        <div className="flex gap-2 ml-auto">
                          <button 
                            onClick={() => handleActionClick(activity, 'view')}
                            className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                          >
                            View
                          </button>
                          {(activity.type === 'WASTE_REPORT' || activity.type === 'RECURRING_HOTSPOT') && (
                            <button 
                              onClick={() => handleActionClick(activity, 'coordinate')}
                              className="text-sm font-bold text-nirmaan-green hover:text-nirmaan-green-deep transition-colors flex items-center gap-1 ml-3"
                            >
                              Coordinate <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
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
