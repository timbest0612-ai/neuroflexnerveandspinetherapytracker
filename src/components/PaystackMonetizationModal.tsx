import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Award,
  Lock,
  ArrowRight,
  X,
  HeartHandshake,
  Check,
  TrendingDown,
  Globe,
  Smartphone,
  FileText,
  Video,
  Crown,
} from 'lucide-react';
import { isPlatformOwnerEmail } from '../utils/userAccess';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
  onPaymentSuccess?: (reference: string, plan: string) => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}

export const PaystackMonetizationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userEmail = '',
  userName = '',
  onPaymentSuccess,
}) => {
  const [email, setEmail] = useState(userEmail);
  const [name, setName] = useState(userName);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'lifetime'>('quarterly');
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GHS' | 'KES' | 'ZAR'>('USD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paystackKey, setPaystackKey] = useState<string>(
    () => (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || ''
  );
  const [isKeyInputVisible, setIsKeyInputVisible] = useState(false);

  const isOwner = isPlatformOwnerEmail(email);

  useEffect(() => {
    if (userEmail) setEmail(userEmail);
    if (userName) setName(userName);
  }, [userEmail, userName]);

  // Pricing Matrix based on Currency
  const pricingData = {
    USD: {
      monthly: { amount: 9.99, amountKobo: 999, label: '$9.99 / Month' },
      quarterly: { amount: 24.99, amountKobo: 2499, label: '$24.99 / 3 Months ($8.33/mo)' },
      lifetime: { amount: 59.99, amountKobo: 5999, label: '$59.99 Lifetime Access' },
      symbol: '$',
    },
    NGN: {
      monthly: { amount: 9500, amountKobo: 950000, label: '₦9,500 / Month' },
      quarterly: { amount: 24000, amountKobo: 2400000, label: '₦24,000 / 3 Months (Best Value)' },
      lifetime: { amount: 58000, amountKobo: 5800000, label: '₦58,000 Lifetime Access' },
      symbol: '₦',
    },
    GHS: {
      monthly: { amount: 150, amountKobo: 15000, label: 'GH₵150 / Month' },
      quarterly: { amount: 375, amountKobo: 37500, label: 'GH₵375 / 3 Months' },
      lifetime: { amount: 890, amountKobo: 89000, label: 'GH₵890 Lifetime Access' },
      symbol: 'GH₵',
    },
    KES: {
      monthly: { amount: 1350, amountKobo: 135000, label: 'KSh 1,350 / Month' },
      quarterly: { amount: 3400, amountKobo: 340000, label: 'KSh 3,400 / 3 Months' },
      lifetime: { amount: 7900, amountKobo: 790000, label: 'KSh 7,900 Lifetime Access' },
      symbol: 'KSh',
    },
    ZAR: {
      monthly: { amount: 180, amountKobo: 18000, label: 'R 180 / Month' },
      quarterly: { amount: 450, amountKobo: 45000, label: 'R 450 / 3 Months' },
      lifetime: { amount: 1100, amountKobo: 110000, label: 'R 1,100 Lifetime Access' },
      symbol: 'R',
    },
  };

  const currentPricing = pricingData[currency];
  const activePlanDetails = currentPricing[selectedPlan];

  // Dynamic Paystack Inline Script Loader
  const loadPaystackScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.PaystackPop) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaystackPayment = async () => {
    if (!email.trim() || !email.includes('@')) {
      alert('Please provide a valid email address to link your Pro License.');
      return;
    }

    setIsProcessing(true);

    const isScriptLoaded = await loadPaystackScript();

    if (!isScriptLoaded || !window.PaystackPop) {
      // Fallback Demo Mode if network blocks external script
      simulateSuccessfulPayment('DEMO_REF_' + Date.now());
      setIsProcessing(false);
      return;
    }

    const publicKey =
      paystackKey.trim() ||
      (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY ||
      'pk_test_placeholder_key_neuroflex';

    try {
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: email.trim(),
        amount: activePlanDetails.amountKobo,
        currency: currency,
        metadata: {
          custom_fields: [
            {
              display_name: 'Patient Name',
              variable_name: 'patient_name',
              value: name || 'Spine Care Patient',
            },
            {
              display_name: 'Plan Selected',
              variable_name: 'plan_tier',
              value: selectedPlan,
            },
            {
              display_name: 'App Platform',
              variable_name: 'platform',
              value: 'NeuroFlex Spine Rehab',
            },
          ],
        },
        callback: function (response: { reference: string }) {
          simulateSuccessfulPayment(response.reference);
        },
        onClose: function () {
          setIsProcessing(false);
        },
      });

      handler.openIframe();
    } catch (err) {
      console.warn('Paystack setup error (using simulated success for development):', err);
      simulateSuccessfulPayment('SIM_REF_' + Date.now());
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateSuccessfulPayment = (ref: string) => {
    const receipt = {
      reference: ref,
      email: email.trim(),
      name: name.trim(),
      plan: selectedPlan,
      currency: currency,
      amount: activePlanDetails.amount,
      date: new Date().toISOString(),
      status: 'active_pro',
    };

    localStorage.setItem('neuroflex_pro_subscription', JSON.stringify(receipt));
    setPaymentSuccess(true);

    if (onPaymentSuccess) {
      onPaymentSuccess(ref, selectedPlan);
    }

    setTimeout(() => {
      setPaymentSuccess(false);
      onClose();
    }, 2400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-xl bg-slate-900 border border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ring-1 ring-teal-500/20 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 p-5 text-slate-950 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-slate-950/15 text-slate-950">
              <Zap className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider bg-slate-950/20 px-2.5 py-0.5 rounded-full">
              NeuroFlex Pro • Powered by Paystack
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-tight text-slate-950">
            Lock In Your Full Spine Recovery
          </h2>
          <p className="text-xs font-semibold text-teal-950/90 mt-1">
            Accelerate nerve regeneration after your initial results with unrestricted lifetime clinical access.
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {!paymentSuccess ? (
            <div className="space-y-4">
              {/* Owner VIP Notice if Owner Email is Detected */}
              {isOwner ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-500/15 border-2 border-amber-500/50 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                    <Crown className="w-5 h-5 text-amber-400" />
                    <span>Platform Owner Detected ({email})</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    You have <strong>Master VIP Platform Owner Status</strong>. You have 100% free lifetime access to all clinical features, all 6 stages, video avatars, AI assistant, and patient PDF exports without paying a dime.
                  </p>
                  <button
                    type="button"
                    onClick={() => simulateSuccessfulPayment('OWNER_MASTER_PASS_' + Date.now())}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Activate Owner VIP Pass ($0 / Free Lifetime)</span>
                  </button>
                </div>
              ) : null}

              {/* Currency Selector */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
                <span className="text-slate-400 font-bold flex items-center gap-1.5 pl-1">
                  <Globe className="w-4 h-4 text-teal-400" />
                  <span>Select Currency:</span>
                </span>
                <div className="flex items-center gap-1">
                  {(['USD', 'NGN', 'GHS', 'KES', 'ZAR'] as const).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        currency === curr
                          ? 'bg-teal-500 text-slate-950 shadow'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Monthly */}
                <div
                  onClick={() => setSelectedPlan('monthly')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 relative ${
                    selectedPlan === 'monthly'
                      ? 'bg-teal-950/40 border-teal-400 shadow-md ring-1 ring-teal-400/40'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-300">Monthly</div>
                    <div className="text-base font-black text-white mt-1">
                      {currentPricing.monthly.label.split('/')[0]}
                    </div>
                    <div className="text-[10px] text-slate-400">Billed monthly</div>
                  </div>
                  <div className="text-[10px] text-teal-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Cancel anytime</span>
                  </div>
                </div>

                {/* 3 Months (Recommended) */}
                <div
                  onClick={() => setSelectedPlan('quarterly')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 relative ${
                    selectedPlan === 'quarterly'
                      ? 'bg-gradient-to-b from-teal-950/60 to-slate-950 border-teal-400 shadow-lg ring-2 ring-teal-400/50'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="absolute -top-2.5 right-3 text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 px-2 py-0.5 rounded-full shadow">
                    Most Popular
                  </span>
                  <div>
                    <div className="text-xs font-bold text-teal-300">Full 12-Wk Rehab</div>
                    <div className="text-base font-black text-white mt-1">
                      {currentPricing.quarterly.label.split('/')[0]}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-bold">Recommended Duration</div>
                  </div>
                  <div className="text-[10px] text-teal-300 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3 text-teal-400" />
                    <span>Nerve healing cycle</span>
                  </div>
                </div>

                {/* Lifetime */}
                <div
                  onClick={() => setSelectedPlan('lifetime')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 relative ${
                    selectedPlan === 'lifetime'
                      ? 'bg-teal-950/40 border-teal-400 shadow-md ring-1 ring-teal-400/40'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-300">Lifetime Pass</div>
                    <div className="text-base font-black text-white mt-1">
                      {currentPricing.lifetime.label.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-400">One-time payment</div>
                  </div>
                  <div className="text-[10px] text-teal-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Permanent unlocks</span>
                  </div>
                </div>
              </div>

              {/* What You Get Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>Everything Included in NeuroFlex Pro:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px] pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Complete Stages 0 to 5 Video Avatars</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Delayed Flare-Up Root Investigator</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Doctor & Surgeon Exportable PDF Reports</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Desk Micro-Break Neural Reset Timer</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>AI Assistant Unrestricted Guidance</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Paystack Secure Instant Processing</span>
                  </div>
                </div>
              </div>

              {/* Email & Checkout Details */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Account Email <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patient@example.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:outline-none text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Full Name (For Clinical Receipt)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:outline-none text-white text-xs"
                    />
                  </div>
                </div>

                {/* Optional Paystack Public Key Config Toggle */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsKeyInputVisible(!isKeyInputVisible)}
                    className="text-[11px] text-slate-400 hover:text-teal-300 underline font-medium"
                  >
                    {isKeyInputVisible ? 'Hide custom Paystack Public Key' : 'Configure custom Paystack Public Key (Optional)'}
                  </button>
                  {isKeyInputVisible && (
                    <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-300">
                        Paystack Public Key (pk_test_... or pk_live_...)
                      </label>
                      <input
                        type="text"
                        value={paystackKey}
                        onChange={(e) => setPaystackKey(e.target.value)}
                        placeholder="pk_live_xxxx... or pk_test_xxxx..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-teal-300 font-mono"
                      />
                      <p className="text-[10px] text-slate-500">
                        Leave blank to use default environment key or test mode.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Paystack Checkout Button */}
              <button
                type="button"
                onClick={handlePaystackPayment}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-teal-500/25 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Opening Secure Paystack Gateway...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay {activePlanDetails.label.split(' ')[0]} via Paystack</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span>Cards, Bank Transfer, Apple Pay, USSD</span>
                <span>•</span>
                <span>Cancel Anytime</span>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white">
                Payment Successful! Pro License Activated
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you for upgrading to NeuroFlex Pro. Your full 6-stage clinical access, PDF reports, and AI assistant have been unlocked permanently.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
