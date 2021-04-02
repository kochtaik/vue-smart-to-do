import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// global components
import BaseButton from "./components/UI/BaseButton.vue";

const app = createApp(App)
  .use(router)
  .use(store)
  .component("base-button", BaseButton);

import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig.js";
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit("authModule/setAuthenticationStatus", true);
  } else {
    store.commit("authModule/setAuthenticationStatus", false);
  }
  console.log("user", user);
  app.mount("#app");
});
