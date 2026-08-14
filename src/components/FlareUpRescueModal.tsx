import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  X,
  Wind,
  Snowflake,
  Bed,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { FlareUpPostureDiagrams } from './ClinicalVisualDiagrams';

interface FlareUpRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlareUpRescueModal: React.FC<FlareUpRescueModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeStep, setActiveStep] = useState<'positions' | 'breathing' | 'cryo' | 'donts'>('positions');
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathTimer, setBreathTimer] = useState<number>(4);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev > 1) return prev - 1;
          // Switch phase
          setBreathPhase((curr) => {
            if (curr === 'Inhale') return 'Hold';
            if (curr === 'Hold') return 'Exhale';
            if (curr === 'Exhale') return 'Pause';
            return 'Inhale';
          });
          return 4;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-rose-500/40 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-rose-950/40 border-b border-rose-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Immediate Acute De-escalation
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Emergency Flare-Up Rescue Protocol
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Protocol Tab Switcher */}
        <div className="flex border-b border-slate-800 px-5 pt-3 gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'positions', label: '1. Zero-G Positions' },
            { id: 'breathing', label: '2. Box Breathing (Calm Nerves)' },
            { id: 'cryo', label: '3. Cryotherapy Pacing' },
            { id: 'donts', label: '4. Critical What NOT To Do' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStep(tab.id as any)}
              className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                activeStep === tab.id
                  ? 'border-rose-500 text-rose-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 text-slate-200 text-xs">
          {activeStep === 'positions' && (
            <div className="space-y-4">
              <p className="text-slate-300">
                During an acute spike in sciatica, neck spasm, or arm tingling, your #1 goal is <strong>unloading compressive forces from the spine</strong> so exiting nerve roots receive oxygen.
              </p>

              {/* Visual Illustrated Posture Guide */}
              <FlareUpPostureDiagrams />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-teal-400 block">
                    A. For Low Back / Sciatica / Leg Pain:
                  </span>
                  <h4 className="font-bold text-white">90-90 Psoas Decompression Lie</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Lie on your back on a firm carpet or yoga mat. Elevate your calves onto a sofa or chair seat so hips and knees are bent at 90 degrees. This immediately flattens lumbar lordosis and widens the neuroforamina.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-sky-400 block">
                    B. For Neck / Shoulder / Arm Tingling:
                  </span>
                  <h4 className="font-bold text-white">Supine Neutral Cervical Support</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Lie flat on your back with a small rolled hand towel supporting the natural lordotic curve of the neck. Arms rested gently across your chest. Keep eyes relaxed looking at ceiling.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeStep === 'breathing' && (
            <div className="space-y-5 text-center">
              <p className="text-slate-300 max-w-md mx-auto">
                Acute pain activates sympathetic fight-or-flight signaling, which tightens muscles around pinched nerves. <strong>Box breathing activates the vagus nerve</strong> to reduce pain sensitivity.
              </p>

              <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-950/80 border border-slate-800 max-w-xs mx-auto space-y-3">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full border-4 border-rose-500/30 transition-all duration-1000 ${
                      isBreathingActive ? 'animate-ping opacity-20' : ''
                    }`}
                  />
                  <div className="w-24 h-24 rounded-full bg-rose-500/20 border-2 border-rose-400 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-rose-300 uppercase">{breathPhase}</span>
                    <span className="text-2xl font-black text-white">{breathTimer}s</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBreathingActive(!isBreathingActive)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-slate-950 font-black text-xs transition-all shadow-lg shadow-rose-500/20"
                >
                  {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isBreathingActive ? 'Pause Breathing' : 'Start 4-4-4-4 Box Breath'}</span>
                </button>
              </div>
            </div>
          )}

          {activeStep === 'cryo' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold">
                  <Snowflake className="w-4 h-4" />
                  <span>The 15/45 Ice-to-Warmth Protocol</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  During an acute flare (first 48-72 hours), avoid hot tubs or aggressive heating pads directly over the swollen nerve root, which can worsen perineural edema.
                </p>
                <ul className="text-slate-400 space-y-1 list-disc list-inside text-[11px]">
                  <li>Wrap a gel cold pack in a thin towel (never bare ice on skin).</li>
                  <li>Apply for <strong>15 minutes maximum</strong> over the cervical or lumbar spine base.</li>
                  <li>Remove for 45 minutes to allow natural capillary reperfusion.</li>
                  <li>Repeat 3 to 4 times per day.</li>
                </ul>
              </div>
            </div>
          )}

          {activeStep === 'donts' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-800/40 text-rose-200 space-y-1">
                <span className="font-bold block text-rose-300">❌ DO NOT Perform Aggressive Static Stretching:</span>
                <p className="text-[11px] text-slate-300">
                  Do NOT aggressively pull your straight leg up to stretch the hamstring or crank your neck to the side. Nerves are irritated and pulling creates ischemia.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-800/40 text-rose-200 space-y-1">
                <span className="font-bold block text-rose-300">❌ DO NOT Stay Bedridden for Multiple Days:</span>
                <p className="text-[11px] text-slate-300">
                  While resting in 90-90 for 20 minutes is great, complete bed rest weakens deep spinal stabilizers and stalls disc imbibition. Walk gently for 3-5 minutes every 2 hours.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-800/40 text-rose-200 space-y-1">
                <span className="font-bold block text-rose-300">❌ DO NOT Sit Slouched on Soft Couches:</span>
                <p className="text-[11px] text-slate-300">
                  Deep soft couches force the lumbar and cervical spine into extreme flexion, driving disc nuclear material backward directly onto nerve roots.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
          >
            Close Emergency Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
