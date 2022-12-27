<script setup lang="ts">
import Button from "../components/Button.vue";
</script>

<template>
  <div class="homepage">
    <h1>Welcome to the AI storybook</h1>

    <router-link to="/generate"
      ><Button text="Start dreaming &rarr;" />
    </router-link>
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  background-color: #f3ec78;
  background-image: linear-gradient(90deg, #f3ec78, #fd4343);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;

  font-size: 5rem;
  text-align: center;
}
</style>
