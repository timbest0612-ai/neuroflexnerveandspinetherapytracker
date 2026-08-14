import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  Compass,
  Activity,
  Flame,
  ShieldAlert,
  Moon,
  Apple,
  Brain,
  Layers,
  HeartPulse,
  Laptop,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  ExternalLink,
  LifeBuoy,
  FileText,
  Clock,
} from 'lucide-react';
import { Exercise, RoutineProgram, BodyZone } from '../types';
import { ALL_EXERCISES } from '../data/exercises';
import { CLINICAL_PROGRAMS } from '../data/programs';

export interface SearchResultItem {
  id: string;
  category:
    | 'stage'
    | 'exercise'
    | 'routine'
    | 'symptom'
    | 'ergonomics'
    | 'nutrition'
    | 'habit'
    | 'emergency'
    | 'science';
  categoryLabel: string;
  title: string;
  subtitle: string;
  matchScore: number;
  badge?: string;
  icon: any;
  iconColor: string;
  targetTab?: string;
  actionPayload?: any;
  keywords: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: any) => void;
  onSelectExercise: (ex: Exercise) => void;
  onStartProgram: (prog: RoutineProgram) => void;
  onOpenFlareUp: () => void;
  onOpenRedFlags: () => void;
  onOpenReport: () => void;
  onOpenInvestigator?: () => void;
}

export const UniversalClinicalSearch: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectExercise,
  onStartProgram,
  onOpenFlareUp,
  onOpenRedFlags,
  onOpenReport,
  onOpenInvestigator,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build the complete searchable database of clinical items
  const searchableDatabase: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Clinical Stages (0-5)
    items.push(
      {
        id: 'stage-0',
        category: 'stage',
        categoryLabel: 'Recovery Stage 0',
        title: 'Stage 0: Acute Zero-G Decompression & Ischemia Quenching',
        subtitle: 'Days 1-5 • 90-90 calf elevation, stops acute burning radicular pain & muscle spasm',
        matchScore: 0,
        badge: 'Acute Zero-G',
        icon: Compass,
        iconColor: 'text-amber-400',
        targetTab: 'pathway',
        actionPayload: { stageIdx: 0 },
        keywords: [
          'stage 0',
          'zero g',
          'zero gravity',
          'acute',
          'flare',
          'severe',
          'burning',
          'spasm',
          'decompression',
          'ischemia',
          '90-90',
          'rest',
          'bed rest',
          'unloading',
        ],
      },
      {
        id: 'stage-1',
        category: 'stage',
        categoryLabel: 'Recovery Stage 1',
        title: 'Stage 1: Mechanical Decompression & Centralization',
        subtitle: 'Weeks 1-3 • McKenzie chin tucks & press-ups to widen foramina by 24% and draw symptoms to spine',
        matchScore: 0,
        badge: 'Decompression',
        icon: Compass,
        iconColor: 'text-teal-400',
        targetTab: 'pathway',
        actionPayload: { stageIdx: 1 },
        keywords: [
          'stage 1',
          'centralization',
          'mckenzie',
          'chin tuck',
          'press up',
          'foramina',
          'pinched nerve',
          'radiculopathy',
          'cervical retraction',
          'neck',
          'low back',
        ],
      },
      {
        id: 'stage-2',
        category: 'stage',
        categoryLabel: 'Recovery Stage 2',
        title: 'Stage 2: Butler Neurodynamic Gliding & Axonal Remodeling',
        subtitle: 'Weeks 4-8 • Low-tension nerve sliders (12-15mm excursion) to dissolve perineural scar adhesions',
        matchScore: 0,
        badge: 'Nerve Gliding',
        icon: Compass,
        iconColor: 'text-sky-400',
        targetTab: 'pathway',
        actionPayload: { stageIdx: 2 },
        keywords: [
          'stage 2',
          'nerve glide',
          'nerve flossing',
          'neurodynamics',
          'median nerve',
          'sciatic nerve',
          'ulnar nerve',
          'radial nerve',
          'axonal',
          'adhesions',
          'slider',
        ],
      },
      {
        id: 'stage-3',
        category: 'stage',
        categoryLabel: 'Recovery Stage 3',
        title: 'Stage 3: Sensory Desensitization & Cortical Remapping',
        subtitle: 'Weeks 6-10 • Tactile hierarchy (silk to terrycloth) and graphesthesia to resolve burning allodynia',
        matchScore: 0,
        badge: 'Desensitization',
        icon: Compass,
        iconColor: 'text-purple-400',
        targetTab: 'pathway',
        actionPayload: { stageIdx: 3 },
        keywords: [
          'stage 3',
          'sensory',
          'desensitization',
          'allodynia',
          'burning skin',
          'hypersensitive',
          'silk',
          'cotton',
          'graphesthesia',
          'brain remapping',
          'cortical',
        ],
      },
      {
        id: 'stage-4',
        category: 'stage',
        categoryLabel: 'Recovery Stage 4',
        title: 'Stage 4: Deep Stabilizer Corset & Disc Hydration',
        subtitle: 'Weeks 8-14 • McGill Big 3 & deep cervical flexor holds to lock spine in neutral and prevent disc shearing',
        matchScore: 0,
        badge: 'Spinal Armor',
        icon: Compass,
        iconColor: 'text-emerald-400',
        targetTab: 'pathway',
        actionPayload: { stageIdx: 4 },
        keywords: [
          'stage 4',
          'mcgill',
          'big 3',
          'bird dog',
          'deadbug',
          'core',
          'stabilizers',
          'corset',
          'disc hydration',
          'imbibition',
          'shear',
          'lumbar',
          'longus colli',
        ],
      },
      {
        id: 'stage-5',
        category: 'stage',
        categoryLabel: 'Recovery Stage 5',
        title: 'Stage 5: Functional Capacity & Lifetime Spinal Immunity',
        subtitle: 'Weeks 14-24+ • Dynamic multi-planar loading, lifting mechanics, and lifetime relapse prevention',
        matchScore: 0,
        badge: 'Resilience',
        icon: Compass,
        iconColor: 'text-indigo-400',
        targetTab: 'pathway',
        actionPayload: { stageIdx: 5 },
        keywords: [
          'stage 5',
          'functional',
          'lifting',
          'resilience',
          'immunity',
          'lifetime',
          'maintenance',
          'multi-planar',
          'bridge',
          'sports',
          'exercise',
          'freedom',
        ],
      }
    );

    // 2. Emergency & Flare Protocols
    items.push(
      {
        id: 'emergency-flare-protocol',
        category: 'emergency',
        categoryLabel: 'Immediate Rescue',
        title: '1-Click Acute Flare-Up Rescue Protocol',
        subtitle: 'Cryotherapy cadence, 90-90 Zero-G posture & 4-7-8 parasympathetic down-regulation',
        matchScore: 0,
        badge: 'SOS Rescue',
        icon: Flame,
        iconColor: 'text-rose-400',
        actionPayload: { action: 'open_flare' },
        keywords: [
          'flare',
          'emergency',
          'flare up',
          'sos',
          'acute pain',
          'help',
          'severe pain',
          'burning flare',
          'ice',
          'cryotherapy',
          'rescue',
        ],
      },
      {
        id: 'emergency-red-flags',
        category: 'emergency',
        categoryLabel: 'Safety Screening',
        title: 'Spinal Red Flags & Cauda Equina Checklist',
        subtitle: 'Screen for saddle anesthesia, bladder/bowel changes, and progressive motor drop',
        matchScore: 0,
        badge: 'Red Flags',
        icon: ShieldAlert,
        iconColor: 'text-amber-400',
        actionPayload: { action: 'open_red_flags' },
        keywords: [
          'red flags',
          'cauda equina',
          'saddle anesthesia',
          'bladder',
          'bowel',
          'incontinence',
          'foot drop',
          'loss of strength',
          'emergency room',
          'myelopathy',
          'danger signs',
        ],
      },
      {
        id: 'delayed-flare-investigator',
        category: 'emergency',
        categoryLabel: 'Diagnostic Tool',
        title: 'Delayed Latency Flare-Up Investigator',
        subtitle: 'Investigate 4-24 hour delayed ischemic flares caused by driving, posture, or sleep triggers',
        matchScore: 0,
        badge: 'Latency Audit',
        icon: Clock,
        iconColor: 'text-sky-400',
        actionPayload: { action: 'open_investigator' },
        keywords: [
          'delayed',
          'latency',
          'investigator',
          'why do i hurt today',
          'trigger',
          'driving',
          'delayed flare',
          'lag',
          'yesterday',
          'morning shock',
        ],
      }
    );

    // 3. Ergonomics & Sleep
    items.push(
      {
        id: 'ergo-sleep-postures',
        category: 'ergonomics',
        categoryLabel: 'Ergonomics & Sleep',
        title: 'Nocturnal Nerve Unloading & Pillow Alignment Guide',
        subtitle: 'Side sleeper cervical pillow height, knee bolsters & stomach sleeping risks',
        matchScore: 0,
        badge: 'Sleep Posture',
        icon: Moon,
        iconColor: 'text-indigo-400',
        targetTab: 'ergonomics',
        keywords: [
          'sleep',
          'pillow',
          'bed',
          'night',
          'sleeping',
          'side sleeper',
          'back sleeper',
          'stomach sleeper',
          'cervical roll',
          'knee pillow',
          'morning stiffness',
          'wake up with pain',
        ],
      },
      {
        id: 'ergo-desk-setup',
        category: 'ergonomics',
        categoryLabel: 'Ergonomics & Workstation',
        title: 'Workstation Monitor Height & 20-20-20 Micro-Breaks',
        subtitle: 'Desk setup, keyboard distance, lumbar supports, and standing desk intervals',
        matchScore: 0,
        badge: 'Workstation',
        icon: Laptop,
        iconColor: 'text-teal-400',
        targetTab: 'ergonomics',
        keywords: [
          'desk',
          'computer',
          'monitor',
          'chair',
          'sitting',
          'ergonomics',
          'typing',
          'work',
          'micro-break',
          'standing desk',
          'car driving',
          'lumbar support',
        ],
      }
    );

    // 4. Neuro-Nutrition
    items.push(
      {
        id: 'nutrition-b12-ala',
        category: 'nutrition',
        categoryLabel: 'Neuro-Nutrition',
        title: 'Myelin Synthesis Protocol: Vitamin B12, ALA & Omega-3s',
        subtitle: 'Alpha Lipoic Acid (600mg), Methylcobalamin, and PEA for nerve sheath rebuilding',
        matchScore: 0,
        badge: 'Supplements',
        icon: Apple,
        iconColor: 'text-emerald-400',
        targetTab: 'nutrition',
        keywords: [
          'nutrition',
          'supplements',
          'b12',
          'methylcobalamin',
          'alpha lipoic acid',
          'ala',
          'omega-3',
          'curcumin',
          'magnesium glycinate',
          'myelin',
          'diet',
          'food',
          'anti-inflammatory',
        ],
      }
    );

    // 5. Daily Habits & Hydration
    items.push(
      {
        id: 'habit-disc-hydration',
        category: 'habit',
        categoryLabel: 'Daily Habits',
        title: 'Disc Imbibition Hydration Tracker (2-3 Liters / 8 Cups)',
        subtitle: 'Re-inflate nucleus pulposus cushions and lubricate spinal facet joints daily',
        matchScore: 0,
        badge: 'Disc Hydration',
        icon: HeartPulse,
        iconColor: 'text-sky-400',
        targetTab: 'habits',
        keywords: [
          'water',
          'hydration',
          'disc',
          'imbibition',
          '8 cups',
          'habits',
          'daily checklist',
          'routine',
          'streak',
        ],
      },
      {
        id: 'habit-sensory-plasticity',
        category: 'habit',
        categoryLabel: 'Brain Plasticity',
        title: 'Sensory Desensitization & Cortical Retraining Station',
        subtitle: 'Silk-to-terrycloth fabric sweeps and fingertip/foot shape drawing drills',
        matchScore: 0,
        badge: 'Sensory Drills',
        icon: Brain,
        iconColor: 'text-purple-400',
        targetTab: 'sensory',
        keywords: [
          'sensory',
          'touch',
          'cloth',
          'silk',
          'cotton',
          'allodynia',
          'brain',
          'plasticity',
          'smudging',
          'phantom tingling',
          'graphesthesia',
        ],
      }
    );

    // 6. Interactive Body Map & Symptoms
    items.push(
      {
        id: 'tool-body-map',
        category: 'symptom',
        categoryLabel: 'Body Map & Dermatomes',
        title: 'Interactive Pinched Nerve Dermatome Map',
        subtitle: 'Trace radiating pain: Cervical C5-C8 (neck to fingers) and Lumbar L4-S1 (back to toes)',
        matchScore: 0,
        badge: 'Dermatome Map',
        icon: Layers,
        iconColor: 'text-teal-400',
        targetTab: 'body_map',
        keywords: [
          'body map',
          'dermatome',
          'c5',
          'c6',
          'c7',
          'c8',
          'l4',
          'l5',
          's1',
          'sciatica',
          'sciatia',
          'thumb',
          'index finger',
          'pinky',
          'heel',
          'sole of foot',
          'big toe',
          'radiculopathy',
        ],
      },
      {
        id: 'tool-symptom-tracker',
        category: 'symptom',
        categoryLabel: 'Symptom Tracker',
        title: 'Daily Symptom Log & Centralization Trend Analyzer',
        subtitle: 'Log pain severity (0-10), peripheralization status, and generate Clinical Summary PDF',
        matchScore: 0,
        badge: 'Symptom Log',
        icon: Activity,
        iconColor: 'text-rose-400',
        targetTab: 'symptoms',
        keywords: [
          'symptom tracker',
          'log pain',
          'chart',
          'trend',
          'centralization',
          'pdf',
          'doctor report',
          'severity',
        ],
      },
      {
        id: 'tool-clinical-report',
        category: 'symptom',
        categoryLabel: 'Doctor Report',
        title: 'Export Clinical Physical Therapy Progress Summary',
        subtitle: '1-click formatted medical report with ROM, symptom trends, and exercise compliance',
        matchScore: 0,
        badge: 'Export PDF',
        icon: FileText,
        iconColor: 'text-emerald-400',
        actionPayload: { action: 'open_report' },
        keywords: [
          'report',
          'doctor',
          'pdf',
          'export',
          'summary',
          'medical',
          'physician',
          'orthopedic',
        ],
      }
    );

    // 7. Prescribed Programs & Routines
    CLINICAL_PROGRAMS.forEach((prog) => {
      items.push({
        id: `prog-${prog.id}`,
        category: 'routine',
        categoryLabel: 'Prescribed Routine',
        title: prog.title,
        subtitle: `${prog.durationMinutes} mins • ${prog.badge} • ${prog.tagline}`,
        matchScore: 0,
        badge: `${prog.durationMinutes}m`,
        icon: Activity,
        iconColor: 'text-teal-400',
        actionPayload: { action: 'start_program', program: prog },
        keywords: [
          prog.title.toLowerCase(),
          prog.tagline.toLowerCase(),
          prog.description.toLowerCase(),
          prog.badge.toLowerCase(),
          'routine',
          'workout',
          'program',
          ...prog.targetZones.map((z) => z.toLowerCase()),
        ],
      });
    });

    // 8. Individual Exercises
    ALL_EXERCISES.forEach((ex) => {
      items.push({
        id: `ex-${ex.id}`,
        category: 'exercise',
        categoryLabel: 'PT Exercise Guide',
        title: ex.title,
        subtitle: `${ex.repsText} • ${ex.subtitle}`,
        matchScore: 0,
        badge: ex.category.replace('_', ' '),
        icon: Zap,
        iconColor: 'text-sky-400',
        actionPayload: { action: 'open_exercise', exercise: ex },
        keywords: [
          ex.title.toLowerCase(),
          ex.subtitle.toLowerCase(),
          ex.clinicalWhy.toLowerCase(),
          ex.keyVisualCue.toLowerCase(),
          ...ex.targetNerves.map((n) => n.toLowerCase()),
          ...ex.targetAreas.map((a) => a.toLowerCase()),
          'exercise',
          'stretch',
          'glide',
        ],
      });
    });

    return items;
  }, []);

  // Filter and rank search results
  const filteredResults = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) {
      // Return top curated highlights when no search term
      return searchableDatabase.slice(0, 10);
    }

    const matched: SearchResultItem[] = [];

    searchableDatabase.forEach((item) => {
      let score = 0;

      // Exact title match
      if (item.title.toLowerCase().includes(q)) {
        score += 50;
      }
      // Subtitle match
      if (item.subtitle.toLowerCase().includes(q)) {
        score += 25;
      }
      // Keywords match
      item.keywords.forEach((kw) => {
        if (kw === q) score += 40;
        else if (kw.includes(q)) score += 15;
      });

      // Category filter match
      if (
        selectedCategoryFilter !== 'all' &&
        item.category !== selectedCategoryFilter
      ) {
        score = 0;
      }

      if (score > 0) {
        matched.push({ ...item, matchScore: score });
      }
    });

    return matched.sort((a, b) => b.matchScore - a.matchScore);
  }, [searchTerm, selectedCategoryFilter, searchableDatabase]);

  const handleSelectResult = (item: SearchResultItem) => {
    onClose();

    // Check action payload
    if (item.actionPayload) {
      if (item.actionPayload.action === 'open_flare') {
        onOpenFlareUp();
        return;
      }
      if (item.actionPayload.action === 'open_red_flags') {
        onOpenRedFlags();
        return;
      }
      if (item.actionPayload.action === 'open_report') {
        onOpenReport();
        return;
      }
      if (item.actionPayload.action === 'open_investigator' && onOpenInvestigator) {
        onOpenInvestigator();
        return;
      }
      if (item.actionPayload.action === 'open_exercise') {
        onSelectExercise(item.actionPayload.exercise);
        return;
      }
      if (item.actionPayload.action === 'start_program') {
        onStartProgram(item.actionPayload.program);
        return;
      }
    }

    // Tab navigation
    if (item.targetTab) {
      onNavigateTab(item.targetTab);
    }
  };

  const QUICK_PROMPTS = [
    { label: 'Sciatica & Leg Pain', query: 'sciatica' },
    { label: 'Cervical / Numb Hands', query: 'cervical' },
    { label: 'Stage 0-5 Video Roadmap', query: 'stage' },
    { label: 'Sleeping Posture Guide', query: 'sleep' },
    { label: 'Immediate Flare Rescue', query: 'flare' },
    { label: 'Neuro-Nutrition & B12', query: 'nutrition' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ring-1 ring-teal-500/20 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
            <Search className="w-5 h-5" />
          </div>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search symptoms, stages, exercises, sleep postures, pinched nerves, supplements..."
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none pr-8"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all shrink-0"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 sm:px-5 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-400" /> Suggestions:
          </span>
          {QUICK_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSearchTerm(p.query)}
              className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-teal-500/20 hover:border-teal-500/40 text-slate-300 hover:text-teal-300 border border-slate-700/60 transition-all whitespace-nowrap text-xs font-semibold"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="px-4 sm:px-5 py-2 bg-slate-950/40 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          <span className="text-slate-400 font-bold uppercase tracking-wider shrink-0 mr-1">
            Filter:
          </span>
          {[
            { id: 'all', label: 'All Items' },
            { id: 'stage', label: 'Stages (0-5)' },
            { id: 'exercise', label: 'Exercises' },
            { id: 'routine', label: 'Routines' },
            { id: 'symptom', label: 'Symptom Tools' },
            { id: 'ergonomics', label: 'Sleep & Work' },
            { id: 'nutrition', label: 'Nutrition' },
            { id: 'emergency', label: 'Emergency Rescue' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategoryFilter(cat.id)}
              className={`px-2.5 py-0.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                selectedCategoryFilter === cat.id
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1 max-h-[55vh]">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white">No exact clinical matches found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching for specific body parts (neck, lower back, fingers, foot), symptoms (numbness, burning, tingling), or clinical tools (stage, sleep, chin tuck).
              </p>
            </div>
          ) : (
            filteredResults.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectResult(item)}
                  className="w-full p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-800/90 border border-slate-800/80 hover:border-teal-500/50 transition-all text-left flex items-start gap-3.5 group shadow-sm hover:shadow-md"
                >
                  <div
                    className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-teal-500/30 shrink-0 ${item.iconColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                        {item.categoryLabel}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 pt-2 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Info / Zero Tokens Badge */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-300">
              100% Standalone • 0 Tokens / No API Keys Needed • Instant Direct Navigation
            </span>
          </div>
          <span className="text-slate-500 hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};
