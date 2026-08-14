import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  Star,
  Sparkles,
  Send,
  CheckCircle2,
  X,
  MessageSquare,
  Flame,
  Award,
  TrendingDown,
  Smile,
  ShieldCheck,
} from 'lucide-react';

export interface UserTestimonial {
  id: string;
  name: string;
  email: string;
  rating: number;
  stageReached: number;
  symptomImprovementPercentage: number;
  primaryCondition: string;
  feedbackText: string;
  favoriteFeature: string;
  date: string;
  wouldRecommend: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
  onSubmitted?: (testimonial: UserTestimonial) => void;
}

export const FeedbackTestimonialModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userEmail = '',
  userName = '',
  onSubmitted,
}) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [rating, setRating] = useState<number>(5);
  const [improvementPercentage, setImprovementPercentage] = useState<number>(70);
  const [primaryCondition, setPrimaryCondition] = useState<string>('Sciatica & Lower Back Disc');
  const [favoriteFeature, setFavoriteFeature] = useState<string>('Stage 0-5 Video Roadmaps');
  const [feedbackText, setFeedbackText] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (userName) setName(userName);
    if (userEmail) setEmail(userEmail);
  }, [userName, userEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setIsSubmitting(true);

    const newTestimonial: UserTestimonial = {
      id: 'testim-' + Date.now(),
      name: name.trim() || 'Spine Care Patient',
      email: email.trim() || 'user@example.com',
      rating,
      stageReached: 3,
      symptomImprovementPercentage: improvementPercentage,
      primaryCondition,
      feedbackText: feedbackText.trim(),
      favoriteFeature,
      date: new Date().toISOString(),
      wouldRecommend,
    };

    // Store in localStorage
    const saved = localStorage.getItem('neuroflex_testimonials');
    const list: UserTestimonial[] = saved ? JSON.parse(saved) : [];
    list.unshift(newTestimonial);
    localStorage.setItem('neuroflex_testimonials', JSON.stringify(list));

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSubmitted) {
        onSubmitted(newTestimonial);
      }
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-xl bg-slate-900 border border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-teal-500/20 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  Patient Clinical Story
                </span>
                <span className="text-xs text-slate-400">Help Others Heal</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Share Your Recovery Feedback & Experience
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-teal-300">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>How Has Your Spine & Nerve Pain Changed?</span>
                </div>
                <p className="text-slate-300">
                  Your feedback helps us refine the 6-stage video cadence algorithms and inspires others suffering from radicular pain, sciatica, and cervical numbness to know that recovery is possible.
                </p>
              </div>

              {/* Star Rating */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center space-y-2 text-center">
                <span className="text-xs font-bold text-slate-300">
                  How would you rate your overall experience with NeuroFlex?
                </span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-600 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          rating >= star
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-teal-400">
                  {rating === 5 && 'Outstanding & Clinically Transformative'}
                  {rating === 4 && 'Very Helpful & Clear Video Guidance'}
                  {rating === 3 && 'Helpful Daily Routines'}
                  {rating <= 2 && 'Needs Improvement'}
                </span>
              </div>

              {/* Improvement Slider */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span>Estimated Symptom Relief / Improvement:</span>
                  </span>
                  <span className="font-black text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ~{improvementPercentage}% Relief
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={improvementPercentage}
                  onChange={(e) => setImprovementPercentage(Number(e.target.value))}
                  className="w-full accent-teal-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Mild Relief (10%)</span>
                  <span>Significant Relief (50%)</span>
                  <span>Near-Complete Pain Resolution (100%)</span>
                </div>
              </div>

              {/* Text Feedback */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  What specific results have you noticed? (e.g., pain centralized, tingling reduced, better sleep, can sit longer) <span className="text-teal-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share how the video modeling, zero-G decompressions, or nerve gliders helped your daily life..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:outline-none text-white text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Your Name / Display Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Mark D., Spine Patient"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:outline-none text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Most Helpful Tool:
                  </label>
                  <select
                    value={favoriteFeature}
                    onChange={(e) => setFavoriteFeature(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:outline-none text-white text-xs"
                  >
                    <option value="Stage 0-5 Video Roadmaps">Stage 0-5 Video Roadmaps</option>
                    <option value="Acute Flare 1-Click SOS">Acute Flare 1-Click SOS</option>
                    <option value="Sleep Posture Simulator">Sleep Posture Simulator</option>
                    <option value="Micro-Break Desk Timer">Micro-Break Desk Timer</option>
                    <option value="Delayed Flare Investigator">Delayed Flare Investigator</option>
                    <option value="Doctor Clinical PDF Report">Doctor Clinical PDF Report</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !feedbackText.trim()}
                className="w-full py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
              >
                {isSubmitting ? (
                  <span>Saving Your Feedback...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Clinical Testimonial & Feedback</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-teal-500/20 border border-teal-500 text-teal-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-white">
                Thank You for Sharing Your Story!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Your testimonial has been recorded. It will help guide future users and validate clinical outcomes as you continue progressing through the stages.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
