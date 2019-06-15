import firebase from 'firebase'
import db from '../config/firebase'
import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import { sendNotification } from './'


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
                likes: [],
                comments: []
            }

        db.collection('post').doc(id).set(upload)
        
        } catch(e){
            console.error(e)
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
        console.error(e)
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
            dispatch(sendNotification(post.uid, 'Liked Your Photo'))
            //dispatch({type: 'GET_POSTS', payload: newFeed})
            dispatch(getPosts())
        } catch(e){
            console.error(e)
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
            console.error(e)
        }
    } 
}

export const addComment = (text, post) =>{
    return async (dispatch, getState) => {
        const { uid, photo, username } = getState().user
        let comments = cloneDeep(getState().post.comments.reverse())
        try{
            const comment = {
                comment: text,
                commenterId: uid,
                commenterPhoto: photo || '',
                commenterName: username,
                date: new Date().getTime(),
            }
            db.collection('post').doc(post.id).update({
                comments: firebase.firestore.FieldValue.arrayUnion(comment) //similar to array.push in firestore
            })
            
            comment.postId = post.id
            comment.postPhoto = post.postPhoto
            comment.uid = post.uid
            comment.type = 'COMMENT'
            comments.push(comment)
            dispatch({ type: 'GET_COMMENTS', payload: comments.reverse() })

            dispatch(sendNotification(post.uid, text))
            db.collection('activity').doc().set(comment)
        } catch(e){
            console.error(e)
        }
    } 
}

export const getComments = (post) =>{
    return dispatch => {
        dispatch({ type: 'GET_COMMENTS', payload: orderBy(post.comments, 'date', 'desc')})
    }

}



