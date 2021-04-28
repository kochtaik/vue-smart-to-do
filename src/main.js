import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// global components
import BaseButton from "./components/UI/BaseButton.vue";

// Third-party packages
import Toaster from "@meforma/vue-toaster";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { initializeFirebase } from "./firebase/firebaseInitialization";
initializeFirebase();

let app;

// TODO: REMOVE EXCESS LOGS
store.dispatch("init").then(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(Toaster, { position: "top" })
      .component("base-button", BaseButton)
      .component("pulse-loader", PulseLoader)
      .mount("#app");
  }
});
