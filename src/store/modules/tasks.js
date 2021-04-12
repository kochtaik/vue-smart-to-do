import firebase from "firebase";
import router from "../../router";
import { destructureDate } from "../../utils/DateParser";

const tasksModule = {
  namespaced: true,
  state: {
    userTasks: {},
    isTasksListLoading: false,
  },
  mutations: {
    setUserTasks(state, tasks) {
      state.userTasks = tasks;
    },
    setLoadingStatus(state, status) {
      console.log(state.isTasksListLoading);
      state.isTasksListLoading = status;
    },
  },
  actions: {
    async putTaskToServer(context, taskRecord) {
      const { user, info } = taskRecord;
      const { year, month, day } = destructureDate(info.creationDate);

      info.creationDate = info.creationDate.toDateString();
      const usersRef = await firebase
        .database()
        .ref(`users/${user.uid}/${year}/${month}/${day}`);
      await usersRef.push(info);
      await router.push("/");
    },
    async fetchUserTasks(context) {
      try {
        console.log("before", context);
        context.commit("setLoadingStatus", true);
        console.log("after", context);
        const userRef = await context.dispatch("getUserRef");
        await userRef.on("value", (snapshot) => {
          const userTasks = snapshot.val();
          context.commit("setUserTasks", userTasks);
          context.commit("setLoadingStatus", false);
          console.log(
            "Data has been successfully fetched!",
            context.state.userTasks
          );
        });
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    },

    async getUserRef(context) {
      const user = context.rootState.authModule.currentUser;
      return await firebase.database().ref(`users/${user.uid}`);
    },

    async updateTask(context, taskRecord) {
      const { id, info } = taskRecord;
      const { year, month, day } = destructureDate(info.creationDate);
      const userRef = await context.dispatch("getUserRef");

      await userRef
        .child(`${year}/${month}/${day}/${id}`)
        .update({ completed: info.completed });
      console.log(`task ${id} updated`);
    },
  },
  getters: {
    isTaskListEmpty(state) {
      if (state.userTasks === null) return true;
      return Object.keys(state.userTasks).length === 0;
    },
    // TODO: remove getter
    isTasksListLoading(state) {
      return state.isTasksListLoading;
    },
  },
};

export default tasksModule;
