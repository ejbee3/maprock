<script>
  import Map from "ol/Map.js";
  import View from "ol/View.js";
  import OSM from "ol/source/OSM.js";
  import TileLayer from "ol/layer/Tile.js";
  import { onMount } from "svelte";
  import { defaults } from "ol/control.js";
  import { SearchControl } from "../classes/SearchControl";

  let mapArea;

  onMount(() => {
    const map = new Map({
      layers: [new TileLayer({ source: new OSM() })],
      controls: defaults({ attribution: false, rotate: false }).extend([
        new SearchControl(),
      ]),
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
