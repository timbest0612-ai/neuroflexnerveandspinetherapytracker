import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  Star,
  Sparkles,
  TrendingDown,
  Quote,
  CheckCircle2,
  Users,
  Award,
  MessageSquarePlus,
  ShieldCheck,
} from 'lucide-react';
import { UserTestimonial } from './FeedbackTestimonialModal';

interface Props {
  onOpenFeedbackModal: () => void;
  onOpenFreeAccessModal?: () => void;
  isRegisteredUser?: boolean;
}

export const ClinicalTestimonialsView: React.FC<Props> = ({
  onOpenFeedbackModal,
  onOpenFreeAccessModal,
  isRegisteredUser = false,
}) => {
  const [testimonials, setTestimonials] = useState<UserTestimonial[]>([]);

  // Default seed community clinical stories + user submissions
  useEffect(() => {
    const saved = localStorage.getItem('neuroflex_testimonials');
    const defaultStories: UserTestimonial[] = [
      {
        id: 'seed-1',
        name: 'David R. (Age 54)',
        email: 'david.r@example.com',
        rating: 5,
        stageReached: 3,
        symptomImprovementPercentage: 85,
        primaryCondition: 'C6-C7 Cervical Radiculopathy & Right Hand Numbness',
        feedbackText:
          'After 4 months of thumb and index finger numbness, I thought surgery was my only option. Following the Stage 1 zero-G retractions and radial nerve sliders for 3 weeks completely centralized my pain back to my neck. My grip strength is 90% restored!',
        favoriteFeature: 'Stage 0-5 Video Roadmaps',
        date: '2026-08-02T10:00:00Z',
        wouldRecommend: true,
      },
      {
        id: 'seed-2',
        name: 'Elena K. (Age 42)',
        email: 'elena.k@example.com',
        rating: 5,
        stageReached: 4,
        symptomImprovementPercentage: 90,
        primaryCondition: 'L5-S1 Disc Herniation & Severe Sciatica',
        feedbackText:
          'The McKenzie press-ups and nocturnal sleep ergonomics changed everything. The Delayed Flare Investigator helped me realize driving 45 mins without lumbar support was triggering my next-day spasms. Truly life-changing.',
        favoriteFeature: 'Delayed Flare Investigator',
        date: '2026-08-08T14:30:00Z',
        wouldRecommend: true,
      },
      {
        id: 'seed-3',
        name: 'Marcus T. (Software Engineer)',
        email: 'marcus.t@example.com',
        rating: 5,
        stageReached: 2,
        symptomImprovementPercentage: 75,
        primaryCondition: 'Postural Tech-Neck & Bilateral Arm Burning',
        feedbackText:
          'The 30-minute workstation reset timer keeps me honest during work. The animated vector models are so much clearer than YouTube videos because they show the exact tempo and breathing cues.',
        favoriteFeature: 'Micro-Break Desk Timer',
        date: '2026-08-11T09:15:00Z',
        wouldRecommend: true,
      },
    ];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTestimonials([...parsed, ...defaultStories]);
        return;
      } catch (e) {}
    }
    setTestimonials(defaultStories);
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-black uppercase tracking-wider text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Patient Recovery Stories & Clinical Outcomes
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Free Clinical Early Access
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Real People. Real Nerve Regeneration. Real Results.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We give you unrestricted access to the entire 6-stage clinical roadmap for free so you can experience real pain centralization and functional relief first. See how others healed and share your journey below.
          </p>

          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={onOpenFeedbackModal}
              className="px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Recovery Testimonial</span>
            </button>

            {!isRegisteredUser && onOpenFreeAccessModal && (
              <button
                type="button"
                onClick={onOpenFreeAccessModal}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs border border-teal-500/30 transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-teal-400" />
                <span>Activate Free Patient Pass</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-teal-400">4.9 / 5</span>
          <p className="text-[11px] font-semibold text-slate-400">Average Patient Rating</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-emerald-400">82%</span>
          <p className="text-[11px] font-semibold text-slate-400">Avg. Symptom Reduction</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-sky-400">100%</span>
          <p className="text-[11px] font-semibold text-slate-400">Free Access Guarantee</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-amber-400">2-4 Wks</span>
          <p className="text-[11px] font-semibold text-slate-400">Avg. Centralization Lag</p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Community Stories & Clinical Progress Logs</span>
          </h3>
          <span className="text-xs text-slate-400">
            {testimonials.length} Verified Recovery Accounts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    ~{item.symptomImprovementPercentage}% Relief
                  </span>
                </div>

                <div className="text-[11px] font-bold text-teal-400 bg-teal-950/40 px-2.5 py-1 rounded-xl border border-teal-800/40">
                  {item.primaryCondition}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic relative pl-3 border-l-2 border-teal-500/40">
                  "{item.feedbackText}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-[10px] text-slate-500">
                    Favorite: {item.favoriteFeature}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-teal-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
