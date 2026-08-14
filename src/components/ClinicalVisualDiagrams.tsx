import React, { useState } from 'react';
import {
  ShieldAlert,
  Zap,
  Droplets,
  Brain,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Activity,
  Layers,
  Heart,
  Eye,
  RefreshCw,
} from 'lucide-react';

/* =========================================================================
   STAGE 1 VISUAL: DE-ESCALATION, UNLOADING & ISCHEMIA RELIEF
   ========================================================================= */
export const Stage1VisualDecompression: React.FC = () => {
  const [viewMode, setViewMode] = useState<'compressed' | 'decompressed'>('decompressed');

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
          <Activity className="w-4 h-4" />
          <span>Stage 1 Visual: Neural Foramen Decompression & Ischemia Relief</span>
        </div>
        <div className="flex gap-1.5 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setViewMode('compressed')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              viewMode === 'compressed'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Pinched (Ischemia)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('decompressed')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              viewMode === 'decompressed'
                ? 'bg-teal-500 text-slate-950 font-black border-teal-400 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Zero-G Restored (Flowing)
          </button>
        </div>
      </div>

      {/* Interactive Medical Graphic */}
      <div className="relative w-full h-52 sm:h-60 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg viewBox="0 0 400 220" className="w-full h-full">
          <defs>
            <radialGradient id="nerveIrritationGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nerveHealedGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="capillaryFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <line x1="20" y1="110" x2="380" y2="110" stroke="#1e293b" strokeDasharray="3 3" />

          {/* Upper Vertebra Bone */}
          <path
            d={
              viewMode === 'compressed'
                ? 'M 80 40 Q 200 45 320 40 L 320 75 Q 200 70 80 75 Z'
                : 'M 80 30 Q 200 35 320 30 L 320 60 Q 200 55 80 60 Z'
            }
            fill="#334155"
            stroke="#64748b"
            strokeWidth="2"
            className="transition-all duration-700"
          />
          <text x="200" y="48" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
            Superior Vertebra (Cervical / Lumbar)
          </text>

          {/* Intervertebral Disc */}
          <rect
            x="110"
            y={viewMode === 'compressed' ? '76' : '62'}
            width="180"
            height={viewMode === 'compressed' ? '24' : '44'}
            rx="8"
            fill={viewMode === 'compressed' ? '#7f1d1d' : '#0f766e'}
            stroke={viewMode === 'compressed' ? '#f43f5e' : '#2dd4bf'}
            strokeWidth="2"
            className="transition-all duration-700"
          />
          <text
            x="200"
            y={viewMode === 'compressed' ? '92' : '88'}
            textAnchor="middle"
            fill={viewMode === 'compressed' ? '#fca5a5' : '#ccfbf1'}
            fontSize="10"
            fontWeight="bold"
          >
            {viewMode === 'compressed' ? 'Bulging Disc (Compressed)' : 'Rehydrated Disc (Decompressed)'}
          </text>

          {/* Lower Vertebra Bone */}
          <path
            d={
              viewMode === 'compressed'
                ? 'M 80 102 Q 200 97 320 102 L 320 137 Q 200 142 80 137 Z'
                : 'M 80 108 Q 200 103 320 108 L 320 138 Q 200 143 80 138 Z'
            }
            fill="#334155"
            stroke="#64748b"
            strokeWidth="2"
            className="transition-all duration-700"
          />

          {/* Exiting Spinal Nerve Root */}
          <g className="transition-all duration-700">
            {viewMode === 'compressed' ? (
              <>
                {/* Pinched Nerve Path */}
                <path
                  d="M 290 88 C 310 88, 320 85, 360 130"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                {/* Pinch Chokepoint */}
                <circle cx="315" cy="90" r="14" fill="url(#nerveIrritationGlow)" className="animate-pulse" />
                <circle cx="315" cy="90" r="5" fill="#f43f5e" />
                <text x="340" y="80" fill="#fca5a5" fontSize="10" fontWeight="bold">
                  ⚠️ Ischemic Chokepoint
                </text>
                {/* Radiating Pain Lightning */}
                <path d="M 345 110 L 360 120 L 352 125 L 375 145" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
              </>
            ) : (
              <>
                {/* Open Foramen Smooth Nerve Path */}
                <path
                  d="M 290 84 C 315 84, 335 84, 375 125"
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Capillary Blood Flow Ring */}
                <circle cx="320" cy="85" r="16" fill="url(#nerveHealedGlow)" className="animate-pulse" />
                {/* Microvascular Blood Vessel */}
                <path
                  d="M 285 80 C 310 80, 330 80, 370 120"
                  fill="none"
                  stroke="url(#capillaryFlow)"
                  strokeWidth="3"
                  strokeDasharray="4 3"
                  className="animate-[dash_1.5s_linear_infinite]"
                />
                <text x="340" y="70" fill="#2dd4bf" fontSize="10" fontWeight="bold">
                  ✓ Oxygen Perfusion Restored
                </text>
              </>
            )}
          </g>

          {/* Zero-G Posture Mini Figure in Corner */}
          <g transform="translate(30, 150)">
            <rect width="340" height="60" rx="8" fill="#0f172a" stroke="#334155" />
            <circle cx="30" cy="30" r="10" fill="#64748b" />
            <line x1="38" y1="30" x2="80" y2="30" stroke="#94a3b8" strokeWidth="4" />
            {/* Sofa/Couch Ottoman */}
            <rect x="75" y="15" width="40" height="30" rx="4" fill="#1e293b" stroke="#38bdf8" />
            {/* Calves up on couch (90-90) */}
            <polyline points="70,30 80,18 105,18" fill="none" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
            <text x="130" y="26" fill="#f8fafc" fontSize="11" fontWeight="bold">
              What To Do in Stage 1: 90-90 Zero-G Decompression Lie
            </text>
            <text x="130" y="44" fill="#94a3b8" fontSize="9.5">
              15 mins 2x daily. Widens neural foramen by 24% and stops dorsal root ganglion firing.
            </text>
          </g>
        </svg>
      </div>

      {/* Stage 1 Action Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="font-bold text-teal-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Movement to Perform:
          </span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Perform <strong>McKenzie Chin Tucks</strong> (neck) or <strong>Prone Extensions on Elbows</strong> (low back) for 10 reps every 2 hours to push disc displacement away from the nerve.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="font-bold text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> The Crucial Sign of Healing:
          </span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            <strong>Centralization:</strong> Pain retreating from your fingertips or foot back into your shoulder or low back is the universal clinical signal that the nerve is unpinched.
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   STAGE 2 VISUAL: NERVE SLIDING EXCURSION & MYELIN REMODELING
   ========================================================================= */
export const Stage2VisualNerveGliding: React.FC = () => {
  const [sliderStep, setSliderStep] = useState<number>(0);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-sky-500/30 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
          <Zap className="w-4 h-4" />
          <span>Stage 2 Visual: Butler Neurodynamic Slider Excursion (No Tension)</span>
        </div>
        <button
          type="button"
          onClick={() => setSliderStep((prev) => (prev + 1) % 2)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/30 text-xs font-bold transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Toggle Motion Phase ({sliderStep === 0 ? 'Position A: Extension' : 'Position B: Neutral'})</span>
        </button>
      </div>

      {/* Interactive Nerve Excursion Visual */}
      <div className="relative w-full h-56 sm:h-64 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg viewBox="0 0 420 220" className="w-full h-full">
          <defs>
            <linearGradient id="nerveMyelinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Torso & Head */}
          <g className="transition-all duration-500">
            {sliderStep === 0 ? (
              /* Head tilted TOWARDS right arm (Slider) */
              <>
                <circle cx="160" cy="55" r="20" fill="#475569" stroke="#94a3b8" strokeWidth="2.5" />
                <path d="M 172 52 L 182 56 L 172 62" fill="none" stroke="#94a3b8" strokeWidth="2" />
                {/* Cervical Spine Curve tilted right */}
                <path d="M 155 75 Q 165 95 160 115" stroke="#64748b" strokeWidth="8" strokeLinecap="round" fill="none" />
                <text x="160" y="28" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  1. Head Tilts TOWARDS Arm (Unloads Neck)
                </text>
              </>
            ) : (
              /* Head in neutral */
              <>
                <circle cx="150" cy="50" r="20" fill="#475569" stroke="#94a3b8" strokeWidth="2.5" />
                <path d="M 163 48 L 173 52 L 163 58" fill="none" stroke="#94a3b8" strokeWidth="2" />
                {/* Cervical Spine Curve neutral */}
                <path d="M 150 70 L 150 115" stroke="#64748b" strokeWidth="8" strokeLinecap="round" fill="none" />
                <text x="150" y="25" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                  2. Head Returns to Neutral
                </text>
              </>
            )}
            {/* Torso Base */}
            <path d="M 110 115 L 190 115 L 195 165 L 105 165 Z" fill="#1e293b" stroke="#334155" />
          </g>

          {/* Arm & Wrist Nerve Floss */}
          <g className="transition-all duration-500">
            {sliderStep === 0 ? (
              /* Arm extended, wrist bent back (Tray Carrier) */
              <>
                {/* Upper arm */}
                <line x1="180" y1="118" x2="250" y2="110" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
                {/* Forearm */}
                <line x1="250" y1="110" x2="330" y2="105" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
                {/* Wrist extended back like a waiter tray */}
                <polyline points="330,105 345,90 365,90" fill="none" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
                {/* Sliding Nerve Strand (Median/Radial) */}
                <path
                  d="M 160 85 Q 210 115 250 110 T 330 105 T 365 90"
                  fill="none"
                  stroke="url(#nerveMyelinGradient)"
                  strokeWidth="4.5"
                  strokeDasharray="6 3"
                  className="animate-[dash_2s_linear_infinite]"
                />
                <text x="350" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  2. Hand Extends (Glides 12-15mm)
                </text>
              </>
            ) : (
              /* Arm relaxed / elbow bent */
              <>
                {/* Upper arm */}
                <line x1="175" y1="118" x2="230" y2="125" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
                {/* Forearm bent forward */}
                <line x1="230" y1="125" x2="280" y2="100" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
                {/* Hand soft fist */}
                <circle cx="288" cy="95" r="9" fill="#94a3b8" />
                {/* Nerve in relaxed loop */}
                <path
                  d="M 150 80 Q 190 120 230 125 T 288 95"
                  fill="none"
                  stroke="url(#nerveMyelinGradient)"
                  strokeWidth="4.5"
                />
                <text x="290" y="80" fill="#94a3b8" fontSize="10" fontWeight="bold">
                  Hand Soft Fist (Elbow Bent)
                </text>
              </>
            )}
          </g>

          {/* 1mm/day Axonal Regrowth Meter at bottom */}
          <g transform="translate(20, 175)">
            <rect width="380" height="38" rx="8" fill="#0f172a" stroke="#334155" />
            <circle cx="25" cy="19" r="8" fill="#38bdf8" />
            <text x="25" y="23" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="black">
              1
            </text>
            <text x="45" y="16" fill="#f8fafc" fontSize="10.5" fontWeight="bold">
              Axonal Regrowth Speed: 1 mm / day (~1 inch / month)
            </text>
            <text x="45" y="30" fill="#94a3b8" fontSize="9">
              Sliding dissolves fascial scar adhesions without stretching sensitive damaged nerve fibers.
            </text>
          </g>
        </svg>
      </div>

      {/* Stage 2 Action Guide */}
      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
        <span className="font-bold text-sky-300 block">
          How to Execute Butler Sliders Correctly:
        </span>
        <ul className="text-slate-300 space-y-1 list-disc list-inside text-[11px]">
          <li><strong>Never &quot;Stretch&quot; the Nerve:</strong> Unlike tight hamstring muscles, nerves hate high-tension traction. Always slacken one end (tilt head towards arm) while tensioning the other.</li>
          <li><strong>Rhythm:</strong> 10 to 12 smooth, pain-free glides, 2–3 times daily.</li>
          <li><strong>Tolerance:</strong> If tingling increases during the exercise, decrease the arm angle down toward 45 degrees.</li>
        </ul>
      </div>
    </div>
  );
};

/* =========================================================================
   STAGE 3 VISUAL: DEEP STABILIZER CORSET & DISC REHYDRATION
   ========================================================================= */
export const Stage3VisualStabilizers: React.FC = () => {
  const [muscleActive, setMuscleActive] = useState<boolean>(true);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Stage 3 Visual: Deep Muscular Corset (Multifidus & Longus Colli)</span>
        </div>
        <button
          type="button"
          onClick={() => setMuscleActive(!muscleActive)}
          className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
            muscleActive
              ? 'bg-purple-500 text-slate-950 font-black border-purple-400 shadow-md'
              : 'bg-slate-900 text-slate-400 border-slate-800'
          }`}
        >
          {muscleActive ? 'Stabilizers Active (Protected)' : 'Stabilizers Inactive (Shearing)'}
        </button>
      </div>

      {/* Interactive Muscle Activation Graphic */}
      <div className="relative w-full h-56 sm:h-64 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg viewBox="0 0 400 220" className="w-full h-full">
          {/* Vertebral Column Stack (L1 - L5 / C3 - C7) */}
          <g transform="translate(140, 20)">
            {/* Vertebra 1 */}
            <rect x="30" y="10" width="60" height="24" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
            {/* Disc 1 */}
            <rect x="35" y="34" width="50" height="12" rx="3" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1" />

            {/* Vertebra 2 */}
            <rect x="30" y="46" width="60" height="24" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
            {/* Disc 2 */}
            <rect x="35" y="70" width="50" height="12" rx="3" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1" />

            {/* Vertebra 3 */}
            <rect x="30" y="82" width="60" height="24" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
            {/* Disc 3 */}
            <rect x="35" y="106" width="50" height="12" rx="3" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1" />

            {/* Vertebra 4 */}
            <rect x="30" y="118" width="60" height="24" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />

            {/* Deep Multifidus / Longus Colli Guy Wires */}
            {muscleActive ? (
              <>
                {/* Left stabilizer band */}
                <path
                  d="M 24 15 L 24 135"
                  stroke="#c084fc"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                {/* Right stabilizer band */}
                <path
                  d="M 96 15 L 96 135"
                  stroke="#c084fc"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                {/* Diagonal segmental fibers */}
                <line x1="26" y1="20" x2="94" y2="60" stroke="#a855f7" strokeWidth="2.5" />
                <line x1="26" y1="60" x2="94" y2="100" stroke="#a855f7" strokeWidth="2.5" />
                <line x1="94" y1="20" x2="26" y2="60" stroke="#a855f7" strokeWidth="2.5" />
                <line x1="94" y1="60" x2="26" y2="100" stroke="#a855f7" strokeWidth="2.5" />
                <text x="60" y="-5" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">
                  ✓ Dynamic Muscular Splinting
                </text>
              </>
            ) : (
              <>
                {/* Inactive thin lines */}
                <path d="M 24 15 L 24 135" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M 96 15 L 96 135" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
                <text x="60" y="-5" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
                  ⚠️ Shearing & Micro-instability
                </text>
              </>
            )}
          </g>

          {/* Imbibition movement sponge explainer */}
          <g transform="translate(20, 168)">
            <rect width="360" height="42" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="15" y="18" fill="#f8fafc" fontSize="10.5" fontWeight="bold">
              Disc Imbibition: Walking & McGill Big 3 Stability
            </text>
            <text x="15" y="32" fill="#94a3b8" fontSize="9">
              Alternating gentle load/unload acts like a sponge, drawing proteoglycans & water back into disc nucleus.
            </text>
          </g>
        </svg>
      </div>

      {/* Stage 3 Action Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="font-bold text-purple-300 block">
            Core Exercises to Master:
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            <strong>Bird-Dog</strong>, <strong>Side Plank</strong>, and <strong>Deep Neck Flexor Holds</strong> build an internal muscular brace so your spine never relies purely on worn facet joints.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="font-bold text-emerald-300 block">
            Long-Term Functional Outcome:
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Permanent immunity against future radiculopathy flares. You can sit, drive, work out, and live with complete spinal confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SENSORY RETRAINING DRILLS VISUAL GUIDE
   ========================================================================= */
export const SensoryDrillsVisualGuide: React.FC<{ drillId: string }> = ({ drillId }) => {
  switch (drillId) {
    case 'texture_hierarchy':
      return (
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-3">
          <span className="text-xs font-bold text-purple-300 block">
            Visual Guide: 3-Stage Texture Hierarchy Sweep
          </span>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <span className="font-bold text-white block">Silk / Cotton</span>
              <p className="text-[10px] text-slate-400">Ultra-light unidirectional sweeps (60s)</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <span className="font-bold text-white block">Soft T-Shirt</span>
              <p className="text-[10px] text-slate-400">Rhythmical circular brush strokes (60s)</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <span className="font-bold text-white block">Terrycloth</span>
              <p className="text-[10px] text-slate-400">Moderate friction with deep breathing</p>
            </div>
          </div>
        </div>
      );

    case 'temperature_contrast':
      return (
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-sky-500/30 space-y-3">
          <span className="text-xs font-bold text-sky-300 block">
            Visual Guide: Vasomotor Capillary Contrast Protocol
          </span>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                🔥 Warm Basin (98-102°F)
              </span>
              <p className="text-[11px] text-slate-300">
                Immerse for <strong>2 minutes</strong>. Dilates micro-capillaries to flush out acidic metabolites.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-sky-500/30 space-y-1">
              <span className="font-bold text-sky-300 flex items-center gap-1">
                ❄️ Cool Basin (65-70°F)
              </span>
              <p className="text-[11px] text-slate-300">
                Immerse for <strong>30 seconds</strong>. Stabilizes hyper-sensitive cold thermoreceptors.
              </p>
            </div>
          </div>
          <div className="text-[11px] text-teal-300 italic text-center">
            *Always perform 3 cycles and finish in the WARM basin to keep capillaries open.*
          </div>
        </div>
      );

    case 'graphesthesia_drill':
      return (
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-2">
          <span className="text-xs font-bold text-purple-300 block">
            Visual Guide: Somatosensory Cortex Map Sharpening
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Have a partner gently trace letters (e.g., A, B, 8, S) on your symptomatic palm or forearm with eyes closed. This stimulates the parietal lobe to redraw the tactile border boundaries that were smudged by chronic nerve irritation.
          </p>
        </div>
      );

    default:
      return null;
  }
};

/* =========================================================================
   FLARE-UP EMERGENCY POSTURE VISUAL DIAGRAMS
   ========================================================================= */
export const FlareUpPostureDiagrams: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
      {/* 90-90 Zero G */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-teal-300">1. Lumbar 90-90 Zero-G Posture</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">Recommended</span>
        </div>
        <div className="w-full h-24 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center p-2">
          <svg viewBox="0 0 200 90" className="w-full h-full">
            {/* Floor */}
            <line x1="10" y1="75" x2="190" y2="75" stroke="#475569" strokeWidth="2" />
            {/* Chair/Sofa */}
            <rect x="110" y="30" width="70" height="45" rx="4" fill="#1e293b" stroke="#38bdf8" />
            {/* Head on floor */}
            <circle cx="30" cy="65" r="8" fill="#64748b" />
            {/* Flat Torso on floor */}
            <line x1="38" y1="73" x2="95" y2="73" stroke="#2dd4bf" strokeWidth="6" strokeLinecap="round" />
            {/* Thighs vertical (90 deg) */}
            <line x1="95" y1="73" x2="110" y2="35" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
            {/* Calves resting on sofa (90 deg) */}
            <line x1="110" y1="35" x2="160" y2="35" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-[11px] text-slate-300">
          Calves rested on sofa at 90°. Flattens lumbar curve and opens pinched sciatic nerve root foramina by up to 24%.
        </p>
      </div>

      {/* Supine Cervical Lordosis Roll */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-sky-500/40 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-sky-300">2. Cervical Towel Roll Lie</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">Neck & Hands</span>
        </div>
        <div className="w-full h-24 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center p-2">
          <svg viewBox="0 0 200 90" className="w-full h-full">
            {/* Floor */}
            <line x1="10" y1="75" x2="190" y2="75" stroke="#475569" strokeWidth="2" />
            {/* Head on floor */}
            <circle cx="45" cy="62" r="10" fill="#64748b" />
            {/* Rolled Towel under neck lordosis */}
            <ellipse cx="65" cy="70" rx="7" ry="5" fill="#38bdf8" stroke="#0284c7" />
            {/* Upper back on floor */}
            <line x1="72" y1="73" x2="160" y2="73" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-[11px] text-slate-300">
          Place a 2-inch rolled towel directly under the natural hollow of your neck. Removes weight of the 12 lb head.
        </p>
      </div>
    </div>
  );
};

/* =========================================================================
   CELLULAR MYELIN & NUTRITIONAL BIOCHEMISTRY VISUAL DIAGRAM
   ========================================================================= */
export const NerveCellularTargetDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
          <Activity className="w-4 h-4" />
          <span>Visual Anatomy: Myelin Sheath, Schwann Cells & Nutritional Targets</span>
        </span>
        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
          High-Res Diagram
        </span>
      </div>

      <div className="relative w-full h-52 sm:h-56 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-2">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="axonCore" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="myelinSheath" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Central Axon Fiber Cable */}
          <line x1="30" y1="90" x2="370" y2="90" stroke="url(#axonCore)" strokeWidth="16" strokeLinecap="round" />
          <text x="200" y="94" textAnchor="middle" fill="#1e293b" fontSize="9" fontWeight="bold">
            Axon Neural Core (Electrical Signal)
          </text>

          {/* Schwann Cell Myelin Segments */}
          {/* Segment 1 */}
          <rect x="50" y="65" width="80" height="50" rx="10" fill="url(#myelinSheath)" stroke="#34d399" strokeWidth="2" />
          <circle cx="90" cy="78" r="6" fill="#ecfdf5" />
          <text x="90" y="105" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            Schwann Cell #1
          </text>

          {/* Node of Ranvier Gap 1 */}
          <line x1="135" y1="75" x2="135" y2="105" stroke="#f59e0b" strokeWidth="3" />
          <text x="135" y="125" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">
            Node of Ranvier
          </text>

          {/* Segment 2 */}
          <rect x="145" y="65" width="100" height="50" rx="10" fill="url(#myelinSheath)" stroke="#34d399" strokeWidth="2" />
          <circle cx="195" cy="78" r="6" fill="#ecfdf5" />
          <text x="195" y="105" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            Myelin Sheath Insulation
          </text>

          {/* Node of Ranvier Gap 2 */}
          <line x1="250" y1="75" x2="250" y2="105" stroke="#f59e0b" strokeWidth="3" />

          {/* Segment 3 */}
          <rect x="260" y="65" width="85" height="50" rx="10" fill="url(#myelinSheath)" stroke="#34d399" strokeWidth="2" />
          <circle cx="302" cy="78" r="6" fill="#ecfdf5" />
          <text x="302" y="105" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            Schwann Cell #3
          </text>

          {/* Nutrient Callout Badges */}
          <g transform="translate(45, 20)">
            <rect width="90" height="22" rx="6" fill="#064e3b" stroke="#10b981" />
            <text x="45" y="15" textAnchor="middle" fill="#a7f3d0" fontSize="8.5" fontWeight="bold">
              💊 Methyl-B12 & B1
            </text>
            <line x1="45" y1="22" x2="65" y2="65" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>

          <g transform="translate(155, 20)">
            <rect width="95" height="22" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
            <text x="47" y="15" textAnchor="middle" fill="#bae6fd" fontSize="8.5" fontWeight="bold">
              🐟 Omega-3 EPA/DHA
            </text>
            <line x1="47" y1="22" x2="47" y2="65" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>

          <g transform="translate(265, 20)">
            <rect width="90" height="22" rx="6" fill="#581c87" stroke="#c084fc" />
            <text x="45" y="15" textAnchor="middle" fill="#f3e8ff" fontSize="8.5" fontWeight="bold">
              ⚡ R-Alpha Lipoic Acid
            </text>
            <line x1="45" y1="22" x2="35" y2="65" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>

          {/* Bottom explanation */}
          <g transform="translate(20, 150)">
            <rect width="360" height="38" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="15" y="17" fill="#f8fafc" fontSize="10" fontWeight="bold">
              Why Myelin Repair Eliminates Burning & Tingling
            </text>
            <text x="15" y="30" fill="#94a3b8" fontSize="8.5">
              Myelin enables saltatory conduction (signals jumping rapidly between Nodes of Ranvier without leaking).
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/* =========================================================================
   SLEEP & WORKSTATION ERGONOMIC POSTURE VISUAL DIAGRAMS
   ========================================================================= */
export const ErgonomicPostureDiagrams: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Side Sleeping Alignment Visual */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-teal-300">Visual: Side Sleeping Alignment</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">Pillow Sandwich</span>
        </div>
        <div className="w-full h-32 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center p-2">
          <svg viewBox="0 0 240 100" className="w-full h-full">
            {/* Mattress */}
            <line x1="10" y1="85" x2="230" y2="85" stroke="#334155" strokeWidth="2" />
            {/* Pillow under head */}
            <rect x="25" y="55" width="40" height="25" rx="5" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
            {/* Head neutral */}
            <circle cx="45" cy="50" r="14" fill="#64748b" />
            {/* Spine straight neutral line */}
            <line x1="58" y1="50" x2="140" y2="50" stroke="#2dd4bf" strokeWidth="6" strokeLinecap="round" />
            <text x="100" y="42" fill="#2dd4bf" fontSize="8" fontWeight="bold">Straight Spine</text>
            {/* Hips */}
            <circle cx="140" cy="50" r="12" fill="#475569" />
            {/* Legs with pillow in between */}
            <path d="M 148 50 L 185 62 L 215 62" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            {/* Knee Pillow */}
            <rect x="175" y="48" width="30" height="26" rx="6" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1.5" />
            <text x="190" y="64" textAnchor="middle" fill="#ccfbf1" fontSize="7.5" fontWeight="bold">Knee Pillow</text>
          </svg>
        </div>
        <p className="text-[11px] text-slate-300">
          Pillow between knees prevents pelvis from twisting and stretching lumbar nerve roots during sleep.
        </p>
      </div>

      {/* Desk 90-90-90 Visual */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-sky-300">Visual: Desk Neutral 90-90 Posture</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">Zero Cervical Crane</span>
        </div>
        <div className="w-full h-32 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center p-2">
          <svg viewBox="0 0 240 100" className="w-full h-full">
            {/* Desk */}
            <line x1="130" y1="55" x2="220" y2="55" stroke="#475569" strokeWidth="3" />
            {/* Monitor on stand */}
            <rect x="180" y="20" width="30" height="25" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="195" y1="45" x2="195" y2="55" stroke="#64748b" strokeWidth="2" />
            {/* Eye level line (dashed) */}
            <line x1="85" y1="26" x2="180" y2="26" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="135" y="22" fill="#38bdf8" fontSize="7.5" fontWeight="bold">Eye Level (0° Neck Strain)</text>
            {/* Seated Figure */}
            <circle cx="75" cy="26" r="10" fill="#64748b" />
            {/* Upright spine */}
            <line x1="75" y1="36" x2="75" y2="68" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
            {/* Lumbar cushion wedge */}
            <ellipse cx="68" cy="62" rx="4" ry="7" fill="#0f766e" stroke="#2dd4bf" />
            {/* Arms at 90 deg */}
            <polyline points="75,45 110,48 145,52" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            {/* Thighs horizontal */}
            <line x1="75" y1="68" x2="110" y2="68" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            {/* Calves vertical */}
            <line x1="110" y1="68" x2="110" y2="92" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-[11px] text-slate-300">
          Monitor top third at eye level eliminates the 30-40 lb forward-head load on degenerative cervical discs.
        </p>
      </div>
    </div>
  );
};


