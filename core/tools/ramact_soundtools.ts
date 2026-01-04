/**
 * The Ramact SoundToolsSettings type
 *
 * Defines configuration options for sound tools.
 */
export type SoundToolsSettings = {
  /** Master volume level (0.0 = silent, 1.0 = max) */
  volume: number;
  /** Whether sound is muted */
  muted?: boolean;
};

/**
 * RamactSoundTools
 *
 * Provides sound management utilities such as volume control,
 * mute/unmute, and playback using the Web Audio API.
 */
export class RamactSoundTools {
  private settings: SoundToolsSettings;
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private buffers: Map<string, AudioBuffer>;

  /**
   * Creates a new RamactSoundTools instance.
   * @param settings - Initial sound settings.
   */
  constructor(settings: Partial<SoundToolsSettings> = {}) {
    this.settings = {
      volume: settings.volume ?? 1.0,
      muted: settings.muted ?? false,
    };

    // Initialize Web Audio API
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = this.settings.muted ? 0 : this.settings.volume;

    this.buffers = new Map();
  }

  /**
   * Gets the current sound settings.
   * @returns Current SoundToolsSettings object.
   */
  getSettings(): SoundToolsSettings {
    return this.settings;
  }

  /**
   * Sets the master volume.
   * @param volume - A number between 0.0 (silent) and 1.0 (max).
   */
  setVolume(volume: number): void {
    if (volume < 0.0 || volume > 1.0) {
      throw new Error("Volume must be between 0.0 and 1.0");
    }
    this.settings.volume = volume;
    if (!this.settings.muted) {
      this.gainNode.gain.value = volume;
    }
  }

  /**
   * Mutes all sound.
   */
  mute(): void {
    this.settings.muted = true;
    this.gainNode.gain.value = 0;
  }

  /**
   * Unmutes all sound.
   */
  unmute(): void {
    this.settings.muted = false;
    this.gainNode.gain.value = this.settings.volume;
  }

  /**
   * Loads an audio file into memory for playback.
   * @param name - Identifier for the sound.
   * @param url - URL of the audio file.
   */
  async loadSound(name: string, url: string): Promise<void> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.buffers.set(name, audioBuffer);
  }

  /**
   * Plays a sound by name.
   * @param name - Identifier of the sound to play.
   */
  playSound(name: string): void {
    const buffer = this.buffers.get(name);
    if (!buffer) {
      console.warn(`Sound '${name}' not loaded.`);
      return;
    }
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.gainNode);
    source.start();
  }

  /**
   * Stops all currently playing sounds.
   * (Note: Web Audio API does not track sources automatically,
   * so this is a simplified global stop.)
   */
  stopAll(): void {
    this.audioContext.close();
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = this.settings.muted ? 0 : this.settings.volume;
    this.buffers.clear();
  }
}
