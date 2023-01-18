<script setup lang="ts">
import Cover from "../components/Cover.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="generate-page">
    <Cover />
    <Footer />
  </div>
</template>

<style scoped>
.generate-page {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
