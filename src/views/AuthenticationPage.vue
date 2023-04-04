<script setup lang="ts">
import Authentication from "../components/Authentication.vue";
</script>

<template>
  <div class="auth-page">
    <Authentication />
  </div>
</template>

<style scoped>
.auth-page {
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
