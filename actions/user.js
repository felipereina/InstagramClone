import firebase from 'firebase'
import db from '../config/firebase'


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

export const getUser = (uid) =>{
    return async (dispatch, getState) => {
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
        .then(() => { console.log("completed")})
        .catch((e) => { console.log("failed", e)})

        dispatch({type: 'LOGIN', payload: user}) //dispatch the new user object insted of firebase object for global redux state handler
    }
    } catch(e){
        alert(e)
    }
    } 
}