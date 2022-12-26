import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDAOZheZts6qOXz2c8K4dy8HP9BAYi4zqc',
  authDomain: 'vue-muso-ninjas-af8ea.firebaseapp.com',
  projectId: 'vue-muso-ninjas-af8ea',
  storageBucket: 'vue-muso-ninjas-af8ea.appspot.com',
  messagingSenderId: '749591423145',
  appId: '1:749591423145:web:34b9e3f54ee6f3e92ba1b8',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {projectFirestore, projectAuth, projectStorage, timestamp}
