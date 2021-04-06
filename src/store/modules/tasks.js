import firebase from "firebase";
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
      try {
        const usersRef = await firebase
          .database()
          .ref(`users/${user.uid}/${year}/${month}/${day}`);
        await usersRef.push(info);
      } catch (error) {
        console.error(error.message);
      }
    },
    async fetchUserTasks(context) {
      const user = context.rootState.authModule.currentUser;
      console.log("user", context.rootState.authModule.currentUser);
      try {
        // TODO: handel users without any records;
        const userRef = await firebase.database().ref(`users/${user.uid}`);
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
  },
};

export default tasksModule;
