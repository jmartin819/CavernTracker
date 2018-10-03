import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// firebase init goes here
const config = {
/*    apiKey: "AIzaSyDBhXWwZID3pinI_X0AdHt2OlziQS9XBiI",
    authDomain: "turbodoto.firebaseapp.com",
    databaseURL: "https://turbodoto.firebaseio.com",
    projectId: "turbodoto",
    storageBucket: "turbodoto.appspot.com",
    messagingSenderId: "416790912304"*/
    apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJ_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MSG_ID
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')

export {
  db,
  auth,
  currentUser,
  usersCollection
}
