const fs = require('fs');
const path = require('path');
const { AudioContext } = require('node-web-audio-api');
const audioContext = new AudioContext();
const wav = require('wav');

/**
 * Extracts feeling names from files in a folder and maps them to their full file paths.
 * @param {string} folderPath - The folder to scan for files.
 * @returns {Promise<Map<string, string>>} A map of feelings to their file paths.
 */
async function getFeelingFileMap(folderPath) {
    const feelingFileMap = new Map();

    try {
        const files = await fs.promises.readdir(folderPath);

        files.forEach(file => {
            // Check if the file name matches the pattern
            if (file.startsWith('orchestral_') && file.endsWith('_30.wav')) {
                const feeling = file
                    .replace(/^orchestral_/, '') // Remove the "orchestral_" prefix
                    .replace(/_30\.wav$/, ''); // Remove the "_30.wav" suffix

                const fullFilePath = path.join(folderPath, file);
                feelingFileMap.set(feeling, fullFilePath);
            }
        });
    } catch (err) {
        console.error('Error reading folder:', err);
        throw err;
    }

    return feelingFileMap;
}


/**
 * Decodes a WAV file into an AudioBuffer.
 * @param {string} filePath - Path to the WAV file.
 * @returns {Promise<AudioBuffer>} - Decoded audio buffer.
 */
function decodeWavFile(filePath) {
  //console.log(`Decoding file: ${filePath}`);
  return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(filePath);
      const reader = new wav.Reader();

      reader.on('format', format => {
          /*console.log(
              `File format - Channels: ${format.channels}, Sample Rate: ${format.sampleRate}, Bit Depth: ${format.bitDepth}`
          );*/

          const channelData = Array(format.channels).fill().map(() => []);
          const sampleBytes = format.bitDepth / 8;

          reader.on('data', chunk => {
              for (let i = 0; i < chunk.length; i += sampleBytes * format.channels) {
                  for (let channel = 0; channel < format.channels; channel++) {
                      const sampleOffset = i + channel * sampleBytes;

                      let sample;
                      if (format.bitDepth === 32) {
                          // Handle 32-bit PCM
                          sample = chunk.readFloatLE(sampleOffset); // Float PCM
                      } else {
                          // Handle Integer PCM (8-bit, 16-bit, etc.)
                          if (format.bitDepth === 8) {
                              sample = chunk.readInt8(sampleOffset) / 0x80; // Normalize 8-bit
                          } else if (format.bitDepth === 16) {
                              sample = chunk.readInt16LE(sampleOffset) / 0x8000; // Normalize 16-bit
                          } else if (format.bitDepth === 32) {
                              sample = chunk.readInt32LE(sampleOffset) / 0x80000000; // Normalize 32-bit Int
                          }
                      }

                      channelData[channel].push(sample);
                  }
              }
          });

          reader.on('end', () => {
              //console.log(`Finished decoding file: ${filePath}`);
              const audioBuffer = audioContext.createBuffer(
                  format.channels,
                  channelData[0].length,
                  format.sampleRate
              );

              for (let channel = 0; channel < format.channels; channel++) {
                  const channelArray = Float32Array.from(channelData[channel]);
                  audioBuffer.copyToChannel(channelArray, channel);
              }

              resolve(audioBuffer);
          });
      });

      reader.on('error', error => {
          //console.error(`Error decoding file: ${filePath}`, error);
          reject(error);
      });

      fileStream.pipe(reader);
  });
}

/**
* Plays an AudioBuffer with optional fade-in and fade-out.
* @param {AudioBuffer} audioBuffer - Audio buffer to play.
* @param {number} overlapDuration - Fade-in/out duration in seconds.
* @returns {Promise<void>} - Resolves when playback finishes.
*/
async function playAudioBuffer(audioBuffer, overlapDuration = 5) {
  return new Promise(resolve => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = audioContext.createGain();
      source.connect(gainNode).connect(audioContext.destination);

      const fadeDuration = Math.min(overlapDuration, audioBuffer.duration / 2);
      const startTime = audioContext.currentTime;
      const endTime = startTime + audioBuffer.duration;

      // Apply fade-in
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(1, startTime + fadeDuration);

      // Apply fade-out
      gainNode.gain.setValueAtTime(1, endTime - fadeDuration);
      gainNode.gain.linearRampToValueAtTime(0, endTime);

      source.start(startTime);
      source.stop(endTime);

      source.onended = resolve;
  });
}

/**
 * Finds the first file where the key contains the provided feeling name.
 * @param {Map<string, string>} feelingFileMap - Map of feelings to file paths.
 * @param {string} feelingName - The feeling name to search for in the keys.
 * @returns {string | null} - The file path of the first matching key, or null if no match is found.
 */
function findFileByFeeling(feelingFileMap, feelingName) {
  for (const [key, filePath] of feelingFileMap.entries()) {
      if (key.includes(feelingName)) {
          return filePath;
      }
  }
  return null; // Return null if no match is found
}/**
 * Plays preferred feelings with proper looping and seamless transitions.
 * @param {Map<string, string>} feelingFileMap - Map of feelings to file paths.
 * @param {string[]} preferredFeelings - Baseline list of preferred feelings.
 * @param {object} logger - Logger object with a `log` method.
 * @returns {object} - Controller object with methods to handle playback events.
 */
async function playPreferredFeelings(feelingFileMap, preferredFeelings, logger = console) {
  const filteredFiles = Array.from(feelingFileMap.entries())
      .filter(([feeling]) => preferredFeelings.includes(feeling))
      .map(([, filePath]) => filePath);

  if (filteredFiles.length === 0) {
      logger.log('No matching feelings found.');
      return;
  }

  let currentIndex = 0;
  let isPlayingBaseline = true;
  let currentSource = null; // Active audio source
  let currentlyPlayingPath = null; // Path of the currently playing track

/**
 * Stops the currently playing audio source, if any.
 * @param {number} delay - Time in milliseconds to delay stopping the audio.
 */
function stopCurrentPlayback(delay = 50) {
  if (currentSource) {
      setTimeout(() => {
          if (currentSource) { // Additional null check
              currentSource.stop();
              currentSource = null;
          }
      }, delay);
  }
}

  /**
   * Plays the next track from the baseline list, looping back to the start as needed.
   */
  async function playBaselineTrack() {
      if (!isPlayingBaseline) return;

      const currentFile = filteredFiles[currentIndex];
      if (currentlyPlayingPath === currentFile) {
          logger.log(`Already playing baseline track: ${currentFile}`);
          return;
      }

      currentIndex = (currentIndex + 1) % filteredFiles.length; // Loop back to the start

      logger.log(`Now playing (baseline): ${currentFile}`);
      const currentBuffer = await decodeWavFile(currentFile);

      stopCurrentPlayback(50); // Fade out and stop the previous track
      currentSource = audioContext.createBufferSource();
      currentSource.buffer = currentBuffer;
      currentSource.connect(audioContext.destination);
      currentSource.start();
      currentlyPlayingPath = currentFile;
      currentSource.onended = playBaselineTrack; // Automatically play the next track when done
  }

  /**
   * Switches to a custom track based on a feeling and returns to the baseline after a delay.
   * @param {string} feeling - The feeling name to look up in the map.
   * @param {number} delay - Time in seconds before returning to baseline.
   */
  async function playCustomTrack(feeling, delay) {
      const trackPath = findFileByFeeling(feelingFileMap, feeling);
      if (!trackPath) {
          logger.log(`No track found for feeling: ${feeling}`);
          return;
      }

      if (currentlyPlayingPath === trackPath) {
          logger.log(`Already playing custom track: ${trackPath}`);
          return;
      }

      logger.log(`Switching to custom track for feeling "${feeling}": ${trackPath}`);
      isPlayingBaseline = false;

      stopCurrentPlayback(50); // Stop the previous track after a short delay
      const customBuffer = await decodeWavFile(trackPath);
      currentSource = audioContext.createBufferSource();
      currentSource.buffer = customBuffer;
      currentSource.connect(audioContext.destination);
      currentSource.start();
      currentlyPlayingPath = trackPath;

      // Schedule return to baseline after the custom track finishes
      setTimeout(() => {
          logger.log('Returning to baseline list.');
          isPlayingBaseline = true;
          playBaselineTrack();
      }, delay * 1000); // Delay in milliseconds
  }

  /**
   * Immediately stops any playback and returns to the baseline playlist.
   */
  function returnToBaseline() {
      logger.log('Interrupting current playback and returning to baseline.');
      isPlayingBaseline = true;
      stopCurrentPlayback(50); // Stop current track
      playBaselineTrack(); // Resume baseline
  }

  // Start the baseline playback loop
  playBaselineTrack();

  // Return the controller with event methods
  return {
      playCustomTrack,
      returnToBaseline,
  };
}

module.exports = {
  getFeelingFileMap,
  playPreferredFeelings,
  findFileByFeeling
}

// Example usage:
// Replace '/path/to/folder' with the path to your folder
/*(async () => {
    const folderPath = 'c:/projects/MusicGPT/x86_64-pc-windows-msvc';
    try {
        const feelingMap = await getFeelingFileMap(folderPath);
        console.log('Feeling to File Map:', Object.fromEntries(feelingMap));

        const filteredKeys = Array.from(feelingMap.keys()).filter(key =>
          ['awe', 'nostalgia', 'curious', 'bored', 'serenity', 'walking__ambling', 'unfocused']
              .some(substring => key.includes(substring))
      );
      
        console.log(filteredKeys)

        const controller = await playPreferredFeelings(feelingMap, filteredKeys);

        // Example event triggers
        setTimeout(() => {
            controller.playCustomTrack(findFileByFeeling(feelingMap, 'sadness'), 60); // Play custom track for 60 seconds
        }, 10000); // Trigger after 10 seconds
    
        setTimeout(() => {
            controller.returnToBaseline(); // Interrupt custom playback and return to baseline
        }, 30000); // Trigger after 30 seconds
    
  
      } catch (err) {
        console.error('Error:', err);
    }
})();*/
