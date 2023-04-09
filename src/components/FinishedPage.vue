<script setup lang="ts">
import { ref } from "vue";
import { helper_store } from "../store/store";
import { IPage } from "../models/interfaces";

interface IPage {
  pageNumber: number;
  text: string;
  image: string;
}

const props = defineProps<IPage>();

const helperStore = helper_store();

const prompt = ref("");
const imageString = ref("");

const flipPage = ref(false);
</script>

<template>
  <div
    class="page-wrapper"
    :class="flipPage ? 'flipForwards' : 'flipBackwards'"
    :style="flipPage ? 'z-index: 1;' : `z-index: -${props.pageNumber}`"
  >
    <div class="page">
      <h2 class="page-title">{{ helperStore.currentStoryTitle }}</h2>
      <p>{{ props.text }}</p>
      <img
        v-show="imageString"
        :src="imageString"
        :alt="prompt"
        class="generated-page"
      />
      <p id="page-number">{{ props.pageNumber }}</p>
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

  width: 100%;
}

.page-input:focus {
  outline: none;
}

.page-input:focus::placeholder {
  color: transparent;
  text-shadow: none;
}

#characters {
  margin-block: 8px;
}

.generated-page {
  width: 80%;
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
  font-size: 0.7rem;
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
