<script setup lang="ts">
import { onMounted } from "vue";
import { auth, db, storage } from "../firebase/index";
import { collection, getDocs, query } from "firebase/firestore";

onMounted(async () => {
  const userId = auth.currentUser?.uid;
  const querySnapshot = await getDocs(collection(db, "stories"));

  querySnapshot.forEach((doc) => {
    console.log("doc", doc.data);
  });
});
</script>

<template>
  <div>Hej hej</div>
</template>

<style scoped></style>
