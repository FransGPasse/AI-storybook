<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getUserBooks } from "../services/API.js";
import { DocumentData } from "@firebase/firestore";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";
import { helper_store } from "../store/store";

const router = useRouter();
const helperStore = helper_store();

const books = ref<DocumentData[] | undefined>([]);

onBeforeMount(async () => {
  helperStore.isLoading = true;
  books.value = await getUserBooks();
  helperStore.isLoading = false;
});
</script>

<template>
  <section class="page-wrapper">
    <h2>All your books!</h2>
    <div class="links-wrapper">
      <Button
        v-for="(book, index) in books"
        :key="index"
        :text="`${book.title}`"
        secondary
        @click="router.push(`books/${book.id}`)"
      />
    </div>
  </section>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100dvh;
}

.links-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 20px;
}
</style>
