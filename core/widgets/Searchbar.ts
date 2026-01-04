import { WidgetUI } from "../core";

const Search = new WidgetUI("Searchbar", {
    X: 105,
    Y: 300
})
Search.widget = HTMLInputElement
Search.widget.type = "search"