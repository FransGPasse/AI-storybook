<script setup lang="ts">
import Button from "./Button.vue";
import { auth } from "../firebase/index";
import { signOut } from "@firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const currentUser = auth.currentUser?.email;

async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error: unknown) {
    console.error(error);
  }
}
</script>

<template>
  <div class="footer">
    <p>Logged in as {{ currentUser }}</p>
    <Button text="My books" secondary @click="router.push('/books')" />
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
