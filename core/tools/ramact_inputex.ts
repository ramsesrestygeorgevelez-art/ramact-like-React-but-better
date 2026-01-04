/**
 * RamactInputSettings
 *
 * Defines configuration options for the input system.
 */
export type RamactInputSettings = {
  /** Whether keyboard input should be enabled */
  enableKeyboard?: boolean;
  /** Whether mouse input should be enabled */
  enableMouse?: boolean;
  /** Whether touch input should be enabled */
  enableTouch?: boolean;
};

/**
 * RamactInputex
 *
 * Provides unified input handling for keyboard, mouse, and touch.
 * Allows registering event listeners and querying input states.
 */
export class RamactInputex {
  private settings: RamactInputSettings;
  private pressedKeys: Set<string>;
  private mousePosition: { x: number; y: number };
  private mouseButtons: Set<number>;
  private touches: Map<number, { x: number; y: number }>;
    listen: any;

  /**
   * Creates a new RamactInputex instance.
   * @param settings - Initial input settings.
   */
  constructor(settings: Partial<RamactInputSettings> = {}) {
    this.settings = {
      enableKeyboard: settings.enableKeyboard ?? true,
      enableMouse: settings.enableMouse ?? true,
      enableTouch: settings.enableTouch ?? true,
    };

    this.pressedKeys = new Set();
    this.mousePosition = { x: 0, y: 0 };
    this.mouseButtons = new Set();
    this.touches = new Map();

    this.initListeners();
  }

  /**
   * Initializes event listeners based on settings.
   */
  private initListeners(): void {
    if (this.settings.enableKeyboard) {
      window.addEventListener("keydown", (e) => this.pressedKeys.add(e.key));
      window.addEventListener("keyup", (e) => this.pressedKeys.delete(e.key));
    }

    if (this.settings.enableMouse) {
      window.addEventListener("mousemove", (e) => {
        this.mousePosition = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener("mousedown", (e) => this.mouseButtons.add(e.button));
      window.addEventListener("mouseup", (e) => this.mouseButtons.delete(e.button));
    }

    if (this.settings.enableTouch) {
      window.addEventListener("touchstart", (e) => {
        for (const touch of Array.from(e.touches)) {
          this.touches.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
        }
      });
      window.addEventListener("touchmove", (e) => {
        for (const touch of Array.from(e.touches)) {
          this.touches.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
        }
      });
      window.addEventListener("touchend", (e) => {
        for (const touch of Array.from(e.changedTouches)) {
          this.touches.delete(touch.identifier);
        }
      });
    }
  }

  /**
   * Checks if a specific key is currently pressed.
   * @param key - The key to check (e.g., "ArrowUp", "a").
   * @returns True if pressed, false otherwise.
   */
  isKeyPressed(key: string): boolean {
    return this.pressedKeys.has(key);
  }

  /**
   * Gets the current mouse position.
   * @returns Object with x and y coordinates.
   */
  getMousePosition(): { x: number; y: number } {
    return this.mousePosition;
  }

  /**
   * Checks if a specific mouse button is pressed.
   * @param button - Mouse button index (0 = left, 1 = middle, 2 = right).
   * @returns True if pressed, false otherwise.
   */
  isMouseButtonPressed(button: number): boolean {
    return this.mouseButtons.has(button);
  }

  /**
   * Gets all active touches.
   * @returns Map of touch identifiers to positions.
   */
  getTouches(): Map<number, { x: number; y: number }> {
    return this.touches;
  }

  /**
   * Clears all input states (keys, mouse, touches).
   */
  reset(): void {
    this.pressedKeys.clear();
    this.mouseButtons.clear();
    this.touches.clear();
    this.mousePosition = { x: 0, y: 0 };
  }
}
