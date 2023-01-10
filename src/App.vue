<script setup lang="ts"></script>

<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200;400;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap");

:root {
  --bg-color: rgb(76, 100, 131);
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

h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--cover-title-color);
}

body {
  background-color: var(--bg-color);
}
</style>
