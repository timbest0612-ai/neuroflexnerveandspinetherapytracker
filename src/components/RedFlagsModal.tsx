import React from 'react';
import { ShieldAlert, AlertTriangle, PhoneCall, X, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RedFlagsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-rose-500/50 rounded-3xl shadow-2xl overflow-hidden my-6 text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-rose-900/50 bg-rose-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider">
                Clinical Safety Protocol
              </span>
              <h2 className="text-lg font-black text-white">
                Spine & Nerve Red Flags Warning
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-300">
          <p className="text-slate-300 leading-relaxed font-medium">
            While degenerative changes and mild tingling are safely managed with physical therapy and nerve flossing, the following emergency symptoms indicate acute neural compression requiring <strong>immediate emergency medical evaluation</strong>:
          </p>

          {/* Critical Red Flags List */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-rose-300 text-xs">
                🚨 1. Cauda Equina Syndrome (Lumbar Emergency):
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-100">
                <li>Sudden loss of bowel or bladder control (incontinence or inability to urinate).</li>
                <li>"Saddle Anesthesia": Numbness in the groin, buttocks, or inner thighs.</li>
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-rose-300 text-xs">
                🚨 2. Rapid Progressive Motor Deficit:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-100">
                <li>Sudden Foot Drop: Inability to lift toes/foot while walking, causing frequent tripping.</li>
                <li>Sudden Hand Clumsiness / Inability to hold a cup or button a shirt.</li>
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-rose-300 text-xs">
                🚨 3. Cervical Myelopathy Signs:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-100">
                <li>Gait instability / walking feeling like drunkenness or heaviness in both legs.</li>
                <li>Lhermitte's sign: Electric shock sensation traveling down the spine when bending neck forward.</li>
              </ul>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-400 space-y-1 text-[11px]">
            <span className="font-bold text-slate-200 block">
              When to Consult Your Healthcare Provider:
            </span>
            <p>
              If your symptoms do not centralize, progressively worsen over 2-3 weeks, or cause severe nocturnal sleep disruption, schedule an updated MRI and consultation with an orthopedic spine specialist.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            I Understand & Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
