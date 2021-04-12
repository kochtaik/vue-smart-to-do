import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// global components
import BaseButton from "./components/UI/BaseButton.vue";

// Third-party packages
import Toaster from "@meforma/vue-toaster";

import { initializeFirebase } from "./firebase/firebaseInitialization";
initializeFirebase();

createApp(App)
  .use(store)
  .use(router)
  .use(Toaster, { position: "top" })
  .component("base-button", BaseButton)
  .mount("#app");
