import { Control } from "ol/control.js";
import { fromLonLat } from "ol/proj";

export default class SearchControl extends Control {
  constructor(api_key) {
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

    let center;

    super({
      element: element,
    });

    this._api_key = api_key;

    btn.addEventListener("click", this.searchForCenter.bind(this), false);
  }

  searchForCenter(e) {
    e.preventDefault();
    let coords = [];
    let rocks = [];
    // @ts-ignore
    const query = document.getElementById("search__text").value;
    const url = "https://api.api-ninjas.com/v1/city?name=";
    fetch(url + query, { headers: { "X-Api-Key": this._api_key } })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("couldn't find city");
        }
        return resp.json();
      })
      .then((data) => {
        coords = data;
        this.center = fromLonLat([coords[0].longitude, coords[0].latitude]);
        this.flyTo(this.center, function () {});
      })
      .finally(() => {
        fetch(
          `https://data.nasa.gov/resource/gh4g-9sfh.json?$where=within_circle(GeoLocation, ${coords[0].latitude}, ${coords[0].longitude}, 160000)`
        )
          .then((resp) => {
            if (!resp.ok) {
              throw new Error("no meteorite data found");
            }
            return resp.json();
          })
          .then((data) => {
            rocks = data;
          })
          .finally(() => {
            console.log(rocks);
          });
      });

    // this.getMap().getView().setCenter(this.center);
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
