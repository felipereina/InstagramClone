import firebase from 'firebase'


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
        console.log(response)
        dispatch({type: 'LOGIN', payload: response.user})
    } catch(e){
        alert(e)
    }
    } 
}

export const signup = () =>{
    return async (dispatch, getState) => {
    const {email, password} = getState().user
    try{
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log(response)
        dispatch({type: 'SIGNUP', payload: response.user})
    } catch(e){
        alert(e)
    }
    } 
}