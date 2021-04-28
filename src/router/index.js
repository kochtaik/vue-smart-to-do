import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.isPublic);
  const isSignedIn = store.getters["authModule/isUserSignedIn"];
  const forNotLoggedInUsers = to.matched.some(
    (record) => record.meta.forNotLoggedInUsers
  );
  console.log(
    "is public:",
    isPublic,
    "is signed in:",
    isSignedIn,
    "for not logged in users:",
    forNotLoggedInUsers
  );
  if (!isPublic && !isSignedIn) {
    return next("/sign-in");
  }
  if (isSignedIn && forNotLoggedInUsers) {
    return next("/");
  }
  next();
});

export default router;
