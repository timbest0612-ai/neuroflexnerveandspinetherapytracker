export type BodyZone =
  | 'cervical_neck'
  | 'shoulders_traps'
  | 'arms_hands'
  | 'thoracic_back'
  | 'lumbar_spine'
  | 'hips_glutes'
  | 'legs_feet';

export type SymptomType =
  | 'tingling_pins'
  | 'numbness'
  | 'burning_nerve'
  | 'deep_ache'
  | 'sharp_shooting'
  | 'muscle_weakness'
  | 'stiffness_reduced_rom';

export type ExerciseCategory =
  | 'nerve_glide'
  | 'spinal_decompression'
  | 'core_stabilization'
  | 'postural_restoration'
  | 'hand_dexterity';

export type IntensityLevel = 'gentle_slider' | 'mild_mobility' | 'stabilization' | 'mild_tensioner';

export type SvgAnimationType =
  | 'cervical_chin_tuck'
  | 'cervical_lateral_glide'
  | 'median_nerve_glide'
  | 'ulnar_nerve_glide'
  | 'radial_nerve_glide'
  | 'sciatic_nerve_slider'
  | 'femoral_nerve_glide'
  | 'mckenzie_pressup'
  | 'cat_cow_segmental'
  | 'wall_angels_scapular'
  | 'deadbug_isometric'
  | 'bird_dog_stabilization'
  | 'tendon_glide_hands'
  | 'piriformis_stretch'
  | 'thoracic_open_book'
  | 'pelvic_tilt_decompression'
  | 'ankle_pump_tibial'
  | 'bridge_glute_support';

export interface Exercise {
  id: string;
  title: string;
  subtitle: string;
  targetAreas: BodyZone[];
  targetNerves: string[];
  category: ExerciseCategory;
  intensity: IntensityLevel;
  durationSec: number;
  repsText: string;
  equipment: string;
  keyVisualCue: string;
  animationType: SvgAnimationType;
  setupInstructions: string[];
  actionSteps: string[];
  breathingCue: string;
  clinicalWhy: string;
  safetyWatchouts: string[];
  modificationEasier: string;
}

export interface RoutineProgram {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  badgeColor: string;
  durationMinutes: number;
  targetZones: BodyZone[];
  intensity: 'Gentle / Acute' | 'Restorative' | 'Progressive';
  exercises: Exercise[];
}

export interface SymptomZoneEntry {
  zone: BodyZone;
  severity: number; // 0-10
  symptoms: SymptomType[];
  notes?: string;
}

export interface SymptomLog {
  id: string;
  date: string; // ISO string
  overallSeverity: number; // 0-10
  zones: SymptomZoneEntry[];
  centralizationStatus: 'centralized' | 'unchanged' | 'peripheralized';
  functionalImpact: 'mild' | 'moderate' | 'severe';
  notes: string;
}

export interface CompletedSession {
  id: string;
  programId: string;
  programTitle: string;
  date: string; // ISO string
  durationMinutes: number;
  completedExercisesCount: number;
  totalExercisesCount: number;
  prePainScore: number;
  postPainScore: number;
  nerveResponse: 'improved' | 'same' | 'slightly_irritated';
  userNotes?: string;
}

export interface UserPtProfile {
  name: string;
  diagnosedConditions: string[];
  primaryAffectedAreas: BodyZone[];
  daysStreak: number;
  totalSessionsCompleted: number;
  totalMinutesTrained: number;
  lastSessionDate?: string;
}
