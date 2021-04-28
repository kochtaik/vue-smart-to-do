import Home from "../views/Home.vue";
import AddTask from "../components/Tasks/AddTask.vue";
import EditTask from "../components/Tasks/EditTask.vue";
import SignIn from "../views/authentication/SignIn.vue";
import SignUp from "../views/authentication/SignUp.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign-up",
    component: SignUp,
    meta: {
      isPublic: true,
      forNotLoggedInUsers: true,
    },
  },
  {
    path: "/sign-in",
    component: SignIn,
    meta: {
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
