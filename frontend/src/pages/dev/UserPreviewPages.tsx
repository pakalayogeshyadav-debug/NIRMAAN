import { Button } from '@/components/ui';
import { Users, ClipboardList, Leaf, Award, User, Settings, Bell, Lock, FileText, Sun, Moon, Monitor, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { cleanupDriveService } from '@/services/cleanupDriveService';
import { wasteReportService } from '@/services/wasteReportService';
import type { CleanupDrive } from '@/data/mockCleanupDrives';
import type { WasteReport } from '@/data/mockWasteReports';

import { ReportWasteFlow } from '@/components/features/ReportWasteFlow';
import { NearbyActivityFlow } from '@/components/features/NearbyActivityFlow';
import { CleanupDrivesFlow } from '@/components/features/CleanupDrivesFlow';
import { cleanupVerificationService } from '@/services/cleanupVerificationService';
import type { CleanupVerification } from '@/data/mockCleanupVerifications';

export function ReportWastePreview() {
  return <ReportWasteFlow />;
}


export function NearbyActivityPreview() {
  return <NearbyActivityFlow />;
}

export function CleanupDrivesPreview() {
  return <CleanupDrivesFlow />;
}

export function MyActivityPreview() {
  const [activeTab, setActiveTab] = useState('Reports');
  const [joinedDrives, setJoinedDrives] = useState<CleanupDrive[]>([]);
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (activeTab === 'Drives Joined') {
        const drives = await cleanupDriveService.getCleanupDrives();
        setJoinedDrives(drives.filter(d => d.joinedByMe));
      } else if (activeTab === 'Reports') {
        const allReports = await wasteReportService.getWasteReports();
        // Assuming current user is 'user-01' in mock data
        setReports(allReports.filter(r => r.reporterId === 'user-01'));
      }
      setLoading(false);
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">My Activity</h1>
      </div>

      <div className="flex gap-6 border-b border-border-default">
        {['Reports', 'Cleanup Actions', 'Drives Joined'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-nirmaan-green text-nirmaan-green' : 'border-b-2 border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-soft hover:border-surface-soft'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Drives Joined' && (
        joinedDrives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinedDrives.map(drive => (
              <div key={drive.id} className="bg-surface-primary border border-border-default rounded-xl p-5 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-bold text-text-primary">{drive.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-nirmaan-green/10 text-nirmaan-green-deep">Joined</span>
                  </div>
                  <p className="text-xs text-text-secondary mb-3">{drive.date} • {drive.startTime}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">View Drive</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <Users className="w-10 h-10 text-text-tertiary mb-3" />
            <h3 className="text-base font-bold text-text-primary mb-1">No drives joined</h3>
            <p className="text-sm text-text-secondary max-w-md mb-4">You haven't joined any cleanup drives yet.</p>
            <Button variant="outline" size="sm">Find Drives</Button>
          </div>
        )
      )}
      
      {activeTab === 'Reports' && (
        reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map(report => (
              <div key={report.id} className="bg-surface-primary border border-border-default rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-bold text-text-primary">{report.wasteType.replace('_', ' ')} Waste</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-soft border border-border-default text-text-secondary">
                      {report.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-text-secondary mb-1">
                    {report.locationLabel}
                  </p>
                  <p className="text-xs text-text-tertiary mb-4">
                    Reported on {new Date(report.reportedAt).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full">View Report</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <ClipboardList className="w-10 h-10 text-text-tertiary mb-3" />
            <h3 className="text-base font-bold text-text-primary mb-1">No activity yet</h3>
            <p className="text-sm text-text-secondary max-w-md mb-4">You haven't submitted any waste reports yet.</p>
            <Button variant="outline" size="sm">Report Waste</Button>
          </div>
        )
      )}
    </div>
  );
}

export function MyImpactPreview() {
  const [verifiedCleanups, setVerifiedCleanups] = useState<CleanupVerification[]>([]);
  const [reportsSubmitted, setReportsSubmitted] = useState(0);
  const [drivesJoined, setDrivesJoined] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userId = 'user-01'; // Mock user
      
      const allReports = await wasteReportService.getWasteReports();
      setReportsSubmitted(allReports.filter(r => r.reporterId === userId).length);
      
      const allDrives = await cleanupDriveService.getCleanupDrives();
      setDrivesJoined(allDrives.filter(d => d.joinedByMe).length);
      
      const allVerifications = await cleanupVerificationService.getUserVerifications(userId);
      setVerifiedCleanups(allVerifications.filter(v => v.status === 'VERIFIED'));
      
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">My Impact</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Verified Reports', icon: FileText, color: 'text-nirmaan-green', value: reportsSubmitted },
          { label: 'Cleanup Actions', icon: Award, color: 'text-accent-terracotta', value: verifiedCleanups.length },
          { label: 'Drives Joined', icon: Users, color: 'text-accent-saffron', value: drivesJoined },
          { label: 'Community Contribution', icon: Leaf, color: 'text-nirmaan-green-deep', value: verifiedCleanups.length * 5 }, // Mock logic
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-primary border border-border-default rounded-xl p-5 shadow-sm">
            <stat.icon className={`w-6 h-6 mb-3 ${stat.color}`} />
            <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{loading ? '-' : stat.value}</p>
          </div>
        ))}
      </div>

      {verifiedCleanups.length > 0 ? (
        <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-text-primary mb-4">Verified Impact</h3>
          <div className="space-y-4">
            {verifiedCleanups.map((verification) => (
              <div key={verification.id} className="flex items-center justify-between p-4 bg-nirmaan-green/5 border border-nirmaan-green/20 rounded-xl">
                <div>
                  <h4 className="font-bold text-text-primary flex items-center gap-2">
                    <Award className="w-5 h-5 text-nirmaan-green" />
                    Verified Cleanup
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">Drive: {verification.driveId}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-1 bg-nirmaan-green/10 text-nirmaan-green-deep text-xs font-bold rounded">
                    ✓ Verified
                  </span>
                  <p className="text-xs text-text-tertiary mt-2">+1 cleanup completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
          <Leaf className="w-10 h-10 text-text-tertiary mb-3" />
          <h3 className="text-base font-bold text-text-primary mb-1">No verified impact yet</h3>
          <p className="text-sm text-text-secondary max-w-md">Your verified environmental impact will be tracked here over time.</p>
        </div>
      )}
    </div>
  );
}

export function ProfilePreview() {
  const { user } = useAuth();
  const [reportsSubmitted, setReportsSubmitted] = useState(0);
  const [drivesJoined, setDrivesJoined] = useState(0);
  const [verifiedActions, setVerifiedActions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userId = user?.id || 'user-01';
      
      const allReports = await wasteReportService.getWasteReports();
      setReportsSubmitted(allReports.filter(r => r.reporterId === userId).length);
      
      const allDrives = await cleanupDriveService.getCleanupDrives();
      setDrivesJoined(allDrives.filter(d => d.joinedByMe).length);
      
      const allVerifications = await cleanupVerificationService.getUserVerifications(userId);
      setVerifiedActions(allVerifications.filter(v => v.status === 'VERIFIED').length);
    };
    fetchData();
  }, [user]);
  
  // Create a casted user that includes the extended mock fields for dev preview
  const devUser = user as any;
  
  return (
    <>
      <div className="space-y-8 max-w-5xl relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Profile</h1>
          <p className="text-lg text-text-secondary">Manage your personal information and community preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Core Identity & Stats */}
          <div className="space-y-6">
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-nirmaan-green-light/20 flex items-center justify-center border border-nirmaan-green/10 text-3xl font-bold text-nirmaan-green mb-4">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <h2 className="text-xl font-bold text-text-primary">{user?.name}</h2>
              <p className="text-text-secondary font-medium mb-1">{user?.role}</p>
              <p className="text-sm text-text-tertiary mb-6">{user?.email}</p>
              <Button variant="outline" size="sm" className="w-full">Change Photo</Button>
            </div>

            <div className="bg-surface-soft border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Account Activity</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Member Since</span>
                  <span className="text-sm font-medium text-text-primary">{new Date(user?.createdAt || Date.now()).getFullYear()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Reports Submitted</span>
                  <span className="text-sm font-medium text-text-primary">{reportsSubmitted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Drives Joined</span>
                  <span className="text-sm font-medium text-text-primary">{drivesJoined}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border-default">
                  <span className="text-sm font-medium text-text-primary">Verified Actions</span>
                  <span className="text-lg font-bold text-nirmaan-green">{verifiedActions}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Full Name <span className="text-error">*</span></label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={user?.name || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Email Address <span className="text-error">*</span></label>
                  <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-border-default border-dashed bg-surface-soft text-text-secondary cursor-default select-all" defaultValue={user?.email || ''} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Mobile Number <span className="text-error">*</span></label>
                  <input type="tel" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devUser?.mobile || ''} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Date of Birth</label>
                    <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devUser?.dateOfBirth || ''} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Gender</label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devUser?.gender || ''}>
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">Location</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">State</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devUser?.state || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">City</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devUser?.city || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Area / Locality</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devUser?.area || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Pincode</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devUser?.pincode || ''} />
                </div>
              </div>
            </div>

            {/* Community Information */}
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">Community Preferences</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">About Me</label>
                  <textarea className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all min-h-[100px]" defaultValue={devUser?.aboutMe || ''}></textarea>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-text-primary">Preferred Waste Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {['Plastic', 'Organic', 'E-waste', 'Mixed waste', 'Construction waste', 'Other'].map(cat => (
                      <label key={cat} className="flex items-center gap-2 px-3 py-2 border border-border-default rounded-lg bg-bg-primary cursor-pointer hover:bg-surface-soft">
                        <input type="checkbox" className="accent-nirmaan-green w-4 h-4" defaultChecked={devUser?.preferredWasteCategories?.includes(cat)} />
                        <span className="text-sm text-text-secondary">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-text-primary">Preferred Activity Radius</label>
                  <div className="flex flex-wrap gap-4">
                    {['1 km', '5 km', '10 km', '25 km'].map(rad => (
                      <label key={rad} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="radius" className="accent-nirmaan-green w-4 h-4" defaultChecked={devUser?.preferredActivityRadius === rad} />
                        <span className="text-sm text-text-secondary">{rad}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button size="lg">Save Changes</Button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export function SettingsPreview() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8 max-w-3xl relative z-10">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="w-full sm:w-48 space-y-1 shrink-0">
          {[
            { id: 'account', label: 'Account', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'privacy', label: 'Privacy', icon: Lock },
            { id: 'preferences', label: 'Preferences', icon: Settings },
          ].map((tab, i) => (
            <button key={tab.id} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${i === 3 ? 'bg-surface-primary text-text-primary shadow-sm border border-border-default' : 'text-text-secondary hover:bg-surface-primary/50 hover:text-text-primary'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-6">
          <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-text-primary mb-6">Appearance</h2>
            <div className="space-y-4">
              <p className="text-sm text-text-secondary mb-4">Choose how NIRMAAN looks.</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 transition-all text-left ${theme === 'light' ? 'border-nirmaan-green bg-nirmaan-green/5 shadow-sm' : 'border-border-default hover:border-border-strong hover:bg-surface-soft border-transparent'}`}
                >
                  <Sun size={20} className={theme === 'light' ? 'text-nirmaan-green' : 'text-text-tertiary'} />
                  <div>
                    <div className="font-semibold text-text-primary">Light</div>
                  </div>
                  {theme === 'light' && <CheckCircle2 className="ml-auto w-5 h-5 text-nirmaan-green" />}
                </button>

                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 transition-all text-left ${theme === 'dark' ? 'border-nirmaan-green bg-nirmaan-green/5 shadow-sm' : 'border-border-default hover:border-border-strong hover:bg-surface-soft border-transparent'}`}
                >
                  <Moon size={20} className={theme === 'dark' ? 'text-nirmaan-green' : 'text-text-tertiary'} />
                  <div>
                    <div className="font-semibold text-text-primary">Dark</div>
                  </div>
                  {theme === 'dark' && <CheckCircle2 className="ml-auto w-5 h-5 text-nirmaan-green" />}
                </button>

                <button
                  onClick={() => setTheme('system')}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 transition-all text-left ${theme === 'system' ? 'border-nirmaan-green bg-nirmaan-green/5 shadow-sm' : 'border-border-default hover:border-border-strong hover:bg-surface-soft border-transparent'}`}
                >
                  <Monitor size={20} className={theme === 'system' ? 'text-nirmaan-green' : 'text-text-tertiary'} />
                  <div>
                    <div className="font-semibold text-text-primary">System</div>
                  </div>
                  {theme === 'system' && <CheckCircle2 className="ml-auto w-5 h-5 text-nirmaan-green" />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-text-primary mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-border-default">
                <div>
                  <h3 className="font-medium text-text-primary">Change Password</h3>
                  <p className="text-sm text-text-secondary">Update your password to keep your account secure.</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
              
              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-text-primary text-error">Delete Account</h3>
                  <p className="text-sm text-text-secondary">Permanently remove your account and all data.</p>
                </div>
                <Button variant="danger" size="sm">Delete</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
