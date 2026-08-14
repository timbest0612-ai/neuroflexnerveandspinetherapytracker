import React, { useState } from 'react';
import { BodyZone, SymptomLog, SymptomType, SymptomZoneEntry } from '../types';
import {
  Activity,
  Plus,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  Calendar,
  AlertCircle,
  Sparkles,
  Zap,
  Trash2,
} from 'lucide-react';

interface Props {
  logs: SymptomLog[];
  onAddLog: (log: SymptomLog) => void;
  onDeleteLog: (id: string) => void;
  onLaunchTailoredRoutine: (zones: BodyZone[]) => void;
}

const AVAILABLE_ZONES: { id: BodyZone; label: string }[] = [
  { id: 'cervical_neck', label: 'Cervical Neck' },
  { id: 'shoulders_traps', label: 'Shoulders & Traps' },
  { id: 'arms_hands', label: 'Arms & Hands' },
  { id: 'thoracic_back', label: 'Thoracic Mid-Back' },
  { id: 'lumbar_spine', label: 'Lumbar Lower Back' },
  { id: 'hips_glutes', label: 'Hips & Glutes' },
  { id: 'legs_feet', label: 'Legs, Sciatic & Feet' },
];

const AVAILABLE_SYMPTOMS: { id: SymptomType; label: string; icon: string }[] = [
  { id: 'tingling_pins', label: 'Pins & Needles (Tingling)', icon: '⚡' },
  { id: 'numbness', label: 'Numbness / Loss of Sensation', icon: '❄️' },
  { id: 'burning_nerve', label: 'Burning Nerve Fire', icon: '🔥' },
  { id: 'sharp_shooting', label: 'Electric / Shooting Pain', icon: '⚡' },
  { id: 'deep_ache', label: 'Deep Degenerative Ache', icon: '🦴' },
  { id: 'muscle_weakness', label: 'Weakness / Clumsy Grip', icon: '🖐️' },
  { id: 'stiffness_reduced_rom', label: 'Morning Joint Stiffness', icon: '🔒' },
];

export const SymptomTrackerView: React.FC<Props> = ({
  logs,
  onAddLog,
  onDeleteLog,
  onLaunchTailoredRoutine,
}) => {
  const [overallSeverity, setOverallSeverity] = useState<number>(4);
  const [selectedZones, setSelectedZones] = useState<BodyZone[]>([
    'cervical_neck',
    'arms_hands',
    'lumbar_spine',
    'legs_feet',
  ]);
  const [activeSymptoms, setActiveSymptoms] = useState<SymptomType[]>([
    'tingling_pins',
    'deep_ache',
  ]);
  const [centralizationStatus, setCentralizationStatus] = useState<
    'centralized' | 'unchanged' | 'peripheralized'
  >('centralized');
  const [functionalImpact, setFunctionalImpact] = useState<
    'mild' | 'moderate' | 'severe'
  >('moderate');
  const [logNotes, setLogNotes] = useState<string>('');
  const [isSavedSuccess, setIsSavedSuccess] = useState<boolean>(false);

  const toggleZone = (zone: BodyZone) => {
    if (selectedZones.includes(zone)) {
      if (selectedZones.length > 1) {
        setSelectedZones(selectedZones.filter((z) => z !== zone));
      }
    } else {
      setSelectedZones([...selectedZones, zone]);
    }
  };

  const toggleSymptom = (symptom: SymptomType) => {
    if (activeSymptoms.includes(symptom)) {
      setActiveSymptoms(activeSymptoms.filter((s) => s !== symptom));
    } else {
      setActiveSymptoms([...activeSymptoms, symptom]);
    }
  };

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    const zoneEntries: SymptomZoneEntry[] = selectedZones.map((zone) => ({
      zone,
      severity: overallSeverity,
      symptoms: activeSymptoms,
    }));

    const newLog: SymptomLog = {
      id: 'log-' + Date.now(),
      date: new Date().toISOString(),
      overallSeverity,
      zones: zoneEntries,
      centralizationStatus,
      functionalImpact,
      notes: logNotes,
    };

    onAddLog(newLog);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 3000);
  };

  const latestLog = logs[0];
  const previousLog = logs[1];
  const severityTrend =
    latestLog && previousLog
      ? latestLog.overallSeverity - previousLog.overallSeverity
      : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4" />
              <span>Nerve Irritation & Degenerative Pain Journal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Symptom & Centralization Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Track how degenerative changes in your neck and spine affect nerve conduction in your hands and legs. Watch for "Centralization"—symptoms retreating toward the spine center.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          {latestLog && (
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Latest Score
                </span>
                <span className="text-xl font-black text-white">
                  {latestLog.overallSeverity}/10
                </span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Trend
                </span>
                {severityTrend < 0 ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                    <TrendingDown className="w-3.5 h-3.5" /> -{Math.abs(severityTrend)} Pts
                  </span>
                ) : severityTrend > 0 ? (
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> +{severityTrend} Pts
                  </span>
                ) : (
                  <span className="text-xs font-bold text-teal-400">Stable</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Entry Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-400" />
              <span>Log Today's Nerve & Spine Status</span>
            </h2>
            <span className="text-xs text-slate-400">
              {new Date().toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <form onSubmit={handleSubmitLog} className="space-y-5">
            {/* Severity Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200">
                  Overall Irritability / Discomfort:
                </label>
                <span className="text-sm font-black text-teal-300">
                  {overallSeverity} / 10
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={overallSeverity}
                onChange={(e) => setOverallSeverity(Number(e.target.value))}
                className="w-full accent-teal-400 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>0 (Calm / Pain-Free)</span>
                <span>5 (Moderate Tingling/Ache)</span>
                <span>10 (Severe Flare-Up)</span>
              </div>
            </div>

            {/* Affected Body Zones */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                Active Nerve Irritation Zones (Select all that apply):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_ZONES.map((zone) => {
                  const isSelected = selectedZones.includes(zone.id);
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => toggleZone(zone.id)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/60 font-bold'
                          : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {zone.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Symptom Types */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                Sensations Experienced Today:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_SYMPTOMS.map((symptom) => {
                  const isSelected = activeSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-slate-800 border-teal-400/80 text-white font-semibold shadow-sm'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="text-sm">{symptom.icon}</span>
                      <span className="truncate">{symptom.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Centralization Indicator */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Centralization Phenomenon (Clinical Key Indicator)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Are radiating sensations moving closer to the neck/back spine (Centralized) or spreading further down fingers/toes (Peripheralized)?
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCentralizationStatus('centralized')}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all text-center ${
                    centralizationStatus === 'centralized'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  🟢 Centralizing (Retreating to spine)
                </button>
                <button
                  type="button"
                  onClick={() => setCentralizationStatus('unchanged')}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all text-center ${
                    centralizationStatus === 'unchanged'
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  ⚪ Stable / Same
                </button>
                <button
                  type="button"
                  onClick={() => setCentralizationStatus('peripheralized')}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all text-center ${
                    centralizationStatus === 'peripheralized'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  🔴 Peripheralizing (Extending out)
                </button>
              </div>
            </div>

            {/* Free Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Daily Notes / Ergonomic Triggers:
              </label>
              <textarea
                rows={2}
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                placeholder="e.g., Sitting at desk triggered thumb tingling; relieved by McKenzie chin tucks..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save Daily Symptom Log</span>
              </button>

              <button
                type="button"
                onClick={() => onLaunchTailoredRoutine(selectedZones)}
                className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-teal-400" />
                <span>Start Matching Routine</span>
              </button>
            </div>

            {isSavedSuccess && (
              <p className="text-xs text-emerald-400 text-center font-bold animate-fade-in">
                ✓ Symptom log recorded successfully!
              </p>
            )}
          </form>
        </div>

        {/* History & Trend Insights */}
        <div className="lg:col-span-5 space-y-5">
          {/* Centralization Education Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>The Centralization Rule</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When degenerative spinal discs or stenosis irritate nerve roots, pain radiates down into the hands or legs (<strong>peripheralization</strong>).
            </p>
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 space-y-1">
              <span className="font-bold block">✨ Centralization Success Sign:</span>
              <span>
                If leg numbness retreats back up into the buttock, or hand tingling moves up into the neck, the nerve root is being freed! Even if the neck or back feels temporarily sore, this is clinical proof of recovery.
              </span>
            </div>
          </div>

          {/* Past Logs List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>Recent Symptom Entries</span>
              </span>
              <span className="text-xs text-slate-400 font-normal">
                {logs.length} Total Logs
              </span>
            </h3>

            {logs.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No logs recorded yet. Submit your first daily assessment above!
              </div>
            ) : (
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {logs.slice(0, 10).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">
                        {new Date(log.date).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            log.overallSeverity <= 3
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : log.overallSeverity <= 6
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          Irritability: {log.overallSeverity}/10
                        </span>
                        <button
                          type="button"
                          onClick={() => onDeleteLog(log.id)}
                          className="text-slate-600 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {log.zones.map((z, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300"
                        >
                          {z.zone.replace('_', ' ')}
                        </span>
                      ))}
                    </div>

                    {log.notes && (
                      <p className="text-[11px] text-slate-400 italic">
                        "{log.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
