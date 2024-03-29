import { createRouter, createWebHistory } from "vue-router";
import AuthenticationPage from "../views/AuthenticationPage.vue";
import HomePage from "../views/HomePage.vue";
import GeneratePage from "../views/GeneratePage.vue";
import MyBooksPage from "../views/MyBooksPage.vue";
import MyBookPage from "../views/MyBookPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
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
    name: "GeneratePage",
    component: GeneratePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/books",
    name: "MyBooksPage",
    component: MyBooksPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/books/:id",
    name: "MyBookPage",
    component: MyBookPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* Tries to get the current user and resolve, otherwise reject */
async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
}

/* Checks all routes to see if user is authorized and logged in, otherwise redirect to auth-page */
router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
    if (!(await getCurrentUser())) {
      return {
        path: "/authenticate",
      };
    }
  }
});

export default router;
