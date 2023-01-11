<script setup lang="ts">
defineProps({
  text: String,
});
</script>

<template>
  <button>{{ text }}</button>
</template>

<style scoped>
button {
  text-decoration: none;

  min-width: 150px;
  height: 40px;

  cursor: pointer;

  border: none;
  border-radius: 999px;
  background-color: var(--btn-color);

  white-space: nowrap;

  transition: all 350ms ease;
}

button:hover {
  background-color: rgb(215, 122, 14);
}

button:disabled {
  cursor: not-allowed;
}
</style>
