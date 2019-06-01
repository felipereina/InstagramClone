import firebase from 'firebase'
import db from '../config/firebase'

export const updateDescription = (text) => {
    return {type: 'UPDATE_DESCRIPTION', payload: text}
}

export const uploadPost = () =>{
    return async (dispatch, getState) => {
    try{
        const { post, user } = getState()
        
        const upload = {
            uid: user.uid,
            photo: user.photo,
            username: user.username,
            postDescription: post.description,
            postPhoto:  'https://firebasestorage.googleapis.com/v0/b/instagram-clone-fa3ee.appspot.com/o/jobim%20e%20joao%20gilberto.jpg?alt=media&token=d49e4993-176c-48d3-bcb3-704c1a5ec9ea'
        }

        const ref = await db.collection('post').doc()
        console.log('>>ref ', ref)
        upload.id = ref.id
        ref.set(upload)
    } catch(e){
        alert(e)
    }
    } 
}