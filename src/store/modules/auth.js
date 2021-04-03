import firebase from "firebase";
import router from "../../router";

const authModule = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async signUp(context, signupData) {
      const { email, password } = signupData;
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
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
        router.push("/");
      } catch (error) {
        console.error("Error while signing in:", error.message);
      }
    },
    async signOut() {
      try {
        await firebase.auth().signOut();
        console.log("User has been signed out");
      } catch (error) {
        console.log("Cannot sign user out:", error.message);
      }
      router.push("/sign-in");
    },
  },
  getters: {
    isUserSignedIn() {
      return firebase.auth().currentUser;
    },
  },
};

export default authModule;
