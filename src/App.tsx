import React, { useState, useEffect } from 'react';
import {
  BodyZone,
  Exercise,
  RoutineProgram,
  SymptomLog,
  CompletedSession,
} from './types';
import { ALL_EXERCISES } from './data/exercises';
import { CLINICAL_PROGRAMS } from './data/programs';
import { InteractiveBodyMap } from './components/InteractiveBodyMap';
import { ExerciseCard } from './components/ExerciseCard';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { ActiveWorkoutPlayer } from './components/ActiveWorkoutPlayer';
import { SymptomTrackerView } from './components/SymptomTrackerView';
import { AiPtAssistantView } from './components/AiPtAssistantView';
import { ErgonomicTipsView } from './components/ErgonomicTipsView';
import { RedFlagsModal } from './components/RedFlagsModal';
import { ClinicalReportModal } from './components/ClinicalReportModal';
import { NerveCureEducationView } from './components/NerveCureEducationView';
import { NeuroNutritionView } from './components/NeuroNutritionView';
import { SensoryDesensitizationView } from './components/SensoryDesensitizationView';
import { DailyHealingHabitsView } from './components/DailyHealingHabitsView';
import { FlareUpRescueModal } from './components/FlareUpRescueModal';
import { AppDemoGuidedWalkthrough } from './components/AppDemoGuidedWalkthrough';
import { StageRecoveryPathwayView } from './components/StageRecoveryPathwayView';
import { UniversalClinicalSearch } from './components/UniversalClinicalSearch';
import { DelayedFlareInvestigatorModal } from './components/DelayedFlareInvestigatorModal';
import { EarlyAccessOnboardingModal } from './components/EarlyAccessOnboardingModal';
import { FeedbackTestimonialModal, UserTestimonial } from './components/FeedbackTestimonialModal';
import { ClinicalTestimonialsView } from './components/ClinicalTestimonialsView';
import { PaystackMonetizationModal } from './components/PaystackMonetizationModal';
import { MriReportInterpreterModal } from './components/MriReportInterpreterModal';
import { isPlatformOwnerEmail, PLATFORM_OWNER_EMAILS } from './utils/userAccess';

import {
  Activity,
  Play,
  HeartPulse,
  Bot,
  Layers,
  FileText,
  ShieldAlert,
  Flame,
  Clock,
  Sparkles,
  BookOpen,
  Laptop,
  GraduationCap,
  Apple,
  Brain,
  CheckSquare,
  LifeBuoy,
  Video,
  Compass,
  Search,
  Zap,
  Gift,
  HeartHandshake,
  MessageSquareQuote,
  CreditCard,
  Crown,
} from 'lucide-react';

type NavTab =
  | 'pathway'
  | 'routines'
  | 'body_map'
  | 'symptoms'
  | 'cure_science'
  | 'nutrition'
  | 'sensory'
  | 'habits'
  | 'ai_pt'
  | 'ergonomics'
  | 'testimonials';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<NavTab>('pathway');

  // Selected Zone Filter
  const [selectedZone, setSelectedZone] = useState<BodyZone | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals & Active Workout
  const [selectedExerciseForModal, setSelectedExerciseForModal] =
    useState<Exercise | null>(null);
  const [activeWorkoutProgram, setActiveWorkoutProgram] =
    useState<RoutineProgram | null>(null);
  const [activeSingleExercise, setActiveSingleExercise] =
    useState<Exercise | null>(null);

  const [isRedFlagsModalOpen, setIsRedFlagsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isFlareUpModalOpen, setIsFlareUpModalOpen] = useState(false);
  const [isDemoWalkthroughOpen, setIsDemoWalkthroughOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isInvestigatorModalOpen, setIsInvestigatorModalOpen] = useState(false);
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isPaystackModalOpen, setIsPaystackModalOpen] = useState(false);
  const [isMriInterpreterOpen, setIsMriInterpreterOpen] = useState(false);

  // Pro Subscription State (Paystack)
  const [isProSubscribed, setIsProSubscribed] = useState<boolean>(() => {
    return !!localStorage.getItem('neuroflex_pro_subscription');
  });

  // Registered User / Email Capture State
  const [userProfileData, setUserProfileData] = useState<{ email: string; name: string }>(() => {
    const saved = localStorage.getItem('neuroflex_user_registration');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.email) return parsed;
      } catch (e) {}
    }
    // Default to platform owner timbest0612@gmail.com in development/preview
    return { email: 'timbest0612@gmail.com', name: 'Tim Best (Platform Owner)' };
  });

  // Check if current active user is a platform owner
  const isOwner = isPlatformOwnerEmail(userProfileData.email);
  const effectiveIsPro = isOwner || isProSubscribed;

  // Prompt onboarding modal for new visitors after 4 seconds if not registered
  useEffect(() => {
    const hasSeenPrompt = sessionStorage.getItem('neuroflex_seen_early_access');
    if (!userProfileData.email && !hasSeenPrompt) {
      const timer = setTimeout(() => {
        setIsEarlyAccessModalOpen(true);
        sessionStorage.setItem('neuroflex_seen_early_access', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [userProfileData.email]);

  const handleUserRegistered = (email: string, name: string) => {
    const data = { email, name };
    setUserProfileData(data);
    localStorage.setItem('neuroflex_user_registration', JSON.stringify(data));
  };

  // Global Keyboard Shortcut for Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Persistence State
  const [streakDays, setStreakDays] = useState<number>(3);
  const [completedSessions, setCompletedSessions] = useState<CompletedSession[]>(
    () => {
      const saved = localStorage.getItem('neuroflex_sessions');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
      return [
        {
          id: 'demo-1',
          programId: 'full-neural-spine-restoration',
          programTitle: 'Full Neural & Spine Restoration',
          date: new Date(Date.now() - 86400000).toISOString(),
          durationMinutes: 14,
          completedExercisesCount: 8,
          totalExercisesCount: 8,
          prePainScore: 6,
          postPainScore: 3,
          nerveResponse: 'improved',
          userNotes: 'Hand tingling reduced significantly after median glides.',
        },
      ];
    }
  );

  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>(() => {
    const saved = localStorage.getItem('neuroflex_symptoms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'init-sym-1',
        date: new Date().toISOString(),
        overallSeverity: 4,
        zones: [
          { zone: 'cervical_neck', severity: 4, symptoms: ['deep_ache', 'stiffness_reduced_rom'] },
          { zone: 'arms_hands', severity: 4, symptoms: ['tingling_pins'] },
          { zone: 'lumbar_spine', severity: 5, symptoms: ['deep_ache'] },
          { zone: 'legs_feet', severity: 3, symptoms: ['tingling_pins'] },
        ],
        centralizationStatus: 'centralized',
        functionalImpact: 'moderate',
        notes: 'Degenerative changes active in C-spine and lumbar discs.',
      },
    ];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('neuroflex_sessions', JSON.stringify(completedSessions));
  }, [completedSessions]);

  useEffect(() => {
    localStorage.setItem('neuroflex_symptoms', JSON.stringify(symptomLogs));
  }, [symptomLogs]);

  // Handlers
  const handleStartProgram = (program: RoutineProgram) => {
    setActiveSingleExercise(null);
    setActiveWorkoutProgram(program);
  };

  const handleStartSingleExercise = (exercise: Exercise) => {
    setActiveWorkoutProgram(null);
    setActiveSingleExercise(exercise);
  };

  const handleFinishSession = (session: CompletedSession) => {
    setCompletedSessions((prev) => [session, ...prev]);
    setStreakDays((prev) => prev + 1);
  };

  const handleAddSymptomLog = (newLog: SymptomLog) => {
    setSymptomLogs((prev) => [newLog, ...prev]);
  };

  const handleDeleteSymptomLog = (id: string) => {
    setSymptomLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const handleLaunchTailoredFromSymptoms = (zones: BodyZone[]) => {
    // Pick routine matching the primary zone or full routine
    if (zones.includes('cervical_neck') || zones.includes('arms_hands')) {
      const match = CLINICAL_PROGRAMS.find((p) => p.id === 'upper-chain-cervical-hands');
      if (match) {
        handleStartProgram(match);
        return;
      }
    }
    if (zones.includes('lumbar_spine') || zones.includes('legs_feet')) {
      const match = CLINICAL_PROGRAMS.find((p) => p.id === 'lower-chain-lumbar-sciatica');
      if (match) {
        handleStartProgram(match);
        return;
      }
    }
    handleStartProgram(CLINICAL_PROGRAMS[0]);
  };

  // Filter exercises
  const filteredExercises = ALL_EXERCISES.filter((ex) => {
    if (selectedZone !== 'all' && !ex.targetAreas.includes(selectedZone)) {
      return false;
    }
    if (categoryFilter !== 'all' && ex.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 pb-20 sm:pb-12">
      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          {/* Logo & Clinical Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-400 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  NeuroFlex<span className="text-teal-400">PT</span>
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Nerve & Spine Rehab
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Physical Therapy for Degenerative Changes in Neck, Back, Hands & Legs
              </p>
            </div>
          </div>

          {/* Quick Stats & Action Badges */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Universal Interactive Search & Jump Bar */}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-500/50 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-2 shadow-sm group"
              title="Search symptoms, exercises, stages, sleep ergonomics (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline text-slate-400 font-medium">Search anything (symptoms, stages, sleep)...</span>
              <span className="lg:hidden text-slate-300 font-bold">Search</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400 group-hover:text-teal-300">
                ⌘K
              </kbd>
            </button>

            {/* Early Access / Free Pass Badge */}
            {userProfileData.email ? (
              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-xs font-bold text-teal-300 transition-all flex items-center gap-1.5 shadow-sm"
                title={`Registered as: ${userProfileData.email}. Click to share recovery story.`}
              >
                <HeartHandshake className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Free Pass:</span>
                <span className="text-white font-medium truncate max-w-[80px] sm:max-w-[110px]">
                  {userProfileData.name || userProfileData.email.split('@')[0]}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEarlyAccessModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-500/10 animate-pulse"
                title="Get 100% Free Access to all stages and tools"
              >
                <Gift className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free Access</span>
              </button>
            )}

            {/* Give Feedback & Story Button */}
            <button
              type="button"
              onClick={() => setIsFeedbackModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-500/40 text-xs text-slate-300 hover:text-teal-300 transition-all flex items-center gap-1.5 shadow-sm"
              title="Share your pain reduction feedback & testimonial"
            >
              <MessageSquareQuote className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden md:inline">Share Story</span>
            </button>

            {/* Guided Walkthrough & Stage Video Practice Demo */}
            <button
              type="button"
              onClick={() => setIsDemoWalkthroughOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-sky-500/20 hover:from-teal-500/30 hover:to-sky-500/30 border border-teal-500/40 text-xs font-bold text-teal-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm shadow-teal-500/10 ring-1 ring-teal-500/20"
            >
              <Video className="w-4 h-4 text-teal-400" />
              <span>Demo & Practice</span>
            </button>

            {/* Paystack Pro / Platform Owner VIP License Badge */}
            {isOwner ? (
              <button
                type="button"
                onClick={() => setIsPaystackModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-amber-500/25 hover:from-amber-500/35 hover:to-yellow-500/30 border-2 border-amber-500/60 text-xs font-black text-amber-300 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 ring-1 ring-amber-400/40"
                title="Platform Owner: Unrestricted Lifetime Access"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="hidden sm:inline">Owner VIP</span>
                <span>Full Access</span>
              </button>
            ) : effectiveIsPro ? (
              <button
                type="button"
                onClick={() => setIsPaystackModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/40 text-xs font-black text-amber-300 transition-all flex items-center gap-1.5 shadow-sm shadow-amber-500/10"
                title="Pro Lifetime Clinical License Active"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Pro Active</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsPaystackModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-teal-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 border border-teal-500/40 text-xs font-black text-teal-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm shadow-teal-500/10"
                title="Unlock Pro via Paystack after testing"
              >
                <CreditCard className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Paystack</span>
                <span>Pro Upgrade</span>
              </button>
            )}

            {/* MRI Report Clinical Solutions Button */}
            <button
              type="button"
              onClick={() => setIsMriInterpreterOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-xs font-bold text-teal-300 transition-all flex items-center gap-1.5 shadow-sm shadow-teal-500/10"
              title="MRI Clinical Findings & Action Plan"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">MRI Solutions</span>
            </button>

            {/* Acute Flare-Up Rescue Button */}
            <button
              type="button"
              onClick={() => setIsFlareUpModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-xs font-bold text-rose-300 transition-all flex items-center gap-1.5 shadow-sm shadow-rose-500/10 animate-pulse"
            >
              <LifeBuoy className="w-4 h-4 text-rose-400" />
              <span>Flare Rescue</span>
            </button>

            {/* Doctor Report Button */}
            <button
              type="button"
              onClick={() => setIsReportModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 hidden md:flex"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span>Doctor Report</span>
            </button>

            {/* SOS Red Flags Alert */}
            <button
              type="button"
              onClick={() => setIsRedFlagsModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Red Flags</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-2.5 text-xs font-bold border-t border-slate-900">
          <button
            type="button"
            onClick={() => setActiveTab('pathway')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'pathway'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 shadow-md font-black ring-2 ring-teal-400/30'
                : 'text-slate-300 hover:text-white bg-slate-900/60 border border-teal-500/20 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Recovery Pathway (Video Stages 0–5)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('routines')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'routines'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Targeted Routines</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('body_map')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'body_map'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Nerve Map</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('symptoms')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'symptoms'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Symptom Tracker</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cure_science')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'cure_science'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Can Nerves Heal? (Science)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('nutrition')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'nutrition'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>Neuro-Nutrition & Disc Hydration</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sensory')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sensory'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Sensory Retraining</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('habits')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'habits'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Daily Healing Habits</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai_pt')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ai_pt'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI PT Doctor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ergonomics')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ergonomics'
                ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Ergonomics & Sleep</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('testimonials')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'testimonials'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md font-black ring-2 ring-emerald-400/30'
                : 'text-emerald-400 hover:text-white bg-emerald-950/30 border border-emerald-500/30 hover:bg-emerald-900/40'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Patient Stories & Results</span>
          </button>
        </div>
      </header>

      {/* Main App Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* TAB 0: RECOVERY PATHWAY (STAGE-BY-STAGE VIDEO MODELING) */}
        {activeTab === 'pathway' && (
          <StageRecoveryPathwayView
            onStartRoutine={handleStartProgram}
            onOpenFlareUp={() => setIsFlareUpModalOpen(true)}
          />
        )}

        {/* TAB 1: TARGETED ROUTINES & EXERCISE LIBRARY */}
        {activeTab === 'routines' && (
          <div className="space-y-8">
            {/* Interactive Guided Demo & Video Practice Banner */}
            <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/70 border border-teal-500/30 shadow-xl overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-extrabold uppercase tracking-wider border border-teal-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-teal-400" />
                    Structured Clinical Recovery Roadmap
                  </span>
                  <span className="text-[11px] text-slate-400">Stages 0 to 5</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Follow the Stage-by-Stage Video Modeling Pathway
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Watch our real-time Physical Therapy video model, mirror rep-by-rep cadence with live audio coaching, and verify clinical checkpoints before advancing between stages.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('pathway')}
                  className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.03]"
                >
                  <Compass className="w-4 h-4" />
                  <span>Open Video Stage Pathway</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDemoWalkthroughOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4 text-teal-400" />
                  <span>Quick Walkthrough Demo</span>
                </button>
              </div>
            </div>

            {/* Curated Clinical Programs Carousel */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-400" />
                    <span>Prescribed Clinical Physical Therapy Programs</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Systematic sequences targeting degenerative nerve compression across your neck, hands, spine, and legs
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CLINICAL_PROGRAMS.map((program) => (
                  <div
                    key={program.id}
                    className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all shadow-xl flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${program.badgeColor}`}
                        >
                          {program.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-teal-400" />
                          {program.durationMinutes} Mins
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{program.exercises.length} Targeted Exercises</span>
                        <span className="font-semibold text-teal-300">
                          {program.intensity}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleStartProgram(program)}
                        className="w-full py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Start Guided Session ({program.durationMinutes}m)</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Comprehensive Exercise Library with Filters */}
            <section className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-teal-400" />
                    <span>Physical Therapy & Nerve Mobilization Library</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Showing {filteredExercises.length} evidence-based movements
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      ['all', 'All Areas'],
                      ['cervical_neck', 'Neck (Cervical)'],
                      ['arms_hands', 'Hands & Arms'],
                      ['lumbar_spine', 'Low Back (Lumbar)'],
                      ['legs_feet', 'Legs & Sciatic'],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedZone(key)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        selectedZone === key
                          ? 'bg-teal-500 text-slate-950 font-bold border-teal-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exercise Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onSelect={setSelectedExerciseForModal}
                    onQuickStart={handleStartSingleExercise}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: INTERACTIVE BODY & DERMATOME MAP */}
        {activeTab === 'body_map' && (
          <div className="space-y-6">
            <InteractiveBodyMap
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
            />

            {/* Targeted Exercises for Selected Zone */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  Targeted Movements for Selected Region:
                </h3>
                <span className="text-xs text-slate-400">
                  {filteredExercises.length} Exercises Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onSelect={setSelectedExerciseForModal}
                    onQuickStart={handleStartSingleExercise}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SYMPTOM TRACKER & CENTRALIZATION */}
        {activeTab === 'symptoms' && (
          <SymptomTrackerView
            logs={symptomLogs}
            onAddLog={handleAddSymptomLog}
            onDeleteLog={handleDeleteSymptomLog}
            onLaunchTailoredRoutine={handleLaunchTailoredFromSymptoms}
          />
        )}

        {/* TAB 4: CAN NERVES HEAL? (SCIENCE & RECOVERY REALITY) */}
        {activeTab === 'cure_science' && (
          <NerveCureEducationView onOpenDemo={() => setIsDemoWalkthroughOpen(true)} />
        )}

        {/* TAB 5: NEURO-NUTRITION & DISC HYDRATION */}
        {activeTab === 'nutrition' && <NeuroNutritionView />}

        {/* TAB 6: SENSORY RETRAINING & DESENSITIZATION */}
        {activeTab === 'sensory' && <SensoryDesensitizationView />}

        {/* TAB 7: DAILY HEALING HABITS TRACKER */}
        {activeTab === 'habits' && <DailyHealingHabitsView />}

        {/* TAB 8: AI PT ASSISTANT & ROUTINE GENERATOR */}
        {activeTab === 'ai_pt' && (
          <AiPtAssistantView
            onStartCustomProgram={handleStartProgram}
            activeZones={
              selectedZone !== 'all'
                ? [selectedZone]
                : ['cervical_neck', 'arms_hands', 'lumbar_spine', 'legs_feet']
            }
          />
        )}

        {/* TAB 9: ERGONOMICS & SLEEP GUIDES */}
        {activeTab === 'ergonomics' && (
          <ErgonomicTipsView
            onOpenInvestigator={() => setIsInvestigatorModalOpen(true)}
            onOpenPathwayStage={() => setActiveTab('pathway')}
          />
        )}

        {/* TAB 10: PATIENT CLINICAL TESTIMONIALS & OUTCOMES */}
        {activeTab === 'testimonials' && (
          <ClinicalTestimonialsView
            onOpenFeedbackModal={() => setIsFeedbackModalOpen(true)}
            onOpenFreeAccessModal={() => setIsEarlyAccessModalOpen(true)}
            isRegisteredUser={!!userProfileData.email}
          />
        )}
      </main>

      {/* Early Access Onboarding / Email Capture Modal */}
      <EarlyAccessOnboardingModal
        isOpen={isEarlyAccessModalOpen}
        onClose={() => setIsEarlyAccessModalOpen(false)}
        onRegistered={handleUserRegistered}
      />

      {/* Patient Clinical Feedback & Testimonial Collector Modal */}
      <FeedbackTestimonialModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        userEmail={userProfileData.email}
        userName={userProfileData.name}
      />

      {/* Paystack Pro Monetization Checkout Modal */}
      <PaystackMonetizationModal
        isOpen={isPaystackModalOpen}
        onClose={() => setIsPaystackModalOpen(false)}
        userEmail={userProfileData.email}
        userName={userProfileData.name}
        onPaymentSuccess={(_ref, _plan) => {
          setIsProSubscribed(true);
        }}
      />

      {/* Universal Clinical Search & Deep-Linking Command Bar */}
      <UniversalClinicalSearch
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsSearchModalOpen(false);
        }}
        onSelectExercise={(ex) => {
          setSelectedExerciseForModal(ex);
          setIsSearchModalOpen(false);
        }}
        onStartProgram={(prog) => {
          handleStartProgram(prog);
          setIsSearchModalOpen(false);
        }}
        onOpenFlareUp={() => {
          setIsFlareUpModalOpen(true);
          setIsSearchModalOpen(false);
        }}
        onOpenRedFlags={() => {
          setIsRedFlagsModalOpen(true);
          setIsSearchModalOpen(false);
        }}
        onOpenReport={() => {
          setIsReportModalOpen(true);
          setIsSearchModalOpen(false);
        }}
        onOpenInvestigator={() => {
          setIsInvestigatorModalOpen(true);
          setIsSearchModalOpen(false);
        }}
      />

      {/* Delayed Flare-Up Investigator Modal */}
      <DelayedFlareInvestigatorModal
        isOpen={isInvestigatorModalOpen}
        onClose={() => setIsInvestigatorModalOpen(false)}
        onLaunchRoutine={(prog) => {
          handleStartProgram(prog);
          setIsInvestigatorModalOpen(false);
        }}
        onOpenFlareProtocol={() => {
          setIsInvestigatorModalOpen(false);
          setIsFlareUpModalOpen(true);
        }}
        onOpenPathwayStage={() => {
          setIsInvestigatorModalOpen(false);
          setActiveTab('pathway');
        }}
      />

      {/* Active Workout Player Modal */}
      {(activeWorkoutProgram || activeSingleExercise) && (
        <ActiveWorkoutPlayer
          program={activeWorkoutProgram}
          singleExercise={activeSingleExercise}
          onClose={() => {
            setActiveWorkoutProgram(null);
            setActiveSingleExercise(null);
          }}
          onFinishSession={handleFinishSession}
        />
      )}

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExerciseForModal}
        onClose={() => setSelectedExerciseForModal(null)}
        onStartExercise={handleStartSingleExercise}
      />

      {/* Red Flags Triage Alert Modal */}
      <RedFlagsModal
        isOpen={isRedFlagsModalOpen}
        onClose={() => setIsRedFlagsModalOpen(false)}
      />

      {/* Clinical Summary Report Modal */}
      <ClinicalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        sessions={completedSessions}
        symptomLogs={symptomLogs}
      />

      {/* Emergency Flare-Up Rescue Modal */}
      <FlareUpRescueModal
        isOpen={isFlareUpModalOpen}
        onClose={() => setIsFlareUpModalOpen(false)}
      />

      {/* MRI Clinical Findings & Protocol Decoder Modal */}
      <MriReportInterpreterModal
        isOpen={isMriInterpreterOpen}
        onClose={() => setIsMriInterpreterOpen(false)}
        onSelectStage={(stageId) => {
          setActiveTab('pathway');
          setIsMriInterpreterOpen(false);
        }}
        onOpenRoutine={(prog) => {
          setIsMriInterpreterOpen(false);
        }}
      />

      {/* Guided App Walkthrough & Stage-by-Stage Video Practice Demo Modal */}
      <AppDemoGuidedWalkthrough
        isOpen={isDemoWalkthroughOpen}
        onClose={() => setIsDemoWalkthroughOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsDemoWalkthroughOpen(false);
        }}
        onOpenFlareUp={() => {
          setIsDemoWalkthroughOpen(false);
          setIsFlareUpModalOpen(true);
        }}
        onOpenRedFlags={() => {
          setIsDemoWalkthroughOpen(false);
          setIsRedFlagsModalOpen(true);
        }}
      />
    </div>
  );
}
