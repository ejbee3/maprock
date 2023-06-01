<script>
  import { onMount } from "svelte";
  import Map from "./lib/Map.svelte";

  // console.log(import.meta.env.GOOGLE_ACCESS_KEY);

  onMount(() => {
    async function getData(url) {
      const response = await fetch(url);
      if (response.ok) {
        const data = response.json();
        console.log(data);
      }
    }
    getData(
      // "https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=10&$offset=0&$order=id"
      "https://data.nasa.gov/resource/gh4g-9sfh.json?nametype=Relict&$limit=20"
    );
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
