import React, { useState } from 'react';
import {
  Sparkles,
  Brain,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  Activity,
  ArrowRight,
  TrendingDown,
  Layers,
  HelpCircle,
  Stethoscope,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import {
  Stage1VisualDecompression,
  Stage2VisualNerveGliding,
  Stage3VisualStabilizers,
} from './ClinicalVisualDiagrams';

interface Props {
  onOpenDemo?: () => void;
}

interface StageInfo {
  phase: string;
  duration: string;
  focus: string;
  mechanisms: string[];
  goals: string[];
}

const RECOVERY_STAGES: StageInfo[] = [
  {
    phase: 'Stage 0: Acute Zero-G Decompression',
    duration: 'Days 1 – 5',
    focus: 'Quench microvascular ischemia and relieve severe muscular guarding.',
    mechanisms: [
      'Zero-G positional unloading (90-90 calf elevation) neutralizes gravitational spine compression',
      'Restores capillary blood perfusion to ischemic, oxygen-starved dorsal root ganglion',
      'Downregulates acute spinal protective muscle spasm via parasympathetic activation',
    ],
    goals: [
      'Stop severe acute flare-up intensity (drop VAS score below 6/10)',
      'Establish comfortable pain-free resting posture for uninterrupted sleep',
      'Begin gentle diaphragmatic breathing without triggering nerve pain',
    ],
  },
  {
    phase: 'Stage 1: Decompression & Centralization',
    duration: 'Weeks 1 – 3',
    focus: 'Widen neural foramina and systematically draw radiating symptoms back to spine.',
    mechanisms: [
      'McKenzie directional preference movements widen neuroforaminal exit pathways by up to 24%',
      'Encourages herniated nuclear disc material to shift anteriorly away from the nerve root',
      'Triggers Robin McKenzie centralization phenomenon (peripheral tingling retreats)',
    ],
    goals: [
      'Centralize pain: Stop numbness/tingling in fingers or toes, concentrating it near spine',
      'Achieve resting nerve pain score below 5/10',
      'Tolerate gentle cervical retraction or lumbar prone press-ups without symptom expansion',
    ],
  },
  {
    phase: 'Stage 2: Neurodynamic Gliding & Remodeling',
    duration: 'Weeks 4 – 8',
    focus: 'Restore 12-15mm longitudinal nerve sliding and dissolve perineural scar adhesions.',
    mechanisms: [
      'Axonal regeneration proceeds at approximately 1 mm/day (~1 inch/month)',
      'Schwann cells proliferate and deposit new myelin sheath insulation',
      'Low-tension nerve sliders mobilize the nerve trunk without triggering stretch ischemia',
    ],
    goals: [
      'Restore full nerve excursion (median/sciatic nerve slides smoothly 12-15mm)',
      'Perform 12 smooth gliding repetitions with zero delayed latency burning flares',
      'Eliminate constant numbness in specific dermatome branches',
    ],
  },
  {
    phase: 'Stage 3: Sensory Desensitization & Remapping',
    duration: 'Weeks 6 – 10',
    focus: 'Calm C-fiber hyperalgesia, allodynia, and sharpen somatosensory brain discrimination.',
    mechanisms: [
      'Progressive tactile hierarchy stimulation (silk -> cotton -> terrycloth) recalibrates unmyelinated C-fibers',
      'Cortical graphesthesia drills reverse sensory smudging in postcentral gyrus',
      'Promotes brain habituation to non-nociceptive tactile signals',
    ],
    goals: [
      'Eliminate clothing or light touch allodynia (no stinging or burning from fabric)',
      'Restore normal two-point touch discrimination in fingertips or feet',
      'Tolerate sensory exposure with steady, calm autonomic response',
    ],
  },
  {
    phase: 'Stage 4: Deep Stabilizer Corset & Disc Hydration',
    duration: 'Weeks 8 – 14',
    focus: 'Build deep muscular armor (McGill Big 3) to permanently protect discs from shearing.',
    mechanisms: [
      'Hypertrophy of deep stabilizers (Longus Colli in neck, Multifidus & Transversus in low back)',
      'Intervertebral disc rehydration through daily oscillatory loading and unloading (imbibition)',
      'Locks spine in neutral during daily lifting, pushing, pulling, and sitting activities',
    ],
    goals: [
      'Hold Bird-Dog and Side Plank holds for 30+ seconds with calm nasal breathing',
      'Sit, walk, and drive for 60+ minutes without radiculopathy symptoms',
      'Zero daily postural fatigue or spinal instability sensations',
    ],
  },
  {
    phase: 'Stage 5: Functional Resilience & Lifetime Immunity',
    duration: 'Weeks 14 – 24+',
    focus: 'Dynamic multi-planar conditioning, unrestricted functional movement, and permanent freedom.',
    mechanisms: [
      'Restores full biological load tolerance across all planes of movement (sagittal, frontal, transverse)',
      'Permanent fascial remodeling and dense myelin sheath reconstruction',
      'Automates healthy spinal biomechanics and hydration habits for life',
    ],
    goals: [
      'Full return to favorite workouts, sports, occupational tasks, and physical hobbies',
      'Unrestricted daily movement with complete confidence in spine and nerve function',
      'Lifelong spinal resilience preventing future radiculopathy relapses',
    ],
  },
];

export const NerveCureEducationView: React.FC<Props> = ({ onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'cure_reality' | 'biological_mechanisms' | 'timeline' | 'mri_vs_symptoms'>('cure_reality');
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-100 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Stethoscope className="w-4 h-4" />
              <span>Evidence-Based Neuro-Orthopedic Science</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Can Degenerative Nerves & Discs Heal?
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              An honest, clinical guide to the biological reality of peripheral nerve regeneration, spinal degeneration reversal, and why 85–90% of radiculopathy patients make a complete functional recovery without surgery.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 border-t border-slate-800/80 mt-5 text-xs font-bold">
          {[
            { id: 'cure_reality', label: 'The "Cure" Reality Check' },
            { id: 'biological_mechanisms', label: 'Biological Healing Mechanisms' },
            { id: 'timeline', label: 'Recovery Timeline & Stages' },
            { id: 'mri_vs_symptoms', label: 'MRI Findings vs. Real Symptoms' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: THE REALITY CHECK */}
      {activeTab === 'cure_reality' && (
        <div className="space-y-5">
          {/* Core Verdict Box */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-teal-500/40 shadow-xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-white">
                  The Clinical Answer: Yes, Nerves Can Fully Regenerate and Restore Function!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlike the central brain and spinal cord, <strong>peripheral nerves (in your neck, shoulders, arms, hands, lower back, and legs) have a remarkable biological ability to repair, remyelinate, and regrow</strong> once the mechanical bottleneck and vascular starvation are removed.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-1.5">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> What Can Be 100% Restored:
                </span>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li><strong>Nerve Conduction Velocity:</strong> Tingling, burning, and numbness disappear.</li>
                  <li><strong>Grip Strength & Motor Function:</strong> Clumsiness and weakness fully resolve.</li>
                  <li><strong>Pain-Free Mobility:</strong> Normal neck turning, sitting, typing, and walking without pain.</li>
                  <li><strong>Neural Sliding Mechanics:</strong> Nerves glide effortlessly through tissues without friction.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-1.5">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> What "Degeneration" Truly Means:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Age-related disc height loss or small bone spurs (osteophytes) may still appear on an MRI, much like "wrinkles on the skin." <strong>However, an MRI does not equal pain!</strong> When surrounding inflammation resolves and stability is restored, you can be completely symptom-free even with degenerative changes present.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Pillars to Cure & Reversal */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-teal-400">
              The 3 Non-Negotiable Requirements For Nerve Healing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-xl bg-teal-500/10 text-teal-300 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="text-sm font-bold text-white">Decompression & Space</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You must open the narrowed intervertebral foramen through chin tucks, prone extensions, and postural alignment so the nerve root is not physically pinched.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-xl bg-sky-500/10 text-sky-300 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h4 className="text-sm font-bold text-white">Microvascular Blood Flow</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Nerves consume 20% of the body's circulating oxygen. Gentle oscillatory nerve flossing pumps out toxic inflammatory fluid and brings oxygenated blood to starve ischemia.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-300 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h4 className="text-sm font-bold text-white">Cellular Myelin Nutrients</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Schwann cells require active co-factors (Methyl-B12, Benfotiamine, Alpha-Lipoic Acid, Omega-3s, and optimal hydration) to rebuild the damaged protective myelin insulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BIOLOGICAL MECHANISMS */}
      {activeTab === 'biological_mechanisms' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Axonal Regeneration */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-teal-400">
                <Zap className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">1. Axonal Regeneration Speed</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Peripheral axons regrow at a measured biological speed of <strong>1 millimeter per day (approx. 1 inch per month)</strong>.
              </p>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="font-bold text-teal-300 block">Why Patience Matters:</span>
                <span>
                  If a nerve root at C6 (neck) is irritated and symptoms radiate to your thumb (about 25 inches away), full sensory stabilization takes progressive weeks of adherence.
                </span>
              </div>
            </div>

            {/* 2. Schwann Cell Remodeling */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-sky-400">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">2. Myelin Sheath Repair (Schwann Cells)</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nerves are wrapped in lipid layers called myelin, acting like the rubber insulation around an electrical wire. When a disc presses on a nerve, the myelin thins, causing "short-circuit" tingling.
              </p>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="font-bold text-sky-300 block">How It Restores:</span>
                <span>
                  Schwann cells actively rebuild the myelin layer once pressure is relieved, stopping the electric shock and burning sensations.
                </span>
              </div>
            </div>

            {/* 3. Disc Rehydration & Imbibition */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-purple-400">
                <Layers className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">3. Intervertebral Disc Rehydration</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Spinal discs have no direct blood supply in adults; they receive nutrients through an osmotic sponge mechanism called <strong>imbibition</strong>.
              </p>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="font-bold text-purple-300 block">The Movement Sponge:</span>
                <span>
                  Alternating gentle spinal loading and unloading (e.g. walking, chin tucks, and prone press-ups) pumps fresh fluid and proteoglycans into the disc nucleus.
                </span>
              </div>
            </div>

            {/* 4. Central Sensitization Reversal */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-amber-400">
                <Brain className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">4. Brain Rewiring (Smudge Reversal)</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When a nerve is irritated for months, the sensory map in the brain gets "smudged" and amplifies normal sensations into severe pain (central sensitization).
              </p>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="font-bold text-amber-300 block">Desensitization:</span>
                <span>
                  Sensory discrimination drills and pain-free nerve glides recalibrate the brain, restoring your nervous system's natural pain-filtering thresholds.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TIMELINE & STAGES */}
      {activeTab === 'timeline' && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>The 6 Clinical Phases of Degenerative Nerve Recovery</span>
              <span className="text-xs text-teal-400 font-normal">Click a stage to inspect</span>
            </h3>

            {/* Phase Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {RECOVERY_STAGES.map((stg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhase(idx)}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all ${
                    selectedPhase === idx
                      ? 'bg-teal-500/20 border-teal-400 text-white font-bold shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[9px] font-black uppercase text-teal-400 block">
                    {stg.duration}
                  </span>
                  <span className="text-xs font-bold block mt-0.5 leading-tight">{stg.phase.split(':')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Stage Detailed Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 animate-fade-in">
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  {RECOVERY_STAGES[selectedPhase].duration}
                </span>
                <h4 className="text-lg font-black text-white mt-0.5">
                  {RECOVERY_STAGES[selectedPhase].phase}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {RECOVERY_STAGES[selectedPhase].focus}
                </p>
              </div>

              {/* Visual Interactive Stage Guide */}
              <div className="pt-1">
                {(selectedPhase === 0 || selectedPhase === 1) && <Stage1VisualDecompression />}
                {(selectedPhase === 2 || selectedPhase === 3) && <Stage2VisualNerveGliding />}
                {(selectedPhase === 4 || selectedPhase === 5) && <Stage3VisualStabilizers />}
              </div>

              {/* Action Button: Launch Stage Video Practice Room */}
              {onOpenDemo && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Practice Stage {selectedPhase} with Real-Time Video Modeling
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Follow visual avatars, mirror cadence, and check off milestone criteria
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenDemo}
                    className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/20 whitespace-nowrap"
                  >
                    <span>Open Video Modeling</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-sky-300 block">
                    🔬 Physiological Mechanisms at Work:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {RECOVERY_STAGES[selectedPhase].mechanisms.map((m, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-400 font-bold">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-300 block">
                    🎯 Functional Milestone Targets:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {RECOVERY_STAGES[selectedPhase].goals.map((g, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MRI VS REAL SYMPTOMS */}
      {activeTab === 'mri_vs_symptoms' && (
        <div className="space-y-5">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-amber-400" />
              <span>Why Your MRI Is Not Your Destiny (The Spine Imaging Paradox)</span>
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Medical imaging (MRI, X-ray, CT) provides a structural snapshot, but countless clinical studies reveal that <strong>structural degeneration is extremely common in completely pain-free individuals</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="text-2xl font-black text-teal-400">64%</span>
                <span className="text-xs font-bold text-white block">of People Over 40</span>
                <p className="text-[11px] text-slate-400">Have disc bulges or degenerative discs on MRI with ZERO pain.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="text-2xl font-black text-sky-400">80%+</span>
                <span className="text-xs font-bold text-white block">of People Over 50</span>
                <p className="text-[11px] text-slate-400">Show disc height loss or facet arthropathy with completely normal lives.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="text-2xl font-black text-emerald-400">90%</span>
                <span className="text-xs font-bold text-white block">Radiculopathy Recovery</span>
                <p className="text-[11px] text-slate-400">Resolve completely through non-surgical physical therapy & nerve gliding.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200 space-y-1.5">
              <span className="font-bold text-teal-300 block">The Key Takeaway for Your Recovery:</span>
              <p className="leading-relaxed">
                You do not need an MRI to look like an 18-year-old's spine in order to be 100% pain-free, active, and strong. When you relieve nerve tension, build deep muscular support, and supply neural nutrition, the nervous system heals and functions flawlessly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
