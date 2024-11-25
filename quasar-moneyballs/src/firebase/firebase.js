import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCYFbHeaHsTw3AF5AmFK83nJb7HsonPdtw",
  authDomain: "moneyballs-firestore-55bc9.firebaseapp.com",
  projectId: "moneyballs-firestore-55bc9",
  storageBucket: "moneyballs-firestore-55bc9.firebasestorage.app",
  messagingSenderId: "981655253483",
  appId: "1:981655253483:web:c6009eed614eabf325a9ae"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
  db
}
