import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Lock,
  Unlock,
  ChevronRight,
  ChevronLeft,
  Eye,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  Volume2,
  VolumeX,
  Sparkles,
  AlertTriangle,
  Flame,
  Layers,
  ArrowRight,
  Info,
  Check,
  Video,
  Target,
  Compass,
  HeartPulse,
  Clock,
  Gauge,
  ExternalLink,
} from 'lucide-react';
import { ExerciseIllustration } from './ExerciseIllustration';
import { audioSystem } from '../utils/audio';
import { RoutineProgram, SvgAnimationType } from '../types';
import { CLINICAL_PROGRAMS } from '../data/programs';
import confetti from 'canvas-confetti';

interface StageRecoveryPathwayViewProps {
  onStartRoutine: (routine: RoutineProgram) => void;
  onOpenFlareUp?: () => void;
}

export interface ClinicalStagePathway {
  stageNumber: number; // 0 to 5
  id: string;
  shortName: string;
  badge: string;
  badgeColor: string;
  title: string;
  timeframe: string;
  biologicalMechanism: string;
  clinicalObjective: string;
  animationType: SvgAnimationType;
  exerciseTitle: string;
  exerciseSubtitle: string;
  repDurationSec: number;
  keyBiomechanicalCues: string[];
  voiceGlideCue: string;
  voiceReleaseCue: string;
  whatYouShouldFeel: string;
  whatYouMustAvoid: string;
  advancementChecklist: string[];
  matchedRoutineId: string;
  nextStagePreview: {
    stageNumber: number;
    title: string;
    description: string;
  } | null;
}

const STORAGE_KEY = 'neuroflex_pathway_progress_v2';

export const StageRecoveryPathwayView: React.FC<StageRecoveryPathwayViewProps> = ({
  onStartRoutine,
  onOpenFlareUp,
}) => {
  // Current active stage in view (0 to 5)
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.currentStageIdx === 'number' ? parsed.currentStageIdx : 1;
      }
    } catch (e) {
      // fallback
    }
    return 1; // Default to Stage 1
  });

  // Stage Unlocked state map
  const [unlockedStages, setUnlockedStages] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.unlockedStages) return parsed.unlockedStages;
      }
    } catch (e) {}
    return {
      0: true,
      1: true,
      2: false,
      3: false,
      4: false,
      5: false,
    };
  });

  // Checklist checked items map: { 'stage-1-check-0': true, ... }
  const [checkedCheckpoints, setCheckedCheckpoints] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.checkedCheckpoints) return parsed.checkedCheckpoints;
      }
    } catch (e) {}
    return {};
  });

  // Video Practice Station State
  const [isPracticePlaying, setIsPracticePlaying] = useState<boolean>(false);
  const [practiceRep, setPracticeRep] = useState<number>(1);
  const [practicePhase, setPracticePhase] = useState<'prepare' | 'glide' | 'hold' | 'release'>('prepare');
  const [practiceTimeSec, setPracticeTimeSec] = useState<number>(0);
  const [practiceSpeed, setPracticeSpeed] = useState<number>(1.0); // 0.75x, 1.0x, 1.25x
  const [isVoiceMuted, setIsVoiceMuted] = useState<boolean>(false);

  const practiceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Save progress to local storage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentStageIdx: selectedStageIdx,
          unlockedStages,
          checkedCheckpoints,
        })
      );
    } catch (e) {}
  }, [selectedStageIdx, unlockedStages, checkedCheckpoints]);

  // Handle Video Modeling Loop
  useEffect(() => {
    if (!isPracticePlaying) {
      if (practiceTimerRef.current) clearInterval(practiceTimerRef.current);
      return;
    }

    const currentStage = CLINICAL_PATHWAY_STAGES[selectedStageIdx];
    const baseDuration = currentStage.repDurationSec || 6;
    const intervalMs = Math.round(1000 / practiceSpeed);

    if (practiceRep === 1 && practiceTimeSec === 0) {
      if (!isVoiceMuted) {
        audioSystem.speak(
          `Starting real-time video model for ${currentStage.title}. Match your speed to the visual guide.`,
          true
        );
        audioSystem.playChime('start');
      }
    }

    practiceTimerRef.current = setInterval(() => {
      setPracticeTimeSec((prev) => {
        const next = prev + 1;
        const cycleTime = next % baseDuration;

        if (cycleTime === 0) {
          setPracticePhase('prepare');
          setPracticeRep((r) => {
            const nextR = r + 1;
            if (nextR > 10) {
              // Completed 10 reps
              setIsPracticePlaying(false);
              audioSystem.playChime('complete');
              confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
              if (!isVoiceMuted) {
                audioSystem.speak('10 repetitions completed. Great rhythm and form.');
              }
              return 10;
            }
            if (!isVoiceMuted) {
              audioSystem.playChime('tick');
            }
            return nextR;
          });
        } else if (cycleTime === 1) {
          setPracticePhase('glide');
          if (!isVoiceMuted) {
            audioSystem.speak(currentStage.voiceGlideCue);
          }
        } else if (cycleTime === Math.floor(baseDuration / 2)) {
          setPracticePhase('hold');
        } else if (cycleTime === baseDuration - 1) {
          setPracticePhase('release');
          if (!isVoiceMuted) {
            audioSystem.speak(currentStage.voiceReleaseCue);
          }
        }

        return next;
      });
    }, intervalMs);

    return () => {
      if (practiceTimerRef.current) clearInterval(practiceTimerRef.current);
    };
  }, [isPracticePlaying, selectedStageIdx, practiceSpeed, isVoiceMuted, practiceRep]);

  const handleTogglePractice = () => {
    if (!isPracticePlaying) {
      setPracticeRep(1);
      setPracticeTimeSec(0);
      setPracticePhase('prepare');
      setIsPracticePlaying(true);
    } else {
      setIsPracticePlaying(false);
    }
  };

  const handleResetPractice = () => {
    setIsPracticePlaying(false);
    setPracticeRep(1);
    setPracticeTimeSec(0);
    setPracticePhase('prepare');
  };

  const handleSelectStage = (idx: number) => {
    handleResetPractice();
    setSelectedStageIdx(idx);
  };

  const handleToggleCheckpoint = (key: string) => {
    setCheckedCheckpoints((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentStage = CLINICAL_PATHWAY_STAGES[selectedStageIdx];

  // Calculate if all criteria for this stage are checked
  const allCheckpointsPassed = currentStage.advancementChecklist.every((_, i) =>
    Boolean(checkedCheckpoints[`stage-${currentStage.stageNumber}-check-${i}`])
  );

  const handleUnlockNextStage = () => {
    const nextIdx = selectedStageIdx + 1;
    if (nextIdx < CLINICAL_PATHWAY_STAGES.length) {
      setUnlockedStages((prev) => ({
        ...prev,
        [nextIdx]: true,
      }));
      confetti({ particleCount: 90, spread: 80 });
      handleSelectStage(nextIdx);
      if (!isVoiceMuted) {
        audioSystem.speak(`Stage ${nextIdx} Unlocked. Advancing to next milestone.`);
      }
    }
  };

  const matchedRoutine =
    CLINICAL_PROGRAMS.find((r) => r.id === currentStage.matchedRoutineId) ||
    CLINICAL_PROGRAMS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/80 border border-teal-500/30 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase tracking-wider border border-teal-500/30 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Comprehensive Clinical Continuum (6 Stages)
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Stage 0 (Acute Unload) ➔ Stage 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 (Lifetime Immunity)
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            Stage-by-Stage Video Modeling Recovery Pathway
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Nerves heal by <strong>sliding, not stretching</strong>. Follow this structured medical roadmap to progressively restore nerve mobility, extinguish burning dysesthesia, and fortify spinal stabilizers. Model the real-time Physical Therapy video avatar below before unlocking each milestone.
          </p>
        </div>
      </div>

      {/* 6-STAGE TIMELINE SELECTOR */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Clinical Recovery Roadmap (Click a Stage to Practice):
          </span>
          <span className="text-xs text-teal-400 font-semibold">
            {Object.values(unlockedStages).filter(Boolean).length} of 6 Stages Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {CLINICAL_PATHWAY_STAGES.map((stage, idx) => {
            const isCurrent = selectedStageIdx === idx;
            const isUnlocked = unlockedStages[idx] ?? false;
            const stageChecks = stage.advancementChecklist.map((_, cI) =>
              Boolean(checkedCheckpoints[`stage-${stage.stageNumber}-check-${cI}`])
            );
            const isCompleted = stageChecks.length > 0 && stageChecks.every(Boolean);

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => handleSelectStage(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[110px] ${
                  isCurrent
                    ? 'bg-slate-800 border-teal-500/80 ring-2 ring-teal-500/40 shadow-lg shadow-teal-500/10'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/60'
                    : isUnlocked
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${
                      isCurrent
                        ? 'bg-teal-500 text-slate-950 font-bold'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Stage {stage.stageNumber}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isUnlocked ? (
                    <Unlock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  )}
                </div>

                <div className="space-y-0.5 my-1">
                  <h4 className="text-xs font-bold text-white leading-tight line-clamp-2">
                    {stage.shortName}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">{stage.timeframe}</p>
                </div>

                {isCurrent && (
                  <div className="w-full h-1 bg-teal-500 rounded-full mt-1 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE STAGE DETAILED WORKBENCH */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-xl space-y-6">
        {/* Stage Header Info Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${currentStage.badgeColor}`}>
                {currentStage.badge}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{currentStage.timeframe}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">{currentStage.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {currentStage.clinicalObjective}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Audio Voice Coaching Toggle */}
            <button
              type="button"
              onClick={() => {
                const next = !isVoiceMuted;
                setIsVoiceMuted(next);
                audioSystem.setVoiceEnabled(!next);
                audioSystem.setSoundEnabled(!next);
              }}
              className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                !isVoiceMuted
                  ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
            >
              {!isVoiceMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{!isVoiceMuted ? 'Voice Active' : 'Muted'}</span>
            </button>

            {/* Launch Full Routine */}
            <button
              type="button"
              onClick={() => onStartRoutine(matchedRoutine)}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-teal-500/20 flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Stage Routine ({matchedRoutine.durationMinutes}m)</span>
            </button>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT: (LEFT) REAL-TIME VIDEO MODELING | (RIGHT) ADVANCEMENT CHECKLIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* =========================================================================
              LEFT COLUMN: REAL-TIME VIDEO MODELING STATION (7 cols)
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-teal-500/30 space-y-4 shadow-inner">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white">
                      Live Physical Therapy Movement Model
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {currentStage.exerciseTitle} • {currentStage.exerciseSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-teal-300 font-mono font-bold">
                    Rep {practiceRep} / 10
                  </span>
                  
                  {/* Speed Selector */}
                  <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setPracticeSpeed(0.75)}
                      className={`px-1.5 py-0.5 rounded ${practiceSpeed === 0.75 ? 'bg-teal-500 text-slate-950' : 'text-slate-400'}`}
                    >
                      0.75x
                    </button>
                    <button
                      type="button"
                      onClick={() => setPracticeSpeed(1.0)}
                      className={`px-1.5 py-0.5 rounded ${practiceSpeed === 1.0 ? 'bg-teal-500 text-slate-950' : 'text-slate-400'}`}
                    >
                      1.0x
                    </button>
                    <button
                      type="button"
                      onClick={() => setPracticeSpeed(1.25)}
                      className={`px-1.5 py-0.5 rounded ${practiceSpeed === 1.25 ? 'bg-teal-500 text-slate-950' : 'text-slate-400'}`}
                    >
                      1.25x
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Video Illustration Canvas */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 overflow-hidden shadow-inner flex flex-col items-center justify-center p-3 min-h-[250px] sm:min-h-[280px]">
                <ExerciseIllustration
                  type={currentStage.animationType}
                  className="w-full h-56 sm:h-64"
                  isPaused={!isPracticePlaying}
                />

                {/* Real-time Phase Bar Overlay */}
                {isPracticePlaying && (
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-xl border border-teal-500/40 text-xs animate-fadeIn shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold text-white uppercase text-[11px]">
                        Phase: {practicePhase}
                      </span>
                    </div>
                    <span className="text-teal-300 font-mono text-[11px] truncate ml-2">
                      {practicePhase === 'prepare' && 'Inhale & Align posture'}
                      {practicePhase === 'glide' && 'Exhale: Glide without stretch strain'}
                      {practicePhase === 'hold' && 'Pause 1-2s: Feel nerve sliding'}
                      {practicePhase === 'release' && 'Gently return to neutral'}
                    </span>
                  </div>
                )}

                {/* Biomechanical Direction Cue Strip */}
                <div className="w-full mt-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300 text-[11px]">
                    <strong>Movement Rhythm:</strong> {currentStage.repDurationSec}s per cycle • Sync breath with movement.
                  </span>
                  <span className="text-[10px] text-teal-400 font-bold hidden sm:inline">
                    Zero Sudden Jerks
                  </span>
                </div>
              </div>

              {/* Video Controller Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleTogglePractice}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs transition-all shadow-lg ${
                    isPracticePlaying
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20'
                  }`}
                >
                  {isPracticePlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause 10-Rep Video Modeling</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Start 10-Rep Video Modeling Practice</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResetPractice}
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
                  title="Reset practice reps"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {matchedRoutine && (
                  <button
                    type="button"
                    onClick={() => onStartRoutine(matchedRoutine)}
                    className="px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
                    title={`Start complete ${matchedRoutine.durationMinutes}-min prescribed program for Stage ${currentStage.stageNumber}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Launch Prescribed Routine ({matchedRoutine.durationMinutes}m)</span>
                    <span className="sm:hidden">Full Routine</span>
                  </button>
                )}
              </div>
            </div>

            {/* UNAMBIGUOUS BIOMECHANICAL DIRECTIVES: DO THIS vs AVOID THIS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>DO THIS (Correct Sensation):</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {currentStage.whatYouShouldFeel}
                </p>
                <div className="pt-1 text-[10px] text-emerald-400 font-semibold">
                  ✓ Microvascular perfusion restored
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>AVOID THIS (Common Compensation):</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {currentStage.whatYouMustAvoid}
                </p>
                <div className="pt-1 text-[10px] text-rose-400 font-semibold">
                  ✗ Prevents latency inflammatory flares
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: BIOLOGICAL MECHANISM & ADVANCEMENT CHECKLIST (5 cols)
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            {/* Biological Healing Mechanism Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5" />
                Biological Science Behind Stage {currentStage.stageNumber}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStage.biologicalMechanism}
              </p>
            </div>

            {/* BEFORE YOU MOVE TO NEXT STAGE: ADVANCEMENT CHECKLIST */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 font-black text-xs sm:text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Before You Move to Stage {currentStage.stageNumber + 1}: What to Look For</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentStage.advancementChecklist.filter((_, i) => checkedCheckpoints[`stage-${currentStage.stageNumber}-check-${i}`]).length} / {currentStage.advancementChecklist.length} Checked
                </span>
              </div>

              <p className="text-[11px] text-slate-300">
                Check off each clinical milestone once you feel confident in your symptoms:
              </p>

              <div className="space-y-2.5">
                {currentStage.advancementChecklist.map((checkItem, cIdx) => {
                  const checkKey = `stage-${currentStage.stageNumber}-check-${cIdx}`;
                  const isChecked = Boolean(checkedCheckpoints[checkKey]);

                  return (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => handleToggleCheckpoint(checkKey)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-all shrink-0 ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-600 bg-slate-800'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs leading-snug">{checkItem}</span>
                    </button>
                  );
                })}
              </div>

              {/* Next Stage Preview Box */}
              {currentStage.nextStagePreview ? (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-400">
                      Preview: What You Will See in Stage {currentStage.nextStagePreview.stageNumber}
                    </span>
                    <span className="text-[10px] text-slate-500">Next Milestone</span>
                  </div>
                  <h5 className="text-xs font-bold text-white">
                    {currentStage.nextStagePreview.title}
                  </h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {currentStage.nextStagePreview.description}
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs font-bold">
                  🌟 You have reached Stage 5 (Lifetime Resilience & Immunity). Maintain daily hydration and segmental core habits!
                </div>
              )}

              {/* Advance Button */}
              {selectedStageIdx < CLINICAL_PATHWAY_STAGES.length - 1 && (
                <button
                  type="button"
                  onClick={handleUnlockNextStage}
                  disabled={!allCheckpointsPassed && !unlockedStages[selectedStageIdx + 1]}
                  className={`w-full py-3 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                    allCheckpointsPassed || unlockedStages[selectedStageIdx + 1]
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 shadow-teal-500/20 hover:scale-[1.01]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  }`}
                >
                  <Unlock className="w-4 h-4" />
                  <span>
                    {unlockedStages[selectedStageIdx + 1]
                      ? `Go to Stage ${selectedStageIdx + 1}: ${CLINICAL_PATHWAY_STAGES[selectedStageIdx + 1].shortName}`
                      : `Unlock & Advance to Stage ${selectedStageIdx + 1}`}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   COMPREHENSIVE 6-STAGE CLINICAL CONTINUUM DATA (STAGE 0 TO STAGE 5)
   ========================================================================= */
export const CLINICAL_PATHWAY_STAGES: ClinicalStagePathway[] = [
  {
    stageNumber: 0,
    id: 'stage-0-acute-unloading',
    shortName: 'Acute Zero-G Unload',
    badge: 'Stage 0: Acute Unloading',
    badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    title: 'Stage 0: Acute Zero-G Decompression & Ischemia Quenching',
    timeframe: 'Days 1 to 5 (Severe Acute Spasm / Flare)',
    biologicalMechanism:
      'Mechanical nerve pinching causes acute microvascular ischemia (choking capillary blood flow). Zero-G positioning removes axial disc load, reducing intraneural edema and restoring tissue oxygenation.',
    clinicalObjective:
      'Quench burning nerve pain spikes, open neural foraminal canals by up to 24%, and eliminate spinal compressive gravity without stretching.',
    animationType: 'pelvic_tilt_decompression',
    exerciseTitle: '90-90 Psoas Zero-G Lie & Gentle Pelvic Rocking',
    exerciseSubtitle: 'Supine calves supported on chair/sofa with gentle lumbar flattening',
    repDurationSec: 5,
    keyBiomechanicalCues: [
      'Elevate calves at 90° on couch or chair to completely slacken the psoas muscle.',
      'Place rolled towel under cervical lordosis for zero neck shear.',
      'Gently flatten low back into floor on exhale; do not force or push.',
    ],
    voiceGlideCue: 'Exhale: Gently flatten low back into the mat. Release all tension.',
    voiceReleaseCue: 'Inhale: Return to neutral and rest.',
    whatYouShouldFeel:
      'Immediate reduction in spinal muscle guarding; burning sensation in extremity starts calming down.',
    whatYouMustAvoid:
      'Do NOT attempt forward bending, toe touching, or aggressive hamstring stretching while acute.',
    advancementChecklist: [
      'Severe burning nerve pain score drops from acute peak (>8/10) to manageable (<6/10).',
      'Able to rest in Zero-G position for 10-15 minutes without radiating pain spikes.',
      'Cryotherapy (15 min ice / 45 min warmth) protocol established.',
    ],
    matchedRoutineId: 'acute-nerve-calming',
    nextStagePreview: {
      stageNumber: 1,
      title: 'Mechanical Decompression & Centralization',
      description:
        'McKenzie directional preference exercises (Chin Tucks & Press-Ups) to systematically draw symptoms out of the limbs and back toward the spine.',
    },
  },
  {
    stageNumber: 1,
    id: 'stage-1-mechanical-decompression',
    shortName: 'Decompression & Centralization',
    badge: 'Stage 1: Centralization',
    badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
    title: 'Stage 1: Mechanical Decompression & Centralization',
    timeframe: 'Weeks 1 to 3 (Acute De-escalation Phase)',
    biologicalMechanism:
      'Directional preference exercises (McKenzie Method) mechanically open the intervertebral neural foramina, prompting pain centralization—the hallmark clinical sign that disc herniation is reducing.',
    clinicalObjective:
      'Widen compressed neural exit tunnels, stop distal peripheralization into fingers/toes, and restore basic cervical and lumbar mobility.',
    animationType: 'cervical_chin_tuck',
    exerciseTitle: 'Cervical Chin Tuck & Retraction',
    exerciseSubtitle: 'Horizontal neck drawer glide to decompress C5-C7 nerve roots',
    repDurationSec: 5,
    keyBiomechanicalCues: [
      'Draw chin straight back horizontally (like closing a drawer).',
      'Keep eyes looking forward; do NOT tilt head downward.',
      'Hold 2 seconds at end range, then gently release.',
    ],
    voiceGlideCue: 'Draw chin straight back horizontally. Hold for 2 seconds.',
    voiceReleaseCue: 'Gently release back to neutral alignment.',
    whatYouShouldFeel:
      'Deep engagement at base of skull; tingling in hand/foot starts retreating upward into arm/shoulder or low back (Centralization).',
    whatYouMustAvoid:
      'Nodding or looking down, which compresses anterior disc margins and pinches posterior roots.',
    advancementChecklist: [
      'Centralization confirmed: Pain retreats toward spinal center; peripheral extremity numbness decreases.',
      'Resting nerve pain score stays below 5 out of 10 during daily activities.',
      'Able to complete 10 clean chin tucks or press-ups without symptom worsening.',
    ],
    matchedRoutineId: 'morning-spine-wake',
    nextStagePreview: {
      stageNumber: 2,
      title: 'Butler Neurodynamic Gliding & Axonal Remodeling',
      description:
        'Gentle nerve flossing sliders (12-15mm excursion) to dissolve perineural scar adhesions without tension, feeding axons regenerating at 1 mm/day.',
    },
  },
  {
    stageNumber: 2,
    id: 'stage-2-neurodynamic-gliding',
    shortName: 'Neurodynamic Gliding',
    badge: 'Stage 2: Gliding & Remodeling',
    badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
    title: 'Stage 2: Butler Neurodynamic Gliding & Axonal Remodeling',
    timeframe: 'Weeks 4 to 8 (Remodeling & Excursion Phase)',
    biologicalMechanism:
      'Nerves require 12-15mm of free longitudinal excursion along their tissue beds. Butler sliders slide the nerve trunk through fascial tunnels without tensile strain, preventing fibrosis and promoting 1 mm/day axonal regrowth.',
    clinicalObjective:
      'Mobilize the median, radial, ulnar, and sciatic nerves through their anatomic sheaths to eliminate scar entrapments without triggering inflammatory latency flares.',
    animationType: 'median_nerve_glide',
    exerciseTitle: 'Butler Median Nerve Slider (Wrist Reach + Head Tilt)',
    exerciseSubtitle: 'Simultaneous neck tilt and arm reach to slide the nerve 12-15mm',
    repDurationSec: 6,
    keyBiomechanicalCues: [
      'Tilt head TOWARDS the extending arm simultaneously.',
      'Extend wrist only as far as comfortable; never pull or strain.',
      'Move in a smooth, continuous flossing motion.',
    ],
    voiceGlideCue: 'Extend arm as head tilts towards your shoulder. Feel the smooth slide.',
    voiceReleaseCue: 'Bend elbow and bring head back to center.',
    whatYouShouldFeel:
      'A smooth, sliding sensation along the nerve path. ZERO electric shocks, burning, or high-tension pulling.',
    whatYouMustAvoid:
      'Tilting head AWAY from the arm while extending wrist (this acts as a high-tensioner and causes severe latency flares).',
    advancementChecklist: [
      'Can perform 12 smooth glides without any next-day nerve flare or increased tingling.',
      'Extremity burning is replaced by light, resolving tingling.',
      'Able to reach overhead or extend knee in seated position with minimal nerve irritation.',
    ],
    matchedRoutineId: 'upper-chain-cervical-hands',
    nextStagePreview: {
      stageNumber: 3,
      title: 'Sensory Desensitization & Cortical Remapping',
      description:
        'Tactile hierarchy sweeps (silk to terrycloth) and cortical graphesthesia drills to recalibrate hypersensitive C-fibers and resolve burning allodynia.',
    },
  },
  {
    stageNumber: 3,
    id: 'stage-3-sensory-desensitization',
    shortName: 'Sensory Desensitization',
    badge: 'Stage 3: Sensory Normalization',
    badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    title: 'Stage 3: Sensory Desensitization & Cortical Remapping',
    timeframe: 'Weeks 6 to 10 (Sensory Recalibration Phase)',
    biologicalMechanism:
      'Chronic nerve compression causes sensory smudging in the brain’s somatosensory cortex and hyper-sensitizes unmyelinated C-fibers (allodynia). Graded tactile exposure normalizes the central nervous system sensory gating.',
    clinicalObjective:
      'Extinguish skin hypersensitivity, calm burning dysesthesia, and sharpen tactile discriminating accuracy on fingers and soles of feet.',
    animationType: 'tendon_glide_hands',
    exerciseTitle: 'Sensory Hierarchy Texture Sweeps & Tactile Tracing',
    exerciseSubtitle: 'Silk ➔ Soft Cotton ➔ Terrycloth sweeps paired with nasal breathing',
    repDurationSec: 6,
    keyBiomechanicalCues: [
      'Sweep gentle fabric across sensitive skin from proximal to distal.',
      'Maintain slow, 4-second nasal inhalations and 6-second exhalations.',
      'Progress textures only after previous fabric feels 100% comfortable.',
    ],
    voiceGlideCue: 'Gently sweep the fabric across the skin. Breathe calmly through your nose.',
    voiceReleaseCue: 'Pause, relax muscles, and observe the calm sensation.',
    whatYouShouldFeel:
      'Skin tingling reduces in intensity; clothing no longer triggers unpleasant burning or goosebumps.',
    whatYouMustAvoid:
      'Aggressively rubbing or using rough textures before soft cotton is completely tolerated.',
    advancementChecklist: [
      'Light touch and clothing against the skin no longer trigger hyperalgesia or allodynia.',
      'Tactile 2-point discrimination in fingertips/feet returns toward normal baseline.',
      'Able to tolerate 2 minutes of sensory stimulation without symptom spike.',
    ],
    matchedRoutineId: 'midday-desk-reset',
    nextStagePreview: {
      stageNumber: 4,
      title: 'Deep Muscular Corset & Spinal Splinting',
      description:
        'McGill Big 3 and Longus Colli stabilization holds to build a deep muscular brace around degenerative disc segments.',
    },
  },
  {
    stageNumber: 4,
    id: 'stage-4-muscular-corset',
    shortName: 'Muscular Corset Stability',
    badge: 'Stage 4: Deep Stabilizers',
    badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    title: 'Stage 4: Deep Muscular Corset & Spinal Core Splinting',
    timeframe: 'Weeks 8 to 14 (Segmental Motor Control Phase)',
    biologicalMechanism:
      'Degenerative discs lose intrinsic stiffness, resulting in abnormal micro-motion. Firing deep stabilizers (Multifidus, Transversus Abdominis, Longus Colli) creates a muscular splint that absorbs spinal loads.',
    clinicalObjective:
      'Fortify segmental motor control, eliminate micro-motion shear forces on spinal nerve roots, and build endurance holds.',
    animationType: 'bird_dog_stabilization',
    exerciseTitle: 'McGill Bird-Dog Anti-Rotation Hold',
    exerciseSubtitle: 'Cross-body isometric stabilization with rock-solid lumbar lock',
    repDurationSec: 7,
    keyBiomechanicalCues: [
      'Brace core as if about to be poked in the stomach.',
      'Reach opposite arm and leg straight; do NOT arch lower back.',
      'Hold 3 seconds at top with calm diaphragmatic breathing.',
    ],
    voiceGlideCue: 'Extend opposite arm and leg. Lock core, hold for 3 seconds.',
    voiceReleaseCue: 'Lower with control and prepare for opposite side.',
    whatYouShouldFeel:
      'Firm core engagement and glute contraction with zero pain or sagging in the lumbar spine.',
    whatYouMustAvoid:
      'Lifting leg too high and arching lower back, which jams lumbar facet joints.',
    advancementChecklist: [
      'Able to hold Bird-Dog and Side Plank holds for 30+ seconds with steady nasal breathing.',
      'Can sit, stand, walk, or drive for 60+ minutes without radiculopathy symptoms.',
      'Spinal posture remains automatic and fatigue-resistant throughout the day.',
    ],
    matchedRoutineId: 'lower-chain-lumbar-sciatica',
    nextStagePreview: {
      stageNumber: 5,
      title: 'Functional Capacity & Spinal Immunity',
      description:
        'Dynamic multi-planar loading, lifting mechanics, and lifetime habits for complete independence and permanent resilience.',
    },
  },
  {
    stageNumber: 5,
    id: 'stage-5-functional-resilience',
    shortName: 'Functional Resilience & Immunity',
    badge: 'Stage 5: Lifetime Immunity',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    title: 'Stage 5: Functional Capacity, Dynamic Loading & Spinal Immunity',
    timeframe: 'Weeks 14 to 24+ (Lifetime Resilience & Maintenance)',
    biologicalMechanism:
      'Fully remodeled nerve fibers with mature myelin sheaths can withstand dynamic multi-planar loads. Continuous disc imbibition (8 glasses water + walking) maintains disc height permanently.',
    clinicalObjective:
      'Achieve complete confidence in lifting, twisting, athletic movement, and work tasks with zero fear of nerve recurrence.',
    animationType: 'bridge_glute_support',
    exerciseTitle: 'Glute Drive Bridge & Segmental Articulation',
    exerciseSubtitle: 'Pelvic and hip drive with locked spinal neutral alignment',
    repDurationSec: 6,
    keyBiomechanicalCues: [
      'Drive through heels and squeeze glutes to full hip extension.',
      'Keep ribcage locked to pelvis (straight line from knee to shoulder).',
      'Lower smoothly one vertebra at a time.',
    ],
    voiceGlideCue: 'Squeeze glutes to lift hips into strong bridge. Hold 2 seconds.',
    voiceReleaseCue: 'Lower with control back to floor.',
    whatYouShouldFeel:
      'Powerful glute and hamstring engagement; total spinal comfort and stability.',
    whatYouMustAvoid:
      'Hyperextending lower back at the top of the bridge.',
    advancementChecklist: [
      'Full return to exercise, lifting, work, and recreational activities with zero pain.',
      'Daily 8-glass water disc hydration goal and 7,000+ daily steps routine integrated.',
      'Confidence in recognizing early flare signs and utilizing 1-click rescue protocols.',
    ],
    matchedRoutineId: 'full-neural-spine-restoration',
    nextStagePreview: null,
  },
];
