// RamactPositionEditor.ts

import { WidgetUI } from "../core";

/**
 * Position type
 * Represents a 2D or 3D coordinate.
 */
export type Position = {
  x: number;
  y: number;
  z?: number; // optional for 3D
};

/**
 * VectorPlugin interface
 * Defines a plugin that can transform a position.
 */
export interface VectorPlugin {
  /** Unique name of the plugin */
  name: string;
  /** Apply transformation to a position */
  apply(position: Position): Position;
}

/**
 * RamactPositionEditor
 *
 * Editor for manipulating positions (2D/3D).
 * Supports plugins for vector transformations.
 */
export class RamactPositionEditor {
  private position: Position;
  private plugins: Map<string, VectorPlugin>;

  constructor(initial: Position = { x: 0, y: 0, z: 0 }) {
    this.position = initial;
    this.plugins = new Map();
  }

  /**
   * Sets the current position.
   */
  setPosition(pos: Position): void {
    this.position = pos;
  }

  /**
   * Gets the current position.
   */
  getPosition(): Position {
    return this.position;
  }

  /**
   * Registers a vector plugin.
   */
  registerPlugin(plugin: VectorPlugin): void {
    this.plugins.set(plugin.name, plugin);
  }

  /**
   * Applies a plugin transformation.
   */
  applyPlugin(name: string): void {
    const plugin = this.plugins.get(name);
    if (!plugin) throw new Error(`Plugin '${name}' not found`);
    this.position = plugin.apply(this.position);
  }

  /**
   * Exports the current position as JSON.
   */
  export(): string {
    return JSON.stringify(this.position, null, 2);
  }

  /**
   * Resets position to origin.
   */
  reset(): void {
    this.position = { x: 0, y: 0, z: 0 };
  }
}

/**
 * Widget wrapper for RamactPositionEditor
 */
export const RamactPositionEditorWidget = new WidgetUI("RamactPositionEditor", {
  X: 200,
  Y: 60,
});
