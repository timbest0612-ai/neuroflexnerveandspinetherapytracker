// Web Audio API Synthesizer & Speech Guidance

class PtAudioSystem {
  private audioCtx: AudioContext | null = null;
  private voiceEnabled: boolean = true;
  private soundEnabled: boolean = true;

  private initCtx() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
  }

  public isVoiceEnabled(): boolean {
    return this.voiceEnabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  // Play a soft Tibetan singing bowl / chime for start/rest intervals
  public playChime(type: 'start' | 'tick' | 'complete' | 'switch') {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      if (type === 'start') {
        // High harmonic chime
        this.createTone(528, now, 0.6, 'sine', 0.15); // 528Hz Solfeggio frequency
        this.createTone(1056, now + 0.05, 0.4, 'sine', 0.08);
      } else if (type === 'switch') {
        // Double gentle ping
        this.createTone(440, now, 0.3, 'sine', 0.12);
        this.createTone(659.25, now + 0.15, 0.5, 'sine', 0.15);
      } else if (type === 'tick') {
        // Soft wooden block tap for last 3 seconds
        this.createTone(800, now, 0.08, 'triangle', 0.08);
      } else if (type === 'complete') {
        // Major chord arpeggio
        this.createTone(523.25, now, 0.8, 'sine', 0.12); // C5
        this.createTone(659.25, now + 0.15, 0.8, 'sine', 0.12); // E5
        this.createTone(783.99, now + 0.3, 0.8, 'sine', 0.12); // G5
        this.createTone(1046.5, now + 0.45, 1.2, 'sine', 0.15); // C6
      }
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  private createTone(
    freq: number,
    startTime: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainVal: number = 0.1
  ) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Voice narration using Web Speech Synthesis API
  public speak(text: string, interrupt: boolean = false) {
    if (!this.voiceEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      if (interrupt) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // slightly slower and calmer for therapy coaching
      utterance.pitch = 1.0;

      // Select an English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioSystem = new PtAudioSystem();
