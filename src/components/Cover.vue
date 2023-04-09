<script setup lang="ts">
import { ref } from "vue";
import { generateImage, uploadCover } from "../services/API.js";
import Button from "../components/Button.vue";
import Page from "../components/Page.vue";
import { helper_store } from "../store/store";

const helperStore = helper_store();

const prompt = ref("");
const imageString = ref("");

const isActive = ref(false);
const flipCover = ref(false);
const hasFlipped = ref(false);

async function createCover(prompt: string, number: number): Promise<void> {
  helperStore.isLoading = true;
  /* Resets the story title if there is one */
  helperStore.currentStoryTitle = "";

  const results = await generateImage(prompt, number, true);
  /* Returns b64-strings from results */
  helperStore.generatedImagesArray = results!.map((result) => result.b64_json);

  /* Sets current image link */
  imageString.value =
    helperStore.data_URL_helper + helperStore.generatedImagesArray[0];

  helperStore.currentStoryTitle = prompt;
  helperStore.showCoverControls = true;
  helperStore.isLoading = false;
}

function switchImage(direction: string): void {
  if (direction === "previous") helperStore.currentArrayValue -= 1;
  if (direction === "next") helperStore.currentArrayValue += 1;

  imageString.value =
    helperStore.data_URL_helper +
    helperStore.generatedImagesArray[helperStore.currentArrayValue];
}

async function startStory(imageString: string, prompt: string): Promise<void> {
  helperStore.isLoading = true;
  const docRef = await uploadCover(imageString, prompt);

  if (docRef) {
    helperStore.docRef = docRef;
  }

  helperStore.currentStoryTitle = prompt;
  helperStore.currentArrayValue = 0;
  flipCover.value = true;
  helperStore.showCoverControls = false;
  helperStore.isLoading = false;
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
    <div
      class="book"
      @click="isActive = true"
      :class="{ active: isActive, finishedCover: hasFlipped && !flipCover }"
    >
      <div class="side leather front" :class="{ turnPage: flipCover }">
        <img
          v-show="imageString"
          :src="imageString"
          :alt="prompt"
          class="generated-cover"
          @click="(flipCover = !flipCover), (hasFlipped = true)"
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
        <div
          v-show="flipCover"
          @click="flipCover = !flipCover"
          class="arrow-wrapper"
        >
          <button id="arrow">&rarr;</button>
        </div>
      </div>
      <Page
        v-for="(page, index) in helperStore.numberOfPages"
        :page="index + 1"
        :key="index"
      />
      <div class="last-page">
        <h3>The end...</h3>
      </div>
      <div class="side leather back"></div>
      <div class="side leather left">{{ prompt }}</div>
      <div class="side right"></div>
      <div class="side top"></div>
      <div class="side bottom"></div>
    </div>
  </div>
  <div class="button-wrapper below">
    <Button
      v-show="!flipCover"
      @click="createCover(prompt, 2)"
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

  z-index: 999;
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

  filter: brightness(0.8);

  outline: 3px solid var(--text-color);

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

  z-index: 1;
}

.title-input::placeholder {
  color: var(--text-color);
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
.back,
.last-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
}

.front {
  transform-origin: 0% 50%;
  transform: translateZ(var(--book-z));
  border-radius: 0px 4px 4px 0px;

  transition: transform 1.3s ease-out;

  isolation: isolate;
}

.back {
  transform: rotateY(180deg) translateZ(var(--book-z));
  border-radius: 4px 0px 0px 4px;
}

.last-page {
  position: absolute;

  transform: translateZ(calc(var(--book-z) - 1px));

  border-radius: 0px 4px 4px 0px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.585) inset;
  background-color: var(--page-clr);

  width: var(--book-top-w);

  z-index: -999;
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

.arrow-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  height: 50%;
}

#arrow {
  all: unset;
  color: var(--btn-color);
}

/* Animations */

@keyframes rotate {
  to {
    transform: rotateY(360deg);
  }
}

@keyframes rotateBack {
  from {
    transform: rotateY(-180deg);
  }
  to {
    transform: rotateY(20deg) rotateX(20deg);
  }
}

@keyframes bookHover {
  from {
    transform: rotateY(20deg) rotateX(20deg);
  }
  to {
    transform: rotateY(5deg) rotateX(5deg);
  }
}

@keyframes hiding {
  0% {
    opacity: 1;
  }

  49.9% {
    opacity: 1;
  }

  50% {
    visibility: hidden;
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

/* Helper classes */
.active {
  animation: rotateBack 0.6s ease-out,
    bookHover 30s infinite alternate ease-out 0.6s;
}

.finishedCover {
  animation: bookHover 30s infinite reverse alternate ease-out;
}

.turnPage {
  transform-origin: 0% 50%;
  transform: translateZ(var(--book-z)) rotateY(-180deg);

  z-index: -1;
}

.turnPage:hover {
  cursor: pointer;
}

.turnPage > * {
  animation: hiding 0.9s forwards ease-out;
}

.turnPage .arrow-wrapper,
#arrow {
  animation: hiding 0.9s forwards ease-out reverse;
}
</style>
