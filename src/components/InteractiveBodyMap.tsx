import React, { useState } from 'react';
import { BodyZone } from '../types';
import { ShieldAlert, Sparkles, Activity, CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
  selectedZone: BodyZone | 'all';
  onSelectZone: (zone: BodyZone | 'all') => void;
  activeSymptomsMap?: Record<BodyZone, number>; // zone -> severity
}

const ZONE_INFO: Record<
  BodyZone,
  {
    name: string;
    spinalSegments: string;
    nerves: string[];
    commonSymptoms: string;
    keySolutions: string;
  }
> = {
  cervical_neck: {
    name: 'Cervical Spine & Neck',
    spinalSegments: 'C1 - C7 vertebrae',
    nerves: ['Greater Occipital', 'C4-C7 Nerve Roots', 'Phrenic'],
    commonSymptoms: 'Neck stiffness, occipital headaches, pain turning head, base-of-skull tension.',
    keySolutions: 'McKenzie Cervical Retraction (chin tucks), gentle lateral glide, foraminal unloading.',
  },
  shoulders_traps: {
    name: 'Shoulders & Upper Trapezius',
    spinalSegments: 'C4 - T1 Brachial Plexus roots',
    nerves: ['Suprascapular', 'Dorsal Scapular', 'Axillary'],
    commonSymptoms: 'Burning trap knots, heavy shoulder aching, scapular winging/weakness.',
    keySolutions: 'Scapular retraction, wall angels, postural unloading of the cervical-thoracic junction.',
  },
  arms_hands: {
    name: 'Hands, Wrists & Arms',
    spinalSegments: 'C5, C6, C7, C8, T1',
    nerves: ['Median Nerve', 'Ulnar Nerve', 'Radial Nerve'],
    commonSymptoms: 'Thumb/index tingling, pinky finger numbness (cubital tunnel), dropping objects, clumsy grip.',
    keySolutions: 'Butler Median nerve flossing, Ulnar "eyeglasses" slider, differential tendon gliding.',
  },
  thoracic_back: {
    name: 'Thoracic & Mid Back',
    spinalSegments: 'T1 - T12 vertebrae',
    nerves: ['Intercostal Nerves', 'Sympathetic Chain'],
    commonSymptoms: 'Hyperkyphosis hunching, band-like tightness around ribs, shallow breathing, mid-back burning.',
    keySolutions: 'Thoracic Open-Book rotation, foam roll / extension mobilization, segmental Cat-Cow.',
  },
  lumbar_spine: {
    name: 'Lumbar Spine (Lower Back)',
    spinalSegments: 'L1 - L5 disc segments',
    nerves: ['L1-L5 Nerve Roots', 'Sinuvertebral nerves', 'Cauda equina origin'],
    commonSymptoms: 'Deep lower back ache, discogenic morning stiffness, facet catching during backward bends.',
    keySolutions: 'McKenzie prone press-ups (disc centralization), neutral pelvic tilts, Deadbug stabilization.',
  },
  hips_glutes: {
    name: 'Hips & Deep Glutes',
    spinalSegments: 'L4 - S3 Sacral Plexus',
    nerves: ['Sciatic Nerve', 'Superior/Inferior Gluteal', 'Pudendal'],
    commonSymptoms: 'Deep buttock pinch, piriformis spasm, pain when sitting on firm chairs or driving.',
    keySolutions: 'Figure-4 supine piriformis decompression, glute bridges, seated sciatic sliders.',
  },
  legs_feet: {
    name: 'Legs, Calves & Feet',
    spinalSegments: 'L4, L5, S1, S2',
    nerves: ['Sciatic Nerve', 'Common Peroneal (Fibular)', 'Tibial Nerve', 'Femoral (L2-L4)'],
    commonSymptoms: 'Shooting pain down back of thigh, calf cramps, foot tingling, tripping over toes (foot drop).',
    keySolutions: 'Seated sciatic nerve flossing, prone femoral glides, active ankle pumps & tibial sliders.',
  },
};

export const InteractiveBodyMap: React.FC<Props> = ({
  selectedZone,
  onSelectZone,
  activeSymptomsMap = {} as Record<BodyZone, number>,
}) => {
  const [viewAngle, setViewAngle] = useState<'posterior' | 'anterior'>('posterior');

  const currentZoneData = selectedZone !== 'all' ? ZONE_INFO[selectedZone] : null;

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl text-slate-100">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-semibold flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-teal-400" />
            <span>Interactive Nerve & Spine Map</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a region to view affected spinal nerve pathways & targeted rehabilitation exercises
          </p>
        </div>

        {/* View Toggle (Back vs Front) */}
        <div className="flex items-center rounded-lg bg-slate-800/80 p-1 border border-slate-700/60 text-xs">
          <button
            type="button"
            onClick={() => setViewAngle('posterior')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              viewAngle === 'posterior'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spine & Back View
          </button>
          <button
            type="button"
            onClick={() => setViewAngle('anterior')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              viewAngle === 'anterior'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Front & Arms View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Interactive Anatomical SVG Model (Mobile friendly) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 relative">
          <div className="text-[11px] font-medium text-slate-400 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>Tap any zone to target exercises</span>
          </div>

          <svg
            viewBox="0 0 260 380"
            className="w-full max-w-[240px] h-72 drop-shadow-[0_0_15px_rgba(20,184,166,0.15)]"
          >
            <defs>
              <linearGradient id="spineDegenerationGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="35%" stopColor="#2dd4bf" />
                <stop offset="70%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>

            {/* Head */}
            <g
              onClick={() => onSelectZone('cervical_neck')}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <circle
                cx="130"
                cy="38"
                r="22"
                className={`transition-colors duration-200 ${
                  selectedZone === 'cervical_neck'
                    ? 'fill-teal-500/80 stroke-teal-300 stroke-[3]'
                    : 'fill-slate-800 stroke-slate-600 hover:fill-slate-700'
                }`}
              />
              {/* Brain / Cervical Stem */}
              <circle cx="130" cy="38" r="8" fill="#38bdf8" opacity="0.6" />
            </g>

            {/* Cervical Spine (Neck) */}
            <g
              onClick={() => onSelectZone('cervical_neck')}
              className="cursor-pointer group"
            >
              <rect
                x="118"
                y="58"
                width="24"
                height="24"
                rx="6"
                className={`transition-all duration-200 ${
                  selectedZone === 'cervical_neck'
                    ? 'fill-teal-400 stroke-teal-200 stroke-[2.5]'
                    : 'fill-indigo-600/70 stroke-indigo-400 group-hover:fill-indigo-500'
                }`}
              />
              {/* Cervical nerve branching */}
              <line x1="118" y1="65" x2="95" y2="72" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
              <line x1="142" y1="65" x2="165" y2="72" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
            </g>

            {/* Shoulders & Traps */}
            <g
              onClick={() => onSelectZone('shoulders_traps')}
              className="cursor-pointer group"
            >
              <path
                d="M 80 82 Q 130 75 180 82 L 195 105 L 65 105 Z"
                className={`transition-colors duration-200 ${
                  selectedZone === 'shoulders_traps'
                    ? 'fill-teal-500/80 stroke-teal-300 stroke-[2.5]'
                    : 'fill-slate-800 stroke-slate-600 group-hover:fill-slate-700'
                }`}
              />
            </g>

            {/* Arms & Hands (Left & Right) */}
            <g
              onClick={() => onSelectZone('arms_hands')}
              className="cursor-pointer group"
            >
              {/* Left Arm & Hand */}
              <path
                d="M 65 105 L 48 165 L 38 215 L 48 225 L 56 168 L 72 108 Z"
                className={`transition-colors duration-200 ${
                  selectedZone === 'arms_hands'
                    ? 'fill-teal-400/90 stroke-teal-200 stroke-[2.5]'
                    : 'fill-slate-800/90 stroke-slate-600 group-hover:fill-slate-700'
                }`}
              />
              {/* Right Arm & Hand */}
              <path
                d="M 195 105 L 212 165 L 222 215 L 212 225 L 204 168 L 188 108 Z"
                className={`transition-colors duration-200 ${
                  selectedZone === 'arms_hands'
                    ? 'fill-teal-400/90 stroke-teal-200 stroke-[2.5]'
                    : 'fill-slate-800/90 stroke-slate-600 group-hover:fill-slate-700'
                }`}
              />
              {/* Median & Ulnar nerve pathways in arms */}
              <path d="M 68 105 Q 54 165 42 218" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M 192 105 Q 206 165 218 218" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
            </g>

            {/* Thoracic Back (Mid Spine) */}
            <g
              onClick={() => onSelectZone('thoracic_back')}
              className="cursor-pointer group"
            >
              <path
                d="M 85 105 L 175 105 L 168 155 L 92 155 Z"
                className={`transition-colors duration-200 ${
                  selectedZone === 'thoracic_back'
                    ? 'fill-teal-500/80 stroke-teal-300 stroke-[2.5]'
                    : 'fill-slate-800 stroke-slate-600 group-hover:fill-slate-700'
                }`}
              />
              {/* Thoracic Spine line */}
              <line x1="130" y1="105" x2="130" y2="155" stroke="url(#spineDegenerationGlow)" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Lumbar Spine (Lower Back) */}
            <g
              onClick={() => onSelectZone('lumbar_spine')}
              className="cursor-pointer group"
            >
              <path
                d="M 92 155 L 168 155 L 164 195 L 96 195 Z"
                className={`transition-colors duration-200 ${
                  selectedZone === 'lumbar_spine'
                    ? 'fill-teal-400 stroke-teal-200 stroke-[2.5]'
                    : 'fill-amber-600/70 stroke-amber-400 group-hover:fill-amber-500'
                }`}
              />
              {/* Lumbar Spine vertebrae dots */}
              <circle cx="130" cy="162" r="3" fill="#fef08a" />
              <circle cx="130" cy="172" r="3" fill="#fef08a" />
              <circle cx="130" cy="182" r="3" fill="#fef08a" />
            </g>

            {/* Pelvis / Hips & Glutes */}
            <g
              onClick={() => onSelectZone('hips_glutes')}
              className="cursor-pointer group"
            >
              <path
                d="M 96 195 L 164 195 L 175 235 L 85 235 Z"
                className={`transition-colors duration-200 ${
                  selectedZone === 'hips_glutes'
                    ? 'fill-teal-500/80 stroke-teal-300 stroke-[2.5]'
                    : 'fill-slate-800 stroke-slate-600 group-hover:fill-slate-700'
                }`}
              />
              {/* Sciatic nerve roots emerging from sacrum */}
              <line x1="130" y1="210" x2="110" y2="235" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="130" y1="210" x2="150" y2="235" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
            </g>

            {/* Legs & Feet (Left & Right) */}
            <g
              onClick={() => onSelectZone('legs_feet')}
              className="cursor-pointer group"
            >
              {/* Left Leg */}
              <path
                d="M 88 235 L 122 235 L 118 305 L 115 365 L 95 365 L 92 305 Z"
                className={`transition-colors duration-200 ${
                  selectedZone === 'legs_feet'
                    ? 'fill-teal-400/90 stroke-teal-200 stroke-[2.5]'
                    : 'fill-slate-800/90 stroke-slate-600 group-hover:fill-slate-700'
                }`}
              />
              {/* Right Leg */}
              <path
                d="M 138 235 L 172 235 L 168 305 L 165 365 L 145 365 L 142 305 Z"
                className={`transition-colors duration-200 ${
                  selectedZone === 'legs_feet'
                    ? 'fill-teal-400/90 stroke-teal-200 stroke-[2.5]'
                    : 'fill-slate-800/90 stroke-slate-600 group-hover:fill-slate-700'
                }`}
              />
              {/* Sciatic Nerve branching down into calves */}
              <path d="M 110 235 Q 105 295 105 360" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
              <path d="M 150 235 Q 155 295 155 360" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
            </g>
          </svg>

          {/* Quick Clear / All Button */}
          <button
            type="button"
            onClick={() => onSelectZone('all')}
            className={`mt-2 text-xs px-3 py-1 rounded-full border transition-colors ${
              selectedZone === 'all'
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-semibold'
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            Show All 4 Target Areas
          </button>
        </div>

        {/* Anatomical & Nerve Detail Card */}
        <div className="md:col-span-7 space-y-3">
          {currentZoneData ? (
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {currentZoneData.spinalSegments}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {currentZoneData.name}
                  </h3>
                </div>
                {activeSymptomsMap[selectedZone as BodyZone] ? (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Irritability: {activeSymptomsMap[selectedZone as BodyZone]}/10
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    Target Zone
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-300 mb-1">
                  Connected Nerve Pathways:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentZoneData.nerves.map((nerve) => (
                    <span
                      key={nerve}
                      className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-700 text-xs font-medium text-teal-300"
                    >
                      {nerve}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-slate-200">
                  Degenerative Nerve Symptoms:{' '}
                </span>
                <span className="text-slate-400">{currentZoneData.commonSymptoms}</span>
              </div>

              <div className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
                <span className="font-semibold text-emerald-200">
                  Physical Therapy Focus:{' '}
                </span>
                <span>{currentZoneData.keySolutions}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-3 text-center sm:text-left">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Multi-Segmental Degenerative Coverage</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Degenerative spine conditions (spondylosis, disc bulges, facet joint arthropathy) create tension along the nervous system. By systematically flossing the cervical roots, upper extremity nerves (median, ulnar, radial) and lower extremity nerves (sciatic, femoral), we reduce mechanosensitivity and restore functional coordination across your neck, back, hands, and legs.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                  <span className="font-semibold text-sky-400 block">Upper Chain</span>
                  <span className="text-[11px] text-slate-400">Neck & Hand Tingling Relief</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                  <span className="font-semibold text-amber-400 block">Lower Chain</span>
                  <span className="text-[11px] text-slate-400">Lumbar & Sciatic Decompression</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(
              [
                ['cervical_neck', 'Neck (Cervical)'],
                ['arms_hands', 'Hands & Arms'],
                ['lumbar_spine', 'Low Back (Lumbar)'],
                ['legs_feet', 'Legs & Sciatic'],
              ] as const
            ).map(([zoneKey, label]) => (
              <button
                key={zoneKey}
                type="button"
                onClick={() => onSelectZone(zoneKey)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${
                  selectedZone === zoneKey
                    ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{label}</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
