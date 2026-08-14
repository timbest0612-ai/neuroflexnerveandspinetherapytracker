import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  Droplets,
  Activity,
  Flame,
  Moon,
  Laptop,
  Apple,
  Brain,
  Award,
  TrendingUp,
} from 'lucide-react';

interface HabitItem {
  id: string;
  title: string;
  category: string;
  icon: any;
  iconColor: string;
  purpose: string;
  idealTime: string;
}

const HEALING_HABITS: HabitItem[] = [
  {
    id: 'morning_glide',
    title: 'Morning Nerve Slider Mobility (3-5 mins)',
    category: 'Neural Mobility',
    icon: Activity,
    iconColor: 'text-teal-400',
    purpose: 'Breaks morning perineural stiffness and restores microvascular capillary blood flow after sleep.',
    idealTime: 'Immediately upon getting out of bed',
  },
  {
    id: 'disc_hydration',
    title: 'Hydration Target for Disc Imbibition (2-3 Liters)',
    category: 'Disc Nutrition',
    icon: Droplets,
    iconColor: 'text-sky-400',
    purpose: 'Re-inflates the nucleus pulposus sponge in lumbar and cervical discs.',
    idealTime: 'Throughout the daytime',
  },
  {
    id: 'circulation_walk',
    title: 'Low-Impact Microvascular Walking (15-20 mins)',
    category: 'Vascular Perfusion',
    icon: Flame,
    iconColor: 'text-amber-400',
    purpose: 'Delivers oxygen-rich cardiac output to starving peripheral nerve endings without spinal compression.',
    idealTime: 'Midday or after lunch',
  },
  {
    id: 'posture_breaks',
    title: '30-Minute Ergonomic Micro-Resets',
    category: 'Postural Alignment',
    icon: Laptop,
    iconColor: 'text-indigo-400',
    purpose: 'Interrupts continuous static flexion loading that pushes discs against exiting nerve roots.',
    idealTime: 'During desk work / driving',
  },
  {
    id: 'neuro_nutrition',
    title: 'Neuro-Supportive Nutrition (B12, ALA, Omega-3s)',
    category: 'Myelin Synthesis',
    icon: Apple,
    iconColor: 'text-emerald-400',
    purpose: 'Provides the fatty acids and enzyme co-factors Schwann cells require to rebuild myelin.',
    idealTime: 'With breakfast or dinner',
  },
  {
    id: 'sensory_drill',
    title: 'Sensory Desensitization / Retraining Drill',
    category: 'Brain Plasticity',
    icon: Brain,
    iconColor: 'text-purple-400',
    purpose: 'Reverses cortical sensory smudging in the brain to reduce phantom tingling and burning.',
    idealTime: 'Afternoon quiet time',
  },
  {
    id: 'evening_decompression',
    title: 'Evening 90-90 Zero-G Decompression (10 mins)',
    category: 'Spine Unloading',
    icon: Moon,
    iconColor: 'text-rose-400',
    purpose: 'Relieves intradiscal pressure before sleep, setting the spine up for overnight healing.',
    idealTime: 'Before bedtime',
  },
];

export const DailyHealingHabitsView: React.FC = () => {
  const [completedHabits, setCompletedHabits] = useState<string[]>(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('neuroflex_habits_date');
    if (savedDate === today) {
      const saved = localStorage.getItem('neuroflex_habits_done');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return ['morning_glide', 'disc_hydration'];
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('neuroflex_habit_streak');
    return saved ? parseInt(saved, 10) : 5;
  });

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('neuroflex_habits_date', today);
    localStorage.setItem('neuroflex_habits_done', JSON.stringify(completedHabits));
  }, [completedHabits]);

  const toggleHabit = (id: string) => {
    setCompletedHabits((prev) => {
      if (prev.includes(id)) {
        return prev.filter((h) => h !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const progressPercent = Math.round((completedHabits.length / HEALING_HABITS.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-100 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Multi-Factor Recovery Protocol</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Daily Nerve Healing & Habit Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Nerve restoration is not achieved in a single exercise—it is the cumulative effect of consistent decompression, microvascular oxygenation, myelin nutrition, and neutral posture throughout your day.
            </p>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-amber-500/30 px-4 py-3 rounded-2xl flex-shrink-0">
            <Flame className="w-6 h-6 text-amber-400 fill-current animate-pulse" />
            <div>
              <span className="text-xs text-slate-400 block font-medium">Healing Streak</span>
              <span className="text-lg font-black text-white">{streakDays} Days Strong</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">Today&apos;s Protocol Completion ({todayStr})</span>
            <span className="text-amber-400 font-black">
              {completedHabits.length} of {HEALING_HABITS.length} ({progressPercent}%)
            </span>
          </div>
          <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Habits Checklist */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          The 7 Daily Pillars of Peripheral Nerve Restoration:
        </h2>

        <div className="grid grid-cols-1 gap-2.5">
          {HEALING_HABITS.map((habit) => {
            const isDone = completedHabits.includes(habit.id);
            const Icon = habit.icon;

            return (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  isDone
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-md shadow-emerald-500/5'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    aria-label={isDone ? `Mark ${habit.title} incomplete` : `Mark ${habit.title} complete`}
                    className="mt-0.5 flex-shrink-0"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white leading-snug">
                        {habit.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                        {habit.category}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {habit.purpose}
                    </p>

                    <span className="text-[10px] text-slate-500 block font-medium">
                      ⏰ Ideal Time: {habit.idealTime}
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex-shrink-0 ${habit.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
