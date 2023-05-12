<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getUserBook } from "../services/API.js";
import { useRoute } from "vue-router";
import { helper_store } from "../store/store";
import FinishedCover from "../components/FinishedCover.vue";
import { IBook } from "../models/interfaces";

const route = useRoute();
const helperStore = helper_store();

const book = ref<IBook | undefined>();

onBeforeMount(async (): Promise<void> => {
  helperStore.isLoading = true;
  book.value = await getUserBook(route.params.id);
  helperStore.isLoading = false;
});
</script>

<template>
  <div v-if="book" class="my-book-page">
    <FinishedCover
      :title="book.title"
      :pages="book.pages"
      :cover="book.cover"
    />
  </div>
</template>

<style scoped>
.my-book-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100dvh;

  perspective: var(--book-perspective);
  perspective-origin: 50% calc(50% - 150px);

  overflow: hidden;
}
</style>
