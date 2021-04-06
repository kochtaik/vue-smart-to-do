import { createStore } from "vuex";
import authModule from "./modules/auth";
import tasksModule from "./modules/tasks";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    tasksModule,
  },
});
