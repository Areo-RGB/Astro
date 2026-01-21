// ===================================
// Training Tools - Shared JavaScript Utilities
// Vanilla JS (converted from React hooks)
// ===================================

// Game States Enum
export const GameState = {
  CONFIG: 'CONFIG',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  PENDING: 'PENDING',
  FINISHED: 'FINISHED'
};

// Colors Data
export const COLORS_DATA = [
  { name: 'weiß', class: 'bg-color-white', hex: '#f3f4f6' },
  { name: 'rot', class: 'bg-color-red', hex: '#dc2626' },
  { name: 'blau', class: 'bg-color-blue', hex: '#2563eb' },
  { name: 'grün', class: 'bg-color-green', hex: '#16a34a' },
  { name: 'gelb', class: 'bg-color-yellow', hex: '#facc15' },
];

// Tools Configuration
export const TOOLS = [
  {
    id: 'farben',
    name: 'Farben',
    description: 'Stroop-Effekt-Trainer. Farben und Wörter blinken zur Reaktionsschulung',
    path: '/farben',
    icon: 'droplet',
    tags: ['KOGNITIV', 'REAKTION'],
    accentColor: 'border-l-purple'
  },
  {
    id: 'kettenrechner',
    name: 'Kettenrechner',
    description: 'Kopfrechnen-Kettenaufgaben. Löse fortlaufende Rechenoperationen',
    path: '/kettenrechner',
    icon: 'calculator',
    tags: ['MATHE', 'FOKUS'],
    accentColor: 'border-l-green'
  },
];

// ===================================
// Local Storage Utilities
// ===================================

export function getFromStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
}

// ===================================
// Audio Utilities
// ===================================

let audioContext = null;
const activeOscillators = new Set();

export function initAudio() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
    }
  }
  if (audioContext?.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

export function playBeep(freq = 600, duration = 0.15, vol = 0.5, type = 'sine') {
  const ctx = initAudio();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  activeOscillators.add(osc);
  
  osc.onended = () => {
    activeOscillators.delete(osc);
    osc.disconnect();
    gain.disconnect();
  };

  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function playSuccess() {
  playBeep(800, 0.1, 0.3, 'sine');
  setTimeout(() => playBeep(1200, 0.2, 0.3, 'sine'), 100);
}

export function playFailure() {
  playBeep(300, 0.3, 0.5, 'sawtooth');
}

export function stopAllAudio() {
  activeOscillators.forEach(osc => {
    try {
      osc.stop();
      osc.disconnect();
    } catch (e) {
      // Already stopped
    }
  });
  activeOscillators.clear();
}

// ===================================
// Microphone Utilities
// ===================================

export class MicrophoneHandler {
  constructor(options = {}) {
    this.threshold = options.threshold || 50;
    this.cooldown = options.cooldown || 500;
    this.onTrigger = options.onTrigger || null;
    this.onLevelChange = options.onLevelChange || null;
    
    this.audioContext = null;
    this.analyser = null;
    this.source = null;
    this.rafId = null;
    this.lastTriggerTime = 0;
    this.active = false;
  }

  async start(deviceId = null) {
    try {
      const constraints = {
        audio: deviceId ? { deviceId: { exact: deviceId } } : true
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.5;

      this.source = this.audioContext.createMediaStreamSource(stream);
      this.source.connect(this.analyser);

      this.active = true;
      this.updateLevel();
      
      return true;
    } catch (err) {
      console.error("Microphone access error:", err);
      return false;
    }
  }

  updateLevel() {
    if (!this.active || !this.analyser) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);

    // Calculate RMS
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      const x = (dataArray[i] - 128) / 128;
      sum += x * x;
    }
    const rms = Math.sqrt(sum / bufferLength);
    const amplifiedLevel = Math.min(100, Math.round(rms * 400));

    if (this.onLevelChange) {
      this.onLevelChange(amplifiedLevel);
    }

    const now = Date.now();
    if (amplifiedLevel > this.threshold && (now - this.lastTriggerTime > this.cooldown)) {
      this.lastTriggerTime = now;
      if (this.onTrigger) {
        this.onTrigger();
      }
    }

    this.rafId = requestAnimationFrame(() => this.updateLevel());
  }

  stop() {
    this.active = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
  }

  setThreshold(value) {
    this.threshold = value;
  }

  setCooldown(value) {
    this.cooldown = value;
  }
}

// ===================================
// UI Helpers
// ===================================

export function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// ===================================
// Utility Functions
// ===================================

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomColor(excludeName = null) {
  let color;
  do {
    color = COLORS_DATA[Math.floor(Math.random() * COLORS_DATA.length)];
  } while (color.name === excludeName);
  return color;
}
