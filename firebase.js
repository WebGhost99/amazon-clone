import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBV9m0UDeMvXYWMrU0rSvZ91lNR2RwIKCc",
    authDomain: "fir-d382b.firebaseapp.com",
    projectId: "fir-d382b",
    storageBucket: "fir-d382b.appspot.com",
    messagingSenderId: "165784686331",
    appId: "1:165784686331:web:e6877fe687186aee1f2a5e"
  };
//if are no app ready
  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();


  export default db;

