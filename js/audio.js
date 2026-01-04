class AudioManager {
    constructor() {
        this.sounds = {};
        this.muted = false;
    }
    
    // Create audio files programmatically (Web Audio API)
    createHeartbeatSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        
        // Low frequency thump
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        osc1.connect(gain1);
        gain1.connect(audioContext.destination);
        
        osc1.frequency.setValueAtTime(150, now);
        osc1.frequency.exponentialRampToValueAtTime(75, now + 0.1);
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc1.start(now);
        osc1.stop(now + 0.1);
        
        // Second beat
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        
        osc2.frequency.setValueAtTime(200, now + 0.15);
        osc2.frequency.exponentialRampToValueAtTime(100, now + 0.25);
        gain2.gain.setValueAtTime(0.2, now + 0.15);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        
        osc2.start(now + 0.15);
        osc2.stop(now + 0.25);
    }
    
    createCracklSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        
        // White noise
        const bufferSize = audioContext.sampleRate * 0.1;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noiseNode = audioContext.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        
        const noiseGain = audioContext.createGain();
        noiseNode.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        
        noiseGain.gain.setValueAtTime(0.3, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        noiseNode.start(now);
        noiseNode.stop(now + 0.1);
    }
    
    createBurstSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        
        for (let i = 0; i < 3; i++) {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.setValueAtTime(300 + i * 100, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
            
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0, now + 0.2);
            
            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.2);
        }
    }
    
    playHeartbeat() {
        if (!this.muted) this.createHeartbeatSound();
    }
    
    playFirecracker() {
        if (!this.muted) {
            this.createCracklSound();
            setTimeout(() => this.createBurstSound(), 50);
        }
    }
    
    toggleMute() {
        this.muted = !this.muted;
    }
}

const audioManager = new AudioManager();