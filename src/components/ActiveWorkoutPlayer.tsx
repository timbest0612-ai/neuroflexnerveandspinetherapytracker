import React, { useState, useEffect, useRef } from 'react';
import { Exercise, RoutineProgram, CompletedSession } from '../types';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  X,
  Volume2,
  VolumeX,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  HeartPulse,
  Award,
} from 'lucide-react';
import { ExerciseIllustration } from './ExerciseIllustration';
import { audioSystem } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Props {
  program?: RoutineProgram | null;
  singleExercise?: Exercise | null;
  onClose: () => void;
  onFinishSession: (session: CompletedSession) => void;
}

export const ActiveWorkoutPlayer: React.FC<Props> = ({
  program,
  singleExercise,
  onClose,
  onFinishSession,
}) => {
  const exercisesList = program ? program.exercises : singleExercise ? [singleExercise] : [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    exercisesList[0]?.durationSec || 45
  );
  const [isActive, setIsActive] = useState(true);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(10);
  const [isMuted, setIsMuted] = useState(false);

  // Completion survey state
  const [isCompleted, setIsCompleted] = useState(false);
  const [prePainScore, setPrePainScore] = useState<number>(5);
  const [postPainScore, setPostPainScore] = useState<number>(3);
  const [nerveResponse, setNerveResponse] = useState<
    'improved' | 'same' | 'slightly_irritated'
  >('improved');
  const [sessionNotes, setSessionNotes] = useState('');

  const currentExercise = exercisesList[currentIndex];
  const totalExercises = exercisesList.length;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger speech when exercise begins
  useEffect(() => {
    if (!currentExercise || isCompleted) return;

    if (!isResting) {
      setTimeLeft(currentExercise.durationSec);
      if (!isMuted) {
        audioSystem.playChime('start');
        audioSystem.speak(
          `${currentExercise.title}. ${currentExercise.keyVisualCue}`,
          true
        );
      }
    } else {
      setRestTimeLeft(10);
      if (!isMuted) {
        audioSystem.playChime('switch');
        audioSystem.speak('Take a gentle breath. Next exercise coming up.', true);
      }
    }
  }, [currentIndex, isResting]);

  // Main countdown timer loop
  useEffect(() => {
    if (!isActive || isCompleted) return;

    timerRef.current = setInterval(() => {
      if (isResting) {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          if (prev <= 4 && !isMuted) {
            audioSystem.playChime('tick');
          }
          return prev - 1;
        });
      } else {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleExerciseComplete();
            return 0;
          }
          if (prev <= 4 && !isMuted) {
            audioSystem.playChime('tick');
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isResting, currentIndex, isCompleted, isMuted]);

  const handleExerciseComplete = () => {
    if (currentIndex < totalExercises - 1) {
      setIsResting(true);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // All exercises finished!
      setIsActive(false);
      setIsCompleted(true);
      if (!isMuted) {
        audioSystem.playChime('complete');
        audioSystem.speak('Great job! You have completed your physical therapy sequence.', true);
      }
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleSkipNext = () => {
    if (currentIndex < totalExercises - 1) {
      setIsResting(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsActive(false);
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsResting(false);
      setCurrentIndex((prev) => prev - 1);
    } else {
      setTimeLeft(currentExercise?.durationSec || 45);
    }
  };

  const handleTogglePlay = () => {
    setIsActive((prev) => !prev);
    if (isActive) {
      audioSystem.stopSpeaking();
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioSystem.setSoundEnabled(!nextMute);
    audioSystem.setVoiceEnabled(!nextMute);
  };

  const handleSaveAndExit = () => {
    const totalDurationMinutes = program
      ? program.durationMinutes
      : Math.ceil((currentExercise?.durationSec || 45) / 60);

    const completedSession: CompletedSession = {
      id: 'session-' + Date.now(),
      programId: program?.id || currentExercise?.id || 'custom',
      programTitle: program?.title || currentExercise?.title || 'Targeted PT Practice',
      date: new Date().toISOString(),
      durationMinutes: totalDurationMinutes,
      completedExercisesCount: totalExercises,
      totalExercisesCount: totalExercises,
      prePainScore,
      postPainScore,
      nerveResponse,
      userNotes: sessionNotes,
    };

    onFinishSession(completedSession);
    onClose();
  };

  if (!currentExercise) return null;

  const totalDuration = currentExercise.durationSec;
  const progressPercent = isResting
    ? ((10 - restTimeLeft) / 10) * 100
    : ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-between text-slate-100 backdrop-blur-md animate-fade-in p-4 sm:p-6 overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto w-full">
        <div>
          <span className="text-xs font-bold text-teal-400 tracking-wide uppercase flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 animate-pulse" />
            {program ? program.title : 'Targeted Physical Therapy'}
          </span>
          <p className="text-xs text-slate-400">
            Exercise {currentIndex + 1} of {totalExercises}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="max-w-2xl mx-auto w-full my-auto py-3 space-y-4">
        {!isCompleted ? (
          <>
            {/* Overall Sequence Progress Bar */}
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-teal-400 h-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + (isResting ? 0 : 0.5)) / totalExercises) * 100}%`,
                }}
              />
            </div>

            {/* Resting or Active Stage Card */}
            {isResting ? (
              <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4 animate-pulse">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Rest & Settle Nerves ({restTimeLeft}s)
                </span>
                <h3 className="text-2xl font-black text-white">Up Next:</h3>
                <p className="text-lg font-bold text-teal-300">
                  {exercisesList[currentIndex]?.title}
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Take a slow, deep breath into your belly. Allow tension in your neck, back, and shoulders to dissolve.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Exercise Animation & Visualizer */}
                <div className="relative">
                  <ExerciseIllustration
                    type={currentExercise.animationType}
                    className="w-full h-56 sm:h-64 shadow-2xl"
                    isPaused={!isActive}
                  />

                  {/* Target Nerves Chip Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {currentExercise.targetNerves.map((n) => (
                      <span
                        key={n}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950/80 text-teal-300 border border-teal-500/30 backdrop-blur-md"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Exercise Title & Key Form Cue */}
                <div className="text-center space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {currentExercise.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-300 font-medium">
                    ✨ {currentExercise.keyVisualCue}
                  </p>
                </div>

                {/* Countdown Timer Display */}
                <div className="flex items-center justify-center gap-4 py-1">
                  <div className="text-center">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
                      0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                    </span>
                    <span className="text-[11px] block text-slate-400 mt-0.5">
                      {currentExercise.repsText}
                    </span>
                  </div>
                </div>

                {/* Active Cue Ticker */}
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl text-center">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                    Physical Therapist Form Cue
                  </span>
                  <p className="text-xs text-slate-200">
                    {currentExercise.breathingCue}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Session Completed Summary & Response Log */
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 text-center shadow-2xl animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                Therapy Session Complete!
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                You successfully mobilized all prescribed spinal segments and nerve pathways.
              </p>
            </div>

            {/* Centralization & Symptom Check */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 text-left space-y-4">
              <span className="text-xs font-bold text-teal-300 block">
                Post-Exercise Neural Response Check:
              </span>

              {/* Nerve response selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-300 font-medium block">
                  How did your radiating symptoms respond?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNerveResponse('improved')}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                      nerveResponse === 'improved'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ✨ Centralized / Better
                  </button>
                  <button
                    type="button"
                    onClick={() => setNerveResponse('same')}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                      nerveResponse === 'same'
                        ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    Unchanged / Stable
                  </button>
                  <button
                    type="button"
                    onClick={() => setNerveResponse('slightly_irritated')}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                      nerveResponse === 'slightly_irritated'
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ⚠️ More Sensitive
                  </button>
                </div>
              </div>

              {/* Pain score slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Current Discomfort Level:</span>
                  <span className="font-bold text-teal-300">{postPainScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={postPainScore}
                  onChange={(e) => setPostPainScore(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Notes */}
              <div>
                <input
                  type="text"
                  placeholder="Optional notes (e.g. thumb tingling eased, neck felt looser)..."
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveAndExit}
              className="w-full py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.01]"
            >
              Save to Daily PT Log
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      {!isCompleted && (
        <div className="max-w-md mx-auto w-full pt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 disabled:opacity-40 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            className="p-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-xl shadow-teal-500/20 transition-all hover:scale-105"
          >
            {isActive ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current" />}
          </button>

          <button
            type="button"
            onClick={handleSkipNext}
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
