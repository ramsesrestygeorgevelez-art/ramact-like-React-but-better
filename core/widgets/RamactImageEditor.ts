// RamactImageEditor.ts

import { WidgetUI } from "../core";
import { RamactStyleSheet } from "../tools/stylesheet";

/**
 * RamactImageEditorSettings
 *
 * Defines configuration options for the image editor widget.
 */
export type RamactImageEditorSettings = {
  /** Unique identifier for the editor instance */
  id: string;
  /** Initial image source (URL or base64 string) */
  src: string;
  /** Width of the editor canvas */
  width: number;
  /** Height of the editor canvas */
  height: number;
  /** Optional stylesheet for styling the editor UI */
  styleSheet?: RamactStyleSheet;
};

/**
 * RamactImageEditor
 *
 * Provides image editing capabilities such as loading, filtering,
 * rotating, flipping, and exporting images. Designed to integrate
 * with the Ramact Widget/UI system.
 */
export class RamactImageEditor {
  private settings: RamactImageEditorSettings;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(settings: RamactImageEditorSettings) {
    this.settings = settings;

    this.canvas = document.createElement("canvas");
    this.canvas.width = settings.width;
    this.canvas.height = settings.height;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to initialize canvas context.");
    this.context = ctx;

    this.loadImage(settings.src);
  }

  async loadImage(src: string): Promise<void> {
    const img = new Image();
    img.src = src;
    await img.decode();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }

  applyFilter(filter: string): void {
    this.context.filter = filter;
    this.context.drawImage(this.canvas, 0, 0);
    this.context.filter = "none";
  }

  rotate(degrees: number): void {
    const radians = (degrees * Math.PI) / 180;
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.context.rotate(radians);
    this.context.translate(-this.canvas.width / 2, -this.canvas.height / 2);
    this.context.drawImage(this.canvas, 0, 0);
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  flip(axis: "horizontal" | "vertical"): void {
    this.context.save();
    if (axis === "horizontal") {
      this.context.scale(-1, 1);
      this.context.drawImage(this.canvas, -this.canvas.width, 0);
    } else {
      this.context.scale(1, -1);
      this.context.drawImage(this.canvas, 0, -this.canvas.height);
    }
    this.context.restore();
  }

  exportImage(format: "image/png" | "image/jpeg" = "image/png", quality = 1.0): string {
    return this.canvas.toDataURL(format, quality);
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}

/**
 * Widget wrapper for RamactImageEditor
 *
 * Ensures the image editor integrates with the WidgetUI system.
 */
export const RamactImageEditorWidget = new WidgetUI("RamactImageEditor", {
  X: 50,
  Y: 50,
});
