<script setup lang="ts">
defineProps({
  text: String,
  secondary: Boolean,
});
</script>

<template>
  <button :class="secondary ? 'secondary' : 'primary'">
    {{ text }}
  </button>
</template>

<style scoped>
button {
  text-decoration: none;

  min-width: 130px;
  height: 40px;

  border: none;
  cursor: pointer;

  white-space: nowrap;
  transition: all 350ms ease;
  font-size: 0.85rem;

  color: black;
}

button:disabled {
  cursor: not-allowed;
}

.primary {
  border-radius: 999px;
  background-color: var(--btn-color);
}

.primary:hover {
  background-color: rgb(215, 122, 14);
}

.primary:disabled {
  background-color: rgba(247, 156, 10, 0.621);
  color: rgba(0, 0, 0, 0.462);
}

.secondary {
  background-color: transparent;
  color: var(--btn-color);
  text-decoration: underline;

  font-size: 1rem;

  text-underline-offset: 5px;
}

.secondary:hover {
  text-underline-offset: 2px;
}

.secondary:disabled {
  cursor: not-allowed;
  color: rgba(247, 156, 10, 0.621);
  text-decoration: none;
}
</style>
