<template>
<ol class='items-post' mi="mi">
  <input type="text" id='num' v-bind:value='privacy'>
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
          <div class='button-editar-eliminar' v-if="item.user === isCurrent" >
            <i @click="showOption()" class="material-icons prefix">keyboard_arrow_down</i>
            <ul id="listp" class="listOption">
              <li  @click="update()"><i id='edit' class="material-icons prefix">edit</i>editar</li>
              <li @click="delette(item.uid)"><i id='delete' class="material-icons prefix">close</i>Delete</li>
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
import firebase from 'firebase'
import processingPost from '../js/processing-data'
export default { 
  name: 'sectionPostUser',
  props: ['privacy'],
  data(){
    return {
      items: [],
      isCurrent: firebase.auth().currentUser.uid,
      view: this.privacy
    }    
  },
  created() {
    
    processingPost.dataPost(this.privacy)        
      .then(result => {
        this.items = result
    }) /*    
    if (this.items.name === firebase.auth().currentUser.displayName) {
      console.log('yes')
        this.public_view = false
        this.isCurrent = firebase.auth().currentUser.email
      }  */
  },
  methods: {
    like: (uid) => {
      processingPost.like(uid)
    }, 
    showOption: () => {
      document.getElementById('listp').value='bbb';
    },
    delette: (uid) => {
      //document.getElementById('mi').innerHTML=''
      processingPost.deletePost(uid)
    },
    update: (post, type, uid) => {
      processingPost.updatePost(post,type,uid)
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
  background:#004e66;
  padding: .5em 0em;
  color: #fff;
  position: absolute;
  margin-left: -40px;
}
.button-editar-eliminar ul li{
  list-style: none;
  line-height: 20px;
  padding: 0px 10px;
  cursor: pointer;
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
  color: #004e66 !important;
  cursor:pointer;
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
