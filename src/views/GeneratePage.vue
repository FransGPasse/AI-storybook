<script setup lang="ts">
import { onBeforeMount } from "vue";
import { helper_store } from "../store/store";
import Cover from "../components/Cover.vue";
import Footer from "../components/Footer.vue";

const helperStore = helper_store();

onBeforeMount(() => {
  helperStore.currentArrayValue = 0;
});
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
  align-items: center;
  justify-content: center;

  height: 100dvh;

  perspective: var(--book-perspective);
  perspective-origin: 50% calc(50% - 150px);

  overflow: hidden;
}
</style>
