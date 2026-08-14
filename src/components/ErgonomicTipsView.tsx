import React, { useState, useEffect } from 'react';
import {
  Moon,
  Laptop,
  Car,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Wind,
  Sparkles,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Bed,
  Layers,
  ArrowRight,
  Zap,
  Info,
} from 'lucide-react';
import { ErgonomicPostureDiagrams } from './ClinicalVisualDiagrams';
import { audioSystem } from '../utils/audio';

interface Props {
  onOpenInvestigator?: () => void;
  onOpenPathwayStage?: (stageIdx: number) => void;
}

export const ErgonomicTipsView: React.FC<Props> = ({
  onOpenInvestigator,
  onOpenPathwayStage,
}) => {
  // Sleep Position Simulator State
  const [selectedSleepPosition, setSelectedSleepPosition] = useState<
    'side' | 'back' | 'stomach'
  >('side');

  // Micro-Break Timer State
  const [timerDurationMin, setTimerDurationMin] = useState<number>(30);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [completedMicroBreaks, setCompletedMicroBreaks] = useState<number>(0);
  const [showDecompressionPrompt, setShowDecompressionPrompt] = useState<boolean>(false);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setShowDecompressionPrompt(true);
      setCompletedMicroBreaks((prev) => prev + 1);
      if (!isMuted) {
        audioSystem.playChime('complete');
        audioSystem.speak('Time for your 30-second neural decompression micro-break.');
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining, isMuted]);

  const handleStartTimer = (mins?: number) => {
    const m = mins || timerDurationMin;
    setTimerDurationMin(m);
    setSecondsRemaining(m * 60);
    setIsTimerRunning(true);
    setShowDecompressionPrompt(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(timerDurationMin * 60);
    setShowDecompressionPrompt(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-100 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Spine & Nerve Joint Protection</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Daily Ergonomics, Sleep & Micro-Break Engine
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Physical therapy restores nerve mobility, but 90% of degenerative flare-ups occur from sustained mechanical compression during sleep, sitting, and driving.
          </p>
        </div>

        {onOpenInvestigator && (
          <button
            type="button"
            onClick={onOpenInvestigator}
            className="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20 shrink-0"
          >
            <Clock className="w-4 h-4" />
            <span>Delayed Flare Investigator</span>
          </button>
        )}
      </div>

      {/* =========================================================================
          SECTION 1: INTERACTIVE DESK MICRO-BREAK NEURAL RESET TIMER
          ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-teal-500/30 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  Microvascular Pacing
                </span>
                <span className="text-xs text-slate-400">
                  Prevents Static Nerve Ischemia
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                30-Minute Neural Reset Timer
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Breaks Completed Today:</span>
            <span className="font-black px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {completedMicroBreaks}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Static sitting collapses the microscopic capillary beds feeding lumbar and cervical nerves after <strong>20 to 30 minutes</strong>. Running this timer reminds you to perform a 30-second decompression reset without disrupting your workday.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Timer Display */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-3xl sm:text-4xl font-mono font-black text-white tracking-wider">
              {formatTime(secondsRemaining)}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <span>Interval: {timerDurationMin} mins</span>
              <span className="text-slate-600">•</span>
              <span className={isTimerRunning ? 'text-teal-400 font-bold' : 'text-slate-500'}>
                {isTimerRunning ? 'Active Running' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Quick Presets & Controls */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Preset Interval
              </span>
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-400 hover:text-white p-1"
                title={isMuted ? 'Unmute chime' : 'Mute chime'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-400" />}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[20, 30, 45].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => handleStartTimer(mins)}
                  className={`py-1.5 rounded-xl font-bold text-xs transition-all border ${
                    timerDurationMin === mins && isTimerRunning
                      ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex-1 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Timer</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetTimer}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 30-Second Micro-Decompression Cue */}
          <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-800/40 flex flex-col justify-between space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-300 flex items-center gap-1">
              <Zap className="w-3 h-3 text-teal-400" />
              <span>30-Second Desk Protocol</span>
            </span>

            <div className="space-y-1 text-xs text-slate-300">
              <p className="font-semibold text-white">
                1. Stand up & take 3 deep diaphragmatic breaths.
              </p>
              <p className="text-slate-400">
                2. Perform 5 McKenzie Chin Tucks and 3 gentle standing pelvic extensions.
              </p>
            </div>

            <div className="text-[11px] text-teal-400 font-semibold pt-1">
              Restores 100% capillary endoneurial perfusion
            </div>
          </div>
        </div>

        {showDecompressionPrompt && (
          <div className="p-4 rounded-2xl bg-teal-500 text-slate-950 font-bold text-xs flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>
                Micro-Break Triggered! Stand up, retract neck & stretch hips for 30 seconds.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleStartTimer(timerDurationMin)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 text-white font-black text-xs hover:bg-slate-900 transition-all"
            >
              Restart {timerDurationMin}m Loop
            </button>
          </div>
        )}
      </div>

      {/* Visual Illustrated Posture Comparison */}
      <ErgonomicPostureDiagrams />

      {/* =========================================================================
          SECTION 2: INTERACTIVE SLEEP & NOCTURNAL NERVE UNLOADING STATION
          ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Nocturnal Biomechanics
                </span>
                <span className="text-xs text-slate-400">
                  Preventing Morning Shock & Numbness
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Interactive Sleep Posture & Pillow Alignment Guide
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setSelectedSleepPosition('side')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedSleepPosition === 'side'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Side Sleeper (Best)
            </button>

            <button
              type="button"
              onClick={() => setSelectedSleepPosition('back')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedSleepPosition === 'back'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Back (Supine)
            </button>

            <button
              type="button"
              onClick={() => setSelectedSleepPosition('stomach')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedSleepPosition === 'stomach'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              Stomach (Danger)
            </button>
          </div>
        </div>

        {/* Dynamic Sleep Details Card */}
        {selectedSleepPosition === 'side' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-teal-950/20 border border-teal-800/30 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between text-teal-300 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Optimal Configuration for Radiculopathy & Disc Herniations</span>
              </span>
              <span className="text-[11px] text-teal-400 font-mono">
                Lumbar Torsion Risk: LOW (0.2 Nm)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <strong className="text-white flex items-center gap-1">
                  1. Pillow Height Rule (Neutral Cervical Line):
                </strong>
                <p className="text-slate-300">
                  The pillow height must exactly fill the gap between the tip of your shoulder and your ear. If too high or too low, exiting C5-C8 foramina are pinched all night.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <strong className="text-white flex items-center gap-1">
                  2. Pillow Between Knees & Ankles:
                </strong>
                <p className="text-slate-300">
                  Crucial! Prevents top leg from dropping forward and twisting the L4-S1 disc segments. Reduces sciatic nerve traction by up to 60%.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedSleepPosition === 'back' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-sky-950/20 border border-sky-800/30 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between text-sky-300 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Excellent for Facet Joint Decompression & Spinal Symmetry</span>
              </span>
              <span className="text-[11px] text-sky-400 font-mono">
                Neural Foramen Clearance: +18%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <strong className="text-white flex items-center gap-1">
                  1. Bolster Under Knees (Slight Hip Flexion):
                </strong>
                <p className="text-slate-300">
                  Placing a firm pillow under knees flexes hips 20-30°, flattening the lumbar curve and decompressing crowded posterior spinal canals.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <strong className="text-white flex items-center gap-1">
                  2. Cervical Roll Under Neck (Not Head):
                </strong>
                <p className="text-slate-300">
                  Support the natural C-curve of the neck with a small rolled towel or cervical contour pillow rather than elevating the back of the skull.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedSleepPosition === 'stomach' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/30 border border-rose-800/40 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between text-rose-300 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>High Flare-Up Trigger: 90° Neck Torsion & Lumbar Hyperextension</span>
              </span>
              <span className="text-[11px] text-rose-400 font-mono">
                Radiculopathy Hazard: HIGH
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <p className="text-rose-200">
                Sleeping on your stomach forces your head into maximum rotation (turned fully to one side) for 6 to 8 hours. This compresses exiting cervical roots on the rotated side and hyperextends lumbar facet joints.
              </p>
              <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/50 text-[11px] text-rose-300">
                <strong>How to Transition:</strong> Place a body pillow alongside your torso to prevent your body from rolling onto your stomach during deep sleep.
              </div>
            </div>
          </div>
        )}

        {/* Bedside 2-Minute Morning Awakening Routine */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>2-Minute Morning Awakening Protocol (Before Putting Feet on Floor)</span>
          </div>
          <p className="text-xs text-slate-300">
            During sleep, spinal discs absorb fluid and swell (nocturnal imbibition), making them most vulnerable to herniation in the first 15 minutes of standing. Perform these 3 moves in bed:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-teal-300 block">1. Ankle Pumps (15 reps)</span>
              <span className="text-slate-400 text-[11px]">
                Activates calf muscle pump to jumpstart lower body venous & capillary blood flow.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-teal-300 block">2. Gentle Pelvic Tilts (8 reps)</span>
              <span className="text-slate-400 text-[11px]">
                Gently flattens lumbar spine to mobilize facet joints without gravitational loading.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-teal-300 block">3. Log-Roll to Sit</span>
              <span className="text-slate-400 text-[11px]">
                Roll entire body onto your side first, then swing legs off the edge while pushing up with arms.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: DRIVING & COMMUTING ERGONOMICS
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 text-amber-400">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Car Driving & Sciatica Protection
              </h3>
              <span className="text-[11px] text-slate-400">
                Stopping bucket-seat nerve compression
              </span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Remove Back-Pocket Wallet / Phone:
              </span>
              <p className="text-slate-400">
                Sitting on even a slim wallet tilts the pelvis into unilateral obliquity, directly compressing the sciatic nerve against the piriformis tendon.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Incline Seat Back to 100°-110°:
              </span>
              <p className="text-slate-400">
                A slight recline off 90° reduces intradiscal pressure by 25%. Place a firm lumbar roll in the small of your back.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Autonomic Down-Regulation */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 text-purple-400">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Autonomic Down-Regulation
              </h3>
              <span className="text-[11px] text-slate-400">
                Calming dorsal root ganglion hypersensitivity
              </span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 4-7-8 Parasympathetic Reset:
              </span>
              <p className="text-slate-400">
                Inhale 4s through nose, hold 7s, exhale 8s with pursed lips. Blunts sympathetic fight-or-flight signaling that amplifies neuropathic burning.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Ice vs. Heat Strategy:
              </span>
              <p className="text-slate-400">
                Use <strong>Cryo-Ice</strong> over spine during acute stabbing/burning flares (quenches inflammation). Use <strong>Moist Warmth</strong> over tight trap/lumbar muscles to relieve chronic spasms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
