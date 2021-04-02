import firebase from "firebase";

const authModule = {
  namespaced: true,
  state: {
    isSignedIn: false,
  },
  mutations: {
    setAuthenticationStatus(state, isSignedIn) {
      state.isSignedIn = isSignedIn;
    },
  },
  actions: {
    async signUp(context, signupData) {
      const { email, password } = signupData;
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        console.log(userCredential);
        console.log(
          "You have been successfully logged in!. User data:",
          userCredential.user
        );
        return userCredential.user;
      } catch (error) {
        console.error(error.code, error.message);
        return null;
      }
    },
    async signIn(context, signinData) {
      const { email, password } = signinData;
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        return true;
      } catch (error) {
        console.error("Error while signing in in:", error.message);
        return false;
      }
    },
  },
};

export default authModule;
