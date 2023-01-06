import { ref } from "vue";
import { defineStore } from "pinia";

const userStore = defineStore("user", () => {
  const loggedIn = ref(false);
  const user = ref({
    email: "",
    name: "",
  });

  const changeName = (newName: string) => {
    user.value.name = newName;
  };

  return { loggedIn, user, changeName };
});

export { userStore };
