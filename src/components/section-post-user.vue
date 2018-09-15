<template>
<ol class='items-post' id='items-post'>
<!--   <button @click="publicView">Publico</button>
  <button @click="privacyView">Privacy</button> -->
  <li v-for='item in items' :key='item.uid' class='content-allPost'>
    <div class='stream-item-header-allPost'>
            <img class='photo-profile-user-post' :src='item.photo' alt='photo'>
            <div class='profile-user-post'>
                <span class='full-name-user'>
                    <strong> {{item.name}}</strong><br>
                </span>
                <small class='time' id='time'>
                    <span class='time-post-regresivo'>{{item.time}}</span>
                </small>
                <i @click="like(item.uid)" class="material-icons prefix">keyboard_arrow_down</i>
            </div>
        </div>
        <div class='post-text-container'>
          <p>{{item.post}}</p>
        </div>
        <div class='post-container'>
        </div>
        <div class='content-edit'></div>
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
import firebase from 'firebase'
import processingPost from '../js/processing-data'
export default {
  name: 'sectionPostUser',
  data(){
    return {
      items: [],
      public_view: false,
      privacy_view: false,
      isCurrent: false
    }    
  },
  created() {
      processingPost.dataPost()
      .then(result => {
        this.items = result
    })    
    if (processingPost.false === false && this.items.name === firebase.auth().currentUser.displayName) {
      this.public_view = false
      this.isCurrent = firebase.auth().currentUser.email
    } 
  },
  methods: {
    like: (uid) => {
      processingPost.like(uid)
    }
  }
}
</script>
<style>
.acction{
  margin: 0% 2%;
  background: red;
}
.prefix ~ label {
    margin-left: .5rem !important;
}
.content-allPost {
  width: 96%;
  list-style: none;
  padding: 0.5em 0.5em;
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
  margin: 20px 0px 10px 0px;
  padding: 0.5em 0em;
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
  color: #673ab7 !important;
}
.content-coment-post input {
  border: 0.5px solid #fbfdffd6;
  width: 100%;
  padding: 1em 2em;
  border-radius: 3em;
  outline: none;
  background: #f2f3f5;
  text-align: center;
}
</style>
