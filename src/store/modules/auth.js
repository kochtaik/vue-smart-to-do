import firebase from "firebase";
import router from "../../router";

const authModule = {
  namespaced: true,
  state: {
    currentUser: null,
    isAuthenticationPending: false,
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
    },
    setAuthenticationStatus(state, status) {
      state.isAuthenticationPending = status;
    },
  },
  actions: {
    async signUp(context, signupData) {
      const { email, password } = signupData;
      context.commit("setAuthenticationStatus", true);

      await firebase.auth().createUserWithEmailAndPassword(email, password);

      context.commit("setAuthenticationStatus", false);
      router.push("/");
    },

    async signIn(context, signinData) {
      const { email, password } = signinData;
      context.commit("setAuthenticationStatus", true);

      await firebase.auth().signInWithEmailAndPassword(email, password);

      context.commit("setAuthenticationStatus", false);
      router.push("/");
    },

    async signOut() {
      await firebase.auth().signOut();
      console.log("User has been signed out");
      router.push("/sign-in");
    },

    async getCurrentUser(context) {
      const user = await firebase.auth().currentUser;
      context.commit("setUser", user);
      return context.state.currentUser;
    },
  },
  getters: {
    isUserSignedIn(state) {
      return state.currentUser !== null;
    },
  },
};

export default authModule;
