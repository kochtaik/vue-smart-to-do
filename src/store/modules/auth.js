import firebase from "firebase";
import router from "../../router";

const authModule = {
  namespaced: true,
  state: {
    currentUser: null,
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    async signUp(context, signupData) {
      const { email, password } = signupData;
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await context.dispatch("fetchUser");
        console.log(
          "You have been successfully logged in!. User data:",
          userCredential.user
        );
        router.push("/");
      } catch (error) {
        console.error(error.code, error.message);
      }
    },
    async signIn(context, signinData) {
      const { email, password } = signinData;
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        await context.dispatch("fetchUser");
        router.push("/");
      } catch (error) {
        console.error("Error while signing in:", error.message);
      }
    },
    async signOut(context) {
      try {
        await firebase.auth().signOut();
        context.commit("setUser", null); // or this.dispatch('fetchUser') would be better?
        console.log("User has been signed out");
      } catch (error) {
        console.log("Cannot sign user out:", error.message);
      }
      router.push("/sign-in");
    },

    async getCurrentUser() {
      return await firebase.getCurrentUser();
    },

    async fetchUser(context) {
      const user = await context.dispatch("getCurrentUser");
      context.commit("setUser", user);
    },
  },
};

export default authModule;
