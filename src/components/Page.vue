<script setup lang="ts">
import { ref, computed, unref } from "vue";
import { helper_store, persisted_store } from "../store/store";
import Button from "../components/Button.vue";
import { generateImage, uploadPage } from "../services/API.js";

const props = defineProps({
  page: Number,
  index: Number,
});

const helperStore = helper_store();
const persistedStore = persisted_store();

const story = ref("");
const minimumCharacters = ref(140);

const imageString = ref("");

const flipPage = ref(false);

const prompt = ref("");

async function generatePage(prompt: string, number: number) {
  helperStore.isLoading = true;

  const results = await generateImage(prompt, number, false);
  helperStore.generatedImagesArray = results!.map((result) => result.b64_json);

  imageString.value =
    helperStore.data_URL_helper + helperStore.generatedImagesArray[0];

  helperStore.showPageControls = true;
  helperStore.isLoading = false;
}

const characterCount = computed(() => {
  const storyLength = unref(story);
  const minCharacterLength = unref(minimumCharacters);
  if (storyLength.length >= minCharacterLength) return "✅";
  return `${story.value.length} / ${minimumCharacters.value}`;
});
</script>

<template>
  <div
    class="page-wrapper"
    :class="flipPage ? 'flipForwards' : 'flipBackwards'"
    :style="flipPage ? 'z-index: 1;' : `z-index: -${props.page}`"
  >
    <div class="page">
      <h2 class="page-title">{{ persistedStore.currentStoryTitle }}</h2>
      <textarea
        class="page-input"
        placeholder="There once was a..."
        cols="25"
        rows="5"
        maxlength="220"
        spellcheck="false"
        v-model="story"
      />
      <p id="characters">Minimum characters: {{ characterCount }}</p>
      <textarea
        v-if="story.length >= 140"
        class="page-input"
        placeholder="Now write a prompt to create an image to accompany the story..."
        rows="3"
        cols="20"
        maxlength="65"
        required
        spellcheck="false"
        v-model="prompt"
      />
      <img
        v-show="imageString"
        :src="imageString"
        :alt="prompt"
        class="generated-page"
        @click="flipPage = !flipPage"
      />
      <p id="page-number">{{ props.page }}</p>
    </div>
  </div>
  <div class="button-wrapper">
    <Button
      v-show="prompt"
      @click="generatePage(prompt, 2)"
      :text="imageString ? 'Generate again' : 'Generate'"
      :disabled="!prompt"
    />
    <Button
      v-show="helperStore.showPageControls"
      @click="
        uploadPage(imageString, persistedStore.currentStoryTitle, prompt, story)
      "
      text="Choose this image"
      :disabled="!imageString"
    />
  </div>
</template>

<style scoped>
.page-wrapper {
  position: absolute;

  height: 100%;
  width: 100%;

  transform: translateZ(var(--book-z));

  box-shadow: 0 0 3px rgba(0, 0, 0, 0.585) inset;

  perspective: var(--book-perspective);

  transition: transform 1s ease;
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

  width: 100%;

  font-size: 0.8rem;
}

.page-input:focus {
  outline: none;
}

.page-input:focus::placeholder {
  color: transparent;
  text-shadow: none;
}

#characters {
  font-size: 0.8rem;
  margin-top: 8px;
  margin-bottom: auto;
}

.generated-page {
  height: 100%;
  width: 100%;
}

#page-number {
  margin-top: auto;
  margin-left: auto;
  font-family: var(--font-UI);
  font-size: 0.8rem;
}

.button-wrapper {
  position: fixed;

  width: 320px;
  bottom: 10px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  transform: translateZ(var(--book-z));
}

.flipForwards {
  transform-origin: 0% 50%;
  transform: translateZ(var(--book-z)) rotateY(-180deg);
}

.flipBackwards {
  transform-origin: 0% 50%;
  transform: translateZ(var(--book-z)) rotateY(0deg);
}
</style>
