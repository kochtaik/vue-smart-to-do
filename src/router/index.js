import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase";
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
  // {
  //   path: "/add",
  //   component: AddTask,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.isPublic);
  const isSignedIn = firebase.auth().currentUser;
  const forNotLoggedInUsers = to.matched.some((record) => record.meta.forNotLoggedInUsers);
  // console.log('is public:', isPublic, 'is signed in:', isSignedIn);
  // console.log('for not logged in users', forNotLoggedInUsers);
  if (!isPublic && !isSignedIn) {
    return next("/sign-in");
  }
  if (isSignedIn && forNotLoggedInUsers) {
    return next("/");
  }
  next();
});

export default router;
