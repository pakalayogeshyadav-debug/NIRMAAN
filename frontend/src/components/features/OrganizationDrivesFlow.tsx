import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { MapPin, Calendar, Clock, Users, Loader2, Navigation, Plus, Settings2 } from 'lucide-react';
import { cleanupDriveService } from '@/services/cleanupDriveService';
import type { CleanupDrive } from '@/data/mockCleanupDrives';
import { openInMaps } from '@/utils/mapHelpers';
import { LocationPickerMap } from '@/components/map/LocationPickerMap';
import { OrganizationVerificationDetail } from './OrganizationVerificationDetail';

export function OrganizationDrivesFlow() {
  const [drives, setDrives] = useState<CleanupDrive[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'create' | 'manage' | 'verification'>('list');
  const [selectedDrive, setSelectedDrive] = useState<CleanupDrive | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CleanupDrive>>({
    title: '', description: '', date: '', startTime: '', endTime: '',
    area: '', city: 'Chennai', state: 'Tamil Nadu', latitude: 13.0, longitude: 80.2,
    capacity: 30, wasteCategories: [], requirements: []
  });

  useEffect(() => {
    const fetchDrives = async () => {
      setLoading(true);
      const data = await cleanupDriveService.getCleanupDrives();
      setDrives(data);
      setLoading(false);
    };
    if (view === 'list') {
      fetchDrives();
    }
  }, [view]);

  const handleCreate = async () => {
    setCreateLoading(true);
    try {
      await cleanupDriveService.createCleanupDrive(formData);
      setView('list');
    } catch (e) {
      console.error(e);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
  };

  if (view === 'create') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button 
          onClick={() => setView('list')}
          className="text-sm font-medium text-text-secondary hover:text-text-primary mb-2 flex items-center gap-1 transition-colors"
        >
          ← Back to drives
        </button>
        
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Create Cleanup Drive</h1>
          <p className="text-lg text-text-secondary">Organize a new community cleanup operation.</p>
        </div>

        <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-primary mb-1">Drive Name *</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-surface-soft border border-border-default rounded-xl focus:outline-none focus:border-nirmaan-green focus:ring-1 focus:ring-nirmaan-green"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-primary mb-1">Description *</label>
                <textarea 
                  className="w-full p-3 bg-surface-soft border border-border-default rounded-xl focus:outline-none focus:border-nirmaan-green focus:ring-1 focus:ring-nirmaan-green min-h-[100px]"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border-default">
            <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider">Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-text-primary mb-1">Date *</label>
                <input 
                  type="date" 
                  className="w-full p-3 bg-surface-soft border border-border-default rounded-xl focus:outline-none focus:border-nirmaan-green focus:ring-1 focus:ring-nirmaan-green"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-primary mb-1">Start Time *</label>
                <input 
                  type="time" 
                  className="w-full p-3 bg-surface-soft border border-border-default rounded-xl focus:outline-none focus:border-nirmaan-green focus:ring-1 focus:ring-nirmaan-green"
                  value={formData.startTime}
                  onChange={e => setFormData({...formData, startTime: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-primary mb-1">End Time *</label>
                <input 
                  type="time" 
                  className="w-full p-3 bg-surface-soft border border-border-default rounded-xl focus:outline-none focus:border-nirmaan-green focus:ring-1 focus:ring-nirmaan-green"
                  value={formData.endTime}
                  onChange={e => setFormData({...formData, endTime: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border-default">
            <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider">Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-text-primary mb-1">Area *</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-surface-soft border border-border-default rounded-xl focus:outline-none focus:border-nirmaan-green focus:ring-1 focus:ring-nirmaan-green"
                  value={formData.area}
                  onChange={e => setFormData({...formData, area: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-primary mb-1">City *</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-surface-soft border border-border-default rounded-xl focus:outline-none focus:border-nirmaan-green focus:ring-1 focus:ring-nirmaan-green"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-bold text-text-primary mb-2">Pin Location on Map</label>
              <div className="h-64 bg-surface-soft rounded-xl border border-border-default overflow-hidden relative">
                <LocationPickerMap 
                  onLocationSelect={handleMapLocationSelect} 
                />
              </div>
              <p className="text-xs text-text-tertiary mt-2">
                Drive location: {formData.latitude?.toFixed(4)}, {formData.longitude?.toFixed(4)}
              </p>
            </div>
          </div>

          <div className="pt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setView('list')}>Cancel</Button>
            <Button 
              onClick={handleCreate} 
              disabled={createLoading || !formData.title || !formData.date || !formData.area}
            >
              {createLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Cleanup Drive'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'manage' && selectedDrive) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button 
          onClick={() => { setSelectedDrive(null); setView('list'); }}
          className="text-sm font-medium text-text-secondary hover:text-text-primary mb-2 flex items-center gap-1 transition-colors"
        >
          ← Back to drives
        </button>

        <div className="bg-surface-primary border border-border-default rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 sm:p-8 border-b border-border-default">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-text-primary">{selectedDrive.title}</h1>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    selectedDrive.status === 'Open' ? 'bg-nirmaan-green/10 text-nirmaan-green-deep' : 
                    selectedDrive.status === 'Almost Full' ? 'bg-accent-saffron/10 text-accent-saffron' : 
                    'bg-error/10 text-error'
                  }`}>
                    {selectedDrive.status}
                  </span>
                </div>
                <p className="text-text-secondary max-w-xl">{selectedDrive.description}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit Drive</Button>
                <Button variant="outline" size="sm" className="text-error hover:text-error hover:bg-error/5 border-error/20">Cancel</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface-soft rounded-xl p-4 border border-border-default">
                <Calendar className="w-5 h-5 text-nirmaan-green mb-2" />
                <p className="text-xs text-text-secondary font-medium">Date</p>
                <p className="text-sm font-bold text-text-primary">{selectedDrive.date}</p>
              </div>
              <div className="bg-surface-soft rounded-xl p-4 border border-border-default">
                <Clock className="w-5 h-5 text-nirmaan-green mb-2" />
                <p className="text-xs text-text-secondary font-medium">Time</p>
                <p className="text-sm font-bold text-text-primary">{selectedDrive.startTime} - {selectedDrive.endTime}</p>
              </div>
              <div className="bg-surface-soft rounded-xl p-4 border border-border-default">
                <MapPin className="w-5 h-5 text-nirmaan-green mb-2" />
                <p className="text-xs text-text-secondary font-medium">Area</p>
                <p className="text-sm font-bold text-text-primary truncate">{selectedDrive.area}</p>
              </div>
              <div className="bg-surface-soft rounded-xl p-4 border border-border-default">
                <Users className="w-5 h-5 text-nirmaan-green mb-2" />
                <p className="text-xs text-text-secondary font-medium">Volunteers</p>
                <p className="text-sm font-bold text-text-primary">{selectedDrive.participantCount} / {selectedDrive.capacity}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 sm:p-8 bg-surface-soft/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider">Participants</h3>
              <span className="text-sm font-bold text-text-primary">{selectedDrive.participantCount} joined</span>
            </div>
            <div className="bg-surface-primary border border-border-default rounded-xl p-4">
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-surface-soft rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-border-default flex items-center justify-center text-xs font-bold text-text-secondary">
                      V{i}
                    </div>
                    <span className="font-medium text-text-primary text-sm">Volunteer {String(i).padStart(2, '0')}</span>
                  </div>
                ))}
                {selectedDrive.participantCount > 4 && (
                  <div className="text-center pt-2 pb-1 border-t border-border-default mt-2">
                    <span className="text-xs font-bold text-text-secondary">+ {selectedDrive.participantCount - 4} more volunteers</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setView('verification')}
              >
                View Evidence
              </Button>
              <Button 
                variant="outline" 
                onClick={() => openInMaps({ 
                  latitude: selectedDrive.latitude, 
                  longitude: selectedDrive.longitude, 
                  label: selectedDrive.title 
                })}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Open Location in Maps
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'verification' && selectedDrive) {
    return (
      <OrganizationVerificationDetail 
        driveId={selectedDrive.id}
        driveName={selectedDrive.title}
        onBack={() => setView('manage')}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Cleanup Drives</h1>
          <p className="text-lg text-text-secondary">Create and coordinate community cleanup operations.</p>
        </div>
        <Button onClick={() => setView('create')}>
          <Plus className="w-5 h-5 mr-1" />
          Create Cleanup Drive
        </Button>
      </div>

      <div className="flex gap-6 border-b border-border-default">
        {['Active Drives', 'Upcoming Drives', 'Completed Drives'].map((tab, i) => (
          <button key={tab} className={`pb-4 text-sm font-medium transition-colors ${i === 0 ? 'border-b-2 border-nirmaan-green text-nirmaan-green' : 'text-text-secondary hover:text-text-primary'}`}>
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-nirmaan-green animate-spin" />
        </div>
      ) : drives.length === 0 ? (
        <div className="bg-surface-primary border border-border-default rounded-2xl p-10 flex flex-col items-center justify-center text-center h-64">
          <p className="text-text-secondary font-medium">No drives available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {drives.map(drive => (
            <div key={drive.id} className="bg-surface-primary border border-border-default rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col sm:flex-row">
              <div className="p-5 flex-1 border-b sm:border-b-0 sm:border-r border-border-default">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-text-primary line-clamp-1 pr-2">
                    {drive.title}
                  </h3>
                  <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    drive.status === 'Open' ? 'bg-nirmaan-green/10 text-nirmaan-green-deep' : 
                    drive.status === 'Almost Full' ? 'bg-accent-saffron/10 text-accent-saffron' : 
                    'bg-border-strong text-text-secondary'
                  }`}>
                    {drive.status}
                  </span>
                </div>
                
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
                    <span>{drive.date} • {drive.startTime} - {drive.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
                    <span className="truncate">{drive.area}, {drive.city}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-sm font-bold text-text-primary bg-surface-soft py-1.5 px-3 rounded-lg inline-flex">
                  <Users className="w-4 h-4 text-text-tertiary" />
                  {drive.participantCount} / {drive.capacity} volunteers
                </div>
              </div>
              <div className="p-5 flex flex-row sm:flex-col justify-end sm:justify-center items-center sm:items-stretch gap-2 bg-surface-soft/50 sm:w-40 shrink-0">
                <Button 
                  variant="outline" 
                  className="w-full bg-surface-primary"
                  onClick={() => { setSelectedDrive(drive); setView('manage'); }}
                >
                  <Settings2 className="w-4 h-4 mr-1.5" />
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
