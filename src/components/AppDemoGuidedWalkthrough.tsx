import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
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
  ExternalLink,
  Target,
  Compass,
  X,
} from 'lucide-react';
import { ExerciseIllustration } from './ExerciseIllustration';
import { audioSystem } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AppDemoGuidedWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: any) => void;
  onOpenFlareUp?: () => void;
  onOpenRedFlags?: () => void;
}

type DemoPathway = 'clinical_stages' | 'app_features';

export const AppDemoGuidedWalkthrough: React.FC<AppDemoGuidedWalkthroughProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenFlareUp,
  onOpenRedFlags,
}) => {
  const [selectedPathway, setSelectedPathway] = useState<DemoPathway>('clinical_stages');
  
  // Clinical Stages Step (0 = Stage 1, 1 = Stage 2, 2 = Stage 3)
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  
  // App Features Step (0 to 5)
  const [currentFeatureStep, setCurrentFeatureStep] = useState<number>(0);

  // Video Practice & Modeling Mode
  const [isPracticePlaying, setIsPracticePlaying] = useState<boolean>(false);
  const [practiceRep, setPracticeRep] = useState<number>(1);
  const [practicePhase, setPracticePhase] = useState<'prepare' | 'glide' | 'hold' | 'release'>('prepare');
  const [practiceTimeSec, setPracticeTimeSec] = useState<number>(0);
  const [isVoiceMuted, setIsVoiceMuted] = useState<boolean>(false);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, boolean>>({
    'stage-1': false,
    'stage-2': false,
    'stage-3': false,
  });

  const practiceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop audio on unmount or close
  useEffect(() => {
    if (!isOpen) {
      setIsPracticePlaying(false);
      if (practiceTimerRef.current) clearInterval(practiceTimerRef.current);
    }
  }, [isOpen]);

  // Practice Loop Logic for Video Modeling
  useEffect(() => {
    if (!isPracticePlaying) {
      if (practiceTimerRef.current) clearInterval(practiceTimerRef.current);
      return;
    }

    const currentStageData = CLINICAL_STAGES_DATA[currentStageIdx];
    const repDuration = currentStageData.repCycleSeconds || 6;

    if (!isVoiceMuted && practiceRep === 1 && practiceTimeSec === 0) {
      audioSystem.speak(
        `Starting practice for ${currentStageData.title}. Watch the visual model and sync your rhythm.`,
        true
      );
      audioSystem.playChime('start');
    }

    practiceTimerRef.current = setInterval(() => {
      setPracticeTimeSec((prev) => {
        const nextTime = prev + 1;
        const currentCycleTime = nextTime % repDuration;

        // Phase transitions
        if (currentCycleTime === 0) {
          setPracticePhase('prepare');
          setPracticeRep((r) => {
            const nextRep = r + 1;
            if (nextRep > 10) {
              // Completed 10 reps
              setIsPracticePlaying(false);
              audioSystem.playChime('complete');
              confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
              setCompletedCheckpoints((prev) => ({
                ...prev,
                [`stage-${currentStageIdx + 1}`]: true,
              }));
              if (!isVoiceMuted) {
                audioSystem.speak('Excellent modeling practice. 10 repetitions completed smoothly.');
              }
              return 10;
            }
            if (!isVoiceMuted) {
              audioSystem.playChime('tick');
            }
            return nextRep;
          });
        } else if (currentCycleTime === 1) {
          setPracticePhase('glide');
          if (!isVoiceMuted) {
            audioSystem.speak(currentStageData.voiceGlideCue);
          }
        } else if (currentCycleTime === Math.floor(repDuration / 2)) {
          setPracticePhase('hold');
        } else if (currentCycleTime === repDuration - 1) {
          setPracticePhase('release');
          if (!isVoiceMuted) {
            audioSystem.speak(currentStageData.voiceReleaseCue);
          }
        }

        return nextTime;
      });
    }, 1000);

    return () => {
      if (practiceTimerRef.current) clearInterval(practiceTimerRef.current);
    };
  }, [isPracticePlaying, currentStageIdx, isVoiceMuted, practiceRep]);

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

  const handleNextStage = () => {
    if (currentStageIdx < CLINICAL_STAGES_DATA.length - 1) {
      handleResetPractice();
      setCurrentStageIdx((prev) => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIdx > 0) {
      handleResetPractice();
      setCurrentStageIdx((prev) => prev - 1);
    }
  };

  const handleNextFeature = () => {
    if (currentFeatureStep < APP_FEATURES_DATA.length - 1) {
      setCurrentFeatureStep((prev) => prev + 1);
    }
  };

  const handlePrevFeature = () => {
    if (currentFeatureStep > 0) {
      setCurrentFeatureStep((prev) => prev - 1);
    }
  };

  if (!isOpen) return null;

  const currentStage = CLINICAL_STAGES_DATA[currentStageIdx];
  const nextStage = CLINICAL_STAGES_DATA[currentStageIdx + 1];
  const currentFeature = APP_FEATURES_DATA[currentFeatureStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl bg-slate-900 border border-teal-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-400 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/20 font-black">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Guided App Walkthrough & Stage-by-Stage Video Practice
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
                  Interactive Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Step-by-step clinical progression guide & real-time movement modeling
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Voice Toggle */}
            <button
              type="button"
              onClick={() => {
                const next = !isVoiceMuted;
                setIsVoiceMuted(next);
                audioSystem.setVoiceEnabled(!next);
                audioSystem.setSoundEnabled(!next);
              }}
              className={`p-2 rounded-xl border transition-all ${
                !isVoiceMuted
                  ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              title={isVoiceMuted ? 'Unmute Audio Coaching' : 'Mute Audio Coaching'}
            >
              {!isVoiceMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pathway Mode Switcher Bar */}
        <div className="p-3 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 px-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                handleResetPractice();
                setSelectedPathway('clinical_stages');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedPathway === 'clinical_stages'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>1. Full Clinical Recovery Stages (Stages 0 to 5)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleResetPractice();
                setSelectedPathway('app_features');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedPathway === 'app_features'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>2. App Feature Tour (Step 1 to Step 6)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateTab('pathway');
              }}
              className="px-3 py-1 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Open Real App Pathway Tab</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* =========================================================================
              PATHWAY 1: CLINICAL RECOVERY STAGES (STAGE 0 TO STAGE 5)
              ========================================================================= */}
          {selectedPathway === 'clinical_stages' && (
            <div className="space-y-6">
              {/* Stepper Progress Header */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
                {CLINICAL_STAGES_DATA.map((stage, idx) => {
                  const isCurrent = currentStageIdx === idx;
                  const isDone = completedCheckpoints[`stage-${idx}`];
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        handleResetPractice();
                        setCurrentStageIdx(idx);
                      }}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                        isCurrent
                          ? 'bg-slate-800 border-teal-500/80 ring-2 ring-teal-500/30 shadow-lg'
                          : isDone
                          ? 'bg-slate-950/60 border-emerald-500/40 text-slate-300'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            isCurrent
                              ? 'bg-teal-500 text-slate-950'
                              : isDone
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Stage {idx}
                        </span>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <h4 className="text-xs font-bold text-white leading-tight line-clamp-2">{stage.shortName}</h4>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{stage.timeframe}</p>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Detail & Video Practice Station */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Interactive Video & Model Station (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                        <Video className="w-4 h-4" />
                        <span>Live PT Movement Video Model (Model this in Real-Time)</span>
                      </div>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-bold">
                        Rep {practiceRep} / 10
                      </span>
                    </div>

                    {/* Animated Video Canvas Container */}
                    <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-teal-500/30 overflow-hidden shadow-inner flex flex-col items-center justify-center p-3 min-h-[260px]">
                      {/* Exercise Animated Demonstration */}
                      <ExerciseIllustration
                        type={currentStage.animationType}
                        className="w-full h-52 sm:h-56"
                        isPaused={!isPracticePlaying}
                      />

                      {/* Mirror Cadence Overlay */}
                      {isPracticePlaying && (
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-teal-500/40 text-xs animate-fadeIn">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                            <span className="font-bold text-white capitalize">
                              Phase: {practicePhase}
                            </span>
                          </div>
                          <span className="text-teal-300 font-mono text-xs">
                            {practicePhase === 'prepare' && 'Inhale & Align posture'}
                            {practicePhase === 'glide' && 'Exhale: Glide without stretch tension'}
                            {practicePhase === 'hold' && 'Pause 1-2s: Feel nerve glide'}
                            {practicePhase === 'release' && 'Gently return to neutral'}
                          </span>
                        </div>
                      )}

                      {/* Real-Time Modeling Status Cue at Bottom */}
                      <div className="w-full mt-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-300 text-[11px]">
                          <strong>Key Biomechanical Cue:</strong> {currentStage.visualCue}
                        </span>
                      </div>
                    </div>

                    {/* Video Practice Controller Controls */}
                    <div className="flex items-center justify-between gap-3 pt-1">
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
                            <span>Pause Practice</span>
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
                        title="Reset practice"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Form Check: What to Do vs What to Avoid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> What You Should Feel:
                      </span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {currentStage.correctFeeling}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                      <span className="font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Mistake to Avoid:
                      </span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {currentStage.commonMistake}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Stage Progression & "What You Will See Next" (5 cols) */}
                <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Stage Header Info */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                          Current Milestone
                        </span>
                        <span className="text-[11px] text-slate-400">{currentStage.timeframe}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{currentStage.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {currentStage.clinicalGoal}
                      </p>
                    </div>

                    {/* BEFORE YOU MOVE TO NEXT STEP: Requirement Checklist */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                        <Eye className="w-4 h-4" />
                        <span>Before You Move to Stage {currentStageIdx + 2}: What to Look For</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        {currentStage.advancementChecklist.map((checkItem, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-2 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-snug">{checkItem}</span>
                          </div>
                        ))}
                      </div>

                      {/* Next Stage Preview Box */}
                      {nextStage ? (
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 mt-2">
                          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                            Preview: What You Will See in Stage {currentStageIdx + 2}
                          </span>
                          <p className="text-[11px] text-slate-300">
                            <strong>{nextStage.shortName}:</strong> {nextStage.previewDescription}
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                          🎉 Stage 3 is the Final Stabilization Mastery Stage for permanent spinal immunity.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stage Navigation Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handlePrevStage}
                      disabled={currentStageIdx === 0}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        currentStageIdx > 0
                          ? 'bg-slate-800 hover:bg-slate-700 text-white'
                          : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Stage</span>
                    </button>

                    {currentStageIdx < CLINICAL_STAGES_DATA.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextStage}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-teal-500/20"
                      >
                        <span>Advance to Stage {currentStageIdx + 2}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          confetti({ particleCount: 80, spread: 70 });
                          onClose();
                          onNavigateTab('routines');
                        }}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-emerald-500/20"
                      >
                        <span>Finish Demo & Start Routine</span>
                        <Award className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              PATHWAY 2: APP FEATURE-BY-FEATURE TOUR (STEPS 1 TO 6)
              ========================================================================= */}
          {selectedPathway === 'app_features' && (
            <div className="space-y-6">
              {/* Feature Step Header Pills */}
              <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar pb-1">
                {APP_FEATURES_DATA.map((feat, idx) => (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => setCurrentFeatureStep(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      currentFeatureStep === idx
                        ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                        : 'bg-slate-800/80 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Step {idx + 1}:</span>
                    <span>{feat.shortTitle}</span>
                  </button>
                ))}
              </div>

              {/* Step Display Card */}
              <div className="p-5 rounded-3xl bg-slate-950/80 border border-sky-500/30 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      {currentFeature.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-400">
                        Step {currentFeatureStep + 1} of {APP_FEATURES_DATA.length}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {currentFeature.title}
                      </h3>
                    </div>
                  </div>

                  {/* Direct Action Link */}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (currentFeature.tabTarget) {
                        onNavigateTab(currentFeature.tabTarget);
                      } else if (currentFeature.modalTarget === 'flare_up') {
                        onOpenFlareUp?.();
                      } else if (currentFeature.modalTarget === 'red_flags') {
                        onOpenRedFlags?.();
                      }
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all"
                  >
                    <span>Launch This View Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Feature Description & Action Plan */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentFeature.description}
                </p>

                {/* Grid: What You Will See vs How to Use It */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                      <Eye className="w-4 h-4" /> What You Will See on This Screen:
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
                      {currentFeature.whatYouWillSee.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                      <Target className="w-4 h-4" /> Step-by-Step Action Guide:
                    </span>
                    <ol className="space-y-1.5 text-[11px] text-slate-300 list-decimal list-inside">
                      {currentFeature.actionGuide.map((action, aIdx) => (
                        <li key={aIdx}>{action}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Before Moving to Next Step Cue */}
                {currentFeatureStep < APP_FEATURES_DATA.length - 1 && (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      <strong>Before moving to Step {currentFeatureStep + 2}:</strong>{' '}
                      {currentFeature.beforeMovingRequirement}
                    </span>
                  </div>
                )}

                {/* Navigation Next/Prev Buttons */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrevFeature}
                    disabled={currentFeatureStep === 0}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      currentFeatureStep > 0
                        ? 'bg-slate-800 hover:bg-slate-700 text-white'
                        : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Step</span>
                  </button>

                  {currentFeatureStep < APP_FEATURES_DATA.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNextFeature}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-sky-500/20"
                    >
                      <span>Next: Step {currentFeatureStep + 2}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigateTab('routines');
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-teal-500/20"
                    >
                      <span>Explore App Routines</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Quick Summary */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Info className="w-4 h-4 text-teal-400" />
            <span>
              Always remember: <strong>Nerves heal by sliding, not stretching.</strong> Never push through sharp or radiating pain.
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all text-xs"
          >
            Close Walkthrough
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   CLINICAL STAGES DATA (STAGE 0 TO STAGE 5 - FULL 6-STAGE CONTINUUM)
   ========================================================================= */
const CLINICAL_STAGES_DATA = [
  {
    id: 'stage-0',
    shortName: 'Acute Zero-G Unload',
    title: 'Stage 0: Acute Zero-G Decompression & Ischemia Quenching',
    timeframe: 'Days 1 to 5 (Severe Acute Spasm / Flare)',
    animationType: 'pelvic_tilt_decompression' as const,
    repCycleSeconds: 5,
    visualCue: 'Elevate calves at 90° on couch or chair; gently flatten low back into mat on exhale without pushing.',
    voiceGlideCue: 'Exhale: Gently flatten low back into the mat. Release all tension.',
    voiceReleaseCue: 'Inhale: Return to neutral and rest.',
    clinicalGoal:
      'Quenches microvascular ischemia (restores capillary blood flow), unloads axial disc compression, and calms acute radicular fire.',
    correctFeeling:
      'Immediate reduction in spinal muscle guarding; burning sensation in extremity starts calming down.',
    commonMistake:
      'Attempting forward bending, toe touching, or aggressive hamstring stretching while acute.',
    advancementChecklist: [
      'Severe burning nerve pain score drops from acute peak (>8/10) to manageable (<6/10).',
      'Able to rest in Zero-G position for 10-15 minutes without radiating pain spikes.',
      'Cryotherapy (15 min ice / 45 min warmth) protocol established.',
    ],
    previewDescription:
      'McKenzie directional preference exercises (Chin Tucks & Press-Ups) to systematically draw symptoms out of the limbs and back toward the spine.',
  },
  {
    id: 'stage-1',
    shortName: 'Decompression & Centralization',
    title: 'Stage 1: Neural Decompression & Centralization',
    timeframe: 'Weeks 1 to 3 (Acute De-escalation)',
    animationType: 'cervical_chin_tuck' as const,
    repCycleSeconds: 5,
    visualCue: 'Draw chin straight back horizontally (make double chin), pause, and release without nodding.',
    voiceGlideCue: 'Draw chin straight back horizontally. Pause 2 seconds.',
    voiceReleaseCue: 'Gently release back to neutral.',
    clinicalGoal:
      'Widens compressed neural foramina by up to 24%, restores microvascular capillary perfusion to ischemic nerve roots, and prompts pain centralization.',
    correctFeeling:
      'A deep muscular feeling at the base of the skull or neck; radiating hand/foot tingling starts retreating back toward the spine.',
    commonMistake:
      'Tilting head downward (nodding) instead of sliding backward like a drawer, which compresses anterior discs.',
    advancementChecklist: [
      'Centralization confirmed: Pain retreats from fingers/toes into shoulder or lower back.',
      'Resting nerve pain score drops below 5 out of 10.',
      'Able to perform 90-90 Zero-G Decompression without symptom aggravation.',
    ],
    previewDescription:
      'Neurodynamic Nerve Flossing Sliders (12-15mm excursion) to dissolve fascial scar adhesions without high-tension stretching.',
  },
  {
    id: 'stage-2',
    shortName: 'Neurodynamic Gliding',
    title: 'Stage 2: Butler Nerve Gliding & Axonal Remodeling',
    timeframe: 'Weeks 4 to 8 (Remodeling Phase)',
    animationType: 'median_nerve_glide' as const,
    repCycleSeconds: 6,
    visualCue: 'Tilt head TOWARDS the extending arm so the nerve slides freely without stretch tension.',
    voiceGlideCue: 'Extend arm as head tilts towards your shoulder. Feel the gentle slide.',
    voiceReleaseCue: 'Bend elbow and return head to neutral.',
    clinicalGoal:
      'Promotes 12-15mm of longitudinal excursion along the nerve sheath, preventing perineural fibrosis and nourishing regenerating axons at 1 mm/day.',
    correctFeeling:
      'A smooth, sliding sensation along the arm or leg. ZERO sharp, burning, or high-tension pulling.',
    commonMistake:
      'Tilting head AWAY from the arm while extending wrist (this stretches the nerve and triggers severe latency flares).',
    advancementChecklist: [
      'Able to perform 12 smooth glides without delayed next-day nerve flare.',
      'Burning sensation replaced by light, resolving tingling.',
      'Zero numbness in median (thumb/index) or sciatic (sole of foot) dermatomes.',
    ],
    previewDescription:
      'Tactile hierarchy sweeps (silk to terrycloth) and cortical graphesthesia drills to recalibrate hypersensitive C-fibers and resolve burning allodynia.',
  },
  {
    id: 'stage-3',
    shortName: 'Sensory Desensitization',
    title: 'Stage 3: Sensory Desensitization & Cortical Remapping',
    timeframe: 'Weeks 6 to 10 (Sensory Recalibration)',
    animationType: 'tendon_glide_hands' as const,
    repCycleSeconds: 6,
    visualCue: 'Gently sweep soft fabrics (silk to cotton) across sensitive skin paired with slow nasal breathing.',
    voiceGlideCue: 'Gently sweep fabric across the skin. Breathe calmly through your nose.',
    voiceReleaseCue: 'Pause, relax muscles, and observe the calm sensation.',
    clinicalGoal:
      'Calms unmyelinated C-fiber hypersensitivity (allodynia) and sharpens somatosensory cortex map discrimination.',
    correctFeeling:
      'Skin tingling softens; clothing no longer triggers unpleasant stinging or burning sensations.',
    commonMistake:
      'Aggressively rubbing or using rough textures before soft cotton is completely tolerated.',
    advancementChecklist: [
      'Light touch and clothing against the skin no longer trigger hyperalgesia or allodynia.',
      'Tactile 2-point discrimination in fingertips/feet returns toward normal baseline.',
      'Able to tolerate 2 minutes of sensory stimulation without symptom spike.',
    ],
    previewDescription:
      'Deep Muscular Corset & Spinal Stability (McGill Big 3 & Longus Colli holds) to permanently insulate discs from shearing forces.',
  },
  {
    id: 'stage-4',
    shortName: 'Muscular Corset Stability',
    title: 'Stage 4: Deep Stabilizer Corset & Disc Hydration',
    timeframe: 'Weeks 8 to 14 (Segmental Motor Control)',
    animationType: 'bird_dog_stabilization' as const,
    repCycleSeconds: 7,
    visualCue: 'Reach opposite arm and leg while keeping lumbar spine locked in rock-solid neutral.',
    voiceGlideCue: 'Extend opposite arm and leg. Lock core, hold 3 seconds.',
    voiceReleaseCue: 'Lower with control and switch sides.',
    clinicalGoal:
      'Activates deep Multifidus, Transversus Abdominis, and Longus Colli to create an internal muscular brace around degenerative disc segments.',
    correctFeeling:
      'Strong, stable core engagement with steady nasal breathing. No spinal sagging or hyperextension.',
    commonMistake:
      'Lifting leg too high and arching lower back, which jams the lumbar facet joints.',
    advancementChecklist: [
      'Can hold Bird-Dog and Side Plank holds for 30+ seconds with calm diaphragmatic breathing.',
      'Able to sit, walk, and drive for 60+ minutes without radiculopathy symptoms.',
      'Daily disc rehydration habits (8 glasses water + walking) fully integrated.',
    ],
    previewDescription:
      'Dynamic multi-planar loading, functional lifting mechanics, and lifetime spinal immunity habits.',
  },
  {
    id: 'stage-5',
    shortName: 'Functional Resilience & Immunity',
    title: 'Stage 5: Functional Capacity, Dynamic Loading & Spinal Immunity',
    timeframe: 'Weeks 14 to 24+ (Lifetime Resilience & Maintenance)',
    animationType: 'bridge_glute_support' as const,
    repCycleSeconds: 6,
    visualCue: 'Drive through heels and squeeze glutes to lift hips into full extension with neutral spine.',
    voiceGlideCue: 'Squeeze glutes to lift hips into strong bridge. Hold 2 seconds.',
    voiceReleaseCue: 'Lower with control back to floor.',
    clinicalGoal:
      'Achieves full multi-planar resilience, functional lifting confidence, permanent disc rehydration (imbibition), and lifetime neural freedom.',
    correctFeeling:
      'Powerful glute and hamstring engagement; total spinal comfort, strength, and stability.',
    commonMistake:
      'Hyperextending lower back at the top of the bridge.',
    advancementChecklist: [
      'Full return to exercise, lifting, work, and recreational activities with zero pain.',
      'Daily 8-glass water disc hydration goal and 7,000+ daily steps routine integrated.',
      'Confidence in recognizing early flare signs and utilizing 1-click rescue protocols.',
    ],
    previewDescription:
      'Permanent lifestyle freedom with complete confidence in spine and nerve function.',
  },
];

/* =========================================================================
   APP FEATURES STEP-BY-STEP DATA
   ========================================================================= */
interface AppFeatureItem {
  id: string;
  shortTitle: string;
  title: string;
  icon: React.ReactNode;
  tabTarget?: string;
  modalTarget?: 'flare_up' | 'red_flags';
  description: string;
  whatYouWillSee: string[];
  actionGuide: string[];
  beforeMovingRequirement: string;
}

const APP_FEATURES_DATA: AppFeatureItem[] = [
  {
    id: 'step-1-routines',
    shortTitle: 'Routines & Player',
    title: 'Clinical Physical Therapy Routines & Interactive Workout Player',
    icon: <Play className="w-5 h-5" />,
    tabTarget: 'routines',
    description:
      'Access evidence-based clinical routines categorized by stage and body zone. Each exercise includes real-time animated PT demonstration, rep-by-rep timers, and audio voice coaching.',
    whatYouWillSee: [
      'Curated programs: Cervical Radiculopathy Rescue, Sciatica Decompression, Full Neural Restoration.',
      'Active Workout Player: countdown timer, audio chime metronome, and form cues.',
      'Pre- & Post-Session Pain Tracker to clinically measure immediate centralization.',
    ],
    actionGuide: [
      'Choose an acute, restorative, or progressive routine.',
      'Hit "Start Session" to open the interactive audio-visual workout player.',
      'Follow the animated avatar and audio voice prompts for exact rep pacing.',
    ],
    beforeMovingRequirement: 'Complete at least one gentle 5-minute routine to familiarize with the player.',
  },
  {
    id: 'step-2-bodymap',
    shortTitle: 'Body Map',
    title: 'Interactive Dermatome Body Map & Neural Analyzer',
    icon: <Activity className="w-5 h-5" />,
    tabTarget: 'body_map',
    description:
      'Visually map your symptoms across cervical (C1-C7), thoracic, lumbar (L1-L5), and peripheral nerve pathways (Median, Ulnar, Sciatic).',
    whatYouWillSee: [
      'Interactive anatomical silhouette with clickable body zones.',
      'Exact spinal segment origins and peripheral nerve root distributions.',
      'Filtered exercises custom-targeted to your specific symptomatic zone.',
    ],
    actionGuide: [
      'Click on any zone (e.g., Arms & Hands or Lumbar Spine).',
      'Review the diagnosed spinal nerve roots and key clinical solutions.',
      'Launch instant targeted exercises directly from the sidebar.',
    ],
    beforeMovingRequirement: 'Identify your primary affected spinal zone on the interactive silhouette.',
  },
  {
    id: 'step-3-science',
    shortTitle: 'Recovery Science',
    title: 'Can Nerves Heal? Stage-by-Stage Recovery Science',
    icon: <Compass className="w-5 h-5" />,
    tabTarget: 'cure_science',
    description:
      'Learn the medical science of nerve regeneration: how axonal sprout regrowth proceeds at 1 mm/day and why nerves heal through sliding rather than aggressive stretching.',
    whatYouWillSee: [
      'Interactive Foramen Decompression & Ischemia relief diagrams.',
      'Butler Neurodynamic Slider Excursion vs. Nerve Tensioner visualizer.',
      'Deep Muscular Corset and Disc Imbibition mechanics.',
    ],
    actionGuide: [
      'Switch between Stage 1, Stage 2, and Stage 3 visual diagrams.',
      'Toggle the interactive compression vs. decompression view.',
      'Understand centralization as your primary clinical indicator.',
    ],
    beforeMovingRequirement: 'Understand the difference between nerve sliding (good) and nerve stretching (irritating).',
  },
  {
    id: 'step-4-sensory',
    shortTitle: 'Sensory Retraining',
    title: 'Sensory Desensitization & Tactile Retraining Drills',
    icon: <Sparkles className="w-5 h-5" />,
    tabTarget: 'sensory',
    description:
      'Treat burning dysesthesia, hypersensitivity, and allodynia with cortical map sharpening, texture hierarchies (silk to terrycloth), and thermal contrast protocols.',
    whatYouWillSee: [
      '3-Stage Texture Hierarchy Sweep visual guide (Silk ➔ Cotton ➔ Terrycloth).',
      'Vasomotor Temperature Contrast Basin protocol (Warm vs. Cool).',
      'Somatosensory Cortex Graphesthesia tactile letter tracing drills.',
    ],
    actionGuide: [
      'Select a desensitization drill based on your symptom type.',
      'Follow the 2-minute timed protocol with slow nasal breathing.',
      'Calm down hypersensitive C-fibers without triggering flares.',
    ],
    beforeMovingRequirement: 'Perform one 60-second gentle texture sweep on the sensitive skin area.',
  },
  {
    id: 'step-5-nutrition',
    shortTitle: 'Nutrition & Hydration',
    title: 'Neuro-Nutrition & Disc Hydration Tracker',
    icon: <Flame className="w-5 h-5" />,
    tabTarget: 'nutrition',
    description:
      'Nourish regenerating Schwann cells with Methyl-B12, Alpha-Lipoic Acid, and Omega-3s, while tracking your daily 8-glass disc rehydration goal.',
    whatYouWillSee: [
      'High-resolution cellular diagram showing Schwann cells, myelin sheaths, and Nodes of Ranvier.',
      'Clinical supplement guide: dosages, timing, and biochemistry mechanisms.',
      'Interactive 8-Glass Water Tracker for disc nucleus imbibition.',
    ],
    actionGuide: [
      'Review the top 6 evidence-based nerve healing nutrients.',
      'Click the water glasses to log your daily spinal rehydration.',
      'Integrate anti-inflammatory dietary switches.',
    ],
    beforeMovingRequirement: 'Log your first water glass and check your daily hydration status.',
  },
  {
    id: 'step-6-aipt',
    shortTitle: 'AI PT & Rescue',
    title: 'Clinical AI PT Assistant & Emergency Flare-Up Rescue',
    icon: <ShieldCheck className="w-5 h-5" />,
    tabTarget: 'ai_pt',
    description:
      'Get personalized clinical guidance 24/7 from the AI PT Assistant, complete safety red-flags screening, and access 1-click Zero-G flare-up rescue protocols.',
    whatYouWillSee: [
      'Instant conversational AI Physical Therapist calibrated on McKenzie & Butler protocols.',
      'Emergency Flare-Up Rescue button for acute sciatica/neck spasms.',
      'Symptom Tracker to log daily pain centralization trends.',
    ],
    actionGuide: [
      'Ask the AI PT about specific sensations or exercise modifications.',
      'Use the Emergency Rescue Modal if you ever experience a sudden pain spike.',
      'Log your daily centralization status in the Symptom Tracker.',
    ],
    beforeMovingRequirement: 'Know where the Emergency Flare-Up button is located for immediate relief.',
  },
];
