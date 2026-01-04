/**
 * RamactStyleSheet
 *
 * Defines a stylesheet configuration for prompts and UI components.
 * This type extends the built-in CSSStyleDeclaration interface,
 * giving access to every CSS property supported by browsers.
 */
export type RamactStyleSheet = {
  /** Unique name for the stylesheet */
  name: string;

  /** Core text & background */
  textColor?: string;
  fontSize?: string | number;
  fontWeight?: string | number;

  /** Box model */
  width?: string | number;
  height?: string | number;
  margin?: string | number;
  padding?: string | number;

  /** Borders */
  border?: string;
  borderRadius?: string | number;

  /** Positioning */
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;

  /** Flexbox & layout */
  display?: string;
  flexDirection?: "row" | "column";
  justifyContent?: string;
  alignItems?: string;

  /** Effects */
  boxShadow?: string;
  opacity?: number;
  cursor?: string;

  /** Transitions & animations */
  transition?: string;
  animation?: string;

  /** Overflow & clipping */
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  overflowX?: "visible" | "hidden" | "scroll" | "auto";
  overflowY?: "visible" | "hidden" | "scroll" | "auto";

  
} & Partial<CSSStyleDeclaration>

/**
 * RamactStyleManager
 *
 * Utility class to manage and retrieve stylesheets.
 */
export class RamactStyleManager {
  private styles: Map<string, RamactStyleSheet>;

  constructor() {
    this.styles = new Map();
  }

  /**
   * Registers a new stylesheet.
   * @param style - The stylesheet to register.
   */
  registerStyle(style: RamactStyleSheet): void {
    this.styles.set(style.name, style);
  }

  /**
   * Retrieves a stylesheet by name.
   * @param name - The name of the stylesheet.
   * @returns The stylesheet if found, otherwise undefined.
   */
  getStyle(name: string): RamactStyleSheet | undefined {
    return this.styles.get(name);
  }

  /**
   * Lists all registered stylesheet names.
   * @returns Array of stylesheet names.
   */
  listStyles(): string[] {
    return Array.from(this.styles.keys());
  }
}