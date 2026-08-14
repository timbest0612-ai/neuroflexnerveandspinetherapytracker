import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Hand,
  CheckCircle2,
  Volume2,
  RefreshCw,
  Eye,
  Sliders,
  Layers,
  Activity,
  Zap,
} from 'lucide-react';
import { SensoryDrillsVisualGuide } from './ClinicalVisualDiagrams';

interface DesensitizationExercise {
  id: string;
  title: string;
  targetSymptom: string;
  purpose: string;
  duration: string;
  steps: string[];
  corticalMechanism: string;
}

const DESENSITIZATION_DRILLS: DesensitizationExercise[] = [
  {
    id: 'texture_hierarchy',
    title: 'Hierarchical Texture Sweeping',
    targetSymptom: 'Pins & needles, hyper-sensitivity to touch (Allodynia)',
    purpose: 'Gradually retrain peripheral sensory receptors to tolerate normal skin contact without firing pain alarms.',
    duration: '3 – 5 minutes per limb',
    steps: [
      'Step 1 (Light): Begin with a silk scarf or soft cotton ball. Gently brush along the affected forearm/hand or calf/foot in one direction for 60 seconds.',
      'Step 2 (Medium): Switch to a soft cotton t-shirt material. Apply light, rhythmical sweeping strokes.',
      'Step 3 (Coarse): Progress to a terrycloth washcloth or soft bath towel. Focus on taking slow, relaxed diaphragmatic breaths.',
    ],
    corticalMechanism: 'Floods the dorsal horn with non-nociceptive A-beta fiber signals, suppressing unmyelinated C-fiber pain transmission (Gate Control Theory).',
  },
  {
    id: 'temperature_contrast',
    title: 'Gentle Thermal Contrast Modulation',
    targetSymptom: 'Deep cold ache or burning dysesthesia',
    purpose: 'Stabilizes vasomotor capillary tone and resets cold/warm thermoreceptor sensitivity.',
    duration: '6 minutes total',
    steps: [
      'Prepare two small bowls of water or damp washcloths: One comfortably warm (98-102°F), one cool (65-70°F - never ice cold).',
      'Submerge or wrap the affected hand or foot in warm water for 2 minutes.',
      'Transition to cool water for 30 seconds.',
      'Repeat 3 cycles, always finishing on WARM to leave blood vessels dilated.',
    ],
    corticalMechanism: 'Drives microvascular capillary perfusion (relieving ischemia) while recalibrating thermo-transient receptor potential (TRP) channels.',
  },
  {
    id: 'graphesthesia_drill',
    title: 'Graphesthesia & Tactile Recognition',
    targetSymptom: 'Numbness, loss of fine touch, clumsy fingers',
    purpose: 'Sharpens the brain somatosensory cortex map (homunculus) to eliminate sensory smudging.',
    duration: '3 minutes daily',
    steps: [
      'Close your eyes or look away.',
      'Have a partner (or use a blunt pencil tip) gently trace simple letters (A, B, C, X, O) or numbers on your fingertip or palm.',
      'Focus mental attention on identifying the exact shape traced.',
      'If numb, start with larger 2-inch shapes on the forearm before moving to fingertips.',
    ],
    corticalMechanism: 'Triggers neuroplastic dendritic reorganization in S1 primary somatosensory cortex, restoring fine sensory acuity.',
  },
  {
    id: 'proprioception_recalibration',
    title: 'Joint Position & Proprioceptive Drift',
    targetSymptom: 'Leg weakness, dropping objects, unsteady balance',
    purpose: 'Restores muscle spindle feedback and position awareness in joints.',
    duration: '2 – 4 minutes',
    steps: [
      'Sit comfortably. Close both eyes.',
      'Slowly move your affected thumb or big toe into full upward flexion, then downward extension.',
      'Mentally pinpoint the exact degree of movement without opening your eyes.',
      'For hands: Touch each fingertip sequentially to your thumb (index, middle, ring, pinky) with eyes closed.',
    ],
    corticalMechanism: 'Re-establishes high-fidelity afferent signaling from deep joint capsule mechanoreceptors to the parietal lobe.',
  },
];

export const SensoryDesensitizationView: React.FC = () => {
  const [activeDrillId, setActiveDrillId] = useState<string>('texture_hierarchy');
  const [interactiveLetter, setInteractiveLetter] = useState<string>('B');
  const [revealedLetter, setRevealedLetter] = useState<boolean>(false);
  const [tactileRating, setTactileRating] = useState<number>(3);

  const selectedDrill =
    DESENSITIZATION_DRILLS.find((d) => d.id === activeDrillId) ||
    DESENSITIZATION_DRILLS[0];

  const handleRandomLetter = () => {
    const letters = ['A', 'B', 'C', 'E', 'H', 'M', 'S', 'X', 'Z', '3', '7', '8'];
    const filtered = letters.filter((l) => l !== interactiveLetter);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setInteractiveLetter(random);
    setRevealedLetter(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-100 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Brain className="w-4 h-4" />
              <span>Somatosensory Cortex Neuroplasticity</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Sensory Retraining & Desensitization
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              When nerves are pinched or degenerated, the brain's sensory map gets &quot;smudged&quot;—amplifying tingling or deadening sensation. These clinical exercises recalibrate neural sensory pathways.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Graphesthesia Mini-Lab */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-purple-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
            <Hand className="w-5 h-5 text-purple-400" />
            <span>Interactive Tactile Discrimination Simulator</span>
          </div>
          <button
            type="button"
            onClick={handleRandomLetter}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-bold transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Next Symbol</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-300">
              Drill: Have someone trace this hidden character on your skin, or practice visualizing it:
            </span>
            <p className="text-[11px] text-slate-400">
              Tracing on palm, forearm, or foot bottom forces the sensory cortex to distinguish subtle tactile borders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-2xl font-black text-purple-300 shadow-inner">
              {revealedLetter ? interactiveLetter : '❓'}
            </div>
            <button
              type="button"
              onClick={() => setRevealedLetter(!revealedLetter)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all"
            >
              {revealedLetter ? 'Hide' : 'Reveal'}
            </button>
          </div>
        </div>
      </div>

      {/* Drill Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {DESENSITIZATION_DRILLS.map((drill) => (
          <button
            key={drill.id}
            type="button"
            onClick={() => setActiveDrillId(drill.id)}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activeDrillId === drill.id
                ? 'bg-purple-500/20 border-purple-400 text-white font-bold shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-[10px] font-bold uppercase text-purple-400 block">
              {drill.duration}
            </span>
            <span className="text-xs font-bold block mt-0.5 line-clamp-1">{drill.title}</span>
          </button>
        ))}
      </div>

      {/* Active Drill Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
            Target Symptom: {selectedDrill.targetSymptom}
          </span>
          <h2 className="text-lg font-black text-white mt-0.5">{selectedDrill.title}</h2>
          <p className="text-xs text-slate-300 mt-1">{selectedDrill.purpose}</p>
        </div>

        {/* Visual Drill Illustration */}
        <SensoryDrillsVisualGuide drillId={selectedDrill.id} />

        {/* Step by Step Protocol */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-white block uppercase tracking-wider text-slate-400">
            Clinical Step-by-Step Instructions:
          </span>
          <div className="space-y-2">
            {selectedDrill.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brain Mechanism */}
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-purple-300">
            <Brain className="w-4 h-4" />
            <span>Why This Heals the Nervous System:</span>
          </div>
          <p className="leading-relaxed text-slate-300">{selectedDrill.corticalMechanism}</p>
        </div>
      </div>
    </div>
  );
};
