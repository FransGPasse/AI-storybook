<script setup lang="ts">
import { ref } from "vue";
import { generateImage, uploadImage } from "../services/API.js";
import Button from "../components/Button.vue";
import { generationStore } from "../store/store";

const store = generationStore();

const prompt = ref("");
const imageURL = ref("");
const b64_helper = ref("data:image/png;base64,");

const isActive = ref(false);

async function createCover(prompt: string, number: number) {
  store.isLoading = true;
  const results = await generateImage(prompt, number, true);
  store.generatedImagesArray = results!.map((result) => result.b64_json);

  imageURL.value = b64_helper.value + store.generatedImagesArray[0];
  store.isLoading = false;
}

function switchImage(direction: string) {
  store.isLoading = true;
  if (direction === "previous") store.currentArrayValue -= 1;
  if (direction === "next") store.currentArrayValue += 1;

  imageURL.value =
    b64_helper.value + store.generatedImagesArray[store.currentArrayValue];
  store.isLoading = false;
}
</script>

<template>
  <div class="book-container" :class="{ generated: imageURL }">
    <div class="button-wrapper" v-show="imageURL">
      <Button
        text="&larr; Previous"
        @click="switchImage('previous')"
        :disabled="store.currentArrayValue === 0"
      />
      <Button
        text="Next &rarr;"
        @click="switchImage('next')"
        :disabled="
          store.generatedImagesArray.length - 1 === store.currentArrayValue
        "
      />
    </div>
    <div class="book" @click="isActive = true" :class="{ active: isActive }">
      <div class="side leather front">
        <img
          v-show="imageURL"
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
      <div class="side leather back"></div>
      <div class="side leather left">{{ prompt }}</div>
      <div class="side right"></div>
      <div class="side top"></div>
      <div class="side bottom"></div>
    </div>
    <div class="button-wrapper">
      <Button
        @click="createCover(prompt, 2)"
        text="Generate a cover"
        :disabled="!prompt"
      />
      <Button
        v-show="imageURL"
        @click="uploadImage(imageURL, prompt)"
        text="Choose this image"
        :disabled="!imageURL"
      />
    </div>
  </div>
</template>

<style scoped>
.book-container {
  position: relative;

  transform-style: preserve-3d;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-block: 30px;

  width: 100%;
  height: 100%;
}

.generated {
  justify-content: space-between;
}

.button-wrapper {
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.generated-cover {
  position: absolute;

  height: 100%;
  width: 100%;

  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 0px 8px 8px 0px;

  filter: brightness(0.8);
}

.title-page {
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.title-input,
.left {
  color: rgb(255, 188, 18);
  background-color: transparent;

  font-family: var(--font-title);

  text-align: center;
  margin: auto;

  resize: none;

  font-size: var(--title-size);

  border: none;

  overflow: hidden;

  text-shadow: black -1px 2px 2px;
}

.title-input::placeholder {
  color: var(--title-color);
}

.title-input:focus {
  outline: none;
}

.title-input:focus::placeholder {
  color: transparent;
  text-shadow: none;
}

.side:hover,
.title-input:hover {
  cursor: url("../assets/images/writing_hand.png"), auto;
}

@keyframes rotate {
  to {
    transform: rotateY(360deg);
  }
}

.book {
  position: absolute;

  top: var(--book-position);

  height: var(--book-front-h);
  width: var(--book-front-w);

  transform-style: preserve-3d;

  animation: rotate 15s infinite linear;
}

.side {
  position: absolute;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.754) inset;
}

.leather {
  background-image: url(../assets/images/leather_cover.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.front,
.back {
  width: 100%;
  height: 100%;
}

.front {
  transform: translateZ(var(--book-z));
  border-radius: 0px 8px 8px 0px;
}

.back {
  transform: rotateY(180deg) translateZ(var(--book-z));
  border-radius: 8px 0px 0px 8px;
}

.left,
.right {
  height: 100%;
  width: var(--book-side-w);
}

.right {
  transform: rotateY(90deg) translateZ(var(--book-rz));

  background-color: #ffffff;
  background-image: linear-gradient(
    90deg,
    transparent 50%,
    rgba(0, 0, 0, 0.306) 50%
  );
  background-size: 3.5px 3.5px;
}

.left {
  transform: rotateY(270deg) translateZ(var(--book-z));
  writing-mode: vertical-rl;

  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}

.top,
.bottom {
  height: var(--book-top-h);
  width: var(--book-top-w);

  background-color: #ffffff;
  background-image: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.306) 50%);
  background-size: 3.5px 3.5px;
}

.top {
  transform: translateY(-50%) rotateX(90deg);
}

.bottom {
  bottom: 0;

  transform: translateY(50%) rotateX(90deg);
}

@keyframes rotateBack {
  from {
    transform: rotateY(-360deg);
  }
  to {
    transform: rotateY(35deg) rotateX(45deg);
  }
}

@keyframes bookHover {
  from {
    transform: rotateY(35deg) rotateX(45deg);
  }
  to {
    transform: rotateY(5deg) rotateX(5deg);
  }
}

.active {
  animation: rotateBack 0.6s ease-out,
    bookHover 15s infinite alternate ease-in-out 0.6s;
}
</style>
