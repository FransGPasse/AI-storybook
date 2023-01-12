import { createRouter, createWebHistory } from "vue-router";
import AuthenticationPage from "../views/AuthenticationPage.vue";
import HomePage from "../views/HomePage.vue";
import GeneratePage from "../views/GeneratePage.vue";
import { auth } from "../firebase";

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
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
    return {
      path: "/authenticate",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
