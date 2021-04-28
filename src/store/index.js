import { createStore } from "vuex";
import authModule from "./modules/auth";
import taskModule from "./modules/tasks";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    taskModule,
  },
});
