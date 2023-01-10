import { ref, reactive } from "vue";
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

const pageStore = defineStore("pages", () => {
  const numberOfPages = ref(5);
  const currentArrayValue = ref(0);

  let generatedImagesArray: any = ref([]);

  return { numberOfPages, generatedImagesArray, currentArrayValue };
});

export { userStore, pageStore };
