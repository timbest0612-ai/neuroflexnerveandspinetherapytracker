import React from 'react';
import { Exercise } from '../types';
import {
  X,
  Play,
  ShieldAlert,
  HelpCircle,
  Wind,
  CheckCircle,
  Sparkles,
  Layers,
  Volume2,
} from 'lucide-react';
import { ExerciseIllustration } from './ExerciseIllustration';
import { audioSystem } from '../utils/audio';

interface Props {
  exercise: Exercise | null;
  onClose: () => void;
  onStartExercise: (exercise: Exercise) => void;
}

export const ExerciseDetailModal: React.FC<Props> = ({
  exercise,
  onClose,
  onStartExercise,
}) => {
  if (!exercise) return null;

  const handleSpeakInstructions = () => {
    const textToSpeak = `${exercise.title}. ${exercise.subtitle}. Setup: ${exercise.setupInstructions.join(
      ' '
    )}. Action steps: ${exercise.actionSteps.join(' ')}. Breathing: ${
      exercise.breathingCue
    }`;
    audioSystem.speak(textToSpeak, true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-6 text-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase">
              {exercise.category.replace('_', ' ')}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              {exercise.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeakInstructions}
              title="Listen to verbal audio guidance"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {/* Animated Illustration Preview */}
          <div>
            <ExerciseIllustration
              type={exercise.animationType}
              className="w-full h-48 sm:h-56"
            />
            <p className="text-xs text-center text-teal-300 mt-2 font-medium bg-slate-950/60 py-1.5 px-3 rounded-lg border border-slate-800">
              💡 {exercise.keyVisualCue}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 block font-medium">Target Nerves</span>
              <span className="text-xs font-semibold text-white truncate block mt-0.5">
                {exercise.targetNerves.join(', ')}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 block font-medium">Prescribed Dose</span>
              <span className="text-xs font-semibold text-white block mt-0.5">
                {exercise.repsText}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 block font-medium">Equipment</span>
              <span className="text-xs font-semibold text-white block mt-0.5">
                {exercise.equipment}
              </span>
            </div>
          </div>

          {/* Step by Step Execution */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400" />
              <span>Step-by-Step Movement Instructions</span>
            </h4>

            {/* Setup */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-teal-300 block mb-1">
                1. Starting Position & Setup:
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                {exercise.setupInstructions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-teal-300 block mb-1">
                2. Execution Flow:
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                {exercise.actionSteps.map((s, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Breathing & Clinical Why */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-800/50 space-y-1">
              <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" />
                Breathing Cadence
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {exercise.breathingCue}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/50 space-y-1">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Clinical Mechanism
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {exercise.clinicalWhy}
              </p>
            </div>
          </div>

          {/* Safety & Red Flags */}
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 space-y-1.5">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Safety Watchouts & Modification
            </span>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
              {exercise.safetyWatchouts.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
            <div className="pt-1 text-xs text-amber-200/90 font-medium">
              <span className="font-bold">Easier Modification: </span>
              {exercise.modificationEasier}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartExercise(exercise);
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Guided Session ({exercise.durationSec}s)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
