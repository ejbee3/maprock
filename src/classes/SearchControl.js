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

    this.flyTo(center, function () {});
    // @ts-ignore
    document.getElementById("search__text").value = "";
  }

  flyTo(location, done) {
    const view = this.getMap().getView();
    const duration = 2500;
    const zoom = this.getMap().getView().getZoom();
    let parts = 2;
    let called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    view.animate(
      {
        center: location,
        duration: duration,
      },
      callback
    );
    view.animate(
      {
        zoom: zoom - 1,
        duration: duration / 2,
      },
      {
        zoom: zoom + 2,
        duration: duration / 2,
      },
      callback
    );
  }
}
