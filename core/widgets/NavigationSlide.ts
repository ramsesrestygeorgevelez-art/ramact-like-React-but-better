
import { WidgetUI } from "../core";
import { Vector } from "../types";
const Navigation = new WidgetUI("NavigationSlide", {
    X: 104,
    Y: 10
})
export type Data = {
    name: string,
    code: Function
    size: Vector
}
Navigation.style.overflow = "auto"
/**
 * Adds content from the Navigation.
 * @returns NavigationItemWidget
 * 
*/
export function addContentFromNavigation(contentData: Array<Data>, contentTable: Array<WidgetUI>){
    contentTable.push()
}