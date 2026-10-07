import { Button } from '@/components/ui';
import { CheckCircle, Users, Leaf, Banknote, Settings, Bell, Shield, Building2, Sun, Moon, Monitor, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { WasteActivityFlow } from '@/components/features/WasteActivityFlow';
import { OrganizationDrivesFlow } from '@/components/features/OrganizationDrivesFlow';

export function WasteActivityPreview() {
  return <WasteActivityFlow />;
}

export function OrganizationDrivesPreview() {
  return <OrganizationDrivesFlow />;
}

export function VolunteersPreview() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Volunteers</h1>
        <p className="text-lg text-text-secondary">Volunteer management overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-primary border border-border-default rounded-xl p-6 shadow-sm">
          <Users className="w-8 h-8 text-nirmaan-green mb-3" />
          <p className="text-sm font-medium text-text-secondary mb-1">Total Participants</p>
          <p className="text-3xl font-bold text-text-primary">0</p>
        </div>
        <div className="bg-surface-primary border border-border-default rounded-xl p-6 shadow-sm">
          <CheckCircle className="w-8 h-8 text-nirmaan-green-deep mb-3" />
          <p className="text-sm font-medium text-text-secondary mb-1">Average Attendance</p>
          <p className="text-3xl font-bold text-text-primary">0%</p>
        </div>
        <div className="bg-surface-primary border border-border-default rounded-xl p-6 shadow-sm">
          <Shield className="w-8 h-8 text-accent-terracotta mb-3" />
          <p className="text-sm font-medium text-text-secondary mb-1">Verification Status</p>
          <p className="text-lg font-bold text-text-primary mt-2">N/A</p>
        </div>
      </div>

      <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
        <Users className="w-10 h-10 text-text-tertiary mb-3" />
        <h3 className="text-base font-bold text-text-primary mb-1">No volunteers yet</h3>
        <p className="text-sm text-text-secondary max-w-md">Create a cleanup drive to start building your volunteer team.</p>
      </div>
    </div>
  );
}

export function FundingPreview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Funding</h1>
        <p className="text-lg text-text-secondary">Funding overview and transparency ledger.</p>
      </div>

      <div className="flex gap-6 border-b border-border-default">
        {['Overview', 'Campaigns', 'Allocations', 'Ledger'].map((tab, i) => (
          <button key={tab} className={`pb-4 text-sm font-medium transition-colors ${i === 0 ? 'border-b-2 border-nirmaan-green text-nirmaan-green' : 'text-text-secondary hover:text-text-primary'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
        <Banknote className="w-10 h-10 text-text-tertiary mb-3" />
        <h3 className="text-base font-bold text-text-primary mb-1">No funding activity yet</h3>
        <p className="text-sm text-text-secondary max-w-md mb-4">Track sponsorships and campaign allocations here.</p>
        <Button variant="outline" size="sm">Create Campaign</Button>
      </div>
    </div>
  );
}

export function OrganizationImpactPreview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Impact</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Verified cleanups', value: '0' },
          { label: 'Volunteer participation', value: '0' },
          { label: 'Waste activity resolved', value: '0' },
          { label: 'Funding allocation', value: '₹0' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-primary border border-border-default rounded-xl p-6 shadow-sm">
            <p className="text-sm font-medium text-text-secondary mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
        <Leaf className="w-10 h-10 text-text-tertiary mb-3" />
        <h3 className="text-base font-bold text-text-primary mb-1">No verified impact yet</h3>
        <p className="text-sm text-text-secondary max-w-md">Verified cleanup activity will appear here.</p>
      </div>
    </div>
  );
}

export function OrganizationProfilePreview() {
  const { user } = useAuth();
  
  const devOrg = user as any;
  const stats = devOrg?.stats || {};
  
  return (
    <>
      <div className="space-y-8 max-w-5xl relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Organization Profile</h1>
          <p className="text-lg text-text-secondary">Manage your organization's public presence and operational details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Core Identity & Stats */}
          <div className="space-y-6">
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl bg-nirmaan-green-light/20 flex items-center justify-center border border-nirmaan-green/10 text-nirmaan-green mb-4">
                <Building2 className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-text-primary">{user?.name}</h2>
              <div className="flex flex-col items-center gap-2 mt-2 mb-6">
                <span className="bg-surface-soft text-text-secondary px-2 py-0.5 rounded text-xs font-medium border border-border-default">{user?.role}</span>
                <span className="text-xs text-text-tertiary flex items-center gap-1">
                  <Shield className="w-3 h-3 text-text-tertiary" /> 
                  Verification pending
                </span>
              </div>
              <Button variant="outline" size="sm" className="w-full">Change Logo</Button>
            </div>

            {/* Organization Activity */}
            <div className="bg-surface-soft border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Organization Activity</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Cleanup Drives</span>
                  <span className="text-sm font-medium text-text-primary">{stats.cleanupDrives || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Volunteers Engaged</span>
                  <span className="text-sm font-medium text-text-primary">{stats.volunteersEngaged || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Waste Reports Addressed</span>
                  <span className="text-sm font-medium text-text-primary">{stats.wasteReportsAddressed || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Funds Allocated</span>
                  <span className="text-sm font-medium text-text-primary">{stats.fundsAllocated || '₹0'}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border-default">
                  <span className="text-sm font-medium text-text-primary">Verified Cleanups</span>
                  <span className="text-lg font-bold text-nirmaan-green">{stats.verifiedCleanups || 0}</span>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Verification</h3>
              <div className="p-4 rounded-xl border border-accent-terracotta/20 bg-accent-terracotta/5 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-accent-terracotta" />
                  <span className="font-bold text-xs px-2 py-1 rounded bg-accent-terracotta/10 text-accent-terracotta border border-accent-terracotta/20">UNVERIFIED</span>
                </div>
                <p className="text-xs text-text-secondary">Your organization identity, registration, and contact details have not yet been verified by NIRMAAN administrators.</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">Upload Documents</Button>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Organization Information */}
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">Organization Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-text-primary">Organization Name <span className="text-error">*</span></label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={user?.name || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Organization Type <span className="text-error">*</span></label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={user?.role || ''}>
                    <option value="">Select...</option>
                    <option value="NGO">NGO</option>
                    <option value="COMMUNITY_ORGANIZATION">Community Organization</option>
                    <option value="CORPORATE">Corporate</option>
                    <option value="CSR_ORGANIZATION">CSR Organization</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Registration Number</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.registrationNumber || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Year Established</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.yearEstablished || ''} />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-text-primary">Organization Description <span className="text-error">*</span></label>
                  <textarea className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all min-h-[100px]" defaultValue={devOrg?.description || ''}></textarea>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Contact Email <span className="text-error">*</span></label>
                  <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-border-default border-dashed bg-surface-soft text-text-secondary cursor-default select-all" defaultValue={user?.email || ''} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Contact Phone <span className="text-error">*</span></label>
                  <input type="tel" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.contactPhone || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Website</label>
                  <input type="url" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.website || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Primary Contact Person</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.primaryContactPerson || ''} />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">Location</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">State</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.state || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">City</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.city || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Area / Locality</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.area || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Pincode</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.pincode || ''} />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-text-primary">Operating Regions</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" placeholder="e.g. South Chennai, OMR" defaultValue={devOrg?.operatingRegions || ''} />
                </div>
              </div>
            </div>

            {/* Mission & Operations */}
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">Mission & Operations</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Mission</label>
                  <textarea className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all min-h-[80px]" defaultValue={devOrg?.mission || ''}></textarea>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-text-primary">Areas of Focus</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {['Waste Collection', 'Waste Segregation', 'Recycling', 'Cleanup Drives', 'Community Education', 'Environmental Awareness'].map(cat => (
                      <label key={cat} className="flex items-center gap-2 px-3 py-2 border border-border-default rounded-lg bg-bg-primary cursor-pointer hover:bg-surface-soft">
                        <input type="checkbox" className="accent-nirmaan-green w-4 h-4" defaultChecked={devOrg?.areasOfFocus?.includes(cat)} />
                        <span className="text-sm text-text-secondary">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Volunteer Capacity</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.volunteerCapacity || ''} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Preferred Cleanup Radius</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-primary focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green outline-none transition-all" defaultValue={devOrg?.preferredCleanupRadius || ''} />
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

export function OrganizationSettingsPreview() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8 max-w-3xl relative z-10">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="w-full sm:w-56 space-y-1 shrink-0">
          {[
            { id: 'org', label: 'Organization Settings', icon: Building2 },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'privacy', label: 'Privacy', icon: Shield },
            { id: 'account', label: 'Account settings', icon: Settings },
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
            <h2 className="text-xl font-bold text-text-primary mb-6">Organization Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-border-default">
                <div>
                  <h3 className="font-medium text-text-primary">Operating Zones</h3>
                  <p className="text-sm text-text-secondary">Configure your primary cleanup and action zones.</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-border-default">
                <div>
                  <h3 className="font-medium text-text-primary">Verification Documents</h3>
                  <p className="text-sm text-text-secondary">Upload official registration for verified status.</p>
                </div>
                <Button variant="outline" size="sm">Upload</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
