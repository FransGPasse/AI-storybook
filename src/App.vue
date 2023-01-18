<script setup lang="ts">
import { generationStore } from "./store/store";

const store = generationStore();
</script>

<template>
  <div v-show="store.isLoading" id="loading">
    <h2>Loading...</h2>
  </div>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200;400;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap");

:root {
  --bg-color: rgb(11, 40, 78);
  --btn-color: rgb(247, 156, 10);
  --cover-title-color: rgb(255, 179, 57);

  --font-UI: "Kanit", sans-serif;
  --font-title: "Dancing Script", cursive;
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
  color: var(--cover-title-color);

  font-size: 2.5rem;

  pointer-events: none;
}
</style>
