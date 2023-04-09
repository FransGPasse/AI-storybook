<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getUserBook } from "../services/API.js";
import { DocumentData } from "@firebase/firestore";
import { useRoute } from "vue-router";
import { helper_store } from "../store/store";

const route = useRoute();
const helperStore = helper_store();

const book = ref<DocumentData | undefined>();

onBeforeMount(async (): Promise<void> => {
  helperStore.isLoading = true;
  book.value = await getUserBook(route.params.id);

  console.log("book.value", book.value);
  helperStore.isLoading = false;
});
</script>

<template>
  <div class="page-wrapper">
    <div v-if="book" class="book-wrapper">
      <h1>{{ book.document.title }}</h1>
      <img v-for="link in book.links" :src="link" />
      <div v-for="page in book.document.pages">
        <p>Page {{ page.pageNumber }}: {{ page.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100dvh;

  padding: 15px;
}

.book-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 50%;
}
</style>
