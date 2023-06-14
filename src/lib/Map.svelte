<script>
  import Map from "ol/Map.js";
  import View from "ol/View.js";
  import OSM from "ol/source/OSM.js";
  import TileLayer from "ol/layer/Tile.js";
  import { onMount } from "svelte";
  import SearchControl from "../classes/SearchControl";
  import { defaults } from "ol/control";

  let mapArea;

  onMount(() => {
    new Map({
      layers: [new TileLayer({ source: new OSM() })],
      controls: defaults({
        attribution: false,
        rotate: false,
        zoom: false,
      }).extend([new SearchControl(import.meta.env.VITE_CITY_ACCESS_KEY)]),
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
      target: mapArea,
    });
  });
</script>

<main>
  <div bind:this={mapArea} />
</main>

<style>
  div {
    width: 75%;
    height: 500px;
  }
</style>
