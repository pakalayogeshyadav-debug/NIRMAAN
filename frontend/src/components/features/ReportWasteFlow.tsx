import { useState, useRef } from 'react';
import { Button } from '@/components/ui';
import { Camera, MapPin, CheckCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LocationPickerMap } from '@/components/map/LocationPickerMap';
import { wasteReportService } from '@/services/wasteReportService';
import type { AIAssessment, WasteReport } from '@/data/mockWasteReports';
import { WasteAssessmentCard } from './WasteAssessmentCard';
import { DuplicateReportWarning } from './DuplicateReportWarning';
import { useAppNavigation } from '@/hooks/useAppNavigation';

export function ReportWasteFlow() {
  const navigate = useNavigate();
  const { basePath } = useAppNavigation();
  
  const [step, setStep] = useState(1);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form State
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [locationLabel, setLocationLabel] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [extent, setExtent] = useState('');
  
  // Assessment & Duplicate State
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessment, setAssessment] = useState<AIAssessment | null>(null);
  const [duplicateReport, setDuplicateReport] = useState<WasteReport | null>(null);
  const [duplicateHandled, setDuplicateHandled] = useState(false);
  
  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<WasteReport | null>(null);
  
  // Geolocation state
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhotoUrl(url);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
    // In a real app, we would reverse geocode here
    setLocationLabel(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  };

  const runAssessment = async () => {
    if (!photoUrl || !wasteType || !location) return;
    setIsAssessing(true);
    try {
      const [aiResult, dupResult] = await Promise.all([
        wasteReportService.assessWasteReport(photoUrl, wasteType),
        wasteReportService.checkDuplicateReport(location.lat, location.lng)
      ]);
      
      setAssessment(aiResult);
      if (dupResult.isDuplicate && dupResult.existingReport) {
        setDuplicateReport(dupResult.existingReport);
      } else {
        setDuplicateHandled(true);
      }
      setStep(4); // Move to assessment/duplicate view
    } catch (e) {
      console.error(e);
      // Fallback
      setStep(5);
    } finally {
      setIsAssessing(false);
    }
  };

  const submitReport = async () => {
    setIsSubmitting(true);
    try {
      const report = await wasteReportService.createWasteReport({
        photoUrl: photoUrl || '',
        latitude: location?.lat,
        longitude: location?.lng,
        locationLabel: locationLabel || 'Selected Location',
        wasteType: (wasteType as any) || 'MIXED_WASTE',
        severity: (severity as any) || 'MEDIUM',
        description,
        aiAssessment: assessment || undefined,
        duplicateWarning: !!duplicateReport,
        duplicateOfReportId: duplicateReport?.id
      });
      setSubmittedReport(report);
      setStep(6);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setPhotoUrl(null);
    setLocation(null);
    setLocationLabel('');
    setWasteType('');
    setSeverity('');
    setDescription('');
    setExtent('');
    setAssessment(null);
    setDuplicateReport(null);
    setDuplicateHandled(false);
    setSubmittedReport(null);
    setGeoLoading(false);
    setGeoError(null);
  };

  const steps = [
    { num: 1, title: 'Photo' },
    { num: 2, title: 'Location' },
    { num: 3, title: 'Details' },
    { num: 4, title: 'Review' }
  ];

  const currentDisplayStep = step === 5 ? 4 : (step > 5 ? 4 : Math.min(step, 4));

  // STEP 6: Success State
  if (step === 6 && submittedReport) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto relative z-10 pt-10">
        <div className="bg-surface-primary border border-border-default rounded-3xl p-10 flex flex-col items-center text-center shadow-sm">
          <div className="w-20 h-20 bg-nirmaan-green/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-nirmaan-green" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Report Submitted</h2>
          <p className="text-text-secondary max-w-md mb-6">
            Your waste report has been recorded and is now visible to the community and local organizations.
          </p>
          <div className="bg-surface-soft border border-border-default rounded-xl px-6 py-4 mb-8 w-full max-w-sm text-left flex justify-between items-center">
            <div>
              <span className="text-xs text-text-secondary uppercase tracking-wider block mb-1">Status</span>
              <span className="font-bold text-text-primary">{submittedReport.status}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-text-secondary uppercase tracking-wider block mb-1">Report ID</span>
              <span className="font-bold text-text-primary">{submittedReport.id}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button variant="outline" onClick={() => navigate(`${basePath}/activity`)}>Nearby Activity</Button>
            <Button variant="outline" onClick={() => navigate(`${basePath}/tasks`)}>My Activity</Button>
            <Button onClick={resetForm}>Report Another Site</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto relative z-10">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Report Waste</h1>
        <p className="text-lg text-text-secondary">Turn a waste observation into a verified report.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex gap-6 lg:gap-8 mb-8 border-b border-border-default overflow-x-auto custom-scrollbar">
        {steps.map((s) => (
          <div key={s.num} className={`pb-4 px-2 flex items-center gap-2 font-bold whitespace-nowrap border-b-2 transition-colors ${currentDisplayStep === s.num ? 'border-nirmaan-green text-nirmaan-green' : currentDisplayStep > s.num ? 'border-transparent text-text-primary' : 'border-transparent text-text-tertiary'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentDisplayStep === s.num ? 'bg-nirmaan-green text-white' : currentDisplayStep > s.num ? 'bg-text-primary text-white' : 'bg-surface-soft text-text-tertiary'}`}>
              {currentDisplayStep > s.num ? <CheckCircle className="w-3 h-3" /> : s.num}
            </span>
            {s.title}
          </div>
        ))}
      </div>

      {/* STEP 1: Capture Photo */}
      {step === 1 && (
        <div className="bg-surface-primary border border-border-default rounded-3xl p-6 sm:p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold text-text-primary mb-2 text-center">Show us the problem</h2>
          <p className="text-text-secondary mb-6 text-center max-w-md">Take a clear photo showing the waste area.</p>
          
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handlePhotoUpload} />

          {!photoUrl ? (
            <div 
              className="w-full max-w-md aspect-[4/3] border-2 border-dashed border-border-strong rounded-2xl bg-surface-soft flex flex-col items-center justify-center cursor-pointer hover:bg-surface-primary hover:border-nirmaan-green/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Camera className="w-8 h-8 text-nirmaan-green" />
              </div>
              <p className="font-bold text-text-primary mb-1">Click to capture or select</p>
              <p className="text-sm text-text-secondary">JPG, PNG, WEBP</p>
            </div>
          ) : (
            <div className="w-full max-w-md flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm mb-6 border border-border-default">
                <img src={photoUrl} alt="Waste preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-4 w-full">
                <Button variant="outline" className="flex-1" onClick={() => setPhotoUrl(null)}>Retake</Button>
                <Button className="flex-1" onClick={() => setStep(2)}>Continue</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Location */}
      {step === 2 && (
        <div className="bg-surface-primary border border-border-default rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-text-primary mb-2">Report Location</h2>
          <p className="text-text-secondary mb-6">Where is this waste located? Use your current location or select manually on the map.</p>
          
          {/* Location method buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button 
              variant="outline" 
              onClick={() => {
                if (!navigator.geolocation) {
                  setGeoError('Geolocation is not supported by your browser. Please select the location manually on the map below.');
                  return;
                }
                setGeoLoading(true);
                setGeoError(null);
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                    setLocationLabel(`Current location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
                    setGeoLoading(false);
                  },
                  (err) => {
                    setGeoLoading(false);
                    if (err.code === err.PERMISSION_DENIED) {
                      setGeoError('Location permission was denied. You can select the waste location manually on the map below.');
                    } else if (err.code === err.POSITION_UNAVAILABLE) {
                      setGeoError('Your location could not be determined. Please select the location manually on the map below.');
                    } else {
                      setGeoError('Unable to retrieve your location. Please select the location manually on the map below.');
                    }
                  },
                  { enableHighAccuracy: true, timeout: 10000 }
                );
              }}
              disabled={geoLoading}
              className="flex-1"
            >
              {geoLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <MapPin className="w-4 h-4 mr-2" />}
              {geoLoading ? 'Detecting location…' : 'Use My Current Location'}
            </Button>
            <span className="text-text-tertiary text-sm self-center">or select on the map below</span>
          </div>

          {geoError && (
            <div className="mb-4 p-3 bg-accent-saffron/10 border border-accent-saffron/20 rounded-xl text-sm text-text-secondary">
              {geoError}
            </div>
          )}
          
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-border-default mb-6 relative">
            <LocationPickerMap 
              onLocationSelect={handleLocationSelect} 
              defaultCenter={location ? [location.lat, location.lng] : undefined}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full sm:w-auto bg-surface-soft p-3 rounded-xl border border-border-default flex items-center gap-3">
              <MapPin className="w-5 h-5 text-nirmaan-green shrink-0" />
              <div>
                <p className="text-sm font-bold text-text-primary">{locationLabel || 'No location selected'}</p>
                {location && <p className="text-xs text-text-secondary text-mono">{location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>}
              </div>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!location} className="flex-1">Continue</Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Details */}
      {step === 3 && (
        <div className="bg-surface-primary border border-border-default rounded-3xl p-6 sm:p-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Waste Details</h2>
            <p className="text-text-secondary">Help us categorize the waste to organize the right cleanup response.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">Waste Type *</label>
              <div className="flex flex-wrap gap-2">
                {['MIXED_WASTE', 'PLASTIC', 'ORGANIC', 'CONSTRUCTION', 'E_WASTE', 'HAZARDOUS', 'OTHER'].map(type => (
                  <button
                    key={type}
                    onClick={() => setWasteType(type)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${wasteType === type ? 'bg-nirmaan-green/10 border-nirmaan-green text-nirmaan-green-deep' : 'bg-surface-soft border-border-default text-text-secondary hover:text-text-primary'}`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">Severity *</label>
              <div className="flex flex-wrap gap-2">
                {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map(sev => (
                  <button
                    key={sev}
                    onClick={() => setSeverity(sev)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${severity === sev ? 'bg-text-primary border-text-primary text-white' : 'bg-surface-soft border-border-default text-text-secondary hover:text-text-primary'}`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">Estimated Extent (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {['Small pile', 'Medium area', 'Large dumping site'].map(ext => (
                  <button
                    key={ext}
                    onClick={() => setExtent(ext)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${extent === ext ? 'bg-surface-primary border-border-strong text-text-primary' : 'bg-surface-soft border-border-default text-text-secondary hover:text-text-primary'}`}
                  >
                    {ext}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-2">Description (Optional)</label>
              <textarea 
                className="w-full p-4 bg-surface-soft border border-border-default rounded-xl focus:outline-none focus:border-nirmaan-green focus:ring-1 focus:ring-nirmaan-green min-h-[100px]"
                placeholder="Describe what you observed, approximate size, access issues, or nearby landmarks."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border-default">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={runAssessment} disabled={!wasteType || !severity || isAssessing}>
              {isAssessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              {isAssessing ? 'Assessing...' : 'Run Assessment'}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Assessment & Duplicate Check */}
      {step === 4 && (
        <div className="space-y-6">
          {!duplicateHandled && duplicateReport ? (
            <DuplicateReportWarning 
              existingReport={duplicateReport}
              onViewExisting={() => navigate(`${basePath}/activity`)} // Mock route
              onContinueAnyway={() => setDuplicateHandled(true)}
            />
          ) : (
            <div className="bg-surface-primary border border-border-default rounded-3xl p-6 sm:p-8 space-y-8">
              <h2 className="text-xl font-bold text-text-primary mb-2">Review & Submit</h2>
              
              {assessment && (
                <WasteAssessmentCard assessment={assessment} />
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border-default bg-surface-soft">
                  {photoUrl && <img src={photoUrl} alt="Report" className="w-full h-full object-cover" />}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="block text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">Location</span>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-text-secondary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{locationLabel}</p>
                        {location && <p className="text-xs text-text-secondary font-mono">{location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">Waste Type</span>
                      <p className="text-sm font-medium text-text-primary">{wasteType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">Severity</span>
                      <p className="text-sm font-medium text-text-primary">{severity}</p>
                    </div>
                  </div>
                  
                  {(description || extent) && (
                    <div>
                      <span className="block text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">Details</span>
                      {extent && <p className="text-sm text-text-secondary mb-1">Extent: {extent}</p>}
                      {description && <p className="text-sm text-text-secondary line-clamp-3">{description}</p>}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-6 border-t border-border-default">
                <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                <Button onClick={submitReport} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                  {isSubmitting ? 'Submitting...' : 'Submit Waste Report'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
