import { ref } from "vue";
import { defineStore } from "pinia";

/* Two different stores, one persisted and one not */
const helper_store = defineStore("helper_store", () => {
  /* Helper refs/states */
  const data_URL_helper = ref("data:image/png;base64,");
  const isLoading = ref(false);
  const showCoverControls = ref(false);
  const showPageControls = ref(false);
  const numberOfPages = ref(5);
  const generatedImagesArray: any = ref([]);
  const currentArrayValue = ref(0);

  return {
    data_URL_helper,
    isLoading,
    showCoverControls,
    showPageControls,
    numberOfPages,
    generatedImagesArray,
    currentArrayValue,
  };
});

const persisted_store = defineStore(
  "persisted_store",
  () => {
    const user = ref({
      email: "",
      name: "",
    });

    const currentStoryTitle = ref("");
    const currentPage = ref(0);

    return { user, currentStoryTitle, currentPage };
  },
  /* Persists state through pinia-plugin-persistedstate */
  {
    persist: true,
  }
);

export { helper_store, persisted_store };
