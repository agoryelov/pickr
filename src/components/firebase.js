import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDy42LFaZY_R9yYgb5rX-XWkawH-uS3v9w",
    authDomain: "pickr-dev.firebaseapp.com",
    databaseURL: "https://pickr-dev.firebaseio.com",
    projectId: "pickr-dev",
    storageBucket: "pickr-dev.appspot.com",
    messagingSenderId: "366132552941",
    appId: "1:366132552941:web:b7e7fd6aa24ef38f"
  };

class Firebase {
  constructor() {
    if (!app.apps.length) {
        app.initializeApp(config);
    }
    this.auth = app.auth();
    this.db = app.database();
  }

  signUp = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  categoryProgress = (uid) => this.db.ref(`users/${uid}/progress`);

  favourites = (uid) => this.db.ref(`users/${uid}/favourites`);

  quests = () => this.db.ref(`quests`);


}

export default Firebase;