<script setup lang="ts">
import { persisted_store } from "../store/store";
import Button from "./Button.vue";
import { auth } from "../firebase/index";
import { signOut } from "@firebase/auth";
import { useRouter } from "vue-router";

const persistedStore = persisted_store();
const router = useRouter();

async function signOutUser() {
  try {
    await signOut(auth);
    persistedStore.user.email = "";
    router.push("/");
  } catch (error: unknown) {
    console.error(error);
  }
}
</script>

<template>
  <div class="footer">
    <p>Logged in as {{ persistedStore.user.email }}</p>
    <Button text="Log out" secondary @click="signOutUser" />
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;

  z-index: 1;
}

.footer > * {
  margin-inline: 10px;
}
</style>
