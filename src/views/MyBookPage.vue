<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import { getUserBook } from "../services/API.js";
import { IBook } from "../models/interfaces";
import { DocumentData } from "@firebase/firestore";
import { useRouter } from "vue-router";
import { helper_store } from "../store/store";

const router = useRouter();
const helperStore = helper_store();

const book = ref<ArrayBuffer | undefined>();

onMounted(async function (): Promise<void> {
  if (this.$route.params.id) {
    book.value = await getUserBook(this.$route.params.id);
  }
  console.log("book.value", book.value);
});
</script>

<template>
  <div>Hej hej</div>
</template>

<style scoped></style>
