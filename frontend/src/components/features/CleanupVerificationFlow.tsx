import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Camera, Loader2 } from 'lucide-react';
import { cleanupVerificationService } from '@/services/cleanupVerificationService';
import type { CleanupVerification } from '@/data/mockCleanupVerifications';
import { VerificationStatusCard } from './VerificationStatusCard';
import { BeforeAfterEvidence } from './BeforeAfterEvidence';

export interface CleanupVerificationFlowProps {
  driveId: string;
  userId: string;
  driveName: string;
  driveLocation: string;
  onBack: () => void;
}

export function CleanupVerificationFlow({ driveId, userId, driveName, driveLocation, onBack }: CleanupVerificationFlowProps) {
  const [verification, setVerification] = useState<CleanupVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Simulated file states
  const [, setBeforeFile] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  
  const [, setAfterFile] = useState<File | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerification = async () => {
      setLoading(true);
      let ver = await cleanupVerificationService.getVerificationForDriveAndUser(driveId, userId);
      if (!ver) {
        ver = await cleanupVerificationService.createVerification(driveId, userId);
      }
      setVerification(ver);
      setLoading(false);
    };
    fetchVerification();
  }, [driveId, userId]);

  const handleBeforeUpload = async () => {
    if (!verification || !beforePreview) return;
    setActionLoading(true);
    try {
      // In production, real device GPS coordinates would be captured here via
      // navigator.geolocation at the moment of photo capture.
      // For the frontend demo, we pass undefined to indicate no real GPS was captured.
      const updated = await cleanupVerificationService.submitBeforeEvidence(
        verification.id, 
        beforePreview,
        undefined, // latitude — real GPS pending backend integration
        undefined  // longitude — real GPS pending backend integration
      );
      setVerification(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAfterUpload = async () => {
    if (!verification || !afterPreview) return;
    setActionLoading(true);
    try {
      // In production, real device GPS coordinates would be captured here.
      // For the frontend demo, we pass undefined to indicate no real GPS was captured.
      const updated = await cleanupVerificationService.submitAfterEvidence(
        verification.id, 
        afterPreview,
        undefined, // latitude — real GPS pending backend integration
        undefined  // longitude — real GPS pending backend integration
      );
      setVerification(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmitVerification = async () => {
    if (!verification) return;
    setActionLoading(true);
    try {
      const updated = await cleanupVerificationService.submitVerification(verification.id);
      setVerification(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const onBeforeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBeforeFile(e.target.files[0]);
      setBeforePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onAfterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAfterFile(e.target.files[0]);
      setAfterPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-nirmaan-green animate-spin" />
      </div>
    );
  }

  if (!verification) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="text-sm font-medium text-text-secondary hover:text-text-primary mb-2 flex items-center gap-1 transition-colors"
      >
        ← Back
      </button>

      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Cleanup Verification</h1>
        <p className="text-lg text-text-secondary">Provide evidence for {driveName}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* STEP 1: BEFORE EVIDENCE */}
          {!verification.signals.beforePhotoSubmitted && (
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-4">Step 1: Before Cleanup</h3>
              <p className="text-text-secondary mb-6">Upload a clear photo showing the waste or problem area before starting the cleanup.</p>
              
              {!beforePreview ? (
                <label className="border-2 border-dashed border-border-strong rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-soft transition-colors h-64">
                  <Camera className="w-10 h-10 text-text-tertiary mb-3" />
                  <span className="font-bold text-text-primary">Take or select photo</span>
                  <span className="text-sm text-text-secondary mt-1">GPS location capture available with backend integration</span>
                  <input type="file" accept="image/*" className="hidden" onChange={onBeforeFileChange} />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border-default">
                    <img src={beforePreview} alt="Before preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setBeforePreview(null)}>Retake</Button>
                    <Button onClick={handleBeforeUpload} disabled={actionLoading}>
                      {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Submit Before Photo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: CLEANUP IN PROGRESS & AFTER EVIDENCE */}
          {verification.signals.beforePhotoSubmitted && !verification.signals.afterPhotoSubmitted && (
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6 p-4 bg-surface-soft rounded-xl border border-border-default">
                <Loader2 className="w-5 h-5 text-nirmaan-green animate-spin" />
                <div>
                  <h4 className="font-bold text-text-primary">Cleanup in Progress</h4>
                  <p className="text-sm text-text-secondary">Capture your after photo when finished.</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-4">Step 2: After Cleanup</h3>
              <p className="text-text-secondary mb-6">Upload a photo showing the same area after it has been cleaned.</p>
              
              {!afterPreview ? (
                <label className="border-2 border-dashed border-border-strong rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-soft transition-colors h-64">
                  <Camera className="w-10 h-10 text-text-tertiary mb-3" />
                  <span className="font-bold text-text-primary">Take or select photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={onAfterFileChange} />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border-default">
                    <img src={afterPreview} alt="After preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setAfterPreview(null)}>Retake</Button>
                    <Button onClick={handleAfterUpload} disabled={actionLoading}>
                      {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Submit After Photo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: SUBMIT FOR VERIFICATION OR VIEW STATUS */}
          {verification.signals.beforePhotoSubmitted && verification.signals.afterPhotoSubmitted && (
            <div className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-text-primary">Evidence Summary</h3>
              <BeforeAfterEvidence 
                beforePhoto={verification.beforePhoto}
                afterPhoto={verification.afterPhoto}
                beforeCapturedAt={verification.beforeCapturedAt}
                afterCapturedAt={verification.afterCapturedAt}
                location={driveLocation}
              />
              
              {verification.status === 'PENDING' && (
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSubmitVerification} disabled={actionLoading} className="w-full sm:w-auto">
                    {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Submit for Verification
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <VerificationStatusCard status={verification.status} signals={verification.signals} />
        </div>
      </div>
    </div>
  );
}
