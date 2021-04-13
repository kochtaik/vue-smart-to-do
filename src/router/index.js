import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import AddTask from "../components/Tasks/AddTask.vue";
import EditTask from "../components/Tasks/EditTask.vue";
import Authentication from "../views/Authentication.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign-up",
    component: Authentication,
    meta: {
      pageDestination: "Sign up",
      isPublic: true,
      forNotLoggedInUsers: true,
    },
  },
  {
    path: "/sign-in",
    component: Authentication,
    meta: {
      pageDestination: "Sign in",
      isPublic: true,
      forNotLoggedInUsers: true,
    },
  },
  {
    path: "/add",
    component: AddTask,
  },
  {
    path: "/edit/:taskId",
    component: EditTask,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.isPublic);
  const isSignedIn = await store.dispatch("authModule/getCurrentUser");
  const forNotLoggedInUsers = to.matched.some(
    (record) => record.meta.forNotLoggedInUsers
  );
  const isTaskListEmpty = store.getters["tasksModule/isTaskListEmpty"];

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
  if (!isPublic && isSignedIn && isTaskListEmpty) {
    await store.dispatch("authModule/fetchUser");
    await store.dispatch("tasksModule/fetchUserTasks");
  }
  next();
});

export default router;
