import React from 'react';
import { SvgAnimationType } from '../types';

interface Props {
  type: SvgAnimationType;
  className?: string;
  isPaused?: boolean;
}

export const ExerciseIllustration: React.FC<Props> = ({
  type,
  className = 'w-full h-48',
  isPaused = false,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 overflow-hidden select-none p-2 ${className}`}
    >
      {/* Grid background & glow for high-tech medical visualization */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Render the specialized SVG for the exercise animation type */}
      {renderSvgByType(type, isPaused)}

      {/* Live Motion Guide Indicator Badge */}
      <div className="absolute bottom-2 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-sm text-[10px] font-medium text-teal-400">
        <span
          className={`w-1.5 h-1.5 rounded-full bg-teal-400 ${
            isPaused ? 'opacity-50' : 'animate-ping'
          }`}
        />
        <span>Motion Simulation</span>
      </div>
    </div>
  );
};

function renderSvgByType(type: SvgAnimationType, isPaused: boolean) {
  const pauseClass = isPaused ? 'style-paused' : '';

  switch (type) {
    case 'cervical_chin_tuck':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          <defs>
            <linearGradient id="nerveGlowCervical" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          {/* Torso & Shoulder Base */}
          <path d="M 80 150 Q 120 135 160 150 L 160 175 L 80 175 Z" fill="#334155" />
          <line x1="120" y1="135" x2="120" y2="90" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
          {/* Animated Cervical Spine Segment */}
          <g className="animate-[chinTuck_3.2s_ease-in-out_infinite]">
            {/* Cervical Vertebrae Dots */}
            <circle cx="120" cy="115" r="4.5" fill="#38bdf8" />
            <circle cx="120" cy="100" r="4.5" fill="#38bdf8" />
            <circle cx="120" cy="85" r="4.5" fill="#38bdf8" />
            {/* Neck & Head Profile */}
            <circle cx="120" cy="62" r="28" fill="#475569" stroke="#94a3b8" strokeWidth="2.5" />
            {/* Nose/Face Direction Indicator (facing right) */}
            <path d="M 144 58 L 156 65 L 144 70" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            {/* Chin Marker */}
            <circle cx="140" cy="78" r="3.5" fill="#38bdf8" />
            {/* Brain/Neural Axis */}
            <path d="M 115 50 Q 125 50 125 60 Q 125 85 120 115" fill="none" stroke="url(#nerveGlowCervical)" strokeWidth="3.5" strokeDasharray="3 3" />
          </g>
          {/* Directional Guide Arrows */}
          <path d="M 160 62 L 138 62 M 144 57 L 138 62 L 144 67" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="120" y="168" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Horizontal Retraction (Double Chin)
          </text>
        </svg>
      );

    case 'median_nerve_glide':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Spine & Head with synchronized tilt */}
          <g className="animate-[headTiltRight_3s_ease-in-out_infinite]">
            <circle cx="100" cy="50" r="16" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            <line x1="100" y1="66" x2="100" y2="125" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
          </g>
          {/* Left Rest Arm */}
          <line x1="96" y1="80" x2="70" y2="120" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          {/* Right Arm & Wrist Flossing Motion */}
          <g className="animate-[medianArmReach_3s_ease-in-out_infinite]">
            {/* Shoulder to elbow */}
            <line x1="104" y1="80" x2="145" y2="85" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            {/* Elbow to wrist */}
            <line x1="145" y1="85" x2="185" y2="80" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            {/* Palm & Wrist extended (tray position) */}
            <path d="M 185 80 L 195 70 L 202 74 L 192 85 Z" fill="#2dd4bf" stroke="#14b8a6" strokeWidth="1.5" />
            {/* Open Fingers */}
            <line x1="195" y1="70" x2="208" y2="64" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="198" y1="72" x2="210" y2="68" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="200" y1="74" x2="209" y2="73" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" />
            {/* Pulsing Median Nerve Trail (Yellow/Teal) */}
            <path d="M 104 75 Q 145 80 185 78 Q 195 72 208 65" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="4 3" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Arm Reach + Head Tilt Toward Same Shoulder
          </text>
        </svg>
      );

    case 'ulnar_nerve_glide':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Head & Body */}
          <circle cx="120" cy="55" r="18" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          {/* Eyes representation */}
          <circle cx="114" cy="54" r="3" fill="#38bdf8" />
          <circle cx="126" cy="54" r="3" fill="#38bdf8" />
          <path d="M 90 150 Q 120 135 150 150 L 150 170 L 90 170 Z" fill="#334155" />
          {/* Eyeglasses loop hand animation */}
          <g className="animate-[ulnarEyeglasses_3s_ease-in-out_infinite]">
            {/* Arm up to eye */}
            <path d="M 135 85 Q 165 95 155 65 Q 145 50 132 52" fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            {/* The OK circle around eye */}
            <circle cx="126" cy="54" r="8" fill="none" stroke="#2dd4bf" strokeWidth="3" />
            {/* Outer pinky & ring fingers pointing outward */}
            <path d="M 134 52 L 146 45 M 134 56 L 148 53 M 132 60 L 146 62" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
            {/* Ulnar Nerve Line */}
            <path d="M 120 70 Q 155 85 145 55" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 3" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            "OK" Circle Inverted Over Eye (Ulnar Floss)
          </text>
        </svg>
      );

    case 'sciatic_nerve_slider':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Sturdy Chair */}
          <path d="M 85 105 L 85 155 M 120 105 L 120 155 M 80 105 L 125 105 M 80 60 L 80 105" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
          {/* Synchronized Head, Spine & Knee Extension */}
          <g className="animate-[sciaticSlider_3.5s_ease-in-out_infinite]">
            {/* Head (tilts back when leg straightens) */}
            <circle cx="95" cy="50" r="13" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            {/* Torso */}
            <line x1="96" y1="63" x2="105" y2="105" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            {/* Thigh on seat */}
            <line x1="105" y1="105" x2="135" y2="105" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            {/* Moving Lower Leg & Foot */}
            <line x1="135" y1="105" x2="175" y2="105" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            {/* Foot pointing up */}
            <path d="M 175 105 L 175 92" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
            {/* Glowing Sciatic Nerve Pathway */}
            <path d="M 96 60 Q 105 95 125 105 Q 145 105 175 98" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="4 3" />
          </g>
          <text x="120" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Knee Extends + Head Tilts Back Simultaneously
          </text>
        </svg>
      );

    case 'mckenzie_pressup':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Floor line */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          {/* Legs resting flat on floor */}
          <line x1="45" y1="136" x2="105" y2="136" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
          {/* Animated Torso Arching into Extension */}
          <g className="animate-[mckenzieArch_3s_ease-in-out_infinite]">
            {/* Hands on ground */}
            <circle cx="135" cy="136" r="4" fill="#64748b" />
            {/* Arms pressing up */}
            <line x1="135" y1="136" x2="142" y2="95" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            {/* Lumbar & Thoracic Spine curve */}
            <path d="M 105 136 Q 125 132 145 92 Q 155 75 165 70" fill="none" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />
            {/* Head looking forward */}
            <circle cx="170" cy="65" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            {/* Nerve Centralization Arrows (inward toward spine) */}
            <path d="M 80 120 L 105 120 M 98 116 L 105 120 L 98 124" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Arms Press Chest Up • Hips & Low Back Stay Relaxed
          </text>
        </svg>
      );

    case 'cat_cow_segmental':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Ground */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" strokeWidth="3" />
          {/* Arms and Knees on ground */}
          <line x1="165" y1="140" x2="165" y2="95" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
          <line x1="75" y1="140" x2="75" y2="95" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
          {/* Animated Spine Wave */}
          <g className="animate-[catCowWave_4s_ease-in-out_infinite]">
            <path d="M 75 95 Q 120 60 165 95" fill="none" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            <circle cx="180" cy="105" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            {/* Segmental Dots */}
            <circle cx="95" cy="80" r="3.5" fill="#2dd4bf" />
            <circle cx="120" cy="70" r="3.5" fill="#2dd4bf" />
            <circle cx="145" cy="80" r="3.5" fill="#2dd4bf" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Segmental Spinal Articulation & Disc Hydration
          </text>
        </svg>
      );

    case 'tendon_glide_hands':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Forearm */}
          <line x1="120" y1="145" x2="120" y2="95" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
          {/* Hand Knuckles */}
          <circle cx="120" cy="90" r="14" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          {/* Animated Fingers transitioning between positions */}
          <g className="animate-[tendonGlideCycle_4s_ease-in-out_infinite]">
            {/* Thumb */}
            <path d="M 108 90 L 98 80 L 104 74" fill="none" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
            {/* 4 Fingers articulating */}
            <line x1="114" y1="80" x2="114" y2="45" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="119" y1="78" x2="119" y2="40" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="124" y1="78" x2="124" y2="42" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="129" y1="80" x2="129" y2="50" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          </g>
          <text x="120" y="168" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Straight • Tabletop • Hook • Fist (Tendon Sheath Clearance)
          </text>
        </svg>
      );

    case 'wall_angels_scapular':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Wall reference line */}
          <line x1="40" y1="20" x2="40" y2="160" stroke="#334155" strokeWidth="3" />
          {/* Body back against wall */}
          <circle cx="120" cy="45" r="14" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <line x1="120" y1="59" x2="120" y2="135" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
          {/* Sliding Wings (W to Y shape) */}
          <g className="animate-[wallAngelArms_3.5s_ease-in-out_infinite]">
            {/* Left Arm */}
            <path d="M 120 70 L 90 90 L 80 50" fill="none" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
            {/* Right Arm */}
            <path d="M 120 70 L 150 90 L 160 50" fill="none" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Scapular Glide • Thoracic Extension & Outlet Opening
          </text>
        </svg>
      );

    case 'piriformis_stretch':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Floor */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" strokeWidth="3" />
          {/* Supine body */}
          <circle cx="60" cy="132" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <line x1="72" y1="135" x2="120" y2="135" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
          {/* Figure 4 Crossing with Gentle Hug */}
          <g className="animate-[figureFourPulse_3.5s_ease-in-out_infinite]">
            {/* Bottom Leg Bent */}
            <path d="M 120 135 L 140 95 L 175 105" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            {/* Crossed Top Leg */}
            <path d="M 120 135 L 140 115 L 130 95" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            {/* Sciatic deep release star */}
            <circle cx="125" cy="125" r="5" fill="#f59e0b" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Supine Figure-4 • Sciatic Notch Decompression
          </text>
        </svg>
      );

    case 'bird_dog_stabilization':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Ground */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" strokeWidth="3" />
          {/* Supporting arm and supporting knee */}
          <line x1="150" y1="140" x2="150" y2="95" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <line x1="90" y1="140" x2="90" y2="95" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          {/* Stable neutral spine box */}
          <rect x="90" y="85" width="60" height="15" rx="3" fill="#1e293b" stroke="#2dd4bf" strokeWidth="1.5" />
          <text x="120" y="96" textAnchor="middle" fill="#2dd4bf" fontSize="7" fontWeight="bold">LUMBAR LOCKED</text>
          {/* Animated reaching opposite arm & extending leg */}
          <g className="animate-[birdDogReach_3.5s_ease-in-out_infinite]">
            {/* Extended right arm */}
            <line x1="150" y1="90" x2="200" y2="90" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            <circle cx="202" cy="90" r="3" fill="#38bdf8" />
            {/* Extended left leg */}
            <line x1="90" y1="90" x2="40" y2="90" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            <circle cx="38" cy="90" r="3" fill="#38bdf8" />
            {/* Head neutral */}
            <circle cx="160" cy="85" r="10" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            {/* Core anti-rotation arrows */}
            <circle cx="120" cy="90" r="16" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Reach Opposite Arm + Leg • Zero Sagging in Low Back
          </text>
        </svg>
      );

    case 'deadbug_isometric':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Floor */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" strokeWidth="3" />
          {/* Supine torso flat on ground */}
          <circle cx="65" cy="132" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <line x1="77" y1="135" x2="140" y2="135" stroke="#2dd4bf" strokeWidth="8" strokeLinecap="round" />
          <text x="110" y="130" textAnchor="middle" fill="#2dd4bf" fontSize="7" fontWeight="bold">LOW BACK PRESSED TO FLOOR</text>
          {/* Animated diagonal limb lower */}
          <g className="animate-[deadbugDiagonal_3.5s_ease-in-out_infinite]">
            {/* Left arm up */}
            <line x1="85" y1="135" x2="85" y2="80" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
            {/* Right arm lowering */}
            <line x1="85" y1="135" x2="50" y2="110" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            {/* Right knee bent 90 */}
            <polyline points="140,135 140,95 170,95" fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Left leg extending */}
            <line x1="140" y1="135" x2="190" y2="120" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Dead Bug • Maintain Flat Lumbar Contact with Floor
          </text>
        </svg>
      );

    case 'cervical_lateral_glide':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Shoulders locked level */}
          <line x1="60" y1="140" x2="180" y2="140" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
          {/* Animated Head Shearing Left/Right (Translation, not tilting) */}
          <g className="animate-[cervicalLateralShear_3.5s_ease-in-out_infinite]">
            <circle cx="120" cy="70" r="22" fill="#475569" stroke="#94a3b8" strokeWidth="2.5" />
            {/* Eyes level */}
            <line x1="110" y1="68" x2="130" y2="68" stroke="#38bdf8" strokeWidth="2" />
            {/* Cervical vertebrae sliding laterally */}
            <line x1="120" y1="92" x2="120" y2="136" stroke="#2dd4bf" strokeWidth="6" strokeLinecap="round" />
            <circle cx="120" cy="100" r="3.5" fill="#f59e0b" />
            <circle cx="120" cy="115" r="3.5" fill="#f59e0b" />
            <circle cx="120" cy="128" r="3.5" fill="#f59e0b" />
          </g>
          {/* Level Horizon Arrow */}
          <path d="M 80 70 L 160 70" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Lateral Neck Translation (Keep Eyes Level • No Side-Tilting)
          </text>
        </svg>
      );

    case 'radial_nerve_glide':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Body & Arm reaching down/back with wrist flexion + internal rotation (Waiter's tip) */}
          <circle cx="90" cy="50" r="16" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <line x1="90" y1="66" x2="90" y2="135" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
          {/* Animated Waiter's Tip Floss */}
          <g className="animate-[radialWaiterTip_3s_ease-in-out_infinite]">
            {/* Arm extends down and back */}
            <line x1="95" y1="80" x2="140" y2="115" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            {/* Forearm turned inward & wrist flexed down */}
            <polyline points="140,115 175,135 170,150" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Radial nerve pathway along back of forearm to thumb */}
            <path d="M 90 75 Q 130 100 165 130 Q 170 145 168 152" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="3 3" />
          </g>
          <text x="120" y="168" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Arm Down & Back • Forearm Inward • Wrist Flexed (Radial Floss)
          </text>
        </svg>
      );

    case 'femoral_nerve_glide':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Prone floor line */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" strokeWidth="3" />
          {/* Prone body */}
          <circle cx="175" cy="132" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <line x1="165" y1="135" x2="95" y2="135" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
          {/* Animated knee bend + head tilt synchronization */}
          <g className="animate-[femoralNerveGlide_3.5s_ease-in-out_infinite]">
            {/* Bending knee bringing heel to buttock */}
            <polyline points="95,135 60,110 75,75" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Femoral nerve trail down front of thigh */}
            <path d="M 110 135 Q 80 125 70 95" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="3 3" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Prone Knee Flexion • Femoral Nerve Anterior Slider
          </text>
        </svg>
      );

    case 'pelvic_tilt_decompression':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Floor */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" strokeWidth="3" />
          {/* Supine head & upper back */}
          <circle cx="60" cy="132" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <line x1="72" y1="135" x2="110" y2="135" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
          {/* Knees bent */}
          <polyline points="135,135 155,95 180,140" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Animated Lumbar Flattening / Tilting */}
          <g className="animate-[pelvicTiltWave_3s_ease-in-out_infinite]">
            <path d="M 105 135 Q 120 120 135 135" fill="none" stroke="#2dd4bf" strokeWidth="6" strokeLinecap="round" />
            <circle cx="120" cy="130" r="4" fill="#38bdf8" />
            {/* Pressure vectors down */}
            <path d="M 120 115 L 120 128 M 116 122 L 120 128 L 124 122" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Flatten Low Back Into Floor • Decompress Lumbar Facets
          </text>
        </svg>
      );

    case 'bridge_glute_support':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Floor */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" strokeWidth="3" />
          <circle cx="55" cy="132" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          {/* Animated Bridge Rise */}
          <g className="animate-[bridgeRise_3.5s_ease-in-out_infinite]">
            {/* Diagonal Torso Line (Knee to Shoulder straight line) */}
            <line x1="68" y1="135" x2="135" y2="90" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />
            {/* Thighs & Feet */}
            <line x1="135" y1="90" x2="175" y2="140" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            {/* Glute Activation Glow */}
            <circle cx="125" cy="98" r="8" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="125" y="101" textAnchor="middle" fill="#fef08a" fontSize="6.5" fontWeight="bold">GLUTE DRIVE</text>
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Squeeze Glutes to Lift Hips • Zero Hyperextension in Lumbar
          </text>
        </svg>
      );

    case 'ankle_pump_tibial':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Lower Leg */}
          <line x1="80" y1="110" x2="145" y2="110" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
          {/* Heel */}
          <circle cx="145" cy="110" r="8" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Animated Foot Dorsiflexion / Plantarflexion */}
          <g className="animate-[anklePumpArc_2.5s_ease-in-out_infinite]">
            <path d="M 145 110 L 175 90 L 185 96" fill="none" stroke="#2dd4bf" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Tibial nerve trace down calf to sole */}
            <path d="M 80 106 Q 120 106 145 112 Q 160 105 180 92" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Ankle Dorsiflex / Point • Tibial Nerve Micro-Pump & Perfusion
          </text>
        </svg>
      );

    case 'thoracic_open_book':
      return (
        <svg viewBox="0 0 240 180" className={`w-full h-full max-h-44 ${pauseClass}`}>
          {/* Floor */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" strokeWidth="3" />
          {/* Side-lying knees bent 90 */}
          <circle cx="65" cy="132" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <line x1="75" y1="135" x2="120" y2="135" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
          <polyline points="120,135 140,105 170,105" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Bottom Arm Flat */}
          <line x1="85" y1="135" x2="135" y2="135" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          {/* Animated Top Arm Opening in Arc */}
          <g className="animate-[openBookArc_4s_ease-in-out_infinite]">
            <line x1="85" y1="135" x2="45" y2="90" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            <circle cx="43" cy="88" r="4" fill="#38bdf8" />
            {/* Thoracic rotation swirl */}
            <path d="M 85 125 A 25 25 0 0 0 75 100" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="3 3" />
          </g>
          <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
            Thoracic Open Book • Ribcage Rotation Without Pelvic Twist
          </text>
        </svg>
      );
  }
}
