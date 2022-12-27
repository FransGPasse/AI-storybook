<script setup lang="ts">
const props = defineProps({
  text: String,
});
</script>

<template>
  <button>{{ text }}</button>
</template>

<style scoped></style>
