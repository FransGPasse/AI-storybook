<script setup lang="ts">
import { ref, computed, unref } from "vue";
import { helper_store } from "../store/store";
import { generateImage, uploadPage } from "../services/API.js";

const props = defineProps({
  page: Number,
  index: Number,
});

const helperStore = helper_store();
const story = ref("");

const minimumCharacters = ref(140);
const prompt = ref("");
const imageString = ref("");

const flipPage = ref(false);

async function generatePage(prompt: string, number: number): Promise<void> {
  helperStore.isLoading = true;

  /* Resets the image string array */
  helperStore.currentArrayValue = 0;

  const results = await generateImage(prompt, number, false);
  helperStore.generatedImagesArray = results!.map((result) => result.b64_json);

  imageString.value =
    helperStore.data_URL_helper + helperStore.generatedImagesArray[0];

  helperStore.showPageControls = true;
  helperStore.isLoading = false;
}

const characterCount = computed((): string => {
  const storyLength = unref(story);
  const minCharacterLength = unref(minimumCharacters);
  if (storyLength.length >= minCharacterLength)
    return `✅ ${storyLength.length}/300 (max)`;
  return `${story.value.length} / ${minimumCharacters.value}`;
});

function switchImage(direction: string): void {
  if (direction === "previous") helperStore.currentArrayValue -= 1;
  if (direction === "next") helperStore.currentArrayValue += 1;

  imageString.value =
    helperStore.data_URL_helper +
    helperStore.generatedImagesArray[helperStore.currentArrayValue];
}

async function finishPage(
  imageString: string,
  prompt: string,
  docRef: string,
  pageNumber: number,
  story: string
): Promise<void> {
  await uploadPage(imageString, prompt, docRef, pageNumber, story);

  flipPage.value = true;
  helperStore.showPageControls = false;
}
</script>

<template>
  <div
    class="page-wrapper"
    :class="flipPage ? 'flipForwards' : 'flipBackwards'"
    :style="flipPage ? 'z-index: 1;' : `z-index: -${props.page}`"
  >
    <div class="page">
      <h2 class="page-title">{{ helperStore.currentStoryTitle }}</h2>
      <textarea
        class="page-input"
        :placeholder="
          page === 1 ? ' There once was a...' : 'Continue story here...'
        "
        cols="25"
        rows="7"
        maxlength="300"
        spellcheck="false"
        v-model="story"
      />
      <p id="characters">Minimum characters: {{ characterCount }}</p>
      <textarea
        v-show="story.length >= 140"
        class="page-input prompt"
        placeholder="Now write a prompt to create an image to accompany the story..."
        rows="3"
        cols="2"
        maxlength="65"
        required
        spellcheck="false"
        v-model="prompt"
      />
      <div class="button-wrapper" v-show="helperStore.showPageControls">
        <button
          class="page-button"
          @click="switchImage('previous')"
          :disabled="helperStore.currentArrayValue === 0"
        >
          Previous
        </button>
        <button
          class="page-button"
          @click="switchImage('next')"
          :disabled="
            helperStore.generatedImagesArray.length - 1 ===
            helperStore.currentArrayValue
          "
        >
          Next
        </button>
      </div>
      <img
        v-show="imageString"
        :src="imageString"
        :alt="prompt"
        class="generated-page"
      />
      <p id="page-number">{{ props.page }}</p>
      <div class="button-wrapper">
        <button
          v-show="prompt"
          class="page-button"
          @click="generatePage(prompt, 2)"
          :disabled="!prompt"
        >
          Generate
        </button>
        <button
          v-show="helperStore.showPageControls"
          class="page-button"
          @click="
            finishPage(imageString, prompt, helperStore.docRef, page!, story)
          "
          :disabled="!imageString"
        >
          Choose image
        </button>
      </div>
      <button id="arrow" v-show="imageString" @click="flipPage = !flipPage">
        &rarr;
      </button>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  position: absolute;

  height: 100%;
  width: var(--book-top-w);
  transform: translateZ(var(--book-z));

  box-shadow: 0 0 3px rgba(0, 0, 0, 0.585) inset;

  perspective: var(--book-perspective);

  transition: transform 1s ease;

  font-size: 0.8rem;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  height: 100%;
  width: 100%;

  border-radius: 0px 4px 4px 0px;

  transform-style: preserve-3d;

  background-color: var(--page-clr);

  padding: 5%;
}

.page-title {
  font-family: var(--font-title);
  margin-bottom: 0.2em;
  text-align: center;
}

.page-input {
  resize: none;

  background-color: transparent;
  border: none;
  overflow: hidden;

  cursor: url("../assets/images/writing_hand.png"), auto;

  font-family: var(--font-handwriting);

  color: var(--handwriting-color);

  width: 100%;
}

.page-input:focus {
  outline: none;
}

.page-input:focus::placeholder {
  color: transparent;
  text-shadow: none;
}

.prompt {
  font-family: var(--font-UI);
  font-size: 10px;
}

#characters {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 10px;
}

.generated-page {
  width: 70%;
  margin-top: auto;
  border-radius: 2px;
}

#page-number {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-family: var(--font-UI);
}

.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateZ(var(--book-z));
  margin-top: auto;
  margin-bottom: 10px;
}

.page-button {
  font-size: 0.6rem;
  font-weight: 200;

  width: 70px;

  background-color: transparent;
  color: var(--btn-color);

  text-decoration: underline;
  text-underline-offset: 2px;

  border: none;
  cursor: pointer;

  white-space: nowrap;
  transition: all 350ms ease;
}

.page-button:hover {
  text-decoration: none;
}

.page-button:disabled {
  cursor: not-allowed;
  color: rgba(247, 156, 10, 0.621);
  text-decoration: none;
}

#arrow {
  all: unset;
  color: var(--btn-color);
  translate: 0px 10px;
}

.flipForwards {
  transform-origin: 0% 50%;
  transform: translateZ(var(--book-z)) rotateY(-180deg);
}

.flipForwards .page > * {
  visibility: hidden;
}

.flipForwards .page #arrow {
  visibility: visible;
  rotate: 180deg;
}

.flipBackwards {
  transform-origin: 0% 50%;
  transform: translateZ(var(--book-z)) rotateY(0deg);
}
</style>
