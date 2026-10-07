import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CheckCircle, Crosshair } from 'lucide-react';
import type { Activity, ActivityType } from '@/data/mockMapData';

// Fix Leaflet's default icon path issues in React if needed
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Markers
export const createCustomMarker = (color: string, icon: string) => L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div class="w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center bg-${color} text-white">${icon}</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export const getMarkerColor = (type: ActivityType) => {
  switch (type) {
    case 'WASTE_REPORT': return 'accent-terracotta';
    case 'CLEANUP_DRIVE': return 'accent-saffron';
    case 'VERIFIED_CLEANUP': return 'nirmaan-green-deep';
    case 'RECURRING_HOTSPOT': return 'error';
    default: return 'nirmaan-green';
  }
};

export const getMarkerIcon = (type: ActivityType) => {
  switch (type) {
    case 'WASTE_REPORT': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
    case 'CLEANUP_DRIVE': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>';
    case 'VERIFIED_CLEANUP': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    case 'RECURRING_HOTSPOT': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>';
    default: return '';
  }
};

const userLocationMarker = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div class="w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center bg-blue-500"><div class="w-2 h-2 rounded-full bg-white animate-pulse"></div></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13);
    }
  }, [center, map]);
  return null;
}

export interface ActivityMapProps {
  activities: Activity[];
  mapCenter: [number, number];
  userLocation: [number, number] | null;
  locationError: string | null;
  onRequestLocation: () => void;
  onActionClick: (activity: Activity, actionType: string) => void;
  mode: 'USER' | 'ORGANIZATION';
}

export function ActivityMap({ 
  activities, 
  mapCenter, 
  userLocation, 
  locationError, 
  onRequestLocation, 
  onActionClick,
  mode
}: ActivityMapProps) {
  return (
    <div className="flex-1 rounded-2xl overflow-hidden border border-border-default relative shadow-sm z-0 h-full w-full">
      <MapContainer 
        center={mapCenter}
        zoom={11} 
        className="w-full h-full"
      >
        <MapController center={mapCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {userLocation && (
          <Marker position={userLocation} icon={userLocationMarker}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {activities.map((activity) => (
          <Marker 
            key={activity.id} 
            position={[activity.latitude, activity.longitude]}
            icon={createCustomMarker(getMarkerColor(activity.type), getMarkerIcon(activity.type))}
          >
            <Popup className="custom-popup min-w-[220px]">
              <div className="p-1">
                <div className="flex items-center gap-2 mb-1">
                  {activity.type === 'VERIFIED_CLEANUP' && <CheckCircle className="w-3 h-3 text-nirmaan-green-deep" />}
                  <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">{activity.type.replace('_', ' ')}</p>
                </div>
                <p className="font-bold text-text-primary mb-1">{activity.title}</p>
                <p className="text-sm text-text-secondary mb-2">{activity.locationName}</p>
                
                {activity.severity && <p className={`text-xs font-medium mb-1 ${activity.severity === 'Critical' ? 'text-error' : activity.severity === 'High' ? 'text-accent-terracotta' : 'text-text-secondary'}`}>Priority: {activity.severity}</p>}
                
                {mode === 'ORGANIZATION' && (
                  <div className="text-xs text-text-secondary mb-2 space-y-1 mt-2 bg-surface-soft p-2 rounded">
                    <p>Status: {activity.status}</p>
                    {activity.reportCount && <p>Reports: {activity.reportCount}</p>}
                    <p>Time: {activity.timestamp}</p>
                  </div>
                )}
                {mode === 'USER' && (
                  <p className="text-xs text-text-tertiary mb-3">{activity.status}</p>
                )}
                
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {mode === 'USER' ? (
                    <button 
                      onClick={() => onActionClick(activity, 'primary')}
                      className="bg-nirmaan-green text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-nirmaan-green-dark transition-colors"
                    >
                      {activity.type === 'CLEANUP_DRIVE' ? 'Join Drive' : activity.type === 'VERIFIED_CLEANUP' ? 'View Evidence' : 'Take Action'}
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => onActionClick(activity, 'view')}
                        className="bg-surface-primary border border-border-default text-text-primary text-xs font-medium px-3 py-1.5 rounded-md hover:bg-surface-soft transition-colors"
                      >
                        View Details
                      </button>
                      {(activity.type === 'WASTE_REPORT' || activity.type === 'RECURRING_HOTSPOT') && (
                        <button 
                          onClick={() => onActionClick(activity, 'coordinate')}
                          className="bg-nirmaan-green text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-nirmaan-green-dark transition-colors"
                        >
                          Coordinate
                        </button>
                      )}
                    </>
                  )}
                  <span className="text-[10px] bg-surface-soft px-1.5 py-0.5 rounded border border-border-default text-text-secondary shrink-0 ml-auto">Demo</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Overlays */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <button 
          onClick={onRequestLocation}
          className="bg-surface-primary/90 backdrop-blur-md p-2.5 rounded-xl border border-border-default shadow-sm hover:bg-surface-primary text-text-primary flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Crosshair className="w-4 h-4 text-nirmaan-green" />
          <span className="hidden sm:inline">Use my location</span>
        </button>
        {locationError && (
          <div className="bg-error/10 text-error text-xs font-medium px-3 py-2 rounded-lg border border-error/20 whitespace-nowrap">
            {locationError}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 z-[400] bg-surface-primary/90 backdrop-blur-md p-3 rounded-xl border border-border-default shadow-sm pointer-events-none">
        <h4 className="text-xs font-bold text-text-primary mb-2 uppercase tracking-wider">Legend</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-text-secondary"><div className="w-3 h-3 rounded-full bg-accent-terracotta" /> Waste report</div>
          <div className="flex items-center gap-2 text-xs text-text-secondary"><div className="w-3 h-3 rounded-full bg-accent-saffron" /> Cleanup drive</div>
          <div className="flex items-center gap-2 text-xs text-text-secondary"><div className="w-3 h-3 rounded-full border-2 border-error" /> Recurring hotspot</div>
          <div className="flex items-center gap-2 text-xs text-text-secondary"><div className="w-3 h-3 rounded-full bg-nirmaan-green-deep flex items-center justify-center"><CheckCircle className="w-2 h-2 text-white" /></div> Verified cleanup</div>
        </div>
      </div>
    </div>
  );
}
