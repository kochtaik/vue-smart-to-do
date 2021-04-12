import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig.js";

export function initializeFirebase() {
  firebase.initializeApp(firebaseConfig);

  firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };
}
