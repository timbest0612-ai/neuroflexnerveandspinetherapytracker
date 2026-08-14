import React from 'react';
import { CompletedSession, SymptomLog } from '../types';
import { FileText, Printer, Download, X, Award, CheckCircle2, TrendingDown } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sessions: CompletedSession[];
  symptomLogs: SymptomLog[];
}

export const ClinicalReportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  sessions,
  symptomLogs,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const totalMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const avgPrePain =
    sessions.length > 0
      ? (sessions.reduce((acc, s) => acc + s.prePainScore, 0) / sessions.length).toFixed(1)
      : 'N/A';
  const avgPostPain =
    sessions.length > 0
      ? (sessions.reduce((acc, s) => acc + s.postPainScore, 0) / sessions.length).toFixed(1)
      : 'N/A';

  const improvedCount = sessions.filter((s) => s.nerveResponse === 'improved').length;
  const improvedPercent =
    sessions.length > 0 ? Math.round((improvedCount / sessions.length) * 100) : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-6 text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white">
              Clinical Physical Therapy Summary Report
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Document Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {/* Patient Overview Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Patient Condition</span>
                <span className="text-sm font-bold text-white">Degenerative Spine & Neural Radiculopathy</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Report Generated</span>
                <span className="text-xs text-teal-300 font-medium">
                  {new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Primary focus: Cervical retraction, median/ulnar/radial nerve gliding (hands), lumbar decompression (press-ups, pelvic tilts), and sciatic nerve flossing (legs).
            </p>
          </div>

          {/* Key Rehabilitation Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Total PT Sessions</span>
              <span className="text-xl font-black text-white">{sessions.length}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Minutes</span>
              <span className="text-xl font-black text-teal-300">{totalMinutes}m</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Pain Reduction</span>
              <span className="text-xl font-black text-emerald-400">
                {avgPrePain} → {avgPostPain}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Centralization %</span>
              <span className="text-xl font-black text-teal-300">{improvedPercent}%</span>
            </div>
          </div>

          {/* Recent Completed Sessions Table */}
          <div className="space-y-2">
            <span className="font-bold text-white text-xs block">
              Recent Rehabilitation History:
            </span>
            {sessions.length === 0 ? (
              <p className="text-slate-500 italic">No completed sessions logged yet.</p>
            ) : (
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-2">Date</th>
                      <th className="p-2">Routine / Target</th>
                      <th className="p-2">Duration</th>
                      <th className="p-2">Nerve Response</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                    {sessions.slice(0, 6).map((s) => (
                      <tr key={s.id}>
                        <td className="p-2 text-slate-300">
                          {new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="p-2 font-semibold text-white truncate max-w-[140px]">
                          {s.programTitle}
                        </td>
                        <td className="p-2 text-slate-400">{s.durationMinutes} mins</td>
                        <td className="p-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              s.nerveResponse === 'improved'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {s.nerveResponse === 'improved' ? 'Centralized / Better' : 'Stable'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Summary notes for clinician */}
          <div className="p-3.5 rounded-2xl bg-teal-950/30 border border-teal-800/40 text-teal-200 text-xs space-y-1">
            <span className="font-bold block text-teal-300">Clinician Note:</span>
            <p className="text-teal-200/90 leading-relaxed text-[11px]">
              Patient is adhering to oscillatory nerve sliding and spinal unloading protocols for multi-zone degenerative changes. Neural irritability remains monitored with no red flags reported.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-1.5 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
