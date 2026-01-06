import { WidgetUI } from "../core"; // WidgetUI is HTMLElement

type KeyframeType = "Position" | "Size" | "Rotation" | "Bezier";

type Keyframe = {
  name: string;
  type: KeyframeType;
  value: any;
};

type AnimateSetting = {
  name: string;
  keyframes: Keyframe[];
};

export class Animation extends AnimationEffect {
  AnimationSettings: AnimateSetting;

  constructor(settings: AnimateSetting) {
    super();
    this.AnimationSettings = {
      ...settings,
      keyframes: settings.keyframes || [],
    };
  }
  /**
   * Creates a Keyframe.
   * @param name The name of the keyframe
   * @param keyframeType Type of keyframe
   * @param value The value. Can be CSS.
   * @returns Keyframe
   */
  addKeyframe(name: string, keyframeType: KeyframeType, value: any): Keyframe {
    const newKeyframe: Keyframe = { name, type: keyframeType, value };
    this.AnimationSettings.keyframes.push(newKeyframe);
    return newKeyframe;
  }

  getKeyframes() {
    return this.AnimationSettings.keyframes;
  }

  /**
   * Applies animation states directly to the HTMLElement's style
   */
  playAnimation(widget: WidgetUI): void {
    const keyframes = this.getKeyframes();
    if (!keyframes.length) return;

    keyframes.forEach((kf) => {
      switch (kf.type) {
        case "Position":
          // Assumes value is { x: number, y: number } or similar
          widget.style.left = `${kf.value.x}px`;
          widget.style.top = `${kf.value.y}px`;
          widget.style.position = "absolute"; // Ensure positioning works
          break;
        case "Size":
          // Assumes value is { width: number, height: number } or similar
          widget.style.width = `${kf.value.width}px`;
          widget.style.height = `${kf.value.height}px`;
          break;
        case "Rotation":
          // Assumes value is a number (degrees)
          widget.style.transform = `rotate(${kf.value}deg)`;
          break;
        case "Bezier":
          // Custom bezier logic for complex paths
          break;
      }
    });
  }
}
