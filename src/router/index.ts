import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import GeneratePage from "../views/GeneratePage.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
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
