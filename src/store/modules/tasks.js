import firebase from "firebase";
import router from "../../router";
import { destructureDate } from "../../utils/DateParser";

const tasksModule = {
  namespaced: true,
  state: {
    userTasks: {},
  },
  mutations: {
    setUserTasks(state, tasks) {
      state.userTasks = tasks;
    },
  },
  actions: {
    async putTaskToServer(context, taskRecord) {
      const { user, info } = taskRecord;
      console.log(taskRecord);
      const { year, month, day } = destructureDate(info.creationDate);

      info.creationDate = info.creationDate.toDateString();
      try {
        const usersRef = await firebase
          .database()
          .ref(`users/${user.uid}/${year}/${month}/${day}`);
        await usersRef.push(info);
        await router.push("/");
      } catch (error) {
        console.error(error.message);
      }
    },
    async fetchUserTasks(context) {
      try {
        // TODO: handle users without any records;
        const userRef = await context.dispatch("getUserRef");
        await userRef.on("value", (snapshot) => {
          const userTasks = snapshot.val();
          context.commit("setUserTasks", userTasks);
          console.log(
            "Data has been successfully fetched!",
            context.state.userTasks
          );
        });
      } catch (error) {
        console.error("Error while fetching data:", error.message);
      }
    },

    async getUserRef(context) {
      const user = context.rootState.authModule.currentUser;
      return await firebase.database().ref(`users/${user.uid}`);
    },

    async updateTask(context, taskRecord) {
      const { id, info } = taskRecord;
      const { year, month, day } = destructureDate(info.creationDate);
      try {
        const userRef = await context.dispatch("getUserRef");
        await userRef
          .child(`${year}/${month}/${day}/${id}`)
          .update({ completed: info.completed });
        console.log(`task ${id} updated`);
      } catch (error) {
        console.error("Updating task error:", error.message);
      }
    },
  },
};

export default tasksModule;
