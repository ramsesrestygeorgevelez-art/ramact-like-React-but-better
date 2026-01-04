// HomeWidgetApp.ts

import { Vector } from "../types";
import { RamactStyleSheet } from "./stylesheet";

/**
 * ItemJSON
 *
 * A type that uses JSON for an item.
 */
export type ItemJSON = {
  json: JSON;
  itemName: string;
  /** The item's type (HTMLElement widget) */
  WidgetType: HTMLElement;
};

/**
 * HomeWidgetApp
 *
 * Creates a Home widget for your app.
 * @function addItemOnJSON Makes an item using JSON.
 */
export class HomeWidgetApp {
  WidgetSize: Vector;
  items: Array<ItemJSON>;

  constructor(size: Vector) {
    this.WidgetSize = size;
    this.items = [];
  }

  /**
   * Adds an item to the Home widget using JSON.
   * @param itemName - The name of the item.
   * @param type - The HTMLElement type for the widget.
   * @param styleSheet - Optional stylesheet to apply.
   */
  addItemOnJSON(
    itemName: ItemJSON["itemName"],
    type: ItemJSON["WidgetType"],
    styleSheet?: RamactStyleSheet
  ): void {
    // Create a JSON representation of the item
    const itemJson = {
      name: itemName,
      type: type.tagName,
      size: this.WidgetSize,
      style: styleSheet ? styleSheet : null,
    };

    // Store the item
    const newItem: ItemJSON = {
      json: JSON.parse(JSON.stringify(itemJson)),
      itemName,
      WidgetType: type,
    };

    this.items.push(newItem);

    // Apply optional stylesheet
    if (styleSheet) {
      Object.assign(type.style, {
        backgroundColor: styleSheet.backgroundColor,
        color: styleSheet.textColor,
        fontFamily: styleSheet.fontFamily,
      });
    }
  }

  /**
   * Exports all items as JSON.
   */
  exportItems(): string {
    return JSON.stringify(this.items.map((i) => i.json), null, 2);
  }

  /**
   * Clears all items.
   */
  reset(): void {
    this.items = [];
  }
}
