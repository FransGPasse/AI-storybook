import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import type { Router } from "vue-router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router/index";

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);
app.mount("#app");
