// Web Audio API Synthesizer for Retro 8-bit Sound Effects

class AudioSynth {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('arcade_muted') === 'true';
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser.", e);
    }
  }

  setMute(state) {
    this.muted = state;
    localStorage.setItem('arcade_muted', state ? 'true' : 'false');
  }

  isMuted() {
    return this.muted;
  }

  // Generic 8-bit synth play method
  playTone(freq, type = 'square', duration = 0.1, volume = 0.1, delay = 0) {
    this.init();
    if (this.muted || !this.ctx) return;

    // Resume context if suspended (browser security)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
    
    // Quick attack and decay to sound like 8-bit console envelope
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime + delay);
    gainNode.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + delay + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration);
  }

  // Sound effects
  playBeep() {
    // Menu hover beep (short high-pitched square tone)
    this.playTone(880, 'square', 0.05, 0.04);
  }

  playSelect() {
    // Menu click/select beep (quick low-to-high chirp)
    this.init();
    if (this.muted || !this.ctx) return;
    this.playTone(600, 'square', 0.08, 0.08);
    this.playTone(1200, 'square', 0.08, 0.08, 0.04);
  }

  playCoin() {
    // Classic NES coin sound: two ascending square wave notes
    this.init();
    if (this.muted || !this.ctx) return;
    this.playTone(987.77, 'square', 0.08, 0.1); // B5
    this.playTone(1318.51, 'square', 0.25, 0.1, 0.08); // E6
  }

  playBoot() {
    // Old 8-bit computer system boot hum and beep
    this.init();
    if (this.muted || !this.ctx) return;
    // Lower hum
    this.playTone(110, 'triangle', 0.4, 0.15);
    this.playTone(220, 'triangle', 0.4, 0.1, 0.1);
    // Beep chirp
    this.playTone(1500, 'square', 0.15, 0.06, 0.35);
  }

  playLevelUp() {
    // Ascending major chord fanfare
    this.init();
    if (this.muted || !this.ctx) return;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'square', 0.15, 0.08, idx * 0.06);
    });
  }

  playHit() {
    // Explosion / alien hit sound (noise or low triangle sliding down)
    this.init();
    if (this.muted || !this.ctx) return;
    this.playTone(150, 'sawtooth', 0.2, 0.1);
    this.playTone(80, 'sawtooth', 0.2, 0.1, 0.05);
  }

  playBuzzer() {
    this.init();
    if (this.muted || !this.ctx) return;
    this.playTone(130, 'sawtooth', 0.3, 0.12);
    this.playTone(130, 'sawtooth', 0.3, 0.12, 0.08);
  }
}

export const audio = new AudioSynth();
