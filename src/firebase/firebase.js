import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_3Rypaj9QaNSirQJSYqS-kPE3KsVgCT8",
  authDomain: "whatsapp-clone-7.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-7.firebaseio.com",
  projectId: "whatsapp-clone-7",
  storageBucket: "whatsapp-clone-7.appspot.com",
  messagingSenderId: "611293402419",
  appId: "1:611293402419:web:ae072261655495364cda46",
  measurementId: "G-P2PW7XZXBY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
