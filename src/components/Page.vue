<script setup lang="ts">
import { ref, onMounted } from "vue";
import { helper_store, persisted_store } from "../store/store";

const helperStore = helper_store();
const persistedStore = persisted_store();

const story = ref("");
</script>

<template>
  <div class="page-wrapper">
    <div class="page">
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
      <p id="page-number">{{ persistedStore.currentPage + 1 }}</p>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  position: absolute;

  height: 100%;
  width: 100%;
  width: var(--book-top-w);

  background-color: rgb(232, 230, 218);

  transform: translateZ(var(--book-z));

  z-index: -1;

  box-shadow: 0 0 3px rgba(0, 0, 0, 0.585) inset;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  height: 100%;

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

#page-number {
  margin-top: auto;
  margin-left: auto;
  font-family: var(--font-UI);
  font-size: 0.8rem;
}
</style>
