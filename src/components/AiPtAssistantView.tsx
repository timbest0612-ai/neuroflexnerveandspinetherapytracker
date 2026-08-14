import React, { useState } from 'react';
import { BodyZone, Exercise, RoutineProgram } from '../types';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  Play,
  ShieldAlert,
  BrainCircuit,
  User,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { ALL_EXERCISES } from '../data/exercises';

interface Props {
  onStartCustomProgram: (program: RoutineProgram) => void;
  activeZones: BodyZone[];
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  'Why do my fingers tingle when I have neck degenerative changes?',
  'What is the difference between a nerve slider and a tensioner?',
  'What is the best sleeping position for neck and lower back nerve pain?',
  'How do I know if my sciatic nerve flossing is working or irritating my nerve?',
];

export const AiPtAssistantView: React.FC<Props> = ({
  onStartCustomProgram,
  activeZones,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'routine_builder'>('chat');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello! I'm your NeuroFlex Physical Therapy & Spine Assistant. Degenerative changes in the cervical and lumbar spine often irritate the nerves that coordinate your neck, back, hands, and legs. How can I assist with your rehabilitation, form checks, or symptom modifications today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Custom Routine Generator State
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    'Neck (Cervical)',
    'Hands & Arms',
    'Lower Back (Lumbar)',
    'Legs & Sciatic',
  ]);
  const [painLevel, setPainLevel] = useState<number>(4);
  const [durationMinutes, setDurationMinutes] = useState<number>(10);
  const [isGeneratingRoutine, setIsGeneratingRoutine] = useState(false);
  const [generatedRoutine, setGeneratedRoutine] = useState<RoutineProgram | null>(null);

  const handleSendMessage = async (queryToSend?: string) => {
    const q = queryToSend || inputQuery;
    if (!q.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsSending(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          context: {
            activeDegenerativeZones: activeZones,
            userNote: 'Degenerative changes irritating nerves across neck, back, hands, and legs.',
          },
        }),
      });

      const data = await response.json();
      const aiReply = data.reply || data.fallbackResponse || 'Thank you for your question. Always prioritize gentle nerve sliders over forced stretches.';

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: 'Nerves respond best to oscillatory movement rather than sustained tension. If you experience tingling in hands or legs, perform gentle chin tucks and seated sciatic sliders within a pain-free range.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleGenerateAiRoutine = async () => {
    setIsGeneratingRoutine(true);
    try {
      const response = await fetch('/api/gemini/generate-routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          affectedAreas: selectedAreas,
          painLevel,
          durationMinutes,
          primarySymptoms: ['Tingling in hands', 'Sciatic tension in leg', 'Neck stiffness', 'Low back ache'],
        }),
      });

      const data = await response.json();

      let exercisesToUse: Exercise[] = [];

      if (data.routine && Array.isArray(data.routine) && data.routine.length > 0) {
        // Map AI generated items or match to library
        exercisesToUse = data.routine.map((item: any, idx: number) => {
          const matched = ALL_EXERCISES.find(
            (e) => e.title.toLowerCase().includes(item.title?.toLowerCase()) || e.id === item.id
          );
          if (matched) return matched;
          return {
            id: `ai-ex-${idx}`,
            title: item.title || 'Targeted Nerve Glide',
            subtitle: item.clinicalBenefit || 'Mobilizes irritated spinal nerve root',
            targetAreas: ['cervical_neck', 'arms_hands', 'lumbar_spine', 'legs_feet'],
            targetNerves: [item.targetArea || 'Spinal Nerve Roots'],
            category: 'nerve_glide',
            intensity: 'gentle_slider',
            durationSec: item.durationSeconds || 50,
            repsText: item.repsDescription || '8-10 smooth repetitions',
            equipment: 'None',
            keyVisualCue: item.safetyCue || 'Move smoothly and breathe rhythmically',
            animationType: 'median_nerve_glide',
            setupInstructions: ['Sit tall with shoulders relaxed and neck in neutral alignment.'],
            actionSteps: item.stepByStep || ['Perform smooth oscillatory gliding motion without holding end-range tension.'],
            breathingCue: 'Inhale to prepare, exhale through the gliding motion.',
            clinicalWhy: item.clinicalBenefit || 'Decompresses the irritated neural pathway.',
            safetyWatchouts: [item.safetyCue || 'Avoid pulling through sharp electric pain.'],
            modificationEasier: 'Reduce motion amplitude by 50%.',
          };
        });
      }

      if (exercisesToUse.length === 0) {
        // Fallback to tailored library selection
        exercisesToUse = ALL_EXERCISES.slice(0, 5);
      }

      const customProg: RoutineProgram = {
        id: 'ai-custom-' + Date.now(),
        title: `AI Personalized ${durationMinutes}-Min Neuro-Rehab`,
        tagline: `Tailored for ${selectedAreas.join(', ')} (Pain ${painLevel}/10)`,
        description: `Custom generated physical therapy sequence focusing on your selected degenerative nerve segments.`,
        badge: 'AI Tailored',
        badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        durationMinutes,
        targetZones: ['cervical_neck', 'arms_hands', 'lumbar_spine', 'legs_feet'],
        intensity: painLevel > 5 ? 'Gentle / Acute' : 'Restorative',
        exercises: exercisesToUse,
      };

      setGeneratedRoutine(customProg);
    } catch (e) {
      console.warn('Routine gen error, creating local fallback:', e);
      const fallbackProg: RoutineProgram = {
        id: 'ai-custom-' + Date.now(),
        title: `Custom ${durationMinutes}-Min Spine & Nerve Protocol`,
        tagline: `Optimized for ${selectedAreas.slice(0, 2).join(' & ')}`,
        description: `Clinically curated neurodynamic sliders and decompression exercises.`,
        badge: 'Personalized',
        badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
        durationMinutes,
        targetZones: ['cervical_neck', 'arms_hands', 'lumbar_spine', 'legs_feet'],
        intensity: 'Restorative',
        exercises: ALL_EXERCISES.slice(0, 4),
      };
      setGeneratedRoutine(fallbackProg);
    } finally {
      setIsGeneratingRoutine(false);
    }
  };

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      if (selectedAreas.length > 1) {
        setSelectedAreas(selectedAreas.filter((a) => a !== area));
      }
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Bot className="w-4 h-4" />
              <span>Evidence-Based Physical Therapy AI</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              AI Physical Therapy Companion
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Ask clinical questions about your nerve symptoms or generate customized physical therapy protocols for your exact daily pain presentation.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center rounded-2xl bg-slate-950 p-1 border border-slate-800 text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'chat'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PT Chat Advisor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('routine_builder')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'routine_builder'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Smart Routine Builder
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'chat' ? (
        /* Chat View */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col h-[580px] justify-between space-y-4">
          {/* Messages Scroll Area */}
          <div className="overflow-y-auto space-y-4 pr-1 flex-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-teal-400 border border-slate-700'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1 ${
                    msg.sender === 'user'
                      ? 'bg-teal-500/20 text-teal-100 border border-teal-500/40 rounded-tr-none'
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700/80 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className="text-[10px] text-slate-500 block text-right pt-0.5">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-teal-400 border border-slate-700 flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                  <span>Consulting Physical Therapy neurodynamics model...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Pills */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block mb-1.5">
              Suggested Clinical Queries:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Query Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              placeholder="Ask about neck & back exercises, hand numbness, sciatica, or posture..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={isSending}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isSending}
              className="p-3 rounded-2xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-lg shadow-teal-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Routine Generator View */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
            <Sparkles className="w-5 h-5" />
            <span>AI Dynamic Neurodynamic Routine Generator</span>
          </div>

          {/* Form parameters */}
          <div className="space-y-4">
            {/* Target Regions */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                1. Select Target Degenerative / Irritated Zones:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Neck (Cervical)',
                  'Hands & Arms',
                  'Mid Back (Thoracic)',
                  'Lower Back (Lumbar)',
                  'Hips & Glutes',
                  'Legs & Sciatic',
                ].map((area) => {
                  const isSelected = selectedAreas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleArea(area)}
                      className={`text-xs px-3.5 py-2 rounded-xl border font-semibold transition-all ${
                        isSelected
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/60'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800'
                      }`}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pain / Irritability Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-200">
                  2. Current Symptom Irritability:
                </span>
                <span className="font-black text-teal-300">{painLevel} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(Number(e.target.value))}
                className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                {painLevel <= 3
                  ? 'Mild: Routine will include progressive mobilization & stability.'
                  : painLevel <= 6
                  ? 'Moderate: Balanced gentle nerve sliders and spinal decompression.'
                  : 'High: Ultra-gentle micro-excursions and autonomic calming.'}
              </p>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                3. Available Session Time:
              </label>
              <div className="flex gap-2">
                {[6, 10, 15, 20].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDurationMinutes(mins)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      durationMinutes === mins
                        ? 'bg-teal-500 text-slate-950 border-teal-400'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {mins} Mins
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateAiRoutine}
              disabled={isGeneratingRoutine}
              className="w-full py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isGeneratingRoutine ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Personalized Rehabilitation Routine...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  <span>Generate Customized Routine</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Routine Preview Card */}
          {generatedRoutine && (
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-teal-500/40 space-y-4 animate-fade-in">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    AI Generated Protocol
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {generatedRoutine.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {generatedRoutine.tagline}
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-300">
                  {generatedRoutine.durationMinutes} Mins
                </span>
              </div>

              {/* Exercises in generated list */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-300 block">
                  Prescribed Exercise Sequence ({generatedRoutine.exercises.length} movements):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {generatedRoutine.exercises.map((ex, idx) => (
                    <div
                      key={ex.id || idx}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <span className="font-semibold text-white truncate block">
                          {ex.title}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate block">
                          {ex.targetNerves[0] || ex.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onStartCustomProgram(generatedRoutine)}
                className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch This AI Routine Now</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
