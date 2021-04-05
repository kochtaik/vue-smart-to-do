import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// global components
import BaseButton from "./components/UI/BaseButton.vue";

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
  .component("base-button", BaseButton)
  .mount("#app");
