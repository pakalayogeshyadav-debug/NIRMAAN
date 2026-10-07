import { Sparkles, AlertTriangle } from 'lucide-react';
import type { AIAssessment } from '@/data/mockWasteReports';

export interface WasteAssessmentCardProps {
  assessment: AIAssessment;
  className?: string;
}

export function WasteAssessmentCard({ assessment, className = '' }: WasteAssessmentCardProps) {
  return (
    <div className={`bg-surface-soft border border-border-default rounded-2xl overflow-hidden ${className}`}>
      <div className="bg-nirmaan-green/10 border-b border-border-default px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-nirmaan-green" />
          <h4 className="font-bold text-nirmaan-green-deep">AI-Assisted Assessment</h4>
        </div>
        <span className="text-xs font-bold text-nirmaan-green bg-white px-2 py-1 rounded shadow-sm border border-border-default">
          {assessment.confidence}% Confidence
        </span>
      </div>
      
      <div className="p-5 space-y-4">
        <p className="text-xs text-text-secondary italic -mt-1 mb-2">
          Assessment is advisory and may require human verification.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">Possible Waste</span>
            <div className="flex flex-wrap gap-1">
              {assessment.detectedWasteTypes.map(type => (
                <span key={type} className="text-sm font-medium text-text-primary bg-surface-primary border border-border-default px-2 py-0.5 rounded">
                  {type.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="block text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">Estimated Severity</span>
            <span className={`text-sm font-bold px-2 py-0.5 rounded border inline-block ${
              assessment.estimatedSeverity === 'CRITICAL' ? 'bg-error/10 text-error border-error/20' :
              assessment.estimatedSeverity === 'HIGH' ? 'bg-accent-terracotta/10 text-accent-terracotta border-accent-terracotta/20' :
              assessment.estimatedSeverity === 'MEDIUM' ? 'bg-accent-saffron/10 text-accent-saffron border-accent-saffron/20' :
              'bg-nirmaan-green/10 text-nirmaan-green border-nirmaan-green/20'
            }`}>
              {assessment.estimatedSeverity}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-border-default">
          <span className="block text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">Visible Objects</span>
          <p className="text-sm text-text-secondary font-medium">{assessment.visibleObjects.join(', ')}</p>
        </div>

        {assessment.possibleHazards.length > 0 && assessment.possibleHazards[0] !== 'None detected' && (
          <div className="pt-2 border-t border-border-default">
            <span className="block text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">Possible Hazards</span>
            <div className="flex items-start gap-1.5 text-sm font-medium text-accent-terracotta bg-accent-terracotta/5 p-2 rounded border border-accent-terracotta/10">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{assessment.possibleHazards.join(', ')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
