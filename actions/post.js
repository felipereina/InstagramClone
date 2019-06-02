import firebase from 'firebase'
import db from '../config/firebase'
import uuid from 'uuid'

export const updateDescription = (input) => {
    return {type: 'UPDATE_DESCRIPTION', payload: input}
}

export const updateLocation = (input) => {
    return {type: 'UPDATE_LOCATION', payload: input}
}

export const updatePhoto = (input) => {
    return {type: 'UPDATE_PHOTO', payload: input}
}

export const uploadPost = () =>{
    return async (dispatch, getState) => {
        try{
            const { post, user } = getState()
            const id = uuid.v4()
            const upload = {
                id: id,
                uid: user.uid,
                photo: user.photo,
                username: user.username,
                postDescription: post.description,
                postPhoto: post.photo,
                postLocation: post.location
            }

        db.collection('post').doc(id).set(upload)
        
        } catch(e){
            alert(e)
        }
    } 
}

export const getPosts = () =>{
    return async (dispatch) => {
    try{
        const posts = await db.collection('post').get() //get all the posts'
        
        let array = []
        posts.forEach((post) => {
            array.push(post.data())
        })

        dispatch({type: 'GET_POSTS', payload: array})
    } catch(e){
        alert(e)
    }
    } 
}