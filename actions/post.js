import firebase from 'firebase'
import db from '../config/firebase'
import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'


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
                photo: user.photo || ' ',
                username: user.username,
                postDescription: post.description || ' ',
                postPhoto: post.photo,
                postLocation: post.location || ' ',
                likes: []
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

export const likePost = (post) =>{
    return async (dispatch, getState) => {
        const { uid, username, photo } = getState().user
        try{
            //way to dont do a extra API call to get feed state
            const home = cloneDeep(getState().post.feed)
            let newFeed = home.map( item => {
                if(item.id === post.id ){
                    item.likes.push(uid)
                }
                return item
            })


            db.collection('post').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(uid) //similar to array.push in firestore
            })

            db.collection('activity').doc().set({
                postId: post.id,
                postPhoto: post.postPhoto,
                likerId: uid,
                likerPhoto: photo,
                likerName: username,
                uid: post.uid,
                date: new Date().getTime(),
                type: 'LIKE'
            })
            dispatch({type: 'GET_POSTS', payload: newFeed})
            //dispatch(getPosts())
        } catch(e){
            alert(e)
        }
    } 
}


export const unlikePost = (post) =>{
    return async (dispatch, getState) => {
        const { uid } = getState().user
        try{
            db.collection('post').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(uid) //similar to array.pop in firestore
            })

            const query = await db.collection('activity').where('postId', '==', post.id).where('likerId', '==', uid).get()
            query.forEach((response) => {
                response.ref.delete()
            })

            dispatch(getPosts())
        } catch(e){
            alert(e)
        }
    } 
}