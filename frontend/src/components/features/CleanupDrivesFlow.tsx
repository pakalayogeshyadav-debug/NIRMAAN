import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { MapPin, Calendar, Clock, Users, Loader2, CheckCircle, Navigation } from 'lucide-react';
import { cleanupDriveService } from '@/services/cleanupDriveService';
import type { CleanupDrive } from '@/data/mockCleanupDrives';
import { openInMaps } from '@/utils/mapHelpers';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useNavigate } from 'react-router-dom';
import { CleanupVerificationFlow } from './CleanupVerificationFlow';

export function CleanupDrivesFlow() {
  const [drives, setDrives] = useState<CleanupDrive[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedDrive, setSelectedDrive] = useState<CleanupDrive | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [justJoined, setJustJoined] = useState(false);
  const { basePath } = useAppNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrives = async () => {
      setLoading(true);
      const data = await cleanupDriveService.getCleanupDrives({ status: filter === 'Open' ? 'Open' : 'All' });
      // Apply client-side filters if needed based on the mock data
      let filtered = data;
      if (filter === 'Almost Full') {
        filtered = data.filter(d => d.status === 'Almost Full');
      }
      setDrives(filtered);
      setLoading(false);
    };
    fetchDrives();
  }, [filter]);

  const handleJoin = async () => {
    if (!selectedDrive) return;
    setJoinLoading(true);
    try {
      const updated = await cleanupDriveService.joinCleanupDrive(selectedDrive.id);
      setSelectedDrive(updated);
      setDrives(prev => prev.map(d => d.id === updated.id ? updated : d));
      setJustJoined(true);
    } catch (e) {
      console.error(e);
    } finally {
      setJoinLoading(false);
    }
  };

  if (showVerification && selectedDrive) {
    return (
      <CleanupVerificationFlow 
        driveId={selectedDrive.id}
        userId="user-01" // Mock user
        driveName={selectedDrive.title}
        driveLocation={`${selectedDrive.area}, ${selectedDrive.city}`}
        onBack={() => setShowVerification(false)}
      />
    );
  }

  if (selectedDrive) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button 
          onClick={() => { setSelectedDrive(null); setJustJoined(false); }}
          className="text-sm font-medium text-text-secondary hover:text-text-primary mb-4 flex items-center gap-1 transition-colors"
        >
          ← Back to drives
        </button>
        
        {justJoined && (
          <div className="bg-nirmaan-green/10 border border-nirmaan-green rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-nirmaan-green-deep">
              <CheckCircle className="w-6 h-6" />
              <div>
                <h3 className="font-bold">You're joining this cleanup</h3>
                <p className="text-sm">Your spot: {selectedDrive.participantCount} / {selectedDrive.capacity}</p>
              </div>
            </div>
            <Button onClick={() => navigate(`${basePath}/tasks`)}>View My Activity</Button>
          </div>
        )}

        <div className="bg-surface-primary border border-border-default rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 sm:p-8 border-b border-border-default">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">{selectedDrive.title}</h1>
                <p className="text-text-secondary mb-4 max-w-xl">{selectedDrive.description}</p>
                <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                  <span className="w-8 h-8 rounded-full bg-surface-soft flex items-center justify-center border border-border-default">
                    {selectedDrive.organizerName.charAt(0)}
                  </span>
                  Organized by {selectedDrive.organizerName}
                </div>
              </div>
              
              <div className="shrink-0 w-full md:w-64 bg-surface-soft rounded-xl p-4 border border-border-default flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm font-medium text-text-primary">
                  <Calendar className="w-4 h-4 text-text-tertiary" />
                  {selectedDrive.date}
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-text-primary">
                  <Clock className="w-4 h-4 text-text-tertiary" />
                  {selectedDrive.startTime} – {selectedDrive.endTime}
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-text-primary">
                  <MapPin className="w-4 h-4 text-text-tertiary" />
                  {selectedDrive.area}, {selectedDrive.city}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-1 text-xs h-8"
                  onClick={() => openInMaps({ 
                    latitude: selectedDrive.latitude, 
                    longitude: selectedDrive.longitude, 
                    label: selectedDrive.title 
                  })}
                >
                  <Navigation className="w-3 h-3 mr-1" />
                  Open in Maps
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface-soft/30">
            <div>
              <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-4">Participation</h3>
              <div className="flex items-center justify-between bg-surface-primary p-4 rounded-xl border border-border-default mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-nirmaan-green" />
                  <span className="font-bold text-text-primary">{selectedDrive.participantCount} / {selectedDrive.capacity} joined</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                  selectedDrive.status === 'Open' ? 'bg-nirmaan-green/10 text-nirmaan-green-deep' : 
                  selectedDrive.status === 'Almost Full' ? 'bg-accent-saffron/10 text-accent-saffron' : 
                  'bg-error/10 text-error'
                }`}>
                  {selectedDrive.status}
                </span>
              </div>
              
              {selectedDrive.joinedByMe ? (
                <div className="space-y-3">
                  <div className="p-3 bg-nirmaan-green/10 text-nirmaan-green-deep rounded-xl text-sm font-medium border border-nirmaan-green/20 text-center">
                    You have joined this cleanup
                  </div>
                  <Button 
                    className="w-full h-12 text-lg" 
                    onClick={() => setShowVerification(true)}
                  >
                    Provide Cleanup Evidence
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full h-12 text-lg" 
                  disabled={selectedDrive.status === 'Full' || joinLoading}
                  onClick={handleJoin}
                >
                  {joinLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 
                   selectedDrive.status === 'Full' ? 'Drive Full' : 'Join Cleanup'}
                </Button>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-3">Waste Focus</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDrive.wasteCategories.map(c => (
                    <span key={c} className="bg-surface-primary border border-border-default text-text-secondary text-sm px-3 py-1 rounded-full font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-3">What to bring</h3>
                <ul className="space-y-2">
                  {selectedDrive.requirements.map(r => (
                    <li key={r} className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-border-strong"></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Cleanup Drives</h1>
        <p className="text-lg text-text-secondary">Join people taking action in their communities.</p>
      </div>

      <div className="flex gap-2 border-b border-border-default pb-4 overflow-x-auto custom-scrollbar">
        {['All', 'Open', 'Almost Full'].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm font-bold rounded-full transition-colors whitespace-nowrap ${
              filter === f 
                ? 'bg-text-primary text-surface-primary' 
                : 'bg-surface-soft text-text-secondary hover:text-text-primary hover:bg-border-default'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-nirmaan-green animate-spin" />
        </div>
      ) : drives.length === 0 ? (
        <div className="bg-surface-primary border border-border-default rounded-2xl p-8 flex flex-col items-center justify-center text-center h-64">
          <p className="text-text-secondary font-medium">No drives match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map(drive => (
            <div key={drive.id} className="bg-surface-primary border border-border-default rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col group">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    drive.status === 'Open' ? 'bg-nirmaan-green/10 text-nirmaan-green-deep' : 
                    drive.status === 'Almost Full' ? 'bg-accent-saffron/10 text-accent-saffron' : 
                    'bg-error/10 text-error'
                  }`}>
                    {drive.status}
                  </span>
                  <span className="text-xs font-bold text-text-tertiary">1.8 km away</span>
                </div>
                
                <h3 className="text-lg font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-nirmaan-green transition-colors">
                  {drive.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4 text-text-tertiary shrink-0" />
                    <span>{drive.date} • {drive.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="w-4 h-4 text-text-tertiary shrink-0" />
                    <span className="truncate">{drive.area}, {drive.city}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm pt-4 border-t border-border-default">
                  <div className="font-medium text-text-secondary truncate pr-2">
                    {drive.organizerName}
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-text-primary shrink-0">
                    <Users className="w-4 h-4 text-text-tertiary" />
                    {drive.participantCount} / {drive.capacity}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-surface-soft border-t border-border-default">
                <Button 
                  variant="outline" 
                  className="w-full bg-surface-primary"
                  onClick={() => setSelectedDrive(drive)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
