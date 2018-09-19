<template>
<ol class='items-post' mi="mi">
  <li v-for='item in items' :key='item.uid' class='content-allPost'>
    <div class='stream-item-header-allPost'>
      <img class='photo-profile-user-post' :src='item.photo' alt='photo'>
        <div class='profile-user-post'>
          <span class='full-name-user'>
            <strong> {{item.name}}</strong><br>
          </span>
          <small class='time'>
            <span class='time-post-regresivo'>{{item.time}}</span>
          </small>
          <div class='button-editar-eliminar' :id="item.uid" v-if="item.user === isCurrent" >
            <i @click="showOption()" class="material-icons prefix">keyboard_arrow_down</i>
            <ul id="listp" class="listOption" v-if="conf">
              <li  @click="updatePost(item.uid, item.post, item.type)"><i id='edit' class="material-icons prefix">edit</i>editar</li>
              <li @click="deletePosts(item.uid)"><i id='delete' class="material-icons prefix">close</i>Delete</li>
            </ul>
          </div>
        </div>
    </div>
    <div class='post-text-container'>
      <p>{{item.post}}</p>
    </div>
    <div class='stream-item-footer'>
      <div class='acciones-post'>
        <div class='acction'>
          <div class='icon-likes-post'>
            <i @click="like(item.uid)" class="material-icons prefix">favorite</i>
            <label class='count-like-post'>{{item.like}}</label>
          </div>
          <div class='icon-likes-post'>
            <i @click="like(item.uid)" class="material-icons prefix">share</i>
            <label class='count-share-post'>0</label>
          </div>
        </div>
          <div class='content-coment-post'>
            <div class='comentar-post'>
              <input type='text' placeholder='Agregar un comentario'>
            </div>
          </div>
        </div>
     </div>
   </li>
 </ol>
</template>
<script>
/* eslint-disable */
import firebase,{ functions } from 'firebase'
import processingPost from '../js/processing-data'
import async from 'async'
export default {
  name: 'sectionPostUser',
  props: ['privacy'],
  data(){
    return {
      items: [],
      isCurrent: firebase.auth().currentUser.uid,
      conf: false
    }    
  },
  created() {
    this.statePost(this.privacy)     
  },
  watch: {    
    privacy: function (newVal, oldVal) {
     this.statePost(newVal)
    }
  },
  methods: {
    statePost (statusPrivacy) {
      const typeView = statusPrivacy ? statusPrivacy : false
      let postRef = firebase.database().ref().child('posts')
      return new Promise((resolve, reject) => {
        postRef.on('value', data => {
          let temp = [];                     
          const dataPosts = data.val()
          console.log(dataPosts)
          async.map(dataPosts, (post, callback2) => {
            const like = post.like
            if(typeView=== true && post.uidUser === firebase.auth().currentUser.uid){
              temp.push({
                name: post.name,
                photo: post.photo,
                post: post.content,
                like: (Object.keys(like ? like : {}).length),
                time: new Date(Math.round((post.time) / 1000.0) * 1000).toLocaleString(),
                uid: post.uidPost,
                user: post.uidUser,
                type: post.privacy
              })
            }
            if(typeView === false && post.privacy  === 'Público') {
              temp.push({
                name: post.name,
                photo: post.photo,
                post: post.content,
                like: (Object.keys(like ? like : {}).length),
                time: new Date(Math.round((post.time) / 1000.0) * 1000).toLocaleString(),
                uid: post.uidPost,
                user:post.uidUser,
                type: post.privacy
              })
            }
            callback2(null, temp)                
          },(err, result) => {       
            this.items = result[0]
          })   
        })     
      })   
    },
    like: function (uid) {
      processingPost.like(uid)
    }, 
    showOption () {
      if(this.conf === true) this.conf = false
      else this.conf = true
    },
    deletePosts: (uid) => {
      processingPost.deletePost(uid)
      this.conf = false
    },
    updatePost(uid, post, type){    
      this.$emit('update-post', {uid:uid, post:post, type:type})
      this.conf = false
    }
  }
}
</script>
<style>
  .button-editar-eliminar {
      margin-left: 90%;
      margin-top: -44px;
  }
  .button-editar-eliminar ul{
    display: block;
    background:#99cc00;
    padding: .5em 0em;
    color: #fff;
    position: absolute;
    margin-left: -5em;
  }
  .button-editar-eliminar ul li{
      list-style: none;
      line-height: 30px;
      padding: 0px 2em;
      cursor: pointer;
  }
  .button-editar-eliminar ul li:hover{
    background: #004e66;
  }
  #edit, #delete{
    color: #fff !important;
    font-size: 14px;
    padding: 5px 5px;
  }
  .acction{
    margin: 0% 2%;
  }
  .prefix ~ label {
      margin-left: .5rem !important;
  }
  .content-allPost {
    width: 100%;
    list-style: none;
    padding: 1em 0.5em;
    margin: 20px 0% 0px 0%;
    background: #fff;
    box-shadow: 0px 0px 1px 0px #00000042;
  }
  .photo-profile-user-post {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    float: left;
  }
  .full-name-user {
    width: 100px;
  }
  .full-name-user strong {
    padding: 0.5em 0.5em;
    color: inherit;
    font-weight: normal;
  }
  .time-post-regresivo {
    padding: 0.9em 0.5em;
    color: #868d95;
    font-size: 12px;
  }
  .post-text-container p {
    margin: 10px 0px 10px 0px;
    padding: 0.5em 1.5em;
    color: rgba(0, 0, 0, 0.67);
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stream-item-footer {
    width: 100%;
    margin: 5px 0px;
  }
  .icon-likes-post {
    width: 50%;
    height: 25px;
    margin: 5px 0px;
    float: left;
    text-align: center;
  }
  .material-icons,
  .icon-share2 {
    padding-left: 0 !important;
    color: #004e66 !important;
    cursor:pointer;
  }
  .content-coment-post input {
    border: 0.5px solid #fbfdffd6 !important;
    width: 100% !important;
    padding: 1em 0em !important;
    border-radius: 3em !important;
    outline: none !important;
    background: #f2f3f5 !important;
    text-align: center !important;
    margin: .5em 0px !important;
    height: 1rem !important;
  }
  .items-post{
      margin-left: -12%;
    }
  @media (max-width: 490px){
    .content-post {
      margin: 0px;
    }
    .items-post{
      
    }
  }
</style>
