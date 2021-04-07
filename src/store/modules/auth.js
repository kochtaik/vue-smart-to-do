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

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await context.dispatch("fetchUser");

      router.push("/");
    },

    async signIn(context, signinData) {
      const { email, password } = signinData;

      await firebase.auth().signInWithEmailAndPassword(email, password);
      await context.dispatch("fetchUser");

      router.push("/");
    },

    async signOut(context) {
      await firebase.auth().signOut();

      context.commit("setUser", null); // or this.dispatch('fetchUser') would be better?
      console.log("User has been signed out");

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
