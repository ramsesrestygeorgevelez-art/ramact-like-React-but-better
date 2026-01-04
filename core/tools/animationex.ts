// Define a more specific type for keyframes
type KeyframeType = "Position" | "Size" | "Rotation";

type Keyframe = {
  name: string;
  type: KeyframeType;
  value: number; // could be number, object, etc. depending on your animation system
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

  addKeyframe(name: string, keyframeType: KeyframeType, value: any) {
    const newKeyframe: Keyframe = {
      name,
      type: keyframeType,
      value,
    };

    this.AnimationSettings.keyframes.push(newKeyframe);
    return newKeyframe; // optional: return the created keyframe
  }

  getKeyframes() {
    return this.AnimationSettings.keyframes;
  }
}
