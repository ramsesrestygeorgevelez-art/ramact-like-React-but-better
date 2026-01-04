// ramact_settingutil.ts

/**
 * RamactSetting
 *
 * Represents a single setting with a key and value.
 */
export type RamactSetting<T = unknown> = {
  /** Unique key for the setting */
  key: string;
  /** Value of the setting */
  value: T;
};

/**
 * RamactSettingUtil
 *
 * Provides utilities for managing application or module settings.
 * Supports registering, updating, retrieving, and resetting settings.
 */
export class RamactSettingUtil {
  private settings: Map<string, RamactSetting>;

  /**
   * Creates a new RamactSettingUtil instance.
   */
  constructor() {
    this.settings = new Map();
  }

  /**
   * Registers a new setting.
   * @param key - Unique key for the setting.
   * @param value - Initial value of the setting.
   */
  registerSetting<T>(key: string, value: T): void {
    this.settings.set(key, { key, value });
  }

  /**
   * Updates an existing setting.
   * @param key - Key of the setting to update.
   * @param value - New value for the setting.
   */
  updateSetting<T>(key: string, value: T): void {
    if (!this.settings.has(key)) {
      throw new Error(`Setting '${key}' not found.`);
    }
    this.settings.set(key, { key, value });
  }

  /**
   * Retrieves a setting by key.
   * @param key - Key of the setting to retrieve.
   * @returns The setting value if found, otherwise undefined.
   */
  getSetting<T>(key: string): T | undefined {
    return this.settings.get(key)?.value as T | undefined;
  }

  /**
   * Lists all registered settings.
   * @returns Array of RamactSetting objects.
   */
  listSettings(): RamactSetting[] {
    return Array.from(this.settings.values());
  }

  /**
   * Resets a setting to undefined.
   * @param key - Key of the setting to reset.
   */
  resetSetting(key: string): void {
    if (this.settings.has(key)) {
      this.settings.set(key, { key, value: undefined });
    }
  }

  /**
   * Clears all settings.
   */
  clearAll(): void {
    this.settings.clear();
  }
}
