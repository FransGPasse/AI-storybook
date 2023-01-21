<script setup lang="ts">
import { helper_store } from "./store/store";

const helperStore = helper_store();
</script>

<template>
  <div v-show="helperStore.isLoading" id="loading">
    <h2>Loading...</h2>
  </div>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200;400;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap");

:root {
  font-size: 1rem;

  --bg-color: rgb(34, 35, 86);
  --btn-color: rgb(247, 156, 10);

  --title-color: rgb(255, 179, 57);
  --page-clr: rgb(232, 230, 218);
  --title-size: 1.7rem;

  --font-UI: "Kanit", sans-serif;
  --font-title: "Dancing Script", cursive;

  --book-front-h: 400px;
  --book-front-w: 250px;

  --book-top-h: 120px;
  --book-top-w: 240px;

  --book-side-w: 120px;

  --book-z: 60px;
  --book-rz: 180px;

  --book-position: 7vh;

  --book-perspective: 800px;
}

*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: var(--font-UI);
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--btn-color);
}

body {
  background-color: var(--bg-color);
}

#loading {
  position: fixed;

  height: 100dvh;
  width: 100dvw;

  background-color: rgba(0, 0, 0, 0.575);

  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#loading > h2 {
  color: var(--title-color);

  font-size: 2.5rem;

  pointer-events: none;
}

/* Large tablet and laptop size */
@media screen and (min-width: 769px) {
  :root {
    --title-size: 2.2rem;

    --book-front-h: 500px;
    --book-front-w: 350px;

    --book-top-w: 340px;

    --book-rz: 280px;

    --book-position: 5.5vh;
  }
}

/* Desktop size */
@media screen and (min-width: 1200px) {
  :root {
    --title-size: 2.5rem;

    --book-front-h: 550px;
    --book-front-w: 400px;

    --book-top-w: 390px;

    --book-rz: 330px;

    --book-position: 4vh;
  }
}
</style>
