<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getUserBooks } from "../services/API.js";
import { IBook } from "../models/interfaces";
import { DocumentData } from "@firebase/firestore";

const books = ref<DocumentData[] | undefined>([]);

onBeforeMount(async () => {
  books.value = await getUserBooks();
});
</script>

<template>
  <h2>All your books!</h2>
  <div v-for="(book, index) in books" :key="index">
    <p>{{ book.title }}</p>
  </div>
</template>

<style scoped></style>
