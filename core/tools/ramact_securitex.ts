/**
 * RamactSecuritySettings
 *
 * Defines configuration options for the security tools.
 */
export type RamactSecuritySettings = {
  /** Algorithm used for hashing (e.g., "SHA-256", "SHA-1", "MD5") */
  algorithm: string;
};

/**
 * RamactSecuritex
 *
 * Provides basic security utilities such as hashing and token generation.
 */
export class RamactSecuritex {
  private settings: RamactSecuritySettings;

  /**
   * Creates a new RamactSecuritex instance.
   * @param settings - Initial security settings.
   */
  constructor(settings: RamactSecuritySettings) {
    this.settings = settings;
  }

  /**
   * Gets the current security settings.
   * @returns Current RamactSecuritySettings object.
   */
  getSettings(): RamactSecuritySettings {
    return this.settings;
  }

  /**
   * Generates a cryptographic hash of the given data.
   * @param data - Input string to hash.
   * @returns Promise resolving to a hex string of the hash.
   */
  async hash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(data);
    const digest = await crypto.subtle.digest(this.settings.algorithm, buffer);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  /**
   * Generates a random token string.
   * @param length - Length of the token (default: 32).
   * @returns Random alphanumeric token.
   */
  generateToken(length: number = 32): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    const array = crypto.getRandomValues(new Uint8Array(length));
    for (const value of array) {
      token += chars[value % chars.length];
    }
    return token;
  }
}
