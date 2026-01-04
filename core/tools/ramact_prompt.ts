import { RamactStyleSheet } from "../tools/stylesheet"
/**
 * PromptType
 *
 * Defines the type of the prompt.
 */
export type PromptType = "Alert" | "Question" | "Normal";

/**
 * RamactPromptSettings
 *
 * Configuration object for a prompt, including type, title, and stylesheet.
 */
export type RamactPromptSettings = {
  /** The type of prompt (Alert, Question, Normal) */
  type: PromptType;
  /** Title text displayed in the prompt */
  title: string;
  /** Associated stylesheet for styling the prompt */
  styleSheet: RamactStyleSheet;
};

/**
 * RamactPrompt
 *
 * Represents a prompt that can be displayed with a given configuration.
 */
export class RamactPrompt {
  private settings: RamactPromptSettings;

  /**
   * Creates a new RamactPrompt instance.
   * @param settings - The settings for the prompt.
   */
  constructor(settings: RamactPromptSettings) {
    this.settings = settings;
  }

  /**
   * Gets the current prompt settings.
   * @returns The RamactPromptSettings object.
   */
  getSettings(): RamactPromptSettings {
    return this.settings;
  }

  /**
   * Renders the prompt (stub for integration with UI).
   */
  render(): void {
    if (this.settings.type === "Question") {
       prompt(this.settings.title)
    }
    if (this.settings.type === "Normal"){
        alert(this.settings.title)
    }
    if (this.settings.type === "Alert") {
        alert(this.settings.title)
    }
  }
}
