// Dropdown.ts

import { WidgetUI } from "../core";

export type DropdownOption = {
  value: string;
  label: string;
};

export function createDropdown(
  id: string,
  options: DropdownOption[],
  defaultValue?: string,
  onChange?: (value: string) => void
): WidgetUI {
  // WidgetUI is an HTMLElement, so we can just create a <select>
  const dropdown = new WidgetUI("Dropdown", { X: 150, Y: 30 })
  dropdown.id = id
  dropdown.widget = HTMLSelectElement
  // Populate options
  options.forEach((opt) => {
    const optionEl = document.createElement("option");
    optionEl.value = opt.value;
    optionEl.textContent = opt.label;
    dropdown.appendChild(optionEl);
  });

  // Set default value
  if (defaultValue) {
    dropdown.widget.value = defaultValue;
  }

  // Bind change event
  if (onChange) {
    dropdown.addEventListener("change", () => onChange(dropdown.value));
  }

  return dropdown;
}
