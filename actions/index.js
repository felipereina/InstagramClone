import uuid from 'uuid'
import firebase from 'firebase'
import { ImageManipulator } from 'expo'

export const uploadPhoto = (image) =>{
    return async (dispatch) => {
        try {
            const resize = await ImageManipulator.manipulateAsync(image.uri, [], {format: 'jpg', compress: 0.1 })
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.onload = () => resolve(xhr.response)
                xhr.responseType = 'blob'
                xhr.open('GET', resize.uri, true)
                xhr.send(null)
            })

            const uploadTask = await firebase.storage().ref().child(uuid.v4()).put(blob)
            const downloadURL = await uploadTask.ref.getDownloadURL()
            return downloadURL
        } catch (error) {
            console.log(error)
        }
    }
}