import firebase from 'firebase'
import db from '../config/firebase'
import { Facebook } from 'expo';

export const updateEmail = (email) => {
    return {type: 'UPDATE_EMAIL', payload: email}
}

export const updatePassword = (password) => {
    return {type: 'UPDATE_PASSWORD', payload: password}
}

export const updateUserName = (username) => {
    return {type: 'UPDATE_USERNAME', payload: username}
}

export const updateBio = (bio) => {
    return {type: 'UPDATE_BIO', payload: bio}
}

export const login = () =>{
    return async (dispatch, getState) => {
    const {email, password} = getState().user
    try{
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        dispatch(getUser(response.user.uid))
    } catch(e){
        alert(e)
    }
    } 
}

export const facebookLogin = () =>{
    return async (dispatch) => {
    try{
        const { type, token } = await Facebook.logInWithReadPermissionsAsync('304682660450298', {permissions: ['public_profile']})
        if(type === 'success'){
        // Build Firebase credential with the Facebook access token.
            const credential = await firebase.auth.FacebookAuthProvider.credential(token);

        // Sign in with credential from the Facebook user.
            const response = await firebase.auth().signInWithCredential(credential)
            console.log('>>response: ',response)
            console.log('>>response.user : ',response.user)
            console.log('>>response.user.uid : ',response.user.uid)
            console.log('>>response.additionalUserInfo.isNewUser : ',response.additionalUserInfo.isNewUser)

            //check if the user already exists
            const user = await db.collection('user').doc(response.user.uid).get()
            console.log('>>user: ',user)
             if(response.additionalUserInfo.isNewUser){
                console.log('>>ENTROU!!! ')
                    const user = {
                        uid: response.user.uid,
                        email: response.user.email,
                        username: response.user.displayName,
                        bio: '',
                        photo: response.user.photoURL,
                        token: null
                }
                //stores the user information on firestore database and use uid created by firebase authentication
                db.collection('user').doc(user.uid).set(user)
                dispatch({type: 'LOGIN', payload: user})
            } else {
                dispatch(getUser(response.user.uid))
            }
        }
    } catch(e){
        alert('FROM FACEBOOK METHOD: ' + e)
    }
    } 
}

export const getUser = (uid) =>{
    return async (dispatch) => {
    try{
        const user = await db.collection('user').doc(uid).get()
        dispatch({type: 'LOGIN', payload: user.data()})
    } catch(e){
        alert(e)
    }
    } 
}

export const signup = () =>{
    return async (dispatch, getState) => {
    try{
        const {email, password, username, bio} = getState().user
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
        
        //create a new user object with the state input from the Text fields and uid from firebase authentication method
        if(response.user.uid){
        const user = {
            uid: response.user.uid,
            email: email,
            username: username,
            bio: bio,
            photo: '',
            token: null
        }
        //stores the user information on firestore database and use uid created by firebase authentication
        db.collection('user').doc(response.user.uid).set(user)

        dispatch({type: 'LOGIN', payload: user}) //dispatch the new user object insted of firebase object for global redux state handler
    }
    } catch(e){
        alert(e)
    }
    } 
}