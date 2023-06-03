import { Control } from "ol/control.js";
import { fromLonLat } from "ol/proj";

export class SearchControl extends Control {
  constructor(rocks) {
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "search...");
    searchInput.setAttribute("id", "search__text");

    const range = document.createElement("input");
    range.setAttribute("type", "range");
    range.setAttribute("min", "50");
    range.setAttribute("max", "200");

    const btn = document.createElement("button");
    btn.innerHTML = "GO";
    btn.setAttribute("type", "submit");

    const element = document.createElement("form");
    element.appendChild(searchInput);
    element.appendChild(range);
    element.appendChild(btn);

    super({
      element: element,
    });

    this._rocks = rocks;

    btn.addEventListener("click", this.searchForCenter.bind(this), false);
  }

  searchForCenter(e) {
    e.preventDefault();
    // @ts-ignore
    const query = document.getElementById("search__text").value;
    const coords = query.split(" ").map((c) => parseFloat(c));
    const center = fromLonLat(coords); // LONGITUDE FIRST

    // -105.31667 26.96667

    this.getMap().getView().setCenter(center);
    // @ts-ignore
    document.getElementById("search__text").value = "";
  }
}
