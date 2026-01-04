// Ramini.ts

import { RamactSettingUtil } from "../tools/Ramact_Setting";
import { RamactSecuritex } from "../tools/ramact_securitex";
import { RamactPrompt, PromptType } from "../tools/ramact_prompt";
import { RamactStyleSheet } from "./stylesheet";

/**
 * RaminiSettings
 *
 * Defines configuration options for the Ramini AI module.
 */
export type RaminiSettings = {
  /** Unique identifier for the AI instance */
  id: string;
  /** Personality or mode (e.g., "Helper", "Analyst", "Creative") */
  mode: string;
};

/**
 * Ramini
 *
 * The AI core of the Ramact ecosystem.
 * Provides reasoning, suggestions, and automation across modules.
 */
export class Ramini {
  private settings: RaminiSettings;
  private settingUtil: RamactSettingUtil;
  private securitex: RamactSecuritex;

  /**
   * Creates a new Ramini AI instance.
   * @param settings - Initial AI settings.
   */
  constructor(settings: RaminiSettings) {
    this.settings = settings;
    this.settingUtil = new RamactSettingUtil();
    this.securitex = new RamactSecuritex({ algorithm: "SHA-256" });
  }

  /**
   * Gets the current AI settings.
   * @returns RaminiSettings object.
   */
  getSettings(): RaminiSettings {
    return this.settings;
  }

  /**
   * Generates a suggestion based on context.
   * @param context - Input string describing the situation.
   * @returns Suggested action or idea.
   */
  async suggest(context: string): Promise<string> {
    // Simple stub: hash the context to simulate "thinking"
    const hash = await this.securitex.hash(context);
    return `Suggestion [${this.settings.mode}]: Based on "${context}", hash=${hash.slice(0, 8)}...`;
  }

  /**
   * Creates a prompt for the user.
   * @param title - Title of the prompt.
   * @param type - Type of prompt ("Alert", "Question", "Normal").
   */
  createPrompt(title: string, type: PromptType): RamactPrompt {
    return new RamactPrompt({
      type,
      title,
      styleSheet: {
        name: "default",
        backgroundColor: "#222",
        color: "#fff",
        fontFamily: "Arial",
      } as RamactStyleSheet,
    });
  }

  /**
   * Stores a preference in the AI's setting util.
   * @param key - Preference key.
   * @param value - Preference value.
   */
  setPreference(key: string, value: unknown): void {
    this.settingUtil.registerSetting(key, value);
  }

  /**
   * Retrieves a stored preference.
   * @param key - Preference key.
   * @returns Preference value if found.
   */
  getPreference<T>(key: string): T | undefined {
    return this.settingUtil.getSetting<T>(key);
  }
}
