import firebase from 'firebase/app'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBZan-RCYUDRPdU_fa1kSIjxJskE6QEIiM',
  authDomain: 'justdoit-holonotes.firebaseapp.com',
  projectId: 'justdoit-holonotes',
  storageBucket: 'justdoit-holonotes.appspot.com',
  messagingSenderId: '268077058170',
  appId: '1:268077058170:web:7ea4e55c267323177b93c3',
  measurementId: 'G-SGCWBQCP6B',
}

export function firebaseService() {
  let analytics
  const init = () => {
    firebase.initializeApp(firebaseConfig)
    analytics = firebase.analytics()
  }

  return { init, analytics }
}
