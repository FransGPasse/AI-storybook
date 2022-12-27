<script setup lang="ts">
import { generateImage } from "../services/API.js";
import { ref } from "vue";

const prompt = ref("");
const imageURL = ref("");

const getImageLink = async (prompt: string) => {
  const result = await generateImage(prompt);
  imageURL.value = result!;
};
</script>

<template>
  <div class="cover-page">
    <input v-model="prompt" placeholder="Dream up something..." />
    <button @click="getImageLink(prompt)" :disabled="!prompt">
      Generate image
    </button>
    <img v-if="imageURL" :src="imageURL" :alt="prompt" />
  </div>
</template>

<style scoped>
.cover-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  height: 6%;
  width: 35%;
  text-align: center;
}

img {
  max-width: 100%;
  display: block;
}
</style>
