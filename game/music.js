const Speaker = require("speaker");
const { fill } = require("audio-buffer-utils");
let AudioBuffer = null;

import('audio-buffer').then((ab) => {
  console.log('ab', ab);
  AudioBuffer = ab.default;
  class MusicController {
    constructor() {
        this.currentVolume = 0.5;
        this.targetVolume = 0.5;

        this.currentTempo = 50;
        this.targetTempo = 120;

        this.currentPanSpeed = 0.01;
        this.targetPanSpeed = 0.5;

        this.transitionSpeed = 0.005; // Speed of progress (0 to 1 per update)
        this.progress = { volume: 0, tempo: 0, panSpeed: 0 }; // Track interpolation progress

        this.key = "C";
        this.isPlaying = false;

        this.pan = 0; // Pan position (-1 = full left, 1 = full right)
        this.panDirection = 1; // 1 = right, -1 = left

        this.speaker = new Speaker({
            channels: 2, // Stereo output
            bitDepth: 16, // Bit depth
            sampleRate: 44100, // Sample rate
        });

        this.eventHandlers = {}; // Event handlers for dynamic changes

        this.startFading(); // Start the fading loop
    }

    // S-Curve function for smooth interpolation
    sCurve(x) {
        return x * x * (3 - 2 * x);
    }

    resetProgress() {
      this.progress = { volume: 0, tempo: 0, panSpeed: 0 }
    }

    setTargetTempo(t) {
      this.targetTempo = t;
      this.resetProgress();
    }

    setTargetVolume(v) {
      this.targetVolume = v;
      this.resetProgress();
    }

    setTargetPanSpeed(p) {
      this.targetPanSpeed = p;
      this.resetProgress();
    }


    // Update properties toward their targets
    updateProperties() {
        // Update volume
        if (this.progress.volume < 1) {
            this.progress.volume += this.transitionSpeed;
            this.progress.volume = Math.min(this.progress.volume, 1); // Clamp to 1
            const x = this.sCurve(this.progress.volume);
            this.currentVolume =
                this.currentVolume + x * (this.targetVolume - this.currentVolume);
        }

        // Update tempo
        if (this.progress.tempo < 1) {
            this.progress.tempo += this.transitionSpeed;
            this.progress.tempo = Math.min(this.progress.tempo, 1); // Clamp to 1
            const x = this.sCurve(this.progress.tempo);
            this.currentTempo =
                this.currentTempo + x * (this.targetTempo - this.currentTempo);
        }

        // Update pan speed
        if (this.progress.panSpeed < 1) {
            this.progress.panSpeed += this.transitionSpeed;
            this.progress.panSpeed = Math.min(this.progress.panSpeed, 1); // Clamp to 1
            const x = this.sCurve(this.progress.panSpeed);
            this.currentPanSpeed =
                this.currentPanSpeed + x * (this.targetPanSpeed - this.currentPanSpeed);
        }
    }

    // Start a loop to update properties
    startFading() {
        setInterval(() => {
            this.updateProperties();
        }, 25); // Update every 50ms
    }

      // Generate a buffer for all notes in a given period
    generateBuffer(durationInSeconds) {
        const sampleRate = 44100;
        const length = Math.floor(sampleRate * durationInSeconds);
        const buffer = new Float32Array(length * 2); // Stereo buffer

        const baseFrequencies = this.getChordFrequencies(this.key);
        const layers = [
            { frequency: baseFrequencies[0], interval: 0.5 }, // Base layer
            { frequency: baseFrequencies[1], interval: .75 },   // Melody 1
            { frequency: baseFrequencies[2], interval: 1 },   // Melody 2
            { frequency: baseFrequencies[3], interval: 2 },   // Melody 2
        ];

          // Normalize buffer to avoid clipping
        const normalizeBuffer = (buffer) => {
          let maxAmplitude = 0;

          // Find the maximum amplitude in the buffer
          for (let i = 0; i < buffer.length; i++) {
              maxAmplitude = Math.max(maxAmplitude, Math.abs(buffer[i]));
          }

          // If the maximum amplitude exceeds 1, scale all values down
          if (maxAmplitude > .9) {
              for (let i = 0; i < buffer.length; i++) {
                  buffer[i] /= (maxAmplitude + .1);
                  buffer[i] = Math.max(0, Math.min(buffer[i], 1));
                  
              }
          }
        };


        const applyCompression = (buffer, threshold = 0.8) => {
          for (let i = 0; i < buffer.length; i++) {
              if (Math.abs(buffer[i]) > threshold) {
                  buffer[i] = Math.sign(buffer[i]) * threshold + (buffer[i] - Math.sign(buffer[i]) * threshold) * 0.5;
              }
          }
      };
      

        layers.forEach(({ frequency, interval }) => {
          const noteLength = Math.floor(sampleRate * (60 / this.currentTempo) * interval);
          for (let i = 0; i < length; i++) {
              // Only generate sound during the note's active duration
              if (i % noteLength < noteLength / 2) { // Play for half the note length
                  const t = i / sampleRate; // Time in seconds
                  const sampleValue =
                      this.currentVolume * Math.sin(2 * Math.PI * frequency * t) / layers.length;
      
                  // Stereo panning
                  const leftVolume = Math.max(0, 1 - this.pan);
                  const rightVolume = Math.max(0, 1 + this.pan);
      
                  buffer[i * 2] += sampleValue * leftVolume; // Left channel
                  buffer[i * 2 + 1] += sampleValue * rightVolume; // Right channel
              }
          }
      });
      

        // Normalize buffer to avoid clipping
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = Math.max(-1, Math.min(1, buffer[i])); // Clamp between -1 and 1
        }
        applyCompression(buffer);
        normalizeBuffer(buffer);
        
        return buffer;
    }

    // Play the generated buffer
    playBuffer(buffer) {
        const interleaved = new Int16Array(buffer.length); // Interleave stereo buffer

        for (let i = 0; i < buffer.length; i++) {
            interleaved[i] = Math.floor(buffer[i] * 32767); // Convert to 16-bit audio
        }

        this.speaker.write(Buffer.from(interleaved.buffer));
    }

    // Start the song
    startSong() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        const interval = 1; // Duration for each buffer in seconds
        this.songInterval = setInterval(() => {
            if (!this.isPlaying) return;

            const buffer = this.generateBuffer(interval);
            this.playBuffer(buffer);
        }, interval * 1000);
    }

    // Stop the song
    stopSong() {
        this.isPlaying = false;
        if (this.songInterval) clearInterval(this.songInterval);
        console.log("Song stopped.");
    }

    // Get base frequencies for a chord in the given key
    getChordFrequencies(key) {
        const keys = {
            C: [261.63, 329.63, 392.00, 523.25, 659.25], // C major chord
            G: [196.00, 246.94, 392.00, 440.00, 493.88], // G major chord
            F: [174.61, 220.00, 349.23, 440.00, 523.25], // F major chord
            A: [220.00, 277.18, 440.00, 554.37, 659.25], // A minor chord
        };
        return keys[key] || keys["C"]; // Default to C major if key is not found
    }
}

// Example usage
const musicController = new MusicController();

// Start the song
musicController.startSong();

// Simulate dynamic changes
setTimeout(() => {
    musicController.setTargetVolume(1); // Increase volume
    musicController.setTargetTempo(240); // Double tempo
    musicController.setTargetPanSpeed(0.1); // Increase panning speed
}, 5000);

// Stop the song after 30 seconds
setTimeout(() => musicController.stopSong(), 30000);


});