import { CheckCircle, Clock, AlertCircle, Search, ShieldCheck } from 'lucide-react';
import type { VerificationStatus } from '@/data/mockCleanupVerifications';

export interface VerificationStatusCardProps {
  status: VerificationStatus;
  signals: {
    beforePhotoSubmitted: boolean;
    afterPhotoSubmitted: boolean;
    locationCaptured: boolean;
    timestampCaptured: boolean;
    participationRecorded: boolean;
    aiAssessment?: string;
    organizerConfirmed: boolean;
  };
}

export function VerificationStatusCard({ status, signals }: VerificationStatusCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'VERIFIED':
        return {
          color: 'text-nirmaan-green-deep',
          bgColor: 'bg-nirmaan-green/10',
          borderColor: 'border-nirmaan-green/30',
          icon: ShieldCheck,
          label: 'Cleanup Verified',
          desc: 'This cleanup has been officially verified.'
        };
      case 'UNDER_REVIEW':
        return {
          color: 'text-accent-saffron',
          bgColor: 'bg-accent-saffron/10',
          borderColor: 'border-accent-saffron/30',
          icon: Search,
          label: 'Under Review',
          desc: 'Verification evidence is being assessed.'
        };
      case 'REJECTED':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/30',
          icon: AlertCircle,
          label: 'Verification Rejected',
          desc: 'Evidence could not be verified.'
        };
      case 'SUBMITTED':
        return {
          color: 'text-text-primary',
          bgColor: 'bg-surface-soft',
          borderColor: 'border-border-default',
          icon: CheckCircle,
          label: 'Evidence Submitted',
          desc: 'Ready for verification.'
        };
      case 'PENDING':
      default:
        return {
          color: 'text-text-secondary',
          bgColor: 'bg-surface-soft',
          borderColor: 'border-border-default',
          icon: Clock,
          label: 'Verification Pending',
          desc: 'Complete the cleanup to submit evidence.'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const SignalRow = ({ label, active }: { label: string, active: boolean }) => (
    <div className="flex items-center gap-2 text-sm">
      {active ? (
        <CheckCircle className="w-4 h-4 text-nirmaan-green" />
      ) : (
        <div className="w-4 h-4 rounded-full border border-border-strong flex items-center justify-center shrink-0"></div>
      )}
      <span className={active ? 'text-text-primary font-medium' : 'text-text-secondary'}>{label}</span>
    </div>
  );

  return (
    <div className={`border ${config.borderColor} ${config.bgColor} rounded-xl p-5`}>
      <div className="flex items-start gap-3 mb-4 border-b border-border-default/50 pb-4">
        <Icon className={`w-6 h-6 ${config.color} shrink-0 mt-0.5`} />
        <div>
          <h3 className={`font-bold ${config.color}`}>{config.label}</h3>
          <p className="text-sm text-text-secondary">{config.desc}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-3">Evidence Signals</h4>
        <SignalRow label="Before photo received" active={signals.beforePhotoSubmitted} />
        <SignalRow label="After photo received" active={signals.afterPhotoSubmitted} />
        <SignalRow label="Location available" active={signals.locationCaptured} />
        <SignalRow label="Timestamp available" active={signals.timestampCaptured} />
        <SignalRow label="Participation recorded" active={signals.participationRecorded} />
        <SignalRow label="Organizer confirmation" active={signals.organizerConfirmed} />
        
        {signals.aiAssessment && (
          <div className="mt-4 p-3 bg-surface-primary rounded-lg border border-border-default text-sm flex gap-2">
            <span className="font-bold text-text-primary shrink-0">AI Advisory:</span>
            <span className="text-text-secondary">{signals.aiAssessment}</span>
          </div>
        )}
      </div>
    </div>
  );
}
