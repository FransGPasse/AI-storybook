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
  <div class="homepage">
    <h1>Welcome to the AI storybook</h1>
    <input v-model="prompt" placeholder="Dream up something..." />
    <button @click="getImageLink(prompt)" :disabled="!prompt">
      Generate image
    </button>
    <img :src="imageURL" alt="" />
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  background-color: #f3ec78;
  background-image: linear-gradient(90deg, #f3ec78, #fd4343);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;

  font-size: 5rem;
  text-align: center;
}

img {
  max-width: 100%;
  display: block;
}
</style>
