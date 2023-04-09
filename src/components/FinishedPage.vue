<script setup lang="ts">
import { ref } from "vue";

interface IPage {
  bookTitle: string;
  pageNumber: number;
  text: string;
  image: string;
}
const props = defineProps<IPage>();

const flipPage = ref(false);
</script>

<template>
  <div
    class="page-wrapper"
    :class="flipPage ? 'flipForwards' : 'flipBackwards'"
    :style="flipPage ? 'z-index: 1;' : `z-index: -${props.pageNumber}`"
  >
    <div class="page">
      <h2 class="page-title">{{ props.bookTitle }}</h2>
      <p class="page-text">{{ props.text }}</p>
      <img v-show="props.image" :src="props.image" class="image" />
      <p id="page-number">{{ props.pageNumber }}</p>
      <button id="arrow" v-show="props.image" @click="flipPage = !flipPage">
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

.page-text {
  color: var(--handwriting-color);
  font-family: var(--font-handwriting);
}

#characters {
  margin-block: 8px;
}

.image {
  width: 100%;
  margin-top: auto;
  border-radius: 2px;
}

#page-number {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-family: var(--font-UI);
}

#arrow {
  all: unset;
  color: var(--btn-color);
  translate: 0px 10px;
  margin-top: auto;
}

#arrow:hover {
  cursor: pointer;
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
