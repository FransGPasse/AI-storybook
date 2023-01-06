import { createRouter, createWebHistory } from "vue-router";
import AuthenticationPage from "../views/AuthenticationPage.vue";
import HomePage from "../views/HomePage.vue";
import GeneratePage from "../views/GeneratePage.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/authenticate",
    name: "AuthenticationPage",
    component: AuthenticationPage,
  },
  {
    path: "/generate",
    name: "Generate",
    component: GeneratePage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
