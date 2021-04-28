import Home from "../views/Home.vue";
import AddTask from "../components/Tasks/AddTask.vue";
import EditTask from "../components/Tasks/EditTask.vue";
import Authentication from "../views/Authentication.vue";

export const routes = [
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
