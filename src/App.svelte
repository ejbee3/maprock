<script>
  import Map from "./lib/Map.svelte";

  console.log(import.meta.env.GOOGLE_ACCESS_KEY);
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
