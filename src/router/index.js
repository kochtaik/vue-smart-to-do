import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import AddTask from "../components/Tasks/AddTask.vue";
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
    meta: { pageDestination: "Sign up" },
  },
  {
    path: "/sign-in",
    component: Authentication,
    meta: { pageDestination: "Sign in" },
  },
  // {
  //   path: "/add",
  //   component: AddTask,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
