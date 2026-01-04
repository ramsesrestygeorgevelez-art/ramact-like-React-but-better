# Ramact Ecosystem

Ramact is a modular, plugin‑driven developer environment designed for extensibility, clarity, and maintainability.  
It provides a core runtime (`Ramact`), a set of tools (`RamactInputex`, `RamactPrompt`, `RamactFeedbackex`, etc.), and widgets (`RamactAnimationEditorWidget`, `RamactImageEditorWidget`, `RamactPositionEditorWidget`) that can be composed into a complete system.

---

## ✨ Features

- **Core runtime** (`Ramact`) for orchestrating widgets and tools
- **Widget system** for editors and UI extensions
- **Tool registry** for input, prompts, animations, and feedback
- **Interface‑driven design** (no classes, no constants in contracts)
- **Auto‑wired registries** for easy extension
- **HTTP‑style feedback collection** via `RamactFeedbackex`
- **Security and Privacy** via 'Securitex'


---

## 📦 Modules

### Core

- `Ramact` — the central orchestrator
- `WidgetUI` — base type for widgets

### Tools

- `Animation` — animation utilities
- `RamactInputex` — input handling
- `RamactPrompt` — prompt dialogs
- `RamactFeedbackex` — feedback collection (Google‑style, auto‑HTTP)

### Widgets

- `RamactAnimationEditorWidget`
- `RamactImageEditorWidget`
- `RamactPositionEditorWidget`

---

## 🛠️ System Interface

```ts
export interface RamactSystemInterface {
  core: Ramact;
  widgets: RamactWidgetRegistry;
  tools: RamactToolRegistry;

  registerWidget(name: string, widget: WidgetUI): void;
  addAnimation(animation: Animation): void;
  runAnimations(): void;
  showPrompt(): void;
  initInput(): void;
  collectFeedback(): void;
  bootstrap(): void;
}
