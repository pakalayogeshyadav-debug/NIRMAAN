import { useState, useEffect } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { cleanupVerificationService } from '@/services/cleanupVerificationService';
import type { CleanupVerification } from '@/data/mockCleanupVerifications';
import { VerificationStatusCard } from './VerificationStatusCard';
import { BeforeAfterEvidence } from './BeforeAfterEvidence';

export interface OrganizationVerificationDetailProps {
  driveId: string;
  driveName: string;
  onBack: () => void;
}

export function OrganizationVerificationDetail({ driveId, driveName, onBack }: OrganizationVerificationDetailProps) {
  const [verifications, setVerifications] = useState<CleanupVerification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerifications = async () => {
      setLoading(true);
      const data = await cleanupVerificationService.getVerificationsForDrive(driveId);
      setVerifications(data);
      setLoading(false);
    };
    fetchVerifications();
  }, [driveId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-nirmaan-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <button 
        onClick={onBack}
        className="text-sm font-medium text-text-secondary hover:text-text-primary mb-2 flex items-center gap-1 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to drive
      </button>

      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Evidence & Verification</h1>
        <p className="text-lg text-text-secondary">Review participant submissions for {driveName}.</p>
      </div>

      {verifications.length === 0 ? (
        <div className="bg-surface-primary border border-border-default rounded-2xl p-10 flex flex-col items-center justify-center text-center">
          <p className="text-text-secondary">No evidence has been submitted yet for this drive.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {verifications.map(ver => (
            <div key={ver.id} className="bg-surface-primary border border-border-default rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-text-primary">Participant: {ver.userId}</h3>
                </div>
                
                <BeforeAfterEvidence 
                  beforePhoto={ver.beforePhoto}
                  afterPhoto={ver.afterPhoto}
                  beforeCapturedAt={ver.beforeCapturedAt}
                  afterCapturedAt={ver.afterCapturedAt}
                />
              </div>
              <div className="lg:col-span-1">
                <VerificationStatusCard status={ver.status} signals={ver.signals} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
