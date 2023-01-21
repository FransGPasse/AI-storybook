<script setup lang="ts">
import { ref } from "vue";
import { generateImage, uploadCover } from "../services/API.js";
import Button from "../components/Button.vue";
import Page from "../components/Page.vue";
import { helper_store, persisted_store } from "../store/store";

const helperStore = helper_store();
const persistedStore = persisted_store();

const prompt = ref("");
const imageString = ref("");

const isActive = ref(false);
const flipPages = ref(false);

async function createCover(prompt: string, number: number) {
  helperStore.isLoading = true;
  /* Resets the story title if there is one */
  persistedStore.currentStoryTitle = "";
  const results = await generateImage(prompt, number, false);
  /* Returns b64-strings from results */
  helperStore.generatedImagesArray = results!.map((result) => result.b64_json);

  /* Sets current image link */
  imageString.value =
    helperStore.data_URL_helper + helperStore.generatedImagesArray[0];

  helperStore.showCoverControls = true;
  helperStore.isLoading = false;
}

function switchImage(direction: string) {
  if (direction === "previous") helperStore.currentArrayValue -= 1;
  if (direction === "next") helperStore.currentArrayValue += 1;

  imageString.value =
    helperStore.data_URL_helper +
    helperStore.generatedImagesArray[helperStore.currentArrayValue];
}

async function startStory(imageString: string, prompt: string) {
  await uploadCover(imageString, prompt);
  /* Sets the chosen story title */
  persistedStore.currentStoryTitle = prompt;

  setTimeout(() => {
    flipPages.value = true;
    helperStore.showCoverControls = false;
  }, 500);
}
</script>

<template>
  <div class="button-wrapper above" v-show="helperStore.showCoverControls">
    <Button
      text="&larr; Previous"
      @click="switchImage('previous')"
      :disabled="helperStore.currentArrayValue === 0"
    />
    <Button
      text="Next &rarr;"
      @click="switchImage('next')"
      :disabled="
        helperStore.generatedImagesArray.length - 1 ===
        helperStore.currentArrayValue
      "
    />
  </div>
  <div class="book-container">
    <div class="book" @click="isActive = true" :class="{ active: isActive }">
      <div class="side leather front" :class="{ turnPage: flipPages }">
        <img
          v-show="imageString"
          :src="imageString"
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
            spellcheck="false"
            required
            v-model="prompt"
          />
        </div>
      </div>
      <Page />
      <div class="side leather back"></div>
      <div class="side leather left">{{ prompt }}</div>
      <div class="side right"></div>
      <div class="side top"></div>
      <div class="side bottom"></div>
    </div>
  </div>
  <div class="button-wrapper below">
    <Button
      v-show="!flipPages"
      @click="createCover(prompt, 1)"
      :text="imageString ? 'Generate again' : 'Generate a cover'"
      :disabled="!prompt"
    />
    <Button
      v-show="helperStore.showCoverControls"
      @click="startStory(imageString, prompt)"
      text="Choose this image"
      :disabled="!imageString"
    />
  </div>
</template>

<style scoped>
.book-container {
  position: relative;

  transform-style: preserve-3d;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-block: 30px;

  width: 100%;
  height: 100%;
}

.button-wrapper {
  position: fixed;

  width: 320px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  z-index: 1;
}

.above {
  top: 20px;
}

.below {
  bottom: 50px;
}

.generated-cover {
  position: absolute;

  height: 85%;
  width: 85%;

  top: 7.5%;
  left: 7.5%;
  z-index: -1;

  filter: brightness(0.8);

  outline: 3px solid var(--title-color);

  outline-offset: 0.5px;
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

.title-input {
  transition: all 0.7s;
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
  transform-origin: 0% 50%;
  transform: translateZ(var(--book-z));
  border-radius: 0px 4px 4px 0px;

  transition: transform 1.3s ease-out;
}

.back {
  transform: rotateY(180deg) translateZ(var(--book-z));
  border-radius: 4px 0px 0px 4px;
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
    transform: rotateY(-180deg);
  }
  to {
    transform: rotateY(35deg) rotateX(35deg);
  }
}

@keyframes bookHover {
  from {
    transform: rotateY(35deg) rotateX(35deg);
  }
  to {
    transform: rotateY(5deg) rotateX(5deg);
  }
}

.active {
  animation: rotateBack 0.6s ease-out,
    bookHover 20s infinite alternate ease-in-out 0.6s;
}

.turnPage {
  transform-origin: 0% 50%;
  transition: transform 1s ease;
  transform: translateZ(var(--book-z)) rotateY(-180deg);
}

.turnPage .generated-cover {
  transition: all 1ms 0.5s alternate;
}

.turnPage .title-input {
  color: transparent;
  text-shadow: none;
  pointer-events: none;
}

.turnPage:hover {
  cursor: default;
}

.turnPage .title-input::placeholder {
  color: transparent;
  text-shadow: none;
}
</style>
