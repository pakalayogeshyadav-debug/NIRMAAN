import { MapPin, Calendar } from 'lucide-react';

export interface BeforeAfterEvidenceProps {
  beforePhoto?: string;
  afterPhoto?: string;
  beforeCapturedAt?: string;
  afterCapturedAt?: string;
  location?: string; // Optional friendly location string
}

const formatDate = (isoString?: string) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (isoString?: string) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

export function BeforeAfterEvidence({ beforePhoto, afterPhoto, beforeCapturedAt, afterCapturedAt, location }: BeforeAfterEvidenceProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* BEFORE */}
        <div className="flex-1 bg-surface-soft border border-border-default rounded-xl overflow-hidden flex flex-col">
          <div className="bg-surface-primary px-4 py-2 border-b border-border-default flex justify-between items-center">
            <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">Before</span>
            {beforeCapturedAt && (
              <span className="text-xs font-medium text-text-secondary">{formatTime(beforeCapturedAt)}</span>
            )}
          </div>
          <div className="aspect-[4/3] bg-surface-primary relative">
            {beforePhoto ? (
              <img src={beforePhoto} alt="Before cleanup" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-tertiary text-sm p-4 text-center">
                Before photo pending
              </div>
            )}
          </div>
        </div>
        
        {/* AFTER */}
        <div className="flex-1 bg-surface-soft border border-border-default rounded-xl overflow-hidden flex flex-col">
          <div className="bg-surface-primary px-4 py-2 border-b border-border-default flex justify-between items-center">
            <span className="text-xs font-bold text-nirmaan-green uppercase tracking-wider">After</span>
            {afterCapturedAt && (
              <span className="text-xs font-medium text-text-secondary">{formatTime(afterCapturedAt)}</span>
            )}
          </div>
          <div className="aspect-[4/3] bg-surface-primary relative">
            {afterPhoto ? (
              <img src={afterPhoto} alt="After cleanup" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-tertiary text-sm p-4 text-center">
                After photo pending
              </div>
            )}
          </div>
        </div>
      </div>

      {(beforeCapturedAt || location) && (
        <div className="flex flex-wrap gap-4 px-1">
          {location && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
              <MapPin className="w-3.5 h-3.5 text-text-tertiary" />
              {location}
            </div>
          )}
          {beforeCapturedAt && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
              <Calendar className="w-3.5 h-3.5 text-text-tertiary" />
              {formatDate(beforeCapturedAt)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
