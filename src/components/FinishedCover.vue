<script setup lang="ts">
import { ref } from "vue";
import Button from "../components/Button.vue";
import FinishedPage from "../components/FinishedPage.vue";
import { IPage } from "../models/interfaces";

const prompt = ref("");

const isActive = ref(false);
const flipCover = ref(false);
const hasFlipped = ref(false);

interface IBook {
  title: string;
  pages: IPage[];
  coverImg: string;
}

const props = defineProps<IBook>();
</script>

<template>
  <div class="book-container">
    <div
      class="book"
      @click="isActive = true"
      :class="{ active: isActive, finishedCover: hasFlipped && !flipCover }"
    >
      <div class="side leather front" :class="{ turnPage: flipCover }">
        <img
          :src="props.coverImg"
          :alt="props.coverImg"
          class="generated-cover"
          @click="(flipCover = !flipCover), (hasFlipped = true)"
        />
        <div class="title-page">
          <h2 class="title">{{ props.title }}</h2>
        </div>
        <div
          v-show="flipCover"
          @click="flipCover = !flipCover"
          class="arrow-wrapper"
        >
          <button id="arrow">&rarr;</button>
        </div>
      </div>
      <FinishedPage
        v-for="(page, index) in props.pages"
        :key="index"
        :book-title="props.title"
        :text="page.text"
        :image="page.image"
        :page-number="page.pageNumber"
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

.title,
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

.title {
  z-index: 1;
}

.side:hover,
.title:hover {
  cursor: pointer;
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

  display: flex;
  align-items: center;
  justify-content: center;

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
