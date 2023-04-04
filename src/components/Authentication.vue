<script setup lang="ts">
import { ref } from "vue";
import { auth } from "../firebase/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref();
const newUser = ref(true);

/* Sign up user to Firebase using the email and password ref. */
async function register(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    router.push("/generate");
  } catch (error: unknown) {
    errorMessage.value = error;
    setTimeout(() => {
      errorMessage.value = "";
    }, 4000);
  }
}

/* Log in user to Firebase using the email and password ref. */
async function login(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/generate");
  } catch (error: unknown) {
    errorMessage.value = error;
    setTimeout(() => {
      errorMessage.value = "";
    }, 4000);
  }
}
</script>

<template>
  <div class="auth-wrapper">
    <h1>
      {{ newUser ? "Register an account" : "Sign in to an existing account" }}
    </h1>
    <p v-if="errorMessage">
      Something went wrong... <br />
      {{ errorMessage }}
    </p>
    <div class="form-wrapper">
      <form>
        <input type="email" placeholder="Email adress" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
      </form>
      <Button
        :text="newUser ? 'Sign up' : 'Log in'"
        @click="newUser ? register(email, password) : login(email, password)"
      />
    </div>
    <Button
      @click="newUser = !newUser"
      secondary
      :text="
        newUser
          ? 'or log in to an existing account...'
          : 'or register a new account...'
      "
    />
  </div>
</template>

<style scoped>
.auth-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgb(231, 231, 231);

  height: min(60%, 400px);
  width: min(70%, 400px);

  border-radius: 8px;
  text-align: center;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 230px;
}

h1 {
  height: 70px;
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
  border-radius: 8px;
  border: 2px solid var(--btn-color);
  padding: 10px;
}
</style>
