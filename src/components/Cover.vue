<script setup lang="ts">
import { generateCover } from "../services/API.js";
import { ref } from "vue";
import Button from "../components/Button.vue";
import { pageStore } from "../store/store";

const store = pageStore();

const prompt = ref("");
const imageURL = ref("");

const createCover = async (prompt: string, number: number) => {
  const results = await generateCover(prompt, number);
  store.generatedImagesArray = results!.map((result) => result.url);
  imageURL.value = store.generatedImagesArray[0];
};

const prevImg = () => {
  imageURL.value = store.generatedImagesArray[store.currentArrayValue - 1];
  store.currentArrayValue -= 1;
  console.log(store.currentArrayValue);
};

const nextImg = () => {
  imageURL.value = store.generatedImagesArray[store.currentArrayValue + 1];
  store.currentArrayValue += 1;
  console.log(store.currentArrayValue);
};
</script>

<template>
  <div class="button-wrapper" v-show="imageURL">
    <Button
      text="Previous"
      @click="prevImg"
      :disabled="store.currentArrayValue === 0"
    />
    <Button
      text="Next"
      @click="nextImg"
      :disabled="
        store.generatedImagesArray.length - 1 === store.currentArrayValue
      "
    />
  </div>
  <div class="cover">
    <img
      v-if="imageURL"
      :src="imageURL"
      :alt="prompt"
      class="generated-cover"
    />
    <div class="title-page">
      <textarea
        class="title-input"
        placeholder="Give me a title"
        wrap="hard"
        rows="3"
        cols="20"
        maxlength="65"
        required
        v-model="prompt"
      />
    </div>
  </div>
  <Button
    @click="createCover(prompt, 2)"
    text="Generate a cover"
    :disabled="!prompt"
  />
</template>

<style scoped>
.button-wrapper {
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 20px;
}
.cover {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  min-height: min(650px, 75dvh);
  width: min(450px, 80%);

  background-image: url(src/assets/images/leather_cover.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  border-radius: 8px;

  margin-bottom: 20px;
  transform: skewY(15deg);
  rotate: -20deg;
  transition: all 550ms ease-in-out;
}

.cover:hover {
  rotate: 0deg;
  transform: skewY(0deg);
}

.cover:hover,
.title-input:hover {
  cursor: url("../assets/images/writing_hand.png"), auto;
}

.generated-cover {
  position: absolute;

  height: 100%;
  width: 100%;

  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 8px;
}

.title-page {
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.title-input {
  color: rgb(255, 188, 18);
  background-color: transparent;

  font-family: var(--font-title);

  text-align: center;
  margin: auto;

  resize: none;

  font-size: 2.5rem;

  border: none;

  overflow: hidden;
}

.title-input::placeholder {
  color: var(--cover-title-color);
}

.title-input:focus {
  outline: none;
}

.title-input:focus::placeholder {
  color: transparent;
}
</style>
