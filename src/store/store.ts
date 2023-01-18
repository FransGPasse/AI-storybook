import { ref } from "vue";
import { defineStore } from "pinia";

/* Two different stores, one persisted for the users email and name... */
const userStore = defineStore(
  "user",
  () => {
    const user = ref({
      email: "",
      name: "",
    });

    const changeName = (newName: string) => {
      user.value.name = newName;
    };

    return { user, changeName };
  },
  /* Persists state through pinia-plugin-persistedstate */
  {
    persist: true,
  }
);

/* ... and one for the last generated images */
const generationStore = defineStore("pages", () => {
  const numberOfPages = ref(5);
  const currentArrayValue = ref(0);

  const generatedImagesArray: any = ref([]);

  const isLoading = ref(false);

  return { numberOfPages, generatedImagesArray, currentArrayValue, isLoading };
});

export { userStore, generationStore };
