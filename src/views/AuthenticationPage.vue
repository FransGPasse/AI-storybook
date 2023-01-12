<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase/index";
import Authentication from "../components/Authentication.vue";

const router = useRouter();

onMounted(() => {
  if (auth.currentUser) {
    router.push("/generate");
  }
});
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
