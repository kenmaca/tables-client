import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD-SwwnvAvguxQEv5ps35gPK5qSD6KtQd4',
  authDomain: 'frrand-8149d.firebaseapp.com',
  databaseURL: 'https://frrand-8149d.firebaseio.com',
  messagingSenderId: '787773853296'
};

const app = Firebase.initializeApp(config);
export default app;
