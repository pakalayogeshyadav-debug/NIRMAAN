import { AlertCircle, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import type { WasteReport } from '@/data/mockWasteReports';

export interface DuplicateReportWarningProps {
  existingReport: WasteReport;
  distance?: string;
  onViewExisting: () => void;
  onContinueAnyway: () => void;
}

export function DuplicateReportWarning({ existingReport, distance = "Nearby", onViewExisting, onContinueAnyway }: DuplicateReportWarningProps) {
  const formattedDate = new Date(existingReport.reportedAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="bg-surface-primary border-2 border-accent-saffron/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-accent-saffron/10 px-5 py-4 flex items-center gap-3 border-b border-accent-saffron/20">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
          <AlertCircle className="w-5 h-5 text-accent-saffron" />
        </div>
        <div>
          <h3 className="font-bold text-text-primary text-lg">Possible Duplicate Report</h3>
          <p className="text-sm text-text-secondary">This location may already have a recent report.</p>
        </div>
      </div>
      
      <div className="p-5 sm:p-6 space-y-6">
        <div className="bg-surface-soft border border-border-default rounded-xl p-4 flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-border-default hidden sm:block">
            <img src={existingReport.photoUrl} alt="Existing report" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-text-primary truncate pr-2">{existingReport.wasteType.replace('_', ' ')}</h4>
              <span className="text-xs font-bold bg-border-strong px-2 py-0.5 rounded text-text-secondary whitespace-nowrap">
                {existingReport.status.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
              <MapPin className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
              <span className="truncate">{existingReport.locationLabel} • {distance}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Calendar className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
              <span>Reported {formattedDate}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onViewExisting}>
            View Existing Report
          </Button>
          <Button className="flex-1 gap-2" onClick={onContinueAnyway}>
            Continue Anyway <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
