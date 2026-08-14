import React, { useState, useEffect } from 'react';
import {
  Gift,
  CheckCircle2,
  Mail,
  User,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  X,
  Compass,
  HeartPulse,
  Award,
  Crown,
} from 'lucide-react';
import { isPlatformOwnerEmail, PLATFORM_OWNER_EMAILS } from '../utils/userAccess';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (email: string, name: string) => void;
}

export const EarlyAccessOnboardingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onRegistered,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [primaryCondition, setPrimaryCondition] = useState<string>('cervical_sciatica');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isOwner = isPlatformOwnerEmail(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address to activate your full access.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const displayName = name.trim() || (isOwner ? (email.includes('timbest') ? 'Tim Best (Platform Owner)' : 'Gbenga Oyaleke (Platform Owner)') : 'Spine Care Patient');
      onRegistered(email.trim(), displayName);

      // Auto close after brief celebration
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-lg bg-slate-900 border border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-teal-500/20 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 p-5 text-slate-950 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 transition-all"
            title="Dismiss & continue exploring"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-slate-950/15 text-slate-950">
              <Gift className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider bg-slate-950/20 px-2.5 py-0.5 rounded-full">
              100% Free Clinical Early-Access Pass
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-tight text-slate-950">
            Unlock Full 6-Stage Rehab Free
          </h2>
          <p className="text-xs font-semibold text-teal-950/90 mt-1">
            Get unlimited video modeling, flare-up tools, and daily recovery routines with 0 fees.
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-teal-300">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>Our Promise to You:</span>
                </div>
                <p className="text-slate-300">
                  We believe you should <strong>see real pain relief and nerve decompression results first</strong> before anyone asks for money. Enjoy 100% full access to all stages, video models, and PDF doctor reports.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Your Name (Optional)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Sarah M."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:outline-none text-white text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-300">
                      Your Email Address <span className="text-teal-400">*</span>
                    </label>
                    {isOwner && (
                      <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                        <Crown className="w-3 h-3 text-amber-400" />
                        Platform Owner Recognized
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email to activate free access..."
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border text-white text-xs font-medium focus:outline-none transition-all ${
                        isOwner
                          ? 'border-amber-500/60 ring-2 ring-amber-500/20'
                          : 'border-slate-800 focus:border-teal-500'
                      }`}
                    />
                  </div>

                  {/* Owner Quick Select Chips */}
                  <div className="flex items-center gap-1.5 pt-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-500 font-semibold">Admin Shortcuts:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('timbest0612@gmail.com');
                        setName('Tim Best (Platform Owner)');
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 flex items-center gap-1 transition-all"
                    >
                      <Crown className="w-2.5 h-2.5" />
                      <span>timbest0612@gmail.com</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('oyalekeoluwagbenga1984@gmail.com');
                        setName('Gbenga Oyaleke (Platform Owner)');
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 flex items-center gap-1 transition-all"
                    >
                      <Crown className="w-2.5 h-2.5" />
                      <span>oyalekeoluwagbenga1984@gmail.com</span>
                    </button>
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-rose-400 mt-1 font-semibold">
                      {errorMsg}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Primary Area You Want to Heal:
                  </label>
                  <select
                    value={primaryCondition}
                    onChange={(e) => setPrimaryCondition(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:outline-none text-white text-xs font-medium"
                  >
                    <option value="cervical_sciatica">Neck & Arm / Numb Hands (Cervical Radiculopathy)</option>
                    <option value="lumbar_sciatica">Lower Back & Sciatica / Leg Pain (L4-S1)</option>
                    <option value="both">Both Cervical & Lumbar Spine Issues</option>
                    <option value="posture_desk">Desk Neck & Postural Nerve Compression</option>
                  </select>
                </div>
              </div>

              {/* What's included checklist */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>All 6 Video Stages (0-5)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Delayed Flare Audit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Micro-Break Desk Timer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Clinical PDF Report</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 mt-2"
              >
                {isSubmitting ? (
                  <span>Activating Your Free Pass...</span>
                ) : (
                  <>
                    <span>Activate Free Access & Start Healing</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>No credit card required • 100% Privacy guaranteed</span>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-teal-500/20 border border-teal-500 text-teal-400 mx-auto flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-white">
                Full Early-Access Pass Activated!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Welcome {name || 'aboard'}! You now have unrestricted access to all clinical recovery stages, video cadence models, and flare tools.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
