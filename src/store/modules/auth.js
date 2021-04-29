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

      router.push("/");
    },

    async signIn(context, signinData) {
      const { email, password } = signinData;

      await firebase.auth().signInWithEmailAndPassword(email, password);

      router.push("/");
    },

    async signOut() {
      await firebase.auth().signOut();

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
