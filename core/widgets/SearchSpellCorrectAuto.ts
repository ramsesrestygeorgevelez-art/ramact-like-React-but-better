// SearchSpellCorrectAuto.ts
import { WidgetUI } from "../core";

/**
 * Represents a single autocompletion entry.
 */
export interface ArrayAutocompletion {
  /** The word to be used for autocompletion */
  word: string;
}

/**
 * Example widget instance for search input.
 */
export const widget = new WidgetUI("Search", {
  X: 400,
  Y: 200,
});

// Configure widget input mode
widget.inputMode = "search";

/**
 * Example dictionary of words for autocompletion.
 */
const wordsAutocompletion: ArrayAutocompletion[] = [
  { word: "search" },
  { word: "spell" },
  { word: "correct" },
  { word: "auto" },
  { word: "autocomplete" },
];

/**
 * Provides autocomplete suggestions based on a query string.
 *
 * @param autocompletion - Array of available autocompletion entries
 * @param query - The user input string to match against
 * @returns Array - of suggested words that start with the query
 */
function autocomplete(
  autocompletion: ArrayAutocompletion[],
  query: string
): string[] {
  if (!query) return [];
  return autocompletion
    .map((entry) => entry.word)
    .filter((word) => word.toLowerCase().startsWith(query.toLowerCase()))

}
// event
widget.widget = HTMLInputElement
widget.addEventListener("input", ()=> {
    autocomplete(wordsAutocompletion, widget.textContent)
})