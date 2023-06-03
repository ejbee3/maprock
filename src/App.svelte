<script>
  import { onMount } from "svelte";
  import Map from "./lib/Map.svelte";

  // console.log(import.meta.env.GOOGLE_ACCESS_KEY);

  let rocks = [];
  let rangeRocks = [];
  let range = 50;
  let center = { x: 50, y: 6 };

  onMount(() => {
    fetch("https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=20")
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        rocks = data;
      })
      .finally(() => {
        rocks.forEach((r) => {
          if (r.geolocation) {
            const x = Number(r.geolocation.latitude);
            const y = Number(r.geolocation.longitude);
            const formula = Math.sqrt(
              Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2)
            );
            console.log(formula);
            if (formula < range) {
              rangeRocks.push(r);
            }
          }
        });
      });
  });
</script>

<main>
  <h1>MapRocks</h1>
  <section><Map /></section>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
  h1 {
    font-family: "Pacifico", cursive;
    font-size: 36px;
  }

  main {
    margin-left: 4rem;
  }
</style>
