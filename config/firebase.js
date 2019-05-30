import firebase from 'firebase'
import ENV from '../env'
require('firebase/firestore')

const config = {
    apiKey: ENV.apiKey,
    authDomain:ENV.authDomain,
    databaseURL:ENV.databaseURL,
    projectId:ENV.projectId,
    storageBucket:ENV.storageBucket,
    messagingSenderId: ENV.messagingSenderId,
    appId: ENV.appId
}
//initialize firebase with all configuration keys
firebase.initializeApp(config)

//export firestore database
const db = firebase.firestore()

export default db