import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

//Firebase API Key
const config = {
    apiKey: "AIzaSyDy42LFaZY_R9yYgb5rX-XWkawH-uS3v9w",
    authDomain: "pickr-dev.firebaseapp.com",
    databaseURL: "https://pickr-dev.firebaseio.com",
    projectId: "pickr-dev",
    storageBucket: "pickr-dev.appspot.com",
    messagingSenderId: "366132552941",
    appId: "1:366132552941:web:b7e7fd6aa24ef38f"
  };

/**
 * Represents firebase object that provides hooks to 
 * Auth and Database services to be used throughout the App
 */
class Firebase {
  constructor() {
    if (!app.apps.length) {
        app.initializeApp(config);
    }
    this.auth = app.auth();
    this.db = app.database();
  }

  //Auth user creation API shorthand
  signUp = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  //Auth user login API shorthand
  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  //Auth user logout API shorthand
  signOut = () => this.auth.signOut();

  //Realtime database user details API shorthand
  user = (uid) => this.db.ref(`users/${uid}`);

  //Realtime database user preferences API shorthand
  preferences = (uid) => this.db.ref(`users/${uid}/preferences`);

  //Realtime database user preference modify API shorthand
  preferencesWrite = (uid, value) => this.db.ref(`users/${uid}/preferences/${value}`);

  //Realtime database user list API shorthand
  users = () => this.db.ref('users');

  //Realtime database user progress API shorthand
  categoryProgress = (uid) => this.db.ref(`users/${uid}/progress`);

  //Realtime database user saved quests API shorthand
  favourites = (uid) => this.db.ref(`users/${uid}/favourites`);

  //Realtime database quest list API shorthand
  questsAll = () => this.db.ref(`quests`);

  //Realtime database specific quest API shorthand
  quests = (questId) => this.db.ref(`quests/${questId}`);

  //Realtime database user completed quests API shorthand
  completed = (uid) => this.db.ref(`users/${uid}/completed`);
}

export default Firebase;