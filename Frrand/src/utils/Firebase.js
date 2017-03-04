import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCyP_qlGxdERUuaWvpWz14lO8cOBrL0OBc",
  authDomain: "pronto-e85db.firebaseapp.com",
  databaseURL: "https://pronto-e85db.firebaseio.com",
  storageBucket: "pronto-e85db.appspot.com",
  messagingSenderId: "123486016224"
};

const app = Firebase.initializeApp(config);
export default app;
