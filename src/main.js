import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// Third-party packages
import Toaster from "@meforma/vue-toaster";

// global components
import BaseButton from "./components/UI/BaseButton.vue";
// TODO: incapsulate firebase logic into a root module

import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig.js";
firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

createApp(App)
  .use(store)
  .use(router)
  .use(Toaster, { position: "top" })
  .component("base-button", BaseButton)
  .mount("#app");
