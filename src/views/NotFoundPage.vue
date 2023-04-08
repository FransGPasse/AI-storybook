<script setup lang="ts">
import Button from "../components/Button.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="not-found">
    <h1>Page not found...</h1>
    <Button text="Back to home" secondary @click="router.push('/')" />
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100dvh;

  color: var(--text-color);
}
</style>
