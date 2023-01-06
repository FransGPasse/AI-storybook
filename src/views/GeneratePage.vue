<script setup lang="ts">
import { generateImage } from "../services/API.js";
import { ref } from "vue";

import Button from "../components/Button.vue";
import Cover from "../components/Cover.vue";

const prompt = ref("");
const imageURL = ref("");

const getImageLink = async (prompt: string) => {
  const result = await generateImage(prompt);
  imageURL.value = result!;
};
</script>

<template>
  <div class="cover-page">
    <Cover />
    <img v-if="imageURL" :src="imageURL" :alt="prompt" />
    <input v-model="prompt" placeholder="Dream up something..." />
    <Button
      @click="getImageLink(prompt)"
      :disabled="!prompt"
      text="Generate image"
    />
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
  height: 50px;
  width: min(400px, 75%);
  text-align: center;
  margin-bottom: 10px;
}

input:focus::placeholder {
  color: transparent;
}

img {
  max-width: 100%;
  display: block;
}
</style>
