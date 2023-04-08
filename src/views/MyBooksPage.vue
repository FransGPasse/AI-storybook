<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getUserTexts, getUserPictures } from "../services/API.js";
import { IBook } from "../models/interfaces";
import { DocumentData } from "@firebase/firestore";

const books = ref<DocumentData[] | undefined>([]);
const pictures = ref<ArrayBuffer | undefined>();

onBeforeMount(async () => {
  books.value = await getUserTexts();
  pictures.value = await getUserPictures();
});
</script>

<template>
  <h2>All your books!</h2>
  <div v-for="(book, index) in books" :key="index">
    <p>{{ book.title }}</p>
  </div>
</template>

<style scoped></style>
