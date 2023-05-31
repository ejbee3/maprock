<script>
  import Map from "ol/Map.js";
  import View from "ol/View.js";
  import OSM from "ol/source/OSM.js";
  import TileLayer from "ol/layer/Tile.js";
  import { onMount } from "svelte";
  import { Attribution } from "ol/control";

  let mapArea;
  let osmText;

  onMount(() => {
    const map = new Map({
      layers: [new TileLayer({ source: new OSM() })],
      controls: [],
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
      target: mapArea,
    });
    map.addControl(new Attribution({ target: osmText }));
  });
</script>

<main>
  <div bind:this={mapArea} />
  <p bind:this={osmText} class="osm__text" />
</main>

<style>
  div {
    width: 100%;
    height: 400px;
  }

  .osm__text {
    color: aliceblue;
    font-size: 18px;
  }
</style>
