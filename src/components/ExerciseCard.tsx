import React from 'react';
import { Exercise } from '../types';
import { Play, Info, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { ExerciseIllustration } from './ExerciseIllustration';

interface Props {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
  onQuickStart: (exercise: Exercise) => void;
}

export const ExerciseCard: React.FC<Props> = ({
  exercise,
  onSelect,
  onQuickStart,
}) => {
  const getCategoryColor = (category: Exercise['category']) => {
    switch (category) {
      case 'nerve_glide':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
      case 'spinal_decompression':
        return 'bg-sky-500/10 text-sky-300 border-sky-500/30';
      case 'core_stabilization':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'postural_restoration':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'hand_dexterity':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600';
    }
  };

  const getCategoryLabel = (category: Exercise['category']) => {
    switch (category) {
      case 'nerve_glide':
        return 'Nerve Flossing / Slider';
      case 'spinal_decompression':
        return 'Spinal Decompression';
      case 'core_stabilization':
        return 'Spine Stabilization';
      case 'postural_restoration':
        return 'Postural Alignment';
      case 'hand_dexterity':
        return 'Hand & Tendon Glide';
    }
  };

  return (
    <div className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-teal-500/5">
      {/* Visual illustration / animation banner */}
      <div
        onClick={() => onSelect(exercise)}
        className="cursor-pointer relative overflow-hidden"
      >
        <ExerciseIllustration
          type={exercise.animationType}
          className="w-full h-36"
        />
        {/* Quick category chip */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-md shadow-sm ${getCategoryColor(
              exercise.category
            )}`}
          >
            {getCategoryLabel(exercise.category)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onSelect(exercise)}
              className="text-base font-bold text-white group-hover:text-teal-300 transition-colors cursor-pointer"
            >
              {exercise.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
            {exercise.subtitle}
          </p>

          {/* Nerve Tag Pills */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {exercise.targetNerves.slice(0, 2).map((nerve) => (
              <span
                key={nerve}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/80"
              >
                {nerve}
              </span>
            ))}
          </div>
        </div>

        {/* Reps & Duration Info Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            {exercise.durationSec}s Guided
          </span>
          <span className="text-[11px] text-slate-300 font-medium truncate max-w-[150px]">
            {exercise.repsText}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onSelect(exercise)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Form Guide</span>
          </button>
          <button
            type="button"
            onClick={() => onQuickStart(exercise)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Practice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
