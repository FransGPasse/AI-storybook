<script setup lang="ts">
import Cover from "../components/Cover.vue";
import Book from "../components/Book.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="generate-page">
    <!-- <Cover /> -->
    <Book />
    <Footer />
  </div>
</template>

<style scoped>
:root {
  --bookSize: 75px;
}

.generate-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100dvh;

  perspective: 800px;
  perspective-origin: 50% calc(50% - 150px);
}
</style>
