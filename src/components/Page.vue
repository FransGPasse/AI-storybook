<script setup lang="ts">
import { ref, defineProps } from "vue";
import { helper_store, persisted_store } from "../store/store";

const props = defineProps({
  page: Number,
  index: Number,
});

const persistedStore = persisted_store();

const story = ref("");
const minimumCharacters = ref(70);

const flipPage = ref(false);
</script>

<template>
  <div
    class="page-wrapper"
    :class="flipPage ? 'flipForwards' : 'flipBackwards'"
    :style="`z-index: -${props.page};`"
  >
    <div class="page" @click="flipPage = !flipPage">
      <div class="side front">
        <h2 class="page-title">{{ persistedStore.currentStoryTitle }}</h2>
        <textarea
          class="page-input"
          placeholder="There once was a..."
          cols="25"
          rows="5"
          maxlength="140"
          spellcheck="false"
          v-model="story"
        />
        <p id="characters">{{ `${story.length} / ${minimumCharacters}` }}</p>
        <p id="page-number">{{ props.page }}</p>
      </div>
      <div class="side back">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel corporis
        consequatur ut harum molestiae laboriosam voluptates sit tempore,
        laudantium necessitatibus cum, dolor distinctio impedit animi ex culpa
        facere fugiat ipsum assumenda saepe.
      </div>
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
}

.page {
  position: relative;
  height: 100%;
  width: 100%;

  border-radius: 0px 4px 4px 0px;

  transform-style: preserve-3d;

  transition: transform 1s ease alternate;
}

.side {
  position: absolute;

  height: 100%;
  width: 100%;

  background-color: var(--page-clr);

  padding: 5%;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.front {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.back {
  transform: rotateY(180deg);
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

  transition: all 0.7s;

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
  font-size: 0.8rem;
  margin-top: auto;
}

#page-number {
  margin-top: auto;
  margin-left: auto;
  font-family: var(--font-UI);
  font-size: 0.8rem;
}

.flipForwards {
  transform-origin: 0% 50%;
  transform: translateZ(var(--book-z)) rotateY(-180deg);
  transition: transform 1s ease;
}

.flipBackwards {
  transform-origin: 0% 50%;
  transform: translateZ(var(--book-z)) rotateY(0deg);
  transition: transform 1s ease;
}
</style>
