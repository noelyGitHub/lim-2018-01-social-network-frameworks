import firebase from 'firebase'
/* eslint-disable */
const userData = () => {
  let postRef = firebase.database().ref().child('posts')
  let userId = firebase.auth().currentUser
  return { postRef, userId }
}

const dataUser = (uid) => {
  let photoOfDatabase, displayName, email, datos
  firebase.database().ref('/Usuarios/' + uid).on('value', data => {
    datos = data.val()
    displayName = datos.usersName
    email = datos.usersEmail
    photoOfDatabase = datos.photoURL
    return { displayName: displayName, email: email, photoURL: photoOfDatabase }
  })
}
const insertNewPost = (posts, privacy) => {
  const { postRef, userId } = userData()
  let newPostKey = postRef.push().key
  let postData = {
    name: userId.displayName,
    photo: userId.photoURL,
    uidPost: newPostKey,
    uidUser: userId.uid,
    content: posts,
    privacy: privacy,
    like: {},
    time: firebase.database.ServerValue.TIMESTAMP
  }
  firebase.database().ref('posts/' + newPostKey).set(postData)
  firebase.database().ref('user-posts/' + userId.uid + '/' + newPostKey).set(postData)
}
const updatePost = (post, privacy, uidPost) => {
  console.log('update')
  const { postRef, userId } = userData()
  let postData = {
    content: post,
    privacy: privacy,
    time: firebase.database.ServerValue.TIMESTAMP
  }
  firebase.database().ref('/posts/' + uidPost).update(postData)
  firebase.database().ref('user-posts/' + userId.uid + '/' + uidPost).update(postData)
}

const deletePost = (dataDelete) => {
  const { postRef, userId } = userData()
  let refDeletePost = firebase.database().ref('posts/' + dataDelete)
  let refDeletePostUser = firebase.database().ref('user-posts/' + userId.uid + '/' + dataDelete)
  refDeletePost.remove()
  refDeletePostUser.remove()
}
const like = (idPost) => {

  const { postRef, userId } = userData()
  let count = 0
  let ObjectLikes = firebase.database().ref('/posts/' + idPost + '/like/')
  ObjectLikes.once('value', (data) => {
    let dataLike = data.val()
    for (const like in dataLike) {
      if (dataLike[like].create === userId.uid) {
        count++
      }
    }
  })
  if (count === 0) {
    updateLike(idPost)
  } else {
    deleteLike(idPost, userId.uid)
  }
}
const updateLike = (idPost) => {
  const { postRef, userId } = userData()
  firebase.database().ref('posts/' + idPost + '/like').push({
    creationTime: firebase.database.ServerValue.TIMESTAMP,
    create: userId.uid
  })
}
const deleteLike = (idPost, uid) => {
  const { postRef, userId } = userData()
  let refDeleteLike = firebase.database().ref('posts/' + idPost + '/like/')
  refDeleteLike.on('value', data => {
    const likes = data.val()
    for (const like in likes) {
      if (likes[like].create === uid) {
        let likePost = firebase.database().ref('posts/' + idPost + '/like/' + like)
        likePost.remove()
      }
    }
  })
}
const searchUsers = (name) => {
  const dataUser = firebase.database().ref('/Usuarios/').orderByChild('usersName').startAt(name).limitToFirst(10)
  return dataUser
}

export default { dataUser, insertNewPost, updatePost, deletePost, like, searchUsers }
