import { Control } from "ol/control.js";

export class SearchControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};

    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "search...");

    const range = document.createElement("input");
    range.setAttribute("type", "range");
    range.setAttribute("min", "50");
    range.setAttribute("max", "200");

    const element = document.createElement("div");
    element.appendChild(searchInput);
    element.appendChild(range);

    super({
      element: element,
      target: options.target,
    });

    // button.addEventListener("click", this.handleRotateNorth.bind(this), false);
  }

  // handleRotateNorth() {
  //   this.getMap().getView().setRotation(1);
  // }
}
