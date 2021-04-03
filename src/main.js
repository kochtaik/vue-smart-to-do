import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// global components
import BaseButton from "./components/UI/BaseButton.vue";

const app = createApp(App)

import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig.js";
firebase.initializeApp(firebaseConfig);

app.use(store).use(router).component("base-button", BaseButton).mount("#app");