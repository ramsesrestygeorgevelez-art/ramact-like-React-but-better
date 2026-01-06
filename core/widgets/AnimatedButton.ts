
import { WidgetUI } from "../core";
import { Animation } from "../tools/animationex";

const animatedButton = new WidgetUI("Animated", { X: 250, Y: 90 });
// 1. Create your animation settings
const jumpSettings = {
  name: "JumpEffect",
  keyframes: [
    { name: "moveUp", type: "Position" as const, value: { x: 0, y: -20 } },
    { name: "rotate", type: "Rotation" as const, value: 15 }
  ]
};

// 2. Initialize the animation class
const myAnimation = new Animation(jumpSettings);
myAnimation.playAnimation(animatedButton)