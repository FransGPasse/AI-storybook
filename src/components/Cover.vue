<script setup lang="ts"></script>

<template>
  <div class="cover">
    <div class="title-page">
      <textarea
        class="title-input"
        placeholder="Give me a title"
        wrap="hard"
        rows="3"
        cols="20"
        maxlength="65"
        required
      />
    </div>
  </div>
</template>

<style scoped>
.cover {
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: min(650px, 75dvh);
  width: min(450px, 80%);

  background-image: url("../assets/leather_cover.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  border-radius: 8px;
}

.title-page {
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.title-input {
  color: rgb(255, 188, 18);
  background-color: transparent;

  font-family: var(--font-title);

  text-align: center;
  margin: auto;

  resize: none;

  font-size: 2.5rem;

  border: none;

  overflow: hidden;
}

.title-input::placeholder {
  color: var(--cover-title-color);
}

.title-input:focus {
  outline: none;
}

.title-input:focus::placeholder {
  color: transparent;
}
</style>
