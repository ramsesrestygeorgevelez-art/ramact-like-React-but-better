// RamactSystem.ts

import { Ramact, WidgetUI } from "./core/core";
import { Animation } from "./core/tools/animationex";
import { RamactInputex } from "./core/tools/ramact_inputex";
import { RamactPrompt } from "./core/tools/ramact_prompt";
import { RamactAnimationEditorWidget } from "./core/widgets/RamactAnimationEditor";
import { RamactImageEditorWidget } from "./core/widgets/RamactImageEditor";
import { RamactPositionEditorWidget } from "./core/widgets/RamactPositionEditor";

/**
 * Registry of available widgets in the system.
 */
export interface RamactWidgetRegistry {
  AnimationEditor: typeof RamactAnimationEditorWidget;
  ImageEditor: typeof RamactImageEditorWidget;
  PositionEditor: typeof RamactPositionEditorWidget;
  [key: string]: WidgetUI; // extensible for future widgets
}

/**
 * Registry of available tools in the system.
 */
export interface RamactToolRegistry {
  animation: Animation;
  inputex: RamactInputex;
  prompt: RamactPrompt;
  [key: string]: unknown; // extensible for future tools
}

/**
 * RamactSystemInterface
 *
 * Defines the shape of the system registry using interfaces only.
 */
export interface RamactSystemInterface {
  core: Ramact;
  widgets: RamactWidgetRegistry;
  tools: RamactToolRegistry;

  registerWidget(name: string, widget: WidgetUI): void;
  addAnimation(animation: Animation): void;
  runAnimations(): void;
  showPrompt(): void;
  initInput(): void;
  bootstrap(): void;
}
