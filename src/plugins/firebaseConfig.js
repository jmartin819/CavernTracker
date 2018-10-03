import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// firebase init goes here
const config = {
    apiKey: "AIzaSyDBhXWwZID3pinI_X0AdHt2OlziQS9XBiI",
    authDomain: "turbodoto.firebaseapp.com",
    databaseURL: "https://turbodoto.firebaseio.com",
    projectId: "turbodoto",
    storageBucket: "turbodoto.appspot.com",
    messagingSenderId: "416790912304"
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
