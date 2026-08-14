import React, { useState } from 'react';
import {
  Apple,
  Sparkles,
  Droplets,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Pill,
  Heart,
  Flame,
  Info,
} from 'lucide-react';
import { NerveCellularTargetDiagram } from './ClinicalVisualDiagrams';

interface NutrientItem {
  id: string;
  name: string;
  category: 'myelin_repair' | 'nerve_antioxidant' | 'disc_matrix' | 'inflammation';
  clinicalRole: string;
  recommendedForm: string;
  typicalDose: string;
  naturalFoodSources: string[];
  scientificEvidence: string;
}

const NEURO_NUTRIENTS: NutrientItem[] = [
  {
    id: 'b12_methyl',
    name: 'Vitamin B12 (Methylcobalamin)',
    category: 'myelin_repair',
    clinicalRole: 'Essential co-factor for Schwann cell synthesis of the myelin lipid sheath insulating peripheral nerves.',
    recommendedForm: 'Sublingual Methylcobalamin (or Adenosylcobalamin), NOT synthetic cyanocobalamin.',
    typicalDose: '1,000 – 2,500 mcg daily sublingual',
    naturalFoodSources: ['Wild salmon', 'Sardines', 'Pasture-raised eggs', 'Grass-fed beef'],
    scientificEvidence: 'Directly stimulates axonal regeneration and nerve protein synthesis in clinical radiculopathy trials.',
  },
  {
    id: 'b1_benfo',
    name: 'Vitamin B1 (Benfotiamine)',
    category: 'myelin_repair',
    clinicalRole: 'Fat-soluble form of Thiamine with 5x higher cellular bioavailability to protect peripheral nerves from toxic advanced glycation end-products (AGEs).',
    recommendedForm: 'Benfotiamine (fat-soluble Thiamine)',
    typicalDose: '150 – 300 mg twice daily with meals',
    naturalFoodSources: ['Sunflower seeds', 'Nutritional yeast', 'Pork tenderloin', 'Flaxseeds'],
    scientificEvidence: 'Proven in multi-center trials to significantly reduce sensory neuropathic burning and motor tingling.',
  },
  {
    id: 'ala',
    name: 'Alpha-Lipoic Acid (R-ALA)',
    category: 'nerve_antioxidant',
    clinicalRole: 'Universal fat- and water-soluble antioxidant that improves endoneurial microvascular capillary blood flow (ischemia relief).',
    recommendedForm: 'Stabilized R-Alpha Lipoic Acid (R-ALA / Na-R-ALA)',
    typicalDose: '300 – 600 mg daily on an empty stomach',
    naturalFoodSources: ['Spinach', 'Broccoli', 'Brussels sprouts', 'Grass-fed organ meats'],
    scientificEvidence: 'Extensive Cochrane-grade clinical evidence showing improved nerve conduction velocity and reduced numbness.',
  },
  {
    id: 'omega3',
    name: 'Omega-3 Fatty Acids (High EPA/DHA)',
    category: 'inflammation',
    clinicalRole: 'Generates specialized pro-resolving mediators (SPMs) that turn off chronic neuro-inflammation at the dorsal root ganglion.',
    recommendedForm: 'Triglyceride-form purified Molecular Distilled Fish Oil',
    typicalDose: '2,000 – 3,000 mg combined EPA + DHA daily',
    naturalFoodSources: ['Wild Alaskan salmon', 'Mackerel', 'Anchovies', 'Sardines'],
    scientificEvidence: 'Accelerates peripheral nerve fiber recovery and reduces compression-induced spinal cord hyperalgesia.',
  },
  {
    id: 'magnesium',
    name: 'Magnesium Glycinate / L-Threonate',
    category: 'myelin_repair',
    clinicalRole: 'NMDA receptor blocker preventing neuronal excitotoxicity and soothing muscle spasm guarding around degenerative facet joints.',
    recommendedForm: 'Magnesium Glycinate or Magnesium L-Threonate',
    typicalDose: '300 – 400 mg elemental magnesium at bedtime',
    naturalFoodSources: ['Pumpkin seeds', 'Dark leafy greens', 'Avocados', 'Raw cacao'],
    scientificEvidence: 'Relaxes hypertonic paravertebral muscles that compress exiting nerve roots, enhancing restorative deep sleep.',
  },
  {
    id: 'collagen_disc',
    name: 'Type II Collagen & Glucosamine Matrix',
    category: 'disc_matrix',
    clinicalRole: 'Supplies glycosaminoglycans and proteoglycans required for water retention in the nucleus pulposus of degenerative intervertebral discs.',
    recommendedForm: 'Hydrolyzed Type II Collagen Peptides with Vitamin C',
    typicalDose: '5 – 10 grams daily',
    naturalFoodSources: ['Bone broth', 'Pasture-raised chicken cartilage'],
    scientificEvidence: 'Supports tensile strength of the outer annulus fibrosus and slows degenerative disc height loss.',
  },
  {
    id: 'curcumin',
    name: 'Liposomal Curcumin & Boswellia',
    category: 'inflammation',
    clinicalRole: 'Natural COX-2 and NF-kB inhibitors that suppress inflammatory prostaglandins without the stomach irritation of NSAIDs.',
    recommendedForm: 'Liposomal Curcumin / Meriva / Longvida with Piperine or Boswellia AKBA',
    typicalDose: '500 – 1,000 mg daily with food',
    naturalFoodSources: ['Organic turmeric root with black pepper and olive oil'],
    scientificEvidence: 'Proven comparable to low-dose ibuprofen for reducing spinal disc inflammatory exudate and joint stiffness.',
  },
];

export const NeuroNutritionView: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    const saved = localStorage.getItem('neuroflex_water_today');
    return saved ? parseInt(saved, 10) : 4;
  });

  const handleToggleGlass = (index: number) => {
    const nextVal = index + 1 === waterGlasses ? index : index + 1;
    setWaterGlasses(nextVal);
    localStorage.setItem('neuroflex_water_today', nextVal.toString());
  };

  const filteredNutrients = NEURO_NUTRIENTS.filter((n) => {
    if (filterCategory === 'all') return true;
    return n.category === filterCategory;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-100 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Apple className="w-4 h-4" />
              <span>Cellular Nerve Myelination & Disc Matrix</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Neuro-Nutrition & Myelin Repair Guide
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Nerves require specific cellular building blocks and fatty acids to synthesize the protective myelin sheath and rehydrate compressed spinal discs.
            </p>
          </div>
        </div>
      </div>

      {/* Disc Hydration Sponge Tracker */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-sky-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Daily Intervertebral Disc Hydration Target
              </h3>
              <p className="text-xs text-slate-400">
                Spinal discs are 80% water. Dehydration causes height loss, narrowing neural foramina.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-sky-300 font-bold">
              {waterGlasses} / 8 Glasses ({(waterGlasses * 0.35).toFixed(1)}L logged)
            </span>
          </div>
        </div>

        {/* Interactive Water Glasses Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
          {Array.from({ length: 8 }).map((_, idx) => {
            const isFilled = idx < waterGlasses;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleToggleGlass(idx)}
                className={`py-3 px-2 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  isFilled
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-md shadow-sky-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-600 hover:border-slate-700'
                }`}
              >
                <Droplets className={`w-4 h-4 ${isFilled ? 'fill-current text-sky-400' : 'text-slate-600'}`} />
                <span className="text-[10px] font-bold">#{idx + 1}</span>
              </button>
            );
          })}
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
          <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Clinical Tip:</strong> Drink 16 oz of water immediately upon waking. Discs lose up to 20% of their fluid during upright daytime sitting and rehydrate overnight.
          </span>
        </div>
      </div>

      {/* Visual Cellular Myelin Anatomy & Nutrient Targets */}
      <NerveCellularTargetDiagram />

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
        <span className="text-xs font-bold text-slate-400 uppercase">Filter Nutrients:</span>
        <div className="flex gap-1.5">
          {[
            { id: 'all', label: 'All Compounds' },
            { id: 'myelin_repair', label: 'Myelin Sheath Repair' },
            { id: 'nerve_antioxidant', label: 'Nerve Blood Flow (ALA)' },
            { id: 'inflammation', label: 'Anti-Inflammation' },
            { id: 'disc_matrix', label: 'Disc Cartilage' },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilterCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                filterCategory === c.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nutrients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNutrients.map((nutrient) => (
          <div
            key={nutrient.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      nutrient.category === 'myelin_repair'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        : nutrient.category === 'nerve_antioxidant'
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                        : nutrient.category === 'inflammation'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                    }`}
                  >
                    {nutrient.category.replace('_', ' ').toUpperCase()}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {nutrient.name}
                  </h3>
                </div>
                <Pill className="w-4 h-4 text-slate-500" />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {nutrient.clinicalRole}
              </p>

              {/* Form & Dosing Box */}
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-start gap-1">
                  <span className="font-bold text-emerald-400 min-w-[75px]">Best Form:</span>
                  <span className="text-slate-200">{nutrient.recommendedForm}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold text-emerald-400 min-w-[75px]">Clinical Dose:</span>
                  <span className="text-slate-200">{nutrient.typicalDose}</span>
                </div>
              </div>

              {/* Natural Food Sources */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block">
                  Natural Whole-Food Sources:
                </span>
                <div className="flex flex-wrap gap-1">
                  {nutrient.naturalFoodSources.map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scientific evidence footer */}
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
              🔬 {nutrient.scientificEvidence}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-amber-300">Physician Consultation Reminder:</span>
          <span>
            Always discuss new nutritional supplements with your physician or pharmacist, especially if you are taking blood thinners, diabetic medications, or blood pressure agents.
          </span>
        </div>
      </div>
    </div>
  );
};
