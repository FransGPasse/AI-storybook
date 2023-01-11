import { ref } from "vue";
import { defineStore } from "pinia";

const userStore = defineStore(
  "user",
  () => {
    const loggedIn = ref(false);
    const user = ref({
      email: "",
      name: "",
    });

    const changeName = (newName: string) => {
      user.value.name = newName;
    };

    return { loggedIn, user, changeName };
  },
  {
    persist: true,
  }
);

const pageStore = defineStore(
  "pages",
  () => {
    const numberOfPages = ref(5);
    const currentArrayValue = ref(0);

    const generatedImagesArray: any = ref([]);
    return { numberOfPages, generatedImagesArray, currentArrayValue };
  },
  {
    persist: true,
  }
);

export { userStore, pageStore };
