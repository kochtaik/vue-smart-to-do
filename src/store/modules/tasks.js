import firebase from "firebase";
import router from "../../router";

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
      const { info } = taskRecord;

      info.creationDate = info.creationDate.toDateString();
      const userRef = await context.dispatch("getUserRef");
      await userRef.child("tasks").push(info);
      await router.push("/");
    },
    async fetchUserTasks(context) {
      context.commit("setLoadingStatus", true);
      try {
        const userRef = await context.dispatch("getUserRef");
        await userRef.child("tasks").on("value", (snapshot) => {
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
      const [id, info] = taskRecord;
      const userRef = await context.dispatch("getUserRef");

      await userRef.child("tasks").child(id).set(info);
      console.log(`task ${id} updated`);
    },

    async deleteTask(context, id) {
      const userRef = await context.dispatch("getUserRef");
      await userRef.child("tasks").child(id).remove();
    },
  },
  getters: {
    isTaskListEmpty(state) {
      if (state.userTasks === null) return true;
      return Object.keys(state.userTasks).length === 0;
    },
  },
};

export default tasksModule;
