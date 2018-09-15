import firebase from 'firebase'
const async = require('async')
/* eslint-disable */
const userData = () => {
  let postRef = firebase.database().ref().child('posts')
  let userId = firebase.auth().currentUser
  return {postRef, userId}
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
  const {postRef, userId} = userData()
  let newPostKey = postRef.push().key
  let postData = {
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
  const {postRef, userId} = userData()
  let postData = {
    content: post,
    privacy: privacy,
    time: firebase.database.ServerValue.TIMESTAMP
  }
  firebase.database().ref('/posts/' + uidPost).update(postData)
  firebase.database().ref('user-posts/' + userId.uid + '/' + uidPost).update(postData)
}

const deletePost = (dataDelete) => {
  const {postRef, userId} = userData()
  let refDeletePost = firebase.database().ref('posts/' + dataDelete)
  let refDeletePostUser = firebase.database().ref('user-posts/' + userId.uid + '/' + dataDelete)
  refDeletePost.remove()
  refDeletePostUser.remove()
}

const dataPost = (privacy) => {
/*   const type = menu.postPrivacy*/
  const typeView = privacy ? privacy : false 
  console.log(typeView);
  const {postRef, userId} = userData()
  const promise = new Promise((resolve, reject) => {
    const temp = [];
    postRef.off('value')
    postRef.on('value', data => {
      if (data.val() !== undefined) {
        async.map(data.val(), (post, callback2) => {              
          const info = firebase.database().ref('/Usuarios/' + post.uidUser)
          info.once('value', User => {
            const like = post.like
            if(typeView=== true && post.uidUser === firebase.auth().currentUser.uid){
              temp.push({
                name: User.val().name,
                photo: User.val().photoURL,
                post: post.content,
                like: (Object.keys(like ? like : {}).length),
                time:  new Date(Math.round((post.time) / 1000.0) * 1000).toLocaleString(),
                uid: post.uidPost
              })
            }
            if(typeView === false && post.privacy  === 'Público') {
              temp.push({
                name: User.val().name,
                photo: User.val().photoURL,
                post: post.content,
                like: (Object.keys(like ? like : {}).length),
                time:  new Date(Math.round((post.time) / 1000.0) * 1000).toLocaleString(),
                uid: post.uidPost
              })
            }
          })
          callback2(null, temp);
        }, (err) => {
          resolve(temp)
        })
      } else {
        reject(new Error('error'))
      }
    })
  })
  return promise
}
const like = (idPost) => {
  console.log(idPost);  
  const {postRef, userId} = userData()
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
  if (count !== 1) {
    updateLike(idPost)
  } else {
    deleteLike(idPost, userId.uid)
  }
}
const updateLike = (idPost) => {
  const {postRef, userId} = userData()
  firebase.database().ref('posts/' + idPost + '/like').push({
    creationTime: firebase.database.ServerValue.TIMESTAMP,
    create: userId.uid
  })
}
const deleteLike = (idPost, uid) => {
  const {postRef, userId} = userData()
  let refDeleteLike = firebase.database().ref('posts/' + idPost + '/like/')
  refDeleteLike.once('value', data => {
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

export default { dataUser, insertNewPost, updatePost, deletePost, dataPost, like, searchUsers }
