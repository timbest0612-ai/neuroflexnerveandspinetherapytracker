import React, { useState } from 'react';
import {
  Clock,
  ShieldAlert,
  Flame,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  X,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Zap,
  Activity,
  Layers,
  ThermometerSnowflake,
  Bed,
  Car,
  Laptop,
  Dumbbell,
  Compass,
} from 'lucide-react';
import { RoutineProgram } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLaunchRoutine?: (routine: RoutineProgram) => void;
  onOpenFlareProtocol: () => void;
  onOpenPathwayStage: (stageNumber: number) => void;
}

interface TriggerItem {
  id: string;
  category: 'posture' | 'activity' | 'sleep' | 'biomechanics' | 'vascular';
  icon: any;
  title: string;
  lagTime: string;
  nervePath: string;
  pathophysiology: string;
  recommendedCounterAction: string;
}

const COMMON_TRIGGERS: TriggerItem[] = [
  {
    id: 'trig-driving',
    category: 'activity',
    icon: Car,
    title: 'Prolonged Car Driving (>45 mins)',
    lagTime: '6 to 18 hours later',
    nervePath: 'Lumbar L4-S1 (Sciatic) & Lower Cervical C6-C7',
    pathophysiology:
      'Road vibration combined with sustained bucket-seat lumbar flexion raises intradiscal pressure by 180%, causing delayed endoneurial edema and morning sciatic burning.',
    recommendedCounterAction:
      'Immediately perform 90-90 Zero-G Decompression for 10 minutes + 15 min ice over sacrum/lumbar spine.',
  },
  {
    id: 'trig-screen-bed',
    category: 'posture',
    icon: Laptop,
    title: 'Looking Down at Phone/Tablet in Bed or on Sofa',
    lagTime: '8 to 24 hours later (Morning Shock)',
    nervePath: 'Cervical C5-C7 (Numb Thumb, Index Finger, Trapezius Fire)',
    pathophysiology:
      'A 60° forward head tilt exerts 60 lbs of mechanical shearing force on lower cervical facet joints, narrowing exiting neural foramina overnight.',
    recommendedCounterAction:
      'Perform 10 gentle McKenzie Chin Tucks supine + apply cold gel pack to base of neck for 15 minutes.',
  },
  {
    id: 'trig-stomach-sleep',
    category: 'sleep',
    icon: Bed,
    title: 'Sleeping on Stomach (Prone) or without Knee Spacer',
    lagTime: 'Immediately upon waking up',
    nervePath: 'Cervical Roots (Neck) & Sciatic/Piriformis (Lumbar)',
    pathophysiology:
      'Forces extreme cervical rotational torsion for 6+ hours, pinching dorsal root ganglia and twisting the lumbar sacroiliac complex.',
    recommendedCounterAction:
      'Perform 2-minute bedside morning nerve awakening (Gentle ankle pumps & knees-to-chest) before weight-bearing.',
  },
  {
    id: 'trig-heavy-lift',
    category: 'biomechanics',
    icon: Dumbbell,
    title: 'Asymmetric Lifting (Groceries, Child, Suitcase in 1 Hand)',
    lagTime: '4 to 12 hours later',
    nervePath: 'Unilateral Cervical Brachial Plexus & Lumbar Quadratus',
    pathophysiology:
      'Lateral spinal disc compression forces nuclear disc material laterally against un-myelinated dorsal sensory nerve roots.',
    recommendedCounterAction:
      'Perform Bird-Dog isometric core splinting (Stage 4 hold) to re-stabilize segmental spinal stabilizers.',
  },
  {
    id: 'trig-static-sitting',
    category: 'posture',
    icon: Laptop,
    title: 'Uninterrupted Desk Sitting (>1 Hour Without Standing)',
    lagTime: '4 to 8 hours later',
    nervePath: 'Sciatic Nerve at Greater Sciatic Notch & Gluteal Interface',
    pathophysiology:
      'Direct ischemic pressure against piriformis muscle collapses microvascular perfusion to the sciatic nerve trunk.',
    recommendedCounterAction:
      'Perform 8 Seated Sciatic Sliders (Stage 2) with calm nasal breathing + take a 5-minute brisk walk.',
  },
  {
    id: 'trig-overstretch',
    category: 'activity',
    icon: Activity,
    title: 'Aggressive Forward Bending or Hamstring Stretching',
    lagTime: '12 to 24 hours later (Severe Secondary Irritation)',
    nervePath: 'Entire Sciatic & Lumbar Dura Extension',
    pathophysiology:
      'Inflamed, ischemic nerves have reduced elasticity; aggressive stretching triggers a rebound inflammatory cascade and latency flare-up.',
    recommendedCounterAction:
      'Cease all aggressive stretching immediately; transition to gentle oscillatory nerve sliders only.',
  },
];

export const DelayedFlareInvestigatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenFlareProtocol,
  onOpenPathwayStage,
}) => {
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [currentPainLevel, setCurrentPainLevel] = useState<number>(6);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const toggleTrigger = (id: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedTriggers([]);
    setHasCalculated(false);
    setCurrentPainLevel(6);
  };

  const activeTriggerData = COMMON_TRIGGERS.filter((t) =>
    selectedTriggers.includes(t.id)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-sky-500/20 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  Biological Latency Audit
                </span>
                <span className="text-xs text-slate-400">4–24 Hour Delay Diagnostic</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Delayed Flare-Up Investigator
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Clinical Context Box */}
          <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200 leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-sky-300">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Why Did I Flare Up Today When I Didn't Do Anything?</span>
            </div>
            <p className="text-slate-300">
              Nerves suffer from <strong>Ischemic-Inflammatory Latency</strong>. When compressed or over-stretched, microvascular capillary flow is temporarily starved. The chemical inflammatory cascade and mast cell histamine release takes <strong>4 to 24 hours</strong> to peak.
            </p>
          </div>

          {!hasCalculated ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Select what you did yesterday or last night (Select all that apply):
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  {selectedTriggers.length} selected
                </span>
              </div>

              <div className="space-y-2.5">
                {COMMON_TRIGGERS.map((item) => {
                  const isSelected = selectedTriggers.includes(item.id);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleTrigger(item.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-sky-500/15 border-sky-400 ring-1 ring-sky-400/30 shadow-md'
                          : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-sky-500 text-slate-950'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-white">{item.title}</h4>
                          <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                            {item.lagTime}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {item.pathophysiology}
                        </p>
                      </div>

                      <div className="shrink-0 pt-1">
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-sky-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-700" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Current Pain Level Slider */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">
                    Current Flare Severity:
                  </span>
                  <span
                    className={`font-black px-2 py-0.5 rounded text-xs ${
                      currentPainLevel >= 7
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : currentPainLevel >= 4
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {currentPainLevel} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentPainLevel}
                  onChange={(e) => setCurrentPainLevel(Number(e.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setHasCalculated(true)}
                disabled={selectedTriggers.length === 0}
                className="w-full py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Calculate Root Cause & Immediate Counter-Action Plan</span>
              </button>
            </div>
          ) : (
            /* Results & Counter-Action Plan */
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-400">
                    Diagnostic Latency Findings
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Change Triggers</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {activeTriggerData.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>Trigger #{idx + 1}: {item.title}</span>
                        <span className="text-[10px] text-sky-400 font-mono">
                          {item.lagTime}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        <strong className="text-teal-300">Biomechanical Cause:</strong> {item.pathophysiology}
                      </p>
                      <div className="p-2 rounded-lg bg-teal-950/40 border border-teal-800/40 text-[11px] text-teal-200">
                        <strong>Immediate Counter-Measure:</strong> {item.recommendedCounterAction}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescribed Step-by-Step Recovery Action */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-teal-500/40 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Your 3-Step Flare De-escalation Protocol</span>
                </div>

                <div className="space-y-2 text-xs text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-500 text-slate-950 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-white block">Quench Endoneurial Edema (15 mins):</strong>
                      <span className="text-slate-400">Apply ice pack with thin cloth barrier over the spinal root segment (neck or low back) to vasoconstrict inflamed perineural capillaries.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-500 text-slate-950 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-white block">Execute Stage 0 Zero-G Decompression:</strong>
                      <span className="text-slate-400">Elevate calves at 90° on sofa with small cervical roll under neck. Engage 4-7-8 nasal diaphragmatic breathing.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-500 text-slate-950 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-white block">Re-introduce Gentle Low-Tension Sliders:</strong>
                      <span className="text-slate-400">Perform 6-8 smooth nerve glides without holding at end range. Never force through acute pain.</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenFlareProtocol();
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Open Acute SOS Protocol</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPathwayStage(0);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Watch Stage 0 Video Model</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-slate-400">
            NeuroFlex Clinical Latency Diagnostic Engine
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
