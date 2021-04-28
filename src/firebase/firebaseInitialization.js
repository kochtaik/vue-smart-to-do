import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig.js";

export function initializeFirebase() {
  firebase.initializeApp(firebaseConfig);
}
