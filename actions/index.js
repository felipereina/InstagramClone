import uuid from 'uuid'
import firebase from 'firebase'

export const uploadPhoto = (image) =>{
    return async (dispatch) => {
        try {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.onload = () => resolve(xhr.response)
                xhr.responseType = 'blob'
                xhr.open('GET', image.uri, true)
                xhr.send(null)
            })

            const uploadTask = await firebase.storage().ref().child(uuid.v4()).put(blob)
            const downloadURL = await uploadTask.ref.getDownloadURL()
            console.log('>>downloadURL ',downloadURL)
            return downloadURL
        } catch (error) {
            console.log(error)
        }
    }
}