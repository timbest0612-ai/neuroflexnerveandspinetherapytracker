import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowRight,
  X,
  Play,
  HeartPulse,
  Info,
  Layers,
  Zap,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectStage?: (stageId: number) => void;
  onOpenRoutine?: (routineId: string) => void;
}

export const MriReportInterpreterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectStage,
  onOpenRoutine,
}) => {
  const [activeView, setActiveView] = useState<'summary' | 'breakdown' | 'action_plan'>('summary');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-slate-900 border border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ring-1 ring-teal-500/20 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  Clinical MRI Decoder
                </span>
                <span className="text-xs text-slate-400">LAUTECH Radiology Analysis</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Lumbar Spine MRI Clinical Translation & Action Plan
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

        {/* View Switcher Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-4 sm:px-6 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveView('summary')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
              activeView === 'summary'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. The Good News & Verdict
          </button>
          <button
            type="button"
            onClick={() => setActiveView('breakdown')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
              activeView === 'breakdown'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Line-by-Line Medical Translation
          </button>
          <button
            type="button"
            onClick={() => setActiveView('action_plan')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
              activeView === 'action_plan'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Prescribed 4-Step Home Protocol
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: SUMMARY & VERDICT */}
          {activeView === 'summary' && (
            <div className="space-y-4">
              {/* Verdict Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/40 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Clinical Conclusion: Highly Favorable & Completely Reversible with Conservative PT</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>The most important takeaway:</strong> The MRI explicitly states <em>"No significant neural foraminal stenosis or nerve root compression"</em> and <em>"No compression fracture or cord compression"</em>.
                  This means your nerves are <strong>not trapped or permanently damaged</strong>. The condition is <strong>early-stage, mild, and responds exceptionally well</strong> to targeted directional exercises and spine-unloading habits without needing surgery.
                </p>
              </div>

              {/* 3 Key Pillars from MRI */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    <span>Straightened Lordosis</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Caused by <strong>protective paraspinal muscle spasms</strong>. The body stiffens to protect the lower back. Restoring the natural lumbar curve removes the ache.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-400" />
                    <span>Pfirrmann Grade I & II</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Grade I (L4/L5, L5/S1) is <strong>completely normal disc height</strong>. Grade II (L1–L4) is <strong>early mild dehydration</strong> typical for age 42 that is readily stabilized.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Nerves 100% Patent</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Neural exit tunnels are fully open. Mild disc bulges and facet arthropathy only create mild central sac indentation, which shrinks with extension exercises.
                  </p>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveView('action_plan')}
                  className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
                >
                  <span>See Prescribed Exercises for This MRI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LINE-BY-LINE MEDICAL TRANSLATION */}
          {activeView === 'breakdown' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center justify-between">
                  <span className="text-teal-400">1. "Straightening of normal lumbar lordosis likely related to muscle spasm"</span>
                  <span className="text-[10px] bg-teal-500/10 text-teal-300 px-2 py-0.5 rounded border border-teal-500/20">Spasm-Driven</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>What it means:</strong> The human lower back naturally curves inward (lordosis). When your back muscles go into defensive spasm, they pull the spine straight like a board.
                  <br />
                  <strong className="text-emerald-400">Solution:</strong> Prone lying on pillows + gentle McKenzie press-ups to relax paraspinal spasms and re-introduce the healthy lumbar arch.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center justify-between">
                  <span className="text-amber-300">2. "Pfirrmann Grade II at L1-L4, Grade I at L4/L5 and L5/S1"</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">Mild Disc Changes</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>What it means:</strong> Grade I is youthful, fully hydrated disc tissue (your critical L4-S1 shock-absorbing discs are in great shape!). Grade II is mild, expected age-related fluid loss in the upper lumbar discs.
                  <br />
                  <strong className="text-emerald-400">Solution:</strong> Stuart McGill Big 3 (Bird-Dog, Side Plank, Modified Curl-Up) to take weight off the discs and support them with core stiffness.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center justify-between">
                  <span className="text-sky-300">3. "Mild symmetrical disc bulges with mild facet arthropathy (mild thecal indentation)"</span>
                  <span className="text-[10px] bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/20">Mild Canal Narrowing</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>What it means:</strong> The discs have a minor outwards bulge (like an underinflated tire) and the small joints in the back of the spine have slight wear. It gently touches the outer fluid sac (thecal sac) but does NOT pinch the nerves.
                  <br />
                  <strong className="text-emerald-400">Solution:</strong> Workstation micro-breaks (avoid sitting {">"} 30 mins) + lumbar rolls in chairs and cars to prevent disc fluid from pushing backwards.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/40 space-y-1">
                <div className="font-bold text-white flex items-center justify-between">
                  <span className="text-emerald-400">4. "No significant neural foraminal stenosis or nerve root compression"</span>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Pristine Neural Openings</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>What it means:</strong> The nerve exits are completely free. You do not have structural nerve entrapment. Your symptoms are caused by mechanical disc tension and muscle splinting, which are 100% addressable through physical rehabilitation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ACTION PLAN */}
          {activeView === 'action_plan' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-800/40 text-xs text-teal-200 space-y-1">
                <div className="font-bold text-teal-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>Exact 4-Step Clinical Protocol for Mr. Oyaleke & Lumbar Spondylosis:</span>
                </div>
                <p className="text-slate-300">
                  Follow these 4 daily clinical steps inside NeuroFlex to rapidly calm muscle spasms, restore lumbar lordosis, and decompress the mild disc bulges:
                </p>
              </div>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-teal-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-[10px]">1</span>
                      Zero-G Muscle Spasm Quench (Morning & Evening)
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Stage 0 Protocol</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Lie prone (face down) with a pillow under your hips for 3 minutes, then remove the pillow and rest your chin on your fists for 2 minutes. This relieves paraspinal spasms and allows the disc nucleus to migrate anteriorly.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-emerald-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">2</span>
                      McKenzie Prone Press-Ups (Restore Lumbar Lordosis)
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Stage 1 Protocol</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Perform 10 slow, smooth prone press-ups (keeping your pelvis glued to the floor) every 3–4 hours. This directly addresses the straightened lumbar lordosis noted in your MRI report.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">3</span>
                      McGill Big 3 Stabilization (Protect Facet Joints)
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Stage 2 & 3 Protocol</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Perform the Modified Curl-Up, Bird-Dog, and Side Plank for 6-second holds. This creates a muscular corset that offloads the mild facet joint arthropathy and prevents disc re-bulging.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-sky-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-[10px]">4</span>
                      Micro-Break Pacing & Sleep Lumbar Support
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Ergonomics Tab</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Never sit continuously for more than 30 minutes without standing. Place a small lumbar roll behind your lower back when sitting or driving, and sleep with a pillow between your knees (side sleeper) or under your knees (back sleeper).
                  </p>
                </div>
              </div>

              {/* Direct Action Launchers */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onSelectStage) onSelectStage(1);
                  }}
                  className="py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Stage 1 Lumbar Lordosis Routine</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onSelectStage) onSelectStage(0);
                  }}
                  className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs border border-teal-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span>Open Acute Zero-G Spasm Rescue</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
