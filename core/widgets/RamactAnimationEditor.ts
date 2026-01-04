// RamactAnimationEditor.ts

import { WidgetUI } from "../core";

export type Keyframe = {
  time: number;          // timestamp in ms
  property: string;      // property being animated (e.g., "x", "opacity")
  value: number | string; // target value
};

export type AnimationTrack = {
  id: string;
  keyframes: Keyframe[];
};

export class RamactAnimationEditor {
  private tracks: Map<string, AnimationTrack>;
  private duration: number;

  constructor(duration: number = 5000) {
    this.tracks = new Map();
    this.duration = duration;
  }

  addTrack(id: string): void {
    if (!this.tracks.has(id)) {
      this.tracks.set(id, { id, keyframes: [] });
    }
  }

  addKeyframe(trackId: string, keyframe: Keyframe): void {
    const track = this.tracks.get(trackId);
    if (!track) throw new Error(`Track ${trackId} not found`);
    track.keyframes.push(keyframe);
    track.keyframes.sort((a, b) => a.time - b.time);
  }

  getTracks(): AnimationTrack[] {
    return Array.from(this.tracks.values());
  }

  exportTimeline(): string {
    return JSON.stringify({ duration: this.duration, tracks: this.getTracks() }, null, 2);
  }

  reset(): void {
    this.tracks.clear();
  }
}

/**
 * Widget wrapper for RamactAnimationEditor
 */
export const RamactAnimationEditorWidget = new WidgetUI("RamactAnimationEditor", {
  X: 120,
  Y: 203
})