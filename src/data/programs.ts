import { RoutineProgram } from '../types';
import { ALL_EXERCISES } from './exercises';

function getExercisesByIds(ids: string[]) {
  return ids
    .map((id) => ALL_EXERCISES.find((ex) => ex.id === id))
    .filter(Boolean) as typeof ALL_EXERCISES;
}

export const CLINICAL_PROGRAMS: RoutineProgram[] = [
  {
    id: 'full-neural-spine-restoration',
    title: 'Full Neural & Spine Restoration',
    tagline: 'Comprehensive 4-zone protocol for neck, back, hands & legs',
    description:
      'The foundational physical therapy sequence. Systematically glides all major irritated nerve trunks (cervical, median, ulnar, lumbar, sciatic) and gently decompresses degenerative spine segments.',
    badge: 'Doctor Recommended',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300',
    durationMinutes: 14,
    targetZones: ['cervical_neck', 'arms_hands', 'lumbar_spine', 'legs_feet'],
    intensity: 'Restorative',
    exercises: getExercisesByIds([
      'mckenzie-chin-tuck',
      'median-nerve-glide',
      'ulnar-nerve-glide',
      'wall-angels-scapular',
      'cat-cow-segmental',
      'mckenzie-prone-pressup',
      'pelvic-tilt-decompression',
      'seated-sciatic-nerve-slider',
      'piriformis-decompression',
    ]),
  },
  {
    id: 'upper-chain-cervical-hands',
    title: 'Upper Chain: Cervical & Hand Relief',
    tagline: 'Focused on neck degeneration, arm pain & finger paresthesia',
    description:
      'Specially designed for cervical disc disease, foraminal stenosis, and tingling/numbness radiating down the shoulder, forearm, thumb, and pinky.',
    badge: 'Neck & Hands',
    badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20 dark:text-indigo-300',
    durationMinutes: 10,
    targetZones: ['cervical_neck', 'shoulders_traps', 'arms_hands'],
    intensity: 'Restorative',
    exercises: getExercisesByIds([
      'mckenzie-chin-tuck',
      'cervical-lateral-glide',
      'median-nerve-glide',
      'ulnar-nerve-glide',
      'radial-nerve-glide',
      'tendon-glide-sequence',
      'wall-angels-scapular',
    ]),
  },
  {
    id: 'lower-chain-lumbar-sciatica',
    title: 'Lower Chain: Lumbar & Sciatic Decompression',
    tagline: 'Relieves lower back degeneration, glute pinching & leg sciatica',
    description:
      'Decompresses lumbar facet joints and intervertebral discs while using gold-standard neurodynamic sliders to soothe sciatic and femoral nerve tension in the hips and legs.',
    badge: 'Back & Legs',
    badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-300',
    durationMinutes: 11,
    targetZones: ['lumbar_spine', 'hips_glutes', 'legs_feet'],
    intensity: 'Restorative',
    exercises: getExercisesByIds([
      'pelvic-tilt-decompression',
      'mckenzie-prone-pressup',
      'seated-sciatic-nerve-slider',
      'prone-femoral-nerve-glide',
      'piriformis-decompression',
      'glute-bridge-support',
      'ankle-pumps-tibial',
    ]),
  },
  {
    id: 'acute-nerve-calming',
    title: 'Acute Flare-up & Nerve Calming',
    tagline: 'Zero-tension, micro-movement for high irritability days',
    description:
      'When nerves are actively inflamed or burning, aggressive stretches cause flare-ups. This gentle protocol uses micro-excursions and diaphragmatic pacing to downregulate the nervous system.',
    badge: 'Low Irritability / Gentle',
    badgeColor: 'bg-sky-500/10 text-sky-700 border-sky-500/20 dark:text-sky-300',
    durationMinutes: 7,
    targetZones: ['cervical_neck', 'lumbar_spine', 'arms_hands', 'legs_feet'],
    intensity: 'Gentle / Acute',
    exercises: getExercisesByIds([
      'pelvic-tilt-decompression',
      'mckenzie-chin-tuck',
      'tendon-glide-sequence',
      'ankle-pumps-tibial',
      'cervical-lateral-glide',
    ]),
  },
  {
    id: 'morning-spine-wake',
    title: 'Morning Decompression & Joint Hydration',
    tagline: 'Overcomes morning stiffness & prepares spinal discs for the day',
    description:
      'Discs swell with fluid overnight; gentle morning articulation promotes nutrient exchange and gently wakes up slumbering neural pathways before daily activities.',
    badge: 'Morning Routine',
    badgeColor: 'bg-orange-500/10 text-orange-700 border-orange-500/20 dark:text-orange-300',
    durationMinutes: 9,
    targetZones: ['cervical_neck', 'thoracic_back', 'lumbar_spine', 'legs_feet'],
    intensity: 'Restorative',
    exercises: getExercisesByIds([
      'cat-cow-segmental',
      'thoracic-open-book',
      'mckenzie-chin-tuck',
      'pelvic-tilt-decompression',
      'seated-sciatic-nerve-slider',
      'glute-bridge-support',
    ]),
  },
  {
    id: 'midday-desk-reset',
    title: 'Desk & Posture Ergonomic Reset',
    tagline: 'Chair & standing movements for seated nerve compression',
    description:
      'Quick posture corrections you can do during a workday to prevent forward-head slump, slumped lumbar discs, and mouse-related median nerve entrapment.',
    badge: 'Chair / No Floor Needed',
    badgeColor: 'bg-teal-500/10 text-teal-700 border-teal-500/20 dark:text-teal-300',
    durationMinutes: 6,
    targetZones: ['cervical_neck', 'arms_hands', 'thoracic_back'],
    intensity: 'Gentle / Acute',
    exercises: getExercisesByIds([
      'mckenzie-chin-tuck',
      'median-nerve-glide',
      'tendon-glide-sequence',
      'seated-sciatic-nerve-slider',
      'wall-angels-scapular',
    ]),
  },
];
