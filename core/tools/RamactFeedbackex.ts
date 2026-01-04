// RamactFeedbackex.ts

/**
 * Feedback entry structure
 */
export interface FeedbackEntry {
  id: string;
  message: string;
  type: "bug" | "feature" | "general";
  timestamp: number;
}

/**
 * RamactFeedbackex
 *
 * Local feedback system that automatically uses fetch()
 * to simulate HTTP requests. No external endpoints required.
 */
export interface RamactFeedbackex {
  entries: FeedbackEntry[];

  collect(message: string, type?: FeedbackEntry["type"]): Promise<FeedbackEntry>;
  list(): FeedbackEntry[];
  clear(): void;
  exportJSON(): string;
}

/**
 * Factory function to create a feedback manager.
 */
export function createFeedbackex(): RamactFeedbackex {
  const entries: FeedbackEntry[] = [];

  return {
    entries,

    async collect(message, type = "general") {
      const entry: FeedbackEntry = {
        id: crypto.randomUUID(),
        message,
        type,
        timestamp: Date.now(),
      };
      entries.push(entry);

      // Auto-fire a fetch() to a dummy local URL
      // This simulates Google-style HTTP feedback submission
      try {
        await fetch("/local-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
      } catch (err) {
        console.warn("Simulated fetch failed (no endpoint):", err);
      }

      return entry;
    },

    list() {
      return [...entries];
    },

    clear() {
      entries.length = 0;
    },

    exportJSON() {
      return JSON.stringify(entries, null, 2);
    },
  };
}
