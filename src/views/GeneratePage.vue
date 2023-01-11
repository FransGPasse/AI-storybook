<script setup lang="ts">
import Cover from "../components/Cover.vue";
import { userStore } from "../store/store";

const store = userStore();
</script>

<template>
  <div class="generate-page">
    <h2 v-if="store.loggedIn">Logged in as {{ store.user.email }}</h2>
    <Cover />
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
