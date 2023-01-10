<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "../store/store.js";
import { auth } from "../firebase/index";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import Button from "../components/Button.vue";

const store = userStore();
const email = ref("");
const password = ref("");

const register = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="auth-page">
    <h1>Register</h1>
    <form>
      <input type="email" placeholder="Email adress" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
    </form>
    <Button text="Sign up" @click="register(email, password)" />
  </div>
</template>

<style scoped>
.auth-page {
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input {
  height: 50px;
  width: 200px;
  margin-block: 10px;
}
</style>
