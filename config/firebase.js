import firebase from 'firebase'
import ENV from '../env'

const config = {
    apiKey: ENV.apiKey,
    authDomain:ENV.authDomain,
    databaseURL:ENV.databaseURL,
    projectId:ENV.projectId,
    storageBucket:ENV.storageBucket,
    messagingSenderId: ENV.messagingSenderId,
    appId: ENV.appId
}

const initialize = firebase.initializeApp(config)

export default initialize