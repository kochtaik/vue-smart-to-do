import { createStore } from "vuex";
import authModule from "./modules/auth";
import taskModule from "./modules/tasks";
import firebase from "firebase";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    init(context) {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          context.commit("authModule/setUser", user);
          context.dispatch("taskModule/fetchUserTasks");
          resolve();
        }, reject);
      });
    },
  },
  modules: {
    authModule,
    taskModule,
  },
});
